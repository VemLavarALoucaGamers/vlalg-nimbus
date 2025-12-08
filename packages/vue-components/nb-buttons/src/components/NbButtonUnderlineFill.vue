<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
    :tabIndex="tabIndex"
    role="button"
    :aria-label="ariaLabel"
    :aria-disabled="disabled"
    @click="interacted"
    @keydown.enter="!disabled && hasTabIndexEnter && interacted()"
    @keydown.space.prevent="!disabled && hasTabIndexSpace && interacted()"
	>
		<div
			:id="nbId"
      class="nb-reset component"
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
	textColor: {
		type: String,
		default: 'rgb(0, 105, 255)'
	},
	textHoverColor: {
		type: String,
		default: '#ffffff'
	},
	buttonColor: {
		type: String,
		default: 'rgb(0, 105, 255)'
	},
	buttonHoverColor: {
		type: String,
		default: 'rgb(20, 51, 214)'
	},
	borderColor: {
		type: String,
		default: '#ffe54c'
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
	buttonColor,
	buttonHoverColor,
	textColor,
	textHoverColor,
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
	const buttonColorValue = !buttonColor.value ? '#ffffff' : buttonColor.value
	const buttonHoverColorValue = !buttonHoverColor.value ? '#000000' : buttonHoverColor.value
	const textColorValue = !textColor.value ? '#ffffff' : textColor.value
	const textHoverColorValue = !textHoverColor.value ? '#000000' : textHoverColor.value
	const widthValue = !width.value || width.value < 86 ? 86 : width.value
	const paddingXValue = !paddingX.value || paddingX.value < 0 ? 1 : paddingX.value
	const paddingYValue = !paddingY.value || paddingY.value < 0 ? 0.2 : paddingY.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
  const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 200 : fontWeight.value
	const textAlignValue = !textAlign.value ? 'center' : textAlign.value

	return {
		disabled: disabledValue,
		display: displayValue,
		buttonColor: buttonColorValue,
		buttonHoverColor: buttonHoverColorValue,
		textColor: textColorValue,
		textHoverColor: textHoverColorValue,
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

const styleTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textColor
})
const styleTextHoverColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textHoverColor
})
const styleButtonColor = computed(() => {
	const defaultValues = formatDefaultValues.value

  return `linear-gradient(${defaultValues.buttonColor}, ${defaultValues.buttonColor}) center bottom / 1px 1px repeat-x`
})
const styleButtonColorHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return `linear-gradient(${defaultValues.buttonHoverColor}, ${defaultValues.buttonHoverColor}) center bottom / 100% 100% repeat-x`
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

  background: v-bind('styleButtonColor');
  color: v-bind('styleTextColor');
  transition: background 300ms ease-in-out 0s, color 300ms ease-in-out 0s;

  &:focus,
  &:hover {
    background: v-bind('styleButtonColorHover');
    color: v-bind('styleTextHoverColor');
  }
}

.component-disabled {
  cursor: not-allowed;
  pointer-events: none;
  user-select: none;

  .component {
		--disabled-color: v-bind('styleTextColor');
		color: var(--disabled-color) !important;
    opacity: 0.7;
    border-radius: inherit;
  }
}
</style>
