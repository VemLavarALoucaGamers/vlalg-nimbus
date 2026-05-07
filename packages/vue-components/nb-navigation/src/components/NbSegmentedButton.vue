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
      :class="[
        'nb-reset',
        'component',
        themeStyle,
        componentStyleClass,
        scrollClassStyle,
        { 'segmented--dragging': isSegmentDragging && hasScroll }
      ]"
      :style="[componentConfigStyle, borderRadiusStyle]"
      :tabindex="!hasTabIndexEnter || !hasTabIndexSpace || disabled ? -1 : tabIndex"
      :role="!hasTabIndexEnter || !hasTabIndexSpace || disabled ? undefined : 'tab'"
      :aria-disabled="!hasTabIndexEnter || !hasTabIndexSpace || disabled"
      @mousedown="handleSegmentDragStart"
      @mousemove="handleSegmentDragMove"
      @mouseleave="handleSegmentDragEnd"
      @scroll.passive="handleSegmentScroll"
    >
      <span
        v-if="hasSelectedAnimation"
        class="active-indicator"
        :style="activeIndicatorStyle"
      ></span>

      <div
        v-for="(option, index) in currentOptions"
        :key="index"
        :ref="(el) => setOptionRef(el, index)"
        :class="[
          'item',
          {
            active: currentSelected === index,
            disabled: isSelectedDisabled(index),
            'has-selected-animation': hasSelectedAnimation
          }
        ]"
        :style="[
          selectedBorderRadiusStyle,
          {
            fontWeight: fontStrongActive && currentSelected === index ? 'bold' : 'normal'
          }
        ]"
        :disabled="isSelectedDisabled(index)"
        :tabindex="!hasTabIndexEnter || !hasTabIndexSpace || disabled ? -1 : tabIndex"
        :role="!hasTabIndexEnter || !hasTabIndexSpace || disabled ? undefined : 'tab'"
        :aria-disabled="!hasTabIndexEnter || !hasTabIndexSpace || disabled || isSelectedDisabled(index)"
        @keydown.enter.prevent="handleTabIndex(index, 'enter')"
        @keydown.space.prevent="handleTabIndex(index, 'space')"
        @click="handleClick(index)"
      >
        <slot :name="`option-${index}`" :option="option" :index="index" :options="currentOptions">
          {{ option }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

defineOptions({
  name: 'NbSegmentedButton',
  inheritAttrs: false
})

onMounted(() => {
  startValues()
  nextTick(() => {
    syncResizeTracking()
    if (hasSelectedAnimation.value) {
      scheduleIndicatorUpdate()
    }
  })

  // add event listeners for mouseup, pointerup and blur
  window.addEventListener('mouseup', handleSegmentDragEnd)
  window.addEventListener('pointerup', handleSegmentDragEnd)
  window.addEventListener('blur', handleSegmentDragEnd)
})

onBeforeUnmount(() => {
  teardownResizeTracking()

  // remove event listeners for mouseup, pointerup and blur
  window.removeEventListener('mouseup', handleSegmentDragEnd)
  window.removeEventListener('pointerup', handleSegmentDragEnd)
  window.removeEventListener('blur', handleSegmentDragEnd)
})

const emit = defineEmits([
  'clicked',
  'changed'
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
    default: 'Segmented Button'
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
	/* Mesma base visual que NbInput (lightBgColor / darkBgColor + labels) */
	lightBackground: {
		type: String,
		default: '#f8f8f2'
	},
	/* Tom do segmento ativo no light — igual NbInput `lightBgColorFocus` */
	lightBackgroundFocus: {
		type: String,
		default: '#eaeaea'
	},
	lightColor: {
		type: String,
		default: '#333333'
	},
	lightColorFocus: {
		type: String,
		default: '#000000'
	},
	darkBackground: {
		type: String,
		default: '#353734'
	},
	/* Mais claro que a trilha — cinza médio (#5f5f5f) lê bem sobre #353734 */
	darkBackgroundFocus: {
		type: String,
		default: '#5f5f5f'
	},
	darkColor: {
		type: String,
		default: '#c8c8c8'
	},
	darkColorFocus: {
		type: String,
		default: '#ffffff'
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
			return !value ? 700 : value
		}
  },
	fontStrongActive: {
		type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
  },
  gap: {
    type: Number,
    default: 0.5,
    validator: value => {
      return !value ? 0.5 : value
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
	padding: {
		type: Number,
		default: .25,
		validator: value => {
			return !value ? 0.25 : value
		}
	},
  opacityDisabled: {
    type: Number,
    default: 0.4,
    validator: value => {
      return !value ? 0.4 : value
    }
  },
  hasScroll: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  options: {
    type: Array,
    default: () => []
  },
  optionsOpacityDisabled: {
    type: Number,
    default: 0.3,
    validator: value => {
      return !value ? 0.3 : value
    }
  },
  optionsPaddingX: {
		type: Number,
		default: 0.25,
		validator: value => {
			return !value ? 0.25 : value
		}
	},
	optionsPaddingY: {
		type: Number,
		default: 0.7,
		validator: value => {
			return !value ? 0.7 : value
		}
	},
  selected: {
    type: Number,
    default: 0,
    validator: value => {
      return typeof value === 'number' && value >= 0
    }
  },
  selectedsDisabled: {
    type: Array,
    default: () => [],
    validator: value => {
      return Array.isArray(value) && value.every(item => typeof item === 'number')
    }
  },
  hasSelectedAnimation: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
	hasSelectedBorderRadius: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	selectedBorderRadius: {
		type: Number,
		default: 0.375
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
	display,
	borderRadius,
	disabled,
	hasBorderRadius,
	theme,
	tabIndex,
	hasTabIndexEnter,
  hasTabIndexSpace,
	ariaLabel,
	ariaAttrs,
	lightBackground,
	lightBackgroundFocus,
	lightColor,
	lightColorFocus,
	darkBackground,
	darkBackgroundFocus,
	darkColor,
	darkColorFocus,
	fontFamily,
	fontSize,
	fontWeight,
	fontStrongActive,
	padding,
  opacityDisabled,
  hasScroll,
	options,
  optionsOpacityDisabled,
	optionsPaddingX,
	optionsPaddingY,
	selected,
  selectedsDisabled,
  hasSelectedAnimation,
  hasSelectedBorderRadius,
  selectedBorderRadius,
  gap,
  isScrollClass,
  scrollClass
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const themeValue = !theme.value ? 'light' : theme.value

  const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 400 : fontWeight.value
	const fontStrongActiveValue = ((fontStrongActive.value !== 0 && !fontStrongActive.value) || fontStrongActive.value < 0) ? 500 : fontStrongActive.value
  const paddingValue = ((padding.value !== 0 && !padding.value) || padding.value < 0) ? 0.25 : padding.value
  const optionsPaddingXValue = ((optionsPaddingX.value !== 0 && !optionsPaddingX.value) || optionsPaddingX.value < 0) ? 0.25 : optionsPaddingX.value
  const optionsPaddingYValue = ((optionsPaddingY.value !== 0 && !optionsPaddingY.value) || optionsPaddingY.value < 0) ? 0.7 : optionsPaddingY.value
  const hasScrollValue = !hasScroll.value ? false : hasScroll.value
  const opacityDisabledValue = ((opacityDisabled.value !== 0 && !opacityDisabled.value) || opacityDisabled.value < 0 || opacityDisabled.value > 1) ? 0.4 : opacityDisabled.value
  const optionsOpacityDisabledValue = ((optionsOpacityDisabled.value !== 0 && !optionsOpacityDisabled.value) || optionsOpacityDisabled.value < 0 || optionsOpacityDisabled.value > 1) ? 0.3 : optionsOpacityDisabled.value
  const selectedBorderRadiusValue = ((selectedBorderRadius.value !== 0 && !selectedBorderRadius.value) || selectedBorderRadius.value < 0) ? 0 : selectedBorderRadius.value
  const hasSelectedAnimationValue = !hasSelectedAnimation.value ? false : hasSelectedAnimation.value
  const gapValue = ((gap.value !== 0 && !gap.value) || gap.value < 0) ? 0.5 : gap.value

	return {
		disabled: disabledValue,
		display: displayValue,
		padding: paddingValue,
		optionsPaddingX: optionsPaddingXValue,
		optionsPaddingY: optionsPaddingYValue,
    borderRadius: borderRadiusValue,
		theme: themeValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		fontStrongActive: fontStrongActiveValue,
    hasScroll: hasScrollValue,
    opacityDisabled: opacityDisabledValue,
    optionsOpacityDisabled: optionsOpacityDisabledValue,
    selectedBorderRadius: selectedBorderRadiusValue,
    hasSelectedAnimation: hasSelectedAnimationValue,
    gap: gapValue,
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
const fontWeightStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	
	return defaultValues.fontWeight
})
const componentConfigStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		padding: `${defaultValues.padding}rem`,
		marginTop: '0',
	}
})
const borderRadiusStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	if (hasBorderRadius.value) {
		return { borderRadius: `${defaultValues.borderRadius}rem` }
	}
	return {}
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
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
const componentStyleClass = computed(() => {
	return 'component__style--background'
})

// handle tab index enter
const handleTabIndex = (tabIndex, type = 'enter') => {
  // check if disabled or has tab index enter is disabled
  if (disabled.value || (type === 'enter' && !hasTabIndexEnter.value) || (type === 'space' && !hasTabIndexSpace.value)) return

  // change selected
  handleClick(tabIndex)
}

/* New logic below */
const currentOptions = ref([])
const currentSelectedOld = ref(null)
const currentSelected = ref('')
const componentContainer = ref(null)

// referências das opções
const optionRefs = ref([])
// métricas do indicador de ativo de seleção
const indicatorMetrics = ref({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  opacity: 0
})
// observador de redimensionamento
let resizeObserver = null

/** Arrastar para rolar (mesmo padrão do NbTabs, quando has scroll é verdadeiro) */
const isSegmentDragging = ref(false) 
// referência do segment drag start x
const segmentDragStartX = ref(0)
// referência do segment drag start scroll left
const segmentDragStartScrollLeft = ref(0)
// referência do segment drag moved
const segmentDragMoved = ref(false)

const hasScrollStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.hasScroll ? 'auto' : 'hidden'
})
const wrapStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return !defaultValues.hasScroll ? 'wrap' : 'nowrap'
})
const opacityDisabledStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.opacityDisabled}`
})
const optionsOpacityDisabledStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.optionsOpacityDisabled}`
})
const optionsPaddingStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.optionsPaddingX}rem ${defaultValues.optionsPaddingY}rem`
})
const selectedBorderRadiusStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	if (hasSelectedBorderRadius.value) {
		return { borderRadius: `${defaultValues.selectedBorderRadius}rem` }
	}
	return {}
})
const activeIndicatorStyle = computed(() => {
  const currentMetrics = indicatorMetrics.value
  const borderRadiusValue = hasSelectedBorderRadius.value ? `${formatDefaultValues.value.selectedBorderRadius}rem` : '0'

  return {
    left: `${currentMetrics.left}px`,
    top: `${currentMetrics.top}px`,
    width: `${currentMetrics.width}px`,
    height: `${currentMetrics.height}px`,
    opacity: `${currentMetrics.opacity}`,
    borderRadius: borderRadiusValue
  }
})
const gapStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.gap}rem`
})
const scrollClassStyle = computed(() => {
  return isScrollClass.value ? scrollClass.value : ''
})

