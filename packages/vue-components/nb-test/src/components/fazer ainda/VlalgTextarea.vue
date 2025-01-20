<template>
  <textarea
    :id="propId"
    v-model="textareaValue"
    :name="propName"
    :cols="propCols"
    :rows="propRows"
    class="vlalg-textarea"
    :class="[theme, isDisabled, readOnly, uppercase]"
    :style="[resize]"
    :placeholder="propPlaceholder"
    :disabled="propDisabled || propReadonly"
    :required="propRequired"
    :readonly="propReadonly"
  ></textarea>
</template>

<script>
import { defineComponent, ref, computed, toRefs, watch, onUnmounted } from 'vue'

export default defineComponent({
  name: 'VlalgTextarea',
  components: {},
  emits: ['current-value'],
  props: {
    propName: {
      type: String,
      default: '',
      required: true,
    },
    propId: {
      type: String,
      default: '',
      required: true,
      validator: value => {
        if (!value) return false
        return value
      },
    },
    propActiveStyle: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'italic'].indexOf(value) !== -1
      },
    },
    propTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propPlaceholder: {
      type: String,
      default: '',
    },
    propRequired: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propReadonly: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
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
    propValue: {
      type: String,
      default: '',
    },
    propHasResize: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propResizeType: {
      type: String,
      default: 'vertical',
      validator: value => {
        return ['both', 'horizontal', 'vertical'].indexOf(value) !== -1
      },
    },
    propCols: {
      type: Number,
      default: 20,
    },
    propRows: {
      type: Number,
      default: 5,
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
    // destroyed
    onUnmounted(() => {
      textareaValue.value = ''
    })

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const { propTheme, propDisabled, propReadonly, propUppercase, propHasResize, propResizeType, propValue } =
      toRefs(props)

    /* DATA */
    const textareaValue = ref('')

    /* COMPUTED */
    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-textarea__theme--primary'
        case 'success':
          return 'vlalg-textarea__theme--success'
        case 'info':
          return 'vlalg-textarea__theme--info'
        case 'danger':
          return 'vlalg-textarea__theme--danger'
        case 'warn':
          return 'vlalg-textarea__theme--warn'
        case 'dark':
          return 'vlalg-textarea__theme--dark'
        case 'light':
          return 'vlalg-textarea__theme--light'
        default:
          return 'vlalg-textarea__theme--normal'
      }
    })

    const isDisabled = computed(() => {
      switch (propDisabled.value) {
        case true:
          return 'vlalg-textarea__style--disabled'
        default:
          return ''
      }
    })

    const readOnly = computed(() => {
      switch (propReadonly.value) {
        case true:
          return 'vlalg-textarea__style--read-only'
        default:
          return ''
      }
    })

    const uppercase = computed(() => {
      switch (propUppercase.value) {
        case true:
          return 'vlalg-textarea__style--uppercase'
        default:
          return ''
      }
    })

    const resize = computed(() => {
      if (propHasResize.value) {
        return {
          resize: propResizeType.value,
        }
      }

      return {
        resize: 'none',
      }
    })

    /* METHODS */
    const startValue = () => {
      const initialStatus = propValue.value

      textareaValue.value = initialStatus
    }

    startValue()

    /* WATCH */
    watch(propValue, value => {
      if (value !== textareaValue.value) textareaValue.value = value
    })

    watch(textareaValue, value => {
      context.emit('current-value', value)
    })

    return {
      textareaValue,
      theme,
      isDisabled,
      readOnly,
      uppercase,
      resize,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-textarea {
    position: relative;
    margin: 0;
    padding: 0;
    display: inline-block;
    font-family: inherit;
    font-style: normal;
    font-weight: normal;
    font-size: 1em;
    line-height: 1.5;
    border: 0;
    border-radius: 0;
    outline: none;
    text-shadow: 0;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    padding: 6px 10px;

    &:focus,
    &:active {
      border: 0;
    }

    &::-webkit-scrollbar {
      width: 15px;
    }
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: 0;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
    }
    &::-webkit-scrollbar-thumb {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: auto;
      height: 20px;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: 0;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
    }
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-track-piece {
      display: none;
    }

    // inicio propUppercase
    &.vlalg-textarea__style--uppercase {
      text-transform: uppercase;

      &::placeholder {
        text-transform: none;
      }
    }
    // fim propUppercase

    // inicio propDisabled
    &.vlalg-textarea__style--disabled {
      filter: alpha(opacity=80);
      -moz-opacity: 0.8;
      opacity: 0.8;

      &:focus,
      &:active,
      &:hover {
        cursor: not-allowed;
      }
    }
    // fim propDisabled

    // inicio propReadonly
    &.vlalg-textarea__style--read-only {
      filter: alpha(opacity=80);
      -moz-opacity: 0.8;
      opacity: 0.8;

      &:focus,
      &:active,
      &:hover {
        cursor: not-allowed;
      }
    }
    // fim propReadonly

    // inicio propTheme
    &.vlalg-textarea__theme--normal {
      &.vlalg-textarea__style--disabled,
      &.vlalg-textarea__style--read-only {
        background-color: #dfdfd9;
        color: rgba(#44475a, 0.5);

        &:focus,
        &:active {
          background-color: #dfdfd9;
          color: rgba(#44475a, 0.5);

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            color: rgba(#44475a, 0.5);
          }
        }
      }

      background-color: #f8f8f2;
      color: #8e8e8e;

      // &::-webkit-scrollbar-track {}

      &::-webkit-scrollbar-thumb {
        background-color: #eaeaea;
      }
      &::-webkit-scrollbar-corner {
        background-color: #f8f8f2;
      }

      &:focus,
      &:active {
        color: #7f8c8d;
        background-color: #eaeaea;

        &::-webkit-scrollbar-thumb {
          background-color: #f8f8f2;
        }
        &::-webkit-scrollbar-corner {
          background-color: #eaeaea;
        }

        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          color: rgba(#44475a, 0.5);
        }
      }

      &::placeholder,
      &::placeholder:active,
      &::placeholder:focus {
        color: rgba(#44475a, 0.5);
      }
    }
    &.vlalg-textarea__theme--primary {
      &.vlalg-textarea__style--disabled,
      &.vlalg-textarea__style--read-only {
        color: #fff;

        &:focus,
        &:active {
          background-color: #f15574;
          color: #fff;

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            color: #fff;
          }
        }
        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          color: #fff;
          opacity: 0.7;
        }
      }

      background-color: #f15574;
      color: #fff;

      // &::-webkit-scrollbar-track {}

      &::-webkit-scrollbar-thumb {
        background-color: #cf1137;
      }
      &::-webkit-scrollbar-corner {
        background-color: #f15574;
      }

      &:focus,
      &:active {
        color: #fff;
        background-color: #cf1137;

        &::-webkit-scrollbar-thumb {
          background-color: #f15574;
        }
        &::-webkit-scrollbar-corner {
          background-color: #cf1137;
        }

        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          color: #353734;
        }
      }

      &::placeholder,
      &::placeholder:active,
      &::placeholder:focus {
        color: #353734;
      }
    }
    &.vlalg-textarea__theme--success {
      &.vlalg-textarea__style--disabled,
      &.vlalg-textarea__style--read-only {
        color: #fff;

        &:focus,
        &:active {
          background-color: #2ecc71;
          color: #fff;

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            color: #fff;
          }
        }
        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          color: #fff;
          opacity: 0.7;
        }
      }

      background-color: #2ecc71;
      color: #fff;

      // &::-webkit-scrollbar-track {}

      &::-webkit-scrollbar-thumb {
        background-color: #27ae60;
      }
      &::-webkit-scrollbar-corner {
        background-color: #2ecc71;
      }

      &:focus,
      &:active {
        color: #fff;
        background-color: #27ae60;

        &::-webkit-scrollbar-thumb {
          background-color: #2ecc71;
        }
        &::-webkit-scrollbar-corner {
          background-color: #27ae60;
        }

        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          color: #353734;
        }
      }

      &::placeholder,
      &::placeholder:active,
      &::placeholder:focus {
        color: #353734;
      }
    }
    &.vlalg-textarea__theme--info {
      &.vlalg-textarea__style--disabled,
      &.vlalg-textarea__style--read-only {
        color: #fff;

        &:focus,
        &:active {
          background-color: #3498db;
          color: #fff;

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            color: #fff;
          }
        }
        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          color: #fff;
          opacity: 0.7;
        }
      }

      background-color: #3498db;
      color: #fff;

      // &::-webkit-scrollbar-track {}

      &::-webkit-scrollbar-thumb {
        background-color: #2980b9;
      }
      &::-webkit-scrollbar-corner {
        background-color: #3498db;
      }

      &:focus,
      &:active {
        color: #fff;
        background-color: #2980b9;

        &::-webkit-scrollbar-thumb {
          background-color: #3498db;
        }
        &::-webkit-scrollbar-corner {
          background-color: #2980b9;
        }

        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          color: #353734;
        }
      }

      &::placeholder,
      &::placeholder:active,
      &::placeholder:focus {
        color: #353734;
      }
    }
    &.vlalg-textarea__theme--warn {
      &.vlalg-textarea__style--disabled,
      &.vlalg-textarea__style--read-only {
        color: #fff;

        &:focus,
        &:active {
          background-color: #f1c40f;
          color: #fff;

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            color: #fff;
          }
        }
        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          color: #fff;
          opacity: 0.7;
        }
      }

      background-color: #f1c40f;
      color: #fff;

      // &::-webkit-scrollbar-track {}

      &::-webkit-scrollbar-thumb {
        background-color: #c27c0e;
      }
      &::-webkit-scrollbar-corner {
        background-color: #f1c40f;
      }

      &:focus,
      &:active {
        color: #fff;
        background-color: #c27c0e;

        &::-webkit-scrollbar-thumb {
          background-color: #f1c40f;
        }
        &::-webkit-scrollbar-corner {
          background-color: #c27c0e;
        }

        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          color: #353734;
        }
      }

      &::placeholder,
      &::placeholder:active,
      &::placeholder:focus {
        color: #353734;
      }
    }
    &.vlalg-textarea__theme--danger {
      &.vlalg-textarea__style--disabled,
      &.vlalg-textarea__style--read-only {
        color: #fff;

        &:focus,
        &:active {
          background-color: #e74c3c;
          color: #fff;

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            color: #fff;
          }
        }
        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          color: #fff;
          opacity: 0.7;
        }
      }

      background-color: #e74c3c;
      color: #fff;

      // &::-webkit-scrollbar-track {}

      &::-webkit-scrollbar-thumb {
        background-color: #c0392b;
      }
      &::-webkit-scrollbar-corner {
        background-color: #e74c3c;
      }

      &:focus,
      &:active {
        color: #fff;
        background-color: #c0392b;

        &::-webkit-scrollbar-thumb {
          background-color: #e74c3c;
        }
        &::-webkit-scrollbar-corner {
          background-color: #c0392b;
        }

        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          color: #353734;
        }
      }

      &::placeholder,
      &::placeholder:active,
      &::placeholder:focus {
        color: #353734;
      }
    }
    &.vlalg-textarea__theme--dark {
      &.vlalg-textarea__style--disabled,
      &.vlalg-textarea__style--read-only {
        background-color: rgba(#282a36, 1);
        color: rgba(#f8f8f2, 0.5);

        &:focus,
        &:active {
          background-color: rgba(#282a36, 1);
          color: rgba(#f8f8f2, 0.5);

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            background-color: rgba(#282a36, 1);
            color: rgba(#f8f8f2, 0.5);
          }
        }
        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          background-color: rgba(#282a36, 1);
          color: rgba(#f8f8f2, 0.5);
        }
      }

      background-color: #353734;
      color: #f8f8f2;

      // &::-webkit-scrollbar-track {}

      &::-webkit-scrollbar-thumb {
        background-color: #272936;
      }
      &::-webkit-scrollbar-corner {
        background-color: #353734;
      }

      &:focus,
      &:active {
        color: #f8f8f2;
        background-color: #272936;

        &::-webkit-scrollbar-thumb {
          background-color: #353734;
        }
        &::-webkit-scrollbar-corner {
          background-color: #272936;
        }

        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          color: #f8f8f2;
          opacity: 0.5;
        }
      }

      &::placeholder,
      &::placeholder:active,
      &::placeholder:focus {
        color: #f8f8f2;
        opacity: 0.5;
      }
    }
    &.vlalg-textarea__theme--light {
      &.vlalg-textarea__style--disabled,
      &.vlalg-textarea__style--read-only {
        background-color: #dfdfd9;
        color: rgba(#44475a, 0.5);

        &:focus,
        &:active {
          background-color: #dfdfd9;
          color: rgba(#44475a, 0.5);

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            color: rgba(#44475a, 0.5);
          }
        }
      }

      background-color: #f8f8f2;
      color: #8e8e8e;

      // &::-webkit-scrollbar-track {}

      &::-webkit-scrollbar-thumb {
        background-color: #eaeaea;
      }
      &::-webkit-scrollbar-corner {
        background-color: #f8f8f2;
      }

      &:focus,
      &:active {
        color: #7f8c8d;
        background-color: #eaeaea;

        &::-webkit-scrollbar-thumb {
          background-color: #f8f8f2;
        }
        &::-webkit-scrollbar-corner {
          background-color: #eaeaea;
        }

        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          color: rgba(#44475a, 0.5);
        }
      }

      &::placeholder,
      &::placeholder:active,
      &::placeholder:focus {
        color: rgba(#44475a, 0.5);
      }
    }
    // fim propTheme
  }
</style>
