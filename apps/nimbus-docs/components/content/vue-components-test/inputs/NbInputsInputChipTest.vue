<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbInputChip
          nb-id="chip-test"
          input-name="chip-input-test"
          display="b"
          theme="light"
          :current-list="currentChipList"
          aria-label="Test input chip"
          :aria-attrs="{ 'describedby': 'test-input-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          @clicked="() => console.log('clicked')"
          @changed="($event) => console.log('changed', $event)"
          @added="($event) => console.log('added', $event)"
          @removed="($event) => console.log('removed', $event)"
          @input-changed="($event) => console.log('input-changed', $event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
        >
          <template #chip="{ chip, removeChip }">
            <span class="chip-text">{{ chip }}</span>
            <span class="chip-remove" @click="removeChip(chip)">×</span>
          </template>
        </NbInputChip>
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

const currentChipList = ref(['tag1', 'tag2', 'tag3'])
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

