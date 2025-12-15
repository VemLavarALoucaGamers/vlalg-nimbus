<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
    :tabIndex="disabled ? -1 : tabIndex"
    role="button"
    v-bind="computedAriaAttrs"
    @keydown.enter.prevent="!disabled && hasTabIndexEnter && handleKeydown()"
    @keydown.space.prevent="!disabled && hasTabIndexSpace && handleKeydown()"
	>
		<div
			:id="nbId"
      :class="['nb-reset', 'component', themeStyle]"
			:style="[componentStyle]"
		>
      <input
        :id="`${nbId}-input`"
        v-model="currentStatus"
        type="checkbox"
        :disabled="disabled"
        class="component-input"
        @change="handleChange"
      />
      <label
        :for="`${nbId}-input`"
        class="component-label"
        :class="[
          currentStatus ? 'component-button--left' : 'component-button--right',
          hasAnimation ? 'component-label-text-animation' : '',
        ]"
      >
        <div class="component-label-button"></div>
        <span
          v-if="currentStatus"
          class="component-label-text"
        >
          {{ textEnable }}
        </span>
        <span
          v-else
          class="component-label-text"
        >
          {{ textDisable }}
        </span>
      </label>
    </div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, watch, onMounted } from 'vue'

defineOptions({
	name: 'NbToggleLight',
	inheritAttrs: false
})

const emit = defineEmits(['clicked', 'current-value'])

onMounted(() => {
  startStatus()
})

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	value: {
		type: Boolean,
		default: false
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
	lightTextColor: {
		type: String,
		default: '#8e8e8e'
	},
	lightButtonColor: {
		type: String,
		default: '#eaeaea'
	},
	lightTextBgColor: {
		type: String,
		default: '#f8f8f2'
	},
	// Cores do tema dark
	darkTextColor: {
		type: String,
		default: '#e0e0e0'
	},
	darkButtonColor: {
		type: String,
		default: '#2d2d2d'
	},
	darkTextBgColor: {
		type: String,
		default: '#3d3d3d'
	},
	borderRadius: {
		type: Number,
		default: 0
	},
	width: {
		type: Number,
		default: 55,
		validator: value => {
			return !value ? 55 : value
		}
	},
	paddingX: {
		type: Number,
		default: 1,
		validator: value => {
			return !value ? 1 : value
		}
	},
	paddingY: {
		type: Number,
		default: 0.2,
		validator: value => {
			return !value ? 0.2 : value
		}
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
	hasAnimation: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	textEnable: {
		type: String,
		default: 'On'
	},
	textDisable: {
		type: String,
		default: 'Off'
  },
  buttonSize: {
    type: Number,
    default: 30
  },
})

const {
	nbId,
	value,
	textEnable,
	textDisable,
	hasAnimation,
	ariaLabel,
	ariaAttrs,
	theme,
	lightTextColor,
	lightButtonColor,
	lightTextBgColor,
	darkTextColor,
	darkButtonColor,
	darkTextBgColor,
	borderRadius,
	width,
	paddingX,
	paddingY,
	disabled,
	fontFamily,
	fontSize,
	fontWeight,
  buttonSize
} = toRefs(props)

const currentStatus = ref(false)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = 'inline-block'
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const widthValue = !width.value || width.value < 55 ? 55 : width.value
	const paddingXValue = !paddingX.value || paddingX.value < 0 ? 1 : paddingX.value
	const paddingYValue = !paddingY.value || paddingY.value < 0 ? 0.2 : paddingY.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
  const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 200 : fontWeight.value
  const buttonSizeValue = !buttonSize.value || buttonSize.value < 0 || buttonSize.value > 50 ? 30 : buttonSize.value

	return {
		disabled: disabledValue,
		display: displayValue,
		borderRadius: borderRadiusValue,
		width: widthValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		buttonSize: buttonSizeValue
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
		minWidth: '33px',
		width: `${defaultValues.width}px`,
		// padding: `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`,
		lineHeight: '1.42857143',
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
	}
})

const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})

const themeStyle = computed(() => {
	return theme.value === 'dark' ? 'component__theme--dark' : 'component__theme--light'
})

const styleLightTextColor = computed(() => lightTextColor.value)
const styleLightButtonColor = computed(() => lightButtonColor.value)
const styleLightTextBgColor = computed(() => lightTextBgColor.value)

