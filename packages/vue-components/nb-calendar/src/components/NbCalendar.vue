<template>
    <div v-if="nbId" :class="['nb-wrapper', componentDisabled]" :style="[wrapperStyle]" :tabIndex="tabIndex" role="button" v-bind="computedAriaAttrs">
        <div :id="nbId" :class="['nb-reset', 'component', themeStyle]" :style="[componentStyle]">
            <div class="calendar-wrapper" :style="formattedWidth">
                <div class="calendar" :class="[scrollClass, { 'disabled': disabled }]">
                    <!-- Header com navegação -->
                    <div class="calendar__header">
                        <button
                            v-if="viewMode === 'calendar' && (inputType === 'date' || inputType === 'datetime-local' || inputType === 'week')"
                            class="calendar__nav-button" :disabled="disabled" @click="previousMonth" type="button">
                            &lt;
                        </button>
                        <button
                            v-if="(viewMode === 'year' || viewMode === 'month') && (inputType === 'date' || inputType === 'datetime-local' || inputType === 'week')"
                            class="calendar__nav-button" :disabled="disabled" @click="showCalendar" type="button">
                            ←
                        </button>
                        <!-- Botão voltar para modo month quando inputType é month -->
                        <button v-if="viewMode === 'year' && inputType === 'month'" class="calendar__nav-button"
                            :disabled="disabled" @click="(event) => showMonthPicker(event)" type="button">
                            ←
                        </button>
                        <button v-if="viewMode === 'time' && inputType === 'datetime-local'"
                            class="calendar__nav-button" :disabled="disabled" @click="backFromTimePicker" type="button">
                            ←
                        </button>
                        <button v-if="inputType === 'month' && viewMode === 'month'" class="calendar__nav-button"
                            :disabled="disabled" @click="previousYear" type="button">
                            &lt;
                        </button>
                        <div class="calendar__month-year" :key="`month-${calendarKey}`">
                            <button
                                v-if="viewMode === 'calendar' && (inputType === 'date' || inputType === 'datetime-local' || inputType === 'week')"
                                class="calendar__month-year-button" :disabled="disabled"
                                @click="(event) => showMonthPicker(event)" type="button">
                                {{ currentMonthName }}
                            </button>
                            <button
                                v-if="viewMode === 'calendar' && (inputType === 'date' || inputType === 'datetime-local' || inputType === 'week')"
                                class="calendar__month-year-button" :disabled="disabled"
                                @click="(event) => showYearPicker(event)" type="button">
                                {{ currentYear }}
                            </button>
                            <button v-if="inputType === 'month'" class="calendar__month-year-button"
                                :disabled="disabled" @click="(event) => showYearPicker(event)" type="button">
                                {{ currentYear }}
                            </button>
                            <div v-if="viewMode === 'month' && inputType === 'date'" class="calendar__view-title">
                                {{ currentYear }}
		</div>
                            <div v-if="viewMode === 'month' && inputType === 'datetime-local'"
                                class="calendar__view-title">
                                Selecione o mês
                            </div>
                            <div v-if="viewMode === 'year'" class="calendar__view-title">
                                Selecione o ano
                            </div>
                            <div v-if="viewMode === 'time'" class="calendar__view-title">
                                Selecione o horário
                            </div>
                        </div>
                        <button
                            v-if="viewMode === 'calendar' && (inputType === 'date' || inputType === 'datetime-local' || inputType === 'week')"
                            class="calendar__nav-button" :disabled="disabled" @click="nextMonth" type="button">
                            &gt;
                        </button>
                        <button v-if="inputType === 'month' && viewMode === 'month'" class="calendar__nav-button"
                            :disabled="disabled" @click="nextYear" type="button">
                            &gt;
                        </button>
                        <!-- Botão de limpar range -->
                        <button
                            v-if="allowRange && viewMode === 'calendar' && (inputType === 'date' || inputType === 'datetime-local') && selectedDateRange.startDate && selectedDateRange.endDate"
                            class="calendar__clear-button" :disabled="disabled" @click="clearRange" type="button" title="Limpar seleção">
                            ×
                        </button>
                    </div>

                    <!-- Grid de meses -->
                    <div v-if="viewMode === 'month'" class="calendar__month-grid" :class="[scrollClass]">
                        <button v-for="(month, index) in monthNames" :key="index" class="calendar__month-item" :class="{
                            'calendar__month-item--selected': inputType === 'month' ? isMonthSelected(index) : index === currentMonth,
                            'calendar__month-item--disabled': inputType === 'month' && isMonthDisabled(index)
                        }" :disabled="disabled || (inputType === 'month' && isMonthDisabled(index))"
                            @click="(event) => selectMonth(index, event)" type="button">
                            {{ getMonthAbbreviation(month) }}
                        </button>
                    </div>

                    <!-- Grid de anos -->
                    <div v-if="viewMode === 'year'" ref="yearGridRef" class="calendar__year-grid" :class="[scrollClass]">
                        <button v-for="year in availableYears" :key="year"
                            :ref="el => { if (year === currentYear) selectedYearButtonRef = el }"
                            :class="['calendar__year-item', year === currentYear ? 'calendar__year-item--selected' : '']"
                            :disabled="disabled" @click="(event) => selectYear(year, event)" type="button">
                            {{ year }}
                        </button>
                    </div>

                    <!-- Dias da semana (apenas no modo calendário e tipo date, datetime-local ou week) -->
                    <div v-if="viewMode === 'calendar' && (inputType === 'date' || inputType === 'datetime-local' || inputType === 'week')"
                        class="calendar__weekdays" :class="[scrollClass]">
                        <div v-for="day in weekDays" :key="day" class="calendar__weekday">
                            {{ day }}
                        </div>
                    </div>

                    <!-- Grid de datas (apenas no modo calendário e tipo date, datetime-local ou week) -->
                    <div v-if="viewMode === 'calendar' && (inputType === 'date' || inputType === 'datetime-local' || inputType === 'week')"
                        class="calendar__days" :key="`calendar-${calendarKey}`" :class="[scrollClass]">
                        <div v-for="(day, index) in calendarDays" :key="`day-${calendarKey}-${index}`"
                            class="calendar__day" :data-day-index="index" :class="{
                                'calendar__day--other-month': day.isOtherMonth,
                                'calendar__day--today': day.isToday,
                                'calendar__day--selected': day.isSelected,
                                'calendar__day--in-range': day.isInRange,
                                'calendar__day--range-start': day.isRangeStart,
                                'calendar__day--range-end': day.isRangeEnd,
                                'calendar__day--editing': day.isEditing,
                                'calendar__day--in-selected-week': inputType === 'week' && day.isInSelectedWeek,
                                'calendar__day--disabled': disabled || day.isDisabled,
                                'calendar__day--dragging': isDragging
                            }" :disabled="disabled || day.isDisabled" 
                            @click="selectDate(day)"
                            @mousedown="(event) => handleDayMouseDown(event, day)"
                            @mouseenter="handleDayMouseEnter(day)"
                            @mouseup="handleDayMouseUp"
                            @touchstart="(event) => handleDayTouchStart(event, day)"
                            @touchmove="handleDayTouchMove"
                            @touchend="handleDayTouchEnd">
                            <span class="calendar__day-number">{{ day.date }}</span>
                            <div v-if="day.events && day.events.length > 0" class="calendar__day-events">
                                <span v-for="(event, eventIndex) in day.events" :key="eventIndex"
                                    class="calendar__day-event-dot"
                                    :style="{ backgroundColor: event.color || primaryColor }" />
                            </div>
                        </div>
                    </div>

                    <!-- Seletor de tempo (tipo time ou datetime-local) - apenas quando viewMode === 'time' -->
                    <div v-if="viewMode === 'time' && (inputType === 'time' || inputType === 'datetime-local')"
                        class="calendar__time-picker" :class="[scrollClass]">
                        <div class="calendar__time-field calendar__time-field--hours">
                            <button class="calendar__time-arrow calendar__time-arrow--up"
                                :disabled="disabled || isHourIncrementDisabled" @click.stop.prevent="incrementHour"
                                @touchstart.stop="incrementHour" type="button" data-field="hour"
                                data-action="increment">
                                ▲
                            </button>
                            <div class="calendar__time-value">{{ formatTimeValue(selectedHour) }}</div>
                            <button class="calendar__time-arrow calendar__time-arrow--down"
                                :disabled="disabled || isHourDecrementDisabled" @click.stop.prevent="decrementHour"
                                @touchstart.stop="decrementHour" type="button" data-field="hour"
                                data-action="decrement">
                                ▼
                            </button>
                        </div>
                        <div class="calendar__time-separator">:</div>
                        <div class="calendar__time-field calendar__time-field--minutes">
                            <button class="calendar__time-arrow calendar__time-arrow--up"
                                :disabled="disabled || isMinuteIncrementDisabled" @click.stop.prevent="incrementMinute"
                                @touchstart.stop="incrementMinute" type="button" data-field="minute"
                                data-action="increment">
                                ▲
                            </button>
                            <div class="calendar__time-value">{{ formatTimeValue(selectedMinute) }}</div>
                            <button class="calendar__time-arrow calendar__time-arrow--down"
                                :disabled="disabled || isMinuteDecrementDisabled" @click.stop.prevent="decrementMinute"
                                @touchstart.stop="decrementMinute" type="button" data-field="minute"
                                data-action="decrement">
                                ▼
                            </button>
                        </div>
                        <template v-if="hasSeconds">
                            <div class="calendar__time-separator">:</div>
                            <div class="calendar__time-field">
                                <button class="calendar__time-arrow calendar__time-arrow--up"
                                    :disabled="disabled || isSecondIncrementDisabled" @click.stop="incrementSecond"
                                    type="button">
                                    ▲
                                </button>
                                <div class="calendar__time-value">{{ formatTimeValue(selectedSecond) }}</div>
                                <button class="calendar__time-arrow calendar__time-arrow--down"
                                    :disabled="disabled || isSecondDecrementDisabled" @click.stop="decrementSecond"
                                    type="button">
                                    ▼
                                </button>
                            </div>
                        </template>
                    </div>

                    <!-- Exibição da hora selecionada (tipo time ou datetime-local) - quando não está no modo time -->
                    <div v-if="viewMode !== 'time' && (inputType === 'time' || inputType === 'datetime-local')"
                        class="calendar__time-display" :class="[scrollClass]">
                        <div class="calendar__time-display-label">Horário:</div>
                        <div class="calendar__time-display-value">
                            {{ formatTimeValue(selectedHour) }}:{{ formatTimeValue(selectedMinute) }}{{ hasSeconds ? ':'
                                +
                            formatTimeValue(selectedSecond) : '' }}
                        </div>
                        <button class="calendar__time-edit-button" :disabled="disabled"
                            @click="(event) => showTimePicker(event)" type="button">
                            Editar
                        </button>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script setup>
import { ref, computed, watch, onBeforeMount, onMounted, onUnmounted, nextTick, toRefs } from 'vue'

defineOptions({
    name: 'NbCalendar',
	inheritAttrs: false
})

const emit = defineEmits([
    'changed',
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
			const currentValue = value ? value.toLowerCase() : ''
			return ['b', 'ib'].includes(currentValue)
		}
	},
  ariaLabel: {
    type: String,
        default: 'Calendar'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
	},
	tabIndex: {
    type: Number,
    default: 0
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
            return !value ? 400 : value
        }
    },
    value: { // valor inicial do calendário (aceita null/undefined, Date, string ou objeto) se tiver valor inicial, o calendário será inicializado com o valor inicial
        type: [Date, String, Object],
        default: null,
        validator: (value) => {
            // Aceitar null/undefined
            if (value === null || value === undefined) return true
            // Aceitar Date
            if (value instanceof Date) return true
            // Aceitar string
            if (typeof value === 'string') return true
            // Aceitar objetos (será validado no parseValue)
            if (typeof value === 'object' && !Array.isArray(value)) return true
            return false
        }
    },
    isRequired: {
        type: Boolean,
        default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	width: { // largura do calendário em pixels
        type: Number,
        default: 350,
		validator: value => {
            return typeof value === 'number' && value >= 350
        }
    },
    widthFull: { // se true, o calendário ocupará a largura total do container
        type: Boolean,
        default: false,
		validator: value => {
            return typeof value === 'boolean' && [true, false].includes(value)
        }
    },
    disabled: {
		type: Boolean,
        default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
    theme: {
		type: String,
        default: 'light',
        validator: value => {
            return ['dark', 'light'].indexOf(value) !== -1
        }
	},
    primaryColor: {
		type: String,
        default: '#007bff',
		validator: value => {
            return typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
        }
	},
    selectionColor: {
		type: String,
        default: '#1976d2',
		validator: value => {
            return typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
        }
	},
    eventColor: {
		type: String,
        default: '#4caf50',
        validator: value => {
            return typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
        }
	},
    todayColor: {
		type: String,
        default: '#007bff',
        validator: value => {
            return typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
        }
    },
    hoverTextColor: {
        type: String,
        default: null,
		validator: value => {
            return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
        }
    },
    normalTextColor: {
        type: String,
        default: null,
        validator: value => {
            return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
        }
    },
    monthYearItemBg: {
        type: String,
        default: null,
		validator: value => {
            return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
        }
    },
    monthYearItemBgHover: {
        type: String,
        default: null,
		validator: value => {
            return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
        }
    },
    dayHoverBg: {
        type: String,
        default: null,
		validator: value => {
            return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
        }
    },
    dayHoverTextColor: {
        type: String,
        default: null,
        validator: value => {
            return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
        }
    },
    events: {
        type: Array,
        default: () => [],
		validator: value => {
            return Array.isArray(value) && value.every(event => {
                return event && event.date && (event.color || true)
            })
		}
	},
    startWeekOnMonday: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
    locale: {
		type: String,
        default: 'pt-BR',
		validator: value => {
            return ['pt-BR', 'en-US'].includes(value)
        }
    },
    goToDate: {
        type: [Date, String],
        default: null
    },
    allowRange: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
    editRange: {
		type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
    maxRangeDays: {
		type: Number,
        default: null,
        validator: value => {
            return value === null || (typeof value === 'number' && value > 0 && Number.isInteger(value))
        }
    },
    timeDisplayTextColor: {
        type: String,
        default: null,
		validator: value => {
            return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
        }
    },
    timeEditButtonBg: {
        type: String,
        default: null,
		validator: value => {
            return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
        }
    },
    timeEditButtonTextColor: {
        type: String,
        default: null,
		validator: value => {
            return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
		}
	},
    timeEditButtonBgHover: {
		type: String,
        default: null,
		validator: value => {
            return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
		}
	},
    timeEditButtonTextColorHover: {
		type: String,
        default: null,
		validator: value => {
            return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
        }
	},
    timeEditButtonBg: {
		type: String,
        default: null,
		validator: value => {
            return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
        }
    },
    timeEditButtonTextColor: {
        type: String,
        default: null,
        validator: value => {
            return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
        }
    },
    timeEditButtonBgHover: {
        type: String,
        default: null,
        validator: value => {
            return !value || (typeof value === 'string' && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^(rgb|rgba)\(/.test(value)))
        }
    },
    timeEditButtonTextColorHover: {
        type: String,
        default: null,
        validator: value => {
            return !value || (typeof value === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value))
        }
    },
    minYear: {
		type: Number,
        default: 1900,
		validator: value => {
            return typeof value === 'number' && value >= 0
		}
	},
    maxYear: {
		type: Number,
        default: 2100,
		validator: value => {
            return typeof value === 'number' && value >= 0
        }
    },
    min: {
        type: [Date, String],
        default: null
    },
    max: {
        type: [Date, String],
        default: null
    },
    step: {
        type: [String, Number],
        default: null
    },
    inputType: {
        type: String,
        default: 'date',
        validator: value => {
            return ['date', 'month', 'time', 'datetime-local', 'week'].includes(value)
        }
    },
    hasSeconds: {
        type: Boolean,
        default: false
	},
    borderRadius: {
        type: Number,
        default: 0
    },
	scrollClass: {
		type: String,
		default: ''
	}
})

