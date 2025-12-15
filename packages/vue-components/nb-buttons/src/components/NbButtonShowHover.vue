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
		<a
			:id="nbId"
			class="nb-reset component tertiary"
      :class="[themeStyle]"
			:style="[componentStyle]"
			@click.prevent
		>
			<slot name="content">Default Text</slot>
		</a>
	</div>
</template>

<script setup>
import { defineProps, toRefs, computed } from 'vue'

defineOptions({
	name: 'NbButtonShowHover',
	inheritAttrs: false
})

const emit = defineEmits(['clicked'])

const props = defineProps({
	nbId: {
		type: String,
		required: true
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
	lightButtonColorHover: {
		type: String,
		default: '245, 245, 245'
	},
	lightButtonColorOpacityHover: {
		type: Number,
		default: 0.1
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
	darkButtonColorHover: {
		type: String,
		default: '45, 45, 45'
	},
	darkButtonColorOpacityHover: {
		type: Number,
		default: 0.1
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
	verticalAlign: {
		type: String,
		default: 'middle',
		validator: value => {
			return ['top', 'middle', 'bottom'].includes(value)
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
  ariaLabel,
  ariaAttrs,
	theme,
	lightTextColor,
	lightTextColorHover,
	lightButtonColorHover,
	lightButtonColorOpacityHover,
	lightDisabledBgColor,
	darkTextColor,
	darkTextColorHover,
	darkButtonColorHover,
	darkButtonColorOpacityHover,
	darkDisabledBgColor,
	paddingX,
	paddingY,
	disabled,
	borderRadius,
	verticalAlign,
	fontFamily,
	fontSize,
	fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const verticalAlignValue = !verticalAlign.value ? 'middle' : verticalAlign.value
	const paddingXValue = !paddingX.value || paddingX.value < 0 ? 1 : paddingX.value
	const paddingYValue = !paddingY.value || paddingY.value < 0 ? 0.2 : paddingY.value
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6rem' : fontSize.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 100 : fontWeight.value

	return {
		disabled: disabledValue,
		borderRadius: borderRadiusValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		verticalAlign: verticalAlignValue
	}
})
const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabled
})
const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		verticalAlign: defaultValues.verticalAlign
	}
})
const themeStyle = computed(() => {
	return theme.value === 'dark' ? 'component__theme--dark' : 'component__theme--light'
})

const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		padding: `${defaultValues.paddingY}rem 0`,
		borderRadius: `${defaultValues.borderRadius}rem`,
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
	}
})
const paddingOnHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`
})

// Computed properties para as cores do theme (necessárias para v-bind no CSS)
const styleLightTextColor = computed(() => lightTextColor.value)
const styleLightTextColorHover = computed(() => lightTextColorHover.value)
const styleLightButtonColorHover = computed(() => {
	return `rgba(${lightButtonColorHover.value}, ${lightButtonColorOpacityHover.value})`
})
const styleLightDisabledBgColor = computed(() => lightDisabledBgColor.value)
const styleDarkTextColor = computed(() => darkTextColor.value)
const styleDarkTextColorHover = computed(() => darkTextColorHover.value)
const styleDarkButtonColorHover = computed(() => {
	return `rgba(${darkButtonColorHover.value}, ${darkButtonColorOpacityHover.value})`
})
const styleDarkDisabledBgColor = computed(() => darkDisabledBgColor.value)
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
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
	display: inline-flex;
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

	background-color: transparent;
	transition: 0.2s ease-in-out;
	position: relative;

	border: 0.063rem solid transparent;

	overflow: hidden;
	outline: 0.188rem solid transparent;

	// Theme light
	&.component__theme--light {
		color: v-bind('styleLightTextColor');

		&:focus,
		&:hover {
			padding: v-bind('paddingOnHover') !important;
			background-color: v-bind('styleLightButtonColorHover');
			color: v-bind('styleLightTextColorHover') !important;
		}
	}

	// Theme dark
	&.component__theme--dark {
		color: v-bind('styleDarkTextColor');

		&:focus,
		&:hover {
			padding: v-bind('paddingOnHover') !important;
			background-color: v-bind('styleDarkButtonColorHover');
			color: v-bind('styleDarkTextColorHover') !important;
		}
	}
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	.component {
		opacity: 0.6;

		&.component__theme--light {
			color: v-bind('styleLightTextColor') !important;
		}

		&.component__theme--dark {
			color: v-bind('styleDarkTextColor') !important;
		}
	}
}
</style>
