<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', wrapperComponentDisabled]"
		:style="[wrapperStyle]"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component']"
			:style="[componentDisabled]"
			style="text-align: center"
		>
			<div
				class="slide-container"
				ref="container"
				:style="[containerStyle, componentStyle]"
			>
				<div class="slide-container__border"></div>

				<div
					v-if="showProgressBar"
					class="slide-container__progress"
					:style="[progressStyle]"
				/>

				<div
					id="row"
					ref="row"
					:style="[rowStyle]"
					class="slide-container__row"
				>
					<div
						:id="`${nbId}-slot${index}`"
						v-for="(item, index) in slotsLength"
						:key="index"
						class="slide"
						ref="slides"
						:style="[slidesStyle]"
					>
						<slot :name="`slides${item}`" />
					</div>
				</div>
			</div>

			<ul
				v-if="showButtons"
				style="list-style-type: none"
				class="slide-buttons"
			>
				<li
					v-for="(item, index) in slotsLength"
					:key="index"
					:class="[
						'slide-buttons__button',
						currentIndex === index ? 'slide-buttons__button--active' : ''
					]"
					:style="[
						slideButtonsStyle,
						slideButtonsStyleColor,
						currentIndex === index || index === hoverSlideButton ? slideButtonsActiveStyleColor : ''
					]"
					data-index="index"
					:disabled="currentIndex === index"
					@mouseenter="changeSlideButtonHover(index)"
					@mouseleave="changeSlideButtonHover(null)"
					@click="slideButtons(index)"
				></li>
			</ul>

			<div
				v-if="isDevelopment"
				class="controls"
			>
				<progress
					id="progress"
					:value="progress"
					max="100"
				/>

				<br />

				<button
					v-for="(item, index) in slotsLength"
					:key="index"
					class="slide-button"
					data-index="index"
					:disabled="disabled || currentIndex === index"
					@click="slideButtons(index)"
				>
					Slide {{ index + 1 }}
				</button>

				<br /><br />

				<p class="timer-info">{{ timerInfo }}</p>

				<button
					id="pause"
					@click="pauseButton"
				>
					Pause
				</button>

				<button
					id="play"
					@click="playButton"
				>
					Play
				</button>

				<button
					id="restart"
					@click="restartButton"
				>
					Restart
				</button>

				<button
					id="replay"
					@click="replayButton"
				>
					replay
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import {
	defineOptions,
	toRefs,
	computed,
	ref,
	onMounted,
	onBeforeUnmount,
	onBeforeUpdate,
	watch,
	useSlots
} from 'vue'

defineOptions({
	name: 'NbSlideDivFixedSize',
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
	disabled: {
		type: Boolean,
		default: false,
		validator: value => {
			return !!(typeof value === 'boolean' && [true, false].includes(value))
		}
	},
	borderRadius: {
		type: Number,
		default: 0.375
	},
	slideType: {
		type: String,
		default: 'transform',
		validator: value => {
			return ['transform', 'z-index'].includes(value)
		}
	},
	slideWidth: {
		type: Number,
		default: 200
	},
	slideHeight: {
		type: Number,
		default: 200
	},
	slideInterval: {
		type: Number,
		default: 5000
	},
	showButtons: {
		type: Boolean,
		default: true
	},
	buttonsSize: {
		type: Number,
		default: 10
	},
	buttonMarginTop: {
		type: Number,
		default: 10
	},
	buttonMarginBottom: {
		type: Number,
		default: 10
	},
	buttonsColor: {
		type: String,
		default: 'tomato'
	},
	buttonsColorHover: {
		type: String,
		default: 'blue'
	},
	showProgressBar: {
		type: Boolean,
		default: false,
		validator: value => {
			return !!(typeof value === 'boolean' && [true, false].includes(value))
		}
	},
	progressColor: {
		type: String,
		default: 'blue'
	}
})

