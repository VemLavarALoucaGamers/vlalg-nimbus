<template>
  <div
    v-if="propShow"
    :id="propId"
    class="vlalg-modal"
    :class="[theme]"
    @click="closePopUp('overlay')"
  >
    <div
      class="vlalg-modal__card"
      :style="[borderRadius]"
    >
      <div class="vlalg-modal__card--content">
        <slot v-if="!slotHasContent">
          Without contents
        </slot>
        <slot name="header"></slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
      </div>

      <a
        v-if="!blockButton"
        class="vlalg-modal__button--close"
        :class="[closeButtontheme]"
        @click.prevent="closePopUp('button')"
      >
        X
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, toRefs, watch, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'VlalgModal',
  components: {},
  emits: ['close-vlalg-modal'],
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
    propShow: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propCloseButtonTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propCanOverlayClose: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propBorderRadius: {
      type: String,
      default: '0',
    },
  },
  setup (props, context) {
    /* MIXINS */

    /* VUE I18N */

    /* VUE META */

    /* VUE ROUTER */

    /* VUEX (Mesmo que this.$store) */

    /* FUNCTIONS */

    /* LIFECYCLE */
    // beforeDestroy
    onBeforeUnmount(() => {
      blockButton.value = false
    })

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const { propBorderRadius, propTheme, propCloseButtonTheme, propCanOverlayClose, propShow } = toRefs(props)

    /* DATA */
    const blockButton = ref(false)

    /* COMPUTED */
    const slotHasContent = computed(() => {
      if (context.slots.header || context.slots.content || context.slots.footer) return true

      return false
    })

    const borderRadius = computed(() => {
      return {
        'border-radius': propBorderRadius.value,
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-modal__theme--primary'
        case 'success':
          return 'vlalg-modal__theme--success'
        case 'info':
          return 'vlalg-modal__theme--info'
        case 'danger':
          return 'vlalg-modal__theme--danger'
        case 'warn':
          return 'vlalg-modal__theme--warn'
        case 'dark':
          return 'vlalg-modal__theme--dark'
        case 'light':
          return 'vlalg-modal__theme--light'
        default:
          return 'vlalg-modal__theme--normal'
      }
    })

    const closeButtontheme = computed(() => {
      switch (propCloseButtonTheme.value) {
        case 'primary':
          return 'vlalg-modal__theme--primary'
        case 'success':
          return 'vlalg-modal__theme--success'
        case 'info':
          return 'vlalg-modal__theme--info'
        case 'danger':
          return 'vlalg-modal__theme--danger'
        case 'warn':
          return 'vlalg-modal__theme--warn'
        case 'dark':
          return 'vlalg-modal__theme--dark'
        case 'light':
          return 'vlalg-modal__theme--light'
        default:
          return 'vlalg-modal__theme--normal'
      }
    })

    /* METHODS */
    const closePopUp = origem => {
      if (origem === 'overlay' && !propCanOverlayClose.value) {
        return
      }

      blockButton.value = false
      context.emit('close-vlalg-modal', true)
    }

    /* WATCH */
    watch(propShow, value => {
      const body = document.querySelectorAll('.app-body')[0]

      if (value) {
        body.classList.add('no-scroll')
      } else {
        body.classList.remove('no-scroll')
      }
    })

    return {
      blockButton,
      slotHasContent,
      borderRadius,
      theme,
      closeButtontheme,
      closePopUp,
    }
  },
})
</script>

<style lang="scss">
  .vlalg-modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000002;
    overflow-y: scroll;

    .vlalg-modal__card {
      margin: 0px auto;
      background-color: #fff;
      width: 350px;
      // height: 485px;
      position: relative;
      text-align: center;
      top: 50%;
      transform: inherit;
      position: fixed !important;
      transform: translateY(-50%);
      right: 0px;
      left: 0;

      @media screen and (min-width: 375px) {
      }
      @media screen and (min-width: 425px) {
      }
      @media screen and (min-width: 576px) {
        width: 510px;
        // height: 460px;
      }
      @media screen and (min-width: 768px) {
        width: 700px;
        // height: 500px;
      }
      @media screen and (min-width: 1024px) {
        width: 760px;
      }
      @media screen and (min-width: 1600px) {
        width: 850px;
      }

      .vlalg-modal__card--content {
        overflow: hidden;
        width: 350px;
        // height: 485px;
        height: auto;
        position: relative;

        @media screen and (min-width: 375px) {
        }
        @media screen and (min-width: 425px) {
        }
        @media screen and (min-width: 576px) {
          width: 510px;
          // height: 460px;
        }
        @media screen and (min-width: 768px) {
          width: 700px;
          // height: 500px;
        }
        @media screen and (min-width: 1024px) {
          width: 760px;
        }
        @media screen and (min-width: 1600px) {
          width: 850px;
        }
      }

      .vlalg-modal__button--close {
        position: absolute;
        right: -18px;
        top: -16px;
        padding: 9px;
        line-height: 11px;
        border-radius: 50%;
        text-decoration: none;

        &:hover {
          cursor: pointer;
        }

        // inicio propTheme
        &.vlalg-modal__theme--normal {
          background-color: #f8f8f2;
          color: #8e8e8e;

          &:hover {
            background-color: #eaeaea;
          }
        }
        &.vlalg-modal__theme--primary {
          background-color: #f15574;
          color: #ffffff;

          &:hover {
            background-color: #cf1137;
          }
        }
        &.vlalg-modal__theme--success {
          background-color: #2ecc71;
          color: #ffffff;

          &:hover {
            background-color: #27ae60;
          }
        }
        &.vlalg-modal__theme--info {
          background-color: #3498db;
          color: #ffffff;

          &:hover {
            background-color: #2980b9;
          }
        }
        &.vlalg-modal__theme--warn {
          background-color: #f1c40f;
          color: #ffffff;

          &:hover {
            background-color: #c27c0e;
          }
        }
        &.vlalg-modal__theme--danger {
          background-color: #e74c3c;
          color: #ffffff;

          &:hover {
            background-color: #c0392b;
          }
        }
        &.vlalg-modal__theme--dark {
          background-color: #353734;
          color: #f8f8f2;

          &:hover {
            background-color: #282a36;
          }
        }
        &.vlalg-modal__theme--light {
          background-color: #f8f8f2;
          color: #8e8e8e;

          &:hover {
            background-color: #eaeaea;
          }
        }
      }
    }

    // inicio propTheme
    &.vlalg-modal__theme--normal {
      background-color: rgba(248, 248, 242, 0.7);
    }
    &.vlalg-modal__theme--primary {
      background-color: rgba(241, 85, 116, 0.7);
    }
    &.vlalg-modal__theme--success {
      background-color: rgba(46, 04, 113, 0.7);
    }
    &.vlalg-modal__theme--info {
      background-color: rgba(52, 152, 219, 0.7);
    }
    &.vlalg-modal__theme--warn {
      background-color: rgba(241, 196, 15, 0.7);
    }
    &.vlalg-modal__theme--danger {
      background-color: rgba(231, 76, 60, 0.7);
    }
    &.vlalg-modal__theme--dark {
      background-color: rgba(53, 55, 52, 0.7);
    }
    &.vlalg-modal__theme--light {
      background-color: rgba(248, 248, 242, 0.7);
    }
    // fim propTheme
  }
  .no-scroll {
    overflow: hidden;
    position: fixed;
    z-index: 1000000;
    width: 100%;
  }
</style>