const styleDarkTextColor = computed(() => darkTextColor.value)
const styleDarkButtonColor = computed(() => darkButtonColor.value)
const styleDarkTextBgColor = computed(() => darkTextBgColor.value)

const styleButtonSize = computed(() => {
	const defaultValues = formatDefaultValues.value

	return `${defaultValues.buttonSize}%`
})
const borderRadiusValue = computed(() => {
	const defaultValues = formatDefaultValues.value

	return `${defaultValues.borderRadius}rem`
})
const computedAriaAttrs = computed(() => {
  const newAttrs = {}

  if (ariaAttrs.value) {
    const attrKeys = Object.keys(ariaAttrs.value)

    attrKeys.forEach(key => newAttrs[`aria-${key}`] = ariaAttrs.value[key])
  }

  const attrs = {
    'aria-label': ariaLabel.value,
    'aria-checked': currentStatus.value,
    'aria-disabled': disabled.value,
    ...newAttrs
  }
  
  // Remove atributos undefined/null
  return Object.fromEntries(
    Object.entries(attrs).filter(([_, value]) => value !== undefined && value !== null)
  )
})

const handleChange = () => {
	if (!disabled.value) {
		emit('clicked')
	}
}

const handleKeydown = () => {
	if (!disabled.value) {
		currentStatus.value = !currentStatus.value
		emit('clicked')
	}
}

const startStatus = () => {
  const initialStatus = value.value
  currentStatus.value = initialStatus
  emit('current-value', initialStatus)
}

watch(currentStatus, value => {
  emit('current-value', value)
})

watch(value, () => {
  startStatus()
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
  display: inline-block;
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
	padding: 0;
	box-sizing: border-box;
	line-height: 1.42857143;
	font-family: v-bind('font');

	user-select: none;

	touch-action: manipulation;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	cursor: pointer;
	text-align: center;
	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;

  // Add new properties below

  width: 70px;
  height: 28px;
  float: left;
  margin: 0;
  padding: 0;
  border: 0;

  .component-input {
    display: none;
  }

  .component-label {
    display: block;
    position: relative;
    padding-top: 4px;
    height: 100%;

    // inicio propAnimation
    &.component-label-text-animation {
      .component-label-text {
        transition: all 0.2s;
      }
    }
    // fim propAnimation

    .component-label-button {
      position: absolute;
      width: v-bind('styleButtonSize');
      z-index: 1;
      top: 0;
      bottom: 0;
      transition: left 0.2s ease, right 0.2s ease;
    }

    .component-label-text {
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      padding: 4px 0px;
      user-select: none;
      border-radius: v-bind('borderRadiusValue');
    }

    &.component-button--left {
      .component-label-button {
        right: 0;
        border-radius: 0 v-bind('borderRadiusValue') v-bind('borderRadiusValue') 0;
      }
      .component-label-text {
        left: 0;
        text-align: left;
        padding-left: 7px;
        padding-right: 0;
      }
    }

    &.component-button--right {
      .component-label-button {
        left: 0;
        border-radius: v-bind('borderRadiusValue') 0 0 v-bind('borderRadiusValue');
      }
      .component-label-text {
        right: 0;
        text-align: right;
        padding-left: 0;
        padding-right: 7px;
      }
    }
  }

  // Light theme
  &.component__theme--light {
    color: v-bind('styleLightTextColor');

    .component-label-button {
      background-color: v-bind('styleLightButtonColor');
    }

    .component-label-text {
      background-color: v-bind('styleLightTextBgColor');
    }
  }

  // Dark theme
  &.component__theme--dark {
    color: v-bind('styleDarkTextColor');

    .component-label-button {
      background-color: v-bind('styleDarkButtonColor');
    }

    .component-label-text {
      background-color: v-bind('styleDarkTextBgColor');
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

    // Light theme disabled
    &.component__theme--light {
      color: v-bind('styleLightTextColor');

      .component-label {
        &:hover {
          cursor: not-allowed;
        }
      }

      .component-label-button {
        background-color: v-bind('styleLightButtonColor');
      }

      .component-label-text {
        background-color: v-bind('styleLightTextBgColor');
      }
    }

    // Dark theme disabled
    &.component__theme--dark {
      color: v-bind('styleDarkTextColor');

      .component-label {
        &:hover {
          cursor: not-allowed;
        }
      }

      .component-label-button {
        background-color: v-bind('styleDarkButtonColor');
      }

      .component-label-text {
        background-color: v-bind('styleDarkTextBgColor');
      }
    }
  }
}
</style>
