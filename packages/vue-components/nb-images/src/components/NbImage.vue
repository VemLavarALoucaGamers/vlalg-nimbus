<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
    role="button"
    v-bind="computedAriaAttrs"
	>
		<div
			:id="nbId"
      class="nb-reset component"
			:style="[componentStyle]"
		>
      <div
        v-if="hagnifierGlass"
        ref="magnifierGlassRef"
        :id="`${nbId}-magnifier-glass`"
        class="component__magnifier-glass"
        :style="hagnifierGlassSizeStyle"
      ></div>
      <img
        :id="nbId"
        ref="imageRef"
        :src="image.url"
        :srcset="image.srcset"
        :sizes="image.sizes || sizes"
        :alt="image.alt || ''"
        :width="image.width"
        :height="image.height"
        :loading="loading"
        :decoding="decoding"
        :crossorigin="crossorigin || undefined"
        :referrerpolicy="referrerpolicy"
        :integrity="integrity || undefined"
        :fetchpriority="fetchpriority"
        :style="imageStyle"
        :class="['component__image', { 'component__image--show-preview': hasPreview, 'component__image--has-magnifier': hagnifierGlass }]"
        @click="openModal"
        @mouseenter="showMagnifier"
        @mouseleave="hideMagnifier"
      />
		</div>
    <ImageModal
      v-if="hasPreview"
      v-model="selectedImg"
      :images="imagesArray"
      :selected-index="0"
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
      @close="closeModal"
    />
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import ImageModal from './ImageModal.vue'

defineOptions({
	name: 'NbImage',
	inheritAttrs: false
})

const emit = defineEmits(['clicked'])

onMounted(() => {
  startMagnifier()
})

