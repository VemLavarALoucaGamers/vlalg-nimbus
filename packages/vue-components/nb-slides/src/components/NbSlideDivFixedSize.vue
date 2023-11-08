<template>
	<div
		v-if="nbId && quantidadeItens && quantidadeItens > 0"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component', 'component-transition']"
			:style="[componentStyle]"
		>
			<div
				class="container"
				ref="container"
				:style="[containerStyle]"
			>
				<div
					class="div-border"
					@mouseenter="pauseButton"
					@mouseleave="playButton"
				></div>
				<div
					id="linha"
					ref="linha"
					:style="[linhaStyle]"
					class=""
				>
					<div
						class="slide"
						ref="slides"
						:style="[slidesStyle]"
						v-for="(item, index) in quantidadeItens"
						:key="index"
						:id="`${nbId}-slot${index}`"
					>
						<slot :name="`slides${item}`" />
					</div>
				</div>
			</div>

			<br /><br />

			<div class="controls">
				<progress
					id="progress"
					:value="progress"
					max="100"
				/>

				<br />

				<button
					v-for="(item, index) in quantidadeItens"
					:key="index"
					class="slide-button"
					data-index="index"
					:disabled="currentIndex === index"
					@click="slideButtons(index)"
				>
					Slide {{ index + 1 }}
				</button>

				<br /><br />

				<p id="timer-info">{{ timerInfo }}</p>

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
import { defineProps, toRefs, computed, ref, onMounted, watch, useSlots } from 'vue'

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
		default: 'ib',
		validator: (value = 'b') => {
			const currentValue = value ? value.toLowerCase() : ''
			return ['b', 'ib'].includes(currentValue)
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
	quantidadeItens: {
		type: Number,
		default: 0
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
	quantidadeItens
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const nbIdValue = !nbId.value ? '' : nbId.value
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const slideTypeValue = !slideType.value ? 'transform' : slideType.value
	const slideWidthValue = !slideWidth.value ? 200 : slideWidth.value
	const slideHeightValue = !slideHeight.value ? 200 : slideHeight.value
	const quantidadeItensValue = !quantidadeItens.value ? 0 : quantidadeItens.value

	return {
		nbId: nbIdValue,
		disabled: disabledValue,
		display: displayValue,
		borderRadius: borderRadiusValue,
		slideType: slideTypeValue,
		slideWidth: slideWidthValue,
		slideHeight: slideHeightValue,
		quantidadeItens: quantidadeItensValue
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
		borderRadius: `${defaultValues.borderRadius}rem`
	}
})
const containerStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	const currentSlideType = defaultValues.slideType

	return {
		width: `${defaultValues.slideWidth}px`,
		height: `${defaultValues.slideHeight}px`,
		overflow: currentSlideType === 'transform' ? 'visible' : 'visible'
		// overflow: currentSlideType === 'transform' ? 'hidden' : 'visible' // Voltar
	}
})
const linhaStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	const currentSlideType = defaultValues.slideType

	// transition: linear; ease; ease-in; ease-out; ease-in-out;
	const transition =
		currentSlideType === 'transform' ? { transition: 'transform 500ms ease-in-out' } : {}

	return {
		width: `${defaultValues.slideWidth * defaultValues.quantidadeItens}px`,
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
					zIndex: 0,
					position: 'absolute'
			  }
	console.log({
		width: `${defaultValues.slideWidth}px`,
		height: `${defaultValues.slideHeight}px`,
		...otherConfigs
	})
	return {
		width: `${defaultValues.slideWidth}px`,
		height: `${defaultValues.slideHeight}px`,
		...otherConfigs
	}
})

const styleTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textColor
})
const styleButtonColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.buttonColor
})

const container = ref(null)
const slides = ref(null)
const linha = ref(null)

const slideLength = ref(0)
const hasSlots = ref(false)

const slideInterval = ref(2000) // 5000

const currentIndex = ref(0)
const timeElapsed = ref(0)
const timer = ref(null)
const progress = ref(0)
const percentage = ref(0)
const isPaused = ref(false)
const hasReplay = ref(true)

const timerInfo = ref('')

const lastIndex = formatDefaultValues.value.quantidadeItens - 1

function updateProgress() {
	percentage.value = (timeElapsed.value / slideInterval.value) * 100
	progress.value = percentage.value

	changeInfo()
}

