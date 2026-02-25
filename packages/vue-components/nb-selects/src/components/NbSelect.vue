<template>
  <div
    v-if="nbId"
    ref="wrapperRef"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle, selectWidthStyle]"
    :title="title"
    @focusin="handleFocusIn"
    @focusout="handleWrapperFocusOut"
    @mousedown.capture="onWrapperMouseDown"
  >
    <div
      :id="nbId"
      :ref="nbId"
      :class="['nb-reset', 'component', themeStyle, inputStyleClass]"
      :style="[selectWidthStyle, borderRadiusStyle]"
      v-bind="computedAriaAttrs"
    >
      <label
        v-if="showLabel"
        :for="selectName"
        class="component__label"
        :style="[styleLabel]"
      >
        {{ label }}<span v-if="required" class="component__label--required">*</span>
      </label>

      <!-- Select simples (não múltiplo) com dropdown customizado -->
      <div
        v-if="!multiple"
        class="component__dropdown"
        :class="{ 'open': isDropdownOpenSingle, 'disabled': disabled }"
        :style="[componentStyle]"
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
          <!-- Input de filtro -->
          <div v-if="hasFilter" class="component__filter-wrap" @click.stop>
            <input
              ref="filterInputRef"
              v-model="filterText"
              type="text"
              class="component__filter-input"
              :placeholder="filterPlaceholder"
              :disabled="disabled"
              @keydown.stop
            />
          </div>
          <!-- Opção vazia (placeholder) - escondida quando o filtro está preenchido -->
          <div
            v-if="showEmptyOptionInList"
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
          <!-- Com agrupamento (hasGroups + groupKey) -->
          <template v-if="useGroupedDisplay">
            <div
              v-for="group in groupedFilteredOptions"
              :key="group.label"
              class="component__option-group-block"
              :class="{ 'is-collapsed': groupCollapsible && isGroupCollapsed(group.label) }"
            >
              <div
                class="component__option-group-label"
                @click.stop.prevent="onGroupHeaderClick(group.label)"
              >
                {{ group.label }}
              </div>
              <div
                v-if="!groupCollapsible || !isGroupCollapsed(group.label)"
                v-for="{ option, flatIndex } in group.options"
                :key="option[valueKey]"
                :data-option-index-single="showEmptyOptionInList ? flatIndex + 1 : flatIndex"
                class="component__option-item"
                :class="{ 
                  'disabled': option.disabled || disabled,
                  'selected': currentOptionOnly === option[valueKey]
                }"
                :tabindex="(option.disabled || disabled) ? -1 : (focusedOptionIndexSingle === (showEmptyOptionInList ? flatIndex + 1 : flatIndex) ? 0 : -1)"
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
                    :prop-index="flatIndex"
                  >
                    {{ option[textKey] }}
                  </slot>
                </span>
              </div>
            </div>
          </template>
          <!-- Sem agrupamento -->
          <div
            v-else
            v-for="(option, optionIndex) in filteredOptions"
            :key="option[valueKey]"
            :data-option-index-single="showEmptyOptionInList ? optionIndex + 1 : optionIndex"
            class="component__option-item"
            :class="{ 
              'disabled': option.disabled || disabled,
              'selected': currentOptionOnly === option[valueKey]
            }"
            :tabindex="(option.disabled || disabled) ? -1 : (focusedOptionIndexSingle === (showEmptyOptionInList ? optionIndex + 1 : optionIndex) ? 0 : -1)"
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
          <div v-if="filteredOptions.length === 0" class="component__option-empty">
            {{ emptyFilterText }}
          </div>
        </div>
      </div>

      <!-- Select múltiplo com dropdown de checkboxes -->
      <div
        v-else
        class="component__dropdown"
        :class="{ 'open': isDropdownOpen, 'disabled': disabled }"
        :style="[componentStyle]"
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
          <!-- Input de filtro -->
          <div v-if="hasFilter" class="component__filter-wrap" @click.stop>
            <input
              ref="filterInputRef"
              v-model="filterText"
              type="text"
              class="component__filter-input"
              :placeholder="filterPlaceholder"
              :disabled="disabled"
              @keydown.stop
            />
          </div>
          <!-- Opção vazia (limpar seleção) - escondida quando o filtro está preenchido -->
          <label
            v-if="showEmptyOptionInList"
            data-option-index-multiple="0"
            class="component__checkbox-option"
            :class="{ 'disabled': disabled, 'selected': safeCurrentOptionMultiple.length === 0 }"
            :tabindex="disabled ? -1 : (focusedOptionIndexMultiple === 0 ? 0 : -1)"
            role="option"
            :aria-selected="safeCurrentOptionMultiple.length === 0"
            @click.prevent="!disabled && clearSelectionMultiple()"
            @keydown.enter.prevent="!disabled && hasTabIndexEnter && clearSelectionMultiple()"
            @keydown.space.prevent="!disabled && hasTabIndexSpace && clearSelectionMultiple()"
            @keydown.arrow-down.prevent="!disabled && navigateOptionsMultiple('down')"
            @keydown.arrow-up.prevent="!disabled && navigateOptionsMultiple('up')"
            @keydown.escape.prevent="!disabled && closeDropdownMultiple()"
          >
            <input type="checkbox" :checked="safeCurrentOptionMultiple.length === 0" :disabled="disabled" @click.stop />
            <span class="component__checkbox-label">{{ emptyOptionText }}</span>
          </label>
          <!-- Com agrupamento (hasGroups + groupKey) -->
          <template v-if="useGroupedDisplay">
            <div
              v-for="group in groupedFilteredOptions"
              :key="group.label"
              class="component__option-group-block"
              :class="{ 'is-collapsed': groupCollapsible && isGroupCollapsed(group.label) }"
            >
              <div
                class="component__option-group-label"
                @click.stop.prevent="onGroupHeaderClick(group.label)"
              >
                {{ group.label }}
              </div>
              <label
                v-if="!groupCollapsible || !isGroupCollapsed(group.label)"
                v-for="{ option, flatIndex } in group.options"
                :key="option[valueKey]"
                :data-option-index-multiple="showEmptyOptionInList ? flatIndex + 1 : flatIndex"
                class="component__checkbox-option"
                :class="{ 
                  'disabled': option.disabled || disabled,
                  'selected': safeCurrentOptionMultiple.includes(option[valueKey])
                }"
                :tabindex="(option.disabled || disabled) ? -1 : (focusedOptionIndexMultiple === (showEmptyOptionInList ? flatIndex + 1 : flatIndex) ? 0 : -1)"
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
                    :prop-index="showEmptyOptionInList ? flatIndex + 1 : flatIndex"
                  >
                    {{ option[textKey] }}
                  </slot>
                </span>
              </label>
            </div>
          </template>
          <!-- Sem agrupamento -->
          <label
            v-else
            v-for="(option, optionIndex) in filteredOptions"
            :key="option[valueKey]"
            :data-option-index-multiple="showEmptyOptionInList ? optionIndex + 1 : optionIndex"
            class="component__checkbox-option"
            :class="{ 
              'disabled': option.disabled || disabled,
              'selected': safeCurrentOptionMultiple.includes(option[valueKey])
            }"
            :tabindex="(option.disabled || disabled) ? -1 : (focusedOptionIndexMultiple === (showEmptyOptionInList ? optionIndex + 1 : optionIndex) ? 0 : -1)"
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
          <div v-if="filteredOptions.length === 0" class="component__option-empty">
            {{ emptyFilterText }}
          </div>
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

