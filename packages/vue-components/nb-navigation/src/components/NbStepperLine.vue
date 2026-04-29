<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle]"
    role="stepper"
    v-bind="computedAriaAttrs"
  >
    <div
      :id="nbId"
      ref="componentContainer"
      :class="['nb-reset', 'component', themeStyle]"
      :style="[componentStyle]"
      :tabIndex="!blockClick || !hasTabIndexEnter || disabled ? -1 : tabIndex"
    >
      <div
        :class="['component__content']"
      >
        <div class="nb-stepper-line" role="tablist" aria-busy="true">
          <div class="nb-stepper-line__items">
            <div class="nb-stepper-line__fit">
              <div class="nb-stepper-line__track">
                <div class="nb-stepper-line__nav">
                  <button
                    v-for="item in navItems"
                    :key="item.id"
                    :aria-label="item.title"
                    role="tab"
                    class="nb-stepper-line__item"
                    :class="{
                      'nb-stepper-line__item--selected': selected === item.id,
                      'nb-stepper-line__item--future': item.future
                    }"
                    @click="changeSelected(item.id)"
                  >
                    <span class="nb-stepper-line__counter">{{ item.id }}.</span>
                    <span
                      aria-hidden="true"
                      class="nb-stepper-line__label"
                      :class="{ 'nb-stepper-line__label--selected': selected === item.id }"
                    >
                      <strong>{{ item.title }}</strong>
                      <span>{{ item.title }}</span>
                    </span>
                    <em
                      v-if="item.isNew"
                      class="nb-stepper-line__new"
                      :class="{ 'nb-stepper-line__new--selected': selected === item.id }"
                    >
                      Novo
                    </em>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
		default: 'tomato'
	},
  lightCircleColor: {
		type: String,
		default: 'red'
	},
	lightActiveColor: {
		type: String,
		default: 'green'
	},
	lightDoneColor: {
		type: String,
		default: 'blue'
	},
	lightFinishedColor: {
		type: String,
		default: 'cyan'
	},
	// Cores do tema dark
  darkLineColor: {
		type: String,
		default: '#a1def3'
	},
  darkCircleColor: {
		type: String,
		default: '#79d1ef'
	},
	darkActiveColor: {
		type: String,
		default: '#066f93'
	},
	darkDoneColor: {
		type: String,
		default: '#066f93'
	},
	darkFinishedColor: {
		type: String,
		default: '#003041'
	},
  step: {
    type: Number,
    default: 0,
    validator: (value) => {
        return value >= 0
    }
  },
  steps: {
    type: [Number, Array],
    default: 2,
    validator: (value) => {
      if (Array.isArray(value)) return value.length >= 2
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
	darkLineColor,
  darkCircleColor,
  darkActiveColor,
  darkDoneColor,
  darkFinishedColor,
	tabIndex,
	hasTabIndexEnter,
	ariaLabel,
	ariaAttrs,
	step,
	steps,
	transition,
	circleSize,
	circleBorderSize,
	lineSize,
	blockClick
} = toRefs(props)

const selected = ref(step.value || 1)
const navItems = computed(() => {
  if (Array.isArray(steps.value)) {
    return steps.value.map((item, index) => {
      if (typeof item === 'object' && item !== null) {
        return {
          id: item.id ?? index + 1,
          title: item.title ?? `Step ${index + 1}`,
          isNew: Boolean(item.isNew),
          future: Boolean(item.future)
        }
      }

      return {
        id: index + 1,
        title: String(item),
        isNew: false,
        future: false
      }
    })
  }

  const total = Number(steps.value) >= 2 ? Number(steps.value) : 2
  return Array.from({ length: total }, (_, index) => ({
    id: index + 1,
    title: `Step ${index + 1}`,
    isNew: false,
    future: false
  }))
})

const changeSelected = (value) => {
  selected.value = value
  handleStepChange(value)
}

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = 'block'
	const themeValue = !theme.value ? 'light' : theme.value
  
  const stepsCount = Array.isArray(steps.value) ? steps.value.length : steps.value
  const stepsValue = ((stepsCount !== 0 && !stepsCount) || stepsCount < 2) ? 2 : stepsCount
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
	const defaultValues = formatDefaultValues.value

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
const styleDisabledColor = computed(() => {
  switch (theme.value) {
    case 'dark':
      return darkDisabledColor.value
    default:
      return lightDisabledColor.value
  }
})
const styleActiveColor = computed(() => {
  switch (theme.value) {
    case 'dark':
      return darkActiveColor.value
    default:
      return lightActiveColor.value
  }
})

// handle tab index enter
const handleTabIndexEnter = (tabIndex) => {
  // check if disabled or has tab index enter is disabled
  if (disabled.value || !hasTabIndexEnter.value) return

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
  selected.value = newVal

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
    }

    .line {
      width: 100%;
      border-style: solid;
      border-width: v-bind('lineSizeStyle');
    }
  }
}