const {
	display,
  ariaLabel,
  ariaAttrs,
  tabIndex,
	fontFamily,
	fontSize,
  fontWeight,
  disabled,
  theme,
  primaryColor,
  selectionColor,
  eventColor,
  todayColor,
  hoverTextColor,
  normalTextColor,
  monthYearItemBg,
  monthYearItemBgHover,
  dayHoverBg,
  dayHoverTextColor,
  timeDisplayTextColor,
  timeEditButtonBg,
  timeEditButtonTextColor,
  timeEditButtonBgHover,
  timeEditButtonTextColorHover,
  width,
  widthFull,
  borderRadius
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 400 : fontWeight.value
	const themeValue = !theme.value ? 'light' : theme.value
	const widthValue = !width.value || width.value < 350 ? 350 : width.value
	const primaryColorValue = !primaryColor.value ? '#007bff' : primaryColor.value
	const selectionColorValue = !selectionColor.value ? '#1976d2' : selectionColor.value
	const eventColorValue = !eventColor.value ? '#4caf50' : eventColor.value
	const todayColorValue = !todayColor.value ? '#007bff' : todayColor.value
	const hoverTextColorValue = !hoverTextColor.value ? null : hoverTextColor.value
	const normalTextColorValue = !normalTextColor.value ? null : normalTextColor.value
	const monthYearItemBgValue = !monthYearItemBg.value ? null : monthYearItemBg.value
	const monthYearItemBgHoverValue = !monthYearItemBgHover.value ? null : monthYearItemBgHover.value
	const dayHoverBgValue = !dayHoverBg.value ? null : dayHoverBg.value
	const dayHoverTextColorValue = !dayHoverTextColor.value ? null : dayHoverTextColor.value
	const timeDisplayTextColorValue = !timeDisplayTextColor.value ? null : timeDisplayTextColor.value
	const timeEditButtonBgValue = !timeEditButtonBg.value ? null : timeEditButtonBg.value
	const timeEditButtonTextColorValue = !timeEditButtonTextColor.value ? null : timeEditButtonTextColor.value
	const timeEditButtonBgHoverValue = !timeEditButtonBgHover.value ? null : timeEditButtonBgHover.value
	const timeEditButtonTextColorHoverValue = !timeEditButtonTextColorHover.value ? null : timeEditButtonTextColorHover.value
    
    const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value

	return {
		disabled: disabledValue,
		display: displayValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		theme: themeValue,
		width: widthValue,
		primaryColor: primaryColorValue,
		selectionColor: selectionColorValue,
		eventColor: eventColorValue,
		todayColor: todayColorValue,
		hoverTextColor: hoverTextColorValue,
		normalTextColor: normalTextColorValue,
		monthYearItemBg: monthYearItemBgValue,
		monthYearItemBgHover: monthYearItemBgHoverValue,
		dayHoverBg: dayHoverBgValue,
		dayHoverTextColor: dayHoverTextColorValue,
		timeDisplayTextColor: timeDisplayTextColorValue,
		timeEditButtonBg: timeEditButtonBgValue,
		timeEditButtonTextColor: timeEditButtonTextColorValue,
		timeEditButtonBgHover: timeEditButtonBgHoverValue,
		timeEditButtonTextColorHover: timeEditButtonTextColorHoverValue,
		borderRadius: borderRadiusValue
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

/*
    Computed para cor de seleção mais clara (usado na animação blink)
    Este computed é usado para definir a cor de fundo mais clara da seleção.
    Ele é usado para definir a cor de fundo mais clara da seleção.
*/
const selectionColorLight = computed(() => {
    const defaultValues = formatDefaultValues.value
    // Converter hex para RGB, aumentar brilho e converter de volta
    const hex = defaultValues.selectionColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const lightR = Math.min(255, r + 60)
    const lightG = Math.min(255, g + 60)
    const lightB = Math.min(255, b + 60)
    return `#${lightR.toString(16).padStart(2, '0')}${lightG.toString(16).padStart(2, '0')}${lightB.toString(16).padStart(2, '0')}`
})

/*
    Computed para cor de range (seleção com transparência)
    Este computed é usado para definir a cor de fundo do range de seleção.
    Ele é usado para definir a cor de fundo do range de seleção.
*/
const selectionColorRange = computed(() => {
	const defaultValues = formatDefaultValues.value
    const hex = defaultValues.selectionColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    return `rgba(${r}, ${g}, ${b}, 0.2)`
})

/*
    Computed para background dos itens de mês/ano
    Este computed é usado para definir o background dos itens de mês/ano.
    Ele é usado para definir o background dos itens de mês/ano.
*/
const monthYearItemBgComputed = computed(() => {
    const defaultValues = formatDefaultValues.value
    return defaultValues.monthYearItemBg || (defaultValues.theme === 'dark' ? '#2a2a2a' : '#f5f5f5')
})

/*
    Computed para background hover dos itens de mês/ano
    Este computed é usado para definir o background hover dos itens de mês/ano.
    Ele é usado para definir o background hover dos itens de mês/ano.
*/
const monthYearItemBgHoverComputed = computed(() => {
	const defaultValues = formatDefaultValues.value
    return defaultValues.monthYearItemBgHover || (defaultValues.theme === 'dark' ? '#333' : '#e0e0e0')
})

/*
    Computed para cor do texto normal
    Este computed é usado para definir a cor do texto normal.
    Ele é usado para definir a cor do texto normal.
*/
const normalTextColorComputed = computed(() => {
    const defaultValues = formatDefaultValues.value
    return defaultValues.normalTextColor || (defaultValues.theme === 'dark' ? '#e0e0e0' : '#333')
})

/*
    Computed para cor do texto no hover
    Este computed é usado para definir a cor do texto no hover.
    Ele é usado para definir a cor do texto no hover.
*/
const hoverTextColorComputed = computed(() => {
    const defaultValues = formatDefaultValues.value
    return defaultValues.hoverTextColor || defaultValues.primaryColor
})

/*
    Computed para background hover dos dias
    Este computed é usado para definir o background hover dos dias.
    Ele é usado para definir o background hover dos dias.
*/
const dayHoverBgComputed = computed(() => {
    const defaultValues = formatDefaultValues.value
    return defaultValues.dayHoverBg || (defaultValues.theme === 'dark' ? '#333' : '#f5f5f5')
})

/*
    Computed para cor do texto hover dos dias
    Este computed é usado para definir a cor do texto hover dos dias.
    Ele é usado para definir a cor do texto hover dos dias.
*/
const dayHoverTextColorComputed = computed(() => {
	const defaultValues = formatDefaultValues.value
    return defaultValues.dayHoverTextColor || (defaultValues.theme === 'dark' ? '#e0e0e0' : '#333')
})

/*
    Computed para background da seção de hora
    Este computed é usado para definir o background da seção de hora.
    Ele é usado para definir o background da seção de hora.
*/
const timeDisplayBgComputed = computed(() => {
    const defaultValues = formatDefaultValues.value
    return defaultValues.theme === 'dark' ? 'transparent' : '#f9f9f9'
})

/*
    Computed para cor do texto da seção de hora
    Este computed é usado para definir a cor do texto da seção de hora.
    Ele é usado para definir a cor do texto da seção de hora.
*/
const timeDisplayTextColorComputed = computed(() => {
	const defaultValues = formatDefaultValues.value
    return defaultValues.timeDisplayTextColor || (defaultValues.theme === 'dark' ? '#e0e0e0' : '#333')
})

/*
    Computed para background do botão de editar hora
    Este computed é usado para definir o background do botão de editar hora.
    Ele é usado para definir o background do botão de editar hora.
*/
const timeEditButtonBgComputed = computed(() => {
    const defaultValues = formatDefaultValues.value
    return defaultValues.timeEditButtonBg || defaultValues.selectionColor
})

/*
    Computed para cor do texto do botão de editar hora
    Este computed é usado para definir a cor do texto do botão de editar hora.
    Ele é usado para definir a cor do texto do botão de editar hora.
*/
const timeEditButtonTextColorComputed = computed(() => {
	const defaultValues = formatDefaultValues.value
    return defaultValues.timeEditButtonTextColor || '#fff'
})

/*
    Computed para background hover do botão de editar hora
    Este computed é usado para definir o background hover do botão de editar hora.
    Ele é usado para definir o background hover do botão de editar hora.
*/
const timeEditButtonBgHoverComputed = computed(() => {
    const defaultValues = formatDefaultValues.value
    return defaultValues.timeEditButtonBgHover || selectionColorHover.value
})

/*
    Computed para cor do texto hover do botão de editar hora
    Este computed é usado para definir a cor do texto hover do botão de editar hora.
    Ele é usado para definir a cor do texto hover do botão de editar hora.
*/
const timeEditButtonTextColorHoverComputed = computed(() => {
	const defaultValues = formatDefaultValues.value
    return defaultValues.timeEditButtonTextColorHover || '#fff'
})

/*
    Computed para cor de seleção no hover (versão mais escura)
    Este computed é usado para definir a cor de seleção no hover (versão mais escura).
    Ele é usado para definir a cor de seleção no hover (versão mais escura).
*/
const selectionColorHover = computed(() => {
    const defaultValues = formatDefaultValues.value
    const hex = defaultValues.selectionColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const darkR = Math.max(0, r - 30)
    const darkG = Math.max(0, g - 30)
    const darkB = Math.max(0, b - 30)
    return `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`
})

/*
    Computed properties para cores principais (para uso no CSS via v-bind)
    Este computed é usado para definir as cores principais (para uso no CSS via v-bind).
    Ele é usado para definir as cores principais (para uso no CSS via v-bind).
*/
const primaryColorComputed = computed(() => {
    return formatDefaultValues.value.primaryColor
})

/*
    Computed para cor de seleção
    Este computed é usado para definir a cor de seleção.
    Ele é usado para definir a cor de seleção.
*/
const selectionColorComputed = computed(() => {
    return formatDefaultValues.value.selectionColor
})

/*
    Computed para cor de evento
    Este computed é usado para definir a cor de evento.
    Ele é usado para definir a cor de evento.
*/
const eventColorComputed = computed(() => {
    return formatDefaultValues.value.eventColor
})

/*
    Computed para cor de hoje
    Este computed é usado para definir a cor de hoje.
    Ele é usado para definir a cor de hoje.
*/
const todayColorComputed = computed(() => {
    return formatDefaultValues.value.todayColor
})

const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.disabled
})

const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	return {
		display: defaultValues.display,
		width: widthFull.value ? '100%' : undefined,
		maxWidth: widthFull.value ? '100%' : undefined,
        minWidth: widthFull.value ? '350px' : undefined
	}
})

const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	return {
    margin: 0,
    padding: 0,
		lineHeight: '1.42857143',
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight,
		width: widthFull.value ? '100%' : 'fit-content',
		maxWidth: widthFull.value ? '100%' : undefined
	}
})

const font = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.font
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
  return Object.fromEntries(
    Object.entries(attrs).filter(([_, value]) => value !== undefined && value !== null)
  )
})

/*
    Computed para dias da semana
    Este computed é usado para definir os dias da semana.
    Ele é usado para definir os dias da semana.
*/
const weekDays = computed(() => {
    if (props.startWeekOnMonday) {
        return props.locale === 'pt-BR'
            ? ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM']
            : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    } else {
        return props.locale === 'pt-BR'
            ? ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']
            : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    }
})

/*
    Computed para nomes dos meses
    Este computed é usado para definir os nomes dos meses.
    Ele é usado para definir os nomes dos meses.
*/
const monthNames = computed(() => {
    if (props.locale === 'pt-BR') {
        return [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ]
    } else {
        return [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ]
    }
})

const currentDate = ref(new Date()) // Data atual
const calendarKey = ref(0) // Key para forçar atualização do calendário (para garantir reatividade)
const currentDateTimestamp = ref(Date.now()) // Timestamp para forçar reatividade (para garantir reatividade)
const selectedDate = ref(null) // Data selecionada
const selectedDateRange = ref({ startDate: null, endDate: null }) // Range selecionado (para permitir seleção de range)
const editingRangeDate = ref(null) // 'start' | 'end' | null (para permitir edição de range)
const isDragging = ref(false) // Flag para indicar se está arrastando (para permitir arrastar e soltar)
const draggingExtreme = ref(null) // 'start' | 'end' | null (para permitir arrastar e soltar)
const touchStartElement = ref(null) // Elemento onde o touch começou (para permitir arrastar e soltar)

/*
    Computed para ano atual
    Este computed é usado para definir o ano atual.
    Ele é usado para definir o ano atual.
*/
const currentYear = computed(() => {
    if (!currentDate.value || isNaN(currentDate.value.getTime())) {
        return new Date().getFullYear()
    }
    return currentDate.value.getFullYear()
})

/*
    Computed para mês atual
    Este computed é usado para definir o mês atual.
    Ele é usado para definir o mês atual.
*/
const currentMonth = computed(() => {
    if (!currentDate.value || isNaN(currentDate.value.getTime())) {
        return new Date().getMonth()
    }
    return currentDate.value.getMonth()
})

/*
    Computed para nome do mês atual
    Este computed é usado para definir o nome do mês atual.
    Ele é usado para definir o nome do mês atual.
*/
const currentMonthName = computed(() => {
    const month = currentMonth.value
    if (month < 0 || month > 11) {
        return monthNames.value[new Date().getMonth()]
    }
    return monthNames.value[month]
})

/*
    Computed para modo de visualização
    Este computed é usado para definir o modo de visualização.
    Ele é usado para definir o modo de visualização.

    Modo de visualização: 'calendar', 'month', 'year', 'time'
    Se inputType for 'month', começar no modo 'month'
    Se inputType for 'time', começar no modo 'time'
*/
const viewMode = ref(
    props.inputType === 'month' ? 'month' :
        props.inputType === 'time' ? 'time' :
            'calendar'
)
const yearGridRef = ref(null) // Ref para o grid de anos (para permitir scroll para o ano selecionado)
const selectedYearButtonRef = ref(null) // Ref para o botão selecionado (para permitir scroll para o ano selecionado)

// Estado para tipo 'time'
const selectedHour = ref(0) // Horas selecionadas
const selectedMinute = ref(0) // Minutos selecionados
const selectedSecond = ref(0) // Segundos selecionados

/*
    Computed para lista de anos disponíveis
    Este computed é usado para definir a lista de anos disponíveis.
    Ele é usado para definir a lista de anos disponíveis.

    Lista de anos disponíveis é um array de anos.
    Garantir que min <= max (para evitar erros)
    Iniciar o loop no ano inicial e terminar no ano final
    Adicionar cada ano ao array
    Retornar o array de anos
*/
const availableYears = computed(() => {
    const years = [] // Array de anos
    const min = props.minYear // Ano inicial
    const max = props.maxYear // Ano final

    // Garantir que min <= max
    const startYear = Math.min(min, max) // Ano inicial
    const endYear = Math.max(min, max) // Ano final

    // Iniciar o loop no ano inicial e terminar no ano final
    for (let year = startYear; year <= endYear; year++) {
        years.push(year) // Adicionar cada ano ao array
    }

    // Retornar o array de anos
    return years
})

/*
    Função para controlar a visualização do mês
    Este função é usado para controlar a visualização do mês.
    Ele é usado para controlar a visualização do mês.

    Se o componente estiver desabilitado, retornar
    Se o evento for válido, prevenir o comportamento padrão
    Prevenir a propagação do evento
    Prevenir a propagação imediata do evento
    Mudar o modo de visualização para 'month'
*/
const showMonthPicker = (event) => {
    // Se o componente estiver desabilitado, retornar
    if (props.disabled) return

    // Se o evento for válido, prevenir o comportamento padrão
    if (event) {
        // Prevenir o comportamento padrão
        event.preventDefault()
        // Prevenir a propagação do evento
        event.stopPropagation()
        // Prevenir a propagação imediata do evento
        event.stopImmediatePropagation()
    }

    // Mudar o modo de visualização para 'month'
    viewMode.value = 'month'
}

/*
    Função para voltar para o ano anterior
    Este função é usado para voltar para o ano anterior.
    Ele é usado para voltar para o ano anterior.
*/
const previousYear = () => {
    // Se o componente estiver desabilitado, retornar
    if (props.disabled) return

    // Criar uma nova data com o ano anterior
    const newDate = new Date(currentYear.value - 1, currentMonth.value, 1)

    // Atualizar a data atual
    currentDate.value = newDate
    
    // Atualizar o timestamp para forçar reatividade
    currentDateTimestamp.value = Date.now()
    
    // Incrementar o calendarKey para forçar reatividade
    calendarKey.value++
}

/*
    Função para avançar para o ano posterior
    Este função é usado para avançar para o ano posterior.
    Ele é usado para avançar para o ano posterior.
*/
const nextYear = () => {
    // Se o componente estiver desabilitado, retornar
    if (props.disabled) return

    // Criar uma nova data com o ano posterior
    const newDate = new Date(currentYear.value + 1, currentMonth.value, 1)

    // Atualizar a data atual
    currentDate.value = newDate

    // Atualizar o timestamp para forçar reatividade
    currentDateTimestamp.value = Date.now()

    // Incrementar o calendarKey para forçar reatividade
    calendarKey.value++
}

/*
    Função para mostrar o picker de anos
    Este função é usado para mostrar o picker de anos.
    Ele é usado para mostrar o picker de anos.
*/
const showYearPicker = (event) => {
    // Se o componente estiver desabilitado, retornar
    if (props.disabled) return

    // Se o evento for válido, prevenir o comportamento padrão
    if (event) {
        // Prevenir o comportamento padrão
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
    }

    // Mudar o modo de visualização para 'year'
    viewMode.value = 'year'

    // Aguardar o próximo tick e depois um pequeno delay para garantir que o DOM foi totalmente renderizado
    nextTick(() => {
        // Usar setTimeout para garantir que o DOM está totalmente renderizado, especialmente com múltiplas instâncias
        setTimeout(() => {
            scrollToSelectedYear() // Scroll para o ano selecionado
        }, 50)
    })
}

/*
    Função para scroll para o ano selecionado
    Este função é usado para scroll para o ano selecionado.
    Ele é usado para scroll para o ano selecionado.

    Se o grid ainda não existe, tentar novamente após um pequeno delay
    Se o botão selecionado e o grid existem, calcular a posição do botão dentro do scroll container (para posicionar o botão próximo ao topo com uma margem pequena)
    Posicionar o botão próximo ao topo com uma margem pequena
    Scroll para a posição calculada (para posicionar o botão próximo ao topo com uma margem pequena)
*/
const scrollToSelectedYear = () => {
    // Se o grid ainda não existe, tentar novamente após um pequeno delay
    if (!yearGridRef.value) {
        // Se o grid ainda não existe, tentar novamente após um pequeno delay
        setTimeout(() => {
            scrollToSelectedYear()
        }, 50)
        return
    }

    // Se o botão selecionado e o grid existem, calcular a posição do botão dentro do scroll container (para posicionar o botão próximo ao topo com uma margem pequena)
    if (selectedYearButtonRef.value && yearGridRef.value) {
        // Obter o botão selecionado e o grid
        const button = selectedYearButtonRef.value

        // Obter o grid
        const grid = yearGridRef.value

        // Verificar se os elementos têm dimensões válidas
        if (grid.clientHeight === 0 || button.offsetHeight === 0) {
            // Se ainda não tem dimensões, tentar novamente
            setTimeout(() => {
                scrollToSelectedYear()
            }, 50)
            return
        }

        // Usar getBoundingClientRect para calcular a posição relativa ao grid
        const gridRect = grid.getBoundingClientRect()
        const buttonRect = button.getBoundingClientRect()

        // Calcular a posição do botão dentro do scroll container
        const buttonTop = grid.scrollTop + (buttonRect.top - gridRect.top)

        // Posicionar o botão próximo ao topo com uma margem pequena
        const marginTop = 50
        const scrollPosition = buttonTop - marginTop

        // Scroll para a posição calculada (para posicionar o botão próximo ao topo com uma margem pequena)
        grid.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: 'smooth'
        })
    } else {
        // Se o botão selecionado ainda não foi encontrado, tentar novamente
        setTimeout(() => {
            scrollToSelectedYear()
        }, 50)
    }
}

/*
    Função para mostrar o calendário
    Este função é usado para mostrar o calendário.
    Ele é usado para mostrar o calendário.
*/
const showCalendar = () => {
    // Mudar o modo de visualização para 'calendar'
    viewMode.value = 'calendar'
}

/*
    Função para mostrar o picker de horário
    Este função é usado para mostrar o picker de horário.
    Ele é usado para mostrar o picker de horário.
*/
const showTimePicker = (event) => {
    // Se o componente estiver desabilitado, retornar
    if (props.disabled) return

    if (event) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
    }

    // Mudar o modo de visualização para 'time'
    viewMode.value = 'time'
}

// Para tipo 'time', não há calendário, então não precisa voltar
// Para tipo 'datetime-local', volta para o calendário
const backFromTimePicker = () => {
    // Se o inputType for 'datetime-local', mostrar o calendário
    if (props.inputType === 'datetime-local') {
        // Mostrar o calendário
        showCalendar()
    }
    // Para tipo 'time', não faz nada (ou pode manter no modo time) (não é necessário voltar para o calendário)
}