const emit = defineEmits(['clicked', 'clicked-complete', 'changed', 'changed-complete', 'user-changed', 'user-changed-complete', 'focused', 'blurred'])

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
	groupKey: {
		type: String,
		default: ''
	},
	hasGroups: {
		type: Boolean,
		default: false,
		validator: value => typeof value === 'boolean' && [true, false].includes(value)
	},
	groupCollapsible: {
		type: Boolean,
		default: false,
		validator: value => typeof value === 'boolean' && [true, false].includes(value)
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
		default: 'Select an option'
	},
	emptyOptionValue: {
		type: [String, Number],
		default: null
	},
	dropdownScrollClass: {
		type: String,
		default: ''
	},
	hasFilter: {
		type: Boolean,
		default: false,
		validator: value => typeof value === 'boolean' && [true, false].includes(value)
	},
	filterPlaceholder: {
		type: String,
		default: 'Filter...'
	},
	emptyFilterText: {
		type: String,
		default: 'not found'
	},
	multipleSelectedText: {
		type: String,
		default: 'items selected'
	},
  filterPadding: {
    type: String,
    default: '8px',
  },
  filterMarginBottom: {
    type: Number,
    default: 0,
  },
  filterBorderRadius: {
    type: Number,
    default: 0,
  },
	showLabel: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	label: {
		type: String,
		default: 'Label text'
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
	fontSizeLabelActive: {
		type: String,
		default: '0.8em',
		validator: value => {
			return !value ? '0.8em' : value
		}
	},
	labelBackground: {
		type: String,
		default: 'transparent',
	},
	labelPadding: {
		type: String,
		default: '1px 5px',
	},
	labelBorderRadius: {
		type: Number,
		default: 0
	},
	labelLeft: {
		type: Number,
		default: 5,
	},
	labelActiveTop: {
		type: Number,
		default: -13,
	},
	labelActiveLeft: {
		type: Number,
		default: 5,
	},
	labelRight: {
		type: Number,
		default: 0,
	},
	labelActiveRight: {
		type: Number,
		default: 0,
	},
	inputLabelMarginActive: {
		type: Number,
		default: 15,
	},
	labelBreakOnActive: {
		type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		},
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
	lightFilterTextColor: {
		type: String,
		default: '#000000'
	},
	lightEmptyTextColor: {
		type: String,
		default: '#999999'
	},
	lightGroupTextColor: {
		type: String,
		default: '#000000'
	},
	lightGroupBgColor: {
		type: String,
		default: '#bababa'
	},
	lightFilterWrapBorderColor: {
		type: String,
		default: '#353734'
	},
	lightFilterInputBorderColor: {
		type: String,
		default: '#353734'
	},
	lightTextColorLabel: {
		type: String,
		default: '#333333'
	},
	lightTextColorLabelActive: {
		type: String,
		default: '#333333'
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
	darkFilterTextColor: {
		type: String,
		default: '#ffffff'
	},
	darkEmptyTextColor: {
		type: String,
		default: '#999999'
	},
	darkGroupTextColor: {
		type: String,
		default: '#ffffff'
	},
	darkGroupBgColor: {
		type: String,
		default: '#242323'
	},
	darkFilterWrapBorderColor: {
		type: String,
		default: '#44475a'
	},
	darkFilterInputBorderColor: {
		type: String,
		default: '#44475a'
	},
	darkTextColorLabel: {
		type: String,
		default: '#ffffff'
	},
	darkTextColorLabelActive: {
		type: String,
		default: '#ffffff'
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
	},
	title: {
		type: String,
		default: ''
	},
  maxHeight: {
    type: Number,
    default: 200
  },
  optionsPadding: {
    type: String,
    default: '8px 12px'
  },
  groupPadding: {
    type: String,
    default: '6px 8px'
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
	groupKey,
	hasGroups,
	groupCollapsible,
	multiple,
	hasEmptyOption,
	emptyOptionValue,
	dropdownScrollClass,
	showLabel,
	label,
	labelMarginBottom,
	labelMarginLeft,
	fontFamilyLabel,
	fontSizeLabel,
	fontSizeLabelActive,
	fontWeightLabel,
	labelBackground,
	labelPadding,
	labelBorderRadius,
	labelLeft,
	labelActiveTop,
	labelActiveLeft,
	labelRight,
	labelActiveRight,
	inputLabelMarginActive,
	labelBreakOnActive,
	lightTextColorLabel,
	lightTextColorLabelActive,
	darkTextColorLabel,
	darkTextColorLabelActive,
	emptyOptionText,
	hasFilter,
	filterPlaceholder,
	emptyFilterText,
	multipleSelectedText,
	filterPadding,
	filterMarginBottom,
	filterBorderRadius,
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
	lightFilterTextColor,
	lightEmptyTextColor,
	lightFilterWrapBorderColor,
	lightFilterInputBorderColor,
	lightGroupTextColor,
	lightGroupBgColor,
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
	darkFilterTextColor,
	darkEmptyTextColor,
	darkFilterWrapBorderColor,
	darkFilterInputBorderColor,
	darkGroupTextColor,
	darkGroupBgColor,
	tabIndex,
	hasTabIndexEnter,
	hasTabIndexSpace,
	ariaLabel,
	ariaAttrs,
  maxHeight,
  optionsPadding,
  groupPadding
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
const filterText = ref('')
const filterInputRef = ref(null)
const isActive = ref(false)
const isReturningFocus = ref(false)
const rightClickInProgress = ref(false)

// Computed para garantir que o v-model sempre seja um array para selects múltiplos
const safeCurrentOptionMultiple = computed({
	get: () => Array.isArray(currentOptionMultiple.value) ? currentOptionMultiple.value : [],
	set: (newValue) => {
		currentOptionMultiple.value = Array.isArray(newValue) ? newValue : []
	}
})

// Lista de opções filtrada pelo texto do input (quando hasFilter está ativo)
const filteredOptions = computed(() => {
	if (!hasFilter.value || !filterText.value || typeof filterText.value !== 'string') {
		return options.value
	}
	const term = filterText.value.trim().toLowerCase()
	if (!term) return options.value
	const key = textKey.value
	return options.value.filter(opt => {
		const text = opt[key]
		return text != null && String(text).toLowerCase().includes(term)
	})
})

// Exibir opção vazia apenas quando não há filtro ativo com texto (no filtro esconde a opção vazia)
const showEmptyOptionInList = computed(() => {
	return hasEmptyOption.value && !(hasFilter.value && filterText.value && String(filterText.value).trim())
})

// Lista agrupada para exibição (quando hasGroups e groupKey estão ativos); mantém flatIndex para navegação
const groupedFilteredOptions = computed(() => {
	if (!hasGroups.value || !groupKey.value) return []
	const key = groupKey.value
	const map = new Map()
	const groups = []
	filteredOptions.value.forEach((opt, idx) => {
		const label = opt[key] != null ? String(opt[key]) : ''
		let group = map.get(label)
		if (!group) {
			group = { label, options: [] }
			map.set(label, group)
			groups.push(group)
		}
		group.options.push({ option: opt, flatIndex: idx })
	})
	return groups
})

const useGroupedDisplay = computed(() => hasGroups.value && !!groupKey.value && groupedFilteredOptions.value.length > 0)

// Estado e helpers para colapsar grupos ao clicar no cabeçalho
const collapsedGroupLabels = ref([])

const isGroupCollapsed = (label) => {
	return collapsedGroupLabels.value.includes(label)
}

const toggleGroupCollapse = (label) => {
	if (!hasGroups.value) return
	const current = [...collapsedGroupLabels.value]
	const idx = current.indexOf(label)
	if (idx !== -1) {
		current.splice(idx, 1)
	} else {
		current.push(label)
	}
	collapsedGroupLabels.value = current
}

const onGroupHeaderClick = (label) => {
	if (!groupCollapsible.value) return
	// Tratar clique no header de grupo como “clique interno” para não fechar o dropdown
	isClickingOption.value = true
	toggleGroupCollapse(label)
	setTimeout(() => {
		isClickingOption.value = false
	}, 150)
}

// Ao fechar o dropdown, expandir todos os grupos novamente
const resetCollapsedGroups = () => {
	collapsedGroupLabels.value = []
}

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 100 : fontWeight.value
	const selectWidthValue = ((selectWidth.value !== 0 && !selectWidth.value) || selectWidth.value < 0) ? 200 : selectWidth.value
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const hasBorderRadiusValue = !hasBorderRadius.value ? false : hasBorderRadius.value
	const textAlignValue = !textAlign.value || !['center', 'left', 'right'].includes(textAlign.value) ? 'left' : textAlign.value
	const inputStyleValue = !inputStyle.value || !['background', 'line', 'border'].includes(inputStyle.value) ? 'background' : inputStyle.value
	const fontFamilyLabelValue = !fontFamilyLabel.value ? `'Lato', sans-serif` : fontFamilyLabel.value
	const fontSizeLabelValue = !fontSizeLabel.value ? '1em' : fontSizeLabel.value
	const fontSizeLabelActiveValue = !fontSizeLabelActive.value ? '0.8em' : fontSizeLabelActive.value
	const fontWeightLabelValue = !fontWeightLabel.value ? 400 : fontWeightLabel.value
	const labelBackgroundValue = !labelBackground.value ? 'transparent' : labelBackground.value
	const labelPaddingValue = !labelPadding.value ? '1px 5px' : labelPadding.value
	const labelBorderRadiusValue = ((labelBorderRadius.value !== 0 && !labelBorderRadius.value) || labelBorderRadius.value < 0) ? 0 : labelBorderRadius.value
	const labelLeftValue = ((labelLeft.value !== 0 && !labelLeft.value) || labelLeft.value < 0) ? 5 : labelLeft.value
	const labelActiveTopValue = (labelActiveTop.value === null || labelActiveTop.value === undefined) ? -13 : labelActiveTop.value
	const labelActiveLeftValue = (labelActiveLeft.value === null || labelActiveLeft.value === undefined) ? 5 : labelActiveLeft.value
	const labelRightValue = (labelRight.value === null || labelRight.value === undefined) ? 0 : labelRight.value
	const labelActiveRightValue = (labelActiveRight.value === null || labelActiveRight.value === undefined) ? 0 : labelActiveRight.value
	const inputLabelMarginActiveValue = ((inputLabelMarginActive.value !== 0 && !inputLabelMarginActive.value) || inputLabelMarginActive.value < 0) ? 15 : inputLabelMarginActive.value
	const lightTextColorLabelValue = !lightTextColorLabel.value ? '#333333' : lightTextColorLabel.value
	const lightTextColorLabelActiveValue = !lightTextColorLabelActive.value ? '#333333' : lightTextColorLabelActive.value
	const darkTextColorLabelValue = !darkTextColorLabel.value ? '#ffffff' : darkTextColorLabel.value
	const darkTextColorLabelActiveValue = !darkTextColorLabelActive.value ? '#ffffff' : darkTextColorLabelActive.value
  const maxHeightValue = ((maxHeight.value !== 0 && !maxHeight.value) || (!hasEmptyOption.value && maxHeight.value < 37.58 || (hasEmptyOption.value && maxHeight.value < 75.16))) ? 200 : maxHeight.value
  const filterPaddingValue = !filterPadding.value ? '8px' : filterPadding.value
  const filterMarginBottomValue = ((filterMarginBottom.value !== 0 && !filterMarginBottom.value) || filterMarginBottom.value < 0) ? 8 : filterMarginBottom.value
  const filterBorderRadiusValue = ((filterBorderRadius.value !== 0 && !filterBorderRadius.value) || filterBorderRadius.value < 0) ? 0 : filterBorderRadius.value
  const optionsPaddingValue = !optionsPadding.value ? '8px 12px' : optionsPadding.value
  const groupPaddingValue = !groupPadding.value ? '6px 8px' : groupPadding.value

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
		inputStyle: inputStyleValue,
		fontFamilyLabel: fontFamilyLabelValue,
		fontSizeLabel: fontSizeLabelValue,
		fontSizeLabelActive: fontSizeLabelActiveValue,
		fontWeightLabel: fontWeightLabelValue,
		labelBackground: labelBackgroundValue,
		labelPadding: labelPaddingValue,
		labelBorderRadius: labelBorderRadiusValue,
		labelLeft: labelLeftValue,
		labelActiveTop: labelActiveTopValue,
		labelActiveLeft: labelActiveLeftValue,
		labelRight: labelRightValue,
		labelActiveRight: labelActiveRightValue,
		inputLabelMarginActive: inputLabelMarginActiveValue,
		lightTextColorLabel: lightTextColorLabelValue,
		lightTextColorLabelActive: lightTextColorLabelActiveValue,
		darkTextColorLabel: darkTextColorLabelValue,
		darkTextColorLabelActive: darkTextColorLabelActiveValue,
		theme: theme.value || 'light',
		maxHeight: maxHeightValue,
		filterPadding: filterPaddingValue,
		filterBorderRadius: filterBorderRadiusValue,
		filterMarginBottom: filterMarginBottomValue,
		optionsPadding: optionsPaddingValue,
		groupPadding: groupPaddingValue
	}
})

