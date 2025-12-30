<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle]" 
    @click="interacted"
  >
    <div
      :id="nbId"
      :class="['nb-reset', 'component']"
      :style="[componentStyle]"
    >
      <slot>default content</slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, computed, onMounted } from 'vue'

defineOptions({
  name: 'NbZoomText',
  inheritAttrs: false
})

onMounted(() => {
  startValue()
})

const emit = defineEmits(['clicked'])

const props = defineProps({
  nbId: {
    type: String,
    required: true
  },
  background: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: 'black'
  },
  scale: {
    type: Number,
    default: 1.5
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
		default: 400,
		validator: value => {
			return !value ? 200 : value
		}
	}
})

const {
  background,
  backgroundColor,
  textColor,
  scale,
  disabled,
	fontFamily,
	fontSize,
	fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
  const backgroundValue = ![false, true].includes(background.value) ? false : background.value
  const backgroundColorValue = !backgroundColor.value ? '#ffffff' : backgroundColor.value
  const textColorValue = !textColor.value ? 'black' : textColor.value
  const scaleValue = ((scale.value !== 0 && !scale.value) || scale.value < 0) ? 1 : scale.value
  const disabledValue = disabled.value ? 'component-disabled' : ''
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 400 : fontWeight.value

  return {
    background: backgroundValue,
    backgroundColor: backgroundColorValue,
    textColor: textColorValue,
    scale: scaleValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
    disabled: disabledValue
  }
})

const wrapperStyle = computed(() => {
  // const defaultValues = formatDefaultValues.value

  return {}
})
const componentStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  const paddingSize = defaultValues.background ? '1px' : ''

  return {
		fontSize: defaultValues.fontSize,
    fontWeight: defaultValues.fontWeight,
    background: styleBackground.value,
    paddingLeft: paddingSize,
    paddingRight: paddingSize,
  }
})
const styleColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.textColor
})
const styleBackground = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.background ? defaultValues.backgroundColor : ''
})
const size = computed(() => {
  const defaultValues = formatDefaultValues.value
  const newScale = defaultValues.scale

  if (newScale < 0) defaultValues.scale = 0
  if (newScale > 5) defaultValues.scale = 5

  return `scale(${newScale})`
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})
const componentDisabled = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.disabled
})

const startValue = () => { }

const interacted = () => {
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
  display: inline-block;
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
  line-height: inherit;
	font-family: v-bind('font');

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: left;
  -webkit-text-decoration-line: none;
  text-decoration-line: none;
  white-space: nowrap;

  outline: 0;
  position: relative;

  color: v-bind('styleColor');
  transition: transform 0.2s;

  &:hover {
    transform: v-bind('size');
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
    border-radius: inherit;
  }
}
</style>
