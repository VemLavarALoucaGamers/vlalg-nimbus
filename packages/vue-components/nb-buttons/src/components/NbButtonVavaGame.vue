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
			:class="['nb-reset', 'component', themeStyle]"
			:style="[componentStyle]"
		>
			<div
				class="component-content"
				:style="[componentContentStyle]"
			>
				<span class="component-content__text">
					<slot name="content">Default Text</slot>
				</span>
				<span
					class="component-content__mask"
					:style="[componentContentMaskStyle]"
				></span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, toRefs, computed, ref } from 'vue'

defineOptions({
	name: 'NbButtonVavaGame',
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
		default: 'ib',
		validator: (value = '') => {
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
	lightTextColorHover: {
		type: String,
		default: '#000000'
	},
	lightButtonColor: {
		type: String,
		default: '#f5f5f5'
	},
	lightButtonColorHover: {
		type: String,
		default: '#e0e0e0'
	},
	lightBorderColor: {
		type: String,
		default: '#f5f5f5'
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
	darkTextColorHover: {
		type: String,
		default: '#ffffff'
	},
	darkButtonColor: {
		type: String,
		default: '#2d2d2d'
	},
	darkButtonColorHover: {
		type: String,
		default: '#3d3d3d'
	},
	darkBorderColor: {
		type: String,
		default: '#e0e0e0'
	},
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
	},
	borderOpacity: {
		type: Number,
		default: 0.5
	},
	paddingXBorder: {
		type: Number,
		default: 0.5,
		validator: value => {
			return !value ? 0.5 : value
		}
	},
	paddingYBorder: {
		type: Number,
		default: 0.5,
		validator: value => {
			return !value ? 0.5 : value
		}
	},
	paddingXContent: {
		type: Number,
		default: 0.5,
		validator: value => {
			return !value ? 0.5 : value
		}
	},
	paddingYContent: {
		type: Number,
		default: 0.5,
		validator: value => {
			return !value ? 0.5 : value
		}
	},
	uppercase: {
		type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
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
	lightTextColorHover,
	lightButtonColor,
	lightButtonColorHover,
	lightBorderColor,
	lightDisabledBgColor,
	darkTextColor,
	darkTextColorHover,
	darkButtonColor,
	darkButtonColorHover,
	darkBorderColor,
	darkDisabledBgColor,
	uppercase,
	paddingXContent,
	paddingYContent,
	paddingXBorder,
	paddingYBorder,
	borderOpacity,
	disabled,
	fontFamily,
	fontSize,
	fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const borderOpacityValue =
		!borderOpacity.value || !(borderOpacity.value >= 0 && borderOpacity.value <= 1)
			? '0.5'
			: borderOpacity.value
	const paddingXBorderValue =
		((paddingXBorder.value !== 0 && !paddingXBorder.value) || paddingXBorder.value < 0) ? 0.5 : paddingXBorder.value
	const paddingYBorderValue =
		((paddingYBorder.value !== 0 && !paddingYBorder.value) || paddingYBorder.value < 0) ? 0.5 : paddingYBorder.value
	const paddingXContentValue =
		((paddingXContent.value !== 0 && !paddingXContent.value) || paddingXContent.value < 0) ? 0.5 : paddingXContent.value
	const paddingYContentValue =
		((paddingYContent.value !== 0 && !paddingYContent.value) || paddingYContent.value < 0) ? 0.5 : paddingYContent.value
	const uppercaseValue = uppercase.value ? 'uppercase' : 'none'
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 100 : fontWeight.value

	return {
		disabled: disabledValue,
		display: displayValue,
		borderOpacity: borderOpacityValue,
		paddingXBorder: paddingXBorderValue,
		paddingYBorder: paddingYBorderValue,
		paddingXContent: paddingXContentValue,
		paddingYContent: paddingYContentValue,
		uppercase: uppercaseValue,
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
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		padding: `${defaultValues.paddingYBorder}rem ${defaultValues.paddingXBorder}rem`,
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
	}
})
const themeStyle = computed(() => {
	return theme.value === 'dark' ? 'component__theme--dark' : 'component__theme--light'
})

const componentContentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		textTransform: defaultValues.uppercase,
		padding: `${defaultValues.paddingYContent}rem ${defaultValues.paddingXContent}rem`
	}
})
const componentContentMaskStyle = computed(() => {
	return {}
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})

