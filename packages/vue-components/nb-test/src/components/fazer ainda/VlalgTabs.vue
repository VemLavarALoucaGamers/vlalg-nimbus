<template>
  <div :id="propId">
    <div
      v-if="!propWithSlot && hasItens"
      class="vlalg-tabs"
      :class="[theme, sizeMediaQuery]"
    >
      <div class="vlalg-tabs__titles">
        <button
          v-for="(title, index) in tabsTitles"
          :key="index"
          class="vlalg-tabs__buttons"
          :class="[uppercase, italic, bold, index === currentClicked ? 'vlalg-tabs__buttons--active' : '']"
          @click="openTab(index, title)"
        >
          {{ title }}
        </button>
      </div>

      <div
        class="vlalg-tabs__texts"
        :class="[fadeIn]"
      >
        <p
          v-for="(text, index) in tabsTexts"
          :key="index"
          class="vlalg-tabs__text"
          :class="[index === currentClicked ? 'vlalg-tabs__text--display-block' : 'vlalg-tabs__text--display-none']"
        >
          {{ text }}
        </p>
      </div>
    </div>

    <div
      v-else-if="propWithSlot && propSlotTitles"
      class="vlalg-tabs"
      :class="[theme, sizeMediaQuery]"
    >
      <div>
        <div class="vlalg-tabs__titles">
          <button
            v-for="(title, index) in propSlotTitles"
            :key="index"
            class="vlalg-tabs__buttons"
            :class="[uppercase, italic, bold, index === currentClicked ? 'vlalg-tabs__buttons--active' : '']"
            @click="openTab(index, title)"
          >
            {{ title }}
          </button>
        </div>

        <div
          class="vlalg-tabs__texts"
          :class="[fadeIn]"
        >
          <div
            v-for="(title, index) in propSlotTitles"
            :key="index"
            class="vlalg-tabs__text"
            :class="[index === currentClicked ? 'vlalg-tabs__text--display-block' : 'vlalg-tabs__text--display-none']"
          >
            <slot :name="index"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, computed } from 'vue'

