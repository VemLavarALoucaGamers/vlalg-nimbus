<template>
  <div
    v-if="propId"
    class="vlalg-switch"
    :class="[theme, isDisabled, sizeMediaQuery]"
  >
    <div class="vlalg-switch__button">
      <input
        :id="propId"
        v-model="currentStatus"
        type="checkbox"
        :disabled="propDisabled"
        class="vlalg-switch__button--input"
      />
      <label
        :for="propId"
        class="vlalg-switch__button--label"
        :class="[
          currentStatus ? 'vlalg-switch__button--label-enable' : 'vlalg-switch__button--label-disable',
          textAnimation,
        ]"
      >
        <div class="vlalg-switch__button--label-button"></div>
        <span
          v-if="currentStatus"
          class="vlalg-switch__button--label-text"
        >
          {{ propTextEnable }}
        </span>
        <span
          v-else
          class="vlalg-switch__button--label-text"
        >
          {{ propTextDisable }}
        </span>
      </label>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'VlalgSwitch',
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
    propTextEnable: {
      type: String,
      default: 'on',
    },
    propTextDisable: {
      type: String,
      default: 'off',
    },
    propValue: {
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
    propAnimantion: {
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

    /* VUEX (Mesmo que this.$store) */

    /* FUNCTIONS */

    /* LIFECYCLE */

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const { propTheme, propAnimantion, propDisabled, propSizeMediaQuery, propValue } = toRefs(props)

    /* DATA */
    const currentStatus = ref(false)

    /* COMPUTED */
    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-switch__theme--primary'
        case 'success':
          return 'vlalg-switch__theme--success'
        case 'info':
          return 'vlalg-switch__theme--info'
        case 'danger':
          return 'vlalg-switch__theme--danger'
        case 'warn':
          return 'vlalg-switch__theme--warn'
        case 'dark':
          return 'vlalg-switch__theme--dark'
        case 'light':
          return 'vlalg-switch__theme--light'
        default:
          return 'vlalg-switch__theme--normal'
      }
    })

    const textAnimation = computed(() => {
      if (propAnimantion.value) return 'vlalg-switch__button--label-text-animation'
      return ''
    })

    const isDisabled = computed(() => {
      switch (propDisabled.value) {
        case true:
          return 'vlalg-switch__switch--disabled'
        default:
          return ''
      }
    })

    const sizeMediaQuery = computed(() => {
      switch (propSizeMediaQuery.value) {
        case 'sm':
          return 'vlalg-switch__sm'
        case 'md':
          return 'vlalg-switch__md'
        case 'lg':
          return 'vlalg-switch__lg'
        default:
          return ''
      }
    })

    /* METHODS */
    const startStatus = () => {
      const initialStatus = propValue.value

      currentStatus.value = initialStatus
      context.emit('current-value', initialStatus)
    }

    startStatus()

    /* WATCH */
    watch(currentStatus, value => {
      context.emit('current-value', value)
    })

    watch(propValue, () => {
      startStatus()
    })

    return {
      theme,
      textAnimation,
      isDisabled,
      sizeMediaQuery,
      currentStatus,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-switch {
    display: inline-block;
    width: auto;

    // inicio propSizeMediaQuery
    &.vlalg-switch__sm {
      .vlalg-switch__button {
        height: 38px;
        max-height: 38px;

        .vlalg-switch__button--label-text {
          font-size: 1.2em;
        }
      }
    }
    &.vlalg-switch__md {
      .vlalg-switch__button {
        height: 48px;
        max-height: 48px;

        .vlalg-switch__button--label-text {
          font-size: 1.6em;
        }
      }
    }
    &.vlalg-switch__lg {
      .vlalg-switch__button {
        width: 80px;
        height: 58px;
        max-height: 58px;

        .vlalg-switch__button--label-text {
          font-size: 2em;
        }
      }
    }
    // fim propSizeMediaQuery

    .vlalg-switch__button {
      width: 70px;
      height: 28px;
      float: left;
      margin: 0;
      padding: 0;
      border: 0;

      .vlalg-switch__button--input {
        display: none;
      }

      .vlalg-switch__button--label {
        display: block;
        position: relative;
        padding-top: 4px;
        height: 100%;

        // inicio propAnimation
        &.vlalg-switch__button--label-text-animation {
          .vlalg-switch__button--label-text {
            transition: all 0.2s;
          }
        }
        // fim propAnimation

        .vlalg-switch__button--label-button {
          position: absolute;
          width: 25px;
          z-index: 1;
          top: 0;
          bottom: 0;
        }

        .vlalg-switch__button--label-text {
          position: absolute;
          width: 100%;
          top: 0;
          bottom: 0;
          padding: 4px 0px;
          user-select: none;
        }

        &.vlalg-switch__button--label-enable {
          .vlalg-switch__button--label-button {
            right: 0;
          }
          .vlalg-switch__button--label-text {
            left: 0;
            text-align: left;
            padding-left: 7px;
            padding-right: 0;
          }
        }

        &.vlalg-switch__button--label-disable {
          .vlalg-switch__button--label-button {
            left: 0;
          }
          .vlalg-switch__button--label-text {
            right: 0;
            text-align: right;
            padding-left: 0;
            padding-right: 7px;
          }
        }
      }
    }

    // inicio propDisabled
    &.vlalg-switch__switch--disabled {
      // inicio propTheme
      &.vlalg-switch__theme--normal {
        .vlalg-switch__button {
          color: rgba(#44475a, 0.5);

          .vlalg-switch__button--label {
            &:hover {
              cursor: not-allowed;
            }
          }

          .vlalg-switch__button--label-button {
            background-color: rgba(#f8f8f2, 0.1);
          }

          .vlalg-switch__button--label-text {
            background-color: rgba(#eaeaea, 0.7);
          }
        }
      }
      &.vlalg-switch__theme--primary {
        .vlalg-switch__button {
          color: #353734;

          .vlalg-switch__button--label {
            &:hover {
              cursor: not-allowed;
            }
          }

          .vlalg-switch__button--label-button {
            background-color: rgba(#f15574, 0.1);
          }

          .vlalg-switch__button--label-text {
            background-color: rgba(#cf1137, 0.7);
          }
        }
      }
      &.vlalg-switch__theme--success {
        .vlalg-switch__button {
          color: #353734;

          .vlalg-switch__button--label {
            &:hover {
              cursor: not-allowed;
            }
          }

          .vlalg-switch__button--label-button {
            background-color: rgba(#2ecc71, 0.1);
          }

          .vlalg-switch__button--label-text {
            background-color: rgba(#27ae60, 0.7);
          }
        }
      }
      &.vlalg-switch__theme--info {
        .vlalg-switch__button {
          color: #353734;

          .vlalg-switch__button--label {
            &:hover {
              cursor: not-allowed;
            }
          }

          .vlalg-switch__button--label-button {
            background-color: rgba(#3498db, 0.1);
          }

          .vlalg-switch__button--label-text {
            background-color: rgba(#2980b9, 0.7);
          }
        }
      }
      &.vlalg-switch__theme--warn {
        .vlalg-switch__button {
          color: #353734;

          .vlalg-switch__button--label {
            &:hover {
              cursor: not-allowed;
            }
          }

          .vlalg-switch__button--label-button {
            background-color: rgba(#f1c40f, 0.1);
          }

          .vlalg-switch__button--label-text {
            background-color: rgba(#f1c40f, 0.7);
          }
        }
      }
      &.vlalg-switch__theme--danger {
        .vlalg-switch__button {
          color: #353734;

          .vlalg-switch__button--label {
            &:hover {
              cursor: not-allowed;
            }
          }

          .vlalg-switch__button--label-button {
            background-color: rgba(#e74c3c, 0.1);
          }

          .vlalg-switch__button--label-text {
            background-color: rgba(#c0392b, 0.7);
          }
        }
      }
      &.vlalg-switch__theme--dark {
        .vlalg-switch__button {
          color: rgba(#f8f8f2, 0.5);

          .vlalg-switch__button--label {
            &:hover {
              cursor: not-allowed;
            }
          }

          .vlalg-switch__button--label-button {
            background-color: #272936;
          }

          .vlalg-switch__button--label-text {
            background-color: #272936;
          }
        }
      }
      &.vlalg-switch__theme--light {
        .vlalg-switch__button {
          color: rgba(#44475a, 0.5);

          .vlalg-switch__button--label {
            &:hover {
              cursor: not-allowed;
            }
          }

          .vlalg-switch__button--label-button {
            background-color: rgba(#f8f8f2, 0.1);
          }

          .vlalg-switch__button--label-text {
            background-color: rgba(#eaeaea, 0.7);
          }
        }
      }
      // fim propTheme
    }
    // inicio propDisabled

    // inicio propTheme
    &.vlalg-switch__theme--normal {
      .vlalg-switch__button {
        color: #8e8e8e;

        .vlalg-switch__button--label-button {
          background-color: #eaeaea;
        }

        .vlalg-switch__button--label-text {
          background-color: #f8f8f2;
        }
      }
    }
    &.vlalg-switch__theme--primary {
      .vlalg-switch__button {
        color: #fff;

        .vlalg-switch__button--label-button {
          background-color: #cf1137;
        }

        .vlalg-switch__button--label-text {
          background-color: #f15574;
        }
      }
    }
    &.vlalg-switch__theme--success {
      .vlalg-switch__button {
        color: #fff;

        .vlalg-switch__button--label-button {
          background-color: #27ae60;
        }

        .vlalg-switch__button--label-text {
          background-color: #2ecc71;
        }
      }
    }
    &.vlalg-switch__theme--info {
      .vlalg-switch__button {
        color: #fff;

        .vlalg-switch__button--label-button {
          background-color: #2980b9;
        }

        .vlalg-switch__button--label-text {
          background-color: #3498db;
        }
      }
    }
    &.vlalg-switch__theme--warn {
      .vlalg-switch__button {
        color: #fff;

        .vlalg-switch__button--label-button {
          background-color: #c27c0e;
        }

        .vlalg-switch__button--label-text {
          background-color: #f1c40f;
        }
      }
    }
    &.vlalg-switch__theme--danger {
      .vlalg-switch__button {
        color: #fff;

        .vlalg-switch__button--label-button {
          background-color: #c0392b;
        }

        .vlalg-switch__button--label-text {
          background-color: #e74c3c;
        }
      }
    }
    &.vlalg-switch__theme--dark {
      .vlalg-switch__button {
        color: #f8f8f2;

        .vlalg-switch__button--label-button {
          background-color: #272936;
        }

        .vlalg-switch__button--label-text {
          background-color: #353734;
        }
      }
    }
    &.vlalg-switch__theme--light {
      .vlalg-switch__button {
        color: #8e8e8e;

        .vlalg-switch__button--label-button {
          background-color: #eaeaea;
        }

        .vlalg-switch__button--label-text {
          background-color: #f8f8f2;
        }
      }
    }
    // fim propTheme
  }
</style>
