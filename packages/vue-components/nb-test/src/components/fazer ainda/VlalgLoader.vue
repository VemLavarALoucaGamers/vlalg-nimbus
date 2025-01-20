<template>
  <div
    v-if="propVisible"
    :id="propId"
    class="vlalg-loader"
    :class="[theme, type]"
  >
    <div
      v-for="index in numberDivs"
      :key="index"
    ></div>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'VlalgLoader',
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
    propType: {
      type: String,
      default: 'bars',
      validator: value => {
        return (
          [
            'bars',
            'water-drop',
            'coin',
            'circle-lines',
            'solar',
            'dots',
            'leds',
            'snake',
            'zoom-ball',
            'train',
            'ring',
            'partial-ring',
          ].indexOf(value) !== -1
        )
      },
    },
    propVisible: {
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
    const { propType, propTheme } = toRefs(props)

    /* DATA */
    const loadersConfigs = reactive({
      bars: 4,
      waterDrop: 2,
      coin: 1,
      circleLines: 12,
      solar: 1,
      dots: 4,
      leds: 12,
      snake: 8,
      zoomBall: 2,
      train: 1,
      ring: 4,
      partialRing: 1,
    })

    /* COMPUTED */
    const numberDivs = computed(() => {
      const fromConfig = { length: 0 }

      switch (propType.value) {
        case 'water-drop':
          fromConfig.length = loadersConfigs.waterDrop
          break
        case 'coin':
          fromConfig.length = loadersConfigs.coin
          break
        case 'circle-lines':
          fromConfig.length = loadersConfigs.circleLines
          break
        case 'solar':
          fromConfig.length = loadersConfigs.solar
          break
        case 'dots':
          fromConfig.length = loadersConfigs.dots
          break
        case 'leds':
          fromConfig.length = loadersConfigs.leds
          break
        case 'snake':
          fromConfig.length = loadersConfigs.snake
          break
        case 'zoom-ball':
          fromConfig.length = loadersConfigs.zoomBall
          break
        case 'train':
          fromConfig.length = loadersConfigs.train
          break
        case 'ring':
          fromConfig.length = loadersConfigs.ring
          break
        case 'partial-ring':
          fromConfig.length = loadersConfigs.partialRing
          break
        default:
          fromConfig.length = loadersConfigs.bars
          break
      }

      // eslint-disable-next-line no-unused-vars
      return Array.from(fromConfig, (v, k) => k)
    })

    const type = computed(() => {
      switch (propType.value) {
        case 'water-drop':
          return 'vlalg-loader__type--water-drop'
        case 'coin':
          return 'vlalg-loader__type--coin'
        case 'circle-lines':
          return 'vlalg-loader__type--circle-lines'
        case 'solar':
          return 'vlalg-loader__type--solar'
        case 'dots':
          return 'vlalg-loader__type--dots'
        case 'leds':
          return 'vlalg-loader__type--leds'
        case 'snake':
          return 'vlalg-loader__type--snake'
        case 'zoom-ball':
          return 'vlalg-loader__type--zoom-ball'
        case 'train':
          return 'vlalg-loader__type--train'
        case 'ring':
          return 'vlalg-loader__type--ring'
        case 'partial-ring':
          return 'vlalg-loader__type--partial-ring'
        default:
          return 'vlalg-loader__type--bars'
      }
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-loader__theme--primary'
        case 'success':
          return 'vlalg-loader__theme--success'
        case 'info':
          return 'vlalg-loader__theme--info'
        case 'danger':
          return 'vlalg-loader__theme--danger'
        case 'warn':
          return 'vlalg-loader__theme--warn'
        case 'dark':
          return 'vlalg-loader__theme--dark'
        case 'light':
          return 'vlalg-loader__theme--light'
        default:
          return 'vlalg-loader__theme--normal'
      }
    })

    /* METHODS */

    /* WATCH */

    return {
      numberDivs,
      type,
      theme,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-loader {
    // inicio propTheme
    &.vlalg-loader__theme--normal {
      &.vlalg-loader__type--bars {
        div {
          background-color: #f8f8f2;
        }
      }
      &.vlalg-loader__type--water-drop {
        div {
          border-color: #f8f8f2;
        }
      }
      &.vlalg-loader__type--coin {
        div {
          background-color: #f8f8f2;
        }
      }
      &.vlalg-loader__type--circle-lines {
        div {
          &:after {
            background-color: #f8f8f2;
          }
        }
      }
      &.vlalg-loader__type--solar {
        div {
          border-color: rgba(248, 248, 242, 0.5);

          &:after {
            background-color: #f8f8f2;
          }
        }
      }
      &.vlalg-loader__type--dots {
        div {
          background-color: #f8f8f2;
        }
      }
      &.vlalg-loader__type--leds {
        div {
          background-color: #f8f8f2;
        }
      }
      &.vlalg-loader__type--snake {
        div {
          &:after {
            background-color: #f8f8f2;
          }
        }
      }
      &.vlalg-loader__type--zoom-ball {
        div {
          &:nth-child(1) {
            background-color: #f8f8f2;
          }
          &:nth-child(2) {
            background-color: #eaeaea;
          }
        }
      }
      &.vlalg-loader__type--train {
        div {
          border-color: rgba(248, 248, 242, 0.5);
          border-left-color: #f8f8f2;
        }
      }
      &.vlalg-loader__type--ring {
        div {
          border-color: #f8f8f2 transparent transparent transparent;
        }
      }
      &.vlalg-loader__type--partial-ring {
        div {
          &:after {
            border-color: #f8f8f2 transparent #f8f8f2 transparent;
          }
        }
      }
    }
    &.vlalg-loader__theme--primary {
      &.vlalg-loader__type--bars {
        div {
          background-color: #f15574;
        }
      }
      &.vlalg-loader__type--water-drop {
        div {
          border-color: #f15574;
        }
      }
      &.vlalg-loader__type--coin {
        div {
          background-color: #f15574;
        }
      }
      &.vlalg-loader__type--circle-lines {
        div {
          &:after {
            background-color: #f15574;
          }
        }
      }
      &.vlalg-loader__type--solar {
        div {
          border-color: rgba(241, 85, 116, 0.5);

          &:after {
            background-color: #f15574;
          }
        }
      }
      &.vlalg-loader__type--dots {
        div {
          background-color: #f15574;
        }
      }
      &.vlalg-loader__type--leds {
        div {
          background-color: #f15574;
        }
      }
      &.vlalg-loader__type--snake {
        div {
          &:after {
            background-color: #f15574;
          }
        }
      }
      &.vlalg-loader__type--zoom-ball {
        div {
          &:nth-child(1) {
            background-color: #f15574;
          }
          &:nth-child(2) {
            background-color: #cf1137;
          }
        }
      }
      &.vlalg-loader__type--train {
        div {
          border-color: rgba(241, 85, 116, 0.5);
          border-left-color: #f15574;
        }
      }
      &.vlalg-loader__type--ring {
        div {
          border-color: #f15574 transparent transparent transparent;
        }
      }
      &.vlalg-loader__type--partial-ring {
        div {
          &:after {
            border-color: #f15574 transparent #f15574 transparent;
          }
        }
      }
    }

    &.vlalg-loader__theme--success {
      &.vlalg-loader__type--bars {
        div {
          background-color: #2ecc71;
        }
      }
      &.vlalg-loader__type--water-drop {
        div {
          border-color: #2ecc71;
        }
      }
      &.vlalg-loader__type--coin {
        div {
          background-color: #2ecc71;
        }
      }
      &.vlalg-loader__type--circle-lines {
        div {
          &:after {
            background-color: #2ecc71;
          }
        }
      }
      &.vlalg-loader__type--solar {
        div {
          border-color: rgba(46, 204, 113, 0.5);

          &:after {
            background-color: #2ecc71;
          }
        }
      }
      &.vlalg-loader__type--dots {
        div {
          background-color: #2ecc71;
        }
      }
      &.vlalg-loader__type--leds {
        div {
          background-color: #2ecc71;
        }
      }
      &.vlalg-loader__type--snake {
        div {
          &:after {
            background-color: #2ecc71;
          }
        }
      }
      &.vlalg-loader__type--zoom-ball {
        div {
          &:nth-child(1) {
            background-color: #2ecc71;
          }
          &:nth-child(2) {
            background-color: #27ae60;
          }
        }
      }
      &.vlalg-loader__type--train {
        div {
          border-color: rgba(46, 204, 113, 0.5);
          border-left-color: #2ecc71;
        }
      }
      &.vlalg-loader__type--ring {
        div {
          border-color: #2ecc71 transparent transparent transparent;
        }
      }
      &.vlalg-loader__type--partial-ring {
        div {
          &:after {
            border-color: #2ecc71 transparent #2ecc71 transparent;
          }
        }
      }
    }
    &.vlalg-loader__theme--info {
      &.vlalg-loader__type--bars {
        div {
          background-color: #3498db;
        }
      }
      &.vlalg-loader__type--water-drop {
        div {
          border-color: #3498db;
        }
      }
      &.vlalg-loader__type--coin {
        div {
          background-color: #3498db;
        }
      }
      &.vlalg-loader__type--circle-lines {
        div {
          &:after {
            background-color: #3498db;
          }
        }
      }
      &.vlalg-loader__type--solar {
        div {
          border-color: rgba(52, 152, 219, 0.5);

          &:after {
            background-color: #3498db;
          }
        }
      }
      &.vlalg-loader__type--dots {
        div {
          background-color: #3498db;
        }
      }
      &.vlalg-loader__type--leds {
        div {
          background-color: #3498db;
        }
      }
      &.vlalg-loader__type--snake {
        div {
          &:after {
            background-color: #3498db;
          }
        }
      }
      &.vlalg-loader__type--zoom-ball {
        div {
          &:nth-child(1) {
            background-color: #3498db;
          }
          &:nth-child(2) {
            background-color: #2980b9;
          }
        }
      }
      &.vlalg-loader__type--train {
        div {
          border-color: rgba(52, 152, 219, 0.5);
          border-left-color: #3498db;
        }
      }
      &.vlalg-loader__type--ring {
        div {
          border-color: #3498db transparent transparent transparent;
        }
      }
      &.vlalg-loader__type--partial-ring {
        div {
          &:after {
            border-color: #3498db transparent #3498db transparent;
          }
        }
      }
    }
    &.vlalg-loader__theme--warn {
      &.vlalg-loader__type--bars {
        div {
          background-color: #f1c40f;
        }
      }
      &.vlalg-loader__type--water-drop {
        div {
          border-color: #f1c40f;
        }
      }
      &.vlalg-loader__type--coin {
        div {
          background-color: #f1c40f;
        }
      }
      &.vlalg-loader__type--circle-lines {
        div {
          &:after {
            background-color: #f1c40f;
          }
        }
      }
      &.vlalg-loader__type--solar {
        div {
          border-color: rgba(241, 196, 15, 0.5);

          &:after {
            background-color: #f1c40f;
          }
        }
      }
      &.vlalg-loader__type--dots {
        div {
          background-color: #f1c40f;
        }
      }
      &.vlalg-loader__type--leds {
        div {
          background-color: #f1c40f;
        }
      }
      &.vlalg-loader__type--snake {
        div {
          &:after {
            background-color: #f1c40f;
          }
        }
      }
      &.vlalg-loader__type--zoom-ball {
        div {
          &:nth-child(1) {
            background-color: #f1c40f;
          }
          &:nth-child(2) {
            background-color: #c27c0e;
          }
        }
      }
      &.vlalg-loader__type--train {
        div {
          border-color: rgba(241, 196, 15, 0.5);
          border-left-color: #f1c40f;
        }
      }
      &.vlalg-loader__type--ring {
        div {
          border-color: #f1c40f transparent transparent transparent;
        }
      }
      &.vlalg-loader__type--partial-ring {
        div {
          &:after {
            border-color: #f1c40f transparent #f1c40f transparent;
          }
        }
      }
    }
    &.vlalg-loader__theme--danger {
      &.vlalg-loader__type--bars {
        div {
          background-color: #e74c3c;
        }
      }
      &.vlalg-loader__type--water-drop {
        div {
          border-color: #e74c3c;
        }
      }
      &.vlalg-loader__type--coin {
        div {
          background-color: #e74c3c;
        }
      }
      &.vlalg-loader__type--circle-lines {
        div {
          &:after {
            background-color: #e74c3c;
          }
        }
      }
      &.vlalg-loader__type--solar {
        div {
          border-color: rgba(231, 76, 60, 0.5);

          &:after {
            background-color: #e74c3c;
          }
        }
      }
      &.vlalg-loader__type--dots {
        div {
          background-color: #e74c3c;
        }
      }
      &.vlalg-loader__type--leds {
        div {
          background-color: #e74c3c;
        }
      }
      &.vlalg-loader__type--snake {
        div {
          &:after {
            background-color: #e74c3c;
          }
        }
      }
      &.vlalg-loader__type--zoom-ball {
        div {
          &:nth-child(1) {
            background-color: #e74c3c;
          }
          &:nth-child(2) {
            background-color: #c0392b;
          }
        }
      }
      &.vlalg-loader__type--train {
        div {
          border-color: rgba(231, 76, 60, 0.5);
          border-left-color: #e74c3c;
        }
      }
      &.vlalg-loader__type--ring {
        div {
          border-color: #e74c3c transparent transparent transparent;
        }
      }
      &.vlalg-loader__type--partial-ring {
        div {
          &:after {
            border-color: #e74c3c transparent #e74c3c transparent;
          }
        }
      }
    }
    &.vlalg-loader__theme--dark {
      &.vlalg-loader__type--bars {
        div {
          background-color: #353734;
        }
      }
      &.vlalg-loader__type--water-drop {
        div {
          border-color: #353734;
        }
      }
      &.vlalg-loader__type--coin {
        div {
          background-color: #353734;
        }
      }
      &.vlalg-loader__type--circle-lines {
        div {
          &:after {
            background-color: #353734;
          }
        }
      }
      &.vlalg-loader__type--solar {
        div {
          border-color: rgba(53, 55, 52, 0.5);

          &:after {
            background-color: #353734;
          }
        }
      }
      &.vlalg-loader__type--dots {
        div {
          background-color: #353734;
        }
      }
      &.vlalg-loader__type--leds {
        div {
          background-color: #353734;
        }
      }
      &.vlalg-loader__type--snake {
        div {
          &:after {
            background-color: #353734;
          }
        }
      }
      &.vlalg-loader__type--zoom-ball {
        div {
          &:nth-child(1) {
            background-color: #353734;
          }
          &:nth-child(2) {
            background-color: #272936;
          }
        }
      }
      &.vlalg-loader__type--train {
        div {
          border-color: rgba(53, 55, 52, 0.5);
          border-left-color: #353734;
        }
      }
      &.vlalg-loader__type--ring {
        div {
          border-color: #353734 transparent transparent transparent;
        }
      }
      &.vlalg-loader__type--partial-ring {
        div {
          &:after {
            border-color: #353734 transparent #353734 transparent;
          }
        }
      }
    }
    &.vlalg-loader__theme--light {
      &.vlalg-loader__type--bars {
        div {
          background-color: #f8f8f2;
        }
      }
      &.vlalg-loader__type--water-drop {
        div {
          border-color: #f8f8f2;
        }
      }
      &.vlalg-loader__type--coin {
        div {
          background-color: #f8f8f2;
        }
      }
      &.vlalg-loader__type--circle-lines {
        div {
          &:after {
            background-color: #f8f8f2;
          }
        }
      }
      &.vlalg-loader__type--solar {
        div {
          border-color: rgba(248, 248, 242, 0.5);

          &:after {
            background-color: #f8f8f2;
          }
        }
      }
      &.vlalg-loader__type--dots {
        div {
          background-color: #f8f8f2;
        }
      }
      &.vlalg-loader__type--leds {
        div {
          background-color: #f8f8f2;
        }
      }
      &.vlalg-loader__type--snake {
        div {
          &:after {
            background-color: #f8f8f2;
          }
        }
      }
      &.vlalg-loader__type--zoom-ball {
        div {
          &:nth-child(1) {
            background-color: #f8f8f2;
          }
          &:nth-child(2) {
            background-color: #eaeaea;
          }
        }
      }
      &.vlalg-loader__type--train {
        div {
          border-color: rgba(248, 248, 242, 0.5);
          border-left-color: #f8f8f2;
        }
      }
      &.vlalg-loader__type--ring {
        div {
          border-color: #f8f8f2 transparent transparent transparent;
        }
      }
      &.vlalg-loader__type--partial-ring {
        div {
          &:after {
            border-color: #f8f8f2 transparent #f8f8f2 transparent;
          }
        }
      }
    }
    // fim propTheme

    // inicio propType
    &.vlalg-loader__type--bars {
      display: inline-block;
      position: relative;
      width: 105px;
      height: 80px;

      div {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 16px;
        animation: vlalg-loader__type--bar-animation 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

        &:nth-child(1) {
          left: 8px;
          animation-delay: -0.36s;
        }
        &:nth-child(2) {
          left: 32px;
          animation-delay: -0.24s;
        }
        &:nth-child(3) {
          left: 56px;
          animation-delay: -0.12s;
        }
        &:nth-child(4) {
          left: 80px;
          animation-delay: 0;
        }

        @keyframes vlalg-loader__type--bar-animation {
          0% {
            top: 8px;
            height: 80px;
          }

          50%,
          100% {
            top: 24px;
            height: 20px;
          }
        }
      }
    }
    &.vlalg-loader__type--water-drop {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;

      div {
        position: absolute;
        border-width: 4px;
        border-style: solid;
        opacity: 1;
        border-radius: 50%;
        margin: 4px 0 0 4px;
        animation: vlalg-loader__type--water-drop-animation 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

        &:nth-child(2) {
          animation-delay: -0.5s;
        }

        @keyframes vlalg-loader__type--water-drop-animation {
          0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
          }
        }
      }
    }
    &.vlalg-loader__type--coin {
      display: inline-block;
      position: relative;
      width: 70px;
      height: 70px;
      transform: translateZ(1px);

      div {
        display: inline-block;
        position: absolute;
        width: 54px;
        height: 54px;
        border-radius: 50%;
        margin: 8px 0 0 8px;
        animation: vlalg-loader__type--coin-animation 3.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;

        @keyframes vlalg-loader__type--coin-animation {
          0%,
          100% {
            animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
          }
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(1800deg);
            animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
          }
          100% {
            transform: rotateY(3600deg);
          }
        }
      }
    }
    &.vlalg-loader__type--circle-lines {
      color: official;
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;

      div {
        transform-origin: 30px 30px;
        margin: 10px 0 0 10px;
        animation: vlalg-loader__type--circle-lines-animation 1.2s linear infinite;

        &:after {
          content: ' ';
          display: block;
          position: absolute;
          top: 3px;
          left: 37px;
          width: 6px;
          height: 18px;
          border-radius: 20%;
        }

        &:nth-child(1) {
          transform: rotate(0deg);
          animation-delay: -1.1s;
        }
        &:nth-child(2) {
          transform: rotate(30deg);
          animation-delay: -1s;
        }
        &:nth-child(3) {
          transform: rotate(60deg);
          animation-delay: -0.9s;
        }
        &:nth-child(4) {
          transform: rotate(90deg);
          animation-delay: -0.8s;
        }
        &:nth-child(5) {
          transform: rotate(120deg);
          animation-delay: -0.7s;
        }
        &:nth-child(6) {
          transform: rotate(150deg);
          animation-delay: -0.6s;
        }
        &:nth-child(7) {
          transform: rotate(180deg);
          animation-delay: -0.5s;
        }
        &:nth-child(8) {
          transform: rotate(210deg);
          animation-delay: -0.4s;
        }
        &:nth-child(9) {
          transform: rotate(240deg);
          animation-delay: -0.3s;
        }
        &:nth-child(10) {
          transform: rotate(270deg);
          animation-delay: -0.2s;
        }
        &:nth-child(11) {
          transform: rotate(300deg);
          animation-delay: -0.1s;
        }
        &:nth-child(12) {
          transform: rotate(330deg);
          animation-delay: 0s;
        }

        @keyframes vlalg-loader__type--circle-lines-animation {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      }
    }
    &.vlalg-loader__type--solar {
      width: 80px;
      height: 80px;
      position: relative;
      display: inline-block;

      div {
        width: 60px;
        height: 60px;
        margin: 10px 0 0 10px;
        border-width: 2px;
        border-style: solid;
        border-radius: 50%;
        position: absolute;
        background-color: transparent;
        animation: vlalg-loader__type--solar-animation 1s ease-in-out infinite;

        &:after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          position: absolute;
          top: -6px;
          left: 50%;
          margin-left: -5px;
        }

        @keyframes vlalg-loader__type--solar-animation {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
    &.vlalg-loader__type--dots {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;

      div {
        position: absolute;
        width: 10px;
        height: 10px;
        margin: 35px 0 0 2px;
        border-radius: 50%;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);

        &:nth-child(1) {
          left: 8px;
          animation: vlalg-loader__type--dots-1-animation 0.6s infinite;
        }
        &:nth-child(2) {
          left: 8px;
          animation: vlalg-loader__type--dots-2-animation 0.6s infinite;
        }
        &:nth-child(3) {
          left: 32px;
          animation: vlalg-loader__type--dots-2-animation 0.6s infinite;
        }
        &:nth-child(4) {
          left: 56px;
          animation: vlalg-loader__type--dots-3-animation 0.6s infinite;
        }
        @keyframes vlalg-loader__type--dots-1-animation {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes vlalg-loader__type--dots-2-animation {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(24px, 0);
          }
        }
        @keyframes vlalg-loader__type--dots-3-animation {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
      }
    }
    &.vlalg-loader__type--leds {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;

      div {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        animation: vlalg-loader__type--leds-animation 1.2s linear infinite;

        &:nth-child(1) {
          animation-delay: 0s;
          top: 37px;
          left: 66px;
        }
        &:nth-child(2) {
          animation-delay: -0.1s;
          top: 22px;
          left: 62px;
        }
        &:nth-child(3) {
          animation-delay: -0.2s;
          top: 11px;
          left: 52px;
        }
        &:nth-child(4) {
          animation-delay: -0.3s;
          top: 7px;
          left: 37px;
        }
        &:nth-child(5) {
          animation-delay: -0.4s;
          top: 11px;
          left: 22px;
        }
        &:nth-child(6) {
          animation-delay: -0.5s;
          top: 22px;
          left: 11px;
        }
        &:nth-child(7) {
          animation-delay: -0.6s;
          top: 37px;
          left: 7px;
        }
        &:nth-child(8) {
          animation-delay: -0.7s;
          top: 52px;
          left: 11px;
        }
        &:nth-child(9) {
          animation-delay: -0.8s;
          top: 62px;
          left: 22px;
        }
        &:nth-child(10) {
          animation-delay: -0.9s;
          top: 66px;
          left: 37px;
        }
        &:nth-child(11) {
          animation-delay: -1s;
          top: 62px;
          left: 52px;
        }
        &:nth-child(12) {
          animation-delay: -1.1s;
          top: 52px;
          left: 62px;
        }
        @keyframes vlalg-loader__type--leds-animation {
          0%,
          20%,
          80%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
        }
      }
    }
    &.vlalg-loader__type--snake {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;

      div {
        transform-origin: 40px 40px;
        animation: vlalg-loader__type--snake-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

        &:after {
          content: ' ';
          display: block;
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          margin: -4px 0 0 -4px;
        }
        &:nth-child(1) {
          animation-delay: -0.036s;
        }
        &:nth-child(1):after {
          top: 63px;
          left: 63px;
        }
        &:nth-child(2) {
          animation-delay: -0.072s;
        }
        &:nth-child(2):after {
          top: 68px;
          left: 56px;
        }
        &:nth-child(3) {
          animation-delay: -0.108s;
        }
        &:nth-child(3):after {
          top: 71px;
          left: 48px;
        }
        &:nth-child(4) {
          animation-delay: -0.144s;
        }
        &:nth-child(4):after {
          top: 72px;
          left: 40px;
        }
        &:nth-child(5) {
          animation-delay: -0.18s;
        }
        &:nth-child(5):after {
          top: 71px;
          left: 32px;
        }
        &:nth-child(6) {
          animation-delay: -0.216s;
        }
        &:nth-child(6):after {
          top: 68px;
          left: 24px;
        }
        &:nth-child(7) {
          animation-delay: -0.252s;
        }
        &:nth-child(7):after {
          top: 63px;
          left: 17px;
        }
        &:nth-child(8) {
          animation-delay: -0.288s;
        }
        &:nth-child(8):after {
          top: 56px;
          left: 12px;
        }
        @keyframes vlalg-loader__type--snake-animation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
    &.vlalg-loader__type--zoom-ball {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;

      div {
        width: 60px;
        height: 60px;
        margin: 10px 0 0 10px;
        border-radius: 50%;
        opacity: 0.7;
        position: absolute;
        animation: vlalg-loader__type--zoom-ball-animation 2s infinite ease-in-out;

        &:nth-child(2) {
          animation-delay: -1s;
        }

        @keyframes vlalg-loader__type--zoom-ball-animation {
          0%,
          100% {
            transform: scale(0);
          }
          50% {
            transform: scale(1);
          }
        }
      }
    }
    &.vlalg-loader__type--train {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;

      div {
        border-width: 8px;
        border-style: solid;
        position: absolute;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        margin: 10px 0 0 10px;
        display: inline-block;
        animation: vlalg-loader__type--train-animation 1s linear infinite;

        @keyframes vlalg-loader__type--train-animation {
          to {
            transform: rotate(360deg);
          }
        }
      }
    }
    &.vlalg-loader__type--ring {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;

      div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 60px;
        height: 60px;
        margin: 10px 0 0 10px;
        border-width: 8px;
        border-style: solid;
        border-radius: 50%;
        animation: vlalg-loader__type--ring-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

        &:nth-child(1) {
          animation-delay: -0.45s;
        }
        &:nth-child(2) {
          animation-delay: -0.3s;
        }
        &:nth-child(3) {
          animation-delay: -0.15s;
        }

        @keyframes vlalg-loader__type--ring-animation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
    &.vlalg-loader__type--partial-ring {
      display: inline-block;
      width: 80px;
      height: 80px;

      div {
        &:after {
          content: ' ';
          display: block;
          width: 64px;
          height: 64px;
          margin: 8px;
          border-radius: 50%;
          border-width: 6px;
          border-style: solid;
          animation: vlalg-loader__type--partial-ring-animation 1.2s linear infinite;
        }

        @keyframes vlalg-loader__type--partial-ring-animation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
    // fim propType
  }
</style>
