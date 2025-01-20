<template>
  <blockquote
    :id="propId"
    :cite="propCite"
    class="vlalg-blockquote"
    :class="[direction, theme, textColor]"
  >
    <div class="vlalg-blockquote__content">
      <slot name="content"></slot>
    </div>

    <div
      v-if="propAuthor"
      class="vlalg-blockquote__author"
      :class="[authorUppercase, authorItalic, authorBold]"
    >
      {{ propAuthor }}
    </div>
  </blockquote>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'VlalgBlockquote',
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
    propDirection: {
      type: String,
      default: 'left',
      validator: value => {
        return ['left', 'center', 'right'].indexOf(value) !== -1
      },
    },
    propCite: {
      type: String,
      default: '',
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
    propAuthor: {
      type: String,
      default: '',
    },
    propAuthorUppercase: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propAuthorItalic: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propAuthorBold: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
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
    const { propDirection, propTheme, propTextColor, propAuthorUppercase, propAuthorItalic, propAuthorBold } =
      toRefs(props)

    /* DATA */

    /* COMPUTED */
    const direction = computed(() => {
      switch (propDirection.value) {
        case 'center':
          return 'vlalg-blockquote__text--center'
        case 'right':
          return 'vlalg-blockquote__text--right'
        default:
          return 'vlalg-blockquote__text--left'
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-blockquote__theme--primary'
        case 'success':
          return 'vlalg-blockquote__theme--success'
        case 'info':
          return 'vlalg-blockquote__theme--info'
        case 'danger':
          return 'vlalg-blockquote__theme--danger'
        case 'warn':
          return 'vlalg-blockquote__theme--warn'
        case 'dark':
          return 'vlalg-blockquote__theme--dark'
        case 'light':
          return 'vlalg-blockquote__theme--light'
        default:
          return 'vlalg-blockquote__theme--normal'
      }
    })

    const textColor = computed(() => {
      switch (propTextColor.value) {
        case 'white':
          return 'vlalg-blockquote__text--white'
        case 'dark':
          return 'vlalg-blockquote__text--dark'
        case 'light':
          return 'vlalg-blockquote__text--light'
        default:
          return 'vlalg-blockquote__text--black'
      }
    })

    const authorUppercase = computed(() => {
      if (!propAuthorUppercase.value) return 'vlalg-blockquote__author--uppercase-none'

      return 'vlalg-blockquote__author--uppercase'
    })

    const authorItalic = computed(() => {
      if (!propAuthorItalic.value) return 'vlalg-blockquote__author--italic-none'

      return 'vlalg-blockquote__author--italic'
    })

    const authorBold = computed(() => {
      if (!propAuthorBold.value) return 'vlalg-blockquote__author--bold-none'

      return 'vlalg-blockquote__author--bold'
    })

    /* METHODS */

    /* WATCH */

    return {
      direction,
      theme,
      textColor,
      authorUppercase,
      authorItalic,
      authorBold,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-blockquote {
    display: block;
    padding: 10px;
    margin: 0 0 20px;
    font-size: inherit;
    font-style: italic;

    // Inicio propDirection
    &.vlalg-blockquote__text--left {
      text-align: left;

      .vlalg-blockquote__author {
        &::before {
          content: '\2014\00a0';
        }
        &::after {
          content: '';
        }
      }
    }
    &.vlalg-blockquote__text--center {
      text-align: center;

      // inicio propTheme
      &.vlalg-blockquote__theme--normal {
        border-left: 5px solid #f8f8f2;
        border-right: 5px solid #f8f8f2;
      }
      &.vlalg-blockquote__theme--primary {
        border-left: 5px solid #f15574;
        border-right: 5px solid #f15574;
      }
      &.vlalg-blockquote__theme--success {
        border-left: 5px solid #2ecc71;
        border-right: 5px solid #2ecc71;
      }
      &.vlalg-blockquote__theme--danger {
        border-left: 5px solid #e74c3c;
        border-right: 5px solid #e74c3c;
      }
      &.vlalg-blockquote__theme--warn {
        border-left: 5px solid #f1c40f;
        border-right: 5px solid #f1c40f;
      }
      &.vlalg-blockquote__theme--info {
        border-left: 5px solid #3498db;
        border-right: 5px solid #3498db;
      }
      &.vlalg-blockquote__theme--dark {
        border-left: 5px solid #353734;
        border-right: 5px solid #353734;
      }
      &.vlalg-blockquote__theme--light {
        border-left: 5px solid #f8f8f2;
        border-right: 5px solid #f8f8f2;
      }

      .vlalg-blockquote__author {
        &::before {
          content: '\2014\00a0';
        }
        &::after {
          content: '\2014\00a0';
        }
      }
    }
    &.vlalg-blockquote__text--right {
      text-align: right;

      // inicio propTheme
      &.vlalg-blockquote__theme--normal {
        border-left: none;
        border-right: 5px solid #f8f8f2;
      }
      &.vlalg-blockquote__theme--primary {
        border-left: none;
        border-right: 5px solid #f15574;
      }
      &.vlalg-blockquote__theme--success {
        border-left: none;
        border-right: 5px solid #2ecc71;
      }
      &.vlalg-blockquote__theme--danger {
        border-left: none;
        border-right: 5px solid #e74c3c;
      }
      &.vlalg-blockquote__theme--warn {
        border-left: none;
        border-right: 5px solid #f1c40f;
      }
      &.vlalg-blockquote__theme--info {
        border-left: none;
        border-right: 5px solid #3498db;
      }
      &.vlalg-blockquote__theme--dark {
        border-left: none;
        border-right: 5px solid #353734;
      }
      &.vlalg-blockquote__theme--light {
        border-left: none;
        border-right: 5px solid #f8f8f2;
      }
      // fim propTheme

      .vlalg-blockquote__author {
        &::before {
          content: '';
        }
        &::after {
          content: '\2014\00a0';
          margin-left: 3px !important;
        }
      }
    }
    // Fim propDirection

    // inicio propTheme
    &.vlalg-blockquote__theme--normal {
      border-left: 5px solid #f8f8f2;
    }
    &.vlalg-blockquote__theme--primary {
      border-left: 5px solid #f15574;
    }
    &.vlalg-blockquote__theme--success {
      border-left: 5px solid #2ecc71;
    }
    &.vlalg-blockquote__theme--danger {
      border-left: 5px solid #e74c3c;
    }
    &.vlalg-blockquote__theme--warn {
      border-left: 5px solid #f1c40f;
    }
    &.vlalg-blockquote__theme--info {
      border-left: 5px solid #3498db;
    }
    &.vlalg-blockquote__theme--dark {
      border-left: 5px solid #353734;
    }
    &.vlalg-blockquote__theme--light {
      border-left: 5px solid #f8f8f2;
    }
    // fim propTheme

    // inicio propTextColor
    &.vlalg-blockquote__text--black {
      color: #000;

      .vlalg-blockquote__author {
        color: #000;
      }
    }
    &.vlalg-blockquote__text--white {
      color: #ffffff;

      .vlalg-blockquote__author {
        color: #ffffff;
      }
    }
    &.vlalg-blockquote__text--dark {
      color: #353734;

      .vlalg-blockquote__author {
        color: #353734;
      }
    }
    &.vlalg-blockquote__text--light {
      color: rgba(#f8f8f2, 0.7);

      .vlalg-blockquote__author {
        color: rgba(#f8f8f2, 0.7);
      }
    }
    // fim propTextColor

    .vlalg-blockquote__content {
      p,
      ul,
      ol {
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    // inicio propAuthor
    .vlalg-blockquote__author {
      display: block;
      font-size: 90%;
      line-height: 1.42857143;
      margin-top: 7px;

      &::before,
      &::after {
        content: '\00a0\2014';
      }

      // inicio propAuthorUppercase
      &.vlalg-blockquote__author--uppercase-none {
        text-transform: none;
      }
      &.vlalg-blockquote__author--uppercase {
        text-transform: uppercase;
        font-size: 0.85em;
        &.vlalg-blockquote__author--bold {
          font-size: 0.85em;
        }
      }
      // fim propAuthorUppercase

      // inicio propAuthorItalic
      &.vlalg-blockquote__author--italic-none {
        font-style: normal;
      }
      &.vlalg-blockquote__author--italic {
        font-style: italic;
      }
      // fim propAuthorItalic

      // inicio propAuthorBold
      &.vlalg-blockquote__author--bold-none {
        font-weight: normal;
      }
      &.vlalg-blockquote__author--bold {
        font-size: 1em;
        font-weight: 700;

        &::before,
        &::after {
          font-weight: 700;
        }
      }
      // fim propAuthorBold
    }
    // fim propAuthor
  }
</style>
