<template>
  <div class="preview">
    <div class="preview__component">
      <NbSelect
        nb-id="select-test"
        select-name="select-test"
        theme="light"
        :options="selectOptions"
        :selected-option-only="selectedValue"
        @changed="handleChange($event)"
        @user-changed="handleUserChange($event)"
      />
      <p class="legend">Look at the console to see the triggered events</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedValue = ref('option1')
const selectOptions = computed(() => {
  return [
    {
      value: 'option1',
      text: 'Option 1',
    },
    {
      value: 'option2',
      text: 'Option 2',
    },
    {
      value: 'option3',
      text: 'Option 3',
    },
  ]
})

const handleChange = (event) => {
  selectedValue.value = event
  console.log('changed', event)
}

const handleUserChange = (event) => {
  console.log('user-changed', event)
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

