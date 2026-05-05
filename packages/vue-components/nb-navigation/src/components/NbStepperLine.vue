<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle]"
    v-bind="computedAriaAttrs"
  >
    <div
      :id="nbId"
      ref="componentContainer"
      :class="['nb-reset', 'component', themeStyle]"
      :style="[componentStyle]"      
      :tabindex="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled ? -1 : tabIndex"
      :role="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled ? undefined : 'tab'"
      :aria-disabled="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled"
    >
      <div
        :class="['component__content']"
      >
        <div class="nb-stepper-line" role="tablist" aria-busy="true">
          <div class="nb-stepper-line__items">
            <div class="nb-stepper-line__fit">
              <div class="nb-stepper-line__track">
                <div :class="['nb-stepper-line__nav', scrollClassStyle]">
                  <div
                    v-for="(item, index) in navItems"
                    :key="index"
                    :aria-label="item.title"
                    role="tab"
                    class="nb-stepper-line__item"
                    :class="{
                      'nb-stepper-line__item--selected': selected === index,
                      'nb-stepper-line__item--disabled': isStepDisabled(index)
                    }"
                    :tabindex="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled ? -1 : tabIndex"
                    :role="blockClick || !hasTabIndexEnter || !hasTabIndexSpace  || disabled ? undefined : 'tab'"
                    :aria-disabled="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled || isStepDisabled(index)"
                    @click="handleStepChange(index)"
                    @keydown.enter.prevent="handleTabIndex(index, 'enter')"
                    @keydown.space.prevent="handleTabIndex(index, 'space')"
                  >
                    <span
                      v-if="showTab"
                      class="nb-stepper-line__counter"
                      :style="ellipsisTextStyle"
                    >
                      <slot
                        v-if="showTab"
                        :name="`tab-number-${index}`"
                        :option="item"
                        :index="index"
                        :options="navItems"
                      >{{ index + 1 }}.</slot>
                    </span>

                    <span class="nb-stepper-line__line"></span>
                    
                    <span
                      v-if="showLabel"
                      class="nb-stepper-line__label"
                      :style="ellipsisTextStyle"
                    >
                      <slot
                        v-if="showLabel"
                        :name="`label-${index}`"
                        :option="item"
                        :index="index"
                        :options="navItems"
                      >
                        <strong>{{ item.title }}</strong>
                      </slot>
                    </span>
                  </div>
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
  name: 'NbStepperLine',
  inheritAttrs: false
})

onMounted(() => {})

