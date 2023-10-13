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
        <span class="controls-list__item-name">backgroundColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.backgroundColor" />
        </span>
      </p>

      <p class="controls-list__item">
        <span class="controls-list__item-name">textColor</span>
        <span class="controls-list__item-input">
          <input type="color" v-model="state.textColor" />
        </span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/global.scss';
</style>
