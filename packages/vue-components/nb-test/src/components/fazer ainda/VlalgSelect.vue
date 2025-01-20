<template>
  <div
    v-if="validCurrentOption"
    :id="propId"
    class="vlalg-select"
    :class="[theme, selectDisabled]"
    :style="[selectWidth]"
  >
    <div
      class="vlalg-select__selected"
      :class="[clicked ? 'vlalg-select__selected--opened' : '']"
      @click="changeClicked"
    >
      <div class="vlalg-select__selected--text">
        {{ currentOption }}
      </div>
      <div
        class="vlalg-select__selected--icon"
        :class="[clicked ? 'vlalg-select__selected--icon--opened' : '']"
      >
        <span :class="[icon]"></span>
      </div>
    </div>

    <div
      v-if="clicked"
      class="vlalg-select__items"
      :style="[heightItemList]"
      @onfocusout="closeDropdown"
    >
      <div
        v-for="(option, index) in propOptions"
        :key="index"
        :value="option.value"
        :selected="option.value === propSelectedItem"
        class="vlalg-select__item"
        :class="[option.value === propSelectedItem ? 'vlalg-select__item-selected' : '']"
        @click="selectItem(option.value)"
      >
        <span
          class="vlalg-select__item-text"
          :title="option.text"
        >{{ option.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'VlalgSelect',
  components: {},
  emits: ['change-selected'],
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
    propOptions: {
      type: Array,
      default: () => {
        return []
      },
      validator: value => {
        let validValue = true
        const valueLength = value.length

        if (!value || !valueLength) validValue = false

        if (validValue) {
          for (let i = 0; i < valueLength; i++) {
            const isObj = value[i].constructor === Object
            const isNotEmptyObj = Object.entries(value[i]).length !== 0
            const objkeys = Object.keys(value[i])
            const validObjkeys = ['value', 'text']
            const isValidObj = objkeys.every(key => validObjkeys.includes(key))

            if (
              !isObj ||
              !isNotEmptyObj ||
              !isValidObj ||
              typeof value[i].value !== 'string' ||
              typeof value[i].text !== 'string'
            )
              validValue = false
          }
        }

        return validValue
      },
    },
    propSelectedItem: {
      type: String,
      required: true,
      default: '',
      validator: value => {
        if (!value) return false
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
    propDisabled: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propWidth: {
      type: Number,
      required: true,
      default: 250,
      validator: value => {
        return typeof value === 'number' && value >= 120
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
    const { propOptions, propSelectedItem, propWidth, propDisabled, propTheme } = toRefs(props)

    /* DATA */
    const clicked = ref(false)

    /* COMPUTED */
    const icon = computed(() => {
      if (clicked.value) return 'fas fa-chevron-up'
      return 'fas fa-chevron-down'
    })

    const validCurrentOption = computed(() => {
      const options = propOptions.value
      const selectedValue = propSelectedItem.value
      const width = propWidth.value
      let idValid = false

      const optionsValues = options.map(option => {
        return option.value
      })

      if (optionsValues.includes(selectedValue) && width >= 120) idValid = true

      return idValid
    })

    const currentOption = computed(() => {
      const options = propOptions.value
      const selectedIndex = propSelectedItem.value
      let selectedText = ''

      options.forEach(option => {
        if (option.value === selectedIndex) selectedText = option.text
      })

      return selectedText
    })

    const selectDisabled = computed(() => {
      if (propDisabled.value) return 'vlalg-select--disabled'

      return ''
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-select__theme--primary'
        case 'success':
          return 'vlalg-select__theme--success'
        case 'info':
          return 'vlalg-select__theme--info'
        case 'danger':
          return 'vlalg-select__theme--danger'
        case 'warn':
          return 'vlalg-select__theme--warn'
        case 'dark':
          return 'vlalg-select__theme--dark'
        case 'light':
          return 'vlalg-select__theme--light'
        default:
          return 'vlalg-select__theme--normal'
      }
    })

    const selectWidth = computed(() => {
      return {
        width: `${propWidth.value}px`,
      }
    })

    const heightItemList = computed(() => {
      let obj = {}

      if (propOptions.value.length > 11) {
        obj = {
          'max-height': '352px',
          'overflow-y': 'scroll',
        }
      }

      return obj
    })

    /* METHODS */
    const changeClicked = () => {
      if (!propDisabled.value) clicked.value = !clicked.value
    }

    const selectItem = value => {
      changeClicked()

      context.emit('change-selected', value)
    }
    const closeDropdown = () => {
      // TODO Fazer algo quando fechar o select
    }

    /* WATCH */

    return {
      clicked,
      icon,
      validCurrentOption,
      currentOption,
      selectDisabled,
      theme,
      selectWidth,
      heightItemList,
      changeClicked,
      selectItem,
      closeDropdown,
    }
  },
})
</script>

<style lang="scss" scoped>
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

  .vlalg-select {
    position: relative;
    display: inline-block;
    height: 28px;
    vertical-align: middle;
    font-size: 1em;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &.vlalg-select--disabled {
      filter: alpha(opacity=55);
      -moz-opacity: 0.55;
      opacity: 0.55;
      outline: none;

      .vlalg-select__selected {
        &:hover {
          cursor: not-allowed;
        }
      }
    }

    // inicio theme
    &.vlalg-select__theme--normal {
      background-color: #f8f8f2;
      color: #8e8e8e;

      .vlalg-select__selected {
        background-color: #f8f8f2;
        &.vlalg-select__selected--opened {
          background-color: #eaeaea;
        }
        .vlalg-select__selected--text {
          color: #8e8e8e;
        }

        .vlalg-select__selected--icon {
          background-color: #eaeaea;
          color: #8e8e8e;
          &.vlalg-select__selected--icon--opened {
            background-color: #f8f8f2;
          }
        }
      }

      .vlalg-select__items {
        background-color: #f8f8f2;

        .vlalg-select__item {
          &:hover {
            background-color: #eaeaea;
          }

          &.vlalg-select__item-selected {
            background-color: #eaeaea;

            &:hover {
              background-color: #eaeaea;
            }
          }
        }
      }
    }
    &.vlalg-select__theme--primary {
      background-color: #f15574;
      color: #fff;

      .vlalg-select__selected {
        background-color: #f15574;
        &.vlalg-select__selected--opened {
          background-color: #cf1137;
        }
        .vlalg-select__selected--text {
          color: #fff;
        }

        .vlalg-select__selected--icon {
          background-color: #cf1137;
          color: #fff;
          &.vlalg-select__selected--icon--opened {
            background-color: #f15574;
          }
        }
      }

      .vlalg-select__items {
        background-color: #f15574;

        .vlalg-select__item {
          &:hover {
            background-color: #cf1137;
          }

          &.vlalg-select__item-selected {
            background-color: #cf1137;

            &:hover {
              background-color: #cf1137;
            }
          }
        }
      }
    }
    &.vlalg-select__theme--success {
      background-color: #2ecc71;
      color: #fff;

      .vlalg-select__selected {
        background-color: #2ecc71;
        &.vlalg-select__selected--opened {
          background-color: #27ae60;
        }
        .vlalg-select__selected--text {
          color: #fff;
        }

        .vlalg-select__selected--icon {
          background-color: #27ae60;
          color: #fff;
          &.vlalg-select__selected--icon--opened {
            background-color: #2ecc71;
          }
        }
      }

      .vlalg-select__items {
        background-color: #2ecc71;

        .vlalg-select__item {
          &:hover {
            background-color: #27ae60;
          }

          &.vlalg-select__item-selected {
            background-color: #27ae60;

            &:hover {
              background-color: #27ae60;
            }
          }
        }
      }
    }
    &.vlalg-select__theme--info {
      background-color: #3498db;
      color: #fff;

      .vlalg-select__selected {
        background-color: #3498db;
        &.vlalg-select__selected--opened {
          background-color: #2980b9;
        }
        .vlalg-select__selected--text {
          color: #fff;
        }

        .vlalg-select__selected--icon {
          background-color: #2980b9;
          color: #fff;
          &.vlalg-select__selected--icon--opened {
            background-color: #3498db;
          }
        }
      }

      .vlalg-select__items {
        background-color: #3498db;

        .vlalg-select__item {
          &:hover {
            background-color: #2980b9;
          }

          &.vlalg-select__item-selected {
            background-color: #2980b9;

            &:hover {
              background-color: #2980b9;
            }
          }
        }
      }
    }
    &.vlalg-select__theme--warn {
      background-color: #f1c40f;
      color: #fff;

      .vlalg-select__selected {
        background-color: #f1c40f;
        &.vlalg-select__selected--opened {
          background-color: #c27c0e;
        }
        .vlalg-select__selected--text {
          color: #fff;
        }

        .vlalg-select__selected--icon {
          background-color: #c27c0e;
          color: #fff;
          &.vlalg-select__selected--icon--opened {
            background-color: #f1c40f;
          }
        }
      }

      .vlalg-select__items {
        background-color: #f1c40f;

        .vlalg-select__item {
          &:hover {
            background-color: #c27c0e;
          }

          &.vlalg-select__item-selected {
            background-color: #c27c0e;

            &:hover {
              background-color: #c27c0e;
            }
          }
        }
      }
    }
    &.vlalg-select__theme--danger {
      background-color: #e74c3c;
      color: #fff;

      .vlalg-select__selected {
        background-color: #e74c3c;
        &.vlalg-select__selected--opened {
          background-color: #c0392b;
        }
        .vlalg-select__selected--text {
          color: #fff;
        }

        .vlalg-select__selected--icon {
          background-color: #c0392b;
          color: #fff;
          &.vlalg-select__selected--icon--opened {
            background-color: #e74c3c;
          }
        }
      }

      .vlalg-select__items {
        background-color: #e74c3c;

        .vlalg-select__item {
          &:hover {
            background-color: #c0392b;
          }

          &.vlalg-select__item-selected {
            background-color: #c0392b;

            &:hover {
              background-color: #c0392b;
            }
          }
        }
      }
    }
    &.vlalg-select__theme--dark {
      background-color: #44475a;
      color: #f8f8f2;

      .vlalg-select__selected {
        background-color: #44475a;
        &.vlalg-select__selected--opened {
          background-color: #282a36;
        }
        .vlalg-select__selected--text {
          color: #f8f8f2;
        }

        .vlalg-select__selected--icon {
          background-color: #282a36;
          color: #f8f8f2;
          &.vlalg-select__selected--icon--opened {
            background-color: #44475a;
          }
        }
      }

      .vlalg-select__items {
        background-color: #44475a;

        .vlalg-select__item {
          &:hover {
            background-color: #282a36;
          }

          &.vlalg-select__item-selected {
            background-color: #282a36;

            &:hover {
              background-color: #282a36;
            }
          }
        }
      }
    }
    &.vlalg-select__theme--light {
      background-color: #f8f8f2;
      color: #8e8e8e;

      .vlalg-select__selected {
        background-color: #f8f8f2;
        &.vlalg-select__selected--opened {
          background-color: #eaeaea;
        }
        .vlalg-select__selected--text {
          color: #8e8e8e;
        }

        .vlalg-select__selected--icon {
          background-color: #eaeaea;
          color: #8e8e8e;
          &.vlalg-select__selected--icon--opened {
            background-color: #f8f8f2;
          }
        }
      }

      .vlalg-select__items {
        background-color: #f8f8f2;

        .vlalg-select__item {
          &:hover {
            background-color: #eaeaea;
          }

          &.vlalg-select__item-selected {
            background-color: #eaeaea;

            &:hover {
              background-color: #eaeaea;
            }
          }
        }
      }
    }
    // fim theme

    .vlalg-select__selected {
      width: 100%;
      height: 28px;
      position: relative;
      display: inline-block;

      &:hover {
        cursor: pointer;
      }

      .vlalg-select__selected--text {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 28px;
        padding: 5px 10px 5px 10px;
        overflow: hidden;
        white-space: nowrap;
        line-height: 17px;
      }

      .vlalg-select__selected--icon {
        font-family: 'FontAwesome';
        color: #fff;
        position: absolute;
        display: inline-block;
        padding: 2px 10px 0 10px;
        right: 0;
        height: 28px;
        overflow: hidden;
        text-align: center;
      }
    }

    .vlalg-select__items {
      z-index: 30000;
      position: absolute;
      left: 0;
      right: 0;
      top: 32px;

      .vlalg-select__item {
        overflow: hidden;
        padding: 5px 10px 5px 10px;

        &:hover {
          cursor: pointer;
        }

        &.vlalg-select__item-selected {
          &:hover {
          }
        }

        .vlalg-select__item-text {
          white-space: nowrap;
        }
      }
    }
  }
</style>