onUnmounted(() => {
  // Remove o overflow do body
  document.body.style.overflow = ''
  
  // Limpar event listeners da lupa
  if (imageRef.value && hagnifierGlass.value) {
    // Remove o event listener de mousemove
    imageRef.value.removeEventListener("mousemove", moveMagnifier, { passive: true })
    // Remove o event listener de touchmove
    imageRef.value.removeEventListener("touchmove", moveMagnifier, { passive: true })
  }
})

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	display: {
		type: String,
		default: 'ib',
		validator: (value = 'b') => {
			const currentValue = value ? value.toLowerCase() : ''
			return ['b', 'ib'].includes(currentValue)
		}
	},
  ariaLabel: {
    type: String,
    default: 'Alternate Text Button'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
	borderRadius: {
		type: Number,
		default: 0.375
	},
  image: { // imagem a ser exibida
    type: Object,
    default: () => ({
      url: '',
      alt: '',
      srcset: '', // opcional: "image-300.jpg 300w, image-600.jpg 600w"
      sizes: '', // opcional: "(max-width: 600px) 300px, 600px"
      width: null, // opcional: largura original
      height: null // opcional: altura original
    }),
    validator: value => {
      return typeof value === 'object' && value !== null && 'url' in value
    }
  },
  objectFit: { // como a imagem se ajusta ao container
    type: String,
    default: 'cover',
    validator: value => ['cover', 'contain', 'fill', 'none', 'scale-down'].includes(value)
  },
  loading: { // como a imagem é carregada
    type: String,
    default: 'lazy',
    validator: value => ['lazy', 'eager'].includes(value)
  },
  decoding: { // como a imagem é decodada
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
  sizes: { // tamanho da imagem em diferentes viewport widths
    type: String,
    default: '100vw' // padrão: 100% da viewport width
  },
  maxWidth: { // largura máxima da imagem
    type: String,
    default: null
  },
  minWidth: { // largura mínima da imagem
    type: String,
    default: null
  },
  maxHeight: { // altura máxima da imagem
    type: String,
    default: null
  },
  minHeight: { // altura mínima da imagem
    type: String,
    default: null
  },
  responsiveType: { // como a imagem se comporta em diferentes viewport widths
    type: String,
    default: 'full',
    validator: value => ['none', 'full', 'scale-down', 'restricted'].includes(value)
  },
  hasPreview: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  hasBackdropBlur: { // se o backdrop deve ter blur
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
  backdropRGBColor: {
    type: Object,
    default: () => ({ r: 0, g: 0, b: 0 })
  },
  backdropAlpha: {
    type: Number,
    default: 0.6
  },
  controlsBgColor: {
    type: String,
    default: 'cyan'
  },
  controlsTextColor: {
    type: String,
    default: 'magenta'
  },
  controlsTextColorHover: {
    type: String,
    default: 'brown'
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
    default: 800
  },
  zIndex: {
    type: Number,
    default: 2147483640
  },
  hagnifierGlass: { // se a lupa deve ser exibida
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  hagnifierGlassZoom: { // zoom da lupa
    type: Number,
    default: 3,
    validator: value => {
      return typeof value === 'number' && value > 0
    }
  },
  hagnifierGlassSize: { // tamanho da lupa
    type: Number,
    default: 100,
    validator: value => {
      return typeof value === 'number' && value > 0
    }
  },
  hagnifierGlassBorderRadius: { // raio da borda da lupa
    type: Number,
    default: 50,
    validator: value => {
      return typeof value === 'number' && value > 0
    }
  },
  hagnifierGlassBorderColor: { // cor da borda da lupa
    type: String,
    default: '#000',
    validator: value => {
      return typeof value === 'string' && value.length > 0
    }
  },
  hagnifierGlassBorderWidth: { // largura da borda da lupa
    type: Number,
    default: 3,
    validator: value => {
      return typeof value === 'number' && value > 0
    }
  }
})

const {
  nbId,
  display,
  ariaLabel,
  ariaAttrs,
	borderRadius,
  maxWidth,
  minWidth,
  maxHeight,
  minHeight,
  objectFit,
  responsiveType,
  hasPreview,
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
  image,
  decoding,
  hagnifierGlass,
  hagnifierGlassZoom,
  hagnifierGlassSize,
  hagnifierGlassBorderRadius,
  hagnifierGlassBorderColor,
  hagnifierGlassBorderWidth
} = toRefs(props)

const selectedImg = ref(false) // imagem selecionada
const imageRef = ref(null) // referência da imagem
const magnifierGlassRef = ref(null) // referência da lupa

// Variáveis para a lupa
const magnifierW = ref(null) // largura da imagem da lupa
const magnifierH = ref(null) // altura da imagem da lupa
const magnifierBw = ref(null) // borda da imagem da lupa

// Criar array com uma única imagem para compatibilidade com o ImageModal
const imagesArray = computed(() => [image.value])

const formatDefaultValues = computed(() => {
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const maxWidthValue = maxWidth.value || null
	const minWidthValue = minWidth.value || null
	const maxHeightValue = maxHeight.value || null
	const minHeightValue = minHeight.value || null
	const objectFitValue = objectFit.value || 'cover'
	const responsiveTypeValue = responsiveType.value || 'full'
  const hagnifierGlassZoomValue = hagnifierGlassZoom.value || 3
  const hagnifierGlassSizeValue = hagnifierGlassSize.value || 100
  const hagnifierGlassBorderRadiusValue = hagnifierGlassBorderRadius.value || 50
  const hagnifierGlassBorderColorValue = hagnifierGlassBorderColor.value || '#000'
  const hagnifierGlassBorderWidthValue = hagnifierGlassBorderWidth.value || 3

	return {
		responsiveType: responsiveTypeValue,
		display: displayValue,
		borderRadius: borderRadiusValue,
		maxWidth: maxWidthValue,
		minWidth: minWidthValue,
		maxHeight: maxHeightValue,
		minHeight: minHeightValue,
		objectFit: objectFitValue,
		hagnifierGlassZoom: hagnifierGlassZoomValue,
		hagnifierGlassSize: hagnifierGlassSizeValue,
		hagnifierGlassBorderRadius: hagnifierGlassBorderRadiusValue,
		hagnifierGlassBorderColor: hagnifierGlassBorderColorValue,
		hagnifierGlassBorderWidth: hagnifierGlassBorderWidthValue
	}
})
const componentDisabled = computed(() => {
	return ''
})
const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
    display: defaultValues.display
	}
})
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		borderRadius: `${defaultValues.borderRadius}rem`,
		display: defaultValues.display
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
    ...newAttrs
  }
  
  // Remove atributos undefined/null
  return Object.fromEntries(
    Object.entries(attrs).filter(([_, value]) => value !== undefined && value !== null)
  )
})

