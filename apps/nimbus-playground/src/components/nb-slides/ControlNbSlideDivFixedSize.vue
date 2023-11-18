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

const displayOptionsList = ['b', 'ib'] // display Types list
const booleanOptionsList = [false, true] // booleans Types list
const slideTypeOptionsList = ['transform', 'z-index'] // slideType Types list

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
        <span class="controls-list__item-name">display</span>
        <span class="controls-list__item-input">
          <select v-model="state.display">
            <option v-for="(op, index) in displayOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">disabled</span>
        <span class="controls-list__item-input">
          <select v-model="state.disabled">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">slideType</span>
        <span class="controls-list__item-input">
          <select v-model="state.slideType">
            <option v-for="(op, index) in slideTypeOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">borderRadius</span>
        <span class="controls-list__item-input">
          <input type="number" min="0" max="100" step="0.001" v-model="state.borderRadius" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">slideWidth</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" v-model="state.slideWidth" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">slideHeight</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" v-model="state.slideHeight" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">slideInterval</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" v-model="state.slideInterval" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">showButtons</span>
        <span class="controls-list__item-input">
          <select v-model="state.showButtons">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">buttonsSize</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" v-model="state.buttonsSize" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">buttonMarginTop</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" v-model="state.buttonMarginTop" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">buttonMarginBottom</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" v-model="state.buttonMarginBottom" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">buttonsColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.buttonsColor" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">buttonsColorHover</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.buttonsColorHover" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">showProgressBar</span>
        <span class="controls-list__item-input">
          <select v-model="state.showProgressBar">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">progressColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.progressColor" />
        </span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/global.scss';
</style>
