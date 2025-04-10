<template>
  <div
    v-if="propId"
    class="vlalg-toggle"
    :class="[theme, isDisabled, sizeMediaQuery]"
  >
    <label
      :id="`basetoggle-button-${propId}`"
      class="vlalg-toggle__button"
    >
      <input
        :id="`basetoggle-input-${propId}`"
        v-model="currentStatus"
        type="checkbox"
        :disabled="propDisabled"
        class="vlalg-toggle__checkbox"
      />
      <div
        :id="`basetoggle-switch-${propId}`"
        class="vlalg-toggle__switch"
      ></div>
    </label>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, computed, watch } from 'vue'

export default defineComponent({
  name: 'VlalgToggle',
  components: {},
  emits: ['current-value'],
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
    propValue: {
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
    propDisabled: {
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
    const { propTheme, propDisabled, propSizeMediaQuery, propValue } = toRefs(props)

    /* DATA */
    const currentStatus = ref(false)

    /* COMPUTED */
    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-toggle__theme--primary'
        case 'success':
          return 'vlalg-toggle__theme--success'
        case 'info':
          return 'vlalg-toggle__theme--info'
        case 'danger':
          return 'vlalg-toggle__theme--danger'
        case 'warn':
          return 'vlalg-toggle__theme--warn'
        case 'dark':
          return 'vlalg-toggle__theme--dark'
        case 'light':
          return 'vlalg-toggle__theme--light'
        default:
          return 'vlalg-toggle__theme--normal'
      }
    })

    const isDisabled = computed(() => {
      switch (propDisabled.value) {
        case true:
          return 'vlalg-toggle__disabled'
        default:
          return ''
      }
    })

    const sizeMediaQuery = computed(() => {
      switch (propSizeMediaQuery.value) {
        case 'sm':
          return 'vlalg-toggle__sm'
        case 'md':
          return 'vlalg-toggle__md'
        case 'lg':
          return 'vlalg-toggle__lg'
        default:
          return ''
      }
    })

    /* METHODS */
    const startStatus = () => {
      const initialStatus = propValue.value

      currentStatus.value = initialStatus
      context.emit('current-value', initialStatus)
    }

    startStatus()

    /* WATCH */
    watch(currentStatus, value => {
      context.emit('current-value', value)
    })

    watch(propValue, () => {
      startStatus()
    })

    return {
      currentStatus,
      theme,
      isDisabled,
      sizeMediaQuery,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-toggle {
    display: inline-block;
    width: auto;

    // inicio propSizeMediaQuery
    &.vlalg-toggle__sm {
      .vlalg-toggle__button {
        .vlalg-toggle__switch {
          width: 70px;
          height: 38px;
          max-height: 38px;

          &:before {
            width: 30px;
            height: 30px;
          }
        }

        .vlalg-toggle__checkbox {
          &:checked {
            & + .vlalg-toggle__switch {
              &:before {
                left: 35px;
              }
            }
          }
        }
      }
    }
    &.vlalg-toggle__md {
      .vlalg-toggle__button {
        .vlalg-toggle__switch {
          width: 90px;
          height: 48px;
          max-height: 48px;

          &:before {
            width: 40px;
            height: 40px;
          }
        }

        .vlalg-toggle__checkbox {
          &:checked {
            & + .vlalg-toggle__switch {
              &:before {
                left: 45px;
              }
            }
          }
        }
      }
    }
    &.vlalg-toggle__lg {
      .vlalg-toggle__button {
        .vlalg-toggle__switch {
          width: 110px;
          height: 58px;
          max-height: 58px;

          &:before {
            width: 50px;
            height: 50px;
          }
        }

        .vlalg-toggle__checkbox {
          &:checked {
            & + .vlalg-toggle__switch {
              &:before {
                left: 55px;
              }
            }
          }
        }
      }
    }
    // fim propSizeMediaQuery

    // inicio propDisabled
    &.vlalg-toggle__disabled {
      .vlalg-toggle__button {
        .vlalg-toggle__switch {
          &:hover {
            cursor: not-allowed;
          }
        }
      }
      // inicio propTheme
      &.vlalg-toggle__theme--normal {
        .vlalg-toggle__button {
          .vlalg-toggle__switch {
            background-color: rgba(234, 234, 234, 0.5);
            &:before {
              background-color: rgba(234, 234, 234, 0.1);
            }
          }
          &:hover {
            .vlalg-toggle__switch {
              &:before {
                // background-color: #f8f8f2;
              }
            }
          }

          .vlalg-toggle__checkbox {
            &:checked {
              & + .vlalg-toggle__switch {
                background-color: rgba(234, 234, 234, 0.5);
                &:before {
                  background-color: rgba(234, 234, 234, 0.1);
                }
              }
            }
          }
        }
      }
      &.vlalg-toggle__theme--primary {
        .vlalg-toggle__button {
          .vlalg-toggle__switch {
            background-color: rgba(207, 17, 55, 0.5);
            &:before {
              background-color: rgba(207, 17, 55, 0.1);
            }
          }
          &:hover {
            .vlalg-toggle__switch {
              &:before {
                // background-color: blue;
              }
            }
          }

          .vlalg-toggle__checkbox {
            &:checked {
              & + .vlalg-toggle__switch {
                background-color: rgba(207, 17, 55, 0.5);
                &:before {
                  background-color: rgba(207, 17, 55, 0.1);
                }
              }
            }
          }
        }
      }
      &.vlalg-toggle__theme--success {
        .vlalg-toggle__button {
          .vlalg-toggle__switch {
            background-color: rgba(39, 174, 96, 0.5);
            &:before {
              background-color: rgba(39, 174, 96, 0.1);
            }
          }
          &:hover {
            .vlalg-toggle__switch {
              &:before {
                // background-color: blue;
              }
            }
          }

          .vlalg-toggle__checkbox {
            &:checked {
              & + .vlalg-toggle__switch {
                background-color: rgba(39, 174, 96, 0.5);
                &:before {
                  background-color: rgba(39, 174, 96, 0.1);
                }
              }
            }
          }
        }
      }
      &.vlalg-toggle__theme--info {
        .vlalg-toggle__button {
          .vlalg-toggle__switch {
            background-color: rgba(41, 128, 185, 0.5);
            &:before {
              background-color: rgba(41, 128, 185, 0.1);
            }
          }
          &:hover {
            .vlalg-toggle__switch {
              &:before {
                // background-color: blue;
              }
            }
          }

          .vlalg-toggle__checkbox {
            &:checked {
              & + .vlalg-toggle__switch {
                background-color: rgba(41, 128, 185, 0.5);
                &:before {
                  background-color: rgba(41, 128, 185, 0.1);
                }
              }
            }
          }
        }
      }
      &.vlalg-toggle__theme--warn {
        .vlalg-toggle__button {
          .vlalg-toggle__switch {
            background-color: rgba(241, 196, 15, 0.5);
            &:before {
              background-color: rgba(241, 196, 15, 0.1);
            }
          }
          &:hover {
            .vlalg-toggle__switch {
              &:before {
                // background-color: blue;
              }
            }
          }

          .vlalg-toggle__checkbox {
            &:checked {
              & + .vlalg-toggle__switch {
                background-color: rgba(241, 196, 15, 0.5);
                &:before {
                  background-color: rgba(241, 196, 15, 0.1);
                }
              }
            }
          }
        }
      }
      &.vlalg-toggle__theme--danger {
        .vlalg-toggle__button {
          .vlalg-toggle__switch {
            background-color: rgba(192, 57, 43, 0.5);
            &:before {
              background-color: rgba(192, 57, 43, 0.1);
            }
          }
          &:hover {
            .vlalg-toggle__switch {
              &:before {
                // background-color: blue;
              }
            }
          }

          .vlalg-toggle__checkbox {
            &:checked {
              & + .vlalg-toggle__switch {
                background-color: rgba(192, 57, 43, 0.5);
                &:before {
                  background-color: rgba(192, 57, 43, 0.1);
                }
              }
            }
          }
        }
      }
      &.vlalg-toggle__theme--dark {
        .vlalg-toggle__button {
          .vlalg-toggle__switch {
            background-color: rgba(39, 41, 54, 0.5);
            &:before {
              background-color: rgba(39, 41, 54, 0.1);
            }
          }
          &:hover {
            .vlalg-toggle__switch {
              &:before {
                // background-color: blue;
              }
            }
          }

          .vlalg-toggle__checkbox {
            &:checked {
              & + .vlalg-toggle__switch {
                background-color: rgba(39, 41, 54, 0.5);
                &:before {
                  background-color: rgba(39, 41, 54, 0.1);
                }
              }
            }
          }
        }
      }
      &.vlalg-toggle__theme--light {
        .vlalg-toggle__button {
          .vlalg-toggle__switch {
            background-color: rgba(234, 234, 234, 0.5);
            &:before {
              background-color: rgba(234, 234, 234, 0.1);
            }
          }
          &:hover {
            .vlalg-toggle__switch {
              &:before {
                // background-color: #f8f8f2;
              }
            }
          }

          .vlalg-toggle__checkbox {
            &:checked {
              & + .vlalg-toggle__switch {
                background-color: rgba(234, 234, 234, 0.5);
                &:before {
                  background-color: rgba(234, 234, 234, 0.1);
                }
              }
            }
          }
        }
      }
      // fim propTheme
    }
    // inicio propDisabled

    // inicio propTheme
    &.vlalg-toggle__theme--normal {
      .vlalg-toggle__button {
        .vlalg-toggle__switch {
          background-color: #f8f8f2;
          &:before {
            background-color: #eaeaea;
          }
        }
        &:hover {
          .vlalg-toggle__switch {
            &:before {
              // background-color: #f8f8f2;
            }
          }
        }

        .vlalg-toggle__checkbox {
          &:checked {
            & + .vlalg-toggle__switch {
              background-color: #eaeaea;
              &:before {
                background-color: #f8f8f2;
              }
            }
          }
        }
      }
    }
    &.vlalg-toggle__theme--primary {
      .vlalg-toggle__button {
        .vlalg-toggle__switch {
          background-color: #f15574;
          &:before {
            background-color: #cf1137;
          }
        }
        &:hover {
          .vlalg-toggle__switch {
            &:before {
              // background-color: blue;
            }
          }
        }

        .vlalg-toggle__checkbox {
          &:checked {
            & + .vlalg-toggle__switch {
              background-color: #cf1137;
              &:before {
                background-color: #f15574;
              }
            }
          }
        }
      }
    }
    &.vlalg-toggle__theme--success {
      .vlalg-toggle__button {
        .vlalg-toggle__switch {
          background-color: #2ecc71;
          &:before {
            background-color: #27ae60;
          }
        }
        &:hover {
          .vlalg-toggle__switch {
            &:before {
              // background-color: blue;
            }
          }
        }

        .vlalg-toggle__checkbox {
          &:checked {
            & + .vlalg-toggle__switch {
              background-color: #27ae60;
              &:before {
                background-color: #2ecc71;
              }
            }
          }
        }
      }
    }
    &.vlalg-toggle__theme--info {
      .vlalg-toggle__button {
        .vlalg-toggle__switch {
          background-color: #3498db;
          &:before {
            background-color: #2980b9;
          }
        }
        &:hover {
          .vlalg-toggle__switch {
            &:before {
              // background-color: blue;
            }
          }
        }

        .vlalg-toggle__checkbox {
          &:checked {
            & + .vlalg-toggle__switch {
              background-color: #2980b9;
              &:before {
                background-color: #3498db;
              }
            }
          }
        }
      }
    }
    &.vlalg-toggle__theme--warn {
      .vlalg-toggle__button {
        .vlalg-toggle__switch {
          background-color: #f1c40f;
          &:before {
            background-color: #c27c0e;
          }
        }
        &:hover {
          .vlalg-toggle__switch {
            &:before {
              // background-color: blue;
            }
          }
        }

        .vlalg-toggle__checkbox {
          &:checked {
            & + .vlalg-toggle__switch {
              background-color: #c27c0e;
              &:before {
                background-color: #f1c40f;
              }
            }
          }
        }
      }
    }
    &.vlalg-toggle__theme--danger {
      .vlalg-toggle__button {
        .vlalg-toggle__switch {
          background-color: #e74c3c;
          &:before {
            background-color: #c0392b;
          }
        }
        &:hover {
          .vlalg-toggle__switch {
            &:before {
              // background-color: blue;
            }
          }
        }

        .vlalg-toggle__checkbox {
          &:checked {
            & + .vlalg-toggle__switch {
              background-color: #c0392b;
              &:before {
                background-color: #e74c3c;
              }
            }
          }
        }
      }
    }
    &.vlalg-toggle__theme--dark {
      .vlalg-toggle__button {
        .vlalg-toggle__switch {
          background-color: #353734;
          &:before {
            background-color: #272936;
          }
        }
        &:hover {
          .vlalg-toggle__switch {
            &:before {
              // background-color: blue;
            }
          }
        }

        .vlalg-toggle__checkbox {
          &:checked {
            & + .vlalg-toggle__switch {
              background-color: #272936;
              &:before {
                background-color: #353734;
              }
            }
          }
        }
      }
    }
    &.vlalg-toggle__theme--light {
      .vlalg-toggle__button {
        .vlalg-toggle__switch {
          background-color: #f8f8f2;
          &:before {
            background-color: #eaeaea;
          }
        }
        &:hover {
          .vlalg-toggle__switch {
            &:before {
              // background-color: #f8f8f2;
            }
          }
        }

        .vlalg-toggle__checkbox {
          &:checked {
            & + .vlalg-toggle__switch {
              background-color: #eaeaea;
              &:before {
                background-color: #f8f8f2;
              }
            }
          }
        }
      }
    }
    // fim propTheme

    .vlalg-toggle__switch {
      display: inline-block;
      border-radius: 30px;
      position: relative;
      width: 60px;
      height: 28px;
      max-height: 28px;
      transition: background 0.25s;

      &:hover {
        cursor: pointer;
      }

      &:before {
        content: '';
        display: block;
        border-radius: 50%;
        position: absolute;
        transition: left 0.25s;
        width: 20px;
        height: 20px;
        top: 4px;
        left: 4px;
        box-shadow: 0px 2px 4px 0px black;
      }

      &:after {
        content: '';
      }
    }

    .vlalg-toggle__checkbox {
      position: absolute;
      visibility: hidden;

      &:checked {
        & + .vlalg-toggle__switch {
          &:before {
            left: 35px;
          }
        }
      }
    }
  }
</style>
