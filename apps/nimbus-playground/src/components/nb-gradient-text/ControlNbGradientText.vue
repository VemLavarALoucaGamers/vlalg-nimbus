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

const alignOptionsList = ['left', 'center', 'right'] // alignment Types list
const sizeTypeOptionsList = ['%', 'px', 'in', 'em', 'rem'] // formatMode Types list

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
        <span class="controls-list__item-name">text (slot)</span>
        <span class="controls-list__item-input">
          <input type="text" style="" v-model="state.text" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">lineHeight</span>
        <span class="controls-list__item-input">
          <input type="number" min="0" max="30" step="0.00000100" v-model="state.lineHeight" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">size</span>
        <span class="controls-list__item-input controls-list__item-input--group">
          <input type="number" min="0" max="500" step="1" v-model="state.size" />
          <select v-model="state.sizeType">
            <option v-for="(op, index) in sizeTypeOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">bgFirst</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.bgFirst" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">bgSecond</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.bgSecond" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">alignment</span>
        <span class="controls-list__item-input">
          <select v-model="state.alignment">
            <option v-for="(op, index) in alignOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">paddingBottom</span>
        <span class="controls-list__item-input">
          <input type="number" min="0" max="900" step="1" v-model="state.paddingBottom" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">font</span>
        <span class="controls-list__item-input">
          <input type="text" style="" v-model="state.font" />
        </span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/global.scss';
</style>
