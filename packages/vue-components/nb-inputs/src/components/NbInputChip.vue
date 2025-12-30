<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle]"
    role="input"
    v-bind="computedAriaAttrs"
    @click="interacted"
  >
    <div
      :id="nbId"
      ref="chipsContainer"
      :class="['nb-reset', 'component', themeStyle, inputStyleClass]"
      :style="[componentStyle, styleWidth, borderRadiusStyle]"
    >
      <div v-if="chipList.length > 0" ref="chips" class="chips">
        <div v-for="chip in chipList" :key="chip" class="chip">
          <slot
            name="chip"
            :chips="chipList"
            :chip="chip"
            :removeChip="removeChip"
          >
            <span class="chip-text">{{ chip }}</span>
            <span 
              v-if="!disabled && !inputReadonly"
              class="chip-remove" 
              @click="removeChip(chip)">×</span>
          </slot>
        </div>
      </div>

      <input
        ref="chipInput"
        type="text"
        v-model="chipInputValue"
        :name="inputName"
        :placeholder="inputPlaceholder"
        :readonly="inputReadonly"
        :autocomplete="inputAutocomplete"
        :required="required"
        :tabindex="disabled || inputReadonly ? -1 : tabIndex"
        :class="['chips-input', activeTextStyleClass]"
        :style="[caretColorStyle, selectionStyle]"
        @keydown.enter="!disabled && hasTabIndexEnter && handleKeyDown($event)"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, watch } from 'vue'

defineOptions({
  name: 'NbInputChip',
  inheritAttrs: false
})

onMounted(() => {
  if (currentList.value.length > 0) chipList.value = currentList.value;
})

const emit = defineEmits(['clicked', 'changed', 'removed', 'added', 'input-changed', 'focused', 'blurred'])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	display: {
		type: String,
		default: 'b',
		validator: (value = 'b') => {
			const currentValue = value.toLowerCase()
			return ['b', 'ib'].includes(currentValue)
		}
	},
	tabIndex: {
    type: Number,
    default: 0
  },
  hasTabIndexEnter: {
    type: Boolean,
    default: true
  },
  ariaLabel: {
    type: String,
    default: 'Input Chip'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
	caretColor: {
		type: String,
		default: '',
		validator: value => {
			return !value || typeof value === 'string'
		}
	},
	width: {
		type: Number,
		default: 185,
		validator: value => {
			return !value ? 185 : value
		}
	},
	textColor: {
		type: String,
		default: '#ffffff'
	},
	selectionBgColor: {
		type: String,
		default: '',
		validator: value => {
			return !value || typeof value === 'string'
		}
	},
	selectionTextColor: {
		type: String,
		default: '',
		validator: value => {
			return !value || typeof value === 'string'
		}
	},
	paddingX: {
		type: Number,
		default: 0.2,
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
	hasBorderRadius: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	borderRadius: {
		type: Number,
		default: 0.375
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
			return !value ? 700 : value
		}
  },
  currentList: {
    type: Array,
    default: () => [],
    validator: value => {
      return Array.isArray(value)
    }
  },
	allowDuplicates: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
  },
  minChips: {
    type: Number,
    default: 0
  },
  maxChips: {
    type: Number,
    default: 10
  },
  inputPosition: {
    type: String,
    default: 'bottom',
    validator: value => {
      return ['top', 'bottom'].includes(value)
    }
  },
	inputName: {
		type: String,
		default: ''
	},
	inputPlaceholder: {
		type: String,
		default: 'Type and press Enter'
	},
	inputUppercase: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	inputReadonly: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	inputAutocomplete: {
		type: String,
		default: 'on',
		validator: value => {
			return ['on', 'off'].indexOf(value) !== -1
		}
	},
	required: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	textAlign: {
		type: String,
		default: 'left',
		validator: value => {
			return ['center', 'left', 'right'].indexOf(value) !== -1
		}
	},
	activeTextStyle: {
		type: String,
		default: 'normal',
		validator: value => {
			return ['normal', 'italic', 'oblique'].indexOf(value) !== -1
		}
	},
	theme: {
		type: String,
		default: 'light',
		validator: value => {
			return ['dark', 'light'].indexOf(value) !== -1
		}
	},
	inputStyle: {
		type: String,
		default: 'background',
		validator: value => {
			return ['background', 'line', 'border'].indexOf(value) !== -1
		}
	},
	// Cores do tema light
	lightBgColor: {
		type: String,
		default: '#f8f8f2'
	},
	lightBgColorFocus: {
		type: String,
		default: '#eaeaea'
	},
	lightBorderColor: {
		type: String,
		default: '#353734'
	},
	lightBorderColorFocus: {
		type: String,
		default: '#272936'
	},
	lightDisabledBgColor: {
		type: String,
		default: '#dfdfd9'
	},
	lightTextColor: {
		type: String,
		default: '#000000'
	},
	lightChipBgColor: {
		type: String,
		default: '#e0e0e0'
	},
	lightChipTextColor: {
		type: String,
		default: '#000000'
	},
	lightChipRemoveColor: {
		type: String,
		default: '#f44336'
	},
	lightDisabledBorderColor: {
		type: String,
		default: 'rgba(53, 55, 52, 0.3)'
	},
	// Cores do tema dark
	darkBgColor: {
		type: String,
		default: '#353734'
	},
	darkBgColorFocus: {
		type: String,
		default: '#272936'
	},
	darkBorderColor: {
		type: String,
		default: '#44475a'
	},
	darkBorderColorFocus: {
		type: String,
		default: 'rgba(68, 71, 90, 0.4)'
	},
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
	},
	darkTextColor: {
		type: String,
		default: '#ffffff'
	},
	darkChipBgColor: {
		type: String,
		default: '#44475a'
	},
	darkChipTextColor: {
		type: String,
		default: '#ffffff'
	},
	darkChipRemoveColor: {
		type: String,
		default: '#f44336'
	},
	darkDisabledBorderColor: {
		type: String,
		default: 'rgba(68, 71, 90, 0.3)'
	}
})

