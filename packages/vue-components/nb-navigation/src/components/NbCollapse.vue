<template>
  <div
    v-if="nbId"
    ref="wrapperRef"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle]"
    v-bind="computedAriaAttrs"
  >
    <div
      :id="nbId"
      ref="componentContainer"
      :class="[
        'nb-reset', 'component', themeStyle, inputStyleClass,
        { 'component--active': isActive }
      ]"
      :style="[componentStyle]"
      :tabindex="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled ? -1 : tabIndex"
      :role="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled ? undefined : 'tab'"
      :aria-disabled="blockClick || !hasTabIndexEnter || !hasTabIndexSpace || disabled"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.enter.prevent="handleTabIndex('enter')"
      @keydown.space.prevent="handleTabIndex('space')"
    >
      <div
        @click="clicked"
        :class="[
          'component__button',
          isActive ? 'component__button--active' : 'component__button--deactivate',
          isActive ? activeTextStyleClass : ''
        ]"
      >
        <div
          :class="[
            'component__button-label'
          ]"
          :style="ellipsisTextStyle"
        >
          <slot name="title" :title="title" :is-active="isActive" :disabled="disabled">{{ title }}</slot>
        </div>
        <div
          class="component__button-trailing"
          :style="titleIconWidthStyle"
          aria-hidden="true"
        >
          <slot name="title-icon" :title="title" :is-active="isActive" :disabled="disabled">{{ isActive ? '−' : '+' }}</slot>
        </div>
      </div>
      <div
        ref="contentRef"
        :class="[
          'component__content',
          { 'component__content--active': isActive },
          scrollClassStyle
        ]"
        :style="[displayContent, contentHasBorderStyle]"
      >
        <slot name="content" :title="title" :is-active="isActive" :disabled="disabled"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

defineOptions({
  name: 'NbCollapse',
  inheritAttrs: false
})

