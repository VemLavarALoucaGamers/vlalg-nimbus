<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbCalendar
          nb-id="calendar-test-1"
          input-type="date"
          theme="light"
          :value="selectedDate"
          @changed="($event) => { selectedDate = $event; console.log('changed:', $event) }"
          @date-selected="($event) => console.log('date-selected:', $event)"
          @month-changed="($event) => console.log('month-changed:', $event)"
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
const selectedDate = ref(null)
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

