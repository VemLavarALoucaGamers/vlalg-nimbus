<template>
  <div
    v-if="nbId"
    ref="wrapperRef"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle, selectWidthStyle]"
    @focusout="handleWrapperFocusOut"
  >
    <div
      :id="nbId"
      :ref="nbId"
      :class="['nb-reset', 'component', themeStyle, inputStyleClass]"
      :style="[componentStyle, selectWidthStyle, borderRadiusStyle]"
      v-bind="computedAriaAttrs"
    >
      <label
        v-if="hasLabel"
        :for="selectName"
        class="component__label"
      >
        {{ labelText }}<span v-if="required" class="component__label--required">*</span>
      </label>

      <!-- Select simples (não múltiplo) com dropdown customizado -->
      <div
        v-if="!multiple"
        class="component__dropdown"
        :class="{ 'open': isDropdownOpenSingle, 'disabled': disabled }"
      >
        <!-- Campo que simula um select -->
        <div
          ref="dropdownFieldSingleRef"
          class="component__dropdown-field"
          :class="{ 'has-selection': currentOptionOnly !== null && currentOptionOnly !== emptyOptionValue }"
          :style="[borderRadiusStyle]"
          :tabindex="disabled ? -1 : tabIndex"
          @click="toggleDropdownSingle"
          @keydown="handleKeyDownSingle"
        >
          <span v-if="!currentOptionOnly || currentOptionOnly === emptyOptionValue" class="component__dropdown-placeholder">
            {{ emptyOptionText }}
          </span>
          <span v-else class="component__dropdown-selected">
            {{ getSelectedTextSingle() }}
          </span>
          <span class="component__dropdown-arrow" :class="{ 'open': isDropdownOpenSingle }">▼</span>
        </div>

        <!-- Lista de opções -->
        <div
          v-if="isDropdownOpenSingle"
          class="component__option-group"
          :class="dropdownScrollClass"
          role="listbox"
        >
          <!-- Opção vazia (placeholder) -->
          <div
            v-if="hasEmptyOption"
            data-option-index-single="0"
            class="component__option-item"
            :class="{ 
              'disabled': disabled,
              'selected': !currentOptionOnly || currentOptionOnly === emptyOptionValue
            }"
            :tabindex="disabled ? -1 : (focusedOptionIndexSingle === 0 ? 0 : -1)"
            role="option"
            :aria-selected="!currentOptionOnly || currentOptionOnly === emptyOptionValue"
            @click.prevent="!disabled && selectOptionSingle(emptyOptionValue)"
            @keydown.enter.prevent="!disabled && hasTabIndexEnter && selectOptionSingle(emptyOptionValue)"
            @keydown.space.prevent="!disabled && hasTabIndexSpace && selectOptionSingle(emptyOptionValue)"
            @keydown.arrow-down.prevent="!disabled && navigateOptionsSingle('down')"
            @keydown.arrow-up.prevent="!disabled && navigateOptionsSingle('up')"
            @keydown.escape.prevent="!disabled && closeDropdownSingle()"
          >
            <span class="component__option-label">
              {{ emptyOptionText }}
            </span>
          </div>
          <div
            v-for="(option, optionIndex) in options"
            :key="optionIndex"
            :data-option-index-single="hasEmptyOption ? optionIndex + 1 : optionIndex"
            class="component__option-item"
            :class="{ 
              'disabled': option.disabled || disabled,
              'selected': currentOptionOnly === option[valueKey]
            }"
            :tabindex="(option.disabled || disabled) ? -1 : (focusedOptionIndexSingle === (hasEmptyOption ? optionIndex + 1 : optionIndex) ? 0 : -1)"
            role="option"
            :aria-selected="currentOptionOnly === option[valueKey]"
            @click.prevent="!option.disabled && !disabled && selectOptionSingle(option[valueKey])"
            @keydown.enter.prevent="!option.disabled && !disabled && hasTabIndexEnter && selectOptionSingle(option[valueKey])"
            @keydown.space.prevent="!option.disabled && !disabled && hasTabIndexSpace && selectOptionSingle(option[valueKey])"
            @keydown.arrow-down.prevent="!option.disabled && !disabled && navigateOptionsSingle('down')"
            @keydown.arrow-up.prevent="!option.disabled && !disabled && navigateOptionsSingle('up')"
            @keydown.escape.prevent="!option.disabled && !disabled && closeDropdownSingle()"
          >
            <span class="component__option-label">
              <slot
                name="slot-select-item"
                :prop-row="option"
                :prop-index="optionIndex"
              >
                {{ option[textKey] }}
              </slot>
            </span>
          </div>
        </div>
      </div>

      <!-- Select múltiplo com dropdown de checkboxes -->
      <div
        v-else
        class="component__dropdown"
        :class="{ 'open': isDropdownOpen, 'disabled': disabled }"
      >
        <!-- Campo que simula um select -->
        <div
          ref="dropdownFieldMultipleRef"
          class="component__dropdown-field"
          :class="{ 'has-selection': safeCurrentOptionMultiple.length > 0 }"
          :style="[borderRadiusStyle]"
          :tabindex="disabled ? -1 : tabIndex"
          @click="toggleDropdown"
          @keydown="handleKeyDownMultiple"
        >
          <span v-if="safeCurrentOptionMultiple.length === 0" class="component__dropdown-placeholder">
            {{ emptyOptionText }}
          </span>
          <span v-else class="component__dropdown-selected">
            {{ getSelectedText() }}
          </span>
          <span class="component__dropdown-arrow" :class="{ 'open': isDropdownOpen }">▼</span>
        </div>

        <!-- Lista de opções com checkboxes -->
        <div
          v-if="isDropdownOpen"
          class="component__checkbox-group"
          :class="dropdownScrollClass"
          role="listbox"
        >
          <label
            v-for="(option, optionIndex) in options"
            :key="optionIndex"
            :data-option-index-multiple="optionIndex"
            class="component__checkbox-option"
            :class="{ 
              'disabled': option.disabled || disabled,
              'selected': safeCurrentOptionMultiple.includes(option[valueKey])
            }"
            :tabindex="(option.disabled || disabled) ? -1 : (focusedOptionIndexMultiple === optionIndex ? 0 : -1)"
            role="option"
            :aria-selected="safeCurrentOptionMultiple.includes(option[valueKey])"
            @click.prevent="!option.disabled && !disabled && toggleOption(option[valueKey])"
            @keydown.enter.prevent="!option.disabled && !disabled && hasTabIndexEnter && toggleOption(option[valueKey])"
            @keydown.space.prevent="!option.disabled && !disabled && hasTabIndexSpace && toggleOption(option[valueKey])"
            @keydown.arrow-down.prevent="!option.disabled && !disabled && navigateOptionsMultiple('down')"
            @keydown.arrow-up.prevent="!option.disabled && !disabled && navigateOptionsMultiple('up')"
            @keydown.escape.prevent="!option.disabled && !disabled && closeDropdownMultiple()"
          >
            <input
              type="checkbox"
              :value="option[valueKey]"
              :checked="safeCurrentOptionMultiple.includes(option[valueKey])"
              :disabled="option.disabled || disabled"
              @click.stop
            />
            <span class="component__checkbox-label">
              <slot
                name="slot-select-item"
                :prop-row="option"
                :prop-index="optionIndex"
              >
                {{ option[textKey] }}
              </slot>
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, watch, onUnmounted, nextTick } from 'vue'

