<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle, inputWidthStyle, borderRadiusStyle]"
    role="input"
    :title="title"
    v-bind="computedAriaAttrs"
  >
    <div
      :id="nbId"
      :class="['nb-reset', 'component', sizeMediaQueryStyle, themeStyle, componentReadonly, inputStyleClass]"
      :style="[componentStyle, inputWidthStyle, borderRadiusStyle]"
      @click="interacted($event)"
    >
      <label
        v-if="showLabel"
        :for="computedInputName"
        class="component__label"
        :style="[styleLabel]"
        @click="handleLabelClick"
      >{{ label }}<span v-if="required" class="component__label--required">*</span></label>

      <input
        ref="inputRef"
        :id="computedInputName"
        :name="computedInputName"
        type="file"
        :multiple="multiple"
        :accept="acceptedFileExtensions"
        :capture="inputCapture"
        class="component__file-native"
        :class="[
          uppercaseStyle,
          activeStyle
        ]"
        :disabled="disabled || inputReadonly"
        :required="required"
        :tabindex="-1"
        role="input"
        :style="[borderRadiusStyle]"
        @click="handleNativeInputClick"
        @focus="handleNativeInputFocus"
        @blur="handleFileInputBlur"
        @cancel="onNativeFilePickerCancel"
        @change="onChangeFile"
      />
      <div
        ref="fileDisplayRef"
        class="component__input component__input--file-display"
        :class="[
          uppercaseStyle,
          activeStyle
        ]"
        role="button"
        :tabindex="disabled || inputReadonly ? -1 : tabindex"
        :aria-label="fileControlAriaLabel"
        :aria-disabled="disabled || inputReadonly"
        :style="[borderRadiusStyle, inputIconStyle]"
        @click="onFileDisplayClick"
        @focus="handleFileDisplayFocus"
        @blur="handleFileDisplayBlur"
        @keydown="onFileDisplayKeydown"
      >
        <div class="component__file-info">
          <span v-if="files.length">
            {{ multiple ? `${files.length} ${multipleFilesSelectedText}` : files[0]?.name }}
          </span>
          <span v-else>{{ computedPlaceholder }}</span>
        </div>

        <span v-if="files.length > 0" class="component__file-clear" :style="[styleClearButton]" @click.stop="removeAllFiles">
          {{ resolvedFileUiLocale.clearAction }}
        </span>
      </div>

      <label :for="computedInputName" v-if="hasIcon" :class="['component__icon', styleIconDirection]">
        <slot name="icon">
          <span>&#9829;</span>
        </slot>
      </label>
    </div>

    <div class="component__extra-content" :class="{ 'component__extra-content--absolute': extraContendAbsolute }">
      <!-- slot constraints -->
      <div class="component__file-constraints-counter">
        <p v-if="showConstraintsText" class="component__file-constraints" :style="[styleConstraints]">
          {{ constraintsText }}
        </p>
        <p
          v-if="showFilesCounter && maxFiles != null && multiple"
          class="component__file-counter" :style="[styleCounter]"
        >
          {{ filesCounterText }}
        </p>
      </div>    
      <!-- fim slot constraints -->

      <!-- slot message -->
      <div
        v-if="validShowMsg"
        :class="['component__message', hasCustomMsg ? 'component__message--custom' : 'component__message--default']"
      >
        <slot name="message">{{ message }}</slot>
      </div>
      <div v-if="validShowError" class="component__file-errors" style="display: none !important;">
        <slot v-if="errors.length" name="file-errors" :errors="errors">
          <div class="component__file-errors--inline">
            <div v-for="(error, index) in errors" :key="index" class="component__file-error">
              {{ error.msg }}
            </div>
          </div>
        </slot>
      </div>
      <!-- fim slot message -->

      <!-- slot file-list -->
      <div v-if="validShowFileList" class="component__file-list" :style="[styleFileList]">
        <slot name="file-list" :files="files" :removeFile="removeFile">
          <ul class="component__file-list-items">
            <li v-for="(file, fileIndex) in files" :key="duplicateKey(file)" class="component__file-list-item">
              <span class="component__file-list-item-name">{{ file.name }}</span>
              <span @click="removeFile(fileIndex)" class="component__file-list-item-remove">x</span>
            </li>
          </ul>
        </slot>
      </div>
      <!-- fim slot file-list -->
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, watch } from 'vue'
import {
  validateIncomingFile,
  duplicateKey,
  formatLocaleMessage,
  resolveFileValidationLocale,
  FileValidationErrorType,
  buildFileValidationErrorPayload,
} from '@helpers/nbFileValidation.js'

defineOptions({
	name: 'NbInputFile',
	inheritAttrs: false
})

