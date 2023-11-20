<template>
	<div
		v-if="nbId && playCountdown && (showDays || showHours || showMinutes || showSeconds)"
		:class="['nb-wrapper']"
		:style="[wrapperStyle]"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component']"
			:style="[componentStyle]"
		>
			<div
				v-if="showDays"
				class="component__items component__days"
			>
				<span
					class="component__items-number"
					:style="[styleNumber]"
				>
					{{ formatNumber(currentDay) }}
				</span>
				<span
					class="component__items-text"
					:style="[styleText]"
				>
					{{ daysText }}
				</span>
			</div>

			<div
				v-if="separator && showHours && showDays"
				class="component__separator"
				:style="[styleSeparator]"
			>
				<p>{{ separatorType }}</p>
			</div>

			<div
				v-if="showHours"
				class="component__items component__hours"
			>
				<span
					class="component__items-number"
					:style="[styleNumber]"
				>
					{{ formatNumber(currentHour) }}
				</span>
				<span
					class="component__items-text"
					:style="[styleText]"
				>
					{{ hoursText }}
				</span>
			</div>

			<div
				v-if="separator && showMinutes && (showDays || showHours)"
				class="component__separator"
				:style="[styleSeparator]"
			>
				<p>{{ separatorType }}</p>
			</div>

			<div
				v-if="showMinutes"
				class="component__items component__minutes"
			>
				<span
					class="component__items-number"
					:style="[styleNumber]"
				>
					{{ formatNumber(currentMinute) }}
				</span>
				<span
					class="component__items-text"
					:style="[styleText]"
				>
					{{ minutesText }}
				</span>
			</div>

			<div
				v-if="separator && showSeconds && (showDays || showHours || showMinutes)"
				class="component__separator"
				:style="[styleSeparator]"
			>
				<p>{{ separatorType }}</p>
			</div>

			<div
				v-if="showSeconds"
				class="component__items component__seconds"
			>
				<span
					class="component__items-number"
					:style="[styleNumber]"
				>
					{{ formatNumber(currentSecond) }}
				</span>
				<span
					class="component__items-text"
					:style="[styleText]"
				>
					{{ secondsText }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, toRefs, computed, onMounted, watch } from 'vue'
import {
	validDay,
	validMonth,
	validYear,
	validHour,
	validMinute,
	validSecond
} from '../helpers/validation'

defineOptions({
	name: 'NbCountdown',
	inheritAttrs: false
})

const emit = defineEmits(['started', 'finished'])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	textColor: {
		type: String,
		default: '#000'
	},
	numberColor: {
		type: String,
		default: '#000'
	},
	separatorColor: {
		type: String,
		default: '#000'
	},
	border: {
		type: Boolean,
		default: false
	},
	borderColor: {
		type: String,
		default: '#000'
	},
	day: {
		type: Number,
		required: true,
		default: 1,
		validator: value => validDay(value)
	},
	month: {
		type: String,
		default: 'jan',
		required: true,
		validator: value => validMonth(value)
	},
	year: {
		type: Number,
		default: 9999,
		required: true,
		validator: value => validYear(value)
	},
	hour: {
		type: Number,
		default: 0,
		required: true,
		validator: value => validHour(value)
	},
	minute: {
		type: Number,
		default: 0,
		required: true,
		validator: value => validMinute(value)
	},
	second: {
		type: Number,
		default: 0,
		required: true,
		validator: value => validSecond(value)
	},
	daysText: {
		type: String,
		default: 'days'
	},
	hoursText: {
		type: String,
		default: 'hours'
	},
	minutesText: {
		type: String,
		default: 'minutes'
	},
	secondsText: {
		type: String,
		default: 'seconds'
	},
	showDays: {
		type: Boolean,
		default: true
	},
	showHours: {
		type: Boolean,
		default: true
	},
	showMinutes: {
		type: Boolean,
		default: true
	},
	showSeconds: {
		type: Boolean,
		default: true
	},
	separator: {
		type: Boolean,
		default: true
	},
	separatorType: {
		type: String,
		default: '/'
	},
	fontFamily: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSizeNumber: {
		type: Number,
		default: 2.5,
		validator: value => {
			return !value ? 2.5 : value
		}
	},
	fontSizeText: {
		type: Number,
		default: 1.3,
		validator: value => {
			return !value ? 1.3 : value
		}
	},
	fontSizeSeparator: {
		type: Number,
		default: 3,
		validator: value => {
			return !value ? 3 : value
		}
	},
	fontWeightNumber: {
		type: Number,
		default: 900,
		validator: value => {
			return !value ? 900 : value
		}
	},
	fontWeightText: {
		type: Number,
		default: 300,
		validator: value => {
			return !value ? 300 : value
		}
	},
	fontWeightSeparator: {
		type: Number,
		default: 900,
		validator: value => {
			return !value ? 900 : value
		}
	},
	containerWidth: {
		type: Number,
		default: 256,
		validator: value => {
			return !value ? 256 : value
		}
	},
	containerHeight: {
		type: Number,
		default: 43,
		validator: value => {
			return !value ? 43 : value
		}
	}
})

