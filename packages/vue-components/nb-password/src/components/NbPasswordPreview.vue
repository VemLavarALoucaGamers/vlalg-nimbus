<template>
	<div
		v-if="nbId"
		class="nb-wrapper"
		:style="[wrapperStyle]"
		@click="interacted"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component']"
			:style="[componentStyle]"
		>
			<span
				v-for="(character, index) in generated"
				:key="index"
				:style="{ color: getColor(character) }"
			>
				{{ character }}
			</span>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, watch, computed, onMounted } from 'vue'

defineOptions({
	name: 'NbPasswordPreview',
	inheritAttrs: false
})

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
	type: {
		type: String,
		default: 'generate',
		validator: (value = 'generate') => {
			const currentValue = value ? value.toLowerCase() : ''
			return ['generate', 'insert'].includes(currentValue)
		}
	},
	password: {
		type: String,
		default: ''
	},
	background: {
		type: String,
		default: '#ffffff'
	},
	borderColor: {
		type: String,
		default: '#ffe54c'
	},
	showBorder: {
		type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	borderRadius: {
		type: Number,
		default: 0.375
	},
	width: {
		type: Number,
		default: 140,
		validator: value => {
			return !value ? 140 : value
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
		default: 0.4,
		validator: value => {
			return !value ? 0.4 : value
		}
	},
	length: {
		type: Number,
		default: 8
	},
	hasNumbers: {
		type: Boolean,
		default: true,
		validator: value => {
			return [true, false].includes(value)
		}
	},
	hasSpecial: {
		type: Boolean,
		default: true,
		validator: value => {
			return [true, false].includes(value)
		}
	},
	hasUppercaseLowercase: {
		type: Boolean,
		default: true,
		validator: value => {
			return [true, false].includes(value)
		}
	},
	fontFamily: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSize: {
		type: String,
		default: '1.8em',
		validator: value => {
			return !value ? '1.8em' : value
		}
	},
	fontWeight: {
		type: Number,
		default: 700,
		validator: value => {
			return !value ? 700 : value
		}
	}
})

const generated = ref('')
const colorGreen = ref('#18C954')
const colorBlue = ref('#39ABEB')
const colorRed = ref('#F87676')

const { type, password, length, hasNumbers, hasSpecial, hasUppercaseLowercase } = toRefs(props)

const patternLetter = /[a-zA-Z]/
const patternNumber = /[0-9]/
const patternSpecial = /[!@#$%^&*()_+{}[\]]/

const {
	display,
	background,
	borderColor,
	showBorder,
	borderRadius,
	width,
	paddingX,
	paddingY,
	fontFamily,
	fontSize,
	fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const backgroundValue = !background.value ? '#ffffff' : background.value
	const borderColorValue = !borderColor.value ? '#ffe54c' : borderColor.value
	const showBorderValue = ![false, true].includes(showBorder.value) ? true : showBorder.value
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const widthValue = !width.value || width.value < 86 ? 86 : width.value
	const paddingXValue = !paddingX.value || paddingX.value < 0 ? 1 : paddingX.value
	const paddingYValue = !paddingY.value || paddingY.value < 0 ? 0.4 : paddingY.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.8em' : fontSize.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 700 : fontWeight.value

	return {
		display: displayValue,
		background: backgroundValue,
		borderColor: borderColorValue,
		showBorder: showBorderValue,
		borderRadius: borderRadiusValue,
		width: widthValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue
	}
})

const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		display: defaultValues.display
	}
})
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	const newWidth = defaultValues.display === 'block' ? '100%' : `${defaultValues.width}px`

	const border = defaultValues.showBorder
		? { border: `1px solid ${defaultValues.borderColor}` }
		: {}

	return {
		...border,
		borderRadius: `${defaultValues.borderRadius}rem`,
		minWidth: '33px',
		width: newWidth,
		background: defaultValues.background,
		padding: `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`,
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
	}
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})

const getColor = character => {
	const regexLetter = new RegExp(patternLetter)
	const regexNumber = new RegExp(patternNumber)
	const regexSpecial = new RegExp(patternSpecial)

	if (regexNumber.test(character)) {
		return colorGreen.value
	} else if (regexSpecial.test(character)) {
		return colorRed.value
	} else {
		return colorBlue.value
	}
}
const generateOneOccurrence = itemsList => {
	return itemsList.charAt(Math.floor(Math.random() * itemsList.length))
}
const generatePassword = (
	length = 8,
	hasNumbers = true,
	hasSpecial = true,
	hasUppercaseLowercase = true,
	letters = 'abcdefghijklmnopqrstuvwxyz',
	numbers = '0123456789',
	special = '!@#$%^&*()_+{}[]'
) => {
	const lengthDefault = 8
	const lettersDefault = 'abcdefghijklmnopqrstuvwxyz'
	const numbersDefault = '0123456789'
	const specialDefault = '!@#$%^&*()_+{}[]'

	const stringLength = !length || length < 8 ? lengthDefault : length
	let lettersList = !letters ? lettersDefault : letters
	const numbersList = !numbers ? numbersDefault : numbers
	const specialList = !special ? specialDefault : special

	let passwordGenerated = ''

	if (hasUppercaseLowercase) lettersList += lettersList.toUpperCase()

	let allInOne = lettersList
	passwordGenerated += generateOneOccurrence(lettersList)

	if (hasNumbers) {
		allInOne += numbersList
		passwordGenerated += generateOneOccurrence(numbersList)
	}
	if (hasSpecial) {
		allInOne += specialList
		passwordGenerated += generateOneOccurrence(specialList)
	}

	for (let i = passwordGenerated.length; i < stringLength; i++) {
		passwordGenerated += allInOne.charAt(Math.floor(Math.random() * allInOne.length))
	}

	return passwordGenerated
		.split('')
		.sort(() => Math.random() - 0.5)
		.join('')
}

const updateValue = () => {}

const checkComponentType = () => {
	if (type.value === 'generate') {
		generated.value = generatePassword(
			length.value,
			hasNumbers.value,
			hasSpecial.value,
			hasUppercaseLowercase.value
		)
	} else {
		generated.value = password.value
	}
}

onMounted(() => {
	checkComponentType()
})

watch(props, () => {
	checkComponentType()
})
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
	box-sizing: border-box;
	line-height: 16px;
	font-family: 'Lato', sans-serif;
	font-family: v-bind('font');

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	text-align: center;
	overflow: hidden;
	display: inline-block;
	position: relative;

	letter-spacing: 1px;

	height: 32px;
	background: tomato;
}
</style>
