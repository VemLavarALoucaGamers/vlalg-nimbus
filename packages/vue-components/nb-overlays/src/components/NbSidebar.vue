<template>
	<div
		v-if="nbId && sideBarIsVisible && shouldBeVisible"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle, styleZIndex]"
    role="complementary"
    v-bind="computedAriaAttrs"
    @click.prevent="interacted"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component', themeStyle ]"
			:style="[componentStyle]"
		>
      <div
        :id="`${nbId}-overlay`"
        class="component__menu-overlay"
        :class="[
          {
            'component__menu-overlay--open': sideBarIsVisible
          },
          closeOnOverlayClickClass
        ]"
        :style="styleZIndexPlusOne"
        @click="overlayClick"
      ></div>

      <div
        :class="[
          'component__menu',
          sideBarIsVisible ? 'component__menu--open' : '',
          showInDesktop,
          showInTablet,
          showInMobile,
          sideBarPosition
        ]"
        :style="[styleContentPadding, styleWidth, styleZIndexPlusTwo]"
      >
        <div
          v-if="showCloseButton"
          class="component__menu-close-button"
          :style="closeButtonStyle"
          @click="triggerButton('close')"
        >
          <slot name="close-button">
            ✕
          </slot>
        </div>
        
        <div class="component__menu-content">
          <slot name="content">
            Content Section
          </slot>
        </div>

        <div
          v-if="sideBarIsVisible && showBottomSection"
          class="component__menu-bottom-section"
          :style="[bottomSectionStyle, styleSectionBorderColor]"
        >
          <slot name="bottom-section">
            Bottom Section
          </slot>
        </div>
      </div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, watch, provide, onMounted, onUnmounted } from 'vue'

defineOptions({
	name: 'NbSidebar',
	inheritAttrs: false
})

const emit = defineEmits(['close'])

onMounted(() => {
  // Inicializa a largura da janela
  windowWidth.value = window.innerWidth
  
  // Só mostra se o prop show for true E se deve estar visível no tamanho atual
  sideBarIsVisible.value = show.value && shouldBeVisible.value

  window.addEventListener('resize', resizeHandler)
})
onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('resize', resizeHandler)
})

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
  show: {
    type: Boolean,
    default: true // TODO: Change to false
  },
  ariaLabel: {
    type: String,
    default: 'Alternate Text Button'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
	theme: {
		type: String,
		default: 'light',
		validator: (value) => {
			const currentValue = value ? value.toLowerCase() : ''
			return ['light', 'dark'].includes(currentValue)
		}
	},
  position: {
    type: String,
    default: 'left',
    validator: value => {
      return typeof value === 'string' && ['left', 'right'].includes(value)
    }
  },
  backdropRGBColor: {
    type: Object,
    default: () => ({
      r: 0,
      g: 0,
      b: 0
    }),
    validator: value => {
      return typeof value === 'object' && value.r >= 0 && value.r <= 255 && value.g >= 0 && value.g <= 255 && value.b >= 0 && value.b <= 255
    }
  },
  backdropAlpha: {
    type: Number,
    default: 0.6
  },
  showBottomSection: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
	showSectionBorder: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
  showCloseButton: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  closeButtonY: {
    type: Number,
    default: 13
  },
  closeButtonX: {
    type: Number,
    default: 32
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  contentPadding: {
    type: String,
    default: '10px'
  },
  bottomSectionHeight: {
    type: Number,
    default: 63
  },
	disabled: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
  lightCloseButtonColor: {
		type: String,
		default: '#333333'
	},
  lightContentColor: {
		type: String,
		default: '#333333'
	},
  lightSectionColor: {
		type: String,
		default: '#333333'
	},
	lightBackgroundColor: {
		type: String,
		default: '#f5f5f5'
	},
  lightSectionBackground: {
    type: String,
    default: '#eae4e4'
  },
  lightSectionBorderColor: {
    type: String,
    default: '#cfc2c2'
  },
	darkCloseButtonColor: {
		type: String,
		default: '#e0e0e0'
	},
	darkContentColor: {
		type: String,
		default: '#333333'
	},
	darkSectionColor: {
		type: String,
		default: '#333333'
	},
	darkBackgroundColor: {
		type: String,
		default: '#2d2d2d'
  },
  darkSectionBackground: {
    type: String,
    default: '#2d2d2d'
  },
  darkSectionBorderColor: {
    type: String,
    default: '#eee'
  },
  visibleOnMobile: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  visibleOnTablet: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  visibleOnDesktop: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  scrollableBody: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  minWidthContentSize: {
    type: Number,
    default: 270
  },
  maxWidthContentSize: {
    type: Number,
    default: 320
  },
  mobileMinWidth: {
    type: Number,
    default: 0
  },
  mobileMaxWidth: {
    type: Number,
    default: 767
  },
  tabletMinWidth: {
    type: Number,
    default: 768
  },
  tabletMaxWidth: {
    type: Number,
    default: 1023
  },
  desktopMinWidth: {
    type: Number,
    default: 1024
  },
  desktopMaxWidth: {
    type: Number,
    default: 1600
  },
  zIndex: {
    type: Number,
    default: 2147483640
  }
})