// Estilos da lupa
const hagnifierGlassSizeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    width: `${defaultValues.hagnifierGlassSize}px`,
    height: `${defaultValues.hagnifierGlassSize}px`,
    borderRadius: `${defaultValues.hagnifierGlassBorderRadius}%`,
    border: `${defaultValues.hagnifierGlassBorderWidth}px solid ${defaultValues.hagnifierGlassBorderColor}`
  }
})

// Estilos da imagem
const imageStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  const baseStyle = {
    objectFit: defaultValues.objectFit,
    display: 'block'
  }

  // Estilos de tamanho que podem ser aplicados em qualquer tipo
  const sizeConstraints = {}
  if (defaultValues.minWidth) sizeConstraints.minWidth = defaultValues.minWidth
  if (defaultValues.maxWidth) sizeConstraints.maxWidth = defaultValues.maxWidth
  if (defaultValues.minHeight) sizeConstraints.minHeight = defaultValues.minHeight
  if (defaultValues.maxHeight) sizeConstraints.maxHeight = defaultValues.maxHeight

  switch (responsiveType.value) {
    case 'none':
      // Não aplica width nem max-width por padrão, mantém tamanho original
      // Mas permite min/max constraints se fornecidos
      return {
        ...baseStyle,
        height: 'auto',
        ...sizeConstraints
      }
    case 'full':
      // width: 100%, height: auto (escala para cima e para baixo)
      return {
        ...baseStyle,
        width: '100%',
        height: 'auto',
        ...sizeConstraints
      }
    case 'scale-down':
      // max-width: 100%, height: auto (escala para baixo, mas nunca maior que o original)
      // Se maxWidth foi fornecido, usa o valor fornecido em vez de 100%
      const scaleDownStyle = {
        ...baseStyle,
        maxWidth: defaultValues.maxWidth || '100%',
        height: 'auto'
      }
      if (defaultValues.minWidth) scaleDownStyle.minWidth = defaultValues.minWidth
      if (defaultValues.minHeight) scaleDownStyle.minHeight = defaultValues.minHeight
      if (defaultValues.maxHeight) scaleDownStyle.maxHeight = defaultValues.maxHeight
      return scaleDownStyle
    case 'restricted':
      // width: 100%, max-width: [valor], height: auto (restringe a um tamanho máximo)
      // maxWidth é obrigatório para 'restricted', usa '100%' como fallback
      const restrictedStyle = {
        ...baseStyle,
        width: '100%',
        maxWidth: defaultValues.maxWidth || '100%',
        height: 'auto'
      }
      if (defaultValues.minWidth) restrictedStyle.minWidth = defaultValues.minWidth
      if (defaultValues.minHeight) restrictedStyle.minHeight = defaultValues.minHeight
      if (defaultValues.maxHeight) restrictedStyle.maxHeight = defaultValues.maxHeight
      return restrictedStyle
    default:
      return {
        ...baseStyle,
        width: '100%',
        height: 'auto',
        ...sizeConstraints
      }
  }
})

// Função para abrir o modal
const openModal = () => {
  // Se o modal deve ser exibido e a imagem existe e a imagem tem uma URL, abre o modal
	if (hasPreview.value && image.value && image.value.url) {
    // Atualiza o estado da imagem selecionada
		selectedImg.value = true
    // Emite o evento clicked
    emit('clicked')
	}
}

