<template>
  <div
    :id="propId"
    class="vlalg-image-zoom"
    :class="[theme]"
    :style="[display]"
  >
    <div
      ref="baseImageLens"
      class="vlalg-image-zoom__lens"
      :style="[border]"
    ></div>
    <img
      ref="baseImageZoom"
      :src="propSrc"
      width="300"
      height="240"
      :alt="propAlt"
      class="vlalg-image-zoom__image"
      :class="[imageType]"
    />
    <div
      ref="baseImageZoomResult"
      class="vlalg-image-zoom__result"
      :style="[border]"
    ></div>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'VlalgImageZoom',
  components: {},
  emits: [],
  props: {
    propId: {
      type: String,
      default: '',
      required: true,
      validator: value => {
        if (!value) return false
        return true
      },
    },
    propSrc: {
      type: String,
      default: '',
      required: true,
    },
    propDisplay: {
      type: String,
      default: 'inlineBlock',
      validator: value => {
        return ['inlineBlock', 'block'].indexOf(value) !== -1
      },
    },
    propImageType: {
      type: String,
      default: 'none',
      validator: value => {
        return ['none', 'rounded'].indexOf(value) !== -1
      },
    },
    propLensBorder: {
      type: Number,
      default: 1,
    },
    propTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propAlt: {
      type: String,
      default: 'Default VlalgImageZoom Alt',
    },
  },
  setup (props) {
    /* MIXINS */

    /* VUE I18N */

    /* VUE META */

    /* VUE ROUTER */

    /* VUEX (Mesmo que this.$store) */

    /* FUNCTIONS */

    /* LIFECYCLE */
    onMounted(() => {
      imageZoom()
    })

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const { propDisplay, propImageType, propLensBorder, propTheme } = toRefs(props)

    /* DATA */
    const baseImageZoom = ref(null)
    const baseImageZoomResult = ref(null)
    const baseImageLens = ref(null)

    /* COMPUTED */
    const display = computed(() => {
      let currentDisplay = 'inline-block'

      if (propDisplay.value === 'block') currentDisplay = 'block'

      return {
        display: currentDisplay,
      }
    })

    const imageType = computed(() => {
      switch (propImageType.value) {
        case 'rounded':
          return 'vlalg-image-zoom__image--type-rounded'
        default:
          return 'vlalg-image-zoom__image--type-none'
      }
    })

    const border = computed(() => {
      const currentBorder = propLensBorder.value <= 1 ? 1 : propLensBorder.value

      return {
        'border-width': `${currentBorder}px`,
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-image-zoom__theme--primary'
        case 'success':
          return 'vlalg-image-zoom__theme--success'
        case 'info':
          return 'vlalg-image-zoom__theme--info'
        case 'danger':
          return 'vlalg-image-zoom__theme--danger'
        case 'warn':
          return 'vlalg-image-zoom__theme--warn'
        case 'dark':
          return 'vlalg-image-zoom__theme--dark'
        case 'light':
          return 'vlalg-image-zoom__theme--light'
        default:
          return 'vlalg-image-zoom__theme--normal'
      }
    })

    /* METHODS */
    const imageZoom = () => {
      const image = baseImageZoom.value
      const result = baseImageZoomResult.value

      // Criando a lente
      const lens = baseImageLens.value

      // Calcula o raio (ratio) entre a div result e a lente
      const cx = result.offsetWidth / lens.offsetWidth
      const cy = result.offsetHeight / lens.offsetHeight

      /* Set background properties for the result DIV */
      result.style.backgroundImage = `url(${image.src})`
      result.style.backgroundSize = image.width * cx + 'px ' + image.height * cy + 'px'

      /* Execute a function when someone moves the cursor over the image, or the lens: */
      lens.addEventListener('mousemove', e => {
        moveLens(e, image, result, lens, cx, cy)
      })
      image.addEventListener('mousemove', e => {
        moveLens(e, image, result, lens, cx, cy)
      })

      /* And also for touch screens: */
      lens.addEventListener('touchmove', e => {
        moveLens(e, image, result, lens, cx, cy)
      })
      image.addEventListener('touchmove', e => {
        moveLens(e, image, result, lens, cx, cy)
      })
    }

    const moveLens = (e, image, result, lens, cx, cy) => {
      e.preventDefault()

      const imageWidth = image.width
      const imageHeight = image.height
      const lensOffsetWidth = lens.offsetWidth
      const lensOffsetHeight = lens.offsetHeight

      // Pegando a posicao do ponteiro
      const cursorPosition = getCursorPossition(e, image)

      // Calculando a posicao da lens
      let lensPositionX = cursorPosition.x - lensOffsetWidth / 2
      let lensPositionY = cursorPosition.y - lensOffsetHeight / 2

      // Impedir que a lens seja posicionada fora da imagem
      if (lensPositionX > imageWidth - lensOffsetWidth) lensPositionX = imageWidth - lensOffsetWidth

      if (lensPositionX < 0) lensPositionX = 0

      if (lensPositionY > imageHeight - lensOffsetHeight) lensPositionY = imageHeight - lensOffsetHeight

      if (lensPositionY < 0) lensPositionY = 0

      // Definindo a posicao da lens
      lens.style.left = `${lensPositionX}px`
      lens.style.top = `${lensPositionY}px`

      // Mostra o que a lens vê
      result.style.backgroundPosition = `-${lensPositionX * cx}px -${lensPositionY * cy}px`
    }

    const getCursorPossition = (e, image) => {
      const event = e || window.event

      // Obter as posições x e y da imagem
      const imagePosition = image.getBoundingClientRect()

      // Calcular as coordenadas x e y do cursor, em relação à imagem
      let cusorPositionX = event.pageX - imagePosition.left
      let cusorPositionY = event.pageY - imagePosition.top

      // Considere qualquer rolagem de página
      cusorPositionX = cusorPositionX - window.pageXOffset
      cusorPositionY = cusorPositionY - window.pageYOffset

      return { x: cusorPositionX, y: cusorPositionY }
    }

    /* WATCH */

    return {
      display,
      imageType,
      border,
      theme,
      baseImageZoom,
      baseImageZoomResult,
      baseImageLens,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-image-zoom {
    box-sizing: border-box;
    position: relative;
    min-width: 300px;
    max-width: 300px;
    height: 551px;

    // inicio propTheme
    &.vlalg-image-zoom__theme--normal {
      .vlalg-image-zoom__lens {
        border-color: #f8f8f2;
      }
      .vlalg-image-zoom__result {
        border-color: #f8f8f2;
      }
    }
    &.vlalg-image-zoom__theme--primary {
      .vlalg-image-zoom__lens {
        border-color: #f15574;
      }
      .vlalg-image-zoom__result {
        border-color: #f15574;
      }
    }
    &.vlalg-image-zoom__theme--success {
      .vlalg-image-zoom__lens {
        border-color: #2ecc71;
      }
      .vlalg-image-zoom__result {
        border-color: #2ecc71;
      }
    }
    &.vlalg-image-zoom__theme--info {
      .vlalg-image-zoom__lens {
        border-color: #3498db;
      }
      .vlalg-image-zoom__result {
        border-color: #3498db;
      }
    }
    &.vlalg-image-zoom__theme--warn {
      .vlalg-image-zoom__lens {
        border-color: #f1c40f;
      }
      .vlalg-image-zoom__result {
        border-color: #f1c40f;
      }
    }
    &.vlalg-image-zoom__theme--danger {
      .vlalg-image-zoom__lens {
        border-color: #e74c3c;
      }
      .vlalg-image-zoom__result {
        border-color: #e74c3c;
      }
    }
    &.vlalg-image-zoom__theme--dark {
      .vlalg-image-zoom__lens {
        border-color: #353734;
      }
      .vlalg-image-zoom__result {
        border-color: #353734;
      }
    }
    &.vlalg-image-zoom__theme--light {
      .vlalg-image-zoom__lens {
        border-color: #f8f8f2;
      }
      .vlalg-image-zoom__result {
        border-color: #f8f8f2;
      }
    }
    // fim propTheme

    .vlalg-image-zoom__image {
      position: relative;
      float: left;

      // inicio propImageType
      &.vlalg-image-zoom__image--type-rounded {
        border-radius: 6px;
      }
      &.vlalg-image-zoom__image--type-none {
        border-radius: 0;
      }
      // fim propImageType
    }

    .vlalg-image-zoom__result {
      position: relative;
      float: left;
      border-width: 1px;
      border-style: solid;
      width: 300px;
      height: 300px;
      margin-top: 11px;
    }

    .vlalg-image-zoom__lens {
      position: absolute;
      border-style: solid;
      width: 40px;
      height: 40px;
      z-index: 1;
    }
  }
</style>