/*
    Função para limpar range selecionado
    Este função é usado para limpar range selecionado.
    Ele é usado para limpar range selecionado.
*/
const clearRange = (event) => {
    // Se o componente estiver desabilitado, retornar
    if (props.disabled) return

    if (event) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
    }
    
    // Limpar range selecionado
    selectedDateRange.value = { startDate: null, endDate: null }

    // Limpar o estado de edição de range
    editingRangeDate.value = null
    
    // Emitir evento com range limpo
    emit('changed', {
        startDate: null,
        endDate: null
    })

    // Emitir evento com range limpo
    emit('date-selected', {
        startDate: null,
        endDate: null,
        isRange: true,
        isoString: null,
        isoStringLocal: null
    })
}

/*
    Função para selecionar mês
    Este função é usado para selecionar mês.
    Ele é usado para selecionar mês.
*/
const selectMonth = (monthIndex, event) => {
    // Se o componente estiver desabilitado, retornar
    if (props.disabled) return

    // Se o evento for válido, prevenir o comportamento padrão
    if (event) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
    }

    // Se for inputType 'month', validar e emitir no formato YYYY-MM
    if (props.inputType === 'month') {
        // Se o mês estiver desabilitado, retornar
        if (isMonthDisabled(monthIndex)) return

        // Obter o ano atual
        const year = currentYear.value

        // Obter o mês atual
        const month = monthIndex + 1 // monthIndex é 0-based, mas precisamos 1-based para formato

        // Criar string do mês no formato YYYY-MM
        const monthString = `${year}-${String(month).padStart(2, '0')}`

        // Criar data do primeiro dia do mês para manter compatibilidade
        const newDate = new Date(year, monthIndex, 1)

        // Selecionar a data
        selectedDate.value = newDate

        // Emitir no formato YYYY-MM para tipo month
        emit('changed', monthString)

        // Emitir evento com data selecionada
        emit('date-selected', {
            date: newDate,
            dateString: monthString,
            month: monthIndex,
            year: year,
            monthName: monthNames.value[monthIndex],
            isoString: newDate.toISOString(),
            isoStringLocal: formatISOLocal(newDate)
        })

        return
    }

    // Comportamento normal para tipo 'date'
    // Criar nova data com o ano atual e o mês atual
    const newDate = new Date(currentYear.value, monthIndex, 1)

    // Atualizar a data atual
    currentDate.value = newDate

    // Atualizar o timestamp para forçar reatividade
    currentDateTimestamp.value = Date.now()

    // Incrementar o calendarKey para forçar reatividade
    calendarKey.value++

    // Mudar o modo de visualização para 'calendar'
    viewMode.value = 'calendar'

    // Emitir evento com mês selecionado
    emit('month-changed', {
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        monthName: monthNames.value[newDate.getMonth()]
    })
}

/*
    Função para selecionar ano
    Este função é usado para selecionar ano.
    Ele é usado para selecionar ano.
*/
const selectYear = (year, event) => {
    // Se o componente estiver desabilitado, retornar
    if (props.disabled) return

    // Se o evento for válido, prevenir o comportamento padrão
    if (event) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
    }

    // Criar nova data com o ano atual e o mês atual
    const newDate = new Date(year, currentMonth.value, 1)

    // Atualizar a data atual
    currentDate.value = newDate

    // Atualizar o timestamp para forçar reatividade
    currentDateTimestamp.value = Date.now()

    // Incrementar o calendarKey para forçar reatividade
    calendarKey.value++

    // Se for inputType 'month', voltar para o modo 'month' (grid de meses)
    // Caso contrário, voltar para 'calendar' (grid de dias)
    viewMode.value = props.inputType === 'month' ? 'month' : 'calendar'

    // Emitir evento com mês selecionado
    emit('month-changed', {
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        monthName: monthNames.value[newDate.getMonth()]
    })
}

/*
    Função para obter abreviação do mês
    Este função é usado para obter abreviação do mês.
    Ele é usado para obter abreviação do mês.
*/
const getMonthAbbreviation = (monthName) => {
    // Se o locale for 'pt-BR', retornar abreviação do mês em português
    if (props.locale === 'pt-BR') {
        // Criar objeto com abreviações dos meses em português
        const abbreviations = {
            'Janeiro': 'Jan',
            'Fevereiro': 'Fev',
            'Março': 'Mar',
            'Abril': 'Abr',
            'Maio': 'Mai',
            'Junho': 'Jun',
            'Julho': 'Jul',
            'Agosto': 'Ago',
            'Setembro': 'Set',
            'Outubro': 'Out',
            'Novembro': 'Nov',
            'Dezembro': 'Dez'
        }

        // Retornar abreviação do mês em português
        return abbreviations[monthName] || monthName.substring(0, 3)
    } else {
        // Retornar abreviação do mês em inglês
        return monthName.substring(0, 3)
    }
}

/*
    Função para formatar a largura
    Este função é usado para formatar a largura.
    Ele é usado para formatar a largura.
*/
const formattedWidth = computed(() => {
    // Se o widthFull for true, retornar a largura 100%
    if (widthFull.value) {
        // Retornar a largura 100%
        return {
            width: '100%',
            maxWidth: '100%',
            minWidth: '350px'
        }
    }

    // Obter a largura a ser usada
    const widthToUse = formatDefaultValues.value.width

    // Formatar a largura
    const newWidth = formatDimension(widthToUse)

    // Retornar a largura formatada
    return {
        width: newWidth
    }
})

/*
    Computed para dias do calendário
    Este computed é usado para definir os dias do calendário.
    Ele é usado para definir os dias do calendário.
*/
const calendarDays = computed(() => {
    // Forçar dependência explícita de currentDate e timestamp para garantir reatividade
    // Obter a data atual
    const dateRef = currentDate.value

    // Obter o timestamp
    const timestamp = currentDateTimestamp.value

    // Obter o ano atual
    const year = dateRef.getFullYear()

    // Obter o mês atual
    const month = dateRef.getMonth()

    // Obter o calendarKey para forçar atualização quando necessário
    const key = calendarKey.value

    // Criar o primeiro dia do mês
    const firstDay = new Date(year, month, 1)

    // Criar o último dia do mês
    const lastDay = new Date(year, month + 1, 0)

    // Obter o dia da semana do primeiro dia (0 = domingo, 1 = segunda, etc.)
    let firstDayOfWeek = firstDay.getDay()

    // Ajustar se a semana começa na segunda
    if (props.startWeekOnMonday) {
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
    }

    // Obter o último dia do mês anterior
    const daysInPreviousMonth = new Date(year, month, 0).getDate()

    // Criar array para dias
    const days = []

    // Criar data para hoje
    const today = new Date()

    // Definir as horas para 0
    today.setHours(0, 0, 0, 0)

    // Dias do mês anterior
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        // Obter o dia do mês anterior
        const date = daysInPreviousMonth - i

        // Criar data para o dia do mês anterior
        const dayDate = new Date(year, month - 1, date)

        // Definir as horas para 0
        dayDate.setHours(0, 0, 0, 0)

        // Obter o início da semana
        const weekStart = getWeekStartDate(dayDate)

        // Adicionar o dia ao array
        days.push({
            date,
            fullDate: dayDate,
            isOtherMonth: true,
            isToday: isSameDay(dayDate, today),
            isSelected: isDateSelected(dayDate),
            isInRange: isDateInRange(dayDate),
            isRangeStart: isDateRangeStart(dayDate),
            isRangeEnd: isDateRangeEnd(dayDate),
            isEditing: props.allowRange && props.editRange && editingRangeDate.value ? 
                (editingRangeDate.value === 'start' && isDateRangeStart(dayDate)) || 
                (editingRangeDate.value === 'end' && isDateRangeEnd(dayDate)) : false,
            isDisabled: isDateDisabled(dayDate),
            events: getEventsForDate(dayDate),
            weekStartDate: weekStart,
            weekEndDate: getWeekEndDate(dayDate),
            isInSelectedWeek: props.inputType === 'week' && selectedDate.value ? isDateInWeek(dayDate, selectedDate.value) : false
        })
    }

    // Adicionar os dias do mês atual
    for (let date = 1; date <= lastDay.getDate(); date++) {
        // Criar data para o dia do mês atual
        const dayDate = new Date(year, month, date)

        // Definir as horas para 0
        dayDate.setHours(0, 0, 0, 0)

        // Obter o início da semana
        const weekStart = getWeekStartDate(dayDate)

        // Adicionar o dia ao array
        days.push({
            date,
            fullDate: dayDate,
            isOtherMonth: false,
            isToday: isSameDay(dayDate, today),
            isSelected: isDateSelected(dayDate),
            isInRange: isDateInRange(dayDate),
            isRangeStart: isDateRangeStart(dayDate),
            isRangeEnd: isDateRangeEnd(dayDate),
            isEditing: props.allowRange && props.editRange && editingRangeDate.value ? 
                (editingRangeDate.value === 'start' && isDateRangeStart(dayDate)) || 
                (editingRangeDate.value === 'end' && isDateRangeEnd(dayDate)) : false,
            isDisabled: isDateDisabled(dayDate),
            events: getEventsForDate(dayDate),
            weekStartDate: weekStart,
            weekEndDate: getWeekEndDate(dayDate),
            isInSelectedWeek: props.inputType === 'week' && selectedDate.value ? isDateInWeek(dayDate, selectedDate.value) : false
        })
    }

    // Adicionar os dias do próximo mês para completar a grade
    // Total de células (6 semanas * 7 dias)
    const totalCells = 42

    // Obter o número de dias restantes para completar a grade
    const remainingDays = totalCells - days.length

    // Adicionar os dias do próximo mês para completar a grade
    for (let date = 1; date <= remainingDays; date++) {
        // Criar data para o dia do próximo mês
        const dayDate = new Date(year, month + 1, date)

        // Definir as horas para 0
        dayDate.setHours(0, 0, 0, 0)

        // Obter o início da semana
        const weekStart = getWeekStartDate(dayDate)

        // Adicionar o dia ao array
        days.push({
            date,
            fullDate: dayDate,
            isOtherMonth: true,
            isToday: isSameDay(dayDate, today),
            isSelected: isDateSelected(dayDate),
            isInRange: isDateInRange(dayDate),
            isRangeStart: isDateRangeStart(dayDate),
            isRangeEnd: isDateRangeEnd(dayDate),
            isEditing: props.allowRange && props.editRange && editingRangeDate.value ? 
                (editingRangeDate.value === 'start' && isDateRangeStart(dayDate)) || 
                (editingRangeDate.value === 'end' && isDateRangeEnd(dayDate)) : false,
            isDisabled: isDateDisabled(dayDate),
            events: getEventsForDate(dayDate),
            weekStartDate: weekStart,
            weekEndDate: getWeekEndDate(dayDate),
            isInSelectedWeek: props.inputType === 'week' && selectedDate.value ? isDateInWeek(dayDate, selectedDate.value) : false
        })
    }

    // Retornar os dias do calendário
    return days
})


const styleBorderRadius = computed(() => {
  const defaultValues = formatDefaultValues.value

  return `${defaultValues.borderRadius}rem`
})

/*
    Função para verificar se duas datas são iguais
    Este função é usado para verificar se duas datas são iguais.
    Ele é usado para verificar se duas datas são iguais.
*/
const isSameDay = (date1, date2) => {
    // Se a data1 ou data2 não forem válidas, retornar false
    if (!date1 || !date2) return false

    // Verificar se o ano, mês e dia são iguais
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
}

/*
    Função para verificar se uma data está selecionada
    Este função é usado para verificar se uma data está selecionada.
    Ele é usado para verificar se uma data está selecionada.
*/
const isDateSelected = (date) => {
    // Sempre verificar se é a data selecionada individualmente
    const isSelectedDate = selectedDate.value ? isSameDay(date, selectedDate.value) : false

    // Se está em modo range editável, não mostra como selected individual (só mostra o range)
    if (props.allowRange && props.editRange) {
        return false
    }

    // Para outros modos, mostrar seleção individual (pode estar dentro ou fora do range)
    return isSelectedDate
}

/*
    Função para verificar se uma data está dentro do range selecionado
    Esta função é usada para verificar se uma data está dentro do range selecionado.
    Ela é usada para verificar se uma data está dentro do range selecionado.
*/
const isDateInRange = (date) => {
    // Se não estiver em modo range, retornar false
    if (!props.allowRange) return false
    
    // Obter a data inicial do range
    const start = selectedDateRange.value.startDate
    
    // Obter a data final do range
    const end = selectedDateRange.value.endDate

    // Se não houver data inicial ou final, retornar false
    if (!start || !end) return false

    // Normalizar a data a ser verificada
    const normalized = normalizeDate(date)
    
    // Normalizar a data inicial
    const normalizedStart = normalizeDate(start)
    
    // Normalizar a data final
    const normalizedEnd = normalizeDate(end)

    // Se alguma normalização falhar, retornar false
    if (!normalized || !normalizedStart || !normalizedEnd) return false

    // Verificar se está entre start e end (excluindo os extremos)
    return normalized > normalizedStart && normalized < normalizedEnd
}

/*
    Função para verificar se uma data é o início do range selecionado
    Esta função é usada para verificar se uma data é o início do range selecionado.
    Ela é usada para verificar se uma data é o início do range selecionado.
*/
const isDateRangeStart = (date) => {
    // Se não estiver em modo range, retornar false
    if (!props.allowRange) return false
    
    // Obter a data inicial do range
    const start = selectedDateRange.value.startDate
    
    // Se não houver data inicial, retornar false
    if (!start) return false
    
    // Verificar se a data é igual ao início do range
    return isSameDay(date, start)
}

/*
    Função para verificar se uma data é o fim do range selecionado
    Esta função é usada para verificar se uma data é o fim do range selecionado.
    Ela é usada para verificar se uma data é o fim do range selecionado.
*/
const isDateRangeEnd = (date) => {
    // Se não estiver em modo range, retornar false
    if (!props.allowRange) return false
    
    // Obter a data final do range
    const end = selectedDateRange.value.endDate
    
    // Se não houver data final, retornar false
    if (!end) return false
    
    // Verificar se a data é igual ao fim do range
    return isSameDay(date, end)
}

/*
    Função para parsear data mínima ou máxima
    Esta função é usada para parsear uma data mínima ou máxima a partir de diferentes formatos.
    Ela é usada para parsear uma data mínima ou máxima a partir de diferentes formatos.
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

const minDate = computed(() => parseMinMaxDate(props.min))
const maxDate = computed(() => parseMinMaxDate(props.max))

/*
    Função para parsear o step em dias
    Esta função é usada para parsear o step em dias para input type="date".
    Ela é usada para parsear o step em dias para input type="date".
*/
const parseStep = () => {
    // Se não houver step definido, retornar null
    if (!props.step) return null
    
    // Converter step para número se for string
    const stepValue = typeof props.step === 'string' ? parseFloat(props.step) : props.step
    
    // Se o valor não for válido ou for menor ou igual a zero, retornar null
    if (isNaN(stepValue) || stepValue <= 0) return null
    
    // Step é em dias para input type="date"
    return Math.floor(stepValue)
}

const stepDays = computed(() => parseStep())

/*
    Função para parsear o step em segundos para tipo 'time'
    Esta função é usada para parsear o step em segundos para input type="time".
    Ela é usada para parsear o step em segundos para input type="time".
*/
const parseTimeStep = () => {
    if (!props.step) {
        // Se hasSeconds, padrão é 1 segundo, senão 1 minuto (60 segundos)
        return props.hasSeconds ? 1 : 60
    }
    const stepValue = typeof props.step === 'string' ? parseFloat(props.step) : props.step
    if (isNaN(stepValue) || stepValue <= 0) {
        return props.hasSeconds ? 1 : 60
    }
    // Step é em segundos para input type="time"
    // Se hasSeconds, retornar em segundos, senão converter para minutos
    if (props.hasSeconds) {
        return Math.max(1, Math.floor(stepValue))
    }
    return Math.max(1, Math.floor(stepValue / 60))
}

const timeStepSeconds = computed(() => {
    if (!props.hasSeconds) return 60 // Se não tem segundos, step é em minutos (60 segundos)
    return parseTimeStep()
})

const timeStepMinutes = computed(() => {
    if (props.hasSeconds) {
        // Se tem segundos, step de minutos é sempre 1 (incremento de 1 minuto)
        return 1
    }
    // Se não tem segundos, parseTimeStep() já retorna em minutos (já converteu segundos para minutos)
    // Então podemos usar diretamente o resultado
    return parseTimeStep()
})

/*
    Função para parsear tempo mínimo ou máximo
    Esta função é usada para parsear um tempo mínimo ou máximo a partir de diferentes formatos.
    Ela é usada para parsear um tempo mínimo ou máximo a partir de diferentes formatos.
*/
const parseTimeMinMax = (value) => {
    // Se não houver valor, retornar null
    if (!value) return null
    
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
        const parts = timePart.split(':')
        
        // Se tiver pelo menos hora e minuto
        if (parts.length >= 2) {
            // Parsear hora, minuto e segundo
            const hour = parseInt(parts[0], 10)
            const minute = parseInt(parts[1], 10)
            const second = parts[2] ? parseInt(parts[2], 10) : 0
            
            // Validar valores
            if (!isNaN(hour) && !isNaN(minute) && hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && second >= 0 && second <= 59) {
                return { hour, minute, second }
            }
        }
    }
    
    // Se não conseguir parsear, retornar null
    return null
}

const timeMin = computed(() => parseTimeMinMax(props.min))
const timeMax = computed(() => parseTimeMinMax(props.max))

/*
    Função para formatar valor de tempo com zero à esquerda
    Esta função é usada para formatar um valor de tempo com zero à esquerda (ex: 5 -> "05").
    Ela é usada para formatar um valor de tempo com zero à esquerda (ex: 5 -> "05").
*/
const formatTimeValue = (value) => {
    // Converter para string e adicionar zero à esquerda se necessário
    return String(value).padStart(2, '0')
}

