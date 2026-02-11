<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle, inputWidthStyle, borderRadiusStyle]"
    role="input"
    v-bind="computedAriaAttrs"
  >
    <div
      :id="nbId"
      :class="['nb-reset', 'component', themeStyle, componentReadonly, inputStyleClass]"
      :style="[componentStyle, inputWidthStyle, borderRadiusStyle]"
      @click="interacted"
    >
      <label
        v-if="showLabel"
        :for="computedInputName"
        class="component__label"
        :style="[styleLabel]"
      >{{ label }}</label>

      <textarea
        v-model="inputValue"
        :id="computedInputName"
        :name="computedInputName"
        v-bind="textareaConfig"
        class="component__input"
        :class="[
          uppercaseStyle,
          activeStyle
        ]"
        :placeholder="computedPlaceholder"
        :disabled="disabled || inputReadonly"
        :required="required"
        :readonly="inputReadonly"
        :autocomplete="inputAutocomplete"
        :tabindex="disabled || inputReadonly ? -1 : tabindex"
        role="textbox"
        :style="[borderRadiusStyle, textareaResizeStyle, textareaWrapStyle]"
        @focus="isActive = true"
        @blur="isActive = false"
        @input="handleCurrentValue"
        @keydown.enter="!disabled && hasTabIndexEnter && enterConfirm()"
      ></textarea>
    </div>
    <div
      v-if="validShowMsg"
      :class="['component__message', hasCustomMsg ? 'component__message--custom' : 'component__message--default']"
    >
      <slot name="message">{{ message }}</slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, onUnmounted, watch } from 'vue'

defineOptions({
	name: 'NbTextarea',
	inheritAttrs: false
})

onMounted(() => {
  inputValue.value = inputText.value
})
onUnmounted(() => {
  startValue()
})

