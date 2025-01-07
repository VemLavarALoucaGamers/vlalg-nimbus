<!--
<NbTest
          nb-id="radio1"
          message="texto tooltip de teste asdas dasdasdas"
        >Mouse aqui</NbTest>
        
        <br><br>
        
        <p>
          Text before
          <NbTest
            nb-id="radio1"
            display="ib"
            direction="bottom"
            message="texto tooltip de teste asdas dasdasdas"
          >
            Mouse aqui
          </NbTest>
          text after
        </p>
-->
<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle]"
    @focus="interacted"
  >
    <div
      :id="nbId"
      :class="['nb-reset', 'component', componentDirection, status]"
      :style="[componentStyle]"
    >
      <div class="component__text" @click="interacted">
        <slot></slot>
      </div>
      <span
        v-if="message"
        class="component__message"
        :style="[tooltipStyle]"
      >
        {{ message }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed } from 'vue'

defineOptions({
  name: 'NbTooltipSimple',
  inheritAttrs: false
})

const emit = defineEmits(['clicked', 'status'])

const props = defineProps({
  nbId: {
    type: String,
    required: true
  },
  display: {
    type: String,
    default: 'b',
    validator: (value = 'b') => {
      const currentValue = value ? value.toLowerCase() : ''
      return ['b', 'ib'].includes(currentValue)
    }
  },
  direction: {
    type: String,
    default: 'top',
    validator: value => {
      return ['top', 'bottom'].indexOf(value) !== -1
    },
  },
  message: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  textTooltipColor: {
    type: String,
    default: '#ffffff'
  },
  color: {
    type: String,
    default: '#f15574'
  },
  boxRadius: {
    type: Number,
    default: 2
  },
  paddingX: {
    type: Number,
    default: 2
  },
  paddingY: {
    type: Number,
    default: 7
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  fontFamily: {
    type: String,
    default: `'Lato', sans-serif`
  },
  fontSize: {
    type: String,
    default: '1.6em',
    validator: value => {
      return !value ? '1.6em' : value
    }
  },
  fontWeight: {
    type: Number,
    default: 200,
    validator: value => {
      return !value ? 200 : value
    }
  },
  fontFamilyTooltip: {
    type: String,
    default: `'Lato', sans-serif`
  },
  fontSizeTooltip: {
    type: String,
    default: '.8em',
    validator: value => {
      return !value ? '.8em' : value
    }
  },
  fontWeightTooltip: {
    type: Number,
    default: 200,
    validator: value => {
      return !value ? 200 : value
    }
  }
})

const show = ref(false)
const {
  display,
  direction,
  textColor,
  textTooltipColor,
  color,
  boxRadius,
  paddingX,
  paddingY,
  disabled,
  fontFamily,
  fontSize,
  fontWeight,
  fontFamilyTooltip,
  fontSizeTooltip,
  fontWeightTooltip
} = toRefs(props)

const formatDefaultValues = computed(() => {
  const disabledValue = disabled.value ? 'component-disabled' : ''
  const directionValue = !direction.value ? 'top' : direction.value
  const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
  const textColorValue = !textColor.value ? '#ffffff' : textColor.value
  const textTooltipColorValue = !textTooltipColor.value ? '#ffffff' : textTooltipColor.value
  const colorValue = !color.value ? '#f15574' : color.value
  const boxRadiusValue = (boxRadius.value !== 0 && !boxRadius.value) || boxRadius.value < 0 ? 6 : boxRadius.value
  const paddingXValue = (paddingX.value !== 0 && !paddingX.value) || paddingX.value < 0 ? 2 : paddingX.value
  const paddingYValue = (paddingY.value !== 0 && !paddingY.value) || paddingY.value < 0 ? 7 : paddingY.value
  const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
  const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
  const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 200 : fontWeight.value
  const fontTooltipValue = !fontFamilyTooltip.value ? `'Lato', sans-serif` : fontFamilyTooltip.value
  const fontSizeTooltipValue = !fontSizeTooltip.value ? '.8em' : fontSizeTooltip.value
  const fontWeightTooltipValue = !fontWeightTooltip.value || fontWeightTooltip.value < 0 ? 200 : fontWeightTooltip.value

  return {
    disabled: disabledValue,
    direction: directionValue,
    display: displayValue,
    textColor: textColorValue,
    textTooltipColor: textTooltipColorValue,
    color: colorValue,
    boxRadius: boxRadiusValue,
    paddingX: paddingXValue,
    paddingY: paddingYValue,
    font: fontValue,
    fontSize: fontSizeValue,
    fontWeight: fontWeightValue,
    fontTooltip: fontTooltipValue,
    fontSizeTooltip: fontSizeTooltipValue,
    fontWeightTooltip: fontWeightTooltipValue
  }
})
const componentDisabled = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.disabled
})
const wrapperStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    display: defaultValues.display
  }
})
const componentStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    color: `${defaultValues.textColor} !important`,
    fontSize: defaultValues.fontSize,
    fontWeight: defaultValues.fontWeight
  }
})
const borderColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.color
})
const borderColorTop = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `${defaultValues.color} transparent transparent transparent`
})
const borderColorBottom = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `transparent transparent ${defaultValues.color} transparent`
})
const tooltipStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    color: `${defaultValues.textTooltipColor} !important`,
    background: `${defaultValues.color} !important`,
    fontFamily: `${defaultValues.fontTooltip} !important`,
    fontSize: `${defaultValues.fontSizeTooltip} !important`,
    fontWeight: `${defaultValues.fontWeightTooltip} !important`,
    padding: `${defaultValues.paddingX}px ${defaultValues.paddingY}px !important`,
    borderRadius: `${defaultValues.boxRadius}px`
  }
})
const componentDirection = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `component--${defaultValues.direction}`
})
const font = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.font
})
const styleTextColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.textColor
})
const status = computed(() => {
  const statusName = show.value ? 'show' : 'hidden'

  return `component--${statusName}`
})

