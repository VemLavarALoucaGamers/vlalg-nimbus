<template>
  <div class="vlalg-newletter-bar">
    <h1 class="vlalg-newletter-bar__title">
      {{ t('components.VlalgNewsletterBar.title') }}
    </h1>
    <p class="vlalg-newletter-bar__subtitle">
      {{ t('components.VlalgNewsletterBar.subtitle') }}
    </p>

    <div class="vlalg-newletter-bar__form">
      <div class="vlalg-newletter-bar__form-input">
        <VlalgInputBorder
          prop-id="inputNewsletterEmail"
          prop-name="inputNewsletterEmail"
          prop-type="email"
          prop-text-color="white"
          :prop-value="newsletterEmail"
          prop-active-style="italic"
          prop-size-media-query="sm"
          prop-theme="primary"
          :prop-placeholder="t('inputs.email.placeholder')"
          :prop-required="true"
          :prop-readonly="blockUi"
          :prop-disabled="blockUi"
          prop-autocomplete="off"
          prop-size="100%"
          @current-value="changeNewsletterData('email', $event)"
        />
      </div>

      <VlalgButton
        prop-id="buttonSubscribeNewsletter"
        :prop-text="t('buttons.subscribe')"
        prop-theme="primary"
        prop-tag-type="button"
        :prop-disabled="disableButton || hiddenNewsletter"
        :prop-uppercase="false"
        :prop-italic="false"
        :prop-bold="false"
        prop-size-media-query="sm"
        prop-action="emit"
        class="vlalg-newletter-bar__form-button"
        @clicked="subscribeNewsletter($event)"
      />

      <img
        class="vlalg-newletter-bar__form-image"
        alt="Newsletter imagem banner"
        :src="randomImage"
      />
    </div>

    <VlalgSnackbar
      prop-id="snackbarLogin"
      :prop-text="newsletterSendingMsg.text"
      :prop-is-visible="hasError"
      prop-position="top"
      :prop-theme="newsletterSendingMsg.theme"
      @remove-snackbar="resetSnackbar($event)"
    />
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, onMounted, computed, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

import useMixins from '@mixins'

import helpersQueries from '@helpersQueries'
const { accpetNewsletter } = helpersQueries

import { isValidEmail } from '@helpers/functions'