defineOptions({
  name: 'NbSelect',
  inheritAttrs: false
})

onMounted(() => {
  if (!multiple.value) {
    currentOptionOnly.value = selectedOptionOnly.value
  } else {
    currentOptionMultiple.value = selectedOptionMultiple.value || []
  }

  // Adicionar listener para fechar dropdown quando clicar fora
  document.addEventListener('click', closeDropdown)
  // Escutar evento para fechar todos os dropdowns
  document.addEventListener('nbselect:close-all', handleCloseAllDropdowns)

  initialized.value = true
})

// Cleanup do listener quando componente for desmontado
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
  document.removeEventListener('nbselect:close-all', handleCloseAllDropdowns)
})

const emit = defineEmits(['clicked', 'changed', 'user-changed'])

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
		}
	},
	borderRadius: {
		type: Number,
		default: 0.5
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
	textAlign: {
		type: String,
		default: 'left',
		validator: value => {
			return ['center', 'left', 'right'].indexOf(value) !== -1
		}
	},
	selectWidth: {
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
	selectName: {
		type: String,
		default: 'selectX'
	},
	required: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	options: {
		type: Array,
		default: () => []
	},
	selectedOptionOnly: {
		type: [String, Number, Boolean],
		default: ''
	},
	selectedOptionMultiple: {
		type: Array,
		default: () => [],
		validator: value => {
			return value === null || Array.isArray(value)
		}
	},
	textKey: {
		type: String,
		default: 'text'
	},
	valueKey: {
		type: String,
		default: 'value'
	},
	multiple: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	hasEmptyOption: {
		type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	emptyOptionText: {
		type: String,
		default: 'Selecione uma opção'
	},
	emptyOptionValue: {
		type: [String, Number],
		default: null
	},
	dropdownScrollClass: {
		type: String,
		default: ''
	},
	hasLabel: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	labelText: {
		type: String,
		default: 'Select: '
	},
	labelMarginBottom: {
		type: Number,
		default: 0
	},
	labelMarginLeft: {
		type: Number,
		default: 0
  },
  fontFamilyLabel: {
		type: String,
		default: `'Lato', sans-serif`
	},
  fontSizeLabel: {
		type: String,
		default: '1em',
		validator: value => {
			return !value ? '1em' : value
		}
	},
	fontWeightLabel: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 700 : value
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
	lightDisabledBorderColor: {
		type: String,
		default: 'rgba(53, 55, 52, 0.3)'
	},
	lightOptionTextColor: {
		type: String,
		default: '#000000'
	},
	lightOptionTextColorSelected: {
		type: String,
		default: '#000000'
	},
	lightOptionBgColorSelected: {
		type: String,
		default: '#e0e0e0'
	},
	lightPlaceholderColor: {
		type: String,
		default: '#999999'
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
	darkDisabledBorderColor: {
		type: String,
		default: 'rgba(68, 71, 90, 0.3)'
	},
	darkOptionTextColor: {
		type: String,
		default: '#ffffff'
	},
	darkOptionTextColorSelected: {
		type: String,
		default: '#ffffff'
	},
	darkOptionBgColorSelected: {
		type: String,
		default: '#3d3d3d'
	},
	darkPlaceholderColor: {
		type: String,
		default: '#999999'
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
		default: 'Select'
	},
	ariaAttrs: {
		type: Object,
		default: () => ({})
	}
})

const {
	display,
	theme,
	hasBorderRadius,
	borderRadius,
	disabled,
	fontFamily,
	fontSize,
	fontWeight,
	textAlign,
	selectWidth,
	inputStyle,
	selectName,
	required,
	options,
	selectedOptionOnly,
	selectedOptionMultiple,
	textKey,
	valueKey,
	multiple,
	hasEmptyOption,
	emptyOptionValue,
	dropdownScrollClass,
	hasLabel,
	labelText,
	labelMarginBottom,
	labelMarginLeft,
	fontFamilyLabel,
	fontSizeLabel,
	fontWeightLabel,
	emptyOptionText,
	lightBgColor,
	lightBgColorFocus,
	lightBorderColor,
	lightBorderColorFocus,
	lightDisabledBgColor,
	lightTextColor,
	lightDisabledBorderColor,
	lightOptionTextColor,
	lightOptionTextColorSelected,
	lightOptionBgColorSelected,
	lightPlaceholderColor,
	darkBgColor,
	darkBgColorFocus,
	darkBorderColor,
	darkBorderColorFocus,
	darkDisabledBgColor,
	darkTextColor,
	darkDisabledBorderColor,
	darkOptionTextColor,
	darkOptionTextColorSelected,
	darkOptionBgColorSelected,
	darkPlaceholderColor,
	tabIndex,
	hasTabIndexEnter,
	hasTabIndexSpace,
	ariaLabel,
	ariaAttrs
} = toRefs(props)

const currentOptionOnly = ref(null)
const currentOptionMultiple = ref([])
const initialized = ref(false)
const isDropdownOpen = ref(false)
const isDropdownOpenSingle = ref(false)
const wrapperRef = ref(null)
const isClickingOption = ref(false)
const dropdownFieldSingleRef = ref(null)
const dropdownFieldMultipleRef = ref(null)
const focusedOptionIndexSingle = ref(-1)
const focusedOptionIndexMultiple = ref(-1)

// Computed para garantir que o v-model sempre seja um array para selects múltiplos
const safeCurrentOptionMultiple = computed({
	get: () => Array.isArray(currentOptionMultiple.value) ? currentOptionMultiple.value : [],
	set: (newValue) => {
		currentOptionMultiple.value = Array.isArray(newValue) ? newValue : []
	}
})

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6rem' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 100 : fontWeight.value
	const selectWidthValue = ((selectWidth.value !== 0 && !selectWidth.value) || selectWidth.value < 0) ? 200 : selectWidth.value
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const hasBorderRadiusValue = !hasBorderRadius.value ? false : hasBorderRadius.value
	const textAlignValue = !textAlign.value || !['center', 'left', 'right'].includes(textAlign.value) ? 'left' : textAlign.value
	const inputStyleValue = !inputStyle.value || !['background', 'line', 'border'].includes(inputStyle.value) ? 'background' : inputStyle.value

	return {
		disabled: disabledValue,
		display: displayValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		selectWidth: selectWidthValue,
		borderRadius: borderRadiusValue,
		hasBorderRadius: hasBorderRadiusValue,
		textAlign: textAlignValue,
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
		fontWeight: defaultValues.fontWeight,
		textAlign: defaultValues.textAlign
	}
})

