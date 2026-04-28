<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle]"
    role="input"
    :title="title"
    v-bind="computedAriaAttrs"
    @click="interacted($event)"
  >
    <label
      v-if="showLabel"
      :for="computedInputName"
      class="component__label"
      :style="[styleLabel]"
    >{{ label }}<span v-if="required" class="component__label--required">*</span></label>
    
    <div
      :id="nbId"
      ref="chipsContainer"
      :class="['nb-reset', 'component', themeStyle, inputStyleClass, tabModelStyle]"
      :style="[componentStyle, styleWidth]"
    >
      <div class="tabs-header" ref="tabsHeaderRef">
        <div
          :class="[
            'tab-indicator'
          ]"
          :style="[indicatorStyle, borderRadiusStyle]"
        ></div>

        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :ref="el => { if (el) tabRefs[tab.key] = el }"
          class="tab-btn"
          :class="[
            'tab-btn', 
            {
              active: currentActiveTab === tab.key,
              'tab-btn--disabled': isTabDisabled(index)
            }
          ]"
          @click="changeTab(index)"
          :disabled="isTabDisabled(index)"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tabs Content -->
      <div class="tabs-content">
        <div v-for="(tab, index) in tabs" :key="index">
            <section v-if="currentActiveTab === tab.key">
                <slot :name="tab.key" />
            </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

defineOptions({
  name: 'NbBase',
  inheritAttrs: false
})

onMounted(async () => {
  await startTabs()
})

onBeforeUnmount(() => {
  if (headerResizeObserver.value) {
    headerResizeObserver.value.disconnect()
  }
})

const emit = defineEmits([
  'clicked',
  'changed',
  'focused',
  'blurred'
])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	display: {
		type: String,
		default: 'b',
		validator: (value = 'b') => {
			const currentValue = value.toLowerCase()
			return ['b', 'ib'].includes(currentValue)
		}
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
  title: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: 'black'
  },
	width: {
		type: Number,
		default: 185,
		validator: value => {
			return !value ? 185 : value
		}
	},
	paddingX: {
		type: Number,
		default: 0.2,
		validator: value => {
			return !value ? 1 : value
		}
	},
	paddingY: {
		type: Number,
		default: 0.2,
		validator: value => {
			return !value ? 0.2 : value
		}
	},
	hasBorderRadius: {
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
	disabled: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	fontFamily: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSize: {
		type: String,
		default: null
	},
	fontWeight: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 700 : value
		}
  },
	required: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	textAlign: {
		type: String,
		default: 'left',
		validator: value => {
			return ['center', 'left', 'right'].indexOf(value) !== -1
		}
	},
	activeTextStyle: {
		type: String,
		default: 'normal',
		validator: value => {
			return ['normal', 'italic', 'oblique'].indexOf(value) !== -1
		}
	},
	theme: {
		type: String,
		default: 'light',
		validator: value => {
			return ['dark', 'light'].indexOf(value) !== -1
		}
	},
	inputStyle: {
		type: String,
		default: 'background',
		validator: value => {
			return ['background', 'line', 'border'].indexOf(value) !== -1
		}
	},
	// Cores do tema light
	lightBgColor: {
		type: String,
		default: '#f8f8f2'
	},
	lightBorderColor: {
		type: String,
		default: '#eaeaea' // '#353734'
	},
	lightDisabledBgColor: {
		type: String,
		default: '#dfdfd9'
	},
	lightTextColor: {
		type: String,
		default: '#000000'
	},
	lightDisabledBorderColor: {
		type: String,
		default: 'rgba(53, 55, 52, 0.3)'
	},
	// Cores do tema dark
	darkBgColor: {
		type: String,
		default: '#353734'
	},
	darkBgColorFocus: {
		type: String,
		default: '#272936'
	},
	darkBorderColor: {
		type: String,
		default: '#44475a'
	},
	darkBorderColorFocus: {
		type: String,
		default: 'rgba(68, 71, 90, 0.4)'
	},
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
	},
	darkTextColor: {
		type: String,
		default: '#ffffff'
	},

	darkDisabledBorderColor: {
		type: String,
		default: 'rgba(68, 71, 90, 0.3)'
	},
	// Label props
	showLabel: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		},
	},
	label: {
		type: String,
		default: 'Label text',
	},
	labelBackground: {
		type: String,
		default: 'transparent',
	},
	labelPadding: {
		type: String,
		default: '1px 5px',
	},
	labelBorderRadius: {
		type: Number,
		default: 0
	},
  labelBreakOnActive: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
  },
  labelLeft: {
		type: Number,
		default: 5,
	},
	inputLabelMarginActive: {
		type: Number,
		default: 15,
	},
	labelActiveTop: {
		type: Number,
		default: -13,
	},
	labelActiveLeft: {
		type: Number,
		default: 5,
	},
	fontFamilyLabel: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSizeLabel: {
		type: String,
		default: '1em',
		validator: value => {
			return !value ? '1em' : value
		}
	},
	fontSizeLabelActive: {
		type: String,
		default: '0.8em',
		validator: value => {
			return !value ? '0.8em' : value
		}
	},
	fontWeightLabel: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 700 : value
		}
	},
	lightTextColorLabel: {
		type: String,
		default: '#333333'
	},
	lightTextColorLabelActive: {
		type: String,
		default: '#333333'
	},
	darkTextColorLabel: {
		type: String,
		default: '#ffffff'
	},
	darkTextColorLabelActive: {
		type: String,
		default: '#ffffff'
	},
  tabs: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every((item) => {
        return typeof item.key === 'string' && typeof item.label === 'string'
      })
    },
    required: true
  },
  activeTab: {
    type: Number,
    default: 0,
    required: true
  },
  disabledTabs: {
    type: Array,
    default: [],
    validator: (value) => {
      return value.every((item) => {
        return typeof item === 'number' || typeof item === 'string'
      })
    },
  },
  tabModel: {
    type: String,
    default: 'one',
    validator: (value) => {
      return ['one', 'two'].includes(value)
    }
  },
  gap: {
    type: Number,
    default: 24,
    validator: value => {
      return !value ? 24 : value
    }
  }
})

