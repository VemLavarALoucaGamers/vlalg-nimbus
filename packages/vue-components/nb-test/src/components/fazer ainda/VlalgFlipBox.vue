<template>
  <div
    :id="propId"
    class="vlalg-flipbox"
    :class="[threeDimensionalEfect, efectDirection, border, borderTheme]"
    :style="[size]"
  >
    <div
      class="vlalg-flipbox__content"
      :class="[theme]"
    >
      <div class="vlalg-flipbox__content--front">
        <slot name="front"></slot>
      </div>
      <div class="vlalg-flipbox__content--back">
        <slot name="back"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'VlalgFlipBox',
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
    propEfectDirection: {
      type: String,
      default: 'horizontal',
      validator: value => {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      },
    },
    propThreeDimensionalEfect: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propBorder: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propBorderTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propWidth: {
      type: String,
      default: '300px',
    },
    propHeight: {
      type: String,
      default: '200px',
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

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const {
      propEfectDirection,
      propThreeDimensionalEfect,
      propBorder,
      propBorderTheme,
      propWidth,
      propHeight,
      propTheme,
    } = toRefs(props)

    /* DATA */

    /* COMPUTED */
    const efectDirection = computed(() => {
      switch (propEfectDirection.value) {
        case 'vertical':
          return 'vlalg-flipbox__efect-direction--vertical'
        default:
          return 'vlalg-flipbox__efect-direction--horizontal'
      }
    })

    const threeDimensionalEfect = computed(() => {
      switch (propThreeDimensionalEfect.value) {
        case true:
          return 'vlalg-flipbox__efect--3d'
        default:
          return 'vlalg-flipbox__efect--none'
      }
    })

    const border = computed(() => {
      switch (propBorder.value) {
        case true:
          return 'vlalg-flipbox__border'
        default:
          return 'vlalg-flipbox__border--none'
      }
    })

    const borderTheme = computed(() => {
      switch (propBorderTheme.value) {
        case 'primary':
          return 'vlalg-flipbox__border--primary'
        case 'success':
          return 'vlalg-flipbox__border--success'
        case 'info':
          return 'vlalg-flipbox__border--info'
        case 'danger':
          return 'vlalg-flipbox__border--danger'
        case 'warn':
          return 'vlalg-flipbox__border--warn'
        case 'dark':
          return 'vlalg-flipbox__border--dark'
        case 'light':
          return 'vlalg-flipbox__border--light'
        default:
          return 'vlalg-flipbox__border--normal'
      }
    })

    const size = computed(() => {
      return {
        width: propWidth.value,
        height: propHeight.value,
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-flipbox__theme--primary'
        case 'success':
          return 'vlalg-flipbox__theme--success'
        case 'info':
          return 'vlalg-flipbox__theme--info'
        case 'danger':
          return 'vlalg-flipbox__theme--danger'
        case 'warn':
          return 'vlalg-flipbox__theme--warn'
        case 'dark':
          return 'vlalg-flipbox__theme--dark'
        case 'light':
          return 'vlalg-flipbox__theme--light'
        default:
          return 'vlalg-flipbox__theme--normal'
      }
    })

    /* METHODS */

    /* WATCH */

    return {
      efectDirection,
      threeDimensionalEfect,
      border,
      borderTheme,
      size,
      theme,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-flipbox {
    background-color: transparent;
    overflow: hidden;

    // inicio propEfectDirection
    &.vlalg-flipbox__efect-direction--horizontal {
      &:hover .vlalg-flipbox__content {
        transform: rotateX(180deg);
      }
      .vlalg-flipbox__content--back {
        transform: rotateX(180deg);
      }
    }
    &.vlalg-flipbox__efect-direction--vertical {
      &:hover .vlalg-flipbox__content {
        transform: rotateY(180deg);
      }
      .vlalg-flipbox__content--back {
        transform: rotateY(180deg);
      }
    }
    // fim propEfectDirection

    // inicio prop3dEfect
    &.vlalg-flipbox__efect--3d {
      perspective: 1000px;
    }
    &.vlalg-flipbox__efect--none {
      perspective: none;
    }
    // fim prop3dEfect

    // inicio propBorder
    &.vlalg-flipbox__border {
      border-width: 1px;
      border-style: solid;
    }
    &.vlalg-flipbox__border--none {
      border-width: 0;
      border-style: none;
    }
    // fim propBorder

    // inicio propBorderTheme
    &.vlalg-flipbox__border--normal {
      border-color: #f8f8f2;
    }
    &.vlalg-flipbox__border--primary {
      border-color: #f15574;
    }
    &.vlalg-flipbox__border--success {
      border-color: #2ecc71;
    }
    &.vlalg-flipbox__border--info {
      border-color: #3498db;
    }
    &.vlalg-flipbox__border--danger {
      border-color: #e74c3c;
    }
    &.vlalg-flipbox__border--warn {
      border-color: #f1c40f;
    }
    &.vlalg-flipbox__border--dark {
      border-color: #44475a;
    }
    &.vlalg-flipbox__border--light {
      border-color: #f8f8f2;
    }
    // fim propBorderTheme

    .vlalg-flipbox__content {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.8s;
      transform-style: preserve-3d;

      .vlalg-flipbox__content--front,
      .vlalg-flipbox__content--back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }

      // inicio propTheme
      &.vlalg-flipbox__theme--normal {
        .vlalg-flipbox__content--front {
          background-color: #f8f8f2;
          color: #8e8e8e;
        }

        .vlalg-flipbox__content--back {
          background-color: #eaeaea;
          color: #7f8c8d;
        }
      }
      &.vlalg-flipbox__theme--primary {
        .vlalg-flipbox__content--front {
          background-color: #f15574;
          color: #fff;
        }

        .vlalg-flipbox__content--back {
          background-color: #cf1137;
          color: #fff;
        }
      }
      &.vlalg-flipbox__theme--success {
        .vlalg-flipbox__content--front {
          background-color: #2ecc71;
          color: #fff;
        }

        .vlalg-flipbox__content--back {
          background-color: #27ae60;
          color: #fff;
        }
      }
      &.vlalg-flipbox__theme--info {
        .vlalg-flipbox__content--front {
          background-color: #3498db;
          color: #fff;
        }

        .vlalg-flipbox__content--back {
          background-color: #2980b9;
          color: #fff;
        }
      }
      &.vlalg-flipbox__theme--warn {
        .vlalg-flipbox__content--front {
          background-color: #f1c40f;
          color: #fff;
        }

        .vlalg-flipbox__content--back {
          background-color: #c27c0e;
          color: #fff;
        }
      }
      &.vlalg-flipbox__theme--danger {
        .vlalg-flipbox__content--front {
          background-color: #e74c3c;
          color: #fff;
        }

        .vlalg-flipbox__content--back {
          background-color: #c0392b;
          color: #fff;
        }
      }
      &.vlalg-flipbox__theme--dark {
        .vlalg-flipbox__content--front {
          background-color: #353734;
          color: #f8f8f2;
        }

        .vlalg-flipbox__content--back {
          background-color: #272936;
          color: #f8f8f2;
        }
      }
      &.vlalg-flipbox__theme--light {
        .vlalg-flipbox__content--front {
          background-color: #f8f8f2;
          color: #8e8e8e;
        }

        .vlalg-flipbox__content--back {
          background-color: #eaeaea;
          color: #7f8c8d;
        }
      }
      // fim propTheme
    }
  }
</style>