const {
	day,
	month,
	year,
	hour,
	minute,
	second,
	border,
	borderColor,
	textColor,
	numberColor,
	separatorColor,
	fontFamily,
	fontSizeNumber,
	fontSizeText,
	fontSizeSeparator,
	fontWeightNumber,
	fontWeightText,
	fontWeightSeparator,
	containerWidth,
	containerHeight
} = toRefs(props)

const interval = ref(1000)
const intervalId = ref('')
const currentSecond = ref(0)
const currentMinute = ref(0)
const currentHour = ref(0)
const currentDay = ref(0)
const oldDistance = ref(0)
const playCountdown = ref(false)

const formatDefaultValues = computed(() => {
	const textColorValue = !textColor.value ? '#000' : textColor.value
	const numberColorValue = !numberColor.value ? '#000' : numberColor.value
	const separatorColorValue = !separatorColor.value ? '#000' : separatorColor.value
	const borderColorValue = !borderColor.value ? '#000' : borderColor.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeNumberValue = !fontSizeNumber.value ? 2.6 : fontSizeNumber.value
	const fontSizeTextValue = !fontSizeText.value ? 1.3 : fontSizeText.value
	const fontSizeSeparatorValue = !fontSizeSeparator.value ? 3 : fontSizeSeparator.value
	const fontWeightNumberValue =
		!fontWeightNumber.value || fontWeightNumber.value < 0 ? 900 : fontWeightNumber.value
	const fontWeightTextValue =
		!fontWeightText.value || fontWeightText.value < 0 ? 300 : fontWeightText.value
	const fontWeightSeparatorValue =
		!fontWeightSeparator.value || fontWeightSeparator.value < 0 ? 900 : fontWeightSeparator.value
	const containerWidthValue = !containerWidth.value ? 256 : containerWidth.value
	const containerHeightValue = !containerHeight.value ? 43 : containerHeight.value

	return {
		color: textColorValue,
		numberColor: numberColorValue,
		separatorColor: separatorColorValue,
		borderColor: borderColorValue,
		font: fontValue,
		fontSizeNumber: fontSizeNumberValue,
		fontSizeText: fontSizeTextValue,
		fontSizeSeparator: fontSizeSeparatorValue,
		fontWeightNumber: fontWeightNumberValue,
		fontWeightText: fontWeightTextValue,
		fontWeightSeparator: fontWeightSeparatorValue,
		containerWidth: containerWidthValue,
		containerHeight: containerHeightValue
	}
})
const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	const newWidth = border.value ? defaultValues.containerWidth + 12 : defaultValues.containerWidth

	return {
		width: `${newWidth}px`
	}
})
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	let borderConfig = {}
	const widthSize = 12
	const heightSize = 18

	if (border.value) {
		borderConfig = {
			padding: `${heightSize / 2}px ${widthSize / 2}px`,
			border: `1px solid ${defaultValues.borderColor}`
		}
	}

	const newWidth = border.value
		? defaultValues.containerWidth + widthSize
		: defaultValues.containerWidth
	const newHeight = border.value
		? defaultValues.containerHeight + heightSize
		: defaultValues.containerHeight

	return {
		width: `${newWidth}px`,
		height: `${newHeight}px`,
		...borderConfig
	}
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})