const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.disabled
})

const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	const isActive = isLabelActive.value

	return {
		display: defaultValues.display,
		// Adiciona padding-top quando o label está ativo para evitar que seja cortado
    // paddingTop: isActive && showLabel.value ? `${Math.abs(defaultValues.labelActiveTop)}px` : '0',
    paddingTop: '0px',
		// Esconde o label quando não está ativo usando overflow hidden
		// Se não tem label ou está ativo, permite overflow visible para não cortar conteúdo
		overflow: (!showLabel.value || isActive) ? 'visible' : 'hidden'
	}
})

const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	const isActive = isLabelActive.value

	return {
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight,
		textAlign: defaultValues.textAlign,
		marginTop: isActive && showLabel.value ? `${defaultValues.inputLabelMarginActive}px` : '0',
	}
})

const font = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.font
})

const styleTextColor = computed(() => {
	return theme.value === 'dark' ? darkTextColor.value : lightTextColor.value
})

// Cores do input e do empty (placeholder) — permitem override; fallback nas cores gerais
const lightFilterTextColorValue = computed(() => lightFilterTextColor.value || lightTextColor.value)
const lightEmptyTextColorValue = computed(() => lightEmptyTextColor.value || lightPlaceholderColor.value)
const darkFilterTextColorValue = computed(() => darkFilterTextColor.value || darkTextColor.value)
const darkEmptyTextColorValue = computed(() => darkEmptyTextColor.value || darkPlaceholderColor.value)