const emit = defineEmits([
  'current-value',
  'changed',
  'focused',
  'blurred',
  'clicked',
  'validation-error',
  'validation-errors',
  'file-dialog-closed',
])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	display: {
		type: String,
		default: 'b',
		validator: (value = 'b') => {
			const currentValue = value.toLowerCase()
			return ['b', 'ib'].includes(currentValue)
		}
	},
	tabIndex: {
    type: Number,
    default: 0
  },
  hasTabIndexEnter: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  ariaLabel: {
    type: String,
    default: 'Alternate Text Button'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: ''
  },
	textColor: { // TESTAR AINDA
		type: String,
		default: '#ffffff'
	},
	caretColor: {
		type: String,
		default: '',
		validator: value => {
			return !value || typeof value === 'string'
		}
	},
	selectionBgColor: {
		type: String,
		default: '',
		validator: value => {
			return !value || typeof value === 'string'
		}
	},
	selectionTextColor: {
		type: String,
		default: '',
		validator: value => {
			return !value || typeof value === 'string'
		}
	},
	theme: {
		type: String,
		default: 'light',
		validator: value => {
			return ['dark', 'light'].indexOf(value) !== -1
		}
	},
  hasBorderRadius: {
    type: Boolean,
    default: false,
		validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
	},
	borderRadius: {
		type: Number,
		default: .5 // 0.375
	},
	disabled: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	fontFamily: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSize: {
		type: String,
		default: null
	},
	fontWeight: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 700 : value
		}
	},
	fontFamilyMsg: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSizeMsg: {
		type: String,
		default: '1em',
		validator: value => {
			return !value ? '1em' : value
		}
	},
	fontWeightMsg: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 700 : value
		}
	},
	textMessageColor: {
		type: String,
		default: '#f15574'
	},
	fontFamilyFileList: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSizeFileList: {
		type: String,
		default: '1.6em',
		validator: value => {
			return !value ? '1.6em' : value
		}
	},
	fontWeightFileList: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 400 : value
		}
	},
	textFileListColor: {
		type: String,
		default: '#000000'
	},
	textFileListPadding: {
		type: String,
		default: '2px'
	},
	textFileListMargin: {
		type: String,
		default: '2px'
	},
	fontFamilyConstraints: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSizeConstraints: {
		type: String,
		default: '1.2em',
		validator: value => {
			return !value ? '1.2em' : value
		}
	},
	fontWeightConstraints: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 400 : value
		}
	},
	textConstraintsColor: {
		type: String,
		default: '#6b7280'
	},
	textConstraintsPadding: {
		type: String,
		default: '0px'
	},
	textConstraintsMargin: {
		type: String,
		default: '6px 0 0 0'
	},

  
	fontFamilyClearButton: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSizeClearButton: {
		type: String,
		default: '1.2em',
		validator: value => {
			return !value ? '1.2em' : value
		}
	},
	fontWeightClearButton: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 400 : value
		}
	},
	textClearButtonColor: {
		type: String,
		default: '#6b7280'
	},
	textClearButtonColorHover: {
		type: String,
		default: '#000000'
	},
	textClearButtonPadding: {
		type: String,
		default: '0px 6px'
	},
	textClearButtonPaddingHover: {
		type: String,
		default: '0px 6px'
	},
	textClearButtonBackground: {
		type: String,
		default: 'transparent'
	},
	textClearButtonBackgroundHover: {
		type: String,
		default: 'transparent'
	},


  
	fontFamilyCounter: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSizeCounter: {
		type: String,
		default: '1.2em',
		validator: value => {
			return !value ? '1.2em' : value
		}
	},
	fontWeightCounter: {
		type: Number,
		default: 600,
		validator: value => {
			return !value ? 600 : value
		}
	},
	textCounterColor: {
		type: String,
		default: '#374151'
	},
	textCounterPadding: {
		type: String,
		default: '0px'
	},
	textCounterMargin: {
		type: String,
		default: '4px 0px 0 0'
	},
  extraContendAbsolute: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  textAlign: {
    type: String,
    default: 'left',
    validator: value => {
      return ['center', 'left', 'right'].indexOf(value) !== -1
    },
  },
  inputName: {
    type: String,
    required: true,
  },
  inputPlaceholder: {
      type: String,
      default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
    validator: value => typeof value === 'boolean' && [true, false].includes(value),
  },
  fileExtension: {
    type: String,
    default: '',
  },
  // compatibilidade com implementação antiga
  fileExtensions: {
    type: String,
    default: '',
  },
  /**
   * Sugestão para dispositivos móveis abrirem câmera/mic:
   * - '' (padrão): no capture force
   * - 'user': front camera
   * - 'environment': back camera
   * - 'auto': usa 'environment'
   *
   * Obs.: só é aplicado quando o `accept` indica mídia (image/* ou video/*).
   * Para tipos como PDF, é ignorado automaticamente.
   */
  captureMode: {
    type: String,
    default: '',
    validator: value => ['', 'auto', 'user', 'environment'].includes(value),
  },
  maxFileSizeBytes: {
    type: Number,
    default: 5 * 1024 * 1024,
  },
  maxFiles: {
    type: [Number, null],
    default: null,
    validator: value => value === null || (typeof value === 'number' && value > 0),
  },
  /** Extensões explícitas além do `accept` (ex: ['.png', '.jpg']). Ambos se aplicam quando preenchidos. */
  allowedExtensions: {
    type: Array,
    default: () => [],
    validator: value => Array.isArray(value) && value.every(v => typeof v === 'string'),
  },
  /** Se false, não permite o mesmo nome+tamanho na lista nem duplicar no mesmo lote do picker. */
  allowDuplicates: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  /** Larguras permitidas para GIF (pares com gifHeight). */
  gifWidth: {
    type: Array,
    default: () => [],
  },
  gifHeight: {
    type: Array,
    default: () => [],
  },
  /** Duração máxima de vídeo em segundos (null = sem validação). */
  videoMaxDuration: {
    type: Number,
    default: null,
  },
  /** Proporção esperada, ex: '4:3' (vazio = sem validação de aspect). */
  videoRatio: {
    type: String,
    default: '',
  },
  videoAspectTolerance: {
    type: Number,
    default: 0.01,
  },
  /** Mostra `atual/máx` quando `multiple` e `maxFiles` estão definidos. */
  showFilesCounter: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  /**
   * Textos de validação e contador. Chaves em `nbFileValidation.DEFAULT_FILE_VALIDATION_LOCALE`;
   * apenas as informadas substituem o inglês padrão (ex.: `filesCounter: '{current} de {max}'`).
   */
  locale: {
    type: Object,
    default: () => ({}),
  },
  showFileList: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  showConstraintsText: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  /** Remove foco do controle visível ao cancelar/fechar o seletor sem escolher arquivo. */
  blurOnDialogCancel: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  multipleFilesSelectedText: {
    type: String,
    default: 'files selected',
  },
  activeTextStyle: {
    type: String,
    default: 'normal',
    validator: value => {
      return ['normal', 'italic', 'oblique'].indexOf(value) !== -1
    },
  },
  sizeMediaQuery: {
    type: String,
    default: 'sm',
    validator: value => {
      return ['xs', 'sm', 'md', 'lg'].indexOf(value) !== -1
    },
  },
  required: {
    type: Boolean,
    default: false,
    validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  inputReadonly: {
    type: Boolean,
    default: false,
    validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  inputUppercase: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  inputWidth: {
		type: Number,
		default: 200
	},
	inputStyle: {
		type: String,
		default: 'background',
		validator: value => {
			return ['background', 'line', 'border'].indexOf(value) !== -1
		}
	},
	// Cores do tema light
	lightBgColor: {
		type: String,
		default: '#f8f8f2'
	},
	lightBgColorFocus: {
		type: String,
		default: '#eaeaea'
	},
	lightControlBorderColor: {
		type: String,
		default: '#353734'
	},
	lightControlBorderColorActive: {
		type: String,
		default: '#272936'
	},
	lightDisabledBgColor: {
		type: String,
		default: '#dfdfd9'
	},
	lightTextColor: {
		type: String,
		default: '#000000'
	},
	// Cores do tema dark
	darkBgColor: {
		type: String,
		default: '#353734'
	},
	darkBgColorFocus: {
		type: String,
		default: '#272936'
	},
	darkControlBorderColor: {
		type: String,
		default: '#353734'
	},
	darkControlBorderColorActive: {
		type: String,
		default: '#272936'
	},
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
	},
	darkTextColor: {
		type: String,
		default: '#000000'
	},
	darkDisabledControlBorderColor: {
		type: String,
		default: 'rgba(68, 71, 90, 0.3)'
	},
	lightDisabledControlBorderColor: {
		type: String,
		default: 'rgba(53, 55, 52, 0.3)'
	},
	tabindex: {
		type: [String, Number],
		default: 0
	},
  showMsg: { // Se mostrado o erro
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  hasMsg: { // Se tem erro
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  message: {
    type: String,
    default: 'Default message text',
  },
  hasCustomMsg: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  /*showError: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },*/
  hasIcon: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  iconWidth: {
    type: Number,
    default: 32
  },
  iconDirection: {
    type: String,
    default: 'left',
    validator: value => {
      return ['left', 'right'].includes(value)
    },
  },
  iconPadding: {
    type: String,
    default: '5px 10px',
    validator: value => {
      return typeof value === 'string' && value.split(' ').length === 2
    },
  },
  iconPaddingInput: {
    type: Number,
    default: 35
  },
  iconMargin: {
    type: String,
    default: '0'
  },
	iconLightTextColor: {
    type: String,
    default: '#f8f8f2'
  },
  iconDarkTextColor: {
    type: String,
    default: '#f8f8f2'
  },
  iconLightBgColor: {
    type: String,
    default: '#353734'
  },
  iconLightBgColorActive: {
    type: String,
    default: '#272936'
  },
  iconDarkBgColor: {
    type: String,
    default: '#353734'
  },
  iconDarkBgColorActive: {
    type: String,
    default: '#272936'
  },
  iconDarkDisabledBgColor: {
    type: String,
    default: 'rgba(68, 71, 90, 0.3)'
  },
  iconLightDisabledBgColor: {
    type: String,
    default: 'rgba(53, 55, 52, 0.3)'
  },
  iconBorderRadius: {
    type: Number,
    default: 0
  },
  iconSize: {
    type: Number,
    default: 1
  },
  showLabel: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  label: {
    type: String,
    default: 'Label text',
  },
  labelBreakOnActive: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  labelBackground: {
    type: String,
    default: 'transparent',
  },
  labelPadding: {
    type: String,
    default: '1px 5px',
  },
	labelBorderRadius: {
		type: Number,
		default: 0
	},
  labelLeft: {
    type: Number,
    default: 5,
  },
  inputLabelMarginActive: {
    type: Number,
    default: 15,
  },
  labelActiveTop: {
    type: Number,
    default: -13,
  },
  labelActiveLeft: {
    type: Number,
    default: 5,
  },
  labelRight: {
    type: Number,
    default: 0,
  },
  labelActiveRight: {
    type: Number,
    default: 0,
  },
  fontFamilyLabel: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSizeLabel: {
		type: String,
		default: '1em',
		validator: value => {
			return !value ? '1em' : value
		}
	},
	fontSizeLabelActive: {
		type: String,
		default: '0.8em',
		validator: value => {
			return !value ? '0.8em' : value
		}
	},
	fontWeightLabel: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 700 : value
		}
	},
	lightTextColorLabel: {
		type: String,
		default: '#333333'
	},
	lightTextColorLabelActive: {
		type: String,
		default: '#333333'
	},
	darkTextColorLabel: {
		type: String,
		default: '#ffffff'
	},
	darkTextColorLabelActive: {
		type: String,
		default: '#ffffff'
	},
})

