<template>
  <div
    v-if="propItems"
    :id="propId"
    class="vlalg-list"
  >
    <ul
      class="vlalg-list__list"
      :class="[listStyle]"
    >
      <li
        v-for="(item, index) in propItems"
        :key="index"
        class="vlalg-list__list--items"
      >
        <span
          v-if="propHasStyle"
          class="vlalg-list__list--icon"
          :class="[theme]"
        >{{ propStyle }}</span>
        <span
          class="vlalg-list__list--item"
          :class="[textColor]"
        >{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'VlalgList',
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
    propItems: {
      type: Array,
      default: () => {
        return []
      },
      required: true,
      validator: item => {
        if (!item.length) return false

        return item
      },
    },
    propHasStyle: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propStyle: {
      type: String,
      default: '•',
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
    const { propHasStyle, propTheme, propTextColor } = toRefs(props)

    /* DATA */

    /* COMPUTED */
    const listStyle = computed(() => {
      if (!propHasStyle.value) return 'vlalg-list__list--unstyled'

      return 'vlalg-list__list--styled'
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-list__theme--primary'
        case 'success':
          return 'vlalg-list__theme--success'
        case 'info':
          return 'vlalg-list__theme--info'
        case 'danger':
          return 'vlalg-list__theme--danger'
        case 'warn':
          return 'vlalg-list__theme--warn'
        case 'dark':
          return 'vlalg-list__theme--dark'
        case 'light':
          return 'vlalg-list__theme--light'
        default:
          return 'vlalg-list__theme--normal'
      }
    })

    const textColor = computed(() => {
      switch (propTextColor.value) {
        case 'white':
          return 'vlalg-list__text--white'
        case 'dark':
          return 'vlalg-list__text--dark'
        case 'light':
          return 'vlalg-list__text--light'
        default:
          return 'vlalg-list__text--black'
      }
    })

    /* METHODS */

    /* WATCH */

    return {
      listStyle,
      theme,
      textColor,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-list {
    display: inline-block;
    position: relative;

    .vlalg-list__list {
      list-style: none;
      margin-top: 0;

      .vlalg-list__list--items {
        line-height: 1.42857143;

        .vlalg-list__list--icon {
          // inicio propTheme
          &.vlalg-list__theme--normal {
            color: #f8f8f2;
          }
          &.vlalg-list__theme--primary {
            color: #f15574;
          }
          &.vlalg-list__theme--success {
            color: #2ecc71;
          }
          &.vlalg-list__theme--danger {
            color: #e74c3c;
          }
          &.vlalg-list__theme--warn {
            color: #f1c40f;
          }
          &.vlalg-list__theme--info {
            color: #3498db;
          }
          &.vlalg-list__theme--dark {
            color: #353734;
          }
          &.vlalg-list__theme--light {
            color: #f8f8f2;
          }
          // fim propTheme
        }

        .vlalg-list__list--item {
          // inicio propTextColor
          &.vlalg-list__text--black {
            color: #000;
          }
          &.vlalg-list__text--white {
            color: #ffffff;
          }
          &.vlalg-list__text--dark {
            color: #353734;
          }
          &.vlalg-list__text--light {
            color: rgba(#f8f8f2, 0.7);
          }
          // fim propTextColor
        }
      }

      // inicio propHasStyle
      &.vlalg-list__list--unstyled {
        padding-left: 0;
      }
      &.vlalg-list__list--styled {
        .vlalg-list__list--items {
          .vlalg-list__list--item {
            padding-left: 5px;
          }
        }
      }
      // fim propHasStyle
    }
  }
</style>