// Cores do grupo (label do grupo)
const lightGroupTextColorValue = computed(() => lightGroupTextColor.value || lightPlaceholderColor.value)
const lightGroupBgColorValue = computed(() => lightGroupBgColor.value || 'transparent')
const darkGroupTextColorValue = computed(() => darkGroupTextColor.value || darkPlaceholderColor.value)
const darkGroupBgColorValue = computed(() => darkGroupBgColor.value || 'transparent')

const lightFilterWrapBorderColorValue = computed(() => lightFilterWrapBorderColor.value || lightBorderColor.value)
const lightFilterInputBorderColorValue = computed(() => lightFilterInputBorderColor.value || lightBorderColor.value)
const darkFilterWrapBorderColorValue = computed(() => darkFilterWrapBorderColor.value || darkBorderColor.value)
const darkFilterInputBorderColorValue = computed(() => darkFilterInputBorderColor.value || darkBorderColor.value)

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

const labelTextColorStyle = computed(() => {
	return theme.value === 'dark' ? darkTextColorLabel.value : lightTextColorLabel.value
})

const styleFilterPadding = computed(() => {
  const defaultValues = formatDefaultValues.value

	return defaultValues.filterPadding
})
const styleFilterBorderRadius = computed(() => {
  const defaultValues = formatDefaultValues.value

	return `${defaultValues.filterBorderRadius}rem`
})

