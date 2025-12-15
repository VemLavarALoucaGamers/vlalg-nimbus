<template>
  <div class="preview">
    <div class="preview__component">
      <NbToggle
        nb-id="toggle-test"
        theme="light"
        :value="toggleValue"
        @changed="handleChange($event)"
        @current-value="handleCurrentValue($event)"
        @clicked="handleClick()"
      />
      <p class="legend">Look at the console to see the triggered events</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toggleValue = ref(false)

const handleChange = (event) => {
  toggleValue.value = event
  console.log('changed', event)
}

const handleCurrentValue = (event) => {
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

