<template>
    <div
      v-if="nbId"
      :class="['nb-wrapper', componentDisabled]"
      :style="[wrapperStyle, inputWidthStyle, borderRadiusStyle]"
      role="input"
      :title="title"
      v-bind="computedAriaAttrs"
    >
      <div
        :id="nbId"
        :class="['nb-reset', 'component', sizeMediaQueryStyle, themeStyle, componentReadonly, inputStyleClass]"
        :style="[componentStyle, inputWidthStyle, borderRadiusStyle]"
        @click="interacted($event)"
      >
        <label
          v-if="showLabel"
          :for="computedInputName"
          class="component__label"
          :style="[styleLabel]"
          @click="handleLabelClick"
        >{{ label }}<span v-if="required" class="component__label--required">*</span></label>
  
        <input
          ref="inputRef"
          v-model="displayValue"
          @input="handleInputChange"
          @keydown="handleKeyDown"
          :id="computedInputName"
          :name="computedInputName"
          :type="shouldUseCustomCalendar ? 'text' : currentType"
          class="component__input"
          :class="[
            uppercaseStyle,
            activeStyle,
            isEmptyClass
          ]"
          :placeholder="computedPlaceholder"
          :disabled="disabled || inputReadonly"
          :required="required"
          :readonly="shouldBlockInputEdit"
          :autocomplete="inputAutocomplete"
          :min="nativeMin"
          :max="nativeMax"
          :step="shouldUseCustomCalendar ? undefined : step"
          :tabindex="disabled || inputReadonly ? -1 : tabindex"
          role="input"
          :style="[borderRadiusStyle]"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @click="handleInputClick"
          @keydown.enter="!disabled && hasTabIndexEnter && enterConfirm()"
          @paste="handlePaste"
        />
      </div>
      <div
        v-if="validShowMsg"
        :class="['component__message', hasCustomMsg ? 'component__message--custom' : 'component__message--default']"
      >
        <slot name="message">{{ message }}</slot>
      </div>
      
      <!-- Calendário customizado usando Teleport para renderizar no body -->
      <Teleport to="body">
        <div
          v-if="shouldUseCustomCalendar && showCustomCalendar"
          ref="calendarRef"
          class="datepicker__custom-calendar-wrapper"
          :style="calendarPositionStyle"
          @click.stop="isCalendarInteraction = true"
          @mousedown.stop="isCalendarInteraction = true"
        >
          <Calendar
            :nb-id="`${nbId}-calendar`"
            :value="calendarValue"
            :input-type="inputType"
            :has-seconds="shouldUseSeconds"
            :min="min"
            :max="max"
            :step="step"
            :disabled="disabled"
            :width="formatCalendarWidth"
            :locale="locale"
            :theme="theme"
            :allow-range="allowRange"
            :block-clicks-without-events="blockClicksWithoutEvents"
            :font-family="calendarFontFamily"
            :font-size="calendarFontSize"
            :font-weight="calendarFontWeight"
            :primary-color="calendarPrimaryColor"
            :selection-color="calendarSelectionColor"
            :event-color="calendarEventColor"
            :today-color="calendarTodayColor"
            :hover-text-color="calendarHoverTextColor"
            :normal-text-color="calendarNormalTextColor"
            :month-year-item-bg="calendarMonthYearItemBg"
            :month-year-item-bg-hover="calendarMonthYearItemBgHover"
            :day-hover-bg="calendarDayHoverBg"
            :day-hover-text-color="calendarDayHoverTextColor"
            :time-display-text-color="calendarTimeDisplayTextColor"
            :time-edit-button-bg="calendarTimeEditButtonBg"
            :time-edit-button-text-color="calendarTimeEditButtonTextColor"
            :time-edit-button-bg-hover="calendarTimeEditButtonBgHover"
            :time-edit-button-text-color-hover="calendarTimeEditButtonTextColorHover"
            :time-edit-button-font-family="calendarTimeEditButtonFontFamily"
            :time-edit-button-font-size="calendarTimeEditButtonFontSize"
            :time-edit-button-padding="calendarTimeEditButtonPadding"
            :time-edit-button-border-radius="calendarTimeEditButtonBorderRadius"
            :time-edit-button-font-weight="calendarTimeEditButtonFontWeight"
            :time-edit-button-border="calendarTimeEditButtonBorder"
            :time-edit-button-text="calendarTimeEditButtonText"
            :today-button-bg="calendarTodayButtonBg"
            :today-button-text-color="calendarTodayButtonTextColor"
            :today-button-bg-hover="calendarTodayButtonBgHover"
            :today-button-text-color-hover="calendarTodayButtonTextColorHover"
            :today-button-font-family="calendarTodayButtonFontFamily"
            :today-button-font-size="calendarTodayButtonFontSize"
            :today-button-padding="calendarTodayButtonPadding"
            :today-button-border-radius="calendarTodayButtonBorderRadius"
            :today-button-font-weight="calendarTodayButtonFontWeight"
            :today-button-border="calendarTodayButtonBorder"
            :today-button-text="calendarTodayButtonText"
            :now-button-text="calendarNowButtonText"
            :show-clear-button="calendarShowClearButton"
            :show-today-button="calendarShowTodayButton"
            :clear-button-keep-current-month="calendarClearButtonKeepCurrentMonth"
            :start-week-on-monday="calendarStartWeekOnMonday"
            :edit-range="calendarEditRange"
            :max-range-days="calendarMaxRangeDays"
            :min-year="calendarMinYear"
            :max-year="calendarMaxYear"
            :go-to-date="calendarGoToDate"
            :is-required="calendarIsRequired"
            :width-full="calendarWidthFull"
            :border-radius="calendarBorderRadius"
            :scroll-class="calendarScrollClass"
            :events="calendarEvents"
            :select-month-text="calendarSelectMonthText"
            :select-year-text="calendarSelectYearText"
            :select-time-text="calendarSelectTimeText"
            :time-display-label-text="calendarTimeDisplayLabelText"
            :clear-button-title="calendarClearButtonTitle"
            :clear-button-symbol="calendarClearButtonSymbol"
            :iso-string-timezone-format="calendarIsoStringTimezoneFormat"
            @changed="handleCalendarChanged"
            @date-selected="handleCalendarDateSelected"
            @month-changed="handleCalendarMonthChanged"
            @valid="handleCalendarValid"
            @mousedown="isCalendarInteraction = true"
            @click="isCalendarInteraction = true"
          />
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref, toRefs, computed, onMounted, onUnmounted, watch, nextTick, Teleport } from 'vue'
  import { defineAsyncComponent } from 'vue'
  // Importar funções utilitárias do nb-calendar
  // Em desenvolvimento (monorepo), usar caminho relativo
  // Em produção, será resolvido pelo build do pacote
  import { formatTimeValue, formatISOLocal, formatISOString as formatISOStringUtil, isSameDay, parseLocalDate, buildCompleteDataFromInputText as buildCompleteDataFromInputTextUtil } from '../../../nb-calendar/src/utils/dateUtils.js'
  
