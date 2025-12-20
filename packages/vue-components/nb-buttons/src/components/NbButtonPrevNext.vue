<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component', themeStyle]"
			:style="componentStyle"
		>
			<div
				v-if="showPreview"
				:class="['buttonNextPreview buttonPreview', previewDisabled]"
				:style="previewStyle"
        :tabIndex="tabIndexPrev"
        role="button"
        v-bind="computedAriaAttrsPrev"
				@click="interacted('preview')"
        @keydown.enter.prevent="!disabled && hasTabIndexEnter && interacted('preview')"
        @keydown.space.prevent="!disabled && hasTabIndexSpace && interacted('preview')"
			>
				<slot name="prev">← Preview</slot>
			</div>

			<div
				v-if="showNext"
				:class="['buttonNextPreview buttonNext', nextDisabled]"
				:style="nextStyle"
        :tabIndex="tabIndexNext"
        role="button"
        v-bind="computedAriaAttrsNext"
        @click="interacted('next')"
        @keydown.enter.prevent="!disabled && hasTabIndexEnter && interacted('next')"
        @keydown.space.prevent="!disabled && hasTabIndexSpace && interacted('next')"
			>
				<slot name="next">Next →</slot>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, toRefs, computed, ref } from 'vue'

defineOptions({
	name: 'NbButtonPrevNext',
	inheritAttrs: false
})

const emit = defineEmits(['clicked'])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	tabIndexPrev: {
		type: Number,
    default: 0
	},
	tabIndexNext: {
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
  ariaLabelPrev: {
    type: String,
    default: 'Alternate Text Button'
  },
  ariaAttrsPrev: {
    type: Object,
    default: () => ({})
  },
  ariaLabelNext: {
    type: String,
    default: 'Alternate Text Button'
  },
  ariaAttrsNext: {
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
	lightColorPrimary: {
		type: String,
		default: '#f5f5f5'
	},
	lightColorSecondary: {
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
	lightDisabledBgColor: {
		type: String,
		default: '#dfdfd9'
	},
	// Cores do tema dark
	darkColorPrimary: {
		type: String,
		default: '#2d2d2d'
	},
	darkColorSecondary: {
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
		default: 10,
		validator: value => {
			return !value ? 10 : value
		}
	},
	marginBetween: {
		type: Number,
		default: 2,
		validator: value => {
			return !value ? 1 : value
		}
	},
	borderRadius: {
		type: Number,
		default: 6,
		validator: value => {
			return !value ? 1 : value
		}
	},
	disabled: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	showPreview: {
		type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	showNext: {
		type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	disabledPreview: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	disabledNext: {
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
  ariaLabelPrev,
  ariaAttrsPrev,
  ariaLabelNext,
  ariaAttrsNext,
	theme,
	lightColorPrimary,
	lightColorSecondary,
	lightTextColor,
	lightTextColorHover,
	lightDisabledBgColor,
	darkColorPrimary,
	darkColorSecondary,
	darkTextColor,
	darkTextColorHover,
	darkDisabledBgColor,
	paddingX,
	paddingY,
	marginBetween,
	borderRadius,
	disabled,
	disabledPreview,
	disabledNext,
	fontFamily,
	fontSize,
	fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const disabledPreviewValue = disabledPreview.value ? 'component-disabled' : ''
	const disabledNextValue = disabledNext.value ? 'component-disabled' : ''
	const marginBetweenValue =
		((marginBetween.value !== 0 && !marginBetween.value) || marginBetween.value < 0) ? 0 : marginBetween.value
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const paddingXValue = ((paddingX.value !== 0 && !paddingX.value) || paddingX.value < 0) ? 1 : paddingX.value
	const paddingYValue = ((paddingY.value !== 0 && !paddingY.value) || paddingY.value < 0) ? 10 : paddingY.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 100 : fontWeight.value

	return {
		disabled: disabledValue,
		disabledPreview: disabledPreviewValue,
		disabledNext: disabledNextValue,
		marginBetween: `${marginBetweenValue}px`,
		borderRadius: `${borderRadiusValue}px`,
		paddingX: `${paddingXValue}px`,
		paddingY: `${paddingYValue}px`,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue
	}
})
const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabled
})
const previewDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabledPreview
})
const nextDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabledNext
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
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
	}
})
const previewStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	return {
		borderRadius: `${defaultValues.borderRadius} 0px 0px ${defaultValues.borderRadius}`,
		marginRight: defaultValues.marginBetween,
		padding: `${defaultValues.paddingX} ${defaultValues.paddingY}`
	}
})
const nextStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	return {
		borderRadius: `0px ${defaultValues.borderRadius} ${defaultValues.borderRadius} 0px`,
		marginLeft: defaultValues.marginBetween,
		padding: `${defaultValues.paddingX} ${defaultValues.paddingY}`
	}
})
const themeStyle = computed(() => {
	return theme.value === 'dark' ? 'component__theme--dark' : 'component__theme--light'
})