const emit = defineEmits([
  'clicked',
  'focused',
  'blurred',
  'outside-clicked',
  'resized',
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
  hasTabIndexSpace: {
    type: Boolean,
    default: true
  },
  ariaLabel: {
    type: String,
    default: 'Collapse'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
	theme: {
		type: String,
		default: 'light',
		validator: value => {
			return ['dark', 'light'].indexOf(value) !== -1
		}
	},
	disabled: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},  
  blockClick: {
    type: Boolean,
    default: false,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  blockRightClick: {
    type: Boolean,
    default: false,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
	// Cores do tema light
  lightTitleColor: {
    type: String,
    default: '#1f2937'
  },
  lightTitleColorActive: {
    type: String,
    default: '#1d4ed8'
  },
  lightTitleColorHover: {
    type: String,
    default: '#111827'
  },
  lightTitleIconColor: {
    type: String,
    default: '#6b7280'
  },
  lightTitleIconColorActive: {
    type: String,
    default: '#1d4ed8'
  },
  lightTitleIconColorHover: {
    type: String,
    default: '#374151'
  },
  lightButtonBgColor: {
    type: String,
    default: '#f3f4f6'
  },
  lightButtonBgColorActive: {
    type: String,
    default: '#e0e7ff'
  },
  lightButtonBgColorHover: {
    type: String,
    default: '#e5e7eb'
  },
  lightContentColor: {
    type: String,
    default: '#1f2937'
  },
  lightContentBgColor: {
    type: String,
    default: '#ffffff'
  },
  lightContentBorderColor: {
    type: String,
    default: '#e5e7eb'
  },
	// Cores do tema dark
  darkTitleColor: {
    type: String,
    default: '#e5e7eb'
  },
  darkTitleColorActive: {
    type: String,
    default: '#60a5fa'
  },
  darkTitleColorHover: {
    type: String,
    default: '#f9fafb'
  },
  darkTitleIconColor: {
    type: String,
    default: '#9ca3af'
  },
  darkTitleIconColorActive: {
    type: String,
    default: '#60a5fa'
  },
  darkTitleIconColorHover: {
    type: String,
    default: '#d1d5db'
  },
  darkButtonBgColor: {
    type: String,
    default: '#1f2937'
  },
  darkButtonBgColorActive: {
    type: String,
    default: '#1e3a8a'
  },
  darkButtonBgColorHover: {
    type: String,
    default: '#374151'
  },
  darkContentColor: {
    type: String,
    default: '#e5e7eb'
  },
  darkContentBgColor: {
    type: String,
    default: '#111827'
  },
  darkContentBorderColor: {
    type: String,
    default: '#374151'
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
  opened: {
    type: Boolean,
    default: false,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  ellipsisText: {
    type: Boolean,
    default: true,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  isScrollClass: {
    type: Boolean,
    default: false,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
	scrollClass: {
		type: String,
		default: ''
	},
  title: {
    type: String,
    default: 'Open Collapsible'
  },
  titleGap: {
    type: Number,
    default: 0.5,
    validator: (value) => {
        return typeof value === 'number' && value >= 0
    }
  },
	titlePaddingX: {
		type: Number,
		default: 0.7,
		validator: value => {
			return !value ? 0.7 : value
		}
	},
	titlePaddingY: {
		type: Number,
		default: 0.7, // 0.2rem
		validator: value => {
			return !value ? 0.7 : value
		}
	},
	titleBorderRadius: {
		type: String,
		default: '5px 5px 5px 5px',
		validator: value => {
			return !value ? '5px 5px 5px 5px' : value
		}
	},
	titleBorderRadiusActive: {
		type: String,
		default: '5px 5px 0px 0px',
		validator: value => {
			return !value ? '5px 5px 0px 0px' : value
		}
	},
	titleFontFamily: {
		type: String,
		default: `'Lato', sans-serif`
	},
	titleFontSize: {
		type: String,
		default: '1.6em'
	},
	titleFontWeight: {
		type: Number,
		default: 500,
		validator: value => {
			return !value ? 500 : value
		}
  },
  titleIconWidth: {
    type: String,
    default: '2.4rem'
  },
	titleIconFontFamily: {
		type: String,
		default: `'Lato', sans-serif`
	},
	titleIconFontSize: {
		type: String,
		default: '2em'
	},
	titleIconFontWeight: {
		type: Number,
		default: 700,
		validator: value => {
			return !value ? 700 : value
		}
  },
	contentPaddingX: {
		type: Number,
		default: 1,
		validator: value => {
			return !value ? 1 : value
		}
	},
	contentPaddingY: {
		type: Number,
		default: 1,
		validator: value => {
			return !value ? 1 : value
		}
	},
	contentFontFamily: {
		type: String,
		default: `'Lato', sans-serif`
	},
	contentFontSize: {
		type: String,
		default: '1.6em'
	},
	contentFontWeight: {
		type: Number,
		default: 500,
		validator: value => {
			return !value ? 500 : value
		}
  },
	contentBorderRadiusActive: {
		type: String,
		default: '0px 0px 5px 5px',
		validator: value => {
			return !value ? '0px 0px 5px 5px' : value
		}
	},
  contentHasBorder: {
    type: Boolean,
    default: true,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  contentMaxHeight: {
    type: Number,
    default: 200,
    validator: (value) => {
        return typeof value === 'number' && value >= 0
    }
  }
})

const {
	nbId,
	display,
	tabIndex,
	hasTabIndexEnter,
	hasTabIndexSpace,
	ariaLabel,
	ariaAttrs,
	theme,
	disabled,
  lightTitleColor,
  lightTitleColorActive,
  lightTitleColorHover,
  lightTitleIconColor,
  lightTitleIconColorActive,
  lightTitleIconColorHover,
  lightButtonBgColor,
  lightButtonBgColorActive,
  lightButtonBgColorHover,
  lightContentColor,
	lightContentBgColor,
  lightContentBorderColor,
  darkTitleColor,
  darkTitleColorActive,
  darkTitleColorHover,
  darkTitleIconColor,
  darkTitleIconColorActive,
  darkTitleIconColorHover,
  darkButtonBgColor,
  darkButtonBgColorActive,
  darkButtonBgColorHover,
  darkContentColor,
	darkContentBgColor,
  darkContentBorderColor,
	textAlign,
	activeTextStyle,
  opened,
	blockClick,
	ellipsisText,
  isScrollClass,
	scrollClass,
  titleGap,
	titlePaddingX,
	titlePaddingY,
	titleBorderRadius,
	titleBorderRadiusActive,
	titleFontFamily,
	titleFontSize,
	titleFontWeight,
  titleIconWidth,
	titleIconFontFamily,
	titleIconFontSize,
	titleIconFontWeight,
	contentPaddingX,
	contentPaddingY,
	contentFontFamily,
	contentFontSize,
	contentFontWeight,
	contentBorderRadiusActive,
  contentHasBorder,
  contentMaxHeight,
} = toRefs(props)

// para o container do componente
const componentContainer = ref(null)
// para o wrapper do componente
const wrapperRef = ref(null)
// para o estado do componente
const isActive = ref(false)
// verificar se deve emitir o evento outside-clicked
const shouldEmitOutsideClick = ref(false)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const themeValue = !theme.value ? 'light' : theme.value

  const textAlignValue = !textAlign.value ? 'left' : textAlign.value
  const activeTextStyleValue = !activeTextStyle.value ? 'normal' : activeTextStyle.value
  
  const ellipsisTextValue = typeof ellipsisText.value === 'boolean'
    ? ellipsisText.value
    : false

  const titleGapValue = (typeof titleGap.value !== 'number' || Number.isNaN(titleGap.value) || titleGap.value < 0)
    ? 0.5
    : titleGap.value
  const titleIconWidthValue = !titleIconWidth.value ? '2.4rem' : titleIconWidth.value
  const titlePaddingXValue = ((titlePaddingX.value !== 0 && !titlePaddingX.value) || titlePaddingX.value < 0) ? 0.7 : titlePaddingX.value
	const titlePaddingYValue = ((titlePaddingY.value !== 0 && !titlePaddingY.value) || titlePaddingY.value < 0) ? 0.7 : titlePaddingY.value
	const titleBorderRadiusValue = !titleBorderRadius.value ? '5px 5px 5px 5px' : titleBorderRadius.value
	const titleBorderRadiusActiveValue = !titleBorderRadiusActive.value ? '5px 5px 0px 0px' : titleBorderRadiusActive.value
  const titleFontFamilyValue = !titleFontFamily.value ? `'Lato', sans-serif` : titleFontFamily.value
	const titleFontSizeValue = !titleFontSize.value ? '1.6em' : titleFontSize.value
	const titleFontWeightValue = ((titleFontWeight.value !== 0 && !titleFontWeight.value) || titleFontWeight.value < 0) ? 500 : titleFontWeight.value
  const titleIconFontFamilyValue = !titleIconFontFamily.value ? `'Lato', sans-serif` : titleIconFontFamily.value
	const titleIconFontSizeValue = !titleIconFontSize.value ? '1.6em' : titleIconFontSize.value
	const titleIconFontWeightValue = ((titleIconFontWeight.value !== 0 && !titleIconFontWeight.value) || titleIconFontWeight.value < 0) ? 700 : titleIconFontWeight.value
  const contentPaddingXValue = ((contentPaddingX.value !== 0 && !contentPaddingX.value) || contentPaddingX.value < 0) ? 1 : contentPaddingX.value
	const contentPaddingYValue = ((contentPaddingY.value !== 0 && !contentPaddingY.value) || contentPaddingY.value < 0) ? 1 : contentPaddingY.value
	const contentFontFamilyValue = !contentFontFamily.value ? `'Lato', sans-serif` : contentFontFamily.value
	const contentFontSizeValue = !contentFontSize.value ? '1.6em' : contentFontSize.value
	const contentFontWeightValue = ((contentFontWeight.value !== 0 && !contentFontWeight.value) || contentFontWeight.value < 0) ? 500 : contentFontWeight.value
	const contentBorderRadiusActiveValue = !contentBorderRadiusActive.value ? '0px 0px 5px 5px' : contentBorderRadiusActive.value
  const contentHasBorderValue = typeof contentHasBorder.value === 'boolean' ? contentHasBorder.value : true
  const contentMaxHeightValue = ((contentMaxHeight.value !== 0 && !contentMaxHeight.value) || contentMaxHeight.value < 0) ? 200 : contentMaxHeight.value

  const lightTitleColorValue = !lightTitleColor.value ? '#1f2937' : lightTitleColor.value
  const lightTitleColorActiveValue = !lightTitleColorActive.value ? '#1d4ed8' : lightTitleColorActive.value
  const lightTitleColorHoverValue = !lightTitleColorHover.value ? '#111827' : lightTitleColorHover.value
  const lightTitleIconColorValue = !lightTitleIconColor.value ? '#6b7280' : lightTitleIconColor.value
  const lightTitleIconColorActiveValue = !lightTitleIconColorActive.value ? '#1d4ed8' : lightTitleIconColorActive.value
  const lightTitleIconColorHoverValue = !lightTitleIconColorHover.value ? '#374151' : lightTitleIconColorHover.value
  const lightButtonBgColorValue = !lightButtonBgColor.value ? '#f3f4f6' : lightButtonBgColor.value
  const lightButtonBgColorActiveValue = !lightButtonBgColorActive.value ? '#e0e7ff' : lightButtonBgColorActive.value
  const lightButtonBgColorHoverValue = !lightButtonBgColorHover.value ? '#e5e7eb' : lightButtonBgColorHover.value
  const lightContentColorValue = !lightContentColor.value ? '#1f2937' : lightContentColor.value
  const lightContentBgColorValue = !lightContentBgColor.value ? '#ffffff' : lightContentBgColor.value
  const lightContentBorderColorValue = !lightContentBorderColor.value ? '#e5e7eb' : lightContentBorderColor.value
  const darkTitleColorValue = !darkTitleColor.value ? '#e5e7eb' : darkTitleColor.value
  const darkTitleColorActiveValue = !darkTitleColorActive.value ? '#60a5fa' : darkTitleColorActive.value
  const darkTitleColorHoverValue = !darkTitleColorHover.value ? '#f9fafb' : darkTitleColorHover.value
  const darkTitleIconColorValue = !darkTitleIconColor.value ? '#9ca3af' : darkTitleIconColor.value
  const darkTitleIconColorActiveValue = !darkTitleIconColorActive.value ? '#60a5fa' : darkTitleIconColorActive.value
  const darkTitleIconColorHoverValue = !darkTitleIconColorHover.value ? '#d1d5db' : darkTitleIconColorHover.value
  const darkButtonBgColorValue = !darkButtonBgColor.value ? '#1f2937' : darkButtonBgColor.value
  const darkButtonBgColorActiveValue = !darkButtonBgColorActive.value ? '#1e3a8a' : darkButtonBgColorActive.value
  const darkButtonBgColorHoverValue = !darkButtonBgColorHover.value ? '#374151' : darkButtonBgColorHover.value
  const darkContentColorValue = !darkContentColor.value ? '#e5e7eb' : darkContentColor.value
  const darkContentBgColorValue = !darkContentBgColor.value ? '#111827' : darkContentBgColor.value
  const darkContentBorderColorValue = !darkContentBorderColor.value ? '#374151' : darkContentBorderColor.value

	return {
		disabled: disabledValue,
		display: displayValue,
		theme: themeValue,
    textAlign: textAlignValue,
    activeTextStyle: activeTextStyleValue,
    ellipsisText: ellipsisTextValue,
    titleGap: titleGapValue,
		titlePaddingX: titlePaddingXValue,
		titlePaddingY: titlePaddingYValue,
		titleBorderRadius: titleBorderRadiusValue,
		titleBorderRadiusActive: titleBorderRadiusActiveValue,
		titleFontFamily: titleFontFamilyValue,
		titleFontSize: titleFontSizeValue,
		titleFontWeight: titleFontWeightValue,
    titleIconWidth: titleIconWidthValue,
		titleIconFontFamily: titleIconFontFamilyValue,
		titleIconFontSize: titleIconFontSizeValue,
		titleIconFontWeight: titleIconFontWeightValue,
		contentPaddingX: contentPaddingXValue,
		contentPaddingY: contentPaddingYValue,
		contentFontFamily: contentFontFamilyValue,
		contentFontSize: contentFontSizeValue,
		contentFontWeight: contentFontWeightValue,
		contentBorderRadiusActive: contentBorderRadiusActiveValue,
    contentHasBorder: contentHasBorderValue,
    contentMaxHeight: contentMaxHeightValue,
    lightTitleColor: lightTitleColorValue,
    lightTitleColorActive: lightTitleColorActiveValue,
    lightTitleColorHover: lightTitleColorHoverValue,
    lightTitleIconColor: lightTitleIconColorValue,
    lightTitleIconColorActive: lightTitleIconColorActiveValue,
    lightTitleIconColorHover: lightTitleIconColorHoverValue,
    lightButtonBgColor: lightButtonBgColorValue,
    lightButtonBgColorActive: lightButtonBgColorActiveValue,
    lightButtonBgColorHover: lightButtonBgColorHoverValue,
    lightContentColor: lightContentColorValue,
    lightContentBgColor: lightContentBgColorValue,
    lightContentBorderColor: lightContentBorderColorValue,
    darkTitleColor: darkTitleColorValue,
    darkTitleColorActive: darkTitleColorActiveValue,
    darkTitleColorHover: darkTitleColorHoverValue,
    darkTitleIconColor: darkTitleIconColorValue,
    darkTitleIconColorActive: darkTitleIconColorActiveValue,
    darkTitleIconColorHover: darkTitleIconColorHoverValue,
    darkButtonBgColor: darkButtonBgColorValue,
    darkButtonBgColorActive: darkButtonBgColorActiveValue,
    darkButtonBgColorHover: darkButtonBgColorHoverValue,
    darkContentColor: darkContentColorValue,
    darkContentBgColor: darkContentBgColorValue,
    darkContentBorderColor: darkContentBorderColorValue,
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
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		marginTop: '0',
	}
})
const textAlignStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textAlign
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
const inputStyleClass = computed(() => {
	return 'component__input--background'
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

const titleColorStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.theme === 'dark' ? defaultValues.darkTitleColor : defaultValues.lightTitleColor
})
const titleColorActiveStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.theme === 'dark' ? defaultValues.darkTitleColorActive : defaultValues.lightTitleColorActive
})
const titleColorHoverStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.theme === 'dark' ? defaultValues.darkTitleColorHover : defaultValues.lightTitleColorHover
})
const titleIconColorStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.theme === 'dark' ? defaultValues.darkTitleIconColor : defaultValues.lightTitleIconColor
})
const titleIconColorActiveStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.theme === 'dark' ? defaultValues.darkTitleIconColorActive : defaultValues.lightTitleIconColorActive
})
const titleIconColorHoverStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.theme === 'dark' ? defaultValues.darkTitleIconColorHover : defaultValues.lightTitleIconColorHover
})
const buttonBgColorStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.theme === 'dark' ? defaultValues.darkButtonBgColor : defaultValues.lightButtonBgColor
})
const buttonBgColorActiveStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.theme === 'dark' ? defaultValues.darkButtonBgColorActive : defaultValues.lightButtonBgColorActive
})
const buttonBgColorHoverStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.theme === 'dark' ? defaultValues.darkButtonBgColorHover : defaultValues.lightButtonBgColorHover
})
const contentColorStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.theme === 'dark' ? defaultValues.darkContentColor : defaultValues.lightContentColor
})
const contentBgColorStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.theme === 'dark' ? defaultValues.darkContentBgColor : defaultValues.lightContentBgColor
})

