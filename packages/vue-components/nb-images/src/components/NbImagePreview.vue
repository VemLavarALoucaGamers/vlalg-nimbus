<!--
  TODO: Adicionar o tabIndex e o disable (testar tbm)
-->
<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
    v-bind="computedAriaAttrs"
	>
		<div
			:id="nbId"
      class="nb-reset component"
			:style="[componentStyle]"
		>
      <div class="component__gallery">
        <div class="component__gallery-preview" :style="styleMainImage">
          <div
            v-if="hasZoom"
            class="component__gallery-preview-zoom-button"
            :style="styleZoomButton"
            @click="previewImage(currentImage.url)"
          >{{ zoomButtonIcon }}</div>
          <img
            v-if="currentImage"
            :src="currentImage.url"
            :alt="currentImage.alt || 'Main image'"
            class="component__gallery-preview-image"
          />
        </div>

        <div class="component__gallery-thumbnails-wrapper">
          <button
            aria-label="Previous image"
            :aria-disabled="isLeftArrowDisabled"
            class="component__thumbnails-arrow component__thumbnails-arrow--left"
            :class="{ 'component__thumbnails-arrow--disabled': isLeftArrowDisabled }"
            :style="styleZIndex"
            :disabled="isLeftArrowDisabled"
            @click="scrollThumbnails('left')"
          >
            ‹
          </button>
          
          <div
            ref="thumbnailsContainer"
            class="component__thumbnails"
            @scroll="handleScroll"
          >
            <div
              v-for="(image, index) in images"
              :key="index"
              :class="[
                'component__thumbnail',
                { 'component__thumbnail--active': selectedIndex === index }
              ]"
              :style="thumbnailStyle"
              @click="selectImage(index)"
            >
              <div class="component__thumbnail-inner">
                <img
                  :src="image.url"
                  :alt="image.alt || `Thumbnail ${index + 1}`"
                  class="component__thumbnail-inner-image"
                />
              </div>
            </div>
          </div>

          <button
            aria-label="Next image"
            :aria-disabled="isRightArrowDisabled"
            class="component__thumbnails-arrow component__thumbnails-arrow--right"
            :class="{ 'component__thumbnails-arrow--disabled': isRightArrowDisabled }"
            :style="styleZIndex"
            :disabled="isRightArrowDisabled"
            @click="scrollThumbnails('right')"
          >
            ›
          </button>
        </div>
      </div>

      <div
        v-if="selectedImg"
        :class="['component__modal', { 'has-blur': hasBackdropBlur }]"
        :style="[styleZIndexPlusOne]"
        @click.self="closeImage"
      >
        <div
          class="component__modal-controls"
          :style="styleZIndexPlusTwo"
        >
          <slot
            name="preview-controls"
            :previewRotateLeft="() => rotateImage('left')"
            :previewRotateRight="() => rotateImage('right')"
            :previewZoomIn="() => zoomImage('in')"
            :previewZoomOut="() => zoomImage('out')"
            :previewClose="() => closeImage()"
            :previewFirst="() => selectPreviewImage(0)"
            :previewPrevious="() => selectPreviewImage(selectedIndex - 1)"
            :previewNext="() => selectPreviewImage(selectedIndex + 1)"
            :previewLast="() => selectPreviewImage(images.length - 1)"
            :previewInfos="{ currentIndex: selectedIndex + 1, totalImages: images.length }"
          >
            <div class="component__modal-controls-buttons">
              <button
                aria-label="Rotate image left"
                class="component__modal-controls-buttons-button"
                @click.stop="rotateImage('left')"
              >
                <slot name="preview-rotate-left-icon" :previewRotateLeft="() => rotateImage('left')"> ↺ </slot>
              </button>
              <button
                aria-label="Rotate image right"
                class="component__modal-controls-buttons-button"
                @click.stop="rotateImage('right')"
              >
                <slot name="preview-rotate-right-icon" :previewRotateRight="() => rotateImage('right')"> ↻ </slot>
              </button>
              <button
                aria-label="Zoom image in"
                class="component__modal-controls-buttons-button"
                @click.stop="zoomImage('in')"
              >
                <slot name="preview-zoom-in-icon" :previewZoomIn="() => zoomImage('in')"> + </slot>
              </button>
              <button
                aria-label="Zoom image out"
                class="component__modal-controls-buttons-button"
                @click.stop="zoomImage('out')"
              >
                <slot name="preview-zoom-out-icon" :previewZoomOut="() => zoomImage('out')"> - </slot>
              </button>
              <button
                aria-label="Close image"
                class="component__modal-controls-buttons-button"
                @click.stop="closeImage"
              >
                <slot name="preview-close-icon" :previewClose="() => closeImage()">x</slot>
              </button>
            </div>
            <div class="component__modal-controls-buttons">
              <button
                aria-label="First image"
                class="component__modal-controls-buttons-button"
                :disabled="selectedIndex === 0"
                @click.stop="selectPreviewImage(0)"
              >
                <slot name="preview-first-icon"><<</slot>
              </button>
              <button
                aria-label="Previous image"
                class="component__modal-controls-buttons-button"
                :disabled="selectedIndex === 0"
                @click.stop="selectPreviewImage(selectedIndex - 1)"
              >
                <slot name="preview-previous-icon">‹</slot>
              </button>
              <span aria-label="Current image information">
                <slot name="preview-infos">{{ selectedIndex + 1 }} / {{ images.length }}</slot>
              </span>
              <button
                aria-label="Next image"
                class="component__modal-controls-buttons-button"
                :disabled="selectedIndex === images.length - 1"
                @click.stop="selectPreviewImage(selectedIndex + 1)"
              >
                <slot name="preview-next-icon">></slot>
              </button>
              <button
                aria-label="Last image"
                class="component__modal-controls-buttons-button"
                :disabled="selectedIndex === images.length - 1"
                @click.stop="selectPreviewImage(images.length - 1)"
              >
                <slot name="preview-last-icon">>></slot>
              </button>
            </div>
          </slot>
        </div>
        <img 
          :src="selectedImg" 
          alt="Image preview"
          class="component__modal-image"
          :style="imageTransformStyle"
          @click.stop
        />
      </div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