export default defineComponent({
  name: 'VlalgTabs',
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
      validator: value => {
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
    propFadeIn: {
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
    propWithSlot: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
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
    const {
      propItems,
      propSlotTitles,
      propFadeIn,
      propTabUppercase,
      propTabItalic,
      propTabBold,
      propTheme,
      propSizeMediaQuery,
    } = toRefs(props)

    /* DATA */
    const currentClicked = ref(0)

    /* COMPUTED */
    const hasItens = computed(() => {
      return propItems.value.length
    })

    const tabsTitles = computed(() => {
      const items = propItems.value || propSlotTitles.value
      const titles = items.map(item => item.title.toLowerCase())

      return titles
    })

    const tabsTexts = computed(() => {
      const items = propItems.value
      const texts = items.map(item => item.text)

      return texts
    })

    const fadeIn = computed(() => {
      switch (propFadeIn.value) {
        case true:
          return 'vlalg-tabs__texts--animation-fade-in'
        default:
          return 'vlalg-tabs__texts--animation-none'
      }
    })

    const uppercase = computed(() => {
      if (!propTabUppercase.value) return 'vlalg-tabs__transform--uppercase-none'

      return 'vlalg-tabs__transform--uppercase'
    })

    const italic = computed(() => {
      if (!propTabItalic.value) return 'vlalg-tabs__style--italic-none'

      return 'vlalg-tabs__style--italic'
    })

    const bold = computed(() => {
      if (!propTabBold.value) return 'vlalg-tabs__bold--none'

      return 'vlalg-tabs__bold'
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-tabs__theme--primary'
        case 'success':
          return 'vlalg-tabs__theme--success'
        case 'info':
          return 'vlalg-tabs__theme--info'
        case 'danger':
          return 'vlalg-tabs__theme--danger'
        case 'warn':
          return 'vlalg-tabs__theme--warn'
        case 'dark':
          return 'vlalg-tabs__theme--dark'
        case 'light':
          return 'vlalg-tabs__theme--light'
        default:
          return 'vlalg-tabs__theme--normal'
      }
    })

    const sizeMediaQuery = computed(() => {
      switch (propSizeMediaQuery.value) {
        case 'sm':
          return 'vlalg-tabs__sm'
        case 'md':
          return 'vlalg-tabs__md'
        case 'lg':
          return 'vlalg-tabs__lg'
        default:
          return ''
      }
    })

    /* METHODS */
    const openTab = index => {
      currentClicked.value = index
    }

    /* WATCH */

    return {
      currentClicked,
      hasItens,
      tabsTitles,
      tabsTexts,
      fadeIn,
      uppercase,
      italic,
      bold,
      theme,
      sizeMediaQuery,
      openTab,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-tabs {
    margin-bottom: 10px;

    // inicio propSizeMediaQuery
    &.vlalg-tabs__sm {
      .vlalg-tabs__titles {
        .vlalg-tabs__buttons {
          padding: 8px 16px;
          font-size: 1.2em;
        }
      }
    }
    &.vlalg-tabs__md {
      .vlalg-tabs__titles {
        .vlalg-tabs__buttons {
          padding: 9px 16px;
          font-size: 1.6em;
        }
      }
    }
    &.vlalg-tabs__lg {
      .vlalg-tabs__titles {
        .vlalg-tabs__buttons {
          padding: 10px 16px;
          font-size: 2em;
        }
      }
    }
    // fim propSizeMediaQuery

    // inicio propTheme
    &.vlalg-tabs__theme--normal {
      background-color: #f8f8f2;
      color: #8e8e8e;

      .vlalg-tabs__titles {
        background-color: #eaeaea;
        color: #8e8e8e;

        .vlalg-tabs__buttons {
          color: #7f8c8d;
          background-color: #eaeaea;

          &:hover,
          &:active,
          &.vlalg-tabs__buttons--active {
            background-color: #f8f8f2;
          }
        }
      }
    }
    &.vlalg-tabs__theme--primary {
      background-color: #f15574;
      color: #fff;

      .vlalg-tabs__titles {
        background-color: #cf1137;
        color: #fff;

        .vlalg-tabs__buttons {
          color: #fff;
          background-color: #cf1137;

          &:hover,
          &:active,
          &.vlalg-tabs__buttons--active {
            background-color: #f15574;
          }
        }
      }
    }
    &.vlalg-tabs__theme--success {
      background-color: #2ecc71;
      color: #fff;

      .vlalg-tabs__titles {
        background-color: #27ae60;
        color: #fff;

        .vlalg-tabs__buttons {
          color: #fff;
          background-color: #27ae60;

          &:hover,
          &:active,
          &.vlalg-tabs__buttons--active {
            background-color: #2ecc71;
          }
        }
      }
    }
    &.vlalg-tabs__theme--info {
      background-color: #3498db;
      color: #fff;

      .vlalg-tabs__titles {
        background-color: #2980b9;
        color: #fff;

        .vlalg-tabs__buttons {
          color: #fff;
          background-color: #2980b9;

          &:hover,
          &:active,
          &.vlalg-tabs__buttons--active {
            background-color: #3498db;
          }
        }
      }
    }
    &.vlalg-tabs__theme--warn {
      background-color: #f1c40f;
      color: #fff;

      .vlalg-tabs__titles {
        background-color: #c27c0e;
        color: #fff;

        .vlalg-tabs__buttons {
          color: #fff;
          background-color: #c27c0e;

          &:hover,
          &:active,
          &.vlalg-tabs__buttons--active {
            background-color: #f1c40f;
          }
        }
      }
    }
    &.vlalg-tabs__theme--danger {
      background-color: #e74c3c;
      color: #fff;

      .vlalg-tabs__titles {
        background-color: #c0392b;
        color: #fff;

        .vlalg-tabs__buttons {
          color: #fff;
          background-color: #c0392b;

          &:hover,
          &:active,
          &.vlalg-tabs__buttons--active {
            background-color: #e74c3c;
          }
        }
      }
    }
    &.vlalg-tabs__theme--dark {
      background-color: #44475a;
      color: #f8f8f2;

      .vlalg-tabs__titles {
        color: #f8f8f2;
        background-color: #282a36;

        .vlalg-tabs__buttons {
          color: #f8f8f2;
          background-color: #272936;

          &:hover,
          &:active,
          &.vlalg-tabs__buttons--active {
            background-color: #44475a;
          }
        }
      }
    }
    &.vlalg-tabs__theme--light {
      background-color: #f8f8f2;
      color: #8e8e8e;

      .vlalg-tabs__titles {
        background-color: #eaeaea;
        color: #8e8e8e;

        .vlalg-tabs__buttons {
          color: #7f8c8d;
          background-color: #eaeaea;

          &:hover,
          &:active,
          &.vlalg-tabs__buttons--active {
            background-color: #f8f8f2;
          }
        }
      }
    }
    // fim propTheme

    .vlalg-tabs__titles {
      overflow: hidden;

      .vlalg-tabs__buttons {
        background-color: inherit;
        font-size: 1em;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 5px 16px;
        transition: 0.3s;
        text-transform: capitalize;

        // inicio propTabUppercase
        &.vlalg-tabs__transform--uppercase-none {
          text-transform: capitalize;
        }
        &.vlalg-tabs__transform--uppercase {
          text-transform: uppercase;
        }
        // fim propTabUppercase

        // inicio propTabItalic
        &.vlalg-tabs__style--italic-none {
          font-style: normal;
        }
        &.vlalg-tabs__style--italic {
          font-style: italic;
        }
        // fim propTabItalic

        // inicio propTabBold
        &.vlalg-tabs__bold--none {
          font-weight: normal;
        }
        &.vlalg-tabs__bold {
          font-weight: 700;
        }
        // fim propTabBold
      }
    }

    .vlalg-tabs__texts {
      .vlalg-tabs__text {
        padding: 6px 12px;

        &.vlalg-tabs__text--display-none {
          display: none;
        }
        &.vlalg-tabs__text--display-block {
          display: block;
        }
      }

      &.vlalg-tabs__texts--animation-fade-in {
        .vlalg-tabs__text {
          animation: fadeEffect 1s;
        }
      }
      &.vlalg-tabs__texts--animation-none {
        .vlalg-tabs__text {
          animation: none 0 ease 0 1 normal none running;
        }
      }

      @keyframes fadeEffect {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }
  }
</style>
