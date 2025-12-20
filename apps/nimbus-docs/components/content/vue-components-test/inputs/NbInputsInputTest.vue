<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbInput
          nb-id="input1"
          input-name="test-input"
          display="b"
          :show-msg="true"
          :has-msg="true"
          aria-label="Test input"
          :aria-attrs="{ 'describedby': 'test-input-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          @clicked="() => console.log('clicked')"
          @current-value="($event) => console.log('current-value', $event)"
          @changed="($event) => console.log('changed:', $event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
          @show-input-eye="($event) => console.log('show-input-eye', $event)"
        >
          <template #message>
            <div>Custom error message</div>
          </template>
        </NbInput>
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
// Component is auto-imported by Nuxt
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

