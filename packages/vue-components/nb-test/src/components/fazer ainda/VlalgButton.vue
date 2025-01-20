<template>
  <div
    class="vlalg-button"
    :class="[full]"
  >
    <input
      v-if="propTagType === 'button'"
      type="button"
      :value="propText"
      :disabled="propDisabled"
      class="vlalg-button__input"
      :class="[type, buttonStyle, themeButton, sizeMediaQuery, isDisabled]"
      :style="[borderRadius]"
      @click="clicked"
    />
    <a
      v-else
      class="vlalg-button__anchor"
      :class="[type, themeAnchor, sizeMediaQuery, isDisabled, uppercase, italic, bold, link]"
      :style="[fontSize, paddingTop]"
      @click.prevent="clicked"
    >
      {{ propText }}
    </a>
    <span
      v-if="propNotification"
      class="vlalg-button__badge"
      :class="[sizeMediaQuery]"
    >{{ notificationText }}</span>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'VlalgButton',
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
    propTagType: {
      type: String,
      default: 'anchor',
      validator: value => {
        return ['anchor', 'button'].indexOf(value) !== -1
      },
    },
    propFontSize: {
      type: String,
      default: '1em',
      validator: value => {
        return !!value
      },
    },
    propPaddingTop: {
      type: Number,
      default: 0,
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
    propTarget: {
      type: String,
      default: 'blank',
      validator: value => {
        return ['blank', 'self', 'parent', 'top'].indexOf(value) !== -1
      },
    },
    propAction: {
      type: String,
      default: 'resolve',
      validator: value => {
        return ['emit', 'resolve'].indexOf(value) !== -1
      },
    },
    propDisabled: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
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
    propTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propType: {
      type: String,
      default: 'background',
      validator: value => {
        return ['background', 'line'].indexOf(value) !== -1
      },
    },
    propFull: {
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
    propBorderRadius: {
      type: String,
      default: '0',
    },
    propNotification: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propNotificationText: {
      type: Number,
      default: 0,
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
      propTagType,
      propFontSize,
      propPaddingTop,
      propTheme,
      propDisabled,
      propUppercase,
      propItalic,
      propBold,
      propTarget,
      propType,
      propFull,
      propSizeMediaQuery,
      propBorderRadius,
      propNotificationText,
      propUrl,
      propAction,
      propUrlType,
    } = toRefs(props)

    /* DATA */

    /* COMPUTED */
    const type = computed(() => {
      switch (propTagType.value) {
        case 'button':
          return 'vlalg-button__type--button'
        default:
          return 'vlalg-button__type--anchor'
      }
    })

    const fontSize = computed(() => {
      return {
        'font-size': propFontSize.value,
      }
    })

    const paddingTop = computed(() => {
      return {
        'padding-top': `${propPaddingTop.value}px`,
      }
    })

    const themeButton = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-button__theme--primary'
        case 'success':
          return 'vlalg-button__theme--success'
        case 'info':
          return 'vlalg-button__theme--info'
        case 'danger':
          return 'vlalg-button__theme--danger'
        case 'warn':
          return 'vlalg-button__theme--warn'
        case 'dark':
          return 'vlalg-button__theme--dark'
        case 'light':
          return 'vlalg-button__theme--light'
        default:
          return 'vlalg-button__theme--normal'
      }
    })

    const themeAnchor = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-anchor__theme--primary'
        case 'success':
          return 'vlalg-anchor__theme--success'
        case 'info':
          return 'vlalg-anchor__theme--info'
        case 'danger':
          return 'vlalg-anchor__theme--danger'
        case 'warn':
          return 'vlalg-anchor__theme--warn'
        case 'dark':
          return 'vlalg-anchor__theme--dark'
        case 'light':
          return 'vlalg-anchor__theme--light'
        default:
          return 'vlalg-anchor__theme--normal'
      }
    })

    const isDisabled = computed(() => {
      switch (propDisabled.value) {
        case true:
          return 'vlalg-button__disabled'
        default:
          return ''
      }
    })

    const uppercase = computed(() => {
      if (!propUppercase.value) return 'vlalg-button__transform--uppercase-none'

      return 'vlalg-button__transform--uppercase'
    })

    const italic = computed(() => {
      if (!propItalic.value) return 'vlalg-button__style--italic-none'

      return 'vlalg-button__style--italic'
    })

    const bold = computed(() => {
      if (!propBold.value) return 'vlalg-button__bold--none'

      return 'vlalg-button__bold'
    })

    const link = computed(() => {
      return 'vlalg-button__link'
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

    const buttonStyle = computed(() => {
      switch (propType.value) {
        case 'line':
          return 'vlalg-button__style--line'
        default:
          return 'vlalg-button__style--background'
      }
    })

    const full = computed(() => {
      if (propTagType.value === 'anchor') return ''

      switch (propFull.value) {
        case true:
          return 'vlalg-button__full'
        default:
          return ''
      }
    })

    const sizeMediaQuery = computed(() => {
      switch (propSizeMediaQuery.value) {
        case 'sm':
          return 'vlalg-button__sm'
        case 'md':
          return 'vlalg-button__md'
        case 'lg':
          return 'vlalg-button__lg'
        default:
          return ''
      }
    })

    const borderRadius = computed(() => {
      return {
        'border-radius': `${propBorderRadius.value}px`,
      }
    })

    const notificationText = computed(() => {
      return propNotificationText.value
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
      type,
      fontSize,
      paddingTop,
      themeButton,
      themeAnchor,
      isDisabled,
      uppercase,
      italic,
      bold,
      link,
      whereOpen,
      buttonStyle,
      full,
      sizeMediaQuery,
      borderRadius,
      notificationText,
      clicked,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-button {
    display: inline-block;

    &.vlalg-button__full {
      display: inline;
      .vlalg-button__anchor,
      .vlalg-button__input {
        width: 100%;
      }
    }

    .vlalg-button__input {
      padding-top: 3px;
      padding-bottom: 3px;
      padding-left: 12px;
      padding-right: 12px;
      font-size: 1em;
    }

    .vlalg-button__anchor,
    .vlalg-button__input {
      font-family: inherit;
      font-weight: normal;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      display: inline-block;
      height: 28px;
      max-height: 28px;
      margin: 0;
      border: 0;
      background-image: none;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      line-height: 28px;

      // inicio propTagType
      &.vlalg-button__type--button {
        padding-top: 0;
      }
      &.vlalg-button__type--anchor {
        // inicio propTheme
        &.vlalg-anchor__theme--normal {
          background-color: transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;
          border: none;
          color: #f8f8f2;

          &:focus,
          &:hover,
          &:active {
            color: #7f8c8d;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              color: #f8f8f2;
            }
          }
        }
        &.vlalg-anchor__theme--primary {
          background-color: transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;
          border: none;
          color: #f15574;

          &:focus,
          &:hover,
          &:active {
            color: #cf1137;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              color: #f15574;
            }
          }
        }
        &.vlalg-anchor__theme--success {
          background-color: transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;
          border: none;
          color: #2ecc71;

          &:focus,
          &:hover,
          &:active {
            color: #27ae60;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              color: #2ecc71;
            }
          }
        }
        &.vlalg-anchor__theme--danger {
          background-color: transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;
          border: none;
          color: #e74c3c;

          &:focus,
          &:hover,
          &:active {
            color: #c0392b;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              color: #e74c3c;
            }
          }
        }
        &.vlalg-anchor__theme--warn {
          background-color: transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;
          border: none;
          color: #f1c40f;

          &:focus,
          &:hover,
          &:active {
            color: #c27c0e;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              color: #f1c40f;
            }
          }
        }
        &.vlalg-anchor__theme--info {
          background-color: transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;
          border: none;
          color: #3498db;

          &:focus,
          &:hover,
          &:active {
            color: #2980b9;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              color: #3498db;
            }
          }
        }
        &.vlalg-anchor__theme--dark {
          background-color: transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;
          border: none;
          color: #44475a;

          &:focus,
          &:hover,
          &:active {
            color: #272936;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              color: #44475a;
            }
          }
        }
        &.vlalg-anchor__theme--light {
          background-color: transparent;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;
          border: none;
          color: #f8f8f2;

          &:focus,
          &:hover,
          &:active {
            color: #7f8c8d;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              color: #f8f8f2;
            }
          }
        }
        // fim propTheme
      }
      // fim propTagType

      // inicio propSizeMediaQuery
      &.vlalg-button__sm {
        height: 38px;
        max-height: 38px;
        line-height: 29px;

        // inicio propTagType
        &.vlalg-button__type--button {
          font-size: 1.2em;
        }
        // fim propTagType
      }
      &.vlalg-button__md {
        height: 48px;
        max-height: 48px;
        line-height: 1.42857143;

        // inicio propTagType
        &.vlalg-button__type--button {
          font-size: 1.6em;
        }
        // fim propTagType
      }
      &.vlalg-button__lg {
        height: 58px;
        max-height: 58px;
        line-height: 1.42857143;

        &.vlalg-button__type--button {
          font-size: 2em;
        }
      }
      // fim propSizeMediaQuery

      &:focus,
      &:active {
        outline: thin none;
        outline: 1px auto -webkit-focus-ring-color;
        outline-offset: -2px;
      }

      &:focus,
      &:hover {
        text-decoration: none;
      }

      &:active {
        background-image: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
      }

      // inicio propDisabled
      &.vlalg-button__disabled {
        color: inherit;
        filter: alpha(opacity=55);
        -moz-opacity: 0.55;
        opacity: 0.55;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        outline: none;
        cursor: not-allowed;
      }
      // fim propDisabled

      // inicio propUppercase
      &.vlalg-button__transform--uppercase-none {
        text-transform: none;
      }
      &.vlalg-button__transform--uppercase {
        text-transform: uppercase;
      }
      // fim propUppercase

      // inicio propItalic
      &.vlalg-button__style--italic-none {
        font-style: normal;
      }
      &.vlalg-button__style--italic {
        font-style: italic;
      }
      // fim propItalic

      // inicio propBold
      &.vlalg-button__bold--none {
        font-weight: normal;
      }
      &.vlalg-button__bold {
        font-weight: 700;
      }
      // fim propBold

      // inicio propUrl
      &.vlalg-button__link {
        text-decoration: none;
      }
      // fim propUrl

      // inicio propType
      &.vlalg-button__style--line {
        // inicio propTheme
        &.vlalg-button__theme--normal {
          background-color: transparent;
          border: 1px solid #f8f8f2;
          color: #f8f8f2;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            border: 1px solid #7f8c8d;
            color: #7f8c8d;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              border: 1px solid #f8f8f2;
              color: #f8f8f2;
            }
          }
        }
        &.vlalg-button__theme--primary {
          background-color: transparent;
          border: 1px solid #f15574;
          color: #f15574;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            border: 1px solid #cf1137;
            color: #cf1137;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              border: 1px solid #f15574;
              color: #f15574;
            }
          }
        }
        &.vlalg-button__theme--success {
          background-color: transparent;
          border: 1px solid #2ecc71;
          color: #2ecc71;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            border: 1px solid #27ae60;
            color: #27ae60;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              border: 1px solid #2ecc71;
              color: #2ecc71;
            }
          }
        }
        &.vlalg-button__theme--danger {
          background-color: transparent;
          border: 1px solid #e74c3c;
          color: #e74c3c;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            border: 1px solid #c0392b;
            color: #c0392b;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              border: 1px solid #e74c3c;
              color: #e74c3c;
            }
          }
        }
        &.vlalg-button__theme--warn {
          background-color: transparent;
          border: 1px solid #f1c40f;
          color: #f1c40f;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            border: 1px solid #c27c0e;
            color: #c27c0e;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              border: 1px solid #f1c40f;
              color: #f1c40f;
            }
          }
        }
        &.vlalg-button__theme--info {
          background-color: transparent;
          border: 1px solid #3498db;
          color: #3498db;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            border: 1px solid #2980b9;
            color: #2980b9;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              border: 1px solid #3498db;
              color: #3498db;
            }
          }
        }
        &.vlalg-button__theme--dark {
          background-color: transparent;
          border: 1px solid #44475a;
          color: #44475a;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            border: 1px solid #272936;
            color: #272936;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              border: 1px solid #44475a;
              color: #44475a;
            }
          }
        }
        &.vlalg-button__theme--light {
          background-color: transparent;
          border: 1px solid #f8f8f2;
          color: #f8f8f2;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            border: 1px solid #7f8c8d;
            color: #7f8c8d;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              border: 1px solid #f8f8f2;
              color: #f8f8f2;
            }
          }
        }
        // fim propTheme
      }
      &.vlalg-button__style--background {
        // inicio propTheme
        &.vlalg-button__theme--normal {
          background-color: #f8f8f2;
          color: #8e8e8e;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            color: #7f8c8d;
            background-color: #eaeaea;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              background-color: #f8f8f2;
              color: #8e8e8e;
            }
          }
        }
        &.vlalg-button__theme--primary {
          background-color: #f15574;
          color: #fff;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            color: #fff;
            background-color: #cf1137;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              background-color: #f15574;
              color: #fff;
            }
          }
        }
        &.vlalg-button__theme--success {
          background-color: #2ecc71;
          color: #fff;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            color: #fff;
            background-color: #27ae60;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              background-color: #2ecc71;
              color: #fff;
            }
          }
        }
        &.vlalg-button__theme--danger {
          background-color: #e74c3c;
          color: #fff;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            color: #fff;
            background-color: #c0392b;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              background-color: #e74c3c;
              color: #fff;
            }
          }
        }
        &.vlalg-button__theme--warn {
          background-color: #f1c40f;
          color: #fff;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            color: #fff;
            background-color: #c27c0e;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              background-color: #f1c40f;
              color: #fff;
            }
          }
        }
        &.vlalg-button__theme--info {
          background-color: #3498db;
          color: #fff;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            color: #fff;
            background-color: #2980b9;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              background-color: #3498db;
              color: #fff;
            }
          }
        }
        &.vlalg-button__theme--dark {
          background-color: #353734;
          color: #f8f8f2;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            color: #f8f8f2;
            background-color: #272936;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              background-color: #353734;
              color: #f8f8f2;
            }
          }
        }
        &.vlalg-button__theme--light {
          background-color: #f8f8f2;
          color: #8e8e8e;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          outline: none;

          &:focus,
          &:hover,
          &:active {
            color: #7f8c8d;
            background-color: #eaeaea;
          }

          &.vlalg-button__disabled {
            &:focus,
            &:hover,
            &:active {
              background-color: #f8f8f2;
              color: #8e8e8e;
            }
          }
        }
        // fim propTheme
      }
      // inicio propType
    }

    // inicio propNotification
    .vlalg-button__badge {
      background-color: red;
      font-size: 1em;
      padding: 0px 7px;
      border-radius: 100px;
      color: #fff;
      position: absolute;
      margin-left: -15px;
      margin-top: -15px;

      // inicio propSizeMediaQuery
      &.vlalg-button__sm {
        padding: 1px 9px;

        &.vlalg-button__type--button {
          font-size: 1.2em;
        }
      }
      &.vlalg-button__md {
        padding: 0px 11px;

        &.vlalg-button__type--button {
          font-size: 1.6em;
        }
      }
      &.vlalg-button__lg {
        padding: 0px 13px;

        &.vlalg-button__type--button {
          font-size: 2em;
        }
      }
      // fim propSizeMediaQuery
    }
    // fim propNotification
  }
</style>
