<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      :class="['component__modal', { 'has-blur': hasBackdropBlur }]"
      :style="[styleZIndexModal]"
      @click.self="handleClose"
    >
    <div
      class="component__modal-controls"
      :style="styleZIndexModalControls"
    >
      <slot
        name="preview-controls"
        :previewRotateLeft="() => rotateImage('left')"
        :previewRotateRight="() => rotateImage('right')"
        :previewZoomIn="() => zoomImage('in')"
        :previewZoomOut="() => zoomImage('out')"
        :previewClose="() => handleClose()"
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
            @click.stop="handleClose"
          >
            <slot name="preview-close-icon" :previewClose="() => handleClose()">x</slot>
          </button>
        </div>
        <div class="component__modal-controls-buttons" v-if="images.length > 1">
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
      v-if="selectedImage"
      :src="selectedImage.url" 
      :alt="selectedImage.alt || 'Image preview'"
      :srcset="selectedImage.srcset"
      :sizes="selectedImage.sizes || '100vw'"
      :width="selectedImage.width"
      :height="selectedImage.height"
      :loading="'eager'"
      :decoding="decoding"
      :crossorigin="crossorigin || undefined"
      :referrerpolicy="referrerpolicy"
      :integrity="integrity || undefined"
      :fetchpriority="fetchpriority"
      class="component__modal-image"
      :style="imageTransformStyle"
      @click.stop
    />
    </div>
  </Teleport>
</template>

<script setup>
import { ref, toRefs, computed, watch, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'ImageModal',
  inheritAttrs: false
})

