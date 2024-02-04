<!--
  Como usar
  
  import Button from '../components/buttons/Componente.vue';

  <p>texto antes <Button text="Cliquei aqui" display="ib" container-color="blueviolet" button-color="tomato" @clicked="console.log('oi')" /> texto depois</p>
-->
<template>
	<div
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
		@click="interacted"
	>
		<div
			:class="['nb-reset', 'component', 'component-transition']"
			:style="[componentStyle]"
		>
			{{ props.text }}
		</div>
	</div>
</template>

<script setup>
import { defineProps, toRefs, computed } from 'vue'

defineOptions({
	name: 'ComponentName',
	inheritAttrs: false
})

const emit = defineEmits(['clicked'])

const props = defineProps({
	text: {
		type: String,
		default: 'Default Text'
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
	shadowColor: {
		type: String,
		default: '#002f3c'
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
		default: 400,
		validator: value => {
			return !value ? 400 : value
		}
	}
})

const {
	text,
	display,
	buttonColor,
	textColor,
	paddingX,
	paddingY,
	borderRadius,
	shadowColor,
	disabled,
	fontFamily,
	fontSize,
	fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const buttonColorValue = !buttonColor.value ? '#bbbbbb' : buttonColor.value
	const shadowColorValue = !shadowColor.value ? '#002f3c' : shadowColor.value
	const textColorValue = !textColor.value ? '#ffffff' : textColor.value
	const paddingXValue = !paddingX.value || paddingX.value < 0 ? 1 : paddingX.value
	const paddingYValue = !paddingY.value || paddingY.value < 0 ? 1 : paddingY.value
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 100 : fontWeight.value

	return {
		disabled: disabledValue,
		display: displayValue,
		buttonColor: buttonColorValue,
		shadowColor: shadowColorValue,
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
		backgroundColor: defaultValues.buttonColor,
		boxShadow: `0 0 #0000, 0 0 #0000, 3px 3px 0 ${defaultValues.shadowColor}`,
		padding: `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`,
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
	line-height: 1.42857143; // 1.42857143
	font-family: v-bind('font');

	user-select: none;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	cursor: pointer;
	text-align: center;
	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;

	position: relative !important;
	transition: all 0.05s ease-in !important;
	white-space: nowrap !important;

	&:hover {
		box-shadow: none !important;
		transform: translate(2px, 2px);
	}
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	.component {
		opacity: 0.6;
	}
}
</style>