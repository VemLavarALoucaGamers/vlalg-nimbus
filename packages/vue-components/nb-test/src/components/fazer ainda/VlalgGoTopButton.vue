<template>
  <div
    v-if="propIdNameToGo"
    :id="propId"
    class="vlalg-go-top-button"
  >
    <a
      ref="baseGoTopButton"
      class="vlalg-go-top-button__button"
      :class="[theme]"
      :style="[position, borderRadius]"
      @click.prevent="goToTop"
    >
      <slot
        v-if="propContentType === 'icon'"
        name="gotopbuttonicon"
      ></slot>

      <span v-else>{{ propText }}</span>
    </a>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'VlalgGoTopButton',
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
    propText: {
      type: String,
      default: 'Go Top',
    },
    propIdNameToGo: {
      type: String,
      default: '',
      required: true,
    },
    propShowInHeight: {
      type: Number,
      default: 100,
    },
    propPositionRight: {
      type: Number,
      default: 30,
    },
    propPositionBottom: {
      type: Number,
      default: 30,
    },
    propContentType: {
      type: String,
      default: 'text',
      validator: value => {
        return ['text', 'icon'].indexOf(value) !== -1
      },
    },
    propBorderRadius: {
      type: String,
      default: '0',
    },
    propTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
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
      window.addEventListener('scroll', scrollFunction)
    })

    // destroyed
    onUnmounted(() => {
      window.removeEventListener('scroll', scrollFunction)
    })

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const { propPositionRight, propPositionBottom, propBorderRadius, propTheme, propShowInHeight, propIdNameToGo } =
      toRefs(props)

    /* DATA */
    const baseGoTopButton = ref(null)

    /* COMPUTED */
    const position = computed(() => {
      return {
        right: `${propPositionRight.value}px`,
        bottom: `${propPositionBottom.value}px`,
      }
    })

    const borderRadius = computed(() => {
      return {
        'border-radius': propBorderRadius.value,
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-go-top-button__theme--primary'
        case 'success':
          return 'vlalg-go-top-button__theme--success'
        case 'info':
          return 'vlalg-go-top-button__theme--info'
        case 'danger':
          return 'vlalg-go-top-button__theme--danger'
        case 'warn':
          return 'vlalg-go-top-button__theme--warn'
        case 'dark':
          return 'vlalg-go-top-button__theme--dark'
        case 'light':
          return 'vlalg-go-top-button__theme--light'
        default:
          return 'vlalg-go-top-button__theme--normal'
      }
    })

    /* METHODS */
    const scrollFunction = () => {
      const scrollButton = baseGoTopButton.value // this.$refs.baseGoTopButton
      const positionScroll = window.pageYOffset || document.body.scrollTop

      if (positionScroll > propShowInHeight.value) {
        scrollButton.classList.add('vlalg-go-top-button__button--visible')
      } else {
        scrollButton.classList.remove('vlalg-go-top-button__button--visible')
      }
    }

    const goToTop = () => {
      const topElement = document.getElementById(`${propIdNameToGo.value}`)
      const topElementPositon = topElement.offsetTop

      window.scrollTo({ top: topElementPositon, behavior: 'smooth' })
    }

    /* WATCH */

    return {
      position,
      borderRadius,
      theme,
      goToTop,
      baseGoTopButton,
    }
  },
})
</script>

<style lang="scss">
  .vlalg-go-top-button {
    &:hover {
      cursor: pointer;
    }

    .vlalg-go-top-button__button {
      position: fixed;
      padding: 10px;
      z-index: 9000000;
      text-decoration: none;
      opacity: 0;
      transition: opacity 0.3s;

      &:hover {
        cursor: pointer;
      }

      &.vlalg-go-top-button__button--visible {
        opacity: 1;
      }

      // inicio propTheme
      &.vlalg-go-top-button__theme--normal {
        background-color: #f8f8f2;
        color: #8e8e8e;

        &:hover {
          color: #7f8c8d;
          background-color: #eaeaea;
        }
      }
      &.vlalg-go-top-button__theme--primary {
        background-color: #f15574;
        color: #fff;

        &:hover {
          color: #fff;
          background-color: #cf1137;
        }
      }
      &.vlalg-go-top-button__theme--success {
        background-color: #2ecc71;
        color: #fff;

        &:hover {
          color: #fff;
          background-color: #27ae60;
        }
      }
      &.vlalg-go-top-button__theme--info {
        background-color: #3498db;
        color: #fff;

        &:hover {
          color: #fff;
          background-color: #2980b9;
        }
      }
      &.vlalg-go-top-button__theme--warn {
        background-color: #f1c40f;
        color: #fff;

        &:hover {
          color: #fff;
          background-color: #c27c0e;
        }
      }
      &.vlalg-go-top-button__theme--danger {
        background-color: #e74c3c;
        color: #fff;

        &:hover {
          color: #fff;
          background-color: #c0392b;
        }
      }
      &.vlalg-go-top-button__theme--dark {
        background-color: #353734;
        color: #f8f8f2;

        &:hover {
          color: #f8f8f2;
          background-color: #272936;
        }
      }
      &.vlalg-go-top-button__theme--light {
        background-color: #f8f8f2;
        color: #8e8e8e;

        &:hover {
          color: #7f8c8d;
          background-color: #eaeaea;
        }
      }
      // fim propTheme
    }
  }
</style>