const props = defineProps({
  modelValue: { // se o modal deve ser exibido
    type: Boolean,
    default: false
  },
  images: { // imagens a serem exibidas
    type: Array,
    required: true,
    default: () => []
  },
  selectedIndex: { // índice da imagem selecionada
    type: Number,
    default: 0
  },
  hasBackdropBlur: { // se o backdrop deve ter blur
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  backdropBlur: { // blur do backdrop
    type: Number,
    default: 5
  },
  backdropRGBColor: { // cor do backdrop
    type: Object,
    default: () => ({ r: 0, g: 0, b: 0 })
  },
  backdropAlpha: { // opacidade do backdrop
    type: Number,
    default: 0.6
  },
  controlsBgColor: { // cor do background dos controles
    type: String,
    default: 'cyan'
  },
  controlsTextColor: { // cor do texto dos controles
    type: String,
    default: 'magenta'
  },
  controlsTextColorHover: { // cor do texto dos controles ao passar o mouse
    type: String,
    default: 'brown'
  },
  controlsBorderRadius: { // raio da borda dos controles
    type: Number,
    default: 20
  },
  controlsPaddingX: { // padding horizontal dos controles
    type: Number,
    default: 4
  },
  controlsPaddingY: { // padding vertical dos controles
    type: Number,
    default: 4
  },
  controlsGap: { // gap entre os controles
    type: Number,
    default: 5
  },
  controlsFontSize: { // tamanho da fonte dos controles
    type: String,
    default: '1.6em'
  },
  controlsFontWeight: { // peso da fonte dos controles
    type: Number,
    default: 800
  },
  zIndex: { // z-index do modal
    type: Number,
    default: 2147483640
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
  referrerpolicy: {
    type: String,
    default: 'no-referrer',
    validator: value => ['no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'unsafe-url'].includes(value)
  },
  integrity: {
    type: String,
    default: '',
    validator: value => typeof value === 'string'
  },
  fetchpriority: {
    type: String,
    default: 'auto',
    validator: value => ['high', 'low', 'auto'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'rotate', 'zoom', 'select-image']) // eventos emitidos pelo modal

const {
  modelValue,
  images,
  selectedIndex: propSelectedIndex,
  hasBackdropBlur,
  backdropBlur,
  backdropRGBColor,
  backdropAlpha,
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
  decoding
} = toRefs(props)

const imageRotation = ref(0) // rotação da imagem
const imageZoom = ref(1) // zoom da imagem
const internalSelectedIndex = ref(propSelectedIndex.value || 0) // índice da imagem selecionada internamente

// Sincronizar selectedIndex interno com prop
watch(() => propSelectedIndex.value, (newIndex) => {
  // Se o novo índice não é null ou undefined, atualizar o índice interno
  if (newIndex !== null && newIndex !== undefined) {
    // Atualizar o índice interno
    internalSelectedIndex.value = newIndex
  }
})

// Observar mudanças no modelValue para controlar o overflow do body
watch(() => modelValue.value, (isOpen) => {
  // Obter o elemento html
  const html = document.documentElement

  // Se o modal está aberto, esconder o overflow do body e do html
  if (isOpen) {
    document.body.style.overflow = 'hidden' // esconder o overflow do body
    html.style.overflow = 'hidden' // esconder o overflow do html
    resetImageTransform() // resetar a transformação da imagem
  } else {
    document.body.style.overflow = '' // mostrar o overflow do body
    html.style.overflow = '' // mostrar o overflow do html
  }
})

onMounted(() => {
  // Se o modal está aberto, esconder o overflow do body e do html
  if (modelValue.value) {
    // Obter o elemento html
    const html = document.documentElement
    // Esconder o overflow do body e do html
    document.body.style.overflow = 'hidden' // esconder o overflow do body
    // Esconder o overflow do html
    html.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  // Obter o elemento html
  const html = document.documentElement
  // Mostrar o overflow do body e do html
  document.body.style.overflow = '' // mostrar o overflow do body
  // Mostrar o overflow do html
  html.style.overflow = ''
})

const formatDefaultValues = computed(() => {
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
    backdropAlpha: backdropAlphaValue,
    zIndex: zIndexValue,
    backdropBlur: backdropBlurValue,
    controlsBgColor: controlsBgColorValue,
    controlsTextColor: controlsTextColorValue,
    controlsTextColorHover: controlsTextColorHoverValue,
    controlsBorderRadius: controlsBorderRadiusValue,
    controlsPaddingX: controlsPaddingXValue,
    controlsPaddingY: controlsPaddingYValue,
    controlsGap: controlsGapValue,
    controlsFontSize: controlsFontSizeValue,
    controlsFontWeight: controlsFontWeightValue,
    backdropRGBColor: backdropRGBColorValue
  }
})

// Selecionar a imagem atual
const selectedImage = computed(() => {
  // Se não há imagens ou o índice selecionado é null, retornar null
  if (!images.value || images.value.length === 0 || internalSelectedIndex.value === null) return null
  // Retornar a imagem atual
  return images.value[internalSelectedIndex.value] || null
})

// Estilo da transformação da imagem
const imageTransformStyle = computed(() => {
  return {
    transform: `rotate(${imageRotation.value}deg) scale(${imageZoom.value})`, // transformação da imagem
    transition: 'transform 0.3s ease'
  }
})

// Estilo do background do backdrop
const styleBackdropColor = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `rgba(${defaultValues.backdropRGBColor.r}, ${defaultValues.backdropRGBColor.g}, ${defaultValues.backdropRGBColor.b}, ${defaultValues.backdropAlpha})`
})

// Estilo do blur do backdrop
const styleBackdropBlur = computed(() => {
  const defaultValues = formatDefaultValues.value
  return hasBackdropBlur.value ? `blur(${defaultValues.backdropBlur}px)` : 'none'
})

// Estilo do z-index do modal
const styleZIndexModal = computed(() => {
  const defaultValues = formatDefaultValues.value
  return {
    zIndex: `${defaultValues.zIndex + 1} !important`
  }
})

// Estilo do z-index dos controles
const styleZIndexModalControls = computed(() => {
  const defaultValues = formatDefaultValues.value
  return {
    zIndex: `${defaultValues.zIndex + 2} !important`
  }
})

// Estilo do background dos controles
const styleControlsBgColor = computed(() => {
  const defaultValues = formatDefaultValues.value
  return defaultValues.controlsBgColor
})

// Estilo do texto dos controles
const styleControlsTextColor = computed(() => {
  const defaultValues = formatDefaultValues.value
  return defaultValues.controlsTextColor
})

// Estilo do texto dos controles ao passar o mouse
const styleControlsTextColorHover = computed(() => {
  const defaultValues = formatDefaultValues.value
  return defaultValues.controlsTextColorHover
})

// Estilo do raio da borda dos controles
const styleControlsBorderRadius = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.controlsBorderRadius}px`
})

// Estilo do padding dos controles
const styleControlsPadding = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.controlsPaddingX}px ${defaultValues.controlsPaddingY}px`
})