defineOptions({
	name: 'NbImageGallery',
	inheritAttrs: false
})

onMounted(() => {
  // Seleciona a imagem inicial baseada na prop initialImageIndex
  if (images.value && images.value.length > 0) {
    // Valida se o índice inicial está dentro do range válido
    const maxIndex = images.value.length - 1
    const initialIndex = Math.max(0, Math.min(initialImageIndex.value, maxIndex))
    selectedIndex.value = initialIndex
    
    // Scroll para a imagem inicial após montar
    nextTick(() => {
      scrollToThumbnail(initialIndex)
    })
  }
  
  // Atualiza visibilidade das setas após montar
  nextTick(() => {
    updateArrowVisibility()
  })
  
  // Adiciona listener de resize com throttle
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  // Remove listener de resize
  window.removeEventListener('resize', handleResize)
  
  // Limpa timeouts pendentes
  if (scrollTimeout) {
    cancelAnimationFrame(scrollTimeout)
  }
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }
})

const emit = defineEmits(['clicked', 'image-changed'])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	ariaLabel: {
    type: String,
    default: 'Image Gallery'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
  imageBackground: {
    type: String,
    default: 'transparent'
  },
  hasThumbnailBorder: {
    type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	thumbnailBorderColor: {
		type: String,
		default: '#ffe54c'
	},
	thumbnailBorderWidth: {
		type: Number,
		default: 1
	},
	thumbnailGap: {
		type: Number,
		default: 8
	},
	thumbnailSize: {
		type: Number,
		default: 80
  },
  thumbnailButtonBgColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.5)'
  },
  thumbnailButtonBgColorHover: {
    type: String,
    default: 'rgba(0, 0, 0, 0.7)'
  },
  thumbnailButtonBgColorActive: {
    type: String,
    default: 'rgba(0, 0, 0, 0.9)'
  },
  thumbnailButtonTextColor: {
    type: String,
    default: '#ffffff'
  },
  thumbnailButtonBorderRadius: {
    type: Number,
    default: 0
  },
	borderRadius: {
		type: Number,
		default: 0
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
		default: '1.6em',
		validator: value => {
			return !value ? '1.6em' : value
		}
	},
	fontWeight: {
		type: Number,
		default: 200,
		validator: value => {
			return !value ? 200 : value
		}
  },
  images: {
    type: Array,
    default: () => [],
    validator: value => {
      return Array.isArray(value) && value.every(img => img && img.url)
    }
  },
  initialImageIndex: {
    type: Number,
    default: 0,
    validator: value => {
      return typeof value === 'number' && value >= 0
    }
  },
  maxWidth: {
    type: String,
    default: 'auto'
  },
  hasZoom: {
    type: Boolean,
    default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
  },
  zoomButtonType: {
    type: String,
    default: 'eye',
    validator: value => {
      return ['eye', 'zoom'].includes(value)
    }
  },
  zoomButtonColor: {
    type: String,
    default: '#ffffff'
  },
  zoomButtonBgType: {
    type: String,
    default: 'solid',
    validator: value => {
      return ['solid', 'blur'].includes(value)
    }
  },
  zoomButtonBgColor: {
    type: String,
    default: '#151515'
  },
  zoomButtonSize: {
		type: String,
		default: '2em',
		validator: value => {
			return !value ? '2em' : value
		}
	},
  zoomButtonOpacity: {
    type: Number,
    default: 0.8,
    validator: value => {
      return typeof value === 'number' && value >= 0 && value <= 1
    }
  },
  zoomButtonBgBlur: {
    type: Number,
    default: 4,
    validator: value => {
      return typeof value === 'number' && value > 0
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
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  backdropBlur: {
    type: Number,
    default: 5
  },
  controlsBgColor: {
    type: String,
    default: 'cyan' // tomato
  },
  controlsTextColor: {
    type: String,
    default: 'yellow' // white
  },
  controlsTextColorHover: {
    type: String,
    default: 'brown' // white
  },
  controlsBorderRadius: {
    type: Number,
    default: 20
  },
  controlsPaddingX: {
    type: Number,
    default: 4
  },
  controlsPaddingY: {
    type: Number,
    default: 4
  },
  controlsGap: {
    type: Number,
    default: 5
  },
  controlsFontSize: {
    type: String,
    default: '1.6em'
  },
  controlsFontWeight: {
    type: Number,
    default: 100
  },
  zIndex: {
    type: Number,
    default: 2147483640
  }
})

