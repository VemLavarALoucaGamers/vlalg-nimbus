<template>
  <figure
    :id="propId"
    class="vlalg-figure"
    style="background-color: blue"
  >
    <a
      v-if="propActionType === 'link'"
      :href="propActionLink"
      :target="propActionTarget"
    >
      <img
        :src="propSrc"
        :alt="propAlt"
        class="vlalg-figure__image vlalg-figure__image--action"
        :class="imageClass"
        :style="imageStyle"
      />
    </a>

    <img
      v-else-if="propActionType === 'func'"
      :alt="propAlt"
      :src="propSrc"
      class="vlalg-figure__image vlalg-figure__image--action"
      :class="imageClass"
      :style="imageStyle"
      @click="imageClicked"
    />

    <img
      v-else
      :src="propSrc"
      class="vlalg-figure__image"
      :alt="propAlt"
      :class="imageClass"
      :style="imageStyle"
    />

    <figcaption class="vlalg-figure__caption">
      {{ propCaption }}
    </figcaption>
  </figure>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'VlalgFigure',
  components: {},
  emits: ['vlalg-figure-clicked'],
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
        return ['pixel', 'percent'].indexOf(value) !== -1
      },
    },
    propActionType: {
      type: String,
      default: 'none',
      validator: value => {
        return ['none', 'link', 'func'].indexOf(value) !== -1
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
    propCaption: {
      type: String,
      default: 'Empty Caption',
    },
    propAlt: {
      type: String,
      default: 'Default VlalgFigure Alt',
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
    const { propDisplay, propImageType, propBorder, propTheme, propSize, propSizeType, propId } = toRefs(props)

    /* DATA */

    /* COMPUTED */
    const display = computed(() => {
      let currentDisplay = ''

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

      return {
        display: currentDisplay,
      }
    })

    const imageType = computed(() => {
      switch (propImageType.value) {
        case 'rounded':
          return 'vlalg-figure__image--type-rounded'
        case 'circle':
          return 'vlalg-figure__image--type-circle'
        default:
          return 'vlalg-figure__image--type-none'
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
          return 'vlalg-figure__theme--primary'
        case 'success':
          return 'vlalg-figure__theme--success'
        case 'info':
          return 'vlalg-figure__theme--info'
        case 'danger':
          return 'vlalg-figure__theme--danger'
        case 'warn':
          return 'vlalg-figure__theme--warn'
        case 'dark':
          return 'vlalg-figure__theme--dark'
        case 'light':
          return 'vlalg-figure__theme--light'
        default:
          return 'vlalg-figure__theme--normal'
      }
    })

    const size = computed(() => {
      const splitSize = propSize.value.split('x')
      let type = 'px'

      if (propSizeType.value === 'percent') type = '%'

      return {
        width: `${splitSize[0]}${type}`,
        height: `${splitSize[1]}${type}`,
      }
    })

    const imageClass = computed(() => {
      return [imageType.value, theme.value]
    })

    const imageStyle = computed(() => {
      return [display.value, size.value, border.value]
    })

    /* METHODS */
    const imageClicked = () => {
      context.emit('vlalg-figure-clicked', {
        id: propId.value,
        status: true,
      })
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
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-figure {
    margin: 0;
    padding: 0;
    border: 0;

    .vlalg-figure__image {
      border: 0;
      vertical-align: middle;

      // inicio propImageType
      &.vlalg-figure__image--type-rounded {
        border-radius: 6px;
      }
      &.vlalg-figure__image--type-circle {
        border-radius: 50%;
      }
      &.vlalg-figure__image--type-none {
        border-radius: 0;
      }
      // fim propImageType

      // inicio propTheme
      &.vlalg-figure__theme--normal {
        border-color: #f8f8f2;
      }
      &.vlalg-figure__theme--primary {
        border-color: #f15574;
      }
      &.vlalg-figure__theme--success {
        border-color: #2ecc71;
      }
      &.vlalg-figure__theme--info {
        border-color: #3498db;
      }
      &.vlalg-figure__theme--warn {
        border-color: #f1c40f;
      }
      &.vlalg-figure__theme--danger {
        border-color: #e74c3c;
      }
      &.vlalg-figure__theme--dark {
        border-color: #353734;
      }
      &.vlalg-figure__theme--light {
        border-color: #f8f8f2;
      }
      // fim propTheme

      // fim propActionType
      &.vlalg-figure__image--action {
        &:hover {
          cursor: pointer;
        }
      }
      // fim propActionType
    }

    .vlalg-figure__caption {
      display: block;
      font-size: 1.2em;
      font-style: italic;
      text-align: center;
    }
  }
</style>
