<template>
  <div
    v-if="hasImages"
    :id="propId"
    class="vlalg-image-comparison"
    :class="[theme]"
    :style="[defaultSize]"
  >
    <div
      ref="baseImageComparisonSeparator"
      class="vlalg-image-comparison__slider"
    ></div>
    <img
      class="vlalg-image-comparison__images vlalg-image-comparison__images--left"
      :alt="propAltLeft"
      :src="propImageLeft"
      :style="[defaultSize]"
    />
    <img
      class="vlalg-image-comparison__images vlalg-image-comparison__images--right"
      :alt="propAltRight"
      :src="propImageRight"
      :style="[defaultSize]"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, computed, toRefs, ref } from 'vue'

export default defineComponent({
  name: 'VlalgImageComparison',
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
    propImageLeft: {
      type: String,
      default: '',
    },
    propImageRight: {
      type: String,
      default: '',
    },
    propWidth: {
      type: Number,
      default: 300,
    },
    propHeight: {
      type: Number,
      default: 200,
    },
    propTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propAltLeft: {
      type: String,
      default: 'Default VlalgImageComparison Alt Left',
    },
    propAltRight: {
      type: String,
      default: 'Default VlalgImageComparison Alt Right',
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
      execFunc()

      window.addEventListener('resize', resize())
    })

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const { propImageLeft, propImageRight, propWidth, propHeight, propTheme } = toRefs(props)

    /* DATA */
    const baseImageComparisonSeparator = ref(null)

    /* COMPUTED */
    const hasImages = computed(() => {
      const imgLeft = propImageLeft.value
      const imgRight = propImageRight.value

      if (!imgLeft || !imgRight) return false

      return true
    })

    const defaultSize = computed(() => {
      const width = propWidth.value
      const height = propHeight.value

      return {
        width: `${width}px`,
        height: `${height}px`,
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-image-comparison__theme--primary'
        case 'success':
          return 'vlalg-image-comparison__theme--success'
        case 'info':
          return 'vlalg-image-comparison__theme--info'
        case 'danger':
          return 'vlalg-image-comparison__theme--danger'
        case 'warn':
          return 'vlalg-image-comparison__theme--warn'
        case 'dark':
          return 'vlalg-image-comparison__theme--dark'
        case 'light':
          return 'vlalg-image-comparison__theme--light'
        default:
          return 'vlalg-image-comparison__theme--normal'
      }
    })

    /* METHODS */
    const resize = () => {
      const separator = baseImageComparisonSeparator.value
      const separatorWidth = separator.getBoundingClientRect().width
      const imageLeft = separator.nextElementSibling
      const imageLeftWidth = imageLeft.getBoundingClientRect().width
      const imageLeftHeight = imageLeft.getBoundingClientRect().height

      separator.style.left = `${imageLeftWidth / 2 - separatorWidth / 2}px`

      imageLeft.style.clip = `rect(0px, ${imageLeftWidth / 2}px, ${imageLeftHeight}px, 0px)`
    }

    const execFunc = () => {
      const separator = baseImageComparisonSeparator.value
      const separatorWidth = separator.getBoundingClientRect().width
      const imageLeft = separator.nextElementSibling
      const imageLeftWidth = imageLeft.getBoundingClientRect().width

      let mouseDownX = 0
      let x = 0

      separator.style.left = `${imageLeftWidth / 2 - separatorWidth / 2}px`

      imageLeft.style.clip = `rect(0px, ${imageLeftWidth / 2}px, 999px, 0px)`

      separator.addEventListener('mousedown', e => {
        x = e.clientX

        mouseDownX = 1
      })

      separator.addEventListener('mouseup', () => {
        mouseDownX = 0
      })

      separator.addEventListener('mouseout', () => {
        mouseDownX = 0
      })

      separator.addEventListener('touchstart', e => {
        x = e.touches[0].clientX

        mouseDownX = 1
      })

      separator.addEventListener('touchend', () => {
        mouseDownX = 0
      })

      separator.addEventListener('mousemove', e => {
        if (mouseDownX) {
          let newLeft = parseInt(separator.style.left) + (e.clientX - x)
          const r = propWidth.value - 100

          if (newLeft > r) newLeft = r

          if (newLeft < -100) newLeft = -100

          separator.style.left = `${newLeft}px`

          x = e.clientX

          separator.nextElementSibling.style.clip = `rect(0px, ${
            separator.getBoundingClientRect().width / 2 + parseInt(separator.style.left)
          }px, ${separator.getBoundingClientRect().height}px, 0px)`
        }
      })

      separator.addEventListener('touchmove', e => {
        if (mouseDownX) {
          let newLeft = parseInt(separator.style.left) + (e.touches[0].clientX - x)
          const r = propWidth.value - 100

          if (newLeft > r) newLeft = r

          if (newLeft < -100) newLeft = -100

          separator.style.left = `${newLeft}px`

          x = e.touches[0].clientX

          separator.nextElementSibling.style.clip = `rect(0px, ${
            separator.getBoundingClientRect().width / 2 + parseInt(separator.style.left)
          }px, ${separator.getBoundingClientRect().height}px, 0px)`
        }
      })
    }

    /* WATCH */

    return {
      hasImages,
      defaultSize,
      theme,
    }
  },
})
</script>

