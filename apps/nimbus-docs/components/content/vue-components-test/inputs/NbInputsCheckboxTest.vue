<template>
  <div class="preview">
    <div class="preview__component">
      <NbInputCheckbox
        nb-id="checkbox1"
        display="b"
        group-name="checkbox-test1"
        :current-optiton="currentCheckboxItem"
        :options="inputOptions"
        direction="left"
        text-color="white"
        @current-value="changeChackboxItem($event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentCheckboxItem = ref([''])
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

const changeChackboxItem = (event) => {
  currentCheckboxItem.value = event
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
