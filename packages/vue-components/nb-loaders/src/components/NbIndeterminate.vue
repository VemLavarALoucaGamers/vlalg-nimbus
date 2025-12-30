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
      <div class="component__indeterminate"></div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, watch } from 'vue'

defineOptions({
	name: 'NbIndeterminate',
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
  progressBarColor: {
    type: String,
    default: '#020617'
  },
  height: {
    type: Number,
    default: 3
  },
	borderRadius: {
		type: Number,
		default: 0.375
	}
})

const {
  show,
  ariaLabel,
  ariaAttrs,
  backgroundColor,
  progressBarColor,
	borderRadius,
	height
} = toRefs(props)

const formatDefaultValues = computed(() => {
  const backgroundColorValue = !backgroundColor.value ? '#e2e8f0' : backgroundColor.value
  const progressBarColorValue = !progressBarColor.value ? '#020617' : progressBarColor.value
  const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
  const heightValue = ((height.value !== 0 && !height.value) || height.value < 0) ? 6 : height.value

  return {
    backgroundColor: backgroundColorValue,
    progressBarColor: progressBarColorValue,
    borderRadius: borderRadiusValue,
    height: heightValue
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

  return {
    borderRadius: `${defaultValues.borderRadius}rem`,
    height: `${defaultValues.height}px`
  }
})

const styleBackgroundColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.backgroundColor
})
const styleProgressBarColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.progressBarColor
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

  display: block;
  position: relative;
  overflow: hidden;
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

  .component__indeterminate {
    background-color: v-bind('styleProgressBarColor');

    &::before,
    &::after {
      content: '';
      position: absolute;
      background: inherit;
      inset-block-start: 0;
      inset-inline-start: 0;
      inset-block-end: 0;
      will-change: inset-inline-start, inset-inline-end;
      animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      animation-delay: 1.15s;
    }

    @keyframes p-progressbar-indeterminate-anim-short {
      0% {
        inset-inline-start: -200%;
        inset-inline-end: 100%;
      }
      60% {
          inset-inline-start: 107%;
          inset-inline-end: -8%;
      }
      100% {
          inset-inline-start: 107%;
          inset-inline-end: -8%;
      }
    }
  }
}
</style>