/*
    Função para formatar data/hora ISO local (sem timezone)
    Esta função é usada para formatar uma data/hora no formato ISO local sem timezone.
    Ela é usada para formatar uma data/hora no formato ISO local sem timezone.
*/
const formatISOLocal = (date) => {
    if (!date || !(date instanceof Date)) return null
    const year = date.getFullYear()
    const month = formatTimeValue(date.getMonth() + 1)
    const day = formatTimeValue(date.getDate())
    const hours = formatTimeValue(date.getHours())
    const minutes = formatTimeValue(date.getMinutes())
    const seconds = formatTimeValue(date.getSeconds())
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

/*
    Função para incrementar a hora
    Esta função é usada para incrementar a hora selecionada.
    Ela é usada para incrementar a hora selecionada.
*/
const incrementHour = (event) => {
    // Se houver evento, prevenir comportamento padrão e propagação
    if (event) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
    }
    
    // Se estiver desabilitado ou incremento estiver desabilitado, retornar
    if (props.disabled || isHourIncrementDisabled.value) return
    
    // Incrementar hora
    let newHour = selectedHour.value + 1
    
    // Se passar de 23, voltar para 0
    if (newHour > 23) newHour = 0
    
    // Atualizar hora selecionada
    selectedHour.value = newHour
    
    // Emitir novo valor de tempo
    emitTimeValue()
}

/*
    Função para decrementar a hora
    Esta função é usada para decrementar a hora selecionada.
    Ela é usada para decrementar a hora selecionada.
*/
const decrementHour = (event) => {
    // Se houver evento, prevenir comportamento padrão e propagação
    if (event) {
        event.preventDefault()
        event.stopPropagation()
    }
    
    // Se estiver desabilitado ou decremento estiver desabilitado, retornar
    if (props.disabled || isHourDecrementDisabled.value) return
    
    // Decrementar hora
    let newHour = selectedHour.value - 1
    
    // Se passar de 0, voltar para 23
    if (newHour < 0) newHour = 23
    
    // Atualizar hora selecionada
    selectedHour.value = newHour
    
    // Emitir novo valor de tempo
    emitTimeValue()
}

/*
    Função para incrementar o minuto
    Esta função é usada para incrementar o minuto selecionado.
    Ela é usada para incrementar o minuto selecionado.
*/
const incrementMinute = (event) => {
    // Se houver evento, prevenir comportamento padrão e propagação
    if (event) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
    }
    
    // Se estiver desabilitado ou incremento estiver desabilitado, retornar
    if (props.disabled || isMinuteIncrementDisabled.value) return
    
    // Se houver step definido, arredondar para o próximo valor válido do step
    let newMinute
    if (timeStepMinutes.value > 1) {
        // Calcular o próximo múltiplo do step
        const currentStep = Math.floor(selectedMinute.value / timeStepMinutes.value)
        const nextStep = currentStep + 1
        newMinute = nextStep * timeStepMinutes.value
    } else {
        // Se step é 1, incrementar normalmente
        newMinute = selectedMinute.value + 1
    }
    
    // Garantir que seja um número inteiro
    newMinute = Math.floor(newMinute)
    
    // Se passar de 60, ajustar
    if (newMinute >= 60) {
        // Calcular resto da divisão por 60
        newMinute = newMinute % 60
        
        // Incrementar hora também se necessário
        if (selectedHour.value < 23) {
            selectedHour.value = selectedHour.value + 1
        } else {
            selectedHour.value = 0
        }
    }
    
    // Atualizar minuto selecionado
    selectedMinute.value = newMinute
    
    // Emitir novo valor de tempo
    emitTimeValue()
}

/*
    Função para decrementar o minuto
    Esta função é usada para decrementar o minuto selecionado.
    Ela é usada para decrementar o minuto selecionado.
*/
const decrementMinute = (event) => {
    // Se houver evento, prevenir comportamento padrão e propagação
    if (event) {
        event.preventDefault()
        event.stopPropagation()
    }
    
    // Se estiver desabilitado ou decremento estiver desabilitado, retornar
    if (props.disabled || isMinuteDecrementDisabled.value) return
    
    // Se houver step definido, arredondar para o valor válido anterior do step
    let newMinute
    if (timeStepMinutes.value > 1) {
        // Calcular o múltiplo do step anterior
        const currentStep = Math.floor(selectedMinute.value / timeStepMinutes.value)
        const prevStep = currentStep - 1
        newMinute = prevStep * timeStepMinutes.value
    } else {
        // Se step é 1, decrementar normalmente
        newMinute = selectedMinute.value - 1
    }
    
    // Garantir que seja um número inteiro
    newMinute = Math.floor(newMinute)
    
    // Se passar de 0, ajustar
    if (newMinute < 0) {
        // Calcular novo valor (60 + valor negativo)
        newMinute = 60 + newMinute
        
        // Decrementar hora também se necessário
        if (selectedHour.value > 0) {
            selectedHour.value = selectedHour.value - 1
        } else {
            selectedHour.value = 23
        }
    }
    
    // Atualizar minuto selecionado
    selectedMinute.value = newMinute
    
    // Emitir novo valor de tempo
    emitTimeValue()
}

/*
    Função para incrementar o segundo
    Esta função é usada para incrementar o segundo selecionado.
    Ela é usada para incrementar o segundo selecionado.
*/
const incrementSecond = () => {
    // Se estiver desabilitado ou incremento estiver desabilitado, retornar
    if (props.disabled || isSecondIncrementDisabled.value) return
    
    // Se houver step definido, arredondar para o próximo valor válido do step
    let newSecond
    if (timeStepSeconds.value > 1) {
        // Calcular o próximo múltiplo do step
        const currentStep = Math.floor(selectedSecond.value / timeStepSeconds.value)
        const nextStep = currentStep + 1
        newSecond = nextStep * timeStepSeconds.value
    } else {
        // Se step é 1, incrementar normalmente
        newSecond = selectedSecond.value + 1
    }
    
    // Garantir que seja um número inteiro
    newSecond = Math.floor(newSecond)
    
    // Obter valores atuais de minuto e hora
    let newMinute = selectedMinute.value
    let newHour = selectedHour.value

    // Se passar de 60 segundos, ajustar
    if (newSecond >= 60) {
        // Calcular minutos extras
        const extraMinutes = Math.floor(newSecond / 60)
        
        // Calcular resto da divisão por 60
        newSecond = newSecond % 60
        
        // Adicionar minutos extras
        newMinute = newMinute + extraMinutes

        // Se passar de 60 minutos, ajustar
        if (newMinute >= 60) {
            // Calcular horas extras
            const extraHours = Math.floor(newMinute / 60)
            
            // Calcular resto da divisão por 60
            newMinute = newMinute % 60
            
            // Adicionar horas extras
            newHour = newHour + extraHours

            // Se passar de 23 horas, ajustar
            if (newHour > 23) {
                newHour = newHour % 24
            }
        }
    }

    // Atualizar valores selecionados
    selectedSecond.value = newSecond
    selectedMinute.value = newMinute
    selectedHour.value = newHour
    
    // Emitir novo valor de tempo
    emitTimeValue()
}

/*
    Função para decrementar o segundo
    Esta função é usada para decrementar o segundo selecionado.
    Ela é usada para decrementar o segundo selecionado.
*/
const decrementSecond = () => {
    // Se estiver desabilitado ou decremento estiver desabilitado, retornar
    if (props.disabled || isSecondDecrementDisabled.value) return
    
    // Se houver step definido, arredondar para o valor válido anterior do step
    let newSecond
    if (timeStepSeconds.value > 1) {
        // Calcular o múltiplo do step anterior
        const currentStep = Math.floor(selectedSecond.value / timeStepSeconds.value)
        const prevStep = currentStep - 1
        newSecond = prevStep * timeStepSeconds.value
    } else {
        // Se step é 1, decrementar normalmente
        newSecond = selectedSecond.value - 1
    }
    
    // Garantir que seja um número inteiro
    newSecond = Math.floor(newSecond)
    
    // Obter valores atuais de minuto e hora
    let newMinute = selectedMinute.value
    let newHour = selectedHour.value

    // Se passar de 0 segundos, ajustar
    if (newSecond < 0) {
        // Calcular minutos emprestados
        const borrowMinutes = Math.ceil(Math.abs(newSecond) / 60)
        
        // Calcular novo valor (60 + resto negativo)
        newSecond = 60 + (newSecond % 60)
        
        // Subtrair minutos emprestados
        newMinute = newMinute - borrowMinutes

        // Se passar de 0 minutos, ajustar
        if (newMinute < 0) {
            // Calcular horas emprestadas
            const borrowHours = Math.ceil(Math.abs(newMinute) / 60)
            
            // Calcular novo valor (60 + resto negativo)
            newMinute = 60 + (newMinute % 60)
            
            // Subtrair horas emprestadas
            newHour = newHour - borrowHours

            // Se passar de 0 horas, ajustar
            if (newHour < 0) {
                newHour = 24 + (newHour % 24)
            }
        }
    }

    // Atualizar valores selecionados
    selectedSecond.value = newSecond
    selectedMinute.value = newMinute
    selectedHour.value = newHour
    
    // Emitir novo valor de tempo
    emitTimeValue()
}

/*
    Função para obter o tempo atual em segundos
    Esta função é usada para converter o tempo atual (hora, minuto, segundo) em segundos totais.
    Ela é usada para converter o tempo atual (hora, minuto, segundo) em segundos totais.
*/
const getCurrentTimeInSeconds = () => {
    // Converter hora, minuto e segundo para segundos totais
    return selectedHour.value * 3600 + selectedMinute.value * 60 + selectedSecond.value
}

/*
    Função para obter o tempo mínimo em segundos
    Esta função é usada para converter o tempo mínimo (hora, minuto, segundo) em segundos totais.
    Ela é usada para converter o tempo mínimo (hora, minuto, segundo) em segundos totais.
*/
const getMinTimeInSeconds = () => {
    // Se não houver tempo mínimo definido, retornar null
    if (!timeMin.value) return null
    
    // Converter hora, minuto e segundo para segundos totais
    return timeMin.value.hour * 3600 + timeMin.value.minute * 60 + (timeMin.value.second || 0)
}

/*
    Função para obter o tempo máximo em segundos
    Esta função é usada para converter o tempo máximo (hora, minuto, segundo) em segundos totais.
    Ela é usada para converter o tempo máximo (hora, minuto, segundo) em segundos totais.
*/
const getMaxTimeInSeconds = () => {
    // Se não houver tempo máximo definido, retornar null
    if (!timeMax.value) return null
    
    // Converter hora, minuto e segundo para segundos totais
    return timeMax.value.hour * 3600 + timeMax.value.minute * 60 + (timeMax.value.second || 0)
}

/*
    Computed para verificar se o incremento de hora está desabilitado
    Este computed é usado para verificar se incrementar a hora ultrapassaria o tempo máximo permitido.
    Ele é usado para verificar se incrementar a hora ultrapassaria o tempo máximo permitido.
*/
const isHourIncrementDisabled = computed(() => {
    // Se houver tempo máximo definido, verificar
    if (timeMax.value) {
        // Obter tempo máximo em segundos
        const maxTime = getMaxTimeInSeconds()
        
        // Verificar se incrementar a hora ultrapassaria o máximo
        const nextHour = selectedHour.value < 23 ? selectedHour.value + 1 : 0
        const nextTime = nextHour * 3600 + selectedMinute.value * 60 + selectedSecond.value
        
        // Retornar true se ultrapassar o máximo
        return nextTime > maxTime
    }
    
    // Se não houver tempo máximo, não desabilitar
    return false
})

/*
    Computed para verificar se o decremento de hora está desabilitado
    Este computed é usado para verificar se decrementar a hora ficaria abaixo do tempo mínimo permitido.
    Ele é usado para verificar se decrementar a hora ficaria abaixo do tempo mínimo permitido.
*/
const isHourDecrementDisabled = computed(() => {
    // Se houver tempo mínimo definido, verificar
    if (timeMin.value) {
        // Obter tempo mínimo em segundos
        const minTime = getMinTimeInSeconds()
        
        // Verificar se decrementar a hora ficaria abaixo do mínimo
        const prevHour = selectedHour.value > 0 ? selectedHour.value - 1 : 23
        const prevTime = prevHour * 3600 + selectedMinute.value * 60 + selectedSecond.value
        
        // Retornar true se ficar abaixo do mínimo
        return prevTime < minTime
    }
    
    // Se não houver tempo mínimo, não desabilitar
    return false
})

/*
    Computed para verificar se o incremento de minuto está desabilitado
    Este computed é usado para verificar se incrementar o minuto ultrapassaria o tempo máximo permitido.
    Ele é usado para verificar se incrementar o minuto ultrapassaria o tempo máximo permitido.
*/
const isMinuteIncrementDisabled = computed(() => {
    // Se houver tempo máximo definido, verificar
    if (timeMax.value) {
        // Obter tempo máximo em segundos
        const maxTime = getMaxTimeInSeconds()
        
        // Calcular próximo minuto
        const nextMinute = selectedMinute.value + timeStepMinutes.value
        let nextSecond = selectedSecond.value
        let nextHour = selectedHour.value

        // Se passar de 60 minutos, ajustar hora e segundo
        if (nextMinute >= 60) {
            nextHour = nextHour < 23 ? nextHour + 1 : 0
            nextSecond = 0 // Resetar segundos ao passar de hora
        }

        // Calcular próximo tempo em segundos
        const nextTime = nextHour * 3600 + (nextMinute % 60) * 60 + nextSecond

        // Só desabilitar se o próximo tempo ultrapassar o máximo
        // Mas permitir se o horário atual já está abaixo do mínimo (para permitir ajustes)
        const currentTime = getCurrentTimeInSeconds()
        const minTime = getMinTimeInSeconds()

        // Se está abaixo do mínimo, permitir incremento até chegar no mínimo
        if (currentTime < minTime) {
            return nextTime > maxTime
        }

        // Retornar true se ultrapassar o máximo
        return nextTime > maxTime
    }
    
    // Se não houver tempo máximo, não desabilitar
    return false
})

/*
    Computed para verificar se o decremento de minuto está desabilitado
    Este computed é usado para verificar se decrementar o minuto ficaria abaixo do tempo mínimo permitido.
    Ele é usado para verificar se decrementar o minuto ficaria abaixo do tempo mínimo permitido.
*/
const isMinuteDecrementDisabled = computed(() => {
    // Se houver tempo mínimo definido, verificar
    if (timeMin.value) {
        // Obter tempo mínimo em segundos
        const minTime = getMinTimeInSeconds()
        
        // Calcular minuto anterior
        const prevMinute = selectedMinute.value - timeStepMinutes.value
        let prevSecond = selectedSecond.value
        let prevHour = selectedHour.value

        // Se passar de 0 minutos, ajustar hora e segundo
        if (prevMinute < 0) {
            prevHour = prevHour > 0 ? prevHour - 1 : 23
            prevSecond = 59 // Máximo de segundos ao passar de hora
        }

        // Calcular tempo anterior em segundos
        const prevTime = prevHour * 3600 + (prevMinute < 0 ? 59 : prevMinute) * 60 + prevSecond

        // Só desabilitar se o próximo tempo ficar abaixo do mínimo
        // Mas permitir se o horário atual já está acima do máximo (para permitir ajustes)
        const currentTime = getCurrentTimeInSeconds()
        const maxTime = getMaxTimeInSeconds()

        // Se está acima do máximo, permitir decremento até chegar no máximo
        if (currentTime > maxTime) {
            return prevTime < minTime
        }

        // Retornar true se ficar abaixo do mínimo
        return prevTime < minTime
    }
    
    // Se não houver tempo mínimo, não desabilitar
    return false
})

/*
    Computed para verificar se o incremento de segundo está desabilitado
    Este computed é usado para verificar se incrementar o segundo ultrapassaria o tempo máximo permitido.
    Ele é usado para verificar se incrementar o segundo ultrapassaria o tempo máximo permitido.
*/
const isSecondIncrementDisabled = computed(() => {
    // Se houver tempo máximo definido, verificar
    if (timeMax.value) {
        // Obter tempo máximo em segundos
        const maxTime = getMaxTimeInSeconds()
        
        // Calcular próximo segundo
        const nextSecond = selectedSecond.value + timeStepSeconds.value
        let nextMinute = selectedMinute.value
        let nextHour = selectedHour.value

        // Se passar de 60 segundos, ajustar minuto
        if (nextSecond >= 60) {
            nextMinute = nextMinute < 59 ? nextMinute + 1 : 0
            if (nextMinute === 0) {
                nextHour = nextHour < 23 ? nextHour + 1 : 0
            }
        }

        // Calcular próximo tempo em segundos
        const nextTime = nextHour * 3600 + nextMinute * 60 + (nextSecond % 60)

        // Só desabilitar se o próximo tempo ultrapassar o máximo
        // Mas permitir se o horário atual já está abaixo do mínimo (para permitir ajustes)
        const currentTime = getCurrentTimeInSeconds()
        const minTime = getMinTimeInSeconds()

        // Se está abaixo do mínimo, permitir incremento até chegar no mínimo
        if (currentTime < minTime) {
            return nextTime > maxTime
        }

        // Retornar true se ultrapassar o máximo
        return nextTime > maxTime
    }
    
    // Se não houver tempo máximo, não desabilitar
    return false
})

/*
    Computed para verificar se o decremento de segundo está desabilitado
    Este computed é usado para verificar se decrementar o segundo ficaria abaixo do tempo mínimo permitido.
    Ele é usado para verificar se decrementar o segundo ficaria abaixo do tempo mínimo permitido.
*/
const isSecondDecrementDisabled = computed(() => {
    // Se houver tempo mínimo definido, verificar
    if (timeMin.value) {
        // Obter tempo mínimo em segundos
        const minTime = getMinTimeInSeconds()
        
        // Calcular segundo anterior
        const prevSecond = selectedSecond.value - timeStepSeconds.value
        let prevMinute = selectedMinute.value
        let prevHour = selectedHour.value

        // Se passar de 0 segundos, ajustar minuto
        if (prevSecond < 0) {
            prevMinute = prevMinute > 0 ? prevMinute - 1 : 59
            if (prevMinute === 59) {
                prevHour = prevHour > 0 ? prevHour - 1 : 23
            }
        }

        // Calcular tempo anterior em segundos
        const prevTime = prevHour * 3600 + prevMinute * 60 + (prevSecond < 0 ? 59 : prevSecond)

        // Só desabilitar se o próximo tempo ficar abaixo do mínimo
        // Mas permitir se o horário atual já está acima do máximo (para permitir ajustes)
        const currentTime = getCurrentTimeInSeconds()
        const maxTime = getMaxTimeInSeconds()

        // Se está acima do máximo, permitir decremento até chegar no máximo
        if (currentTime > maxTime) {
            return prevTime < minTime
        }

        // Retornar true se ficar abaixo do mínimo
        return prevTime < minTime
    }
    
    // Se não houver tempo mínimo, não desabilitar
    return false
})

