<template>
  <div
    v-if="propItems"
    :id="propId"
    class="vlalg-radio"
    :class="[isDisabled]"
  >
    <div
      v-for="(item, index) in propItems"
      :key="index"
      class="vlalg-radio__item"
      :class="[display, direction, theme]"
    >
      <input
        :id="`${propId}-${item.value}`"
        v-model="currentValue"
        type="radio"
        class="vlalg-radio__item--input"
        :disabled="propDisabled"
        :value="item.value"
        :name="propGroupName"
      />
      <label
        :for="`${propId}-${item.value}`"
        class="vlalg-radio__item--label"
        :class="[textColor]"
      >
        {{ item.text }}
      </label>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'VlalgRadio',
  components: {},
  emits: ['current-value'],
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
    propGroupName: {
      type: String,
      default: '',
      required: true,
      validator: value => {
        return value.toString().toLowerCase()
      },
    },
    propItems: {
      type: Array,
      required: true,
      default: () => {
        return []
      },
      validator: item => {
        if (!item.length) return false

        let hasError = false

        for (const obj of item) {
          const objkeys = Object.keys(obj)

          if (objkeys.length !== 2) hasError = true

          const result = objkeys.every(key => {
            const keys = ['value', 'text']

            return keys.includes(key)
          })

          if (!result) hasError = true
        }

        if (!hasError) return item
      },
    },
    propValue: {
      type: String,
      default: null,
    },
    propDisplay: {
      type: String,
      default: 'block',
      validator: value => {
        return ['block', 'inline'].indexOf(value) !== -1
      },
    },
    propDirection: {
      type: String,
      default: 'left',
      validator: value => {
        return ['left', 'right'].indexOf(value) !== -1
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
    propDisabled: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
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

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const { propDisplay, propDirection, propTheme, propTextColor, propDisabled, propValue } = toRefs(props)

    /* DATA */
    const currentValue = ref(null)

    /* COMPUTED */
    const display = computed(() => {
      switch (propDisplay.value) {
        case 'inline':
          return 'vlalg-radio__item--display-inline'
        default:
          return 'vlalg-radio__item--display-block'
      }
    })

    const direction = computed(() => {
      switch (propDirection.value) {
        case 'right':
          return 'vlalg-radio__item--direction-right'
        default:
          return 'vlalg-radio__item--direction-left'
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-radio__theme--primary'
        case 'success':
          return 'vlalg-radio__theme--success'
        case 'info':
          return 'vlalg-radio__theme--info'
        case 'danger':
          return 'vlalg-radio__theme--danger'
        case 'warn':
          return 'vlalg-radio__theme--warn'
        case 'dark':
          return 'vlalg-radio__theme--dark'
        case 'light':
          return 'vlalg-radio__theme--light'
        default:
          return 'vlalg-radio__theme--normal'
      }
    })

    const textColor = computed(() => {
      switch (propTextColor.value) {
        case 'white':
          return 'vlalg-radio__text--white'
        case 'dark':
          return 'vlalg-radio__text--dark'
        case 'light':
          return 'vlalg-radio__text--light'
        default:
          return 'vlalg-radio__text--black'
      }
    })

    const isDisabled = computed(() => {
      switch (propDisabled.value) {
        case true:
          return 'vlalg-radio__input--disabled'
        default:
          return ''
      }
    })

    /* METHODS */
    const startValue = () => {
      const initialValue = propValue.value

      currentValue.value = initialValue.toString().toLowerCase()
      context.emit('current-value', initialValue)
    }

    startValue()

    /* WATCH */
    watch(currentValue, value => {
      context.emit('current-value', value)
    })

    watch(propValue, () => {
      startValue()
    })

    return {
      display,
      direction,
      theme,
      textColor,
      isDisabled,
      currentValue,
    }
  },
})
</script>

