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
      :class="['nb-reset', 'component', sizeMediaQueryStyle, themeStyle, componentReadonly, inputStyleClass]"
      :style="[componentStyle, inputWidthStyle, borderRadiusStyle]"
      @click="interacted"
    >
      <label
        v-if="showLabel"
        :for="computedInputName"
        class="component__label"
        :style="[styleLabel]"
      >{{ label }}</label>

      <div
        v-if="validShowInputEye"
        :class="['component__eye', activeInput]"
        :style="[borderRadiusStyle]"
        @click="changeShowValue"
      >
        <label
          :for="computedInputName"
          :class="['component__eye-icon', 'fas']"
        >
          <span v-if="!inputEyeCustomIcon">{{ inputIcon }}</span>
          <span v-else>
            <slot v-if="showValue" name="eye-icon-show">show</slot>
            <slot v-else name="eye-icon-hidden">hidden</slot>
          </span>
        </label>
      </div>
      <input
        v-model="inputValue"
        :id="computedInputName"
        :name="computedInputName"
        :type="currentType"
        class="component__input"
        :class="[
          uppercaseStyle,
          hiddenDefaultEye,
          activeStyle
        ]"
        :placeholder="computedPlaceholder"
        :disabled="disabled || inputReadonly"
        :required="required"
        :readonly="inputReadonly"
        :autocomplete="inputAutocomplete"
        :tabindex="disabled || inputReadonly ? -1 : tabindex"
        role="input"
        :style="[borderRadiusStyle, inputIconStyle]"
        @focus="isActive = true"
        @blur="isActive = false"
        @keydown.enter="!disabled && hasTabIndexEnter && enterConfirm()"
      />

      <label :for="computedInputName" v-if="hasIcon" :class="['component__icon', styleIconDirection]">
        <slot name="icon">
          <span>&#9829;</span>
        </slot>
      </label>
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
	name: 'NbInput',
	inheritAttrs: false
})

onMounted(() => {
  if (inputText.value != null) {
    if (inputType.value === 'number' && typeof inputText.value === 'number') {
      inputValue.value = inputText.value
    } else {
      inputValue.value = String(inputText.value)
    }
  } else {
    inputValue.value = ''
  }
})
onUnmounted(() => {
  startValue()
})

