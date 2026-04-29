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
    <div
      :id="nbId"
      ref="componentContainer"
      :class="['nb-reset', 'component', themeStyle, inputStyleClass]"
      :style="[componentStyle, styleWidth, borderRadiusStyle]"
      :tabIndex="disabled ? -1 : tabIndex"
      @keydown.enter.prevent="handleTabIndexEnter()"
    >
      <div :class="['component__content', componentContentClass]">
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
		default: '1.6em'
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
	}
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
	ariaAttrs
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const widthValue = !width.value || width.value < 185 ? 185 : width.value
	const paddingXValue = ((paddingX.value !== 0 && !paddingX.value) || paddingX.value < 0) ? 1 : paddingX.value
	const paddingYValue = ((paddingY.value !== 0 && !paddingY.value) || paddingY.value < 0) ? 0.2 : paddingY.value
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 100 : fontWeight.value
	const themeValue = !theme.value ? 'light' : theme.value
  const textColorValue = !textColor.value ? 'black' : textColor.value

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
		textColor: textColorValue,
	}
})
const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabled
})
const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		display: defaultValues.display,
    paddingTop: '0px',
		overflow: 'hidden'
	}
})
const fontSizeStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	
	return defaultValues.fontSize
})

const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		color: defaultValues.textColor,
		padding: `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`,
		fontWeight: defaultValues.fontWeight,
		textAlign: textAlign.value,
		marginTop: '0',
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

// handle tab index enter
const handleTabIndexEnter = () => {
  // check if disabled or has tab index enter is disabled
  if (disabled.value || !hasTabIndexEnter.value) return

  // get first enabled tab index
  console.log('tabIndex')
}

const interacted = (event) => {
	emit('clicked', event)
}

const handleFocus = () => {
  emit('focused')
}
const handleBlur = () => {
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
  font-size: v-bind('fontSizeStyle') !important;

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
