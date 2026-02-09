<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbDatePicker
          nb-id="datepicker-test-1"
          display="b"
          input-name="test-datepicker"
          input-type="date"
          :show-msg="true"
          :has-msg="true"
          aria-label="Test datepicker"
          :aria-attrs="{ 'describedby': 'test-datepicker-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          @clicked="() => console.log('clicked')"
          @current-value="($event) => console.log('current-value', $event)"
          @changed="($event) => { selectedDate = $event; console.log('changed:', $event) }"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
        >
          <template #message>
            <div>Custom error message</div>
          </template>
        </NbDatePicker>
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

defineOptions({
  name: 'NbInputsDatePickerTest',
})

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

