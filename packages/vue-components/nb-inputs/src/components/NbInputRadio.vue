<template>
	<div
		v-if="nbId && validList"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle, size]"
	>
		<div
			:id="nbId"
      role="radiogroup"
      v-bind="computedAriaAttrs"
			:class="['nb-reset', 'component', displayClass]"
		>
      <div
        v-for="(item, index) in options"
        :key="index"
        class="component-radio__item"
      >
        <input
          :id="`${nbId}-${item.value}`"
          v-model="currentValue"
          type="radio"
          class="component-radio__item--input"
          :disabled="disabled"
          :value="item.value"
          :name="groupName"
          @click="clicked"
        />
        <label
          :for="`${nbId}-${item.value}`"
          :tabindex="disabled ? -1 : (Array.isArray(tabIndex) ? tabIndex[index] : tabIndex >= 0 ? tabIndex : index + 1)"
          class="component-radio__item--label"
          @keydown.enter.prevent="!disabled && hasTabIndexEnter && $event.target.click()"
          @keydown.space.prevent="!disabled && hasTabIndexSpace && $event.target.click()"
        >
          <div></div>
          <span :style="[componentStyle]">{{ item.text }}</span>
        </label>
      </div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, watch } from 'vue'

defineOptions({
	name: 'NbInputRadio',
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
    type: [String, Number, Boolean],
    default: null,
  },
  valueType: {
    type: String,
    default: 'boolean',
    validator: value => {
      return ['boolean', 'string', 'number'].indexOf(value) !== -1
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
  scale: {
    type: Number,
    default: 1
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
  valueType,
  display,
  options,
  textColor,
  color,
  hoverEffect,
  activeHoverEffect,
  colorHover,
  itemGap,
  internalGap,
  scale,
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
  const itemGapValue = !itemGap.value || itemGap.value < 0 ? 15 : itemGap.value
  const internalGapValue = !internalGap.value || internalGap.value < 0 ? 6 : internalGap.value
  const scaleValue = !scale.value || scale.value < 0 ? 1 : scale.value

	return {
		disabled: disabledValue,
    display: displayValue,
    textColor: textColorValue,
    color: colorValue,
    hoverEffect: hoverEffectValue,
    activeHoverEffect: activeHoverEffectValue,
    colorHover: colorHoverValue,
    itemGap: itemGapValue,
    internalGap: internalGapValue,
    scale: scaleValue,
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

  return (defaultValues.display === 'inline-block') ? 'component-radio__item--display-inline' : 'component-radio__item--display-block'
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

const paddingValue = computed(() => {
  const defaultValues = formatDefaultValues.value
  const internalG = defaultValues.internalGap

  return !internalG || internalG < 0 ? 0 : `${internalG}px`
})

const gapValue = computed(() => {
  const defaultValues = formatDefaultValues.value
  const gap = defaultValues.itemGap

  return !gap || gap < 0 ? 0 : `${gap}px`
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
  const initialValue = currentOption.value

  if (initialValue) {
    if (!['string'].includes(valueType.value)) {
      currentValue.value = initialValue
    } else {
      currentValue.value = initialValue.toString().toLowerCase()
    }
  } else {
    currentValue.value = initialValue
  }
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

  &.component-radio__item--display-block,
  &.component-radio__item--display-inline {
    display: flex;
    flex-wrap: wrap;
    gap: v-bind(gapValue);
    width: auto; /* Ou defina um tamanho específico se necessário */
    word-break: break-word; /* Garante que palavras muito longas quebrem */
    overflow-wrap: break-word; /* Adicional para compatibilidade */
    white-space: normal; /* Permite quebras normais de texto */
  }

  // inicio propDisplay
  &.component-radio__item--display-block {
    flex-direction: column;
  }

  &.component-radio__item--display-inline {
    flex-direction: row;
    
    .component-radio__item {
      // width: max-content;
    }
  }
  // fim propDisplay

  .component-radio__item {
    position: relative;

    .component-radio__item--input {
      display: none;

      &:checked {
        &+.component-radio__item--label {
          &:hover {
            div {
              border: 2px solid v-bind(styleColorActiveHover);
              color: v-bind(styleColorActiveHover);
            }
          }

          div:before {
            content: '\23FA'; // \f111
            font-size: 1.15em; // 0.7em 0.85em;
            text-shadow: 0;
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
            color: v-bind(colorHover);
            border-radius: 50%;
          }
        }
      }
    }

    .component-radio__item--label {
      --disabled-color: v-bind('styleTextColor');
      color: var(--disabled-color) !important;

      display: flex;
      flex-direction: row;
      gap: v-bind(paddingValue);

      align-items: center;

      &:hover {
        cursor: pointer;

        div {
          border: 2px solid v-bind(styleColorHover);
        }
      }

      &:focus {
        outline-offset: 2px;
      }

      div {
        width: 19px;
        height: 19px;
        flex-shrink: 0;
        border-radius: 50%;
        text-shadow: 0;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border: 2px solid v-bind(styleColor);
        font-family: 'Lato', sans-serif !important;
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
