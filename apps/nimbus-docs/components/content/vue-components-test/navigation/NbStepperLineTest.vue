<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <div class="preview__controls">
          <label class="preview__control">
            Step:
            <input
              v-model.number="activeStep"
              type="number"
              min="0"
              :max="stepsText.length - 1"
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

        <h5 class="preview__subtitle">Numeric steps — light</h5>
        <div class="preview__light-wrapper">
          <NbStepperLine
            nb-id="stepper-line-test-numeric-light"
            theme="light"
            :step="activeStep"
            :steps="4"
            :block-click="blockClick"
            :disabled="disabled"
            light-tab-color="blue"
            light-tab-color-selected="tomato"
            light-line-background="blue"
            light-line-background-selected="tomato"
            @changed="onStepChange"
          />
        </div>

        <h5 class="preview__subtitle">Numeric steps — dark</h5>
        <div class="preview__dark-wrapper">
          <NbStepperLine
            nb-id="stepper-line-test-numeric-dark"
            theme="dark"
            :step="activeStep"
            :steps="4"
            :block-click="blockClick"
            :disabled="disabled"
            dark-tab-color="cyan"
            dark-tab-color-selected="tomato"
            dark-line-background="cyan"
            dark-line-background-selected="tomato"
            @changed="onStepChange"
          />
        </div>

        <h5 class="preview__subtitle">Array steps with disabled item</h5>
        <div class="preview__light-wrapper">
          <NbStepperLine
            nb-id="stepper-line-test-array"
            theme="light"
            :step="activeStep"
            :steps="stepsText"
            :steps-disabled="[2]"
            :block-click="blockClick"
            :disabled="disabled"
            @changed="onStepChange"
          />
        </div>

        <h5 class="preview__subtitle">Custom slots (number + label)</h5>
        <div class="preview__light-wrapper">
          <NbStepperLine
            nb-id="stepper-line-test-slots"
            theme="light"
            :step="activeStep"
            :steps="stepsText"
            :block-click="blockClick"
            :disabled="disabled"
            @changed="onStepChange"
          >
            <template #tab-number-0="{ index }">
              <span>({{ index + 1 }})</span>
            </template>
            <template #label-0="{ option }">
              <span>★ {{ option.title }}</span>
            </template>
          </NbStepperLine>
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

const stepsText = ref([
  { id: 1, title: 'Tab Layout' },
  { id: 2, title: 'Border Bar' },
  { id: 3, title: 'Light/Dark Mode' },
  { id: 4, title: 'Organize Tabs' },
  { id: 5, title: 'Split Screen' },
  { id: 6, title: 'Read Aloud' },
])
const activeStep = ref(1)
const blockClick = ref(false)
const disabled = ref(false)

const onStepChange = (value) => {
  console.log('changed', value)
  activeStep.value = value
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

    .legend {
      font-size: 0.8em;
      font-style: italic;
      margin: 16px 0 0;
      text-align: center;
    }
  }
}
</style>
