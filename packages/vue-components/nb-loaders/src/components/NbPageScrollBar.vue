<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
    role="status"
    v-bind="computedAriaAttrs"
	>
		<div
			:id="nbId"
      class="nb-reset component"
			:style="[componentStyle]"
		>
      <div
        ref="componentProgressBar"
        class="component__progress-bar"
        :style="[progressBarStyle]"
      ></div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, watch, onMounted, onUnmounted } from 'vue'

defineOptions({
	name: 'NbPageScrollBar',
	inheritAttrs: false
})

onMounted(() => {
  // Verifica a posição inicial do scroll
  detectPageScroll()
  
  // Adiciona o listener para eventos de scroll
  window.addEventListener('scroll', detectPageScroll)
})

onUnmounted(() => {
  // Remove o listener quando o componente é desmontado
  window.removeEventListener('scroll', detectPageScroll)
})

const emit = defineEmits(['scrolled', 'scrolling'])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
  ariaLabel: {
    type: String,
    default: 'Alternate Text Button'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
	backgroundColor: {
		type: String,
		default: 'transparent'
  },
  progressColor: {
    type: String,
    default: 'linear-gradient(to right,rgb(118, 56, 250),rgb(255, 214, 0),rgb(255, 122, 0),rgb(255, 1, 105),rgb(211, 0, 197),rgb(118, 56, 250),rgb(255, 214, 0))'
  },
	height: {
		type: Number,
		default: 2
  },
	borderRadius: {
		type: Number,
		default: 0.5
	},
  position: {
    type: String,
    default: 'top',
    validator: (value) => {
      return ['top', 'bottom'].includes(value)
    }
  },
  top: {
    type: Number,
    default: 0
  },
  left: {
    type: Number,
    default: -1
  },
  right: {
    type: Number,
    default: -1
  },
  bottom: {
    type: Number,
    default: 0
  },
  zIndex: {
    type: Number,
    default: 1000
  }
})

const {
  ariaLabel,
  ariaAttrs,
	position,
	top,
	left,
	right,
	bottom,
	zIndex,
	backgroundColor,
	progressColor,
	height,
	borderRadius
} = toRefs(props)

const componentProgressBar = ref(null)
const scrolling = ref(false)
const show = ref(false)

const formatDefaultValues = computed(() => {
  const backgroundColorValue = !backgroundColor.value ? '#ffffff' : backgroundColor.value
  const progressColorValue = !progressColor.value ? '#ffffff' : progressColor.value
  const positionValue = !position ? 'top' : position.value
  const topValue = ((top.value !== 0 && !top.value) || top.value < 0) ? 0 : top.value
  const leftValue = ((left.value !== 0 && !left.value) || left.value < 0) ? 0 : left.value
  const rightValue = ((right.value !== 0 && !right.value) || right.value < 0) ? 0 : right.value
  const bottomValue = ((bottom.value !== 0 && !bottom.value) || bottom.value < 0) ? 0 : bottom.value
  const zIndexValue = ((zIndex.value !== 0 && !zIndex.value) || zIndex.value < 0) ? 1000 : zIndex.value
  const heightValue = ((height.value !== 0 && !height.value) || height.value < 0) ? 8 : height.value
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value

	return {
		backgroundColor: backgroundColorValue,
		progressColor: progressColorValue,
		position: positionValue,
		top: topValue,
		left: leftValue,
		right: rightValue,
		bottom: bottomValue,
		zIndex: zIndexValue,
		height: heightValue,
		borderRadius: borderRadiusValue
	}
})
const componentDisabled = computed(() => {
	return ''
})
const wrapperStyle = computed(() => {
	return {}
})
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

  let progressBarPosition = {}
  if (defaultValues.position === 'top') {
    progressBarPosition = {
      top: `${defaultValues.top}px`
    }
  } else {
    progressBarPosition = {
      bottom: `${defaultValues.bottom}px`
    }
  }

	return {
    height: `${defaultValues.height}px`,
    position: defaultValues.position,
    backgroundColor: defaultValues.backgroundColor,
    ...progressBarPosition,
		left: `${defaultValues.left}px`,
		right: `${defaultValues.right}px`,
		zIndex: defaultValues.zIndex
	}
})
const progressBarStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    height: `${defaultValues.height}px`,
    background: defaultValues.progressColor,
    width: '0',
    borderRadius: `${defaultValues.borderRadius}rem`
  }
})

const computedAriaAttrs = computed(() => {
  const newAttrs = {}

  if (ariaAttrs.value) {
    const attrKeys = Object.keys(ariaAttrs.value)

    attrKeys.forEach(key => newAttrs[`aria-${key}`] = ariaAttrs.value[key])
  }

  const attrs = {
    'aria-label': ariaLabel.value,
    'aria-busy': show.value,
    ...newAttrs
  }
  
  // Remove atributos undefined/null
  return Object.fromEntries(
    Object.entries(attrs).filter(([_, value]) => value !== undefined && value !== null)
  )
})

const detectPageScroll = () => {
  if (!componentProgressBar.value) return

  // Get the scroll position
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop

  // Get the height of the document
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

  // Get the percentage of the scroll position
  const scrolled = (winScroll / height) * 100

  // Set the scrolling state
  scrolling.value = scrolled > 0 ? true : false

  // Set the show state
  show.value = scrolling.value

  // Set the width of the progress bar
  componentProgressBar.value.style.width = `${scrolled}%`

  emit('scrolled', scrolled)
}

watch(scrolling, (newValue, oldValue) => {
  if (newValue !== oldValue) emit('scrolling', newValue)
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
}

.nb-reset {
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

	touch-action: manipulation;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	text-align: center;
	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;

  // Add new properties below
  width: 100%;
  height: 8px;
  background: #ccc;
  position: fixed;
}
</style>