const styleFilterMarginBottom = computed(() => {
  const defaultValues = formatDefaultValues.value

	return `${defaultValues.filterMarginBottom}px`
})

const styleOptionsPadding = computed(() => {
  const defaultValues = formatDefaultValues.value

	return defaultValues.optionsPadding
})

const styleGroupPadding = computed(() => {
  const defaultValues = formatDefaultValues.value

	return defaultValues.groupPadding
})

// Computed para verificar se o label está ativo (select aberto ou tem valor selecionado)
const isLabelActive = computed(() => {
	// Se showLabel é true, o label está sempre ativo
	if (showLabel.value) {
		return true
	}
	
	if (!multiple.value) {
		return isActive.value || isDropdownOpenSingle.value || (currentOptionOnly.value !== null && currentOptionOnly.value !== emptyOptionValue.value)
	} else {
		return isActive.value || isDropdownOpen.value || safeCurrentOptionMultiple.value.length > 0
	}
})

// Computed para estilo do label (similar ao NbInput)
const styleLabel = computed(() => {
	const defaultValues = formatDefaultValues.value
	const isActiveLabel = isLabelActive.value

	const lightTextColorLabelValue = isActiveLabel ? defaultValues.lightTextColorLabelActive : defaultValues.lightTextColorLabel
	const darkTextColorLabelValue = isActiveLabel ? defaultValues.darkTextColorLabelActive : defaultValues.darkTextColorLabel

	return {
		fontFamily: defaultValues.fontFamilyLabel,
		fontSize: isActiveLabel ? defaultValues.fontSizeLabelActive : defaultValues.fontSizeLabel,
		fontWeight: defaultValues.fontWeightLabel,
		color: defaultValues.theme === 'dark' ? darkTextColorLabelValue : lightTextColorLabelValue,
		top: isActiveLabel ? `${defaultValues.labelActiveTop}px` : '50%',
		left: isActiveLabel ? `${defaultValues.labelActiveLeft}px` : `${defaultValues.labelLeft}px`,
		right: isActiveLabel ? `${defaultValues.labelActiveRight}px` : `${defaultValues.labelRight}px`,
		transform: isActiveLabel ? 'translateY(0)' : 'translateY(-50%)',
		transition: 'all 0.2s ease',
		backgroundColor: isActiveLabel ? defaultValues.labelBackground : 'transparent',
		padding: isActiveLabel ? defaultValues.labelPadding : '0',
		borderRadius: isActiveLabel ? `${defaultValues.labelBorderRadius}rem` : '0',
		// Se labelBreakOnActive for true (padrão), usa ellipsis quando ativo. Se false, quebra linha
		...(isActiveLabel ? {
			whiteSpace: !labelBreakOnActive.value ? 'normal' : 'nowrap',
			wordWrap: !labelBreakOnActive.value ? 'break-word' : 'normal',
			overflowWrap: !labelBreakOnActive.value ? 'break-word' : 'normal',
			maxWidth: '100%',
			textOverflow: labelBreakOnActive.value ? 'ellipsis' : 'clip',
			overflow: labelBreakOnActive.value ? 'hidden' : 'visible',
		} : {}),
	}
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

const minHeightStyle = computed(() => {
  if (!options.value.length) {
    return !hasEmptyOption.value ? 37.58 : 75.16
  }

	return 75.16
})

const maxHeightStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return `${defaultValues.maxHeight}px`
})

// Funções para navegar nas opções (multiple select)
const navigateOptionsMultiple = (direction) => {
	const list = filteredOptions.value
	const withEmpty = showEmptyOptionInList.value ? 1 : 0
	const allOptions = withEmpty
		? [{ value: null, disabled: false, index: 0 }, ...list.map((opt, idx) => ({ value: opt[valueKey.value], disabled: opt.disabled || disabled.value, index: idx + 1 }))]
		: list.map((opt, idx) => ({ value: opt[valueKey.value], disabled: opt.disabled || disabled.value, index: idx }))
	const total = allOptions.length
	const availableOptions = allOptions.filter(opt => !opt.disabled)
	if (availableOptions.length === 0) return

	let currentIndex = focusedOptionIndexMultiple.value
	if (currentIndex < 0 && total > 0) {
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
		emit('clicked', event)
		emit('clicked-complete', {
			event,
			...getMultipleSelectionMeta(safeCurrentOptionMultiple.value)
		})
		event.stopPropagation()
		const wasOpen = isDropdownOpen.value
		isDropdownOpen.value = !isDropdownOpen.value
		
		// Se estiver abrindo, fechar todos os outros e focar primeira opção ou filtro
		if (!wasOpen && isDropdownOpen.value) {
			closeAllOtherDropdowns()
			filterText.value = ''
			if (showEmptyOptionInList.value || filteredOptions.value.length > 0) {
				focusedOptionIndexMultiple.value = 0
			}
			nextTick(() => {
				if (hasFilter.value && filterInputRef.value) {
					filterInputRef.value.focus()
				} else {
					const optionElement = document.querySelector(`[data-option-index-multiple="${focusedOptionIndexMultiple.value}"]`)
					if (optionElement) {
						optionElement.focus()
					}
				}
			})
		} else if (!isDropdownOpen.value) {
			focusedOptionIndexMultiple.value = -1
			resetCollapsedGroups()
		}
	}
}