// handle tab index enter
const handleTabIndex = (tabIndex, type = 'enter') => {
  if (blockClick.value || disabled.value || (type === 'enter' && !hasTabIndexEnter.value) || (type === 'space' && !hasTabIndexSpace.value)) return

  clicked()
}

const changeActive = (value) => {
  isActive.value = value
}
const clicked = (event = null) => {
  if (blockClick.value || disabled.value) return

  const newValeu = !isActive.value

  changeActive(newValeu)

  emit('clicked')
}

const handleFocus = () => {
  // changeActive(true)

  emit('focused')
}
const handleBlur = () => {
  // changeActive(false)

  emit('blurred')
}

// evento para verificar se deve emitir o evento outside-clicked (clicar fora do componente)
const markOutsideIntent = (event) => {
  // Registrar no início da interação se deve emitir outside-clicked,
  // antes de possíveis blurs alterarem o isActive
  shouldEmitOutsideClick.value = !!isActive.value && !wrapperRef.value?.contains(event.target)
}
// evento para emitir o evento outside-clicked (clicar fora do componente)
const handleClickOutside = (event) => {
  // se o click é dentro do componente, não faz nada
  if (wrapperRef.value?.contains(event.target)) return

  // se não deve emitir o evento outside-clicked, não faz nada
  if (!shouldEmitOutsideClick.value) return

  // mudar o estado do componente para false
  // changeActive(false)

  // emitir o evento outside-clicked
  emit('outside-clicked', event)

  // resetar a flag para não emitir o evento outside-clicked novamente
  shouldEmitOutsideClick.value = false
}

