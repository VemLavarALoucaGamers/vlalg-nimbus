<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbPagination
          v-model="currentPage"
          nb-id="pagination-test-1"
          :total-pages="12"
          theme="light"
          @changed="($event) => { currentPage = $event; console.log('changed:', $event) }"
          @page-changed="($event) => console.log('page-changed:', $event)"
          @go-to-input="($event) => console.log('go-to-input:', $event)"
          @invalid-page="($event) => console.log('invalid-page:', $event)"
          @first-page="($event) => console.log('first-page:', $event)"
          @last-page="($event) => console.log('last-page:', $event)"
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

// Component is auto-imported by Nuxt
const currentPage = ref(1)
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