export default defineComponent({
  name: 'VlalgNewsletterBar',
  components: {
    VlalgButton: defineAsyncComponent(() => import('@components/fragments/VlalgButton')),
    VlalgInputBorder: defineAsyncComponent(() => import('@components/fragments/VlalgInputBorder')),
    VlalgSnackbar: defineAsyncComponent(() => import('@components/fragments/VlalgSnackbar')),
  },
  emits: [],
  props: {},
  setup () {
    /* MIXINS */
    const { blockUi, setBlockUi, hiddenNewsletter } = useMixins()

    /* VUE I18N */
    const { t } = useI18n({
      inheritLocale: false,
      useScope: 'global',
    })

    /* VUE META */

    /* VUE ROUTER */

    /* VUEX (Mesmo que this.$store) */
    const store = useStore()

    /* LIFECYCLE */
    onMounted(() => {
      setBlockUi(false)
    })

    /* VUEX ACTIONS */
    const changeSubNewsletterAttempts = value => store.dispatch('changeSubNewsletterAttempts', value)

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */
    const newsletterAttempts = computed(() => store.getters.newsletterAttempts)

    /* VUEX STATES */

    /* PROPS */

    /* DATA */
    const hasError = ref(false)
    const newsletterEmail = ref('')
    const newsletterSendingMsg = reactive({
      theme: 'success',
      text: '',
    })
    const newsletterImages = ref([
      'https://vlalgstorage.sfo2.cdn.digitaloceanspaces.com/3d45140a-2c80-4fc9-9630-279227dee992..png',
      'https://vlalgstorage.sfo2.cdn.digitaloceanspaces.com/46bafe71-cfa6-4088-ab4e-88bd5db899fa..png',
    ])

    /* COMPUTED */
    const disableButton = computed(() => {
      if (!blockUi.value && newsletterEmail.value && isValidEmail(newsletterEmail.value)) return false

      return true
    })

    const randomImage = computed(() => {
      const images = newsletterImages.value

      return images[Math.floor(Math.random() * images.length)]
    })

    /* METHODS */
    const changeNewsletterData = (refValue, eventValue) => {
      if (refValue === 'email') {
        newsletterEmail.value = eventValue
      }
    }
    const subscribeNewsletter = async event => {
      const email = newsletterEmail.value

      let resultError = false

      if (!event || !email) return

      setBlockUi(true)

      const resultAuth = await accpetNewsletter(email)
      const resultStatus = resultAuth.status
      const resultData = resultAuth.data

      if (resultStatus !== 201) resultError = true

      if (resultError) {
        const resultErrorCode =
          resultData.errorCode === '01004042' || resultData.errorCode === '01000422'
            ? 'components.VlalgNewsletterBar.messages.error'
            : `errors.api.${resultData.errorCode}`

        changeSubNewsletterAttempts(newsletterAttempts.value + 1)

        showSnackbar('danger', t(resultErrorCode))
      } else {
        changeSubNewsletterAttempts(4)

        showSnackbar('success', t('components.VlalgNewsletterBar.messages.success'))
      }

      newsletterEmail.value = ''
    }

    const changeSnackbarConfig = (theme = 'success', text = '') => {
      newsletterSendingMsg.theme = theme
      newsletterSendingMsg.text = text
    }

    const showSnackbar = (type, msg) => {
      changeSnackbarConfig(type, msg)
      hasError.value = true
      setBlockUi(true)
    }

    const resetSnackbar = () => {
      changeSnackbarConfig('danger', '')
      hasError.value = false
      setBlockUi(false)
    }

    /* WATCH */

    return {
      t,
      newsletterEmail,
      disableButton,
      changeNewsletterData,
      subscribeNewsletter,
      resetSnackbar,
      newsletterSendingMsg,
      blockUi,
      hasError,
      hiddenNewsletter,
      randomImage,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-newletter-bar {
    font-family: 'Lato Regular';
    position: relative;
    padding-top: 40px;
    padding-bottom: 40px;
    background: rgb(160, 73, 186);
    background: linear-gradient(114deg, rgba(160, 73, 186, 1) 32%, rgba(85, 45, 180, 1) 76%);

    .vlalg-newletter-bar__title {
      font-family: 'Lato Black';
      margin-top: 0;
      font-size: 3em;
    }
    .vlalg-newletter-bar__subtitle {
      font-size: 1.7em;
      margin: 15px 0;
    }

    .vlalg-newletter-bar__form {
      margin: 0 auto;
      position: relative;
      width: fit-content;

      .vlalg-newletter-bar__form-input {
        display: inline-block;
        width: 209px;
        z-index: 1;
        position: relative;
      }

      .vlalg-newletter-bar__form-button {
        margin-left: 10px;
        vertical-align: top;
        z-index: 1;
        position: relative;
      }

      .vlalg-newletter-bar__form-image {
        width: 150px;
        height: auto;
        position: absolute;
        top: inherit;
        right: 1px;
        bottom: -130px;
        z-index: 0;
      }
    }

    .vlalg-newletter-bar__message {
      font-size: 0.9em;
      margin: 5px 0 0px;
      text-transform: uppercase;
    }

    @media screen and (min-width: 375px) {
      .vlalg-newletter-bar__form {
        .vlalg-newletter-bar__form-input {
          width: 250px;
        }
        .vlalg-newletter-bar__form-image {
          right: 1px;
          bottom: -135px;
        }
      }
    }
    @media screen and (min-width: 425px) {
      .vlalg-newletter-bar__form {
        .vlalg-newletter-bar__form-image {
          width: 150px;
          bottom: -135px;
          right: -20px;
        }
      }
    }
    @media screen and (min-width: 576px) {
      .vlalg-newletter-bar__form {
        .vlalg-newletter-bar__form-input {
          width: 320px;
        }

        .vlalg-newletter-bar__form-image {
          width: 180px;
          bottom: -141px;
          right: -89px;
        }
      }
    }
    @media screen and (min-width: 768px) {
      .vlalg-newletter-bar__form {
        .vlalg-newletter-bar__form-input {
          width: 250px;
        }

        .vlalg-newletter-bar__form-image {
          width: 200px;
          bottom: -158px;
          right: -120px;
        }
      }
    }
    @media screen and (min-width: 1024px) {
      .vlalg-newletter-bar__title {
        font-size: 3.6em;
      }

      .vlalg-newletter-bar__form {
        .vlalg-newletter-bar__form-input {
          width: 350px;
        }

        .vlalg-newletter-bar__form-image {
          min-width: 109px;
          max-width: 310px;
          width: auto;
          bottom: -121px;
          right: -250px;
        }
      }
    }
    @media screen and (min-width: 1600px) {
      .vlalg-newletter-bar__form {
        .vlalg-newletter-bar__form-image {
          //right: 10%;
        }
      }
    }
  }
</style>