// evento para verificar se o componente foi redimensionado
const handleResize = (event) => {
  // obtem o tamanho do componente
  const rect = wrapperRef.value?.getBoundingClientRect?.()

  // obtem o tamanho do componente
  const componentWidth = rect?.width ?? null
  const componentHeight = rect?.height ?? null

  // emitir o evento resized
  emit('resized', {
    event,
    width: componentWidth,
    height: componentHeight
  })
}


onMounted(() => {
  document.addEventListener('pointerdown', markOutsideIntent, true)
  document.addEventListener('mousedown', markOutsideIntent, true)
  document.addEventListener('touchstart', markOutsideIntent, true)
  document.addEventListener('click', handleClickOutside, false)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', markOutsideIntent, true)
  document.removeEventListener('mousedown', markOutsideIntent, true)
  document.removeEventListener('touchstart', markOutsideIntent, true)
  document.removeEventListener('click', handleClickOutside, false)
  window.removeEventListener('resize', handleResize)
})

/* New logic below */
const contentRef = ref(null)
const scrollClassStyle = computed(() => {
  return isScrollClass.value ? scrollClass.value : ''
})
const displayContent = computed(() => {
  return {
    display: isActive.value ? 'block' : 'none',
  };
});
const titleGapStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `${defaultValues.titleGap}rem`
})
const titleIconWidthStyle = computed(() => {
  const w = formatDefaultValues.value.titleIconWidth

  return {
    flex: `0 0 ${w}`,
    width: w,
    minWidth: w,
    maxWidth: w,
    boxSizing: 'border-box'
  }
})
const titlePaddingStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return `${defaultValues.titlePaddingY}rem ${defaultValues.titlePaddingX}rem`
})
const titleBorderRadiusStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.titleBorderRadius
})
const titleBorderRadiusActiveStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.titleBorderRadiusActive
})
const titleFontFamilyStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.titleFontFamily
})
const titleFontSizeStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	
	return defaultValues.titleFontSize
})
const titleFontWeightStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.titleFontWeight
})
const titleIconFontFamilyStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.titleIconFontFamily
})
const titleIconFontSizeStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.titleIconFontSize
})
const titleIconFontWeightStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.titleIconFontWeight
})
const contentPaddingStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return `${defaultValues.contentPaddingY}rem ${defaultValues.contentPaddingX}rem`
})
const contentFontFamilyStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.contentFontFamily
})
const contentFontSizeStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.contentFontSize
})
const contentFontWeightStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.contentFontWeight
})
const contentBorderRadiusActiveStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.contentBorderRadiusActive
})
const contentHasBorderStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

  const borderColor = defaultValues.theme === 'dark' ? defaultValues.darkContentBorderColor : defaultValues.lightContentBorderColor

  const borderConfig = {
    borderStyle: 'solid',
    borderColor: borderColor,
    borderLeftWidth: '1px',
    borderRightWidth: '1px',
    borderTopWidth: '0',
    borderBottomWidth: '1px'
  }

	return isActive.value && defaultValues.contentHasBorder ? borderConfig : { border: 'none !important', borderWidth: '0 !important' }
})
const contentMaxHeightStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `${defaultValues.contentMaxHeight}px`
})