const {
	nbId,
	display,
	paddingX,
	paddingY,
	borderRadius,
	disabled,
	fontFamily,
	fontSize,
	fontWeight,
	textColor,
	width,
	required,
	textAlign,
	hasBorderRadius,
	activeTextStyle,
	theme,
	inputStyle,
	lightBgColor,
	lightBorderColor,
	lightDisabledBgColor,
	lightTextColor,
	lightChipBgColor,
	lightChipTextColor,
	lightChipRemoveColor,
	lightDisabledBorderColor,
	darkBgColor,
	darkBgColorFocus,
	darkBorderColor,
	darkBorderColorFocus,
	darkDisabledBgColor,
	darkTextColor,
	darkDisabledBorderColor,
	tabIndex,
	hasTabIndexEnter,
	ariaLabel,
	ariaAttrs,
	showLabel,
	label,
	labelBackground,
	labelPadding,
	labelBorderRadius,
	labelBreakOnActive,
	labelLeft,
	inputLabelMarginActive,
	labelActiveTop,
	labelActiveLeft,
	fontFamilyLabel,
	fontSizeLabel,
	fontSizeLabelActive,
	fontWeightLabel,
	lightTextColorLabel,
	lightTextColorLabelActive,
	darkTextColorLabel,
	darkTextColorLabelActive,
  activeTab,
  disabledTabs,
  tabModel,
  gap
} = toRefs(props)