const startValues = () => {
  currentOptions.value = Array.isArray(options.value) ? options.value : []
  currentSelected.value = transformaSelected(selected.value)
}
const transformaSelected = (selectedValue) => {
  const firstItem = 0

  if (selectedValue === null || selectedValue === undefined || typeof selectedValue !== 'number') return 0
  if (selectedValue < 0 || isNaN(selectedValue)) return 0

  const optionsArray = currentOptions.value

  const hasArray = optionsArray !== null && optionsArray !== undefined && Array.isArray(optionsArray) && optionsArray.length > 0
  if (!hasArray) return 0

  const arrayLowercase = optionsArray.map(item => item.toLowerCase())
  const arrayIncludes = arrayLowercase.findIndex((item, index) => item === arrayLowercase[selectedValue] && index === selectedValue)

  return arrayIncludes !== -1 ? selectedValue : firstItem
}
const changedSelected = (newValue, oldValue) => {
  currentSelectedOld.value = newValue === null || newValue === undefined ? 0 : oldValue
  currentSelected.value = newValue
}
// define as referências das opções
const setOptionRef = (el, index) => {
  // verifica se a referência é válida
  if (!el) return

  // define a referência da opção
  optionRefs.value[index] = el
}
// atualiza o indicador de ativo
const updateActiveIndicator = () => {
  // verifica se o has selected animation é verdadeiro
  if (!hasSelectedAnimation.value) return

  // verifica se o container é válido
  const container = componentContainer.value

  // verifica se o total de opções é válido
  const total = currentOptions.value.length
  
  // verifica se o total de opções é maior que 0
  const hasOptions = total > 0

  // verifica se o índice selecionado é válido
  const index = typeof currentSelected.value === 'number' ? currentSelected.value : 0
  
  // verifica se o índice selecionado é válido
  const safeIndex = Math.min(Math.max(index, 0), Math.max(total - 1, 0))
  
  // verifica se a opção selecionada é válida
  const selectedOption = optionRefs.value[safeIndex]

  // verifica se o container, as opções e a opção selecionada são válidos
  if (!container || !hasOptions || !selectedOption) {
    // reseta as métricas do indicador
    indicatorMetrics.value = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      opacity: 0
    }

    // retorna
    return
  }

  // verifica se o container e a opção selecionada são válidos
  const containerRect = container.getBoundingClientRect()

  // verifica se a opção selecionada é válida e obtém as métricas da opção
  const optionRect = selectedOption.getBoundingClientRect()

  // verifica se o has scroll é verdadeiro e obtém o scroll left do container
  const scrollLeft = formatDefaultValues.value.hasScroll ? container.scrollLeft : 0

  // verifica se o has scroll é verdadeiro e obtém o scroll left do container
  const left = optionRect.left - containerRect.left + scrollLeft

  // atualiza as métricas do indicador (inclui scrollLeft como no NbTabs)
  indicatorMetrics.value = {
    left: left,
    top: optionRect.top - containerRect.top,
    width: optionRect.width,
    height: optionRect.height,
    opacity: 1
  }
}