const {
  nbId,
	display,
  hasTabIndexEnter,
  ariaLabel,
  ariaAttrs,
	textColor,
	caretColor,
	selectionBgColor,
	selectionTextColor,
  hasBorderRadius,
	borderRadius,
	disabled,
	fontFamily,
	fontSize,
	fontWeight,
	fontFamilyMsg,
	fontSizeMsg,
	fontWeightMsg,
	textMessageColor,
	fontFamilyFileList,
	fontSizeFileList,
	fontWeightFileList,
	textFileListColor,
	textFileListPadding,
	textFileListMargin,
	inputWidth,
	inputStyle,
	activeTextStyle,
	sizeMediaQuery,
	inputReadonly,
	inputUppercase,
  inputName,
  inputPlaceholder,
  multiple,
  fileExtension,
  fileExtensions,
  captureMode,
  maxFileSizeBytes,
  maxFiles,
  allowedExtensions,
  allowDuplicates,
  gifWidth,
  gifHeight,
  videoMaxDuration,
  videoRatio,
  videoAspectTolerance,
  showFilesCounter,
  locale,
  showConstraintsText,
  blurOnDialogCancel,
  multipleFilesSelectedText,
  theme,
  tabindex,
	lightBgColor,
	lightBgColorFocus,
	lightControlBorderColor,
	lightControlBorderColorActive,
	lightDisabledBgColor,
	lightTextColor,
	darkBgColor,
	darkBgColorFocus,
	darkControlBorderColor,
	darkControlBorderColorActive,
	darkDisabledBgColor,
	darkTextColor,
	darkDisabledControlBorderColor,
	lightDisabledControlBorderColor,
  textAlign,
  showMsg,
  hasMsg,
  showError,
  hasIcon,
  iconDirection,
  iconPadding,
  iconPaddingInput,
  iconMargin,
  iconBorderRadius,
  iconLightTextColor,
  iconDarkTextColor,
  iconLightBgColor,
  iconDarkBgColor,
  iconLightBgColorActive,
  iconDarkBgColorActive,
  iconLightDisabledBgColor,
  iconDarkDisabledBgColor,
  iconWidth,
  iconSize,
  showLabel,
  label,
  labelBreakOnActive,
  labelBackground,
  labelPadding,
  labelBorderRadius,
  labelLeft,
  inputLabelMarginActive,
  labelActiveTop,
  labelActiveLeft,
  labelRight,
  labelActiveRight,
  fontFamilyLabel,
  fontSizeLabel,
  fontSizeLabelActive,
  fontWeightLabel,
  lightTextColorLabel,
  lightTextColorLabelActive,
  darkTextColorLabel,
  darkTextColorLabelActive,
  fontFamilyConstraints,
  fontSizeConstraints,
  fontWeightConstraints,
  textConstraintsColor,
  textConstraintsPadding,
  textConstraintsMargin,
  fontFamilyClearButton,
  fontSizeClearButton,
  fontWeightClearButton,
  textClearButtonColor,
  textClearButtonColorHover,
  textClearButtonPadding,
  textClearButtonPaddingHover,
  textClearButtonBackground,
  textClearButtonBackgroundHover,
  fontFamilyCounter,
  fontSizeCounter,
  fontWeightCounter,
  textCounterColor,
  textCounterPadding,
  textCounterMargin,
  showFileList,
  extraContendAbsolute,
} = toRefs(props)

const inputRef = ref(null) // input element reference
const fileDisplayRef = ref(null) // file display reference
const isActive = ref(false) // is active state
const files = ref([]) // selected files
const errors = ref([]) // validation errors
const fileDialogToken = ref(0) // file dialog token
const isFileDialogOpen = ref(false) // is file dialog open state

/* Default file UI locale */
const DEFAULT_FILE_UI_LOCALE = {
  clearAction: 'Clear',
  chooseFileAriaLabel: 'Choose file',
  singleFileLimit: '1 file',
  multipleFilesLimit: 'Multiple files',
  upToFilesLimit: 'Up to {max} files',
  maxSizePerFile: 'Max size per file: {size}',
}

/* Accepted file extensions */
const acceptedFileExtensions = computed(() => {
  // Return accepted file extensions
  return fileExtension.value || fileExtensions.value || ''
})

/* Input capture */
const inputCapture = computed(() => {
  // Get capture mode
  const mode = String(captureMode.value || '').toLowerCase()
  if (!mode) return null

  // Get accept tokens
  const acceptTokens = acceptedFileExtensions.value
    .split(',')
    .map(t => t.trim().toLowerCase())
    .filter(Boolean)

  // Check if has media accept
  const hasMediaAccept = acceptTokens.some(token =>
    token.startsWith('image/')
    || token.startsWith('video/')
    || token === 'image/*'
    || token === 'video/*',
  )

  // Avoid cases without sense (e.g. accept PDF + capture camera).
  if (!hasMediaAccept) return null

  // Return capture mode
  if (mode === 'auto') return 'environment'

  // Return capture mode
  return mode
})

/* Resolved file locale */
const resolvedFileLocale = computed(() => {
  // Resolve file locale
  return resolveFileValidationLocale(locale.value)
})

/* Resolved file UI locale */
const resolvedFileUiLocale = computed(() => ({
  ...DEFAULT_FILE_UI_LOCALE, // default file UI locale
  ...(locale.value || {}), // resolved file locale
}))

/* Files counter text */
const filesCounterText = computed(() => {
  // Check if show files counter
  if (!showFilesCounter.value || maxFiles.value == null || !multiple.value) return ''

  // Get resolved file locale
  const L = resolvedFileLocale.value

  // Format locale message
  return formatLocaleMessage(L.filesCounter, {
    current: files.value.length,
    max: maxFiles.value,
  })
})

/* Max files allowed */
const maxFilesAllowed = computed(() => {
  // Check if multiple
  if (!multiple.value) return 1

  // Return max files
  return maxFiles.value
})

/* Constraints text */
const constraintsText = computed(() => {
  // Get max files text
  const maxFilesText = (() => {
    // Get max files text
    const max = maxFilesAllowed.value

    // Check if single file limit
    if (!multiple.value) return resolvedFileUiLocale.value.singleFileLimit

    // Check if multiple files limit
    if (max == null) return resolvedFileUiLocale.value.multipleFilesLimit

    // Format locale message
    return formatLocaleMessage(resolvedFileUiLocale.value.upToFilesLimit, { max })
  })()

  // Get max per file
  const maxPerFile = formatLocaleMessage(resolvedFileUiLocale.value.maxSizePerFile, {
    size: formatBytes(maxFileSizeBytes.value),
  })

  // Return constraints text
  return `${maxFilesText} • ${maxPerFile}`
})

