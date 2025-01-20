<template>
  <div
    v-if="propShow"
    :id="propId"
    class="vlalg-newsletter-pop-up"
    :class="[theme]"
    @click="closePopUp('overlay')"
  >
    <div
      class="vlalg-newsletter-pop-up__card"
      :style="[borderRadius]"
    >
      <div class="vlalg-newsletter-pop-up__card--content">
        <div
          v-if="size >= 768"
          class="vlalg-newsletter-pop-up__card--content-image"
        >
          <img
            class="vlalg-newsletter-pop-up__card--content-image-img"
            :src="propSrc"
            :alt="propAlt"
          />
        </div>
        <div class="vlalg-newsletter-pop-up__card--content-text">
          <h2 class="vlalg-newsletter-pop-up__text--title">
            Newsletter
          </h2>
          <p class="vlalg-newsletter-pop-up__text--description">
            Subscribe to the Name mailing list to receive updates on new arrivals, special offers and other discount
            information.
          </p>

          <div class="vlalg-newsletter-pop-up__inputs">
            <div class="vlalg-newsletter-pop-up__inputs-input">
              <VlalgInput
                prop-id="`BaseNewsletterPopUpInputFirstName${propId}`"
                :prop-name="`BaseNewsletterPopUpInputFirstName${propId}`"
                prop-type="text"
                :prop-active-style="propInputActiveStyle"
                :prop-size-media-query="propInputSizeMediaQuery"
                :prop-theme="propInputTheme"
                :prop-placeholder="propInputNameFirstPlaceholder"
                :prop-required="propInputNameFirstRequired"
                :prop-readonly="inputReadonly"
                :prop-disabled="false"
                prop-autocomplete="off"
                :prop-uppercase="propInputUppercase"
                :prop-border-radius="propInputBorderRadius"
                @current-value="inputValue('baseinputnamefirst', $event)"
              />
            </div>

            <div class="vlalg-newsletter-pop-up__inputs-input">
              <VlalgInput
                :prop-id="`BaseNewsletterPopUpInputLastName${propId}`"
                :prop-name="`BaseNewsletterPopUpInputLastName${propId}`"
                prop-type="text"
                :prop-active-style="propInputActiveStyle"
                :prop-size-media-query="propInputSizeMediaQuery"
                :prop-theme="propInputTheme"
                :prop-placeholder="propInputNameLastPlaceholder"
                :prop-required="propInputNameLastRequired"
                :prop-readonly="inputReadonly"
                :prop-disabled="false"
                prop-autocomplete="off"
                :prop-uppercase="propInputUppercase"
                :prop-border-radius="propInputBorderRadius"
                @current-value="inputValue('baseinputnamelast', $event)"
              />
            </div>
          </div>

          <div class="vlalg-newsletter-pop-up__email">
            <VlalgInput
              prop-id="`BaseNewsletterPopUpInputEmail${propId}`"
              :prop-name="`BaseNewsletterPopUpInputEmail${propId}`"
              prop-type="email"
              :prop-active-style="propInputActiveStyle"
              :prop-size-media-query="propInputSizeMediaQuery"
              :prop-theme="propInputTheme"
              :prop-placeholder="propInputEmailPlaceholder"
              :prop-required="true"
              :prop-readonly="inputReadonly"
              :prop-disabled="false"
              prop-autocomplete="off"
              :prop-uppercase="propInputUppercase"
              :prop-border-radius="propInputBorderRadius"
              @current-value="inputValue('baseinputemail', $event)"
            />
          </div>

          <div class="vlalg-newsletter-pop-up__button">
            <VlalgButton
              :prop-text="propSubButtonText"
              :prop-theme="propSubButtonTheme"
              prop-id="`BaseNewsletterPopUpButton${propId}`"
              prop-tag-type="button"
              :prop-disabled="disabledButton || blockButton"
              :prop-uppercase="false"
              :prop-italic="false"
              :prop-bold="false"
              prop-type="background"
              :prop-full="true"
              prop-size-media-query="md"
              :prop-border-radius="propSubButtonBorderRadius"
              prop-action="emit"
              @clicked="subscribeNewsletter"
            />
          </div>

          <div
            v-if="hasFetchResult"
            class="vlalg-newsletter-pop-up__message"
          >
            <p
              class="vlalg-newsletter-pop-up__message-text"
              :class="[
                fetchResultIsError
                  ? 'vlalg-newsletter-pop-up__message-text--error'
                  : 'vlalg-newsletter-pop-up__message-text--success',
              ]"
            >
              {{ fetchErrorMsg }}
            </p>
          </div>

          <div
            v-if="propDontShowMoreIsVisible"
            :style="[checkboxMarginTop]"
            class="vlalg-newsletter-pop-up__checkbox"
          >
            <VlalgCheckbox
              prop-id="checkbox16"
              :prop-items="newsletterPopUpCheckbox"
              :prop-disabled="blockCheckbox"
              prop-group-name="newsletterPopUpShowAgain"
              prop-display="inline"
              prop-type="circle"
              prop-direction="left"
              :prop-theme="propDontShowMoreTheme"
              prop-text-color="black"
              @current-value="newsletterPopUpCheckboxValue('basecheckbox', $event)"
            />
          </div>
        </div>
      </div>

      <a
        v-if="!blockButton"
        class="vlalg-newsletter-pop-up__button--close"
        :class="[closeButtontheme]"
        @click.prevent="closePopUp('button')"
      >
        X
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, toRefs, computed, ref, watch, defineAsyncComponent } from 'vue'