/*
    Função para emitir o valor de tempo selecionado
    Esta função é usada para emitir o valor de tempo selecionado no formato apropriado.
    Ela é usada para emitir o valor de tempo selecionado no formato apropriado.
*/
const emitTimeValue = () => {
    // Se for tipo datetime-local, combinar data e hora
    if (props.inputType === 'datetime-local') {
        // Para datetime-local, combinar data e hora
        if (!selectedDate.value) {
            // Se não tem data selecionada, usar a data atual do calendário
            const date = currentDate.value
            const dateStr = `${date.getFullYear()}-${formatTimeValue(date.getMonth() + 1)}-${formatTimeValue(date.getDate())}`
            let timeStr
            if (props.hasSeconds) {
                timeStr = `${formatTimeValue(selectedHour.value)}:${formatTimeValue(selectedMinute.value)}:${formatTimeValue(selectedSecond.value)}`
            } else {
                timeStr = `${formatTimeValue(selectedHour.value)}:${formatTimeValue(selectedMinute.value)}`
            }
            const datetimeString = `${dateStr}T${timeStr}`
            emit('changed', datetimeString)
            emit('date-selected', {
                date: date,
                hour: selectedHour.value,
                minute: selectedMinute.value,
                second: selectedSecond.value,
                datetimeString: datetimeString,
                isoString: date.toISOString(),
                isoStringLocal: formatISOLocal(date)
            })
        } else {
            // Combinar data selecionada com hora atual
            const date = selectedDate.value
            const dateStr = `${date.getFullYear()}-${formatTimeValue(date.getMonth() + 1)}-${formatTimeValue(date.getDate())}`
            let timeStr
            if (props.hasSeconds) {
                timeStr = `${formatTimeValue(selectedHour.value)}:${formatTimeValue(selectedMinute.value)}:${formatTimeValue(selectedSecond.value)}`
            } else {
                timeStr = `${formatTimeValue(selectedHour.value)}:${formatTimeValue(selectedMinute.value)}`
            }
            const datetimeString = `${dateStr}T${timeStr}`
            emit('changed', datetimeString)
            emit('date-selected', {
                date: date,
                hour: selectedHour.value,
                minute: selectedMinute.value,
                second: selectedSecond.value,
                datetimeString: datetimeString,
                isoString: date.toISOString(),
                isoStringLocal: formatISOLocal(date)
            })
        }
        return
    }

    // Para tipo 'time', apenas emitir o horário
    let timeString
    if (props.hasSeconds) {
        timeString = `${formatTimeValue(selectedHour.value)}:${formatTimeValue(selectedMinute.value)}:${formatTimeValue(selectedSecond.value)}`
    } else {
        timeString = `${formatTimeValue(selectedHour.value)}:${formatTimeValue(selectedMinute.value)}`
    }
    emit('changed', timeString)
    emit('date-selected', {
        hour: selectedHour.value,
        minute: selectedMinute.value,
        second: selectedSecond.value,
        timeString: timeString
    })
}

/*
    Função para verificar se uma data está desabilitada
    Esta função é usada para verificar se uma data está desabilitada baseado em min, max, step e maxRangeDays.
    Ela é usada para verificar se uma data está desabilitada baseado em min, max, step e maxRangeDays.
*/
const isDateDisabled = (date) => {
    // Normalizar a data a ser verificada
    const normalized = normalizeDate(date)
    
    // Se não conseguir normalizar, considerar desabilitada
    if (!normalized) return true

    // Verificar min (datas antes do min são desabilitadas)
    if (minDate.value) {
        const normalizedMin = normalizeDate(minDate.value)
        if (normalizedMin && normalized < normalizedMin) {
            return true
        }
    }

    // Verificar max (datas depois do max são desabilitadas)
    if (maxDate.value) {
        const normalizedMax = normalizeDate(maxDate.value)
        if (normalizedMax && normalized > normalizedMax) {
            return true
        }
    }

    // Verificar step
    // Para input type="date", step funciona em relação ao min (ou 1970-01-01 se não houver min)
    // Para datetime-local, o step não deve desabilitar dias (apenas horas/minutos)
    if (stepDays.value && props.inputType !== 'datetime-local') {
        // Usar min como base ou 1970-01-01 se não houver min
        const baseDate = minDate.value || new Date('1970-01-01')
        const normalizedBase = normalizeDate(baseDate)
        
        if (normalizedBase) {
            // Calcular diferença em dias
            const diffTime = normalized.getTime() - normalizedBase.getTime()
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
            
            // Se a diferença não for múltipla do step, está desabilitado
            if (diffDays % stepDays.value !== 0) {
                return true
            }
        }
    }

    // Verificar limite de dias no range (se estiver em modo range)
    if (props.allowRange && props.maxRangeDays !== null && props.maxRangeDays > 0) {
        const start = selectedDateRange.value.startDate
        const end = selectedDateRange.value.endDate
        
        // Se tem start mas não tem end, verificar se a data clicada excederia o limite
        if (start && !end) {
            const diffTime = Math.abs(normalized.getTime() - start.getTime())
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 para incluir ambos os dias
            if (diffDays > props.maxRangeDays) {
                return true
            }
        }
        // Se tem end mas não tem start, verificar se a data clicada excederia o limite
        else if (end && !start) {
            const diffTime = Math.abs(normalized.getTime() - end.getTime())
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 para incluir ambos os dias
            if (diffDays > props.maxRangeDays) {
                return true
            }
        }
        // Se tem ambos, verificar se a data está dentro do range permitido
        else if (start && end) {
            // Se a data está antes do start, verificar se excederia o limite
            if (normalized < start) {
                const diffTime = end.getTime() - normalized.getTime()
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
                if (diffDays > props.maxRangeDays) {
                    return true
                }
            }
            // Se a data está depois do end, verificar se excederia o limite
            else if (normalized > end) {
                const diffTime = normalized.getTime() - start.getTime()
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
                if (diffDays > props.maxRangeDays) {
                    return true
                }
            }
        }
    }

    return false
}

/*
    Função para verificar se um mês está selecionado
    Esta função é usada para verificar se um mês está selecionado no picker de meses.
    Ela é usada para verificar se um mês está selecionado no picker de meses.
*/
const isMonthSelected = (monthIndex) => {
    // Se não houver data selecionada, retornar false
    if (!selectedDate.value) return false
    
    // Obter ano e mês da data selecionada
    const selectedYear = selectedDate.value.getFullYear()
    const selectedMonth = selectedDate.value.getMonth()
    
    // Verificar se o ano e mês correspondem ao mês atual
    return selectedYear === currentYear.value && selectedMonth === monthIndex
}

/*
    Função para verificar se um mês está desabilitado
    Esta função é usada para verificar se um mês está desabilitado baseado em min e max.
    Ela é usada para verificar se um mês está desabilitado baseado em min e max.
*/
const isMonthDisabled = (monthIndex) => {
    // Se não for tipo month, não desabilitar
    if (props.inputType !== 'month') return false

    // Obter ano e mês atual
    const year = currentYear.value
    const month = monthIndex + 1 // monthIndex é 0-based, mas precisamos 1-based
    
    // Criar string do mês no formato YYYY-MM
    const monthString = `${year}-${String(month).padStart(2, '0')}`

    // Verificar min
    if (props.min) {
        const minDate = parseMinMaxDate(props.min)
        if (minDate) {
            const minYear = minDate.getFullYear()
            const minMonth = minDate.getMonth() + 1
            const minString = `${minYear}-${String(minMonth).padStart(2, '0')}`
            
            // Se o mês for menor que o mínimo, desabilitar
            if (monthString < minString) return true
        }
    }

    // Verificar max
    if (props.max) {
        const maxDate = parseMinMaxDate(props.max)
        if (maxDate) {
            const maxYear = maxDate.getFullYear()
            const maxMonth = maxDate.getMonth() + 1
            const maxString = `${maxYear}-${String(maxMonth).padStart(2, '0')}`
            
            // Se o mês for maior que o máximo, desabilitar
            if (monthString > maxString) return true
        }
    }

    // Se não violar nenhuma regra, não desabilitar
    return false
}

/*
    Função para normalizar uma data para meia-noite
    Esta função é usada para normalizar uma data para meia-noite (00:00:00) para comparações.
    Ela é usada para normalizar uma data para meia-noite (00:00:00) para comparações.
*/
const normalizeDate = (date) => {
    // Se não houver data, retornar null
    if (!date) return null

    // Se já for uma instância de Date, criar uma nova cópia
    let normalized = date instanceof Date
        ? new Date(date.getTime())
        : new Date(date)

    // Normalizar para meia-noite (00:00:00)
    normalized.setHours(0, 0, 0, 0)
    
    // Retornar data normalizada
    return normalized
}

/*
    Função para obter o ano ISO 8601 de uma data
    Esta função é usada para obter o ano ISO 8601 de uma data (ano da semana ISO).
    Ela é usada para obter o ano ISO 8601 de uma data (ano da semana ISO).
    ISO 8601: Semana começa na segunda-feira, primeira semana do ano é a que contém o primeiro dia de quinta-feira
*/
const getISOWeekYear = (date) => {
    // Criar cópia da data
    const d = new Date(date.getTime())
    
    // Ajustar para a quinta-feira da semana (referência ISO 8601)
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
    
    // Retornar o ano
    return d.getFullYear()
}

/*
    Função para obter o número da semana ISO 8601
    Esta função é usada para obter o número da semana ISO 8601 de uma data.
    Ela é usada para obter o número da semana ISO 8601 de uma data.
*/
const getISOWeekNumber = (date) => {
    // Criar cópia da data
    const d = new Date(date.getTime())
    
    // Normalizar para meia-noite
    d.setHours(0, 0, 0, 0)

    // Mover para a quinta-feira da semana (ISO 8601 usa quinta-feira como referência)
    const dayOfWeek = d.getDay() || 7 // 0 = domingo, converter para 7
    const daysToThursday = (4 - dayOfWeek + 7) % 7
    d.setDate(d.getDate() + daysToThursday)

    // Calcular a primeira quinta-feira do ano (4 de janeiro sempre está na primeira semana)
    const jan4 = new Date(d.getFullYear(), 0, 4)
    jan4.setHours(0, 0, 0, 0)
    const jan4Day = jan4.getDay() || 7
    const jan4DaysToThursday = (4 - jan4Day + 7) % 7
    const firstThursday = new Date(jan4)
    firstThursday.setDate(jan4.getDate() + jan4DaysToThursday)

    // Calcular diferença em semanas
    const diffTime = d.getTime() - firstThursday.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const weekNumber = Math.floor(diffDays / 7) + 1

    return weekNumber
}

/*
    Função para obter a data de início da semana (segunda-feira)
    Esta função é usada para obter a data de início da semana ISO 8601 (segunda-feira).
    Ela é usada para obter a data de início da semana ISO 8601 (segunda-feira).
*/
const getWeekStartDate = (date) => {
    // Criar cópia da data
    const d = new Date(date.getTime())
    
    // Obter dia da semana (0 = domingo, 1 = segunda, etc.)
    const day = d.getDay()
    
    // Calcular diferença para segunda-feira
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Ajustar para segunda-feira
    
    // Criar data de início da semana
    const result = new Date(d.getFullYear(), d.getMonth(), diff)
    
    // Normalizar para meia-noite
    result.setHours(0, 0, 0, 0)
    
    // Retornar data de início da semana
    return result
}

/*
    Função para obter a data de fim da semana (domingo)
    Esta função é usada para obter a data de fim da semana ISO 8601 (domingo).
    Ela é usada para obter a data de fim da semana ISO 8601 (domingo).
*/
const getWeekEndDate = (date) => {
    // Obter data de início da semana (segunda-feira)
    const start = getWeekStartDate(date)
    
    // Criar data de fim da semana (domingo = segunda + 6 dias)
    const end = new Date(start.getTime())
    end.setDate(end.getDate() + 6)
    
    // Retornar data de fim da semana
    return end
}

/*
    Função para formatar string da semana no formato ISO 8601
    Esta função é usada para formatar uma data como string de semana no formato YYYY-Www.
    Ela é usada para formatar uma data como string de semana no formato YYYY-Www.
*/
const formatWeekString = (date) => {
    // Obter ano ISO 8601
    const year = getISOWeekYear(date)
    
    // Obter número da semana ISO 8601
    const week = getISOWeekNumber(date)
    
    // Retornar no formato YYYY-Www
    return `${year}-W${String(week).padStart(2, '0')}`
}

/*
    Função para verificar se uma data está dentro de uma semana
    Esta função é usada para verificar se uma data está dentro de uma semana específica.
    Ela é usada para verificar se uma data está dentro de uma semana específica.
*/
const isDateInWeek = (date, weekStartDate) => {
    // Se não houver data ou data de início da semana, retornar false
    if (!date || !weekStartDate) return false
    
    // Normalizar datas para comparação
    const normalizedDate = normalizeDate(date)
    const weekStart = normalizeDate(weekStartDate)
    const weekEnd = normalizeDate(getWeekEndDate(weekStartDate))

    // Verificar se a data está entre o início e fim da semana
    return normalizedDate >= weekStart && normalizedDate <= weekEnd
}

/*
    Função para obter eventos de uma data específica
    Esta função é usada para obter todos os eventos que correspondem a uma data específica.
    Ela é usada para obter todos os eventos que correspondem a uma data específica.
*/
const getEventsForDate = (date) => {
    // Se não houver eventos, retornar array vazio
    if (!props.events || props.events.length === 0) return []

    // Normalizar a data a ser verificada
    const normalizedDate = normalizeDate(date)
    
    // Se não conseguir normalizar, retornar array vazio
    if (!normalizedDate) return []

    // Filtrar eventos que correspondem à data
    const matchingEvents = props.events.filter(event => {
        // Se não houver evento ou data, ignorar
        if (!event || !event.date) return false

        let eventDate = null

        // Tratar diferentes tipos de entrada
        if (typeof event.date === 'string') {
            eventDate = new Date(event.date)
        } else if (event.date instanceof Date) {
            eventDate = new Date(event.date.getTime())
        } else {
            return false
        }

        // Verificar se a data é válida
        if (isNaN(eventDate.getTime())) {
            return false
        }

        // Normalizar data do evento
        eventDate = normalizeDate(eventDate)

        // Se não conseguir normalizar, ignorar
        if (!eventDate) return false

        // Verificar se é o mesmo dia
        const matches = isSameDay(eventDate, normalizedDate)
        return matches
    })

    // Retornar eventos correspondentes
    return matchingEvents
}

/*
    Função para formatar dimensão (adicionar 'px')
    Esta função é usada para formatar um valor numérico adicionando 'px' ao final.
    Ela é usada para formatar um valor numérico adicionando 'px' ao final.
*/
const formatDimension = (value) => {
    // Se o valor for null ou undefined, retornar valor padrão
    if (value === null || value === undefined) return '350px'
    
    // Agora sempre recebe um número, então apenas adiciona 'px'
    return `${value}px`
}

/*
    Função para navegar para o mês anterior
    Esta função é usada para navegar para o mês anterior no calendário.
    Ela é usada para navegar para o mês anterior no calendário.
*/
const previousMonth = () => {
    // Se estiver desabilitado, retornar
    if (props.disabled) return
    
    // Obter ano e mês atual
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()
    
    // Criar nova instância para garantir reatividade
    const newDate = new Date(year, month - 1, 1)
    
    // Atualizar timestamp para forçar reatividade
    currentDateTimestamp.value = Date.now()
    
    // Incrementar calendarKey antes de atualizar currentDate
    calendarKey.value++
    
    // Atualizar data atual
    currentDate.value = newDate
    
    // Emitir evento imediatamente
    emit('month-changed', {
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        monthName: monthNames.value[newDate.getMonth()]
    })
}

/*
    Função para navegar para o próximo mês
    Esta função é usada para navegar para o próximo mês no calendário.
    Ela é usada para navegar para o próximo mês no calendário.
*/
const nextMonth = () => {
    // Se estiver desabilitado, retornar
    if (props.disabled) return
    
    // Obter ano e mês atual
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()
    
    // Criar nova instância para garantir reatividade
    const newDate = new Date(year, month + 1, 1)
    
    // Atualizar timestamp para forçar reatividade
    currentDateTimestamp.value = Date.now()
    
    // Incrementar calendarKey antes de atualizar currentDate
    calendarKey.value++
    
    // Atualizar data atual
    currentDate.value = newDate
    
    // Emitir evento imediatamente
    emit('month-changed', {
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
        monthName: monthNames.value[newDate.getMonth()]
    })
}

/*
    Função para navegar para uma data específica
    Esta função é usada para navegar para uma data específica e selecioná-la.
    Ela é usada para navegar para uma data específica e selecioná-la.
*/
const goToDateFunction = (date) => {
    // Se não houver data, retornar
    if (!date) return

    // Parsear a data
    const parsed = parseValue(date)
    
    // Se não conseguir parsear, retornar
    if (!parsed) return

    // Obter ano e mês da data alvo
    const targetYear = parsed.getFullYear()
    const targetMonth = parsed.getMonth()
    
    // Criar data de hoje para comparação
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Verificar se precisa mudar o mês
    if (currentYear.value !== targetYear || currentMonth.value !== targetMonth) {
        // Atualizar data atual para o mês da data alvo
        currentDate.value = new Date(targetYear, targetMonth, 1)
        
        // Emitir evento de mudança de mês
        emit('month-changed', {
            year: currentYear.value,
            month: currentMonth.value,
            monthName: currentMonthName.value
        })
    }

    // Normalizar a data para meia-noite
    const normalizedDate = normalizeDate(parsed)

    // Selecionar a data e emitir eventos
    selectedDate.value = normalizedDate
    emit('changed', normalizedDate)
    emit('date-selected', {
        date: normalizedDate,
        dateString: normalizedDate.toISOString().split('T')[0],
        isoString: normalizedDate.toISOString(),
        isoStringLocal: formatISOLocal(normalizedDate),
        day: {
            date: normalizedDate.getDate(),
            fullDate: normalizedDate,
            isOtherMonth: false,
            isToday: isSameDay(normalizedDate, today),
            isSelected: true,
            events: getEventsForDate(normalizedDate)
        }
    })
}

