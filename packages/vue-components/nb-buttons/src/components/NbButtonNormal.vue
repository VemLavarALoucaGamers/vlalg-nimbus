<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
    :tabIndex="tabIndex"
    role="button"
    v-bind="computedAriaAttrs"
    @click="interacted"
    @keydown.enter.prevent="!disabled && hasTabIndexEnter && interacted()"
    @keydown.space.prevent="!disabled && hasTabIndexSpace && interacted()"
	>
		<div
			:id="nbId"
      class="nb-reset component"
      :class="[{ 'component-transition': hasAnimation, 'component--no-border': !showBorder }, themeStyle]"
			:style="[componentStyle]"
		>
      <slot name="content">Default Text</slot>
		</div>
	</div>
</template>

<script setup>
import { defineProps, toRefs, computed } from 'vue'

defineOptions({
	name: 'NbButtonNormal',
	inheritAttrs: false
})

const emit = defineEmits(['clicked'])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	display: {
		type: String,
		default: 'b',
		validator: (value = 'b') => {
			const currentValue = value ? value.toLowerCase() : ''
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
  hasTabIndexSpace: {
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
	showBorder: {
		type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	borderRadius: {
		type: Number,
		default: 0.375
	},
	width: {
		type: Number,
		default: 86,
		validator: value => {
			return !value ? 86 : value
		}
	},
	paddingX: {
		type: Number,
		default: 1,
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
		default: '1.6em',
		validator: value => {
			return !value ? '1.6em' : value
		}
	},
	fontWeight: {
		type: Number,
		default: 200,
		validator: value => {
			return !value ? 200 : value
		}
	},
  hasAnimation: {
		type: Boolean,
		default: false
  },
  animationDuration: {
		type: Number,
		default: 0.3
  },
  animationDurationType: {
		type: String,
    default: 's', // ms, s, etc.
    validator: value => {
      return ['ms', 's'].indexOf(value) !== -1
    }
  },
	theme: {
		type: String,
		default: 'light',
		validator: value => {
			return ['dark', 'light'].indexOf(value) !== -1
		}
	},
	// Cores do tema light
	lightButtonColor: {
		type: String,
		default: '#f5f5f5'
	},
	lightButtonColorHover: {
		type: String,
		default: '#e0e0e0'
	},
	lightTextColor: {
		type: String,
		default: '#333333'
	},
	lightTextColorHover: {
		type: String,
		default: '#000000'
	},
	lightBorderColor: {
		type: String,
		default: '#cccccc'
	},
	lightBorderColorHover: {
		type: String,
		default: '#bbbbbb'
	},
	lightDisabledBgColor: {
		type: String,
		default: '#dfdfd9'
	},
	// Cores do tema dark
	darkButtonColor: {
		type: String,
		default: '#2d2d2d'
	},
	darkButtonColorHover: {
		type: String,
		default: '#3d3d3d'
	},
	darkTextColor: {
		type: String,
		default: '#e0e0e0'
	},
	darkTextColorHover: {
		type: String,
		default: '#ffffff'
	},
	darkBorderColor: {
		type: String,
		default: '#555555'
	},
	darkBorderColorHover: {
		type: String,
		default: '#666666'
	},
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
	}
})

const {
	display,
  ariaLabel,
  ariaAttrs,
	showBorder,
	borderRadius,
	width,
	paddingX,
	paddingY,
	disabled,
	fontFamily,
	fontSize,
  fontWeight,
	hasAnimation,
	animationDuration,
	animationDurationType,
	theme,
	lightButtonColor,
	lightButtonColorHover,
	lightTextColor,
	lightTextColorHover,
	lightBorderColor,
	lightBorderColorHover,
	lightDisabledBgColor,
	darkButtonColor,
	darkButtonColorHover,
	darkTextColor,
	darkTextColorHover,
	darkBorderColor,
	darkBorderColorHover,
	darkDisabledBgColor
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const showBorderValue = ![false, true].includes(showBorder.value) ? true : showBorder.value
	const widthValue = !width.value || width.value < 86 ? 86 : width.value
	const paddingXValue = ((paddingX.value !== 0 && !paddingX.value) || paddingX.value < 0) ? 1 : paddingX.value
	const paddingYValue = ((paddingY.value !== 0 && !paddingY.value) || paddingY.value < 0) ? 0.2 : paddingY.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
  const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 200 : fontWeight.value
  const hasAnimationValue = hasAnimation.value ? 'component-transition' : ''
	const animationDurationValue = ((animationDuration.value !== 0 && !animationDuration.value) || animationDuration.value < 0) ? 0.3 : animationDuration.value
	const animationDurationTypeValue = !animationDurationType.value ? 'ms' : animationDurationType.value
	const themeValue = !theme.value ? 'light' : theme.value

	return {
		disabled: disabledValue,
		display: displayValue,
		showBorder: showBorderValue,
		borderRadius: borderRadiusValue,
		width: widthValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		hasAnimation: hasAnimationValue,
		animationDuration: animationDurationValue,
		animationDurationType: animationDurationTypeValue,
		theme: themeValue
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
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	const newWidth = defaultValues.display === 'block' ? 'auto' : `${defaultValues.width}px`

	return {
		borderRadius: `${defaultValues.borderRadius}rem`,
		minWidth: '33px',
		width: newWidth,
		padding: `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`,
		lineHeight: '1.42857143',
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
	}
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})

const styleAnimation = computed(() => {
  const defaultValues = formatDefaultValues.value

  if (!defaultValues.hasAnimation) return '';

	return `all ${defaultValues.animationDuration}${defaultValues.animationDurationType} ease-in-out`
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

const interacted = () => {
	emit('clicked')
}
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
  display: inline-block;
	vertical-align: bottom;
  margin-bottom: 4px;
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

  // Add new properties below
  text-transform: none;
	text-align: center;
	box-shadow: none;
	text-decoration: none;
	outline: none;
  
  &.component-transition {
    transition: v-bind('styleAnimation');
  }

	// inicio propTheme
	&.component__theme--dark {
		color: v-bind('darkTextColor');
		background-color: v-bind('darkButtonColor');
		
		&:not(.component--no-border) {
			border: 1px solid v-bind('darkBorderColor');
		}

		&:hover {
			color: v-bind('darkTextColorHover');
			background-color: v-bind('darkButtonColorHover');
			
			&:not(.component--no-border) {
				border-color: v-bind('darkBorderColorHover');
			}
		}
	}

	&.component__theme--light {
		color: v-bind('lightTextColor');
		background-color: v-bind('lightButtonColor');
		
		&:not(.component--no-border) {
			border: 1px solid v-bind('lightBorderColor');
		}

		&:hover {
			color: v-bind('lightTextColorHover');
			background-color: v-bind('lightButtonColorHover');
			
			&:not(.component--no-border) {
				border-color: v-bind('lightBorderColorHover');
			}
		}
	}
	// fim propTheme

	&.component--no-border {
		border: none !important;
	}
}

.component-disabled {
  cursor: not-allowed;
  pointer-events: none;
  user-select: none;

  .component {
    opacity: 0.7;
    border-radius: inherit;

		// inicio propTheme disabled
		&.component__theme--dark {
			color: v-bind('darkTextColor');
			background-color: v-bind('darkDisabledBgColor');
		}

		&.component__theme--light {
			color: v-bind('lightTextColor');
			background-color: v-bind('lightDisabledBgColor');
		}
		// fim propTheme disabled
  }
}
</style>
