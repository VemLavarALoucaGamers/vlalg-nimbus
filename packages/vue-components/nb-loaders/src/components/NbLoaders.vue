<template>
  <div v-if="nbId" :class="['nb-wrapper', componentDisabled]" :style="[wrapperStyle]">
    <div :id="nbId" :class="['nb-reset', 'component']" :style="[componentStyle]">
      <div v-if="loaderMode === 'modeOne'" :class="loaderType"></div>
      <div v-else :class="[modeTwoClass]">
        <div v-for="index in numberDivs" :key="index"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive, toRefs, computed } from 'vue'

defineOptions({
  name: 'NbLoaders',
  inheritAttrs: false
})

const props = defineProps({
  nbId: {
    type: String,
    required: true
  },
  colorPrimary: {
    type: String,
    default: '#477e99'
  },
  colorSecondary: {
    type: String,
    default: '#77d2ff'
  },
  colorExtra: {
    type: String,
    default: '#68b9e2'
  },
  type: {
    type: String,
    default: 'clock',
    validator: (value = 'clock') => {
      const currentValue = value ? value.toLowerCase() : ''
      return [
        'clock',
        'glass-filling',
        'pulse-crazy',
        'pulse',
        'ring-pulse',
        'double-ring-pulse',
        'bling-ball',
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
        'partial-ring'
      ].includes(currentValue)
    }
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  }
})

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
  partialRing: 1
})
const {
  colorPrimary,
  colorSecondary,
  colorExtra,
  type,
  disabled
} = toRefs(props)

const formatDefaultValues = computed(() => {
  const disabledValue = disabled.value ? 'component-disabled' : ''
  const colorPrimaryValue = !colorPrimary.value ? '#77d2ff' : colorPrimary.value
  const colorSecondaryValue = !colorSecondary.value ? '#6dc1ec' : colorSecondary.value
  const colorExtraValue = !colorExtra.value ? '#68b9e2' : colorExtra.value
  const typeValue = !type.value ? 'clock' : type.value

  return {
    colorPrimary: colorPrimaryValue,
    colorSecondary: colorSecondaryValue,
    colorExtra: colorExtraValue,
    type: typeValue,
    disabled: disabledValue
  }
})

const wrapperStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  let newVerticalAlign = ''

  switch (defaultValues.type) {
    case 'xxx':
      newVerticalAlign = 'bottom'
      break;
    default:
      newVerticalAlign = 'baseline'
      break;
  }

  return {
    verticalAlign: newVerticalAlign
  }
})
const componentStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  let newHeight = ''

  switch (defaultValues.type) {
    case 'glass-filling':
      newHeight = '69px'
      break;
    default:
      newHeight = 'auto'
      break;
  }

  return {
    height: newHeight
  }
})
const styleColorOne = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.colorPrimary
})
const styleColorTwo = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.colorSecondary
})
const styleColorExtra = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.colorExtra
})
const loaderType = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `component__loader-${defaultValues.type}`
})
const loaderMode = computed(() => {
  const defaultValues = formatDefaultValues.value

  const modeOne = [
    'clock',
    'glass-filling',
    'pulse-crazy',
    'pulse',
    'ring-pulse',
    'double-ring-pulse',
    'bling-ball'
  ]

  return modeOne.includes(defaultValues.type) ? 'modeOne' : 'modeTwo'
})
const numberDivs = computed(() => {
  const defaultValues = formatDefaultValues.value

  const fromConfig = { length: 0 }

  switch (defaultValues.type) {
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
const modeTwoClass = computed(() => {
  const defaultValues = formatDefaultValues.value

  switch (defaultValues.type) {
    case 'water-drop':
      return 'component__loader-water-drop'
    case 'coin':
      return 'component__loader-coin'
    case 'circle-lines':
      return 'component__loader-circle-lines'
    case 'solar':
      return 'component__loader-solar'
    case 'dots':
      return 'component__loader-dots'
    case 'leds':
      return 'component__loader-leds'
    case 'snake':
      return 'component__loader-snake'
    case 'zoom-ball':
      return 'component__loader-zoom-ball'
    case 'train':
      return 'component__loader-train'
    case 'ring':
      return 'component__loader-ring'
    case 'partial-ring':
      return 'component__loader-partial-ring'
    default:
      return 'component__loader-bars'
  }
})
const componentDisabled = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.disabled
})
</script>

<style lang="scss" scoped>
.nb-wrapper {
  margin: 0;
  padding: 0;
  font-size: 62.5%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
}

.nb-reset {
  line-height: 1.42857143;

  * {
    margin: 0;
    padding: 0;
  }

  *,
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
}

.component {
  margin: 0;
  box-sizing: border-box;
  line-height: 16px;

  user-select: none;

  touch-action: manipulation;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: left;
  -webkit-text-decoration-line: none;
  text-decoration-line: none;
  white-space: nowrap;

  outline: 0;
  position: relative;

  .component__loader-clock {
    position: relative;
    width: 86px;
    height: 86px;
    border-radius: 50%;
    border: 3px solid v-bind(styleColorOne);

    &:after {
      content: "";
      display: block;
      position: absolute;
      left: 40px;
      bottom: 40px;
      width: 2px;
      height: 28px;
      background: v-bind(styleColorOne);
      transform-origin: 0 100%;
      animation: tick 1s infinite;
    }

    @keyframes tick {
      to {
        transform: rotate(359deg);
      }
    }
  }

  .component__loader-glass-filling {
    --type: inset;

    width: 32px;
    height: 86px;
    position: relative;
    border: 2px solid v-bind(styleColorTwo);
    transform: perspective(140px) rotateX(-45deg);
    animation: load 1.5s linear alternate infinite;

    @keyframes load {
      0% {
        box-shadow: var(--type) 0 0 v-bind(styleColorOne);
        // transform: rotateX(0deg);
      }

      100% {
        box-shadow: var(--type) 0 -100px v-bind(styleColorOne);
        // transform: rotateX(90deg);
      }
    }
  }

  .component__loader-pulse-crazy {
    display: inline-block;
    background: v-bind(styleColorTwo);
    border-radius: 50%;
    border: 50px solid v-bind(styleColorOne);
    width: 86px;
    height: 86px;
    animation: pulse-crazy 1.5s ease-out infinite;
    position: absolute;
    // left: 50%;
    // top: 50%;
    transform: translate(-50%, -100%);

    @keyframes pulse-crazy {
      0% {
        background: v-bind(styleColorTwo);
        border: 0px solid v-bind(styleColorTwo);
      }

      50% {
        background: v-bind(styleColorTwo);
        border: 30px solid v-bind(styleColorOne);
      }

      100% {
        background: v-bind(styleColorTwo);
        border: 0px solid v-bind(styleColorOne);
      }
    }
  }

  .component__loader-pulse {
    width: 86px;
    height: 86px;
    background: v-bind(styleColorOne);
    border-radius: 50%;
    animation: pulse 0.85s linear infinite;

    @keyframes pulse {
      0% {
        transform: scale(0.15);
        opacity: 0;
      }

      50% {
        opacity: 1;
      }

      100% {
        transform: scale(1);
        opacity: 0;
      }
    }
  }

  .component__loader-ring-pulse {
    display: inline-block;
    border-radius: 55px;
    transform: scale(0.25) center;
    width: 86px;
    height: 86px;
    border: solid v-bind(styleColorOne) 3px;
    animation: ring-pulse 3s infinite;

    @keyframes ring-pulse {
      from {
        transform: scale(0.25);
        opacity: 1;
      }

      to {
        transform: scale(1);
        opacity: 0;
      }
    }
  }

  .component__loader-double-ring-pulse {
    display: inline-block;
    border-radius: 55px;
    transform: scale(0.25) center;
    width: 86px;
    height: 86px;
    border: double v-bind(styleColorOne) 10px;
    animation: double-ring-pulse 3s infinite;

    @keyframes double-ring-pulse {
      from {
        transform: scale(0.1);
        opacity: 1;
      }

      to {
        color: white;
        transform: scale(1);
        opacity: 0;
      }
    }
  }

  .component__loader-bling-ball {
    width: 86px;
    height: 86px;
    text-decoration: none;
    background-color: v-bind(styleColorOne);
    border-radius: 55px;
    border: dotted 10px;
    animation: breathe 0.75s 0s infinite alternate;

    @keyframes breathe {
      from {
        border-color: v-bind(styleColorExtra);
        background-color: v-bind(styleColorOne);
      }

      to {
        border-color: v-bind(styleColorExtra);
        background-color: v-bind(styleColorTwo);
      }
    }
  }

  .component__loader-bars {
    display: inline-block;
    position: relative;
    width: 105px;
    height: 80px;

    div {
      display: inline-block;
      position: absolute;
      left: 8px;
      width: 16px;
      background-color: v-bind(styleColorOne);
      animation: component__loader__type--bar-animation 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

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

      @keyframes component__loader__type--bar-animation {
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

  .component__loader-water-drop {
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
      border-color: v-bind(styleColorOne);
      animation: component__loader__type--water-drop-animation 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

      &:nth-child(2) {
        animation-delay: -0.5s;
      }

      @keyframes component__loader__type--water-drop-animation {
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

  .component__loader-coin {
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
      background-color: v-bind(styleColorOne);
      animation: component__loader__type--coin-animation 3.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;

      @keyframes component__loader__type--coin-animation {

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

  .component__loader-circle-lines {
    color: official;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    div {
      transform-origin: 30px 30px;
      margin: 10px 0 0 10px;
      animation: component__loader__type--circle-lines-animation 1.2s linear infinite;

      &:after {
        content: ' ';
        display: block;
        position: absolute;
        top: 3px;
        left: 37px;
        width: 6px;
        height: 18px;
        border-radius: 20%;
        background-color: v-bind(styleColorOne);
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

      @keyframes component__loader__type--circle-lines-animation {
        0% {
          opacity: 1;
        }

        100% {
          opacity: 0;
        }
      }
    }
  }

  .component__loader-solar {
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
      border-color: v-bind(styleColorOne);
      animation: component__loader__type--solar-animation 1s ease-in-out infinite;

      &:after {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
        top: -6px;
        left: 50%;
        margin-left: -5px;
        background-color: v-bind(styleColorTwo);
      }

      @keyframes component__loader__type--solar-animation {
        0% {
          transform: rotate(0);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }
  }

  .component__loader-dots {
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
      background-color: v-bind(styleColorOne);
      animation-timing-function: cubic-bezier(0, 1, 1, 0);

      &:nth-child(1) {
        left: 8px;
        animation: component__loader__type--dots-1-animation 0.6s infinite;
      }

      &:nth-child(2) {
        left: 8px;
        animation: component__loader__type--dots-2-animation 0.6s infinite;
      }

      &:nth-child(3) {
        left: 32px;
        animation: component__loader__type--dots-2-animation 0.6s infinite;
      }

      &:nth-child(4) {
        left: 56px;
        animation: component__loader__type--dots-3-animation 0.6s infinite;
      }

      @keyframes component__loader__type--dots-1-animation {
        0% {
          transform: scale(0);
        }

        100% {
          transform: scale(1);
        }
      }

      @keyframes component__loader__type--dots-2-animation {
        0% {
          transform: translate(0, 0);
        }

        100% {
          transform: translate(24px, 0);
        }
      }

      @keyframes component__loader__type--dots-3-animation {
        0% {
          transform: scale(1);
        }

        100% {
          transform: scale(0);
        }
      }
    }
  }

  .component__loader-leds {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    div {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: v-bind(styleColorOne);
      animation: component__loader__type--leds-animation 1.2s linear infinite;

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

      @keyframes component__loader__type--leds-animation {

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

  .component__loader-snake {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    div {
      transform-origin: 40px 40px;
      animation: component__loader__type--snake-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

      &:after {
        content: ' ';
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin: -4px 0 0 -4px;
        background-color: v-bind(styleColorOne);
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

      @keyframes component__loader__type--snake-animation {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }
  }

  .component__loader-zoom-ball {
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
      animation: component__loader__type--zoom-ball-animation 2s infinite ease-in-out;

      &:nth-child(1) {
        background-color: v-bind(styleColorOne);
      }

      &:nth-child(2) {
        animation-delay: -1s;
        background-color: v-bind(styleColorTwo);
      }

      @keyframes component__loader__type--zoom-ball-animation {

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

  .component__loader-train {
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
      border-color: v-bind(styleColorTwo);
      border-left-color: v-bind(styleColorOne);
      animation: component__loader__type--train-animation 1s linear infinite;

      @keyframes component__loader__type--train-animation {
        to {
          transform: rotate(360deg);
        }
      }
    }
  }

  .component__loader-ring {
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
      border-color: v-bind(styleColorOne) transparent transparent transparent;
      animation: component__loader__type--ring-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

      &:nth-child(1) {
        animation-delay: -0.45s;
      }

      &:nth-child(2) {
        animation-delay: -0.3s;
      }

      &:nth-child(3) {
        animation-delay: -0.15s;
      }

      @keyframes component__loader__type--ring-animation {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }
  }

  .component__loader-partial-ring {
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
        border-color: v-bind(styleColorOne) transparent v-bind(styleColorOne) transparent;
        animation: component__loader__type--partial-ring-animation 1.2s linear infinite;
      }

      @keyframes component__loader__type--partial-ring-animation {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}

.component-disabled {
  cursor: not-allowed;
  pointer-events: none;
  user-select: none;

  .component {
    opacity: 0.7;
    border-radius: inherit;
  }
}
</style>
