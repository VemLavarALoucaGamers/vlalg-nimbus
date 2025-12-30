<template>
	<div
		v-if="nbId && sideBarIsVisible && shouldBeVisible"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle, styleZIndex]"
    role="dialog"
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
          closeOnOverlayClickClass,
          hasBackdropBlur ? 'has-blur' : '',
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
          showOverlayClickEffect ? 'component__menu--clicked' : ''
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
        
        <div :class="['component__menu-content', dropdownScrollClass]">
          <slot name="content" :closeModal="() => triggerButton('close')">
            Content Section
          </slot>
        </div>
      </div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, watch, provide, onMounted, onUnmounted } from 'vue'

defineOptions({
	name: 'NbModal',
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
  hasBackdropBlur: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  backdropBlur: {
    type: Number,
    default: 5
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
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  overlayClickEffect: {
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
	lightBackgroundColor: {
		type: String,
		default: '#f5f5f5'
	},
	darkCloseButtonColor: {
		type: String,
		default: '#e0e0e0'
	},
	darkContentColor: {
		type: String,
		default: '#333333'
	},
	darkBackgroundColor: {
		type: String,
		default: '#2d2d2d'
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
    default: 225
  },
  maxWidthContentSize: {
    type: Number,
    default: 800
  },
  minHeightContentSize: {
    type: Number,
    default: 100
  },
  maxHeightContentSize: {
    type: Number,
    default: 300
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
	fontFamily: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSize: {
		type: String,
		default: '1.6em',
		validator: value => {
			return !value ? '1.6em' : value
		}
	},
	fontWeight: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 400 : value
		}
	},
	dropdownScrollClass: {
		type: String,
		default: ''
	},
	borderRadius: {
		type: Number,
		default: 0
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
  contentPadding,
  backdropRGBColor,
  backdropAlpha,
  closeButtonY,
  closeButtonX,
  lightBackgroundColor,
  lightCloseButtonColor,
  lightContentColor,
  darkBackgroundColor,
  darkCloseButtonColor,
  darkContentColor,
  visibleOnMobile,
  visibleOnTablet,
  visibleOnDesktop,
  disabled,
  theme,
  scrollableBody,
  closeOnOverlayClick,
  minWidthContentSize,
  maxWidthContentSize,
  minHeightContentSize,
  maxHeightContentSize,
  mobileMinWidth,
  mobileMaxWidth,
  tabletMinWidth,
  tabletMaxWidth,
  desktopMinWidth,
  desktopMaxWidth,
  backdropBlur,
  hasBackdropBlur,
	fontFamily,
	fontSize,
	fontWeight,
	borderRadius,
	overlayClickEffect,
	zIndex
} = toRefs(props)

const sideBarIsVisible = ref(false)
const clickedOverlay = ref(false)
const clickedOverlayIntervalId = ref(null);
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
  const lightBackgroundColorValue = !lightBackgroundColor.value ? '#e2e8f0' : lightBackgroundColor.value
  const lightCloseButtonColorValue = !lightCloseButtonColor.value ? '#000000' : lightCloseButtonColor.value
  const lightContentColorValue = !lightContentColor.value ? '#333333' : lightContentColor.value
  const darkBackgroundColorValue = !darkBackgroundColor.value ? '#2d2d2d' : darkBackgroundColor.value
  const darkCloseButtonColorValue = !darkCloseButtonColor.value ? '#e0e0e0' : darkCloseButtonColor.value
  const darkContentColorValue = !darkContentColor.value ? '#e0e0e0' : darkContentColor.value
  const scrollableBodyValue = scrollableBody.value ? 'scroll' : 'auto'
  const contentPaddingValue = !contentPadding.value ? '10px' : contentPadding.value
  const backdropAlphaValue = ((backdropAlpha.value !== 0 && !backdropAlpha.value) || backdropAlpha.value < 0 || backdropAlpha.value > 1) ? 0.6 : backdropAlpha.value
  const minWidthContentSizeValue = ((minWidthContentSize.value !== 0 && !minWidthContentSize.value) || minWidthContentSize.value < 1) ? 270 : minWidthContentSize.value
  const maxWidthContentSizeValue = ((maxWidthContentSize.value !== 0 && !maxWidthContentSize.value) || maxWidthContentSize.value < 1) ? 320 : maxWidthContentSize.value
  const minHeightContentSizeValue = ((minHeightContentSize.value !== 0 && !minHeightContentSize.value) || minHeightContentSize.value < 1) ? 100 : minHeightContentSize.value
  const maxHeightContentSizeValue = ((maxHeightContentSize.value !== 0 && !maxHeightContentSize.value) || maxHeightContentSize.value < 1) ? 300 : maxHeightContentSize.value
  const backdropBlurValue = ((backdropBlur.value !== 0 && !backdropBlur.value) || backdropBlur.value < 0) ? 5 : backdropBlur.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
  const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 400 : fontWeight.value
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0 || borderRadius.value > 2) ? 0 : borderRadius.value
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
    darkBackgroundColor: darkBackgroundColorValue,
    darkCloseButtonColor: darkCloseButtonColorValue,
    darkContentColor: darkContentColorValue,
    scrollableBody: scrollableBodyValue,
    contentPadding: contentPaddingValue,
    backdropRGBColor: backdropRGBColorValue,
    backdropAlpha: backdropAlphaValue,
    minWidthContentSize: minWidthContentSizeValue,
    maxWidthContentSize: maxWidthContentSizeValue,
    minHeightContentSize: minHeightContentSizeValue,
    maxHeightContentSize: maxHeightContentSizeValue,
    backdropBlur: backdropBlurValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		borderRadius: borderRadiusValue,
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
  const defaultValues = formatDefaultValues.value

  return {
    font: defaultValues.font,
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
  }
})
const styleBorderRadius = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `${defaultValues.borderRadius}rem`
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
const styleBackdropColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `rgba(${defaultValues.backdropRGBColor.r}, ${defaultValues.backdropRGBColor.g}, ${defaultValues.backdropRGBColor.b}, ${defaultValues.backdropAlpha})`
})
const styleBackdropBlur = computed(() => {
  const defaultValues = formatDefaultValues.value

  return hasBackdropBlur.value ? `blur(${defaultValues.backdropBlur}px)` : 'none'
})
const closeButtonStyle = computed(() => {
  return {
    top: `${closeButtonY.value}px`,
    right: `${closeButtonX.value}px`
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
    maxWidth: `${defaultValues.maxWidthContentSize}px !important`,
    height: 'auto',
    minHeight: `${defaultValues.minHeightContentSize}px !important`,
    maxHeight: `${defaultValues.maxHeightContentSize}px !important`
  }
})
const closeOnOverlayClickClass = computed(() => {
  return closeOnOverlayClick.value ? 'component__menu-overlay--close-on-overlay-click' : ''
})
const showOverlayClickEffect = computed(() => {
  return overlayClickEffect.value && clickedOverlay.value
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
  zoomContent()

  if (!closeOnOverlayClick.value) return

  triggerButton('close')
}

const zoomContent = () => {
  clickedOverlay.value = true;
  
  if (clickedOverlayIntervalId.value) return;
  
  clickedOverlayIntervalId.value = setInterval(() => {
    clickedOverlay.value = false;
    clearInterval(clickedOverlayIntervalId.value);
    clickedOverlayIntervalId.value = null;
  }, 100);
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
  font-size: 62.5%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
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
	font-family: v-bind('formatDefaultValues.font');

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

    &.has-blur {
      background-color: inherit !important;
      -webkit-backdrop-filter: v-bind('styleBackdropBlur');
      backdrop-filter: v-bind('styleBackdropBlur');
    }
  }

  .component__menu {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    width: 90%;
    background: v-bind('styleBackgroundColor');
    transition: opacity 0.3s ease, transform 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.3s ease-out;
    border-radius: v-bind('styleBorderRadius');

    &.component__menu--visible-on-tablet,
    &.component__menu--visible-on-desktop {
      max-width: 600px;
    }

    &.component__menu--open {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, -50%) scale(1);
    }

    &.component__menu--clicked {
      transform: translate(-50%, -50%) scale(1.05);
    }

    .component__menu-close-button {
      font-size: 1.5rem;
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 10px;
      color: v-bind('styleCloseButtonColor');
      z-index: 1;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.2s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
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
  }
}
</style>