const closeModal = () => {
  // Atualiza o estado da imagem selecionada
	selectedImg.value = false
}

// Função para magnificar a imagem
const magnify = () => {
  // Obtém os valores padrão
  const defaultValues = formatDefaultValues.value

  // Se a imagem, a lupa ou a lupa não estiverem disponíveis, retorna
  if (!imageRef.value || !magnifierGlassRef.value || !hagnifierGlass.value) {
    return
  }

  // Zoom da lupa
  const zoom = defaultValues.hagnifierGlassZoom
  // Imagem a ser magnificada
  const imgToMagnify = imageRef.value
  // Elemento da lupa
  const magnifierGlass = magnifierGlassRef.value

  // Aguardar a imagem carregar completamente antes de inicializar
  const initializeMagnifierGlass = () => {
    // Usar dimensões reais da imagem renderizada
    const imgWidth = imgToMagnify.offsetWidth || imgToMagnify.naturalWidth || imgToMagnify.width // offsetWidth é a largura da imagem em pixels, naturalWidth é a largura da imagem em pixels, width é a largura da imagem em pixels
    const imgHeight = imgToMagnify.offsetHeight || imgToMagnify.naturalHeight || imgToMagnify.height // offsetHeight é a altura da imagem em pixels, naturalHeight é a altura da imagem em pixels, height é a altura da imagem em pixels

    // Verificar se a imagem tem dimensões válidas
    if (imgWidth === 0 || imgHeight === 0) { // se a imagem não tem dimensões válidas, tentar novamente após um pequeno delay
      // Tentar novamente após um pequeno delay se a imagem ainda não carregou
      setTimeout(initializeMagnifierGlass, 100)
      return
    }

    // Configurar a imagem da lupa
    magnifierGlass.style.backgroundImage = "url('" + imgToMagnify.src + "')"; // src é a URL da imagem
    magnifierGlass.style.backgroundRepeat = "no-repeat"; // backgroundRepeat é a repetição da imagem da lupa
    magnifierGlass.style.backgroundSize = (imgWidth * zoom) + "px " + (imgHeight * zoom) + "px"; // backgroundSize é a largura e altura da imagem da lupa
    magnifierBw.value = 3; // borda da imagem da lupa
    magnifierW.value = magnifierGlass.offsetWidth / 2; // largura da imagem da lupa
    magnifierH.value = magnifierGlass.offsetHeight / 2; // altura da imagem da lupa

    // Verificar se a lupa tem dimensões válidas
    if (magnifierW.value === 0 || magnifierH.value === 0) { // se a lupa não tem dimensões válidas, tentar novamente após um pequeno delay
      // Tentar novamente após um pequeno delay se a lupa ainda não tem dimensões
      setTimeout(initializeMagnifierGlass, 100)
      return
    }

    // Remover listeners antigos antes de adicionar novos (evitar duplicatas)
    imgToMagnify.removeEventListener("mousemove", moveMagnifier, { passive: true }) // remove o event listener de mousemove
    imgToMagnify.removeEventListener("touchmove", moveMagnifier, { passive: true }) // remove o event listener de touchmove

    // Executar a função quando o cursor do mouse passar sobre a imagem
    imgToMagnify.addEventListener("mousemove", moveMagnifier, { passive: true }); // adiciona o event listener de mousemove

    // Executar a função quando o cursor do touch passar sobre a imagem
    imgToMagnify.addEventListener("touchmove", moveMagnifier, { passive: true }); // adiciona o event listener de touchmove
  }

  // Se a imagem já carregou, inicializar imediatamente
  if (imgToMagnify.complete && imgToMagnify.naturalWidth > 0) { // se a imagem já carregou e a imagem tem uma largura válida, inicializar a lupa
    // Inicializar a lupa
    initializeMagnifierGlass()
  } else {
    // Caso contrário, aguardar o evento load
    imgToMagnify.onload = initializeMagnifierGlass // onload é o evento de carregamento da imagem
    // Fallback: se onload não disparar, tentar após um delay
    setTimeout(initializeMagnifierGlass, 500) // tentar novamente após um pequeno delay se a imagem ainda não carregou
  }
}

