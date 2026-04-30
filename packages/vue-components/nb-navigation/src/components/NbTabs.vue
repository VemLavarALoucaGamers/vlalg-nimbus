<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle]"
    role="navigation"
    :title="title"
    v-bind="computedAriaAttrs"
  >    
    <div
      :id="nbId"
      ref="tabsContainer"
      :class="['nb-reset', 'component', themeStyle, inputStyleClass, tabModelStyle]"
      :style="[componentStyle, styleWidth]"
    >
      <div
        :class="[
          'tabs-header',
          scrollClassStyle,
          {
            'tabs-header--dragging': isDraggingTabs
          }
        ]"
        :style="{ overflowX: isScrollClass ? 'auto' : 'hidden' }"
        ref="tabsHeaderRef"
        @mousedown="handleTabsDragStart"
        @mousemove="handleTabsDragMove"
        @mouseup="handleTabsDragEnd"
        @mouseleave="handleTabsDragEnd"
      >
        <div
          :class="[
            'tab-indicator'
          ]"
          :style="[indicatorStyle, borderRadiusStyle]"
        ></div>

        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :ref="el => { if (el) tabRefs[tab.key] = el }"
          :tabindex="isTabDisabled(index) || !hasTabIndexEnter || !hasTabIndexSpace || disabled ? -1 : tabIndex"
          :role="isTabDisabled(index) || !hasTabIndexEnter || !hasTabIndexSpace || disabled ? undefined : 'tab'"
          :aria-disabled="isTabDisabled(index) || !hasTabIndexEnter || !hasTabIndexSpace || disabled"
          class="tab-btn"
          :class="[
            'tab-btn', 
            {
              active: currentActiveTab === tab.key,
              'tab-btn--disabled': isTabDisabled(index)
            },
            activeTextStyleClass
          ]"
          @click="changeTab(index)"
          @keydown.enter.prevent="handleTabIndex(index, 'enter')"
          @keydown.space.prevent="handleTabIndex(index, 'space')"
          :disabled="isTabDisabled(index)"
        >
          {{ tab.label }}
        </div>

        <div class="tabs-header__line"></div>
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
  window.addEventListener('mouseup', handleTabsDragEnd)
  window.addEventListener('pointerup', handleTabsDragEnd)
  window.addEventListener('blur', handleTabsDragEnd)
  window.addEventListener('resize', handleWindowResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('mouseup', handleTabsDragEnd)
  window.removeEventListener('pointerup', handleTabsDragEnd)
  window.removeEventListener('blur', handleTabsDragEnd)
  window.removeEventListener('resize', handleWindowResize)
  if (headerResizeObserver.value) {
    headerResizeObserver.value.disconnect()
  }
})

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
  title: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: 'black'
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
		default: '1.6em'
	},
	fontWeight: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 400 : value
		}
  },
	fontWeightActive: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 400 : value
		}
  },
	textAlign: {
		type: String,
		default: 'right',
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
  opacityDisabled: {
    type: Number,
    default: 0.2,
    validator: value => {
      return !value ? 0.2 : value
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
	lightTabBorderColor: {
		type: String,
		default: '#f8f8f2'
	},
	lightTextColor: {
		type: String,
		default: '#000000'
	},
	lightTextColorActive: {
		type: String,
		default: '#1a73e8'
	},
	// Cores do tema dark
	darkBgColor: {
		type: String,
		default: '#353734'
	},
	darkBorderColor: {
		type: String,
		default: '#44475a'
	},
	darkTabBorderColor: {
		type: String,
		default: '#353734'
	},
	darkTextColor: {
		type: String,
		default: '#000000'
	},
	darkTextColorActive: {
		type: String,
		default: '#ffffff'
	},

	darkDisabledBorderColor: {
		type: String,
		default: 'rgba(68, 71, 90, 0.3)'
	},
  tabs: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every((item) => {
        return typeof item.key === 'string' && typeof item.label === 'string'
      })
    }
  },
  activeTab: {
    type: Number,
    default: 0,
    required: true
  },
  disabledTabs: {
    type: Array,
    default: () => [],
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
      return ['one'].includes(value)
    }
  },
  gap: {
    type: Number,
    default: 24,
    validator: value => {
      return !value ? 24 : value
    }
  },
  indicatorWidth: {
    type: Number,
    default: 2,
    validator: value => {
      return !value ? 2 : value
    }
  },
  barPaddingLeft: {
    type: Number,
    default: 0
  },
  isScrollClass: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	scrollClass: {
		type: String,
		default: ''
	}
})