const {
	nbId,
	display,
	borderRadius,
	disabled,
	slideType,
	slideWidth,
	slideHeight,
	slideInterval,
	buttonsSize,
	buttonMarginTop,
	buttonMarginBottom,
	buttonsColor,
	buttonsColorHover,
	progressColor
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const nbIdValue = !nbId.value ? '' : nbId.value
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const slideTypeValue = !slideType.value ? 'transform' : slideType.value
	const slideWidthValue = !slideWidth.value ? 200 : slideWidth.value
	const slideHeightValue = !slideHeight.value ? 200 : slideHeight.value
	const slideIntervalValue = !slideInterval.value ? 5000 : slideInterval.value
	const buttonsSizeValue = !buttonsSize.value ? 10 : buttonsSize.value
	const buttonMarginTopValue = !buttonMarginTop.value ? 10 : buttonMarginTop.value
	const buttonMarginBottomValue = !buttonMarginBottom.value ? 10 : buttonMarginBottom.value
	const buttonsColorValue = !buttonsColor ? 'tomato' : buttonsColor.value
	const buttonsColorHoverValue = !buttonsColorHover ? 'blue' : buttonsColorHover.value
	const progressColorValue = !progressColor.value ? 'blue' : progressColor.value

	return {
		nbId: nbIdValue,
		disabled: disabledValue,
		display: displayValue,
		borderRadius: borderRadiusValue,
		slideType: slideTypeValue,
		slideWidth: slideWidthValue,
		slideHeight: slideHeightValue,
		slideInterval: slideIntervalValue,
		buttonsSize: buttonsSizeValue,
		buttonMarginTop: buttonMarginTopValue,
		buttonMarginBottom: buttonMarginBottomValue,
		buttonsColor: buttonsColorValue,
		buttonsColorHover: buttonsColorHoverValue,
		progressColor: progressColorValue
	}
})
const wrapperComponentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabled
})
const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	if (defaultValues.disabled) return {}

	return {
		backgroundColor: `${defaultValues.buttonColor} !important`,
		color: `${defaultValues.textColor} !important`
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

	return {
		borderRadius: `${defaultValues.borderRadius}rem`
	}
})
const containerStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	const currentSlideType = defaultValues.slideType

	return {
		width: `${defaultValues.slideWidth}px`,
		height: `${defaultValues.slideHeight}px`,
		overflow: currentSlideType === 'transform' ? 'hidden' : 'visible'
	}
})
const rowStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	const currentSlideType = defaultValues.slideType

	// transition: linear; ease; ease-in; ease-out; ease-in-out;
	const transition =
		currentSlideType === 'transform' ? { transition: 'transform 500ms ease-in-out' } : {}

	return {
		width: `${defaultValues.slideWidth * slotsLength.value}px`,
		height: `${defaultValues.slideHeight}px`,
		...transition,
		transform:
			currentSlideType === 'transform'
				? `translateX(-${defaultValues.slideWidth * currentIndex.value}px)`
				: 'translateX(0)',
		display: currentSlideType === 'transform' ? 'flex' : 'initial'
	}
})
const slidesStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	const currentSlideType = defaultValues.slideType

	const otherConfigs =
		currentSlideType === 'transform'
			? { position: 'relative' }
			: {
					position: 'absolute'
			  }

	return {
		overflow: 'hidden',
		width: `${defaultValues.slideWidth}px`,
		height: `${defaultValues.slideHeight}px`,
		...otherConfigs
	}
})
const slideButtonsStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		width: `${defaultValues.buttonsSize}px`,
		height: `${defaultValues.buttonsSize}px`,
		margin: `${defaultValues.buttonMarginTop}px 5px ${defaultValues.buttonMarginBottom}px 5px`
	}
})
const slideButtonsStyleColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		background: defaultValues.buttonsColor
	}
})
const slideButtonsActiveStyleColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		background: defaultValues.buttonsColorHover
	}
})
const progressStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		width: `${progress.value}%`,
		background: defaultValues.progressColor
	}
})

const isDevelopment = ref(false)
const container = ref(null)
const slides = ref(null)
const row = ref(null)
const hoverSlideButton = ref(null)

const slots = useSlots()
const slotsLength = ref(0)
const slotsList = ref([])
const hasSlots = ref(false)

const currentIndex = ref(0)
const timeElapsed = ref(0)
const setIntervalInstance = ref(null)
const progress = ref(0)
const percentage = ref(0)
const isPaused = ref(false)
const hasReplay = ref(true)

const timerInfo = ref('')

function getSlotList() {
	const list = Object.keys(slots).filter(key => key.includes('slides'))

	if (list.length) {
		slotsLength.value = list.length
		slotsList.value = list
		hasSlots.value = true
	} else {
		slotsLength.value = 0
		slotsList.value = []
		hasSlots.value = false
	}
}

function updateProgress() {
	const defaultValues = formatDefaultValues.value
	const currentSlideInterval = defaultValues.slideInterval

	percentage.value = (timeElapsed.value / currentSlideInterval) * 100
	progress.value = percentage.value

	changeInfo()
}

function changeInfo() {
	const defaultValues = formatDefaultValues.value

	const infoTimer = `Timer: ${currentIndex.value + 1} / ${slotsLength.value}`
	const infoProgress = `Progress: ${percentage.value.toFixed(3)}%`
	const infoTime = `Time: ${timeElapsed.value / 1000} seconds`
	const infoPause = `Pause: ${isPaused.value}`

	timerInfo.value = `${infoTimer} | ${infoProgress} | ${infoTime} | ${infoPause}`
}

function scrollToSlide(slideIndex = 0) {
	const defaultValues = formatDefaultValues.value

	const distanceToScroll = defaultValues.slideWidth * slideIndex

	if (row.value) row.value.style.transform = `translateX(-${distanceToScroll}px)`

	currentIndex.value = slideIndex
	timeElapsed.value = 0
	updateProgress()
	startSlideShow(slideIndex)
}

