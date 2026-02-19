<template>
  <div class="container-fluid test-page">
    <div class="row">
      <div class="col-md-10 col-md-offset-1 test-page__title">
        <h2>Test page</h2>
        <p class="test-page__component-name"><strong>Component:</strong> NbCalendar</p>
        <p class="test-page__warning">Warning: Look at the console to see the events</p>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content" style="margin-bottom: 50px; overflow: hidden">
        <select v-model="calendarType">
          <option value="date">date</option>
          <option value="month">month</option>
          <option value="time">time</option>
          <option value="datetime-local">datetime-local</option>
          <option value="week">week</option>
        </select>
      </div>
    </div>

    <!-- NbCalendar - Tipo Date -->
    <div v-if="calendarType === 'date'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbCalendar - Date (Light Theme)</h4>
        
        <NbCalendar
          nb-id="calendar-date-light-1"
          input-type="date"
          theme="light"
          :value="selectedDate1"
          @changed="($event) => { selectedDate1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Dark Theme)</h4>
        <NbCalendar
          nb-id="calendar-date-dark-1"
          input-type="date"
          theme="dark"
          :value="selectedDate2"
          @changed="($event) => { selectedDate2 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Custom Colors)</h4>
        <NbCalendar
          nb-id="calendar-date-custom-1"
          input-type="date"
          theme="light"
          primary-color="#9c27b0"
          selection-color="#7b1fa2"
          today-color="#ab47bc"
          :value="selectedDate3"
          @changed="($event) => { selectedDate3 = $event; console.log('changed:', $event) }"
          />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Com Range)</h4>
        <NbCalendar
          nb-id="calendar-date-range-1"
          input-type="date"
          theme="light"
          :allow-range="true"
          :value="selectedDateRange1"
          @changed="($event) => { selectedDateRange1 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Com Limites Min/Max)</h4>
        <NbCalendar
          nb-id="calendar-date-limits-1"
          input-type="date"
            theme="light"
          :min="minDate"
          :max="maxDate"
          :value="selectedDate4"
          @changed="($event) => { selectedDate4 = $event; console.log('changed:', $event) }"
          />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Com Eventos)</h4>
        <NbCalendar
          nb-id="calendar-date-events-1"
          input-type="date"
          theme="light"
          :events="calendarEvents"
          :value="selectedDate5"
          @changed="($event) => { selectedDate5 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Com Eventos e Block Clicks Without Events)</h4>
        <NbCalendar
          nb-id="calendar-date-events-1"
          input-type="date"
          theme="light"
          :events="calendarEvents"
          :value="selectedDate5"
          :block-clicks-without-events="true"
          @changed="($event) => { selectedDate5 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Semana Começa Segunda)</h4>
        <NbCalendar
          nb-id="calendar-date-monday-1"
          input-type="date"
          theme="light"
          :start-week-on-monday="true"
          :value="selectedDate6"
          @changed="($event) => { selectedDate6 = $event; console.log('changed:', $event) }"
          />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Locale EN-US)</h4>
        <NbCalendar
          nb-id="calendar-date-en-1"
          input-type="date"
          theme="light"
          locale="en-US"
          :value="selectedDate7"
          @changed="($event) => { selectedDate7 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Disabled)</h4>
        <NbCalendar
          nb-id="calendar-date-disabled-1"
          input-type="date"
            theme="light"
          :disabled="true"
          :value="new Date()"
          />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Largura Customizada)</h4>
        <NbCalendar
          nb-id="calendar-date-width-1"
          input-type="date"
          theme="light"
          :width="450"
          :value="selectedDate8"
          @changed="($event) => { selectedDate8 = $event; console.log('changed:', $event) }"
          />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Com Border Radius)</h4>
        <NbCalendar
          nb-id="calendar-date-radius-1"
          input-type="date"
          theme="light"
          :border-radius="1"
          :value="selectedDate9"
          @changed="($event) => { selectedDate9 = $event; console.log('changed:', $event) }"
          />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Abre no Mês Atual - Sem Data Selecionada)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Quando não há data selecionada, o calendário abre no mês/ano atual.
        </p>
        <NbCalendar
          nb-id="calendar-date-current-month-1"
          input-type="date"
          theme="light"
          :value="null"
          @changed="($event) => { console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Abre no Mês da Data Selecionada)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Quando há uma data selecionada, o calendário abre automaticamente no mês/ano dessa data.
          Este exemplo tem uma data em Março de 2024 pré-selecionada.
        </p>
        <NbCalendar
          nb-id="calendar-date-selected-month-1"
          input-type="date"
          theme="light"
          :value="preSelectedDate"
          @changed="($event) => { preSelectedDate = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Com Botão Limpar)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Botão de limpar (×) aparece quando há uma data selecionada. Ao clicar, limpa a seleção e emite eventos.
        </p>
        <NbCalendar
          nb-id="calendar-date-clear-1"
          input-type="date"
          theme="light"
          :show-clear-button="true"
          :value="selectedDateClear1"
          @changed="($event) => { selectedDateClear1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Com Botão Hoje)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Botão "Hoje" seleciona a data atual e navega para o mês/ano atual.
        </p>
        <NbCalendar
          nb-id="calendar-date-today-1"
          input-type="date"
          theme="light"
          :show-today-button="true"
          :value="selectedDateToday1"
          @changed="($event) => { selectedDateToday1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Com Botões Limpar e Hoje)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Ambos os botões habilitados. Limpar remove a seleção. Hoje seleciona a data atual.
        </p>
        <NbCalendar
          nb-id="calendar-date-both-buttons-1"
          input-type="date"
          theme="light"
          :show-clear-button="true"
          :show-today-button="true"
          :value="selectedDateBoth1"
          @changed="($event) => { selectedDateBoth1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Limpar Mantém Mês Atual)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Com <code>clearButtonKeepCurrentMonth="true"</code>, ao limpar a seleção, o calendário permanece no mês/ano atual da visualização.
        </p>
        <NbCalendar
          nb-id="calendar-date-clear-keep-month-1"
          input-type="date"
          theme="light"
          :show-clear-button="true"
          :clear-button-keep-current-month="true"
          :value="selectedDateKeepMonth1"
          @changed="($event) => { selectedDateKeepMonth1 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Date (Limpar Vai para Mês Atual)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Com <code>clearButtonKeepCurrentMonth="false"</code> (padrão), ao limpar a seleção, o calendário navega para o mês/ano atual do sistema.
        </p>
        <NbCalendar
          nb-id="calendar-date-clear-go-current-1"
          input-type="date"
          theme="light"
          :show-clear-button="true"
          :clear-button-keep-current-month="false"
          :value="selectedDateGoCurrent1"
          @changed="($event) => { selectedDateGoCurrent1 = $event; console.log('changed:', $event) }"
        />
      </div>
    </div>

    <!-- NbCalendar - Tipo Month -->
    <div v-if="calendarType === 'month'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbCalendar - Month (Light Theme)</h4>
        
        <NbCalendar
          nb-id="calendar-month-light-1"
          input-type="month"
          theme="light"
          :value="selectedMonth1"
          @changed="($event) => { selectedMonth1 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Month (Dark Theme)</h4>
        <NbCalendar
          nb-id="calendar-month-dark-1"
          input-type="month"
          theme="dark"
          :value="selectedMonth2"
          @changed="($event) => { selectedMonth2 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Month (Com Botões Limpar e Hoje)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Botões funcionam também para seleção de mês.
        </p>
        <NbCalendar
          nb-id="calendar-month-buttons-1"
          input-type="month"
          theme="light"
          :show-clear-button="true"
          :show-today-button="true"
          :value="selectedMonthButtons1"
          @changed="($event) => { selectedMonthButtons1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Month (Botão "Hoje" Personalizado)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Botão "Hoje" personalizado para seleção de mês. O tipo "month" não tem botão "Editar" pois não possui seletor de tempo.
        </p>
        <NbCalendar
          nb-id="calendar-month-today-custom-1"
          input-type="month"
          theme="light"
          :show-today-button="true"
          today-button-bg="#e91e63"
          today-button-text-color="#fff"
          today-button-bg-hover="#c2185b"
          today-button-text-color-hover="#fff"
          today-button-font-size="1rem"
          today-button-padding="4px 12px"
          today-button-border-radius="6px"
          :today-button-font-weight="600"
          today-button-border="2px solid #c2185b"
          :value="selectedMonthTodayCustom1"
          @changed="($event) => { selectedMonthTodayCustom1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />
      </div>
    </div>

    <!-- NbCalendar - Tipo Time -->
    <div v-if="calendarType === 'time'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbCalendar - Time (Light Theme)</h4>
        
        <NbCalendar
          nb-id="calendar-time-light-1"
          input-type="time"
          theme="light"
          :value="selectedTime1"
          @changed="($event) => { selectedTime1 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Time (Com Segundos)</h4>
        <NbCalendar
          nb-id="calendar-time-seconds-1"
          input-type="time"
          theme="light"
          :has-seconds="true"
          :value="selectedTime2"
          @changed="($event) => { selectedTime2 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Time (Com Step)</h4>
        <NbCalendar
          nb-id="calendar-time-step-1"
          input-type="time"
          theme="light"
          step="900"
          :value="selectedTime3"
          @changed="($event) => { selectedTime3 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Time (Com Botões Limpar e Agora)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          No modo time, o botão "Agora" seleciona a hora atual. O botão limpar (×) aparece quando há uma hora selecionada.
        </p>
        <NbCalendar
          nb-id="calendar-time-buttons-1"
          input-type="time"
          theme="light"
          :show-clear-button="true"
          :show-today-button="true"
          :value="selectedTimeButtons1"
          @changed="($event) => { selectedTimeButtons1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Time (Com Segundos e Botões)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Botões funcionam também com segundos habilitados.
        </p>
        <NbCalendar
          nb-id="calendar-time-seconds-buttons-1"
          input-type="time"
          theme="light"
          :has-seconds="true"
          :show-clear-button="true"
          :show-today-button="true"
          :value="selectedTimeSecondsButtons1"
          @changed="($event) => { selectedTimeSecondsButtons1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />
      </div>
    </div>

    <!-- NbCalendar - Tipo DateTime-Local -->
    <div v-if="calendarType === 'datetime-local'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbCalendar - DateTime-Local (Light Theme)</h4>
        
        <NbCalendar
          nb-id="calendar-datetime-light-1"
          input-type="datetime-local"
          theme="light"
          :value="selectedDateTime1"
          @changed="($event) => { selectedDateTime1 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - DateTime-Local (Com Segundos)</h4>
        <NbCalendar
          nb-id="calendar-datetime-seconds-1"
          input-type="datetime-local"
          theme="light"
          :has-seconds="true"
          :value="selectedDateTime2"
          @changed="($event) => { selectedDateTime2 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - DateTime-Local (Com Botões Limpar e Hoje/Agora)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          No modo datetime-local, o botão "Hoje" aparece no calendário e "Agora" no seletor de tempo. Ambos selecionam a data/hora atual.
        </p>
        <NbCalendar
          nb-id="calendar-datetime-buttons-1"
          input-type="datetime-local"
          theme="light"
          :show-clear-button="true"
          :show-today-button="true"
          :value="selectedDateTimeButtons1"
          @changed="($event) => { selectedDateTimeButtons1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - DateTime-Local (Com Segundos e Botões)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Botões funcionam também com segundos habilitados.
        </p>
        <NbCalendar
          nb-id="calendar-datetime-seconds-buttons-1"
          input-type="datetime-local"
          theme="light"
          :has-seconds="true"
          :show-clear-button="true"
          :show-today-button="true"
          :value="selectedDateTimeSecondsButtons1"
          @changed="($event) => { selectedDateTimeSecondsButtons1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - DateTime-Local (Botão "Hoje" Personalizado)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Botão "Hoje" com cores e estilos customizados usando as props de customização.
        </p>
        <NbCalendar
          nb-id="calendar-datetime-today-custom-1"
          input-type="datetime-local"
          theme="light"
          :show-today-button="true"
          today-button-bg="#9c27b0"
          today-button-text-color="#fff"
          today-button-bg-hover="#7b1fa2"
          today-button-text-color-hover="#fff"
          today-button-font-size="1rem"
          today-button-padding="4px 12px"
          today-button-border-radius="6px"
          :today-button-font-weight="600"
          today-button-border="2px solid #7b1fa2"
          :value="selectedDateTimeTodayCustom1"
          @changed="($event) => { selectedDateTimeTodayCustom1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - DateTime-Local (Botão "Editar" Personalizado)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Botão "Editar" com cores e estilos customizados usando as props de customização.
        </p>
        <NbCalendar
          nb-id="calendar-datetime-edit-custom-1"
          input-type="datetime-local"
          theme="light"
          time-edit-button-bg="#ff9800"
          time-edit-button-text-color="#fff"
          time-edit-button-bg-hover="#f57c00"
          time-edit-button-text-color-hover="#fff"
          time-edit-button-font-size="16px"
          time-edit-button-padding="8px 20px"
          time-edit-button-border-radius="8px"
          :time-edit-button-font-weight="600"
          time-edit-button-border="2px solid #f57c00"
          :value="selectedDateTimeEditCustom1"
          @changed="($event) => { selectedDateTimeEditCustom1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - DateTime-Local (Ambos Botões Personalizados)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Ambos os botões "Hoje" e "Editar" com estilos completamente customizados.
        </p>
        <NbCalendar
          nb-id="calendar-datetime-both-custom-1"
          input-type="datetime-local"
          theme="light"
          :show-today-button="true"
          today-button-bg="#4caf50"
          today-button-text-color="#fff"
          today-button-bg-hover="#388e3c"
          today-button-text-color-hover="#fff"
          today-button-font-size="0.95rem"
          today-button-padding="3px 10px"
          today-button-border-radius="5px"
          :today-button-font-weight="500"
          time-edit-button-bg="#2196f3"
          time-edit-button-text-color="#fff"
          time-edit-button-bg-hover="#1976d2"
          time-edit-button-text-color-hover="#fff"
          time-edit-button-font-size="15px"
          time-edit-button-padding="7px 18px"
          time-edit-button-border-radius="7px"
          :time-edit-button-font-weight="500"
          :value="selectedDateTimeBothCustom1"
          @changed="($event) => { selectedDateTimeBothCustom1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />
      </div>
    </div>

    <!-- NbCalendar - Tipo Week -->
    <div v-if="calendarType === 'week'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbCalendar - Week (Light Theme)</h4>
        
        <NbCalendar
          nb-id="calendar-week-light-1"
          input-type="week"
          theme="light"
          :value="selectedWeek1"
          @changed="($event) => { selectedWeek1 = $event; console.log('changed:', $event) }"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbCalendar - Week (Com Botões Limpar e Hoje)</h4>
        <p style="margin-bottom: 10px; color: #888;">
          Botões funcionam também para seleção de semana. "Hoje" seleciona a semana atual.
        </p>
        <NbCalendar
          nb-id="calendar-week-buttons-1"
          input-type="week"
          theme="light"
          :show-clear-button="true"
          :show-today-button="true"
          :value="selectedWeekButtons1"
          @changed="($event) => { selectedWeekButtons1 = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const NbCalendar = defineAsyncComponent(() => import('@components/NbCalendar.vue'))