const interacted = () => {
  show.value = !show.value

  emit('status', show.value)
  emit('clicked')
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

.nb-wrapper {
  margin: 0;
  padding: 0;
  font-size: 62.5%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  // display: inline-block;
  vertical-align: bottom;
}

.nb-reset {
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: light;
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
  font-family: v-bind('font');

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
  display: inline-block;
  border: 0;
  border-bottom: 1px;
  border-style: dotted;
  border-color: v-bind('borderColor');

  &.component--top {
    .component__message {
      bottom: 125%;
      left: 50%;
      margin-left: -60px;

      &:after {
        top: 100%;
        left: 50%;
        margin-left: -5px;

        border-color: v-bind('borderColorTop');
      }
    }
  }
  &.component--bottom {
    .component__message {
      top: 155%;
      left: 50%;
      margin-left: -60px;

      &:after {
        bottom: 100%;
        left: 50%;
        margin-left: -5px;

        border-color: v-bind('borderColorBottom');
      }
    }
  }

  &.component--hidden {
    .component__message {
      visibility: hidden;
      opacity: 0;
    }
  }
  &.component--show {
    .component__message {
      visibility: visible;
      opacity: 1;
    }
  }

  .component__text {
    &:hover {
      cursor: pointer;
    }
  }
  .component__message {
      text-align: center;
      position: absolute;
      z-index: 1;
      transition: opacity 0.3s;

      width: 120px;
      word-break: break-word;
      overflow-wrap: break-word;
      white-space: normal;

      &:after {
        content: '';
        position: absolute;
        border-width: 5px;
        border-style: solid;
      }
  }
}

.component-disabled {
  cursor: not-allowed;
  pointer-events: none;
  user-select: none;

  .component {
    --disabled-color: v-bind('styleTextColor');
    color: var(--disabled-color) !important;
    opacity: 0.7;
  }
}
</style>