const {
	nbId,
	paddingX,
	paddingY,
	borderRadius,
	disabled,
	fontFamily,
	fontSize,
	fontWeight,
  fontWeightActive,
	textColor,
	textAlign,
	hasBorderRadius,
	activeTextStyle,
	theme,
  opacityDisabled,
	inputStyle,
	lightBgColor,
	lightBorderColor,
	lightTabBorderColor,
	lightTextColor,
	lightTextColorActive,
	darkBgColor,
	darkBorderColor,
	darkTabBorderColor,
	darkTextColor,
	darkTextColorActive,
	tabIndex,
	hasTabIndexEnter,
  hasTabIndexSpace,
	ariaLabel,
	ariaAttrs,
  activeTab,
  disabledTabs,
  tabModel,
  gap,
  indicatorWidth,
  barPaddingLeft,
  isScrollClass,
  scrollClass
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = 'block'
	const paddingXValue = ((paddingX.value !== 0 && !paddingX.value) || paddingX.value < 0) ? 1 : paddingX.value
	const paddingYValue = ((paddingY.value !== 0 && !paddingY.value) || paddingY.value < 0) ? 0.2 : paddingY.value
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 100 : fontWeight.value
	const fontWeightActiveValue = ((fontWeightActive.value !== 0 && !fontWeightActive.value) || fontWeightActive.value < 0) ? 100 : fontWeightActive.value
  const themeValue = !theme.value ? 'light' : theme.value
  const textColorValue = !textColor.value ? 'black' : textColor.value

  const tabModelValue = !tabModel.value || tabModel.value !== 'one' ? 'one' : tabModel.value
  const gapStyleValue = ((gap.value !== 0 && !gap.value) || gap.value < 0) ? 24 : gap.value
  const indicatorWidthValue = ((indicatorWidth.value !== 0 && !indicatorWidth.value) || indicatorWidth.value < 0) ? 2 : indicatorWidth.value
  const opacityDisabledValue = ((opacityDisabled.value !== 0 && !opacityDisabled.value) || opacityDisabled.value < 0) ? 0.2 : opacityDisabled.value
  const barPaddingLeftValue = ((barPaddingLeft.value !== 0 && !barPaddingLeft.value) || barPaddingLeft.value < 0) ? 0 : barPaddingLeft.value

	return {
		disabled: disabledValue,
		display: displayValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
    fontWeightActive: fontWeightActiveValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
    borderRadius: borderRadiusValue,
		theme: themeValue,
		textColor: textColorValue,
		tabModel: tabModelValue,
		gap: gapStyleValue,
		indicatorWidth: indicatorWidthValue,
		opacityDisabled: opacityDisabledValue,
		barPaddingLeft: barPaddingLeftValue,
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
    paddingTop: '0px',
		overflow: 'hidden'
	}
})
const fontSizeStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	
	return defaultValues.fontSize
})

const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		color: defaultValues.textColor,
		fontWeight: defaultValues.fontWeight,
		textAlign: textAlign.value,
		marginTop: '0',
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
  return { width: 'auto' }
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

/* New logic below */
const currentActiveTab = ref('') // current active tab key
const tabsHeaderRef = ref(null) // tabs header reference
const tabRefs = ref({}) // tab references
const indicatorVersion = ref(0) // indicator version
const headerResizeObserver = ref(null) // header resize observer
const isDraggingTabs = ref(false) // is dragging tabs
const dragStartX = ref(0) // drag start x
const dragStartScrollLeft = ref(0) // drag start scroll left
const hasMovedDuringDrag = ref(false) // has moved during drag