const {
  show,
  ariaLabel,
  ariaAttrs,
  position,
  contentPadding,
  backdropRGBColor,
  backdropAlpha,
  showBottomSection,
  showSectionBorder,
  closeButtonY,
  closeButtonX,
  bottomSectionHeight,
  lightBackgroundColor,
  lightCloseButtonColor,
  lightContentColor,
  lightSectionColor,
  lightSectionBackground,
  lightSectionBorderColor,
  darkBackgroundColor,
  darkCloseButtonColor,
  darkContentColor,
  darkSectionColor,
  darkSectionBackground,
  darkSectionBorderColor,
  visibleOnMobile,
  visibleOnTablet,
  visibleOnDesktop,
  disabled,
  theme,
  scrollableBody,
  closeOnOverlayClick,
  minWidthContentSize,
  maxWidthContentSize,
  mobileMinWidth,
  mobileMaxWidth,
  tabletMinWidth,
  tabletMaxWidth,
  desktopMinWidth,
  desktopMaxWidth,
	zIndex
} = toRefs(props)

const sideBarIsVisible = ref(false)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
  const lightBackgroundColorValue = !lightBackgroundColor.value ? '#e2e8f0' : lightBackgroundColor.value
  const lightCloseButtonColorValue = !lightCloseButtonColor.value ? '#000000' : lightCloseButtonColor.value
  const lightContentColorValue = !lightContentColor.value ? '#333333' : lightContentColor.value
  const lightSectionColorValue = !lightSectionColor.value ? '#333333' : lightSectionColor.value
  const lightSectionBackgroundValue = !lightSectionBackground.value ? '#f5f5f5' : lightSectionBackground.value
  const lightSectionBorderColorValue = !lightSectionBorderColor.value ? '#eee' : lightSectionBorderColor.value
  const darkBackgroundColorValue = !darkBackgroundColor.value ? '#2d2d2d' : darkBackgroundColor.value
  const darkCloseButtonColorValue = !darkCloseButtonColor.value ? '#e0e0e0' : darkCloseButtonColor.value
  const darkContentColorValue = !darkContentColor.value ? '#e0e0e0' : darkContentColor.value
  const darkSectionColorValue = !darkSectionColor.value ? '#e0e0e0' : darkSectionColor.value
  const darkSectionBackgroundValue = !darkSectionBackground.value ? '#2d2d2d' : darkSectionBackground.value
  const darkSectionBorderColorValue = !darkSectionBorderColor.value ? '#eee' : darkSectionBorderColor.value
  const scrollableBodyValue = scrollableBody.value ? 'scroll' : 'auto'
  const contentPaddingValue = !contentPadding.value ? '10px' : contentPadding.value
  const backdropAlphaValue = ((backdropAlpha.value !== 0 && !backdropAlpha.value) || backdropAlpha.value < 0 || backdropAlpha.value > 1) ? 0.6 : backdropAlpha.value
  const minWidthContentSizeValue = ((minWidthContentSize.value !== 0 && !minWidthContentSize.value) || minWidthContentSize.value < 1) ? 270 : minWidthContentSize.value
  const maxWidthContentSizeValue = ((maxWidthContentSize.value !== 0 && !maxWidthContentSize.value) || maxWidthContentSize.value < 1) ? 320 : maxWidthContentSize.value
  const zIndexValue = ((zIndex.value !== 0 && !zIndex.value) || zIndex.value < 0 || zIndex.value > 2147483640) ? 2147483640 : zIndex.value

  // Validação completa do objeto backdropRGBColor
  const backdropRGBColorValue = !backdropRGBColor.value ||
    typeof backdropRGBColor.value !== 'object' ||
    backdropRGBColor.value === null ||
    Array.isArray(backdropRGBColor.value) ||
    !('r' in backdropRGBColor.value) ||
    !('g' in backdropRGBColor.value) ||
    !('b' in backdropRGBColor.value) ||
    (backdropRGBColor.value.r === undefined || backdropRGBColor.value.r === null || backdropRGBColor.value.r < 0 || backdropRGBColor.value.r > 255) ||
    (backdropRGBColor.value.g === undefined || backdropRGBColor.value.g === null || backdropRGBColor.value.g < 0 || backdropRGBColor.value.g > 255) ||
    (backdropRGBColor.value.b === undefined || backdropRGBColor.value.b === null || backdropRGBColor.value.b < 0 || backdropRGBColor.value.b > 255)
    ? { r: 0, g: 0, b: 0 } : backdropRGBColor.value
  
  return {
    disabled: disabledValue,
    lightBackgroundColor: lightBackgroundColorValue,
    lightCloseButtonColor: lightCloseButtonColorValue,
    lightContentColor: lightContentColorValue,
    lightSectionColor: lightSectionColorValue,
    lightSectionBackground: lightSectionBackgroundValue,
    lightSectionBorderColor: lightSectionBorderColorValue,
    darkBackgroundColor: darkBackgroundColorValue,
    darkCloseButtonColor: darkCloseButtonColorValue,
    darkContentColor: darkContentColorValue,
    darkSectionColor: darkSectionColorValue,
    darkSectionBackground: darkSectionBackgroundValue,
    darkSectionBorderColor: darkSectionBorderColorValue,
    scrollableBody: scrollableBodyValue,
    contentPadding: contentPaddingValue,
    backdropRGBColor: backdropRGBColorValue,
    backdropAlpha: backdropAlphaValue,
    minWidthContentSize: minWidthContentSizeValue,
    maxWidthContentSize: maxWidthContentSizeValue,
    zIndex: zIndexValue
  }
})
const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabled
})
const wrapperStyle = computed(() => {
	return {
		position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0'
	}
})
const componentStyle = computed(() => {
	return {}
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

const themeStyle = computed(() => {
	return theme.value === 'dark' ? 'component__theme--dark' : 'component__theme--light'
})

const styleBackgroundColor = computed(() => {
	const defaultValues = formatDefaultValues.value

  return theme.value === 'dark' ? defaultValues.darkBackgroundColor : defaultValues.lightBackgroundColor
})
const styleCloseButtonColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return theme.value === 'dark' ? defaultValues.darkCloseButtonColor : defaultValues.lightCloseButtonColor
})
const styleContentColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return theme.value === 'dark' ? defaultValues.darkContentColor : defaultValues.lightContentColor
})
const styleSectionBackground = computed(() => {
  const defaultValues = formatDefaultValues.value

  return theme.value === 'dark' ? defaultValues.darkSectionBackground : defaultValues.lightSectionBackground
})
const styleBottomSectionColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return theme.value === 'dark' ? defaultValues.darkSectionColor : defaultValues.lightSectionColor
})
const styleSectionBorderColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  if (!showBottomSection.value || (showBottomSection.value && !showSectionBorder.value)) return {}

  const borderColor = theme.value === 'dark' ? defaultValues.darkSectionBorderColor : defaultValues.lightSectionBorderColor

  return {
    borderTop: `1px solid ${borderColor}`
  }
})
const styleBackdropColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `rgba(${defaultValues.backdropRGBColor.r}, ${defaultValues.backdropRGBColor.g}, ${defaultValues.backdropRGBColor.b}, ${defaultValues.backdropAlpha})`
})
const sideBarPosition = computed(() => {
  return !position.value ? 'component__menu--left' : `component__menu--${position.value}`
})
const closeButtonStyle = computed(() => {
  return {
    top: `${closeButtonY.value}px`,
    right: `${closeButtonX.value}px`
  }
})
const bottomSectionStyle = computed(() => {
  return {
    minHeight: `${bottomSectionHeight.value}px`
  }
})
const styleContentPadding = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    padding: defaultValues.contentPadding
  }
})
// Helper para determinar qual breakpoint está ativo
const getCurrentBreakpoint = computed(() => {
  if (typeof window === 'undefined') return null
  
  const currentWidth = windowWidth.value || (typeof window !== 'undefined' ? window.innerWidth : 0)
  
  // Usa os valores das props diretamente
  const mobileMin = mobileMinWidth.value || 0
  const mobileMax = mobileMaxWidth.value || 767
  const tabletMin = tabletMinWidth.value || 768
  const tabletMax = tabletMaxWidth.value || 1023
  const desktopMin = desktopMinWidth.value || 1024
  const desktopMax = desktopMaxWidth.value || 1600
  
  // Verifica em ordem: mobile -> tablet -> desktop
  if (currentWidth >= mobileMin && currentWidth <= mobileMax) {
    return 'mobile'
  }
  if (currentWidth >= tabletMin && currentWidth <= tabletMax) {
    return 'tablet'
  }
  if (currentWidth >= desktopMin && currentWidth <= desktopMax) {
    return 'desktop'
  }
  // Se está abaixo do mobile mínimo, considera mobile
  if (currentWidth < mobileMin) {
    return 'mobile'
  }
  // Se está acima do desktop máximo, considera desktop
  if (currentWidth > desktopMax) {
    return 'desktop'
  }
  
  // Fallback: se não conseguir determinar, retorna null
  return null
})

