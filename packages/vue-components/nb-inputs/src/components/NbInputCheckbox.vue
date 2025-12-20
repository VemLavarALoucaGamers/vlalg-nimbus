<template>
	<div
		v-if="nbId && validList"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle, size]"
	>
		<div
			:id="nbId"
      role="group"
      v-bind="computedAriaAttrs"
			:class="['nb-reset', 'component', displayClass, themeStyle]"
		>
      <div
        v-for="(item, index) in options"
        :key="index"
        class="component-checkbox__item"
      >
        <input
          :id="`${nbId}-${item.value}`"
          v-model="currentValue"
          type="checkbox"
          class="component-checkbox__item--input"
          :disabled="disabled"
          :value="item.value"
          :name="groupName"
          @click="clicked"
        />
        <label
          :for="`${nbId}-${item.value}`"
          :class="[typeCheckbox]"
          :tabindex="disabled ? -1 : (Array.isArray(tabIndex) ? tabIndex[index] : tabIndex >= 0 ? tabIndex : index + 1)"
          class="component-checkbox__item--label"
          @keydown.enter.prevent="!disabled && hasTabIndexEnter && $event.target.click()"
          @keydown.space.prevent="!disabled && hasTabIndexSpace && $event.target.click()"
        >
          <div :class="[ styleBackground ]"></div>
          <span :style="[componentStyle]">{{ item.text }}</span>
        </label>
      </div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, watch } from 'vue'

defineOptions({
	name: 'NbInputCheckbox',
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
	tabIndex: {
    type: [Number, Array],
    default: 0,
    validator: (value, props) => {
      if (Array.isArray(value)) {
        // Opcional: validar se tem o mesmo tamanho de options
        return value.length === props.options.length
      }
      return true
    }
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
  groupName: {
    type: String,
    default: '',
    required: true,
    validator: value => {
      return value.toString().toLowerCase()
    },
  },
  options: {
    type: Array,
    required: true,
    default: () => {
      return []
    },
    validator: item => {
      if (!item.length) return false

      let hasError = false

      for (const obj of item) {
        const objkeys = Object.keys(obj)

        if (objkeys.length !== 2) hasError = true

        const result = objkeys.every(key => {
          const keys = ['value', 'text']

          return keys.includes(key)
        })

        if (!result) hasError = true
      }

      if (!hasError) return item
    },
  },
  currentOption: {
    type: Array,
    default: () => {
      return []
    }
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
    default: '#333333'
  },
  lightColor: {
    type: String,
    default: '#cccccc'
  },
  lightColorHover: {
    type: String,
    default: '#bbbbbb'
  },
  // Cores do tema dark
  darkTextColor: {
    type: String,
    default: '#e0e0e0'
  },
  darkColor: {
    type: String,
    default: '#555555'
  },
  darkColorHover: {
    type: String,
    default: '#666666'
  },
  boxRadius: {
    type: Number,
    default: 0
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
  itemGap: {
    type: Number,
    default: 15
  },
  internalGap: {
    type: Number,
    default: 6
  },
  scale: {
    type: Number,
    default: 1
  },
  type: {
    type: String,
    default: 'box',
    validator: value => {
      return ['box', 'circle'].indexOf(value) !== -1
    },
  },
  background: {
    type: Boolean,
    default: false,
    validator: value => {
      return [true, false].indexOf(value) !== -1
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
	}
})

const currentValue = ref(null)
const {
  ariaLabel,
  ariaAttrs,
  currentOption,
  display,
  options,
  theme,
  lightTextColor,
  lightColor,
  lightColorHover,
  darkTextColor,
  darkColor,
  darkColorHover,
  boxRadius,
  hoverEffect,
  activeHoverEffect,
  itemGap,
  internalGap,
  scale,
  type,
  background,
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
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 200 : fontWeight.value
  const boxRadiusValue = ((boxRadius.value !== 0 && !boxRadius.value) || boxRadius.value < 0) ? 0 : boxRadius.value
  const hoverEffectValue = ![false, true].includes(hoverEffect.value) ? false : hoverEffect.value
  const activeHoverEffectValue = ![false, true].includes(activeHoverEffect.value) ? false : activeHoverEffect.value
  const itemGapValue = ((itemGap.value !== 0 && !itemGap.value) || itemGap.value < 0) ? 15 : itemGap.value
  const internalGapValue = ((internalGap.value !== 0 && !internalGap.value) || internalGap.value < 0) ? 6 : internalGap.value
  const typeValue = !['box', 'circle'].includes(type.value) ? 'box' : type.value
  const scaleValue = ((scale.value !== 0 && !scale.value) || scale.value < 0) ? 1 : scale.value
  const backgroundValue = ![false, true].includes(background.value) ? false : background.value

	return {
		disabled: disabledValue,
    display: displayValue,
    boxRadius: boxRadiusValue,
    hoverEffect: hoverEffectValue,
    activeHoverEffect: activeHoverEffectValue,
    itemGap: itemGapValue,
    internalGap: internalGapValue,
    scale: scaleValue,
    type: typeValue,
    font: fontValue,
    background: backgroundValue,
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

  return (defaultValues.display === 'inline-block') ? 'component-checkbox__item--display-inline' : 'component-checkbox__item--display-block'
})

const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
	}
})

