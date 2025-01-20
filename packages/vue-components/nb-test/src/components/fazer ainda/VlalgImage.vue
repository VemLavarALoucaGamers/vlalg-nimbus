<template>
  <div
    :id="propId"
    class="vlalg-image"
    :style="[display]"
  >
    <a
      v-if="propActionType === 'link'"
      :href="propActionLink"
      :target="propActionTarget"
    >
      <img
        :src="propSrc"
        class="vlalg-image__image vlalg-image__image--action"
        :alt="propAlt"
        :class="imageClass"
        :style="imageStyle"
      />
    </a>

    <a
      v-else-if="propActionType === 'routerLink'"
      :to="propRouterLinkToName"
      @click.prevent="routerLinkTo"
    >
      <img
        :src="propSrc"
        class="vlalg-image__image vlalg-image__image--action"
        :alt="propAlt"
        :class="imageClass"
        :style="imageStyle"
      />
    </a>

    <img
      v-else-if="propActionType === 'func'"
      :alt="propAlt"
      :src="propSrc"
      class="vlalg-image__image vlalg-image__image--action"
      :class="imageClass"
      :style="imageStyle"
      @click="imageClicked"
    />

    <img
      v-else
      :src="propSrc"
      class="vlalg-image__image"
      :alt="propAlt"
      :class="imageClass"
      :style="imageStyle"
    />
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'VlalgImage',
  components: {},
  emits: ['vlalg-image-clicked'],
  props: {
    propId: {
      type: String,
      default: '',
      required: true,
      validator: value => {
        if (!value) return false
        return true
      },
    },
    propSrc: {
      type: String,
      default: '',
      required: true,
    },
    propDisplay: {
      type: String,
      default: 'inlineBlock',
      validator: value => {
        return ['inlineBlock', 'inline', 'block'].indexOf(value) !== -1
      },
    },
    propImageType: {
      type: String,
      default: 'none',
      validator: value => {
        return ['none', 'rounded', 'circle'].indexOf(value) !== -1
      },
    },
    propBorder: {
      type: Number,
      default: 0,
    },
    propTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propSize: {
      type: String,
      default: '100x100',
      validator: value => {
        if (value && value.indexOf('x') === -1) return false
        return true
      },
    },
    propSizeType: {
      type: String,
      default: 'pixel',
      validator: value => {
        return ['pixel', 'percent', 'responsive'].indexOf(value) !== -1
      },
    },
    propActionType: {
      type: String,
      default: 'none',
      validator: value => {
        return ['none', 'link', 'func', 'routerLink'].indexOf(value) !== -1
      },
    },
    propActionLink: {
      type: String,
      default: '',
    },
    propActionTarget: {
      type: String,
      default: 'blank',
      validator: value => {
        return ['blank', 'self', 'parent', 'top'].indexOf(value) !== -1
      },
    },
    propRouterLinkToName: {
      type: String,
      default: '',
    },
    propRouterLinkObject: {
      type: Object,
      default: () => {
        return {}
      },
    },
    propAlt: {
      type: String,
      default: 'Default VlalgImage Alt',
    },
  },
  setup (props, context) {
    /* MIXINS */

    /* VUE I18N */

    /* VUE META */

    /* VUE ROUTER */
    const router = useRouter() // Mesmo que this.$router
    const route = useRoute() // Mesmo que this.$route

    /* VUEX (Mesmo que this.$store) */

    /* FUNCTIONS */

    /* LIFECYCLE */

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const {
      propSizeType,
      propDisplay,
      propImageType,
      propBorder,
      propTheme,
      propSize,
      propId,
      propRouterLinkToName,
      propRouterLinkObject,
    } = toRefs(props)

    /* DATA */

    /* COMPUTED */
    const display = computed(() => {
      let currentDisplay = ''

      if (propSizeType.value === 'responsive') {
        currentDisplay = 'block'
      } else {
        switch (propDisplay.value) {
          case 'block':
            currentDisplay = 'block'
            break
          case 'inline':
            currentDisplay = 'inline'
            break
          default:
            currentDisplay = 'inline-block'
            break
        }
      }

      return {
        display: currentDisplay,
      }
    })

    const imageType = computed(() => {
      switch (propImageType.value) {
        case 'rounded':
          return 'vlalg-image__image--type-rounded'
        case 'circle':
          return 'vlalg-image__image--type-circle'
        default:
          return 'vlalg-image__image--type-none'
      }
    })

    const border = computed(() => {
      const currentBorder = propBorder.value

      return {
        'border-width': `${currentBorder}px`,
        'border-style': 'solid',
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-image__theme--primary'
        case 'success':
          return 'vlalg-image__theme--success'
        case 'info':
          return 'vlalg-image__theme--info'
        case 'danger':
          return 'vlalg-image__theme--danger'
        case 'warn':
          return 'vlalg-image__theme--warn'
        case 'dark':
          return 'vlalg-image__theme--dark'
        case 'light':
          return 'vlalg-image__theme--light'
        default:
          return 'vlalg-image__theme--normal'
      }
    })

    const size = computed(() => {
      const splitSize = propSize.value.split('x')
      let type = 'px'
      let objReturn = {}

      if (propSizeType.value === 'percent') type = '%'

      if (propSizeType.value === 'responsive') {
        objReturn = {
          width: '100%',
          height: 'auto',
        }
      } else {
        objReturn = {
          width: `${splitSize[0]}${type}`,
          height: `${splitSize[1]}${type}`,
        }
      }

      return objReturn
    })

    const imageClass = computed(() => {
      return [imageType.value, theme.value]
    })

    const imageStyle = computed(() => {
      return [size.value, border.value]
    })

    /* METHODS */
    const imageClicked = () => {
      context.emit('vlalg-image-clicked', {
        id: propId.value,
        status: true,
      })
    }

    const routerLinkTo = () => {
      const currentRoute = route.name

      if (!propRouterLinkToName.value || propRouterLinkToName.value === currentRoute) return

      const newObj = {
        name: propRouterLinkToName.value,
        ...propRouterLinkObject.value,
      }

      router.push(newObj)
    }

    /* WATCH */

    return {
      display,
      imageType,
      border,
      theme,
      size,
      imageClass,
      imageStyle,
      imageClicked,
      routerLinkTo,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-image {
    .vlalg-image__image {
      border: 0;

      // inicio propImageType
      &.vlalg-image__image--type-rounded {
        border-radius: 6px;
      }
      &.vlalg-image__image--type-circle {
        border-radius: 50%;
      }
      &.vlalg-image__image--type-none {
        border-radius: 0;
      }
      // fim propImageType

      // inicio propTheme
      &.vlalg-image__theme--normal {
        border-color: #f8f8f2;
      }
      &.vlalg-image__theme--primary {
        border-color: #f15574;
      }
      &.vlalg-image__theme--success {
        border-color: #2ecc71;
      }
      &.vlalg-image__theme--info {
        border-color: #3498db;
      }
      &.vlalg-image__theme--warn {
        border-color: #f1c40f;
      }
      &.vlalg-image__theme--danger {
        border-color: #e74c3c;
      }
      &.vlalg-image__theme--dark {
        border-color: #353734;
      }
      &.vlalg-image__theme--light {
        border-color: #f8f8f2;
      }
      // fim propTheme

      // fim propActionType
      &.vlalg-image__image--action {
        &:hover {
          cursor: pointer;
        }
      }
      // fim propActionType
    }
  }
</style>