function changeZIndex(index = 0) {
	formatSlots(index)

	currentIndex.value = index
	timeElapsed.value = 0
	updateProgress()
	startSlideShow(index)
}

function changeSlide(index = 0) {
	if (setIntervalInstance.value) {
		removeSetIntervalInstance()
	}

	if (!isPaused.value) updateDiv(index)
}

async function startSlideShow(newIndex = 0) {
	const defaultValues = formatDefaultValues.value
	const currentSlideType = defaultValues.slideType
	const currentSlideInterval = defaultValues.slideInterval

	await getSlotList()

	if (currentSlideType === 'z-index') formatSlots(newIndex)

	setIntervalInstance.value = setInterval(function () {
		timeElapsed.value += 100

		const isFinalTime = !!(timeElapsed.value > currentSlideInterval)
		const isLastSlide = !!(currentIndex.value === slotsLength.value - 1)

		if (!setIntervalInstance.value) removeSetIntervalInstance()

		if (isFinalTime) {
			removeSetIntervalInstance()

			if (!isLastSlide || (isLastSlide && hasReplay.value)) {
				const newNextIndex = (newIndex + 1) % slotsLength.value
				changeSlide(newNextIndex)
			}
		} else {
			updateProgress()
		}
	}, 100)
}

function slideButtons(index = 0) {
	if (currentIndex.value !== index) {
		isPaused.value = false

		removeSetIntervalInstance()

		updateDiv(index)
	}
}

function changeSlideButtonHover(index) {
	hoverSlideButton.value = index
}

function pauseButton() {
	isPaused.value = true
	removeSetIntervalInstance()
}

function playButton() {
	if (isPaused.value) {
		isPaused.value = false
		startSlideShow(currentIndex.value)
	} else {
		pauseButton()
	}
	changeInfo()
}

function restartButton() {
	isPaused.value = false

	removeSetIntervalInstance()

	updateDiv(0)
}

function replayButton() {
	hasReplay.value = !hasReplay.value
	restartButton()
}

function updateDiv(index = 0) {
	const defaultValues = formatDefaultValues.value
	const currentSlideType = defaultValues.slideType

	if (!isPaused.value) {
		if (currentSlideType === 'transform') {
			scrollToSlide(index)
		} else {
			changeZIndex(index)
		}
	}
}

async function formatSlots(index = 0) {
	const defaultValues = formatDefaultValues.value

	await getSlotList()

	slotsList.value.forEach((item, itemIndex) => {
		const elementItem = document.getElementById(`${defaultValues.nbId}-slot${itemIndex}`)

		if (elementItem) {
			if (index === itemIndex) {
				elementItem.classList.add('slide-z-index-1')
				elementItem.classList.remove('slide-z-index-0')
			} else {
				elementItem.classList.remove('slide-z-index-1')
				elementItem.classList.add('slide-z-index-0')
			}
		}
	})
}

function removeSetIntervalInstance() {
	clearInterval(setIntervalInstance.value)
	setIntervalInstance.value = null
}

function changeDisabled() {
	if (disabled.value) {
		pauseButton()
	} else {
		restartButton()
	}
}

onMounted(async () => {
	await getSlotList()

	if (disabled.value) {
		changeDisabled()
	} else {
		if (container.value && slides.value && row.value) {
			startSlideShow(0)
		}
	}
})

onBeforeUnmount(() => {
	removeSetIntervalInstance()
})

onBeforeUpdate(() => {
	getSlotList()
})

window.removeEventListener('beforeunload', function (event) {
	event.preventDefault()
	event.returnValue = ''
	removeSetIntervalInstance()
})

watch(slideType, () => {
	restartButton()
})

watch(disabled, value => {
	changeDisabled()
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

	user-select: none;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	vertical-align: bottom;

	.slide-container {
		margin: 0;
		padding: 0;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		white-space: nowrap;
		position: relative;
		display: inline-block;
		color: white;

		.slide-container__border {
			position: absolute;
			z-index: 17;
			// border: 1px solid black;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}

		.slide-container__progress {
			position: absolute;
			z-index: 1;
			bottom: 0;
			left: 0;
			right: 0;
			height: 5px;
			border: 0;
		}

		.slide-container__row {
			background: tomato;
			position: relative;

			.slide {
				vertical-align: top;
				text-align: left;

				&.slide-transform {
					position: relative;
					/*display: block;*/
				}

				&.slide-z-index-1 {
					z-index: 1;
				}
				&.slide-z-index-0 {
					z-index: 0;
				}
			}
		}
	}

	.slide-buttons {
		.slide-buttons__button {
			border-radius: 50%;
			display: inline-block;

			&:hover {
				cursor: pointer;
			}

			&.slide-buttons__button--active {
				cursor: inherit;
			}
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
	}
}

.controls {
	text-align: center;
	padding-top: 30px;
	font-size: 1.6em;
	font-weight: 800;
}
</style>