const validList = computed(() => {
  const isArray = (Array.isArray(options.value) && options.value.constructor === Array)

  return isArray && options.value.length > 0
})

const themeStyle = computed(() => {
	return theme.value === 'dark' ? 'component__theme--dark' : 'component__theme--light'
})

const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})

// Computed properties para as cores do theme (necessárias para v-bind no CSS)
const styleLightTextColor = computed(() => lightTextColor.value)
const styleLightColor = computed(() => lightColor.value)
const styleLightColorHover = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.hoverEffect ? lightColorHover.value : lightColor.value
})
const styleLightColorActiveHover = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.activeHoverEffect ? lightColorHover.value : lightColor.value
})
const styleLightBgColorActiveHover = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.activeHoverEffect && defaultValues.background ? `${lightColorHover.value}80` : lightColorHover.value
})

const styleDarkTextColor = computed(() => darkTextColor.value)
const styleDarkColor = computed(() => darkColor.value)
const styleDarkColorHover = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.hoverEffect ? darkColorHover.value : darkColor.value
})
const styleDarkColorActiveHover = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.activeHoverEffect ? darkColorHover.value : darkColor.value
})
const styleDarkBgColorActiveHover = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.activeHoverEffect && defaultValues.background ? `${darkColorHover.value}80` : darkColorHover.value
})
const styleBackground = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.background ? 'component-checkbox__item--with-background' : 'component-checkbox__item--without-background'
})
const checkBackgroundColor = computed(() => {
	const defaultValues = formatDefaultValues.value
	const textColorValue = theme.value === 'dark' ? darkTextColor.value : lightTextColor.value

  return defaultValues.background ? '#ffffff' : textColorValue
})
const iconSize = computed(() => {
	const defaultValues = formatDefaultValues.value

  return defaultValues.background ? '19px' : 'auto'
})

const paddingValue = computed(() => {
  const defaultValues = formatDefaultValues.value
  const internalG = defaultValues.internalGap

  return !internalG || internalG < 0 ? 0 : `${internalG}px`
})

const borderRadius = computed(() => {
  const defaultValues = formatDefaultValues.value

  const newValue = defaultValues.boxRadius > 7 ? 7 : defaultValues.boxRadius

  return `${newValue}px`
})

const gapValue = computed(() => {
  const defaultValues = formatDefaultValues.value
  const gap = defaultValues.itemGap

  return !gap || gap < 0 ? 0 : `${gap}px`
})

const typeCheckbox = computed(() => {
  const defaultValues = formatDefaultValues.value
  const tp = defaultValues.type

  return tp === 'circle' ? 'custom-checkbox__input--type-circle' : ''
})

const size = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    zoom: defaultValues.scale
  }
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

const startValue = () => {
  currentValue.value = currentOption.value
}
const clicked = () => {
  emit('clicked')
}

