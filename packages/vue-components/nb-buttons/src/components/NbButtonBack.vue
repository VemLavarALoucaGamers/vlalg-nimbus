<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle]"    
    :tabIndex="tabIndex"
    role="button"
    v-bind="computedAriaAttrs"
    @click="interacted"
    @keydown.enter.prevent="!disabled && hasTabIndexEnter && interacted()"
    @keydown.space.prevent="!disabled && hasTabIndexSpace && interacted()"
  >
    <div
      :id="nbId"
      :class="['nb-reset', 'component', themeStyle]"
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
  hasTabIndexEnter: {
    type: Boolean,
    default: true
  },
  hasTabIndexSpace: {
    type: Boolean,
    default: true
  },
  ariaLabel: {
    type: String,
    default: 'Alternate Text Button'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
	theme: {
		type: String,
		default: 'light',
		validator: (value) => {
			const currentValue = value ? value.toLowerCase() : ''
			return ['light', 'dark'].includes(currentValue)
		}
	},
	// Cores do tema light
	lightColor: {
		type: String,
		default: '#333333'
	},
	lightTextColor: {
		type: String,
		default: '#333333'
	},
	lightDisabledBgColor: {
		type: String,
		default: '#dfdfd9'
	},
	// Cores do tema dark
	darkColor: {
		type: String,
		default: '#ffffff'
	},
	darkTextColor: {
		type: String,
		default: '#ffffff'
	},
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
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
  ariaLabel,
  ariaAttrs,
	theme,
	lightColor,
	lightTextColor,
	lightDisabledBgColor,
	darkColor,
	darkTextColor,
	darkDisabledBgColor,
  disabled,
	fontFamily,
	fontSize,
	fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
  const disabledValue = disabled.value ? 'component-disabled' : ''
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 400 : fontWeight.value

  return {
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
const themeStyle = computed(() => {
	return theme.value === 'dark' ? 'component__theme--dark' : 'component__theme--light'
})

// Computed properties para as cores do theme (necessárias para v-bind no CSS)
const styleLightColor = computed(() => lightColor.value)
const styleLightTextColor = computed(() => lightTextColor.value)
const styleLightDisabledBgColor = computed(() => lightDisabledBgColor.value)
const styleDarkColor = computed(() => darkColor.value)
const styleDarkTextColor = computed(() => darkTextColor.value)
const styleDarkDisabledBgColor = computed(() => darkDisabledBgColor.value)
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})
const componentDisabled = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.disabled
})
const computedAriaAttrs = computed(() => {
  const newAttrs = {}

  if (ariaAttrs.value) {
    const attrKeys = Object.keys(ariaAttrs.value)

    attrKeys.forEach(key => newAttrs[`aria-${key}`] = ariaAttrs.value[key])
  }

  const attrs = {
    'aria-label': ariaLabel.value,
    'aria-disabled': disabled.value,
    ...newAttrs
  }
  
  // Remove atributos undefined/null
  return Object.fromEntries(
    Object.entries(attrs).filter(([_, value]) => value !== undefined && value !== null)
  )
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
  vertical-align: bottom;
  margin-bottom: 3px;
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

	// Theme light
	&.component__theme--light {
		color: v-bind('styleLightTextColor');

		svg {
			fill: v-bind('styleLightColor');
		}
	}

	// Theme dark
	&.component__theme--dark {
		color: v-bind('styleDarkTextColor');

		svg {
			fill: v-bind('styleDarkColor');
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

		&.component__theme--light {
			color: v-bind('styleLightTextColor') !important;
		}

		&.component__theme--dark {
			color: v-bind('styleDarkTextColor') !important;
		}
  }
}
</style>