const font = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.font
})

const styleTextColor = computed(() => {
	return theme.value === 'dark' ? darkTextColor.value : lightTextColor.value
})

const labelMarginBottomStyle = computed(() => {
	return `${labelMarginBottom.value}px`
})

const labelMarginLeftStyle = computed(() => {
	return `${labelMarginLeft.value}px`
})

const labelFontFamilyStyle = computed(() => {
	return fontFamilyLabel.value || `'Lato', sans-serif`
})

const labelFontSizeStyle = computed(() => {
	return fontSizeLabel.value || '1em'
})

const labelFontWeightStyle = computed(() => {
	return fontWeightLabel.value || 400
})

const selectWidthStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	if (defaultValues.display === 'block') return { width: '100%' }
	return {
		width: `${defaultValues.selectWidth}px`
	}
})

const borderRadiusStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	if (defaultValues.inputStyle !== 'line' && defaultValues.hasBorderRadius) {
		return { borderRadius: `${defaultValues.borderRadius}rem` }
	}
	return {}
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

// Funções para navegar nas opções (multiple select)
const navigateOptionsMultiple = (direction) => {
	const allOptions = options.value.map((opt, idx) => ({ 
		value: opt[valueKey.value], 
		disabled: opt.disabled || disabled.value,
		index: idx
	}))
	
	const availableOptions = allOptions.filter(opt => !opt.disabled)
	if (availableOptions.length === 0) return
	
	let currentIndex = focusedOptionIndexMultiple.value
	if (currentIndex < 0 && options.value.length > 0) {
		currentIndex = 0
	}
	
	if (direction === 'down') {
		// Encontrar próximo índice disponível
		let nextIndex = (currentIndex + 1) % allOptions.length
		let attempts = 0
		while (allOptions[nextIndex].disabled && attempts < allOptions.length) {
			nextIndex = (nextIndex + 1) % allOptions.length
			attempts++
		}
		if (!allOptions[nextIndex].disabled) {
			currentIndex = nextIndex
		}
	} else if (direction === 'up') {
		// Encontrar índice anterior disponível
		let prevIndex = currentIndex <= 0 ? allOptions.length - 1 : currentIndex - 1
		let attempts = 0
		while (allOptions[prevIndex].disabled && attempts < allOptions.length) {
			prevIndex = prevIndex <= 0 ? allOptions.length - 1 : prevIndex - 1
			attempts++
		}
		if (!allOptions[prevIndex].disabled) {
			currentIndex = prevIndex
		}
	}
	
	focusedOptionIndexMultiple.value = currentIndex
	// Focar o elemento
	nextTick(() => {
		const optionElement = document.querySelector(`[data-option-index-multiple="${currentIndex}"]`)
		if (optionElement) {
			optionElement.focus()
		}
	})
}

