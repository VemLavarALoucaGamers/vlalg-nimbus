<template>
  <div :id="propId">
    <div
      v-if="!propWithSlot && hasItens"
      class="vlalg-accordions"
      :class="[theme, sizeMediaQuery]"
    >
      <div
        v-for="(accordionItem, index) in propItems"
        :key="index"
        class="vlalg-accordions__accordion"
      >
        <button
          class="vlalg-accordions__accordion--button"
          :class="[
            itemsOpened.includes(index) ? 'vlalg-accordions__accordion--button-active' : '',
            uppercase,
            bold,
            italic,
          ]"
          @click="openAccordion(index)"
        >
          <span v-if="itemsOpened.includes(index)">-</span>
          <span v-else>+</span>
          {{ accordionItem.title }}
        </button>

        <div
          class="vlalg-accordions__accordion--panel"
          :class="[itemsOpened.includes(index) ? 'vlalg-accordions__accordion--panel-active' : '']"
        >
          <p>{{ accordionItem.text }}</p>
        </div>
      </div>
    </div>

    <div
      v-else-if="propWithSlot && propSlotTitles"
      class="vlalg-accordions"
      :class="[theme, sizeMediaQuery]"
    >
      <div
        v-for="(title, index) in propSlotTitles"
        :key="index"
        class="vlalg-accordions__accordion"
      >
        <button
          class="vlalg-accordions__accordion--button"
          :class="[
            itemsOpened.includes(index) ? 'vlalg-accordions__accordion--button-active' : '',
            uppercase,
            bold,
            italic,
          ]"
          @click="openAccordion(index)"
        >
          <span v-if="itemsOpened.includes(index)">-</span>
          <span v-else>+</span>
          {{ title }}
        </button>

        <div
          class="vlalg-accordions__accordion--panel"
          :class="[itemsOpened.includes(index) ? 'vlalg-accordions__accordion--panel-active' : '']"
        >
          <slot :name="index"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, computed } from 'vue'

