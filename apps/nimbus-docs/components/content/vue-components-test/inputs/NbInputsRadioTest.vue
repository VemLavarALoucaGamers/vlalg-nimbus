<template>
  <div class="preview">
    <div class="preview__component">
      <NbInputRadio
        nb-id="radio1"
        display="b"
        group-name="radio-test1"
        :current-optiton="currentRadioItem"
        :options="inputOptions"
        direction="left"
        text-color="white"
        @changed="changeRadioItem($event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentRadioItem = ref('')
const inputOptions = computed(() => {
  return [
    {
      value: 'dog',
      text: 'dog',
    },
    {
      value: 'cat',
      text: 'cat',
    },
    {
      value: 'fish',
      text: 'fish',
    },
  ]
})

const changeRadioItem = (event) => {
  currentRadioItem.value = event
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
