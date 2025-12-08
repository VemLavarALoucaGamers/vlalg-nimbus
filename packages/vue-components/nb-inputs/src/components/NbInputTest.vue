<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle, inputWidthStyle, borderRadiusStyle]"
    role="input"
    v-bind="computedAriaAttrs"
  >
    <div
      :id="nbId"
      :class="['nb-reset', 'component', sizeMediaQueryStyle, themeStyle, componentReadonly, inputStyleClass]"
      :style="[componentStyle, inputWidthStyle, borderRadiusStyle]"
      @click="interacted"
    >
      <div
        v-if="validShowInputEye"
        :class="['component__eye', activeInput]"
        :style="[borderRadiusStyle]"
        @click="changeShowValue"
      >
        <span :class="['component__eye-icon', 'fas']">
          <span v-if="!inputEyeCustomIcon">{{ inputIcon }}</span>
          <span v-else>
            <slot v-if="showValue" name="eye-icon-show">show</slot>
            <slot v-else name="eye-icon-hidden">hidden</slot>
          </span>
        </span>
      </div>
      <input
        v-model="inputValue"
        :name="inputName"
        :type="currentType"
        class="component__input"
        :class="[ uppercaseStyle, hiddenDefaultEye, activeStyle]"
        :placeholder="inputPlaceholder"
        :disabled="disabled || inputReadonly"
        :required="required"
        :readonly="inputReadonly"
        :autocomplete="inputAutocomplete"
        :tabindex="disabled || inputReadonly ? -1 : tabindex"
        role="input"
        :style="[borderRadiusStyle]"
        @focus="isActive = true"
        @blur="isActive = false"
        @keydown.enter="!disabled && hasTabIndexEnter && enterConfirm()"
      />
    </div>
    <div
      v-if="validShowMsg"
      :class="['component__message', hasCustomMsg ? 'component__message--custom' : 'component__message--default']"
    >
      <slot name="message">{{ message }}</slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, onUnmounted, watch } from 'vue'

defineOptions({
	name: 'NbInputTest',
	inheritAttrs: false
})

onMounted(() => {
  inputValue.value = inputText.value
})
onUnmounted(() => {
  startValue()
})

const emit = defineEmits([
  'current-value',
  'changed',
  'focused',
  'blurred',
  'show-input-eye',
  'clicked',
  'entered'
])

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
    default: 'Alternate Text Button'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
	textColor: { // TESTAR AINDA
		type: String,
		default: '#ffffff'
	},
	caretColor: {
		type: String,
		default: '',
		validator: value => {
			return !value || typeof value === 'string'
		}
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
	theme: {
		type: String,
		default: 'light',
		validator: value => {
			return ['dark', 'light'].indexOf(value) !== -1
		}
	},
  hasBorderRadius: {
    type: Boolean,
    default: false,
		validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    },
	},
	borderRadius: {
		type: Number,
		default: .5 // 0.375
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
	fontFamilyMsg: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSizeMsg: {
		type: String,
		default: '1em',
		validator: value => {
			return !value ? '1em' : value
		}
	},
	fontWeightMsg: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 700 : value
		}
	},
	textMessageColor: {
		type: String,
		default: '#f15574'
	},
  textAlign: {
    type: String,
    default: 'left',
    validator: value => {
      return ['center', 'left', 'right'].indexOf(value) !== -1
    },
  },
  inputText: {
    type: String,
    default: '',
  },
  inputType: {
    type: String,
    default: 'text',
    validator: value => { // TESTAR AINDA: 'tel', 'url'
      return ['text', 'number', 'email', 'password'].indexOf(value) !== -1
    },
  },
  hasTrim: {
    type: Boolean,
    default: false,
    validator: value => {
      return [true, false].indexOf(value) !== -1
    },
  },
  inputName: {
    type: String,
    required: true,
  },
  inputPlaceholder: {
      type: String,
      default: '',
  },
  showInputEye: {
    type: Boolean,
    default: false,
    validator: value => {
      return [true, false].indexOf(value) !== -1
    },
  },
  inputEyeIcon: {
    type: String,
    default: '🫣',
  },
  inputEyeIconHidden: {
    type: String,
    default: '😎',
  },
  inputEyeCustomIcon: {
    type: Boolean,
    default: false,
    validator: value => {
      return [true, false].indexOf(value) !== -1
    },
  },
  activeTextStyle: {
    type: String,
    default: 'normal',
    validator: value => {
      return ['normal', 'italic', 'oblique'].indexOf(value) !== -1
    },
  },
  sizeMediaQuery: {
    type: String,
    default: 'sm',
    validator: value => {
      return ['xs', 'sm', 'md', 'lg'].indexOf(value) !== -1
    },
  },
  required: {
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
    },
  },
  inputUppercase: {
    type: Boolean,
    default: false,
    validator: value => {
      return [true, false].indexOf(value) !== -1
    },
  },
  inputWidth: {
		type: Number,
		default: 200
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
	lightEyeBgColor: {
		type: String,
		default: '#353734'
	},
	lightEyeBgColorActive: {
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
	// Cores do tema dark
	darkBgColor: {
		type: String,
		default: '#353734'
	},
	darkBgColorFocus: {
		type: String,
		default: '#272936'
	},
	darkEyeBgColor: {
		type: String,
		default: '#353734'
	},
	darkEyeBgColorActive: {
		type: String,
		default: '#272936'
	},
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
	},
	darkTextColor: {
		type: String,
		default: '#000000'
	},
	darkDisabledEyeBgColor: {
		type: String,
		default: 'rgba(68, 71, 90, 0.3)'
	},
	lightDisabledEyeBgColor: {
		type: String,
		default: 'rgba(53, 55, 52, 0.3)'
	},
	tabindex: {
		type: [String, Number],
		default: 0
	},
  showMsg: { // Se mostrado o erro
    type: Boolean,
    default: false,
    validator: value => {
      return [true, false].indexOf(value) !== -1
    },
  },
  hasMsg: { // Se tem erro
    type: Boolean,
    default: false,
    validator: value => {
      return [true, false].indexOf(value) !== -1
    },
  },
  message: {
    type: String,
    default: 'Default message text',
  },
  hasCustomMsg: {
    type: Boolean,
    default: false,
    validator: value => {
      return [true, false].indexOf(value) !== -1
    },
  },
})

