<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <div class="preview__controls">
          <label class="preview__control">
            <input
              v-model="accordionDisabled"
              type="checkbox"
            >
            Disabled
          </label>
          <label class="preview__control">
            <input
              v-model="blockClick"
              type="checkbox"
            >
            Block click
          </label>
        </div>

        <h5 class="preview__subtitle">Light theme</h5>
        <div class="preview__light-wrapper">
          <NbAccordion
            nb-id="accordion-test-1"
            :items="accordionItems"
            :selecteds="accordionSelecteds"
            :disableds="accordionDisableds"
            :disabled="accordionDisabled"
            :block-click="blockClick"
            theme="light"
            @clicked="logEvent('clicked')"
            @focused="logEvent('focused')"
            @blurred="logEvent('blurred')"
            @outside-clicked="logEvent('outside-clicked')"
            @resized="logEvent('resized', $event)"
          >
            <template #content-0="{ item }">
              <p><strong>{{ item.label }}</strong> — Custom slot rendering for the first panel.</p>
              <ul>
                <li>Lorem ipsum</li>
                <li>Dolor sit amet</li>
                <li>Consectetur adipiscing</li>
              </ul>
            </template>

            <template #title-icon-1="{ isActive }">
              <span>{{ isActive ? '▴' : '▾' }}</span>
            </template>
          </NbAccordion>
        </div>

        <h5 class="preview__subtitle">Dark theme (pre-opened item 0 and 2)</h5>
        <div class="preview__dark-wrapper">
          <NbAccordion
            nb-id="accordion-test-2"
            :items="accordionItems"
            :selecteds="[0, 2]"
            :disableds="[1]"
            :disabled="accordionDisabled"
            :block-click="blockClick"
            theme="dark"
            @clicked="logEvent('clicked')"
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

const accordionItems = ref([
  { key: 'features', label: 'Features', content: 'Built-in events, theme support, slots and dynamic content.' },
  { key: 'specs', label: 'Specs', content: 'Vue 3, Composition API, scoped styles, accessibility ready.' },
  { key: 'dimensions', label: 'Dimensions', content: 'Padding, gap, font-size and border-radius are all configurable.' },
  { key: 'contact', label: 'Contact', content: 'Reach out via the project repository.' },
])
const accordionSelecteds = ref([])
const accordionDisableds = ref([])
const accordionDisabled = ref(false)
const blockClick = ref(false)

const logEvent = (name, payload) => {
  if (payload === undefined) {
    console.log(name)
  } else {
    console.log(name, payload)
  }
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
    width: 80%;
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
      margin: 0;
      margin-top: 16px;
      text-align: center;
    }
  }
}
</style>