const emit = defineEmits([
  'current-value',
  'changed',
  'focused',
  'blurred',
  'show-input-eye',
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
    type: [String, Number],
    default: null,
  },
  inputType: {
    type: String,
    default: 'text',
    validator: value => { // TESTAR AINDA: 'tel', 'url'
      return ['text', 'number', 'email', 'password'].indexOf(value) !== -1
    },
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
  showInputEye: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  inputEyeIcon: {
    type: String,
    default: '🫣',
  },
  inputEyeIconHidden: {
    type: String,
    default: '😎',
  },
  inputEyeCustomIcon: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
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
	lightEyeBgColor: {
		type: String,
		default: '#353734'
	},
	lightEyeBgColorActive: {
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
	darkEyeBgColor: {
		type: String,
		default: '#353734'
	},
	darkEyeBgColorActive: {
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
	darkDisabledEyeBgColor: {
		type: String,
		default: 'rgba(68, 71, 90, 0.3)'
	},
	lightDisabledEyeBgColor: {
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
	sizeMediaQuery,
	inputReadonly,
	showInputEye,
	inputType,
  hasTrim,
	inputUppercase,
  inputName,
  inputPlaceholder,
  inputText,
  theme,
  inputEyeIcon,
  tabindex,
  inputEyeIconHidden,
	lightBgColor,
	lightBgColorFocus,
	lightEyeBgColor,
	lightEyeBgColorActive,
	lightDisabledBgColor,
	lightTextColor,
	darkBgColor,
	darkBgColorFocus,
	darkEyeBgColor,
	darkEyeBgColorActive,
	darkDisabledBgColor,
	darkTextColor,
	darkDisabledEyeBgColor,
	lightDisabledEyeBgColor,
  textAlign,
  showMsg,
  hasMsg,
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
  darkTextColorLabelActive
} = toRefs(props)

const inputValue = ref('')
const currentType = ref('')
const showValue = ref(false)
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
  const showInputEyeValue = !showInputEye.value ? false : showInputEye.value
  const inputTypeValue = !inputType.value ? 'text' : inputType.value
  const inputUppercaseValue = !inputUppercase.value ? false : inputUppercase.value
  const themeValue = !theme.value ? 'normal' : theme.value
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
  const labelActiveLeftValue = (labelActiveLeft.value === null || labelActiveLeft.value === undefined) ? -10 : labelActiveLeft.value
  const fontFamilyLabelValue = !fontFamilyLabel.value ? `'Lato', sans-serif` : fontFamilyLabel.value
  const fontSizeLabelValue = !fontSizeLabel.value ? '1em' : fontSizeLabel.value
  const fontSizeLabelActiveValue = !fontSizeLabelActive.value ? '0.8em' : fontSizeLabelActive.value
  const fontWeightLabelValue = !fontWeightLabel.value ? 400 : fontWeightLabel.value
  const lightTextColorLabelValue = !lightTextColorLabel.value ? '#ffffff' : lightTextColorLabel.value
  const darkTextColorLabelValue = !darkTextColorLabel.value ? '#000000' : darkTextColorLabel.value
  const lightTextColorLabelActiveValue = !lightTextColorLabelActive.value ? '#ffffff' : lightTextColorLabelActive.value
  const darkTextColorLabelActiveValue = !darkTextColorLabelActive.value ? '#000000' : darkTextColorLabelActive.value

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
    showInputEye: showInputEyeValue,
    inputType: inputTypeValue,
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
    fontFamilyLabel: fontFamilyLabelValue,
    fontSizeLabel: fontSizeLabelValue,
    fontSizeLabelActive: fontSizeLabelActiveValue,
    fontWeightLabel: fontWeightLabelValue,
    lightTextColorLabel: lightTextColorLabelValue,
    darkTextColorLabel: darkTextColorLabelValue,
    lightTextColorLabelActive: lightTextColorLabelActiveValue,
    darkTextColorLabelActive: darkTextColorLabelActiveValue,
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

  let newFontSize = ''
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

  return newFontSize
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
const validShowInputEye = computed(() => {
  const defaultValues = formatDefaultValues.value

  return !!(defaultValues.showInputEye && defaultValues.inputType === 'password')
})

const inputIcon = computed(() => {
  if (showValue.value) return inputEyeIcon.value

  return inputEyeIconHidden.value
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
  const value = inputValue.value
  return isActive.value || (value != null && String(value).trim().length > 0)
})
const hiddenDefaultEye = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.inputType === 'password' ? 'component__input__eye-default--hidden' : ''
})
const activeInput = computed(() => {
  return isActive.value ? 'component__input--active' : 'component__input--no-active'
})
const inputPadding = computed(() => {
  if (!validShowInputEye.value) return '6px 10px'

  return '6px 50px 6px 10px'
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

const styleIconSize = computed(() => {
  return hasIcon.value ? `${iconSize.value}rem` : '0'
})
const styleIconWidth = computed(() => {
  return hasIcon.value ? `${iconWidth.value}px` : '0'
})
const styleIconDirection = computed(() => {
  return hasIcon.value ? `component__icon--${iconDirection.value}` : ''
})
const styleIconPadding = computed(() => {
  const defaultValues = formatDefaultValues.value

  return hasIcon.value ? defaultValues.iconPadding : '0'
})
const styleIconMargin = computed(() => {
  const defaultValues = formatDefaultValues.value

  return hasIcon.value ? defaultValues.iconMargin : '0'
})
const styleIconBgColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  if (hasIcon.value) {
    return defaultValues.theme === 'dark' ? defaultValues.iconDarkBgColor : defaultValues.iconLightBgColor
  }

  return 'transparent'
})
const styleIconBorderRadius = computed(() => {
  const defaultValues = formatDefaultValues.value

  return hasIcon.value ? `${defaultValues.iconBorderRadius}rem` : '0'
})
const inputIconStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  if (!hasIcon.value) return {}

  return iconDirection.value === 'left' ? { paddingLeft: `${defaultValues.iconPaddingInput}px` } : { paddingRight: `${defaultValues.iconPaddingInput}px` }
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
const startValue = () => {
  if (inputText.value != null) {
    if (inputType.value === 'number' && typeof inputText.value === 'number') {
      inputValue.value = inputText.value
    } else {
      inputValue.value = String(inputText.value)
    }
  } else {
    inputValue.value = ''
  }

  currentType.value = inputType.value
}
const changeShowValue = () => {
  const defaultValues = formatDefaultValues.value

  if (defaultValues.inputReadonly || defaultValues.disabled) return

  const newShow = !showValue.value

  if (newShow) {
    currentType.value = 'text'
  } else {
    currentType.value = inputType.value
  }

  showValue.value = newShow
}

const formatValueForEmit = (value) => {
  // Converte para número se inputType for 'number'
  if (inputType.value === 'number') {
    if (value === '' || value === null || value === undefined) {
      return ''
    } else {
      const numValue = typeof value === 'number' ? value : Number(value)
      return isNaN(numValue) ? value : numValue
    }
  }
  return value
}

const interacted = () => {
	emit('clicked')
}
const enterConfirm = () => {
  if (disabled.value || formatDefaultValues.value.inputReadonly || !hasTabIndexEnter.value) return

  emit('entered', formatValueForEmit(inputValue.value))
}

watch(inputType, value => {
  currentType.value = value
}, { immediate: true })
watch(inputText, value => {
  if (value != null) {
    if (inputType.value === 'number' && typeof value === 'number') {
      if (value !== inputValue.value) inputValue.value = value
    } else {
      const stringValue = String(value)
      if (stringValue !== inputValue.value) inputValue.value = stringValue
    }
  } else {
    if (inputValue.value !== '') inputValue.value = ''
  }
}, { immediate: true })
watch(inputValue, value => {
  if (hasTrim.value && typeof value === 'string') {
    value = value.trim()
  }

  emit('changed', formatValueForEmit(value))
})
watch(isActive, value => {
  if (value) {
    emit('focused')
  } else {
    emit('blurred')
  }
})
watch(showValue, value => {
  emit('show-input-eye', value)
}, { immediate: true })
watch(inputValue, value => {
  if (hasTrim.value && typeof value === 'string') {
    value = value.trim()
  }

  emit('current-value', formatValueForEmit(value))
})
watch(inputType, (newType) => {
  if (newType === 'password') {
    // Força o tipo password e remove qualquer botão padrão
    nextTick(() => {
      const input = document.getElementById(inputName.value)
      if (input) {
        input.type = 'password'
        // Remove qualquer atributo que possa mostrar o botão
        input.removeAttribute('autocomplete')
      }
    })
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

  // inicio sizeMediaQuery
  &.component__sm {
      height: 32.39px;
      max-height: 32.39px;

      .component__eye {
        padding: 5px 10px;
      }

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

      .component__eye {
        padding: 10px 10px;
      }

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

      .component__eye {
        padding: 17px 10px;
      }

      .component__input {
        font-size: v-bind('fontSizeStyle');
      }
    }
    // fim sizeMediaQuery

    .component__eye {
      color: v-bind('lightTextColor');
    }

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
      .component__eye {
        color: v-bind('darkTextColor');
      }

      .component__icon {
        color: v-bind('iconDarkTextColor');
      }

      .component__input {
        color: v-bind('darkTextColor');
      }

      &.component__input--disabled,
      &.component__input--read-only {
        &.component__input--background {
          .component__eye {
            background-color: v-bind('darkDisabledEyeBgColor');

            &:hover {
              cursor: not-allowed;
            }
          }

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
          .component__eye {
            opacity: 0.2;
          }

          .component__icon {
            opacity: 0.2;
          }

          .component__input {
            border-bottom: 1px solid v-bind('darkDisabledEyeBgColor');

            &:focus,
            &:active {
              border-bottom: 1px solid v-bind('darkDisabledEyeBgColor');
            }
          }
        }

        &.component__input--border {
          .component__eye {
            opacity: 0.2;
          }

          .component__icon {
            opacity: 0.2;
          }

          .component__input {
            border: 1px solid v-bind('darkDisabledEyeBgColor');

            &:focus,
            &:active {
              border: 1px solid v-bind('darkDisabledEyeBgColor');
            }
          }
        }
      }

      &.component__input--background {
        .component__eye {
          background-color: v-bind('darkEyeBgColor');

          &.component__input--active {
            background-color: v-bind('darkEyeBgColorActive');
          }

          &.component__input--no-active {
            background-color: v-bind('darkEyeBgColor');
          }
        }

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
        .component__eye {
          background-color: transparent;
          opacity: 1;
        }

        .component__icon {
          background-color: transparent;
          opacity: 1;
        }

        .component__input {
          background-color: transparent;
          border: 0;
          border-bottom: 1px solid v-bind('darkEyeBgColor');

          &:focus,
          &:active {
            background-color: transparent;
            border: 0;
            border-bottom: 1px solid v-bind('darkEyeBgColorActive');
          }
        }
      }

      &.component__input--border {
        .component__eye {
          background-color: transparent;
          opacity: 1;
        }

        .component__icon {
          background-color: transparent;
          opacity: 1;
        }

        .component__input {
          background-color: transparent;
          border: 1px solid v-bind('darkEyeBgColor');

          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid v-bind('darkEyeBgColorActive');
          }
        }
      }
    }
    &.component__theme--light {
      .component__eye {
        color: v-bind('lightTextColor');
      }

      .component__icon {
        color: v-bind('iconLightTextColor');
      }

      .component__input {
        color: v-bind('lightTextColor');
      }

      &.component__input--disabled,
      &.component__input--read-only {
        &.component__input--background {
          .component__eye {
            background-color: v-bind('lightDisabledEyeBgColor');

            &:hover {
              cursor: not-allowed;
            }
          }

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
          .component__eye {
            opacity: 0.2;
          }

          .component__icon {
            opacity: 0.2;
          }

          .component__input {
            border-bottom: 1px solid v-bind('lightDisabledEyeBgColor');

            &:focus,
            &:active {
              border-bottom: 1px solid v-bind('lightDisabledEyeBgColor');
            }
          }
        }

        &.component__input--border {
          .component__eye {
            opacity: 0.2;
          }

          .component__icon {
            opacity: 0.2;
          }

          .component__input {
            border: 1px solid v-bind('lightDisabledEyeBgColor');

            &:focus,
            &:active {
              border: 1px solid v-bind('lightDisabledEyeBgColor');
            }
          }
        }
      }

      &.component__input--background {
        .component__eye {
          background-color: v-bind('lightEyeBgColor');

          &.component__input--active {
            background-color: v-bind('lightEyeBgColorActive');
          }

          &.component__input--no-active {
            background-color: v-bind('lightEyeBgColor');
          }
        }

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
        .component__eye {
          background-color: transparent;
          opacity: 1;
        }

        .component__icon {
          background-color: transparent;
          opacity: 1;
        }

        .component__input {
          background-color: transparent;
          border: 0;
          border-bottom: 1px solid v-bind('lightEyeBgColor');

          &:focus,
          &:active {
            background-color: transparent;
            border: 0;
            border-bottom: 1px solid v-bind('lightEyeBgColorActive');
          }
        }
      }

      &.component__input--border {
        .component__eye {
          background-color: transparent;
          opacity: 1;
        }

        .component__icon {
          background-color: transparent;
          opacity: 1;
        }

        .component__input {
          background-color: transparent;
          border: 1px solid v-bind('lightEyeBgColor');

          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid v-bind('lightEyeBgColorActive');
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

    .component__eye {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      padding: 1px 10px;
      margin: 2px 2px 2px 0;
      z-index: 1;

      &:hover {
        cursor: pointer;
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

      &.component__input__eye-default--hidden {
        // Internet Explorer / Edge antigo
        &::-ms-reveal,
        &::-ms-clear {
          display: none;
          width: 0;
          height: 0;
        }
        
        // Remove aparência padrão do navegador
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        
        // Chrome / Edge moderno - força esconder qualquer elemento decorativo
        &::-webkit-credentials-auto-fill-button {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          position: absolute !important;
          right: -9999px !important;
          width: 0 !important;
          height: 0 !important;
        }
        
        // Firefox
        &::-moz-textfield-decoration-container {
          display: none !important;
        }
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

	background-color: #ffffff;
	opacity: 0.8;

	.component {
		--disabled-button-color: v-bind('styleButtonColor');
		--disabled-color: v-bind('styleTextColor');
		background-color: var(--disabled-button-color) !important;
		color: var(--disabled-color) !important;
		border-radius: inherit;

    .component__eye {
      background-color: rgba(#f15574, 0.3);

      &:hover {
        cursor: not-allowed;
      }
    }

    .component__input {
      &:focus,
      &:active {
        background-color: #f15574;
      }
    }
	}
}
</style>