const {
	display,
	textColor,
	paddingX,
	paddingY,
	borderRadius,
	disabled,
	fontFamily,
	fontSize,
	fontWeight,
	currentList,
	allowDuplicates,
	minChips,
	maxChips,
	inputPosition,
	width,
	inputName,
	inputPlaceholder,
	inputUppercase,
	inputReadonly,
	inputAutocomplete,
	required,
	textAlign,
	hasBorderRadius,
	activeTextStyle,
	theme,
	inputStyle,
	lightBgColor,
	lightBgColorFocus,
	lightBorderColor,
	lightBorderColorFocus,
	lightDisabledBgColor,
	lightTextColor,
	lightChipBgColor,
	lightChipTextColor,
	lightChipRemoveColor,
	lightDisabledBorderColor,
	darkBgColor,
	darkBgColorFocus,
	darkBorderColor,
	darkBorderColorFocus,
	darkDisabledBgColor,
	darkTextColor,
	darkChipBgColor,
	darkChipTextColor,
	darkChipRemoveColor,
	darkDisabledBorderColor,
	tabIndex,
	hasTabIndexEnter,
	ariaLabel,
	ariaAttrs,
	caretColor,
	selectionBgColor,
	selectionTextColor
} = toRefs(props)

const chipInputValue = ref('');
const chipsContainer = ref(null);
const chipInput = ref(null);
const chips = ref(null)
const chipList = ref([])// Para armazenar os valores dos chips
const isActive = ref(false)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const widthValue = !width.value || width.value < 185 ? 185 : width.value
	const textColorValue = !textColor ? 'ffffff' : textColor.value
	const caretColorValue = !caretColor.value ? '' : caretColor.value
	const selectionBgColorValue = !selectionBgColor.value ? '' : selectionBgColor.value
	const selectionTextColorValue = !selectionTextColor.value ? '' : selectionTextColor.value
	const paddingXValue = ((paddingX.value !== 0 && !paddingX.value) || paddingX.value < 0) ? 1 : paddingX.value
	const paddingYValue = ((paddingY.value !== 0 && !paddingY.value) || paddingY.value < 0) ? 0.2 : paddingY.value
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6rem' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 100 : fontWeight.value
	const minChipsValue = ((minChips.value !== 0 && !minChips.value) || minChips.value < 0) ? 0 : minChips.value
	const maxChipsValue = ((maxChips.value !== 0 && !maxChips.value) || maxChips.value < 0) ? 10 : maxChips.value
	const inputPositionValue = !inputPosition.value || !['top', 'bottom'].includes(inputPosition.value) ? 'bottom' : inputPosition.value
	const inputStyleValue = !inputStyle.value || !['background', 'line', 'border'].includes(inputStyle.value) ? 'background' : inputStyle.value
	const themeValue = !theme.value ? 'light' : theme.value

	return {
		disabled: disabledValue,
		display: displayValue,
		width: widthValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		textColor: textColorValue,
		caretColor: caretColorValue,
		selectionBgColor: selectionBgColorValue,
		selectionTextColor: selectionTextColorValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
    borderRadius: borderRadiusValue,
    minChips: minChipsValue,
    maxChips: maxChipsValue,
    inputPosition: inputPositionValue,
    inputStyle: inputStyleValue,
		theme: themeValue
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
		color: defaultValues.textColor,
		padding: `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`,
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight,
		textAlign: textAlign.value
	}
})
const activeTextStyleClass = computed(() => {
	switch (activeTextStyle.value) {
		case 'italic':
			return 'component__text--italic'
		case 'oblique':
			return 'component__text--oblique'
		default:
			return 'component__text--normal'
	}
})
const borderRadiusStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	if (defaultValues.inputStyle !== 'line' && hasBorderRadius.value) {
		return { borderRadius: `${defaultValues.borderRadius}rem` }
	}
	return {}
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})
const styleTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textColor
})
const styleInputPosition = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.inputPosition === 'top' ? 'column' : 'column-reverse';
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
const styleCaretColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.caretColor || (defaultValues.theme === 'dark' ? '#00d4ff' : '#007bff')
})
const styleSelectionBgColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.selectionBgColor || (defaultValues.theme === 'dark' ? '#00d4ff' : '#007bff')
})
const styleSelectionTextColor = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.selectionTextColor || (defaultValues.theme === 'dark' ? '#000000' : '#ffffff')
})
const caretColorStyle = computed(() => {
  return {
    caretColor: styleCaretColor.value
  }
})
const selectionStyle = computed(() => {
  return {
    '--selection-bg-color': styleSelectionBgColor.value,
    '--selection-text-color': styleSelectionTextColor.value
  }
})
const styleWidth = computed(() => {
	const defaultValues = formatDefaultValues.value

  const widthIb = {
    width: `${defaultValues.width}px`
  }

  return defaultValues.display === 'block' ? { width: 'auto' } : widthIb
})
const themeStyle = computed(() => {
	switch (theme.value) {
		case 'dark':
			return 'component__theme--dark'
		default:
			return 'component__theme--light'
	}
})
const inputStyleClass = computed(() => {
	switch (inputStyle.value) {
		case 'line':
			return 'component__input--line'
		case 'border':
			return 'component__input--border'
		default:
			return 'component__input--background'
	}
})
const interacted = () => {
	emit('clicked')
}

