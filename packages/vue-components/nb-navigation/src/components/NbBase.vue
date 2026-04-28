<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle]"
    role="input"
    :title="title"
    v-bind="computedAriaAttrs"
    @click="interacted($event)"
  >
    <label
      v-if="showLabel"
      :for="computedInputName"
      class="component__label"
      :style="[styleLabel]"
    >{{ label }}<span v-if="required" class="component__label--required">*</span></label>
    
    <div
      :id="nbId"
      ref="chipsContainer"
      :class="['nb-reset', 'component', themeStyle, inputStyleClass]"
      :style="[componentStyle, styleWidth, borderRadiusStyle]"
    >
      <div class="component__content">
        Content here
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, watch } from 'vue'

defineOptions({
  name: 'NbBase',
  inheritAttrs: false
})

onMounted(() => {})

const emit = defineEmits([
  'clicked',
  'changed',
  'focused',
  'blurred'
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
    default: 'Input Base'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: 'black'
  },
	width: {
		type: Number,
		default: 185,
		validator: value => {
			return !value ? 185 : value
		}
	},
	paddingX: {
		type: Number,
		default: 0.2,
		validator: value => {
			return !value ? 1 : value
		}
	},
	paddingY: {
		type: Number,
		default: 0.2,
		validator: value => {
			return !value ? 0.2 : value
		}
	},
	hasBorderRadius: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	borderRadius: {
		type: Number,
		default: 0.375
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
	required: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	textAlign: {
		type: String,
		default: 'left',
		validator: value => {
			return ['center', 'left', 'right'].indexOf(value) !== -1
		}
	},
	activeTextStyle: {
		type: String,
		default: 'normal',
		validator: value => {
			return ['normal', 'italic', 'oblique'].indexOf(value) !== -1
		}
	},
	theme: {
		type: String,
		default: 'light',
		validator: value => {
			return ['dark', 'light'].indexOf(value) !== -1
		}
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
	lightBorderColor: {
		type: String,
		default: '#353734'
	},
	lightBorderColorFocus: {
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
	lightDisabledBorderColor: {
		type: String,
		default: 'rgba(53, 55, 52, 0.3)'
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
	darkBorderColor: {
		type: String,
		default: '#44475a'
	},
	darkBorderColorFocus: {
		type: String,
		default: 'rgba(68, 71, 90, 0.4)'
	},
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
	},
	darkTextColor: {
		type: String,
		default: '#ffffff'
	},

	darkDisabledBorderColor: {
		type: String,
		default: 'rgba(68, 71, 90, 0.3)'
	},
	// Label props
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
  labelBreakOnActive: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
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
})

const {
	nbId,
	display,
	paddingX,
	paddingY,
	borderRadius,
	disabled,
	fontFamily,
	fontSize,
	fontWeight,
	textColor,
	width,
	required,
	textAlign,
	hasBorderRadius,
	activeTextStyle,
	theme,
	inputStyle,
	lightBgColor,
	lightBgColorFocus,
	lightBorderColor,
	lightBorderColorFocus,
	lightDisabledBgColor,
	lightTextColor,
	lightChipBgColor,
	lightChipTextColor,
	lightChipRemoveColor,
	lightDisabledBorderColor,
	darkBgColor,
	darkBgColorFocus,
	darkBorderColor,
	darkBorderColorFocus,
	darkDisabledBgColor,
	darkTextColor,
	darkDisabledBorderColor,
	tabIndex,
	hasTabIndexEnter,
	ariaLabel,
	ariaAttrs,
	showLabel,
	label,
	labelBackground,
	labelPadding,
	labelBorderRadius,
	labelBreakOnActive,
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

const isActive = ref(false)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const widthValue = !width.value || width.value < 185 ? 185 : width.value
	const paddingXValue = ((paddingX.value !== 0 && !paddingX.value) || paddingX.value < 0) ? 1 : paddingX.value
	const paddingYValue = ((paddingY.value !== 0 && !paddingY.value) || paddingY.value < 0) ? 0.2 : paddingY.value
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.2em' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 100 : fontWeight.value
	const themeValue = !theme.value ? 'light' : theme.value
  const textColorValue = !textColor.value ? 'black' : textColor.value

	// Label default values
	const showLabelValue = !showLabel.value ? false : showLabel.value
	const labelLeftValue = ((labelLeft.value !== 0 && !labelLeft.value) || labelLeft.value < 0) ? 5 : labelLeft.value
	const labelBackgroundValue = !labelBackground.value ? 'transparent' : labelBackground.value
	const inputLabelMarginActiveValue = ((inputLabelMarginActive.value !== 0 && !inputLabelMarginActive.value) || inputLabelMarginActive.value < 0) ? 15 : inputLabelMarginActive.value
	const labelPaddingValue = !labelPadding.value ? '1px 5px' : labelPadding.value
	const labelBorderRadiusValue = ((labelBorderRadius.value !== 0 && !labelBorderRadius.value) || labelBorderRadius.value < 0) ? 0 : labelBorderRadius.value
	const labelActiveTopValue = (labelActiveTop.value === null || labelActiveTop.value === undefined) ? -13 : labelActiveTop.value
	const labelActiveLeftValue = (labelActiveLeft.value === null || labelActiveLeft.value === undefined) ? 5 : labelActiveLeft.value
	const fontFamilyLabelValue = !fontFamilyLabel.value ? `'Lato', sans-serif` : fontFamilyLabel.value
	const fontSizeLabelValue = !fontSizeLabel.value ? '1em' : fontSizeLabel.value
	const fontSizeLabelActiveValue = !fontSizeLabelActive.value ? '0.8em' : fontSizeLabelActive.value
	const fontWeightLabelValue = !fontWeightLabel.value ? 400 : fontWeightLabel.value
	const lightTextColorLabelValue = !lightTextColorLabel.value ? '#333333' : lightTextColorLabel.value
	const darkTextColorLabelValue = !darkTextColorLabel.value ? '#ffffff' : darkTextColorLabel.value
	const lightTextColorLabelActiveValue = !lightTextColorLabelActive.value ? '#333333' : lightTextColorLabelActive.value
	const darkTextColorLabelActiveValue = !darkTextColorLabelActive.value ? '#ffffff' : darkTextColorLabelActive.value

	return {
		disabled: disabledValue,
		display: displayValue,
		width: widthValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
    borderRadius: borderRadiusValue,
		theme: themeValue,
		showLabel: showLabelValue,
		labelLeft: labelLeftValue,
		labelBackground: labelBackgroundValue,
		inputLabelMarginActive: inputLabelMarginActiveValue,
		labelPadding: labelPaddingValue,
		labelBorderRadius: labelBorderRadiusValue,
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
		textColor: textColorValue,
	}
})
const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabled
})
const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	const isActive = isLabelActive.value

	return {
		display: defaultValues.display,
		// Adiciona padding-top quando o label está ativo para evitar que seja cortado
    // paddingTop: isActive && showLabel.value ? `${Math.abs(defaultValues.labelActiveTop)}px` : '0',
    paddingTop: '0px',
		// Esconde o label quando não está ativo usando overflow hidden
		// Se não tem label ou está ativo, permite overflow visible para não cortar conteúdo
		overflow: (!showLabel.value || isActive) ? 'visible' : 'hidden'
	}
})
const fontSizeStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	
	if (defaultValues.fontSize) return defaultValues.fontSize

	return '1.2em'
})

