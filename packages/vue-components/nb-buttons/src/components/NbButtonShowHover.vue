<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
		@click="interacted"
	>
		<a
			:id="nbId"
			class="nb-reset component tertiary"
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
	textColor: {
		type: String,
		default: '#145deb'
	},
	textColorHover: {
		type: String,
		default: '#4bd6b5'
	},
	buttonColorHover: {
		type: String,
		default: '10, 38, 184'
	},
	buttonColorOpacityHover: {
		type: Number,
		default: 0.1
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
	textColor,
	buttonColorHover,
	buttonColorOpacityHover,
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
	const textColorValue = !textColor ? 'ffffff' : textColor.value
	const paddingXValue = !paddingX.value || paddingX.value < 0 ? 1 : paddingX.value
	const paddingYValue = !paddingY.value || paddingY.value < 0 ? 0.2 : paddingY.value
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const buttonColorHoverValue = !buttonColorHover.value ? '10, 38, 184' : buttonColorHover.value
	const buttonColorOpacityHoverValue =
		!buttonColorOpacityHover.value || buttonColorOpacityHover.value < 0
			? 0.1
			: buttonColorOpacityHover.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6rem' : fontSize.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 100 : fontWeight.value

	return {
		disabled: disabledValue,
		borderRadius: borderRadiusValue,
		textColor: textColorValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
		buttonColorHover: buttonColorHoverValue,
		buttonColorOpacityHover: buttonColorOpacityHoverValue,
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
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		color: defaultValues.textColor,
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
const buttonColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return `rgba(${defaultValues.buttonColorHover}, ${defaultValues.buttonColorOpacityHover})`
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
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

	&:focus,
	&:hover {
		padding: v-bind('paddingOnHover') !important;
		background-color: v-bind('buttonColor');
		color: v-bind('textColorHover') !important;
	}
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	.component {
		--disabled-button-color: v-bind('buttonColor');
		--disabled-color: v-bind('textColor');
		background-color: rgba(var(--disabled-button-color), 0.85) !important;
		color: rgba(var(--disabled-color), 0.2) !important;
		opacity: 0.6;
	}
}
</style>
