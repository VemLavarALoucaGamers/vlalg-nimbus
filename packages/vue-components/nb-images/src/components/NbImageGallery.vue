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
        <div
          class="component__gallery-preview"
          :style="styleMainImage"
          @click="previewImage(currentImage?.url)"
        >
          <div
            v-if="hasZoom && !selectedImg"
            class="component__gallery-preview-zoom-button"
            :style="styleZoomButton"
          >{{ zoomButtonIcon }}</div>
          <img
            v-if="currentImage"
            :src="currentImage.url"
            :alt="currentImage.alt || 'Main image'"
            :srcset="currentImage.srcset"
            :sizes="currentImage.sizes || '100vw'"
            :width="currentImage.width"
            :height="currentImage.height"
            :loading="loading"
            :decoding="decoding"
            :crossorigin="crossorigin || undefined"
            :referrerpolicy="referrerpolicy"
            :integrity="integrity || undefined"
            :fetchpriority="fetchpriority"
            class="component__gallery-preview-image"
            :tabIndex="disabled ? -1 : tabIndex"
            role="button"
          />
        </div>

        <div class="component__gallery-thumbnails-wrapper">
          <button
            aria-label="Previous image"
            :aria-disabled="isLeftArrowDisabled"
            class="component__thumbnails-arrow component__thumbnails-arrow--left"
            :class="{ 'component__thumbnails-arrow--disabled': isLeftArrowDisabled }"
            :style="styleZIndexThumbnailArrow"
            :tabIndex="disabled || isLeftArrowDisabled ? -1 : tabIndex"
            :disabled="isLeftArrowDisabled || disabled"
            @click="scrollThumbnails('left')"
            @keydown.enter.prevent="!disabled && !isLeftArrowDisabled && hasTabIndexEnter && scrollThumbnails('left')"
            @keydown.space.prevent="!disabled && !isLeftArrowDisabled && hasTabIndexSpace && scrollThumbnails('left')"
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
              :tabIndex="disabled ? -1 : tabIndex"
              role="button"
              :aria-label="`Select image ${index + 1}: ${image.alt || 'Image'}`"
              @click="selectImage(index)"
              @keydown.enter.prevent="!disabled && hasTabIndexEnter && selectImage(index)"
              @keydown.space.prevent="!disabled && hasTabIndexSpace && selectImage(index)"
            >
              <div class="component__thumbnail-inner">
                <img
                  :src="image.url"
                  :alt="image.alt || `Thumbnail ${index + 1}`"
                  :srcset="image.srcset"
                  :sizes="image.sizes || `${thumbnailSize}px`"
                  :width="image.width"
                  :height="image.height"
                  :loading="loading"
                  :decoding="decoding"
                  :crossorigin="crossorigin || undefined"
                  :referrerpolicy="referrerpolicy"
                  :integrity="integrity || undefined"
                  :fetchpriority="fetchpriority"
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
            :style="styleZIndexThumbnailArrow"
            :tabIndex="disabled || isRightArrowDisabled ? -1 : tabIndex"
            :disabled="isRightArrowDisabled || disabled"
            @click="scrollThumbnails('right')"
            @keydown.enter.prevent="!disabled && !isRightArrowDisabled && hasTabIndexEnter && scrollThumbnails('right')"
            @keydown.space.prevent="!disabled && !isRightArrowDisabled && hasTabIndexSpace && scrollThumbnails('right')"
          >
            ›
          </button>
        </div>
      </div>

      <ImageModal
        v-model="selectedImg"
        :images="images"
        :selected-index="selectedIndex"
        :has-backdrop-blur="hasBackdropBlur"
        :backdrop-blur="backdropBlur"
        :backdrop-r-g-b-color="backdropRGBColor"
        :backdrop-alpha="backdropAlpha"
        :controls-bg-color="controlsBgColor"
        :controls-text-color="controlsTextColor"
        :controls-text-color-hover="controlsTextColorHover"
        :controls-border-radius="controlsBorderRadius"
        :controls-padding-x="controlsPaddingX"
        :controls-padding-y="controlsPaddingY"
        :controls-gap="controlsGap"
        :controls-font-size="controlsFontSize"
        :controls-font-weight="controlsFontWeight"
        :z-index="zIndex"
        :decoding="decoding"
        :crossorigin="crossorigin || undefined"
        :referrerpolicy="referrerpolicy"
        :integrity="integrity || undefined"
        :fetchpriority="fetchpriority"
        @close="closeImage"
        @select-image="handleSelectImage"
      >
        <template #preview-controls="{ previewRotateLeft, previewRotateRight, previewZoomIn, previewZoomOut, previewClose, previewFirst, previewPrevious, previewNext, previewLast, previewInfos }">
          <slot
            name="preview-controls"
            :previewRotateLeft="previewRotateLeft"
            :previewRotateRight="previewRotateRight"
            :previewZoomIn="previewZoomIn"
            :previewZoomOut="previewZoomOut"
            :previewClose="previewClose"
            :previewFirst="previewFirst"
            :previewPrevious="previewPrevious"
            :previewNext="previewNext"
            :previewLast="previewLast"
            :previewInfos="previewInfos"
          >
            <div class="component__modal-controls-buttons">
              <button
                aria-label="Rotate image left"
                class="component__modal-controls-buttons-button"
                @click.stop="previewRotateLeft"
              >
                <slot name="preview-rotate-left-icon" :previewRotateLeft="previewRotateLeft"> ↺ </slot>
              </button>
              <button
                aria-label="Rotate image right"
                class="component__modal-controls-buttons-button"
                @click.stop="previewRotateRight"
              >
                <slot name="preview-rotate-right-icon" :previewRotateRight="previewRotateRight"> ↻ </slot>
              </button>
              <button
                aria-label="Zoom image in"
                class="component__modal-controls-buttons-button"
                @click.stop="previewZoomIn"
              >
                <slot name="preview-zoom-in-icon" :previewZoomIn="previewZoomIn"> + </slot>
              </button>
              <button
                aria-label="Zoom image out"
                class="component__modal-controls-buttons-button"
                @click.stop="previewZoomOut"
              >
                <slot name="preview-zoom-out-icon" :previewZoomOut="previewZoomOut"> - </slot>
              </button>
              <button
                aria-label="Close image"
                class="component__modal-controls-buttons-button"
                @click.stop="previewClose"
              >
                <slot name="preview-close-icon" :previewClose="previewClose">x</slot>
              </button>
            </div>
            <div class="component__modal-controls-buttons">
              <button
                aria-label="First image"
                class="component__modal-controls-buttons-button"
                :disabled="selectedIndex === 0"
                @click.stop="previewFirst"
              >
                <slot name="preview-first-icon"><<</slot>
              </button>
              <button
                aria-label="Previous image"
                class="component__modal-controls-buttons-button"
                :disabled="selectedIndex === 0"
                @click.stop="previewPrevious"
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
                @click.stop="previewNext"
              >
                <slot name="preview-next-icon">></slot>
              </button>
              <button
                aria-label="Last image"
                class="component__modal-controls-buttons-button"
                :disabled="selectedIndex === images.length - 1"
                @click.stop="previewLast"
              >
                <slot name="preview-last-icon">>></slot>
              </button>
            </div>
          </slot>
        </template>
        <template #preview-rotate-left-icon="{ previewRotateLeft }">
          <slot name="preview-rotate-left-icon" :previewRotateLeft="previewRotateLeft"> ↺ </slot>
        </template>
        <template #preview-rotate-right-icon="{ previewRotateRight }">
          <slot name="preview-rotate-right-icon" :previewRotateRight="previewRotateRight"> ↻ </slot>
        </template>
        <template #preview-zoom-in-icon="{ previewZoomIn }">
          <slot name="preview-zoom-in-icon" :previewZoomIn="previewZoomIn"> + </slot>
        </template>
        <template #preview-zoom-out-icon="{ previewZoomOut }">
          <slot name="preview-zoom-out-icon" :previewZoomOut="previewZoomOut"> - </slot>
        </template>
        <template #preview-close-icon="{ previewClose }">
          <slot name="preview-close-icon" :previewClose="previewClose">x</slot>
        </template>
        <template #preview-first-icon>
          <slot name="preview-first-icon"><<</slot>
        </template>
        <template #preview-previous-icon>
          <slot name="preview-previous-icon">‹</slot>
        </template>
        <template #preview-next-icon>
          <slot name="preview-next-icon">></slot>
        </template>
        <template #preview-last-icon>
          <slot name="preview-last-icon">>></slot>
        </template>
        <template #preview-infos>
          <slot name="preview-infos">{{ selectedIndex + 1 }} / {{ images.length }}</slot>
        </template>
      </ImageModal>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import ImageModal from './ImageModal.vue'

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
  // Remove o overflow do body
  document.body.style.overflow = ''
  // Remove listener de resize
  window.removeEventListener('resize', handleResize)
  
  // Limpa timeouts pendentes
  if (scrollTimeout) {
    // Cancela o animation frame
    cancelAnimationFrame(scrollTimeout)
  }

  if (resizeTimeout) {
    // Limpa o timeout
    clearTimeout(resizeTimeout)
  }
})

