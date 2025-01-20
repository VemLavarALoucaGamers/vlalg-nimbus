<template>
  <div
    :id="propId"
    class="vlalg-input"
    :class="[sizeMediaQuery, theme, isDisabled, readOnly]"
    :style="[size]"
  >
    <div
      v-if="validShowEye"
      :class="['vlalg-input__input__eye', textColor, activeInput]"
      @click="changeShowValue"
    >
      <span :class="['vlalg-input__input__eye-icon', 'fas', inputIcon]"></span>
    </div>
    <input
      v-model="inputValue"
      :name="propName"
      :type="currentType"
      class="vlalg-input__input"
      :class="[textColor, uppercase, hiddenDefaultEye]"
      :style="[borderRadius]"
      :placeholder="propPlaceholder"
      :disabled="propDisabled || propReadonly"
      :required="propRequired"
      :readonly="propReadonly"
      :autocomplete="propAutocomplete"
      @focus="isActive = true"
      @blur="isActive = false"
    />
  </div>
</template>

<script>
import { defineComponent, onUnmounted, ref, toRefs, computed, watch } from 'vue'

export default defineComponent({
  name: 'VlalgInput',
  components: {},
  emits: ['current-value'],
  props: {
    propType: {
      type: String,
      default: 'text',
      validator: value => {
        return ['text', 'number', 'email', 'password'].indexOf(value) !== -1
      },
    },
    propName: {
      type: String,
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
    propShowEye: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propActiveStyle: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'italic', 'oblique'].indexOf(value) !== -1
      },
    },
    propSizeMediaQuery: {
      type: String,
      default: 'xs',
      validator: value => {
        return ['xs', 'sm', 'md', 'lg'].indexOf(value) !== -1
      },
    },
    propTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propTextColor: {
      type: String,
      default: 'black',
      validator: value => {
        return ['black', 'white', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propBorderRadius: {
      type: String,
      default: '0',
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
    propAutocomplete: {
      type: String,
      default: 'on',
      validator: value => {
        return ['on', 'off'].indexOf(value) !== -1
      },
    },
    propUppercase: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propSize: {
      type: String,
      default: '100%',
    },
    propValue: {
      type: String,
      default: '',
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
      inputValue.value = ''
    })

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const {
      propSize,
      propActiveStyle,
      propSizeMediaQuery,
      propBorderRadius,
      propTheme,
      propTextColor,
      propDisabled,
      propReadonly,
      propUppercase,
      propShowEye,
      propType,
      propValue,
    } = toRefs(props)

    /* DATA */
    const inputValue = ref('')
    const currentType = ref('')
    const showValue = ref(false)
    const isActive = ref(false)

    /* COMPUTED */
    const size = computed(() => {
      return {
        width: propSize.value,
      }
    })

    const activeStyle = computed(() => {
      switch (propActiveStyle.value) {
        case 'italic':
          return 'vlalg-input__input--active--italic'
        case 'oblique':
          return 'vlalg-input__input--active--oblique'
        default:
          return 'vlalg-input__input--active--normal'
      }
    })

    const sizeMediaQuery = computed(() => {
      switch (propSizeMediaQuery.value) {
        case 'sm':
          return 'vlalg-input__sm'
        case 'md':
          return 'vlalg-input__md'
        case 'lg':
          return 'vlalg-input__lg'
        default:
          return ''
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
          return 'vlalg-input__theme--primary'
        case 'success':
          return 'vlalg-input__theme--success'
        case 'info':
          return 'vlalg-input__theme--info'
        case 'danger':
          return 'vlalg-input__theme--danger'
        case 'warn':
          return 'vlalg-input__theme--warn'
        case 'dark':
          return 'vlalg-input__theme--dark'
        case 'light':
          return 'vlalg-input__theme--light'
        default:
          return 'vlalg-input__theme--normal'
      }
    })

    const textColor = computed(() => {
      switch (propTextColor.value) {
        case 'white':
          return 'vlalg-input-input__text--white'
        case 'dark':
          return 'vlalg-input-input__text--dark'
        case 'light':
          return 'vlalg-input-input__text--light'
        default:
          return 'vlalg-input-input__text--black'
      }
    })

    const isDisabled = computed(() => {
      switch (propDisabled.value) {
        case true:
          return 'vlalg-input__input--disabled'
        default:
          return ''
      }
    })

    const readOnly = computed(() => {
      switch (propReadonly.value) {
        case true:
          return 'vlalg-input__input--read-only'
        default:
          return ''
      }
    })

    const uppercase = computed(() => {
      switch (propUppercase.value) {
        case true:
          return 'vlalg-input__input--uppercase'
        default:
          return ''
      }
    })

    const validShowEye = computed(() => {
      return !!(propShowEye.value && propType.value === 'password')
    })

    const inputIcon = computed(() => {
      if (showValue.value) return 'fa-eye-slash'

      return 'fa-eye'
    })

    const hiddenDefaultEye = computed(() => {
      if (currentType.value === 'password') return 'vlalg-input__input__eye-default--hidden'

      return ''
    })

    const activeInput = computed(() => {
      if (isActive.value) return 'vlalg-input__input--active'

      return 'vlalg-input__input--no-active'
    })

    /* METHODS */
    const startValue = () => {
      const initialStatus = propValue.value

      inputValue.value = initialStatus
      currentType.value = propType.value
    }

    const changeShowValue = () => {
      if (propReadonly.value || propDisabled.value) return

      const newShow = !showValue.value

      if (newShow) {
        currentType.value = 'text'
      } else {
        currentType.value = propType.value
      }

      showValue.value = newShow
    }

    startValue()

    /* WATCH */
    watch(propType, value => {
      currentType.value = value
    })

    watch(propValue, value => {
      if (value !== inputValue.value) inputValue.value = value
    })

    watch(inputValue, value => {
      context.emit('current-value', value)
    })

    return {
      size,
      activeStyle,
      sizeMediaQuery,
      borderRadius,
      theme,
      textColor,
      isDisabled,
      readOnly,
      uppercase,
      validShowEye,
      inputIcon,
      hiddenDefaultEye,
      activeInput,
      changeShowValue,
      inputValue,
      currentType,
      isActive,
    }
  },
})
</script>

<style lang="scss" scoped>
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

  .vlalg-input {
    position: relative;
    margin: 0;
    padding: 0;
    height: 28px;
    max-height: 28px;
    display: inline-block;

    // inicio propSizeMediaQuery
    &.vlalg-input__sm {
      height: 38px;
      max-height: 38px;

      .vlalg-input__input__eye {
        padding: 5px 10px;
      }

      .vlalg-input__input {
        font-size: 1.2em;
      }
    }
    &.vlalg-input__md {
      height: 48px;
      max-height: 48px;

      .vlalg-input__input__eye {
        padding: 10px 10px;
      }

      .vlalg-input__input {
        font-size: 1.6em;
      }
    }
    &.vlalg-input__lg {
      height: 58px;
      max-height: 58px;

      .vlalg-input__input__eye {
        padding: 17px 10px;
      }

      .vlalg-input__input {
        font-size: 2em;
      }
    }
    // fim propSizeMediaQuery

    .vlalg-input__input__eye {
      // inicio propTextColor
      &.vlalg-input-input__text--black {
        color: #000000;
      }
      &.vlalg-input-input__text--white {
        color: #ffffff;
      }
      &.vlalg-input-input__text--dark {
        color: #353734;
      }
      &.vlalg-input-input__text--light {
        color: rgba(#f8f8f2, 0.7);
      }
      // fim propTextColor
    }

    .vlalg-input__input {
      // inicio propTextColor
      &.vlalg-input-input__text--black {
        color: #000000;
      }
      &.vlalg-input-input__text--white {
        color: #ffffff;
      }
      &.vlalg-input-input__text--dark {
        color: #353734;
      }
      &.vlalg-input-input__text--light {
        color: rgba(#f8f8f2, 0.7);
      }
      // fim propTextColor
    }

    // inicio propTheme
    &.vlalg-input__theme--normal {
      &.vlalg-input__input--disabled,
      &.vlalg-input__input--read-only {
        .vlalg-input__input__eye {
          background-color: rgba(#dfdfd9, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input__input {
          background-color: #dfdfd9;
          &:focus,
          &:active {
            background-color: #dfdfd9;
          }
        }
      }

      .vlalg-input__input__eye {
        background-color: #f8f8f2;

        &.vlalg-input__input--active {
          background-color: #eaeaea;
        }

        &.vlalg-input__input--no-active {
          background-color: #f8f8f2;
        }
      }

      .vlalg-input__input {
        background-color: #f8f8f2;

        &:focus,
        &:active {
          background-color: #eaeaea;
        }
      }
    }
    &.vlalg-input__theme--primary {
      &.vlalg-input__input--disabled,
      &.vlalg-input__input--read-only {
        .vlalg-input__input__eye {
          background-color: rgba(#f15574, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input__input {
          &:focus,
          &:active {
            background-color: #f15574;
          }
        }
      }

      .vlalg-input__input__eye {
        background-color: #f15574;

        &.vlalg-input__input--active {
          background-color: #cf1137;
        }

        &.vlalg-input__input--no-active {
          background-color: #f15574;
        }
      }

      .vlalg-input__input {
        background-color: #f15574;

        &:focus,
        &:active {
          background-color: #cf1137;
        }
      }
    }
    &.vlalg-input__theme--success {
      &.vlalg-input__input--disabled,
      &.vlalg-input__input--read-only {
        .vlalg-input__input__eye {
          background-color: rgba(#2ecc71, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input__input {
          &:focus,
          &:active {
            background-color: #2ecc71;
          }
        }
      }

      .vlalg-input__input__eye {
        background-color: #2ecc71;

        &.vlalg-input__input--active {
          background-color: #27ae60;
        }

        &.vlalg-input__input--no-active {
          background-color: #2ecc71;
        }
      }

      .vlalg-input__input {
        background-color: #2ecc71;

        &:focus,
        &:active {
          background-color: #27ae60;
        }
      }
    }
    &.vlalg-input__theme--danger {
      &.vlalg-input__input--disabled,
      &.vlalg-input__input--read-only {
        .vlalg-input__input__eye {
          background-color: rgba(#e74c3c, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input__input {
          &:focus,
          &:active {
            background-color: #e74c3c;
          }
        }
      }

      .vlalg-input__input__eye {
        background-color: #e74c3c;

        &.vlalg-input__input--active {
          background-color: #c0392b;
        }

        &.vlalg-input__input--no-active {
          background-color: #e74c3c;
        }
      }

      .vlalg-input__input {
        background-color: #e74c3c;

        &:focus,
        &:active {
          background-color: #c0392b;
        }
      }
    }
    &.vlalg-input__theme--warn {
      &.vlalg-input__input--disabled,
      &.vlalg-input__input--read-only {
        .vlalg-input__input__eye {
          background-color: rgba(#f1c40f, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input__input {
          &:focus,
          &:active {
            background-color: #f1c40f;
          }
        }
      }

      .vlalg-input__input__eye {
        background-color: #f1c40f;

        &.vlalg-input__input--active {
          background-color: #c27c0e;
        }

        &.vlalg-input__input--no-active {
          background-color: #f1c40f;
        }
      }

      .vlalg-input__input {
        background-color: #f1c40f;

        &:focus,
        &:active {
          background-color: #c27c0e;
        }
      }
    }
    &.vlalg-input__theme--info {
      &.vlalg-input__input--disabled,
      &.vlalg-input__input--read-only {
        .vlalg-input__input__eye {
          background-color: rgba(#3498db, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input__input {
          &:focus,
          &:active {
            background-color: #3498db;
          }
        }
      }

      .vlalg-input__input__eye {
        background-color: #3498db;

        &.vlalg-input__input--active {
          background-color: #2980b9;
        }

        &.vlalg-input__input--no-active {
          background-color: #3498db;
        }
      }

      .vlalg-input__input {
        background-color: #3498db;

        &:focus,
        &:active {
          background-color: #2980b9;
        }
      }
    }
    &.vlalg-input__theme--dark {
      &.vlalg-input__input--disabled,
      &.vlalg-input__input--read-only {
        .vlalg-input__input__eye {
          background-color: rgba(#44475a, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input__input {
          background-color: rgba(#282a36, 1);
          &:focus,
          &:active {
            background-color: rgba(#282a36, 1);

            &::placeholder,
            &::placeholder:active,
            &::placeholder:focus {
              background-color: rgba(#282a36, 1);
            }
          }

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            background-color: rgba(#282a36, 1);
          }
        }
      }

      .vlalg-input__input__eye {
        background-color: #353734;

        &.vlalg-input__input--active {
          background-color: #272936;
        }

        &.vlalg-input__input--no-active {
          background-color: #353734;
        }
      }

      .vlalg-input__input {
        background-color: #353734;

        &:focus,
        &:active {
          background-color: #272936;

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            opacity: 0.5;
          }
        }

        &::placeholder,
        &::placeholder:active,
        &::placeholder:focus {
          opacity: 0.5;
        }
      }
    }
    &.vlalg-input__theme--light {
      &.vlalg-input__input--disabled,
      &.vlalg-input__input--read-only {
        .vlalg-input__input__eye {
          background-color: rgba(#353734, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input__input {
          background-color: #dfdfd9;
          &:focus,
          &:active {
            background-color: #dfdfd9;
          }
        }
      }

      .vlalg-input__input__eye {
        background-color: #353734;
      }

      .vlalg-input__input {
        background-color: #f8f8f2;

        &:focus,
        &:active {
          background-color: #eaeaea;
        }
      }
    }
    // fim propTheme

    // inicio propDisabled
    &.vlalg-input__input--disabled {
      .vlalg-input__input {
        filter: alpha(opacity=55);
        -moz-opacity: 0.55;
        opacity: 0.55;

        &:focus,
        &:active,
        &:hover {
          cursor: not-allowed;
        }
      }
    }
    // fim propDisabled

    // inicio propReadonly
    &.vlalg-input__input--read-only {
      .vlalg-input__input {
        filter: alpha(opacity=55);
        -moz-opacity: 0.55;
        opacity: 0.55;

        &:focus,
        &:active,
        &:hover {
          cursor: not-allowed;
        }
      }
    }
    // fim propReadonly

    .vlalg-input__input__eye {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      padding: 1px 10px;
      margin: 2px 2px 2px 0;
      z-index: 1;

      &:hover {
        cursor: pointer;
      }

      .vlalg-input__input__eye-icon {
        font-family: 'FontAwesome';
      }
    }

    // inicio INPUT
    .vlalg-input__input {
      width: 100%;
      height: 100%;
      font-family: inherit;
      font-style: normal;
      font-weight: normal;
      font-size: 1em;
      line-height: 1.5;
      border: 0;
      border-radius: 0;
      text-shadow: 0;
      position: relative;
      outline: none;
      background-color: transparent;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      padding: 6px 10px;

      &:focus,
      &:active {
        border: 0;
      }

      &.vlalg-input__input__eye-default--hidden {
        &::-ms-reveal,
        &::-ms-clear {
          display: none;
        }
      }

      // inicio propActiveStyle
      &.vlalg-input__input--active--italic:focus,
      &.vlalg-input__input--active--italic:active {
        font-style: italic;
      }
      &.vlalg-input__input--active--oblique:focus,
      &.vlalg-input__input--active--oblique:active {
        font-style: oblique;
      }
      &.vlalg-input__input--active--normal:focus,
      &.vlalg-input__input--active--normal:active {
        font-style: normal;
      }
      // fim propActiveStyle

      // inicio propUppercase
      &.vlalg-input__input--uppercase {
        text-transform: uppercase;

        &::placeholder {
          text-transform: none;
        }
      }
      // fim propUppercase
    }
    // fim INPUT
  }
</style>