const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	const isActive = isLabelActive.value

	return {
		color: defaultValues.textColor,
		padding: `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`,
		fontWeight: defaultValues.fontWeight,
		textAlign: textAlign.value,
		marginTop: isActive && showLabel.value ? `${defaultValues.inputLabelMarginActive}px` : '0',
	}
})
const activeTextStyleClass = computed(() => {
	switch (activeTextStyle.value) {
		case 'italic':
			return 'component__text--italic'
		case 'oblique':
			return 'component__text--oblique'
		default:
			return 'component__text--normal'
	}
})
const borderRadiusStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	if (defaultValues.inputStyle !== 'line' && hasBorderRadius.value) {
		return { borderRadius: `${defaultValues.borderRadius}rem` }
	}
	return {}
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})
const styleTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textColor
})
const styleInputPosition = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.inputPosition === 'top' ? 'column' : 'column-reverse';
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
const styleWidth = computed(() => {
	const defaultValues = formatDefaultValues.value

  const widthIb = {
    width: `${defaultValues.width}px`
  }

  return defaultValues.display === 'block' ? { width: 'auto' } : widthIb
})
const isLabelActive = computed(() => {
  // Label está ativo se o input estiver focado
  return isActive.value
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
const themeStyle = computed(() => {
	switch (theme.value) {
		case 'dark':
			return 'component__theme--dark'
		default:
			return 'component__theme--light'
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

const interacted = (event) => {
	emit('clicked', event)
}

const handleFocus = () => {
  isActive.value = true
  emit('focused')
}
const handleBlur = () => {
  isActive.value = false
  emit('blurred')
}

/* New logic below */
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

.component__label {
    position: absolute;
    z-index: 1;
    pointer-events: none;

    .component__label--required {
      color: red;
      display: contents;
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
	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;
  
  // Component style start below:
  display: flex;
  flex-wrap: wrap;
  flex-direction: v-bind('styleInputPosition');
  overflow: hidden;
  position: relative;

  // inicio propTheme
  &.component__theme--light {
    color: v-bind('lightTextColor');

    &.component__input--background {
      background-color: v-bind('lightBgColor');
      border: 0;
    }

    &.component__input--line {
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid v-bind('lightBorderColor');
    }

    &.component__input--border {
      background-color: transparent;
      border: 1px solid v-bind('lightBorderColor');
    }

    .component__content {}
  }

  &.component__theme--dark {
    color: v-bind('darkTextColor');

    &.component__input--background {
      background-color: v-bind('darkBgColor');
      border: 0;
    }

    &.component__input--line {
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid v-bind('darkBorderColor');
    }

    &.component__input--border {
      background-color: transparent;
      border: 1px solid v-bind('darkBorderColor');
    }

    .component__content {}
  }
  // fim propTheme

  // inicio inputStyle
  &.component__input--background {
    // Mantém o comportamento padrão com background
  }

  &.component__input--line {
    &:focus-within {
      border-bottom: 1px solid v-bind('lightBorderColorFocus');
    }

    &.component__theme--dark {
      &:focus-within {
        border-bottom: 1px solid v-bind('darkBorderColorFocus');
      }
    }
  }

  &.component__input--border {
    &:focus-within {
      border: 1px solid v-bind('lightBorderColorFocus');
    }

    &.component__theme--dark {
      &:focus-within {
        border: 1px solid v-bind('darkBorderColorFocus');
      }
    }
  }
  // fim inputStyle

  .component__content {}
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	opacity: 0.8;

	.component {
		--disabled-button-color: v-bind('styleButtonColor');
		--disabled-color: v-bind('styleTextColor');
		border-radius: inherit;

		&.component__theme--light {
			&.component__input--background {
				background-color: v-bind('lightDisabledBgColor') !important;
			}

			&.component__input--line {
				border-bottom: 1px solid v-bind('lightDisabledBorderColor') !important;
			}

			&.component__input--border {
				border: 1px solid v-bind('lightDisabledBorderColor') !important;
			}
		}

		&.component__theme--dark {
			&.component__input--background {
				background-color: v-bind('darkDisabledBgColor') !important;
			}

			&.component__input--line {
				border-bottom: 1px solid v-bind('darkDisabledBorderColor') !important;
			}

			&.component__input--border {
				border: 1px solid v-bind('darkDisabledBorderColor') !important;
			}
		}
	}
}
</style>
