<template>
  <div
    :id="propId"
    class="vlalg-progress-bar"
    :class="[theme]"
    :style="[height]"
  >
    <div
      v-if="propHasMessage"
      class="vlalg-progress-bar__percent"
      :style="[height, percentSize]"
    >
      {{ formatMessage }}
    </div>
    <progress
      :max="propMaxValue"
      :value="propCurrentValue"
      class="vlalg-progress-bar__progress"
      :style="[height]"
    ></progress>
  </div>
</template>

<script>
import { defineComponent, toRefs, ref, computed, watch } from 'vue'

export default defineComponent({
  name: 'VlalgProgressBar',
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
    propCurrentValue: {
      type: Number,
      default: 0,
    },
    propMaxValue: {
      type: Number,
      default: 100,
    },
    propHeight: {
      type: Number,
      default: 10,
    },
    propHasMessage: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propMessageType: {
      type: String,
      default: 'percent',
      validator: value => {
        return ['percent', 'startEnd'].indexOf(value) !== -1
      },
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
    const { propHeight, propMessageType, propCurrentValue, propMaxValue, propTheme } = toRefs(props)

    /* DATA */
    const currentHeight = ref(propHeight.value)

    /* COMPUTED */
    const formatMessage = computed(() => {
      const type = propMessageType.value

      if (type === 'percent') return `${propCurrentValue.value}%`

      return `${propCurrentValue.value}/${propMaxValue.value}`
    })

    const height = computed(() => {
      return {
        height: `${currentHeight.value}px`,
        'max-height': `${currentHeight.value}px`,
      }
    })

    const percentSize = computed(() => {
      let size = '0.0'

      switch (currentHeight.value) {
        case 11:
          size = '0.55'
          break
        case 12:
          size = '0.56'
          break
        case 13:
          size = '0.6'
          break
        case 14:
          size = '0.65'
          break
        case 15:
          size = '0.7'
          break
        case 16:
          size = '0.75'
          break
        case 17:
          size = '0.8'
          break
        case 18:
          size = '0.85'
          break
        case 19:
          size = '0.9'
          break
        case 20:
          size = '0.95'
          break
        default:
          size = '0.5'
          break
      }

      return {
        'font-size': `${size}em`,
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-progress-bar__theme--primary'
        case 'success':
          return 'vlalg-progress-bar__theme--success'
        case 'info':
          return 'vlalg-progress-bar__theme--info'
        case 'danger':
          return 'vlalg-progress-bar__theme--danger'
        case 'warn':
          return 'vlalg-progress-bar__theme--warn'
        case 'dark':
          return 'vlalg-progress-bar__theme--dark'
        case 'light':
          return 'vlalg-progress-bar__theme--light'
        default:
          return 'vlalg-progress-bar__theme--normal'
      }
    })

    /* METHODS */

    /* WATCH */
    watch(propHeight, value => {
      if (typeof value !== 'number') {
        currentHeight.value = 10
      } else {
        if (value >= 10 && value <= 20) {
          currentHeight.value = value
        } else if (value < 10) {
          currentHeight.value = 10
        } else {
          currentHeight.value = 20
        }
      }
    })

    return {
      formatMessage,
      height,
      percentSize,
      theme,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-progress-bar {
    position: relative;
    display: inline-block;
    width: 100%;
    overflow: hidden;

    // inicio propTheme
    &.vlalg-progress-bar__theme--normal {
      .vlalg-progress-bar__percent {
        color: #000000;
      }

      progress[value].vlalg-progress-bar__progress {
        color: #f8f8f2;

        &::-webkit-progress-bar {
          background-color: #f8f8f2;
        }
        &::-moz-progress-bar {
          background-color: #f8f8f2;
        }

        &::-webkit-progress-value {
          background-color: #7f8c8d;
        }
      }
    }
    &.vlalg-progress-bar__theme--primary {
      .vlalg-progress-bar__percent {
        color: #fff;
      }

      progress[value].vlalg-progress-bar__progress {
        color: #f15574;

        &::-webkit-progress-bar {
          background-color: #f15574;
        }
        &::-moz-progress-bar {
          background-color: #f15574;
        }

        &::-webkit-progress-value {
          background-color: #cf1137;
        }
      }
    }
    &.vlalg-progress-bar__theme--success {
      .vlalg-progress-bar__percent {
        color: #fff;
      }

      progress[value].vlalg-progress-bar__progress {
        color: #2ecc71;

        &::-webkit-progress-bar {
          background-color: #2ecc71;
        }
        &::-moz-progress-bar {
          background-color: #2ecc71;
        }

        &::-webkit-progress-value {
          background-color: #27ae60;
        }
      }
    }
    &.vlalg-progress-bar__theme--danger {
      .vlalg-progress-bar__percent {
        color: #fff;
      }

      progress[value].vlalg-progress-bar__progress {
        color: #e74c3c;

        &::-webkit-progress-bar {
          background-color: #e74c3c;
        }
        &::-moz-progress-bar {
          background-color: #e74c3c;
        }

        &::-webkit-progress-value {
          background-color: #c0392b;
        }
      }
    }
    &.vlalg-progress-bar__theme--warn {
      .vlalg-progress-bar__percent {
        color: #fff;
      }

      progress[value].vlalg-progress-bar__progress {
        color: #f1c40f;

        &::-webkit-progress-bar {
          background-color: #f1c40f;
        }
        &::-moz-progress-bar {
          background-color: #f1c40f;
        }

        &::-webkit-progress-value {
          background-color: #c27c0e;
        }
      }
    }
    &.vlalg-progress-bar__theme--info {
      .vlalg-progress-bar__percent {
        color: #fff;
      }

      progress[value].vlalg-progress-bar__progress {
        color: #3498db;

        &::-webkit-progress-bar {
          background-color: #3498db;
        }
        &::-moz-progress-bar {
          background-color: #3498db;
        }

        &::-webkit-progress-value {
          background-color: #2980b9;
        }
      }
    }
    &.vlalg-progress-bar__theme--dark {
      .vlalg-progress-bar__percent {
        color: #fff;
      }

      progress[value].vlalg-progress-bar__progress {
        color: #44475a;

        &::-webkit-progress-bar {
          background-color: #44475a;
        }
        &::-moz-progress-bar {
          background-color: #44475a;
        }

        &::-webkit-progress-value {
          background-color: #272936;
        }
      }
    }
    &.vlalg-progress-bar__theme--light {
      .vlalg-progress-bar__percent {
        color: #000000;
      }

      progress[value].vlalg-progress-bar__progress {
        color: #f8f8f2;

        &::-webkit-progress-bar {
          background-color: #f8f8f2;
        }
        &::-moz-progress-bar {
          background-color: #f8f8f2;
        }

        &::-webkit-progress-value {
          background-color: #7f8c8d;
        }
      }
    }
    // fim propTheme

    .vlalg-progress-bar__percent {
      position: absolute;
      background-color: transparent;
      left: 0;
      right: 0;
      z-index: 5;
      text-align: center;
    }

    progress[value].vlalg-progress-bar__progress {
      position: absolute;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      border: none;
      background-size: auto;
      width: 100%;
      margin: 0;
      box-shadow: none;

      &::-webkit-progress-bar {
        border-radius: 50px;
        overflow: hidden;
      }
      &::-moz-progress-bar {
        border-radius: 50px;
      }

      &::-webkit-progress-value {
        border-radius: 50px;
      }
    }
  }
</style>