// Estilo do gap dos controles
const styleControlsGap = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.controlsGap}px`
})

// Estilo do tamanho da fonte dos controles
const styleControlsFontSize = computed(() => {
  const defaultValues = formatDefaultValues.value
  return `${defaultValues.controlsFontSize}em !important`
})

// Estilo do peso da fonte dos controles
const styleControlsFontWeight = computed(() => {
  const defaultValues = formatDefaultValues.value
  return defaultValues.controlsFontWeight
})

// Resetar a transformação da imagem
const resetImageTransform = () => {
  // Resetar a rotação da imagem
  imageRotation.value = 0
  // Resetar o zoom da imagem
  imageZoom.value = 1
}

// Rotacionar a imagem
const rotateImage = (direction) => {
  // Se o modal não está aberto, retornar
  if (!modelValue.value) return
  // Se a direção não é left ou right, retornar
  
  // Se a direção é left, rotacionar a imagem para a esquerda
  if (direction === 'left') {
    // Rotacionar a imagem para a esquerda
    imageRotation.value -= 90
  } else if (direction === 'right') {
    // Rotacionar a imagem para a direita
    imageRotation.value += 90
  }
  
  // Emitir o evento de rotação
  emit('rotate', { direction, rotation: imageRotation.value })
}

// Zoomar a imagem
const zoomImage = (direction) => {
  // Se o modal não está aberto, retornar
  if (!modelValue.value) return
  
  // Se a direção é in, zoomar a imagem para dentro
  if (direction === 'in') {
    imageZoom.value = Math.min(imageZoom.value + 0.25, 5) // Máximo 5x
  } else if (direction === 'out') {
    imageZoom.value = Math.max(imageZoom.value - 0.25, 0.5) // Mínimo 0.5x
  }

  // Emitir o evento de zoom
  emit('zoom', { direction, zoom: imageZoom.value })
}

// Fechar o modal
const handleClose = () => {
  // Emitir o evento de fechamento
  emit('update:modelValue', false)
  // Emitir o evento de fechamento
  emit('close')
  // Resetar a transformação da imagem
  resetImageTransform()
}

// Selecionar a imagem atual
const selectPreviewImage = (index) => {
  // Se não há imagens ou o índice selecionado é null, retornar
  if (!images.value || images.value.length === 0) return
  
  // Valida se o índice está dentro do range válido
  const maxIndex = images.value.length - 1
  // Valida se o índice está dentro do range válido
  const validIndex = Math.max(0, Math.min(index, maxIndex))
  
  // Atualiza o índice selecionado
  if (images.value[validIndex] && images.value[validIndex].url) {
    // Atualiza o índice selecionado internamente
    internalSelectedIndex.value = validIndex
    // Reset transformações ao mudar de imagem
    resetImageTransform()
    // Emitir o evento de seleção de imagem
    emit('select-image', { index: validIndex, image: images.value[validIndex] })
  }
}

// Resetar a transformação da imagem quando o modal abre ou muda de imagem
watch(() => modelValue.value, (isOpen) => {
  // Se o modal está aberto, resetar a transformação da imagem
  if (isOpen) {
    // Resetar a transformação da imagem
    resetImageTransform()
  }
})

// Resetar a transformação da imagem quando o índice selecionado muda
watch(() => internalSelectedIndex.value, () => {
  // Resetar a transformação da imagem
  resetImageTransform()
})
</script>

<style lang="scss" scoped>
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
    background: transparent !important;
    -webkit-backdrop-filter: v-bind('styleBackdropBlur');
    backdrop-filter: v-bind('styleBackdropBlur');
  }

  .component__modal-controls {
    position: absolute;
    top: 20px;
    right: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: v-bind('styleControlsGap');
    flex-wrap: wrap;
    justify-content: center;
    max-width: 90%;

    :deep(.component__modal-controls-buttons) {
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
</style>
