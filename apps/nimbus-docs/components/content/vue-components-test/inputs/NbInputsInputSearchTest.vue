<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbInputSearch
          nb-id="input-search-test-1"
          display="b"
          input-name="test-input-search"
          theme="light"
          :show-msg="true"
          :has-msg="true"
          input-placeholder="Type and search…"
          aria-label="Test search input"
          :aria-attrs="{ describedby: 'test-input-search-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          :interaction-function="onSearch"
          @clicked="() => console.log('clicked')"
          @current-value="($event) => console.log('current-value', $event)"
          @changed="($event) => console.log('changed', $event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
        >
          <template #message>
            <div>Custom hint message</div>
          </template>
        </NbInputSearch>
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
  name: 'NbInputsInputSearchTest',
})

async function onSearch(value) {
  console.log('interactionFunction', value)
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
    width: min(100%, 420px);
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