const emit = defineEmits([
  'current-value',
  'changed',
  'focused',
  'blurred',
  'clicked',
  'entered'
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
    default: true
  },
  ariaLabel: {
    type: String,
    default: 'Alternate Text Button'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
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
  textAlign: {
    type: String,
    default: 'left',
    validator: value => {
      return ['center', 'left', 'right'].indexOf(value) !== -1
    },
  },
  inputText: {
    type: String,
    default: '',
  },
  hasTrim: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
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
  activeTextStyle: {
    type: String,
    default: 'normal',
    validator: value => {
      return ['normal', 'italic', 'oblique'].indexOf(value) !== -1
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
  inputAutocomplete: {
    type: String,
    default: 'on',
    validator: value => {
      return ['on', 'off'].indexOf(value) !== -1
    },
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
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
	},
	darkTextColor: {
		type: String,
		default: '#000000'
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
  rows: { // Quantidade de linhas
    type: Number,
    default: 2,
    validator: value => {
      return value > 0
    },
  },
  cols: { // Quantidade de colunas
    type: Number,
    default: 20,
    validator: value => {
      return value > 0
    },
  },
  maxlength: { // Quantidade máxima de caracteres
    type: Number,
    default: null,
    validator: value => {
      return value === null || value >= 0
    },
  },
  minlength: { // Quantidade mínima de caracteres
    type: Number,
    default: null,
    validator: value => {
      return value === null || value >= 0
    },
  },
  wrap: { // Tipo de quebra de linha
    type: String,
    default: 'soft', // soft: quebra de linha automática (quebra visual, sem quebra no envio), hard: quebra de linha forçada (quebra visual e no envio), off: sem quebra de linha (não quebra visualmente)
    validator: value => {
      return ['soft', 'hard', 'off'].indexOf(value) !== -1
    },
  },
  spellcheck: { // Verificação ortográfica
    type: [Boolean, String],
    default: 'default',
    validator: value => {
      if (typeof value === 'boolean') return true
      return value === 'default'
    },
  },
  autofocus: { // Focus automático
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  resize: { // Tipo de redimensionamento
    type: String,
    default: 'vertical',
    validator: value => {
      return ['none', 'both', 'vertical', 'horizontal'].indexOf(value) !== -1
    },
  },
  autoResize: { // Redimensionamento automático
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  minRows: { // Quantidade mínima de linhas
    type: Number,
    default: null,
    validator: value => {
      return value === null || value > 0
    },
  },
  maxRows: { // Quantidade máxima de linhas
    type: Number,
    default: null,
    validator: value => {
      return value === null || value > 0
    },
  }
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
	inputWidth,
      inputStyle,
      activeTextStyle,
      inputReadonly,
  hasTrim,
  inputUppercase,
  inputName,
  inputPlaceholder,
  inputText,
  theme,
  tabindex,
	lightBgColor,
	lightBgColorFocus,
	lightDisabledBgColor,
	lightTextColor,
	darkBgColor,
	darkBgColorFocus,
	darkDisabledBgColor,
	darkTextColor,
  textAlign,
    showMsg,
    hasMsg,
    showLabel,
  labelBackground,
  labelPadding,
  labelBorderRadius,
  labelLeft,
  inputLabelMarginActive,
  labelActiveTop,
  labelActiveLeft,
  fontFamilyLabel,
  fontSizeLabel,
  fontSizeLabelActive,
  fontWeightLabel,
  lightTextColorLabel,
  lightTextColorLabelActive,
  darkTextColorLabel,
  darkTextColorLabelActive,
  rows,
  cols,
  maxlength,
  minlength,
  wrap,
  spellcheck,
  autofocus,
  resize,
  autoResize,
  minRows,
  maxRows
} = toRefs(props)

const inputValue = ref('')
const isActive = ref(false)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const textColorValue = !textColor ? 'ffffff' : textColor.value
	const caretColorValue = !caretColor.value ? '' : caretColor.value
	const selectionBgColorValue = !selectionBgColor.value ? '' : selectionBgColor.value
	const selectionTextColorValue = !selectionTextColor.value ? '' : selectionTextColor.value
  const hasBorderRadiusValue = !hasBorderRadius.value ? false : hasBorderRadius.value
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
  const fontSizeValue = !fontSize.value ? '1.4em' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 100 : fontWeight.value
  const fontFamilyMsgValue = !fontFamilyMsg.value ? `'Lato', sans-serif` : fontFamilyMsg.value
  const fontSizeMsgValue = !fontSizeMsg.value ? '1em' : fontSizeMsg.value
  const fontWeightMsgValue = ((fontWeightMsg.value !== 0 && !fontWeightMsg.value) || fontWeightMsg.value < 0) ? 100 : fontWeightMsg.value
  const textMessageColorValue = !textMessageColor.value ? '#f15574' : textMessageColor.value
  const inputWidthValue = !inputWidth.value ? 200 : inputWidth.value
  const activeTextStyleValue = !activeTextStyle.value ? 'normal' : activeTextStyle.value
  const inputReadonlyValue = !inputReadonly.value ? false : inputReadonly.value
  const inputUppercaseValue = !inputUppercase.value ? false : inputUppercase.value
  const themeValue = !theme.value ? 'normal' : theme.value
  const textAlignValue = !textAlign.value ? 'left' : textAlign.value
  const inputStyleValue = !inputStyle.value ? 'background' : inputStyle.value

  const showLabelValue = !showLabel.value ? false : showLabel.value
  const labelLeftValue = ((labelLeft.value !== 0 && !labelLeft.value) || labelLeft.value < 0) ? 5 : labelLeft.value
  const labelBackgroundValue = !labelBackground.value ? 'transparent' : labelBackground.value
  const inputLabelMarginActiveValue = ((inputLabelMarginActive.value !== 0 && !inputLabelMarginActive.value) || inputLabelMarginActive.value < 0) ? 15 : inputLabelMarginActive.value
  const labelPaddingValue = !labelPadding.value ? '1px 5px' : labelPadding.value
  const labelBorderRadiusValue = ((labelBorderRadius.value !== 0 && !labelBorderRadius.value) || labelBorderRadius.value < 0) ? 0 : labelBorderRadius.value
  const labelActiveTopValue = (labelActiveTop.value === null || labelActiveTop.value === undefined) ? -13 : labelActiveTop.value
  const labelActiveLeftValue = (labelActiveLeft.value === null || labelActiveLeft.value === undefined) ? -10 : labelActiveLeft.value
  const fontFamilyLabelValue = !fontFamilyLabel.value ? `'Lato', sans-serif` : fontFamilyLabel.value
  const fontSizeLabelValue = !fontSizeLabel.value ? '1em' : fontSizeLabel.value
  const fontSizeLabelActiveValue = !fontSizeLabelActive.value ? '0.8em' : fontSizeLabelActive.value
  const fontWeightLabelValue = !fontWeightLabel.value ? 400 : fontWeightLabel.value
  const lightTextColorLabelValue = !lightTextColorLabel.value ? '#ffffff' : lightTextColorLabel.value
  const darkTextColorLabelValue = !darkTextColorLabel.value ? '#000000' : darkTextColorLabel.value
  const lightTextColorLabelActiveValue = !lightTextColorLabelActive.value ? '#ffffff' : lightTextColorLabelActive.value
  const darkTextColorLabelActiveValue = !darkTextColorLabelActive.value ? '#000000' : darkTextColorLabelActive.value

  const rowsValue = rows.value && rows.value > 0 ? rows.value : 2
  const colsValue = cols.value && cols.value > 0 ? cols.value : 20
  const maxlengthValue = maxlength.value !== null && maxlength.value >= 0 ? maxlength.value : null
  const minlengthValue = minlength.value !== null && minlength.value >= 0 ? minlength.value : null
  const wrapValue = wrap.value && ['soft', 'hard', 'off'].includes(wrap.value) ? wrap.value : 'soft'
  const spellcheckValue = spellcheck.value !== undefined ? spellcheck.value : 'default'
  const autofocusValue = autofocus.value !== undefined ? autofocus.value : false
  const resizeValue = resize.value && ['none', 'both', 'vertical', 'horizontal'].includes(resize.value) ? resize.value : 'vertical'
  const autoResizeValue = autoResize.value !== undefined ? autoResize.value : false
  const minRowsValue = minRows.value !== null && minRows.value > 0 ? minRows.value : null
  const maxRowsValue = maxRows.value !== null && maxRows.value > 0 ? maxRows.value : null

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
      inputReadonly: inputReadonlyValue,
      inputUppercase: inputUppercaseValue,
      theme: themeValue,
      inputStyle: inputStyleValue,
      showLabel: showLabelValue,
    labelBackground: labelBackgroundValue,
    labelPadding: labelPaddingValue,
    labelBorderRadius: labelBorderRadiusValue,
    labelLeft: labelLeftValue,
    inputLabelMarginActive: inputLabelMarginActiveValue,
    labelActiveTop: labelActiveTopValue,
    labelActiveLeft: labelActiveLeftValue,
    fontFamilyLabel: fontFamilyLabelValue,
    fontSizeLabel: fontSizeLabelValue,
    fontSizeLabelActive: fontSizeLabelActiveValue,
    fontWeightLabel: fontWeightLabelValue,
    lightTextColorLabel: lightTextColorLabelValue,
    darkTextColorLabel: darkTextColorLabelValue,
    lightTextColorLabelActive: lightTextColorLabelActiveValue,
    darkTextColorLabelActive: darkTextColorLabelActiveValue,
    rows: rowsValue,
    cols: colsValue,
    maxlength: maxlengthValue,
    minlength: minlengthValue,
    wrap: wrapValue,
    spellcheck: spellcheckValue,
    autofocus: autofocusValue,
    resize: resizeValue,
    autoResize: autoResizeValue,
    minRows: minRowsValue,
    maxRows: maxRowsValue,
	}
})
const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabled
})
const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		display: defaultValues.display
	}
})
const fontSizeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  
  if (defaultValues.fontSize) return defaultValues.fontSize

  return '1.4em'
})
const componentStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  const isActive = isLabelActive.value

	return {
		fontWeight: defaultValues.fontWeight,
		marginTop: isActive && showLabel.value ? `${defaultValues.inputLabelMarginActive}px` : '0',
	}
})
const borderRadiusStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  if (defaultValues.inputStyle !== 'line' && defaultValues.hasBorderRadius) {
    return { borderRadius: `${defaultValues.borderRadius}rem` }
  }

  return {}
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})
const fontMessage = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.fontFamilyMsg
})
const fontSizeMessage = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.fontSizeMsg
})
const fontWeightMessage = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.fontWeightMsg
})
const styleTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textColor
})
const styleTextMessageColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textMessageColor
})
const styleCaretColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.caretColor || (defaultValues.theme === 'dark' ? '#00d4ff' : '#007bff')
})

const styleSelectionBgColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.selectionBgColor || (defaultValues.theme === 'dark' ? '#00d4ff' : '#007bff')
})

const styleSelectionTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.selectionTextColor || (defaultValues.theme === 'dark' ? '#000000' : '#ffffff')
})

const inputWidthStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  if (defaultValues.display === 'block') return { width: '100%' }

  return {
    width: `${defaultValues.inputWidth}px`
  }
})
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
const themeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  switch (defaultValues.theme) {
    case 'dark':
      return 'component__theme--dark'
    default:
      return 'component__theme--light'
  }
})
const componentReadonly = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.inputReadonly ? 'component__input--read-only' : ''
})
const uppercaseStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.inputUppercase ? 'component__input--uppercase' : ''
})
const computedInputName = computed(() => {
  return inputName.value ? inputName.value : `${nbId.value}-name-label`
})
const computedPlaceholder = computed(() => {
  // Se não houver label, sempre mostra o placeholder
  if (!showLabel.value) {
    return inputPlaceholder.value
  }
  // Se houver label, só mostra o placeholder quando o input estiver ativo
  return isActive.value ? inputPlaceholder.value : ''
})
const isLabelActive = computed(() => {
  // Label está ativo se o input estiver focado OU se tiver conteúdo
  return isActive.value || (inputValue.value && inputValue.value.trim().length > 0)
})
const activeInput = computed(() => {
  return isActive.value ? 'component__input--active' : 'component__input--no-active'
})
const inputPadding = computed(() => {
  return '6px 10px'
})
const validShowMsg = computed(() => {
  return !!(showMsg.value && hasMsg.value)
})
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