const isActive = ref(false)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const widthValue = !width.value || width.value < 185 ? 185 : width.value
	const paddingXValue = ((paddingX.value !== 0 && !paddingX.value) || paddingX.value < 0) ? 1 : paddingX.value
	const paddingYValue = ((paddingY.value !== 0 && !paddingY.value) || paddingY.value < 0) ? 0.2 : paddingY.value
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.2em' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 100 : fontWeight.value
	const themeValue = !theme.value ? 'light' : theme.value
  const textColorValue = !textColor.value ? 'black' : textColor.value

	// Label default values
	const showLabelValue = !showLabel.value ? false : showLabel.value
	const labelLeftValue = ((labelLeft.value !== 0 && !labelLeft.value) || labelLeft.value < 0) ? 5 : labelLeft.value
	const labelBackgroundValue = !labelBackground.value ? 'transparent' : labelBackground.value
	const inputLabelMarginActiveValue = ((inputLabelMarginActive.value !== 0 && !inputLabelMarginActive.value) || inputLabelMarginActive.value < 0) ? 15 : inputLabelMarginActive.value
	const labelPaddingValue = !labelPadding.value ? '1px 5px' : labelPadding.value
	const labelBorderRadiusValue = ((labelBorderRadius.value !== 0 && !labelBorderRadius.value) || labelBorderRadius.value < 0) ? 0 : labelBorderRadius.value
	const labelActiveTopValue = (labelActiveTop.value === null || labelActiveTop.value === undefined) ? -13 : labelActiveTop.value
	const labelActiveLeftValue = (labelActiveLeft.value === null || labelActiveLeft.value === undefined) ? 5 : labelActiveLeft.value
	const fontFamilyLabelValue = !fontFamilyLabel.value ? `'Lato', sans-serif` : fontFamilyLabel.value
	const fontSizeLabelValue = !fontSizeLabel.value ? '1em' : fontSizeLabel.value
	const fontSizeLabelActiveValue = !fontSizeLabelActive.value ? '0.8em' : fontSizeLabelActive.value
	const fontWeightLabelValue = !fontWeightLabel.value ? 400 : fontWeightLabel.value
	const lightTextColorLabelValue = !lightTextColorLabel.value ? '#333333' : lightTextColorLabel.value
	const darkTextColorLabelValue = !darkTextColorLabel.value ? '#ffffff' : darkTextColorLabel.value
	const lightTextColorLabelActiveValue = !lightTextColorLabelActive.value ? '#333333' : lightTextColorLabelActive.value
	const darkTextColorLabelActiveValue = !darkTextColorLabelActive.value ? '#ffffff' : darkTextColorLabelActive.value

  const tabModelValue = !tabModel.value ? 'one' : tabModel.value
  const gapStyleValue = ((gap.value !== 0 && !gap.value) || gap.value < 0) ? 24 : gap.value

	return {
		disabled: disabledValue,
		display: displayValue,
		width: widthValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
    borderRadius: borderRadiusValue,
		theme: themeValue,
		showLabel: showLabelValue,
		labelLeft: labelLeftValue,
		labelBackground: labelBackgroundValue,
		inputLabelMarginActive: inputLabelMarginActiveValue,
		labelPadding: labelPaddingValue,
		labelBorderRadius: labelBorderRadiusValue,
		labelActiveTop: labelActiveTopValue,
		labelActiveLeft: labelActiveLeftValue,
		fontFamilyLabel: fontFamilyLabelValue,
		fontSizeLabel: fontSizeLabelValue,
		fontSizeLabelActive: fontSizeLabelActiveValue,
		fontWeightLabel: fontWeightLabelValue,
		lightTextColorLabel: lightTextColorLabelValue,
		darkTextColorLabel: darkTextColorLabelValue,
		lightTextColorLabelActive: lightTextColorLabelActiveValue,
		darkTextColorLabelActive: darkTextColorLabelActiveValue,
		textColor: textColorValue,
		tabModel: tabModelValue,
		gap: gapStyleValue,
	}
})
const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabled
})
const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	const isActive = isLabelActive.value

	return {
		display: defaultValues.display,
		// Adiciona padding-top quando o label está ativo para evitar que seja cortado
    // paddingTop: isActive && showLabel.value ? `${Math.abs(defaultValues.labelActiveTop)}px` : '0',
    paddingTop: '0px',
		// Esconde o label quando não está ativo usando overflow hidden
		// Se não tem label ou está ativo, permite overflow visible para não cortar conteúdo
		overflow: (!showLabel.value || isActive) ? 'visible' : 'hidden'
	}
})
const fontSizeStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	
	if (defaultValues.fontSize) return defaultValues.fontSize

	return '1.2em'
})

