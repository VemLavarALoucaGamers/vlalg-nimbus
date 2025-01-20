<template>
  <div
    v-if="propItems"
    :id="propId"
    class="vlalg-checkbox"
    :class="[isDisabled]"
  >
    <div
      v-for="(item, index) in propItems"
      :key="index"
      class="vlalg-checkbox__item"
      :class="[display, direction, theme]"
    >
      <input
        :id="`${propId}-${item.value}`"
        v-model="currentValue"
        type="checkbox"
        class="vlalg-checkbox__item--input"
        :disabled="propDisabled"
        :value="item.value"
        :name="propGroupName"
      />
      <label
        :for="`${propId}-${item.value}`"
        class="vlalg-checkbox__item--label"
        :class="[textColor, type]"
      >
        {{ item.text }}
      </label>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'VlalgCheckbox',
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
        return value.toLowerCase()
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
      type: Array,
      default: () => {
        return []
      },
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
    propType: {
      type: String,
      default: 'box',
      validator: value => {
        return ['box', 'circle'].indexOf(value) !== -1
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
    const { propDisplay, propDirection, propTheme, propTextColor, propDisabled, propType, propValue } = toRefs(props)

    /* DATA */
    const currentValue = ref([])

    /* COMPUTED */
    const display = computed(() => {
      switch (propDisplay.value) {
        case 'inline':
          return 'vlalg-checkbox__item--display-inline'
        default:
          return 'vlalg-checkbox__item--display-block'
      }
    })

    const direction = computed(() => {
      switch (propDirection.value) {
        case 'right':
          return 'vlalg-checkbox__item--direction-right'
        default:
          return 'vlalg-checkbox__item--direction-left'
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-checkbox__theme--primary'
        case 'success':
          return 'vlalg-checkbox__theme--success'
        case 'info':
          return 'vlalg-checkbox__theme--info'
        case 'danger':
          return 'vlalg-checkbox__theme--danger'
        case 'warn':
          return 'vlalg-checkbox__theme--warn'
        case 'dark':
          return 'vlalg-checkbox__theme--dark'
        case 'light':
          return 'vlalg-checkbox__theme--light'
        default:
          return 'vlalg-checkbox__theme--normal'
      }
    })

    const textColor = computed(() => {
      switch (propTextColor.value) {
        case 'white':
          return 'vlalg-checkbox__text--white'
        case 'dark':
          return 'vlalg-checkbox__text--dark'
        case 'light':
          return 'vlalg-checkbox__text--light'
        default:
          return 'vlalg-checkbox__text--black'
      }
    })

    const isDisabled = computed(() => {
      switch (propDisabled.value) {
        case true:
          return 'vlalg-checkbox__input--disabled'
        default:
          return ''
      }
    })

    const type = computed(() => {
      switch (propType.value) {
        case 'circle':
          return 'vlalg-checkbox__input--type-circle'
        default:
          return ''
      }
    })

    /* METHODS */
    const startValue = () => {
      currentValue.value = propValue.value
    }

    startValue()

    /* WATCH */
    watch(currentValue, () => {
      context.emit('current-value', currentValue.value)
    })

    return {
      currentValue,
      display,
      direction,
      theme,
      textColor,
      isDisabled,
      type,
    }
  },
})
</script>