import { getMediaQueries } from '@helpers/functions'

export default defineComponent({
  name: 'VlalgNewsletterPopUp',
  components: {
    VlalgCheckbox: defineAsyncComponent(() => import('@components/fragments/VlalgCheckbox')),
    VlalgInput: defineAsyncComponent(() => import('@components/fragments/VlalgInput')),
    VlalgButton: defineAsyncComponent(() => import('@components/fragments/VlalgButton')),
  },
  emits: ['close-base-newsletter-popup'],
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
    propShow: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propSrc: {
      type: String,
      default: '',
      required: true,
    },
    propTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propCloseButtonTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propCanOverlayClose: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propBorderRadius: {
      type: String,
      default: '0',
    },
    propDontShowMoreIsVisible: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propDontShowMoreText: {
      type: String,
      default: "Don't show this popup again",
    },
    propDontShowMoreTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propInputNameFirstPlaceholder: {
      type: String,
      default: 'First Name',
    },
    propInputNameLastPlaceholder: {
      type: String,
      default: 'Last Name',
    },
    propInputEmailPlaceholder: {
      type: String,
      default: 'Last Name',
    },
    propInputActiveStyle: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'italic', 'oblique'].indexOf(value) !== -1
      },
    },
    propInputSizeMediaQuery: {
      type: String,
      default: 'xs',
      validator: value => {
        return ['xs', 'sm', 'md', 'lg'].indexOf(value) !== -1
      },
    },
    propInputTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propInputBorderRadius: {
      type: String,
      default: '0',
    },
    propInputUppercase: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propInputNameFirstRequired: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propInputNameLastRequired: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propSubButtonBorderRadius: {
      type: String,
      default: '0',
    },
    propSubButtonText: {
      type: String,
      default: 'SUBSCRIBE',
    },
    propSubButtonTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propFetchUrl: {
      type: String,
      default: '',
    },
    propFetchConfig: {
      type: Object,
      default: () => {
        return {}
      },
    },
    propFetchStatusErrorCode: {
      type: Array,
      default: () => {
        return [422]
      },
    },
    propFetchStatusSuccessCode: {
      type: Array,
      default: () => {
        return [200]
      },
    },
    propFetchErrorMsg: {
      type: String,
      default: 'Error message default',
    },
    propFetchSuccessMsg: {
      type: String,
      default: 'Success message default',
    },
    propAlt: {
      type: String,
      default: 'Default VlalgNesletterPopUp Alt',
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
    onMounted(async () => {
      size.value = await getMediaQueries()

      window.addEventListener('resize', () => {
        size.value = window.innerWidth
      })
    })

    // beforeDestroy
    onBeforeUnmount(() => {
      inputReadonly.value = false
      blockButton.value = false
      blockCheckbox.value = false
      hasFetchResult.value = false
      fetchResultIsError.value = false
    })

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const {
      propDontShowMoreText,
      propBorderRadius,
      propTheme,
      propCloseButtonTheme,
      propFetchErrorMsg,
      propFetchSuccessMsg,
      propCanOverlayClose,
      propFetchConfig,
      propFetchUrl,
      propFetchStatusSuccessCode,
      propShow,
      propInputNameFirstRequired,
      propInputNameLastRequired,
    } = toRefs(props)

    /* DATA */
    const size = ref('')
    const dontShowMore = ref(false)
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const firstNameIsValid = ref(false)
    const lastNameIsValid = ref(false)
    const emailIsValid = ref(false)
    const inputReadonly = ref(false)
    const blockButton = ref(false)
    const blockCheckbox = ref(false)
    const hasFetchResult = ref(false)
    const fetchResultIsError = ref(false)

    /* COMPUTED */
    const newsletterPopUpCheckbox = computed(() => {
      const newArray = [
        {
          value: 'DontShowMore',
          text: propDontShowMoreText.value,
        },
      ]

      return newArray
    })

    const borderRadius = computed(() => {
      return {
        'border-radius': propBorderRadius.value,
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-newsletter-pop-up__theme--primary'
        case 'success':
          return 'vlalg-newsletter-pop-up__theme--success'
        case 'info':
          return 'vlalg-newsletter-pop-up__theme--info'
        case 'danger':
          return 'vlalg-newsletter-pop-up__theme--danger'
        case 'warn':
          return 'vlalg-newsletter-pop-up__theme--warn'
        case 'dark':
          return 'vlalg-newsletter-pop-up__theme--dark'
        case 'light':
          return 'vlalg-newsletter-pop-up__theme--light'
        default:
          return 'vlalg-newsletter-pop-up__theme--normal'
      }
    })

    const closeButtontheme = computed(() => {
      switch (propCloseButtonTheme.value) {
        case 'primary':
          return 'vlalg-newsletter-pop-up__theme--primary'
        case 'success':
          return 'vlalg-newsletter-pop-up__theme--success'
        case 'info':
          return 'vlalg-newsletter-pop-up__theme--info'
        case 'danger':
          return 'vlalg-newsletter-pop-up__theme--danger'
        case 'warn':
          return 'vlalg-newsletter-pop-up__theme--warn'
        case 'dark':
          return 'vlalg-newsletter-pop-up__theme--dark'
        case 'light':
          return 'vlalg-newsletter-pop-up__theme--light'
        default:
          return 'vlalg-newsletter-pop-up__theme--normal'
      }
    })

    const disabledButton = computed(() => {
      if (emailIsValid.value && firstNameIsValid.value && lastNameIsValid.value) {
        return false
      } else {
        return true
      }
    })

    const checkboxMarginTop = computed(() => {
      const currentSize = size.value
      let obj = {}

      if (currentSize < 576 && !hasFetchResult.value) {
        obj = {
          'margin-top': '25px',
        }
      } else if (currentSize >= 576 && !hasFetchResult.value) {
        obj = {
          'margin-top': '15px',
        }
      } else {
        obj = {
          'margin-top': '10px',
        }
      }

      return obj
    })

    const fetchErrorMsg = computed(() => {
      if (fetchResultIsError.value) return propFetchErrorMsg.value

      return propFetchSuccessMsg.value
    })

    /* METHODS */
    const validEmail = () => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      return re.test(String(email.value).toLowerCase())
    }

    const newsletterPopUpCheckboxValue = (type, eventValue) => {
      if (type === 'basecheckbox') dontShowMore.value = eventValue.includes('DontShowMore')
    }

    const inputValue = (refValue, eventValue) => {
      if (refValue === 'baseinputnamefirst') {
        firstName.value = eventValue
      } else if (refValue === 'baseinputnamelast') {
        lastName.value = eventValue
      } else if (refValue === 'baseinputemail') {
        email.value = eventValue
      }
    }

    const subscribeNewsletter = async () => {
      hasFetchResult.value = false
      inputReadonly.value = true
      blockButton.value = true
      blockCheckbox.value = true

      const newPropFetchConfig = propFetchConfig.value
      newPropFetchConfig.body = JSON.stringify({
        name: firstName.value,
        email: email.value,
        status: '5ddef533d12eb922b0bb561a',
      })

      await fetch(`${propFetchUrl.value}`, newPropFetchConfig)
        .then(response => {
          fetchResultIsError.value = false

          if (!propFetchStatusSuccessCode.value.includes(response.status)) fetchResultIsError.value = true
          // return response.json()
        })
        .catch(() => {
          fetchResultIsError.value = true
        })

      inputReadonly.value = false
      blockButton.value = false
      blockCheckbox.value = false
      hasFetchResult.value = true
    }

    const closePopUp = origem => {
      if (origem === 'overlay' && !propCanOverlayClose.value) {
        return
      }

      inputReadonly.value = false
      blockButton.value = false
      blockCheckbox.value = false
      hasFetchResult.value = false
      fetchResultIsError.value = false

      context.emit('close-base-newsletter-popup', { dontShowMore: dontShowMore.value })
    }

    /* WATCH */
    watch(propShow, value => {
      const body = document.querySelectorAll('.app-body')[0]

      if (value) {
        body.classList.add('no-scroll')
      } else {
        body.classList.remove('no-scroll')
      }
    })

    watch(firstName, value => {
      if (!value && propInputNameFirstRequired.value) {
        firstNameIsValid.value = false
      } else {
        firstNameIsValid.value = true
      }
    })

    watch(lastName, value => {
      if (!value && propInputNameLastRequired.value) {
        lastNameIsValid.value = false
      } else {
        lastNameIsValid.value = true
      }
    })

    watch(email, value => {
      if (!value) {
        emailIsValid.value = false
      } else {
        if (validEmail(value)) {
          emailIsValid.value = true
        } else {
          emailIsValid.value = false
        }
      }
    })

    return {
      size,
      inputReadonly,
      blockButton,
      blockCheckbox,
      hasFetchResult,
      fetchResultIsError,
      newsletterPopUpCheckbox,
      borderRadius,
      theme,
      closeButtontheme,
      disabledButton,
      checkboxMarginTop,
      fetchErrorMsg,
      newsletterPopUpCheckboxValue,
      inputValue,
      subscribeNewsletter,
      closePopUp,
    }
  },
})
</script>