const emit = defineEmits(['clicked', 'image-changed'])

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
    default: 'Image Gallery'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
  imageBackground: { // transparent, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9), #ffffff, #000000
    type: String,
    default: 'transparent'
  },
  hasThumbnailBorder: { // has border or not
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
	thumbnailGap: { // gap between thumbnails in pixels
		type: Number,
		default: 8
	},
	thumbnailSize: { // size of thumbnails in pixels
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
  images: { // array of images
    type: Array,
    default: () => [],
    validator: value => {
      return Array.isArray(value) && value.every(img => img && img.url)
    }
  },
  loading: { // type of loading: lazy, eager
    type: String,
    default: 'lazy',
    validator: value => ['lazy', 'eager'].includes(value)
  },
  decoding: { // type of decoding: async, sync, auto
    type: String,
    default: 'async',
    validator: value => ['async', 'sync', 'auto'].includes(value)
  },
  crossorigin: {
    type: [String, null],
    default: null,
    validator: value => value === null || value === '' || ['anonymous', 'use-credentials'].includes(value)
  },
  referrerpolicy: { // como a imagem deve lidar com referrer policy
    type: String,
    default: 'no-referrer',
    validator: value => ['no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'unsafe-url'].includes(value)
  },
  integrity: { // integrity da imagem
    type: String,
    default: '',
    validator: value => typeof value === 'string'
  },
  fetchpriority: { // prioridade de fetch da imagem
    type: String,
    default: 'auto',
    validator: value => ['high', 'low', 'auto'].includes(value)
  },
  initialImageIndex: { // index of the initial image
    type: Number,
    default: 0,
    validator: value => {
      return typeof value === 'number' && value >= 0
    }
  },
  maxWidth: { // max width of the component
    type: String,
    default: 'auto'
  },
  hasZoom: { // has zoom button or not
    type: Boolean,
    default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
  },
  zoomButtonType: { // type of zoom button: eye, zoom
    type: String,
    default: 'eye',
    validator: value => {
      return ['eye', 'zoom'].includes(value)
    }
  },
  zoomButtonColor: { // color of the zoom button icon
    type: String,
    default: '#ffffff'
  },
  zoomButtonBgType: { // type of zoom button background: solid, blur
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
  zIndex,
  tabIndex,
  hasTabIndexEnter,
  hasTabIndexSpace
} = toRefs(props)

const selectedIndex = ref(0)
const selectedImg = ref(false)
const thumbnailsContainer = ref(null)
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

const styleThumbnailInnerBackground = computed(() => {
	return '#f5f5f5'
})

const styleThumbnailGap = computed(() => {
	const defaultValues = formatDefaultValues.value
	return `${defaultValues.thumbnailGap}px`
})

const styleZIndexThumbnailArrow = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    zIndex: `${defaultValues.zIndex} !important`
  }
})