// handle segment scroll
const handleSegmentScroll = () => {
  if (hasSelectedAnimation.value) {
    scheduleIndicatorUpdate()
  }
}

// handle segment drag start
const handleSegmentDragStart = (event) => {
  // verifica se o has scroll é verdadeiro e o container é válido
  if (!formatDefaultValues.value.hasScroll || !componentContainer.value) return

  // verifica se o botão é válido
  if (event.button != null && event.button !== 0) return

  // previne o comportamento padrão do evento
  event.preventDefault()

  // set is segment dragging to true
  isSegmentDragging.value = true
  
  // set segment drag moved to false
  segmentDragMoved.value = false
  
  // set segment drag start x to event client x
  segmentDragStartX.value = event.clientX

  // set segment drag start scroll left to container scroll left
  segmentDragStartScrollLeft.value = componentContainer.value.scrollLeft
}

// handle segment drag move
const handleSegmentDragMove = (event) => {
  // verifica se o is segment dragging é verdadeiro e o container é válido
  if (!isSegmentDragging.value || !componentContainer.value) return

  // verifica se o is segment dragging é verdadeiro e o container é válido
  const deltaX = event.clientX - segmentDragStartX.value

  // verifica se o delta x é maior que 4
  if (Math.abs(deltaX) > 4) {
    segmentDragMoved.value = true
  }

  // set container scroll left to segment drag start scroll left minus delta x
  componentContainer.value.scrollLeft = segmentDragStartScrollLeft.value - deltaX
}