/* Format default values */
const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const textColorValue = !textColor ? '#ffffff' : textColor.value
	const caretColorValue = !caretColor.value ? '' : caretColor.value
	const selectionBgColorValue = !selectionBgColor.value ? '' : selectionBgColor.value
	const selectionTextColorValue = !selectionTextColor.value ? '' : selectionTextColor.value
  const hasBorderRadiusValue = !hasBorderRadius.value ? false : hasBorderRadius.value
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? null : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 100 : fontWeight.value
  const fontFamilyMsgValue = !fontFamilyMsg.value ? `'Lato', sans-serif` : fontFamilyMsg.value
  const fontSizeMsgValue = !fontSizeMsg.value ? '1em' : fontSizeMsg.value
  const fontWeightMsgValue = ((fontWeightMsg.value !== 0 && !fontWeightMsg.value) || fontWeightMsg.value < 0) ? 100 : fontWeightMsg.value
  const textMessageColorValue = !textMessageColor.value ? '#f15574' : textMessageColor.value
  const inputWidthValue = !inputWidth.value ? 200 : inputWidth.value
  const activeTextStyleValue = !activeTextStyle.value ? 'normal' : activeTextStyle.value
  const sizeMediaQueryValue = !sizeMediaQuery.value ? 'xs' : sizeMediaQuery.value
  const inputReadonlyValue = !inputReadonly.value ? false : inputReadonly.value
  const inputUppercaseValue = !inputUppercase.value ? false : inputUppercase.value
  const themeValue = !theme.value ? 'light' : theme.value
  const textAlignValue = !textAlign.value ? 'left' : textAlign.value
  const inputStyleValue = !inputStyle.value ? 'background' : inputStyle.value

  const iconPaddingValue = !iconPadding.value ? '5px 10px' : iconPadding.value
  const iconMarginValue = !iconMargin.value ? '0' : iconMargin.value
  const iconPaddingInputValue = !iconPaddingInput.value ? 10 : iconPaddingInput.value
  const iconLightTextColorValue = !iconLightTextColor.value ? '#000000' : iconLightTextColor.value
  const iconDarkTextColorValue = !iconDarkTextColor.value ? '#000000' : iconDarkTextColor.value
  const iconLightBgColorValue = !iconLightBgColor.value ? 'transparent' : iconLightBgColor.value
  const iconDarkBgColorValue = !iconDarkBgColor.value ? 'transparent' : iconDarkBgColor.value
  const iconBorderRadiusValue = ((iconBorderRadius.value !== 0 && !iconBorderRadius.value) || iconBorderRadius.value < 0) ? 0 : iconBorderRadius.value
  const iconLightBgColorActiveValue = !iconLightBgColorActive.value ? 'transparent' : iconLightBgColorActive.value
  const iconDarkBgColorActiveValue = !iconDarkBgColorActive.value ? 'transparent' : iconDarkBgColorActive.value
  const iconWidthValue = !iconWidth.value ? 32 : iconWidth.value
  const iconSizeValue = !iconSize.value ? 1 : iconSize.value

  const showLabelValue = !showLabel.value ? false : showLabel.value
  const labelLeftValue = ((labelLeft.value !== 0 && !labelLeft.value) || labelLeft.value < 0) ? 5 : labelLeft.value
  const labelBackgroundValue = !labelBackground.value ? 'transparent' : labelBackground.value
  const inputLabelMarginActiveValue = ((inputLabelMarginActive.value !== 0 && !inputLabelMarginActive.value) || inputLabelMarginActive.value < 0) ? 15 : inputLabelMarginActive.value
  const labelPaddingValue = !labelPadding.value ? '1px 5px' : labelPadding.value
  const labelBorderRadiusValue = ((labelBorderRadius.value !== 0 && !labelBorderRadius.value) || labelBorderRadius.value < 0) ? 0 : labelBorderRadius.value
  const labelActiveTopValue = (labelActiveTop.value === null || labelActiveTop.value === undefined) ? -13 : labelActiveTop.value
  const labelActiveLeftValue = (labelActiveLeft.value === null || labelActiveLeft.value === undefined) ? 5 : labelActiveLeft.value
  const labelRightValue = (labelRight.value === null || labelRight.value === undefined) ? 0 : labelRight.value
  const labelActiveRightValue = (labelActiveRight.value === null || labelActiveRight.value === undefined) ? 0 : labelActiveRight.value
  const fontFamilyLabelValue = !fontFamilyLabel.value ? `'Lato', sans-serif` : fontFamilyLabel.value
  const fontSizeLabelValue = !fontSizeLabel.value ? '1em' : fontSizeLabel.value
  const fontSizeLabelActiveValue = !fontSizeLabelActive.value ? '0.8em' : fontSizeLabelActive.value
  const fontWeightLabelValue = !fontWeightLabel.value ? 400 : fontWeightLabel.value
  const lightTextColorLabelValue = !lightTextColorLabel.value ? '#ffffff' : lightTextColorLabel.value
  const darkTextColorLabelValue = !darkTextColorLabel.value ? '#000000' : darkTextColorLabel.value
  const lightTextColorLabelActiveValue = !lightTextColorLabelActive.value ? '#ffffff' : lightTextColorLabelActive.value
  const darkTextColorLabelActiveValue = !darkTextColorLabelActive.value ? '#000000' : darkTextColorLabelActive.value

  const fontFamilyFileListValue = !fontFamilyFileList.value ? `'Lato', sans-serif` : fontFamilyFileList.value
  const fontSizeFileListValue = !fontSizeFileList.value ? '1.6em' : fontSizeFileList.value
  const fontWeightFileListValue = !fontWeightFileList.value ? 400 : fontWeightFileList.value
  const textFileListColorValue = !textFileListColor.value ? '#000000' : textFileListColor.value
  const textFileListPaddingValue = !textFileListPadding.value ? '2px' : textFileListPadding.value
  const textFileListMarginValue = !textFileListMargin.value ? '2px' : textFileListMargin.value

  const fontFamilyConstraintsValue = !fontFamilyConstraints.value ? `'Lato', sans-serif` : fontFamilyConstraints.value
  const fontSizeConstraintsValue = !fontSizeConstraints.value ? '1.2em' : fontSizeConstraints.value
  const fontWeightConstraintsValue = !fontWeightConstraints.value ? 400 : fontWeightConstraints.value
  const textConstraintsColorValue = !textConstraintsColor.value ? '#6b7280' : textConstraintsColor.value
  const textConstraintsPaddingValue = !textConstraintsPadding.value ? '2px' : textConstraintsPadding.value
  const textConstraintsMarginValue = !textConstraintsMargin.value ? '6px 0 0 0' : textConstraintsMargin.value

  const fontFamilyClearButtonValue = !fontFamilyClearButton.value ? `'Lato', sans-serif` : fontFamilyClearButton.value
  const fontSizeClearButtonValue = !fontSizeClearButton.value ? '1.2em' : fontSizeClearButton.value
  const fontWeightClearButtonValue = !fontWeightClearButton.value ? 400 : fontWeightClearButton.value
  const textClearButtonColorValue = !textClearButtonColor.value ? '#6b7280' : textClearButtonColor.value
  const textClearButtonColorHoverValue = !textClearButtonColorHover.value ? '#000000' : textClearButtonColorHover.value
  const textClearButtonPaddingValue = !textClearButtonPadding.value ? '0px 6px' : textClearButtonPadding.value
  const textClearButtonPaddingHoverValue = !textClearButtonPaddingHover.value ? '0px 6px' : textClearButtonPaddingHover.value
  const textClearButtonBackgroundValue = !textClearButtonBackground.value ? 'transparent' : textClearButtonBackground.value
  const textClearButtonBackgroundHoverValue = !textClearButtonBackgroundHover.value ? 'transparent' : textClearButtonBackgroundHover.value
  
  const fontFamilyCounterValue = !fontFamilyCounter.value ? `'Lato', sans-serif` : fontFamilyCounter.value
  const fontSizeCounterValue = !fontSizeCounter.value ? '1.2em' : fontSizeCounter.value
  const fontWeightCounterValue = !fontWeightCounter.value ? 600 : fontWeightCounter.value
  const textCounterColorValue = !textCounterColor.value ? '#374151' : textCounterColor.value
  const textCounterPaddingValue = !textCounterPadding.value ? '0px' : textCounterPadding.value
  const textCounterMarginValue = !textCounterMargin.value ? '4px 0 0 0' : textCounterMargin.value
  
  return {
		disabled: disabledValue,
		display: displayValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		fontFamilyMsg: fontFamilyMsgValue,
		fontSizeMsg: fontSizeMsgValue,
		fontWeightMsg: fontWeightMsgValue,
		textMessageColor: textMessageColorValue,
		textColor: textColorValue,
		caretColor: caretColorValue,
		selectionBgColor: selectionBgColorValue,
		selectionTextColor: selectionTextColorValue,
    hasBorderRadius: hasBorderRadiusValue,
		borderRadius: borderRadiusValue,
    textAlign: textAlignValue,
    inputWidth: inputWidthValue,
    activeTextStyle: activeTextStyleValue,
    sizeMediaQuery: sizeMediaQueryValue,
    inputReadonly: inputReadonlyValue,
    inputUppercase: inputUppercaseValue,
    theme: themeValue,
    inputStyle: inputStyleValue,
    iconPadding: iconPaddingValue,
    iconMargin: iconMarginValue,
    iconPaddingInput: iconPaddingInputValue,
    iconLightTextColor: iconLightTextColorValue,
    iconDarkTextColor: iconDarkTextColorValue,
    iconLightBgColor: iconLightBgColorValue,
    iconDarkBgColor: iconDarkBgColorValue,
    iconBorderRadius: iconBorderRadiusValue,
    iconLightBgColorActive: iconLightBgColorActiveValue,
    iconDarkBgColorActive: iconDarkBgColorActiveValue,
    iconWidth: iconWidthValue,
    iconSize: iconSizeValue,
    showLabel: showLabelValue,
    labelBackground: labelBackgroundValue,
    labelPadding: labelPaddingValue,
    labelBorderRadius: labelBorderRadiusValue,
    labelLeft: labelLeftValue,
    inputLabelMarginActive: inputLabelMarginActiveValue,
    labelActiveTop: labelActiveTopValue,
    labelActiveLeft: labelActiveLeftValue,
    labelRight: labelRightValue,
    labelActiveRight: labelActiveRightValue,
    fontFamilyLabel: fontFamilyLabelValue,
    fontSizeLabel: fontSizeLabelValue,
    fontSizeLabelActive: fontSizeLabelActiveValue,
    fontWeightLabel: fontWeightLabelValue,
    lightTextColorLabel: lightTextColorLabelValue,
    darkTextColorLabel: darkTextColorLabelValue,
    lightTextColorLabelActive: lightTextColorLabelActiveValue,
    darkTextColorLabelActive: darkTextColorLabelActiveValue,
    fontFamilyFileList: fontFamilyFileListValue,
    fontSizeFileList: fontSizeFileListValue,
    fontWeightFileList: fontWeightFileListValue,
    textFileListColor: textFileListColorValue,
    textFileListPadding: textFileListPaddingValue,
    textFileListMargin: textFileListMarginValue,
    fontFamilyConstraints: fontFamilyConstraintsValue,
    fontSizeConstraints: fontSizeConstraintsValue,
    fontWeightConstraints: fontWeightConstraintsValue,
    textConstraintsColor: textConstraintsColorValue,
    textConstraintsPadding: textConstraintsPaddingValue,
    textConstraintsMargin: textConstraintsMarginValue,
    fontFamilyClearButton: fontFamilyClearButtonValue,
    fontSizeClearButton: fontSizeClearButtonValue,
    fontWeightClearButton: fontWeightClearButtonValue,
    textClearButtonColor: textClearButtonColorValue,
    textClearButtonColorHover: textClearButtonColorHoverValue,
    textClearButtonPadding: textClearButtonPaddingValue,
    textClearButtonPaddingHover: textClearButtonPaddingHoverValue,
    textClearButtonBackground: textClearButtonBackgroundValue,
    textClearButtonBackgroundHover: textClearButtonBackgroundHoverValue,
    fontFamilyCounter: fontFamilyCounterValue,
    fontSizeCounter: fontSizeCounterValue,
    fontWeightCounter: fontWeightCounterValue,
    textCounterColor: textCounterColorValue,
    textCounterPadding: textCounterPaddingValue,
    textCounterMargin: textCounterMarginValue,
	}
})