// Importar do pacote npm (funciona localmente via Yarn workspaces e após publicação)
// Durante desenvolvimento: Yarn workspaces resolve automaticamente
// Após publicação: NPM resolve o pacote publicado
const Calendar = defineAsyncComponent(() => 
  import('@vlalg-nimbus/nb-calendar').then(m => {
    // Tenta pegar o Calendar exportado diretamente
    if (m.Calendar) return m.Calendar
    // Fallback para default (plugin)
    if (m.default && m.default.Calendar) return m.default.Calendar
    // Último fallback
    return m.default
  })
)
  
  defineOptions({
      name: 'NbDatePicker',
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
    'current-value-complete',
    'changed-complete',
    'focused',
    'blurred',
    'clicked',
    'entered',
    'paste',
    'valid',
    'date-selected',
    'month-changed'
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
    title: {
      type: String,
      default: ''
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
        default: null
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
      default: 'date',
      validator: value => {
        return ['date', 'datetime-local', 'time', 'month', 'week'].indexOf(value) !== -1
      },
    },
    min: {
      type: [Date, String],
      default: '',
    },
    max: {
      type: [Date, String],
      default: '',
    },
    step: {
      type: [String, Number],
      default: '',
    },
    hasSeconds: {
      // null = detectar automaticamente baseado no valor/time format
      type: Boolean,
      default: null,
      validator: value => {
        return value === null || typeof value === 'boolean'
      },
    },
    locale: {
      type: String,
      default: 'en-US',
      validator: value => {
        return ['pt-BR', 'en-US'].includes(value)
      }
    },
    allowRange: {
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      }
    },
    calendarZIndex: {
      type: Number,
      default: 10000,
      validator: value => {
        return typeof value === 'number' && value >= 0
      }
    },
    calendarWidth: {
      type: Number,
      default: 350,
      validator: value => {
        return typeof value === 'number' && value >= 280
      }
    },
    blockClicksWithoutEvents: {
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      }
    },
    // Calendar props - Font
    calendarFontFamily: {
      type: String,
      default: `'Lato', sans-serif`
    },
    calendarFontSize: {
      type: String,
      default: '1.6em',
      validator: value => {
        return !value ? '1.6em' : value
      }
    },
    calendarFontWeight: {
      type: Number,
      default: 400,
      validator: value => {
        return !value ? 400 : value
      }
    },
    // Calendar props - Colors
    calendarPrimaryColor: {
      type: String,
      default: '#007bff',
      validator: value => {
        return typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
      }
    },
    calendarSelectionColor: {
      type: String,
      default: '#1976d2',
      validator: value => {
        return typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
      }
    },
    calendarEventColor: {
      type: String,
      default: '#4caf50',
      validator: value => {
        return typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
      }
    },
    calendarTodayColor: {
      type: String,
      default: '#007bff',
      validator: value => {
        return typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
      }
    },
    calendarHoverTextColor: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
      }
    },
    calendarNormalTextColor: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
      }
    },
    calendarMonthYearItemBg: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
      }
    },
    calendarMonthYearItemBgHover: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
      }
    },
    calendarDayHoverBg: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
      }
    },
    calendarDayHoverTextColor: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
      }
    },
    calendarTimeDisplayTextColor: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
      }
    },
    // Calendar props - Time Edit Button
    calendarTimeEditButtonBg: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
      }
    },
    calendarTimeEditButtonTextColor: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
      }
    },
    calendarTimeEditButtonBgHover: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
      }
    },
    calendarTimeEditButtonTextColorHover: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
      }
    },
    calendarTimeEditButtonFontFamily: {
      type: String,
      default: `'Lato', sans-serif`
    },
    calendarTimeEditButtonFontSize: {
      type: String,
      default: '14px',
      validator: value => {
        return !value ? '14px' : value
      }
    },
    calendarTimeEditButtonPadding: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string')
      }
    },
    calendarTimeEditButtonBorderRadius: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string')
      }
    },
    calendarTimeEditButtonFontWeight: {
      type: Number,
      default: 500,
      validator: value => {
        return !value ? 500 : value
      }
    },
    calendarTimeEditButtonBorder: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string')
      }
    },
    calendarTimeEditButtonText: {
      type: String,
      default: 'Edit'
    },
    // Calendar props - Today Button
    calendarTodayButtonBg: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
      }
    },
    calendarTodayButtonTextColor: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
      }
    },
    calendarTodayButtonBgHover: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
      }
    },
    calendarTodayButtonTextColorHover: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
      }
    },
    calendarTodayButtonFontFamily: {
      type: String,
      default: `'Lato', sans-serif`
    },
    calendarTodayButtonFontSize: {
      type: String,
      default: '1.1rem',
      validator: value => {
        return !value ? '1.1rem' : value
      }
    },
    calendarTodayButtonPadding: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string')
      }
    },
    calendarTodayButtonBorderRadius: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string')
      }
    },
    calendarTodayButtonFontWeight: {
      type: Number,
      default: 400,
      validator: value => {
        return !value ? 400 : value
      }
    },
    calendarTodayButtonBorder: {
      type: String,
      default: null,
      validator: value => {
        return !value || (typeof value === 'string')
      }
    },
    calendarTodayButtonText: {
      type: String,
      default: 'Today'
    },
    calendarNowButtonText: {
      type: String,
      default: 'Now'
    },
    // Calendar props - Configuration
    calendarShowClearButton: {
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      }
    },
    calendarShowTodayButton: {
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      }
    },
    calendarClearButtonKeepCurrentMonth: {
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      }
    },
    calendarStartWeekOnMonday: {
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      }
    },
    calendarEditRange: {
      type: Boolean,
      default: true,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      }
    },
    calendarMaxRangeDays: {
      type: Number,
      default: null,
      validator: value => {
        return value === null || (typeof value === 'number' && value > 0 && Number.isInteger(value))
      }
    },
    calendarMinYear: {
      type: Number,
      default: 1900,
      validator: value => {
        return typeof value === 'number' && value >= 0
      }
    },
    calendarMaxYear: {
      type: Number,
      default: 2100,
      validator: value => {
        return typeof value === 'number' && value >= 0
      }
    },
    calendarGoToDate: {
      type: [Date, String],
      default: null
    },
    calendarIsRequired: {
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      }
    },
    calendarWidthFull: {
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      }
    },
    calendarBorderRadius: {
      type: Number,
      default: 0
    },
    calendarScrollClass: {
      type: String,
      default: ''
    },
    calendarEvents: {
      type: Array,
      default: () => [],
      validator: value => {
        return Array.isArray(value) && value.every(event => {
          return event && event.date && (event.color || true)
        })
      }
    },
    // Calendar props - Text
    calendarSelectMonthText: {
      type: String,
      default: 'Select month'
    },
    calendarSelectYearText: {
      type: String,
      default: 'Select year'
    },
    calendarSelectTimeText: {
      type: String,
      default: 'Select time'
    },
    calendarTimeDisplayLabelText: {
      type: String,
      default: 'Time:'
    },
    calendarClearButtonTitle: {
      type: String,
      default: 'Clear selection'
    },
    calendarClearButtonSymbol: {
      type: String,
      default: '×'
    },
    calendarIsoStringTimezoneFormat: {
      type: String,
      default: 'Z',
      validator: value => {
        return ['Z', '+00:00'].includes(value)
      }
    },
    hasTrim: {
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      },
    },
    inputName: {
      type: String,
      required: true,
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
    blockPaste: {
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      }
    },
    inputAutocomplete: {
      type: String,
      default: 'off',
      validator: value => {
        return ['on', 'off'].indexOf(value) !== -1
      },
    },
    inputUppercase: {
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
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
      darkDisabledBgColor: {
          type: String,
          default: 'rgba(40, 42, 54, 1)'
      },
      darkTextColor: {
          type: String,
          default: '#ffffff'
      },
      tabindex: {
          type: [String, Number],
          default: 0
      },
    showMsg: { // Se mostrado o erro
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      },
    },
    hasMsg: { // Se tem erro
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
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
        return typeof value === 'boolean' && [true, false].includes(value)
      },
    },
    showLabel: {
      type: Boolean,
      default: false,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      },
    },
    label: {
      type: String,
      default: 'Label text',
    },
    labelBreakOnActive: {
      type: Boolean,
      default: true,
      validator: value => {
        return typeof value === 'boolean' && [true, false].includes(value)
      },
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
    inputLabelMarginActive: {
      type: Number,
      default: 15,
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
      fontSizeLabelActive: {
          type: String,
          default: '0.8em',
          validator: value => {
              return !value ? '0.8em' : value
          }
      },
      fontWeightLabel: {
          type: Number,
          default: 400,
          validator: value => {
              return !value ? 700 : value
          }
      },
      lightTextColorLabel: {
          type: String,
          default: '#333333'
      },
      lightTextColorLabelActive: {
          type: String,
          default: '#333333'
      },
      darkTextColorLabel: {
          type: String,
          default: '#ffffff'
      },
      darkTextColorLabelActive: {
          type: String,
          default: '#ffffff'
      }
  })
  
  const {
    nbId,
      display,
    hasTabIndexEnter,
    ariaLabel,
    ariaAttrs,
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
      blockPaste,
      inputType,
    hasTrim,
      inputUppercase,
    inputName,
    inputText,
    min,
    max,
    step,
    hasSeconds,
    locale,
    theme,
    allowRange,
    calendarZIndex,
    calendarWidth,
    blockClicksWithoutEvents,
    tabindex,
      lightBgColor,
      lightBgColorFocus,
      lightDisabledBgColor,
      lightTextColor,
      darkBgColor,
      darkBgColorFocus,
      darkDisabledBgColor,
      darkTextColor,
    textAlign,
    showMsg,
    hasMsg,
    showLabel,
    label,
    labelBreakOnActive,
    labelBackground,
    labelPadding,
    labelBorderRadius,
    labelLeft,
    inputLabelMarginActive,
    labelActiveTop,
    labelActiveLeft,
    labelRight,
    labelActiveRight,
    fontFamilyLabel,
    fontSizeLabel,
    fontSizeLabelActive,
    fontWeightLabel,
    lightTextColorLabel,
    lightTextColorLabelActive,
    darkTextColorLabel,
    darkTextColorLabelActive,
    required
  } = toRefs(props)
  
  // Refs para armazenar valores do componente
  const inputValue = ref('') // Valor interno (formato ISO)
  const displayValue = ref('') // Valor formatado para exibição
  const lastValidDisplayValue = ref('') // Último valor válido para reverter se necessário
  const currentType = ref('') // Tipo atual do input
  const isActive = ref(false) // Flag para indicar se o input está ativo (focado)
  const isCalendarInteraction = ref(false) // Flag para indicar interação com calendário

  const formatCalendarWidth = computed(() => {
    return !calendarWidth.value || calendarWidth.value < 280 ? 280 : parseInt(calendarWidth.value, 10)
  })
  
  /*
    Computed para decidir se o calendário deve exibir segundos
    Regras:
    - Se a prop hasSeconds for definida (true/false), usar o valor dela
    - Caso contrário, detectar automaticamente se o valor atual possui segundos
      - Para datetime-local: verificar se a parte do tempo tem HH:mm:ss
      - Para time: verificar se o valor tem HH:mm:ss
  */
  const shouldUseSeconds = computed(() => {
    // Se definido explicitamente pelo consumidor, respeitar
    if (hasSeconds.value !== null) {
      return hasSeconds.value
    }
  
    // Detectar automaticamente apenas para time e datetime-local
    if (inputType.value === 'time' || inputType.value === 'datetime-local') {
      const hasSecondsIn = (val) => {
        if (!val || typeof val !== 'string') return false
        // Remover timezone, se houver (ex: 2026-01-09T21:07:50.624+00:00)
        let timePart = val
        if (inputType.value === 'datetime-local') {
          timePart = val.split('T')[1] || ''
          timePart = timePart.split(/[Z+-]/)[0] || ''
        }
        // Para time, já é só HH:mm[:ss]
        const parts = timePart.split(':')
        return parts.length >= 3
      }
  
      // Priorizar inputValue (valor interno normalizado)
      if (hasSecondsIn(inputValue.value)) return true
      // Fallback para inputText original
      if (hasSecondsIn(inputText.value)) return true
    }
  
    return false
  })
  
  /*
    Computed para converter inputValue para formato esperado pelo Calendar
    Este computed é usado para converter o valor interno (inputValue) para o formato esperado pelo componente Calendar.
    Ele converte strings ISO para Date objects e objetos JSON de range para objetos com Date objects.
  */
  const calendarValue = computed(() => {
    if (!inputValue.value) return null
    
    // Se for range, converter JSON string para objeto
    if (allowRange.value && typeof inputValue.value === 'string' && inputValue.value.startsWith('{')) {
      try {
        // Parsear o valor do inputValue como um objeto JSON
        const rangeValue = JSON.parse(inputValue.value)

        // Verificar se o objeto rangeValue tem startDate ou endDate
        if (rangeValue && (rangeValue.startDate || rangeValue.endDate)) {
          // Converter strings ISO para Date objects (usar parse local para evitar timezone)
          const parseLocalDate = (dateStr) => {
            // Verificar se a data é válida
            if (!dateStr) return null

            // Verificar se a data está no formato YYYY-MM-DD
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
              // Converter a data para um Date object
              const [year, month, day] = dateStr.split('-').map(Number)

              // Converter a data para um Date object
              return new Date(year, month - 1, day)
            }

            // Converter a data para um Date object
            return new Date(dateStr)
          }
          return {
            startDate: rangeValue.startDate ? parseLocalDate(rangeValue.startDate) : null,
            endDate: rangeValue.endDate ? parseLocalDate(rangeValue.endDate) : null
          }
        }
      } catch (e) {
        // Se não conseguir parsear, retornar null
      }
    }
    
    // Para datas simples, converter string YYYY-MM-DD para Date object (usar parse local para evitar timezone)
    if (inputType.value === 'date' && typeof inputValue.value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(inputValue.value)) {
      // Converter a data para um Date object
      const [year, month, day] = inputValue.value.split('-').map(Number)

      // Converter a data para um Date object
      return new Date(year, month - 1, day)
    }
    
    // Retornar o valor interno (formato ISO)
    return inputValue.value
  })
  
  /*
    Função para formatar valores para exibição
    Esta função é usada para formatar valores internos (ISO) para o formato de exibição no input.
    Ela suporta diferentes tipos de input (date, datetime-local, month, week, time) e diferentes locales (pt-BR, en-US).
    Para ranges, formata como "DD/MM/YYYY - DD/MM/YYYY".
  */
  const formatDisplayValue = (value, type, currentLocale) => {
    // Se não houver valor, retornar string vazia
    if (!value) return ''
    
    // Obter locale atual ou usar o padrão do componente
    const loc = currentLocale || locale.value
    
    // Processar baseado no tipo de input
    if (type === 'date') {
      // Verificar se é um range (JSON string começando com '{')
      if (allowRange.value && typeof value === 'string' && value.startsWith('{')) {
        try {
          // Parsear o valor como JSON
          const rangeValue = JSON.parse(value)
          
          // Verificar se o range tem startDate ou endDate
          if (rangeValue && (rangeValue.startDate || rangeValue.endDate)) {
            // Função auxiliar para formatar uma data individual
            const formatDate = (dateStr) => {
              // Se não houver data, retornar vazio
              if (!dateStr) return ''
              
              // Verificar se está no formato YYYY-MM-DD
              if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                // Separar ano, mês e dia
                const [year, month, day] = dateStr.split('-')
                
                // Formatar baseado no locale
                if (loc === 'pt-BR') {
                  // Formato brasileiro: DD/MM/YYYY
                  return `${day}/${month}/${year}`
                } else {
                  // Formato americano: MM/DD/YYYY
                  return `${month}/${day}/${year}`
                }
              }
              
              // Se não estiver no formato esperado, retornar como está
              return dateStr
            }
            
            // Formatar data inicial
            const start = formatDate(rangeValue.startDate)
            
            // Formatar data final
            const end = formatDate(rangeValue.endDate)
            
            // Se ambas as datas existem, retornar formato de range
            if (start && end) {
              return `${start} - ${end}`
            } else if (start) {
              // Se só tem data inicial, retornar apenas ela
              return start
            } else if (end) {
              // Se só tem data final, retornar apenas ela
              return end
            }
          }
        } catch (e) {
          // Se não conseguir parsear, continuar com o fluxo normal
        }
      }
      
      // Formato: DD/MM/YYYY para pt-BR, MM/DD/YYYY para en-US
      // Aceitar formatos: YYYY-MM-DD (nativo) ou ISO com timezone ou objeto Date
      if (typeof value === 'string') {
        // Verificar se está no formato YYYY-MM-DD (formato nativo)
        if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          // Separar ano, mês e dia
          const [year, month, day] = value.split('-')
          
          // Formatar baseado no locale
          if (loc === 'pt-BR') {
            // Formato brasileiro: DD/MM/YYYY
            return `${day}/${month}/${year}`
          } else {
            // Formato americano: MM/DD/YYYY
            return `${month}/${day}/${year}`
          }
        }
        
        // Verificar se está no formato ISO com timezone (ex: 2026-01-09T00:00:00.000Z)
        // Aceitar qualquer parte de tempo, desde que tenha a data
        const isoDateRegex = /^(\d{4}-\d{2}-\d{2})(T\d{2}:\d{2}(?::\d{2})?(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})?)?$/
        if (isoDateRegex.test(value) && value.includes('T')) {
          // Criar Date object para converter para timezone local
          const date = new Date(value)
          
          // Verificar se a data é válida
          if (!isNaN(date.getTime())) {
            // Extrair partes da data local
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            
            // Formatar baseado no locale
            if (loc === 'pt-BR') {
              // Formato brasileiro: DD/MM/YYYY
              return `${day}/${month}/${year}`
            } else {
              // Formato americano: MM/DD/YYYY
              return `${month}/${day}/${year}`
            }
          }
        }
      } else if (value instanceof Date) {
        // Se for objeto Date, converter para formato local
        if (!isNaN(value.getTime())) {
          const year = value.getFullYear()
          const month = String(value.getMonth() + 1).padStart(2, '0')
          const day = String(value.getDate()).padStart(2, '0')
          
          // Formatar baseado no locale
          if (loc === 'pt-BR') {
            return `${day}/${month}/${year}`
          } else {
            return `${month}/${day}/${year}`
          }
        }
      }
      
      // Se não estiver em um formato suportado, retornar vazio
      return ''
    } else if (type === 'datetime-local') {
      // Formato: DD/MM/YYYY HH:mm para pt-BR, MM/DD/YYYY HH:mm para en-US
      // Aceitar formatos de entrada controlados; se não bater em nenhum, retornar vazio
      if (typeof value === 'string') {
        // 1) Formato nativo do input datetime-local: YYYY-MM-DDTHH:mm ou YYYY-MM-DDTHH:mm:ss (sem timezone)
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(value)) {
          // Separar parte da data e parte do tempo
          const [datePart, timePart] = value.split('T')
          
          // Separar ano, mês e dia
          const [year, month, day] = datePart.split('-')
          
          // Formatar baseado no locale
          if (loc === 'pt-BR') {
            // Formato brasileiro: DD/MM/YYYY HH:mm
            return `${day}/${month}/${year} ${timePart}`
          } else {
            // Formato americano: MM/DD/YYYY HH:mm
            return `${month}/${day}/${year} ${timePart}`
          }
        }
        
        // 2) Formato ISO completo com timezone (ex: 2026-01-09T21:07:50.624+00:00)
        // Regex para aceitar: YYYY-MM-DDTHH:mm(:ss[.SSS])?(Z|+/-HH:mm)
        const isoRegex = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}(?::\d{2})?(?:\.\d{1,3})?)(?:Z|[+-]\d{2}:\d{2})?$/
        if (isoRegex.test(value)) {
          // Criar Date object para converter para timezone local
          const date = new Date(value)
          
          // Verificar se a data é válida
          if (!isNaN(date.getTime())) {
            // Extrair partes da data local
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            const hours = String(date.getHours()).padStart(2, '0')
            const minutes = String(date.getMinutes()).padStart(2, '0')
            const seconds = String(date.getSeconds()).padStart(2, '0')
            
            // Formatar baseado no locale
            if (loc === 'pt-BR') {
              // Formato brasileiro: DD/MM/YYYY HH:mm:ss
              return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
            } else {
              // Formato americano: MM/DD/YYYY HH:mm:ss
              return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
            }
          }
        }
      }
      
      // Se não estiver em um formato suportado, considerar como vazio
      return ''
    } else if (type === 'month') {
      // Formato: MM/YYYY para pt-BR, MM/YYYY para en-US (mesmo formato)
      // Verificar se está no formato YYYY-MM
      if (typeof value === 'string' && /^\d{4}-\d{2}$/.test(value)) {
        // Separar ano e mês
        const [year, month] = value.split('-')
        
        // Retornar formato MM/YYYY
        return `${month}/${year}`
      }
      
      // Se não estiver no formato esperado, retornar como está
      return value
    } else if (type === 'week') {
      // Formato: Semana Www de YYYY para pt-BR, Week Www of YYYY para en-US
      // Verificar se está no formato YYYY-Www
      if (typeof value === 'string' && /^\d{4}-W\d{2}$/i.test(value)) {
        // Extrair ano e semana usando regex
        const match = value.match(/^(\d{4})-W(\d{2})$/i)
        
        // Se encontrou correspondência
        if (match) {
          // Formatar baseado no locale
          if (loc === 'pt-BR') {
            // Formato brasileiro: Semana Www de YYYY
            return `Semana ${match[2]} de ${match[1]}`
          } else {
            // Formato americano: Week Www of YYYY
            return `Week ${match[2]} of ${match[1]}`
          }
        }
      }
      
      // Se não estiver no formato esperado, retornar como está
      return value
    }
    
    // Para time, retornar como está (já está formatado)
    return value
  }
  
  /*
    Função para parsear valores digitados de volta para formato ISO
    Esta função é usada para converter valores digitados pelo usuário (formato de exibição) para o formato interno (ISO).
    Ela suporta diferentes tipos de input e diferentes locales, incluindo parsing de ranges com ordenação automática de datas.
  */
  const parseInputValue = (displayVal, type, currentLocale) => {
    // Se não houver valor ou for apenas espaços, retornar string vazia
    if (!displayVal || !displayVal.trim()) return ''
    
    // Remover espaços no início e fim
    const trimmed = displayVal.trim()
    
    // Obter locale atual ou usar o padrão do componente
    const loc = currentLocale || locale.value
    
    // Processar baseado no tipo de input
    if (type === 'date') {
      // Verificar se é range (contém "-" com ou sem espaços)
      if (allowRange.value && trimmed.includes('-')) {
        // Aceitar "-" com ou sem espaços: " - " ou "-" ou " -" ou "- "
        // Dividir pelo separador e remover espaços de cada parte
        const parts = trimmed.split(/\s*-\s*/).map(p => p.trim())
        
        // Função auxiliar para parsear uma data individual
        const parseDate = (dateStr) => {
          // Se não houver data, retornar null
          if (!dateStr) return null
          
          // Aceitar DD/MM/YYYY ou D/M/YYYY (pt-BR), MM/DD/YYYY ou M/D/YYYY (en-US)
          // Regex flexível: aceita 1 ou 2 dígitos para dia e mês
          if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
            // Separar dia, mês e ano
            const dateParts = dateStr.split('/')
            
            // Processar baseado no locale
            if (loc === 'pt-BR') {
              // Formato brasileiro: DD/MM/YYYY ou D/M/YYYY
              const [day, month, year] = dateParts
              
              // Adicionar zero à esquerda se necessário para dia
              const dayPadded = day.padStart(2, '0')
              // Adicionar zero à esquerda se necessário para mês
              const monthPadded = month.padStart(2, '0')
              
              // Retornar formato ISO: YYYY-MM-DD
              return `${year}-${monthPadded}-${dayPadded}`
            } else {
              // Formato americano: MM/DD/YYYY ou M/D/YYYY
              const [month, day, year] = dateParts
              
              // Adicionar zero à esquerda se necessário para dia
              const dayPadded = day.padStart(2, '0')
              // Adicionar zero à esquerda se necessário para mês
              const monthPadded = month.padStart(2, '0')
              
              // Retornar formato ISO: YYYY-MM-DD
              return `${year}-${monthPadded}-${dayPadded}`
            }
          } else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateStr)) {
            // Já está em formato ISO, apenas normalizar
            const dateParts = dateStr.split('-')

            // Separar ano, mês e dia
            const [year, month, day] = dateParts
            
            // Adicionar zero à esquerda se necessário para dia
            const dayPadded = day.padStart(2, '0')
            // Adicionar zero à esquerda se necessário para mês
            const monthPadded = month.padStart(2, '0')
            
            // Retornar formato ISO normalizado: YYYY-MM-DD
            return `${year}-${monthPadded}-${dayPadded}`
          }
          
          // Se não estiver em nenhum formato válido, retornar null
          return null
        }
        
        // Parsear data inicial
        let startDate = parseDate(parts[0])
        
        // Parsear data final (se existir)
        let endDate = parts[1] ? parseDate(parts[1]) : null
        
        // Se ambas as datas são válidas, verificar qual é menor e ordenar
        if (startDate && endDate) {
          // Converter para Date objects para comparar
          const startDateObj = new Date(startDate)
          // Converter para Date objects para comparar para data final
          const endDateObj = new Date(endDate)
          
          // Se a data final for menor que a data inicial, trocar
          if (endDateObj < startDateObj) {
            // Trocar data inicial e data final
            const temp = startDate
            // Trocar data inicial para data final
            startDate = endDate
            // Trocar data final para data inicial
            endDate = temp
          }
          
          // Retornar JSON string com range ordenado
          return JSON.stringify({ startDate, endDate })
        } else if (startDate) {
          // Se só tem startDate, retornar JSON string com endDate null
          return JSON.stringify({ startDate, endDate: null })
        }
        
        // Se não conseguiu parsear, retornar vazio
        return ''
      }
      
      // Aceitar DD/MM/YYYY ou D/M/YYYY (pt-BR), MM/DD/YYYY ou M/D/YYYY (en-US) ou YYYY-MM-DD
      // Regex flexível: aceita 1 ou 2 dígitos para dia e mês
      if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(trimmed)) {
        // Separar dia, mês e ano
        const parts = trimmed.split('/')
        
        // Processar baseado no locale
        if (loc === 'pt-BR') {
          // Formato brasileiro: DD/MM/YYYY ou D/M/YYYY
          const [day, month, year] = parts
          
          // Adicionar zero à esquerda se necessário para dia
          const dayPadded = day.padStart(2, '0')
          // Adicionar zero à esquerda se necessário para mês
          const monthPadded = month.padStart(2, '0')
          
          // Retornar formato ISO: YYYY-MM-DD
          return `${year}-${monthPadded}-${dayPadded}`
        } else {
          // Formato americano: MM/DD/YYYY ou M/D/YYYY
          const [month, day, year] = parts
          
          // Adicionar zero à esquerda se necessário para dia
          const dayPadded = day.padStart(2, '0')
          // Adicionar zero à esquerda se necessário para mês
          const monthPadded = month.padStart(2, '0')
          
          // Retornar formato ISO: YYYY-MM-DD
          return `${year}-${monthPadded}-${dayPadded}`
        }
      } else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(trimmed)) {
        // Aceitar também YYYY-M-D ou YYYY-MM-DD
        // Separar ano, mês e dia
        const parts = trimmed.split('-')
        const [year, month, day] = parts
        
        // Adicionar zero à esquerda se necessário para dia
        const dayPadded = day.padStart(2, '0')
        // Adicionar zero à esquerda se necessário para mês
        const monthPadded = month.padStart(2, '0')
        
        // Retornar formato ISO normalizado: YYYY-MM-DD
        return `${year}-${monthPadded}-${dayPadded}`
      }
      
      // Se não estiver em nenhum formato válido, retornar vazio
      return ''
    } else if (type === 'datetime-local') {
      // Aceitar DD/MM/YYYY HH:mm ou D/M/YYYY H:mm (pt-BR), MM/DD/YYYY HH:mm ou M/D/YYYY H:mm (en-US) ou YYYY-MM-DDTHH:mm
      // Regex flexível: aceita 1 ou 2 dígitos para dia, mês e hora
      if (/^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{1,2}(:\d{1,2})?$/.test(trimmed)) {
        // Separar parte da data e parte do tempo
        const [datePart, timePart] = trimmed.split(' ')
        
        // Separar dia, mês e ano
        const parts = datePart.split('/')
        
        // Processar baseado no locale
        if (loc === 'pt-BR') {
          // Formato brasileiro: DD/MM/YYYY ou D/M/YYYY
          const [day, month, year] = parts
          
          // Adicionar zero à esquerda se necessário para dia
          const dayPadded = day.padStart(2, '0')
          // Adicionar zero à esquerda se necessário para mês
          const monthPadded = month.padStart(2, '0')
          
          // Formatar hora também (adicionar zero à esquerda se necessário)
          const timeParts = timePart.split(':')

          // Formatar hora também (adicionar zero à esquerda se necessário)
          const formattedTime = timeParts.map(t => t.padStart(2, '0')).join(':')
          
          // Retornar formato ISO: YYYY-MM-DDTHH:mm
          return `${year}-${monthPadded}-${dayPadded}T${formattedTime}`
        } else {
          // Formato americano: MM/DD/YYYY ou M/D/YYYY
          const [month, day, year] = parts
          
          // Adicionar zero à esquerda se necessário para dia
          const dayPadded = day.padStart(2, '0')
          // Adicionar zero à esquerda se necessário para mês
          const monthPadded = month.padStart(2, '0')
          
          // Formatar hora também (adicionar zero à esquerda se necessário)
          const timeParts = timePart.split(':')

          // Formatar hora também (adicionar zero à esquerda se necessário)
          const formattedTime = timeParts.map(t => t.padStart(2, '0')).join(':')
          
          // Retornar formato ISO: YYYY-MM-DDTHH:mm
          return `${year}-${monthPadded}-${dayPadded}T${formattedTime}`
        }
      } else if (/^\d{4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}(:\d{1,2})?$/.test(trimmed)) {
        // Aceitar também YYYY-M-DTH:m ou YYYY-MM-DDTHH:mm
        // Separar parte da data e parte do tempo
        const [datePart, timePart] = trimmed.split('T')
        
        // Separar ano, mês e dia da parte da data
        const dateParts = datePart.split('-')
        // Separar ano, mês e dia da parte da data
        const [year, month, day] = dateParts
        
        // Adicionar zero à esquerda se necessário para dia
        const dayPadded = day.padStart(2, '0')
        // Adicionar zero à esquerda se necessário para mês
        const monthPadded = month.padStart(2, '0')
        
        // Separar hora, minuto e segundo da parte do tempo
        const timeParts = timePart.split(':')

        // Formatar hora também (adicionar zero à esquerda se necessário)
        const formattedTime = timeParts.map(t => t.padStart(2, '0')).join(':')
        
        // Retornar formato ISO normalizado: YYYY-MM-DDTHH:mm
        return `${year}-${monthPadded}-${dayPadded}T${formattedTime}`
      }
      
      // Se não estiver em nenhum formato válido, retornar vazio
      return ''
    } else if (type === 'month') {
      // Aceitar MM/YYYY ou M/YYYY ou YYYY-MM ou YYYY-M (mesmo formato para ambos)
      if (/^\d{1,2}\/\d{4}$/.test(trimmed)) {
        // Separar mês e ano
        const [month, year] = trimmed.split('/')
        
        // Adicionar zero à esquerda se necessário
        const monthPadded = month.padStart(2, '0')
        
        // Retornar formato ISO: YYYY-MM
        return `${year}-${monthPadded}`
      } else if (/^\d{4}-\d{1,2}$/.test(trimmed)) {
        // Separar ano e mês
        const [year, month] = trimmed.split('-')
        
        // Adicionar zero à esquerda se necessário
        const monthPadded = month.padStart(2, '0')
        
        // Retornar formato ISO normalizado: YYYY-MM
        return `${year}-${monthPadded}`
      }
      
      // Se não estiver em nenhum formato válido, retornar vazio
      return ''
    } else if (type === 'week') {
      // Aceitar formato YYYY-Www
      if (/^\d{4}-W\d{2}$/i.test(trimmed)) {
        // Retornar em maiúsculas para padronizar
        return trimmed.toUpperCase()
      }
      
      // Tentar parsear "Semana Www de YYYY" (pt-BR) ou "Week Www of YYYY" (en-US)
      const weekMatchPt = trimmed.match(/semana\s+W?(\d{2})\s+de\s+(\d{4})/i)

      // Verificar se encontrou correspondência
      if (weekMatchPt) {
        // Retornar formato ISO: YYYY-Www
        return `${weekMatchPt[2]}-W${weekMatchPt[1]}`
      }
      
      const weekMatchEn = trimmed.match(/week\s+W?(\d{2})\s+of\s+(\d{4})/i)
      if (weekMatchEn) {
        // Retornar formato ISO: YYYY-Www
        return `${weekMatchEn[2]}-W${weekMatchEn[1]}`
      }
      
      // Se não estiver em nenhum formato válido, retornar vazio
      return ''
    }
    
    // Para time, retornar como está (já está no formato correto)
    return trimmed
  }
  // Refs para controle do calendário customizado
  const showCustomCalendar = ref(false) // Flag para mostrar/ocultar calendário
  const calendarPosition = ref({ top: 0, left: 0 }) // Posição do calendário na tela
  const inputRef = ref(null) // Referência ao elemento input
  const calendarRef = ref(null) // Referência ao elemento do calendário
  const useCustomCalendar = ref(true) // Flag para usar calendário customizado
  
  /*
    Computed para determinar se deve usar calendário customizado
    Este computed é usado para determinar se o componente deve usar o calendário customizado ou o nativo do navegador.
    Ele retorna true se useCustomCalendar for true.
  */
  const shouldUseCustomCalendar = computed(() => {
    return useCustomCalendar.value === true
  })
  
  /*
    Computed para formatar valores padrão do componente
    Este computed é usado para formatar e validar todos os valores padrão das props do componente.
    Ele garante que todos os valores tenham valores padrão válidos e retorna um objeto com todos os valores formatados.
  */
  const formatDefaultValues = computed(() => {
      const disabledValue = disabled.value ? 'component-disabled' : ''
      const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
      const caretColorValue = !caretColor.value ? '' : caretColor.value
      const selectionBgColorValue = !selectionBgColor.value ? '' : selectionBgColor.value
      const selectionTextColorValue = !selectionTextColor.value ? '' : selectionTextColor.value
    const hasBorderRadiusValue = !hasBorderRadius.value ? false : hasBorderRadius.value
      const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
      const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
      const fontSizeValue = !fontSize.value ? '1.4em' : fontSize.value
      const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 100 : fontWeight.value
    const fontFamilyMsgValue = !fontFamilyMsg.value ? `'Lato', sans-serif` : fontFamilyMsg.value
    const fontSizeMsgValue = !fontSizeMsg.value ? '1em' : fontSizeMsg.value
    const fontWeightMsgValue = ((fontWeightMsg.value !== 0 && !fontWeightMsg.value) || fontWeightMsg.value < 0) ? 100 : fontWeightMsg.value
    const textMessageColorValue = !textMessageColor.value ? '#f15574' : textMessageColor.value
    const inputWidthValue = !inputWidth.value ? 200 : inputWidth.value
    const activeTextStyleValue = !activeTextStyle.value ? 'normal' : activeTextStyle.value
    // Sempre força 'sm' como padrão, mas mantém suporte para futuro
    const sizeMediaQueryValue = 'sm'
    const inputReadonlyValue = !inputReadonly.value ? false : inputReadonly.value
    const inputTypeValue = !inputType.value ? 'date' : inputType.value
    const inputUppercaseValue = !inputUppercase.value ? false : inputUppercase.value
    const themeValue = !theme.value ? 'normal' : theme.value
    const textAlignValue = !textAlign.value ? 'left' : textAlign.value
    const inputStyleValue = !inputStyle.value ? 'background' : inputStyle.value
  
    const showLabelValue = !showLabel.value ? false : showLabel.value
    const labelLeftValue = ((labelLeft.value !== 0 && !labelLeft.value) || labelLeft.value < 0) ? 5 : labelLeft.value
    const labelBackgroundValue = !labelBackground.value ? 'transparent' : labelBackground.value
    const inputLabelMarginActiveValue = ((inputLabelMarginActive.value !== 0 && !inputLabelMarginActive.value) || inputLabelMarginActive.value < 0) ? 15 : inputLabelMarginActive.value
    const labelPaddingValue = !labelPadding.value ? '1px 5px' : labelPadding.value
    const labelBorderRadiusValue = ((labelBorderRadius.value !== 0 && !labelBorderRadius.value) || labelBorderRadius.value < 0) ? 0 : labelBorderRadius.value
    const labelActiveTopValue = (labelActiveTop.value === null || labelActiveTop.value === undefined) ? -13 : labelActiveTop.value
    const labelActiveLeftValue = (labelActiveLeft.value === null || labelActiveLeft.value === undefined) ? 5 : labelActiveLeft.value
    const labelRightValue = (labelRight.value === null || labelRight.value === undefined) ? 0 : labelRight.value
    const labelActiveRightValue = (labelActiveRight.value === null || labelActiveRight.value === undefined) ? 0 : labelActiveRight.value
    const fontFamilyLabelValue = !fontFamilyLabel.value ? `'Lato', sans-serif` : fontFamilyLabel.value
    const fontSizeLabelValue = !fontSizeLabel.value ? '1em' : fontSizeLabel.value
    const fontSizeLabelActiveValue = !fontSizeLabelActive.value ? '0.8em' : fontSizeLabelActive.value
    const fontWeightLabelValue = !fontWeightLabel.value ? 400 : fontWeightLabel.value
    const lightTextColorLabelValue = !lightTextColorLabel.value ? '#ffffff' : lightTextColorLabel.value
    const darkTextColorLabelValue = !darkTextColorLabel.value ? '#000000' : darkTextColorLabel.value
    const lightTextColorLabelActiveValue = !lightTextColorLabelActive.value ? '#ffffff' : lightTextColorLabelActive.value
    const darkTextColorLabelActiveValue = !darkTextColorLabelActive.value ? '#000000' : darkTextColorLabelActive.value
  
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
      inputType: inputTypeValue,
      inputUppercase: inputUppercaseValue,
      theme: themeValue,
      inputStyle: inputStyleValue,
      showLabel: showLabelValue,
      labelBackground: labelBackgroundValue,
      labelPadding: labelPaddingValue,
      labelBorderRadius: labelBorderRadiusValue,
      labelLeft: labelLeftValue,
      inputLabelMarginActive: inputLabelMarginActiveValue,
      labelActiveTop: labelActiveTopValue,
      labelActiveLeft: labelActiveLeftValue,
      labelRight: labelRightValue,
      labelActiveRight: labelActiveRightValue,
      fontFamilyLabel: fontFamilyLabelValue,
      fontSizeLabel: fontSizeLabelValue,
      fontSizeLabelActive: fontSizeLabelActiveValue,
      fontWeightLabel: fontWeightLabelValue,
      lightTextColorLabel: lightTextColorLabelValue,
      darkTextColorLabel: darkTextColorLabelValue,
      lightTextColorLabelActive: lightTextColorLabelActiveValue,
      darkTextColorLabelActive: darkTextColorLabelActiveValue,
      }
  })
  /*
    Computed para classe de componente desabilitado
    Este computed é usado para retornar a classe CSS quando o componente está desabilitado.
  */
  const componentDisabled = computed(() => {
      const defaultValues = formatDefaultValues.value
  
      return defaultValues.disabled
  })
  
  /*
    Computed para estilo do wrapper
    Este computed é usado para gerar o estilo CSS do wrapper do componente.
    Ele define o display baseado na prop display.
  */
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
  /*
    Computed para estilo de tamanho da fonte
    Este computed é usado para gerar o estilo CSS de tamanho da fonte do input.
    Ele retorna o fontSize formatado com 'em' ou um valor padrão.
  */
  const fontSizeStyle = computed(() => {
    const defaultValues = formatDefaultValues.value
  
    if (defaultValues.fontSize) return defaultValues.fontSize

    /*let newFontSize = ''
    switch (defaultValues.sizeMediaQuery) {
      case 'sm':
        return '1.2em'
      case 'md':
        return '1.6em'
      case 'lg':
        return '2em'
      default:
        newFontSize = '1.2em'
    }
  
    return newFontSize*/
  
    // Sempre usa tamanho 'sm', mas mantém estrutura para facilitar volta no futuro
    return '1.4em'
  })
  /*
    Computed para estilo do componente
    Este computed é usado para gerar o estilo CSS do componente input.
    Ele define fontSize, fontWeight e marginTop baseado no estado do label.
  */
  const componentStyle = computed(() => {
    const defaultValues = formatDefaultValues.value
  
    const isActive = isLabelActive.value
  
      return {
          fontWeight: defaultValues.fontWeight,
          marginTop: isActive && showLabel.value ? `${defaultValues.inputLabelMarginActive}px` : '0',
      }
  })
  /*
    Computed para estilo de border radius
    Este computed é usado para gerar o estilo CSS de border radius do componente.
    Ele só aplica border radius se hasBorderRadius for true e inputStyle não for 'line'.
  */
  const borderRadiusStyle = computed(() => {
    const defaultValues = formatDefaultValues.value
  
    if (defaultValues.inputStyle !== 'line' && defaultValues.hasBorderRadius) {
      return { borderRadius: `${defaultValues.borderRadius}rem` }
    }
  
    return {}
  })
  /*
    Computed para fonte do componente
    Este computed é usado para retornar a fonte do componente baseado nas props.
  */
  const font = computed(() => {
      const defaultValues = formatDefaultValues.value
  
      return defaultValues.font
  })
  
  /*
    Computed para fonte da mensagem
    Este computed é usado para retornar a fonte da mensagem baseado nas props.
  */
  const fontMessage = computed(() => {
      const defaultValues = formatDefaultValues.value
  
      return defaultValues.fontFamilyMsg
  })

  /*
    Computed para tamanho da fonte da mensagem
    Este computed é usado para retornar o tamanho da fonte da mensagem baseado nas props.
  */
  const fontSizeMessage = computed(() => {
      const defaultValues = formatDefaultValues.value
  
      return defaultValues.fontSizeMsg
  })

  /*
    Computed para peso da fonte da mensagem
    Este computed é usado para retornar o peso da fonte da mensagem baseado nas props.
  */
  const fontWeightMessage = computed(() => {
      const defaultValues = formatDefaultValues.value
  
      return defaultValues.fontWeightMsg
  })

  /*
    Computed para cor do texto baseada no tema
    Este computed é usado para retornar a cor do texto baseada no tema atual.
    Ele retorna a cor do texto do tema light ou dark conforme o tema selecionado.
  */
  const styleThemeTextColor = computed(() => {
    return theme.value === 'dark' ? darkTextColor.value : lightTextColor.value
  })

  /*
    Computed para cor do texto da mensagem
    Este computed é usado para retornar a cor do texto da mensagem baseado nas props.
  */
  const styleTextMessageColor = computed(() => {
      const defaultValues = formatDefaultValues.value
  
      return defaultValues.textMessageColor
  })

  /*
    Computed para cor do cursor
    Este computed é usado para retornar a cor do cursor baseado nas props.
  */
  const styleCaretColor = computed(() => {
      const defaultValues = formatDefaultValues.value
  
      return defaultValues.caretColor || (defaultValues.theme === 'dark' ? '#00d4ff' : '#007bff')
  })
  
  /*
    Computed para cor de fundo da seleção
    Este computed é usado para retornar a cor de fundo da seleção baseado nas props.
  */
  const styleSelectionBgColor = computed(() => {
      const defaultValues = formatDefaultValues.value
  
      return defaultValues.selectionBgColor || (defaultValues.theme === 'dark' ? '#00d4ff' : '#007bff')
  })
  
  /*
    Computed para cor do texto da seleção
    Este computed é usado para retornar a cor do texto da seleção baseado nas props.
  */
  const styleSelectionTextColor = computed(() => {
      const defaultValues = formatDefaultValues.value
  
      return defaultValues.selectionTextColor || (defaultValues.theme === 'dark' ? '#000000' : '#ffffff')
  })
  
  /*
    Computed para estilo de largura do input
    Este computed é usado para gerar o estilo CSS de largura do input.
    Se display for 'block', retorna 100% de largura, caso contrário usa inputWidth.
  */
  const inputWidthStyle = computed(() => {
    const defaultValues = formatDefaultValues.value
  
    // Se display for 'block', retorna 100% de largura, caso contrário usa inputWidth.
    if (defaultValues.display === 'block') return { width: '100%' }
  
    return {
      width: `${defaultValues.inputWidth}px`
    }
  })
  
  /*
    Computed para classe de estilo do input
    Este computed é usado para retornar a classe CSS baseada no inputStyle prop.
    Suporta 'line', 'border' e 'background' (padrão).
  */
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

  /*
    Computed para estilo ativo do input
    Este computed é usado para retornar o estilo CSS do input quando está ativo.
    Suporta 'italic', 'oblique' e 'normal' (padrão).
  */
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

  /*
    Computed para tamanho da media query do input
    Este computed é usado para retornar o tamanho da media query do input baseado nas props.
    Suporta 'sm', 'md' e 'lg' (padrão).
  */
  const sizeMediaQueryStyle = computed(() => {
    /*const defaultValues = formatDefaultValues.value
  
    switch (defaultValues.sizeMediaQuery) {
      case 'sm':
        return 'component__sm'
      case 'md':
        return 'component__md'
      case 'lg':
        return 'component__lg'
      default:
        return ''
    }*/

    // Sempre retorna 'sm', mas mantém estrutura para facilitar volta no futuro
    return 'component__sm'
  })

  /*
    Computed para classe de tema do componente
    Este computed é usado para retornar a classe CSS do tema baseado na prop theme.
    Suporta 'dark' e 'light' (padrão).
  */
  const themeStyle = computed(() => {
    const defaultValues = formatDefaultValues.value
  
    switch (defaultValues.theme) {
      case 'dark':
        return 'component__theme--dark'
      default:
        return 'component__theme--light'
    }
  })
  
  /*
    Computed para classe de readonly do componente
    Este computed é usado para retornar a classe CSS quando o input está readonly.
  */
  const componentReadonly = computed(() => {
      const defaultValues = formatDefaultValues.value
  
      return defaultValues.inputReadonly ? 'component__input--read-only' : ''
  })

  /*
    Computed para classe de uppercase do input
    Este computed é usado para retornar a classe CSS quando o input está uppercase.
  */
  const uppercaseStyle = computed(() => {
    const defaultValues = formatDefaultValues.value
  
    return defaultValues.inputUppercase ? 'component__input--uppercase' : ''
  })

  /*
    Computed para nome do input
    Este computed é usado para retornar o nome do input baseado nas props.
  */
  const computedInputName = computed(() => {
    return inputName.value ? inputName.value : `${nbId.value}-name-label`
  })

  /*
    Computed para placeholder do input
    Este computed é usado para retornar o placeholder do input.
    Para date picker, sempre retorna vazio pois não mostra placeholder.
  */
  const computedPlaceholder = computed(() => {
    // Date picker não mostra placeholder - sempre vazio
    return ''
  })

  /*
    Computed para determinar se o label está ativo
    Este computed é usado para determinar se o label deve estar na posição ativa (flutuante).
    O label está ativo se o input estiver focado OU se tiver conteúdo.
  */
  const isLabelActive = computed(() => {
    // Label está ativo se o input estiver focado OU se tiver conteúdo
    return isActive.value || (displayValue.value && displayValue.value.trim().length > 0)
  })
  
  /*
    Computed para classe de input vazio
    Este computed é usado para adicionar classe CSS quando o input está vazio.
    Isso é útil para esconder placeholders e ajustar estilos quando não há conteúdo.
  */
  const isEmptyClass = computed(() => {
    // Adiciona classe quando input está vazio para esconder placeholders
    return !displayValue.value || displayValue.value.trim().length === 0 ? 'component__input--empty' : ''
  })

  /*
    Computed para classe de input ativo
    Este computed é usado para retornar a classe CSS quando o input está ativo.
  */
  const activeInput = computed(() => {
    return isActive.value ? 'component__input--active' : 'component__input--no-active'
  })

  /*
    Computed para padding do input
    Este computed é usado para retornar o padding do input baseado nas props.
  */
  const inputPadding = computed(() => {
    return '6px 10px'
  })

  /*
    Computed para validar se deve mostrar mensagem
    Este computed é usado para retornar se deve mostrar mensagem baseado nas props.
  */
  const validShowMsg = computed(() => {
    return !!(showMsg.value && hasMsg.value)
  })

  /*
    Computed para atributos ARIA do componente
    Este computed é usado para gerar os atributos ARIA do componente para acessibilidade.
    Ele combina ariaLabel, ariaAttrs customizados e remove atributos undefined/null.
  */
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
  
  /*
    Computed para cor de borda do componente
    Este computed é usado para gerar a cor da borda do componente.
    Se o background for transparent, usa a cor do texto para a borda.
  */
  const styleBorderColor = computed(() => {
    const bgColor = theme.value === 'dark' ? darkBgColor.value : lightBgColor.value
    const textColor = theme.value === 'dark' ? darkTextColor.value : lightTextColor.value
    
    // Se bg-color for transparent, usa a cor do texto para a borda
    return (bgColor === 'transparent' || bgColor === '#transparent' || !bgColor) ? textColor : bgColor
  })
  
  /*
    Computed para cor de borda quando o componente está focado
    Este computed é usado para gerar a cor da borda quando o componente está focado.
    Se o background focus for transparent, usa a cor do texto para a borda.
  */
  const styleBorderColorFocus = computed(() => {
    const bgColorFocus = theme.value === 'dark' ? darkBgColorFocus.value : lightBgColorFocus.value
    const textColor = theme.value === 'dark' ? darkTextColor.value : lightTextColor.value
    
    // Se bg-color-focus for transparent, usa a cor do texto para a borda
    return (bgColorFocus === 'transparent' || bgColorFocus === '#transparent' || !bgColorFocus) ? textColor : bgColorFocus
  })
  /*
    Computed para estilo do label
    Este computed é usado para gerar o estilo CSS do label do componente.
    Ele define posição, tamanho, cor e transições baseado no estado ativo/inativo do label.
  */
  const styleLabel = computed(() => {
    const defaultValues = formatDefaultValues.value
    const isActive = isLabelActive.value
  
    const lightTextColorLabel = isActive ? defaultValues.lightTextColorLabelActive : defaultValues.lightTextColorLabel
    const darkTextColorLabel = isActive ? defaultValues.darkTextColorLabelActive : defaultValues.darkTextColorLabel
  
    return {
      fontFamily: defaultValues.fontFamilyLabel,
      fontSize: isActive ? defaultValues.fontSizeLabelActive : defaultValues.fontSizeLabel,
      fontWeight: defaultValues.fontWeightLabel,
      color: defaultValues.theme === 'dark' ? darkTextColorLabel : lightTextColorLabel,
      top: isActive ? `${defaultValues.labelActiveTop}px` : '50%',
      left: isActive ? `${defaultValues.labelActiveLeft}px` : `${defaultValues.labelLeft}px`,
      right: isActive ? `${defaultValues.labelActiveRight}px` : `${defaultValues.labelRight}px`,
      transform: isActive ? 'translateY(0)' : 'translateY(-50%)',
      transition: 'all 0.2s ease',
      backgroundColor: isActive ? defaultValues.labelBackground : 'transparent',
      padding: isActive ? defaultValues.labelPadding : '0',
      borderRadius: isActive ? `${defaultValues.labelBorderRadius}rem` : '0',
      // Se labelBreakOnActive for true (padrão), usa ellipsis quando ativo. Se false, quebra linha
      ...(isActive ? {
        width: 'fit-content',
        whiteSpace: !labelBreakOnActive.value ? 'normal' : 'nowrap',
        wordWrap: !labelBreakOnActive.value ? 'break-word' : 'normal',
        overflowWrap: !labelBreakOnActive.value ? 'break-word' : 'normal',
        maxWidth: '100%',
        textOverflow: labelBreakOnActive.value ? 'ellipsis' : 'clip',
        overflow: labelBreakOnActive.value ? 'hidden' : 'visible',
      } : {}),
    }
  })

  /*
    Computed para estilo do label ativo
    Este computed é usado para retornar o estilo CSS do label quando está ativo.
  */
  const styleLabelActive = computed(() => {
    const defaultValues = formatDefaultValues.value
  
    return defaultValues.theme === 'dark' ? defaultValues.darkTextColorLabelActive : defaultValues.lightTextColorLabelActive
  })

  /*
    Função para inicializar valores do componente
    Esta função é usada para inicializar os valores do componente quando ele é montado ou desmontado.
    Ela define inputValue e currentType com os valores das props.
  */
  const startValue = () => {
    inputValue.value = inputText.value
  
    currentType.value = inputType.value
  }
  
  /*
    Função para processar interação do usuário
    Esta função é usada para processar quando o usuário interage com o componente.
    Ela emite o evento clicked.
  */
  const interacted = (event) => {
      emit('clicked', event)
  }
  /*
    Handler para quando o label é clicado
    Esta função é usada para processar quando o usuário clica no label.
    Ela previne a propagação do evento para o elemento pai e foca o input explicitamente.
    Se estiver usando calendário customizado, também abre o calendário.
  */
  const handleLabelClick = (event) => {
    // Prevenir que o evento seja capturado pelo @click="interacted" do elemento pai
    event.stopPropagation()
    
    // Verificar se o componente está desabilitado ou readonly
    if (disabled.value || formatDefaultValues.value.inputReadonly) {
      return
    }
    
    // Focar o input explicitamente
    if (inputRef.value) {
      inputRef.value.focus()
      
      // Se estiver usando calendário customizado, também abrir o calendário
      if (shouldUseCustomCalendar.value) {
        // Recalcular posição e abrir calendário
        showCustomCalendar.value = false
        requestAnimationFrame(() => {
          calculateCalendarPosition()
          showCustomCalendar.value = true
        })
      }
    }
  }
  /*
    Função para confirmar entrada com Enter
    Esta função é usada para processar quando o usuário pressiona Enter no input.
    Ela emite o evento entered com o valor atual do input, se o componente não estiver desabilitado ou readonly.
  */
  const enterConfirm = () => {
    if (disabled.value || formatDefaultValues.value.inputReadonly || !hasTabIndexEnter.value) return
  
    emit('entered', inputValue.value)
  }

  const handlePaste = async (event) => {
    // Capturar o valor do clipboard
    const pastedValue = event.clipboardData?.getData('text') || ''
    
    // Sempre emitir o evento
    emit('paste', pastedValue)
    
    // Bloquear o paste se blockPaste for true
    if (blockPaste.value) {
      event.preventDefault()
    }
  }
  
  /*
    Função para calcular posição do calendário customizado
    Esta função é usada para calcular a posição do calendário customizado em relação ao input.
    Ela posiciona o calendário abaixo do input com um espaçamento de 4px.
    Como o calendário é renderizado via Teleport no body, sempre usa position: fixed.
  */
  const calculateCalendarPosition = () => {
    // Verificar se o inputRef existe
    if (!inputRef.value) return
    
    // Usar nextTick para garantir que o DOM atualizou
    nextTick(() => {
      // Obter o rect do input em relação à viewport
      const inputRect = inputRef.value.getBoundingClientRect()
      
      const spacing = 4 // Espaçamento entre input e calendário
      
      // Como o calendário é renderizado no body via Teleport, sempre usar coordenadas da viewport
      // Sempre posicionar abaixo do input usando position: fixed
      calendarPosition.value = {
        top: `${inputRect.bottom + spacing}px`,
        left: `${inputRect.left}px`
      }
    })
  }
  
  /*
    Computed para estilo de posição do calendário
    Este computed é usado para gerar o estilo CSS de posição do calendário customizado.
    Como o calendário é renderizado via Teleport no body, sempre usa position: fixed.
    Ele retorna um objeto com position fixed, top, left e zIndex.
  */
  const calendarPositionStyle = computed(() => {
    // Retornar objeto com position fixed, top, left e zIndex
    // z-index configurável via prop calendarZIndex (padrão: 10000)
    return {
      position: 'fixed',
      top: calendarPosition.value.top,
      left: calendarPosition.value.left,
      zIndex: calendarZIndex.value
    }
  })
  
  /*
    Handler para quando o input recebe foco
    Esta função é usada para processar quando o input recebe foco.
    Ela atualiza isActive, emite evento focused, e abre o calendário customizado se necessário.
    Recalcula a posição do calendário antes de abrir para garantir posicionamento correto.
  */
  const handleInputFocus = () => {
    // Atualizar isActive para true
    isActive.value = true

    // Emitir evento focused
    emit('focused')
    
    // Verificar se deve usar calendário customizado
    if (shouldUseCustomCalendar.value) {
      // Sempre recalcular posição ao focar, mesmo se já estiver aberto
      // Fechar primeiro para garantir que recalcule com valores atualizados
      showCustomCalendar.value = false
      
      // Usar requestAnimationFrame para garantir que o DOM atualizou
      requestAnimationFrame(() => {
        // Recalcular posição do calendário
        calculateCalendarPosition()
        // Abrir calendário customizado
        showCustomCalendar.value = true
      })
    }
  }
  
  /*
    Handler para quando o input perde foco
    Esta função é usada para processar quando o input perde foco.
    Ela verifica se o foco foi para o calendário antes de fechar, e atualiza isActive baseado no conteúdo do input.
    Usa um delay para permitir cliques no calendário e movimento do label.
  */
  const handleInputBlur = (event) => {
    // Verificar imediatamente se o foco foi para o calendário (relatedTarget)
    if (event.relatedTarget && calendarRef.value && calendarRef.value.contains(event.relatedTarget)) {
      return
    }
    
    // Delay para permitir cliques no calendário e movimento do label
    setTimeout(() => {
      // Obter o elemento ativo
      const activeElement = document.activeElement
      
      // Verificar se o calendário ainda está aberto
      if (showCustomCalendar.value) {
        // Verificar se o foco foi para o calendário
        if (calendarRef.value && calendarRef.value.contains(activeElement)) {
          return
        }
        
        // Verificar se o relatedTarget está dentro do calendário (pode ter mudado após re-renderização)
        if (event.relatedTarget && calendarRef.value && calendarRef.value.contains(event.relatedTarget)) {
          return
        }
        
        // Se o activeElement é body, pode ser que o foco foi para um elemento que foi re-renderizado
        // Verificar se há algum elemento dentro do calendário que pode ter recebido foco
        if (activeElement === document.body && calendarRef.value) {
          // Verificar se há algum elemento dentro do calendário que pode ter recebido foco
          const focusableElements = calendarRef.value.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
          
          // Verificar se há algum elemento dentro do calendário que pode ter recebido foco
          const hasFocusableElement = Array.from(focusableElements).some(el => el === document.activeElement || el.contains(document.activeElement))
          
          // Verificar se há algum elemento dentro do calendário que pode ter recebido foco
          if (hasFocusableElement) {
            return
          }
        }
      }
      
      // Verificar se o foco ainda está dentro do componente (incluindo o label)
      const componentElement = inputRef.value?.closest('.component')
      if (componentElement && componentElement.contains(activeElement)) {
        // Se ainda está dentro do componente, não fazer nada
        return
      }
      
      // Verificar se o foco está no próprio input (pode acontecer quando o label se move)
      if (inputRef.value === activeElement) {
        // Se o foco ainda está no input, não fazer nada
        return
      }
      
      // Se chegou aqui, o input perdeu o foco e não está em nenhum lugar relacionado
      // Atualizar isActive baseado no conteúdo do input
      // Sempre definir isActive como false quando perde o foco
      // O isLabelActive computed vai verificar se há conteúdo para decidir se o label fica ativo
      isActive.value = false
      
      // Fechar calendário customizado
      showCustomCalendar.value = false
      
      // Emitir evento blurred
      emit('blurred')
    }, 200) // Delay de 200ms para permitir cliques no calendário
  }
  
  /*
    Handler para quando o input é clicado
    Esta função é usada para processar quando o input é clicado.
    Ela recalcula a posição do calendário e abre/fecha o calendário customizado se necessário.
  */
  const handleInputClick = () => {
    // Verificar se deve usar calendário customizado
    if (shouldUseCustomCalendar.value) {
      // Sempre recalcular posição ao clicar, mesmo se já estiver aberto
      // Fechar primeiro para garantir que recalcule com valores atualizados
      const wasOpen = showCustomCalendar.value

      // Fechar calendário customizado
      showCustomCalendar.value = false
      
      // Usar requestAnimationFrame para garantir que o DOM atualizou
      requestAnimationFrame(() => {
        // Recalcular posição do calendário
        calculateCalendarPosition()
        // Abrir calendário customizado
        showCustomCalendar.value = true
      })
    }
  }
  /*
    Função auxiliar para converter Date para string YYYY-MM-DD sem problemas de timezone
    Esta função é usada para converter objetos Date para strings no formato YYYY-MM-DD usando valores locais.
    Ela evita problemas de timezone usando getFullYear(), getMonth() e getDate() em vez de toISOString().
  */
  const dateToISOString = (date) => {
    // Verificar se o date é null ou undefined ou não é uma instância de Date
    if (!date || !(date instanceof Date)) return null
    // Obter o ano, mês e dia da data
    const year = date.getFullYear()
    // Obter o mês e adicionar 1 porque getMonth() retorna 0-11
    const month = String(date.getMonth() + 1).padStart(2, '0')
    // Obter o dia e adicionar 0 à esquerda se necessário
    const day = String(date.getDate()).padStart(2, '0')
    // Retornar a data no formato YYYY-MM-DD
    return `${year}-${month}-${day}`
  }
  
  /*
    Função para validar se um valor é um formato de data válido para input-type="date"
    Aceita:
    - String no formato YYYY-MM-DD (formato nativo do input date)
    - String ISO com timezone (ex: 2026-01-09T00:00:00.000Z ou 2026-01-09T00:00:00+00:00)
    - Objeto Date
    - null/undefined (considerados como vazios, não inválidos)
    Retorna true se o valor é válido, false caso contrário
  */
  const isValidDateValue = (value) => {
    // null/undefined são considerados vazios (válidos, mas sem valor)
    if (value === null || value === undefined || value === '') return true
    
    // Se for objeto Date, verificar se é válido
    if (value instanceof Date) {
      return !isNaN(value.getTime())
    }
    
    // Se for string, verificar formatos aceitos
    if (typeof value === 'string') {
      // Formato nativo: YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        // Validar se a data é válida (ex: não aceitar 2026-13-45)
        const [year, month, day] = value.split('-').map(Number)
        const date = new Date(year, month - 1, day)
        return date.getFullYear() === year && 
               date.getMonth() === month - 1 && 
               date.getDate() === day
      }
      
      // Formato ISO com timezone (ex: 2026-01-09T00:00:00.000Z ou 2026-01-09T00:00:00+00:00)
      // Aceitar qualquer parte de tempo, desde que tenha a data
      const isoDateRegex = /^(\d{4}-\d{2}-\d{2})(T\d{2}:\d{2}(?::\d{2})?(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})?)?$/
      if (isoDateRegex.test(value) && value.includes('T')) {
        const date = new Date(value)
        return !isNaN(date.getTime())
      }
    }
    
    return false
  }
  
  /*
    Função para normalizar um valor de data para o formato YYYY-MM-DD
    Aceita os mesmos formatos que isValidDateValue
    Retorna string no formato YYYY-MM-DD ou string vazia se inválido ou vazio
  */
  const normalizeDateValue = (value) => {
    // null/undefined são tratados como vazios (retornam string vazia)
    if (value === null || value === undefined || value === '') return ''
    
    // Se for objeto Date, converter para YYYY-MM-DD
    if (value instanceof Date) {
      if (isNaN(value.getTime())) return ''
      return dateToISOString(value)
    }
    
    // Se for string, processar
    if (typeof value === 'string') {
      // Formato nativo: YYYY-MM-DD - manter como está
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        // Validar se a data é válida
        const [year, month, day] = value.split('-').map(Number)
        const date = new Date(year, month - 1, day)
        if (date.getFullYear() === year && 
            date.getMonth() === month - 1 && 
            date.getDate() === day) {
          return value
        }
        return '' // Data inválida
      }
      
      // Formato ISO com timezone - converter para timezone local e depois para YYYY-MM-DD
      const isoDateRegex = /^(\d{4}-\d{2}-\d{2})(T\d{2}:\d{2}(?::\d{2})?(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})?)?$/
      if (isoDateRegex.test(value)) {
        const date = new Date(value)
        if (!isNaN(date.getTime())) {
          return dateToISOString(date)
        }
        return ''
      }
    }
    
    // Se não for nenhum formato aceito, retornar vazio
    return ''
  }
  
  /*
    Função para parsear data mínima ou máxima
    Esta função é usada para parsear uma data mínima ou máxima a partir de diferentes formatos.
  */
  const parseMinMaxDate = (value) => {
    if (!value) return null
    if (value instanceof Date) {
      const date = new Date(value.getTime())
      date.setHours(0, 0, 0, 0)
      return date
    }
    if (typeof value === 'string') {
      // Para strings no formato YYYY-MM-DD, criar data local (não UTC)
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [year, month, day] = value.split('-').map(Number)
        const date = new Date(year, month - 1, day)
        date.setHours(0, 0, 0, 0)
        return date
      }
      // Para outros formatos, tentar parse normal
      const date = new Date(value)
      if (!isNaN(date.getTime())) {
        date.setHours(0, 0, 0, 0)
        return date
      }
    }
    return null
  }
  
  /*
    Função para parsear tempo mínimo ou máximo
    Esta função é usada para parsear um tempo mínimo ou máximo a partir de diferentes formatos.
  */
  const parseTimeMinMax = (value) => {
    if (!value) return null
    
    // Se for objeto Date, extrair hora, minuto e segundo
    if (value instanceof Date && !isNaN(value.getTime())) {
      const hour = value.getHours()
      const minute = value.getMinutes()
      const second = value.getSeconds()
      
      // Validar valores
      if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && second >= 0 && second <= 59) {
        return { hour, minute, second }
      }
    }
    
    // Se for string, processar
    if (typeof value === 'string') {
      // Para datetime-local, pode estar no formato YYYY-MM-DDTHH:mm ou YYYY-MM-DDTHH:mm:ss
      // Extrair apenas a parte do tempo
      let timePart = value
      
      // Se contém 'T', separar data e hora
      if (value.includes('T')) {
        const parts = value.split('T')
        if (parts.length === 2) {
          timePart = parts[1]
        }
      }
      
      // Formato HH:mm ou HH:mm:ss
      const timeRegex = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/
      const match = timePart.match(timeRegex)
      
      if (match) {
        const hour = parseInt(match[1], 10)
        const minute = parseInt(match[2], 10)
        const second = match[3] ? parseInt(match[3], 10) : 0
        
        // Validar valores
        if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && second >= 0 && second <= 59) {
          return { hour, minute, second }
        }
      }
    }
    
    return null
  }
  
  /*
    Função para verificar se uma data está desabilitada (fora do range min/max)
    Esta função é usada para verificar se uma data está dentro do range permitido.
  */
  const isDateDisabled = (dateValue) => {
    if (!dateValue) return false
    
    // Converter para Date se for string
    let date = null
    if (dateValue instanceof Date) {
      date = new Date(dateValue.getTime())
      date.setHours(0, 0, 0, 0)
    } else if (typeof dateValue === 'string') {
      // Formato YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
        const [year, month, day] = dateValue.split('-').map(Number)
        date = new Date(year, month - 1, day)
        date.setHours(0, 0, 0, 0)
      } else {
        // Tentar parse normal
        date = new Date(dateValue)
        if (!isNaN(date.getTime())) {
          date.setHours(0, 0, 0, 0)
        } else {
          return true // Data inválida
        }
      }
    }
    
    if (!date || isNaN(date.getTime())) return true
    
    // Verificar min (datas antes do min são desabilitadas)
    const minDate = parseMinMaxDate(min.value)
    if (minDate) {
      const normalizedMin = new Date(minDate.getTime())
      normalizedMin.setHours(0, 0, 0, 0)
      if (date < normalizedMin) {
        return true
      }
    }
    
    // Verificar max (datas depois do max são desabilitadas)
    const maxDate = parseMinMaxDate(max.value)
    if (maxDate) {
      const normalizedMax = new Date(maxDate.getTime())
      normalizedMax.setHours(0, 0, 0, 0)
      if (date > normalizedMax) {
        return true
      }
    }
    
    return false
  }
  
  /*
    Função para verificar se um tempo está desabilitado (fora do range min/max)
    Esta função é usada para verificar se um tempo está dentro do range permitido.
  */
  const isTimeDisabled = (hour, minute, second = 0) => {
    // Converter tempo para segundos
    const timeInSeconds = hour * 3600 + minute * 60 + second
    
    // Verificar min (tempos antes do min são desabilitados)
    const timeMin = parseTimeMinMax(min.value)
    if (timeMin) {
      const minTime = timeMin.hour * 3600 + timeMin.minute * 60 + (timeMin.second || 0)
      if (timeInSeconds < minTime) {
        return true
      }
    }
    
    // Verificar max (tempos depois do max são desabilitados)
    const timeMax = parseTimeMinMax(max.value)
    if (timeMax) {
      const maxTime = timeMax.hour * 3600 + timeMax.minute * 60 + (timeMax.second || 0)
      if (timeInSeconds > maxTime) {
        return true
      }
    }
    
    return false
  }
  
  /*
    Função para verificar se um valor de data está em formato válido
    Esta função verifica se o valor está em um formato válido antes de verificar min/max.
  */
  const isValidDateFormat = (value, type) => {
    if (!value || value === '') return true // Vazio é válido
    
    if (type === 'date') {
      // Formato YYYY-MM-DD
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
      const [year, month, day] = value.split('-').map(Number)
      const date = new Date(year, month - 1, day)
      return date.getFullYear() === year && 
             date.getMonth() === month - 1 && 
             date.getDate() === day
    } else if (type === 'time') {
      // Formato HH:mm ou HH:mm:ss
      const timeRegex = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/
      const match = value.match(timeRegex)
      if (!match) return false
      const hour = parseInt(match[1], 10)
      const minute = parseInt(match[2], 10)
      const second = match[3] ? parseInt(match[3], 10) : 0
      return hour >= 0 && hour <= 23 && 
             minute >= 0 && minute <= 59 && 
             second >= 0 && second <= 59
    } else if (type === 'datetime-local') {
      // Formato YYYY-MM-DDTHH:mm ou YYYY-MM-DDTHH:mm:ss
      const parts = value.split('T')
      if (parts.length !== 2) return false
      const datePart = parts[0]
      const timePart = parts[1]
      return isValidDateFormat(datePart, 'date') && isValidDateFormat(timePart, 'time')
    } else if (type === 'month') {
      // Formato YYYY-MM
      if (!/^\d{4}-\d{2}$/.test(value)) return false
      const [year, month] = value.split('-').map(Number)
      return year >= 1900 && year <= 2100 && month >= 1 && month <= 12
    } else if (type === 'week') {
      // Formato YYYY-Www (ex: 2024-W01)
      if (!/^\d{4}-W\d{2}$/.test(value)) return false
      const [year, week] = value.split('-W').map(Number)
      return year >= 1900 && year <= 2100 && week >= 1 && week <= 53
    }
    
    return false
  }
  
  /*
    Função para verificar se o valor atual é válido e emitir evento valid
    Esta função é usada para verificar se o valor atual (data, tempo ou datetime) está dentro do range permitido.
    Ela emite o evento 'valid' com true ou false.
    
    IMPORTANTE: Valida o inputText.value original, não o inputValue.value normalizado.
    Se o inputText.value for inválido e foi normalizado para '', ainda deve ser considerado inválido.
  */
  const checkAndEmitValid = () => {
    let isValid = true
    
    // Verificar se o valor está vazio (null, undefined ou string vazia)
    const isEmpty = inputText.value === null || inputText.value === undefined || inputText.value === ''
    
    if (isEmpty) {
      // Se o campo é obrigatório (required=true), valor vazio é inválido
      // Se o campo não é obrigatório (required=false), valor vazio é válido (campo opcional)
      isValid = !required.value
      emit('valid', isValid)
      return
    }
    
    // PRIMEIRO: Verificar se o formato do valor ORIGINAL (inputText) é válido
    // Se o valor original não pode ser normalizado, é inválido
    if (inputType.value === 'date') {
      // Para date, verificar se o valor original pode ser normalizado
      const normalized = normalizeDateValue(inputText.value)
      if (normalized === '' && inputText.value !== '' && inputText.value !== null && inputText.value !== undefined) {
        // Valor original não era vazio mas foi normalizado para vazio = inválido
        emit('valid', false)
        return
      }
      // Se normalizado para vazio e original era vazio, é válido (já tratado acima)
      if (normalized === '') {
        emit('valid', true)
        return
      }
      // Verificar formato do valor normalizado
      if (!isValidDateFormat(normalized, inputType.value)) {
        emit('valid', false)
        return
      }
      // Verificar min/max
      isValid = !isDateDisabled(normalized)
    } else if (inputType.value === 'time') {
      // Para time, verificar formato diretamente
      if (!isValidDateFormat(inputText.value, inputType.value)) {
        emit('valid', false)
        return
      }
      // Se formato válido, verificar min/max
      const timeParts = inputText.value.split(':')
      if (timeParts.length >= 2) {
        const hour = parseInt(timeParts[0], 10) || 0
        const minute = parseInt(timeParts[1], 10) || 0
        const second = timeParts[2] ? parseInt(timeParts[2], 10) : 0
        isValid = !isTimeDisabled(hour, minute, second)
      }
    } else if (inputType.value === 'datetime-local') {
      // Para datetime-local, verificar se o valor original pode ser normalizado
      let normalized = inputText.value
      if (typeof inputText.value === 'string') {
        const plainRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/
        const isoRegex = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}(?::\d{2})?(?:\.\d{1,3})?)(?:Z|[+-]\d{2}:\d{2})?$/
        
        if (!plainRegex.test(inputText.value) && !isoRegex.test(inputText.value)) {
          // Valor não está em formato válido
          emit('valid', false)
          return
        }
        
        if (isoRegex.test(inputText.value)) {
          const date = new Date(inputText.value)
          if (isNaN(date.getTime())) {
            emit('valid', false)
            return
          }
        }
      } else if (inputText.value !== null && inputText.value !== undefined && inputText.value !== '') {
        // Tipo inválido para datetime-local
        emit('valid', false)
        return
      }
      
      // Se chegou aqui, formato é válido, verificar min/max usando inputValue normalizado
      if (inputValue.value) {
        const parts = inputValue.value.split('T')
        if (parts.length === 2) {
          const datePart = parts[0]
          const timePart = parts[1]
          
          // Verificar data
          const dateValid = !isDateDisabled(datePart)
          
          // Verificar tempo
          const timeParts = timePart.split(':')
          let timeValid = true
          if (timeParts.length >= 2) {
            const hour = parseInt(timeParts[0], 10) || 0
            const minute = parseInt(timeParts[1], 10) || 0
            const second = timeParts[2] ? parseInt(timeParts[2], 10) : 0
            timeValid = !isTimeDisabled(hour, minute, second)
          }
          
          isValid = dateValid && timeValid
        }
      }
    } else if (inputType.value === 'month') {
      // Para month, verificar formato
      if (!isValidDateFormat(inputText.value, inputType.value)) {
        emit('valid', false)
        return
      }
      // Verificar min/max (se houver)
      isValid = !isDateDisabled(inputText.value + '-01') // Adicionar dia para verificar
    } else if (inputType.value === 'week') {
      // Para week, verificar formato
      if (!isValidDateFormat(inputText.value, inputType.value)) {
        emit('valid', false)
        return
      }
      // Para week, não verificamos min/max por enquanto (pode ser implementado depois)
      isValid = true
    }
    
    // Emitir evento valid
    emit('valid', isValid)
  }
  
  /*
    Handler para quando o Calendar emite evento valid
    Esta função repassa o evento valid do Calendar para o componente pai.
  */
  const handleCalendarValid = (isValid) => {
    emit('valid', isValid)
  }
  
  /*
    Handler para quando o Calendar emite evento month-changed
    Esta função repassa o evento month-changed do Calendar para o componente pai.
  */
  const handleCalendarMonthChanged = (data) => {
    emit('month-changed', data)
  }
  
  /*
    Função auxiliar para converter Date para string no formato correto baseado no inputType
    Esta função é usada para converter objetos Date para strings no formato esperado pelo input HTML.
    Para date: YYYY-MM-DD
    Para time: HH:mm ou HH:mm:ss
    Para datetime-local: YYYY-MM-DDTHH:mm ou YYYY-MM-DDTHH:mm:ss
  */
  const dateToInputString = (date, type) => {
    // Se não for Date, retornar como está (já é string)
    if (!date || !(date instanceof Date)) return date || ''
    
    if (type === 'date') {
      return dateToISOString(date)
    } else if (type === 'time') {
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${hours}:${minutes}:${seconds}`
    } else if (type === 'datetime-local') {
      const datePart = dateToISOString(date)
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${datePart}T${hours}:${minutes}:${seconds}`
    } else if (type === 'month') {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      return `${year}-${month}`
    } else if (type === 'week') {
      // Para week, precisamos calcular a semana ISO
      // Por enquanto, retornar apenas a data
      return dateToISOString(date)
    }
    
    // Se não for nenhum tipo conhecido, retornar string vazia
    return ''
  }
  
  // Computed properties para converter min/max para string quando necessário (input nativo)
  const nativeMin = computed(() => {
    if (shouldUseCustomCalendar.value) return undefined
    return dateToInputString(min.value, inputType.value)
  })
  
  const nativeMax = computed(() => {
    if (shouldUseCustomCalendar.value) return undefined
    return dateToInputString(max.value, inputType.value)
  })
  
  // Computed para tornar o input readonly quando está usando calendário customizado
  // Isso força o usuário a usar o calendário para selecionar valores, garantindo validação correta
  const shouldBlockInputEdit = computed(() => {
    return true
  })
  
  /*
    Handler para quando o calendário emite evento changed
    Esta função é usada para processar mudanças no calendário e atualizar o inputValue e displayValue.
    Ela suporta diferentes tipos de input (date, month, time, datetime-local, week) e ranges.
    Quando um range é limpo (ambos null), limpa o input completamente.
  */
  const handleCalendarChanged = (value) => {
    // Converter o valor para o formato esperado pelo input
    let formattedValue = ''
    
    // Verificar se é null ou undefined (limpeza completa)
    if (!value) {
      // Se não houver valor, limpar tudo
      formattedValue = ''
    } else if (allowRange.value && typeof value === 'object' && !(value instanceof Date)) {
      // Verificar se é um range (objeto com startDate e endDate)
      // Verificar se é um range limpo (ambos null) ou range válido
      // IMPORTANTE: Um objeto com propriedades null ainda é truthy, então precisamos verificar explicitamente
      if (value.startDate === null && value.endDate === null) {
        // Range limpo - limpar tudo
        formattedValue = ''
      } else if (value.startDate || value.endDate) {
        // Para range, armazenar como objeto com strings ISO
        const rangeValue = {
          // Converter startDate para string ISO se existir
          startDate: value.startDate ? dateToISOString(value.startDate) : null,
          // Converter endDate para string ISO se existir
          endDate: value.endDate ? dateToISOString(value.endDate) : null
        }
        
        // Armazenar como JSON string para inputValue
        formattedValue = JSON.stringify(rangeValue)
      }
    } else if (inputType.value === 'date') {
      // Date object ou string YYYY-MM-DD
      if (value instanceof Date) {
        // Converter Date object para string ISO
        formattedValue = dateToISOString(value)
      } else if (typeof value === 'string') {
        // Já está em formato string, usar diretamente
        formattedValue = value
      }
    } else if (inputType.value === 'month') {
      // String YYYY-MM
      formattedValue = typeof value === 'string' ? value : ''
    } else if (inputType.value === 'time') {
      // String HH:mm ou HH:mm:ss
      formattedValue = typeof value === 'string' ? value : ''
    } else if (inputType.value === 'datetime-local') {
      // String YYYY-MM-DDTHH:mm ou YYYY-MM-DDTHH:mm:ss
      formattedValue = typeof value === 'string' ? value : ''
    } else if (inputType.value === 'week') {
      // String YYYY-Www
      formattedValue = typeof value === 'string' ? value : ''
    }
    
    // Marcar como atualização interna para evitar loops
    isInternalUpdate = true
    
    // Atualizar inputValue com o valor formatado
    inputValue.value = formattedValue
    
    // Atualizar displayValue com formato formatado para exibição
    const formatted = formattedValue ? formatDisplayValue(formattedValue, inputType.value) : ''
    displayValue.value = formatted
    
    // Salvar como último valor válido
    lastValidDisplayValue.value = formatted
    
    // NÃO atualizar isActive aqui - o calendário ainda está aberto
    // O isActive só será atualizado quando o calendário fechar (via handleInputBlur ou handleClickOutside)
  }
  
  /*
    Handler para quando o usuário digita no input
    Esta função é usada para processar mudanças quando o usuário digita no input.
    Ela valida o formato digitado, permite digitação livre para ranges, e atualiza o inputValue quando o formato está completo.
    Para ranges, permite digitação parcial e mantém o estado até que ambas as datas sejam válidas.
  */
  const handleInputChange = () => {
    // Verificar se deve usar calendário customizado
    if (!shouldUseCustomCalendar.value) {
      // Se não usar calendário customizado, manter comportamento padrão
      inputValue.value = displayValue.value
      return
    }
    
    // Marcar que usuário está digitando para evitar formatação automática
    isUserTyping = true
    
    // Salvar posição do cursor antes de qualquer mudança
    const cursorPos = inputRef.value ? {
      start: inputRef.value.selectionStart,
      end: inputRef.value.selectionEnd
    } : null
    
    // Obter o valor do input e remover espaços em branco
    const currentValue = displayValue.value.trim()
    
    // Se o input foi limpo, limpar também o inputValue e atualizar o calendário
    if (!currentValue || currentValue.length === 0) {
      // Marcar como atualização interna para evitar loops
      isInternalUpdate = true
      // Limpar o inputValue
      inputValue.value = ''
      // Limpar o displayValue
      displayValue.value = ''
      // Limpar o lastValidDisplayValue
      lastValidDisplayValue.value = ''
      // Resetar o isUserTyping após 50ms
      setTimeout(() => { isUserTyping = false }, 50)
      // Retornar
      return
    }
    
    // Para tipo date, validar formato
    if (inputType.value === 'date') {
      // Se allowRange está ativo, permitir formato de range também
      const dateRegex = allowRange.value 
        ? /^\d{1,2}\/\d{1,2}\/\d{4}$|^\d{4}-\d{1,2}-\d{1,2}$|^\d{1,2}\/\d{1,2}\/\d{4}\s*-\s*(\d{1,2}\/\d{1,2}\/\d{4})?$/
        : /^\d{1,2}\/\d{1,2}\/\d{4}$|^\d{4}-\d{1,2}-\d{1,2}$/
      
      // Se allowRange está ativo, permitir digitação livre até completar o range
      if (allowRange.value) {
        // Verificar se é um range completo (tem duas datas válidas)
        const rangeMatch = currentValue.match(/^(\d{1,2}\/\d{1,2}\/\d{4})\s*-\s*(\d{1,2}\/\d{1,2}\/\d{4})$/)

        // Verificar se é um range completo (tem duas datas válidas)
        if (rangeMatch) {
          // Range completo - permitir parsear
          // Não fazer return aqui, deixar continuar para parsear
        } else {
          // Não é range completo - deixar continuar para verificar se tem primeira data válida
          // Não fazer return aqui, deixar continuar para parsear como range incompleto
        }

        // Se tem mais de 23 caracteres (formato completo de range) e não está válido, reverter
        if (currentValue.length > 23 && !dateRegex.test(currentValue)) {
          // Reverter para o último valor válido
          displayValue.value = lastValidDisplayValue.value
          // Verificar se o cursor está posicionado corretamente
          if (cursorPos && inputRef.value) {
            // Usar nextTick para garantir que o DOM atualizou
            nextTick(() => {
              // Obter a posição do cursor
              const pos = Math.min(cursorPos.start, lastValidDisplayValue.value.length)
              // Definir a posição do cursor
              inputRef.value.setSelectionRange(pos, pos)
            })
          }
          // Resetar o isUserTyping após 50ms
          setTimeout(() => { isUserTyping = false }, 50)
          // Retornar
          return
        }
        // Se não está em formato válido mas ainda está sendo digitado, permitir digitação livre
        if (!dateRegex.test(currentValue) && currentValue.length <= 23) {
          // Resetar o isUserTyping após 50ms
          setTimeout(() => { isUserTyping = false }, 50)
          // Retornar
          return
        }
      } else {
        // Comportamento original para data simples
        // Se o valor tem mais de 10 caracteres e não está em formato válido, reverter
        if (currentValue.length > 10 && !dateRegex.test(currentValue)) {
          // Reverter para o último valor válido
          displayValue.value = lastValidDisplayValue.value
          // Restaurar posição do cursor
          if (cursorPos && inputRef.value) {
            // Usar nextTick para garantir que o DOM atualizou
            nextTick(() => {
              // Obter a posição do cursor
              const pos = Math.min(cursorPos.start, lastValidDisplayValue.value.length)
              // Definir a posição do cursor
              inputRef.value.setSelectionRange(pos, pos)
            })
          }
          // Resetar o isUserTyping após 50ms
          setTimeout(() => { isUserTyping = false }, 50)
          // Retornar
          return
        }
        
        // Se não está em formato válido mas ainda está sendo digitado, permitir digitação livre
        // NÃO formatar valores incompletos - esta é a chave para evitar formatação durante digitação
        if (!dateRegex.test(currentValue) && currentValue.length <= 10) {
          // Resetar o isUserTyping após 50ms
          setTimeout(() => { isUserTyping = false }, 50)
          // Retornar
          return
        }
      }
    }
    
    // Parsear o valor digitado para formato ISO
    // Mas só parsear se o valor estiver completo e válido
    let parsedValue = null
    
    // Para tipo date, só parsear se estiver em formato válido completo
    if (inputType.value === 'date') {
      // Se allowRange está ativo, sempre tratar como range (mesmo sem "-")
      if (allowRange.value) {
        // Verificar se tem duas datas válidas (range completo)
        const rangeMatch = currentValue.match(/^(\d{1,2}\/\d{1,2}\/\d{4})\s*-\s*(\d{1,2}\/\d{1,2}\/\d{4})$/)

        // Verificar se é um range completo (tem duas datas válidas)
        if (rangeMatch) {
          // Range completo - parsear
          parsedValue = parseInputValue(currentValue, inputType.value)
          // Se conseguiu parsear, atualizar inputValue
          if (parsedValue && parsedValue !== inputValue.value) {
            // Marcar como atualização interna para evitar loops
            isInternalUpdate = true
            // Atualizar inputValue com o valor parseado
            inputValue.value = parsedValue
            // Salvar como último valor válido
            lastValidDisplayValue.value = currentValue
          } else {
            // Se não conseguiu parsear, permitir continuar digitando
            setTimeout(() => { isUserTyping = false }, 50)
            // Retornar
            return
          }
        } else if (currentValue.includes('-')) {
          // Tem "-" mas não é range completo - pode estar digitando
          // Verificar se tem pelo menos a primeira data válida
          const firstDateMatch = currentValue.match(/^(\d{1,2}\/\d{1,2}\/\d{4})\s*-\s*$/)

          // Verificar se tem pelo menos a primeira data válida
          if (firstDateMatch) {
            // Tem primeira data válida mas não tem segunda - parsear como range com apenas startDate
            const firstDateStr = firstDateMatch[1]
            // Parsear a primeira data
            const firstDateParsed = parseInputValue(firstDateStr, inputType.value)

            // Verificar se a primeira data é válida
            if (firstDateParsed) {
              // Criar range com apenas startDate
              const rangeValue = JSON.stringify({ startDate: firstDateParsed, endDate: null })

              // Verificar se o rangeValue é diferente do inputValue
              if (rangeValue !== inputValue.value) {
                // Marcar como atualização interna para evitar loops
                isInternalUpdate = true
                // Atualizar inputValue com o valor parseado
                inputValue.value = rangeValue
                // Salvar como último valor válido
                lastValidDisplayValue.value = currentValue
              }
            } else {
              // Salvar como último valor válido
              lastValidDisplayValue.value = currentValue
              // Resetar o isUserTyping após 50ms
              setTimeout(() => { isUserTyping = false }, 50)
              // Retornar
              return
            }
          } else {
            // Range incompleto - não parsear ainda, apenas salvar
            lastValidDisplayValue.value = currentValue
            // Resetar o isUserTyping após 50ms
            setTimeout(() => { isUserTyping = false }, 50)
            // Retornar
            return
          }
        } else {
          // Não tem "-" mas allowRange está ativo - verificar se tem data válida
          const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$|^\d{4}-\d{1,2}-\d{1,2}$/

          // Verificar se tem data válida
          if (dateRegex.test(currentValue)) {
            // Tem data válida - parsear como range com apenas startDate
            parsedValue = parseInputValue(currentValue, inputType.value)

            // Verificar se a data é válida
            if (parsedValue) {
              // Criar range com apenas startDate
              const rangeValue = JSON.stringify({ startDate: parsedValue, endDate: null })

              // Verificar se o rangeValue é diferente do inputValue
              if (rangeValue !== inputValue.value) {
                // Marcar como atualização interna para evitar loops
                isInternalUpdate = true
                // Atualizar inputValue com o valor parseado
                inputValue.value = rangeValue
                // Salvar como último valor válido
                lastValidDisplayValue.value = currentValue
              }
            } else {
              // Salvar como último valor válido
              lastValidDisplayValue.value = currentValue
              // Resetar o isUserTyping após 50ms
              setTimeout(() => { isUserTyping = false }, 50)
              // Retornar
              return
            }
          } else {
            // Não está em formato válido - permitir digitação livre
            lastValidDisplayValue.value = currentValue
            // Resetar o isUserTyping após 50ms
            setTimeout(() => { isUserTyping = false }, 50)
            // Retornar
            return
          }
        }
      } else {
        // allowRange não está ativo - tratar como data simples
        const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$|^\d{4}-\d{1,2}-\d{1,2}$/

        // Só parsear se estiver em formato válido completo
        if (dateRegex.test(currentValue)) {
          // Parsear o valor digitado para formato ISO
          parsedValue = parseInputValue(currentValue, inputType.value)

          // Se conseguiu parsear, atualizar inputValue (formato ISO para o calendário)
          // Mas NÃO formatar o displayValue - deixar como o usuário digitou
          if (parsedValue && parsedValue !== inputValue.value) {
            // Marcar como atualização interna para evitar loops
            isInternalUpdate = true
            // Atualizar inputValue com o valor parseado
            inputValue.value = parsedValue
            // NÃO formatar displayValue - manter como o usuário digitou
            // Salvar como último valor válido (usar o valor digitado, não formatado)
            lastValidDisplayValue.value = currentValue
          }
        } else {
          // Se não está completo, não parsear nem formatar - permitir digitação livre
          // Não atualizar displayValue, deixar como está
          setTimeout(() => { isUserTyping = false }, 50)
          // Retornar
          return
        }
      }
    } else {
      // Para outros tipos, tentar parsear normalmente
      parsedValue = parseInputValue(currentValue, inputType.value)

      // Verificar se o parsedValue é diferente do inputValue
      if (parsedValue && parsedValue !== inputValue.value) {
        // Marcar como atualização interna para evitar loops
        isInternalUpdate = true
        // Atualizar inputValue com o valor parseado
        inputValue.value = parsedValue
        // Para outros tipos, manter displayValue como está (sem formatação automática)
        lastValidDisplayValue.value = currentValue
      }
    }
    
    // Resetar flag após processamento
    setTimeout(() => {
      // Resetar o isUserTyping após 50ms
      isUserTyping = false
    }, 50)
    // O emit será feito pelo watch de inputValue
  }
  
  /*
    Handler para quando o calendário emite evento date-selected
    Esta função é usada para processar eventos de seleção de data do calendário.
    Emite os eventos changed-complete e current-value-complete com os dados completos do calendário.
  */
  const handleCalendarDateSelected = (data) => {
    // Emitir evento changed-complete com os dados completos do calendário
    emit('changed-complete', data)
    // Emitir evento current-value-complete (mesmo valor, nome diferente para compatibilidade)
    emit('current-value-complete', data)
  }
  
  /*
    Handler para fechar calendário ao clicar fora
    Esta função é usada para fechar o calendário quando o usuário clica fora dele.
    Ela verifica se o clique foi dentro do calendário ou do componente antes de fechar.
    Também atualiza isActive para false se o input estiver vazio, fazendo o label voltar para dentro.
  */
  const handleClickOutside = (event) => {
    // Verificar PRIMEIRO se o calendário está aberto - se não estiver, não fazer nada
    // Isso evita processar eventos para DatePickers que não têm calendário aberto
    if (!showCustomCalendar.value) {
      return
    }
    
    // Verificar se as refs existem
    if (!calendarRef.value || !inputRef.value) {
      return
    }
    
    // Obter o elemento clicado
    const clickedElement = event.target
    
    // Verificar se o evento está relacionado a este componente específico
    // Verificar se o elemento clicado está dentro do wrapper deste componente
    const componentWrapper = inputRef.value?.closest('.nb-wrapper')
    
    // Se o componente não tem wrapper ou o clique não está relacionado a este componente,
    // ainda precisamos verificar se está dentro do calendário deste componente
    // Mas primeiro, vamos verificar se o clique está dentro do calendário deste componente
    if (calendarRef.value && calendarRef.value.contains(clickedElement)) {
      // Clique está dentro do calendário deste componente, não fechar
      return
    }
    
    // Verificar se o clique está dentro do wrapper do componente (incluindo label quando ativo)
    // Isso deve ser verificado ANTES de verificar event.defaultPrevented, pois o sidebar pode usar @click.prevent
    if (componentWrapper && (clickedElement === componentWrapper || componentWrapper.contains(clickedElement))) {
      // Clique está dentro do wrapper deste componente, não fechar
      return
    }
    
    // Não verificar event.defaultPrevented aqui, pois o sidebar pode usar @click.prevent
    // mas ainda queremos processar o clique para fechar o calendário se estiver fora do wrapper
    
    // Verificar imediatamente se está dentro do wrapper (antes de qualquer mudança de DOM)
    if (calendarRef.value && calendarRef.value.contains(clickedElement)) {
      return
    }
    
    // Verificar se o elemento clicado tem algum ancestral que seja o wrapper do calendário
    // Isso é importante porque quando o viewMode muda, o elemento pode ser re-renderizado
    let element = clickedElement
    while (element && element !== document.body) {
      if (element === calendarRef.value || (calendarRef.value && calendarRef.value.contains(element))) {
        return
      }
      element = element.parentElement
    }
    
    // Usar setTimeout com pequeno delay para garantir que o DOM foi atualizado após mudanças de viewMode
    setTimeout(() => {
      // Verificar novamente se o calendário ainda está aberto
      if (!showCustomCalendar.value || !calendarRef.value) {
        return
      }
      
      // Verificar novamente se o clique ainda está dentro do wrapper
      // (o elemento pode ter mudado após re-renderização do Vue)
      if (calendarRef.value && calendarRef.value.contains(clickedElement)) {
        return
      }
      
      // Verificar novamente subindo a árvore DOM (o elemento pode ter sido re-renderizado)
      element = clickedElement

      // Verificar novamente subindo a árvore DOM (o elemento pode ter sido re-renderizado)
      while (element && element !== document.body) {
        // Verificar se o elemento é o calendário ou se está dentro do calendário
        if (element === calendarRef.value || (calendarRef.value && calendarRef.value.contains(element))) {
          return
        }

        // Subir a árvore DOM
        element = element.parentElement
      }
      
      // Verificar se o elemento ainda está no DOM (pode ter sido removido durante re-renderização)
      if (!document.body.contains(clickedElement)) {
        return
      }
      
      // Verificar se clicou dentro do input deste componente especificamente
      const clickedInsideInput = inputRef.value && (
        clickedElement === inputRef.value || 
        inputRef.value.contains(clickedElement)
      )
      
      // Verificar se clicou dentro do wrapper do componente (incluindo label quando ativo)
      const clickedInsideWrapper = componentWrapper && (
        clickedElement === componentWrapper ||
        componentWrapper.contains(clickedElement)
      )
      
      // Só fechar se não clicou dentro do calendário, nem dentro do input, nem dentro do wrapper deste componente
      // Se clicar em outro DatePicker, o calendário atual fecha normalmente (o outro abrirá seu próprio calendário)
      if (!clickedInsideInput && !clickedInsideWrapper) {
        // Fechar calendário customizado
        showCustomCalendar.value = false
        // Verificar se o input estiver vazio
        // Se o input estiver vazio, atualizar isActive para false para que o label volte para dentro
        if (!displayValue.value || displayValue.value.trim().length === 0) {
          // Atualizar isActive para false para que o label volte para dentro
          isActive.value = false
        }
      }
    }, 50) // Pequeno delay para permitir que o Vue atualize o DOM
  }
  
  /*
    Handler para recalcular posição do calendário ao fazer scroll
    Esta função é usada para recalcular a posição do calendário quando a página é rolada.
    Ela só recalcula se o calendário estiver aberto e se o calendário customizado estiver ativo.
  */
  const handleScroll = () => {
    // Verificar se o calendário estiver aberto e se o calendário customizado estiver ativo
    if (showCustomCalendar.value && shouldUseCustomCalendar.value) {
      // Recalcular posição do calendário
      calculateCalendarPosition()
    }
  }
  
  /*
    Handler para recalcular posição ao redimensionar a janela
    Esta função é usada para fechar o calendário quando a janela é redimensionada.
    Isso evita problemas de posicionamento e melhora a experiência do usuário.
  */
  const handleResize = () => {
    // Verificar se o calendário estiver aberto e se o calendário customizado estiver ativo
    if (showCustomCalendar.value && shouldUseCustomCalendar.value) {
      // Fechar calendário ao redimensionar para evitar problemas de posicionamento
      showCustomCalendar.value = false
    }
  }
  
  // Variáveis para controle de observadores e animação
  let resizeObserver = null // Observer para mudanças de tamanho do input
  let positionObserver = null // Observer para mudanças de posição do input
  let animationFrameId = null // ID do frame de animação para tracking contínuo
  let lastPosition = { top: 0, left: 0 } // Última posição conhecida do calendário
  
  /*
    Função para atualizar posição do calendário continuamente
    Esta função é usada para atualizar a posição do calendário continuamente usando requestAnimationFrame.
    Ela só atualiza se a posição mudou, evitando re-renderizações desnecessárias.
  */
  const updatePositionContinuously = () => {
    // Verificar se o calendário estiver aberto e se o calendário customizado estiver ativo e se o inputRef existe
    if (!showCustomCalendar.value || !shouldUseCustomCalendar.value || !inputRef.value) {
      return
    }
    
    // Obter o espaçamento entre o input e o calendário
    const spacing = 4
    
    // Como o calendário é renderizado no body via Teleport, sempre usar coordenadas da viewport
    const inputRect = inputRef.value.getBoundingClientRect()
    
    const newTop = `${inputRect.bottom + spacing}px`
    const newLeft = `${inputRect.left}px`
    
    // Só atualizar se a posição mudou
    if (lastPosition.top !== newTop || lastPosition.left !== newLeft) {
      // Atualizar a última posição top
      lastPosition.top = newTop
      // Atualizar a última posição left
      lastPosition.left = newLeft
      // Atualizar a posição do calendário
      calendarPosition.value = {
        top: newTop,
        left: newLeft
      }
    }
    
    // Continuar o loop enquanto o calendário estiver aberto
    animationFrameId = requestAnimationFrame(updatePositionContinuously)
  }
  
  /*
    Função para iniciar tracking contínuo da posição
    Esta função é usada para iniciar o tracking contínuo da posição do calendário.
    Ela inicializa o loop de animação usando requestAnimationFrame.
  */
  const startPositionTracking = () => {
    // Verificar se o inputRef existe e se o calendário customizado estiver ativo
    if (!inputRef.value || !shouldUseCustomCalendar.value) return
    
    // Iniciar loop de animação para acompanhar posição continuamente
    lastPosition = { top: 0, left: 0 }

    // Atualizar a posição continuamente
    updatePositionContinuously()
    
    // ResizeObserver para detectar mudanças de tamanho/posição
    resizeObserver = new ResizeObserver(() => {
      // Verificar se o calendário customizado estiver ativo
      if (showCustomCalendar.value) {
        // Recalcular posição do calendário
        calculateCalendarPosition()
      }
    })
    
    // Observar o inputRef
    resizeObserver.observe(inputRef.value)
    
    // Observar também o componente pai (onde o label pode estar)
    const componentElement = inputRef.value.closest('.component')

    // Verificar se o componente pai existe
    if (componentElement) {
      // Observar o componente pai
      resizeObserver.observe(componentElement)
    }
  }
  
  /*
    Função para parar tracking contínuo da posição
    Esta função é usada para parar o tracking contínuo da posição do calendário.
    Ela cancela o loop de animação e desconecta os observers.
  */
  const stopPositionTracking = () => {
    // Verificar se o animationFrameId existe
    if (animationFrameId !== null) {
      // Cancelar o animationFrameId
      cancelAnimationFrame(animationFrameId)
      // Resetar o animationFrameId
      animationFrameId = null
    }

    // Verificar se o resizeObserver existe
    if (resizeObserver) {
      // Desconectar o resizeObserver
      resizeObserver.disconnect()
      // Resetar o resizeObserver
      resizeObserver = null
    }

    // Verificar se o positionObserver existe
    if (positionObserver) {
      // Desconectar o positionObserver
      positionObserver.disconnect()
      // Resetar o positionObserver
      positionObserver = null
    }
  }
  
  // Watch para iniciar/parar o tracking quando o calendário abre/fecha
  watch(showCustomCalendar, (isOpen) => {
    // Verificar se o calendário estiver aberto e se o calendário customizado estiver ativo
    if (isOpen && shouldUseCustomCalendar.value) {
      // Atualizar o DOM
      nextTick(() => {
        // Iniciar o tracking da posição
        startPositionTracking()
      })
    } else {
      // Parar o tracking da posição
      stopPositionTracking()
    }
  })
  
  onMounted(() => {
    let initialValue = inputText.value

    // Normalizar/validar valor inicial específico para date
    if (inputType.value === 'date') {
      initialValue = normalizeDateValue(inputText.value)
    }
    // Normalizar/validar valor inicial específico para datetime-local
    else if (inputType.value === 'datetime-local') {
      // null/undefined são tratados como vazios (não limpos)
      if (inputText.value === null || inputText.value === undefined || inputText.value === '') {
        initialValue = ''
      } else if (typeof inputText.value === 'string') {
        const plainRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/
        const isoRegex = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}(?::\d{2})?(?:\.\d{1,3})?)(?:Z|[+-]\d{2}:\d{2})?$/

        if (plainRegex.test(inputText.value)) {
          // Já está no formato esperado pelo input
          initialValue = inputText.value
        } else if (isoRegex.test(inputText.value)) {
          const date = new Date(inputText.value)
          if (!isNaN(date.getTime())) {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            const hours = String(date.getHours()).padStart(2, '0')
            const minutes = String(date.getMinutes()).padStart(2, '0')
            const seconds = String(date.getSeconds()).padStart(2, '0')

            const timePart = inputText.value.split('T')[1]?.split(/[Z+-]/)[0] || ''
            const hasSeconds = timePart.includes(':') && timePart.split(':').length >= 3
            initialValue = hasSeconds
              ? `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
              : `${year}-${month}-${day}T${hours}:${minutes}`
          } else {
            // Data inválida -> limpar
            initialValue = ''
          }
        } else {
          // String que não representa um datetime-local/ISO suportado -> limpar
          initialValue = ''
        }
      } else {
        // Qualquer outro tipo não é aceito para datetime-local
        initialValue = ''
      }
    }
    
    // Atualizar o inputValue com o valor normalizado/validado
    inputValue.value = initialValue

    // Inicializar displayValue com formato formatado
    displayValue.value = formatDisplayValue(inputText.value, inputType.value)

    // Adicionar evento de click para fechar o calendário customizado
    document.addEventListener('click', handleClickOutside, false) // false = bubble phase (padrão)

    // Adicionar evento de scroll para recalcular a posição do calendário
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true }) // true para capturar scroll em qualquer elemento, passive para melhor performance

    // Adicionar evento de resize para recalcular a posição do calendário
    window.addEventListener('resize', handleResize)
    
    // Verificar e emitir validade do valor inicial
    nextTick(() => {
      checkAndEmitValid()
    })
  })
  
  onUnmounted(() => {
    // Parar o tracking da posição
    startValue()
    
    // Parar o tracking da posição
    stopPositionTracking()
    
    // Remover evento de click para fechar o calendário customizado
    document.removeEventListener('click', handleClickOutside)
    
    // Remover evento de scroll para recalcular a posição do calendário
    window.removeEventListener('scroll', handleScroll, { capture: true, passive: true })

    // Remover evento de resize para recalcular a posição do calendário
    window.removeEventListener('resize', handleResize)
  })
  
  /*
    Watch para atualizar o currentType quando o inputType mudar
    Esta função é usada para atualizar o currentType quando o inputType mudar.
    Ela atualiza o currentType com o valor do inputType.
  */
  watch(inputType, value => {
    // Atualizar o currentType com o valor do inputType
    currentType.value = value
  }, { immediate: true })

  // Watch para atualizar displayValue quando locale mudar
  watch(locale, () => {
    // Verificar se o inputValue existe e se o calendário customizado estiver ativo
    if (inputValue.value && shouldUseCustomCalendar.value) {
      // Atualizar o displayValue com o valor do inputValue formatado
      displayValue.value = formatDisplayValue(inputValue.value, inputType.value)
    }
  })

  /*
    Watch para atualizar o inputValue e displayValue quando o inputText mudar
    Esta função é usada para atualizar o inputValue e displayValue quando o inputText mudar.
    Ela atualiza o inputValue com o valor do inputText e o displayValue com o valor do inputText formatado.
  */
  /*
    Wrapper para formatISOString usando função utilitária com prop
  */
  const formatISOString = (date) => {
    return formatISOStringUtil(date, props.calendarIsoStringTimezoneFormat)
  }

  /*
    Função para construir objeto completo a partir do inputText usando função utilitária
  */
  const buildCompleteDataFromInputText = (value) => {
    return buildCompleteDataFromInputTextUtil(value, {
      inputType: inputType.value,
      hasSeconds: props.hasSeconds,
      allowRange: allowRange.value,
      timezoneFormat: props.calendarIsoStringTimezoneFormat,
      locale: props.calendarLocale
    })
  }

  watch(inputText, value => {
      // Verificar se o valor do inputText é diferente do inputValue
    if (value !== inputValue.value) {
      let nextValue = value

      // Para date, normalizar ou limpar o valor se não for suportado
      if (inputType.value === 'date') {
        nextValue = normalizeDateValue(value)
      }
      // Para datetime-local, normalizar ou limpar o valor se não for suportado
      else if (inputType.value === 'datetime-local') {
        // null/undefined são tratados como vazios (não limpos)
        if (value === null || value === undefined || value === '') {
          nextValue = ''
        } else if (typeof value === 'string') {
          const plainRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/
          const isoRegex = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}(?::\d{2})?(?:\.\d{1,3})?)(?:Z|[+-]\d{2}:\d{2})?$/

          if (plainRegex.test(value)) {
            // Já está no formato nativo do input, manter como está
            nextValue = value
          } else if (isoRegex.test(value)) {
            // ISO com timezone -> converter para datetime-local no timezone local
            const date = new Date(value)
            if (!isNaN(date.getTime())) {
              const year = date.getFullYear()
              const month = String(date.getMonth() + 1).padStart(2, '0')
              const day = String(date.getDate()).padStart(2, '0')
              const hours = String(date.getHours()).padStart(2, '0')
              const minutes = String(date.getMinutes()).padStart(2, '0')
              const seconds = String(date.getSeconds()).padStart(2, '0')

              const timePart = value.split('T')[1]?.split(/[Z+-]/)[0] || ''
              const hasSeconds = timePart.includes(':') && timePart.split(':').length >= 3
              nextValue = hasSeconds
                ? `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
                : `${year}-${month}-${day}T${hours}:${minutes}`
            } else {
              // Data inválida -> limpar
              nextValue = ''
            }
          } else {
            // String que não é um datetime-local/ISO válido -> limpar
            nextValue = ''
          }
        } else {
          // Qualquer outro tipo não é aceito para datetime-local
          nextValue = ''
        }
      }

      // Atualizar o inputValue com o valor normalizado/validado
      inputValue.value = nextValue
      
      // Atualizar o displayValue com o valor do inputText formatado
      const formatted = formatDisplayValue(value, inputType.value)
      
      // Atualizar o lastValidDisplayValue com o valor do inputText formatado
      displayValue.value = formatted
      
      // Verificar e emitir validade após normalização
      nextTick(() => {
        checkAndEmitValid()
      })

      // Atualizar o lastValidDisplayValue com o valor do inputText formatado
      lastValidDisplayValue.value = formatted

      // Emitir eventos changed-complete e current-value-complete quando inputText muda
      const completeData = buildCompleteDataFromInputText(nextValue)
      if (completeData) {
        emit('changed-complete', completeData)
        emit('current-value-complete', completeData)
      }
    }
  }, { immediate: true })

  // Flag para indicar que o usuário está digitando
  let isUserTyping = false
  
  // Handler para keydown (marcar que usuário está digitando)
  /*
    Handler para quando o usuário pressiona uma tecla no input
    Esta função é usada para marcar que o usuário está digitando.
    Ela define isUserTyping como true e reseta após um tempo curto para evitar formatação automática durante a digitação.
  */
  const handleKeyDown = () => {
    // Marcar que o usuário está digitando
    isUserTyping = true

    // Resetar flag após um tempo curto
    setTimeout(() => {
      // Resetar flag após um tempo curto
      isUserTyping = false
    }, 100)
  }
  
  // Watch para sincronizar displayValue quando inputValue mudar externamente (mas não quando mudar por digitação)
  let isInternalUpdate = false

  /*
    Watch para atualizar o displayValue quando o inputValue mudar
    Esta função é usada para atualizar o displayValue quando o inputValue mudar.
    Ela atualiza o displayValue com o valor do inputValue formatado.
  */
  watch(() => inputValue.value, value => {
    // Não formatar automaticamente durante digitação ou atualizações internas
    // Só formatar quando vier de fonte externa (ex: calendário selecionado)
    if (shouldUseCustomCalendar.value && !isInternalUpdate && !isUserTyping) {
      // Quando vem do calendário, formatar normalmente
      const formatted = formatDisplayValue(value, inputType.value)

      // Verificar se o formatted é diferente do displayValue
      if (formatted !== displayValue.value) {
        // Atualizar o displayValue com o valor do inputValue formatado
        displayValue.value = formatted
        // Atualizar o lastValidDisplayValue com o valor do inputValue formatado
        lastValidDisplayValue.value = formatted
      }
    }

    // Resetar flag após processamento
    isInternalUpdate = false
  })

  /*
    Watch para atualizar o inputValue quando o inputValue mudar
    Esta função é usada para atualizar o inputValue quando o inputValue mudar.
    Ela atualiza o inputValue com o valor do inputValue.
  */
  watch(inputValue, value => {
    // Verificar se o hasTrim está ativo
    if (hasTrim.value) value = value.trim()
  
    // Se for range, parsear e emitir como objeto
    if (allowRange.value && typeof value === 'string' && value.startsWith('{')) {
      // Tentar parsear o valor como JSON
      try {
        // Parsear o valor como JSON
        const rangeValue = JSON.parse(value)

        // Verificar se o rangeValue tem startDate ou endDate
        if (rangeValue && (rangeValue.startDate || rangeValue.endDate)) {
          // Converter strings ISO para Date objects (usar parse local para evitar timezone)
          const parseLocalDate = (dateStr) => {
            // Verificar se a data é válida
            if (!dateStr) return null

            // Verificar se a data está no formato YYYY-MM-DD
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
              // Separar ano, mês e dia
              const [year, month, day] = dateStr.split('-').map(Number)

              // Converter a data para um Date object
              return new Date(year, month - 1, day)
            }

            // Converter a data para um Date object
            return new Date(dateStr)
          }

          // Converter a data inicial para um Date object
          const startDate = rangeValue.startDate ? parseLocalDate(rangeValue.startDate) : null

          // Converter a data final para um Date object
          const endDate = rangeValue.endDate ? parseLocalDate(rangeValue.endDate) : null

          // Emitir o evento changed com o startDate e endDate
          emit('changed', { startDate, endDate })

          // Retornar
          return
        }
      } catch (e) {
        // Se não conseguir parsear, emitir como está
      }
    }
    
    // Emitir o evento changed com o valor
    emit('changed', value)
  })

  /*
    Watch para emitir o evento focused quando o isActive mudar
    Esta função é usada para emitir o evento focused quando o isActive mudar.
    Ela emite o evento focused se o isActive for true e o evento blurred se o isActive for false.
  */
  watch(isActive, value => {
    // Verificar se o isActive está ativo
    if (value) {
      // Emitir o evento focused
      emit('focused')
    } else {
      // Emitir o evento blurred
      emit('blurred')
    }
  })

  /*
    Watch para emitir o evento current-value quando o inputValue mudar
    Esta função é usada para emitir o evento current-value quando o inputValue mudar.
    Ela emite o evento current-value com o valor do inputValue.
  */
  watch(inputValue, value => {
    // Verificar se o hasTrim está ativo
    if (hasTrim.value) value = value.trim()
  
    // Emitir o evento current-value com o valor
    emit('current-value', value)
    
    // Verificar e emitir validade quando o valor muda
    nextTick(() => {
      checkAndEmitValid()
    })
  })
  
  // Watch para min e max - quando mudarem, revalidar o valor atual
  watch([min, max], () => {
    nextTick(() => {
      checkAndEmitValid()
    })
  })
  // Watch removido - date picker não precisa de lógica especial para password
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
  
        .component__input {
          font-size: v-bind('fontSizeStyle');
        }
  
      }
      &.component__md {
        height: 48px;
        max-height: 48px;
  
        .component__input {
          font-size: v-bind('fontSizeStyle');
        }
      }
      &.component__lg {
        height: 58px;
        max-height: 58px;
  
        .component__input {
          font-size: v-bind('fontSizeStyle');
        }
      }
      // fim sizeMediaQuery
  
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
        .component__input {
          color: v-bind('darkTextColor');
        }
  
        &.component__input--disabled,
        &.component__input--read-only {
          &.component__input--background {
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
  
          &.component__input--line {
            .component__input {
              border-bottom: 1px solid v-bind('darkDisabledBgColor');
  
              &:focus,
              &:active {
                border-bottom: 1px solid v-bind('darkDisabledBgColor');
              }
            }
          }
  
          &.component__input--border {
            .component__input {
              border: 1px solid v-bind('darkDisabledBgColor');
  
              &:focus,
              &:active {
                border: 1px solid v-bind('darkDisabledBgColor');
              }
            }
          }
        }
  
        &.component__input--background {
          .component__input {
            background-color: v-bind('darkBgColor');
            color: v-bind('styleThemeTextColor');

            &:focus,
            &:active {
              background-color: v-bind('darkBgColorFocus');
              color: v-bind('styleThemeTextColor');

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

        &.component__input--line {
          .component__input {
            background-color: transparent;
            border: 0;
            border-bottom: 1px solid v-bind('styleBorderColor');
            color: v-bind('styleThemeTextColor');

            &:focus,
            &:active {
              background-color: transparent;
              border: 0;
              border-bottom: 1px solid v-bind('styleBorderColorFocus');
              color: v-bind('styleThemeTextColor');
            }
          }
        }

        &.component__input--border {
          .component__input {
            background-color: transparent;
            border: 1px solid v-bind('styleBorderColor');
            color: v-bind('styleThemeTextColor');

            &:focus,
            &:active {
              background-color: transparent;
              border: 1px solid v-bind('styleBorderColorFocus');
              color: v-bind('styleThemeTextColor');
            }
          }
        }
      }
      &.component__theme--light {
        .component__input {
          color: v-bind('lightTextColor');
        }
  
        &.component__input--disabled,
        &.component__input--read-only {
          &.component__input--background {
            .component__input {
              background-color: v-bind('lightDisabledBgColor');
              &:focus,
              &:active {
                background-color: v-bind('lightDisabledBgColor');
  
                &::placeholder,
                &::placeholder:active,
                &::placeholder:focus {
                  background-color: v-bind('lightDisabledBgColor');
                }
              }
  
              &::placeholder,
              &::placeholder:active,
              &::placeholder:focus {
                background-color: v-bind('lightDisabledBgColor');
              }
            }
          }
  
          &.component__input--line {
            .component__input {
              border-bottom: 1px solid v-bind('lightDisabledBgColor');
  
              &:focus,
              &:active {
                border-bottom: 1px solid v-bind('lightDisabledBgColor');
              }
            }
          }
  
          &.component__input--border {
            .component__input {
              border: 1px solid v-bind('lightDisabledBgColor');
  
              &:focus,
              &:active {
                border: 1px solid v-bind('lightDisabledBgColor');
              }
            }
          }
        }
  
        &.component__input--background {
          .component__input {
            background-color: v-bind('lightBgColor');
            color: v-bind('styleThemeTextColor');

            &:focus,
            &:active {
              background-color: v-bind('lightBgColorFocus');
              color: v-bind('styleThemeTextColor');

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

        &.component__input--line {
          .component__input {
            background-color: transparent;
            border: 0;
            border-bottom: 1px solid v-bind('styleBorderColor');
            color: v-bind('styleThemeTextColor');

            &:focus,
            &:active {
              background-color: transparent;
              border: 0;
              border-bottom: 1px solid v-bind('styleBorderColorFocus');
              color: v-bind('styleThemeTextColor');
            }
          }
        }

        &.component__input--border {
          .component__input {
            background-color: transparent;
            border: 1px solid v-bind('styleBorderColor');
            color: v-bind('styleThemeTextColor');

            &:focus,
            &:active {
              background-color: transparent;
              border: 1px solid v-bind('styleBorderColorFocus');
              color: v-bind('styleThemeTextColor');
            }
          }
        }
      }
      // fim propTheme
  
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
  
      .component__label {
        position: absolute;
        z-index: 1;
        pointer-events: none;

        .component__label--required {
          color: red;
          display: contents;
        }
      }
  
  
      // inicio INPUT
      .component__input {
        width: 100%;
        height: 100%;
        font-family: inherit;
        font-style: normal;
        font-weight: normal;
        font-size: v-bind('fontSizeStyle');
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

        // Esconder placeholders do date picker quando vazio (Chrome/Edge/Safari)
        &.component__input--empty:not(:focus)::-webkit-datetime-edit-text,
        &.component__input--empty:not(:focus)::-webkit-datetime-edit-month-field,
        &.component__input--empty:not(:focus)::-webkit-datetime-edit-day-field,
        &.component__input--empty:not(:focus)::-webkit-datetime-edit-year-field {
          color: transparent;
          opacity: 0;
        }
        
        // Mostrar quando focado ou quando tem valor (Chrome/Edge/Safari)
        &:focus::-webkit-datetime-edit-text,
        &:focus::-webkit-datetime-edit-month-field,
        &:focus::-webkit-datetime-edit-day-field,
        &:focus::-webkit-datetime-edit-year-field,
        &:not(.component__input--empty)::-webkit-datetime-edit-text,
        &:not(.component__input--empty)::-webkit-datetime-edit-month-field,
        &:not(.component__input--empty)::-webkit-datetime-edit-day-field,
        &:not(.component__input--empty)::-webkit-datetime-edit-year-field {
          color: v-bind('styleThemeTextColor');
          opacity: 1;
        }

        // Esconder placeholders do date picker quando vazio (Firefox)
        &.component__input--empty:not(:focus)::-moz-placeholder {
          color: transparent !important;
          opacity: 0 !important;
        }
        
        &.component__input--empty:not(:focus)::placeholder {
          color: transparent !important;
          opacity: 0 !important;
        }
        
        // Esconder texto padrão do Firefox quando vazio (dd/mm/aaaa)
        // Firefox mostra o placeholder como texto real, então precisamos esconder o texto quando vazio
        &.component__input--empty:not(:focus) {
          color: transparent;
        }
        
        // Mostrar quando focado (Firefox)
        &:focus {
          color: v-bind('styleThemeTextColor');
        }
        
        &:focus::-moz-placeholder,
        &:focus::placeholder {
          color: v-bind('styleThemeTextColor');
          opacity: 1;
        }
        
        // Mostrar quando tem valor (Firefox)
        &:not(.component__input--empty) {
          color: v-bind('styleThemeTextColor');
        }
        
        &:not(.component__input--empty)::-moz-placeholder,
        &:not(.component__input--empty)::placeholder {
          color: inherit;
          opacity: 1;
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
  
      opacity: 0.8;
  
      .component {
          --disabled-button-color: v-bind('styleButtonColor');
          --disabled-color: v-bind('styleThemeTextColor');
          background-color: var(--disabled-button-color) !important;
          border-radius: inherit;
  
      .component__input {
        &:focus,
        &:active {
          background-color: #f15574;
        }
      }
      }
  }
  
  .datepicker__custom-calendar-wrapper {
    /* position e z-index são definidos dinamicamente via :style="calendarPositionStyle" */
    /* Como é renderizado via Teleport no body, sempre usa position: fixed */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    margin-top: 4px;
  }
  </style>
  