<template>
  <div
    :id="propId"
    class="vlalg-input-border"
    :class="[sizeMediaQuery, theme, isDisabled, readOnly]"
    :style="[size]"
  >
    <div
      v-if="validShowEye"
      :class="['vlalg-input-border__eye', textColor, activeInput]"
      @click="changeShowValue"
    >
      <span :class="['vlalg-input-border__eye-icon', 'fas', inputIcon]"></span>
    </div>
    <input
      v-model="inputValue"
      :name="propName"
      :type="currentType"
      class="vlalg-input-border__input"
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
import { defineComponent, onUnmounted, ref, computed, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'VlalgInputBorder',
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
    propBorderRadius: {
      type: String,
      default: '0',
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
      propTextColor,
      propActiveStyle,
      propSizeMediaQuery,
      propTheme,
      propDisabled,
      propReadonly,
      propUppercase,
      propBorderRadius,
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

    const textColor = computed(() => {
      switch (propTextColor.value) {
        case 'white':
          return 'vlalg-input-border__text--white'
        case 'dark':
          return 'vlalg-input-border__text--dark'
        case 'light':
          return 'vlalg-input-border__text--light'
        default:
          return 'vlalg-input-border__text--black'
      }
    })

    const activeStyle = computed(() => {
      switch (propActiveStyle.value) {
        case 'italic':
          return 'vlalg-input-border__input--active--italic'
        case 'oblique':
          return 'vlalg-input-border__input--active--oblique'
        default:
          return 'vlalg-input-border__input--active--normal'
      }
    })

    const sizeMediaQuery = computed(() => {
      switch (propSizeMediaQuery.value) {
        case 'sm':
          return 'vlalg-input-border__sm'
        case 'md':
          return 'vlalg-input-border__md'
        case 'lg':
          return 'vlalg-input-border__lg'
        default:
          return ''
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-input-border__theme--primary'
        case 'success':
          return 'vlalg-input-border__theme--success'
        case 'info':
          return 'vlalg-input-border__theme--info'
        case 'danger':
          return 'vlalg-input-border__theme--danger'
        case 'warn':
          return 'vlalg-input-border__theme--warn'
        case 'dark':
          return 'vlalg-input-border__theme--dark'
        case 'light':
          return 'vlalg-input-border__theme--light'
        default:
          return 'vlalg-input-border__theme--normal'
      }
    })

    const isDisabled = computed(() => {
      switch (propDisabled.value) {
        case true:
          return 'vlalg-input-border__input--disabled'
        default:
          return ''
      }
    })

    const readOnly = computed(() => {
      switch (propReadonly.value) {
        case true:
          return 'vlalg-input-border__input--read-only'
        default:
          return ''
      }
    })

    const uppercase = computed(() => {
      switch (propUppercase.value) {
        case true:
          return 'vlalg-input-border__input--uppercase'
        default:
          return ''
      }
    })

    const borderRadius = computed(() => {
      return {
        'border-radius': propBorderRadius.value,
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
      if (currentType.value === 'password') return 'vlalg-input-border__eye-default--hidden'

      return ''
    })

    const activeInput = computed(() => {
      if (isActive.value) return 'base-input__border--active'

      return 'base-input__border--no-active'
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
      inputValue,
      currentType,
      isActive,
      size,
      textColor,
      activeStyle,
      sizeMediaQuery,
      theme,
      isDisabled,
      readOnly,
      uppercase,
      borderRadius,
      validShowEye,
      inputIcon,
      hiddenDefaultEye,
      activeInput,
      changeShowValue,
    }
  },
})
</script>

<style lang="scss" scoped>
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

  .vlalg-input-border {
    position: relative;
    margin: 0;
    padding: 0;
    height: 28px;
    max-height: 28px;
    display: inline-block;

    // inicio propSizeMediaQuery
    &.vlalg-input-border__sm {
      height: 38px;
      max-height: 38px;

      .vlalg-input-border__eye {
        padding: 5px 10px;
      }

      .vlalg-input-border__input {
        font-size: 1.2em;
      }
    }
    &.vlalg-input-border__md {
      height: 48px;
      max-height: 48px;

      .vlalg-input-border__eye {
        padding: 10px 10px;
      }

      .vlalg-input-border__input {
        font-size: 1.6em;
      }
    }
    &.vlalg-input-border__lg {
      height: 58px;
      max-height: 58px;

      .vlalg-input-border__eye {
        padding: 17px 10px;
      }

      .vlalg-input-border__input {
        font-size: 2em;
      }
    }
    // fim propSizeMediaQuery

    .vlalg-input-border__eye {
      // inicio propTextColor
      &.vlalg-input-border__text--black {
        color: #000000;
      }
      &.vlalg-input-border__text--white {
        color: #ffffff;
      }
      &.vlalg-input-border__text--dark {
        color: #353734;
      }
      &.vlalg-input-border__text--light {
        color: rgba(#f8f8f2, 0.7);
      }
      // fim propTextColor
    }

    .vlalg-input-border__input {
      // inicio propTextColor
      &.vlalg-input-border__text--black {
        color: #000000;
      }
      &.vlalg-input-border__text--white {
        color: #ffffff;
      }
      &.vlalg-input-border__text--dark {
        color: #353734;
      }
      &.vlalg-input-border__text--light {
        color: rgba(#f8f8f2, 0.7);
      }
      // fim propTextColor
    }

    // inicio propTheme
    &.vlalg-input-border__theme--normal {
      &.vlalg-input-border__input--disabled,
      &.vlalg-input-border__input--read-only {
        .vlalg-input-border__eye {
          background-color: rgba(#353734, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input-border__input {
          background-color: transparent;
          border: 1px solid rgba(#353734, 0.3);
          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid rgba(#353734, 0.3);
          }
        }
      }

      .vlalg-input-border__eye {
        background-color: rgba(#353734, 0.2);

        &.base-input__border--active {
          background-color: rgba(#353734, 0.3);
        }

        &.base-input__border--no-active {
          background-color: rgba(#353734, 0.2);
        }
      }

      .vlalg-input-border__input {
        background-color: transparent;
        border: 1px solid rgba(#353734, 0.2);

        &:focus,
        &:active {
          background-color: transparent;
          border: 1px solid rgba(#353734, 0.3);
        }
      }
    }
    &.vlalg-input-border__theme--primary {
      &.vlalg-input-border__input--disabled,
      &.vlalg-input-border__input--read-only {
        .vlalg-input-border__eye {
          background-color: rgba(#f15574, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input-border__input {
          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid #f15574;
          }
        }
      }

      .vlalg-input-border__eye {
        background-color: #f15574;

        &.base-input__border--active {
          background-color: #cf1137;
        }

        &.base-input__border--no-active {
          background-color: #f15574;
        }
      }

      .vlalg-input-border__input {
        background-color: transparent;
        border: 1px solid #f15574;

        &:focus,
        &:active {
          background-color: transparent;
          border: 1px solid #cf1137;
        }
      }
    }
    &.vlalg-input-border__theme--success {
      &.vlalg-input-border__input--disabled,
      &.vlalg-input-border__input--read-only {
        .vlalg-input-border__eye {
          background-color: rgba(#2ecc71, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input-border__input {
          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid #2ecc71;
          }
        }
      }

      .vlalg-input-border__eye {
        background-color: #2ecc71;

        &.base-input__border--active {
          background-color: #27ae60;
        }

        &.base-input__border--no-active {
          background-color: #2ecc71;
        }
      }

      .vlalg-input-border__input {
        background-color: transparent;
        border: 1px solid #2ecc71;

        &:focus,
        &:active {
          color: #353734;
          background-color: transparent;
          border: 1px solid #27ae60;
        }
      }
    }
    &.vlalg-input-border__theme--danger {
      &.vlalg-input-border__input--disabled,
      &.vlalg-input-border__input--read-only {
        .vlalg-input-border__eye {
          background-color: rgba(#e74c3c, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input-border__input {
          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid #e74c3c;
          }
        }
      }

      .vlalg-input-border__eye {
        background-color: #e74c3c;

        &.base-input__border--active {
          background-color: #c0392b;
        }

        &.base-input__border--no-active {
          background-color: #e74c3c;
        }
      }

      .vlalg-input-border__input {
        background-color: transparent;
        border: 1px solid #e74c3c;

        &:focus,
        &:active {
          background-color: transparent;
          border: 1px solid #c0392b;
        }
      }
    }
    &.vlalg-input-border__theme--warn {
      &.vlalg-input-border__input--disabled,
      &.vlalg-input-border__input--read-only {
        .vlalg-input-border__eye {
          background-color: rgba(#f1c40f, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input-border__input {
          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid #f1c40f;
          }
        }
      }

      .vlalg-input-border__eye {
        background-color: #f1c40f;

        &.base-input__border--active {
          background-color: #c27c0e;
        }

        &.base-input__border--no-active {
          background-color: #f1c40f;
        }
      }

      .vlalg-input-border__input {
        background-color: transparent;
        border: 1px solid #f1c40f;

        &:focus,
        &:active {
          background-color: transparent;
          border: 1px solid #c27c0e;
        }
      }
    }
    &.vlalg-input-border__theme--info {
      &.vlalg-input-border__input--disabled,
      &.vlalg-input-border__input--read-only {
        .vlalg-input-border__eye {
          background-color: rgba(#3498db, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input-border__input {
          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid #3498db;
          }
        }
      }

      .vlalg-input-border__eye {
        background-color: #3498db;

        &.base-input__border--active {
          background-color: #2980b9;
        }

        &.base-input__border--no-active {
          background-color: #3498db;
        }
      }

      .vlalg-input-border__input {
        background-color: transparent;
        border: 1px solid #3498db;

        &:focus,
        &:active {
          background-color: transparent;
          border: 1px solid #2980b9;
        }
      }
    }
    &.vlalg-input-border__theme--dark {
      &.vlalg-input-border__input--disabled,
      &.vlalg-input-border__input--read-only {
        .vlalg-input-border__eye {
          background-color: rgba(#44475a, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input-border__input {
          background-color: transparent;
          border: 1px solid #44475a;
          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid #44475a;

            &::placeholder,
            &::placeholder:active,
            &::placeholder:focus {
              background-color: transparent;
            }
          }

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            background-color: transparent;
          }
        }
      }

      .vlalg-input-border__eye {
        background-color: #44475a;

        &.base-input__border--active {
          background-color: rgba(#44475a, 0.4);
        }

        &.base-input__border--no-active {
          background-color: #44475a;
        }
      }

      .vlalg-input-border__input {
        background-color: transparent;
        border: 1px solid #44475a;

        &:focus,
        &:active {
          background-color: transparent;
          border: 1px solid rgba(#44475a, 0.4);
        }
      }
    }
    &.vlalg-input-border__theme--light {
      &.vlalg-input-border__input--disabled,
      &.vlalg-input-border__input--read-only {
        .vlalg-input-border__eye {
          background-color: rgba(#353734, 0.3);

          &:hover {
            cursor: not-allowed;
          }
        }

        .vlalg-input-border__input {
          background-color: transparent;
          border: 1px solid rgba(#353734, 0.3);
          &:focus,
          &:active {
            background-color: transparent;
            border: 1px solid rgba(#353734, 0.3);
            color: rgba(#44475a, 0.5);
          }
        }
      }

      .vlalg-input-border__eye {
        background-color: rgba(#353734, 0.2);

        &.base-input__border--active {
          background-color: rgba(#353734, 0.3);
        }

        &.base-input__border--no-active {
          background-color: rgba(#353734, 0.2);
        }
      }

      .vlalg-input-border__input {
        background-color: transparent;
        border: 1px solid rgba(#353734, 0.2);

        &:focus,
        &:active {
          background-color: transparent;
          border: 1px solid rgba(#353734, 0.3);
        }
      }
    }
    // fim propTheme

    // inicio propDisabled
    &.vlalg-input-border__input--disabled {
      .vlalg-input-border__input {
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
    &.vlalg-input-border__input--read-only {
      .vlalg-input-border__input {
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

    .vlalg-input-border__eye {
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

      .vlalg-input-border__eye-icon {
        font-family: 'FontAwesome';
      }
    }

    // inicio INPUT
    .vlalg-input-border__input {
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

      &.vlalg-input-border__eye-default--hidden {
        &::-ms-reveal,
        &::-ms-clear {
          display: none;
        }
      }

      // inicio propActiveStyle
      &.vlalg-input-border__input--active--italic:focus,
      &.vlalg-input-border__input--active--italic:active {
        font-style: italic;
      }
      &.vlalg-input-border__input--active--oblique:focus,
      &.vlalg-input-border__input--active--oblique:active {
        font-style: oblique;
      }
      &.vlalg-input-border__input--active--normal:focus,
      &.vlalg-input-border__input--active--normal:active {
        font-style: normal;
      }
      // fim propActiveStyle

      // inicio propUppercase
      &.vlalg-input-border__input--uppercase {
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
