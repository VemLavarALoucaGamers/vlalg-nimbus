<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', orientationWrapperClass, componentDisabled]"
    :style="[wrapperStyle]"
    role="stepper"
    v-bind="computedAriaAttrs"
  >
    <div
      :id="nbId"
      ref="componentContainer"
      :class="['nb-reset', 'component', themeStyle, orientationComponentClass]"
      :style="[componentStyle]"
      :tabindex="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled ? -1 : tabIndex"
      :role="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled ? undefined : 'stepper'"
      :aria-disabled="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled"
    >
      <div
        :class="['component__content', orientationClass]"
      >
        <template
          v-for="(itemStep, index) in formatedValue.steps"
          :key="index"
        >
          <div
            v-if="!isFirstItem(index)"
            class="line"
            :class="{ 'done-step': formatedValue.step >= itemStep }"
          ></div>
          
          <div
            class="circle"
            :class="{
              'actual-step': isActualStep(itemStep),
              'done-step': isDoneStep(itemStep),
              'finished-step': isFinishedStep(itemStep)
            }"
            :tabindex="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled ? -1 : tabIndex"
            :role="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled ? undefined : 'stepper'"
            :aria-disabled="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled"
            @click="handleStepChange(itemStep)"
            @keydown.enter.prevent="handleTabIndex(itemStep, 'enter')"
            @keydown.space.prevent="handleTabIndex(itemStep, 'space')"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, watch } from 'vue'

defineOptions({
  name: 'NbStepper',
  inheritAttrs: false
})

onMounted(() => {})

const emit = defineEmits([
  'changed',
  'status'
])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	tabIndex: {
    type: Number,
    default: 0
  },
  hasTabIndexEnter: {
    type: Boolean,
    default: true
  },
  hasTabIndexSpace: {
    type: Boolean,
    default: true
  },
  ariaLabel: {
    type: String,
    default: 'Input Base'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
	disabled: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	theme: {
		type: String,
		default: 'light',
		validator: value => {
			return ['dark', 'light'].indexOf(value) !== -1
		}
	},
	// Cores do tema light
	lightLineColor: {
		type: String,
		default: '#cccccc'
	},
	lightCircleColor: {
		type: String,
		default: '#cccccc'
	},
	lightActiveColor: {
		type: String,
		default: '#9e9e9e'
	},
	lightDoneColor: {
		type: String,
		default: '#9e9e9e'
	},
	lightFinishedColor: {
		type: String,
		default: '#ebebeb'
	},
	lightFocusColor: {
		type: String,
		default: '#9e9e9e'
	},
	// Cores do tema dark — mesma rampa que o light (trilha → borda → ativo → feito → final), em tons sobre fundo escuro
  
  darkLineColor: {
		type: String,
		default: '#939090'
	},
  darkCircleColor: {
		type: String,
		default: '#939090'
	},
	darkActiveColor: {
		type: String,
		default: '#646464'
	},
	darkDoneColor: {
		type: String,
		default: '#525151'
	},
	darkFinishedColor: {
		type: String,
		default: '#000000'
	},
  darkFocusColor: {
		type: String,
		default: '#525151'
	},
  step: {
    type: Number,
    default: 0,
    validator: (value) => {
        return value >= 0
    }
  },
  steps: {
    type: Number,
    default: 2,
    validator: (value) => {
        return value >= 2
    }
  },
  transition: {
    type: String,
    default: '0.3s',
    validator: (value) => {
        return ['0.3s', '0.5s', '1s'].includes(value)
    }
  },
  circleSize: {
    type: Number,
    default: 0.8,
    validator: (value) => {
        return value >= 0.8
    }
  },
  circleBorderSize: {
    type: Number,
    default: 0.13,
    validator: (value) => {
        return value >= 0.13
    }
  },
  lineSize: {
    type: Number,
    default: 0.1,
    validator: (value) => {
        return value >= 0.1
    }
  },
  blockClick: {
    type: Boolean,
    default: true,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value) => {
      return ['horizontal', 'vertical'].includes(value)
    }
  }
})