/*
    Função para selecionar uma data
    Esta função é usada para selecionar uma data no calendário, tratando diferentes modos (date, week, range, etc.).
    Ela é usada para selecionar uma data no calendário, tratando diferentes modos (date, week, range, etc.).
*/
const selectDate = (day) => {
    // Se estiver desabilitado ou a data estiver desabilitada, retornar
    if (props.disabled || day.isDisabled) return
    
    // Se está arrastando, não processar o click
    if (isDragging.value) {
        return
    }
    
    // Normalizar a data clicada
    const clickedDate = normalizeDate(day.fullDate)
    
    // Validar se a data está dentro dos limites min/max/step
    if (isDateDisabled(clickedDate)) return

    // Modo semana (inputType='week')
    if (props.inputType === 'week') {
        // Selecionar a semana completa (segunda a domingo)
        const weekStart = getWeekStartDate(clickedDate)

        // Obter o fim da semana
        const weekEnd = getWeekEndDate(clickedDate)

        // Verificar se clicou na mesma semana já selecionada
        if (selectedDate.value && isDateInWeek(clickedDate, selectedDate.value)) {
            // Remover a seleção
            selectedDate.value = null

            // Emitir evento de mudança
            emit('changed', null)

            // Emitir evento de data selecionada
            emit('date-selected', {
                weekString: null,
                weekStartDate: null,
                weekEndDate: null
            })

            return
        }

        // Selecionar a semana (armazenar a segunda-feira como referência)
        selectedDate.value = normalizeDate(weekStart)

        // Navegar para o mês da semana se necessário
        const selectedYear = weekStart.getFullYear()

        // Obter o mês da semana
        const selectedMonth = weekStart.getMonth()

        // Verificar se o ano ou mês atual são diferentes do ano ou mês da semana
        if (currentYear.value !== selectedYear || currentMonth.value !== selectedMonth) {
            // Atualizar data atual para o mês da semana
            currentDate.value = new Date(selectedYear, selectedMonth, 1)

            // Emitir evento de mudança de mês
            emit('month-changed', {
                year: currentYear.value,
                month: currentMonth.value,
                monthName: currentMonthName.value
            })
        }

        // Formatar no padrão YYYY-Www
        const weekString = formatWeekString(weekStart)

        // Emitir evento de mudança
        emit('changed', weekString)

        // Emitir evento de data selecionada
        emit('date-selected', {
            weekString: weekString,
            weekStartDate: weekStart,
            weekEndDate: weekEnd,
            weekNumber: getISOWeekNumber(weekStart),
            weekYear: getISOWeekYear(weekStart),
            isoString: weekStart.toISOString(),
            isoStringLocal: formatISOLocal(weekStart)
        })

        return
    }

    // Modo range
    if (props.allowRange) {
        // Se a data selecionada está em outro mês, navegar para aquele mês
        const selectedYear = day.fullDate.getFullYear()

        // Obter o mês da data alvo
        const selectedMonth = day.fullDate.getMonth()

        // Verificar se o ano ou mês atual são diferentes do ano ou mês da data alvo
        if (currentYear.value !== selectedYear || currentMonth.value !== selectedMonth) {
            // Atualizar data atual para o mês da data alvo
            currentDate.value = new Date(selectedYear, selectedMonth, 1)

            // Emitir evento de mudança de mês
            emit('month-changed', {
                year: currentYear.value,
                month: currentMonth.value,
                monthName: currentMonthName.value
            })
        }

        // Obter se tem startDate
        const hasStart = selectedDateRange.value.startDate !== null

        // Obter se tem endDate
        const hasEnd = selectedDateRange.value.endDate !== null

        // Obter o startDate
        const start = selectedDateRange.value.startDate

        // Obter o endDate
        const end = selectedDateRange.value.endDate

        // Se editRange é false, não permitir editar o range, mas permitir seleção normal
        if (!props.editRange) {
            // Se a data selecionada está em outro mês, navegar para aquele mês
            const selectedYear = day.fullDate.getFullYear()

            // Obter o mês da data alvo
            const selectedMonth = day.fullDate.getMonth()

            // Verificar se o ano ou mês atual são diferentes do ano ou mês da data alvo
            if (currentYear.value !== selectedYear || currentMonth.value !== selectedMonth) {
                // Atualizar data atual para o mês da data alvo
                currentDate.value = new Date(selectedYear, selectedMonth, 1)

                // Emitir evento de mudança de mês
                emit('month-changed', {
                    year: currentYear.value,
                    month: currentMonth.value,
                    monthName: currentMonthName.value
                })
            }

            // Verificar se clicou na mesma data já selecionada
            if (selectedDate.value && isSameDay(clickedDate, selectedDate.value)) {
                // Remover a seleção
                selectedDate.value = null

                // Emitir evento de mudança
                emit('changed', null)

                // Emitir evento de data selecionada
                emit('date-selected', {
                    date: null,
                    dateString: null,
                    day: null
                })
                return
            }

            // Se clicou dentro do range (incluindo start e end), emitir date-selected com start e end
            if (hasStart && hasEnd) {
                // Verificar se a data clicada está dentro do range (incluindo start e end)
                const isInRange = clickedDate >= start && clickedDate <= end

                // Se a data clicada está dentro do range (incluindo start e end), emitir date-selected com start e end
                if (isInRange || isSameDay(clickedDate, start) || isSameDay(clickedDate, end)) {
                    // Emitir evento de data selecionada
                    emit('date-selected', {
                        startDate: start,
                        endDate: end,
                        isRange: true,
                        isoString: start && end ? {
                            start: start.toISOString(),
                            end: end.toISOString()
                        } : null,
                        isoStringLocal: start && end ? {
                            start: formatISOLocal(start),
                            end: formatISOLocal(end)
                        } : null
                    })
                }
            }

            // Sempre permitir seleção normal (single date)
            selectedDate.value = clickedDate

            // Emitir evento de mudança
            emit('changed', clickedDate)

            // Emitir evento de data selecionada
            emit('date-selected', {
                date: clickedDate,
                dateString: clickedDate.toISOString().split('T')[0],
                isoString: clickedDate.toISOString(),
                isoStringLocal: formatISOLocal(clickedDate),
                day: day
            })
            return
        }

        // Se está editando uma data específica (start ou end)
        if (editingRangeDate.value) {
            // Se está editando uma data específica (start ou end)
            if (editingRangeDate.value === 'start') {
                // Se clicou em data <= end (ou não tem end), atualizar start
                if (!hasEnd || clickedDate <= end) {
                    // Atualizar startDate
                    selectedDateRange.value.startDate = clickedDate
                }
                // Se clicou em data > end, trocar: o end vira start, a data clicada vira end
                else {
                    // Atualizar startDate
                    selectedDateRange.value.startDate = end

                    // Atualizar endDate
                    selectedDateRange.value.endDate = clickedDate
                }

                // Limpar o modo de edição
                editingRangeDate.value = null
            } else if (editingRangeDate.value === 'end') {
                // Se clicou em data >= start (ou não tem start), atualizar end
                if (!hasStart || clickedDate >= start) {
                    // Atualizar endDate
                    selectedDateRange.value.endDate = clickedDate
                }
                // Se clicou em data < start, trocar: o start vira end, a data clicada vira start
                else {
                    // Atualizar endDate
                    selectedDateRange.value.endDate = start

                    // Atualizar startDate
                    selectedDateRange.value.startDate = clickedDate
                }

                // Limpar o modo de edição
                editingRangeDate.value = null
            }
        }
        // Se clicou no startDate, entrar em modo de edição do start
        else if (hasStart && isSameDay(clickedDate, start)) {
            // Entrar em modo de edição do start
            editingRangeDate.value = 'start'
        }
        // Se clicou no endDate, entrar em modo de edição do end
        else if (hasEnd && isSameDay(clickedDate, end)) {
            // Entrar em modo de edição do end
            editingRangeDate.value = 'end'
        }
        // Se não tem nada selecionado, definir como startDate
        else if (!hasStart && !hasEnd) {
            // Atualizar startDate
            selectedDateRange.value.startDate = clickedDate

            // Atualizar endDate
            selectedDateRange.value.endDate = null
        }
        // Se tem startDate mas não tem endDate
        else if (hasStart && !hasEnd) {
            // Se clicou em data >= startDate, definir como endDate
            if (clickedDate >= start) {
                // Atualizar endDate
                selectedDateRange.value.endDate = clickedDate
            }
            // Se clicou em data < startDate, trocar: a data clicada vira start, o start vira end
            else {
                // Atualizar endDate
                selectedDateRange.value.endDate = start

                // Atualizar startDate
                selectedDateRange.value.startDate = clickedDate
            }
        }
        // Se tem endDate mas não tem startDate
        else if (!hasStart && hasEnd) {
            // Se clicou em data <= endDate, definir como startDate
            if (clickedDate <= end) {
                // Atualizar startDate
                selectedDateRange.value.startDate = clickedDate
            }
            // Se clicou em data > endDate, trocar: o end vira start, a data clicada vira end
            else {
                // Atualizar startDate
                selectedDateRange.value.startDate = end

                // Atualizar endDate
                selectedDateRange.value.endDate = clickedDate
            }
        }
        // Se tem ambos startDate e endDate
        else {
            // Se não está em modo de edição
            if (!editingRangeDate.value) {
                // Se clicou fora do range (antes do start ou depois do end), 
                // remover o range e começar um novo com a data clicada
                if (clickedDate < start || clickedDate > end) {
                    // Atualizar startDate
                    selectedDateRange.value.startDate = clickedDate

                    // Atualizar endDate
                    selectedDateRange.value.endDate = null

                    // Emitir eventos com novo start
                    emit('changed', {
                        startDate: selectedDateRange.value.startDate,
                        endDate: selectedDateRange.value.endDate
                    })

                    // Emitir evento de data selecionada
                    emit('date-selected', {
                        startDate: selectedDateRange.value.startDate,
                        endDate: selectedDateRange.value.endDate,
                        isRange: true,
                        isoString: null,
                        isoStringLocal: null
                    })
                    return
                }
                // Se clicou dentro do range, não fazer nada (já foi verificado acima se clicou no start ou end)
                return
            }
        }

        // Emitir eventos com range
        emit('changed', {
            // Obter o startDate
            startDate: selectedDateRange.value.startDate,
            // Obter o endDate
            endDate: selectedDateRange.value.endDate
        })

        // Obter o startDate
        const startDate = selectedDateRange.value.startDate

        // Obter o endDate
        const endDate = selectedDateRange.value.endDate

        // Emitir evento de data selecionada
        emit('date-selected', {
            startDate: startDate,
            endDate: endDate,
            isRange: true,
            isoString: startDate && endDate ? {
                start: startDate.toISOString(),
                end: endDate.toISOString()
            } : null,
            isoStringLocal: startDate && endDate ? {
                start: formatISOLocal(startDate),
                end: formatISOLocal(endDate)
            } : null
        })

        return
    }

    // Modo single date (comportamento original)
    // Verificar se a data clicada é a mesma que já está selecionada
    if (selectedDate.value && isSameDay(day.fullDate, selectedDate.value)) {
        // Se for a mesma data, remover a seleção
        selectedDate.value = null

        // Emitir evento de mudança
        emit('changed', null)

        // Emitir evento de data selecionada
        emit('date-selected', {
            date: null,
            dateString: null,
            day: null
        })
        return
    }

    // Se a data selecionada está em outro mês, navegar para aquele mês
    const selectedYear = day.fullDate.getFullYear()

    // Obter o mês da data alvo
    const selectedMonth = day.fullDate.getMonth()

    // Verificar se o ano ou mês atual são diferentes do ano ou mês da data alvo
    if (currentYear.value !== selectedYear || currentMonth.value !== selectedMonth) {
        // Atualizar data atual para o mês da data alvo
        currentDate.value = new Date(selectedYear, selectedMonth, 1)

        // Emitir evento de mudança de mês
        emit('month-changed', {
            year: currentYear.value,
            month: currentMonth.value,
            monthName: currentMonthName.value
        })
    }

    // Selecionar a data clicada
    selectedDate.value = clickedDate

    // Se for datetime-local, emitir combinando data e hora
    if (props.inputType === 'datetime-local') {
        // Criar string da data no formato YYYY-MM-DD
        const dateStr = `${clickedDate.getFullYear()}-${formatTimeValue(clickedDate.getMonth() + 1)}-${formatTimeValue(clickedDate.getDate())}`

        // Obter a hora
        let timeStr

        // Verificar se tem segundos
        if (props.hasSeconds) {
            // Criar string da hora no formato HH:MM:SS
            timeStr = `${formatTimeValue(selectedHour.value)}:${formatTimeValue(selectedMinute.value)}:${formatTimeValue(selectedSecond.value)}`
        } else {
            // Criar string da hora no formato HH:MM
            timeStr = `${formatTimeValue(selectedHour.value)}:${formatTimeValue(selectedMinute.value)}`
        }

        // Criar string da data e hora no formato YYYY-MM-DDTHH:MM:SS
        const datetimeString = `${dateStr}T${timeStr}`

        // Emitir evento de mudança
        emit('changed', datetimeString)

        // Emitir evento de data selecionada
        emit('date-selected', {
            date: clickedDate,
            hour: selectedHour.value,
            minute: selectedMinute.value,
            second: selectedSecond.value,
            datetimeString: datetimeString,
            isoString: clickedDate.toISOString(),
            isoStringLocal: formatISOLocal(clickedDate),
            day: day
        })
    } else {
        // Emitir evento de mudança
        emit('changed', clickedDate)

        // Emitir evento de data selecionada
        emit('date-selected', {
            date: clickedDate,
            dateString: clickedDate.toISOString().split('T')[0],
            day: day
        })
    }
}

/*
    Função para lidar com o evento de mouse down
    Este função é usado para lidar com o evento de mouse down.
    Ele é usado para lidar com o evento de mouse down.
*/
const handleDayMouseDown = (event, day) => {
    // Se estiver desabilitado ou a data estiver desabilitada, ou não permitir range ou não permitir edição, retornar
    if (props.disabled || day.isDisabled || !props.allowRange || !props.editRange) return

    // Normalizar a data clicada
    const clickedDate = normalizeDate(day.fullDate)

    // Se não conseguir normalizar, retornar
    if (!clickedDate) return
    
    // Obter o startDate
    const start = selectedDateRange.value.startDate

    // Obter o endDate
    const end = selectedDateRange.value.endDate
    
    // Verificar se clicou no início ou fim do range
    if (start && isSameDay(clickedDate, start)) {
        // Prevenir o comportamento padrão
        event.preventDefault()
        // Ativar o arrasto
        isDragging.value = true
        // Definir o extremo como start
        draggingExtreme.value = 'start'
        // Definir o modo de edição como start
        editingRangeDate.value = 'start'
    } else if (end && isSameDay(clickedDate, end)) {
        // Prevenir o comportamento padrão
        event.preventDefault()
        // Ativar o arrasto
        isDragging.value = true
        // Definir o extremo como end
        draggingExtreme.value = 'end'
        // Definir o modo de edição como end
        editingRangeDate.value = 'end'
    }
}

/*
    Função para lidar com o evento de mouse enter
    Este função é usado para lidar com o evento de mouse enter.
    Ele é usado para lidar com o evento de mouse enter.
*/
const handleDayMouseEnter = (day) => {
    // Se não estiver arrastando, ou não estiver definido o extremo, ou estiver desabilitado ou a data estiver desabilitada, retornar
    if (!isDragging.value || !draggingExtreme.value || props.disabled || day.isDisabled) return
    
    // Normalizar a data hoverada
    const hoveredDate = normalizeDate(day.fullDate)

    // Se não conseguir normalizar, retornar
    if (!hoveredDate) return
    
    // Obter o startDate
    const start = selectedDateRange.value.startDate

    // Obter o endDate
    const end = selectedDateRange.value.endDate

    // Verificar se está arrastando o início    
    if (draggingExtreme.value === 'start') {
        // Verificar se não tem endDate ou se a data hoverada é menor ou igual ao endDate
        if (!end || hoveredDate <= end) {
            // Atualizar startDate
            selectedDateRange.value.startDate = hoveredDate
        } else {
            // Se passou do fim, trocar: o end vira start, a data hovered vira end
            selectedDateRange.value.startDate = end

            // Atualizar endDate
            selectedDateRange.value.endDate = hoveredDate

            // Definir o extremo como end
            draggingExtreme.value = 'end'
        }
    } else if (draggingExtreme.value === 'end') { // Verificar se está arrastando o fim
        // Verificar se não tem startDate ou se a data hoverada é maior ou igual ao startDate
        if (!start || hoveredDate >= start) {
            // Atualizar endDate
            selectedDateRange.value.endDate = hoveredDate
        } else {
            // Se passou do início, trocar: o start vira end, a data hovered vira start
            selectedDateRange.value.endDate = start

            // Atualizar startDate
            selectedDateRange.value.startDate = hoveredDate

            // Definir o extremo como start
            draggingExtreme.value = 'start'
        }
    }
    
    // Emitir eventos durante o arrasto
    emit('changed', {
        startDate: selectedDateRange.value.startDate,
        endDate: selectedDateRange.value.endDate
    })
}

/*
    Função para lidar com o evento de mouse up
    Este função é usado para lidar com o evento de mouse up.
    Ele é usado para lidar com o evento de mouse up.
*/
const handleDayMouseUp = () => {
    // Se estiver arrastando, retornar
    if (isDragging.value) {
        // Desativar o arrasto
        isDragging.value = false
        // Limpar o extremo
        draggingExtreme.value = null
        // Limpar o modo de edição
        editingRangeDate.value = null
        
        // Emitir evento final
        const startDate = selectedDateRange.value.startDate

        // Obter o endDate
        const endDate = selectedDateRange.value.endDate

        // Emitir evento de data selecionada
        emit('date-selected', {
            startDate: startDate,
            endDate: endDate,
            isRange: true,
            isoString: startDate && endDate ? {
                start: startDate.toISOString(),
                end: endDate.toISOString()
            } : null,
            isoStringLocal: startDate && endDate ? {
                start: formatISOLocal(startDate),
                end: formatISOLocal(endDate)
            } : null
        })
    }
}

/*
    Função para lidar com o evento de touch start
    Este função é usado para lidar com o evento de touch start.
    Ele é usado para lidar com o evento de touch start.
*/
const handleDayTouchStart = (event, day) => {
    // Se estiver desabilitado ou a data estiver desabilitada, ou não permitir range ou não permitir edição, retornar
    if (props.disabled || day.isDisabled || !props.allowRange || !props.editRange) return
    
    // Normalizar a data clicada
    const clickedDate = normalizeDate(day.fullDate)

    // Se não conseguir normalizar, retornar
    if (!clickedDate) return
    
    // Obter o startDate
    const start = selectedDateRange.value.startDate

    // Obter o endDate
    const end = selectedDateRange.value.endDate
    
    // Guardar o elemento onde o touch começou
    touchStartElement.value = event.currentTarget
    
    // Verificar se tocou no início ou fim do range
    if (start && isSameDay(clickedDate, start)) {
        // Prevenir o comportamento padrão
        event.preventDefault()
        // Ativar o arrasto
        isDragging.value = true
        // Definir o extremo como start
        draggingExtreme.value = 'start'
        // Definir o modo de edição como start
        editingRangeDate.value = 'start'
    } else if (end && isSameDay(clickedDate, end)) {
        // Prevenir o comportamento padrão
        event.preventDefault()
        // Ativar o arrasto
        isDragging.value = true
        // Definir o extremo como end
        draggingExtreme.value = 'end'
        // Definir o modo de edição como end
        editingRangeDate.value = 'end'
    }
}