// Função para fechar dropdown quando clicar fora
const closeDropdown = (event) => {
	if (event.button === 2) return // botão direito não fecha
	const dropdown = event.target.closest('.component__dropdown')
	if (!dropdown) {
		isDropdownOpen.value = false
		isDropdownOpenSingle.value = false
		resetCollapsedGroups()
	}
}

// Função para gerenciar foco quando entra no componente
const handleFocusIn = () => {
	// Se estamos retornando o foco programaticamente após uma seleção, não emitir focused
	if (isReturningFocus.value) {
		// Resetar a flag após um pequeno delay para garantir que o watch não dispare
		setTimeout(() => {
			isReturningFocus.value = false
		}, 50)
		// Manter isActive como true, mas não mudar o valor para evitar que o watch dispare
		return
	}
	// Só mudar isActive se realmente mudou de false para true
	if (!isActive.value) {
		isActive.value = true
	}
}

// Marca que foi botão direito para não fechar no focusout (ex.: clique direito no grupo)
const onWrapperMouseDown = (event) => {
  // Se foi botão direito, marcar que foi clicado
	if (event.button === 2) {
    // Marcar que foi botão direito
		rightClickInProgress.value = true

		// Resetar a flag após um pequeno delay para garantir que o watch não dispare
		setTimeout(() => { rightClickInProgress.value = false }, 300)
	}
}

// Função para fechar dropdown quando o foco sair do componente
const handleWrapperFocusOut = (event) => {
	// Verificar se o foco saiu completamente do componente
	// Mas não setar como false se estamos clicando em uma opção ou retornando o foco programaticamente
	setTimeout(() => {
		if (!wrapperRef.value?.contains(document.activeElement) && !isReturningFocus.value && !isClickingOption.value) {
			isActive.value = false
		}
	}, 0)
	
	// Fechar dropdown quando o foco sair completamente do componente
	if ((isDropdownOpen.value || isDropdownOpenSingle.value) && !wrapperRef.value?.contains(event.relatedTarget)) {
		// Usar setTimeout para permitir que o clique na opção seja processado primeiro
		setTimeout(() => {
      // Não fechar se foi botão direito
			if (rightClickInProgress.value) {
				rightClickInProgress.value = false
				return
			}

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
				resetCollapsedGroups()
				nextTick(() => {
					if (dropdownFieldMultipleRef.value) {
						dropdownFieldMultipleRef.value.focus()
					}
				})
			}
			if (isDropdownOpenSingle.value) {
				isDropdownOpenSingle.value = false
				focusedOptionIndexSingle.value = -1
				resetCollapsedGroups()
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
		resetCollapsedGroups()
	}
}

// Funções para navegar nas opções (single select)
const navigateOptionsSingle = (direction) => {
	const list = filteredOptions.value
	const showEmpty = showEmptyOptionInList.value
	const allOptions = []
	if (showEmpty) {
		allOptions.push({ value: emptyOptionValue.value, disabled: disabled.value, index: 0 })
	}
	allOptions.push(...list.map((opt, idx) => ({ 
		value: opt[valueKey.value], 
		disabled: opt.disabled || disabled.value,
		index: showEmpty ? idx + 1 : idx
	})))
	
	const availableOptions = allOptions.filter(opt => !opt.disabled)
	if (availableOptions.length === 0) return
	
	let currentIndex = focusedOptionIndexSingle.value
	if (currentIndex < 0) {
		currentIndex = showEmpty ? 0 : (list.length > 0 ? 0 : -1)
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
		filterText.value = ''
		resetCollapsedGroups()
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
		filterText.value = ''
		resetCollapsedGroups()
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
		emit('clicked', event)
		emit('clicked-complete', {
			event,
			...getSingleSelectionMeta(currentOptionOnly.value)
		})
		event.stopPropagation()
		const wasOpen = isDropdownOpenSingle.value
		isDropdownOpenSingle.value = !isDropdownOpenSingle.value
		
		// Se estiver abrindo, fechar todos os outros e focar primeira opção ou filtro
		if (!wasOpen && isDropdownOpenSingle.value) {
			closeAllOtherDropdowns()
			filterText.value = ''
			// Focar primeira opção disponível ou input de filtro (opção vazia escondida quando filtro ativo)
			focusedOptionIndexSingle.value = showEmptyOptionInList.value ? 0 : -1
			if (!showEmptyOptionInList.value && filteredOptions.value.length > 0) {
				focusedOptionIndexSingle.value = 0
			}
			nextTick(() => {
				if (hasFilter.value && filterInputRef.value) {
					filterInputRef.value.focus()
				} else {
					const optionElement = document.querySelector(`[data-option-index-single="${focusedOptionIndexSingle.value}"]`)
					if (optionElement) {
						optionElement.focus()
					}
				}
			})
		} else if (!isDropdownOpenSingle.value) {
			focusedOptionIndexSingle.value = -1
			resetCollapsedGroups()
		}
	}
}

// Helpers para meta de seleção (objeto completo + índice no array original)
const getSingleSelectionMeta = (value) => {
	const idx = options.value.findIndex(opt => opt[valueKey.value] === value)
	const option = idx !== -1 ? options.value[idx] : null
	return { value, option, index: idx }
}

const getMultipleSelectionMeta = (values) => {
	const indices = []
	const opts = (values || []).map(val => {
		const idx = options.value.findIndex(opt => opt[valueKey.value] === val)
		indices.push(idx)
		return idx !== -1 ? options.value[idx] : null
	})
	return { values: values || [], options: opts, indices }
}

// Função para selecionar opção no single select
const selectOptionSingle = (value) => {
	if (disabled.value) return
	isClickingOption.value = true
	// Manter isActive como true durante a seleção para evitar que handleWrapperFocusOut o set como false
	const wasActive = isActive.value
	// Garantir que isActive permaneça true durante a seleção
	if (wasActive) {
		isActive.value = true
		// Setar flag para não emitir focused novamente quando retornarmos o foco
		isReturningFocus.value = true
	}
	currentOptionOnly.value = value
	isDropdownOpenSingle.value = false
	focusedOptionIndexSingle.value = -1
	resetCollapsedGroups()
	onUserChange(value)
	setTimeout(() => {
		isClickingOption.value = false
		// Retornar foco ao campo de seleção
		if (wasActive) {
			nextTick(() => {
				if (dropdownFieldSingleRef.value) {
					dropdownFieldSingleRef.value.focus()
				}
				// Resetar a flag após um pequeno delay para garantir que o watch não dispare
				setTimeout(() => {
					isReturningFocus.value = false
				}, 100)
			})
		} else {
			// Se não estava ativo antes, não precisa da flag
			nextTick(() => {
				if (dropdownFieldSingleRef.value) {
					dropdownFieldSingleRef.value.focus()
				}
			})
		}
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
	return `${selectedOptions.length} ${multipleSelectedText.value}`
}

// Limpar seleção no multiple (opção vazia)
const clearSelectionMultiple = () => {
	if (disabled.value) return
	isClickingOption.value = true
	safeCurrentOptionMultiple.value = []
	onUserChange([])
	setTimeout(() => { isClickingOption.value = false }, 150)
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

  if (Array.isArray(value)) {
    emit('user-changed-complete', getMultipleSelectionMeta(value))
  } else {
    emit('user-changed-complete', getSingleSelectionMeta(value))
  }
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
					closeDropdownSingle()
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
					closeDropdownSingle()
				} else {
					// Se estiver fechado, abre
					toggleDropdownSingle(event)
				}
			}
			break
		case 'Escape':
			if (isDropdownOpenSingle.value) {
				event.preventDefault()
				closeDropdownSingle()
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
				closeDropdownSingle()
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
					closeDropdownMultiple()
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
					closeDropdownMultiple()
				} else {
					// Se estiver fechado, abre
					toggleDropdown(event)
				}
			}
			break
		case 'Escape':
			if (isDropdownOpen.value) {
				event.preventDefault()
				closeDropdownMultiple()
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
				closeDropdownMultiple()
			}
			break
	}
}

