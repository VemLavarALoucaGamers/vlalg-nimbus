<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <div class="preview__controls">
          <label class="preview__control">
            <input
              v-model="tabsDisabled"
              type="checkbox"
            >
            Disabled
          </label>
          <span class="preview__control">
            Active tab: <strong>{{ activeTab }}</strong>
            ({{ tabs[activeTab]?.label }})
          </span>
        </div>

        <h5 class="preview__subtitle">Light — input-style: background</h5>
        <div class="preview__light-wrapper">
          <NbTabs
            nb-id="tabs-test-light-1"
            input-style="background"
            theme="light"
            tab-model="one"
            :tabs="tabs"
            :disabled-tabs="[1]"
            :active-tab="activeTab"
            :gap="10"
            :has-border-radius="true"
            :disabled="tabsDisabled"
            :is-scroll-class="true"
            @changed="onTabChange"
          />
        </div>

        <h5 class="preview__subtitle">Light — input-style: line</h5>
        <div class="preview__light-wrapper">
          <NbTabs
            nb-id="tabs-test-light-2"
            input-style="line"
            theme="light"
            tab-model="one"
            :tabs="tabs"
            :disabled-tabs="[1]"
            :active-tab="activeTab"
            :gap="0"
            :has-border-radius="true"
            :disabled="tabsDisabled"
            :is-scroll-class="true"
            light-text-color-active="#000000"
            @changed="onTabChange"
          />
        </div>

        <h5 class="preview__subtitle">Light — input-style: border</h5>
        <div class="preview__light-wrapper">
          <NbTabs
            nb-id="tabs-test-light-3"
            input-style="border"
            theme="light"
            tab-model="one"
            :tabs="tabs"
            :disabled-tabs="[1]"
            :active-tab="activeTab"
            :gap="0"
            :has-border-radius="true"
            :disabled="tabsDisabled"
            light-bg-color="transparent"
            light-text-color-active="#000000"
            :is-scroll-class="true"
            @changed="onTabChange"
          />
        </div>

        <h5 class="preview__subtitle">Dark — input-style: background</h5>
        <div class="preview__dark-wrapper">
          <NbTabs
            nb-id="tabs-test-dark-1"
            input-style="background"
            theme="dark"
            tab-model="one"
            :tabs="tabs"
            :disabled-tabs="[1]"
            :active-tab="activeTab"
            :gap="10"
            :has-border-radius="true"
            :disabled="tabsDisabled"
            :is-scroll-class="true"
            dark-bg-color="tomato"
            dark-border-color="tomato"
            dark-text-color-active="#ffffff"
            @changed="onTabChange"
          />
        </div>

        <h5 class="preview__subtitle">Dark — input-style: line</h5>
        <div class="preview__dark-wrapper">
          <NbTabs
            nb-id="tabs-test-dark-2"
            input-style="line"
            theme="dark"
            tab-model="one"
            :tabs="tabs"
            :disabled-tabs="[1]"
            :active-tab="activeTab"
            :gap="0"
            :has-border-radius="true"
            :disabled="tabsDisabled"
            :is-scroll-class="true"
            dark-bg-color="tomato"
            dark-text-color-active="#ffffff"
            @changed="onTabChange"
          />
        </div>

        <h5 class="preview__subtitle">Dark — input-style: border</h5>
        <div class="preview__dark-wrapper">
          <NbTabs
            nb-id="tabs-test-dark-3"
            input-style="border"
            theme="dark"
            tab-model="one"
            :tabs="tabs"
            :disabled-tabs="[1]"
            :active-tab="activeTab"
            :gap="0"
            :has-border-radius="true"
            :disabled="tabsDisabled"
            :is-scroll-class="true"
            dark-bg-color="transparent"
            dark-border-color="tomato"
            dark-tab-border-color="tomato"
            dark-text-color-active="#ffffff"
            @changed="onTabChange"
          />
        </div>

        <h5 class="preview__subtitle">Custom tab slot</h5>
        <div class="preview__light-wrapper">
          <NbTabs
            nb-id="tabs-test-custom-slot"
            input-style="background"
            theme="light"
            tab-model="one"
            :tabs="tabs"
            :active-tab="activeTab"
            :gap="10"
            :has-border-radius="true"
            @changed="onTabChange"
          >
            <template #tab-0="{ option, index, options }">
              <span>{{ option.label }} - {{ index }} / {{ options.length }}</span>
            </template>
          </NbTabs>
        </div>

        <div class="preview__panel">
          <div v-if="activeTab === 0">Content of <strong>Features</strong></div>
          <div v-else-if="activeTab === 1">Content of <strong>Specs</strong></div>
          <div v-else-if="activeTab === 2">Content of <strong>Dimensions</strong></div>
          <div v-else>Content of <strong>Contact</strong></div>
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

const tabs = ref([
  { key: 'features', label: 'Features' },
  { key: 'specs', label: 'Specs' },
  { key: 'dimensions', label: 'Dimensions' },
  { key: 'contact', label: 'Contact' },
])
const activeTab = ref(0)
const tabsDisabled = ref(false)

const onTabChange = (value) => {
  console.log('changed', value)
  activeTab.value = value.index
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
      margin-bottom: 16px;
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
      background-color: #ffffff;
      padding: 16px;
      border-radius: 4px;
    }

    .preview__dark-wrapper {
      background-color: #1f1f1f;
      padding: 16px;
      border-radius: 4px;
    }

    .preview__panel {
      margin-top: 16px;
      padding: 12px;
      border: 1px dashed #ccc;
      border-radius: 4px;
      font-size: 0.95em;
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