<style lang="scss">
  .vlalg-newsletter-pop-up {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000002;
    overflow-y: scroll;

    .vlalg-newsletter-pop-up__card {
      margin: 0px auto;
      background-color: #fff;
      width: 350px;
      height: 485px;
      position: relative;
      text-align: center;
      top: 50%;
      position: fixed !important;
      -moz-transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      right: 0px;
      left: 0;

      @media screen and (min-width: 375px) {
      }
      @media screen and (min-width: 425px) {
      }
      @media screen and (min-width: 576px) {
        width: 510px;
        height: 460px;
      }
      @media screen and (min-width: 768px) {
        width: 700px;
        height: 500px;
      }
      @media screen and (min-width: 1024px) {
        width: 760px;
      }
      @media screen and (min-width: 1600px) {
        width: 850px;
      }

      .vlalg-newsletter-pop-up__card--content {
        overflow: hidden;
        width: 350px;
        height: 485px;
        position: relative;

        .vlalg-newsletter-pop-up__card--content-image {
          overflow: hidden;
          position: relative;
          float: left;

          .vlalg-newsletter-pop-up__card--content-image-img {
            width: auto;
            height: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .vlalg-newsletter-pop-up__card--content-text {
          position: relative;
          float: left;
          width: 100%;
          height: 400px;
          padding: 25px 30px;

          .vlalg-newsletter-pop-up__text--title {
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            margin-top: 16px;
            margin-bottom: 25px;
            font-size: 2.8em;
          }

          .vlalg-newsletter-pop-up__text--description {
            margin-bottom: 0;
            line-height: 25px;
            max-height: 75px;
            overflow: hidden;

            @media screen and (min-width: 576px) {
              max-height: 44px;
            }
            @media screen and (min-width: 768px) {
              max-height: 75px;
            }
          }

          .vlalg-newsletter-pop-up__inputs {
            width: 100%;
            text-align: left;
            margin-top: 15px;
            display: inline-block;
            .vlalg-newsletter-pop-up__inputs-input {
              width: 100%;
              float: left;

              &:first-child {
                margin-right: 0;
              }
              &:last-child {
                margin-left: 0;
              }
            }
          }

          .vlalg-newsletter-pop-up__email {
            width: 100%;
            text-align: left;
            display: inline-block;
            margin-top: -4px;
          }

          .vlalg-newsletter-pop-up__button {
            width: 100%;
            text-align: left;
            display: inline-block;
            margin-top: 14px;
            background-color: chartreuse;
          }

          .vlalg-newsletter-pop-up__message {
            width: 100%;
            text-align: left;
            display: inline-block;
            margin-top: 10px;
            font-size: 0.9em;
            height: 20px;
            overflow: hidden;

            @media screen and (min-width: 576px) {
              margin-top: 10px;
            }

            .vlalg-newsletter-pop-up__message-text {
              text-align: center;
              margin-bottom: 0;

              &.vlalg-newsletter-pop-up__message-text--error {
                color: #c0392b;
              }

              &.vlalg-newsletter-pop-up__message-text--success {
                color: #27ae60;
              }
            }
          }

          .vlalg-newsletter-pop-up__checkbox {
          }
        }

        @media screen and (min-width: 375px) {
        }
        @media screen and (min-width: 425px) {
        }
        @media screen and (min-width: 576px) {
          width: 510px;
          height: 460px;

          .vlalg-newsletter-pop-up__card--content-text {
            .vlalg-newsletter-pop-up__text--title {
              font-size: 3em;
            }
            .vlalg-newsletter-pop-up__inputs {
              .vlalg-newsletter-pop-up__inputs-input {
                width: 49%;

                &:first-child {
                  margin-right: 1%;
                }
                &:last-child {
                  margin-left: 1%;
                }
              }
            }

            .vlalg-newsletter-pop-up__email {
              margin-top: 10px;
            }

            .vlalg-newsletter-pop-up__button {
              margin-top: 15px;
            }

            .vlalg-newsletter-pop-up__checkbox {
            }
          }
        }
        @media screen and (min-width: 768px) {
          width: 700px;
          height: 500px;

          .vlalg-newsletter-pop-up__card--content-image {
            width: 45%;
            height: 100%;
          }

          .vlalg-newsletter-pop-up__card--content-text {
            width: 55%;
            height: 100%;
          }
        }
        @media screen and (min-width: 1024px) {
          width: 760px;
        }
        @media screen and (min-width: 1600px) {
          width: 850px;
        }
      }

      .vlalg-newsletter-pop-up__button--close {
        position: absolute;
        right: -18px;
        top: -16px;
        padding: 9px;
        line-height: 11px;
        border-radius: 50%;
        text-decoration: none;

        &:hover {
          cursor: pointer;
        }

        // inicio propTheme
        &.vlalg-newsletter-pop-up__theme--normal {
          background-color: #f8f8f2;
          color: #8e8e8e;

          &:hover {
            background-color: #eaeaea;
          }
        }
        &.vlalg-newsletter-pop-up__theme--primary {
          background-color: #f15574;
          color: #ffffff;

          &:hover {
            background-color: #cf1137;
          }
        }
        &.vlalg-newsletter-pop-up__theme--success {
          background-color: #2ecc71;
          color: #ffffff;

          &:hover {
            background-color: #27ae60;
          }
        }
        &.vlalg-newsletter-pop-up__theme--info {
          background-color: #3498db;
          color: #ffffff;

          &:hover {
            background-color: #2980b9;
          }
        }
        &.vlalg-newsletter-pop-up__theme--warn {
          background-color: #f1c40f;
          color: #ffffff;

          &:hover {
            background-color: #c27c0e;
          }
        }
        &.vlalg-newsletter-pop-up__theme--danger {
          background-color: #e74c3c;
          color: #ffffff;

          &:hover {
            background-color: #c0392b;
          }
        }
        &.vlalg-newsletter-pop-up__theme--dark {
          background-color: #353734;
          color: #f8f8f2;

          &:hover {
            background-color: #282a36;
          }
        }
        &.vlalg-newsletter-pop-up__theme--light {
          background-color: #f8f8f2;
          color: #8e8e8e;

          &:hover {
            background-color: #eaeaea;
          }
        }
      }
    }

    // inicio propTheme
    &.vlalg-newsletter-pop-up__theme--normal {
      background-color: rgba(248, 248, 242, 0.7);
    }
    &.vlalg-newsletter-pop-up__theme--primary {
      background-color: rgba(241, 85, 116, 0.7);
    }
    &.vlalg-newsletter-pop-up__theme--success {
      background-color: rgba(46, 04, 113, 0.7);
    }
    &.vlalg-newsletter-pop-up__theme--info {
      background-color: rgba(52, 152, 219, 0.7);
    }
    &.vlalg-newsletter-pop-up__theme--warn {
      background-color: rgba(241, 196, 15, 0.7);
    }
    &.vlalg-newsletter-pop-up__theme--danger {
      background-color: rgba(231, 76, 60, 0.7);
    }
    &.vlalg-newsletter-pop-up__theme--dark {
      background-color: rgba(53, 55, 52, 0.7);
    }
    &.vlalg-newsletter-pop-up__theme--light {
      background-color: rgba(248, 248, 242, 0.7);
    }
    // fim propTheme
  }
  .no-scroll {
    overflow: hidden;
    position: fixed;
    z-index: 1000000;
    width: 100%;
  }
</style>