const {
	nbId,
	disabled,
	theme,
	lightLineColor,
  lightCircleColor,
  lightActiveColor,
  lightDoneColor,
  lightFinishedColor,
  lightFocusColor,
	darkLineColor,
  darkCircleColor,
  darkActiveColor,
  darkDoneColor,
  darkFinishedColor,
  darkFocusColor,
	tabIndex,
	hasTabIndexEnter,
  hasTabIndexSpace,
	ariaLabel,
	ariaAttrs,
	step,
	steps,
	transition,
	circleSize,
	circleBorderSize,
	lineSize,
	blockClick,
  orientation
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = orientation.value === 'vertical' ? 'inline-block' : 'block'
	const themeValue = !theme.value ? 'light' : theme.value
  
  const stepsValue = ((steps.value !== 0 && !steps.value) || steps.value < 2) ? 2 : steps.value
  const transitionValue = !transition.value ? '0.3s' : transition.value
  const circleSizeValue = !circleSize.value ? 0.8 : circleSize.value
  const circleBorderSizeValue = !circleBorderSize.value ? 0.13 : circleBorderSize.value
  const lineSizeValue = !lineSize.value ? 0.1 : lineSize.value

	return {
		disabled: disabledValue,
		display: displayValue,
		theme: themeValue,
		steps: stepsValue,
		transition: transitionValue,
		circleSize: circleSizeValue,
		circleBorderSize: circleBorderSizeValue,
		lineSize: lineSizeValue,
	}
})
const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabled
})
const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		display: defaultValues.display,
		overflow: 'hidden'
	}
})

const componentStyle = computed(() => {
	return {
		marginTop: '0',
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
    'aria-disabled': disabled.value,
    ...newAttrs
  }
  
  // Remove atributos undefined/null
  return Object.fromEntries(
    Object.entries(attrs).filter(([_, value]) => value !== undefined && value !== null)
  )
})
const themeStyle = computed(() => {
	switch (theme.value) {
		case 'dark':
			return 'component__theme--dark'
		default:
			return 'component__theme--light'
	}
})

// handle tab index enter
const handleTabIndex = (tabIndex, type = 'enter') => {
  // check if disabled or has tab index enter is disabled
  if (disabled.value || (type === 'enter' && !hasTabIndexEnter.value) || (type === 'space' && !hasTabIndexSpace.value)) return

  // change step
  changeStep(tabIndex)
}

/* New logic below */
const formatedValue = computed(() => {
	const defaultValues = formatDefaultValues.value
  const normalizedSteps = defaultValues.steps < 2 ? 2 : defaultValues.steps
  const normalizedStep = Math.min(Math.max(step.value, 0), normalizedSteps + 1)

  return {
    step: normalizedStep,
    steps: normalizedSteps
  }
})

const transitionStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `all ${defaultValues.transition} ease-in-out`
})

const circleSizeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.circleSize}rem`
})
const circleBorderSizeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.circleBorderSize}rem`
})
const lineSizeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.lineSize}rem`
})
const orientationClass = computed(() => {
  return orientation.value === 'vertical'
    ? 'component__content--vertical'
    : 'component__content--horizontal'
})
const orientationWrapperClass = computed(() => {
  return orientation.value === 'vertical' ? 'nb-wrapper--vertical' : 'nb-wrapper--horizontal'
})
const orientationComponentClass = computed(() => {
  return orientation.value === 'vertical' ? 'component--vertical' : 'component--horizontal'
})

const isFirstItem = (index) => {
  return index === 0
}
const isActualStep = (itemStep) => {
  return formatedValue.value.step === itemStep && formatedValue.value.step <= formatedValue.value.steps
}
const isDoneStep = (itemStep) => {
  return formatedValue.value.step > itemStep && itemStep < formatedValue.value.steps
}
const isFinishedStep = (itemStep) => {
  return formatedValue.value.step > formatedValue.value.steps && itemStep === formatedValue.value.steps
}
const cursorStyle = computed(() => {
  return blockClick.value ? 'default' : 'pointer'
})

const handleStepChange = (newStep) => {
  if (blockClick.value) return

  emit('changed', newStep)
}
const changeStep = (newStep) => {
  const currentStep = newStep

  emit('changed', currentStep)
}
const whereIsTheStep = (newStep) => {
  const currentStep = newStep

  let status = 'start'

  const firstStep = 1
  const lastStep = formatedValue.value.steps
  const finishedStep = lastStep + 1

  if (currentStep > lastStep) {
    status = 'finished'
  } else if (currentStep === lastStep) {
    status = 'end'
  } else if (currentStep > firstStep && currentStep < lastStep) {
    status = 'in progress'
  } else if (currentStep === firstStep) {
    status = 'start'
  } else if (currentStep >= finishedStep) {
    status = 'finished'
  }

  emit('status', status)
}

watch(step, (newVal, oldVal) => {
  if (newVal !== oldVal) changeStep(newVal)

  whereIsTheStep(newVal)
}, { immediate: true })
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
	position: relative;
}

.nb-wrapper--vertical {
  height: 100%;
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

	touch-action: manipulation;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	cursor: v-bind('cursorStyle');
	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;
  
  // Component style start below:
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  position: relative;

  &.component--vertical {
    height: 100%;
  }

  // inicio propTheme
  &.component__theme--light {
    .component__content {
      .circle {
        border-color: v-bind('lightCircleColor');

        &.actual-step {
          border-color: v-bind('lightActiveColor');
        }
      }

      .line {
        border-color: v-bind('lightLineColor');
        background-color: v-bind('lightLineColor');
      }

      .line,
      .circle {
        &.done-step  {
          background-color: v-bind('lightDoneColor');
          border-color: v-bind('lightDoneColor');
        }
      }

      .circle {
        &.finished-step  {
          background-color: v-bind('lightFinishedColor');
          border-color: v-bind('lightFinishedColor');
        }

        &:focus-visible {
          background-color: v-bind('lightFocusColor');
          border-color: v-bind('lightFocusColor') ;
        }
      }
    }
  }

  &.component__theme--dark {
    .component__content {
      .circle {
        border-color: v-bind('darkCircleColor');

        &.actual-step {
          border-color: v-bind('darkActiveColor');
        }
      }

      .line {
        border-color: v-bind('darkLineColor');
        background-color: v-bind('darkLineColor');
      }

      .line,
      .circle {
        &.done-step  {
          background-color: v-bind('darkDoneColor');
          border-color: v-bind('darkDoneColor');
        }
      }

      .circle {
        &.finished-step  {
          background-color: v-bind('darkFinishedColor');
          border-color: v-bind('darkFinishedColor');
        }

        &:focus-visible {
          background-color: v-bind('darkFocusColor');
          border-color: v-bind('darkFocusColor');
        }
      }
    }
  }
  // fim propTheme

  .component__content {
    display: inline-flex;
    align-items: center;
    width: 100%;

    .circle,
    .line {
      transition: v-bind('transitionStyle');
    }

    .circle {
      flex-shrink: 0;

      width: v-bind('circleSizeStyle');
      height: v-bind('circleSizeStyle');

      border-radius: 50%;
      border-style: solid;
      border-width: v-bind('circleBorderSizeStyle');

      &:focus {
      }

      &:focus-visible {
        /* Mantem indicador de foco sem "borda de radio" nativa */
        box-shadow: 0 0 0 2px currentColor;
      }
    }

    .line {
      width: 100%;
      border-style: solid;
      border-width: v-bind('lineSizeStyle');
    }

    &.component__content--vertical {
      flex-direction: column;
      width: auto;
      height: 100%;

      .line {
        width: v-bind('lineSizeStyle');
        flex: 1;
        min-height: v-bind('lineSizeStyle');
        border: 0;
      }
    }
  }
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	opacity: 0.5;

	.component {
		&.component__theme--light {}

		&.component__theme--dark {}
	}
}
</style>
