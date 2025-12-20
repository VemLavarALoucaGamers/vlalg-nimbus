<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        Change this password: <input v-model="valueTest" type="text" class="input-test">
        <NbPasswordValidationSection nb-id="nb-password-validation-section" :password="valueTest" title-color="white" />
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

const valueTest = ref('Passw0rdTest$')
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

    .input-test {
      margin-bottom: 10px;
      padding: 1px 10px;
      border: 1px solid rgb(236, 235, 232);
    }
  }
}
</style>