const styleBorderOpacity = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.borderOpacity
})

// Computed properties para as cores do theme (necessárias para v-bind no CSS)
const styleLightTextColor = computed(() => lightTextColor.value)
const styleLightTextColorHover = computed(() => lightTextColorHover.value)
const styleLightButtonColor = computed(() => lightButtonColor.value)
const styleLightButtonColorHover = computed(() => lightButtonColorHover.value)
const styleLightBorderColor = computed(() => lightBorderColor.value)
const styleLightDisabledBgColor = computed(() => lightDisabledBgColor.value)
const styleDarkTextColor = computed(() => darkTextColor.value)
const styleDarkTextColorHover = computed(() => darkTextColorHover.value)
const styleDarkButtonColor = computed(() => darkButtonColor.value)
const styleDarkButtonColorHover = computed(() => darkButtonColorHover.value)
const styleDarkBorderColor = computed(() => darkBorderColor.value)
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
	cursor: pointer;

	user-select: none;

	touch-action: manipulation;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	opacity: 1;
	transition: opacity 0.7s ease-out 0.2s;
	text-align: center;
	position: relative;
	text-rendering: optimizeLegibility;
	z-index: 1;

	// Theme light
	&.component__theme--light {
		color: v-bind('styleLightTextColor');

		&:hover {
			color: v-bind('styleLightTextColorHover');
		}

		&:before,
		&:after {
			content: '';
			display: block;
			height: calc(50% - 0.4rem);
			position: absolute;
			width: 100%;
			border: 1px solid v-bind('styleLightBorderColor');
			left: 0;
			opacity: v-bind('styleBorderOpacity');
		}

		&:before {
			top: 0;
			border-bottom: 0;
		}

		&:after {
			bottom: 0;
			border-top: 0;
		}

		.component-content {
			background-color: v-bind('styleLightButtonColor');

			&:hover {
				.component-content__mask {
					background-color: v-bind('styleLightButtonColorHover');
				}
			}
		}
	}

	// Theme dark
	&.component__theme--dark {
		color: v-bind('styleDarkTextColor');

		&:hover {
			color: v-bind('styleDarkTextColorHover');
		}

		&:before,
		&:after {
			content: '';
			display: block;
			height: calc(50% - 0.4rem);
			position: absolute;
			width: 100%;
			border: 1px solid v-bind('styleDarkBorderColor');
			left: 0;
			opacity: v-bind('styleBorderOpacity');
		}

		&:before {
			top: 0;
			border-bottom: 0;
		}

		&:after {
			bottom: 0;
			border-top: 0;
		}

		.component-content {
			background-color: v-bind('styleDarkButtonColor');

			&:hover {
				.component-content__mask {
					background-color: v-bind('styleDarkButtonColorHover');
				}
			}
		}
	}

	.component-content {
		overflow: hidden;
		position: relative;
		z-index: 12;
		text-align: center;

		&:hover {
			.component-content__mask {
				right: -17%;
				transform: translateX(0%) skew(0deg);
			}
		}

		.component-content__text {
			position: relative;
			z-index: 13;
		}
		.component-content__mask {
			left: -17%;
			right: none;
			transform: translateX(-100%) skew(0deg);
			transition: transform 0.3s ease-out;
			height: 100%;
			position: absolute;
			top: 0;
			z-index: 12;
		}
	}
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	.component {
		.component-content {
			.component-content__text {
				opacity: 0.6;
			}

			&.component__theme--light {
				background-color: v-bind('styleLightDisabledBgColor') !important;
			}

			&.component__theme--dark {
				background-color: v-bind('styleDarkDisabledBgColor') !important;
			}
		}
	}
}
</style>