const {
  ariaLabel,
  ariaAttrs,
  imageBackground,
  hasThumbnailBorder,
	thumbnailBorderColor,
	thumbnailBorderWidth,
	thumbnailGap,
	thumbnailSize,
	thumbnailButtonBgColor,
	thumbnailButtonBgColorHover,
	thumbnailButtonBgColorActive,
	thumbnailButtonTextColor,
	thumbnailButtonBorderRadius,
	borderRadius,
	disabled,
	fontFamily,
	fontSize,
  fontWeight,
  images,
  initialImageIndex,
  maxWidth,
  hasZoom,
  zoomButtonType,
  zoomButtonColor,
  zoomButtonBgColor,
  zoomButtonSize,
  zoomButtonOpacity,
  zoomButtonBgType,
  zoomButtonBgBlur,
  backdropRGBColor,
  backdropAlpha,
  hasBackdropBlur,
  backdropBlur,
  controlsBgColor,
  controlsTextColor,
  controlsTextColorHover,
  controlsBorderRadius,
  controlsPaddingX,
  controlsPaddingY,
  controlsGap,
  controlsFontSize,
  controlsFontWeight,
  zIndex
} = toRefs(props)

const selectedIndex = ref(0)
const selectedImg = ref(null)
const thumbnailsContainer = ref(null)
const imageRotation = ref(0)
const imageZoom = ref(1)
const isLeftArrowDisabled = ref(false)
const isRightArrowDisabled = ref(false)