const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	const isActive = isLabelActive.value

	return {
		color: defaultValues.textColor,
		fontWeight: defaultValues.fontWeight,
		textAlign: textAlign.value,
		marginTop: isActive && showLabel.value ? `${defaultValues.inputLabelMarginActive}px` : '0',
	}
})
const activeTextStyleClass = computed(() => {
	switch (activeTextStyle.value) {
		case 'italic':
			return 'component__text--italic'
		case 'oblique':
			return 'component__text--oblique'
		default:
			return 'component__text--normal'
	}
})
const borderRadiusStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	if (defaultValues.inputStyle !== 'line' && hasBorderRadius.value) {
		return { 
      borderTopLeftRadius: `${defaultValues.borderRadius}rem`,
      borderTopRightRadius: `${defaultValues.borderRadius}rem`
    }
	}
	return {}
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})
const styleTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textColor
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
const styleWidth = computed(() => {
	const defaultValues = formatDefaultValues.value

  const widthIb = {
    width: `${defaultValues.width}px`
  }

  return defaultValues.display === 'block' ? { width: 'auto' } : widthIb
})
const isLabelActive = computed(() => {
  // Label está ativo se o input estiver focado
  return isActive.value
})
const styleLabel = computed(() => {
  const defaultValues = formatDefaultValues.value
  const isActive = isLabelActive.value

  const lightTextColorLabel = isActive ? defaultValues.lightTextColorLabelActive : defaultValues.lightTextColorLabel
  const darkTextColorLabel = isActive ? defaultValues.darkTextColorLabelActive : defaultValues.darkTextColorLabel

  return {
    fontFamily: defaultValues.fontFamilyLabel,
    fontSize: isActive ? defaultValues.fontSizeLabelActive : defaultValues.fontSizeLabel,
    fontWeight: defaultValues.fontWeightLabel,
    color: defaultValues.theme === 'dark' ? darkTextColorLabel : lightTextColorLabel,
    top: isActive ? `${defaultValues.labelActiveTop}px` : '50%',
    left: isActive ? `${defaultValues.labelActiveLeft}px` : `${defaultValues.labelLeft}px`,
    transform: isActive ? 'translateY(0)' : 'translateY(-50%)',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? defaultValues.labelBackground : 'transparent',
    padding: isActive ? defaultValues.labelPadding : '0',
    borderRadius: isActive ? `${defaultValues.labelBorderRadius}rem` : '0',
    // Se labelBreakOnActive for true (padrão), usa ellipsis quando ativo. Se false, quebra linha
    ...(isActive ? {
      whiteSpace: !labelBreakOnActive.value ? 'normal' : 'nowrap',
      wordWrap: !labelBreakOnActive.value ? 'break-word' : 'normal',
      overflowWrap: !labelBreakOnActive.value ? 'break-word' : 'normal',
      maxWidth: '100%',
      textOverflow: labelBreakOnActive.value ? 'ellipsis' : 'clip',
      overflow: labelBreakOnActive.value ? 'hidden' : 'visible',
    } : {}),
  }
})
const themeStyle = computed(() => {
	switch (theme.value) {
		case 'dark':
			return 'component__theme--dark'
		default:
			return 'component__theme--light'
	}
})
const inputStyleClass = computed(() => {
	switch (inputStyle.value) {
		case 'line':
			return 'component__tab--line'
		case 'border':
			return 'component__tab--border'
		default:
			return 'component__tab--background'
	}
})

const interacted = (event) => {
	emit('clicked', event)
}

const handleFocus = () => {
  isActive.value = true
  emit('focused')
}
const handleBlur = () => {
  isActive.value = false
  emit('blurred')
}

/* New logic below */
const currentActiveTab = ref('')
const tabsHeaderRef = ref(null)
const tabRefs = ref({})
const indicatorVersion = ref(0)
const headerResizeObserver = ref(null)

const bumpIndicatorVersion = () => {
  indicatorVersion.value += 1
}

const setupHeaderResizeObserver = () => {
  if (typeof ResizeObserver === 'undefined') return

  if (headerResizeObserver.value) {
    headerResizeObserver.value.disconnect()
  }

  headerResizeObserver.value = new ResizeObserver(() => {
    bumpIndicatorVersion()
  })

  if (tabsHeaderRef.value) {
    headerResizeObserver.value.observe(tabsHeaderRef.value)
  }
}