watch(currentOptionOnly, (newValue, oldValue) => {
	if (!initialized.value) return
	if (newValue !== oldValue) {
    emit('changed', newValue)
    emit('changed-complete', getSingleSelectionMeta(newValue))
  }
})

watch(selectedOptionOnly, (newValue, oldValue) => {
	if (newValue !== oldValue) currentOptionOnly.value = newValue
})

watch(currentOptionMultiple, (newValue, oldValue) => {
	if (!initialized.value) return
	if (newValue !== oldValue) {
    const vals = newValue || []
    emit('changed', vals)
    emit('changed-complete', getMultipleSelectionMeta(vals))
  }
})

watch(selectedOptionMultiple, (newValue, oldValue) => {
	if (newValue !== oldValue) currentOptionMultiple.value = newValue || []
})

watch(filterText, () => {
	if (!hasFilter.value) return
	const count = filteredOptions.value.length
	const withEmpty = showEmptyOptionInList.value ? 1 + count : count
	if (isDropdownOpenSingle.value && focusedOptionIndexSingle.value >= withEmpty) {
		focusedOptionIndexSingle.value = showEmptyOptionInList.value ? 0 : (count > 0 ? 0 : -1)
	}
	const totalMultiple = (showEmptyOptionInList.value ? 1 : 0) + count
	if (isDropdownOpen.value && focusedOptionIndexMultiple.value >= totalMultiple) {
		focusedOptionIndexMultiple.value = totalMultiple > 0 ? 0 : -1
	}
})

