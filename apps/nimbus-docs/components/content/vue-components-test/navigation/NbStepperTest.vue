<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <div class="preview__controls">
          <label class="preview__control">
            Steps:
            <input
              v-model.number="totalSteps"
              type="number"
              min="2"
              max="10"
              step="1"
              class="preview__input"
            >
          </label>
          <label class="preview__control">
            Step:
            <input
              v-model.number="activeStep"
              type="number"
              min="0"
              :max="totalSteps + 1"
              step="1"
              class="preview__input"
            >
          </label>
          <label class="preview__control">
            <input
              v-model="blockClick"
              type="checkbox"
            >
            Block click
          </label>
          <label class="preview__control">
            <input
              v-model="disabled"
              type="checkbox"
            >
            Disabled
          </label>
        </div>

        <h5 class="preview__subtitle">Horizontal — light</h5>
        <div class="preview__light-wrapper">
          <NbStepper
            nb-id="stepper-test-horizontal-light"
            orientation="horizontal"
            theme="light"
            :step="activeStep"
            :steps="totalSteps"
            :block-click="blockClick"
            :disabled="disabled"
            @changed="onStepChange"
            @status="onStatus"
          />
        </div>

        <h5 class="preview__subtitle">Horizontal — dark</h5>
        <div class="preview__dark-wrapper">
          <NbStepper
            nb-id="stepper-test-horizontal-dark"
            orientation="horizontal"
            theme="dark"
            :step="activeStep"
            :steps="totalSteps"
            :block-click="blockClick"
            :disabled="disabled"
            @changed="onStepChange"
            @status="onStatus"
          />
        </div>

        <h5 class="preview__subtitle">Vertical — light (parent has fixed height)</h5>
        <div class="preview__light-wrapper preview__vertical">
          <NbStepper
            nb-id="stepper-test-vertical-light"
            orientation="vertical"
            theme="light"
            :step="activeStep"
            :steps="totalSteps"
            :block-click="blockClick"
            :disabled="disabled"
            @changed="onStepChange"
            @status="onStatus"
          />
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

const totalSteps = ref(4)
const activeStep = ref(1)
const blockClick = ref(false)
const disabled = ref(false)

const onStepChange = (value) => {
  console.log('changed', value)
  activeStep.value = value
}
const onStatus = (value) => {
  console.log('status', value)
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
      background-color: #ffffff;
      padding: 16px;
      border-radius: 4px;
    }

    .preview__dark-wrapper {
      background-color: #1f1f1f;
      padding: 16px;
      border-radius: 4px;
    }

    .preview__vertical {
      height: 280px;
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
