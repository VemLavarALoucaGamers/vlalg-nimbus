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
			:class="['nb-reset', 'component', 'component-transition', transitionSlow, themeStyle]"
			:style="[componentStyle]"
		>
			<slot name="content">Default Text</slot>
		</div>
	</div>
</template>

<script setup>
import { defineProps, toRefs, computed } from 'vue'

defineOptions({
	name: 'NbButtonMechanical',
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
	theme: {
		type: String,
		default: 'light',
		validator: (value) => {
			const currentValue = value ? value.toLowerCase() : ''
			return ['light', 'dark'].includes(currentValue)
		}
	},
	// Cores do tema light
	lightTextColor: {
		type: String,
		default: '#333333'
	},
	lightButtonColor: {
		type: String,
		default: '#f5f5f5'
	},
	lightContainerColor: {
		type: String,
		default: '#e0e0e0'
	},
	lightDisabledBgColor: {
		type: String,
		default: '#dfdfd9'
	},
	// Cores do tema dark
	darkTextColor: {
		type: String,
		default: '#e0e0e0'
	},
	darkButtonColor: {
		type: String,
		default: '#2d2d2d'
	},
	darkContainerColor: {
		type: String,
		default: '#3d3d3d'
	},
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
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
	borderRadius: {
		type: Number,
		default: 0.375
	},
	animationSlow: {
		type: Boolean,
		default: false
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
		default: 400,
		validator: value => {
			return !value ? 400 : value
		}
	}
})

const {
	display,
  ariaLabel,
  ariaAttrs,
	theme,
	lightTextColor,
	lightButtonColor,
	lightContainerColor,
	lightDisabledBgColor,
	darkTextColor,
	darkButtonColor,
	darkContainerColor,
	darkDisabledBgColor,
	paddingX,
	paddingY,
	borderRadius,
	disabled,
	animationSlow,
	fontFamily,
	fontSize,
	fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const paddingXValue = !paddingX.value || paddingX.value < 0 ? 1 : paddingX.value
	const paddingYValue = !paddingY.value || paddingY.value < 0 ? 0.2 : paddingY.value
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const animationSlowValue = !animationSlow.value ? 'component-transition__no-slow' : ''
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 100 : fontWeight.value

	return {
		disabled: disabledValue,
		display: displayValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
		borderRadius: borderRadiusValue,
		animationSlow: animationSlowValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue
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
const themeStyle = computed(() => {
	return theme.value === 'dark' ? 'component__theme--dark' : 'component__theme--light'
})

const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		padding: `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`,
		borderRadius: `${defaultValues.borderRadius}rem`,
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
	}
})
const transitionSlow = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.animationSlow
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})

// Computed properties para as cores do theme (necessárias para v-bind no CSS)
const styleLightTextColor = computed(() => lightTextColor.value)
const styleLightButtonColor = computed(() => lightButtonColor.value)
const styleLightContainerColor = computed(() => lightContainerColor.value)
const styleLightDisabledBgColor = computed(() => lightDisabledBgColor.value)
const styleDarkTextColor = computed(() => darkTextColor.value)
const styleDarkButtonColor = computed(() => darkButtonColor.value)
const styleDarkContainerColor = computed(() => darkContainerColor.value)
const styleDarkDisabledBgColor = computed(() => darkDisabledBgColor.value)
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
	// display: inline-block;
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
	margin-bottom: 5px;

	margin-right: 3px;

	&.component-transition {
		transition-duration: 0.15s;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		&.component-transition__no-slow {
			transition: all 0.05s ease-in !important;
		}
	}

	// Theme light
	&.component__theme--light {
		border: 2px solid v-bind('styleLightContainerColor');
		color: v-bind('styleLightTextColor');
		background-color: v-bind('styleLightButtonColor');
		box-shadow:
			3px 3px 0 -1px v-bind('styleLightButtonColor'),
			3px 3px 0 v-bind('styleLightButtonColor');

		&:hover {
			box-shadow:
				0 0 0 -1px v-bind('styleLightButtonColor'),
				0 0 0 v-bind('styleLightButtonColor');
			transform: translate(3px, 3px);
		}
	}

	// Theme dark
	&.component__theme--dark {
		border: 2px solid v-bind('styleDarkContainerColor');
		color: v-bind('styleDarkTextColor');
		background-color: v-bind('styleDarkButtonColor');
		box-shadow:
			3px 3px 0 -1px v-bind('styleDarkButtonColor'),
			3px 3px 0 v-bind('styleDarkButtonColor');

		&:hover {
			box-shadow:
				0 0 0 -1px v-bind('styleDarkButtonColor'),
				0 0 0 v-bind('styleDarkButtonColor');
			transform: translate(3px, 3px);
		}
	}

	&:active,
	&:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
	}

	&:active {
		box-shadow:
			0 0 #0000,
			0 0 #0000,
			0 0 #0000;
		left: 1px;
		top: 1px;
	}
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	.component {
		opacity: 0.7;
		border-radius: inherit;

		&.component__theme--light {
			background-color: v-bind('styleLightButtonColor') !important;
			color: v-bind('styleLightTextColor') !important;
		}

		&.component__theme--dark {
			background-color: v-bind('styleDarkButtonColor') !important;
			color: v-bind('styleDarkTextColor') !important;
		}
	}
}
</style>
