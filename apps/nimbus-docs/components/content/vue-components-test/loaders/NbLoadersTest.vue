<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        Change type:

        <select v-model="currentType" style="margin-bottom: 20px">
          <option v-for="(comp, index) in options" :key="index" :value="comp">
            {{ comp }}
          </option>
        </select>

        <br><br>

        <NbLoaders
          nb-id="loader"
          display="b"
          :type="currentType"
        />
      </div>
    </div>
    <template #fallback>
      <div class="preview">
        <div class="preview__component">
          <p>Loading component...</p>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
import { ref } from 'vue'

const currentType = ref('glass-filling')
const options = ref([
  'clock',
  'glass-filling',
  'pulse-crazy',
  'pulse',
  'ring-pulse',
  'double-ring-pulse',
  'bling-ball',
  'bars',
  'water-drop',
  'coin',
  'circle-lines',
  'solar',
  'dots',
  'leds',
  'snake',
  'zoom-ball',
  'train',
  'ring',
  'partial-ring',
])
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