const showInMobile = computed(() => {
  if (visibleOnMobile.value && getCurrentBreakpoint.value === 'mobile') return 'component__menu--visible-on-mobile'
  return ''
})
const showInTablet = computed(() => {
  if (visibleOnTablet.value && getCurrentBreakpoint.value === 'tablet') return 'component__menu--visible-on-tablet'
  return ''
})
const showInDesktop = computed(() => {
  if (visibleOnDesktop.value && getCurrentBreakpoint.value === 'desktop') return 'component__menu--visible-on-desktop'
  return ''
})

// Computed para verificar se o sidebar deve estar visível no tamanho atual
const shouldBeVisible = computed(() => {
  const breakpoint = getCurrentBreakpoint.value
  
  if (!breakpoint) return false
  
  switch (breakpoint) {
    case 'mobile':
      return visibleOnMobile.value
    case 'tablet':
      return visibleOnTablet.value
    case 'desktop':
      return visibleOnDesktop.value
    default:
      return false
  }
})

const styleWidth = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    minWidth: `${defaultValues.minWidthContentSize}px !important`,
    maxWidth: `${defaultValues.maxWidthContentSize}px !important`
  }
})
const closeOnOverlayClickClass = computed(() => {
  return closeOnOverlayClick.value ? 'component__menu-overlay--close-on-overlay-click' : ''
})
const styleZIndex = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    zIndex: `${defaultValues.zIndex} !important`
  }
})
const styleZIndexPlusOne = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    zIndex: `${defaultValues.zIndex + 1} !important`
  }
})
const styleZIndexPlusTwo = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    zIndex: `${defaultValues.zIndex + 2} !important`
  }
})

