<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <div class="preview__controls">
          <button
            class="preview__button"
            @click="showLoadingBar = !showLoadingBar"
          >
            {{ showLoadingBar ? 'Ocultar Loading Bar' : 'Mostrar Loading Bar' }}
          </button>
        </div>
        <NbLoadingBar
          nb-id="nb-loading-bar-one"
          :show="showLoadingBar"
          position="top"
          :height="3"
          :border-radius="0.5"
          :z-index="1000"
        />
        <p class="legend">Loading bar component - appears at the top of the page.</p>
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

const showLoadingBar = ref(false)

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
