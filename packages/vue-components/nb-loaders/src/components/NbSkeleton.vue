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
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, watch } from 'vue'

defineOptions({
	name: 'NbSkeleton',
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
    default: '#e2e8f0'
  },
  gradientDirection: {
    type: String,
    default: '90deg'
  },
  gradienteColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0)'
  },
  gradientAnimationDuration: {
    type: String,
    default: '1.2s'
  },
})

const {
  show,
  ariaLabel,
  ariaAttrs,
  backgroundColor,
  gradienteColor,
  gradientDirection,
  gradientAnimationDuration
} = toRefs(props)

const formatDefaultValues = computed(() => {
  const backgroundColorValue = !backgroundColor.value ? '#e2e8f0' : backgroundColor.value
  const gradienteColorValue = !gradienteColor.value ? 'rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0)' : gradienteColor.value
  const gradientDirectionValue = !gradientDirection.value ? '90deg' : gradientDirection.value
  const gradientAnimationDurationValue = !gradientAnimationDuration.value ? '1.2s' : gradientAnimationDuration.value

  return {
    backgroundColor: backgroundColorValue,
    gradienteColor: gradienteColorValue,
    gradientDirection: gradientDirectionValue,
    gradientAnimationDuration: gradientAnimationDurationValue
  }
})
const componentDisabled = computed(() => {
	return ''
})
const wrapperStyle = computed(() => {
	return {
		position: 'relative',
		display: 'block',
		width: '100%',
		height: '100%'
	}
})
const componentStyle = computed(() => {
	return {}
})

const styleBackgroundColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.backgroundColor
})
const styleGradienteColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `linear-gradient(${defaultValues.gradientDirection}, ${defaultValues.gradienteColor})`
})
const styleGradientAnimationDuration = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.gradientAnimationDuration
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
  background-color: v-bind('styleBackgroundColor');
  overflow: hidden;
  
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;

  &::after {
    background: v-bind('styleGradienteColor');
    content: '';
    animation-name: skeleton-animation;
    animation-duration: v-bind('styleGradientAnimationDuration');
    animation-iteration-count: infinite;
    transform: translateX(-100%);
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }

  @keyframes skeleton-animation {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