/* Component disabled */
const componentDisabled = computed(() => {
  // Get default values
	const defaultValues = formatDefaultValues.value

  // Return disabled
	return defaultValues.disabled
})

/* Wrapper style */
const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value // Get default values

	return {
		display: defaultValues.display,
		// Add padding-top when label is active to avoid being cut
    paddingTop: '0px',
		overflow: 'visible',
	}
})
const fontSizeStyle = computed(() => {
  // Get default values
  const defaultValues = formatDefaultValues.value
  
  // Check if font size
  if (defaultValues.fontSize) return defaultValues.fontSize

  // Get new font size
  let newFontSize = ''

  // Switch size media query
  switch (defaultValues.sizeMediaQuery) {
    case 'sm':
      return '1.2em'
    case 'md':
      return '1.6em'
    case 'lg':
      return '2em'
    default:
      newFontSize = '1.2em'
  }

  // Return new font size
  return newFontSize
})

/* Component style */
const componentStyle = computed(() => {
  // Get default values
  const defaultValues = formatDefaultValues.value

  // Get is active
  const isActive = isLabelActive.value

	return {
		fontWeight: defaultValues.fontWeight,
		marginTop: isActive && showLabel.value ? `${defaultValues.inputLabelMarginActive}px` : '0',
		overflow: (!showLabel.value || isActive) ? 'visible' : 'hidden',
	}
})

/* Border radius style */
const borderRadiusStyle = computed(() => {
  // Get default values
  const defaultValues = formatDefaultValues.value
  
  // Check if input style is not line and has border radius
  if (defaultValues.inputStyle !== 'line' && defaultValues.hasBorderRadius) {
    // Return border radius style
    return { borderRadius: `${defaultValues.borderRadius}rem` }
  }

  // Return empty style
  return {}
})

/* Font */
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})

/* Font message */
const fontMessage = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.fontFamilyMsg
})

/* Font size message */
const fontSizeMessage = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.fontSizeMsg
})

/* Font weight message */
const fontWeightMessage = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.fontWeightMsg
})

/* Text color */
const styleTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textColor
})

/* Button color */
const styleButtonColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.theme === 'dark' ? darkDisabledBgColor.value : lightDisabledBgColor.value
})

/* Text message color */
const styleTextMessageColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textMessageColor
})

/* Caret color */
const styleCaretColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.caretColor || (defaultValues.theme === 'dark' ? '#00d4ff' : '#007bff')
})

/* Selection background color */
const styleSelectionBgColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.selectionBgColor || (defaultValues.theme === 'dark' ? '#00d4ff' : '#007bff')
})

/* Selection text color */
const styleSelectionTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.selectionTextColor || (defaultValues.theme === 'dark' ? '#000000' : '#ffffff')
})

/* Input width style */
const inputWidthStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  if (defaultValues.display === 'block') return { width: '100%' }

  return {
    width: `${defaultValues.inputWidth}px`
  }
})

/* Input style class */
const inputStyleClass = computed(() => {
	switch (inputStyle.value) {
		case 'line':
			return 'component__input--line'
		case 'border':
			return 'component__input--border'
		default:
			return 'component__input--background'
	}
})

/* Active style */
const activeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  switch (defaultValues.activeTextStyle) {
    case 'italic':
      return 'component__input--active--italic'
    case 'oblique':
      return 'component__input--active--oblique'
    default:
      return 'component__input--active--normal'
  }
})

/* Size media query style */
const sizeMediaQueryStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  switch (defaultValues.sizeMediaQuery) {
    case 'sm':
      return 'component__sm'
    case 'md':
      return 'component__md'
    case 'lg':
      return 'component__lg'
    default:
      return ''
  }
})

/* Theme style */
const themeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  switch (defaultValues.theme) {
    case 'dark':
      return 'component__theme--dark'
    default:
      return 'component__theme--light'
  }
})

/* Component readonly */
const componentReadonly = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.inputReadonly ? 'component__input--read-only' : ''
})

/* Uppercase style */
const uppercaseStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.inputUppercase ? 'component__input--uppercase' : ''
})

/* Computed input name */
const computedInputName = computed(() => {
  return inputName.value ? inputName.value : `${nbId.value}-name-label`
})

/* Computed placeholder */
const computedPlaceholder = computed(() => {
  // Se não houver label, sempre mostra o placeholder
  if (!showLabel.value) {
    return inputPlaceholder.value
  }
  // Se houver label, só mostra o placeholder quando o input estiver ativo
  return isActive.value ? inputPlaceholder.value : ''
})
const isLabelActive = computed(() => {
  // Label ativo quando há foco/interação ou quando já existe arquivo selecionado
  return isActive.value || files.value.length > 0
})

/* Input padding */
const inputPadding = computed(() => {
  return '6px 10px'
})

/* Valid show message */
const validShowMsg = computed(() => {
  return !!(showMsg.value && hasMsg.value)
})

/* Valid show error */
const validShowError = computed(() => {
  return false
  // return !!(showError.value && errors.value.length > 0)
})

/* Valid show file list */
const validShowFileList = computed(() => {
  return !!(showFileList.value && files.value.length > 0)
})

/* Computed aria attributes */
const computedAriaAttrs = computed(() => {
  const newAttrs = {}

  if (ariaAttrs.value) {
    const attrKeys = Object.keys(ariaAttrs.value)

    attrKeys.forEach(key => newAttrs[`aria-${key}`] = ariaAttrs.value[key])
  }

  const attrs = {
    'aria-label': ariaLabel.value,
    'aria-disabled': disabled.value,
    ...newAttrs
  }
  
  // Remove atributos undefined/null
  return Object.fromEntries(
    Object.entries(attrs).filter(([_, value]) => value !== undefined && value !== null)
  )
})

/* File control aria label */
const fileControlAriaLabel = computed(() => {
  // Check if aria label
  if (ariaLabel.value) return ariaLabel.value

  // Check if show label and label
  if (showLabel.value && label.value) return label.value

  // Check if input placeholder
  if (inputPlaceholder.value) return inputPlaceholder.value

  // Return choose file aria label
  return resolvedFileUiLocale.value.chooseFileAriaLabel
})

/* Style icon size */
const styleIconSize = computed(() => {
  return hasIcon.value ? `${iconSize.value}rem` : '0'
})

/* Style icon width */
const styleIconWidth = computed(() => {
  return hasIcon.value ? `${iconWidth.value}px` : '0'
})

/* Style icon direction */
const styleIconDirection = computed(() => {
  return hasIcon.value ? `component__icon--${iconDirection.value}` : ''
})

/* Style icon padding */
const styleIconPadding = computed(() => {
  const defaultValues = formatDefaultValues.value

  return hasIcon.value ? defaultValues.iconPadding : '0'
})

/* Style icon margin */
const styleIconMargin = computed(() => {
  const defaultValues = formatDefaultValues.value

  return hasIcon.value ? defaultValues.iconMargin : '0'
})

/* Style icon background color */
const styleIconBgColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  if (hasIcon.value) {
    return defaultValues.theme === 'dark' ? defaultValues.iconDarkBgColor : defaultValues.iconLightBgColor
  }

  return 'transparent'
})

/* Style icon border radius */
const styleIconBorderRadius = computed(() => {
  const defaultValues = formatDefaultValues.value

  return hasIcon.value ? `${defaultValues.iconBorderRadius}rem` : '0'
})

/* Input icon style */
const inputIconStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  if (!hasIcon.value) return {}

  return iconDirection.value === 'left' ? { paddingLeft: `${defaultValues.iconPaddingInput}px` } : { paddingRight: `${defaultValues.iconPaddingInput}px` }
})