const handleFocus = () => {
  isActive.value = true
  emit('focused')
}
const handleBlur = () => {
  isActive.value = false
  emit('blurred')
}
const handleKeyDown = (event) => {
  if (disabled.value || inputReadonly.value) {
    return;
  }
  if (event.key === 'Enter' && chipInputValue.value.trim() !== '') {
    event.preventDefault();
    let chipValue = chipInputValue.value.trim();
    if (inputUppercase.value) {
      chipValue = chipValue.toUpperCase();
    }
    if (allowDuplicates.value || !chipList.value.includes(chipValue)) {
      addChip(chipValue);
    }
    chipInputValue.value = '';
  }
}
const addChip = (text) => {
  chipList.value.push(text);
  emit('added', text);
}
const removeChip = (chip) => {
  chipList.value = chipList.value.filter(chipItem => chipItem !== chip);
  emit('removed', chip);
}

watch(currentList, (newList) => {
  chipList.value = newList;
  emit('changed', newList);
})
watch(chipInputValue, (newValue) => {
  emit('input-changed', newValue);
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
	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;
  
  // Component style start below:
  display: flex;
  flex-wrap: wrap;
  flex-direction: v-bind('styleInputPosition');
  overflow: hidden;

  // inicio propTheme
  &.component__theme--light {
    color: v-bind('lightTextColor');

    &.component__input--background {
      background-color: v-bind('lightBgColor');
      border: 0;
    }

    &.component__input--line {
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid v-bind('lightBorderColor');
    }

    &.component__input--border {
      background-color: transparent;
      border: 1px solid v-bind('lightBorderColor');
    }

    .chips {
      .chip {
        background-color: v-bind('lightChipBgColor');
        color: v-bind('lightChipTextColor');

        .chip-remove {
          color: v-bind('lightChipRemoveColor');
        }
      }
    }

    .chips-input {
      color: v-bind('lightTextColor');
    }
  }

  &.component__theme--dark {
    color: v-bind('darkTextColor');

    &.component__input--background {
      background-color: v-bind('darkBgColor');
      border: 0;
    }

    &.component__input--line {
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid v-bind('darkBorderColor');
    }

    &.component__input--border {
      background-color: transparent;
      border: 1px solid v-bind('darkBorderColor');
    }

    .chips {
      .chip {
        background-color: v-bind('darkChipBgColor');
        color: v-bind('darkChipTextColor');

        .chip-remove {
          color: v-bind('darkChipRemoveColor');
        }
      }
    }

    .chips-input {
      color: v-bind('darkTextColor');
    }
  }
  // fim propTheme

  // inicio inputStyle
  &.component__input--background {
    // Mantém o comportamento padrão com background
  }

  &.component__input--line {
    &:focus-within {
      border-bottom: 1px solid v-bind('lightBorderColorFocus');
    }

    &.component__theme--dark {
      &:focus-within {
        border-bottom: 1px solid v-bind('darkBorderColorFocus');
      }
    }
  }

  &.component__input--border {
    &:focus-within {
      border: 1px solid v-bind('lightBorderColorFocus');
    }

    &.component__theme--dark {
      &:focus-within {
        border: 1px solid v-bind('darkBorderColorFocus');
      }
    }
  }
  // fim inputStyle

  .chips {
    text-align: left;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;

    .chip {
      display: inline-flex;
      justify-content: space-between;
      gap: 10px;
      white-space: break-spaces;
      align-items: center;
      width: fit-content;
      max-width: 100%;
      min-width: 81px;
      border-radius: 16px;
      padding: 5px 10px;
      margin: 5px;
      font-size: 14px;
      overflow-wrap: anywhere;

      .chip-remove {
        cursor: pointer;
        font-weight: bold;
      }
    }
  }

  .chips-input {
    border: none;
    outline: none;
    flex: 1;
    min-width: 100px;
    margin: 5px;
    font-size: 14px;
    background-color: transparent;
    caret-color: v-bind('styleCaretColor');
    
    &::selection {
      background-color: v-bind('styleSelectionBgColor');
      color: v-bind('styleSelectionTextColor');
    }
    
    &::-moz-selection {
      background-color: v-bind('styleSelectionBgColor');
      color: v-bind('styleSelectionTextColor');
    }

    // inicio activeTextStyle
    &.component__text--italic {
      font-style: italic;
    }

    &.component__text--oblique {
      font-style: oblique;
    }

    &.component__text--normal {
      font-style: normal;
    }
    // fim activeTextStyle
  }
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	opacity: 0.8;

	.component {
		--disabled-button-color: v-bind('styleButtonColor');
		--disabled-color: v-bind('styleTextColor');
		border-radius: inherit;

		&.component__theme--light {
			&.component__input--background {
				background-color: v-bind('lightDisabledBgColor') !important;
			}

			&.component__input--line {
				border-bottom: 1px solid v-bind('lightDisabledBorderColor') !important;
			}

			&.component__input--border {
				border: 1px solid v-bind('lightDisabledBorderColor') !important;
			}
		}

		&.component__theme--dark {
			&.component__input--background {
				background-color: v-bind('darkDisabledBgColor') !important;
			}

			&.component__input--line {
				border-bottom: 1px solid v-bind('darkDisabledBorderColor') !important;
			}

			&.component__input--border {
				border: 1px solid v-bind('darkDisabledBorderColor') !important;
			}
		}
	}
}
</style>
