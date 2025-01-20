<template>
  <div
    :id="propId"
    class="vlalg-record-card"
    :class="[theme]"
    @click="clicked"
  >
    {{ propData.name }}
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'VlalgRecordCard',
  components: {},
  emits: ['selected'],
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
    propData: {
      type: Object,
      required: true,
      validator: value => {
        if (Object.entries(value).length === 0) return false

        return value
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
  setup (props, context) {
    /* MIXINS */

    /* VUE I18N */
    const { t } = useI18n({
      inheritLocale: false,
      useScope: 'global',
    })

    /* VUE META */

    /* VUE ROUTER */

    /* VUEX (Mesmo que this.$store) */

    /* LIFECYCLE */

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const { propTheme } = toRefs(props)

    /* DATA */

    /* COMPUTED */
    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-record-card__theme--primary'
        case 'success':
          return 'vlalg-record-card__theme--success'
        case 'info':
          return 'vlalg-record-card__theme--info'
        case 'danger':
          return 'vlalg-record-card__theme--danger'
        case 'warn':
          return 'vlalg-record-card__theme--warn'
        case 'dark':
          return 'vlalg-record-card__theme--dark'
        case 'light':
          return 'vlalg-record-card__theme--light'
        default:
          return 'vlalg-record-card__theme--normal'
      }
    })

    /* METHODS */
    const clicked = () => {
      context.emit('selected', true)
    }

    /* WATCH */

    return {
      t,
      theme,
      clicked,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-record-card {
    position: relative;
    width: 100%;
    height: 113px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin: 0;
    font-size: 1em;
    overflow: hidden;
    font-size: 1.2em;
    overflow: hidden;
    text-transform: uppercase;
    font-weight: 900;

    &:hover {
      cursor: pointer;
      background: blue;
    }

    &.vlalg-record-card__theme--normal {
      background-color: #f8f8f2;
      color: #8e8e8e;

      &:focus,
      &:hover,
      &:active {
        color: #7f8c8d;
        background-color: #eaeaea;
      }

      &.vlalg-button__disabled {
        &:focus,
        &:hover,
        &:active {
          background-color: #f8f8f2;
          color: #8e8e8e;
        }
      }
    }
    &.vlalg-record-card__theme--primary {
      background-color: #f15574;
      color: #fff;

      &:focus,
      &:hover,
      &:active {
        color: #fff;
        background-color: #cf1137;
      }

      &.vlalg-button__disabled {
        &:focus,
        &:hover,
        &:active {
          background-color: #f15574;
          color: #fff;
        }
      }
    }
    &.vlalg-record-card__theme--success {
      background-color: #2ecc71;
      color: #fff;

      &:focus,
      &:hover,
      &:active {
        color: #fff;
        background-color: #27ae60;
      }

      &.vlalg-button__disabled {
        &:focus,
        &:hover,
        &:active {
          background-color: #2ecc71;
          color: #fff;
        }
      }
    }
    &.vlalg-record-card__theme--danger {
      background-color: #e74c3c;
      color: #fff;

      &:focus,
      &:hover,
      &:active {
        color: #fff;
        background-color: #c0392b;
      }

      &.vlalg-button__disabled {
        &:focus,
        &:hover,
        &:active {
          background-color: #e74c3c;
          color: #fff;
        }
      }
    }
    &.vlalg-record-card__theme--warn {
      background-color: #f1c40f;
      color: #fff;

      &:focus,
      &:hover,
      &:active {
        color: #fff;
        background-color: #c27c0e;
      }

      &.vlalg-button__disabled {
        &:focus,
        &:hover,
        &:active {
          background-color: #f1c40f;
          color: #fff;
        }
      }
    }
    &.vlalg-record-card__theme--info {
      background-color: #3498db;
      color: #fff;

      &:focus,
      &:hover,
      &:active {
        color: #fff;
        background-color: #2980b9;
      }

      &.vlalg-button__disabled {
        &:focus,
        &:hover,
        &:active {
          background-color: #3498db;
          color: #fff;
        }
      }
    }
    &.vlalg-record-card__theme--dark {
      background-color: #353734;
      color: #f8f8f2;

      &:focus,
      &:hover,
      &:active {
        color: #f8f8f2;
        background-color: #272936;
      }

      &.vlalg-button__disabled {
        &:focus,
        &:hover,
        &:active {
          background-color: #353734;
          color: #f8f8f2;
        }
      }
    }
    &.vlalg-record-card__theme--light {
      background-color: #f8f8f2;
      color: #8e8e8e;

      &:focus,
      &:hover,
      &:active {
        color: #7f8c8d;
        background-color: #eaeaea;
      }

      &.vlalg-button__disabled {
        &:focus,
        &:hover,
        &:active {
          background-color: #f8f8f2;
          color: #8e8e8e;
        }
      }
    }
  }
</style>
