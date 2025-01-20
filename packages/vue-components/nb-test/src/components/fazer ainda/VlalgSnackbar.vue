<template>
  <div
    v-if="showComponent"
    :id="propId"
    class="vlalg-snackbar"
    :class="[theme, visibility, borderRadius]"
    :style="[borderRadius]"
  >
    {{ propText }}
  </div>
</template>

<script>
import { defineComponent, toRefs, computed, watch, ref } from 'vue'

export default defineComponent({
  name: 'VlalgSnackbar',
  components: {},
  emits: ['remove-snackbar'],
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
    propIsVisible: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propText: {
      type: String,
      default: '',
      required: true,
    },
    propBorderRadius: {
      type: String,
      default: '0',
    },
    propTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
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
    const { propId, propIsVisible, propText, propBorderRadius, propTheme } = toRefs(props)

    /* DATA */
    const timer = ref(3000)

    /* COMPUTED */
    const showComponent = computed(() => {
      if (propIsVisible.value && propText.value) return true
      return false
    })

    const borderRadius = computed(() => {
      return {
        'border-radius': propBorderRadius.value,
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-snackbar__theme--primary'
        case 'success':
          return 'vlalg-snackbar__theme--success'
        case 'info':
          return 'vlalg-snackbar__theme--info'
        case 'danger':
          return 'vlalg-snackbar__theme--danger'
        case 'warn':
          return 'vlalg-snackbar__theme--warn'
        case 'dark':
          return 'vlalg-snackbar__theme--dark'
        case 'light':
          return 'vlalg-snackbar__theme--light'
        default:
          return 'vlalg-snackbar__theme--normal'
      }
    })

    const visibility = computed(() => {
      if (propIsVisible.value) return 'vlalg-snackbar__visibility-visible'

      return ''
    })

    /* METHODS */

    /* WATCH */
    watch(propIsVisible, value => {
      if (value) {
        setTimeout(() => {
          context.emit('remove-snackbar', `snackbar-id-${propId.value}`)
        }, timer.value)
      }
    })

    return {
      showComponent,
      borderRadius,
      theme,
      visibility,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-snackbar {
    min-width: 100px;
    max-width: 300px;
    text-align: center;
    padding: 16px;
    position: fixed;
    z-index: 10000000;
    left: 10px;
    right: 10px;
    bottom: 30px;
    overflow: hidden;
    margin: 5% auto;
    margin-bottom: 0;
    color: #fff;
    visibility: hidden;

    &.vlalg-snackbar__visibility-visible {
      visibility: visible;
      animation: vlalg-snackbar__visibility-fadein 0.5s, vlalg-snackbar__visibility-fadeout 0.6s 2.5s;
    }
    @keyframes vlalg-snackbar__visibility-fadein {
      from {
        bottom: 0;
        opacity: 0;
      }
      to {
        bottom: 30px;
        opacity: 1;
      }
    }
    @keyframes vlalg-snackbar__visibility-fadeout {
      from {
        bottom: 30px;
        opacity: 1;
      }
      to {
        bottom: 0;
        opacity: 0;
      }
    }

    // inicio propTheme
    &.vlalg-snackbar__theme--normal {
      background-color: #f8f8f2;
      color: #8e8e8e;
    }
    &.vlalg-snackbar__theme--primary {
      background-color: #f15574;
      color: #fff;
    }
    &.vlalg-snackbar__theme--success {
      background-color: #2ecc71;
      color: #fff;
    }
    &.vlalg-snackbar__theme--info {
      background-color: #3498db;
      color: #fff;
    }
    &.vlalg-snackbar__theme--warn {
      background-color: #f1c40f;
      color: #fff;
    }
    &.vlalg-snackbar__theme--danger {
      background-color: #e74c3c;
      color: #fff;
    }
    &.vlalg-snackbar__theme--dark {
      background-color: #353734;
      color: #f8f8f2;
    }
    &.vlalg-snackbar__theme--light {
      background-color: #f8f8f2;
      color: #8e8e8e;
    }
    // fim propTheme
  }
</style>