const styleLabel = computed(() => {
  const defaultValues = formatDefaultValues.value
  const isActive = isLabelActive.value

  const lightTextColorLabel = isActive ? defaultValues.lightTextColorLabelActive : defaultValues.lightTextColorLabel
  const darkTextColorLabel = isActive ? defaultValues.darkTextColorLabelActive : defaultValues.darkTextColorLabel

  return {
    fontFamily: defaultValues.fontFamilyLabel,
    fontSize: isActive ? defaultValues.fontSizeLabelActive : defaultValues.fontSizeLabel,
    fontWeight: defaultValues.fontWeightLabel,
    color: defaultValues.theme === 'dark' ? darkTextColorLabel : lightTextColorLabel,
    top: isActive ? `${defaultValues.labelActiveTop}px` : '50%',
    left: isActive ? `${defaultValues.labelActiveLeft}px` : `${defaultValues.labelLeft}px`,
    transform: isActive ? 'translateY(0)' : 'translateY(-50%)',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? defaultValues.labelBackground : 'transparent',
    padding: isActive ? defaultValues.labelPadding : '0',
    borderRadius: isActive ? `${defaultValues.labelBorderRadius}rem` : '0',
  }
})
const styleLabelActive = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.theme === 'dark' ? defaultValues.darkTextColorLabelActive : defaultValues.lightTextColorLabelActive
})
const textareaConfig = computed(() => {
  const defaultValues = formatDefaultValues.value

  const config = {
    rows: defaultValues.rows,
    cols: defaultValues.cols,
    wrap: defaultValues.wrap,
    spellcheck: defaultValues.spellcheck === 'default' ? undefined : defaultValues.spellcheck,
    autofocus: defaultValues.autofocus || undefined
  }

  // Adiciona maxlength apenas se fornecido
  if (defaultValues.maxlength !== null) {
    config.maxlength = defaultValues.maxlength
  }

  // Adiciona minlength apenas se fornecido
  if (defaultValues.minlength !== null) {
    config.minlength = defaultValues.minlength
  }

  return config
})
const textareaResizeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    resize: defaultValues.resize
  }
})
const textareaWrapStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  // Para wrap="off", adiciona estilos para evitar quebra visual
  if (defaultValues.wrap === 'off') {
    return {
      whiteSpace: 'nowrap',
      overflowX: 'auto'
    }
  }

  return {}
})
const startValue = () => {
  inputValue.value = inputText.value
}