const styleZIndexZoomButton = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.zIndex + 2
})

const styleZIndexPreviewImage = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.zIndex + 1
})

const styleZIndexThumbnailActive = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.zIndex
})

const styleBorderRadius = computed(() => {
	const defaultValues = formatDefaultValues.value
	return `${defaultValues.borderRadius}rem`
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

const previewImage = (img) => {
	if (!img) return
	
	// Encontra o índice da imagem baseado na URL
	const imageIndex = images.value.findIndex(image => image.url === img)
	if (imageIndex !== -1) {
		selectedIndex.value = imageIndex
	} else {
		// Se não encontrar, usa o índice atual
		selectedIndex.value = selectedIndex.value
	}
	
	selectedImg.value = true
}

// Função para selecionar uma imagem
const selectImage = (index) => {
  // Se o componente estiver desabilitado, retorna
	if (disabled.value) return

  // Atualiza o índice selecionado
  selectedIndex.value = index

  // Emite o evento clicked
	emit('clicked', { index, image: images.value[index] })
  // Emite o evento image-changed
	emit('image-changed', { index, image: images.value[index] })
	
	// Scroll para a thumbnail selecionada
	scrollToThumbnail(index)
}

// Função para scrollar as thumbnails
const scrollThumbnails = (direction) => {
  // Se o container das thumbnails não estiver disponível, retorna
	if (!thumbnailsContainer.value) return
	
	// Previne scroll se a seta estiver desabilitada
	// Se a seta esquerda estiver desabilitada, não scrolla para a esquerda
	if (direction === 'left' && isLeftArrowDisabled.value) return
	// Se a seta direita estiver desabilitada, não scrolla para a direita
	if (direction === 'right' && isRightArrowDisabled.value) return

  // Obtém o container das thumbnails
	const container = thumbnailsContainer.value

  // Obtém os valores padrão
	const defaultValues = formatDefaultValues.value

  // Calcula o scroll amount
	// Scroll exatamente o tamanho de uma thumbnail + gap
	const scrollAmount = defaultValues.thumbnailSize + defaultValues.thumbnailGap

  // Obtém o scroll atual
  const currentScroll = container.scrollLeft

  // Se a direção for esquerda, scrolla para a esquerda
	// Scrolla para a esquerda exatamente o tamanho de uma thumbnail + gap
  if (direction === 'left') {
    // Scrolla para a esquerda exatamente o tamanho de uma thumbnail + gap
		container.scrollTo({
			left: currentScroll - scrollAmount,
			behavior: 'smooth'
		})
	} else {
    // Scrolla para a direita exatamente o tamanho de uma thumbnail + gap
		container.scrollTo({
			left: currentScroll + scrollAmount,
			behavior: 'smooth'
		})
	}
}

// Função para scrollar para uma thumbnail específica
const scrollToThumbnail = (index) => {
  // Se o container das thumbnails não estiver disponível, retorna
	if (!thumbnailsContainer.value) return
	
  // Obtém o container das thumbnails
  // Obtém as thumbnails
  // Se a thumbnail existe, obtém a thumbnail e o container rect
  // Calcula a posição para centralizar a thumbnail
  // Scrolla para a posição calculada
	nextTick(() => {
    // Obtém o container das thumbnails
		const container = thumbnailsContainer.value
    // Obtém as thumbnails
    const thumbnails = container.querySelectorAll('.component__thumbnail')

    // Se a thumbnail existe, obtém a thumbnail e o container rect
		if (thumbnails[index]) {
      // Obtém a thumbnail
			const thumbnail = thumbnails[index]
      // Obtém o container rect
			const containerRect = container.getBoundingClientRect() 
      // Obtém a thumbnail rect
			const thumbnailRect = thumbnail.getBoundingClientRect()
			
			// Calcula a posição para centralizar a thumbnail
			const scrollLeft = thumbnail.offsetLeft - (container.clientWidth / 2) + (thumbnailRect.width / 2) // offsetLeft é a posição da thumbnail em relação ao container
			
			// Scrolla para a posição calculada
			container.scrollTo({
				left: scrollLeft,
				behavior: 'smooth'
			})
		}
	})
}

// Função para fechar a imagem selecionada
const closeImage = () => {
  // Atualiza o estado da imagem selecionada
	selectedImg.value = false
}

// Função para selecionar uma imagem
const handleSelectImage = ({ index, image }) => {
  // Atualiza o índice selecionado
	selectedIndex.value = index
	// Scroll para a thumbnail correspondente
	scrollToThumbnail(index)
}

// Função para atualizar estado das setas (desabilitar quando necessário)
const updateArrowVisibility = () => {
  // Se o container das thumbnails não estiver disponível, retorna
	if (!thumbnailsContainer.value) {
		// Desabilita seta esquerda
		isLeftArrowDisabled.value = true
		// Desabilita seta direita
    isRightArrowDisabled.value = true

		return
	}
	
  // Obtém o container das thumbnails
	const container = thumbnailsContainer.value
  // Obtém o scroll left, scroll width e client width
	const { scrollLeft, scrollWidth, clientWidth } = container
	
	// Desabilita seta esquerda quando está no começo
	isLeftArrowDisabled.value = scrollLeft <= 0
	
	// Desabilita seta direita quando está no final
	// Usa -1 para evitar problemas de arredondamento
	isRightArrowDisabled.value = scrollLeft >= scrollWidth - clientWidth - 1
}

// Handler otimizado para scroll com throttle
const handleScroll = () => {
  // Se o timeout de scroll estiver pendente, cancela o animation frame
	if (scrollTimeout) {
    // Cancela o animation frame
		cancelAnimationFrame(scrollTimeout)
  }

	// Atualiza a visibilidade das setas
	scrollTimeout = requestAnimationFrame(() => {
    // Atualiza a visibilidade das setas
		updateArrowVisibility()
    // Limpa o timeout de scroll
		scrollTimeout = null
	})
}

// Handler otimizado para resize com throttle
const handleResize = () => {
  // Se o timeout de resize estiver pendente, limpa o timeout
	if (resizeTimeout) {
    // Limpa o timeout de resize
		clearTimeout(resizeTimeout)
  }

	// Atualiza a visibilidade das setas
	resizeTimeout = setTimeout(() => {
    // Atualiza a visibilidade das setas
		updateArrowVisibility()
    // Limpa o timeout de resize
		resizeTimeout = null
	}, 150) // Throttle de 150ms
}

// Observa mudanças no initialImageIndex para atualizar a imagem selecionada
watch(() => initialImageIndex.value, (newIndex) => {
  // Se o array de imagens estiver disponível e tiver imagens, atualiza a imagem selecionada
  if (images.value && images.value.length > 0) {
    // Obtém o índice máximo -1 (para evitar problemas de indexação)
    const maxIndex = images.value.length - 1

    // Obtém o índice válido
    const validIndex = Math.max(0, Math.min(newIndex, maxIndex))

    // Se o índice selecionado não for o índice válido, atualiza o índice selecionado
    if (selectedIndex.value !== validIndex) {
      // Atualiza o índice selecionado
      selectedIndex.value = validIndex
      
      // Scroll para a thumbnail selecionada após o nextTick
      nextTick(() => {
        // Scroll para a thumbnail selecionada
        scrollToThumbnail(validIndex)
        // Atualiza a visibilidade das setas
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

    // Se o índice selecionado for maior que o índice máximo, atualiza o índice selecionado
    if (selectedIndex.value > maxIndex) {
      // Atualiza o índice selecionado
      selectedIndex.value = maxIndex
    }
    
    // Scroll para a thumbnail selecionada
    nextTick(() => {
      // Scroll para a thumbnail selecionada
      scrollToThumbnail(selectedIndex.value)
      // Atualiza a visibilidade das setas
      updateArrowVisibility()
    })
  } else {
    // Atualiza a visibilidade das setas
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
  cursor: default !important;
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
      overflow: visible;
      background: v-bind('styleImageBackground');
      border-radius: v-bind('styleBorderRadius');
      position: relative;
      padding: 2px;

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
        z-index: v-bind('styleZIndexZoomButton') !important;
      }

      &:hover {
        .component__gallery-preview-zoom-button {
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
        cursor: pointer;
        transition: transform 0.2s ease;
        border-radius: v-bind('styleBorderRadius');
        position: relative;
        z-index: v-bind('styleZIndexPreviewImage') !important;
      }

      .component__gallery-preview-image:focus {
        outline: 2px solid !important;
        outline-offset: 2px !important;
        outline-style: solid !important;
      }

      .component__gallery-preview-image:focus-visible {
        outline: 2px solid !important;
        outline-offset: 2px !important;
        outline-style: solid !important;
      }

      .component__gallery-preview-image:hover:not([tabindex="-1"]) {
        // transform: scale(1.02);
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

        &:focus:not(:disabled):not([tabindex="-1"]) {
          outline: 2px solid v-bind('styleThumbnailButtonTextColor');
          outline-offset: 2px;
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

          &:hover:not([tabindex="-1"]) {
            .component__thumbnail-inner {
              transform: scale(1.05);
            }
          }

          &:focus:not([tabindex="-1"]) {
            // outline: 2px solid v-bind('styleThumbnailBorderColor');
            // outline-offset: 2px;
          }

          &--active {
            border-color: v-bind('styleThumbnailBorderColor');
            border-width: v-bind('styleThumbnailBorderWidth');
            z-index: v-bind('styleZIndexThumbnailActive') !important;
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
		--disabled-color: v-bind('styleTextColor');
		color: var(--disabled-color) !important;
    opacity: 0.7;
    border-radius: inherit;
  }
}
</style>