const calendarType = ref('date')

// Estados para Date
const selectedDate1 = ref(null)
const selectedDate2 = ref(null)
const selectedDate3 = ref(null)
const selectedDate4 = ref(null)
const selectedDate5 = ref(null)
const selectedDate6 = ref(null)
const selectedDate7 = ref(null)
const selectedDate8 = ref(null)
const selectedDate9 = ref(null)
const selectedDateRange1 = ref(null)
// Data pré-selecionada para demonstrar abertura no mês da data selecionada
const preSelectedDate = ref(new Date(2024, 2, 15)) // 15 de Março de 2024
// Estados para exemplos de botões
const selectedDateClear1 = ref(null)
const selectedDateToday1 = ref(null)
const selectedDateBoth1 = ref(null)
const selectedDateKeepMonth1 = ref(null)
const selectedDateGoCurrent1 = ref(null)

// Estados para Month
const selectedMonth1 = ref(null)
const selectedMonth2 = ref(null)
const selectedMonthButtons1 = ref(null)
const selectedMonthTodayCustom1 = ref(null)

// Estados para Time
const selectedTime1 = ref(null)
const selectedTime2 = ref(null)
const selectedTime3 = ref(null)
const selectedTimeButtons1 = ref(null)
const selectedTimeSecondsButtons1 = ref(null)