const emit = defineEmits([
  'changed'
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
	/** ---------- Tema claro (`theme="light"`) — defaults iguais ao NbSegmentedButton ---------- */
	lightTabColor: {
		type: String,
		default: '#000000',
		validator: (value) => {
			return typeof value === 'string'
		}
	},
	lightTabColorSelected: {
		type: String,
		default: '#000000',
		validator: (value) => {
			return typeof value === 'string'
		}
	},
	lightLineBackground: {
		type: String,
		default: '#bdbdbd',
		validator: (value) => {
			return typeof value === 'string'
		}
	},
	lightLineBackgroundSelected: {
		type: String,
		default: '#bdbdbd',
		validator: (value) => {
			return typeof value === 'string'
		}
	},
	/** ---------- Tema escuro (`theme="dark"`) ---------- */
	darkTabColor: {
		type: String,
		default: '#000000',
		validator: (value) => {
			return typeof value === 'string'
		}
	},
	darkTabColorSelected: {
		type: String,
		default: '#000000',
		validator: (value) => {
			return typeof value === 'string'
		}
	},
	darkLineBackground: {
		type: String,
		default: '#353734',
		validator: (value) => {
			return typeof value === 'string'
		}
	},
	darkLineBackgroundSelected: {
		type: String,
		default: '#353734',
		validator: (value) => {
			return typeof value === 'string'
		}
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
  stepsDisabled: {
    type: Array,
    default: () => [],
    validator: (value) => {
      if (!Array.isArray(value)) return false

      return value.every((item) => typeof item === 'number')
    },
  },
  opacityDisabled: {
    type: Number,
    default: 0.4,
    validator: value => {
      return !value ? 0.4 : value
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
  showTab: {
    type: Boolean,
    default: true,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
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
	tabFontFamily: {
		type: String,
		default: `'Lato', sans-serif`
	},
	tabFontSize: {
		type: String,
		default: '1.6em'
	},
	tabFontSizeActive: {
		type: String,
		default: '1.2em'
	},
	tabFontWeight: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 400 : value
		}
  },
	tabFontWeightActive: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 400 : value
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
    default: .1,
    validator: (value) => {
        return value >= 0
    }
  },
  lineMarginTopActive: {
    type: Number,
    default: .15,
    validator: (value) => {
        return value >= 0
    }
  },
  lineMarginBottom: {
    type: Number,
    default: .1,
    validator: (value) => {
        return value >= 0
    }
  },
  lineMarginBottomActive: {
    type: Number,
    default: .15,
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
  showLabel: {
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
  },
  labelFontFamily: {
    type: String,
    default: `'Lato', sans-serif`
  },
  labelFontSize: {
    type: String,
    default: '1.6em'
  },
  labelFontSizeActive: {
    type: String,
    default: '1.2em'
  },
  labelFontWeight: {
    type: Number,
    default: 400,
    validator: value => {
      return !value ? 400 : value
    }
  },
  labelFontWeightActive: {
    type: Number,
    default: 400,
    validator: value => {
      return !value ? 400 : value
    }
  },
	scrollClass: {
		type: String,
		default: ''
	}
})

const {
	nbId,
	disabled,
	theme,
	tabIndex,
	hasTabIndexEnter,
  hasTabIndexSpace,
	ariaLabel,
	ariaAttrs,
	step,
	steps,
  stepsDisabled,
  opacityDisabled,


	blockClick,
  gap,
  ellipsisText,
  tabTextAlign,
  minWidth,
  maxWidth,
  minWidthSelected,
  tabOpacity,
  tabSelectedOpacity,
  tabFontFamily,
  tabFontSize,
  tabFontSizeActive,
  tabFontWeight,
  tabFontWeightActive,
  lineOpacity,
  lineSelectedOpacity,
  lineMarginTop,
  lineMarginTopActive,
  lineMarginBottom,
  lineMarginBottomActive,
  lineHeight,
  labelSelectedOpacity,
  labelTextAlign,
  labelFontFamily,
  labelFontSize,
  labelFontSizeActive,
  labelFontWeight,
  labelFontWeightActive,
  scrollClass,
  lightTabColor,
  lightTabColorSelected,
  lightLineBackground,
  lightLineBackgroundSelected,
  darkTabColor,
  darkTabColorSelected,
  darkLineBackground,
  darkLineBackgroundSelected,
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
  const opacityDisabledValue = ((opacityDisabled.value !== 0 && !opacityDisabled.value) || opacityDisabled.value < 0 || opacityDisabled.value > 1) ? 0.4 : opacityDisabled.value

  const gapValue = ((gap.value !== 0 && !gap.value) || gap.value < 0) ? 1 : gap.value
  const ellipsisTextValue = typeof ellipsisText.value === 'boolean'
    ? ellipsisText.value
    : false
  const tabTextAlignValue = !tabTextAlign.value ? 'right' : tabTextAlign.value
  const minWidthValue = ((minWidth.value !== 0 && !minWidth.value) || minWidth.value < 10) ? 20 : minWidth.value
  const minWidthSelectedValue = ((minWidthSelected.value !== 0 && !minWidthSelected.value) || minWidthSelected.value < 6) ? 6 : minWidthSelected.value
  const maxWidthValue = ((maxWidth.value !== 0 && !maxWidth.value) || maxWidth.value < 10) ? 50 : maxWidth.value
  const tabOpacityValue = ((tabOpacity.value !== 0 && !tabOpacity.value) || tabOpacity.value < 0 || tabOpacity.value > 1) ? 0.5 : tabOpacity.value
  const tabSelectedOpacityValue = ((tabSelectedOpacity.value !== 0 && !tabSelectedOpacity.value) || tabSelectedOpacity.value < 0 || tabSelectedOpacity.value > 1) ? 1 : tabSelectedOpacity.value
  const tabFontFamilyValue = !tabFontFamily.value ? `'Lato', sans-serif` : tabFontFamily.value
	const tabFontSizeValue = !tabFontSize.value ? '1.6em' : tabFontSize.value
	const tabFontSizeActiveValue = !tabFontSizeActive.value ? '1.2em' : tabFontSizeActive.value
	const tabFontWeightValue = ((tabFontWeight.value !== 0 && !tabFontWeight.value) || tabFontWeight.value < 0) ? 100 : tabFontWeight.value
	const tabFontWeightActiveValue = ((tabFontWeightActive.value !== 0 && !tabFontWeightActive.value) || tabFontWeightActive.value < 0) ? 100 : tabFontWeightActive.value
  const lineOpacityValue = ((lineOpacity.value !== 0 && !lineOpacity.value) || lineOpacity.value < 0 || lineOpacity.value > 1) ? 0.2 : lineOpacity.value
  const lineSelectedOpacityValue = ((lineSelectedOpacity.value !== 0 && !lineSelectedOpacity.value) || lineSelectedOpacity.value < 0 || lineSelectedOpacity.value > 1) ? 1 : lineSelectedOpacity.value
  const lineMarginTopValue = ((lineMarginTop.value !== 0 && !lineMarginTop.value) || lineMarginTop.value < 0) ? .1 : lineMarginTop.value
  const lineMarginTopActiveValue = ((lineMarginTopActive.value !== 0 && !lineMarginTopActive.value) || lineMarginTopActive.value < 0) ? .15 : lineMarginTopActive.value
  const lineMarginBottomValue = ((lineMarginBottom.value !== 0 && !lineMarginBottom.value) || lineMarginBottom.value < 0) ? .1 : lineMarginBottom.value
  const lineMarginBottomActiveValue = ((lineMarginBottomActive.value !== 0 && !lineMarginBottomActive.value) || lineMarginBottomActive.value < 0) ? .15 : lineMarginBottomActive.value
  const lineHeightValue = !lineHeight.value ? 2 : lineHeight.value
  const labelSelectedOpacityValue = ((labelSelectedOpacity.value !== 0 && !labelSelectedOpacity.value) || labelSelectedOpacity.value < 0 || labelSelectedOpacity.value > 1) ? 0.1 : labelSelectedOpacity.value
  const labelTextAlignValue = !labelTextAlign.value ? 'left' : labelTextAlign.value
  const labelFontFamilyValue = !labelFontFamily.value ? `'Lato', sans-serif` : labelFontFamily.value
  const labelFontSizeValue = !labelFontSize.value ? '1.6em' : labelFontSize.value
  const labelFontSizeActiveValue = !labelFontSizeActive.value ? '1.2em' : labelFontSizeActive.value
  const labelFontWeightValue = ((labelFontWeight.value !== 0 && !labelFontWeight.value) || labelFontWeight.value < 0) ? 100 : labelFontWeight.value
  const labelFontWeightActiveValue = ((labelFontWeightActive.value !== 0 && !labelFontWeightActive.value) || labelFontWeightActive.value < 0) ? 100 : labelFontWeightActive.value

	return {
		disabled: disabledValue,
		display: displayValue,
		theme: themeValue,
		steps: stepsValue,
    opacityDisabled: opacityDisabledValue,

    gap: gapValue,
		ellipsisText: ellipsisTextValue,
		tabTextAlign: tabTextAlignValue,
		minWidth: minWidthValue,
		minWidthSelected: minWidthSelectedValue,
		maxWidth: maxWidthValue,
		tabOpacity: tabOpacityValue,
		tabSelectedOpacity: tabSelectedOpacityValue,
		tabFontFamily: tabFontFamilyValue,
		tabFontSize: tabFontSizeValue,
		tabFontSizeActive: tabFontSizeActiveValue,
		tabFontWeight: tabFontWeightValue,
		tabFontWeightActive: tabFontWeightActiveValue,
		lineOpacity: lineOpacityValue,
		lineSelectedOpacity: lineSelectedOpacityValue,
    lineMarginTop: lineMarginTopValue,
    lineMarginTopActive: lineMarginTopActiveValue,
    lineMarginBottom: lineMarginBottomValue,
    lineMarginBottomActive: lineMarginBottomActiveValue,
		lineHeight: lineHeightValue,
		labelSelectedOpacity: labelSelectedOpacityValue,
		labelTextAlign: labelTextAlignValue,
		labelFontFamily: labelFontFamilyValue,
		labelFontSize: labelFontSizeValue,
		labelFontSizeActive: labelFontSizeActiveValue,
		labelFontWeight: labelFontWeightValue,
		labelFontWeightActive: labelFontWeightActiveValue
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
  handleStepChange(tabIndex)
}

/* New logic below */
const opacityDisabledStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.opacityDisabled}`
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
const tabFontFamilyStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.tabFontFamily}`
})
const tabFontSizeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.tabFontSize}`
})
const tabFontSizeActiveStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.tabFontSizeActive}`
})
const tabFontWeightStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.tabFontWeight}`
})
const tabFontWeightActiveStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.tabFontWeightActive}`
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
  return `${defaultValues.lineMarginTop}em 0 ${defaultValues.lineMarginBottom}em 0`
})
const lineMarginActiveStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.lineMarginTopActive}em 0 ${defaultValues.lineMarginBottomActive}em 0`
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
const labelFontFamilyStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.labelFontFamily}`
})
const labelFontSizeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.labelFontSize}`
})
const labelFontSizeActiveStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.labelFontSizeActive}`
})
const labelFontWeightStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.labelFontWeight}`
})
const labelFontWeightActiveStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.labelFontWeightActive}`
})
const scrollClassStyle = computed(() => {
  return scrollClass.value ? scrollClass.value : ''
})