// handle segment drag end
const handleSegmentDragEnd = () => {
  // set is segment dragging to false
  isSegmentDragging.value = false

  // set segment drag moved to false
  setTimeout(() => {
    segmentDragMoved.value = false
  }, 0)
}

/** Depois de flex/wrap/layout, um frame ajuda o indicador a bater com o botão real */
const scheduleIndicatorUpdate = () => {
  nextTick(() => {
    requestAnimationFrame(() => {
      updateActiveIndicator()
    })
  })
}

// remove o observador de redimensionamento
const teardownResizeTracking = () => {
  // verifica se o observador de redimensionamento é válido
  if (resizeObserver) {
    // desconecta o observador de redimensionamento
    resizeObserver.disconnect()

    // reseta o observador de redimensionamento
    resizeObserver = null
  }

  // remove o listener de redimensionamento
  window.removeEventListener('resize', updateActiveIndicator)
}

/**
 * Remove listeners/observers anteriores e registra de novo conforme `hasSelectedAnimation`.
 * Ao ligar a animação depois do mount (ou desligar), evita leaks e ResizeObserver duplicado.
 */
const syncResizeTracking = () => {
  // remove o observador de redimensionamento
  teardownResizeTracking()

  // verifica se o has selected animation é falso
  if (!hasSelectedAnimation.value) return

  // verifica se o ResizeObserver é válido
  if (typeof ResizeObserver !== 'undefined') {
    // cria um novo observador de redimensionamento
    resizeObserver = new ResizeObserver(() => {
      updateActiveIndicator()
    })

    // verifica se o observador de redimensionamento e o container são válidos
    nextTick(() => {
      if (resizeObserver && componentContainer.value) {
        resizeObserver.observe(componentContainer.value)
      }
    })
    return
  }

  // adiciona o listener de redimensionamento
  window.addEventListener('resize', updateActiveIndicator)
}

// verifica se a opção está desabilitada
const isSelectedDisabled = (index) => {
  // verifica se o componente está desabilitado
  if (disabled.value) return false

  return selectedsDisabled.value.includes(index)
}