<style lang="scss" scoped>
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

  .vlalg-checkbox {
    display: inline-block;

    // inicio propDisabled
    &.vlalg-checkbox__input--disabled {
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

    .vlalg-checkbox__item {
      .vlalg-checkbox__item--input {
        display: none;

        &:checked {
          & + .vlalg-checkbox__item--label {
            &:before {
              content: '\f00c';
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

      .vlalg-checkbox__item--label {
        &:hover {
          cursor: pointer;
        }

        // inicio propTextColor
        &.vlalg-checkbox__text--black {
          color: #000000;
        }
        &.vlalg-checkbox__text--white {
          color: #ffffff;
        }
        &.vlalg-checkbox__text--dark {
          color: #353734;
        }
        &.vlalg-checkbox__text--light {
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
          text-shadow: 0;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
        }

        // inicio propType
        &.vlalg-checkbox__input--type-circle {
          &:before {
            border: 0;
            border-radius: 50%;
          }
        }
        // fim propType
      }

      // inicio propDisplay
      &.vlalg-checkbox__item--display-block {
        display: block;

        &:not(:first-child) {
          margin-top: 10px;
        }

        .vlalg-checkbox__item--label {
          display: block;
          font-family: inherit;
          font-size: inherit;
          font-style: normal;
          line-height: 20px;
          position: relative;
        }
      }
      &.vlalg-checkbox__item--display-inline {
        display: inline-block;

        &:not(:first-child) {
          margin-left: 10px;
        }

        .vlalg-checkbox__item--label {
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
      &.vlalg-checkbox__item--direction-right {
        .vlalg-checkbox__item--label {
          padding: 0 26px 0 6px;

          &:before {
            right: 0;
          }
        }
      }
      &.vlalg-checkbox__item--direction-left {
        .vlalg-checkbox__item--label {
          padding: 0 6px 0 26px;

          &:before {
            left: 0;
          }
        }
      }
      // fim propDirection

      // inicio propTheme
      &.vlalg-checkbox__theme--normal {
        .vlalg-checkbox__item--input {
          &:checked {
            & + .vlalg-checkbox__item--label {
              &:before {
                color: #7f8c8d;
              }
            }
          }
        }

        .vlalg-checkbox__item--label {
          &:before {
            background-color: #f8f8f2;
          }
        }
      }
      &.vlalg-checkbox__theme--primary {
        .vlalg-checkbox__item--input {
          &:checked {
            & + .vlalg-checkbox__item--label {
              &:before {
                color: #cf1137;
              }
            }
          }
        }

        .vlalg-checkbox__item--label {
          &:before {
            background-color: #f15574;
          }
        }
      }
      &.vlalg-checkbox__theme--success {
        .vlalg-checkbox__item--input {
          &:checked {
            & + .vlalg-checkbox__item--label {
              &:before {
                color: #27ae60;
              }
            }
          }
        }

        .vlalg-checkbox__item--label {
          &:before {
            background-color: #2ecc71;
          }
        }
      }
      &.vlalg-checkbox__theme--info {
        .vlalg-checkbox__item--input {
          &:checked {
            & + .vlalg-checkbox__item--label {
              &:before {
                color: #2980b9;
              }
            }
          }
        }

        .vlalg-checkbox__item--label {
          &:before {
            background-color: #3498db;
          }
        }
      }
      &.vlalg-checkbox__theme--warn {
        .vlalg-checkbox__item--input {
          &:checked {
            & + .vlalg-checkbox__item--label {
              &:before {
                color: #c27c0e;
              }
            }
          }
        }

        .vlalg-checkbox__item--label {
          &:before {
            background-color: #f1c40f;
          }
        }
      }
      &.vlalg-checkbox__theme--danger {
        .vlalg-checkbox__item--input {
          &:checked {
            & + .vlalg-checkbox__item--label {
              &:before {
                color: #c0392b;
              }
            }
          }
        }

        .vlalg-checkbox__item--label {
          &:before {
            background-color: #e74c3c;
          }
        }
      }
      &.vlalg-checkbox__theme--dark {
        .vlalg-checkbox__item--input {
          &:checked {
            & + .vlalg-checkbox__item--label {
              &:before {
                color: #272936;
              }
            }
          }
        }

        .vlalg-checkbox__item--label {
          &:before {
            background-color: #44475a;
          }
        }
      }
      &.vlalg-checkbox__theme--light {
        .vlalg-checkbox__item--input {
          &:checked {
            & + .vlalg-checkbox__item--label {
              &:before {
                color: #7f8c8d;
              }
            }
          }
        }

        .vlalg-checkbox__item--label {
          &:before {
            background-color: #f8f8f2;
          }
        }
      }
      // fim propTheme
    }
  }
</style>
