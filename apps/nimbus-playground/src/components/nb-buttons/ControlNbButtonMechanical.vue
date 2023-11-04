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
        <span class="controls-list__item-name">textColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.textColor" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">containerColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.containerColor" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">buttonColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.buttonColor" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">paddingX</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" max="30" step="1" v-model="state.paddingX" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">paddingY</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" max="30" step="1" v-model="state.paddingY" />
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
        <span class="controls-list__item-name">borderRadius</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" max="30" step="1" v-model="state.borderRadius" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">animationSlow</span>
        <span class="controls-list__item-input">
          <select v-model="state.animationSlow">
            <option v-for="(op, index) in booleanOptionsList" :key="index" :value="op">
              {{ op }}
            </option>
          </select>
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">fontFamily</span>
        <span class="controls-list__item-input">
          <input type="text" style="" v-model="state.fontFamily" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">fontSize</span>
        <span class="controls-list__item-input">
          <input type="text" style="" v-model="state.fontSize" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">fontWeight</span>
        <span class="controls-list__item-input">
          <input type="number" min="1" max="30" step="1" v-model="state.fontWeight" />
        </span>
      </p>
    </div>
  </div>

  <div class="simulator">
    <h2 class="simulator__title">Container Simulator</h2>

    <p class="simulator__item">
      <span class="simulator__item-name">Container color</span>
      <span class="simulator__item-input">
        <input type="color" v-model="state.containerSimulator" />
      </span>
    </p>
    <p class="simulator__item-tip">
      When changing this option, change the <code>containerColor</code> option as well.
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/global.scss';
</style>