const indicatorStyle = computed(() => {
  // Dependencia reativa para forcar recalc quando o layout do header mudar (gap, fonte, resize, etc.)
  indicatorVersion.value
  const activeTabEl = tabRefs.value[currentActiveTab.value]
  if (!activeTabEl || !tabsHeaderRef.value) {
    return { width: '0', left: '0' }
  }
  
  const headerRect = tabsHeaderRef.value.getBoundingClientRect()
  const tabRect = activeTabEl.getBoundingClientRect()
  
  return {
    width: `${tabRect.width}px`,
    left: `${tabRect.left - headerRect.left}px`
  }
})
const disabledTabList = computed(() => {
  if (!Array.isArray(props.disabledTabs) || props.disabledTabs.length === 0) {
    return []
  }

  return props.disabledTabs
})
const tabModelStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  
  return `component--model-${defaultValues.tabModel}`
})
const tabPaddingStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  
  return `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`
})
const gapStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  
  return `${defaultValues.gap}px`
})

const changeTab = (tabIndex) => {
  // resolve tab key
  const tabKey = resolveTabKey(tabIndex)

  // set current active tab
  currentActiveTab.value = tabKey

  emit('changed', {
    index: tabIndex,
    key: tabKey
  })
}
const resolveTabKey = (tabIndex) => {
  // check if tabs list is empty
  if (!Array.isArray(props.tabs) || props.tabs.length === 0) {
    return ''
  }

  // normalize index
  const normalizedIndex = Number.isInteger(tabIndex) ? tabIndex : 0

  // resolve tab key
  return props.tabs[normalizedIndex]?.key ?? props.tabs[0].key
}
const isTabDisabled = (tabIdentifier) => {
  // check if component is disabled
  if (disabled.value) return true

  // check if disabled tabs list is empty
  if (!Array.isArray(disabledTabList.value) || disabledTabList.value.length === 0) {
    return false
  }

  // resolve tab index
  const tabIndex = typeof tabIdentifier === 'number'
    ? tabIdentifier
    : props.tabs.findIndex(tab => tab.key === tabIdentifier)

  // resolve tab key
  const tabKey = typeof tabIdentifier === 'string'
    ? tabIdentifier
    : props.tabs[tabIndex]?.key

  // check if tab index or tab key is in disabled tabs list
  return disabledTabList.value.includes(tabIndex) || disabledTabList.value.includes(tabKey)
}
const setActiveTab = (tabIndex) => {
  // normalize index
  const normalizedIndex = Number.isInteger(tabIndex) ? tabIndex : 0

  // resolve candidate key
  const resolvedCandidateKey = resolveTabKey(normalizedIndex)

  // check if tab is disabled
  const isDisabled = isTabDisabled(normalizedIndex)

  // resolve tab key
  const resolvedTabKey = isDisabled ? getFirstEnabledTab() : resolvedCandidateKey

  // set current active tab
  currentActiveTab.value = resolvedTabKey
}
const getFirstEnabledTab = () => {
  // get first enabled tab
  const enabledTabs = props.tabs.filter((tab, index) => !isTabDisabled(index))

  // return first enabled tab key
  return enabledTabs.length > 0 ? enabledTabs[0].key : ''
}

const startTabs = async () => {
  // active tab initial
  setActiveTab(activeTab.value)

  // await next tick to ensure the DOM is updated
  await nextTick()

  // force recalc when the layout of the header changes (gap, font, resize, etc.)
  setupHeaderResizeObserver()
  // bump indicator version to force recalc when the layout of the header changes (gap, font, resize, etc.)
  bumpIndicatorVersion()
}

const noEmptyNumber = (value) => {
  return value !== '' && value !== null && value !== undefined
}