const handleClick = (newIndex) => {
  // verifica se o segment drag moved é verdadeiro
  if (segmentDragMoved.value) {
    segmentDragMoved.value = false
    return
  }

  const valueBeforeClick = currentSelected.value
  const isSame = valueBeforeClick === newIndex

  if (isSame || disabled.value || isSelectedDisabled(newIndex)) return

  changedSelected(newIndex, valueBeforeClick)

	emit('clicked', {
    index: newIndex,
    value: currentOptions.value[newIndex]
  })
}

watch(options, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    currentOptions.value = Array.isArray(newValue) ? newValue : []
    
    // reseta as referências das opções
    optionRefs.value = []

    currentSelected.value = transformaSelected(selected.value)
    
    if (hasSelectedAnimation.value) {
      scheduleIndicatorUpdate()
    }
  }
}, { immediate: true })

watch(selected, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    currentSelectedOld.value = oldValue
    currentSelected.value = transformaSelected(newValue)
    
    if (hasSelectedAnimation.value) {
      scheduleIndicatorUpdate()
    }
  }
}, { immediate: true })
watch(currentSelected, () => {
  // verifica se o has selected animation é verdadeiro
  if (hasSelectedAnimation.value) {
    scheduleIndicatorUpdate()
  }
})

watch(hasSelectedAnimation, (enabled) => {
  nextTick(() => {
    syncResizeTracking()
    if (enabled) {
      scheduleIndicatorUpdate()
    } else {
      indicatorMetrics.value = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        opacity: 0
      }
    }
  })
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
  max-width: 100%;
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
  position: relative;
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
  flex-direction: row;
  flex-wrap: v-bind('wrapStyle');
  overflow-x: v-bind('hasScrollStyle');
  overflow-y: hidden;
  column-gap: v-bind('gapStyle');

  &.segmented--dragging {
    cursor: grabbing;
    user-select: none;

    .item,
    .item:hover,
    .item:active,
    .item.disabled {
      cursor: grabbing !important;
    }
  }

  .active-indicator {
    position: absolute;
    z-index: 0;
    transition: left 0.28s ease, top 0.28s ease, width 0.28s ease, height 0.28s ease, opacity 0.2s ease;
    pointer-events: none;
  }

  .item {
    flex: 1 1 auto;
    border: none;
    padding: v-bind('optionsPaddingStyle');
    transition: 0.2s;
    font-size: v-bind('fontSizeStyle');
    font-weight: v-bind('fontWeightStyle');
    text-align: center;

    &.has-selected-animation {
      position: relative;
      z-index: 1;
      transition: all 0.2s ease;

      &.active {
        background: none;
      }
    }

    &:hover {
      &:not(.active) {
        cursor: pointer;
      }
    }

    &.disabled {
      cursor: default !important;
      pointer-events: none;
      user-select: none;
      opacity: v-bind('optionsOpacityDisabledStyle') !important;

      &:hover {
        cursor: default !important;
      }
    }
  }

  // inicio propTheme
  &.component__theme--light {
    &.component__style--background {
      background: v-bind('lightBackground');
      color: v-bind('lightColor');

      .active-indicator {
        background: v-bind('lightBackgroundFocus');
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
      }

      .item {
        background: transparent;
        color: v-bind('lightColor');

        &:hover {
          &:not(.active) {
            background: v-bind('lightBackgroundFocus');
            color: v-bind('lightColorFocus');
          }
        }

        &.active {
          background: v-bind('lightBackgroundFocus');
          color: v-bind('lightColorFocus');
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
        }

        &.has-selected-animation.active {
          background: none;
          box-shadow: none;
        }
      }
    }
  }

  &.component__theme--dark {
    &.component__style--background {
      background: v-bind('darkBackground');
      color: v-bind('darkColor');

      .active-indicator {
        background: v-bind('darkBackgroundFocus');
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
      }

      .item {
        background: transparent;
        color: v-bind('darkColor');

        &:hover {
          &:not(.active) {
            background: rgba(255, 255, 255, 0.07);
            color: v-bind('darkColorFocus');
          }
        }

        &.active {
          background: v-bind('darkBackgroundFocus');
          color: v-bind('darkColorFocus');
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
        }

        &.has-selected-animation.active {
          background: none;
          box-shadow: none;
        }
      }
    }
  }
  // fim propTheme
}

.component-disabled {
	user-select: none;

	.component {
		--disabled-button-color: v-bind('styleButtonColor');
		border-radius: inherit;

    .item {
      opacity: v-bind('opacityDisabledStyle') !important;

      &:hover {
        cursor: default !important;
      }
    }
	}
}
</style>
