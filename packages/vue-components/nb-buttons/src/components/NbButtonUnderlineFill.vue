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
      :class="[themeStyle]"
			:style="[componentStyle]"
		>
      <slot name="content">Default Text</slot>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed } from 'vue'

defineOptions({
	name: 'NbButtonUnderlineFill',
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
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
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
	textAlign: {
		type: String,
		default: 'middle',
		validator: value => {
			return ['left', 'center', 'right'].includes(value)
		}
	},
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
	lightDisabledBgColor,
	darkTextColor,
	darkTextColorHover,
	darkButtonColor,
	darkButtonColorHover,
	darkDisabledBgColor,
	width,
	paddingX,
	paddingY,
	disabled,
	fontFamily,
	fontSize,
  fontWeight,
	textAlign
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const widthValue = !width.value || width.value < 86 ? 86 : width.value
	const paddingXValue = ((paddingX.value !== 0 && !paddingX.value) || paddingX.value < 0) ? 1 : paddingX.value
	const paddingYValue = ((paddingY.value !== 0 && !paddingY.value) || paddingY.value < 0) ? 0.2 : paddingY.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
  const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 200 : fontWeight.value
	const textAlignValue = !textAlign.value ? 'center' : textAlign.value

	return {
		disabled: disabledValue,
		display: displayValue,
		width: widthValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		textAlign: textAlignValue
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
		textAlign: defaultValues.textAlign
	}
})
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	const newWidth = defaultValues.display === 'block' ? 'auto' : `${defaultValues.width}px`

	return {
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

const themeStyle = computed(() => {
	return theme.value === 'dark' ? 'component__theme--dark' : 'component__theme--light'
})

// Computed properties para as cores do theme (necessárias para v-bind no CSS)
const styleLightTextColor = computed(() => lightTextColor.value)
const styleLightTextColorHover = computed(() => lightTextColorHover.value)
const styleLightButtonColor = computed(() => {
	return `linear-gradient(${lightButtonColor.value}, ${lightButtonColor.value}) center bottom / 1px 1px repeat-x`
})
const styleLightButtonColorHover = computed(() => {
	return `linear-gradient(${lightButtonColorHover.value}, ${lightButtonColorHover.value}) center bottom / 100% 100% repeat-x`
})
const styleLightDisabledBgColor = computed(() => lightDisabledBgColor.value)
const styleDarkTextColor = computed(() => darkTextColor.value)
const styleDarkTextColorHover = computed(() => darkTextColorHover.value)
const styleDarkButtonColor = computed(() => {
	return `linear-gradient(${darkButtonColor.value}, ${darkButtonColor.value}) center bottom / 1px 1px repeat-x`
})
const styleDarkButtonColorHover = computed(() => {
	return `linear-gradient(${darkButtonColorHover.value}, ${darkButtonColorHover.value}) center bottom / 100% 100% repeat-x`
})
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
  display: inline-block;
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
	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;

  // Add new properties below
  margin-bottom: 3px; // reset vertical align
  overflow: hidden;

  transition: background 300ms ease-in-out 0s, color 300ms ease-in-out 0s;

	// Theme light
	&.component__theme--light {
		background: v-bind('styleLightButtonColor');
		color: v-bind('styleLightTextColor');

		&:focus,
		&:hover {
			background: v-bind('styleLightButtonColorHover');
			color: v-bind('styleLightTextColorHover');
		}
	}

	// Theme dark
	&.component__theme--dark {
		background: v-bind('styleDarkButtonColor');
		color: v-bind('styleDarkTextColor');

		&:focus,
		&:hover {
			background: v-bind('styleDarkButtonColorHover');
			color: v-bind('styleDarkTextColorHover');
		}
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
			color: v-bind('styleLightTextColor') !important;
		}

		&.component__theme--dark {
			color: v-bind('styleDarkTextColor') !important;
		}
  }
}
</style>