/*
    Função para lidar com o evento de touch move
    Este função é usado para lidar com o evento de touch move.
    Ele é usado para lidar com o evento de touch move.
*/
const handleDayTouchMove = (event) => {
    // Se não estiver arrastando, ou não estiver definido o extremo, ou estiver desabilitado, retornar
    if (!isDragging.value || !draggingExtreme.value || props.disabled) return
    
    // Prevenir o comportamento padrão
    event.preventDefault()
    
    // Obter o elemento sob o toque atual
    const touch = event.touches[0]

    // Se não conseguir obter o toque, retornar
    if (!touch) return
    
    // Obter o elemento sob o toque atual
    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY)

    // Se não conseguir obter o elemento, retornar
    if (!elementUnderTouch) return
    
    // Encontrar o elemento do dia (pode ser o span ou o div)
    const dayElement = elementUnderTouch.closest('.calendar__day')

    // Se não conseguir encontrar o elemento, retornar
    if (!dayElement) return
    
    // Obter o índice do dia a partir do atributo data-day-index
    const dayIndex = dayElement.getAttribute('data-day-index')

    // Se não conseguir obter o índice, retornar
    if (dayIndex === null) return
    
    // Encontrar o objeto day correspondente no calendarDays
    const dayObj = calendarDays.value[parseInt(dayIndex)]

    // Se não conseguir encontrar o objeto, retornar
    if (!dayObj || dayObj.isDisabled) return
    
    // Normalizar a data hoverada
    const hoveredDate = normalizeDate(dayObj.fullDate)

    // Se não conseguir normalizar, retornar
    if (!hoveredDate) return
    
    // Obter o startDate
    const start = selectedDateRange.value.startDate

    // Obter o endDate
    const end = selectedDateRange.value.endDate

    // Verificar se está arrastando o início    
    if (draggingExtreme.value === 'start') {
        // Verificar se não tem endDate ou se a data hoverada é menor ou igual ao endDate
        if (!end || hoveredDate <= end) {
            // Atualizar startDate
            selectedDateRange.value.startDate = hoveredDate
        } else {
            // Se passou do fim, trocar: o end vira start, a data hovered vira end
            selectedDateRange.value.startDate = end

            // Atualizar endDate
            selectedDateRange.value.endDate = hoveredDate

            // Definir o extremo como end
            draggingExtreme.value = 'end'
        }
    } else if (draggingExtreme.value === 'end') { // Verificar se está arrastando o fim
        // Verificar se não tem startDate ou se a data hoverada é maior ou igual ao startDate
        if (!start || hoveredDate >= start) {
            // Atualizar endDate
            selectedDateRange.value.endDate = hoveredDate
        } else {
            // Se passou do início, trocar: o start vira end, a data hovered vira start
            selectedDateRange.value.endDate = start

            // Atualizar startDate
            selectedDateRange.value.startDate = hoveredDate

            // Definir o extremo como start
            draggingExtreme.value = 'start'
        }
    }
    
    // Emitir eventos durante o arrasto
    emit('changed', {
        startDate: selectedDateRange.value.startDate,
        endDate: selectedDateRange.value.endDate
    })
}

/*
    Função para lidar com o evento de touch end
    Este função é usado para lidar com o evento de touch end.
    Ele é usado para lidar com o evento de touch end.
*/
const handleDayTouchEnd = () => {
    // Se estiver arrastando, retornar
    if (isDragging.value) {
        // Desativar o arrasto
        isDragging.value = false
        // Limpar o extremo
        draggingExtreme.value = null
        // Limpar o modo de edição
        editingRangeDate.value = null
        // Limpar o elemento onde o touch começou
        touchStartElement.value = null
        
        // Emitir evento final
        const startDate = selectedDateRange.value.startDate

        // Obter o endDate
        const endDate = selectedDateRange.value.endDate

        // Emitir evento de data selecionada
        emit('date-selected', {
            startDate: startDate,
            endDate: endDate,
            isRange: true,
            isoString: startDate && endDate ? {
                start: startDate.toISOString(),
                end: endDate.toISOString()
            } : null,
            isoStringLocal: startDate && endDate ? {
                start: formatISOLocal(startDate),
                end: formatISOLocal(endDate)
            } : null
        })
    }
}

/*
    Função para parsear o valor
    Este função é usado para parsear o valor.
    Ele é usado para parsear o valor.
*/
const parseValue = (value) => {
    // Se não há valor, retornar null
    if (!value) return null

    // Verificar se é um objeto com startDate e/ou endDate (range mode)
    if (typeof value === 'object' && !(value instanceof Date)) {
        // Verificar se tem startDate ou endDate
        if (value.startDate || value.endDate) {
            // Retornar objeto com startDate e endDate
            return {
                startDate: value.startDate ? parseDateValue(value.startDate) : null,
                endDate: value.endDate ? parseDateValue(value.endDate) : null
            }
        }
    }

    // Se for Date, retornar o valor
    if (value instanceof Date) {
        return value
    }

    // Verificar se é uma string
    if (typeof value === 'string') {
        // Se for formato YYYY-Www (tipo week), parsear como segunda-feira da semana
        if (/^\d{4}-W\d{2}$/i.test(value)) {
            // Encontrar o ano e a semana
            const match = value.match(/^(\d{4})-W(\d{2})$/i)

            // Se não conseguir encontrar o ano e a semana, retornar null
            if (!match) return null

            // Obter o ano
            const year = parseInt(match[1], 10)

            // Obter a semana
            const week = parseInt(match[2], 10)

            // Se o ano ou a semana não forem válidos, retornar null
            if (isNaN(year) || isNaN(week) || week < 1 || week > 53) return null

            // Calcular a data da segunda-feira da semana ISO 8601
            // A primeira semana do ano é a que contém o primeiro dia de quinta-feira (4 de janeiro)
            const jan4 = new Date(year, 0, 4)

            // Normalizar para meia-noite
            jan4.setHours(0, 0, 0, 0)

            // Encontrar a quinta-feira da semana que contém 4 de janeiro
            const jan4Day = jan4.getDay() || 7 // 0 = domingo, converter para 7

            // Calcular a diferença para a quarta-feira da semana ISO 8601
            const daysToThursday = (4 - jan4Day + 7) % 7

            // Criar a data da quarta-feira da semana ISO 8601
            const firstThursday = new Date(year, 0, 4 + daysToThursday)

            // Normalizar para meia-noite
            firstThursday.setHours(0, 0, 0, 0)

            // A segunda-feira da primeira semana é 3 dias antes da primeira quinta-feira
            const firstMonday = new Date(year, 0, firstThursday.getDate() - 3)

            // Normalizar para meia-noite
            firstMonday.setHours(0, 0, 0, 0)

            // Adicionar semanas (week - 1) * 7 dias
            const weekStart = new Date(firstMonday)

            // Adicionar semanas (week - 1) * 7 dias
            weekStart.setDate(firstMonday.getDate() + (week - 1) * 7)

            // Normalizar para meia-noite
            weekStart.setHours(0, 0, 0, 0)

            // Retornar a data da segunda-feira da semana ISO 8601
            return weekStart
        }
        // Se for formato YYYY-MM (tipo month), parsear como primeiro dia do mês
        if (/^\d{4}-\d{2}$/.test(value)) {
            // Encontrar o ano e o mês
            const [year, month] = value.split('-').map(Number)

            // Criar a data do primeiro dia do mês
            return new Date(year, month - 1, 1)
        }
        // Se for formato YYYY-MM-DD, parsear explicitamente para evitar problemas de timezone
        if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            // Encontrar o ano, mês e dia
            const [year, month, day] = value.split('-').map(Number)

            // Criar a data do dia
            return new Date(year, month - 1, day)
        }
        // Se for formato YYYY-MM-DDTHH:mm ou YYYY-MM-DDTHH:mm:ss (tipo datetime-local)
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(value)) {
            return null // Tipo datetime-local será parseado separadamente
        }
        // Se for formato HH:mm ou HH:mm:ss (tipo time), não retornar Date
        if (/^\d{2}:\d{2}(:\d{2})?$/.test(value)) {
            return null // Tipo time não retorna Date
        }

        // Criar a data a partir do valor
        const parsed = new Date(value)

        // Se a data é válida, retornar a data normalizada
        if (!isNaN(parsed.getTime())) {
            return parsed
        }
    }

    return null
}

/*
    Função para parsear o valor de data
    Este função é usado para parsear o valor de data.
    Ele é usado para parsear o valor de data.
*/
const parseDateValue = (dateValue) => {
    // Se não há valor, retornar null
    if (!dateValue) return null

    // Se for Date, retornar a data normalizada
    if (dateValue instanceof Date) {
        return normalizeDate(dateValue)
    }

    // Verificar se é uma string
    if (typeof dateValue === 'string') {
        // Se for formato YYYY-MM-DD, parsear explicitamente para evitar problemas de timezone
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
            // Encontrar o ano, mês e dia
            const [year, month, day] = dateValue.split('-').map(Number)

            // Criar a data do dia
            const parsed = new Date(year, month - 1, day)

            // Retornar a data normalizada
            return normalizeDate(parsed)
        }
        // Criar a data a partir do valor
        const parsed = new Date(dateValue)

        // Se a data é válida, retornar a data normalizada
        if (!isNaN(parsed.getTime())) {
            // Retornar a data normalizada
            return normalizeDate(parsed)
        }
    }

    return null
}

onBeforeMount(() => {
    // Inicializar valores de semana se for tipo 'week'
    if (props.inputType === 'week') {
        // Verificar se tem valor e se é uma string e se é um formato de semana válido
        if (props.value && typeof props.value === 'string' && /^\d{4}-W\d{2}$/i.test(props.value)) {
            // Parsear o valor
            const parsed = parseValue(props.value)

            // Verificar se é uma data válida
            if (parsed && parsed instanceof Date && !isNaN(parsed.getTime())) {
                // Normalizar a data
                const normalized = normalizeDate(parsed)

                // Definir a data selecionada
                selectedDate.value = normalized

                // Navegar para o mês da semana (usar a segunda-feira como referência)
                currentDate.value = new Date(normalized.getFullYear(), normalized.getMonth(), 1)

                // Definir o timestamp da data atual
                currentDateTimestamp.value = Date.now()

                // Incrementar a chave do calendário
                calendarKey.value++
            }
        } else if (!props.value) {
            // Se não há valor inicial, garantir que currentDate está inicializado
            if (!currentDate.value || isNaN(currentDate.value.getTime())) {
                // Definir a data atual
                currentDate.value = new Date()

                // Definir o timestamp da data atual
                currentDateTimestamp.value = Date.now()
            }
        }
        return
    }

    // Inicializar valores de tempo se for tipo 'time' ou 'datetime-local'
    if (props.inputType === 'time' || props.inputType === 'datetime-local') {
        // Verificar se tem valor e se é uma string
        if (props.value && typeof props.value === 'string') {
            // Verificar se é tipo datetime-local
            if (props.inputType === 'datetime-local') {
                // Formato YYYY-MM-DDTHH:mm ou YYYY-MM-DDTHH:mm:ss
                const parts = props.value.split('T')

                // Verificar se tem 2 partes
                if (parts.length === 2) {
                    // Obter a data e a hora
                    const [datePart, timePart] = parts

                    // Encontrar o ano, mês e dia
                    const [year, month, day] = datePart.split('-').map(Number)

                    // Criar a data do dia
                    const date = new Date(year, month - 1, day)

                    // Definir a data selecionada
                    selectedDate.value = date

                    // Definir a data atual
                    currentDate.value = new Date(year, month - 1, 1)

                    // Separar a hora em partes
                    const timeParts = timePart.split(':')

                    // Verificar se tem pelo menos 2 partes
                    if (timeParts.length >= 2) {
                        // Definir a hora
                        selectedHour.value = parseInt(timeParts[0], 10) || 0

                        // Definir o minuto
                        selectedMinute.value = parseInt(timeParts[1], 10) || 0

                        // Definir o segundo
                        selectedSecond.value = timeParts[2] ? parseInt(timeParts[2], 10) : 0
                    }
                }
            } else {
                // Tipo 'time' - apenas HH:mm ou HH:mm:ss
                const timeParts = props.value.split(':')

                // Verificar se tem pelo menos 2 partes
                if (timeParts.length >= 2) {
                    // Definir a hora
                    selectedHour.value = parseInt(timeParts[0], 10) || 0

                    // Definir o minuto
                    selectedMinute.value = parseInt(timeParts[1], 10) || 0

                    // Definir o segundo
                    selectedSecond.value = timeParts[2] ? parseInt(timeParts[2], 10) : 0
                }
            }
        }
        return
    }

    // Verificar se tem valor
    if (props.value) {
        // Parsear o valor
        const parsed = parseValue(props.value)

        // Verificar se é uma data válida
        if (parsed) {
            // Verificar se é range (só se allowRange estiver ativo)
            if (props.allowRange && parsed && typeof parsed === 'object' && !(parsed instanceof Date) && (parsed.startDate || parsed.endDate)) {
                // Definir o range de datas
                selectedDateRange.value = {
                    startDate: parsed.startDate ? new Date(parsed.startDate.getTime()) : null,
                    endDate: parsed.endDate ? new Date(parsed.endDate.getTime()) : null
                }

                // Só navegar para o mês do range se editRange for true (permitir edição)
                // Se editRange for false, não resetar o currentDate para permitir navegação livre
                if (props.editRange) {
                    // Obter a data alvo
                    const targetDate = parsed.startDate || parsed.endDate

                    // Verificar se a data alvo é válida
                    if (targetDate) {
                        // Definir a data atual
                        currentDate.value = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1)

                        // Definir o timestamp da data atual
                        currentDateTimestamp.value = Date.now()

                        // Incrementar a chave do calendário
                        calendarKey.value++
                    }
                }
            } else if (parsed instanceof Date) { // Verificar se é uma data válida
                // Validar se a data respeita min/max/step antes de definir
                const normalized = normalizeDate(parsed)

                // Verificar se a data é válida e não está desabilitada
                if (normalized && !isDateDisabled(normalized)) {
                    // Definir a data selecionada
                    selectedDate.value = normalized

                    // Só navegar para o mês da data se editRange for true ou se não estiver em modo range
                    if (!props.allowRange || props.editRange) {
                        // Definir a data atual
                        currentDate.value = new Date(normalized.getFullYear(), normalized.getMonth(), 1)

                        // Definir o timestamp da data atual
                        currentDateTimestamp.value = Date.now()

                        // Incrementar a chave do calendário
                        calendarKey.value++

                        // Se for inputType 'month', garantir que está no modo 'month'
                        if (props.inputType === 'month') {
                            // Definir o modo de visualização como 'month'
                            viewMode.value = 'month'
                        }
                    }
                } else {
                    // Se a data não é válida (não respeita step), não definir selectedDate
                    selectedDate.value = null
                }
            }
        }
    }
})

/*
    Função para atualizar o valor
    Este função é usado para atualizar o valor.
    Ele é usado para atualizar o valor.
*/
watch(() => props.value, (newValue) => {
    // Se for tipo 'week', atualizar semana selecionada
    if (props.inputType === 'week') {
        // Verificar se tem valor e se é uma string e se é um formato de semana válido
        if (newValue && typeof newValue === 'string' && /^\d{4}-W\d{2}$/i.test(newValue)) {
            // Parsear o valor
            const parsed = parseValue(newValue)

            // Verificar se é uma data válida
            if (parsed && parsed instanceof Date && !isNaN(parsed.getTime())) {
                // Normalizar a data
                const normalized = normalizeDate(parsed)

                // Definir a data selecionada
                selectedDate.value = normalized

                // Navegar para o mês da semana (usar a segunda-feira como referência)
                currentDate.value = new Date(normalized.getFullYear(), normalized.getMonth(), 1)

                // Definir o timestamp da data atual
                currentDateTimestamp.value = Date.now()

                // Incrementar a chave do calendário
                calendarKey.value++
            }
        } else {
            // Se não tem valor, definir a data selecionada como null
            selectedDate.value = null
        }
        return
    }

    // Se for tipo 'time' ou 'datetime-local', atualizar valores de hora/minuto
    if (props.inputType === 'time' || props.inputType === 'datetime-local') {
        // Verificar se tem valor e se é uma string
        if (newValue && typeof newValue === 'string') {
            // Verificar se é tipo datetime-local
            if (props.inputType === 'datetime-local') {
                // Formato YYYY-MM-DDTHH:mm ou YYYY-MM-DDTHH:mm:ss
                const parts = newValue.split('T')

                // Verificar se tem 2 partes
                if (parts.length === 2) {
                    // Obter a data e a hora
                    const [datePart, timePart] = parts

                    // Encontrar o ano, mês e dia
                    const [year, month, day] = datePart.split('-').map(Number)

                    // Criar a data do dia
                    const date = new Date(year, month - 1, day)

                    // Definir a data selecionada
                    selectedDate.value = date

                    // Definir a data atual
                    currentDate.value = new Date(year, month - 1, 1)

                    // Separar a hora em partes
                    const timeParts = timePart.split(':')

                    // Verificar se tem pelo menos 2 partes
                    if (timeParts.length >= 2) {
                        // Definir a hora
                        selectedHour.value = parseInt(timeParts[0], 10) || 0

                        // Definir o minuto
                        selectedMinute.value = parseInt(timeParts[1], 10) || 0

                        // Definir o segundo
                        selectedSecond.value = timeParts[2] ? parseInt(timeParts[2], 10) : 0
                    }
                }
            } else {
                // Tipo 'time' - apenas HH:mm ou HH:mm:ss
                const timeParts = newValue.split(':')

                // Verificar se tem pelo menos 2 partes
                if (timeParts.length >= 2) {
                    // Definir a hora
                    selectedHour.value = parseInt(timeParts[0], 10) || 0

                    // Definir o minuto
                    selectedMinute.value = parseInt(timeParts[1], 10) || 0

                    // Definir o segundo
                    selectedSecond.value = timeParts[2] ? parseInt(timeParts[2], 10) : 0
                }
            }
        }
        return
    }

    // Parsear o valor
    const parsed = parseValue(newValue)

    // Verificar se é uma data válida
    if (parsed) {
        // Verificar se é range (só se allowRange estiver ativo)
        if (props.allowRange && parsed && typeof parsed === 'object' && !(parsed instanceof Date) && (parsed.startDate || parsed.endDate)) {
            // Definir o range de datas
            selectedDateRange.value = {
                startDate: parsed.startDate ? new Date(parsed.startDate.getTime()) : null,
                endDate: parsed.endDate ? new Date(parsed.endDate.getTime()) : null
            }

            // Só navegar para o mês do range se editRange for true (permitir edição)
            // Se editRange for false, não resetar o currentDate para permitir navegação livre
            if (props.editRange) {
                // Obter a data alvo
                const targetDate = parsed.startDate || parsed.endDate

                // Verificar se a data alvo é válida
                if (targetDate) {
                    // Definir a data atual
                    currentDate.value = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1)

                    // Definir o timestamp da data atual
                    currentDateTimestamp.value = Date.now()

                    // Incrementar a chave do calendário
                    calendarKey.value++
                }
            }
        } else if (parsed instanceof Date) {
            // Validar se a data respeita min/max/step antes de definir
            const normalized = normalizeDate(parsed)
            if (normalized && !isDateDisabled(normalized)) {
                selectedDate.value = normalized
                // Só navegar para o mês da data se editRange for true ou se não estiver em modo range
                if (!props.allowRange || props.editRange) {
                    currentDate.value = new Date(normalized.getFullYear(), normalized.getMonth(), 1)
                    currentDateTimestamp.value = Date.now()
                    calendarKey.value++
                }
            } else {
                // Se a data não é válida (não respeita step), não definir selectedDate
                selectedDate.value = null
            }
        }
    } else {
        // Se não é uma data válida, definir a data selecionada como null e o range de datas como null
        selectedDate.value = null
        // Definir o range de datas como null
        selectedDateRange.value = { startDate: null, endDate: null }
    }
}, { immediate: true })

