<template>
  <div
    :id="propId"
    class="vlalg-emphasi"
    :class="[theme]"
    :style="[uppercase]"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'VlalgEmphasi',
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
          return 'vlalg-emphasi__theme--primary'
        case 'success':
          return 'vlalg-emphasi__theme--success'
        case 'info':
          return 'vlalg-emphasi__theme--info'
        case 'danger':
          return 'vlalg-emphasi__theme--danger'
        case 'warn':
          return 'vlalg-emphasi__theme--warn'
        case 'dark':
          return 'vlalg-emphasi__theme--dark'
        case 'light':
          return 'vlalg-emphasi__theme--light'
        default:
          return 'vlalg-emphasi__theme--normal'
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
  .vlalg-emphasi {
    position: relative;
    display: inline-block;

    // inicio propTheme
    &.vlalg-emphasi__theme--normal {
      color: #f8f8f2;
    }
    &.vlalg-emphasi__theme--primary {
      color: #f15574;
    }
    &.vlalg-emphasi__theme--success {
      color: #2ecc71;
    }
    &.vlalg-emphasi__theme--info {
      color: #3498db;
    }
    &.vlalg-emphasi__theme--warn {
      color: #f1c40f;
    }
    &.vlalg-emphasi__theme--danger {
      color: #e74c3c;
    }
    &.vlalg-emphasi__theme--dark {
      color: #353734;
    }
    &.vlalg-emphasi__theme--light {
      color: #f8f8f2;
    }
    // fim propTheme
  }
</style>