watch(activeTab, (newValue, oldValue) => {
  if (noEmptyNumber(newValue) && newValue !== oldValue) setActiveTab(newValue)
})
watch(disabledTabs, () => {
  startTabs()
})
watch([currentActiveTab, tabPaddingStyle, gapStyle], async () => {
  await nextTick()
  bumpIndicatorVersion()
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

.component__label {
    position: absolute;
    z-index: 1;
    pointer-events: none;

    .component__label--required {
      color: red;
      display: contents;
    }
  }

.component {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	line-height: 1.42857143;
	font-family: v-bind('font');

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
  &.component__theme--light {
    color: v-bind('lightTextColor');

    &.component__tab--background {
      border: 0;

      &.component--model-one {
        .tabs-header {
          border-bottom: 1px solid v-bind('lightBorderColor');

          .tab-btn {
            &.active {
              color: #7b7b7b !important;
            }
          }

          .tab-indicator {
            height: 100%;
            background-color: v-bind('lightBgColor');
          }
        }
      }
    }

    &.component__tab--line {
      // background-color: transparent;
      border: 0;
      // border-bottom: 1px solid v-bind('lightBorderColor');
      

      &.component--model-one {
        .tabs-header {
          border-bottom: 1px solid v-bind('lightBorderColor');

          .tab-btn {
            &.active {
              color: #7b7b7b !important;
            }
          }

          .tab-indicator {
            height: 2px;
            background-color: v-bind('lightBgColor');
          }
        }
      }
    }

    &.component__tab--border {
      border: 0;
      // background-color: transparent;
      // border: 1px solid v-bind('lightBorderColor');

      &.component--model-one {
        .tabs-header {
          border-bottom: 1px solid v-bind('lightBorderColor');

          .tab-btn {
            &.active {
              color: #7b7b7b !important;
            }
          }

          .tab-indicator {
            height: 100%;
            background-color: #fff;
            border-left: 1px solid v-bind('lightBgColor');
            border-right: 1px solid v-bind('lightBgColor');
            border-bottom: none;
            border-top: 1px solid v-bind('lightBgColor');
          }
        }
      }
    }

    &.component--model-one {}
  }

  &.component__theme--dark {
    color: v-bind('darkTextColor');

    &.component__tab--background {
      background-color: v-bind('darkBgColor');
      border: 0;
    }

    &.component__tab--line {
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid v-bind('darkBorderColor');
    }

    &.component__tab--border {
      background-color: transparent;
      border: 1px solid v-bind('darkBorderColor');
    }

    &.component--model-one {}
  }
  // fim propTheme

  // inicio inputStyle
  &.component__tab--background {
    // Mantém o comportamento padrão com background
  }

  &.component__tab--line {
    &:focus-within {
      // border-bottom: 1px solid v-bind('lightBorderColorFocus');
    }

    &.component__theme--dark {
      &:focus-within {
        // border-bottom: 1px solid v-bind('darkBorderColorFocus');
      }
    }
  }

  &.component__tab--border {
    &:focus-within {
      // border: 1px solid v-bind('lightBorderColorFocus');
    }

    &.component__theme--dark {
      &:focus-within {
        // border: 1px solid v-bind('darkBorderColorFocus');
      }
    }
  }
  // fim inputStyle

  &.component--model-one {
    .tabs-header {
      display: flex;
      gap: v-bind('gapStyle');
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      width: 100%;

      .tab-btn {
        // background: none;
        border: none;
        padding: v-bind('tabPaddingStyle') !important;
        font-size: 14px;
        color: #666;
        background: none;
        cursor: pointer;
        position: relative;
        transition: background-color 0.3s ease, color 0.3s ease;

        &.active {
          color: #1a73e8;
          font-weight: 500;
        }

        &.tab-btn--disabled {
          user-select: none;

          opacity: 0.8;

          &:hover {
            cursor: default !important;
          }
        }
      }

      .tab-indicator {
        position: absolute;
        bottom: -1px;
        height: 2px;
        background-color: #1a73e8;
        transition: background-color 0.3s ease, left 0.3s ease, width 0.3s ease, background-color 0.3s ease;
      }
    }

    .tabs-content {
      // padding: 24px 0;
    }
  }
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	opacity: 0.8;

	.component {
		--disabled-button-color: v-bind('styleButtonColor');
		--disabled-color: v-bind('styleTextColor');
		border-radius: inherit;

		&.component__theme--light {
			&.component__tab--background {
				background-color: v-bind('lightDisabledBgColor') !important;
			}

			&.component__tab--line {
				border-bottom: 1px solid v-bind('lightDisabledBorderColor') !important;
			}

			&.component__tab--border {
				border: 1px solid v-bind('lightDisabledBorderColor') !important;
			}
		}

		&.component__theme--dark {
			&.component__tab--background {
				background-color: v-bind('darkDisabledBgColor') !important;
			}

			&.component__tab--line {
				border-bottom: 1px solid v-bind('darkDisabledBorderColor') !important;
			}

			&.component__tab--border {
				border: 1px solid v-bind('darkDisabledBorderColor') !important;
			}
		}
	}
}
</style>
