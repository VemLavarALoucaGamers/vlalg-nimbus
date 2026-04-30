<template>{{ selected }}
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
                    v-for="(item, index) in navItems"
                    :key="index"
                    :aria-label="item.title"
                    role="tab"
                    class="nb-stepper-line__item"
                    :class="{
                      'nb-stepper-line__item--selected': selected === index,
                    }"
                    @click="handleStepChange(index)"
                  >
                    <span
                      v-if="tabNumberShow"
                      class="nb-stepper-line__counter"
                      :style="ellipsisTextStyle"
                    >
                      <slot name="tab-number" :item="item">{{ index + 1 }}.</slot>
                    </span>

                    <span class="nb-stepper-line__line"></span>
                    
                    <span
                      v-if="labelShow"
                      class="nb-stepper-line__label"
                      :style="ellipsisTextStyle"
                    >
                      <strong>{{ item.title }}</strong>
                    </span>
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


  blockClick: {
    type: Boolean,
    default: true,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  gap: {
    type: Number,
    default: 1,
    validator: (value) => {
        return value >= 0
    }
  },
  ellipsisText: {
    type: Boolean,
    default: true,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  tabNumberShow: {
    type: Boolean,
    default: true,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  tabTextAlign: {
    type: String,
    default: 'right',
    validator: (value) => {
        return ['left', 'center', 'right'].includes(value)
    }
  },
  minWidth: {
    type: Number,
    default: 20,
    validator: (value) => {
        return value >= 20
    }
  },
  minWidthSelected: {
    type: Number,
    default: 6,
    validator: (value) => {
        return value >= 6
    }
  },
  maxWidth: {
    type: Number,
    default: 50,
    validator: (value) => {
        return value >= 50
    }
  },
  tabOpacity: {
    type: Number,
    default: 0.2,
    validator: (value) => {
        return value >= 0 && value <= 1
    }
  },
  tabSelectedOpacity: {
    type: Number,
    default: 1,
    validator: (value) => {
        return value >= 0 && value <= 1
    }
  },
  tabColor: {
    type: String,
    default: 'brown',
    validator: (value) => {
        return typeof value === 'string'
    }
  },
  tabColorSelected: {
    type: String,
    default: 'green',
    validator: (value) => {
        return typeof value === 'yellow'
    }
  },
  lineOpacity: {
    type: Number,
    default: 0.3,
    validator: (value) => {
        return value >= 0 && value <= 1
    }
  },
  lineSelectedOpacity: {
    type: Number,
    default: 1,
    validator: (value) => {
        return value >= 0 && value <= 1
    }
  },
  lineMarginTop: {
    type: Number,
    default: 3,
    validator: (value) => {
        return value >= 0
    }
  },
  lineMarginBottom: {
    type: Number,
    default: 3,
    validator: (value) => {
        return value >= 0
    }
  },
  lineHeight: {
    type: Number,
    default: 2,
    validator: (value) => {
        return value >= 2
    }
  },
  lineBackground: {
    type: String,
    default: 'red',
    validator: (value) => {
        return typeof value === 'string'
    }
  },
  lineBackgroundSelected: {
    type: String,
    default: 'blue',
    validator: (value) => {
        return typeof value === 'yellow'
    }
  },
  labelShow: {
    type: Boolean,
    default: true,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  labelTextAlign: {
    type: String,
    default: 'left',
    validator: (value) => {
        return ['left', 'center', 'right'].includes(value)
    }
  },
  labelSelectedOpacity: {
    type: Number,
    default: 1,
    validator: (value) => {
        return value >= 0 && value <= 1
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
  
	blockClick,
  gap,
  ellipsisText,
  tabTextAlign,
  minWidth,
  maxWidth,
  minWidthSelected,
  tabOpacity,
  tabSelectedOpacity,
  tabColor,
  tabColorSelected,
  lineOpacity,
  lineSelectedOpacity,
  lineMarginTop,
  lineMarginBottom,
  lineHeight,
  labelSelectedOpacity,
  labelTextAlign,
  lineBackground,
  lineBackgroundSelected,
} = toRefs(props)

const selected = ref(1)
const navItems = computed(() => {
  if (Array.isArray(steps.value)) {
    return steps.value.map((item, index) => {
      if (typeof item === 'object' && item !== null) {
        return {
          id: item.id ?? index + 1,
          title: item.title ?? `Step ${index + 1}`
        }
      }

      return {
        id: index + 1,
        title: String(item)
      }
    })
  }

  const total = Number(steps.value) >= 2 ? Number(steps.value) : 2
  return Array.from({ length: total }, (_, index) => ({
    id: index + 1,
    title: `Step ${index + 1}`
  }))
})

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = 'block'
	const themeValue = !theme.value ? 'light' : theme.value
  
  const stepsCount = Array.isArray(steps.value) ? steps.value.length : steps.value
  const stepsValue = ((stepsCount !== 0 && !stepsCount) || stepsCount < 2) ? 2 : stepsCount

  const gapValue = !gap.value ? 0.5 : gap.value
  const ellipsisTextValue = typeof ellipsisText.value === 'boolean'
    ? ellipsisText.value
    : false
  const tabTextAlignValue = !tabTextAlign.value ? 'right' : tabTextAlign.value
  const minWidthValue = ((minWidth.value !== 0 && !minWidth.value) || minWidth.value < 10) ? 20 : minWidth.value
  const minWidthSelectedValue = ((minWidthSelected.value !== 0 && !minWidthSelected.value) || minWidthSelected.value < 6) ? 6 : minWidthSelected.value
  const maxWidthValue = ((maxWidth.value !== 0 && !maxWidth.value) || maxWidth.value < 10) ? 50 : maxWidth.value
  const tabOpacityValue = ((tabOpacity.value !== 0 && !tabOpacity.value) || tabOpacity.value < 0 || tabOpacity.value > 1) ? 0.5 : tabOpacity.value
  const tabSelectedOpacityValue = ((tabSelectedOpacity.value !== 0 && !tabSelectedOpacity.value) || tabSelectedOpacity.value < 0 || tabSelectedOpacity.value > 1) ? 1 : tabSelectedOpacity.value
  const tabColorValue = !tabColor.value ? 'brown' : tabColor.value
  const tabColorSelectedValue = !tabColorSelected.value ? 'blue' : tabColorSelected.value
  const lineOpacityValue = ((lineOpacity.value !== 0 && !lineOpacity.value) || lineOpacity.value < 0 || lineOpacity.value > 1) ? 0.2 : lineOpacity.value
  const lineSelectedOpacityValue = ((lineSelectedOpacity.value !== 0 && !lineSelectedOpacity.value) || lineSelectedOpacity.value < 0 || lineSelectedOpacity.value > 1) ? 1 : lineSelectedOpacity.value
  const lineMarginTopValue = !lineMarginTop.value ? 3 : lineMarginTop.value
  const lineMarginBottomValue = !lineMarginBottom.value ? 4 : lineMarginBottom.value
  const lineHeightValue = !lineHeight.value ? 2 : lineHeight.value
  const lineBackgroundColorValue = !lineBackground.value ? '#1a1a1a' : lineBackground.value
  const lineBackgroundColorSelectedValue = !lineBackgroundSelected.value ? 'red' : lineBackgroundSelected.value
  const labelSelectedOpacityValue = ((labelSelectedOpacity.value !== 0 && !labelSelectedOpacity.value) || labelSelectedOpacity.value < 0 || labelSelectedOpacity.value > 1) ? 0.1 : labelSelectedOpacity.value
  const labelTextAlignValue = !labelTextAlign.value ? 'left' : labelTextAlign.value
  
	return {
		disabled: disabledValue,
		display: displayValue,
		theme: themeValue,
		steps: stepsValue,


    gap: gapValue,
		ellipsisText: ellipsisTextValue,
		tabTextAlign: tabTextAlignValue,
		minWidth: minWidthValue,
		minWidthSelected: minWidthSelectedValue,
		maxWidth: maxWidthValue,
		tabOpacity: tabOpacityValue,
		tabSelectedOpacity: tabSelectedOpacityValue,
		tabColor: tabColorValue,
		tabColorSelected: tabColorSelectedValue,
		lineOpacity: lineOpacityValue,
		lineSelectedOpacity: lineSelectedOpacityValue,
    lineMarginTop: lineMarginTopValue,
    lineMarginBottom: lineMarginBottomValue,
		lineHeight: lineHeightValue,
		lineBackground: lineBackgroundColorValue,
		lineBackgroundSelected: lineBackgroundColorSelectedValue,
		labelSelectedOpacity: labelSelectedOpacityValue,
		labelTextAlign: labelTextAlignValue
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
  return ''

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


const cursorStyle = computed(() => {
  return blockClick.value ? 'default' : 'pointer'
})
const gapStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.gap}em`
})
const ellipsisTextStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  if (!defaultValues.ellipsisText) return {}

  return {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
})
const minWidthStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.minWidth}px`
})
const minWidthSelectedStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.minWidthSelected}em`
})
const maxWidthStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.maxWidth}px`
})
const tabOpacityStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.tabOpacity}`
})
const tabSelectedOpacityStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.tabSelectedOpacity}`
})
const tabTextAlignStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  switch (defaultValues.tabTextAlign) {
    case 'center':
      return 'center'
    case 'right':
      return 'end'
    default:
      return 'start'
  }
})
const tabColorStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return defaultValues.tabColor
})
const tabColorSelectedStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return defaultValues.tabColorSelected
})
const lineHeightStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.lineHeight}px`
})
const lineOpacityStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.lineOpacity}`
})
const lineSelectedOpacityStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.lineSelectedOpacity}`
})
const lineMarginStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.lineMarginTop}px 0 ${defaultValues.lineMarginBottom}px 0`
})
const lineBackgroundStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return defaultValues.lineBackground
})
const lineBackgroundSelectedStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return defaultValues.lineBackgroundSelected
})
const labelSelectedOpacityStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.labelSelectedOpacity}`
})
const labelTextAlignStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  switch (defaultValues.labelTextAlign) {
    case 'center':
      return 'center'
    case 'right':
      return 'end'
    default:
      return 'start'
  }
})


const handleStepChange = (newStep) => {
  if (blockClick.value) return

  changeStep(newStep)
}
const changeStep = (newStep) => {
  selected.value = newStep ?? 1

  emit('changed', selected.value)
}

watch(step, (newVal, oldVal) => {
  if (newVal !== oldVal) changeStep(newVal)
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
  &.component__theme--light {}

  &.component__theme--dark {}
  // fim propTheme

  .component__content {
    display: inline-flex;
    align-items: center;
    width: 100%;
  }
}

.component__content .nb-stepper-line {
  color: #1a1a1a;
  display: block;
  font-size: 14px;
  width: 100%;
  position: relative;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms;

  .nb-stepper-line__items {
    align-items: center;
    display: flex;
    width: 100%;

    .nb-stepper-line__fit {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      height: 100%;
      width: 100%;

      .nb-stepper-line__track {
        position: relative;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%;
        height: 100%;
        width: 100%;

        .nb-stepper-line__nav {
          display: flex;
          align-items: center;
          justify-content: stretch;
          width: 100%;
          height: 100%;
          position: relative;
          gap: v-bind('gapStyle');
          overflow-x: auto;
          overflow-y: hidden;

          .nb-stepper-line__item {
            appearance: none;
            background: transparent none;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: v-bind('maxWidthStyle');
            min-width: v-bind('minWidthStyle');
            max-width: v-bind('maxWidthStyle');
            overflow: hidden;
            position: relative;
            text-align: left;
            color: inherit;
            line-height: 1;
            transition: flex-basis 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms,
              max-width 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms,
              color 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms,
              opacity 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms;

            &:first-child,
            &:last-child {
              padding-right: 0;
            }

            &.nb-stepper-line__item--selected {
              flex-grow: 1;
              flex-shrink: 1;
              flex-basis: 12em;
              min-width: max(120px, v-bind('minWidthSelectedStyle'));
              max-width: 100%;

              .nb-stepper-line__counter {
                color: v-bind('tabColorSelectedStyle');
                opacity: v-bind('tabSelectedOpacityStyle');
              }

              .nb-stepper-line__line {
                background-color: v-bind('lineBackgroundSelectedStyle');
                opacity: v-bind('lineSelectedOpacityStyle');
              }

              .nb-stepper-line__label {
                max-width: 100%;
                opacity: v-bind('labelSelectedOpacityStyle') !important;

                &>strong {
                  opacity: 1;
                }
                &>span {
                  opacity: 0;
                }
              }
            }

            &:not(.nb-stepper-line__item--selected) {
              .nb-stepper-line__counter {
                color: v-bind('tabColorStyle');
                opacity: v-bind('tabOpacityStyle');
              }

              .nb-stepper-line__line {
                background-color: v-bind('lineBackgroundStyle');
                opacity: v-bind('lineOpacityStyle');
              }

              .nb-stepper-line__label {
                opacity: 0;
                max-width: 0;
              }
            }

            .nb-stepper-line__counter {
              display: block;
              text-align: v-bind('tabTextAlignStyle');
              overflow: hidden;
            }

            .nb-stepper-line__line {
              display: block;
              width: 100%;
              height: v-bind('lineHeightStyle');
              margin: v-bind('lineMarginStyle');
              transition: opacity 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms;
            }

            .nb-stepper-line__label {
              max-width: 0;
              overflow: hidden;
              position: relative;
              white-space: nowrap;
              text-align: v-bind('labelTextAlignStyle');
              transition: max-width 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms,
                opacity 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms;

              &>strong,
              &>span {
                transition: opacity 0.1s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms;
              }

              &>strong {
                font-weight: 600;
                opacity: 0;
              }

              &>span {
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
                text-align: center;
              }
            }
          }
        }
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