/* Style label */
const styleLabel = computed(() => {
  const defaultValues = formatDefaultValues.value
  const isActive = isLabelActive.value

  const lightTextColorLabel = isActive ? defaultValues.lightTextColorLabelActive : defaultValues.lightTextColorLabel
  const darkTextColorLabel = isActive ? defaultValues.darkTextColorLabelActive : defaultValues.darkTextColorLabel

  let leftPx = isActive ? defaultValues.labelActiveLeft : defaultValues.labelLeft
  if (!isActive && hasIcon.value && iconDirection.value === 'left') {
    leftPx += defaultValues.iconPaddingInput - defaultValues.labelLeft
  }
  let rightPx = isActive ? defaultValues.labelActiveRight : defaultValues.labelRight
  if (!isActive && hasIcon.value && iconDirection.value === 'right') {
    rightPx += defaultValues.iconPaddingInput - defaultValues.labelRight
  }

  return {
    fontFamily: defaultValues.fontFamilyLabel,
    fontSize: isActive ? defaultValues.fontSizeLabelActive : defaultValues.fontSizeLabel,
    fontWeight: defaultValues.fontWeightLabel,
    color: defaultValues.theme === 'dark' ? darkTextColorLabel : lightTextColorLabel,
    top: isActive ? `${defaultValues.labelActiveTop}px` : '50%',
    left: `${leftPx}px`,
    right: `${rightPx}px`,
    transform: isActive ? 'translateY(0)' : 'translateY(-50%)',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? defaultValues.labelBackground : 'transparent',
    padding: isActive ? defaultValues.labelPadding : '0',
    borderRadius: isActive ? `${defaultValues.labelBorderRadius}rem` : '0',
    // Se labelBreakOnActive for true (padrão), usa ellipsis quando ativo. Se false, quebra linha
    ...(isActive ? {
      whiteSpace: !labelBreakOnActive.value ? 'normal' : 'nowrap',
      wordWrap: !labelBreakOnActive.value ? 'break-word' : 'normal',
      overflowWrap: !labelBreakOnActive.value ? 'break-word' : 'normal',
      maxWidth: '100%',
      textOverflow: labelBreakOnActive.value ? 'ellipsis' : 'clip',
      overflow: labelBreakOnActive.value ? 'hidden' : 'visible',
    } : {}),
  }
})

/* Style label active */
const styleLabelActive = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.theme === 'dark' ? defaultValues.darkTextColorLabelActive : defaultValues.lightTextColorLabelActive
})

/* Style file list */
const styleFileList = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    fontFamily: defaultValues.fontFamilyFileList,
    fontSize: defaultValues.fontSizeFileList,
    fontWeight: defaultValues.fontWeightFileList,
    color: defaultValues.textFileListColor,
    padding: defaultValues.textFileListPadding,
    margin: defaultValues.textFileListMargin,
  }
})

/* Style constraints */
const styleConstraints = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    fontFamily: defaultValues.fontFamilyConstraints,
    fontSize: defaultValues.fontSizeConstraints,
    fontWeight: defaultValues.fontWeightConstraints,
    color: defaultValues.textConstraintsColor,
    padding: defaultValues.textConstraintsPadding,
    margin: defaultValues.textConstraintsMargin,
  }
})

/* Style counter */
const styleCounter = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    fontFamily: defaultValues.fontFamilyCounter,
    fontSize: defaultValues.fontSizeCounter,
    fontWeight: defaultValues.fontWeightCounter,
    color: defaultValues.textCounterColor,
    padding: defaultValues.textCounterPadding,
    margin: defaultValues.textCounterMargin,
  }
})

/* Style clear button */
const styleClearButton = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    fontFamily: defaultValues.fontFamilyClearButton,
    fontSize: defaultValues.fontSizeClearButton,
    fontWeight: defaultValues.fontWeightClearButton,
    color: defaultValues.textClearButtonColor,
    padding: defaultValues.textClearButtonPadding,
    background: defaultValues.textClearButtonBackground
  }
})

/* Style clear button padding hover */
const styleClearButtonPaddingHover = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.textClearButtonPaddingHover
})

/* Style clear button color hover */
const styleClearButtonColorHover = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.textClearButtonColorHover
})

/* Style clear button background hover */
const styleClearButtonBackgroundHover = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.textClearButtonBackgroundHover
})

/* Interacted */
const interacted = (event) => {
  // Emit clicked event
	emit('clicked', event)

  // Trigger file input
  triggerFileInput()
}

/* Clear validation errors */
const clearValidationErrors = ({ emitEvent = true } = {}) => {
  // Clear errors
  errors.value = []

  // Check if emit event
  if (emitEvent) {
    emit('validation-errors', [])
  }
}