function changeInfo() {
	const defaultValues = formatDefaultValues.value

	// console.log(currentIndex.value, currentIndex.value + 1, defaultValues.quantidadeItens)

	timerInfo.value = `
  Timer: ${currentIndex.value + 1} / ${defaultValues.quantidadeItens} |
  Progress: ${percentage.value.toFixed(3)}% |
  Time: ${timeElapsed.value / 1000} seconds |
  Pause: ${isPaused.value}`
}

function scrollToSlide(slideIndex) {
	const defaultValues = formatDefaultValues.value

	const distanceToScroll = defaultValues.slideWidth * slideIndex
	console.log('a -> ', currentIndex.value, slideIndex)
	linha.value.style.transform = `translateX(-${distanceToScroll}px)`

	currentIndex.value = slideIndex
	timeElapsed.value = 0
	updateProgress()
	startSlideShow(slideIndex)
}

function changeZIndex(index) {
	formatSlots(index)

	currentIndex.value = index
	timeElapsed.value = 0
	updateProgress()
	startSlideShow(index)
}

function changeSlide(index) {
	if (timer.value) {
		clearInterval(timer.value)
		timer.value = null
	}

	// const slideToEnd = (currentIndex === lastIndex) ? lastIndex : currentIndex
	// console.log(currentIndex, index, lastIndex, slideToEnd)
	// linha.appendChild(slides[slideToEnd])

	// console.log('1 -> ', index)

	if (!isPaused.value) updateDiv(index)
	// console.log('changeSlide', currentIndex.value, index)
}

function startSlideShow(newIndex) {
	const defaultValues = formatDefaultValues.value

	timer.value = setInterval(function () {
		timeElapsed.value += 100
		const isFinalTime = !!(timeElapsed.value > slideInterval.value)
		const isLastSlide = !!(currentIndex.value === defaultValues.quantidadeItens - 1)

		if (isFinalTime) {
			clearInterval(timer.value)
			timer.value = null

			if (!isLastSlide || (isLastSlide && hasReplay.value)) {
				const newNextIndex = (newIndex + 1) % defaultValues.quantidadeItens
				changeSlide(newNextIndex)
			}
		} else {
			updateProgress()
		}
	}, 100)
}

function slideButtons(index) {
	console.log(currentIndex.value !== index)
	if (currentIndex.value !== index) {
		isPaused.value = false
		clearInterval(timer.value)
		timer.value = null
		updateDiv(index)
	}
}

function pauseButton() {
	isPaused.value = true
	clearInterval(timer.value)
	timer.value = null
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
	clearInterval(timer.value)
	timer.value = null

	updateDiv(0)
}

function replayButton() {
	hasReplay.value = !hasReplay.value
	restartButton()
}

function updateDiv(index) {
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

function formatSlots(index) {
	console.log(index)
	const defaultValues = formatDefaultValues.value

	let slotsList = Object.keys(slots)

	slotsList = slotsList.slice(0, formatDefaultValues.value.quantidadeItens)

	if (!slotsList.length) {
		hasSlots.value = false
	} else {
		hasSlots.value = true

		slotsList.forEach((item, slotsListIndex) => {
			const element = document.getElementById(`${defaultValues.nbId}-slot${slotsListIndex}`)
			let defaultZIndex = 0

			if (index === slotsListIndex) defaultZIndex = 1

			element.style.zIndex = defaultZIndex
		})
	}
}

function startSlide() {
	// updateDiv(0)
	// formatSlots(0)
	startSlideShow(0)
}

const slots = useSlots()
onMounted(() => {
	// console.log(container.value, slides.value, linha.value)

	// Start
	startSlide()
})

watch(slideType, () => {
	setSlideType(0)
	restartButton()
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
	cursor: pointer;
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	.component {
		--disabled-button-color: v-bind('styleButtonColor');
		--disabled-color: v-bind('styleTextColor');
		background-color: var(--disabled-button-color) !important;
		color: var(--disabled-color) !important;
		opacity: 0.7;
		border-radius: inherit;
	}
}

.container {
	margin: 0;
	padding: 0;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	white-space: nowrap;
	position: relative;
	display: inline-block;
	color: white;
}

#linha {
	background: tomato;
	position: relative;
}

.div-border {
	position: absolute;
	z-index: 17;
	border: 1px solid black;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

.slide {
	vertical-align: top;
}
.slide.slide-transform {
	position: relative;
	/*display: block;*/
}
.slide.slide-z-index {
	z-index: 0;
	position: absolute;
}

.controls {
	text-align: center;
	margin-top: 10px;
}
</style>
