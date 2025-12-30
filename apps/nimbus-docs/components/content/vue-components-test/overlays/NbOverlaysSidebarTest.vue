<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <div class="preview__controls">
          <button
            class="preview__button"
            @click="showSidebar = !showSidebar"
          >
            {{ showSidebar ? 'Close Sidebar' : 'Open Sidebar' }}
          </button>
        </div>
        
        <NbSidebar
          nb-id="nb-sidebar-one"
          :show="showSidebar"
          position="left"
          theme="light"
          :backdrop-rgb-color="{ r: 0, g: 0, b: 0 }"
          :backdrop-alpha="0.6"
          :show-close-button="true"
          :close-on-overlay-click="true"
          content-padding="20px"
          :visible-on-mobile="true"
          :visible-on-tablet="true"
          :visible-on-desktop="true"
          @close="showSidebar = false"
        >
          <template #content>
            <h3>Sidebar Content</h3>
            <p>This is the main content of the sidebar.</p>
            <p>You can add any content here.</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </template>
        </NbSidebar>
        
        <p class="legend">Sidebar component - appears from the left when opened</p>
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

const showSidebar = ref(false)

// Component is registered globally via plugin
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
    width: 100%;
    margin: 0 auto;

    .preview__controls {
      margin-bottom: 20px;
    }

    .preview__button {
      padding: 10px 20px;
      background-color: #4a90e2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #357abd;
      }
    }

    .legend {
      font-size: 0.8em;
      font-style: italic;
      margin: 0;
      margin-top: 10px;
    }
  }
}
</style>
