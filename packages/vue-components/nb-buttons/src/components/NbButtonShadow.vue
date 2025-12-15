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
	name: 'NbButtonShadow',
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
	lightButtonShadowColor: {
		type: String,
		default: '#cccccc'
	},
	lightBorderColor: {
		type: String,
		default: '#cccccc'
	},
	lightDisabledBgColor: {
		type: String,
		default: '#dfdfd9'
	},
	// Cores do tema dark
	darkTextColor: {
		type: String,
		default: '#ffffff'
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
	darkButtonShadowColor: {
		type: String,
		default: '#555555'
	},
	darkBorderColor: {
		type: String,
		default: '#555555'
	},
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
	},
	borderRadius: {
		type: Number,
		default: 0
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
	lightButtonShadowColor,
	lightBorderColor,
	lightDisabledBgColor,
	darkTextColor,
	darkTextColorHover,
	darkButtonColor,
	darkButtonColorHover,
	darkButtonShadowColor,
	darkBorderColor,
	darkDisabledBgColor,
	borderRadius,
	width,
	paddingX,
	paddingY,
	disabled,
	fontFamily,
	fontSize,
  fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const widthValue = !width.value || width.value < 86 ? 86 : width.value
	const paddingXValue = !paddingX.value || paddingX.value < 0 ? 1 : paddingX.value
	const paddingYValue = !paddingY.value || paddingY.value < 0 ? 0.2 : paddingY.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
  const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 200 : fontWeight.value

	return {
		disabled: disabledValue,
		display: displayValue,
		borderRadius: borderRadiusValue,
		width: widthValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
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

const themeStyle = computed(() => {
	return theme.value === 'dark' ? 'component__theme--dark' : 'component__theme--light'
})

// Computed properties para as cores do theme (necessárias para v-bind no CSS)
const styleLightTextColor = computed(() => lightTextColor.value)
const styleLightTextColorHover = computed(() => lightTextColorHover.value)
const styleLightButtonColor = computed(() => lightButtonColor.value)
const styleLightButtonColorHover = computed(() => lightButtonColorHover.value)
const styleLightButtonShadowColor = computed(() => {
	return `3px 3px 0 -1px ${lightButtonShadowColor.value}, 3px 3px 0 ${lightButtonShadowColor.value}`
})
const styleLightButtonShadowColorHover = computed(() => {
	return `0 0 0 -1px ${lightButtonShadowColor.value}, 0 0 0 ${lightButtonShadowColor.value}`
})
const styleLightBorderColor = computed(() => lightBorderColor.value)
const styleLightDisabledBgColor = computed(() => lightDisabledBgColor.value)
const styleDarkTextColor = computed(() => darkTextColor.value)
const styleDarkTextColorHover = computed(() => darkTextColorHover.value)
const styleDarkButtonColor = computed(() => darkButtonColor.value)
const styleDarkButtonColorHover = computed(() => darkButtonColorHover.value)
const styleDarkButtonShadowColor = computed(() => {
	return `3px 3px 0 -1px ${darkButtonShadowColor.value}, 3px 3px 0 ${darkButtonShadowColor.value}`
})
const styleDarkButtonShadowColorHover = computed(() => {
	return `0 0 0 -1px ${darkButtonShadowColor.value}, 0 0 0 ${darkButtonShadowColor.value}`
})
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
	text-align: center;
	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;

  // Add new properties below
  margin-bottom: 8px; // reset vertical align
  overflow: hidden;
  border: 2px solid;

  transition-duration: 0.15s;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.05s ease-in !important;

  // Theme light
  &.component__theme--light {
    background-color: v-bind('styleLightButtonColor');
    color: v-bind('styleLightTextColor');
    border-color: v-bind('styleLightBorderColor');
    box-shadow: v-bind('styleLightButtonShadowColor');

    &:hover {
      background-color: v-bind('styleLightButtonColorHover');
      color: v-bind('styleLightTextColorHover');
      box-shadow: v-bind('styleLightButtonShadowColorHover');
      transform: translate(3px, 3px);
    }
  }

  // Theme dark
  &.component__theme--dark {
    background-color: v-bind('styleDarkButtonColor');
    color: v-bind('styleDarkTextColor');
    border-color: v-bind('styleDarkBorderColor');
    box-shadow: v-bind('styleDarkButtonShadowColor');

    &:hover {
      background-color: v-bind('styleDarkButtonColorHover');
      color: v-bind('styleDarkTextColorHover');
      box-shadow: v-bind('styleDarkButtonShadowColorHover');
      transform: translate(3px, 3px);
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
			background-color: v-bind('styleLightDisabledBgColor');
			color: v-bind('styleLightTextColor') !important;
		}

		&.component__theme--dark {
			background-color: v-bind('styleDarkDisabledBgColor');
			color: v-bind('styleDarkTextColor') !important;
		}
  }
}
</style>
