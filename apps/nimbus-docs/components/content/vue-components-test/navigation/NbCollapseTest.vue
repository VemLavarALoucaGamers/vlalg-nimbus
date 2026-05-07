<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <div class="preview__controls">
          <label class="preview__control">
            <input
              v-model="collapseDisabled"
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
          <label class="preview__control">
            Title:
            <input
              v-model="collapseTitle"
              type="text"
              class="preview__input"
            >
          </label>
        </div>

        <h5 class="preview__subtitle">Default (light)</h5>
        <div class="preview__light-wrapper">
          <NbCollapse
            nb-id="collapse-test-1"
            :title="collapseTitle"
            :disabled="collapseDisabled"
            :block-click="blockClick"
            theme="light"
            @clicked="logEvent('clicked')"
            @focused="logEvent('focused')"
            @blurred="logEvent('blurred')"
            @outside-clicked="logEvent('outside-clicked')"
            @resized="logEvent('resized', $event)"
          >
            <template #content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                volutpat nisl vel consequat tincidunt.
              </p>
            </template>
          </NbCollapse>
        </div>

        <h5 class="preview__subtitle">Custom title icon</h5>
        <div class="preview__light-wrapper">
          <NbCollapse
            nb-id="collapse-test-2"
            :title="collapseTitle"
            :disabled="collapseDisabled"
            :block-click="blockClick"
            theme="light"
            @clicked="logEvent('clicked')"
          >
            <template #title-icon="{ isActive }">
              <span>{{ isActive ? '▴' : '▾' }}</span>
            </template>
            <template #content>
              <p>The trailing icon is fully replaced via the <code>title-icon</code> slot.</p>
            </template>
          </NbCollapse>
        </div>

        <h5 class="preview__subtitle">Dark theme</h5>
        <div class="preview__dark-wrapper">
          <NbCollapse
            nb-id="collapse-test-3"
            :title="collapseTitle"
            :disabled="collapseDisabled"
            :block-click="blockClick"
            theme="dark"
            @clicked="logEvent('clicked')"
          >
            <template #content>
              <p>Dark theme uses the <code>dark*</code> color props by default.</p>
            </template>
          </NbCollapse>
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

const collapseTitle = ref('Open Collapsible')
const collapseDisabled = ref(false)
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

    .preview__input {
      padding: 4px 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
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