// Estados para DateTime-Local
const selectedDateTime1 = ref(null)
const selectedDateTime2 = ref(null)
const selectedDateTimeButtons1 = ref(null)
const selectedDateTimeSecondsButtons1 = ref(null)
const selectedDateTimeTodayCustom1 = ref(null)
const selectedDateTimeEditCustom1 = ref(null)
const selectedDateTimeBothCustom1 = ref(null)

// Estados para Week
const selectedWeek1 = ref(null)
const selectedWeekButtons1 = ref(null)

// Limites de data
const minDate = ref(new Date(2024, 0, 1))
const maxDate = ref(new Date(2024, 11, 31))

// Eventos do calendário
const calendarEvents = ref([
  { date: new Date(2024, 0, 15), color: '#4caf50' },
  { date: new Date(2024, 0, 20), color: '#ff9800' },
  { date: new Date(2024, 0, 25), color: '#f44336' }
])
</script>

<style lang="scss" scoped>
@import '@vlalg-nimbus/bee-css-reset/dist/bee-css-reset.min.css';
@import '@vlalg-nimbus/chameleon-grid-layout/dist/chameleon-grid-layout.min.css';

:global(body) {
  background-color: #181818;
  color: rgba(235, 235, 235, 0.64);
}

.test-page {
  .test-page__title {
    font-family: 'Lato', sans-serif;
    margin-top: 40px;
    margin-bottom: 50px;

    h2 {
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 5px;
    }

    p {
      font-weight: 500;
      font-size: 1.2em;

      &.test-page__component-name {
        margin-bottom: 0px;
      }

      &.test-page__warning {
        font-weight: 700;
        font-size: 1em;
        font-style: italic;
      }
    }
  }

  .test-page__content {
    text-align: left;
    overflow: hidden;

    .test-page__content-tile {
      margin-top: 30px;
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 1.4em;
    }
  }
}
</style>