// Throttle para otimizar performance
let scrollTimeout = null
let resizeTimeout = null

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
  const displayValue = 'inline-block'
  const imageBackgroundValue = !imageBackground.value || imageBackground.value === 'transparent' ? 'transparent' : imageBackground.value
  const thumbnailBorderColorValue = !thumbnailBorderColor.value ? '#ffe54c' : thumbnailBorderColor.value
	const thumbnailBorderWidthValue = ((thumbnailBorderWidth.value !== 0 && !thumbnailBorderWidth.value) || thumbnailBorderWidth.value < 0) ? 2 : thumbnailBorderWidth.value
	const thumbnailGapValue = ((thumbnailGap.value !== 0 && !thumbnailGap.value) || thumbnailGap.value < 0) ? 8 : thumbnailGap.value
	const thumbnailSizeValue = ((thumbnailSize.value !== 0 && !thumbnailSize.value) || thumbnailSize.value < 1) ? 80 : thumbnailSize.value
	const thumbnailButtonBgColorValue = !thumbnailButtonBgColor.value || thumbnailButtonBgColor.value === 'rgba(0, 0, 0, 0.5)' ? 'rgba(0, 0, 0, 0.5)' : thumbnailButtonBgColor.value
	const thumbnailButtonBgColorHoverValue = !thumbnailButtonBgColorHover.value || thumbnailButtonBgColorHover.value === 'rgba(0, 0, 0, 0.7)' ? 'rgba(0, 0, 0, 0.7)' : thumbnailButtonBgColorHover.value
	const thumbnailButtonBgColorActiveValue = !thumbnailButtonBgColorActive.value || thumbnailButtonBgColorActive.value === 'rgba(0, 0, 0, 0.9)' ? 'rgba(0, 0, 0, 0.9)' : thumbnailButtonBgColorActive.value
	const thumbnailButtonTextColorValue = !thumbnailButtonTextColor.value || thumbnailButtonTextColor.value === 'tomato' ? 'tomato' : thumbnailButtonTextColor.value
	const thumbnailButtonBorderRadiusValue = ((thumbnailButtonBorderRadius.value !== 0 && !thumbnailButtonBorderRadius.value) || thumbnailButtonBorderRadius.value < 0) ? 0 : thumbnailButtonBorderRadius.value
  const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
  const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 200 : fontWeight.value
  const maxWidthValue = !maxWidth.value || maxWidth.value === 'auto' ? 'auto' : maxWidth.value
  const zoomButtonTypeValue = !zoomButtonType.value || zoomButtonType.value === 'eye' ? 'eye' : zoomButtonType.value
  const zoomButtonColorValue = !zoomButtonColor.value || zoomButtonColor.value === '#ffffff' ? '#ffffff' : zoomButtonColor.value
  const zoomButtonBgColorValue = !zoomButtonBgColor.value || zoomButtonBgColor.value === '#151515' ? '#151515' : zoomButtonBgColor.value
  const zoomButtonSizeValue = !zoomButtonSize.value || zoomButtonSize.value === '2em' ? '2em' : zoomButtonSize.value
  const zoomButtonOpacityValue = ((zoomButtonOpacity.value !== 0 && !zoomButtonOpacity.value) || zoomButtonOpacity.value < 0 || zoomButtonOpacity.value > 1) ? 0.8 : zoomButtonOpacity.value
  const zoomButtonBgTypeValue = !zoomButtonBgType.value || zoomButtonBgType.value === 'solid' ? 'solid' : zoomButtonBgType.value
  const zoomButtonBgBlurValue = ((zoomButtonBgBlur.value !== 0 && !zoomButtonBgBlur.value) || zoomButtonBgBlur.value < 0) ? 4 : zoomButtonBgBlur.value
  const backdropAlphaValue = ((backdropAlpha.value !== 0 && !backdropAlpha.value) || backdropAlpha.value < 0 || backdropAlpha.value > 1) ? 0.6 : backdropAlpha.value
  const zIndexValue = ((zIndex.value !== 0 && !zIndex.value) || zIndex.value < 0 || zIndex.value > 2147483640) ? 2147483640 : zIndex.value
  const backdropBlurValue = ((backdropBlur.value !== 0 && !backdropBlur.value) || backdropBlur.value < 0) ? 5 : backdropBlur.value

  const controlsBgColorValue = !controlsBgColor.value || controlsBgColor.value === 'cyan' ? 'cyan' : controlsBgColor.value
  const controlsTextColorValue = !controlsTextColor.value || controlsTextColor.value === 'magenta' ? 'magenta' : controlsTextColor.value
  const controlsTextColorHoverValue = !controlsTextColorHover.value || controlsTextColorHover.value === 'brown' ? 'brown' : controlsTextColorHover.value
  const controlsBorderRadiusValue = ((controlsBorderRadius.value !== 0 && !controlsBorderRadius.value) || controlsBorderRadius.value < 0) ? 20 : controlsBorderRadius.value
  const controlsPaddingXValue = ((controlsPaddingX.value !== 0 && !controlsPaddingX.value) || controlsPaddingX.value < 0) ? 4 : controlsPaddingX.value
  const controlsPaddingYValue = ((controlsPaddingY.value !== 0 && !controlsPaddingY.value) || controlsPaddingY.value < 0) ? 4 : controlsPaddingY.value
  const controlsGapValue = ((controlsGap.value !== 0 && !controlsGap.value) || controlsGap.value < 0) ? 5 : controlsGap.value
  const controlsFontSizeValue = !controlsFontSize.value || controlsFontSize.value === '1.6em' ? '1.6em' : controlsFontSize.value
  const controlsFontWeightValue = ((controlsFontWeight.value !== 0 && !controlsFontWeight.value) || controlsFontWeight.value < 0) ? 800 : controlsFontWeight.value

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
		display: displayValue,
		imageBackground: imageBackgroundValue,
		thumbnailBorderColor: thumbnailBorderColorValue,
		thumbnailBorderWidth: thumbnailBorderWidthValue,
		thumbnailGap: thumbnailGapValue,
		thumbnailSize: thumbnailSizeValue,
		thumbnailButtonBgColor: thumbnailButtonBgColorValue,
		thumbnailButtonBgColorHover: thumbnailButtonBgColorHoverValue,
		thumbnailButtonBgColorActive: thumbnailButtonBgColorActiveValue,
		thumbnailButtonTextColor: thumbnailButtonTextColorValue,
		thumbnailButtonBorderRadius: thumbnailButtonBorderRadiusValue,
		borderRadius: borderRadiusValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
    maxWidth: maxWidthValue,
    zoomButtonType: zoomButtonTypeValue,
    zoomButtonColor: zoomButtonColorValue,
    zoomButtonBgColor: zoomButtonBgColorValue,
    zoomButtonSize: zoomButtonSizeValue,
    zoomButtonOpacity: zoomButtonOpacityValue,
    zoomButtonBgType: zoomButtonBgTypeValue,
    zoomButtonBgBlur: zoomButtonBgBlurValue,
    backdropRGBColor: backdropRGBColorValue,
    backdropAlpha: backdropAlphaValue,
    backdropBlur: backdropBlurValue,
		zIndex: zIndexValue,
		controlsBgColor: controlsBgColorValue,
    controlsTextColor: controlsTextColorValue,
    controlsTextColorHover: controlsTextColorHoverValue,
		controlsBorderRadius: controlsBorderRadiusValue,
		controlsPaddingX: controlsPaddingXValue,
		controlsPaddingY: controlsPaddingYValue,
		controlsGap: controlsGapValue,
		controlsFontSize: controlsFontSizeValue,
		controlsFontWeight: controlsFontWeightValue
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
		maxWidth: defaultValues.maxWidth
	}
})
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		borderRadius: `${defaultValues.borderRadius}rem`,
		lineHeight: '1.42857143',
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
	}
})