export default defineComponent({
  name: 'VlalgAccordion',
  components: {},
  emits: [],
  props: {
    propId: {
      type: String,
      required: true,
      default: '',
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
      validator: value => {
        return value
      },
    },
    propWithSlot: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propSlotTitles: {
      type: Array,
      default: () => {
        return []
      },
      validator: value => {
        return value
      },
    },
    propTabUppercase: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propTabItalic: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propTabBold: {
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
    propSizeMediaQuery: {
      type: String,
      default: 'xs',
      validator: value => {
        return ['xs', 'sm', 'md', 'lg'].indexOf(value) !== -1
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
    const { propItems, propTabUppercase, propTabItalic, propTabBold, propTheme, propSizeMediaQuery } = toRefs(props)

    /* DATA */
    const itemsOpened = ref([])

    /* COMPUTED */
    const hasItens = computed(() => {
      return propItems.value ? propItems.value.length : 0
    })
    const uppercase = computed(() => {
      if (!propTabUppercase.value) return 'vlalg-accordions__transform--uppercase-none'

      return 'vlalg-accordions__transform--uppercase'
    })
    const italic = computed(() => {
      if (!propTabItalic.value) return 'vlalg-accordions__style--italic-none'

      return 'vlalg-accordions__style--italic'
    })
    const bold = computed(() => {
      if (!propTabBold.value) return 'vlalg-accordions__bold--none'

      return 'vlalg-accordions__bold'
    })
    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-accordion__theme--primary'
        case 'success':
          return 'vlalg-accordion__theme--success'
        case 'info':
          return 'vlalg-accordion__theme--info'
        case 'danger':
          return 'vlalg-accordion__theme--danger'
        case 'warn':
          return 'vlalg-accordion__theme--warn'
        case 'dark':
          return 'vlalg-accordion__theme--dark'
        case 'light':
          return 'vlalg-accordion__theme--light'
        default:
          return 'vlalg-accordion__theme--normal'
      }
    })
    const sizeMediaQuery = computed(() => {
      switch (propSizeMediaQuery.value) {
        case 'sm':
          return 'vlalg-accordion__sm'
        case 'md':
          return 'vlalg-accordion__md'
        case 'lg':
          return 'vlalg-accordion__lg'
        default:
          return ''
      }
    })

    /* METHODS */
    const openAccordion = index => {
      const openedList = itemsOpened.value

      if (openedList.includes(index)) {
        const currentIndex = openedList.indexOf(index)
        itemsOpened.value.splice(currentIndex, 1)
      } else {
        itemsOpened.value.push(index)
      }
    }

    /* WATCH */

    return {
      itemsOpened,
      hasItens,
      uppercase,
      italic,
      bold,
      theme,
      sizeMediaQuery,
      openAccordion,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-accordions {
    // inicio propSizeMediaQuery
    &.vlalg-accordion__sm {
      .vlalg-accordions__accordion {
        .vlalg-accordions__accordion--button {
          padding: 8px 16px;
          font-size: 1.2em;
        }
      }
    }
    &.vlalg-accordion__md {
      .vlalg-accordions__accordion {
        .vlalg-accordions__accordion--button {
          padding: 9px 16px;
          font-size: 1.6em;
        }
      }
    }
    &.vlalg-accordion__lg {
      .vlalg-accordions__accordion {
        .vlalg-accordions__accordion--button {
          padding: 10px 16px;
          font-size: 2em;
        }
      }
    }
    // fim propSizeMediaQuery

    // inicio propTheme
    &.vlalg-accordion__theme--normal {
      .vlalg-accordions__accordion {
        .vlalg-accordions__accordion--button {
          background-color: #f8f8f2;
          color: #8e8e8e;

          &:hover {
            background-color: #eaeaea;
          }

          &.vlalg-accordions__accordion--button-active {
            &:hover {
              background-color: #f8f8f2;
            }
          }
        }

        .vlalg-accordions__accordion--panel {
          background-color: #eaeaea;
          color: #8e8e8e;
        }
      }
    }
    &.vlalg-accordion__theme--primary {
      .vlalg-accordions__accordion {
        .vlalg-accordions__accordion--button {
          background-color: #f15574;
          color: #fff;

          &:hover {
            background-color: #cf1137;
          }

          &.vlalg-accordions__accordion--button-active {
            &:hover {
              background-color: #f15574;
            }
          }
        }

        .vlalg-accordions__accordion--panel {
          background-color: #cf1137;
          color: #fff;
        }
      }
    }
    &.vlalg-accordion__theme--success {
      .vlalg-accordions__accordion {
        .vlalg-accordions__accordion--button {
          background-color: #2ecc71;
          color: #fff;

          &:hover {
            background-color: #27ae60;
          }

          &.vlalg-accordions__accordion--button-active {
            &:hover {
              background-color: #2ecc71;
            }
          }
        }

        .vlalg-accordions__accordion--panel {
          background-color: #27ae60;
          color: #fff;
        }
      }
    }
    &.vlalg-accordion__theme--info {
      .vlalg-accordions__accordion {
        .vlalg-accordions__accordion--button {
          background-color: #3498db;
          color: #fff;

          &:hover {
            background-color: #2980b9;
          }

          &.vlalg-accordions__accordion--button-active {
            &:hover {
              background-color: #3498db;
            }
          }
        }

        .vlalg-accordions__accordion--panel {
          background-color: #2980b9;
          color: #fff;
        }
      }
    }
    &.vlalg-accordion__theme--warn {
      .vlalg-accordions__accordion {
        .vlalg-accordions__accordion--button {
          background-color: #f1c40f;
          color: #fff;

          &:hover {
            background-color: #c27c0e;
          }

          &.vlalg-accordions__accordion--button-active {
            &:hover {
              background-color: #f1c40f;
            }
          }
        }

        .vlalg-accordions__accordion--panel {
          background-color: #c27c0e;
          color: #fff;
        }
      }
    }
    &.vlalg-accordion__theme--danger {
      .vlalg-accordions__accordion {
        .vlalg-accordions__accordion--button {
          background-color: #e74c3c;
          color: #fff;

          &:hover {
            background-color: #c0392b;
          }

          &.vlalg-accordions__accordion--button-active {
            &:hover {
              background-color: #e74c3c;
            }
          }
        }

        .vlalg-accordions__accordion--panel {
          background-color: #c0392b;
          color: #fff;
        }
      }
    }
    &.vlalg-accordion__theme--dark {
      .vlalg-accordions__accordion {
        .vlalg-accordions__accordion--button {
          background-color: #44475a;
          color: #f8f8f2;

          &:hover {
            background-color: rgba(#282a36, 1);
            color: #f8f8f2;
          }

          &.vlalg-accordions__accordion--button-active {
            &:hover {
              background-color: #44475a;
              color: #f8f8f2;
            }
          }
        }

        .vlalg-accordions__accordion--panel {
          background-color: rgba(#282a36, 1);
          color: #f8f8f2;
        }
      }
    }
    &.vlalg-accordion__theme--light {
      .vlalg-accordions__accordion {
        .vlalg-accordions__accordion--button {
          background-color: #f8f8f2;
          color: #8e8e8e;

          &:hover {
            background-color: #eaeaea;
          }

          &.vlalg-accordions__accordion--button-active {
            &:hover {
              background-color: #f8f8f2;
            }
          }
        }

        .vlalg-accordions__accordion--panel {
          background-color: #eaeaea;
          color: #8e8e8e;
        }
      }
    }
    // fim propTheme

    .vlalg-accordions__accordion {
      .vlalg-accordions__accordion--button {
        cursor: pointer;
        padding: 4px 8px;
        font-size: 1em;
        width: 100%;
        text-align: left;
        border: none;
        outline: none;

        // inicio propTabUppercase
        &.vlalg-accordions__transform--uppercase-none {
          text-transform: capitalize;
        }
        &.vlalg-accordions__transform--uppercase {
          text-transform: uppercase;
        }
        // fim propTabUppercase

        // inicio propTabItalic
        &.vlalg-accordions__style--italic-none {
          font-style: normal;
        }
        &.vlalg-accordions__style--italic {
          font-style: italic;
        }
        // fim propTabItalic

        // inicio propTabBold
        &.vlalg-accordions__bold-none {
          font-weight: normal;
        }
        &.vlalg-accordions__bold {
          font-weight: 700;
        }
        // fim propTabBold
      }

      .vlalg-accordions__accordion--panel {
        padding: 10px 18px 15px 18px;
        overflow: hidden;
        display: none;

        &.vlalg-accordions__accordion--panel-active {
          display: block;
        }
      }
    }
  }
</style>
