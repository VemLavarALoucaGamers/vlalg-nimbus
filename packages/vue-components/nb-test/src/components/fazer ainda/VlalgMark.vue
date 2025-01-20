<template>
  <mark
    :id="propId"
    class="vlalg-mark"
    :class="[theme]"
    :style="[uppercase]"
  >
    <slot></slot>
  </mark>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'VlalgMark',
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
    propUppercase: {
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
    const { propUppercase, propTheme } = toRefs(props)

    /* DATA */

    /* COMPUTED */
    const uppercase = computed(() => {
      if (propUppercase.value) return { 'text-transform': 'uppercase' }

      return {
        'text-transform': 'none',
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-mark__theme--primary'
        case 'success':
          return 'vlalg-mark__theme--success'
        case 'info':
          return 'vlalg-mark__theme--info'
        case 'danger':
          return 'vlalg-mark__theme--danger'
        case 'warn':
          return 'vlalg-mark__theme--warn'
        case 'dark':
          return 'vlalg-mark__theme--dark'
        case 'light':
          return 'vlalg-mark__theme--light'
        default:
          return 'vlalg-mark__theme--normal'
      }
    })

    /* METHODS */

    /* WATCH */

    return {
      uppercase,
      theme,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-mark {
    position: relative;
    display: inline-block;
    padding: 0 5px;

    // inicio propTheme
    &.vlalg-mark__theme--normal {
      color: #000000;
      background-color: #f8f8f2;
    }
    &.vlalg-mark__theme--primary {
      color: #ffffff;
      background-color: #f15574;
    }
    &.vlalg-mark__theme--success {
      color: #ffffff;
      background-color: #2ecc71;
    }
    &.vlalg-mark__theme--info {
      color: #ffffff;
      background-color: #3498db;
    }
    &.vlalg-mark__theme--warn {
      color: #ffffff;
      background-color: #f1c40f;
    }
    &.vlalg-mark__theme--danger {
      color: #ffffff;
      background-color: #e74c3c;
    }
    &.vlalg-mark__theme--dark {
      color: #ffffff;
      background-color: #353734;
    }
    &.vlalg-mark__theme--light {
      color: #000000;
      background-color: #f8f8f2;
    }
    // fim propTheme
  }
</style>
