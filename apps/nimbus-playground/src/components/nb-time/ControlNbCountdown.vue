<script setup>
import { defineProps, reactive, toRefs } from 'vue'

const props = defineProps({
  controlState: {
    type: Object,
    required: true
  }
})
const { controlState } = toRefs(props)
let state = reactive({})

const booleanOptionsList = [false, true] // booleans Types list
const monthOptionsList = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sept',
  'oct',
  'nov',
  'dec'
]

const currentDate = new Date()
const currentYear = currentDate.getFullYear()

state = controlState.value
</script>

<template>
  <div class="controls">
    <h1 class="controls-title">Change options here:</h1>

    <div class="controls-list">
      <p class="controls-list__item">
        <span class="controls-list__item-name">id</span>
        <span class="controls-list__item-input">
          <input type="text" style="" v-model="state.nbId" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">textColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.textColor" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">numberColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.numberColor" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">separatorColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.separatorColor" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">border</span>
        <span class="controls-list__item-input">
          <select v-model="state.border">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">borderColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.borderColor" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">day</span>
        <span class="controls-list__item-input">
          <input type="number" min="0" max="31" step="1" v-model="state.day" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">month</span>
        <span class="controls-list__item-input">
          <select v-model="state.month">
            <option v-for="(op, index) in monthOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">year</span>
        <span class="controls-list__item-input">
          <input type="number" :min="currentYear" step="0001" v-model="state.year" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">hour</span>
        <span class="controls-list__item-input">
          <input type="number" min="0" max="23" step="1" v-model="state.hour" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">minute</span>
        <span class="controls-list__item-input">
          <input type="number" min="0" max="59" step="1" v-model="state.minute" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">second</span>
        <span class="controls-list__item-input">
          <input type="number" min="0" max="59" step="1" v-model="state.second" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">daysText</span>
        <span class="controls-list__item-input">
          <input type="text" style="" v-model="state.daysText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">hoursText</span>
        <span class="controls-list__item-input">
          <input type="text" style="" v-model="state.hoursText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">minutesText</span>
        <span class="controls-list__item-input">
          <input type="text" style="" v-model="state.minutesText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">secondsText</span>
        <span class="controls-list__item-input">
          <input type="text" style="" v-model="state.secondsText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">showDays</span>
        <span class="controls-list__item-input">
          <select v-model="state.showDays">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">showHours</span>
        <span class="controls-list__item-input">
          <select v-model="state.showHours">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">showMinutes</span>
        <span class="controls-list__item-input">
          <select v-model="state.showMinutes">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">showSeconds</span>
        <span class="controls-list__item-input">
          <select v-model="state.showSeconds">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">separator</span>
        <span class="controls-list__item-input">
          <select v-model="state.separator">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">separatorType</span>
        <span class="controls-list__item-input">
          <input type="text" style="" v-model="state.separatorType" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">fontFamily</span>
        <span class="controls-list__item-input">
          <input type="text" style="" v-model="state.fontFamily" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">fontSizeNumber</span>
        <span class="controls-list__item-input">
          <input type="number" min="0" max="500" step="0.1" v-model="state.fontSizeNumber" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">fontSizeText</span>
        <span class="controls-list__item-input">
          <input type="number" min="0" max="500" step="0.1" v-model="state.fontSizeText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">fontSizeSeparator</span>
        <span class="controls-list__item-input">
          <input type="number" min="0" max="500" step="0.1" v-model="state.fontSizeSeparator" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">fontWeightNumber</span>
        <span class="controls-list__item-input">
          <input type="number" min="100" max="900" step="100" v-model="state.fontWeightNumber" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">fontWeightText</span>
        <span class="controls-list__item-input">
          <input type="number" min="100" max="900" step="100" v-model="state.fontWeightText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">fontWeightSeparator</span>
        <span class="controls-list__item-input">
          <input type="number" min="100" max="900" step="100" v-model="state.fontWeightSeparator" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">containerWidth</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" max="900" step="001" v-model="state.containerWidth" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">containerHeight</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" max="900" step="001" v-model="state.containerHeight" />
        </span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/global.scss';
</style>
