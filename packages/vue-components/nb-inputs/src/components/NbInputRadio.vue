<template>
	<div
		v-if="nbId && validList"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component']"
			:style="[componentStyle]"
		>
      <div
        v-for="(item, index) in options"
        :key="index"
        class="custom-radio__item"
        :class="[displayClass, currentDirection]"
      >
        <input
          :id="`${nbId}-${item.value}`"
          v-model="currentValue"
          type="radio"
          class="custom-radio__item--input"
          :disabled="disabled"
          :value="item.value"
          :name="groupName"
        />
        <label
          :for="`${nbId}-${item.value}`"
          class="custom-radio__item--label"
        >
          {{ item.text }}
        </label>
      </div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, watch, watchEffect } from 'vue'

defineOptions({
	name: 'NbInputRadio',
	inheritAttrs: false
})

onMounted(() => {
  startValue()
})

const emit = defineEmits(['current-value', 'changed'])

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
  currentOptiton: {
    type: String,
    default: null,
  },
  direction: {
    type: String,
    default: 'left',
    validator: value => {
      return ['left', 'right'].indexOf(value) !== -1
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
  itemGap: {
    type: Number,
    default: 15
  },
  internalGap: {
    type: Number,
    default: 6
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
  currentOptiton,
  display,
  options,
  direction,
  textColor,
  color,
  hoverEffect,
  activeHoverEffect,
  colorHover,
  itemGap,
  internalGap,
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
  const directionValue = !direction.value ? 'left' : direction.value
  const textColorValue = !textColor.value ? 'black' : textColor.value
  const colorValue = !color.value ? '#767676' : color.value
  const hoverEffectValue = ![false, true].includes(hoverEffect.value) ? false : hoverEffect.value
  const activeHoverEffectValue = ![false, true].includes(activeHoverEffect.value) ? false : activeHoverEffect.value
  const colorHoverValue = !colorHover.value ? '#a6a6a6' : colorHover.value
  const itemGapValue = !itemGap.value || itemGap.value < 0 ? 15 : itemGap.value
  const internalGapValue = !internalGap.value || internalGap.value < 0 ? 6 : internalGap.value

	return {
		disabled: disabledValue,
    display: displayValue,
    direction: directionValue,
    textColor: textColorValue,
    color: colorValue,
    hoverEffect: hoverEffectValue,
    activeHoverEffect: activeHoverEffectValue,
    colorHover: colorHoverValue,
    itemGap: itemGapValue,
    internalGap: internalGapValue,
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

  return (defaultValues.display === 'inline-block') ? 'custom-radio__item--display-inline' : 'custom-radio__item--display-block'
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

const currentDirection = computed(() => {
	const defaultValues = formatDefaultValues.value

  return (defaultValues.direction === 'right') ? 'custom-radio__item--direction-right' : 'custom-radio__item--direction-left'
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
const styleColorActiveHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.activeHoverEffect ? defaultValues.colorHover : defaultValues.color
})
const styleColorHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.hoverEffect ? defaultValues.colorHover : defaultValues.color
})

const paddingValue = computed(() => {
  const defaultValues = formatDefaultValues.value
  const internalG = defaultValues.internalGap

  return !internalG || internalG < 0 ? 0 : internalG
})

const paddingLeft = computed(() => {
  return `0 0 0 2${paddingValue.value}px`
})

const paddingRight = computed(() => {
  return `0 2${paddingValue.value}px 0 0`
})

const gapValue = computed(() => {
  const defaultValues = formatDefaultValues.value
  const gap = defaultValues.itemGap

  return !gap || gap < 0 ? 0 : `${gap}px`
})

const startValue = () => {
  const initialValue = currentOptiton.value

  if (initialValue) {
    currentValue.value = initialValue.toString().toLowerCase()
  }
  
  emit('current-value', initialValue)
}

watch(currentOptiton, () => {
  startValue()
})
watch(currentValue, value => {
  emit('current-value', value)
  emit('changed', value)
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

	overflow: hidden;

  // padding-top: 4px;

  .custom-radio__item {
    .custom-radio__item--input {
      display: none;

      &:checked {
        &+.custom-radio__item--label {
          &:hover {
            &:before {
              border: 2px solid v-bind(styleColorActiveHover);
              color: v-bind(styleColorActiveHover);
            }
          }

          &:before {
            content: '\25CF'; // \f111
            font-size: 1.3em; // 0.7em 0.85em;
            text-shadow: 0;
            display: flex;
            align-items: self-end;
            text-align: center;
            justify-content: space-around;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
            border: 2px solid v-bind(styleColor);
            color: v-bind(styleColor);
          }
        }
      }
    }

    .custom-radio__item--label {
      --disabled-color: v-bind('styleTextColor');
      color: var(--disabled-color) !important;

      &:before {
        border: 2px solid v-bind(styleColor);
      }

      &:hover {
        cursor: pointer;

        &:before {
          border: 2px solid v-bind(styleColorHover);
        }
      }

      &:before {
        content: '';
        width: 19px;
        height: 19px;
        position: absolute;
        bottom: 0;
        border: 0;
        border-radius: 50%;
        text-shadow: 0;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border: 2px solid v-bind(styleColor);
      }
    }

    // inicio propDisplay
    &.custom-radio__item--display-block {
      display: block;

      &:not(:first-child) {
        margin-top: v-bind(gapValue);
      }

      .custom-radio__item--label {
        display: inline;
        font-family: inherit;
        font-size: inherit;
        font-style: normal;
        line-height: 20px;
        position: relative;
      }
    }

    &.custom-radio__item--display-inline {
      display: inline-block;

      &:not(:first-child) {
        margin-left: v-bind(gapValue);
      }

      .custom-radio__item--label {
        display: inline;
        font-family: inherit;
        font-size: inherit;
        font-style: normal;
        line-height: 20px;
        position: relative;
      }
    }

    // fim propDisplay

    // inicio propDirection
    &.custom-radio__item--display-block {
      &.custom-radio__item--direction-left {
        .custom-radio__item--label {
          display: inline-block;
          padding: v-bind(paddingLeft);

          &:before {
            left: 0;
          }
        }
      }

      &.custom-radio__item--direction-right {
        .custom-radio__item--label {
          padding: v-bind(paddingRight);

          &:before {
            right: 0;
          }
        }
      }
    }

    &.custom-radio__item--display-inline {
      &.custom-radio__item--direction-left {
        .custom-radio__item--label {
          display: inline-block;
          padding: v-bind(paddingLeft);

          &:before {
            left: 0;
          }
        }
      }

      &.custom-radio__item--direction-right {
        .custom-radio__item--label {
          padding: v-bind(paddingRight);

          &:before {
            right: 0;
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
		--disabled-color: v-bind('styleTextColor');
		color: var(--disabled-color) !important;
		opacity: 0.7;
		border-radius: inherit;
	}
}
</style>