.nb-stepper-line {
  color: #1a1a1a;
  display: block;
  font-size: clamp(14px, 0.9375vw, 18px);
  height: clamp(72px, 5vw, 96px);
  width: 100%;
  padding: 8px 0 8px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms;
}

.nb-stepper-line__items {
  align-items: center;
  display: flex;
  width: 100%;
}

.nb-stepper-line__fit {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

.nb-stepper-line__track {
  position: relative;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  height: 100%;
  width: 100%;
}

.nb-stepper-line__nav {
  display: flex;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  height: 100%;
  position: relative;
}

.nb-stepper-line__item {
  appearance: none;
  background: transparent none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 0 1 2.4em;
  min-width: 1.6em;
  max-height: 4em;
  opacity: 0.5;
  overflow: hidden;
  padding-top: 2em;
  padding-inline: 0.5em;
  position: relative;
  text-align: left;
  color: inherit;
  line-height: 1;
  transition: flex 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms,
    color 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms,
    opacity 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms;
}

.nb-stepper-line__item::before {
  background-color: currentColor;
  content: "";
  display: block;
  height: 2px;
  left: 0.5em;
  opacity: 0.5;
  position: absolute;
  right: 0.5em;
  top: 50%;
  transition: opacity 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms;
}

.nb-stepper-line__item--future {
  opacity: 0.75;
}

.nb-stepper-line__item--selected {
  color: #1a59c8;
  flex: 1 1 8em;
  min-width: 6em;
  opacity: 1;
}

.nb-stepper-line__item--selected::before {
  opacity: 1;
}

.nb-stepper-line__counter {
  left: 0.5em;
  position: absolute;
  text-align: end;
  top: 0.5em;
  white-space: nowrap;
}

.nb-stepper-line__label {
  line-height: 1.5;
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  transition: max-width 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms,
    opacity 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms;
}

.nb-stepper-line__label--selected {
  max-width: 20em;
  opacity: 1;
}

.nb-stepper-line__label > strong,
.nb-stepper-line__label > span {
  transition: opacity 0.1s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms;
}

.nb-stepper-line__label > strong {
  font-weight: 600;
  opacity: 0;
}

.nb-stepper-line__label > span {
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
}

.nb-stepper-line__label--selected > strong {
  opacity: 1;
}

.nb-stepper-line__label--selected > span {
  opacity: 0;
}

.nb-stepper-line__new {
  background: #fec846;
  border-radius: 0.25em;
  color: #000;
  display: inline-block;
  flex: none;
  font-size: clamp(6px, 0.5em, 8px);
  font-style: normal;
  font-weight: 600;
  margin-inline-start: 0.66em;
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  padding: 0.33em;
  position: relative;
  text-transform: uppercase;
  top: 0.25em;
  white-space: nowrap;
  transition: max-width 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms,
    opacity 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms;
}

.nb-stepper-line__new--selected {
  max-width: 20em;
  opacity: 1;
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