watch(opened, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    changeActive(newVal)
  }
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

	// user-select: none;

	// touch-action: manipulation;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	-webkit-text-decoration-line: none;
	text-decoration-line: none;

  &.component--active {}
  
  // Component style start below:
  .component__button {
    cursor: pointer;
    padding: v-bind('titlePaddingStyle');
    width: 100%;
    min-width: 0;
    border: none;
    outline: none;
    border-radius: v-bind('titleBorderRadiusStyle');

    display: flex;
    align-items: center;
    gap: v-bind('titleGapStyle');

    // inicio activeTextStyle
    &.component__text--italic {
      .component__button-label {
        font-style: italic;
      }
    }

    &.component__text--oblique {
      .component__button-label {
        font-style: oblique;
      }
    }

    &.component__text--normal {
      .component__button-label {
        font-style: normal;
      }
    }
    // fim activeTextStyle

    .component__button-label {
      flex: 1 1 0%;
      min-width: 0;
      overflow: hidden;
      font-family: v-bind('titleFontFamilyStyle');
      font-size: v-bind('titleFontSizeStyle');
      font-weight: v-bind('titleFontWeightStyle');
      text-align: v-bind('textAlignStyle');
    }

    .component__button-trailing {
      flex-shrink: 0;
      flex-grow: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      text-align: center;
      font-family: v-bind('titleIconFontFamilyStyle');
      font-size: v-bind('titleIconFontSizeStyle');
      font-weight: v-bind('titleIconFontWeightStyle');
    }

    &.component__button--active {
      border-radius: v-bind('titleBorderRadiusActiveStyle');
    }
  }

  .component__content {
    padding: v-bind('contentPaddingStyle');
    display: none;
    font-family: v-bind('contentFontFamilyStyle');
    font-size: v-bind('contentFontSizeStyle');
    font-weight: v-bind('contentFontWeightStyle');
    border-radius: v-bind('contentBorderRadiusActiveStyle');
    max-height: v-bind('contentMaxHeightStyle');
    overflow-x: hidden;
    overflow-y: auto;
  }

  // inicio propTheme
  &.component__theme--light {
    .component__button {
      background-color: v-bind('buttonBgColorStyle');

      &.component__button--active {
        background-color: v-bind('buttonBgColorActiveStyle');

        .component__button-label {
          color: v-bind('titleColorActiveStyle');
        }
        .component__button-trailing {
          color: v-bind('titleIconColorActiveStyle');
        }
      }
      
      &:hover {
        background-color: v-bind('buttonBgColorHoverStyle');

        .component__button-label {
          color: v-bind('titleColorHoverStyle');
        }
        .component__button-trailing {
          color: v-bind('titleIconColorHoverStyle');
        }
      }

      .component__button-label {
        color: v-bind('titleColorStyle');
      }
      .component__button-trailing {
        color: v-bind('titleIconColorStyle');
      }
    }

    .component__content {
      color: v-bind('contentColorStyle') !important;
      background-color: v-bind('contentBgColorStyle');
    }
  }

  &.component__theme--dark {
    .component__button {
      background-color: v-bind('buttonBgColorStyle');

      &.component__button--active {
        background-color: v-bind('buttonBgColorActiveStyle');

        .component__button-label {
          color: v-bind('titleColorActiveStyle');
        }
        .component__button-trailing {
          color: v-bind('titleIconColorActiveStyle');
        }
      }
      
      &:hover {
        background-color: v-bind('buttonBgColorHoverStyle');

        .component__button-label {
          color: v-bind('titleColorHoverStyle');
        }
        .component__button-trailing {
          color: v-bind('titleIconColorHoverStyle');
        }
      }

      .component__button-label {
        color: v-bind('titleColorStyle');
      }
      .component__button-trailing {
        color: v-bind('titleIconColorStyle');
      }
    }

    .component__content {
      color: v-bind('contentColorStyle') !important;
      background-color: v-bind('contentBgColorStyle');
    }
  }
  // fim propTheme
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	opacity: 0.8;

	.component {
		border-radius: inherit;

		&.component__theme--light {}

		&.component__theme--dark {}
	}
}
</style>
