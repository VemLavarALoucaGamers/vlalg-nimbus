<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
    :tabIndex="disabled ? -1 : tabIndex"
    role="button"
    v-bind="computedAriaAttrs"
    @click="interacted"
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
        :class="['component__input', 'component__input--skewed']"
        @change="handleChange"
      />
      <label
        :for="`${nbId}-input`"
        class="component__button"
        :data-tg-off="textDisable"
        :data-tg-on="textEnable"
      >
        {{ currentStatus ? textEnable : textDisable }}
      </label>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, watch } from 'vue'

defineOptions({
	name: 'NbToggleSkewed',
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
	lightTextColorOn: {
		type: String,
		default: '#4a4a4a'
  },
  lightTextColorOnHover: {
		type: String,
		default: '#3a3a3a'
	},
	lightTextColorOff: {
		type: String,
		default: '#585858'
  },
  lightTextColorOffHover: {
		type: String,
		default: '#707070'
	},
	lightButtonColorOn: {
		type: String,
		default: '#f8f8f2'
	},
	lightButtonColorOnHover: {
		type: String,
		default: '#e8e8e2'
	},
	lightButtonColorOff: {
		type: String,
		default: '#d5d5d5'
	},
	lightButtonColorOffHover: {
		type: String,
		default: '#c0c0c0'
  },
	// Cores do tema dark
	darkTextColorOn: {
		type: String,
		default: '#f8f8f8'
  },
  darkTextColorOnHover: {
		type: String,
		default: '#ffffff'
	},
	darkTextColorOff: {
		type: String,
		default: '#909090'
  },
  darkTextColorOffHover: {
		type: String,
		default: '#b0b0b0'
	},
	darkButtonColorOn: {
		type: String,
		default: '#3d3d3d'
	},
	darkButtonColorOnHover: {
		type: String,
		default: '#4d4d4d'
	},
	darkButtonColorOff: {
		type: String,
		default: '#2c2c2c'
	},
	darkButtonColorOffHover: {
		type: String,
		default: '#2d2d2d'
	},
	borderRadius: {
		type: Number,
		default: 0
	},
	width: {
		type: Number,
		default: 86,
		validator: value => {
			return !value ? 86 : value
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
		default: 400,
		validator: value => {
			return !value ? 200 : value
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
})

const {
	nbId,
	value,
	textEnable,
	textDisable,
  ariaLabel,
  ariaAttrs,
	theme,
	lightButtonColorOn,
	lightButtonColorOff,
	lightButtonColorOnHover,
	lightButtonColorOffHover,
	lightTextColorOn,
	lightTextColorOff,
	lightTextColorOnHover,
	lightTextColorOffHover,
	darkButtonColorOn,
	darkButtonColorOff,
	darkButtonColorOnHover,
	darkButtonColorOffHover,
	darkTextColorOn,
	darkTextColorOff,
	darkTextColorOnHover,
	darkTextColorOffHover,
	borderRadius,
	width,
	paddingX,
	paddingY,
	disabled,
	fontFamily,
	fontSize,
  fontWeight
} = toRefs(props)

const currentStatus = ref(false)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = 'inline-block'
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const widthValue = ((width.value !== 0 && !width.value) || width.value < 86) ? 86 : width.value
	const paddingXValue = ((paddingX.value !== 0 && !paddingX.value) || paddingX.value < 0) ? 1 : paddingX.value
	const paddingYValue = ((paddingY.value !== 0 && !paddingY.value) || paddingY.value < 0) ? 0.2 : paddingY.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
  const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 200 : fontWeight.value

  const lightButtonColorOnValue = !lightButtonColorOn.value ? '#f8f8f2' : lightButtonColorOn.value
	const lightButtonColorOffValue = !lightButtonColorOff.value ? '#d5d5d5' : lightButtonColorOff.value
	const lightButtonColorOnHoverValue = !lightButtonColorOnHover.value ? '#e8e8e2' : lightButtonColorOnHover.value
	const lightButtonColorOffHoverValue = !lightButtonColorOffHover.value ? '#c0c0c0' : lightButtonColorOffHover.value
	const lightTextColorOnValue = !lightTextColorOn.value ? '#4a4a4a' : lightTextColorOn.value
	const lightTextColorOffValue = !lightTextColorOff.value ? '#909090' : lightTextColorOff.value
	const lightTextColorOnHoverValue = !lightTextColorOnHover.value ? '#3a3a3a' : lightTextColorOnHover.value
	const lightTextColorOffHoverValue = !lightTextColorOffHover.value ? '#707070' : lightTextColorOffHover.value
	const darkButtonColorOnValue = !darkButtonColorOn.value ? '#3d3d3d' : darkButtonColorOn.value
	const darkButtonColorOffValue = !darkButtonColorOff.value ? '#1d1d1d' : darkButtonColorOff.value
	const darkButtonColorOnHoverValue = !darkButtonColorOnHover.value ? '#4d4d4d' : darkButtonColorOnHover.value
	const darkButtonColorOffHoverValue = !darkButtonColorOffHover.value ? '#2d2d2d' : darkButtonColorOffHover.value
	const darkTextColorOnValue = !darkTextColorOn.value ? '#f8f8f8' : darkTextColorOn.value
	const darkTextColorOffValue = !darkTextColorOff.value ? '#909090' : darkTextColorOff.value
	const darkTextColorOnHoverValue = !darkTextColorOnHover.value ? '#ffffff' : darkTextColorOnHover.value
	const darkTextColorOffHoverValue = !darkTextColorOffHover.value ? '#b0b0b0' : darkTextColorOffHover.value

	return {
		disabled: disabledValue,
		display: displayValue,
		lightButtonColorOn: lightButtonColorOnValue,
		lightButtonColorOff: lightButtonColorOffValue,
		lightButtonColorOnHover: lightButtonColorOnHoverValue,
		lightButtonColorOffHover: lightButtonColorOffHoverValue,
		lightTextColorOn: lightTextColorOnValue,
		lightTextColorOff: lightTextColorOffValue,
		lightTextColorOnHover: lightTextColorOnHoverValue,
		lightTextColorOffHover: lightTextColorOffHoverValue,
		darkButtonColorOn: darkButtonColorOnValue,
		darkButtonColorOff: darkButtonColorOffValue,
		darkButtonColorOnHover: darkButtonColorOnHoverValue,
		darkButtonColorOffHover: darkButtonColorOffHoverValue,
		darkTextColorOn: darkTextColorOnValue,
		darkTextColorOff: darkTextColorOffValue,
		darkTextColorOnHover: darkTextColorOnHoverValue,
		darkTextColorOffHover: darkTextColorOffHoverValue,
		borderRadius: borderRadiusValue,
		width: widthValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
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
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	const newWidth = defaultValues.display === 'block' ? 'auto' : `${defaultValues.width}px`

	return {
		minWidth: '33px',
		width: newWidth,
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

const styleBorderRadius = computed(() => {
	const defaultValues = formatDefaultValues.value

	return `${defaultValues.borderRadius}rem`
})
const stylePadding = computed(() => {
	const defaultValues = formatDefaultValues.value

	return `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`
})
const styleTextColorOn = computed(() => {
	const defaultValues = formatDefaultValues.value

	return theme.value === 'light' ? defaultValues.lightTextColorOn : defaultValues.darkTextColorOn
})
const styleTextColorOff = computed(() => {
	const defaultValues = formatDefaultValues.value

	return theme.value === 'light' ? defaultValues.lightTextColorOff : defaultValues.darkTextColorOff
})
const styleTextColorOnHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return theme.value === 'light' ? defaultValues.lightTextColorOnHover : defaultValues.darkTextColorOnHover
})
const styleTextColorOffHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return theme.value === 'light' ? defaultValues.lightTextColorOffHover : defaultValues.darkTextColorOffHover
})
const styleButtonColorOn = computed(() => {
	const defaultValues = formatDefaultValues.value

	return theme.value === 'light' ? defaultValues.lightButtonColorOn : defaultValues.darkButtonColorOn
})
const styleButtonColorOff = computed(() => {
	const defaultValues = formatDefaultValues.value

	return theme.value === 'light' ? defaultValues.lightButtonColorOff : defaultValues.darkButtonColorOff
})
const styleButtonColorOnHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return theme.value === 'light' ? defaultValues.lightButtonColorOnHover : defaultValues.darkButtonColorOnHover
})
const styleButtonColorOffHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return theme.value === 'light' ? defaultValues.lightButtonColorOffHover : defaultValues.darkButtonColorOffHover
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
  .component__input {
    display: none;

    &:checked {
      & + .component__button {
        &:after {
          left: 50%;
        }
      }
    }

    &.component__input--skewed {
      &:checked {
        & + .component__button {
          &:before {
            left: -100%;
          }
          &:after {
            left: 0;
          }
          &:active {
            &:after {
              left: 10%;
            }
          }
        }
      }

      & + .component__button {
        overflow: hidden;
        transform: skew(-10deg);
        -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
        transition: all 0.2s ease;

        &:after,
        &:before {
          transform: skew(10deg);
          display: inline-block;
          transition: all 0.2s ease;
          width: 100%;
          text-align: center;
          position: absolute;
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
        }

        &:after {
          left: 100%;
          // content: attr(data-tg-on);
        }

        &:before {
          left: 0;
          // content: attr(data-tg-off);
        }

        &:active {
          &:before {
            left: -10%;
          }
        }
      }
    }
  }

  .component__button {
    outline: 0;
    display: block;
    // width: 4em;
    // height: 2em;
    padding: v-bind('stylePadding');
    border-radius: v-bind('styleBorderRadius');
    overflow: hidden;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

    &:after,
    &:before {
      position: relative;
      display: block;
      content: "";
      width: 50%;
      height: 100%;
    }

    &:after {
      left: 0;
    }
    &:before {
      display: none;
    }
  }

  // Light theme
  &.component__theme--light {
    .component__input {
      &.component__input--skewed {
        &:checked {
          & + .component__button {
            background: v-bind('styleButtonColorOn');

            &:hover {
              background: v-bind('styleButtonColorOnHover');
              color: v-bind('styleTextColorOnHover');
            }
          }
        }

        & + .component__button {
          background: v-bind('styleButtonColorOff');
          color: v-bind('styleTextColorOff');

          &:hover {
            background: v-bind('styleButtonColorOffHover');
            color: v-bind('styleTextColorOffHover');
          }

          &:active {
            background: v-bind('styleButtonColorOff');
          }
        }
      }
    }
  }

  // Dark theme
  &.component__theme--dark {
    .component__input {
      &.component__input--skewed {
        &:checked {
          & + .component__button {
            background: v-bind('styleButtonColorOn');

            &:hover {
              background: v-bind('styleButtonColorOnHover');
              color: v-bind('styleTextColorOnHover');
            }
          }
        }

        & + .component__button {
          background: v-bind('styleButtonColorOff');
          color: v-bind('styleTextColorOff');

          &:hover {
            background: v-bind('styleButtonColorOffHover');
            color: v-bind('styleTextColorOffHover');
          }

          &:active {
            background: v-bind('styleButtonColorOff');
          }
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
		--disabled-color: v-bind('styleTextColorOn');
		color: var(--disabled-color) !important;
    opacity: 0.7;
    border-radius: inherit;
  }
}
</style>
