<template>
  <div
    :id="propId"
    ref="vlalgHorizontalScrollingCardsSlider"
    class="vlalg-horizontal-scrolling-cards__slider"
    :style="[margin, contentHeight, sliderWidth]"
  >
    <div
      ref="vlalgHorizontalScrollingCardsInnerSlider"
      class="vlalg-horizontal-scrolling-cards__slider-inner"
      :style="[gridTemplateColumns, contentGap]"
    >
      <div
        v-for="(item, index) in itemsList"
        :key="index"
        :style="[contentWidth, borderRadius]"
        class="vlalg-horizontal-scrolling-cards__slider-inner-content"
      >
        <slot
          :name="index"
          class="vlalg-horizontal-scrolling-cards__content-card"
          :class="`vlalg-horizontal-scrolling-cards__content-card-${index}`"
        ></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, computed, onMounted } from 'vue'

export default defineComponent({
  name: 'VlalgHorizontalScrollingCards',
  components: {},
  emits: [],
  props: {
    propId: {
      type: String,
      default: '',
      required: true,
      validator: value => {
        if (!value) return false
        return value
      },
    },
    propQuantityOfItems: {
      type: Number,
      default: 4,
    },
    propContentWidth: {
      type: Number,
      default: 90,
    },
    propContentHeight: {
      type: Number,
      default: 100,
    },
    propGap: {
      type: Number,
      default: 5,
    },
    propMarginTop: {
      type: Number,
      default: 0,
    },
    propMarginBottom: {
      type: Number,
      default: 0,
    },
    propBorderRadius: {
      type: Number,
      default: 0,
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
      window.addEventListener('resize', () => {
        if (vlalgHorizontalScrollingCardsInnerSlider.value)
          vlalgHorizontalScrollingCardsInnerSlider.value.style.left = '0px'
      })

      vlalgHorizontalScrollingCardsSlider.value.addEventListener('mousedown', e => {
        pressed.value = true
        startx.value = e.offsetX - vlalgHorizontalScrollingCardsInnerSlider.value.offsetLeft
        vlalgHorizontalScrollingCardsSlider.value.style.cursor = 'grabbing'
      })

      vlalgHorizontalScrollingCardsSlider.value.addEventListener('mouseenter', () => {
        vlalgHorizontalScrollingCardsSlider.value.style.cursor = 'grab'
      })

      /*
      vlalgHorizontalScrollingCardsSlider.addEventListener('mouseleave', () => {
          vlalgHorizontalScrollingCardsSlider.value.style.cursor = 'default'
      })
      */

      vlalgHorizontalScrollingCardsSlider.value.addEventListener('mouseup', () => {
        vlalgHorizontalScrollingCardsSlider.value.style.cursor = 'grab'
      })

      window.addEventListener('mouseup', () => {
        pressed.value = false
      })

      vlalgHorizontalScrollingCardsSlider.value.addEventListener('mousemove', e => {
        if (!pressed.value) return

        e.preventDefault()

        x.value = e.offsetX

        vlalgHorizontalScrollingCardsInnerSlider.value.style.left = `${x.value - startx.value}px`

        checkboundary()
      })
    })

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const {
      propQuantityOfItems,
      propContentWidth,
      propContentHeight,
      propGap,
      propMarginTop,
      propMarginBottom,
      propBorderRadius,
    } = toRefs(props)

    /* DATA */
    const vlalgHorizontalScrollingCardsSlider = ref('')
    const vlalgHorizontalScrollingCardsInnerSlider = ref('')

    const pressed = ref(false)
    const startx = ref(null)
    const x = ref(null)

    /* COMPUTED */
    const contentWidth = computed(() => {
      const value = propContentWidth.value
      const currentContentWidthSize = !value || value < 90 || typeof value !== 'number' ? 90 : value

      return {
        width: `${currentContentWidthSize}px`,
      }
    })
    const contentHeight = computed(() => {
      const value = propContentHeight.value
      const currentContentHeightSize = !value || value < 100 || typeof value !== 'number' ? 100 : value

      return {
        height: `${currentContentHeightSize}px`,
      }
    })
    const contentGap = computed(() => {
      const value = propGap.value
      const currentContentGapSize = !value || value < 5 || typeof value !== 'number' ? 5 : value

      return {
        gap: `${currentContentGapSize}px`,
      }
    })
    const itemsList = computed(() => {
      if (propQuantityOfItems.value) {
        const newValue = propQuantityOfItems.value < 4 ? 4 : propQuantityOfItems.value
        return Array.from(Array(newValue).keys())
      }

      return []
    })
    const hasItems = computed(() => {
      return !!propQuantityOfItems.value
    })
    const gridTemplateColumns = computed(() => {
      const value = hasItems.value ? itemsList.value.length : 6

      return {
        'grid-template-columns': `repeat(${value}, 1fr)`,
      }
    })
    const margin = computed(() => {
      const marginTop = propMarginTop.value && typeof propMarginTop.value === 'number' ? propMarginTop.value : 0
      const marginBottom =
        propMarginBottom.value && typeof propMarginBottom.value === 'number' ? propMarginBottom.value : 0

      return {
        'margin-top': `${marginTop}px`,
        'margin-bottom': `${marginBottom}px`,
      }
    })
    const borderRadius = computed(() => {
      const value = propBorderRadius.value
      const currentBorderRadius = !value || value < 5 || typeof value !== 'number' ? 0 : value
      return {
        'border-radius': `${currentBorderRadius}px`,
      }
    })

    const sliderWidth = computed(() => {
      const sliderSize = (propContentWidth.value + propGap.value) * propQuantityOfItems.value

      return {
        'max-width': `${sliderSize - 5}px`,
      }
    })

    /* METHODS */
    function checkboundary () {
      const outer = vlalgHorizontalScrollingCardsSlider.value.getBoundingClientRect()
      const inner = vlalgHorizontalScrollingCardsInnerSlider.value.getBoundingClientRect()

      if (parseInt(vlalgHorizontalScrollingCardsInnerSlider.value.style.left) > 0) {
        vlalgHorizontalScrollingCardsInnerSlider.value.style.left = '0px'
      } else if (inner.right < outer.right) {
        vlalgHorizontalScrollingCardsInnerSlider.value.style.left = `-${inner.width - outer.width}px`
      }
    }

    /* WATCH */

    return {
      vlalgHorizontalScrollingCardsSlider,
      vlalgHorizontalScrollingCardsInnerSlider,
      contentWidth,
      contentHeight,
      contentGap,
      itemsList,
      hasItems,
      gridTemplateColumns,
      margin,
      borderRadius,
      sliderWidth,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-horizontal-scrolling-cards__slider {
    height: 200px;
    overflow: hidden;
    position: relative;
    width: 100%;
    overflow-x: scroll;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .vlalg-horizontal-scrolling-cards__slider-inner {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: auto;
      display: grid;
      gap: 5px;
      pointer-events: none;
      transition: 0s ease-in;

      .vlalg-horizontal-scrolling-cards__slider-inner-content {
        height: 100%;
        text-align: center;
        min-width: 90px;
        overflow: hidden;

        .vlalg-horizontal-scrolling-cards__content-card {
        }
      }
    }

    @media screen and (min-width: 375px) {
    }
    @media screen and (min-width: 425px) {
    }
    @media screen and (min-width: 576px) {
    }
    @media screen and (min-width: 768px) {
    }
    @media screen and (min-width: 1024px) {
    }
    @media screen and (min-width: 1600px) {
    }
  }
</style>
