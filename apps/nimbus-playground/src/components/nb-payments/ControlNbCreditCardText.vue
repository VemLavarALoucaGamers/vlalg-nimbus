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

const chipModelOptionsList = ['one', 'two'] // chipModel Types list
const formatModeOptionsList = ['one', 'two'] // formatMode Types list
const booleanOptionsList = [false, true] // booleans Types list
const monthsList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

state = controlState.value

const filterNumber = (fieldName, maxCharacters) => {
  state[fieldName] = state[fieldName].replace(/[^0-9]/g, '')

  if (state[fieldName].length > maxCharacters) {
    state[fieldName] = state[fieldName].slice(0, maxCharacters)
  }
}
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
        <span class="controls-list__item-name">showForm</span>
        <span class="controls-list__item-input">
          <select v-model="state.showForm">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">chipModel</span>
        <span class="controls-list__item-input">
          <select v-model="state.chipModel">
            <option v-for="(op, index) in chipModelOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">cardNumber</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.cardNumber" @input="filterNumber('cardNumber', 16)" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">cardName</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.cardName" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">cardExpMonth</span>
        <span class="controls-list__item-input">
          <select v-model="state.cardExpMonth">
            <option v-for="(op, index) in monthsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">cardExpYear</span>
        <span class="controls-list__item-input">
          <select v-model="state.cardExpYear">
            <option v-for="(op, index) in state.years" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">cardCcv</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.cardCcv" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formatMode</span>
        <span class="controls-list__item-input">
          <select v-model="state.formatMode">
            <option v-for="(op, index) in formatModeOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">flipOnHover</span>
        <span class="controls-list__item-input">
          <select v-model="state.flipOnHover">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formNumberText</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.formNumberText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formHolderText</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.formHolderText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formExpMonthText</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.formExpMonthText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formExpMonthDefaultText</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.formExpMonthDefaultText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formExpYearText</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.formExpYearText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formExpYearDefaultText</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.formExpYearDefaultText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formCcvText</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.formCcvText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">cardHolderText</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.cardHolderText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">cardExpirationText</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.cardExpirationText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">cardCcvText</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.cardCcvText" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formBackground</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.formBackground" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.formColor" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formRadius</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" max="30" step="1" v-model="state.formRadius" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formShadow</span>
        <span class="controls-list__item-input">
          <select v-model="state.formShadow">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formInputBackground</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.formInputBackground" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formInputColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.formInputColor" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formInputActiveColor</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.formInputActiveColor" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formInputBorder</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.formInputBorder" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">formInputRadius</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" max="30" step="1" v-model="state.formInputRadius" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">cardBackground</span>
        <span class="controls-list__item-input">
          <input type="text" v-model="state.cardBackground" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">cardColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.cardColor" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">cardShadow</span>
        <span class="controls-list__item-input">
          <select v-model="state.cardShadow">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">cardRadius</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" max="30" step="1" v-model="state.cardRadius" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">cardCcvColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.cardCcvColor" />
        </span>
      </p>
    </div>
  </div>

  <div v-if="false">
    text:
    <textarea style="color: black; white-space: pre-line" v-model="state.text" /><br />

    nb-id:
    <input type="text" style="color: black" v-model="state.nbId" /><br />

    lineHeight:
    <input
      type="number"
      step="0.00000001"
      min="0"
      style="color: black"
      v-model="state.lineHeight"
    /><br />

    size:
    <input type="number" style="color: black" v-model="state.size" />
    <select v-model="state.sizeType">
      <option v-for="(op, index) in fontSizeOptionsList" :key="index" :value="op.type">
        {{ op.title }}
      </option></select
    ><br />

    bg-first:
    <input type="color" style="color: black" v-model="state.bgFirst" /><br />

    bg-second:
    <input type="color" style="color: black" v-model="state.bgSecond" /><br />

    alignment:
    <select v-model="state.alignment">
      <option value="left">left</option>
      <option value="center">center</option>
      <option value="right">right</option></select
    ><br />

    padding-Bottom:
    <input type="number" min="5" style="color: black" v-model="state.paddingBottom" /><br />

    font:
    <input type="text" style="color: black" v-model="state.font" /><br />
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/global.scss';
</style>