/* Format bytes */
const formatBytes = (bytes) => {
  // Check if bytes is not valid
  if (!bytes || bytes <= 0) return '0 B'

  // Get units
  const units = ['B', 'KB', 'MB', 'GB', 'TB']

  // Get index of units
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)

  // Get value of bytes
  const value = bytes / Math.pow(1024, i)

  // Return formatted bytes with value and units
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[i]}`
}

/* Handle native input click */
const handleNativeInputClick = (event) => {
  // Stop event propagation
  event.stopPropagation()

  // Check if disabled or readonly
  if (disabled.value || formatDefaultValues.value.inputReadonly) return

  // Interact with event
  interacted(event)
}

/* Handle native input focus */
const handleNativeInputFocus = () => {
  // Check if is file dialog open and files is empty
  if (!isFileDialogOpen.value && files.value.length === 0) return

  // Set active state
  isActive.value = true
}

/* Close native file picker flow */
/**
 * Close native file picker flow: invalidate pending listeners and align label with actual files.
 * Used after cancel (cancel event), window focus (fallback) and after successful change (via increment of token in onChangeFile).
 */
const closeNativeFilePickerFlow = () => {
  // Increment file dialog token
  fileDialogToken.value++
  
  // Set file dialog open to false
  isFileDialogOpen.value = false

  // Get native files count
  const nativeFilesCount = inputRef.value?.files?.length || 0

  // Set active state
  isActive.value = files.value.length > 0 || nativeFilesCount > 0

  // Check if blur on dialog cancel and files is empty and native files count is empty
  if (blurOnDialogCancel.value && files.value.length === 0 && nativeFilesCount === 0) {
    // Blur input and file display
    inputRef.value?.blur?.()

    // Blur file display
    fileDisplayRef.value?.blur?.()
  }
}

/* Emit file dialog closed */
const emitFileDialogClosed = (reason = 'cancelled', selectedCount = 0) => {
  // Emit file dialog closed event
  emit('file-dialog-closed', { reason, selectedCount })
}

/* On native file picker cancel */
const onNativeFilePickerCancel = () => {
  // Default event when canceling the picker without choosing (Chrome 113+, Firefox, Safari 16.4+).
  // On Windows the `window` `focus` does not always trigger reliably when closing the modal.
  if (!isFileDialogOpen.value) return

  // Close native file picker flow
  closeNativeFilePickerFlow()

  // Emit file dialog closed event
  emitFileDialogClosed('cancelled', 0)
}

/* Trigger file input */
const triggerFileInput = () => {
  // Check if disabled or readonly
  if (disabled.value || formatDefaultValues.value.inputReadonly) return

  // Check if file dialog is open
  // Avoid duplicate attempts to open the native dialog on the same click gesture.
  if (isFileDialogOpen.value) return
  
  // Set active state
  isActive.value = true

  // Set file dialog open to true
  isFileDialogOpen.value = true
  
  // Get this dialog token
  const thisDialogToken = ++fileDialogToken.value

  // Sync active state after dialog
  const syncActiveStateAfterDialog = () => {
    // Check if this dialog token is not the same as the current file dialog token
    if (thisDialogToken !== fileDialogToken.value) return

    // Set file dialog open to false
    isFileDialogOpen.value = false

    // Get native files count
    const nativeFilesCount = inputRef.value?.files?.length || 0

    // Check if files is empty and native files count is empty
    if (files.value.length === 0 && nativeFilesCount === 0) {
      // Set active state to false
      isActive.value = false

      // Emit file dialog closed event
      emitFileDialogClosed('cancelled', 0)
    }
  }

  // Handle window focus after file dialog
  const handleWindowFocusAfterFileDialog = () => {
    // In some browsers, canceling the file dialog does not trigger `change`.
    // We synchronize the active state only when the window really returns focus.
    setTimeout(() => syncActiveStateAfterDialog(), 0)
  }

  // capture: true — in some environments the focus does not reach the target without capture
  window.addEventListener('focus', handleWindowFocusAfterFileDialog, { once: true, capture: true })

  // Check if input ref is valid
  if (inputRef.value) {
    // Set input value to null
    inputRef.value.value = null

    // Click input
    inputRef.value.click()
  }
}

/* On change file */
const onChangeFile = async (event) => {
  // Close the picker flow and invalidate the pending `focus` listener (same token as cancel).
  fileDialogToken.value++
  
  isFileDialogOpen.value = false // Set file dialog open to false
  
  clearValidationErrors({ emitEvent: false }) // Clear validation errors
  
  const selected = Array.from(event.target.files || []) // Get selected files
  const selectedCount = selected.length // Get selected count

  const batchKeys = new Set() // Set of batch keys
  const validFiles = [] // Array of valid files

  // Loop through selected files
  for (const file of selected) {
    // Validate incoming file
    const result = await validateIncomingFile(file, {
      accept: acceptedFileExtensions.value, // Accepted file extensions
      allowedExtensions: allowedExtensions.value, // Allowed extensions list
      maxFileSizeBytes: maxFileSizeBytes.value, // Max file size in bytes
      allowDuplicates: allowDuplicates.value, // Allow duplicates
      existingFiles: files.value, // Existing files
      batchKeySet: batchKeys, // Batch key set  
      gifWidth: gifWidth.value, // GIF width
      gifHeight: gifHeight.value, // GIF height
      videoRatio: videoRatio.value, // Video ratio
      videoMaxDuration: videoMaxDuration.value, // Video max duration
      videoAspectTolerance: videoAspectTolerance.value, // Video aspect tolerance
      locale: resolvedFileLocale.value, // Resolved file locale
    })

    // Check if result is not ok
    if (!result.ok) {
      // Build file validation error payload
      const payload = buildFileValidationErrorPayload(file, result.error, result.errorType)

      // Add error to errors array
      errors.value.push(payload)

      // Emit validation error event
      emit('validation-error', payload)

      // Continue to next file
      continue
    }

    // Add duplicate key to batch keys
    batchKeys.add(duplicateKey(file))

    // Add valid file to valid files array
    validFiles.push(file)
  }

  // Check if multiple
  if (multiple.value) {
    // Check if max files is not null
    if (maxFiles.value != null) {
      // Get remaining files
      const remaining = maxFiles.value - files.value.length

      // Check if remaining is less than or equal to 0
      if (remaining <= 0) {
        // Build file validation error payload
        const msg = formatLocaleMessage(resolvedFileLocale.value.maxFilesReached, {
          max: maxFiles.value,
        })

        // Build file validation error payload
        const payload = buildFileValidationErrorPayload(null, msg, FileValidationErrorType.MAX_FILES_REACHED)

        // Add error to errors array
        errors.value.push(payload)

        // Emit validation error event
        emit('validation-error', payload)

        // Clear valid files array
        validFiles.length = 0
      } else if (validFiles.length > remaining) {
        // Remove files from valid files array
        validFiles.splice(remaining)
      }
    }

    // Set files value to valid files array
    files.value = [...files.value, ...validFiles]
  } else {
    // Set files value to valid files array
    files.value = validFiles.length ? [validFiles[0]] : []
  }

  // Check if user canceled selection and there are no files, deactivate visual state
  isActive.value = files.value.length > 0

  emit('validation-errors', [...errors.value]) // Emit validation errors event
  emit('changed', files.value) // Emit changed event
  emit('current-value', files.value) // Emit current value event

  // Emit file dialog closed event
  emitFileDialogClosed(selectedCount > 0 ? 'selected' : 'cancelled', selectedCount)
}

/* Handle file input blur */
const handleFileInputBlur = () => {
  // While the native dialog is open, do not deactivate the label
  if (isFileDialogOpen.value) return

  // Set active state
  isActive.value = files.value.length > 0
}

/* Handle file display focus */
const handleFileDisplayFocus = (event) => {
  // Only animate the label on keyboard focus. Focus on mouse click usually triggers before the click
  // and breaks the opening of the picker in some browsers (active state without modal).
  // Get target element
  const el = event?.target

  // Check if element is valid and matches focus visible
  if (el && typeof el.matches === 'function' && el.matches(':focus-visible')) {
    // Set active state
    isActive.value = true
  }
}

/* Handle file display blur */
const handleFileDisplayBlur = () => {
  // Handle file input blur
  handleFileInputBlur()
}

/* On file display click */
const onFileDisplayClick = (event) => {
  // Stop event propagation
  event.stopPropagation()

  // Check if disabled or readonly
  if (disabled.value || formatDefaultValues.value.inputReadonly) return

  // Interact with event
  interacted(event)
}

/* On file display keydown */
const onFileDisplayKeydown = (e) => {
  // Check if disabled or readonly or has tab index enter
  if (disabled.value || formatDefaultValues.value.inputReadonly || !hasTabIndexEnter.value) return

  // Check if key is enter or space
  if (e.key === 'Enter' || e.key === ' ') {
    // Prevent default
    e.preventDefault()

    // Trigger file input
    triggerFileInput()
  }
}

/*
  Handle label click
  This function prevents the event from being captured by the parent @click="interacted" and focuses the input explicitly.
*/
const handleLabelClick = (event) => {
  // Prevent event from being captured by the parent @click="interacted" and focus the input explicitly.
  event.preventDefault()
  event.stopPropagation()
  
  // Check if component is disabled or readonly
  if (disabled.value || formatDefaultValues.value.inputReadonly) {
    return
  }
  
  // Trigger file input
  triggerFileInput()
}

/* Remove file */
const removeFile = (index) => {
  // Check if index is less than 0 or greater than or equal to files length
  if (index < 0 || index >= files.value.length) return
  
  // Clear validation errors
  clearValidationErrors()
  
  // Filter files array
  files.value = files.value.filter((_, i) => i !== index)
  
  // Set active state
  isActive.value = files.value.length > 0

  // Check if files is empty and input ref is valid
  if (files.value.length === 0 && inputRef.value) {
    // Set input value to empty string
    inputRef.value.value = ''
  }

  emit('changed', files.value) // Emit changed event
  emit('current-value', files.value) // Emit current value event
}

/* Remove all files */
const removeAllFiles = () => {
  // Clear validation errors
  clearValidationErrors()
  
  // Set files value to empty array
  files.value = []
  
  // Set active state
  isActive.value = false
  
  // Check if input ref is valid
  if (inputRef.value) {
    // Set input value to empty string
    inputRef.value.value = ''
  }
  
  emit('changed', []) // Emit changed event
  emit('current-value', [])
}

/* Watch is active */
watch(isActive, value => {
  if (value) {
    emit('focused') // Emit focused event
  } else {
    emit('blurred') // Emit blurred event
  }
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

.nb-wrapper {
	margin: 0;
	padding: 0;
	font-size: 62.5%;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	vertical-align: bottom;
	position: relative;
}

.nb-reset {
	font-family: 'Lato', sans-serif;
	font-style: normal;
	font-weight: light;
	line-height: 1.42857143;

	* {
		margin: 0;
		padding: 0;
	}
	*,
	*::before,
	*::after {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
}

.component {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	line-height: 1.42857143;
	font-family: v-bind('font');
	position: relative;

	user-select: none;

	touch-action: manipulation;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	cursor: pointer;
	text-align: center;
	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;
  
  // Component style start below:
  margin-bottom: 3px;
  text-align: left;
  position: relative;
  margin: 0;
  padding: 0;
  height: 28px;
  max-height: 28px;
  display: inline-block;

  // inicio sizeMediaQuery
  &.component__sm {
      height: 32.39px;
      max-height: 32.39px;

      .component__input {
        font-size: v-bind('fontSizeStyle');
      }

      .component__icon {
        padding: 5px 10px;
      }
    }
    &.component__md {
      height: 48px;
      max-height: 48px;

      .component__input {
        font-size: v-bind('fontSizeStyle');
      }

      .component__icon {
        padding: 10px 10px;
      }
    }
    &.component__lg {
      height: 58px;
      max-height: 58px;

      .component__input {
        font-size: v-bind('fontSizeStyle');
      }
    }
    // fim sizeMediaQuery

    .component__icon {
      color: v-bind('lightTextColor');
    }

    .component__input {
      color: v-bind('lightTextColor');
      caret-color: v-bind('styleCaretColor');
      
      &::selection {
        background-color: v-bind('styleSelectionBgColor');
        color: v-bind('styleSelectionTextColor');
      }
      
      &::-moz-selection {
        background-color: v-bind('styleSelectionBgColor');
        color: v-bind('styleSelectionTextColor');
      }
    }

    // inicio propTheme
    &.component__theme--dark {
      .component__icon {
        color: v-bind('iconDarkTextColor');
      }

      .component__input {
        color: v-bind('darkTextColor');
      }

      &.component__input--disabled,
      &.component__input--read-only {
        &.component__input--background {
          .component__icon {
            background-color: v-bind('iconDarkDisabledBgColor');

            &:hover {
              cursor: not-allowed;
            }
          }

          .component__input {
            background-color: v-bind('darkDisabledBgColor');
            &:focus,
            &:active {
              background-color: v-bind('darkDisabledBgColor');

              &::placeholder,
              &::placeholder:active,
              &::placeholder:focus {
                background-color: v-bind('darkDisabledBgColor');
              }
            }

            &::placeholder,
            &::placeholder:active,
            &::placeholder:focus {
              background-color: v-bind('darkDisabledBgColor');
            }
          }
        }

        &.component__input--line {
          .component__icon {
            opacity: 0.2;
          }

          .component__input {
            border-bottom: 1px solid v-bind('darkDisabledControlBorderColor');

            &:focus,
            &:active {
              border-bottom: 1px solid v-bind('darkDisabledControlBorderColor');
            }
          }
        }

        &.component__input--border {
          .component__icon {
            opacity: 0.2;
          }

          .component__input {
            border: 1px solid v-bind('darkDisabledControlBorderColor');

            &:focus,
            &:active {
              border: 1px solid v-bind('darkDisabledControlBorderColor');
            }
          }
        }
      }

      &.component__input--background {
        .component__icon {
          background-color: v-bind('styleIconBgColor');

          &:hover {
            cursor: pointer;
          }
        }

        .component__input {
          background-color: v-bind('darkBgColor');

          &:focus,
          &:active {
            background-color: v-bind('darkBgColorFocus');

            &::placeholder,
            &::placeholder:active,
            &::placeholder:focus {
              opacity: 0.5;
            }
          }

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            opacity: 0.5;
          }
        }
      }

      &.component__input--line {
        .component__icon {
          background-color: transparent;
          opacity: 1;
        }

        .component__input {
          background-color: transparent;
          border: 0;
          border-bottom: 1px solid v-bind('darkControlBorderColor');

          &:focus,
          &:active {
            background-color: transparent;
            border: 0;
            border-bottom: 1px solid v-bind('darkControlBorderColorActive');
          }
        }
      }

      &.component__input--border {
        .component__icon {
          background-color: transparent;
          opacity: 1;
        }

        .component__input {
          background-color: transparent;
          border: 1px solid v-bind('darkControlBorderColor');

          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid v-bind('darkControlBorderColorActive');
          }
        }
      }
    }
    &.component__theme--light {
      .component__icon {
        color: v-bind('iconLightTextColor');
      }

      .component__input {
        color: v-bind('lightTextColor');
      }

      &.component__input--disabled,
      &.component__input--read-only {
        &.component__input--background {
          .component__icon {
            background-color: v-bind('iconLightDisabledBgColor');

            &:hover {
              cursor: not-allowed;
            }
          }

          .component__input {
            background-color: v-bind('lightDisabledBgColor');
            &:focus,
            &:active {
              background-color: v-bind('lightDisabledBgColor');

              &::placeholder,
              &::placeholder:active,
              &::placeholder:focus {
                background-color: v-bind('lightDisabledBgColor');
              }
            }

            &::placeholder,
            &::placeholder:active,
            &::placeholder:focus {
              background-color: v-bind('lightDisabledBgColor');
            }
          }
        }

        &.component__input--line {
          .component__icon {
            opacity: 0.2;
          }

          .component__input {
            border-bottom: 1px solid v-bind('lightDisabledControlBorderColor');

            &:focus,
            &:active {
              border-bottom: 1px solid v-bind('lightDisabledControlBorderColor');
            }
          }
        }

        &.component__input--border {
          .component__icon {
            opacity: 0.2;
          }

          .component__input {
            border: 1px solid v-bind('lightDisabledControlBorderColor');

            &:focus,
            &:active {
              border: 1px solid v-bind('lightDisabledControlBorderColor');
            }
          }
        }
      }

      &.component__input--background {
        .component__icon {
          background-color: v-bind('styleIconBgColor');

          &:hover {
            cursor: pointer;
          }
        }

        .component__input {
          background-color: v-bind('lightBgColor');

          &:focus,
          &:active {
            background-color: v-bind('lightBgColorFocus');

            &::placeholder,
            &::placeholder:active,
            &::placeholder:focus {
              opacity: 0.5;
            }
          }

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            opacity: 0.5;
          }
        }
      }

      &.component__input--line {
        .component__icon {
          background-color: transparent;
          opacity: 1;
        }

        .component__input {
          background-color: transparent;
          border: 0;
          border-bottom: 1px solid v-bind('lightControlBorderColor');

          &:focus,
          &:active {
            background-color: transparent;
            border: 0;
            border-bottom: 1px solid v-bind('lightControlBorderColorActive');
          }
        }
      }

      &.component__input--border {
        .component__icon {
          background-color: transparent;
          opacity: 1;
        }

        .component__input {
          background-color: transparent;
          border: 1px solid v-bind('lightControlBorderColor');

          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid v-bind('lightControlBorderColorActive');
          }
        }
      }
    }
    // fim propTheme

    // inicio propReadonly
    &.component__input--read-only {
      .component__input {
        filter: alpha(opacity=55);
        -moz-opacity: 0.55;
        opacity: 0.55;

        &:focus,
        &:active,
        &:hover {
          cursor: not-allowed;
        }
      }
    }
    // fim propReadonly

    .component__label {
      position: absolute;
      z-index: 1;
      pointer-events: none;

      .component__label--required {
        color: red;
        display: contents;
      }
    }

    .component__icon {
      position: absolute;
      width: v-bind('styleIconWidth');
      top: 0;
      bottom: 0;
      padding: v-bind('styleIconPadding');
      margin: v-bind('styleIconMargin');
      border-radius: v-bind('styleIconBorderRadius');
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      font-size: v-bind('styleIconSize');

      &.component__icon--left {
        right: auto;
        left: 0;
      }

      &.component__icon--right {
        right: 0;
        left: auto;
      }

      &:hover {
        cursor: pointer;
      }
    }

    // inicio INPUT
    .component__input {
      width: 100%;
      height: 100%;
      font-family: inherit;
      font-style: normal;
      font-weight: normal;
      font-size: v-bind('fontSizeStyle');
      line-height: 1.5;
      border: 0;
      border-radius: 0;
      text-shadow: 0;
      position: relative;
      outline: none;
      background-color: transparent;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      text-align: v-bind('textAlign');
      padding: v-bind('inputPadding');

      &:focus,
      &:active {
        border: 0;
      }

      // inicio propActiveStyle
      &.component__input--active--italic:focus,
      &.component__input--active--italic:active {
        font-style: italic;
      }
      &.component__input--active--oblique:focus,
      &.component__input--active--oblique:active {
        font-style: oblique;
      }
      &.component__input--active--normal:focus,
      &.component__input--active--normal:active {
        font-style: normal;
      }
      // fim propActiveStyle

      // inicio propUppercase
      &.component__input--uppercase {
        text-transform: uppercase;

        &::placeholder {
          text-transform: none;
        }
      }
      // fim propUppercase
    }
    // fim INPUT
}

.component__message {
  &.component__message--default {
    font-family: v-bind('fontMessage');
    font-size: v-bind('fontSizeMessage');
    font-weight: v-bind('fontWeightMessage');
    color: v-bind('styleTextMessageColor');
    padding-left: 2px;
    margin-top: 2px;
  }
}

.component__file-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
  width: 100%;
  text-align: left;

  /* UA default `ul` adds large padding-left for markers outside the box */
  .component__file-list-items {
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: 10px;

    .component__file-list-item {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      line-height: 1.35;
      gap: 6px;
      margin: 0;
      padding: 0;
      text-align: left;

      &::before {
        content: '•';
        flex-shrink: 0;
      }

      .component__file-list-item-name {
        min-width: 0;
      }

      .component__file-list-item-remove {
        flex-shrink: 0;
        cursor: pointer;
        margin-left: 2px;
        color: #b42318;

        &:hover {
          color: #991b1b;
        }
      }
    }
  }
}

.component__file-info {
  width: 100%;
  font-size: 1.3em;
  text-align: left;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.component__extra-content {
  position: relative;
  box-sizing: border-box;
}

.component__extra-content--absolute {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  z-index: 1;
}

.component__file-constraints-counter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.component__file-errors {
  margin-top: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ffc6c6;
  background: #ffe7e7;
  color: #b42318;
}

.component__file-error {
  font-size: 1.2em;
}

.component__file-native {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

.component__input--file-display {
  display: flex;
  align-items: center;

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
}

.component__file-clear {
  cursor: pointer;
  align-content: center;

  &:hover {
    background: v-bind('styleClearButtonBackgroundHover') !important;
    color: v-bind('styleClearButtonColorHover') !important;
    padding: v-bind('styleClearButtonPaddingHover') !important;
  }
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	opacity: 0.8;

	.component {
		--disabled-button-color: v-bind('styleButtonColor');
		--disabled-color: v-bind('styleTextColor');
		background-color: var(--disabled-button-color) !important;
		color: var(--disabled-color) !important;
		border-radius: inherit;

    .component__input {
      &:focus,
      &:active {
        background-color: #f15574;
      }
    }
	}
}
</style>