const currentImage = computed(() => {
	if (!images.value || images.value.length === 0) return null
	return images.value[selectedIndex.value] || images.value[0]
})

const thumbnailStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	
	return {
		width: `${defaultValues.thumbnailSize}px`,
		height: `${defaultValues.thumbnailSize}px`,
		marginBottom: `${defaultValues.thumbnailGap}px`,
		borderRadius: `${defaultValues.borderRadius}rem`
	}
})

const styleImageBackground = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.imageBackground
})
const styleThumbnailBorderColor = computed(() => {
	const defaultValues = formatDefaultValues.value
	return hasThumbnailBorder.value ? defaultValues.thumbnailBorderColor : 'none'
})

const styleThumbnailBorderWidth = computed(() => {
	const defaultValues = formatDefaultValues.value
	return hasThumbnailBorder.value ? `${defaultValues.thumbnailBorderWidth}px` : '0px'
})

const styleThumbnailButtonBgColor = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.thumbnailButtonBgColor
})

const styleThumbnailButtonBgColorHover = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.thumbnailButtonBgColorHover
})

const styleThumbnailButtonBgColorActive = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.thumbnailButtonBgColorActive
})

const styleThumbnailButtonTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.thumbnailButtonTextColor
})

const styleThumbnailBorderRadius = computed(() => {
	const defaultValues = formatDefaultValues.value
	return `${defaultValues.thumbnailButtonBorderRadius}rem`
})

const styleThumbnailGap = computed(() => {
	const defaultValues = formatDefaultValues.value
	return `${defaultValues.thumbnailGap}px`
})

const styleBackdropColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `rgba(${defaultValues.backdropRGBColor.r}, ${defaultValues.backdropRGBColor.g}, ${defaultValues.backdropRGBColor.b}, ${defaultValues.backdropAlpha})`
})
const styleBackdropBlur = computed(() => {
  const defaultValues = formatDefaultValues.value

  return hasBackdropBlur.value ? `blur(${defaultValues.backdropBlur}px)` : 'none'
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

const styleControlsBgColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.controlsBgColor
})

const styleControlsTextColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.controlsTextColor
})

const styleControlsTextColorHover = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.controlsTextColorHover
})

const styleBorderRadius = computed(() => {
	const defaultValues = formatDefaultValues.value
	return `${defaultValues.borderRadius}rem`
})

const styleControlsBorderRadius = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `${defaultValues.controlsBorderRadius}px`
})
const styleControlsPadding = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `${defaultValues.controlsPaddingX}px ${defaultValues.controlsPaddingY}px`
})
const styleControlsGap = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `${defaultValues.controlsGap}px`
})
const styleControlsFontSize = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `${defaultValues.controlsFontSize}em !important`
})
const styleControlsFontWeight = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.controlsFontWeight
})

const styleMainImage = computed(() => {
	const defaultValues = formatDefaultValues.value
	
	return {
		borderRadius: `${defaultValues.borderRadius}rem`
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

const zoomButtonIcon = computed(() => {
  const defaultValues = formatDefaultValues.value

	return defaultValues.zoomButtonType === 'eye' ? '👁' : '⛶'
})

const styleZoomButton = computed(() => {
  const defaultValues = formatDefaultValues.value

  let bgConfig = {}

  if (defaultValues.zoomButtonBgType === 'solid') {
    bgConfig.backgroundColor = defaultValues.zoomButtonBgColor
  } else if (defaultValues.zoomButtonBgType === 'blur') {
    bgConfig.backgroundColor = 'transparent'
    bgConfig.backdropFilter = `blur(${defaultValues.zoomButtonBgBlur}px)`
    bgConfig.webkitBackdropFilter = `blur(${defaultValues.zoomButtonBgBlur}px)`
  }

	return {
		color: defaultValues.zoomButtonColor,
		...bgConfig,
		fontSize: defaultValues.zoomButtonSize,
	}
})

const styleZoomButtonOpacity = computed(() => {
  const defaultValues = formatDefaultValues.value
  return defaultValues.zoomButtonOpacity
})

const imageTransformStyle = computed(() => {
	return {
		transform: `rotate(${imageRotation.value}deg) scale(${imageZoom.value})`,
		transition: 'transform 0.3s ease'
	}
})

const previewImage = (img) => {
	// Encontra o índice da imagem baseado na URL
	const imageIndex = images.value.findIndex(image => image.url === img)
	if (imageIndex !== -1) {
		selectedIndex.value = imageIndex
	}
	
	selectedImg.value = img
	// Reset transformações ao abrir nova imagem
  resetImageTransform()

  const html = document.documentElement
  if (img) {
    document.body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    html.style.overflow = ''
  }
}

const selectImage = (index) => {
	if (disabled.value) return
	
	selectedIndex.value = index
	emit('clicked', { index, image: images.value[index] })
	emit('image-changed', { index, image: images.value[index] })
	
	// Scroll para a thumbnail selecionada
	scrollToThumbnail(index)
}

const scrollThumbnails = (direction) => {
	if (!thumbnailsContainer.value) return
	
	// Previne scroll se a seta estiver desabilitada
	if (direction === 'left' && isLeftArrowDisabled.value) return
	if (direction === 'right' && isRightArrowDisabled.value) return
	
	const container = thumbnailsContainer.value
	const defaultValues = formatDefaultValues.value
	// Scroll exatamente o tamanho de uma thumbnail + gap
	const scrollAmount = defaultValues.thumbnailSize + defaultValues.thumbnailGap
	const currentScroll = container.scrollLeft
	
	if (direction === 'left') {
		container.scrollTo({
			left: currentScroll - scrollAmount,
			behavior: 'smooth'
		})
	} else {
		container.scrollTo({
			left: currentScroll + scrollAmount,
			behavior: 'smooth'
		})
	}
}

const scrollToThumbnail = (index) => {
	if (!thumbnailsContainer.value) return
	
	nextTick(() => {
		const container = thumbnailsContainer.value
		const thumbnails = container.querySelectorAll('.component__thumbnail')
		
		if (thumbnails[index]) {
			const thumbnail = thumbnails[index]
			const containerRect = container.getBoundingClientRect()
			const thumbnailRect = thumbnail.getBoundingClientRect()
			
			// Calcula a posição para centralizar a thumbnail
			const scrollLeft = thumbnail.offsetLeft - (container.clientWidth / 2) + (thumbnailRect.width / 2)
			
			container.scrollTo({
				left: scrollLeft,
				behavior: 'smooth'
			})
		}
	})
}

const rotateImage = (direction) => {
	if (!selectedImg.value) return
	
	if (direction === 'left') {
		imageRotation.value -= 90
	} else if (direction === 'right') {
		imageRotation.value += 90
	}
}

const zoomImage = (direction) => {
	if (!selectedImg.value) return
	
	if (direction === 'in') {
		imageZoom.value = Math.min(imageZoom.value + 0.25, 5) // Máximo 5x
	} else if (direction === 'out') {
		imageZoom.value = Math.max(imageZoom.value - 0.25, 0.5) // Mínimo 0.5x
	}
}

const resetImageTransform = () => {
	imageRotation.value = 0
	imageZoom.value = 1
}

const closeImage = () => {
	selectedImg.value = null
  resetImageTransform()

  const html = document.documentElement
  document.body.style.overflow = ''
  html.style.overflow = ''
}

const selectPreviewImage = (index) => {
	if (!images.value || images.value.length === 0) return
	
	// Valida se o índice está dentro do range válido
	const maxIndex = images.value.length - 1
	const validIndex = Math.max(0, Math.min(index, maxIndex))
	
	// Atualiza o índice selecionado e a imagem no preview
	if (images.value[validIndex] && images.value[validIndex].url) {
		selectedIndex.value = validIndex
		selectedImg.value = images.value[validIndex].url
		// Reset transformações ao mudar de imagem
		resetImageTransform()
		// Scroll para a thumbnail correspondente
		scrollToThumbnail(validIndex)
	}
}

// Função para atualizar estado das setas (desabilitar quando necessário)
const updateArrowVisibility = () => {
	if (!thumbnailsContainer.value) {
		isLeftArrowDisabled.value = true
		isRightArrowDisabled.value = true
		return
	}
	
	const container = thumbnailsContainer.value
	const { scrollLeft, scrollWidth, clientWidth } = container
	
	// Desabilita seta esquerda quando está no começo
	isLeftArrowDisabled.value = scrollLeft <= 0
	
	// Desabilita seta direita quando está no final
	// Usa -1 para evitar problemas de arredondamento
	isRightArrowDisabled.value = scrollLeft >= scrollWidth - clientWidth - 1
}

// Handler otimizado para scroll com throttle
const handleScroll = () => {
	if (scrollTimeout) {
		cancelAnimationFrame(scrollTimeout)
	}
	
	scrollTimeout = requestAnimationFrame(() => {
		updateArrowVisibility()
		scrollTimeout = null
	})
}

// Handler otimizado para resize com throttle
const handleResize = () => {
	if (resizeTimeout) {
		clearTimeout(resizeTimeout)
	}
	
	resizeTimeout = setTimeout(() => {
		updateArrowVisibility()
		resizeTimeout = null
	}, 150) // Throttle de 150ms
}

// Observa mudanças no initialImageIndex para atualizar a imagem selecionada
watch(() => initialImageIndex.value, (newIndex) => {
  if (images.value && images.value.length > 0) {
    // Valida se o índice está dentro do range válido
    const maxIndex = images.value.length - 1
    const validIndex = Math.max(0, Math.min(newIndex, maxIndex))
    
    if (selectedIndex.value !== validIndex) {
      selectedIndex.value = validIndex
      
      // Scroll para a thumbnail selecionada
      nextTick(() => {
        scrollToThumbnail(validIndex)
        updateArrowVisibility()
      })
    }
  }
})

// Observa mudanças nas imagens para atualizar setas e validar índice selecionado
watch(() => images.value?.length, (newLength, oldLength) => {
  // Só atualiza se o tamanho do array mudou (mais eficiente que deep watch)
  if (newLength && newLength > 0) {
    // Valida se o índice selecionado ainda é válido após mudança nas imagens
    const maxIndex = newLength - 1
    if (selectedIndex.value > maxIndex) {
      selectedIndex.value = maxIndex
    }
    
    // Scroll para a thumbnail selecionada
    nextTick(() => {
      scrollToThumbnail(selectedIndex.value)
      updateArrowVisibility()
    })
  } else {
    updateArrowVisibility()
  }
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
  width: 100%;
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

	user-select: none;

	touch-action: manipulation;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	text-align: left;
	-webkit-text-decoration-line: none;
	text-decoration-line: none;

  width: 100%;

  // Gallery layout
  .component__gallery {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .component__gallery-preview {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: v-bind('styleImageBackground');
      border-radius: v-bind('styleBorderRadius');
      position: relative;

      .component__gallery-preview-zoom-button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        opacity: 0;
        visibility: hidden;
        cursor: pointer;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        pointer-events: none;
      }

      &:hover {
        div {
          opacity: v-bind('styleZoomButtonOpacity');
          visibility: visible;
          pointer-events: auto;
        }
      }

      .component__gallery-preview-image {
        width: 100%;
        height: auto;
        max-height: 600px;
        object-fit: contain;
        display: block;
      }
    }

    .component__gallery-thumbnails-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;

      .component__thumbnails-arrow {
        position: relative;
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;
        background: v-bind('styleThumbnailButtonBgColor');
        border: none;
        border-radius: 4px;
        color: v-bind('styleThumbnailButtonTextColor');
        font-size: 24px;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s ease, opacity 0.2s ease;
        flex-shrink: 0;

        &:hover:not(:disabled) {
          background: v-bind('styleThumbnailButtonBgColorHover');
        }

        &:active:not(:disabled) {
          background: v-bind('styleThumbnailButtonBgColorActive');
        }

        &:disabled,
        &--disabled {
          opacity: 0.3;
          cursor: not-allowed;
          pointer-events: none;
        }

        &--left {
          left: 0;
        }

        &--right {
          right: 0;
        }
      }

      .component__thumbnails {
        display: flex;
        flex-direction: row;
        gap: v-bind('styleThumbnailGap');
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        flex: 1;
        -webkit-overflow-scrolling: touch;
        
        // Esconde a scrollbar
        scrollbar-width: none; // Firefox
        -ms-overflow-style: none; // IE/Edge
        
        &::-webkit-scrollbar {
          display: none; // Chrome/Safari
        }

        .component__thumbnail {
          position: relative;
          cursor: pointer;
          border: 2px solid transparent;
          overflow: visible;
          transition: border-color 0.2s ease;
          flex-shrink: 0;
          box-sizing: border-box;

          .component__thumbnail-inner {
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: v-bind('styleThumbnailBorderRadius');
            transition: transform 0.2s ease;
            background: v-bind('styleThumbnailInnerBackground');

            .component__thumbnail-inner-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              transition: transform 0.2s ease;
            }
          }

          &:hover {
            .component__thumbnail-inner {
              transform: scale(1.05);
            }
          }

          &--active {
            border-color: v-bind('styleThumbnailBorderColor');
            border-width: v-bind('styleThumbnailBorderWidth');
            z-index: 1;
          }
        }
      }
    }
  }

  .component__modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: v-bind('styleBackdropColor');
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 20px;
    box-sizing: border-box;

    &.has-blur {
      background-color: inherit !important;
      -webkit-backdrop-filter: v-bind('styleBackdropBlur');
      backdrop-filter: v-bind('styleBackdropBlur');
    }

    .component__modal-controls {
      position: absolute;
      top: 20px;
      right: 2%;
      // left: 50%;
      // transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: v-bind('styleControlsGap');
      flex-wrap: wrap;
      justify-content: center;
      max-width: 90%;

      .component__modal-controls-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: v-bind('styleControlsGap');
        background: v-bind('styleControlsBgColor');
        padding: v-bind('styleControlsPadding');
        border-radius: v-bind('styleControlsBorderRadius');
        cursor: default;
        font-size: v-bind('styleControlsFontSize');
        font-weight: v-bind('styleControlsFontWeight');
        transition: background 0.2s ease, transform 0.1s ease;

        span {
          color: v-bind('styleControlsTextColor');
        }
        .component__modal-controls-buttons-button {
          padding: 10px 15px;
          background: transparent;
          color: v-bind('styleControlsTextColor');
          border: none;
          padding: 3px 7px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
          border-radius: 20px;

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;

            &:hover {
              background: transparent;
            }
          }

          &:hover {
            background: transparent;
            color: v-bind('styleControlsTextColorHover');
          }

          &:active {
            transform: scale(0.95);
          }
        }
      }
    }

    .component__modal-image {
      max-width: 90vw;
      max-height: 80vh;
      object-fit: contain;
      cursor: default;
    }
  }
}

.component-disabled {
  cursor: not-allowed;
  pointer-events: none;
  user-select: none;

  .component {
		--disabled-color: v-bind('styleTextColor');
		color: var(--disabled-color) !important;
    opacity: 0.7;
    border-radius: inherit;
  }
}
</style>