const styleNumber = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		color: defaultValues.numberColor,
		fontSize: `${defaultValues.fontSizeNumber}em`,
		fontWeight: defaultValues.fontWeightNumber
	}
})
const styleText = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		color: defaultValues.color,
		fontSize: `${defaultValues.fontSizeText}em`,
		fontWeight: defaultValues.fontWeightText
	}
})
const styleSeparator = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		color: defaultValues.separatorColor,
		fontSize: `${defaultValues.fontSizeSeparator}em !important`,
		fontWeight: defaultValues.fontWeightSeparator
	}
})

const isValidProps = computed(() => {
	const hasDay = validDay(day.value)
	const hasMonth = validMonth(month.value)
	const hasYear = validYear(year.value)
	const hasHour = validHour(hour.value)
	const hasMinute = validMinute(minute.value)
	const hasSecond = validSecond(second.value)

	return hasDay && hasMonth && hasYear && hasHour && hasMinute && hasSecond
})

const formatStringDate = computed(() => {
	return `${month.value} ${day.value}, ${year.value} ${hour.value}:${minute.value}:${second.value}`
})

const negativeNumber = computed(() => {
	const zeroDay = !currentDay.value || currentDay.value <= 0
	const zeroHour = !currentHour.value || currentHour.value <= 0
	const zeroMinute = !currentMinute.value || currentMinute.value <= 0
	const zeroSecond = !currentSecond.value || currentSecond.value <= 0

	return zeroDay && zeroHour && zeroMinute && zeroSecond
})

onMounted(() => {
	if (isValidProps.value) {
		runInterval()
	} else {
		playCountdown.value = false
	}
})

const newYear = () => {
	const configS = interval.value

	const countDownDate = new Date(formatStringDate.value).getTime()
	const now = new Date().getTime()
	const distance = countDownDate - now
	oldDistance.value = distance

	const newDay = Math.floor(distance / (configS * 60 * 60 * 24))
	const newHour = Math.floor((distance % (configS * 60 * 60 * 24)) / (configS * 60 * 60))
	const newMinute = Math.floor((distance % (configS * 60 * 60)) / (configS * 60))
	const newSecond = Math.floor((distance % (configS * 60)) / configS)

	currentDay.value = newDay >= 0 ? newDay : 0
	currentHour.value = newHour >= 0 ? newHour : 0
	currentMinute.value = newMinute >= 0 ? newMinute : 0
	currentSecond.value = newSecond >= 0 ? newSecond : 0
}

const runInterval = () => {
	emit('started')

	playCountdown.value = true

	intervalId.value = setInterval(() => {
		newYear()
	}, interval.value)
}

const formatNumber = value => {
	return value >= 0 && value <= 9 ? `0${value}` : value
}

const reset = () => {
	if (intervalId.value) clearInterval(intervalId.value)

	playCountdown.value = false
	runInterval()
}

watch(oldDistance, () => {
	if (negativeNumber.value && intervalId.value) {
		clearInterval(intervalId.value)
		emit('finished')
	}
})

watch(day, () => {
	reset()
})
watch(month, () => {
	reset()
})
watch(year, () => {
	reset()
})
watch(hour, () => {
	reset()
})
watch(minute, () => {
	reset()
})
watch(second, () => {
	reset()
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

	display: inline-block;

	text-align: center;
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

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	display: inline-block;
	vertical-align: baseline;
	height: auto;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex: 0 0 auto;
	text-wrap: nowrap;

	.component__items {
		position: relative;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		color: burlywood;

		.component__items-number {
			position: relative;
			display: block;
			margin: 0;
			letter-spacing: 2px;
			line-height: 1;
			height: auto;
			overflow: hidden;
		}

		.component__items-text {
			position: relative;
			display: block;
			margin: 0;
			letter-spacing: 1px;
			overflow: hidden;
		}
	}

	.component__separator {
		position: relative;
		margin: 0 5px;
		padding: 0;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		p {
			margin: 0;
			line-height: 1;
		}
	}
}
</style>