const {
	display,
  hasTabIndexEnter,
  ariaLabel,
  ariaAttrs,
	textColor,
	caretColor,
	selectionBgColor,
	selectionTextColor,
  hasBorderRadius,
	borderRadius,
	disabled,
	fontFamily,
	fontSize,
	fontWeight,
	fontFamilyMsg,
	fontSizeMsg,
	fontWeightMsg,
	textMessageColor,
	inputWidth,
	inputStyle,
	activeTextStyle,
	sizeMediaQuery,
	inputReadonly,
	showInputEye,
	inputType,
  hasTrim,
	inputUppercase,
  inputName,
  inputPlaceholder,
  inputText,
  theme,
  inputEyeIcon,
  tabindex,
  inputEyeIconHidden,
	lightBgColor,
	lightBgColorFocus,
	lightEyeBgColor,
	lightEyeBgColorActive,
	lightDisabledBgColor,
	lightTextColor,
	darkBgColor,
	darkBgColorFocus,
	darkEyeBgColor,
	darkEyeBgColorActive,
	darkDisabledBgColor,
	darkTextColor,
	darkDisabledEyeBgColor,
	lightDisabledEyeBgColor,
  textAlign,
  showMsg,
  hasMsg
} = toRefs(props)

const inputValue = ref('')
const currentType = ref('')
const showValue = ref(false)
const isActive = ref(false)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const textColorValue = !textColor ? 'ffffff' : textColor.value
	const caretColorValue = !caretColor.value ? '' : caretColor.value
	const selectionBgColorValue = !selectionBgColor.value ? '' : selectionBgColor.value
	const selectionTextColorValue = !selectionTextColor.value ? '' : selectionTextColor.value
  const hasBorderRadiusValue = !hasBorderRadius.value ? false : hasBorderRadius.value
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6rem' : fontSize.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 100 : fontWeight.value
  const fontFamilyMsgValue = !fontFamilyMsg.value ? `'Lato', sans-serif` : fontFamilyMsg.value
  const fontSizeMsgValue = !fontSizeMsg.value ? '1em' : fontSizeMsg.value
  const fontWeightMsgValue = !fontWeightMsg.value || fontWeightMsg.value < 0 ? 100 : fontWeightMsg.value
  const textMessageColorValue = !textMessageColor.value ? '#f15574' : textMessageColor.value
  const inputWidthValue = !inputWidth.value ? 200 : inputWidth.value
  const activeTextStyleValue = !activeTextStyle.value ? 'normal' : activeTextStyle.value
  const sizeMediaQueryValue = !sizeMediaQuery.value ? 'xs' : sizeMediaQuery.value
  const inputReadonlyValue = !inputReadonly.value ? false : inputReadonly.value
  const showInputEyeValue = !showInputEye.value ? false : showInputEye.value
  const inputTypeValue = !inputType.value ? 'text' : inputType.value
  const inputUppercaseValue = !inputUppercase.value ? false : inputUppercase.value
  const themeValue = !theme.value ? 'normal' : theme.value
  const textAlignValue = !textAlign.value ? 'left' : textAlign.value
  const inputStyleValue = !inputStyle.value ? 'background' : inputStyle.value

	return {
		disabled: disabledValue,
		display: displayValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		fontFamilyMsg: fontFamilyMsgValue,
		fontSizeMsg: fontSizeMsgValue,
		fontWeightMsg: fontWeightMsgValue,
		textMessageColor: textMessageColorValue,
		textColor: textColorValue,
		caretColor: caretColorValue,
		selectionBgColor: selectionBgColorValue,
		selectionTextColor: selectionTextColorValue,
    hasBorderRadius: hasBorderRadiusValue,
		borderRadius: borderRadiusValue,
    textAlign: textAlignValue,
    inputWidth: inputWidthValue,
    activeTextStyle: activeTextStyleValue,
    sizeMediaQuery: sizeMediaQueryValue,
    inputReadonly: inputReadonlyValue,
    showInputEye: showInputEyeValue,
    inputType: inputTypeValue,
    inputUppercase: inputUppercaseValue,
    theme: themeValue,
    inputStyle: inputStyleValue
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
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
	}
})
const borderRadiusStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  if (defaultValues.inputStyle !== 'line' && defaultValues.hasBorderRadius) {
    return { borderRadius: `${defaultValues.borderRadius}rem` }
  }

  return {}
})
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})
const fontMessage = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.fontFamilyMsg
})
const fontSizeMessage = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.fontSizeMsg
})
const fontWeightMessage = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.fontWeightMsg
})
const styleTextColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textColor
})
const styleTextMessageColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.textMessageColor
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

const inputWidthStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  if (defaultValues.display === 'block') return { width: '100%' }

  return {
    width: `${defaultValues.inputWidth}px`
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
const activeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  switch (defaultValues.activeTextStyle) {
    case 'italic':
      return 'component__input--active--italic'
    case 'oblique':
      return 'component__input--active--oblique'
    default:
      return 'component__input--active--normal'
  }
})
const sizeMediaQueryStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  switch (defaultValues.sizeMediaQuery) {
    case 'sm':
      return 'component__sm'
    case 'md':
      return 'component__md'
    case 'lg':
      return 'component__lg'
    default:
      return ''
  }
})
const themeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  switch (defaultValues.theme) {
    case 'dark':
      return 'component__theme--dark'
    default:
      return 'component__theme--light'
  }
})
const componentReadonly = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.inputReadonly ? 'component__input--read-only' : ''
})
const uppercaseStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.inputUppercase ? 'component__input--uppercase' : ''
})
const validShowInputEye = computed(() => {
  const defaultValues = formatDefaultValues.value

  return !!(defaultValues.showInputEye && defaultValues.inputType === 'password')
})
const inputIcon = computed(() => {
  if (showValue.value) return inputEyeIcon.value

  return inputEyeIconHidden.value
})
const hiddenDefaultEye = computed(() => {
  const defaultValues = formatDefaultValues.value

  return defaultValues.inputType === 'password' ? 'component__eye-default--hidden' : ''
})
const activeInput = computed(() => {
  return isActive.value ? 'component__input--active' : 'component__input--no-active'
})
const inputPadding = computed(() => {
  if (!validShowInputEye.value) return '6px 10px'

  return '6px 50px 6px 10px'
})
const validShowMsg = computed(() => {
  return !!(showMsg.value && hasMsg.value)
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
  inputValue.value = inputText.value

  console.log('aqui')
  currentType.value = inputType.value
}
const changeShowValue = () => {
  const defaultValues = formatDefaultValues.value

  if (defaultValues.inputReadonly || defaultValues.disabled) return

  const newShow = !showValue.value

  if (newShow) {
    currentType.value = 'text'
  } else {
    currentType.value = inputType.value
  }

  showValue.value = newShow
}

const interacted = () => {
	emit('clicked')
}
const enterConfirm = () => {
  if (disabled.value || formatDefaultValues.value.inputReadonly || !hasTabIndexEnter.value) return

  emit('entered', inputValue.value)
}

watch(inputType, value => {
  currentType.value = value
}, { immediate: true })
watch(inputText, value => {
  console.log('inputText', value)
  if (value !== inputValue.value) inputValue.value = value
})
watch(inputValue, value => {
  if (hasTrim.value) value = value.trim()

  emit('changed', value)
})
watch(isActive, value => {
  if (value) {
    emit('focused')
  } else {
    emit('blurred')
  }
})
watch(showValue, value => {
  emit('show-input-eye', value)
}, { immediate: true })
watch(inputValue, value => {
  if (hasTrim.value) value = value.trim()

  emit('current-value', value)
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
	text-align: center;
	-webkit-text-decoration-line: none;
	text-decoration-line: none;
	white-space: nowrap;
  
  // Component style start below:
  margin-bottom: 3px;
  text-align: left;
  position: relative;
  margin: 0;
  padding: 0;
  height: 28px;
  max-height: 28px;
  display: inline-block;

  // inicio sizeMediaQuery
  &.component__sm {
      height: 32.39px;
      max-height: 32.39px;

      .component__eye {
        padding: 5px 10px;
      }

      .component__input {
        font-size: 1.2em;
      }
    }
    &.component__md {
      height: 48px;
      max-height: 48px;

      .component__eye {
        padding: 10px 10px;
      }

      .component__input {
        font-size: 1.6em;
      }
    }
    &.component__lg {
      height: 58px;
      max-height: 58px;

      .component__eye {
        padding: 17px 10px;
      }

      .component__input {
        font-size: 2em;
      }
    }
    // fim sizeMediaQuery

    .component__eye {
      color: v-bind('lightTextColor');
    }

    .component__input {
      color: v-bind('lightTextColor');
      caret-color: v-bind('styleCaretColor');
      
      &::selection {
        background-color: v-bind('styleSelectionBgColor');
        color: v-bind('styleSelectionTextColor');
      }
      
      &::-moz-selection {
        background-color: v-bind('styleSelectionBgColor');
        color: v-bind('styleSelectionTextColor');
      }
    }

    // inicio propTheme
    &.component__theme--dark {
      .component__eye {
        color: v-bind('darkTextColor');
      }

      .component__input {
        color: v-bind('darkTextColor');
      }

      &.component__input--disabled,
      &.component__input--read-only {
        &.component__input--background {
          .component__eye {
            background-color: v-bind('darkDisabledEyeBgColor');

            &:hover {
              cursor: not-allowed;
            }
          }

          .component__input {
            background-color: v-bind('darkDisabledBgColor');
            &:focus,
            &:active {
              background-color: v-bind('darkDisabledBgColor');

              &::placeholder,
              &::placeholder:active,
              &::placeholder:focus {
                background-color: v-bind('darkDisabledBgColor');
              }
            }

            &::placeholder,
            &::placeholder:active,
            &::placeholder:focus {
              background-color: v-bind('darkDisabledBgColor');
            }
          }
        }
      }

      &.component__input--background {
        .component__eye {
          background-color: v-bind('darkEyeBgColor');

          &.component__input--active {
            background-color: v-bind('darkEyeBgColorActive');
          }

          &.component__input--no-active {
            background-color: v-bind('darkEyeBgColor');
          }
        }

        .component__input {
          background-color: v-bind('darkBgColor');

          &:focus,
          &:active {
            background-color: v-bind('darkBgColorFocus');

            &::placeholder,
            &::placeholder:active,
            &::placeholder:focus {
              opacity: 0.5;
            }
          }

          &::placeholder,
          &::placeholder:active,
          &::placeholder:focus {
            opacity: 0.5;
          }
        }
      }
    }
    &.component__theme--light {
      .component__eye {
        color: v-bind('lightTextColor');
      }

      .component__input {
        color: v-bind('lightTextColor');
      }

      &.component__input--disabled,
      &.component__input--read-only {
        &.component__input--background {
          .component__eye {
            background-color: v-bind('lightDisabledEyeBgColor');

            &:hover {
              cursor: not-allowed;
            }
          }

          .component__input {
            background-color: v-bind('lightDisabledBgColor');
            &:focus,
            &:active {
              background-color: v-bind('lightDisabledBgColor');
            }
          }
        }
      }

      &.component__input--background {
        .component__eye {
          background-color: v-bind('lightEyeBgColor');
        }

        .component__input {
          background-color: v-bind('lightBgColor');

          &:focus,
          &:active {
            background-color: v-bind('lightBgColorFocus');
          }
        }
      }
    }
    // fim propTheme

    // inicio inputStyle
    &.component__input--line {
      .component__eye {
        background-color: transparent;
        opacity: 1;
      }

      .component__input {
        background-color: transparent;
        border: 0;
        border-bottom: 1px solid v-bind('lightEyeBgColor');

        &:focus,
        &:active {
          background-color: transparent;
          border: 0;
          border-bottom: 1px solid v-bind('lightEyeBgColorActive');
        }
      }

      &.component__theme--dark {
        .component__input {
          border-bottom: 1px solid v-bind('darkEyeBgColor');

          &:focus,
          &:active {
            border-bottom: 1px solid v-bind('darkEyeBgColorActive');
          }
        }
      }

      &.component__input--disabled,
      &.component__input--read-only {
        .component__eye {
          opacity: 0.2;
        }

        .component__input {
          border-bottom: 1px solid v-bind('lightDisabledEyeBgColor');

          &:focus,
          &:active {
            border-bottom: 1px solid v-bind('lightDisabledEyeBgColor');
          }
        }

        &.component__theme--dark {
          .component__input {
            border-bottom: 1px solid v-bind('darkDisabledEyeBgColor');

            &:focus,
            &:active {
              border-bottom: 1px solid v-bind('darkDisabledEyeBgColor');
            }
          }
        }
      }
    }

    &.component__input--border {
      .component__eye {
        background-color: transparent;
        opacity: 1;
      }

      .component__input {
        background-color: transparent;
        border: 1px solid v-bind('lightEyeBgColor');

        &:focus,
        &:active {
          background-color: transparent;
          border: 1px solid v-bind('lightEyeBgColorActive');
        }
      }

      &.component__theme--dark {
        .component__input {
          border: 1px solid v-bind('darkEyeBgColor');

          &:focus,
          &:active {
            border: 1px solid v-bind('darkEyeBgColorActive');
          }
        }
      }

      &.component__input--disabled,
      &.component__input--read-only {
        .component__eye {
          opacity: 0.2;
        }

        .component__input {
          border: 1px solid v-bind('lightDisabledEyeBgColor');

          &:focus,
          &:active {
            border: 1px solid v-bind('lightDisabledEyeBgColor');
          }
        }

        &.component__theme--dark {
          .component__input {
            border: 1px solid v-bind('darkDisabledEyeBgColor');

            &:focus,
            &:active {
              border: 1px solid v-bind('darkDisabledEyeBgColor');
            }
          }
        }
      }
    }

    &.component__input--background {
      // Mantém o comportamento padrão com background
    }
    // fim inputStyle

    // inicio propReadonly
    &.component__input--read-only {
      .component__input {
        filter: alpha(opacity=55);
        -moz-opacity: 0.55;
        opacity: 0.55;

        &:focus,
        &:active,
        &:hover {
          cursor: not-allowed;
        }
      }
    }
    // fim propReadonly

    .component__eye {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      padding: 1px 10px;
      margin: 2px 2px 2px 0;
      z-index: 1;

      &:hover {
        cursor: pointer;
      }

      .component__eye-icon {
        font-family: 'FontAwesome';
      }
    }

    // inicio INPUT
    .component__input {
      width: 100%;
      height: 100%;
      font-family: inherit;
      font-style: normal;
      font-weight: normal;
      font-size: 1em;
      line-height: 1.5;
      border: 0;
      border-radius: 0;
      text-shadow: 0;
      position: relative;
      outline: none;
      background-color: transparent;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      text-align: v-bind('textAlign');
      padding: v-bind('inputPadding');

      &:focus,
      &:active {
        border: 0;
      }

      &.component__input__eye-default--hidden {
        &::-ms-reveal,
        &::-ms-clear {
          display: none;
        }
      }

      // inicio propActiveStyle
      &.component__input--active--italic:focus,
      &.component__input--active--italic:active {
        font-style: italic;
      }
      &.component__input--active--oblique:focus,
      &.component__input--active--oblique:active {
        font-style: oblique;
      }
      &.component__input--active--normal:focus,
      &.component__input--active--normal:active {
        font-style: normal;
      }
      // fim propActiveStyle

      // inicio propUppercase
      &.component__input--uppercase {
        text-transform: uppercase;

        &::placeholder {
          text-transform: none;
        }
      }
      // fim propUppercase
    }
    // fim INPUT
}

.component__message {
  &.component__message--default {
    font-family: v-bind('fontMessage');
    font-size: v-bind('fontSizeMessage');
    font-weight: v-bind('fontWeightMessage');
    color: v-bind('styleTextMessageColor');
    padding-left: 2px;
    margin-top: 2px;
  }
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	background-color: #ffffff;
	opacity: 0.8;

	.component {
		--disabled-button-color: v-bind('styleButtonColor');
		--disabled-color: v-bind('styleTextColor');
		background-color: var(--disabled-button-color) !important;
		color: var(--disabled-color) !important;
		border-radius: inherit;

    .component__eye {
      background-color: rgba(#f15574, 0.3);

      &:hover {
        cursor: not-allowed;
      }
    }

    .component__input {
      &:focus,
      &:active {
        background-color: #f15574;
      }
    }
	}
}
</style>