watch(currentOption, (newValue, oldValue) => {
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

  &.component-checkbox__item--display-block,
  &.component-checkbox__item--display-inline {
    display: flex;
    flex-wrap: wrap;
    gap: v-bind(gapValue);
    width: auto;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }

  // inicio propDisplay
  &.component-checkbox__item--display-block {
    flex-direction: column;
  }

  &.component-checkbox__item--display-inline {
    flex-direction: row;
  }
  // fim propDisplay

  .component-checkbox__item {
    position: relative;

    .component-checkbox__item--input {
      display: none;

      &:checked {
        &+.component-checkbox__item--label {
          &.custom-checkbox__input--type-circle {
            div {
              &::before {
                margin-top: 0em;
                margin-left: -1px;
              }
              &.component-checkbox__item--without-background {
                font-size: 1em;
              }
              &.component-checkbox__item--with-background {
                font-size: 1em;
              }
            }
          }

          div {
            &.component-checkbox__item--without-background {
              font-size: 1.2em;
            }
            &.component-checkbox__item--with-background {
              font-size: 1.2em;
            }

            &:before {
              content: '\2714';
              text-shadow: 0;
              display: flex;
              align-items: center;
              text-align: center;
              justify-content: center;
              -webkit-box-shadow: none;
              -moz-box-shadow: none;
              box-shadow: none;
              border-radius: v-bind(borderRadius);
              border: 0;
            }
          }
        }
      }
    }

    .component-checkbox__item--label {
      display: flex;
      flex-direction: row;
      gap: v-bind(paddingValue);
      align-items: center;

      &:hover {
        cursor: pointer;
      }

      &:focus {
        outline-offset: 2px;
      }

      div {
        width: 19px;
        height: 19px;
        flex-shrink: 0;
        text-shadow: 0;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border-radius: v-bind(borderRadius);
        font-family: 'Lato', sans-serif !important;
        font-weight: bold;
      }

      // inicio propType
      &.custom-checkbox__input--type-circle {
        div {
          border-radius: 50% !important;

          &:before {
            border-radius: 50% !important;
          }
        }
      }
      // fim propType
    }
  }

  // Theme light
  &.component__theme--light {
    .component-checkbox__item {
      .component-checkbox__item--input {
        &:checked {
          &+.component-checkbox__item--label {
            &:hover {
              div {
                &.component-checkbox__item--without-background {
                  border: 2px solid v-bind(styleLightColorActiveHover);
                  color: v-bind(styleLightColorHover);
                }
                &.component-checkbox__item--with-background {
                  background: v-bind(styleLightBgColorActiveHover);
                }
              }
            }

            div {
              &.component-checkbox__item--without-background {
                border: 2px solid v-bind(styleLightColor);
                color: v-bind(styleLightColorHover);
              }
              &.component-checkbox__item--with-background {
                border: 2px solid v-bind(styleLightColorHover);
                background: v-bind(styleLightColorHover);
              }
            }
          }
        }
      }

      .component-checkbox__item--label {
        --disabled-color: v-bind('styleLightTextColor');
        color: var(--disabled-color) !important;

        &:hover {
          div {
            &.component-checkbox__item--without-background {
              border: 2px solid v-bind(styleLightColorHover);
            }
            &.component-checkbox__item--with-background {
              border: 2px solid v-bind(styleLightColorHover);
            }
          }
        }

        div {
          &.component-checkbox__item--without-background {
            border: 2px solid v-bind(styleLightColor);
            color: v-bind(styleLightColor);
          }
          &.component-checkbox__item--with-background {
            border: 2px solid v-bind(styleLightColor);
            color: v-bind(checkBackgroundColor);
          }
        }
      }
    }
  }

  // Theme dark
  &.component__theme--dark {
    .component-checkbox__item {
      .component-checkbox__item--input {
        &:checked {
          &+.component-checkbox__item--label {
            &:hover {
              div {
                &.component-checkbox__item--without-background {
                  border: 2px solid v-bind(styleDarkColorActiveHover);
                  color: v-bind(styleDarkColorHover);
                }
                &.component-checkbox__item--with-background {
                  background: v-bind(styleDarkBgColorActiveHover);
                }
              }
            }

            div {
              &.component-checkbox__item--without-background {
                border: 2px solid v-bind(styleDarkColor);
                color: v-bind(styleDarkColorHover);
              }
              &.component-checkbox__item--with-background {
                border: 2px solid v-bind(styleDarkColorHover);
                background: v-bind(styleDarkColorHover);
              }
            }
          }
        }
      }

      .component-checkbox__item--label {
        --disabled-color: v-bind('styleDarkTextColor');
        color: var(--disabled-color) !important;

        &:hover {
          div {
            &.component-checkbox__item--without-background {
              border: 2px solid v-bind(styleDarkColorHover);
            }
            &.component-checkbox__item--with-background {
              border: 2px solid v-bind(styleDarkColorHover);
            }
          }
        }

        div {
          &.component-checkbox__item--without-background {
            border: 2px solid v-bind(styleDarkColor);
            color: v-bind(styleDarkColor);
          }
          &.component-checkbox__item--with-background {
            border: 2px solid v-bind(styleDarkColor);
            color: v-bind(checkBackgroundColor);
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
		opacity: 0.4;
		border-radius: inherit;

    .component-checkbox__item {
      .component-checkbox__item--input {
        &:checked {
          &+.component-checkbox__item--label {
            div {
              &.component-checkbox__item--without-background {
                border: 2px solid v-bind(styleLightColorActiveHover);
                color: v-bind(styleLightColorHover);
              }
              &.component-checkbox__item--with-background {
                background: v-bind(styleLightBgColorActiveHover);
              }
            }
          }
        }
      }
    }

    &.component__theme--light {
      --disabled-color: v-bind('styleLightTextColor');
      color: var(--disabled-color) !important;

      .component-checkbox__item {
        .component-checkbox__item--input {
          &:checked {
            &+.component-checkbox__item--label {
              div {
                &.component-checkbox__item--without-background {
                  border: 2px solid v-bind(styleLightColorActiveHover);
                  color: v-bind(styleLightColorHover);
                }
                &.component-checkbox__item--with-background {
                  background: v-bind(styleLightBgColorActiveHover);
                }
              }
            }
          }
        }
      }
    }

    &.component__theme--dark {
      --disabled-color: v-bind('styleDarkTextColor');
      color: var(--disabled-color) !important;

      .component-checkbox__item {
        .component-checkbox__item--input {
          &:checked {
            &+.component-checkbox__item--label {
              div {
                &.component-checkbox__item--without-background {
                  border: 2px solid v-bind(styleDarkColorActiveHover);
                  color: v-bind(styleDarkColorHover);
                }
                &.component-checkbox__item--with-background {
                  background: v-bind(styleDarkBgColorActiveHover);
                }
              }
            }
          }
        }
      }
    }
	}
}
</style>