const interacted = () => {
	emit('clicked')
}
const enterConfirm = () => {
  if (disabled.value || formatDefaultValues.value.inputReadonly || !hasTabIndexEnter.value) return

  emit('entered', inputValue.value)
}
const handleCurrentValue = () => {
  let value = inputValue.value
  if (hasTrim.value) value = value.trim()
  emit('current-value', value)
}

watch(inputText, value => {
  if (value !== inputValue.value) inputValue.value = value
}, { immediate: true })
watch(inputValue, value => {
  if (hasTrim.value) value = value.trim()

  emit('changed', value)
})
watch(isActive, value => {
  if (value) {
    emit('focused')
  } else {
    emit('blurred')
  }
})
watch(inputValue, () => {
  handleCurrentValue()
}, { immediate: true })
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
      .component__input {
        color: v-bind('darkTextColor');
      }

      &.component__input--disabled,
      &.component__input--read-only {
        &.component__input--background {


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


          .component__input {
            border-bottom: 1px solid v-bind('darkDisabledBgColor');

            &:focus,
            &:active {
              border-bottom: 1px solid v-bind('darkDisabledBgColor');
            }
          }
        }

        &.component__input--border {


          .component__input {
            border: 1px solid v-bind('darkDisabledBgColor');

            &:focus,
            &:active {
              border: 1px solid v-bind('darkDisabledBgColor');
            }
          }
        }
      }

      &.component__input--background {

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
        .component__input {
          background-color: transparent;
          border: 0;
          border-bottom: 1px solid v-bind('darkBgColor');

          &:focus,
          &:active {
            background-color: transparent;
            border: 0;
            border-bottom: 1px solid v-bind('darkBgColorFocus');
          }
        }
      }

      &.component__input--border {
        .component__input {
          background-color: transparent;
          border: 1px solid v-bind('darkBgColor');

          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid v-bind('darkBgColorFocus');
          }
        }
      }
    }
    &.component__theme--light {
      .component__input {
        color: v-bind('lightTextColor');
      }

      &.component__input--disabled,
      &.component__input--read-only {
        &.component__input--background {

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


          .component__input {
            border-bottom: 1px solid v-bind('lightDisabledBgColor');

            &:focus,
            &:active {
              border-bottom: 1px solid v-bind('lightDisabledBgColor');
            }
          }
        }

        &.component__input--border {


          .component__input {
            border: 1px solid v-bind('lightDisabledBgColor');

            &:focus,
            &:active {
              border: 1px solid v-bind('lightDisabledBgColor');
            }
          }
        }
      }

      &.component__input--background {

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
        .component__input {
          background-color: transparent;
          border: 0;
          border-bottom: 1px solid v-bind('lightBgColor');

          &:focus,
          &:active {
            background-color: transparent;
            border: 0;
            border-bottom: 1px solid v-bind('lightBgColorFocus');
          }
        }
      }

      &.component__input--border {
        .component__input {
          background-color: transparent;
          border: 1px solid v-bind('lightBgColor');

          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid v-bind('lightBgColorFocus');
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
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      z-index: 1;
      transition: top 0.2s ease;
    }

    &:has(.component__input:focus) .component__label,
    &:has(.component__input:active) .component__label {
      top: -10px;
      transform: translateY(0);
    }

    // inicio TEXTAREA
    .component__input {
      width: 100%;
      min-height: 100%;
      height: auto;
      overflow-y: auto;
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

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	// background-color: #ffffff;
	opacity: 0.8;

	.component {
		--disabled-button-color: v-bind('styleButtonColor');
		--disabled-color: v-bind('styleTextColor');
		// background-color: var(--disabled-button-color) !important;
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
