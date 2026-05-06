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
      @contextmenu="handleRightClick"
      @copy="handleCopy"
      @paste="handlePaste"
      @cut="handleCut"
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
          <slot name="title" :title="title">{{ title }}</slot>
        </div>
        <div
          class="component__button-trailing"
          :style="titleIconWidthStyle"
          aria-hidden="true"
        >
          <slot name="title-icon" :is-active="isActive">{{ isActive ? '−' : '+' }}</slot>
        </div>
      </div>
      <div
        ref="contentRef"
        :class="[
          'component__content',
          componentType === 'normal' ? 'component__content--normal' : 'component__content--animation',
          { 'component__content--active': isActive }
        ]"
        :style="[displayContent]"
      >
        <slot name="content"></slot>
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
  'changed',
  'focused',
  'blurred',
  'outside-clicked',
  'resized',
  'right-clicked',
  'outside-right-clicked',
  'copied',
  'pasted',
  'cut'
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
	// Cores do tema dark

  

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


  ellipsisText: {
    type: Boolean,
    default: true,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
	scrollClass: {
		type: String,
		default: ''
	},
  componentType: {
    type: String,
    default: 'normal',
    validator: (value) => {
        return ['normal', 'animation'].includes(value)
    }
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
  blockRightClick,
  
	textAlign,
	activeTextStyle,

	blockClick,
	ellipsisText,
	scrollClass,
  componentType,
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
  const scrollClassValue = scrollClass.value !== '' ? scrollClass.value : ''
  const componentTypeValue = !componentType.value ? 'normal' : componentType.value

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

	return {
		disabled: disabledValue,
		display: displayValue,
		theme: themeValue,
    textAlign: textAlignValue,
    activeTextStyle: activeTextStyleValue,

    ellipsisText: ellipsisTextValue,
    scrollClass: scrollClassValue,
    componentType: componentTypeValue,

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
    textAlign: defaultValues.textAlign,
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

// handle tab index enter
const handleTabIndex = (tabIndex, type = 'enter') => {
  // check if disabled or has tab index enter is disabled
  if (blockClick.value || disabled.value || (type === 'enter' && !hasTabIndexEnter.value) || (type === 'space' && !hasTabIndexSpace.value)) return

  // get first enabled tab index
  console.log('tabIndex', tabIndex)

  clicked()
}

const changeActive = (value) => {
  isActive.value = value
}
const clicked = (event = null) => {
  if (blockClick.value || disabled.value) return

  const newValeu = !isActive.value

  changeActive(newValeu)

  changeContentHeight(event)

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
// evento para capturar o texto selecionado (copiar ou cortar)
const getSelectionFromTarget = (target) => {
  // se o target não existe, retorna uma string vazia
  if (!target) return ''

  // se o target não tem valor, retorna uma string vazia
  const hasValue = typeof target.value === 'string'

  // se o target não tem seleção, retorna uma string vazia
  const hasSelection = typeof target.selectionStart === 'number' && typeof target.selectionEnd === 'number'

  // se o target não tem valor ou seleção, retorna uma string vazia
  if (!hasValue || !hasSelection) return ''

  // retorna o texto selecionado
  return target.value.slice(target.selectionStart, target.selectionEnd)
}
// evento para montar o payload para o evento de copiar, colar ou cortar
const mountCPCPayload = (event, type) => {
  // se o evento não tem clipboard data, retorna uma string vazia
  const clipboardText = event.clipboardData?.getData('text/plain')
    || event.clipboardData?.getData('text')
    || ''

  // se o target não tem texto selecionado, retorna uma string vazia
  const selectedText = getSelectionFromTarget(event.target)
    || window.getSelection?.()?.toString?.()
    || ''

  // retorna o payload para o evento de copiar, colar ou cortar
  return {
    event,
    type,
    text: clipboardText || selectedText
  }
}
// evento para capturar evento de copiar
const handleCopy = (event) => {
  const body = mountCPCPayload(event, 'copy')
  emit('copied', body)
}
// evento para capturar evento de colar
const handlePaste = (event) => {
  const body = mountCPCPayload(event, 'paste')
  emit('pasted', body)
}
// evento para capturar evento de cortar
const handleCut = (event) => {
  const body = mountCPCPayload(event, 'cut')
  emit('cut', body)
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

// evento para capturar clique com botão direito dentro do componente
const handleRightClick = (event) => {
  // se o block right click está habilitado, não faz nada
  if (blockRightClick.value) {
    event.preventDefault()
  }

  emit('right-clicked', event)
}

// evento para capturar clique com botão direito fora do componente
const handleOutsideRightClick = (event) => {
  // se o clique é dentro do componente, não faz nada
  if (wrapperRef.value?.contains(event.target)) return

  // se não deve emitir o evento outside-right-clicked, não faz nada
  if (!shouldEmitOutsideClick.value) return

  // mudar o estado do componente para false
  // changeActive(false)

  // emitir o evento outside-right-clicked
  emit('outside-right-clicked', event)

  // resetar a flag para não emitir o evento outside-right-clicked novamente
  shouldEmitOutsideClick.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', markOutsideIntent, true)
  document.addEventListener('mousedown', markOutsideIntent, true)
  document.addEventListener('touchstart', markOutsideIntent, true)
  document.addEventListener('click', handleClickOutside, false)
  document.addEventListener('contextmenu', handleOutsideRightClick, false)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', markOutsideIntent, true)
  document.removeEventListener('mousedown', markOutsideIntent, true)
  document.removeEventListener('touchstart', markOutsideIntent, true)
  document.removeEventListener('click', handleClickOutside, false)
  document.removeEventListener('contextmenu', handleOutsideRightClick, false)
  window.removeEventListener('resize', handleResize)
})

/* New logic below */
const contentRef = ref(null)
const displayContent = computed(() => {
  const defaultValues = formatDefaultValues.value

  if (defaultValues.componentType === 'animation') return {};

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

const changeContentHeight = async (event) => {
  if (blockClick.value || disabled.value || !contentRef.value) return

  const defaultValues = formatDefaultValues.value

  event?.stopPropagation?.()

  if (defaultValues.componentType === 'animation') {
    if (isActive.value) {
      await nextTick()
      contentRef.value.style.maxHeight = `${contentRef.value.scrollHeight}px`
      return
    }

    contentRef.value.style.maxHeight = '0px'
  }
}
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

  text-align: v-bind('textAlignStyle');

	// user-select: none;

	// touch-action: manipulation;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;

  &.component--active {}
  
  // Component style start below:
  .component__button {
    background-color: #f1f7ff;
    color: #444;
    cursor: pointer;
    padding: v-bind('titlePaddingStyle');
    width: 100%;
    min-width: 0;
    border: none;
    text-align: left;
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

    &.component__button--active,
    &:hover {
      background-color: #dce9fb;
    }

    &.component__button--active {
      border-radius: v-bind('titleBorderRadiusActiveStyle');

      &~.component__content {
        background-color: rgb(115, 115, 233);
        border-style: solid;
        border-color: #f1f1f1;
        border-left-width: 1px;
        border-right-width: 1px;
        border-top-width: 0px;
        border-bottom-width: 1px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }

    &.component__button--deactivate {
      &~.component__content {
        border: 0;
      }
    }
  }

  .component__content {
    padding: v-bind('contentPaddingStyle');
    overflow: hidden;
    display: none;
    background-color: rgb(239, 13, 13);
    font-family: v-bind('contentFontFamilyStyle');
    font-size: v-bind('contentFontSizeStyle');
    font-weight: v-bind('contentFontWeightStyle');
    border-radius: v-bind('contentBorderRadiusActiveStyle');

    &.component__content--animation {
      display: block;
      padding: 0;
      max-height: 0;
      opacity: 0;
      transition: max-height 0.25s ease, opacity 0.2s ease;
      will-change: max-height, opacity;

      &.component__content--active {
        padding: v-bind('contentPaddingStyle');
        opacity: 1;
      }
    }
    &.component__content--normal {
      display: none;
    }
  }

  // inicio propTheme
  &.component__theme--light {
    &.component__input--background {}

    &.component__input--line {}

    &.component__input--border {}
  }

  &.component__theme--dark {
    &.component__input--background {}

    &.component__input--line {}

    &.component__input--border {}
  }
  // fim propTheme

  // inicio inputStyle
  &.component__input--background {
    // Mantém o comportamento padrão com background
  }

  &.component__input--line {}

  &.component__input--border {}
  // fim inputStyle

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