// Função para mostrar a lupa
const showMagnifier = () => {
  // Se a lupa está habilitada e o elemento da lupa existe, mostrar a lupa
  // Mostrar a lupa se a lupa está habilitada e o elemento da lupa existe
  if (hagnifierGlass.value && magnifierGlassRef.value) { // se a lupa está habilitada e o elemento da lupa existe
    magnifierGlassRef.value.style.display = "block" // mostrar a lupa
  }
}

// Função para ocultar a lupa
const hideMagnifier = () => {
  // Se o elemento da lupa existe, ocultar a lupa
  if (magnifierGlassRef.value) {
    // Ocultar a lupa
    magnifierGlassRef.value.style.display = "none"
  }
}

// Função para mover a lupa
const moveMagnifier = (e) => {
  // Obtém os valores padrão
  const defaultValues = formatDefaultValues.value

  // Verificar se os elementos ainda existem e pertencem a esta instância
  // Se os elementos ainda não existem ou não pertencem a esta instância, retornar
  if (!imageRef.value || !magnifierGlassRef.value || !hagnifierGlass.value) {
    return
  }

  // Verificar se o evento veio da imagem desta instância
  const imgToMagnify = imageRef.value // imagem a ser magnificada
  // Se o evento não veio da imagem desta instância, retornar
  if (e.target !== imgToMagnify && !imgToMagnify.contains(e.target)) {
    return
  }

  // Elemento da lupa
  const magnifierGlass = magnifierGlassRef.value

  const zoom = defaultValues.hagnifierGlassZoom // zoom da lupa
  const w = magnifierW.value // largura da imagem da lupa
  const h = magnifierH.value // altura da imagem da lupa
  const bw = magnifierBw.value // borda da imagem da lupa

  // Verificar se a largura, altura e borda da imagem da lupa existem
  if (w === null || h === null || bw === null) {
    // console.warn('NbImage: moveMagnifier - valores não inicializados', { w, h, bw }) // valores não inicializados
    return
  }

  // Obter a posição do cursor
  let pos, x, y;

  // Obter a posição do cursor
  pos = getCursorPos(e); // obter a posição do cursor
  if (!pos) return
  x = pos.x; // posição do cursor
  y = pos.y; // posição do cursor

  // Usar dimensões reais da imagem renderizada
  const imgWidth = imgToMagnify.offsetWidth || imgToMagnify.width // offsetWidth é a largura da imagem em pixels, width é a largura da imagem em pixels
  const imgHeight = imgToMagnify.offsetHeight || imgToMagnify.height // offsetHeight é a altura da imagem em pixels, height é a altura da imagem em pixels

  // Verificar se a imagem da lupa está posicionada fora da imagem
  if (x > imgWidth - (w / zoom)) { x = imgWidth - (w / zoom); } // se a imagem da lupa está posicionada fora da imagem, ajustar a posição da imagem da lupa
  if (x < w / zoom) { x = w / zoom; } // se a imagem da lupa está posicionada fora da imagem, ajustar a posição da imagem da lupa
  if (y > imgHeight - (h / zoom)) { y = imgHeight - (h / zoom); } // se a imagem da lupa está posicionada fora da imagem, ajustar a posição da imagem da lupa
  if (y < h / zoom) { y = h / zoom; } // se a imagem da lupa está posicionada fora da imagem, ajustar a posição da imagem da lupa
  
  // Posicionar a imagem da lupa
  magnifierGlass.style.left = (x - w) + "px"; // left é a posição da imagem da lupa
  magnifierGlass.style.top = (y - h) + "px"; // top é a posição da imagem da lupa

  // Exibir a imagem da lupa - usar dimensões reais para calcular backgroundPosition
  const bgX = (x * zoom) - w + bw // backgroundPositionX é a posição da imagem da lupa
  const bgY = (y * zoom) - h + bw // backgroundPositionY é a posição da imagem da lupa
  magnifierGlass.style.backgroundPosition = `-${bgX}px -${bgY}px`; // backgroundPosition é a posição da imagem da lupa
}

