<template>
  <div
    v-if="propText"
    :id="propId"
    class="vlalg-badge"
    :class="[sizeMediaQuery, hoverAnimation, theme, position, link, uppercase, bold, italic]"
    @click="clicked"
  >
    <div
      v-if="hasLink"
      class="vlalg-badge__link--anchor"
    >
      {{ propText }}
    </div>
    <p v-else>
      {{ propText }}
    </p>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'VlalgBadge',
  components: {},
  emits: ['clicked'],
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
      default: '',
    },
    propTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propPosition: {
      type: String,
      default: 'left',
      validator: value => {
        return ['left', 'right'].indexOf(value) !== -1
      },
    },
    propHoverAnimation: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propUrl: {
      type: [String, Object],
      default: '',
    },
    propUrlType: {
      type: String,
      default: 'internal',
      validator: value => {
        return ['internal', 'external'].indexOf(value) !== -1
      },
    },
    propAction: {
      type: String,
      default: 'resolve',
      validator: value => {
        return ['emit', 'resolve'].indexOf(value) !== -1
      },
    },
    propTarget: {
      type: String,
      default: 'blank',
      validator: value => {
        return ['blank', 'self', 'parent', 'top'].indexOf(value) !== -1
      },
    },
    propUppercase: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propItalic: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propBold: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propSizeMediaQuery: {
      type: String,
      default: 'xs',
      validator: value => {
        return ['xs', 'sm', 'md', 'lg'].indexOf(value) !== -1
      },
    },
  },
  setup (props, context) {
    /* MIXINS */

    /* VUE I18N */

    /* VUE META */

    /* VUE ROUTER */
    const router = useRouter() // Mesmo que this.$router

    /* VUEX (Mesmo que this.$store) */

    /* FUNCTIONS */

    /* LIFECYCLE */

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const {
      propTheme,
      propPosition,
      propHoverAnimation,
      propUrl,
      propUrlType,
      propAction,
      propTarget,
      propUppercase,
      propItalic,
      propBold,
      propSizeMediaQuery,
    } = toRefs(props)

    /* DATA */

    /* COMPUTED */
    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-badge__theme--primary'
        case 'success':
          return 'vlalg-badge__theme--success'
        case 'info':
          return 'vlalg-badge__theme--info'
        case 'danger':
          return 'vlalg-badge__theme--danger'
        case 'warn':
          return 'vlalg-badge__theme--warn'
        case 'dark':
          return 'vlalg-badge__theme--dark'
        case 'light':
          return 'vlalg-badge__theme--light'
        default:
          return 'vlalg-badge__theme--normal'
      }
    })

    const position = computed(() => {
      switch (propPosition.value) {
        case 'right':
          return 'vlalg-badge__position--right'
        default:
          return 'vlalg-badge__position--left'
      }
    })

    const hoverAnimation = computed(() => {
      switch (propHoverAnimation.value) {
        case true:
          return 'vlalg-badge__houver--animation'
        default:
          return ''
      }
    })

    const link = computed(() => {
      if (propUrl.value) return 'vlalg-badge__link'

      return ''
    })

    const whereOpen = computed(() => {
      switch (propTarget.value) {
        case 'self':
          return '_self'
        case 'parent':
          return '_parent'
        case 'top':
          return '_top'
        default:
          return '_blank'
      }
    })

    const uppercase = computed(() => {
      if (!propUppercase.value) return 'vlalg-badge__transform--uppercase-none'

      return 'vlalg-badge__transform--uppercase'
    })

    const italic = computed(() => {
      if (!propItalic.value) return 'vlalg-badge__style--italic-none'

      return 'vlalg-badge__style--italic'
    })

    const bold = computed(() => {
      if (!propBold.value) return 'vlalg-badge__bold--none'

      return 'vlalg-badge__bold'
    })

    const sizeMediaQuery = computed(() => {
      switch (propSizeMediaQuery.value) {
        case 'sm':
          return 'vlalg-badge__sm'
        case 'md':
          return 'vlalg-badge__md'
        case 'lg':
          return 'vlalg-badge__lg'
        default:
          return ''
      }
    })

    const hasLink = computed(() => {
      const isObj = propUrl.value.constructor === Object && Object.entries(propUrl.value).length
      const isString = typeof propUrl.value === 'string' && propUrl.value

      if (isObj || isString) return true
      return false
    })

    /* METHODS */
    const clicked = () => {
      if (propAction.value === 'emit') {
        context.emit('clicked', true)
      } else {
        const url = propUrl.value

        if (propUrlType.value === 'external') {
          window.open(url, '_blank')
        } else {
          router.push({ ...url })
        }
      }
    }

    /* WATCH */

    return {
      theme,
      position,
      hoverAnimation,
      link,
      whereOpen,
      uppercase,
      italic,
      bold,
      sizeMediaQuery,
      hasLink,
      clicked,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-badge {
    font-size: 0.8em;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    padding: 3px 7px;
    border-radius: 100px;
    display: inline-block;

    p {
      margin-bottom: 0px;
    }

    // inicio propSizeMediaQuery
    &.vlalg-badge__sm {
      font-size: 1.2em;
    }
    &.vlalg-badge__md {
      font-size: 1.6em;
    }
    &.vlalg-badge__lg {
      font-size: 2em;
    }
    // fim propSizeMediaQuery

    // inicio propPosition
    &.vlalg-badge__position--left {
      margin-left: 5px;
    }
    &.vlalg-badge__position--right {
      margin-right: 5px;
    }
    // fim propPosition

    // inicio propUppercase
    &.vlalg-badge__transform--uppercase-none {
      text-transform: none;
    }
    &.vlalg-badge__transform--uppercase {
      text-transform: uppercase;
    }
    // fim propUppercase

    // inicio propItalic
    &.vlalg-badge__style--italic-none {
      font-style: normal;
    }
    &.vlalg-badge__style--italic {
      font-style: italic;
    }
    // fim propItalic

    // inicio propBold
    &.vlalg-badge__bold--none {
      font-weight: normal;
    }
    &.vlalg-badge__bold {
      font-weight: 700;
    }
    // fim propBold

    // inicio propPosition
    &.vlalg-badge__position--left {
      margin-left: 5px;
    }
    &.vlalg-badge__position--right {
      margin-right: 5px;
    }
    // fim propPosition

    // inicio propHoverAnimation
    &.vlalg-badge__houver--animation {
      &.vlalg-badge__theme--normal {
        &:hover {
          color: #7f8c8d;
          background-color: #eaeaea;
        }
      }
      &.vlalg-badge__theme--primary {
        &:hover {
          color: #fff;
          background-color: #cf1137;
        }
      }
      &.vlalg-badge__theme--success {
        &:hover {
          color: #fff;
          background-color: #27ae60;
        }
      }
      &.vlalg-badge__theme--danger {
        &:hover {
          color: #fff;
          background-color: #c0392b;
        }
      }
      &.vlalg-badge__theme--warn {
        &:hover {
          color: #fff;
          background-color: #c27c0e;
        }
      }
      &.vlalg-badge__theme--info {
        &:hover {
          color: #fff;
          background-color: #2980b9;
        }
      }
      &.vlalg-badge__theme--dark {
        &:hover {
          color: #f8f8f2;
          background-color: #272936;
        }
      }
      &.vlalg-badge__theme--light {
        &:hover {
          color: #7f8c8d;
          background-color: #eaeaea;
        }
      }
    }
    // fim propHoverAnimation

    // inicio propUrl
    &.vlalg-badge__link {
      &:hover {
        cursor: pointer;
      }

      &.vlalg-badge__theme--normal {
        &:hover {
          color: #7f8c8d;
          background-color: #eaeaea;
        }

        .vlalg-badge__link--anchor {
          color: #7f8c8d;
        }
      }
      &.vlalg-badge__theme--primary {
        &:hover {
          color: #fff;
          background-color: #cf1137;
        }

        .vlalg-badge__link--anchor {
          color: #fff;
        }
      }
      &.vlalg-badge__theme--success {
        &:hover {
          color: #fff;
          background-color: #27ae60;
        }

        .vlalg-badge__link--anchor {
          color: #fff;
        }
      }
      &.vlalg-badge__theme--danger {
        &:hover {
          color: #fff;
          background-color: #c0392b;
        }

        .vlalg-badge__link--anchor {
          color: #fff;
        }
      }
      &.vlalg-badge__theme--warn {
        &:hover {
          color: #fff;
          background-color: #c27c0e;
        }

        .vlalg-badge__link--anchor {
          color: #fff;
        }
      }
      &.vlalg-badge__theme--info {
        &:hover {
          color: #fff;
          background-color: #2980b9;
        }

        .vlalg-badge__link--anchor {
          color: #fff;
        }
      }
      &.vlalg-badge__theme--dark {
        &:hover {
          color: #f8f8f2;
          background-color: #272936;
        }

        .vlalg-badge__link--anchor {
          color: #f8f8f2;
        }
      }
      &.vlalg-badge__theme--light {
        &:hover {
          color: #7f8c8d;
          background-color: #eaeaea;
        }

        .vlalg-badge__link--anchor {
          color: #7f8c8d;
        }
      }
    }
    // fim propUrl

    // inicio propTheme
    &.vlalg-badge__theme--normal {
      background-color: #f8f8f2;
      color: #8e8e8e;
    }
    &.vlalg-badge__theme--primary {
      background-color: #f15574;
      color: #fff;
    }
    &.vlalg-badge__theme--success {
      background-color: #2ecc71;
      color: #fff;
    }
    &.vlalg-badge__theme--danger {
      background-color: #e74c3c;
      color: #fff;
    }
    &.vlalg-badge__theme--warn {
      background-color: #f1c40f;
      color: #fff;
    }
    &.vlalg-badge__theme--info {
      background-color: #3498db;
      color: #fff;
    }
    &.vlalg-badge__theme--dark {
      background-color: #353734;
      color: #f8f8f2;
    }
    &.vlalg-badge__theme--light {
      background-color: #f8f8f2;
      color: #8e8e8e;
    }
    // fim propTheme
  }
</style>