const tabColorStyle = computed(() => {
  return theme.value === 'dark' ? darkTabColor.value : lightTabColor.value
})
const tabColorSelectedStyle = computed(() => {
  return theme.value === 'dark' ? darkTabColorSelected.value : lightTabColorSelected.value
})
const lineBackgroundStyle = computed(() => {
  return theme.value === 'dark' ? darkLineBackground.value : lightLineBackground.value
})
const lineBackgroundSelectedStyle = computed(() => {
  return theme.value === 'dark' ? darkLineBackgroundSelected.value : lightLineBackgroundSelected.value
})

const isStepDisabled = (stepIdentifier) => {
  if (disabled.value) return true

  // check if disabled steps list is empty
  if (!Array.isArray(stepsDisabled.value) || stepsDisabled.value.length === 0) {
    return false
  }

  // resolve step index
  const stepIndex = stepIdentifier

  // check if step index is in disabled steps list
  return stepsDisabled.value.includes(stepIndex)
}
const handleStepChange = (newStep) => {
  if (blockClick.value || isStepDisabled(newStep)) return

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
          justify-content: stretch;
          align-items: baseline;
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
            cursor: v-bind('cursorStyle');
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
              opacity 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms,
              font-family 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms,
              font-size 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms,
              font-weight 0.65s cubic-bezier(0.165, 0.84, 0.44, 1) 0ms;

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
                font-family: v-bind('tabFontFamilyStyle');
                font-size: v-bind('tabFontSizeActiveStyle');
                font-weight: v-bind('tabFontWeightActiveStyle');
              }

              .nb-stepper-line__line {
                background-color: v-bind('lineBackgroundSelectedStyle');
                opacity: v-bind('lineSelectedOpacityStyle');
                margin: v-bind('lineMarginActiveStyle');
              }

              .nb-stepper-line__label {
                max-width: 100%;
                opacity: v-bind('labelSelectedOpacityStyle') !important;
                font-family: v-bind('labelFontFamilyStyle');
                font-size: v-bind('labelFontSizeActiveStyle');
                font-weight: v-bind('labelFontWeightActiveStyle');
                &>strong {
                  opacity: 1;
                }
                &>span {
                  opacity: 0;
                }
              }
            }

            &.nb-stepper-line__item--disabled {
              user-select: none;
              opacity: v-bind('opacityDisabledStyle');

              &:hover {
                cursor: default !important;
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
              font-family: v-bind('tabFontFamilyStyle');
              font-size: v-bind('tabFontSizeStyle');
              font-weight: v-bind('tabFontWeightStyle');
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
              font-family: v-bind('labelFontFamilyStyle');
              font-size: v-bind('labelFontSizeStyle');
              font-weight: v-bind('labelFontWeightStyle');
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

	.component {
		&.component__theme--light {}

		&.component__theme--dark {}

    .component__content .nb-stepper-line {
      .nb-stepper-line__items {
        .nb-stepper-line__fit {
          .nb-stepper-line__track {
            .nb-stepper-line__nav {
              .nb-stepper-line__item {
                &.nb-stepper-line__item--disabled {
                  opacity: v-bind('opacityDisabledStyle') !important;
                }
              }
            }
          }
        }
      }
    }
	}
}
</style>
