<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbInputFile
          nb-id="input-file-test-1"
          display="b"
          input-name="test-input-file"
          theme="light"
          :show-msg="true"
          :has-msg="true"
          input-placeholder="Choose file(s)…"
          aria-label="Test file input"
          :aria-attrs="{ describedby: 'test-input-file-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          file-extension="image/*,.pdf"
          @clicked="() => console.log('clicked')"
          @changed="($event) => console.log('changed', $event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
        >
          <template #message>
            <div>Custom validation message</div>
          </template>
        </NbInputFile>
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
defineOptions({
  name: 'NbInputsInputFileTest',
})
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
