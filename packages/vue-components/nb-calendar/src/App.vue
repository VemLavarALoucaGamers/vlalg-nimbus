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

// Estados para Month
const selectedMonth1 = ref(null)
const selectedMonth2 = ref(null)

// Estados para Time
const selectedTime1 = ref(null)
const selectedTime2 = ref(null)
const selectedTime3 = ref(null)

// Estados para DateTime-Local
const selectedDateTime1 = ref(null)
const selectedDateTime2 = ref(null)

// Estados para Week
const selectedWeek1 = ref(null)

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
