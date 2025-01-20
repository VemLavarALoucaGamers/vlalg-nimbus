<template>
  <div
    v-if="isValid"
    :id="propId"
    class="vlalg-slideshow"
  >
    <div class="vlalg-slideshow__current-item">
      <div
        class="vlalg-slideshow__current-item-text"
        :class="[showTotalItens, themeSlideNumber, numberDirection]"
      >
        {{ currentImage.number }} / {{ totalSlideList }}
      </div>

      <div
        v-if="showArrow"
        class="vlalg-slideshow__button-prev"
        :class="[themeArrow]"
        @click="plusSlides('prev')"
      >
        &#10094;
      </div>
      <div
        v-if="showArrow"
        class="vlalg-slideshow__button-next"
        :class="[themeArrow]"
        @click="plusSlides('next')"
      >
        &#10095;
      </div>

      <div
        v-if="currentImage.caption"
        class="vlalg-slideshow__caption"
        :class="[fullCaption]"
      >
        <p
          class="vlalg-slideshow__caption-text"
          :class="[
            currentAction ? 'vlalg-slideshow__caption-text--margin' : 'vlalg-slideshow__caption-text--no-margin',
          ]"
        >
          {{ currentImage.caption }}
        </p>
        <span
          v-if="currentAction"
          class="vlalg-slideshow__caption-action"
          :class="[themeAction]"
          @click="clickedCard"
        >
          <font-awesome-icon
            fas
            icon="chevron-right"
          />
        </span>
      </div>

      <img
        class="vlalg-slideshow__current-item-image"
        :src="currentImage.url"
        :alt="currentImage.name"
      />
    </div>

    <div
      v-if="propShowItems"
      class="vlalg-slideshow__list"
    >
      <div
        v-for="(item, index) in slideList"
        :key="index"
        class="vlalg-slideshow__list-item"
      >
        <img
          class="vlalg-slideshow__list-item-image"
          :src="item.url"
          style="width: 100%"
          :alt="item.name"
          :class="{ 'vlalg-slideshow__list-item--active': isActiveSlideItem(index) }"
          @click="changeSlideItem(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'VlalgSlideshow',
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
    propShowCaption: {
      type: Boolean,
      default: true,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propFullCaption: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propShowTotalItens: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propActionTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propArrowTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propShowArrow: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propNumberTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propNumberDirection: {
      type: String,
      default: 'left',
      validator: value => {
        return ['left', 'right'].indexOf(value) !== -1
      },
    },
    propSlideItems: {
      type: Array,
      required: true,
      default: () => {
        return []
      },
      validator: value => {
        return value.length
      },
    },
    propLinkFieldName: {
      type: String,
      default: 'url',
    },
    propLinkType: {
      type: String,
      default: 'name',
      required: true,
      validator: value => {
        return ['path', 'name'].indexOf(value) !== -1
      },
    },
    propShowItems: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
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
    onMounted(() => {
      currentIndex.value = 0
      autoChangeSlideItem()
    })

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const {
      propFullCaption,
      propShowTotalItens,
      propActionTheme,
      propArrowTheme,
      propNumberTheme,
      propSlideItems,
      propLinkFieldName,
      propLinkType,
      propNumberDirection,
      propShowArrow,
    } = toRefs(props)

    /* DATA */
    const currentIndex = ref(0)

    /* COMPUTED */
    const isValid = computed(() => {
      return !!propSlideItems.value.length
    })
    const slideList = computed(() => {
      return propSlideItems.value
    })
    const lastSlideListIndex = computed(() => {
      return slideList.value.length - 1
    })
    const totalSlideList = computed(() => {
      return slideList.value.length
    })
    const currentImage = computed(() => {
      const index = currentIndex.value
      const currentItem = slideList.value[index]

      return {
        number: index + 1,
        url: currentItem.url,
        caption: currentItem.caption,
        name: currentItem.name,
      }
    })
    const currentAction = computed(() => {
      const index = currentIndex.value
      const currentItem = slideList.value[index]
      const fieldName = propLinkFieldName.value

      return !!currentItem[fieldName]
    })
    const fullCaption = computed(() => {
      if (propFullCaption.value) return 'vlalg-slideshow__caption--full'

      return ''
    })
    const showTotalItens = computed(() => {
      if (propShowTotalItens.value) return 'vlalg-slideshow__current-item-text--show'

      return ''
    })
    const themeAction = computed(() => {
      switch (propActionTheme.value) {
        case 'primary':
          return 'vlalg-slideshow__caption-action-theme--primary'
        case 'success':
          return 'vlalg-slideshow__caption-action-theme--success'
        case 'info':
          return 'vlalg-slideshow__caption-action-theme--info'
        case 'danger':
          return 'vlalg-slideshow__caption-action-theme--danger'
        case 'warn':
          return 'vlalg-slideshow__caption-action-theme--warn'
        case 'dark':
          return 'vlalg-slideshow__caption-action-theme--dark'
        case 'light':
          return 'vlalg-slideshow__caption-action-theme--light'
        default:
          return 'vlalg-slideshow__caption-action-theme--normal'
      }
    })
    const themeArrow = computed(() => {
      switch (propArrowTheme.value) {
        case 'primary':
          return 'vlalg-slideshow__arrow-theme--primary'
        case 'success':
          return 'vlalg-slideshow__arrow-theme--success'
        case 'info':
          return 'vlalg-slideshow__arrow-theme--info'
        case 'danger':
          return 'vlalg-slideshow__arrow-theme--danger'
        case 'warn':
          return 'vlalg-slideshow__arrow-theme--warn'
        case 'dark':
          return 'vlalg-slideshow__arrow-theme--dark'
        case 'light':
          return 'vlalg-slideshow__arrow-theme--light'
        default:
          return 'vlalg-slideshow__arrow-theme--normal'
      }
    })
    const themeSlideNumber = computed(() => {
      switch (propNumberTheme.value) {
        case 'primary':
          return 'vlalg-slideshow__slide-number-theme--primary'
        case 'success':
          return 'vlalg-slideshow__slide-number-theme--success'
        case 'info':
          return 'vlalg-slideshow__slide-number-theme--info'
        case 'danger':
          return 'vlalg-slideshow__slide-number-theme--danger'
        case 'warn':
          return 'vlalg-slideshow__slide-number-theme--warn'
        case 'dark':
          return 'vlalg-slideshow__slide-number-theme--dark'
        case 'light':
          return 'vlalg-slideshow__slide-number-theme--light'
        default:
          return 'vlalg-slideshow__slide-number-theme--normal'
      }
    })
    const numberDirection = computed(() => {
      switch (propNumberDirection.value) {
        case 'right':
          return 'vlalg-slideshow__slide-number--right'
        default:
          return 'vlalg-slideshow__slide-number--left'
      }
    })
    const moreOneItem = computed(() => {
      return totalSlideList.value > 1
    })
    const showArrow = computed(() => {
      if (propShowArrow.value && moreOneItem.value) return true

      return false
    })

    /* METHODS */
    const plusSlides = type => {
      const index = currentIndex.value

      if (type === 'next') {
        if (index >= lastSlideListIndex.value) {
          currentIndex.value = 0
        } else {
          currentIndex.value = index + 1
        }
      } else {
        if (index <= 0) {
          currentIndex.value = lastSlideListIndex.value
        } else {
          currentIndex.value = index - 1
        }
      }
    }
    const changeSlideItem = index => {
      if (currentIndex.value !== index) currentIndex.value = index
    }
    const isActiveSlideItem = itemIndex => {
      return currentIndex.value === itemIndex
    }
    const autoChangeSlideItem = () => {
      if (moreOneItem.value) {
        setInterval(() => {
          plusSlides('next')
        }, 5000)
      }
    }
    const clickedCard = () => {
      const currentItem = slideList.value[currentIndex.value]
      const fieldName = propLinkFieldName.value

      const routerPushType = propLinkType.value
      const routerPushParams = {}

      routerPushParams[routerPushType] = currentItem[fieldName]

      router.push({ ...routerPushParams })
    }

    /* WATCH */

    return {
      currentImage,
      slideList,
      totalSlideList,
      plusSlides,
      changeSlideItem,
      isActiveSlideItem,
      clickedCard,
      fullCaption,
      showTotalItens,
      themeAction,
      themeArrow,
      themeSlideNumber,
      isValid,
      numberDirection,
      currentAction,
      moreOneItem,
      showArrow,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-slideshow {
    position: relative;
    display: inline-block;
    width: 100%;
    height: auto;
    overflow: hidden;
    margin: 0;
    padding: 0;
    vertical-align: top;

    .vlalg-slideshow__current-item {
      display: block;
      position: relative;
      max-height: 207px;
      overflow: hidden;

      .vlalg-slideshow__current-item-text {
        padding: 8px 12px;
        position: absolute;
        top: 0;
        display: none;
        font-weight: bold;
        font-size: 0.8em;
        user-select: none;

        &.vlalg-slideshow__current-item-text--show {
          display: block;
        }

        &.vlalg-slideshow__slide-number--left {
          left: 0;
        }
        &.vlalg-slideshow__slide-number--right {
          right: 0;
        }

        &.vlalg-slideshow__slide-number-theme--normal {
          background-color: #f8f8f2;
          color: #8e8e8e;

          &:hover {
            color: #7f8c8d;
            background-color: #eaeaea;
          }
        }
        &.vlalg-slideshow__slide-number-theme--primary {
          background-color: #f15574;
          color: #fff;

          &:hover {
            color: #fff;
            background-color: #cf1137;
          }
        }
        &.vlalg-slideshow__slide-number-theme--success {
          background-color: #2ecc71;
          color: #fff;
          &:hover {
            color: #fff;
            background-color: #27ae60;
          }
        }
        &.vlalg-slideshow__slide-number-theme--danger {
          background-color: #e74c3c;
          color: #fff;
          &:hover {
            color: #fff;
            background-color: #c0392b;
          }
        }
        &.vlalg-slideshow__slide-number-theme--warn {
          background-color: #f1c40f;
          color: #fff;
          &:hover {
            color: #fff;
            background-color: #c27c0e;
          }
        }
        &.vlalg-slideshow__slide-number-theme--info {
          background-color: #3498db;
          color: #fff;
          &:hover {
            color: #fff;
            background-color: #2980b9;
          }
        }
        &.vlalg-slideshow__slide-number-theme--dark {
          background-color: #353734;
          color: #f8f8f2;
          &:hover {
            color: #f8f8f2;
            background-color: #272936;
          }
        }
        &.vlalg-slideshow__slide-number-theme--light {
          background-color: #f8f8f2;
          color: #8e8e8e;
          &:hover {
            color: #7f8c8d;
            background-color: #eaeaea;
          }
        }
      }

      .vlalg-slideshow__current-item-image {
        width: 100%;
      }

      .vlalg-slideshow__button-prev {
        cursor: pointer;
        position: absolute;
        top: 40%;
        width: auto;
        padding: 3px 15px;
        color: white;
        font-weight: bold;
        font-size: 20px;
        border-radius: 0 3px 3px 0;
        user-select: none;
        -webkit-user-select: none;
        background-color: none;

        &:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
      }

      .vlalg-slideshow__button-next {
        cursor: pointer;
        position: absolute;
        top: 40%;
        width: auto;
        padding: 3px 15px;
        color: white;
        font-weight: bold;
        font-size: 20px;
        border-radius: 0 3px 3px 0;
        user-select: none;
        -webkit-user-select: none;
        right: 0;
        border-radius: 3px 0 0 3px;
        background-color: none;

        &:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
      }

      .vlalg-slideshow__button-prev,
      .vlalg-slideshow__button-next {
        &.vlalg-slideshow__arrow-theme--normal {
          background-color: #f8f8f2;
          color: #8e8e8e;

          &:hover {
            color: #7f8c8d;
            background-color: #eaeaea;
          }
        }
        &.vlalg-slideshow__arrow-theme--primary {
          background-color: #f15574;
          color: #fff;

          &:hover {
            color: #fff;
            background-color: #cf1137;
          }
        }
        &.vlalg-slideshow__arrow-theme--success {
          background-color: #2ecc71;
          color: #fff;
          &:hover {
            color: #fff;
            background-color: #27ae60;
          }
        }
        &.vlalg-slideshow__arrow-theme--danger {
          background-color: #e74c3c;
          color: #fff;
          &:hover {
            color: #fff;
            background-color: #c0392b;
          }
        }
        &.vlalg-slideshow__arrow-theme--warn {
          background-color: #f1c40f;
          color: #fff;
          &:hover {
            color: #fff;
            background-color: #c27c0e;
          }
        }
        &.vlalg-slideshow__arrow-theme--info {
          background-color: #3498db;
          color: #fff;
          &:hover {
            color: #fff;
            background-color: #2980b9;
          }
        }
        &.vlalg-slideshow__arrow-theme--dark {
          background-color: #353734;
          color: #f8f8f2;
          &:hover {
            color: #f8f8f2;
            background-color: #272936;
          }
        }
        &.vlalg-slideshow__arrow-theme--light {
          background-color: #f8f8f2;
          color: #8e8e8e;
          &:hover {
            color: #7f8c8d;
            background-color: #eaeaea;
          }
        }
      }

      .vlalg-slideshow__caption {
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 2px 16px;
        color: white;
        position: absolute;
        bottom: 0px;
        height: 50px;
        overflow: hidden;

        &.vlalg-slideshow__caption--full {
          left: 0;
          right: 0;
        }

        .vlalg-slideshow__caption-text {
          margin: 0;
          padding: 0;
          position: relative;
          line-height: 22px;

          &.vlalg-slideshow__caption-text--margin {
            margin-right: 45px !important;
          }

          &.vlalg-slideshow__caption-text--no-margin {
            margin-right: 0 !important;
          }
        }

        .vlalg-slideshow__caption-action {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          padding: 10px 23px;
          text-align: center;
          font-size: 1.5em;
          line-height: 30px;

          &:hover {
            cursor: pointer;
          }

          &.vlalg-slideshow__caption-action-theme--normal {
            background-color: #f8f8f2;
            color: #8e8e8e;

            &:hover {
              color: #7f8c8d;
              background-color: #eaeaea;
            }
          }
          &.vlalg-slideshow__caption-action-theme--primary {
            background-color: #f15574;
            color: #fff;

            &:hover {
              color: #fff;
              background-color: #cf1137;
            }
          }
          &.vlalg-slideshow__caption-action-theme--success {
            background-color: #2ecc71;
            color: #fff;
            &:hover {
              color: #fff;
              background-color: #27ae60;
            }
          }
          &.vlalg-slideshow__caption-action-theme--danger {
            background-color: #e74c3c;
            color: #fff;
            &:hover {
              color: #fff;
              background-color: #c0392b;
            }
          }
          &.vlalg-slideshow__caption-action-theme--warn {
            background-color: #f1c40f;
            color: #fff;
            &:hover {
              color: #fff;
              background-color: #c27c0e;
            }
          }
          &.vlalg-slideshow__caption-action-theme--info {
            background-color: #3498db;
            color: #fff;
            &:hover {
              color: #fff;
              background-color: #2980b9;
            }
          }
          &.vlalg-slideshow__caption-action-theme--dark {
            background-color: #353734;
            color: #f8f8f2;
            &:hover {
              color: #f8f8f2;
              background-color: #272936;
            }
          }
          &.vlalg-slideshow__caption-action-theme--light {
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

    .vlalg-slideshow__list {
      min-height: 62px;
      max-height: 122px;
      height: auto;
      overflow: hidden;
      display: none;

      &:after {
        content: '';
        display: table;
        clear: both;
      }

      .vlalg-slideshow__list-item {
        float: left;
        width: 16.66%;
        min-height: 62px;
        max-height: 148px;
        overflow: hidden;
        background: #ffffff;

        &:hover {
          cursor: pointer;
        }

        .vlalg-slideshow__list-item-image {
          opacity: 0.6;

          &:hover {
            opacity: 1;
          }

          &.vlalg-slideshow__list-item--active {
            opacity: 1;
          }
        }
      }
    }

    @media screen and (min-width: 375px) {
      .vlalg-slideshow__current-item {
        max-height: 243px;
        .vlalg-slideshow__caption {
          height: 50px;
        }
      }
    }
    @media screen and (min-width: 425px) {
      .vlalg-slideshow__current-item {
        max-height: 277px;
        .vlalg-slideshow__caption {
          height: 50px;
        }
      }
    }
    @media screen and (min-width: 576px) {
      .vlalg-slideshow__current-item {
        max-height: 377px;
      }
    }
    @media screen and (min-width: 768px) {
      width: 100%;

      .vlalg-slideshow__list {
        display: block;
        max-height: 78px;
      }

      .vlalg-slideshow__current-item {
        max-height: 415px;
        .vlalg-slideshow__caption {
          .vlalg-slideshow__caption-text {
            padding-top: 0;
          }
        }
      }
    }
    @media screen and (min-width: 1024px) {
      .vlalg-slideshow__list {
        max-height: 88px;
      }

      .vlalg-slideshow__current-item {
        max-height: 586px;

        .vlalg-slideshow__caption {
          .vlalg-slideshow__caption-text {
            padding-top: 0;
          }
        }
      }
    }
    @media screen and (min-width: 1600px) {
      .vlalg-slideshow__list {
        max-height: 122px;
      }

      .vlalg-slideshow__current-item {
        max-height: 690px;
        .vlalg-slideshow__caption {
          height: 40px;

          .vlalg-slideshow__caption-text {
            padding-top: 7px;
          }

          .vlalg-slideshow__caption-action {
            line-height: 20px;
          }
        }
      }
    }
  }
</style>