// bump indicator version
const bumpIndicatorVersion = () => {
  indicatorVersion.value += 1
}

// setup header resize observer
const setupHeaderResizeObserver = () => {
  // check if ResizeObserver is supported
  if (typeof ResizeObserver === 'undefined') return

  // disconnect existing observer
  if (headerResizeObserver.value) {
    headerResizeObserver.value.disconnect()
  }

  // create new observer
  headerResizeObserver.value = new ResizeObserver(() => {
    bumpIndicatorVersion()
  })

  // observe tabs header
  if (tabsHeaderRef.value) {
    headerResizeObserver.value.observe(tabsHeaderRef.value)
  }
}

// indicator style
const indicatorStyle = computed(() => {
  // Dependencia reativa para forcar recalc quando o layout do header mudar (gap, fonte, resize, etc.)
  indicatorVersion.value

  // get active tab element
  const activeTabEl = tabRefs.value[currentActiveTab.value]

  // check if active tab element or tabs header reference is not found
  if (!activeTabEl || !tabsHeaderRef.value) {
    return { width: '0', left: '0' }
  }

  // get tabs header and active tab element bounding client rect
  const headerRect = tabsHeaderRef.value.getBoundingClientRect()

  // get active tab element bounding client rect
  const tabRect = activeTabEl.getBoundingClientRect()
  
  // return indicator style
  return {
    width: `${tabRect.width}px`,
    left: `${tabRect.left - headerRect.left + tabsHeaderRef.value.scrollLeft}px`
  }
})
// disabled tabs list
const disabledTabList = computed(() => {
  // check if disabled tabs list is empty
  if (!Array.isArray(props.disabledTabs) || props.disabledTabs.length === 0) {
    return []
  }

  // return disabled tabs list
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
const fontWeightActiveAStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  
  return defaultValues.fontWeightActive
})
const indicatorWidthStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  
  return `${defaultValues.indicatorWidth}px`
})
const opacityDisabledStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  
  return defaultValues.opacityDisabled
})
const barPaddingLeftStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  
  return `${defaultValues.barPaddingLeft}px`
})
const currentActiveTabIndex = computed(() => {
  return props.tabs.findIndex(tab => tab.key === currentActiveTab.value)
})
const scrollClassStyle = computed(() => {
  return isScrollClass.value ? scrollClass.value : ''
})

