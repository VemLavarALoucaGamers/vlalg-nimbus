<template>
  <div
    :id="propId"
    class="vlalg-hr"
  >
    <hr
      class="vlalg-hr__hr"
      :class="[theme]"
      :style="[size, borderStyle]"
    />
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'VlalgHr',
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
    propHeight: {
      type: String,
      default: '1px',
    },
    propBorderStyle: {
      type: String,
      default: 'solid',
      validator: value => {
        return ['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset'].indexOf(value) !== -1
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
    const { propHeight, propBorderStyle, propTheme } = toRefs(props)

    /* DATA */

    /* COMPUTED */
    const size = computed(() => {
      return { 'border-width': propHeight.value }
    })

    const borderStyle = computed(() => {
      return { 'border-style': propBorderStyle.value }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-hr__theme--primary'
        case 'success':
          return 'vlalg-hr__theme--success'
        case 'info':
          return 'vlalg-hr__theme--info'
        case 'danger':
          return 'vlalg-hr__theme--danger'
        case 'warn':
          return 'vlalg-hr__theme--warn'
        case 'dark':
          return 'vlalg-hr__theme--dark'
        case 'light':
          return 'vlalg-hr__theme--light'
        default:
          return 'vlalg-hr__theme--normal'
      }
    })

    /* METHODS */

    /* WATCH */

    return {
      size,
      borderStyle,
      theme,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-hr {
    .vlalg-hr__hr {
      display: block;
      margin-top: 0.5em;
      margin-bottom: 0.5em;
      margin-left: auto;
      margin-right: auto;

      // inicio propTheme
      &.vlalg-hr__theme--normal {
        border-color: #f8f8f2;
      }
      &.vlalg-hr__theme--primary {
        border-color: #f15574;
      }
      &.vlalg-hr__theme--success {
        border-color: #2ecc71;
      }
      &.vlalg-hr__theme--info {
        border-color: #3498db;
      }
      &.vlalg-hr__theme--warn {
        border-color: #f1c40f;
      }
      &.vlalg-hr__theme--danger {
        border-color: #e74c3c;
      }
      &.vlalg-hr__theme--dark {
        border-color: #353734;
      }
      &.vlalg-hr__theme--light {
        border-color: #f8f8f2;
      }
      // fim propTheme
    }
  }
</style>