const toggleDropdown = (event) => {
	if (!disabled.value) {
		event.stopPropagation()
		const wasOpen = isDropdownOpen.value
		isDropdownOpen.value = !isDropdownOpen.value
		
		// Se estiver abrindo, fechar todos os outros e focar primeira opção
		if (!wasOpen && isDropdownOpen.value) {
			closeAllOtherDropdowns()
			// Focar primeira opção disponível
			if (options.value.length > 0) {
				focusedOptionIndexMultiple.value = 0
				// Focar o elemento após o DOM atualizar
				nextTick(() => {
					const optionElement = document.querySelector(`[data-option-index-multiple="${focusedOptionIndexMultiple.value}"]`)
					if (optionElement) {
						optionElement.focus()
					}
				})
			}
		} else if (!isDropdownOpen.value) {
			focusedOptionIndexMultiple.value = -1
		}
	}
}

// Função para fechar dropdown quando clicar fora
const closeDropdown = (event) => {
	const dropdown = event.target.closest('.component__dropdown')
	if (!dropdown) {
		isDropdownOpen.value = false
		isDropdownOpenSingle.value = false
	}
}

// Função para fechar dropdown quando o foco sair do componente
const handleWrapperFocusOut = (event) => {
	// Fechar dropdown quando o foco sair completamente do componente
	if ((isDropdownOpen.value || isDropdownOpenSingle.value) && !wrapperRef.value?.contains(event.relatedTarget)) {
		// Usar setTimeout para permitir que o clique na opção seja processado primeiro
		setTimeout(() => {
			// Não fechar se ainda estiver clicando em uma opção
			if (isClickingOption.value) {
				return
			}
			
			// Verificar se o elemento ativo ainda está dentro do componente
			if (wrapperRef.value?.contains(document.activeElement)) {
				return
			}
			
			// Fechar dropdown e retornar foco ao campo de seleção
			if (isDropdownOpen.value) {
				isDropdownOpen.value = false
				focusedOptionIndexMultiple.value = -1
				nextTick(() => {
					if (dropdownFieldMultipleRef.value) {
						dropdownFieldMultipleRef.value.focus()
					}
				})
			}
			if (isDropdownOpenSingle.value) {
				isDropdownOpenSingle.value = false
				focusedOptionIndexSingle.value = -1
				nextTick(() => {
					if (dropdownFieldSingleRef.value) {
						dropdownFieldSingleRef.value.focus()
					}
				})
			}
		}, 100)
	}
}

// Função para fechar todos os outros dropdowns
const closeAllOtherDropdowns = () => {
	// Disparar evento para fechar todos os outros dropdowns
	document.dispatchEvent(new CustomEvent('nbselect:close-all', { 
		detail: { excludeId: props.nbId } 
	}))
}

// Função para escutar evento de fechar todos os dropdowns
const handleCloseAllDropdowns = (event) => {
	// Fechar este dropdown se não for o excluído
	if (event.detail?.excludeId !== props.nbId) {
		if (isDropdownOpen.value) {
			isDropdownOpen.value = false
		}
		if (isDropdownOpenSingle.value) {
			isDropdownOpenSingle.value = false
		}
	}
}

// Funções para navegar nas opções (single select)
const navigateOptionsSingle = (direction) => {
	const allOptions = []
	if (hasEmptyOption.value) {
		allOptions.push({ value: emptyOptionValue.value, disabled: disabled.value, index: 0 })
	}
	allOptions.push(...options.value.map((opt, idx) => ({ 
		value: opt[valueKey.value], 
		disabled: opt.disabled || disabled.value,
		index: hasEmptyOption.value ? idx + 1 : idx
	})))
	
	const availableOptions = allOptions.filter(opt => !opt.disabled)
	if (availableOptions.length === 0) return
	
	let currentIndex = focusedOptionIndexSingle.value
	if (currentIndex < 0) {
		currentIndex = hasEmptyOption.value ? 0 : (options.value.length > 0 ? 0 : -1)
	}
	
	if (direction === 'down') {
		// Encontrar próximo índice disponível
		let nextIndex = (currentIndex + 1) % allOptions.length
		let attempts = 0
		while (allOptions[nextIndex].disabled && attempts < allOptions.length) {
			nextIndex = (nextIndex + 1) % allOptions.length
			attempts++
		}
		if (!allOptions[nextIndex].disabled) {
			currentIndex = nextIndex
		}
	} else if (direction === 'up') {
		// Encontrar índice anterior disponível
		let prevIndex = currentIndex <= 0 ? allOptions.length - 1 : currentIndex - 1
		let attempts = 0
		while (allOptions[prevIndex].disabled && attempts < allOptions.length) {
			prevIndex = prevIndex <= 0 ? allOptions.length - 1 : prevIndex - 1
			attempts++
		}
		if (!allOptions[prevIndex].disabled) {
			currentIndex = prevIndex
		}
	}
	
	focusedOptionIndexSingle.value = currentIndex
	// Focar o elemento
	nextTick(() => {
		const optionElement = document.querySelector(`[data-option-index-single="${currentIndex}"]`)
		if (optionElement) {
			optionElement.focus()
		}
	})
}

// Função para fechar dropdown single select
const closeDropdownSingle = () => {
	if (!disabled.value && isDropdownOpenSingle.value) {
		isDropdownOpenSingle.value = false
		focusedOptionIndexSingle.value = -1
		nextTick(() => {
			if (dropdownFieldSingleRef.value) {
				dropdownFieldSingleRef.value.focus()
			}
		})
	}
}