// get first enabled tab index
const getFirstEnabledTabIndex = () => {
  return props.tabs.findIndex((_, index) => !isTabDisabled(index))
}
// handle tab index enter
const handleTabIndex = (tabIndex, type = 'enter') => {
  // check if disabled or has tab index enter is disabled
  if (disabled.value || (type === 'enter' && !hasTabIndexEnter.value) || (type === 'space' && !hasTabIndexSpace.value)) return

  // get first enabled tab index
  const firstEnabledTabIndex = getFirstEnabledTabIndex()

  // get active tab index
  const activeTabIndex = Number.isInteger(tabIndex)
    ? tabIndex
    : (currentActiveTabIndex.value >= 0 ? currentActiveTabIndex.value : firstEnabledTabIndex)

  // check if active tab index is greater than 0
  if (activeTabIndex >= 0) {
    changeTab(activeTabIndex)
  }
}
// handle tabs drag start
const handleTabsDragStart = (event) => {
  // check if is scroll class or tabs header reference is not found
  if (!isScrollClass.value || !tabsHeaderRef.value) return

  // prevent default event
  event.preventDefault()

  // set is dragging tabs to true
  isDraggingTabs.value = true
  
  // set has moved during drag to false
  hasMovedDuringDrag.value = false
  
  // set drag start x to event client x
  dragStartX.value = event.clientX

  // set drag start scroll left to tabs header scroll left
  dragStartScrollLeft.value = tabsHeaderRef.value.scrollLeft
}
// handle tabs drag move
const handleTabsDragMove = (event) => {
  // check if is dragging tabs or tabs header reference is not found
  if (!isDraggingTabs.value || !tabsHeaderRef.value) return

  // get delta x
  const deltaX = event.clientX - dragStartX.value

  // check if delta x is greater than 4
  if (Math.abs(deltaX) > 4) {
    // set has moved during drag to true
    hasMovedDuringDrag.value = true
  }

  // set tabs header scroll left to drag start scroll left minus delta x
  tabsHeaderRef.value.scrollLeft = dragStartScrollLeft.value - deltaX
}
// handle tabs drag end
const handleTabsDragEnd = () => {
  // set has moved during drag to false
  hasMovedDuringDrag.value = false // set has moved during drag to false

  // set is dragging tabs to false
  isDraggingTabs.value = false // set is dragging tabs to false
}
// change tab
const changeTab = (tabIndex) => {
  // check if has moved during drag
  if (hasMovedDuringDrag.value) {
    // set has moved during drag to false
    hasMovedDuringDrag.value = false

    // return
    return
  }

  // check if disabled
  if (disabled.value) return

  // check if tab is disabled
  if (isTabDisabled(tabIndex)) return

  // resolve tab key
  const tabKey = resolveTabKey(tabIndex)

  // set current active tab
  currentActiveTab.value = tabKey

  emit('changed', {
    index: tabIndex,
    key: tabKey
  })
}
// resolve tab key
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
// is tab disabled
const isTabDisabled = (tabIdentifier) => {
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
// set active tab
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
// get first enabled tab
const getFirstEnabledTab = () => {
  // get first enabled tab
  const enabledTabs = props.tabs.filter((tab, index) => !isTabDisabled(index))

  // return first enabled tab key
  return enabledTabs.length > 0 ? enabledTabs[0].key : ''
}

// start tabs
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
// handle window resize
const handleWindowResize = async () => {
  // await next tick to ensure the DOM is updated
  await nextTick()

  // bump indicator version to force recalc when the layout of the header changes (gap, font, resize, etc.)
  bumpIndicatorVersion()
}

// no empty number
const noEmptyNumber = (value) => {
  return value !== '' && value !== null && value !== undefined
}

watch(activeTab, (newValue, oldValue) => {
  if (noEmptyNumber(newValue) && newValue !== oldValue) setActiveTab(newValue)
})
watch(disabledTabs, () => {
  startTabs()
})
watch(props, async () => {
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

.component {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	line-height: 1.42857143;
	font-family: v-bind('font');

	// user-select: none;

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
    .tabs-header {
      .tab-btn {
        color: v-bind('lightTextColor') !important;

        &.active {
          color: v-bind('lightTextColorActive') !important;
        }
      }

      .tabs-header__line {
        border-bottom: 1px solid v-bind('lightBorderColor');
      }
    }

    &.component__tab--background {
      &.component--model-one {
        .tabs-header {
          .tab-indicator {
            background-color: v-bind('lightBgColor');
          }
        }
      }
    }

    &.component__tab--line {
      &.component--model-one {
        .tabs-header {
          .tab-btn {
            &.active {
              color: v-bind('lightTextColorActive') !important;
            }
          }

          .tab-indicator {
            background-color: v-bind('lightBgColor');
          }
        }
      }
    }

    &.component__tab--border {
      border: 0;

      &.component--model-one {
        .tabs-header {
          .tab-btn {
            &.active {
              color: v-bind('lightTextColorActive') !important;
            }
          }

          .tab-indicator {
            height: 100%;
            background-color: v-bind('lightBgColor');
            border-left: 1px solid v-bind('lightTabBorderColor');
            border-right: 1px solid v-bind('lightTabBorderColor');
            border-bottom: none;
            border-top: 1px solid v-bind('lightTabBorderColor');
          }
        }
      }
    }

    &.component--model-one {}
  }

  
  &.component__theme--dark {
    .tabs-header {
      .tab-btn {
        color: v-bind('darkTextColor') !important;

        &.active {
          color: v-bind('darkTextColorActive') !important;
        }
      }

      .tabs-header__line {
        border-bottom: 1px solid v-bind('darkBorderColor');
      }
    }

    &.component__tab--background {
      &.component--model-one {
        .tabs-header {
          .tab-indicator {
            background-color: v-bind('darkBgColor');
          }
        }
      }
    }

    &.component__tab--line {
      &.component--model-one {
        .tabs-header {
          .tab-btn {
            &.active {
              color: v-bind('darkTextColorActive') !important;
            }
          }

          .tab-indicator {
            background-color: v-bind('darkBgColor');
          }
        }
      }
    }

    &.component__tab--border {
      border: 0;

      &.component--model-one {
        .tabs-header {
          .tab-btn {
            &.active {
              color: v-bind('darkTextColorActive') !important;
            }
          }

          .tab-indicator {
            height: 100%;
            background-color: v-bind('darkBgColor');
            border-left: 1px solid v-bind('darkTabBorderColor');
            border-right: 1px solid v-bind('darkTabBorderColor');
            border-bottom: none;
            border-top: 1px solid v-bind('darkTabBorderColor');
          }
        }
      }
    }

    &.component--model-one {}
  }
  // fim propTheme

  // inicio inputStyle
  &.component__tab--background {
    border: 0;

    &.component--model-one {
      .tabs-header {
        .tab-indicator {
          height: 100%;
        }
      }
    }
  }

  &.component__tab--line {
    border: 0;

    &.component--model-one {
      .tabs-header {
        .tab-indicator {
          height: v-bind('indicatorWidthStyle');
        }
      }
    }
  }

  &.component__tab--border {
      border: 0;

      &.component--model-one {
        .tabs-header {
          .tab-indicator {
            height: 100%;
          }
        }
      }
  }
  // fim inputStyle

  &.component--model-one {
    .tabs-header {
      display: flex;
      gap: v-bind('gapStyle');
      position: relative;
      width: 100%;
      padding-left: v-bind('barPaddingLeftStyle');
      overflow: hidden;

      &.tabs-header--dragging {
        cursor: grabbing;
        user-select: none;

        .tab-btn,
        .tab-btn:hover,
        .tab-btn:active,
        .tab-btn.tab-btn--disabled,
        .tab-btn.tab-btn--disabled:hover {
          cursor: grabbing !important;
        }
      }

      .tab-btn {
        // background: none;
        border: none;
        padding: v-bind('tabPaddingStyle') !important;
        background: none;
        cursor: pointer;
        position: relative;
        font-size: v-bind('fontSizeStyle') !important;
        transition: background-color 0.3s ease, color 0.3s ease;
        z-index: 2;

        &.active {
          color: v-bind('lightTextColorActive');
          font-weight: v-bind('fontWeightActiveAStyle');
        }

        &.tab-btn--disabled {
          user-select: none;
          opacity: v-bind('opacityDisabledStyle');

          &:hover {
            cursor: default !important;
          }
        }

        // inicio activeTextStyle
        &.component__text--italic {
          font-style: italic;
        }

        &.component__text--oblique {
          font-style: oblique;
        }

        &.component__text--normal {
          font-style: normal;
        }
        // fim activeTextStyle
      }

      .tab-indicator {
        position: absolute;
        bottom: -1px;
        height: v-bind('indicatorWidthStyle');
        background-color: #1a73e8;
        transition: background-color 0.3s ease, left 0.3s ease, width 0.3s ease, background-color 0.3s ease;
        z-index: 1;
      }

      .tabs-header__line {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0px;
        z-index: 0;
      }
    }
  }
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	.component {
		--disabled-button-color: v-bind('styleButtonColor');
		--disabled-color: v-bind('styleTextColor');
		border-radius: inherit;


    &.component--model-one {
      .tabs-header {
        .tab-btn {
          opacity: v-bind('opacityDisabledStyle');

          &.tab-btn--disabled {
            opacity: v-bind('opacityDisabledStyle');
          }
        }
      }
    }

		&.component__theme--light {}

		&.component__theme--dark {}
	}
}
</style>
