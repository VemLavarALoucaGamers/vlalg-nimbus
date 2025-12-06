<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle]"    
    :tabIndex="tabIndex"
    @click="interacted"
  >
    <div
      :id="nbId"
      :class="['nb-reset', 'component']"
      :style="[componentStyle]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
        <path d="M14 8a.75.75 0 01-.75.75H4.56l1.22 1.22a.75.75 0 11-1.06 1.06l-2.5-2.5a.75.75 0 010-1.06l2.5-2.5a.75.75 0 111.06 1.06L4.56 7.25h8.69A.75.75 0 0114 8z" clip-rule="evenodd"/>
      </svg>

      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, computed, onMounted } from 'vue'

defineOptions({
  name: 'NbButtonBack',
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
	tabIndex: {
		type: Number,
    default: 0
	},
  color: {
    type: String,
    default: '#477e99'
  },
  textColor: {
    type: String,
    default: '#77d2ff'
  },
  text: {
    type: String,
    default: 'back'
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
  color,
  textColor,
  disabled,
	fontFamily,
	fontSize,
	fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
  const disabledValue = disabled.value ? 'component-disabled' : ''
  const colorValue = !color.value ? '#77d2ff' : color.value
  const textColorValue = !textColor.value ? '#6dc1ec' : textColor.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 400 : fontWeight.value

  return {
    color: colorValue,
    textColor: textColorValue,
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

  return {
		fontSize: defaultValues.fontSize,
    fontWeight: defaultValues.fontWeight
  }
})
const styleColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.color
})
const styleTextColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.textColor
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

  border: none;
  color: v-bind(styleTextColor);
  background: transparent;
  letter-spacing: 0;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  transition: all 0.15s linear;

  &:hover {
    svg {
      opacity: 1;
      animation: start-animation 0.2s linear alternate;
      animation-fill-mode: forwards;
    }
  }

  svg {
    animation: end-animation 0.2s linear alternate;
    animation-fill-mode: forwards;
    transform: scale(2.2) translateX(0);
    fill: v-bind(styleColor);
    height: 11px;

    @keyframes start-animation {
      0% {
        opacity: 0;
        transform: scale(2.2) translateX(0);
      }

      100% {
        transform: scale(2.2) translateX(-5px);
        opacity: 1;
      }
    }

    @keyframes end-animation {
      0% {
        transform: scale(2.2) translateX(-5px);
        opacity: 1;
      }

      100% {
        opacity: 0;
        transform: scale(2.2) translateX(0);
      }
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
    border-radius: inherit;
  }
}
</style>
