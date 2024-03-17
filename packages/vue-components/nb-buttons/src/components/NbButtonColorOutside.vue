<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
		@click="interacted"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component']"
			:style="[componentStyle]"
		>
			<div
				class="component-content"
				:style="[borderStyle]"
			>
				<slot name="content">Default Text</slot>
			</div>

			<div class="component-shadow" />
		</div>
	</div>
</template>

<script setup>
import { defineProps, toRefs, computed } from 'vue'

defineOptions({
	name: 'NbButtonColorOutside',
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
	textColor: {
		type: String,
		default: '#ffffff'
	},
	buttonColor: {
		type: String,
		default: '#bbbbbb'
	},
	borderColor: {
		type: String,
		default: '#ffe54c'
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
		default: 0.25
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
	buttonColor,
	borderColor,
	textColor,
	paddingX,
	paddingY,
	borderRadius,
	disabled,
	fontFamily,
	fontSize,
	fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const buttonColorValue = !buttonColor.value ? '#bbbbbb' : buttonColor.value
	const borderColorValue = !borderColor.value ? '#ffe54c' : borderColor.value
	const textColorValue = !textColor.value ? '#ffffff' : textColor.value
	const paddingXValue = !paddingX.value || paddingX.value < 0 ? 1 : paddingX.value
	const paddingYValue = !paddingY.value || paddingY.value < 0 ? 0.2 : paddingY.value
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 200 : fontWeight.value

	return {
		disabled: disabledValue,
		display: displayValue,
		buttonColor: buttonColorValue,
		borderColor: borderColorValue,
		textColor: textColorValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
		borderRadius: borderRadiusValue,
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
		color: defaultValues.textColor,
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
	}
})
const borderStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		padding: `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`,
		border: `1px solid ${defaultValues.borderColor}`,
		borderRadius: componentBorderRadius.value
	}
})
const componentBorderRadius = computed(() => {
	const defaultValues = formatDefaultValues.value

	return `${defaultValues.borderRadius}rem`
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})

const styleTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textColor
})
const styleButtonColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.buttonColor
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
	font-family: 'Lato', sans-serif;
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

	letter-spacing: 1px;
	outline: 0;
	position: relative;

	margin-top: 4px;
	margin-bottom: 10px;
	margin-right: 6px;

	.component-content {
		position: relative;
		z-index: 4;

		overflow: hidden;
	}

	.component-shadow {
		--disabled-button-color: v-bind('styleButtonColor');
		background-color: var(--disabled-button-color) !important;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 7px;
		left: 7px;
		transition: 0.2s;
		border-radius: v-bind('componentBorderRadius');
		z-index: 3;
	}

	&:hover {
		.component-shadow {
			top: 0px;
			left: 0px;
		}
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

		.component-shadow {
			top: 0px;
			left: 0px;
		}
	}
}
</style>