// Função para fechar dropdown multiple select
const closeDropdownMultiple = () => {
	if (!disabled.value && isDropdownOpen.value) {
		isDropdownOpen.value = false
		focusedOptionIndexMultiple.value = -1
		nextTick(() => {
			if (dropdownFieldMultipleRef.value) {
				dropdownFieldMultipleRef.value.focus()
			}
		})
	}
}

// Função para toggle do dropdown single select
const toggleDropdownSingle = (event) => {
	if (!disabled.value) {
		event.stopPropagation()
		const wasOpen = isDropdownOpenSingle.value
		isDropdownOpenSingle.value = !isDropdownOpenSingle.value
		
		// Se estiver abrindo, fechar todos os outros e focar primeira opção
		if (!wasOpen && isDropdownOpenSingle.value) {
			closeAllOtherDropdowns()
			// Focar primeira opção disponível
			focusedOptionIndexSingle.value = hasEmptyOption.value ? 0 : -1
			if (!hasEmptyOption.value && options.value.length > 0) {
				focusedOptionIndexSingle.value = 0
			}
			// Focar o elemento após o DOM atualizar
			nextTick(() => {
				const optionElement = document.querySelector(`[data-option-index-single="${focusedOptionIndexSingle.value}"]`)
				if (optionElement) {
					optionElement.focus()
				}
			})
		} else if (!isDropdownOpenSingle.value) {
			focusedOptionIndexSingle.value = -1
		}
	}
}

// Função para selecionar opção no single select
const selectOptionSingle = (value) => {
	if (disabled.value) return
	isClickingOption.value = true
	currentOptionOnly.value = value
	isDropdownOpenSingle.value = false
	focusedOptionIndexSingle.value = -1
	onUserChange(value)
	setTimeout(() => {
		isClickingOption.value = false
		// Retornar foco ao campo de seleção
		nextTick(() => {
			if (dropdownFieldSingleRef.value) {
				dropdownFieldSingleRef.value.focus()
			}
		})
	}, 150)
}

// Função para obter texto do item selecionado no single select
const getSelectedTextSingle = () => {
	if (!currentOptionOnly.value || currentOptionOnly.value === emptyOptionValue.value) {
		return emptyOptionText.value
	}
	const selectedOption = options.value.find(option => 
		option[valueKey.value] === currentOptionOnly.value
	)
	return selectedOption ? selectedOption[textKey.value] : emptyOptionText.value
}

// Função para obter texto dos itens selecionados
const getSelectedText = () => {
	const selectedOptions = options.value.filter(option => 
		safeCurrentOptionMultiple.value.includes(option[valueKey.value])
	)
	
	if (selectedOptions.length === 0) return emptyOptionText.value
	if (selectedOptions.length === 1) return selectedOptions[0][textKey.value]
	return `${selectedOptions.length} itens selecionados`
}

// Função para toggle de opções
const toggleOption = (value) => {
	if (disabled.value) return
	
	isClickingOption.value = true
	const currentSelection = [...safeCurrentOptionMultiple.value]
	
	if (currentSelection.includes(value)) {
		const newSelection = currentSelection.filter(item => item !== value)
		safeCurrentOptionMultiple.value = newSelection
	} else {
		safeCurrentOptionMultiple.value = [...currentSelection, value]
	}
	
	onUserChange(safeCurrentOptionMultiple.value)
	setTimeout(() => {
		isClickingOption.value = false
	}, 150)
}

const onUserChange = (value) => {
	emit('user-changed', value)
}

const interacted = () => {
	emit('clicked')
}

// Computed para atributos ARIA
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

// Handler de teclado para single select
const handleKeyDownSingle = (event) => {
	if (disabled.value) return
	
	// Se o dropdown estiver aberto, permitir navegação com setas
	if (isDropdownOpenSingle.value) {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault()
				navigateOptionsSingle('down')
				return
			case 'ArrowUp':
				event.preventDefault()
				navigateOptionsSingle('up')
				return
		}
	}
	
	switch (event.key) {
		case 'Enter':
			if (hasTabIndexEnter.value) {
				event.preventDefault()
				if (isDropdownOpenSingle.value) {
					// Se estiver aberto, fecha e retorna foco
					isDropdownOpenSingle.value = false
					focusedOptionIndexSingle.value = -1
					nextTick(() => {
						if (dropdownFieldSingleRef.value) {
							dropdownFieldSingleRef.value.focus()
						}
					})
				} else {
					// Se estiver fechado, abre
					toggleDropdownSingle(event)
				}
			}
			break
		case ' ':
			if (hasTabIndexSpace.value) {
				event.preventDefault()
				if (isDropdownOpenSingle.value) {
					// Se estiver aberto, fecha e retorna foco
					isDropdownOpenSingle.value = false
					focusedOptionIndexSingle.value = -1
					nextTick(() => {
						if (dropdownFieldSingleRef.value) {
							dropdownFieldSingleRef.value.focus()
						}
					})
				} else {
					// Se estiver fechado, abre
					toggleDropdownSingle(event)
				}
			}
			break
		case 'Escape':
			if (isDropdownOpenSingle.value) {
				event.preventDefault()
				isDropdownOpenSingle.value = false
				focusedOptionIndexSingle.value = -1
				nextTick(() => {
					if (dropdownFieldSingleRef.value) {
						dropdownFieldSingleRef.value.focus()
					}
				})
			}
			break
		case 'ArrowDown':
			event.preventDefault()
			if (!isDropdownOpenSingle.value) {
				// Se fechado, abre
				toggleDropdownSingle(event)
			}
			break
		case 'ArrowUp':
			event.preventDefault()
			if (isDropdownOpenSingle.value) {
				// Se aberto, fecha e retorna foco
				isDropdownOpenSingle.value = false
				focusedOptionIndexSingle.value = -1
				nextTick(() => {
					if (dropdownFieldSingleRef.value) {
						dropdownFieldSingleRef.value.focus()
					}
				})
			}
			break
	}
}