watch(isActive, (value, oldValue) => {
	// Não emitir eventos na primeira inicialização
	if (oldValue === undefined) {
		return
	}
	// Não emitir focused se estamos retornando o foco programaticamente
	if (value && !oldValue && isReturningFocus.value) {
		return
	}
	if (value) {
		emit('focused')
	} else {
		emit('blurred')
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
	vertical-align: bottom;
	position: relative;
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
	position: relative;

	user-select: none;
	touch-action: manipulation;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	.component__filter-wrap {
		// max-height: 50px !important;
    margin-bottom: v-bind(styleFilterMarginBottom);
	}

	.component__filter-input {
		max-height: 33px !important;
		display: block !important;
	}

	.component__label {
		position: absolute;
		z-index: 1;
		pointer-events: none;

		.component__label--required {
			color: red;
			display: contents;
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
				.component__filter-wrap {
					padding: v-bind(styleFilterPadding);
					border-bottom: 1px solid v-bind('lightFilterWrapBorderColorValue');
					position: sticky;
					top: 0;
					background-color: v-bind('lightBgColor');
					z-index: 1;
				}

				.component__filter-input {
					width: 100%;
					padding: 6px 10px;
					border: 1px solid v-bind('lightFilterInputBorderColorValue');
					border-radius: v-bind(styleFilterBorderRadius);
					font-size: inherit;
					font-family: inherit;
					background-color: v-bind('lightBgColor');
					color: v-bind('lightFilterTextColorValue');
					box-sizing: border-box;

					&::placeholder {
						color: v-bind('lightEmptyTextColorValue');
					}

					&:focus {
						outline: none;
						border-color: v-bind('lightBorderColorFocus');
					}
				}

				.component__option-group-block {
					// margin-bottom: 4px;
				}

				.component__option-group-label {
					padding: v-bind(styleGroupPadding);
					font-size: 0.85em;
					font-weight: 600;
					color: v-bind('lightGroupTextColorValue');
					background-color: v-bind('lightGroupBgColorValue');
					cursor: default;
					user-select: none;
				}

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

				.component__option-empty {
					padding: v-bind(styleOptionsPadding);
					color: v-bind('lightEmptyTextColorValue');
					font-style: italic;
					cursor: default;
					user-select: none;
				}
			}

			.component__option-group {
				font-size: inherit;
				background-color: v-bind('lightBgColor');
				border: 1px solid v-bind('lightBorderColor');
				border-radius: 4px;
        min-height: v-bind('minHeightStyle');
				max-height: v-bind('maxHeightStyle');
				overflow-y: auto;
				position: absolute;
				top: 100%;
				left: 0;
				right: 0;
				z-index: 1000;
				margin-top: 4px;

				.component__filter-wrap {
					padding: v-bind(styleFilterPadding);
					border-bottom: 1px solid v-bind('lightFilterWrapBorderColorValue');
					position: sticky;
					top: 0;
					background-color: v-bind('lightBgColor');
					z-index: 1;
				}

				.component__filter-input {
					width: 100%;
					padding: 6px 10px;
					border: 1px solid v-bind('lightFilterInputBorderColorValue');
					border-radius: v-bind(styleFilterBorderRadius);
					font-size: inherit;
					font-family: inherit;
					background-color: v-bind('lightBgColor');
					color: v-bind('lightFilterTextColorValue');
					box-sizing: border-box;

					&::placeholder {
						color: v-bind('lightEmptyTextColorValue');
					}

					&:focus {
						outline: none;
						border-color: v-bind('lightBorderColorFocus');
					}
				}

				.component__option-group-block {
					// margin-bottom: 4px;
				}

				.component__option-group-label {
					padding: v-bind(styleGroupPadding);
					font-size: 0.85em;
					font-weight: 600;
					color: v-bind('lightGroupTextColorValue');
					background-color: v-bind('lightGroupBgColorValue');
					cursor: default;
					user-select: none;
				}

				.component__option-item {
					padding: v-bind(styleOptionsPadding);
					cursor: pointer;
					color: v-bind('lightOptionTextColor');
					transition: background-color 0.2s;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

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

				.component__option-empty {
					padding: v-bind(styleOptionsPadding);
					color: v-bind('lightEmptyTextColorValue');
					font-style: italic;
					cursor: default;
					user-select: none;
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
				.component__filter-wrap {
					padding: v-bind(styleFilterPadding);
					border-bottom: 1px solid v-bind('darkFilterWrapBorderColorValue');
					position: sticky;
					top: 0;
					background-color: v-bind('darkBgColor');
					z-index: 1;
				}

				.component__filter-input {
					width: 100%;
					padding: 6px 10px;
					border: 1px solid v-bind('darkFilterInputBorderColorValue');
					border-radius: v-bind(styleFilterBorderRadius);
					font-size: inherit;
					font-family: inherit;
					background-color: v-bind('darkBgColor');
					color: v-bind('darkFilterTextColorValue');
					box-sizing: border-box;

					&::placeholder {
						color: v-bind('darkEmptyTextColorValue');
					}

					&:focus {
						outline: none;
						border-color: v-bind('darkBorderColorFocus');
					}
				}

				.component__option-group-block {
					// margin-bottom: 4px;
				}

				.component__option-group-label {
					padding: v-bind(styleGroupPadding);
					font-size: 0.85em;
					font-weight: 600;
					color: v-bind('darkGroupTextColorValue');
					background-color: v-bind('darkGroupBgColorValue');
					cursor: default;
					user-select: none;
				}

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

				.component__option-empty {
					padding: v-bind(styleOptionsPadding);
					color: v-bind('darkEmptyTextColorValue');
					font-style: italic;
					cursor: default;
					user-select: none;
				}
			}

			.component__option-group {
				font-size: inherit;
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

				.component__filter-wrap {
					padding: v-bind(styleFilterPadding);
					border-bottom: 1px solid v-bind('darkFilterWrapBorderColorValue');
					position: sticky;
					top: 0;
					background-color: v-bind('darkBgColor');
					z-index: 1;
				}

				.component__filter-input {
					width: 100%;
					padding: 6px 10px;
					border: 1px solid v-bind('darkFilterInputBorderColorValue');
					border-radius: v-bind(styleFilterBorderRadius);
					font-size: inherit;
					font-family: inherit;
					background-color: v-bind('darkBgColor');
					color: v-bind('darkFilterTextColorValue');
					box-sizing: border-box;

					&::placeholder {
						color: v-bind('darkEmptyTextColorValue');
					}

					&:focus {
						outline: none;
						border-color: v-bind('darkBorderColorFocus');
					}
				}

				.component__option-group-block {
					// margin-bottom: 4px;
				}

				.component__option-group-label {
					padding: v-bind(styleGroupPadding);
					font-size: 0.85em;
					font-weight: 600;
					color: v-bind('darkGroupTextColorValue');
					background-color: v-bind('darkGroupBgColorValue');
					cursor: default;
					user-select: none;
				}

				.component__option-item {
					padding: v-bind(styleOptionsPadding);
					cursor: pointer;
					color: v-bind('darkOptionTextColor');
					transition: background-color 0.2s;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

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

				.component__option-empty {
					padding: v-bind(styleOptionsPadding);
					color: v-bind('darkEmptyTextColorValue');
					font-style: italic;
					cursor: default;
					user-select: none;
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
    overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

		&:focus {
			// outline: 2px solid rgba(25, 118, 210, 0.5);
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
