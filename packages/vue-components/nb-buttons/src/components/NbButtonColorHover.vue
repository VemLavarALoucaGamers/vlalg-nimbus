<template>
	<div
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
		@click="interacted"
	>
		<div
			:id="nbId"
			class="nb-reset component component-transition"
			:style="[componentStyle]"
		>
			<slot name="content">Default Text</slot>
		</div>
	</div>
</template>

<script setup>
import { defineProps, toRefs, computed } from 'vue'

defineOptions({
	name: 'NbButtonColorHover',
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
			const currentValue = value.toLowerCase()
			return ['b', 'ib'].includes(currentValue)
		}
	},
	textColor: {
		type: String,
		default: '#ffffff'
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
	borderRadius: {
		type: Number,
		default: 0.375
	},
	textColorHover: {
		type: String,
		default: '#cccccc'
	},
	buttonColor: {
		type: String,
		default: '#bbbbbb'
	},
	buttonColorHover: {
		type: String,
		default: '#959595'
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
			return !value ? 700 : value
		}
	}
})

const {
	display,
	textColor,
	paddingX,
	paddingY,
	borderRadius,
	disabled,
	fontFamily,
	fontSize,
	fontWeight,
	textColorHover,
	buttonColor,
	buttonColorHover
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const textColorValue = !textColor ? 'ffffff' : textColor.value
	const paddingXValue = !paddingX.value || paddingX.value < 0 ? 1 : paddingX.value
	const paddingYValue = !paddingY.value || paddingY.value < 0 ? 0.2 : paddingY.value
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6rem' : fontSize.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 100 : fontWeight.value
	const textColorHoverValue = !textColorHover.value ? '#cccccc' : textColorHover.value
	const buttonColorValue = !buttonColor.value ? '#bbbbbb' : buttonColor.value
	const buttonColorHoverValue = !buttonColorHover.value ? '#959595' : buttonColorHover.value

	return {
		disabled: disabledValue,
		display: displayValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		textColor: textColorValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
		borderRadius: borderRadiusValue,
		textColorHover: textColorHoverValue,
		buttonColor: buttonColorValue,
		buttonColorHover: buttonColorHoverValue
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
		borderRadius: `${defaultValues.borderRadius}rem`
	}
})
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		color: defaultValues.textColor,
		padding: `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`,
		borderRadius: `${defaultValues.borderRadius}rem`,
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
const styleTextColorHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textColorHover
})
const styleButtonColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.buttonColor
})
const styleButtonColorHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.buttonColorHover
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

	user-select: none;

	touch-action: manipulation;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	cursor: pointer;
	text-align: center;
	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;

	background-color: v-bind('styleButtonColor');

	text-transform: none;
	padding: 0 14px;
	text-align: center;
	transition: all 0.3s ease-in-out;
	box-shadow: none;
	text-decoration: none;
	outline: none;

	&:hover {
		color: v-bind('styleTextColorHover');
		background: v-bind('styleButtonColorHover');
	}
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	background-color: #ffffff;
	opacity: 0.8;

	.component {
		--disabled-button-color: v-bind('styleButtonColor');
		--disabled-color: v-bind('styleTextColor');
		background-color: var(--disabled-button-color) !important;
		color: var(--disabled-color) !important;
		border-radius: inherit;
	}
}
</style>
