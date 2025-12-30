<template>{{ currentValue }}
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component', displayClass]"
      :style="[componentStyle]"
		>
      Aqui
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, watch } from 'vue'

defineOptions({
	name: 'NbInputBase',
	inheritAttrs: false
})

onMounted(() => {
  startValue()
})

const emit = defineEmits(['current-value', 'changed', 'clicked'])

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
  groupName: {
    type: String,
    default: '',
    required: true,
    validator: value => {
      return value.toString().toLowerCase()
    },
  },
  inputValue: {
    type: [String, Number],
    default: null,
  },
  inputType: {
    type: String,
    default: 'text',
    validator: value => {
      return ['text', 'number', 'email', 'password', 'tel', 'url'].indexOf(value) !== -1
    },
  },
  textColor: {
    type: String,
    default: 'black'
  },
  color: {
    type: String,
    default: '#767676'
  },
  hoverEffect: {
    type: Boolean,
    default: false,
    validator: value => {
      return [true, false].indexOf(value) !== -1
    }
  },
  activeHoverEffect: {
    type: Boolean,
    default: false,
    validator: value => {
      return [true, false].indexOf(value) !== -1
    }
  },
  colorHover: {
    type: String,
    default: '#a6a6a6'
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

const currentValue = ref(null)
const {
  inputValue,
  display,
  textColor,
  color,
  hoverEffect,
  activeHoverEffect,
  colorHover,
	disabled,
	fontFamily,
	fontSize,
	fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 200 : fontWeight.value
  const textColorValue = !textColor.value ? 'black' : textColor.value
  const colorValue = !color.value ? '#767676' : color.value
  const hoverEffectValue = ![false, true].includes(hoverEffect.value) ? false : hoverEffect.value
  const activeHoverEffectValue = ![false, true].includes(activeHoverEffect.value) ? false : activeHoverEffect.value
  const colorHoverValue = !colorHover.value ? '#a6a6a6' : colorHover.value

	return {
		disabled: disabledValue,
    display: displayValue,
    textColor: textColorValue,
    color: colorValue,
    hoverEffect: hoverEffectValue,
    activeHoverEffect: activeHoverEffectValue,
    colorHover: colorHoverValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue
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

const displayClass = computed(() => {
  const defaultValues = formatDefaultValues.value

  return (defaultValues.display === 'inline-block') ? 'component-input--display-inline' : 'component-input--display-block'
})

const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
	}
})

const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})

const styleTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textColor
})
const styleColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.color
})
const styleColorHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.hoverEffect ? defaultValues.colorHover : defaultValues.color
})
const styleColorActiveHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.activeHoverEffect ? defaultValues.colorHover : defaultValues.color
})

const startValue = () => {
  currentValue.value = inputValue.value
}
const clicked = () => {
  emit('clicked')
}

watch(inputValue, (newValue, oldValue) => {
  if (newValue !== oldValue) startValue()
})
watch(currentValue, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    emit('current-value', newValue)
    emit('changed', newValue)
  }
})
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
	vertical-align: text-bottom;
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
	font-family: 'Lato', sans-serif;
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

  // Add new properties below
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