const getCursorPos = (e) => {
  // Se a imagem não existe, retornar null
  if (!imageRef.value) {
    return null
  }

  // Imagem a ser magnificada
  const imgToMagnify = imageRef.value
  // Se a imagem não existe, retornar null
  if (!imgToMagnify) {
    return null
  }

  // Obter a posição do cursor
  let a, x = 0, y = 0; // posição do cursor
  e = e || window.event; // evento

  // Obter a posição da imagem
  a = imgToMagnify.getBoundingClientRect(); // posição da imagem

  // Calcular a posição do cursor
  if (e.touches) { // se o cursor é um touch
    x = e.touches[0].pageX - a.left; // calcular a posição do cursor
    y = e.touches[0].pageY - a.top; // calcular a posição do cursor
  } else {
    x = e.pageX - a.left; // calcular a posição do cursor
    y = e.pageY - a.top; // calcular a posição do cursor
  }

  // Considerar qualquer rolagem da página
  x = x - window.pageXOffset; // calcular a posição do cursor
  y = y - window.pageYOffset; // calcular a posição do cursor

  return { x: x, y: y }; // retornar a posição do cursor
}

// Função para iniciar a lupa
const startMagnifier = async () => {
  // Se a lupa está habilitada e a imagem e o elemento da lupa existem, iniciar a lupa
  if (hagnifierGlass.value && imageRef.value && magnifierGlassRef.value) {
    // Aguardar um tick para garantir que o DOM está pronto
    await nextTick()
    // Aguardar mais um tick para garantir que o DOM está pronto
    await nextTick()
    // Inicializar a lupa
    magnify()
  }
}

// Observa mudanças na lupa para iniciar a lupa
watch(hagnifierGlass, async (newValue) => {
  // Se a lupa está habilitada, iniciar a lupa
  if (newValue) {
    // Aguardar um tick para garantir que o DOM está pronto
    // Aguardar um pouco para garantir que o elemento da lupa está no DOM
    await nextTick()
    // Aguardar mais um tick para garantir que o DOM está pronto
    await nextTick()
    // Inicializar a lupa
    startMagnifier()
  } else {
    // Limpar event listeners quando desabilitar
    if (imageRef.value) {
      // Remover o event listener de mousemove
      imageRef.value.removeEventListener("mousemove", moveMagnifier, { passive: true })
      // Remover o event listener de touchmove
      imageRef.value.removeEventListener("touchmove", moveMagnifier, { passive: true })
    }

    // Se o elemento da lupa existe, ocultar a lupa
    if (magnifierGlassRef.value) {
      // Ocultar a lupa
      magnifierGlassRef.value.style.display = "none"
    }

    // Resetar valores da lupa
    magnifierW.value = null // largura da imagem da lupa
    magnifierH.value = null // altura da imagem da lupa
    magnifierBw.value = null // borda da imagem da lupa
  }
}, { immediate: true }) // iniciar a lupa imediatamente
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

	user-select: none;

	touch-action: manipulation;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	text-align: center;
	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;

  position: relative;

  // Add new properties below
  .component__image {
    border-radius: inherit;
    cursor: default !important;

    &.component__image--show-preview {
      cursor: pointer !important;
    }

    &.component__image--has-magnifier {
      cursor: none !important;
    }
  }

  .component__magnifier-glass {
    position: absolute;
    cursor: none !important;
    pointer-events: none;
    /*Set the size of the magnifier glass:*/
    z-index: 10;
    display: none;
  }
}

.component-disabled {
  cursor: not-allowed;
  pointer-events: none;
  user-select: none;

  .component {
    opacity: 0.7;
    border-radius: inherit;
  }
}
</style>