<style lang="scss" scoped>
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

  .vlalg-radio {
    display: inline-block;

    // inicio propDisabled
    &.vlalg-radio__input--disabled {
      color: inherit;
      pointer-events: none;
      filter: alpha(opacity=50);
      -moz-opacity: 0.5;
      opacity: 0.5;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      outline: none;
    }
    // fim propDisabled

    .vlalg-radio__item {
      .vlalg-radio__item--input {
        display: none;

        &:checked {
          & + .vlalg-radio__item--label {
            &:before {
              content: '\f111';
              font-size: 0.85em;
              text-align: center;
              line-height: 20px;
              text-shadow: 0;
              -webkit-box-shadow: none;
              -moz-box-shadow: none;
              box-shadow: none;
            }
          }
        }
      }

      .vlalg-radio__item--label {
        &:hover {
          cursor: pointer;
        }

        // inicio propTextColor
        &.vlalg-radio__text--black {
          color: rgba(#000000, 1);
        }
        &.vlalg-radio__text--white {
          color: rgba(#ffffff, 1);
        }
        &.vlalg-radio__text--dark {
          color: #353734;
        }
        &.vlalg-radio__text--light {
          color: rgba(#f8f8f2, 0.7);
        }
        // fim propTextColor

        &:before {
          font-family: 'FontAwesome';
          content: '';
          width: 20px;
          height: 20px;
          position: absolute;
          bottom: 0;
          border: 0;
          border-radius: 50%;
          text-shadow: 0;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
        }
      }

      // inicio propDisplay
      &.vlalg-radio__item--display-block {
        display: block;

        &:not(:first-child) {
          margin-top: 10px;
        }

        .vlalg-radio__item--label {
          display: block;
          font-family: inherit;
          font-size: inherit;
          font-style: normal;
          line-height: 20px;
          position: relative;
        }
      }
      &.vlalg-radio__item--display-inline {
        display: inline-block;

        &:not(:first-child) {
          margin-left: 10px;
        }

        .vlalg-radio__item--label {
          display: inline-block;
          font-family: inherit;
          font-size: inherit;
          font-style: normal;
          line-height: 20px;
          position: relative;
        }
      }
      // fim propDisplay

      // inicio propDirection
      &.vlalg-radio__item--direction-right {
        .vlalg-radio__item--label {
          padding: 0 26px 0 6px;

          &:before {
            right: 0;
          }
        }
      }
      &.vlalg-radio__item--direction-left {
        .vlalg-radio__item--label {
          padding: 0 6px 0 26px;

          &:before {
            left: 0;
          }
        }
      }
      // fim propDirection

      // inicio propTheme
      &.vlalg-radio__theme--normal {
        .vlalg-radio__item--input {
          &:checked {
            & + .vlalg-radio__item--label {
              &:before {
                color: #7f8c8d;
              }
            }
          }
        }

        .vlalg-radio__item--label {
          &:before {
            background-color: #f8f8f2;
          }
        }
      }
      &.vlalg-radio__theme--primary {
        .vlalg-radio__item--input {
          &:checked {
            & + .vlalg-radio__item--label {
              &:before {
                color: #cf1137;
              }
            }
          }
        }

        .vlalg-radio__item--label {
          &:before {
            background-color: #f15574;
          }
        }
      }
      &.vlalg-radio__theme--success {
        .vlalg-radio__item--input {
          &:checked {
            & + .vlalg-radio__item--label {
              &:before {
                color: #27ae60;
              }
            }
          }
        }

        .vlalg-radio__item--label {
          &:before {
            background-color: #2ecc71;
          }
        }
      }
      &.vlalg-radio__theme--info {
        .vlalg-radio__item--input {
          &:checked {
            & + .vlalg-radio__item--label {
              &:before {
                color: #2980b9;
              }
            }
          }
        }

        .vlalg-radio__item--label {
          &:before {
            background-color: #3498db;
          }
        }
      }
      &.vlalg-radio__theme--warn {
        .vlalg-radio__item--input {
          &:checked {
            & + .vlalg-radio__item--label {
              &:before {
                color: #c27c0e;
              }
            }
          }
        }

        .vlalg-radio__item--label {
          &:before {
            background-color: #f1c40f;
          }
        }
      }
      &.vlalg-radio__theme--danger {
        .vlalg-radio__item--input {
          &:checked {
            & + .vlalg-radio__item--label {
              &:before {
                color: #c0392b;
              }
            }
          }
        }

        .vlalg-radio__item--label {
          &:before {
            background-color: #e74c3c;
          }
        }
      }
      &.vlalg-radio__theme--dark {
        .vlalg-radio__item--input {
          &:checked {
            & + .vlalg-radio__item--label {
              &:before {
                color: #272936;
              }
            }
          }
        }

        .vlalg-radio__item--label {
          &:before {
            background-color: #44475a;
          }
        }
      }
      &.vlalg-radio__theme--light {
        .vlalg-radio__item--input {
          &:checked {
            & + .vlalg-radio__item--label {
              &:before {
                color: #7f8c8d;
              }
            }
          }
        }

        .vlalg-radio__item--label {
          &:before {
            background-color: #f8f8f2;
          }
        }
      }
      // fim propTheme
    }
  }
</style>