// Handler de teclado para multiple select
const handleKeyDownMultiple = (event) => {
	if (disabled.value) return
	
	// Se o dropdown estiver aberto, permitir navegação com setas
	if (isDropdownOpen.value) {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault()
				navigateOptionsMultiple('down')
				return
			case 'ArrowUp':
				event.preventDefault()
				navigateOptionsMultiple('up')
				return
		}
	}
	
	switch (event.key) {
		case 'Enter':
			if (hasTabIndexEnter.value) {
				event.preventDefault()
				if (isDropdownOpen.value) {
					// Se estiver aberto, fecha e retorna foco
					isDropdownOpen.value = false
					focusedOptionIndexMultiple.value = -1
					nextTick(() => {
						if (dropdownFieldMultipleRef.value) {
							dropdownFieldMultipleRef.value.focus()
						}
					})
				} else {
					// Se estiver fechado, abre
					toggleDropdown(event)
				}
			}
			break
		case ' ':
			if (hasTabIndexSpace.value) {
				event.preventDefault()
				if (isDropdownOpen.value) {
					// Se estiver aberto, fecha e retorna foco
					isDropdownOpen.value = false
					focusedOptionIndexMultiple.value = -1
					nextTick(() => {
						if (dropdownFieldMultipleRef.value) {
							dropdownFieldMultipleRef.value.focus()
						}
					})
				} else {
					// Se estiver fechado, abre
					toggleDropdown(event)
				}
			}
			break
		case 'Escape':
			if (isDropdownOpen.value) {
				event.preventDefault()
				isDropdownOpen.value = false
				focusedOptionIndexMultiple.value = -1
				nextTick(() => {
					if (dropdownFieldMultipleRef.value) {
						dropdownFieldMultipleRef.value.focus()
					}
				})
			}
			break
		case 'ArrowDown':
			event.preventDefault()
			if (!isDropdownOpen.value) {
				// Se fechado, abre
				toggleDropdown(event)
			}
			break
		case 'ArrowUp':
			event.preventDefault()
			if (isDropdownOpen.value) {
				// Se aberto, fecha e retorna foco
				isDropdownOpen.value = false
				focusedOptionIndexMultiple.value = -1
				nextTick(() => {
					if (dropdownFieldMultipleRef.value) {
						dropdownFieldMultipleRef.value.focus()
					}
				})
			}
			break
	}
}

watch(currentOptionOnly, (newValue, oldValue) => {
	if (!initialized.value) return
	if (newValue !== oldValue) emit('changed', newValue)
})

watch(selectedOptionOnly, (newValue, oldValue) => {
	if (newValue !== oldValue) currentOptionOnly.value = newValue
})

watch(currentOptionMultiple, (newValue, oldValue) => {
	if (!initialized.value) return
	if (newValue !== oldValue) emit('changed', newValue)
})

