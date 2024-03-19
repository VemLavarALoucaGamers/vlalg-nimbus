<template>
	<div
		v-if="nbId"
		:id="nbId"
		class="nb-wrapper"
		:style="[textAlign]"
	>
		<div
			class="nb-gradient-text nb-reset"
			:style="[newLineHeight, gradient, fontStyle, pBottom]"
		>
			<slot name="text"></slot>
			<p v-if="!$slots.text">Default Text</p>
		</div>
	</div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
import MasterTool from '@vlalg-nimbus/master-tool'

const defaultValues = {
	bgFirst: '#5639fc',
	bgSecond: '#05f7ff',
	lineHeight: '1.42857143',
	align: 'left',
	paddingBottom: '5',
	fontFamily: `'Lato', sans-serif`,
	fontSize: '3rem',
	fontWeight: 800
}

const validsAlign = ['center', 'left', 'right']

export default defineComponent({
	name: 'NbGradientText',
	components: {},
	inheritAttrs: false,
	props: {
		nbId: {
			type: String,
			required: true
		},
		lineHeight: {
			type: [String, Number],
			default: defaultValues.lineHeight
		},
		bgFirst: {
			type: String,
			default: defaultValues.bgFirst
		},
		bgSecond: {
			type: String,
			default: defaultValues.bgSecond
		},
		alignment: {
			type: String,
			default: defaultValues.align,
			validator: value => {
				return validsAlign.includes(value)
			}
		},
		paddingBottom: {
			type: [String, Number],
			default: defaultValues.paddingBottom
		},
		fontFamily: {
			type: String,
			default: defaultValues.fontFamily
		},
		fontSize: {
			type: String,
			default: defaultValues.fontSize,
			validator: value => {
				return !value ? '1.6em' : value
			}
		},
		fontWeight: {
			type: Number,
			default: defaultValues.fontWeight,
			validator: value => {
				return !value ? 800 : value
			}
		}
	},
	setup(props) {
		const {
			lineHeight,
			bgFirst,
			bgSecond,
			alignment,
			paddingBottom,
			fontFamily,
			fontSize,
			fontWeight
		} = toRefs(props)

		const $masterTool = MasterTool()

		const newLineHeight = computed(() => {
			const hasValue = !!(lineHeight.value && $masterTool.isNumber(parseFloat(lineHeight.value)))
			let convertedNumber = 0

			if (hasValue) convertedNumber = parseFloat(lineHeight.value)

			const value = hasValue && convertedNumber >= 1 ? convertedNumber : defaultValues.lineHeight

			return {
				'line-height': value
			}
		})

		const gradient = computed(() => {
			const first = bgFirst.value ? bgFirst.value : defaultValues.bgFirst
			const second = bgSecond.value ? bgSecond.value : defaultValues.bgSecond

			return {
				background: `-webkit-linear-gradient(${first},${second})`,
				'background-clip': 'text',
				'-webkit-background-clip': 'text',
				'-webkit-text-fill-color': 'transparent'
			}
		})

		const textAlign = computed(() => {
			const newAlign =
				alignment.value && validsAlign.includes(alignment.value)
					? alignment.value
					: defaultValues.align

			return {
				'text-align': newAlign
			}
		})

		const pBottom = computed(() => {
			const hasValue = !!(
				paddingBottom.value && $masterTool.isNumber(parseInt(paddingBottom.value, 10))
			)
			let convertedNumber = 0

			if (hasValue) convertedNumber = parseInt(paddingBottom.value, 10)

			const newPadding =
				hasValue && convertedNumber >= 5 ? convertedNumber : defaultValues.paddingBottom

			return {
				'padding-bottom': `${newPadding}px`
			}
		})

		const fontStyle = computed(() => {
			const newSize = fontSize.value ? fontSize.value : defaultValues.fontSize
			const newFont = fontFamily.value ? fontFamily.value : defaultValues.fontFamily
			const newWeight = fontWeight.value ? fontWeight.value : defaultValues.fontWeight

			return {
				fontFamily: newFont,
				fontSize: newSize,
				fontWeight: newWeight
			}
		})

		return {
			newLineHeight,
			gradient,
			textAlign,
			pBottom,
			fontStyle
		}
	}
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap');

.nb-wrapper {
	margin: 0;
	padding: 0;
	font-size: 62.5%;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	display: inline-block;
}

.nb-reset {
	font-family: 'Lato', sans-serif;
	font-style: normal;
	font-weight: light;
	line-height: 1.42857143;
	color: #333;

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

.nb-gradient-text {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	display: inline-block;
	color: rgb(88 28 135 / 1);
	padding-top: 5px;
	padding-left: 5px;
	padding-right: 5px;
	vertical-align: bottom;
}
</style>