/*
    Função para atualizar a data atual
    Este função é usado para atualizar a data atual.
    Ele é usado para atualizar a data atual.
*/
watch(() => props.goToDate, (newValue) => {
    // Processar quando goToDate mudar
    if (newValue) {
        // Chamar a função para atualizar a data atual
        goToDateFunction(newValue)
    }
}, { deep: true })

// Adicionar listener global para mouseup e touchend (caso o usuário solte fora do calendário)
onMounted(() => {
    // Adicionar listener global para mouseup
    document.addEventListener('mouseup', handleDayMouseUp, { passive: true })

    // Adicionar listener global para touchend
    document.addEventListener('touchend', handleDayTouchEnd, { passive: true })
})

onUnmounted(() => {
    // Remover listener global para mouseup
    document.removeEventListener('mouseup', handleDayMouseUp, { passive: true })

    // Remover listener global para touchend
    document.removeEventListener('touchend', handleDayTouchEnd, { passive: true })
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

@keyframes blink {
    0%, 100% {
        background-color: v-bind('selectionColorComputed');
    }
    50% {
        background-color: v-bind('selectionColorLight');
    }
}

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
    font-family: v-bind('font') !important;
}

.component-disabled {
    cursor: not-allowed;
    pointer-events: none;
	user-select: none;

    .component {
        opacity: 0.7;
    }
}

// inicio propTheme
.component__theme--dark {
    .calendar-wrapper {
        .calendar {
            background: #1e1e1e;
            color: #e0e0e0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

            .calendar__header {
                .calendar__nav-button,
                .calendar__month-year-button {
                    color: #e0e0e0;

                    &:hover:not(:disabled) {
                        background: #333;
                        color: #fff;
                    }
                }

                .calendar__clear-button {
                    color: #e0e0e0;

                    &:hover:not(:disabled) {
                        color: #ff5252;
                        background: #333;
                        transform: scale(1.1);
                    }

                    &:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                }
            }

            .calendar__month-picker,
            .calendar__year-picker {
                .calendar__month-item,
                .calendar__year-item {
                    color: #e0e0e0 !important;
                    background: v-bind('monthYearItemBgComputed') !important;
                    border-color: #555 !important;

                    &:hover:not(.calendar__month-item--selected):not(.calendar__year-item--selected):not(:disabled) {
                        background: v-bind('monthYearItemBgHoverComputed') !important;
                        color: v-bind('hoverTextColorComputed') !important;
                    }

                    &.calendar__month-item--selected,
                    &.calendar__year-item--selected {
                        background: v-bind('selectionColor') !important;
                        color: white !important;
                    }
                }
            }

            .calendar__view-title {
                color: #e0e0e0 !important;
            }

            .calendar__weekdays {
                .calendar__weekday {
                    color: #b0b0b0;
                }
            }

            .calendar__days {
                .calendar__day {
                    touch-action: none;
                    color: #fff;

                    .calendar__day-number {
                        color: #e0e0e0;
                    }

                    &.calendar__day--other-month {
                        .calendar__day-number {
                            color: #666;
                            opacity: 1;
                        }
                    }

                    &.calendar__day--today {
                        border-color: v-bind('todayColorComputed');
                    }

                    &:hover:not(.calendar__day--disabled):not(.calendar__day--selected):not(.calendar__day--range-start):not(.calendar__day--range-end) {
                        background: v-bind('dayHoverBgComputed');
                        color: v-bind('dayHoverTextColorComputed');

                        .calendar__day-number {
                            color: v-bind('dayHoverTextColorComputed');
                        }
                    }

                    &.calendar__day--selected {
                        background: v-bind('selectionColor');
                        color: white;

                        .calendar__day-number {
                            color: white;
                        }
                    }

                    &.calendar__day--in-range {
                        background: v-bind('selectionColorRange');
                    }

                    &.calendar__day--range-start,
                    &.calendar__day--range-end {
                        background: v-bind('selectionColor');
                        color: white;

                        .calendar__day-number {
                            color: white;
                        }
                    }
                }
            }

            .calendar__time-picker {
                .calendar__time-display {
                    background: v-bind('timeDisplayBgComputed');
                    border-top-color: #444;

                    .calendar__time-display-label {
                        color: v-bind('timeDisplayTextColorComputed');
                    }

                    .calendar__time-display-value {
                        color: v-bind('timeDisplayTextColorComputed');
                    }

                    .calendar__time-edit-button {
                        background: v-bind('timeEditButtonBgComputed');
                        color: v-bind('timeEditButtonTextColorComputed');

                        &:hover:not(:disabled) {
                            background: v-bind('timeEditButtonBgHoverComputed');
                            color: v-bind('timeEditButtonTextColorHoverComputed');
                        }
                    }
                }

                .calendar__time-controls {
                    .calendar__time-arrow {
                        color: #e0e0e0;

                        &:hover:not(:disabled) {
                            background: #333;
                        }
                    }

                    .calendar__time-value {
                        color: #e0e0e0;
                    }
                }

                .calendar__time-separator {
                    color: #e0e0e0 !important;
                }
            }
        }
    }
}

.component__theme--light {
    .calendar-wrapper {
        .calendar {
            background: #fff;
            color: #333;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    }
}
// fim propTheme

.calendar-wrapper {
    font-family: v-bind('font') !important;
    box-sizing: border-box;
    
    .calendar {
        background: #fff;
        border-radius: v-bind('styleBorderRadius');
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding: 16px;
        user-select: none;
        font-family: inherit;
        overflow: hidden;

        &.disabled {
            opacity: 0.6;
            pointer-events: none;
        }

        .calendar__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 9px;
            padding-bottom: 9px;
            border-bottom: 1px solid #e0e0e0;

            .calendar__nav-button {
                background: none;
                border: none;
                font-size: 20px;
                color: #666;
	cursor: pointer;
                padding: 4px 12px;
                border-radius: 4px;
                transition: all 0.2s;
                font-family: inherit;

                &:hover:not(:disabled) {
                    background: #f0f0f0;
                    color: #333;
                }

                &:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
            }

            .calendar__clear-button {
                background: none;
                border: none;
                font-size: 24px;
                color: #666;
                cursor: pointer;
                padding: 0 8px;
                line-height: 1;
                transition: all 0.2s;
                font-family: inherit;

                &:hover:not(:disabled) {
                    color: #d32f2f;
                    transform: scale(1.1);
                }

                &:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            }

            .calendar__month-year {
                display: flex;
                gap: 8px;
                align-items: center;
                flex: 1;
                justify-content: center;
            }

            .calendar__month-year-button {
                padding: 6px 12px;
                border: none;
                border-radius: 4px;
                font-size: 16px;
                font-weight: 600;
                color: #333;
                background: transparent;
                cursor: pointer;
                transition: all 0.2s;
                font-family: v-bind('font') !important;

                &:hover:not(:disabled) {
                    background: #f0f0f0;
                    color: v-bind('primaryColorComputed');
                }

                &:focus {
                    outline: none;
                    background: #f0f0f0;
                }

                &:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            }

            .calendar__view-title {
                font-weight: 600;
                font-size: 18px;
                color: #333;
                font-family: inherit;
            }
        }

        .calendar__month-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 3px;
            padding: 12px 0;
            height: 280px;
            overflow-y: auto;
            overflow-x: hidden;
            align-content: start;
        }

        .calendar__month-item {
            padding: 12px 8px;
            // border: 1px solid #e0e0e0;
            border: none;
            border-radius: 4px;
            background: v-bind('monthYearItemBgComputed');
            color: v-bind('normalTextColorComputed');
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
	text-align: center;
            min-height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: inherit;

            &:hover:not(:disabled):not(.calendar__month-item--selected) {
                background: v-bind('monthYearItemBgHoverComputed');
                        border-color: v-bind('primaryColorComputed');
                color: v-bind('hoverTextColorComputed');
            }

            &:focus {
                outline: none;
                        border-color: v-bind('primaryColorComputed');
            }

            &.calendar__month-item--selected {
                background: v-bind('primaryColorComputed');
                color: white;
                        border-color: v-bind('primaryColorComputed');
                font-weight: 600;
            }

            &:disabled {
                opacity: 0.6;
  cursor: not-allowed;
            }
        }

        .calendar__year-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 12px 5px;
            height: 280px;
            overflow-y: auto;
            overflow-x: hidden;
            align-content: start;
        }

        .calendar__year-item {
            padding: 12px 8px;
            // border: 1px solid #e0e0e0;
            border: none;
            border-radius: 4px;
            background: v-bind('monthYearItemBgComputed');
            color: v-bind('normalTextColorComputed');
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
            min-height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            width: 100%;
            font-family: inherit;

            &:hover:not(:disabled):not(.calendar__year-item--selected) {
                background: v-bind('monthYearItemBgHoverComputed');
                        border-color: v-bind('primaryColorComputed');
                color: v-bind('hoverTextColorComputed');
            }

            &:focus {
                outline: none;
                        border-color: v-bind('primaryColorComputed');
            }

            &.calendar__year-item--selected {
                background: v-bind('primaryColorComputed');
                color: white;
                        border-color: v-bind('primaryColorComputed');
                font-weight: 600;
            }

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
        }

        .calendar__weekdays {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 4px;
            margin-bottom: 8px;

            .calendar__weekday {
                text-align: center;
                font-size: 12px;
                font-weight: 500;
                color: #888;
                padding: 8px 0;
                font-family: inherit;
            }
        }

        .calendar__days {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 4px;
            min-height: 272px;

            .calendar__day {
                touch-action: none;
                aspect-ratio: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border-radius: 6px;
                transition: all 0.2s;
                position: relative;
                padding: 4px;

                &:hover:not(.calendar__day--disabled):not(.calendar__day--selected):not(.calendar__day--range-start):not(.calendar__day--range-end) {
                    background: v-bind('dayHoverBgComputed');
                    color: v-bind('dayHoverTextColorComputed');

                    .calendar__day-number {
                        color: v-bind('dayHoverTextColorComputed');
                    }
                }

                .calendar__day-number {
                    font-size: 14px;
                    color: #333;
                    font-family: inherit;
                }

                .calendar__day-events {
                    display: flex;
                    gap: 3px;
                    margin-top: 4px;
                    justify-content: center;
                    flex-wrap: wrap;
                    min-height: 10px;

                    .calendar__day-event-dot {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        display: block;
                        flex-shrink: 0;
                    }
                }

                &.calendar__day--other-month {
                    .calendar__day-number {
                        color: #ccc;
                    }
                }

                &.calendar__day--today {
                    .calendar__day-number {
                        font-weight: 600;
                        color: v-bind('todayColorComputed');
                    }
                }

                &.calendar__day--selected {
                    background: v-bind('selectionColor');

                    .calendar__day-number {
                        font-weight: 700;
                        color: white;
                    }

                    &:hover:not(.calendar__day--disabled) {
                        background: v-bind('selectionColorHover');
                    }
                }

                &.calendar__day--in-range {
                    background: v-bind('selectionColorRange');
                    border-radius: 0;

                    .calendar__day-number {
                        color: v-bind('selectionColor');
                    }

                    &:hover:not(.calendar__day--disabled):not(.calendar__day--selected):not(.calendar__day--range-start):not(.calendar__day--range-end) {
                        background: v-bind('dayHoverBgComputed');
                        color: v-bind('dayHoverTextColorComputed');

                        .calendar__day-number {
                            color: v-bind('dayHoverTextColorComputed');
                        }
                    }

                    // Se também está selecionada, priorizar a cor de seleção
                    &.calendar__day--selected {
                        background: v-bind('selectionColor');
                        border-radius: 6px;

                        .calendar__day-number {
                            color: white;
                        }

                        &:hover:not(.calendar__day--disabled) {
                            background: v-bind('selectionColorHover');
                        }
                    }
                }

                &.calendar__day--range-start {
                    background: v-bind('selectionColor');
                    border-top-left-radius: 6px;
                    border-bottom-left-radius: 6px;
                    cursor: grab;
                    user-select: none;

                    .calendar__day-number {
                        font-weight: 600;
                        color: white;
                    }

                    &:active,
                    &.calendar__day--dragging {
                        cursor: grabbing;
                    }
                }

                &.calendar__day--range-end {
                    background: v-bind('selectionColor');
                    border-top-right-radius: 6px;
                    border-bottom-right-radius: 6px;
                    cursor: grab;
                    user-select: none;

                    .calendar__day-number {
                        font-weight: 600;
                        color: white;
                    }

                    &:active,
                    &.calendar__day--dragging {
                        cursor: grabbing;
                    }
                }

                &.calendar__day--range-start.calendar__day--range-end {
                    border-radius: 6px;
                }

                &.calendar__day--editing {
                    animation: blink 1s ease-in-out infinite;
                }

                &.calendar__day--in-selected-week {
                    background: v-bind('selectionColorRange');

                    .calendar__day-number {
                        color: v-bind('selectionColor');
                        font-weight: 500;
                    }

                    // Se também está selecionada individualmente, priorizar
                    &.calendar__day--selected {
                        background: #4caf50;

                        .calendar__day-number {
                            color: white;
                            font-weight: 700;
                        }
                    }

                    // Se também é hoje, destacar mais
                    &.calendar__day--today {
                        .calendar__day-number {
                            color: v-bind('todayColorComputed');
                            font-weight: 600;
                        }
                    }

                    &:hover:not(.calendar__day--disabled) {
                        background: #bbdefb;
                    }
                }

                &.calendar__day--disabled {
                    cursor: not-allowed;
                    opacity: 0.4;
                    pointer-events: none;

                    .calendar__day-number {
                        color: #999;
                        text-decoration: line-through;
                    }

                    &:hover {
                        background: transparent;
                    }
                }
            }
        }

        .calendar__time-picker {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 24px 0;
            min-height: 125px;
            position: relative;
            transform: scale(.8);
            transform-origin: center;
        }

        .calendar__time-field {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            position: relative;
            z-index: 1;
            min-width: 70px;
            flex-shrink: 0;
            isolation: isolate;
            pointer-events: auto;

            &.calendar__time-field--hours {
                z-index: 2;
            }

            &.calendar__time-field--minutes {
                z-index: 3;
            }
        }

        .calendar__time-value {
            font-size: 32px;
            font-weight: 600;
            color: #333;
            min-width: 50px;
            text-align: center;
            padding: 8px 16px;
            background: #f5f5f5;
            border-radius: 8px;
  pointer-events: none;
  user-select: none;
            font-family: inherit;
        }

        .calendar__time-arrow {
            background: #f0f0f0;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 45px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 12px;
            color: #666;
            transition: all 0.2s;
            padding: 0;
            position: relative;
            z-index: 100;
            flex-shrink: 0;
            pointer-events: auto;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            margin: 0;
            box-sizing: border-box;
            font-family: inherit;

            &[data-field="minute"] {
                z-index: 1001;
            }

            &[data-field="hour"] {
                z-index: 1000;
            }

            &:hover:not(:disabled) {
                background: #e0e0e0;
                        border-color: v-bind('primaryColorComputed');
                color: v-bind('primaryColor');
            }

            &:active:not(:disabled) {
                background: #d0d0d0;
            }

            &:disabled {
                opacity: 0.4;
                cursor: not-allowed;
                background: #f5f5f5;
            }
        }

        .calendar__time-separator {
            font-size: 32px;
            font-weight: 600;
            color: #333;
            padding: 0 8px;
            flex-shrink: 0;
            pointer-events: none;
            user-select: none;
            font-family: inherit;
            font-family: inherit;
        }

        .calendar__time-display {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-top: 8px;
            padding: 14px 16px 1px 16px;
            border-top: 1px solid #e0e0e0;
            background: v-bind('timeDisplayBgComputed');
        }

        .calendar__time-display-label {
            font-size: 14px;
            color: v-bind('timeDisplayTextColorComputed');
            font-weight: 500;
            font-family: inherit;
        }

        .calendar__time-display-value {
            font-size: 18px;
            font-weight: 600;
            color: v-bind('timeDisplayTextColorComputed');
            min-width: 80px;
            text-align: center;
            font-family: inherit;
        }

        .calendar__time-edit-button {
            background: v-bind('timeEditButtonBgComputed');
            color: v-bind('timeEditButtonTextColorComputed');
            border: none;
            border-radius: 4px;
            padding: 6px 16px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
            font-family: inherit;

            &:hover:not(:disabled) {
                background: v-bind('timeEditButtonBgHoverComputed');
                color: v-bind('timeEditButtonTextColorHoverComputed');
            }

            &:disabled {
                background: #ccc;
                cursor: not-allowed;
            }
        }
  }
}
</style>
