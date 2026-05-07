<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <div class="preview__controls">
          <label class="preview__control">
            <input
              v-model="segmentedDisabled"
              type="checkbox"
            >
            Disabled
          </label>
          <label class="preview__control">
            <input
              v-model="hasSelectedAnimation"
              type="checkbox"
            >
            Selected animation
          </label>
          <label class="preview__control">
            <input
              v-model="fontStrongActive"
              type="checkbox"
            >
            Bold active
          </label>
          <label class="preview__control">
            Gap:
            <input
              v-model.number="gap"
              type="number"
              min="0"
              max="3"
              step="0.1"
              class="preview__input"
            >
          </label>
          <span class="preview__control">
            Selected:
            <strong>{{ options[selected] }}</strong>
            (index {{ selected }})
          </span>
        </div>

        <div class="preview__controls">
          <label class="preview__control">
            <input
              v-model="hasBorderRadius"
              type="checkbox"
            >
            Container radius
          </label>
          <label class="preview__control">
            Container radius (rem):
            <input
              v-model.number="borderRadius"
              type="number"
              min="0"
              max="5"
              step="0.1"
              class="preview__input"
              :disabled="!hasBorderRadius"
            >
          </label>
          <label class="preview__control">
            <input
              v-model="hasSelectedBorderRadius"
              type="checkbox"
            >
            Selected radius
          </label>
          <label class="preview__control">
            Selected radius (rem):
            <input
              v-model.number="selectedBorderRadius"
              type="number"
              min="0"
              max="5"
              step="0.1"
              class="preview__input"
              :disabled="!hasSelectedBorderRadius"
            >
          </label>
        </div>

        <h5 class="preview__subtitle">Light</h5>
        <div class="preview__light-wrapper">
          <NbSegmentedButton
            nb-id="segmented-test-light"
            theme="light"
            :options="options"
            :selected="selected"
            :selecteds-disabled="[0]"
            :disabled="segmentedDisabled"
            :has-border-radius="hasBorderRadius"
            :border-radius="borderRadius"
            :has-selected-border-radius="hasSelectedBorderRadius"
            :selected-border-radius="selectedBorderRadius"
            :has-selected-animation="hasSelectedAnimation"
            :font-strong-active="fontStrongActive"
            :gap="gap"
            @clicked="onSegmentClick"
          />
        </div>

        <h5 class="preview__subtitle">Dark</h5>
        <div class="preview__dark-wrapper">
          <NbSegmentedButton
            nb-id="segmented-test-dark"
            theme="dark"
            :options="options"
            :selected="selected"
            :selecteds-disabled="[0]"
            :disabled="segmentedDisabled"
            :has-border-radius="hasBorderRadius"
            :border-radius="borderRadius"
            :has-selected-border-radius="hasSelectedBorderRadius"
            :selected-border-radius="selectedBorderRadius"
            :has-selected-animation="hasSelectedAnimation"
            :font-strong-active="fontStrongActive"
            :gap="gap"
            @clicked="onSegmentClick"
          />
        </div>

        <h5 class="preview__subtitle">Custom option slot</h5>
        <div class="preview__light-wrapper">
          <NbSegmentedButton
            nb-id="segmented-test-slot"
            theme="light"
            :options="options"
            :selected="selected"
            :disabled="segmentedDisabled"
            :has-border-radius="hasBorderRadius"
            :border-radius="borderRadius"
            :has-selected-border-radius="hasSelectedBorderRadius"
            :selected-border-radius="selectedBorderRadius"
            :has-selected-animation="hasSelectedAnimation"
            :font-strong-active="fontStrongActive"
            :gap="gap"
            @clicked="onSegmentClick"
          >
            <template #option-0="{ option, index, options: allOptions }">
              <span>{{ option }} ({{ index + 1 }}/{{ allOptions.length }})</span>
            </template>
            <template #option-2="{ option }">
              <span>★ {{ option }}</span>
            </template>
          </NbSegmentedButton>
        </div>

        <p class="legend">Look at the console to see the triggered events</p>
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

const options = ref(['Browser', 'Network', 'Security', 'Extensions'])
const selected = ref(1)
const segmentedDisabled = ref(false)
const hasBorderRadius = ref(true)
const borderRadius = ref(0.375)
const hasSelectedBorderRadius = ref(true)
const selectedBorderRadius = ref(0.375)
const hasSelectedAnimation = ref(true)
const fontStrongActive = ref(true)
const gap = ref(0.5)

const onSegmentClick = (value) => {
  console.log('clicked', value)
  selected.value = value.index
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
    width: 90%;
    margin: 0 auto;
    text-align: left;

    .preview__controls {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 24px;
      align-items: center;
    }

    .preview__control {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9em;
    }

    .preview__input {
      padding: 4px 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 0.9em;
      width: 60px;
    }

    .preview__subtitle {
      margin: 24px 0 8px;
      font-size: 0.95em;
      font-weight: 600;
      opacity: 0.7;
    }

    .preview__light-wrapper {
      padding: 16px;
      border-radius: 4px;
    }

    .preview__dark-wrapper {
      padding: 16px;
      border-radius: 4px;
    }

    .legend {
      font-size: 0.8em;
      font-style: italic;
      margin: 16px 0 0;
      text-align: center;
    }
  }
}
</style>
