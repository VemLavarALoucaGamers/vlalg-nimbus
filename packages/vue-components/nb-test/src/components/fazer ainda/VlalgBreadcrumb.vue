<template>
  <div
    v-if="hasItems"
    :id="propId"
    class="vlalg-breadcrumb"
  >
    <ol class="vlalg-breadcrumb__list">
      <li
        v-for="(item, index) in propItems"
        :key="index"
        class="vlalg-breadcrumb__list--item"
        :class="[textColor, theme]"
      >
        <span
          v-if="emptyLink(item.link)"
          class="vlalg-breadcrumb__list--item-span"
          :class="[!noLastChild(index) ? 'vlalg-breadcrumb__list--item-span--last' : '']"
        >{{ item.text }}</span>
        <router-link
          v-else
          :to="mountLink(item.link)"
          class="vlalg-breadcrumb__list--item-anchor"
          :class="[itemsCount]"
        >
          {{ item.text }}
        </router-link>

        <span
          v-if="noLastChild(index)"
          class="vlalg-breadcrumb__list--item-separator"
        >{{ newSeparator }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'VlalgBreadcrumb',
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
    propSeparator: {
      type: String,
      default: '/',
    },
    propTextColor: {
      type: String,
      default: 'black',
      validator: value => {
        return ['black', 'white', 'dark', 'light'].indexOf(value) !== -1
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
    const { propItems, propSeparator, propTextColor, propTheme } = toRefs(props)

    /* DATA */

    /* COMPUTED */
    const newSeparator = computed(() => {
      return propSeparator.value || '/'
    })

    const hasItems = computed(() => {
      return !!propItems.value.length
    })

    const itemsCount = computed(() => {
      if (hasItems.value && propItems.value.length > 1) return 'vlalg-breadcrumb__list--item-more-anchor'

      return ''
    })

    const textColor = computed(() => {
      switch (propTextColor.value) {
        case 'white':
          return 'vlalg-breadcrumb__text--white'
        case 'dark':
          return 'vlalg-breadcrumb__text--dark'
        case 'light':
          return 'vlalg-breadcrumb__text--light'
        default:
          return 'vlalg-breadcrumb__text--black'
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-breadcrumb__theme--primary'
        case 'success':
          return 'vlalg-breadcrumb__theme--success'
        case 'info':
          return 'vlalg-breadcrumb__theme--info'
        case 'danger':
          return 'vlalg-breadcrumb__theme--danger'
        case 'warn':
          return 'vlalg-breadcrumb__theme--warn'
        case 'dark':
          return 'vlalg-breadcrumb__theme--dark'
        case 'light':
          return 'vlalg-breadcrumb__theme--light'
        default:
          return 'vlalg-breadcrumb__theme--normal'
      }
    })

    /* METHODS */
    const emptyLink = linkObject => {
      if (Object.keys(linkObject).length === 0 && linkObject.constructor === Object) return true

      return false
    }

    const mountLink = linkObject => {
      const route = {}

      if (linkObject.type === 'path') route.path = linkObject.route
      else route.name = linkObject.route

      route.params = linkObject.params || {}

      route.query = linkObject.query || {}

      return route
    }

    const noLastChild = currentIndex => {
      const realCurrentItem = currentIndex + 1

      if (realCurrentItem < propItems.value.length) return true

      return false
    }

    /* WATCH */

    return {
      newSeparator,
      hasItems,
      itemsCount,
      textColor,
      theme,
      emptyLink,
      mountLink,
      noLastChild,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-breadcrumb {
    display: inline-block;
    color: #000;

    .vlalg-breadcrumb__list {
      padding: 6px 0px;
      margin: 0;
      list-style: none;
      border: 0;
      border-radius: 0;

      .vlalg-breadcrumb__list--item {
        display: inline-block;

        .vlalg-breadcrumb__list--item-span {
          &.vlalg-breadcrumb__list--item-span--last {
            &:hover {
              cursor: default;
            }
          }
        }

        // inicio propTextColor
        &.vlalg-breadcrumb__text--black {
          .vlalg-breadcrumb__list--item-span {
            color: #000;

            &.vlalg-breadcrumb__list--item-span--last {
              color: rgba(#000, 0.4);
            }
          }

          .vlalg-breadcrumb__list--item-anchor {
            color: #000;
          }
        }
        &.vlalg-breadcrumb__text--white {
          .vlalg-breadcrumb__list--item-span {
            color: #fff;

            &.vlalg-breadcrumb__list--item-span--last {
              color: rgba(#fff, 0.4);
            }
          }

          .vlalg-breadcrumb__list--item-anchor {
            color: #fff;
          }
        }
        &.vlalg-breadcrumb__text--dark {
          .vlalg-breadcrumb__list--item-span {
            color: #353734;

            &.vlalg-breadcrumb__list--item-span--last {
              color: rgba(#353734, 0.4);
            }
          }

          .vlalg-breadcrumb__list--item-anchor {
            color: #353734;
          }
        }
        &.vlalg-breadcrumb__text--light {
          .vlalg-breadcrumb__list--item-span {
            color: rgba(#f8f8f2, 0.7);

            &.vlalg-breadcrumb__list--item-span--last {
              color: rgba(#f8f8f2, 0.4);
            }
          }

          .vlalg-breadcrumb__list--item-anchor {
            color: rgba(#f8f8f2, 0.7);
          }
        }
        // fim propTextColor

        // inicio propTheme
        &.vlalg-breadcrumb__theme--normal {
          &:last-child {
            .vlalg-breadcrumb__list--item-anchor {
              &.vlalg-breadcrumb__list--item-more-anchor {
                color: #f8f8f2;

                &:hover {
                  color: #eaeaea;
                }
              }
            }
          }

          .vlalg-breadcrumb__list--item-anchor {
            &:hover {
              color: #f8f8f2;
            }
          }

          .vlalg-breadcrumb__list--item-separator {
            color: #f8f8f2;
          }
        }
        &.vlalg-breadcrumb__theme--primary {
          &:last-child {
            .vlalg-breadcrumb__list--item-anchor {
              &.vlalg-breadcrumb__list--item-more-anchor {
                color: #f15574;

                &:hover {
                  color: #cf1137;
                }
              }
            }
          }

          .vlalg-breadcrumb__list--item-anchor {
            &:hover {
              color: #f15574;
            }
          }

          .vlalg-breadcrumb__list--item-separator {
            color: #f15574;
          }
        }
        &.vlalg-breadcrumb__theme--success {
          &:last-child {
            .vlalg-breadcrumb__list--item-anchor {
              &.vlalg-breadcrumb__list--item-more-anchor {
                color: #2ecc71;

                &:hover {
                  color: #27ae60;
                }
              }
            }
          }

          .vlalg-breadcrumb__list--item-anchor {
            &:hover {
              color: #2ecc71;
            }
          }

          .vlalg-breadcrumb__list--item-separator {
            color: #2ecc71;
          }
        }
        &.vlalg-breadcrumb__theme--info {
          &:last-child {
            .vlalg-breadcrumb__list--item-anchor {
              &.vlalg-breadcrumb__list--item-more-anchor {
                color: #3498db;

                &:hover {
                  color: #2980b9;
                }
              }
            }
          }

          .vlalg-breadcrumb__list--item-anchor {
            &:hover {
              color: #3498db;
            }
          }

          .vlalg-breadcrumb__list--item-separator {
            color: #3498db;
          }
        }
        &.vlalg-breadcrumb__theme--warn {
          &:last-child {
            .vlalg-breadcrumb__list--item-anchor {
              &.vlalg-breadcrumb__list--item-more-anchor {
                color: #f1c40f;

                &:hover {
                  color: #c27c0e;
                }
              }
            }
          }

          .vlalg-breadcrumb__list--item-anchor {
            &:hover {
              color: #f1c40f;
            }
          }

          .vlalg-breadcrumb__list--item-separator {
            color: #f1c40f;
          }
        }
        &.vlalg-breadcrumb__theme--danger {
          &:last-child {
            .vlalg-breadcrumb__list--item-anchor {
              &.vlalg-breadcrumb__list--item-more-anchor {
                color: #e74c3c;

                &:hover {
                  color: #c0392b;
                }
              }
            }
          }

          .vlalg-breadcrumb__list--item-anchor {
            &:hover {
              color: #e74c3c;
            }
          }

          .vlalg-breadcrumb__list--item-separator {
            color: #e74c3c;
          }
        }
        &.vlalg-breadcrumb__theme--dark {
          &:last-child {
            .vlalg-breadcrumb__list--item-anchor {
              &.vlalg-breadcrumb__list--item-more-anchor {
                color: #353734;

                &:hover {
                  color: #272936;
                }
              }
            }
          }

          .vlalg-breadcrumb__list--item-anchor {
            &:hover {
              color: #353734;
            }
          }

          .vlalg-breadcrumb__list--item-separator {
            color: #353734;
          }
        }
        &.vlalg-breadcrumb__theme--light {
          &:last-child {
            .vlalg-breadcrumb__list--item-anchor {
              &.vlalg-breadcrumb__list--item-more-anchor {
                color: #f8f8f2;

                &:hover {
                  color: #eaeaea;
                }
              }
            }
          }

          .vlalg-breadcrumb__list--item-anchor {
            &:hover {
              color: #f8f8f2;
            }
          }

          .vlalg-breadcrumb__list--item-separator {
            color: #f8f8f2;
          }
        }
        // fim propTheme

        &:last-child {
          .vlalg-breadcrumb__list--item-anchor {
            text-decoration: none;
          }
        }

        .vlalg-breadcrumb__list--item-anchor {
          text-decoration: none;
        }

        .vlalg-breadcrumb__list--item-separator {
          padding: 0 5px;
        }
      }
    }
  }
</style>
