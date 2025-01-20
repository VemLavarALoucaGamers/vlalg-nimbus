<template>
  <div
    v-if="propHasNewContent"
    class="vlalg-new-content-service-worker"
  >
    <p class="vlalg-new-content-service-worker__text">
      {{ propText }}
    </p>

    <a
      class="vlalg-new-content-service-worker__button"
      @click.prevent="refreshApp"
    >
      {{ propButtonText }}
    </a>
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'VlalgNewContentServiceWorker',
  components: {},
  emits: ['close-vlalg-new-content-service-worker'],
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
    propText: {
      type: String,
      default: 'New version available!',
    },
    propButtonText: {
      type: String,
      default: 'Click to update',
    },
    propHasNewContent: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propRegistrationServiceWorkerContent: {
      type: Function,
      default: () => {
        return null
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
    const { propRegistrationServiceWorkerContent } = toRefs(props)

    /* DATA */

    /* COMPUTED */

    /* METHODS */
    const refreshApp = () => {
      const registration = propRegistrationServiceWorkerContent.value

      context.emit('close-vlalg-new-content-service-worker', false)

      if (!registration || !registration.waiting) return

      registration.waiting.postMessage('skipWaiting')
    }

    /* WATCH */

    return {
      refreshApp,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-new-content-service-worker {
    max-width: 316px;
    width: 316px;
    position: fixed;
    top: 50px;
    left: 50%;
    z-index: 1000000000;
    padding: 10px;
    margin-left: -158px;
    color: #fff;
    text-align: center;
    font-weight: 800;
    background-color: #f15574;

    .vlalg-new-content-service-worker__text {
      color: #ffffff;
    }

    .vlalg-new-content-service-worker__button {
      color: #72f258;

      &:focus,
      &:hover {
        color: #31d310;
        cursor: pointer;
        text-decoration: none;
      }
    }
  }
</style>