watch(selectedOptionMultiple, (newValue, oldValue) => {
	if (newValue !== oldValue) currentOptionMultiple.value = newValue || []
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

	.component__label {
		display: block;
		margin-bottom: v-bind('labelMarginBottomStyle');
		margin-left: v-bind('labelMarginLeftStyle');
		font-family: v-bind('labelFontFamilyStyle');
		font-size: v-bind('labelFontSizeStyle');
		font-weight: v-bind('labelFontWeightStyle');

		.component__label--required {
			color: red;
		}
	}

	.component__select {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		box-sizing: border-box;
		padding: 8px 12px;
		height: 32.39px;
    max-height: 32.39px;
		font-size: inherit;
		font-family: inherit;
		outline: none;
		
		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}

	// inicio propTheme
	&.component__theme--light {
		color: v-bind('lightTextColor');

		.component__select {
			color: v-bind('lightTextColor');

			option {
				color: v-bind('lightOptionTextColor');
				background-color: v-bind('lightBgColor');

				&:checked,
				&[selected] {
					background-color: v-bind('lightOptionBgColorSelected') !important;
					color: v-bind('lightOptionTextColorSelected') !important;
				}

				&:disabled {
					color: v-bind('lightPlaceholderColor');
				}
			}
		}

		.component__dropdown {
			.component__dropdown-field {
				color: v-bind('lightTextColor');

				.component__dropdown-placeholder {
					color: v-bind('lightPlaceholderColor');
				}

				.component__dropdown-selected {
					color: v-bind('lightTextColor');
				}
			}

			.component__checkbox-group {
				.component__checkbox-option {
					color: v-bind('lightOptionTextColor');

					&:hover {
						background-color: v-bind('lightBgColorFocus');
					}

					&.selected {
						background-color: v-bind('lightOptionBgColorSelected') !important;
						color: v-bind('lightOptionTextColorSelected') !important;
						font-weight: 500;

						&:hover {
							background-color: v-bind('lightOptionBgColorSelected') !important;
							color: v-bind('lightOptionTextColorSelected') !important;
						}
					}

					&.disabled {
						opacity: 0.3;
						cursor: not-allowed;
						color: v-bind('lightPlaceholderColor');

						&:hover {
							background-color: transparent;
						}
					}
				}
			}

			.component__option-group {
				background-color: v-bind('lightBgColor');
				border: 1px solid v-bind('lightBorderColor');
				border-radius: 4px;
				max-height: 200px;
				overflow-y: auto;
				position: absolute;
				top: 100%;
				left: 0;
				right: 0;
				z-index: 1000;
				margin-top: 4px;

				.component__option-item {
					padding: 8px 12px;
					cursor: pointer;
					color: v-bind('lightOptionTextColor');
					transition: background-color 0.2s;

					&:hover {
						background-color: v-bind('lightBgColorFocus');
					}

					&.selected {
						background-color: v-bind('lightOptionBgColorSelected') !important;
						color: v-bind('lightOptionTextColorSelected') !important;
						font-weight: 500;

						&:hover {
							background-color: v-bind('lightOptionBgColorSelected') !important;
							color: v-bind('lightOptionTextColorSelected') !important;
						}
					}

					&.disabled {
						opacity: 0.3;
						cursor: not-allowed;
						color: v-bind('lightPlaceholderColor');

						&:hover {
							background-color: transparent;
						}
					}
				}
			}
		}
	}

	&.component__theme--dark {
		color: v-bind('darkTextColor');

		.component__select {
			color: v-bind('darkTextColor');

			option {
				color: v-bind('darkOptionTextColor');
				background-color: v-bind('darkBgColor');

				&:checked,
				&[selected] {
					background-color: v-bind('darkOptionBgColorSelected') !important;
					color: v-bind('darkOptionTextColorSelected') !important;
				}

				&:disabled {
					color: v-bind('darkPlaceholderColor');
				}
			}
		}

		.component__dropdown {
			.component__dropdown-field {
				color: v-bind('darkTextColor');

				.component__dropdown-placeholder {
					color: v-bind('darkPlaceholderColor');
				}

				.component__dropdown-selected {
					color: v-bind('darkTextColor');
				}
			}

			.component__checkbox-group {
				.component__checkbox-option {
					color: v-bind('darkOptionTextColor');

					&:hover {
						background-color: v-bind('darkBgColorFocus');
					}

					&.selected {
						background-color: v-bind('darkOptionBgColorSelected') !important;
						color: v-bind('darkOptionTextColorSelected') !important;
						font-weight: 500;

						&:hover {
							background-color: v-bind('darkOptionBgColorSelected') !important;
							color: v-bind('darkOptionTextColorSelected') !important;
						}
					}

					&.disabled {
						opacity: 0.3;
						cursor: not-allowed;
						color: v-bind('darkPlaceholderColor');

						&:hover {
							background-color: transparent;
						}
					}
				}
			}

			.component__option-group {
				background-color: v-bind('darkBgColor');
				border: 1px solid v-bind('darkBorderColor');
				border-radius: 4px;
				max-height: 200px;
				overflow-y: auto;
				position: absolute;
				top: 100%;
				left: 0;
				right: 0;
				z-index: 1000;
				margin-top: 4px;

				.component__option-item {
					padding: 8px 12px;
					cursor: pointer;
					color: v-bind('darkOptionTextColor');
					transition: background-color 0.2s;

					&:hover {
						background-color: v-bind('darkBgColorFocus');
					}

					&.selected {
						background-color: v-bind('darkOptionBgColorSelected') !important;
						color: v-bind('darkOptionTextColorSelected') !important;
						font-weight: 500;

						&:hover {
							background-color: v-bind('darkOptionBgColorSelected') !important;
							color: v-bind('darkOptionTextColorSelected') !important;
						}
					}

					&.disabled {
						opacity: 0.3;
						cursor: not-allowed;
						color: v-bind('darkPlaceholderColor');

						&:hover {
							background-color: transparent;
						}
					}
				}
			}
		}
	}
	// fim propTheme

	// inicio inputStyle
	&.component__input--background {
		.component__select {
			background-color: v-bind('lightBgColor');
			border: 0;

			&:focus {
				background-color: v-bind('lightBgColorFocus');
			}
		}

		.component__dropdown {
			.component__dropdown-field {
				background-color: v-bind('lightBgColor');
				border: 0;

				&:hover {
					background-color: v-bind('lightBgColorFocus');
				}
			}

			.component__checkbox-group {
				background-color: v-bind('lightBgColor');
				border-color: v-bind('lightBorderColor');
			}

			.component__option-group {
				background-color: v-bind('lightBgColor');
				border-color: v-bind('lightBorderColor');
			}
		}

		&.component__theme--dark {
			.component__select {
				background-color: v-bind('darkBgColor');

				&:focus {
					background-color: v-bind('darkBgColorFocus');
				}
			}

			.component__dropdown {
				.component__dropdown-field {
					background-color: v-bind('darkBgColor');

					&:hover {
						background-color: v-bind('darkBgColorFocus');
					}
				}

				.component__checkbox-group {
					background-color: v-bind('darkBgColor');
					border-color: v-bind('darkBorderColor');
				}

				.component__option-group {
					background-color: v-bind('darkBgColor');
					border-color: v-bind('darkBorderColor');
				}
			}
		}
	}

	&.component__input--line {
		.component__select {
			background-color: transparent;
			border: 0;
			border-bottom: 1px solid v-bind('lightBorderColor');

			&:focus {
				border-bottom: 1px solid v-bind('lightBorderColorFocus');
			}
		}

		.component__dropdown {
			.component__dropdown-field {
				background-color: transparent;
				border: 0;
				border-bottom: 1px solid v-bind('lightBorderColor');

				&:hover {
					border-bottom: 1px solid v-bind('lightBorderColorFocus');
				}
			}

			.component__checkbox-group {
				background-color: v-bind('lightBgColor');
				border-color: v-bind('lightBorderColor');

				.component__checkbox-option {
					&.selected {
						background-color: v-bind('lightOptionBgColorSelected') !important;
						color: v-bind('lightOptionTextColorSelected') !important;

						&:hover {
							background-color: v-bind('lightOptionBgColorSelected') !important;
							color: v-bind('lightOptionTextColorSelected') !important;
						}
					}
				}
			}

			.component__option-group {
				background-color: v-bind('lightBgColor');
				border-color: v-bind('lightBorderColor');
			}
		}

		&.component__theme--dark {
			.component__select {
				border-bottom: 1px solid v-bind('darkBorderColor');

				&:focus {
					border-bottom: 1px solid v-bind('darkBorderColorFocus');
				}
			}

			.component__dropdown {
				.component__dropdown-field {
					border-bottom: 1px solid v-bind('darkBorderColor');

					&:hover {
						border-bottom: 1px solid v-bind('darkBorderColorFocus');
					}
				}

				.component__checkbox-group {
					background-color: v-bind('darkBgColor');
					border-color: v-bind('darkBorderColor');

					.component__checkbox-option {
						&.selected {
							background-color: v-bind('darkOptionBgColorSelected') !important;
							color: v-bind('darkOptionTextColorSelected') !important;

							&:hover {
								background-color: v-bind('darkOptionBgColorSelected') !important;
								color: v-bind('darkOptionTextColorSelected') !important;
							}
						}
					}
				}

				.component__option-group {
					background-color: v-bind('darkBgColor');
					border-color: v-bind('darkBorderColor');
				}
			}
		}
	}

	&.component__input--border {
		.component__select {
			background-color: transparent;
			border: 1px solid v-bind('lightBorderColor');

			&:focus {
				border: 1px solid v-bind('lightBorderColorFocus');
			}
		}

		.component__dropdown {
			.component__dropdown-field {
				background-color: transparent;
				border: 1px solid v-bind('lightBorderColor');

				&:hover {
					border: 1px solid v-bind('lightBorderColorFocus');
				}
			}

			.component__checkbox-group {
				background-color: v-bind('lightBgColor');
				border-color: v-bind('lightBorderColor');

				.component__checkbox-option {
					&.selected {
						background-color: v-bind('lightOptionBgColorSelected') !important;
						color: v-bind('lightOptionTextColorSelected') !important;

						&:hover {
							background-color: v-bind('lightOptionBgColorSelected') !important;
							color: v-bind('lightOptionTextColorSelected') !important;
						}
					}
				}
			}

			.component__option-group {
				background-color: v-bind('lightBgColor');
				border-color: v-bind('lightBorderColor');
			}
		}

		&.component__theme--dark {
			.component__select {
				border: 1px solid v-bind('darkBorderColor');

				&:focus {
					border: 1px solid v-bind('darkBorderColorFocus');
				}
			}

			.component__dropdown {
				.component__dropdown-field {
					border: 1px solid v-bind('darkBorderColor');

					&:hover {
						border: 1px solid v-bind('darkBorderColorFocus');
					}
				}

				.component__checkbox-group {
					background-color: v-bind('darkBgColor');
					border-color: v-bind('darkBorderColor');

					.component__checkbox-option {
						&.selected {
							background-color: v-bind('darkOptionBgColorSelected') !important;
							color: v-bind('darkOptionTextColorSelected') !important;

							&:hover {
								background-color: v-bind('darkOptionBgColorSelected') !important;
								color: v-bind('darkOptionTextColorSelected') !important;
							}
						}
					}
				}

				.component__option-group {
					background-color: v-bind('darkBgColor');
					border-color: v-bind('darkBorderColor');
				}
			}
		}
	}
	// fim inputStyle

	.component__dropdown {
		position: relative;
		width: 100%;
		box-sizing: border-box;
		
		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

	.component__dropdown-field {
		padding: 8px 12px;
	cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 32.39px;
		max-height: 32.39px;
		width: 100%;
		box-sizing: border-box;
		outline: none;

		&:focus {
			outline: 2px solid rgba(25, 118, 210, 0.5);
			outline-offset: 2px;
		}

			.component__dropdown-placeholder {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				flex: 1;
			}

			.component__dropdown-selected {
				flex: 1;
	white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.component__dropdown-arrow {
				margin-left: 8px;
				transition: transform 0.2s;
				font-size: 12px;
				color: #666;

				&.open {
					transform: rotate(180deg);
				}
			}
		}

		.component__checkbox-group {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			z-index: 1000;
			border: 1px solid v-bind('lightBorderColor');
			border-top: none;
			border-radius: 0 0 4px 4px;
			background-color: v-bind('lightBgColor');
			max-height: 200px;
			overflow-y: auto;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

			.component__checkbox-option {
				display: block;
				padding: 8px 12px;
				cursor: pointer;
				transition: background-color 0.2s;

				input[type="checkbox"] {
					display: none;
				}

				.component__checkbox-label {
					cursor: pointer;
					user-select: none;
					display: block;
					width: 100%;
				}
			}
		}
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
			.component__select {
				background-color: v-bind('lightDisabledBgColor') !important;
			}

			.component__dropdown {
				.component__dropdown-field {
					background-color: v-bind('lightDisabledBgColor') !important;
					border-color: v-bind('lightDisabledBorderColor') !important;
				}
			}
		}

		&.component__theme--dark {
			.component__select {
				background-color: v-bind('darkDisabledBgColor') !important;
			}

			.component__dropdown {
				.component__dropdown-field {
					background-color: v-bind('darkDisabledBgColor') !important;
					border-color: v-bind('darkDisabledBorderColor') !important;
				}
			}
		}
	}
}
</style>
