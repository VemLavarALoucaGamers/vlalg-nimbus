<template>
  <div
    v-if="isValid"
    :id="propId"
    class="vlalg-brawlcard"
  >
    <div
      class="vlalg-brawlcard__image"
      :class="[themeImage]"
    >
      <img
        :src="propImage"
        :alt="propAlt"
        width="280"
        class="vlalg-brawlcard__image-img"
      />
      <div
        v-if="propThemeText"
        class="vlalg-brawlcard__action"
        :class="[themeTextLink]"
      >
        {{ propThemeText }}
      </div>
    </div>

    <div class="vlalg-brawlcard__text">
      <div class="vlalg-brawlcard__text-txt">
        {{ propText }}
      </div>
      <div
        class="vlalg-brawlcard__link"
        :class="[themeTextLink]"
        @click="clickedCard"
      >
        <font-awesome-icon
          fas
          :icon="currentLinkIcon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'VlalgBrawlCard',
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
    propImage: {
      type: String,
      default: '',
      required: true,
    },
    propText: {
      type: String,
      default: '',
      required: true,
    },
    propUrl: {
      type: [String, Object],
      default: '',
      required: true,
    },
    propUrlType: {
      type: String,
      default: 'internal',
      validator: value => {
        return ['internal', 'external'].indexOf(value) !== -1
      },
    },
    propThemeText: {
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
    propAlt: {
      type: String,
      default: 'Default VlalgBrawlCard Alt',
    },
  },
  setup (props) {
    /* MIXINS */

    /* VUE I18N */

    /* VUE META */

    /* VUE ROUTER */
    const router = useRouter()

    /* VUEX (Mesmo que this.$store) */

    /* LIFECYCLE */

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const { propImage, propText, propUrl, propTheme, propUrlType } = toRefs(props)

    /* DATA */

    /* COMPUTED */
    const isValid = computed(() => {
      return !!(propImage.value && propText.value && propUrl.value)
    })
    const currentLinkIcon = computed(() => {
      if (propUrlType.value === 'external') return 'external-link-alt'

      return 'chevron-right'
    })

    const themeTextLink = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-brawlcard__theme--primary'
        case 'success':
          return 'vlalg-brawlcard__theme--success'
        case 'info':
          return 'vlalg-brawlcard__theme--info'
        case 'danger':
          return 'vlalg-brawlcard__theme--danger'
        case 'warn':
          return 'vlalg-brawlcard__theme--warn'
        case 'dark':
          return 'vlalg-brawlcard__theme--dark'
        case 'light':
          return 'vlalg-brawlcard__theme--light'
        default:
          return 'vlalg-brawlcard__theme--normal'
      }
    })

    const themeImage = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-brawlcard__image-theme--primary'
        case 'success':
          return 'vlalg-brawlcard__image-theme--success'
        case 'info':
          return 'vlalg-brawlcard__image-theme--info'
        case 'danger':
          return 'vlalg-brawlcard__image-theme--danger'
        case 'warn':
          return 'vlalg-brawlcard__image-theme--warn'
        case 'dark':
          return 'vlalg-brawlcard__image-theme--dark'
        case 'light':
          return 'vlalg-brawlcard__image-theme--light'
        default:
          return 'vlalg-brawlcard__image-theme--normal'
      }
    })

    /* METHODS */
    const clickedCard = () => {
      const url = propUrl.value

      if (propUrlType.value === 'external') {
        window.open(url, '_blank')
      } else {
        router.push({ ...url })
      }
    }

    /*const getImage = async (imageUrl) => {
      console.log('imageUrl -> ', imageUrl)
      const resultImage = await getResizedImage(imageUrl, 'png', 300, 180)
      // console.log('resultImage -> ', resultImage)
      return resultImage
      // return `data:image/png;base64, ${resultImage.b64Data}`
    }*/

    /* WATCH */

    return {
      isValid,
      themeTextLink,
      themeImage,
      currentLinkIcon,
      clickedCard,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-brawlcard {
    display: inline-block;
    position: relative;
    width: 280px;
    height: 260px;
    margin: 10px 0;

    .vlalg-brawlcard__image {
      display: block;
      position: relative;
      width: 280px;
      height: 180px;
      overflow: hidden;
      clip-path: polygon(0 0, 100% 3%, 90% 100%, 0 100%);

      &.vlalg-brawlcard__image-theme--normal {
        background-color: #f8f8f2;
      }
      &.vlalg-brawlcard__image-theme--primary {
        background-color: #f15574;
      }
      &.vlalg-brawlcard__image-theme--success {
        background-color: #2ecc71;
      }
      &.vlalg-brawlcard__image-theme--danger {
        background-color: #e74c3c;
      }
      &.vlalg-brawlcard__image-theme--warn {
        background-color: #f1c40f;
      }
      &.vlalg-brawlcard__image-theme--info {
        background-color: #3498db;
      }
      &.vlalg-brawlcard__image-theme--dark {
        background-color: #353734;
      }
      &.vlalg-brawlcard__image-theme--light {
        background-color: #f8f8f2;
      }

      .vlalg-brawlcard__image-img {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        clip-path: polygon(0 0, 100% 3%, 90% 100%, 0 100%);
      }

      .vlalg-brawlcard__action {
        display: block;
        width: 135px;
        height: 40px;
        right: 1px;
        top: 1px;
        text-align: center;
        position: absolute;
        overflow: hidden;
        line-height: 37px;
        transform: skew(-12deg);

        &.vlalg-brawlcard__theme--normal {
          background-color: #f8f8f2;
          color: #8e8e8e;
        }
        &.vlalg-brawlcard__theme--primary {
          background-color: #f15574;
          color: #fff;
        }
        &.vlalg-brawlcard__theme--success {
          background-color: #2ecc71;
          color: #fff;
        }
        &.vlalg-brawlcard__theme--danger {
          background-color: #e74c3c;
          color: #fff;
        }
        &.vlalg-brawlcard__theme--warn {
          background-color: #f1c40f;
          color: #fff;
        }
        &.vlalg-brawlcard__theme--info {
          background-color: #3498db;
          color: #fff;
        }
        &.vlalg-brawlcard__theme--dark {
          background-color: #353734;
          color: #f8f8f2;
        }
        &.vlalg-brawlcard__theme--light {
          background-color: #f8f8f2;
          color: #8e8e8e;
        }
      }
    }

    .vlalg-brawlcard__text {
      display: block;
      position: relative;
      width: 248px;
      height: 80px;
      text-align: left;
      background-color: #121212;
      color: #dad8d3;

      .vlalg-brawlcard__text-txt {
        width: 206px;
        height: 69px;
        padding-left: 10px;
        padding-right: 58px;
        padding-top: 8px;
        line-height: 20px;
        overflow: hidden;
      }

      .vlalg-brawlcard__link {
        display: block;
        position: absolute;
        width: 70px;
        height: 93px;
        line-height: 85px;
        top: -10px;
        right: -10px;
        text-align: center;
        font-size: 2em;
        transform: skew(-12deg);

        &:hover {
          cursor: pointer;
        }

        &.vlalg-brawlcard__theme--normal {
          background-color: #f8f8f2;
          color: #8e8e8e;

          &:hover {
            color: #7f8c8d;
            background-color: #eaeaea;
          }
        }
        &.vlalg-brawlcard__theme--primary {
          background-color: #f15574;
          color: #fff;

          &:hover {
            color: #fff;
            background-color: #cf1137;
          }
        }
        &.vlalg-brawlcard__theme--success {
          background-color: #2ecc71;
          color: #fff;
          &:hover {
            color: #fff;
            background-color: #27ae60;
          }
        }
        &.vlalg-brawlcard__theme--danger {
          background-color: #e74c3c;
          color: #fff;
          &:hover {
            color: #fff;
            background-color: #c0392b;
          }
        }
        &.vlalg-brawlcard__theme--warn {
          background-color: #f1c40f;
          color: #fff;
          &:hover {
            color: #fff;
            background-color: #c27c0e;
          }
        }
        &.vlalg-brawlcard__theme--info {
          background-color: #3498db;
          color: #fff;
          &:hover {
            color: #fff;
            background-color: #2980b9;
          }
        }
        &.vlalg-brawlcard__theme--dark {
          background-color: #353734;
          color: #f8f8f2;
          &:hover {
            color: #f8f8f2;
            background-color: #272936;
          }
        }
        &.vlalg-brawlcard__theme--light {
          background-color: #f8f8f2;
          color: #8e8e8e;
          &:hover {
            color: #7f8c8d;
            background-color: #eaeaea;
          }
        }
      }
    }
  }

  // 260px
  @media screen and (min-width: 375px) {
    .vlalg-brawlcard {
      margin: 25px 15px;
    }
  }
  @media screen and (min-width: 425px) {
  }
  @media screen and (min-width: 576px) {
  }
  @media screen and (min-width: 768px) {
  }
  @media screen and (min-width: 1024px) {
  }
  @media screen and (min-width: 1600px) {
  }
</style>
