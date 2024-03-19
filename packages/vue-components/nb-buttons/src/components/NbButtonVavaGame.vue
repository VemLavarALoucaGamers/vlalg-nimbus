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
	textColor: {
		type: String,
		default: '#ece8e1'
	},
	buttonColor: {
		type: String,
		default: 'blue'
	},
	textColorHover: {
		type: String,
		default: 'gray'
	},
	buttonColorHover: {
		type: String,
		default: 'cyan'
	},
	borderColor: {
		type: String,
		default: 'yellow'
	},
	borderOpacity: {
		type: Number,
		default: 0.5
	},
	paddingXBorder: {
		type: Number,
		default: 0.3,
		validator: value => {
			return !value ? 0.3 : value
		}
	},
	paddingYBorder: {
		type: Number,
		default: 0.3,
		validator: value => {
			return !value ? 0.3 : value
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
	textColor,
	textColorHover,
	buttonColor,
	buttonColorHover,
	uppercase,
	paddingXContent,
	paddingYContent,
	paddingXBorder,
	paddingYBorder,
	borderColor,
	borderOpacity,
	disabled,
	fontFamily,
	fontSize,
	fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const textColorValue = !textColor.value ? '#ece8e1' : textColor.value
	const buttonColorValue = !buttonColor.value ? 'green' : buttonColor.value
	const textColorHoverValue = !textColorHover.value ? '#ece8e1' : textColorHover.value
	const buttonColorHoverValue = !buttonColorHover.value ? 'cyan' : buttonColorHover.value
	const borderColorValue = !borderColor.value ? '#ffffff' : borderColor.value
	const borderOpacityValue =
		!borderOpacity.value || !(borderOpacity.value >= 0 && borderOpacity.value <= 1)
			? '0.5'
			: borderOpacity.value
	const paddingXBorderValue =
		!paddingXBorder.value || paddingXBorder.value < 0 ? 0.3 : paddingXBorder.value
	const paddingYBorderValue =
		!paddingYBorder.value || paddingYBorder.value < 0 ? 0.3 : paddingYBorder.value
	const paddingXContentValue =
		!paddingXContent.value || paddingXContent.value < 0 ? 0.5 : paddingXContent.value
	const paddingYContentValue =
		!paddingYContent.value || paddingYContent.value < 0 ? 0.5 : paddingYContent.value
	const uppercaseValue = uppercase.value ? 'uppercase' : 'none'
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 100 : fontWeight.value

	return {
		disabled: disabledValue,
		display: displayValue,
		textColor: textColorValue,
		buttonColor: buttonColorValue,
		textColorHover: textColorHoverValue,
		buttonColorHover: buttonColorHoverValue,
		borderColor: borderColorValue,
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
const componentContentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		textTransform: defaultValues.uppercase,
		padding: `${defaultValues.paddingYContent}rem ${defaultValues.paddingXContent}rem`,
		backgroundColor: defaultValues.buttonColor
	}
})
const componentContentMaskStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		backgroundColor: defaultValues.buttonColorHover
	}
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})

const styleBorderColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.borderColor
})
const styleBorderOpacity = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.borderOpacity
})

const styleTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textColor
})
const styleTextColorHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textColorHover
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

	color: v-bind('styleTextColor');

	&:hover {
		color: v-bind('styleTextColorHover');
	}

	&:before,
	&:after {
		content: '';
		display: block;
		height: calc(50% - 0.4rem);
		position: absolute;
		width: 100%;
		border: 1px solid v-bind('styleBorderColor');
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
		}
	}
}
</style>