// Computed properties para as cores do theme (necessárias para v-bind no CSS)
const styleLightColorPrimary = computed(() => lightColorPrimary.value)
const styleLightColorSecondary = computed(() => lightColorSecondary.value)
const styleLightTextColor = computed(() => lightTextColor.value)
const styleLightTextColorHover = computed(() => lightTextColorHover.value)
const styleLightDisabledBgColor = computed(() => lightDisabledBgColor.value)
const styleDarkColorPrimary = computed(() => darkColorPrimary.value)
const styleDarkColorSecondary = computed(() => darkColorSecondary.value)
const styleDarkTextColor = computed(() => darkTextColor.value)
const styleDarkTextColorHover = computed(() => darkTextColorHover.value)
const styleDarkDisabledBgColor = computed(() => darkDisabledBgColor.value)

const font = computed(() => {
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	return `'${fontValue}'`
})
const computedAriaAttrsPrev = computed(() => {
  const newAttrs = {}

  if (ariaAttrsPrev.value) {
    const attrKeys = Object.keys(ariaAttrsPrev.value)

    attrKeys.forEach(key => newAttrs[`aria-${key}`] = ariaAttrsPrev.value[key])
  }

  const attrs = {
    'aria-label': ariaLabelPrev.value,
    'aria-disabled': previewDisabled.value,
    ...newAttrs
  }
  
  // Remove atributos undefined/null
  return Object.fromEntries(
    Object.entries(attrs).filter(([_, value]) => value !== undefined && value !== null)
  )
})
const computedAriaAttrsNext = computed(() => {
  const newAttrs = {}

  if (ariaAttrsNext.value) {
    const attrKeys = Object.keys(ariaAttrsNext.value)

    attrKeys.forEach(key => newAttrs[`aria-${key}`] = ariaAttrsNext.value[key])
  }

  const attrs = {
    'aria-label': ariaLabelNext.value,
    'aria-disabled': nextDisabled.value,
    ...newAttrs
  }
  
  // Remove atributos undefined/null
  return Object.fromEntries(
    Object.entries(attrs).filter(([_, value]) => value !== undefined && value !== null)
  )
})

const interacted = clickType => {
	emit('clicked', clickType)
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
	display: inline-block;
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

	.buttonNextPreview {
		display: inline-block;
		text-align: center;
		transition: all 0.3s;

		&:hover {
			cursor: pointer;
		}
	}

	// Theme light
	&.component__theme--light {
		.buttonPreview {
			background-color: v-bind('styleLightColorPrimary');
			color: v-bind('styleLightTextColor');

			&:hover {
				background-color: v-bind('styleLightColorSecondary');
				color: v-bind('styleLightTextColorHover');
			}
		}

		.buttonNext {
			color: v-bind('styleLightTextColor');
			background-color: v-bind('styleLightColorSecondary');

			&:hover {
				background-color: v-bind('styleLightColorPrimary');
				color: v-bind('styleLightTextColorHover');
			}
		}
	}

	// Theme dark
	&.component__theme--dark {
		.buttonPreview {
			background-color: v-bind('styleDarkColorPrimary');
			color: v-bind('styleDarkTextColor');

			&:hover {
				background-color: v-bind('styleDarkColorSecondary');
				color: v-bind('styleDarkTextColorHover');
			}
		}

		.buttonNext {
			color: v-bind('styleDarkTextColor');
			background-color: v-bind('styleDarkColorSecondary');

			&:hover {
				background-color: v-bind('styleDarkColorPrimary');
				color: v-bind('styleDarkTextColorHover');
			}
		}
	}
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;
	opacity: 0.8;

	&:hover {
		cursor: not-allowed;
	}
}
</style>