const resizeHandler = () => {
  // Atualiza a largura da janela para forçar reavaliação dos computed
  windowWidth.value = window.innerWidth
  
  // A lógica de abrir/fechar baseado em shouldBeVisible é tratada pelo watcher
  // Aqui apenas atualizamos a largura para forçar reavaliação
}

const triggerButton = (type = 'close') => {
  emit(type)
}

const overlayClick = () => {
  if (!closeOnOverlayClick.value) return

  triggerButton('close')
}

watch(sideBarIsVisible, (val) => {
  const defaultValues = formatDefaultValues.value

  const html = document.documentElement

  if (defaultValues.scrollableBody === 'scroll') {
    document.body.style.overflow = ''
    html.style.overflow = ''
  } else {
    if (val) {
      document.body.style.overflow = 'hidden'
      html.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      html.style.overflow = ''
    }
  }
}, { immediate: true })
watch(show, (val) => {
  // Só mostra se o prop show for true E se deve estar visível no tamanho atual
  sideBarIsVisible.value = val && shouldBeVisible.value
})

// Observa mudanças na visibilidade baseada no tamanho da tela
watch(shouldBeVisible, (val) => {
  // Se não deve estar visível no tamanho atual, fecha o sidebar
  if (!val && sideBarIsVisible.value) {
    sideBarIsVisible.value = false
  }
  // Se deve estar visível no tamanho atual E o prop show é true, abre o sidebar
  else if (val && !sideBarIsVisible.value && show.value) {
    sideBarIsVisible.value = true
  }
})

provide('showSidebar', sideBarIsVisible)
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

.nb-wrapper {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
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

	touch-action: manipulation;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	text-align: center;
	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;

  // Add new properties below
  .component__menu-overlay {
    position: fixed;
    inset: 0;
    background: v-bind('styleBackdropColor');
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;

    &.component__menu-overlay--close-on-overlay-click {
        &:hover {
        cursor: pointer;
      }
    }

    &.component__menu-overlay--open {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .component__menu {
    position: fixed;
    top: 0;
    width: 85%;
    height: 100%;
    background: v-bind('styleBackgroundColor');
    transition: left 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-size: inherit;

    &.component__menu--left {
      left: -100%;
    }

    &.component__menu--right {
      right: -100%;
    }

    &.component__menu--visible-on-tablet,
    &.component__menu--visible-on-desktop {
      width: 100% !important;
    }

    &.component__menu--open {
      &.component__menu--left {
        left: 0;
      }

      &.component__menu--right {
        right: 0;
      }
    }

    .component__menu-close-button {
      font-size: 16px;
      cursor: pointer;
      position: absolute;
      color: v-bind('styleCloseButtonColor');
    }

    .component__menu-content {
      list-style: none;
      padding: 0;
      flex: 1 1 auto;
      overflow-y: auto;
      overflow-x: hidden;
      color: v-bind('styleContentColor');
      text-align: left;
      white-space: normal;
    }

    .component__menu-bottom-section {
      background: v-bind('styleSectionBackground');
      color: v-bind('styleBottomSectionColor');
      flex-shrink: 0;
    }
  }
}
</style>