<style lang="scss" scoped>
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

  .vlalg-image-comparison {
    overflow: hidden;
    user-select: none;
    position: relative;
    background-color: #ffffff;

    // inicio propTheme
    &.vlalg-image-comparison__theme--normal {
      .vlalg-image-comparison__slider {
        &:before,
        &:after {
          background-color: #f8f8f2;
          color: #000000;
        }
      }
    }
    &.vlalg-image-comparison__theme--primary {
      .vlalg-image-comparison__slider {
        &:before,
        &:after {
          background-color: #f15574;
          color: #ffffff;
        }
      }
    }
    &.vlalg-image-comparison__theme--success {
      .vlalg-image-comparison__slider {
        &:before,
        &:after {
          background-color: #2ecc71;
          color: #ffffff;
        }
      }
    }
    &.vlalg-image-comparison__theme--info {
      .vlalg-image-comparison__slider {
        &:before,
        &:after {
          background-color: #3498db;
          color: #ffffff;
        }
      }
    }
    &.vlalg-image-comparison__theme--warn {
      .vlalg-image-comparison__slider {
        &:before,
        &:after {
          background-color: #f1c40f;
          color: #ffffff;
        }
      }
    }
    &.vlalg-image-comparison__theme--danger {
      .vlalg-image-comparison__slider {
        &:before,
        &:after {
          background-color: #e74c3c;
          color: #ffffff;
        }
      }
    }
    &.vlalg-image-comparison__theme--dark {
      .vlalg-image-comparison__slider {
        &:before,
        &:after {
          background-color: #353734;
          color: #7f8c8d;
        }
      }
    }
    &.vlalg-image-comparison__theme--light {
      .vlalg-image-comparison__slider {
        &:before,
        &:after {
          background-color: #f8f8f2;
          color: #000000;
        }
      }
    }
    // fim propTheme

    .vlalg-image-comparison__slider {
      font-family: 'FontAwesome';
      position: absolute;
      width: 200px;
      top: 0;
      bottom: 0;
      z-index: 900000;

      &:before,
      &:after {
        position: absolute;
        left: 50%;
        content: '';
        cursor: -webkit-grab;
        cursor: grab;
      }

      &:before {
        top: 0;
        bottom: 0;
        transform: translateX(-50%);
        width: 2px;
      }

      &:after {
        top: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        border-radius: 50px;
        content: '\f07e';
        font-size: 1.5em;
        display: inline-block;
        text-align: center;
        line-height: 40px;
      }
    }

    .vlalg-image-comparison__images {
      width: 100%;
      vertical-align: middle;
      user-select: none;

      &.vlalg-image-comparison__images--left {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
</style>
