<template>
  <div class="preview">
    <div class="preview__component">
      <NbToggleFlip
        nb-id="toggle-flip-test"
        theme="light"
        :value="toggleValue"
        @clicked="handleClick()"
        @current-value="handleCurrentValue($event)"
      />
      <p class="legend">Look at the console to see the triggered events</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toggleValue = ref(false)

const handleCurrentValue = (event) => {
  toggleValue.value = event
  console.log('current-value', event)
}

const handleClick = () => {
  console.log('clicked')
}
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  text-align: center;
  position: relative;
  margin: 40px 0;

  .preview__component {
    display: block;
    position: relative;
    width: 50%;
    margin: 0 auto;

    .legend {
      font-size: 0.8em;
      font-style: italic;
      margin: 0;
      margin-top: 10px;
    }
  }
}
</style>

