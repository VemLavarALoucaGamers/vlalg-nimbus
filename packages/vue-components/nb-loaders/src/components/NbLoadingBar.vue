<template>
	<div
		v-if="nbId && show"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
    role="status"
    v-bind="computedAriaAttrs"
    @click.prevent="interacted"
	>
		<div
			:id="nbId"
      class="nb-reset component"
			:style="[componentStyle]"
		>
      <div class="component__loading-bar" :style="[styleLoadingBar]"></div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, watch } from 'vue'

defineOptions({
	name: 'NbLoadingBar',
	inheritAttrs: false
})

const emit = defineEmits(['clicked', 'changed'])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
  show: {
    type: Boolean,
    default: true
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
		default: 'white'
  },
  progressColor1: {
    type: String,
    default: 'rgb(34, 197, 94)'
  },
  progressColor2: {
    type: String,
    default: 'rgb(59, 130, 246)'
  },
  progressColor3: {
    type: String,
    default: 'rgb(168, 85, 247)'
  },
  progressColor4: {
    type: String,
    default: 'rgb(236, 72, 153)'
  },
  progressColor5: {
    type: String,
    default: 'rgb(251, 146, 60)'
  },
  progressColor6: {
    type: String,
    default: 'rgb(34, 197, 94)'
  },
  progressColor7: {
    type: String,
    default: 'rgb(59, 130, 246)'
  },
  progressColor8: {
    type: String,
    default: 'rgb(168, 85, 247)'
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
  show,
  ariaLabel,
  ariaAttrs,
	position,
	top,
	left,
	right,
	bottom,
	zIndex,
	backgroundColor,
	progressColor1,
	progressColor2,
	progressColor3,
	progressColor4,
	progressColor5,
	progressColor6,
	progressColor7,
	progressColor8,
	height,
	borderRadius
} = toRefs(props)

const progressGradient = computed(() => {
  const colors = [
    progressColor1.value || 'rgb(34, 197, 94)',
    progressColor2.value || 'rgb(59, 130, 246)',
    progressColor3.value || 'rgb(168, 85, 247)',
    progressColor4.value || 'rgb(236, 72, 153)',
    progressColor5.value || 'rgb(251, 146, 60)',
    progressColor6.value || 'rgb(34, 197, 94)',
    progressColor7.value || 'rgb(59, 130, 246)',
    progressColor8.value || 'rgb(168, 85, 247)'
  ]
  return `linear-gradient(to right, ${colors.join(', ')})`
})

const formatDefaultValues = computed(() => {
  const backgroundColorValue = !backgroundColor.value ? '#ffffff' : backgroundColor.value
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
    // backgroundColor: defaultValues.backgroundColor,
    ...progressBarPosition,
		left: `${defaultValues.left}px`,
		right: `${defaultValues.right}px`,
		zIndex: defaultValues.zIndex
	}
})
const styleLoadingBar = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    height: `${defaultValues.height}px`,
    backgroundImage: progressGradient.value,
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

const interacted = () => {
	emit('clicked')
}

watch(show, (value) => {
  emit('changed', value)
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
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  transform-origin: right;
  animation-name: xfa266b-B;
  animation-duration: 2s;
  animation-timing-function: ease-out;
  animation-iteration-count: 1;
  will-change: transform;

  .component__loading-bar {
    width: 100%;
    transform-origin: right;
    will-change: transform;
    animation-name: x1pudf4l-B;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes xfa266b-B {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }
  @keyframes x1pudf4l-B {
    0% {
      transform: translate(0) scaleX(6);
    }
    100% {
        transform: translate(500%) scaleX(6);
    }
  }
}
</style>
