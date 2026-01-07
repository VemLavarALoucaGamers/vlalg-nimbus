<template>
  <div class="container-fluid test-page">
    <div class="row">
      <div class="col-md-10 col-md-offset-1 test-page__title">
        <h2>Test page</h2>
        <p class="test-page__component-name"><strong>Component:</strong> NbInputs</p>
        <p class="test-page__warning">Warning: Look at the console to see the click event</p>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content" style="margin-bottom: 50px; overflow: hidden">
        <select v-model="btType">
          <option value="test">test</option>
          <option value="radio">radio</option>
          <option value="checkbox">checkbox</option>
          <option value="input">input</option>
          <option value="inputChip">inputChip</option>
        </select>
      </div>
    </div>

    <div v-if="btType === 'test'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbInputRadio</h4>
        
        <NbInputTest
          nb-id="test1"
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
          @changed="($event) => console.log('changed:',$event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
          @show-input-eye="($event) => console.log('show-input-eye', $event)"
        >
          <template #error>
            <div>Erro teste</div>
          </template>
        </NbInputTest>

        <p style="margin-top: 4px;">
          Text before
          <NbInputTest
            nb-id="test2"
            display="ib"
            @current-value="($event) => console.log($event)"
          />
          text after
        </p>
      </div>
    </div>

    <div v-else-if="btType === 'radio'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbInputRadio - Light Theme</h4>
        
        <NbInputRadio
          nb-id="radio-light-1"
          display="b"
          group-name="radio-test-light-1"
          theme="light"
          :current-option="currentRadioItem"
          :options="inputOptions"
          direction="right"
          @current-value="changeRadioItem($event)"
        />

        <p style="margin-top: 20px">
          <h4 class="test-page__content-tile">NbInputRadio - Light Theme (Custom Colors)</h4>
          <NbInputRadio
            nb-id="radio-light-2"
            display="ib"
            group-name="radio-test-light-2"
            theme="light"
            light-text-color="#1e40af"
            light-color="#3b82f6"
            light-color-hover="#60a5fa"
            :current-option="currentRadioItem"
            :options="inputOptions"
            direction="right"
            @current-value="changeRadioItem($event)"
          />
        </p>

        <p style="margin-top: 20px">
          <h4 class="test-page__content-tile">NbInputRadio - Dark Theme</h4>
          <NbInputRadio
            nb-id="radio-dark-1"
            display="b"
            group-name="radio-test-dark-1"
            theme="dark"
            :current-option="currentRadioItem"
            :options="inputOptions"
            direction="right"
            @current-value="changeRadioItem($event)"
          />
        </p>

        <p style="margin-top: 20px">
          <h4 class="test-page__content-tile">NbInputRadio - Dark Theme (Custom Colors)</h4>
          <NbInputRadio
            nb-id="radio-dark-2"
            display="ib"
            group-name="radio-test-dark-2"
            theme="dark"
            dark-text-color="#a78bfa"
            dark-color="#8b5cf6"
            dark-color-hover="#7c3aed"
            :current-option="currentRadioItem"
            :options="inputOptions"
            direction="right"
            @current-value="changeRadioItem($event)"
          />
        </p>
      </div>
    </div>

    <div v-if="btType === 'checkbox'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbInputCheckbox - Light Theme</h4>

        <NbInputCheckbox
          nb-id="checkbox-light-1"
          display="b"
          group-name="checkbox-test-light-1"
          theme="light"
          :current-option="currentCheckboxItem"
          :options="inputOptions"
          type="circle"
          :background="false"
          @current-value="changeChackboxItem($event)"
        />

        <p style="margin-top: 20px">
          <h4 class="test-page__content-tile">NbInputCheckbox - Light Theme (Custom Colors)</h4>
          <NbInputCheckbox
            nb-id="checkbox-light-2"
            display="ib"
            group-name="checkbox-test-light-2"
            theme="light"
            light-text-color="#1e40af"
            light-color="#3b82f6"
            light-color-hover="#60a5fa"
            :current-option="currentCheckboxItem"
            :options="inputOptions"
            :background="false"
            @current-value="changeChackboxItem($event)"
          />
        </p>

        <p style="margin-top: 20px">
          <h4 class="test-page__content-tile">NbInputCheckbox - Dark Theme</h4>
          <NbInputCheckbox
            nb-id="checkbox-dark-1"
            display="b"
            group-name="checkbox-test-dark-1"
            theme="dark"
            :current-option="currentCheckboxItem"
            :options="inputOptions"
            type="circle"
            :background="false"
            @current-value="changeChackboxItem($event)"
          />
        </p>

        <p style="margin-top: 20px">
          <h4 class="test-page__content-tile">NbInputCheckbox - Dark Theme (Custom Colors)</h4>
          <NbInputCheckbox
            nb-id="checkbox-dark-2"
            display="ib"
            group-name="checkbox-test-dark-2"
            theme="dark"
            dark-text-color="#a78bfa"
            dark-color="#8b5cf6"
            dark-color-hover="#7c3aed"
            :current-option="currentCheckboxItem"
            :options="inputOptions"
            :background="false"
            @current-value="changeChackboxItem($event)"
          />
        </p>
      </div>
    </div>

    <div v-if="btType === 'input'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbInput</h4>
        
        <NbInput
          nb-id="test1"
          display="b"
          input-name="test-input1"
          input-type="text"
          :show-msg="true"
          :has-msg="true"
          aria-label="Test input"
          :aria-attrs="{ 'describedby': 'test-input-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          :has-icon="true"
          @clicked="() => console.log('clicked')"
          @current-value="($event) => console.log('current-value', $event)"
          @changed="($event) => console.log('changed:',$event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
          @show-input-eye="($event) => console.log('show-input-eye', $event)"
        >
          <template #error>
            <div>Erro teste</div>
          </template>
        </NbInput>

        <NbInput
          nb-id="test2"
          display="b"
          input-style="border"
          input-name="test-input2"
          :show-msg="true"
          :has-msg="true"
          aria-label="Test input"
          :aria-attrs="{ 'describedby': 'test-input-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          :has-icon="true"
          @clicked="() => console.log('clicked')"
          @current-value="($event) => console.log('current-value', $event)"
          @changed="($event) => console.log('changed:',$event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
          @show-input-eye="($event) => console.log('show-input-eye', $event)"
        >
          <template #error>
            <div>Erro teste</div>
          </template>
        </NbInput>
        
        <NbInput
          nb-id="test3"
          display="b"
          input-style="line"
          input-name="test-input3"
          :show-msg="true"
          :has-msg="true"
          aria-label="Test input"
          :aria-attrs="{ 'describedby': 'test-input-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          :has-icon="true"
          @clicked="() => console.log('clicked')"
          @current-value="($event) => console.log('current-value', $event)"
          @changed="($event) => console.log('changed:',$event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
          @show-input-eye="($event) => console.log('show-input-eye', $event)"
        >
          <template #error>
            <div>Erro teste</div>
          </template>
        </NbInput>

        <p style="margin-top: 4px;">
          Text before
          <NbInput
            nb-id="test4"
            display="ib"
            @current-value="($event) => console.log($event)"
          />
          text after
        </p>

        <br /><br />

        <NbInput
          nb-id="test1"
          input-name="test-input4"
          display="b"
          show-label
          label="Test label"
          input-style="background"
        />
        <NbInput
          nb-id="test1"
          input-name="test-input5"
          display="b"
          show-label
          label="Test label"
          input-style="border"
        />
        <NbInput
          nb-id="test1"
          input-name="test-input6"
          display="b"
          show-label
          label="Test label"
          input-style="line"
        />

        <br /><br />

        <NbInput
          nb-id="test1"
          input-name="test-input7"
          display="b"
          show-label
          label="Test label"
          input-style="background"
          theme="dark"
        />
        <NbInput
          nb-id="test1"
          input-name="test-input8"
          display="b"
          show-label
          label="Test label"
          input-style="border"
          theme="dark"
        />
        <NbInput
          nb-id="test1"
          input-name="test-input9"
          display="b"
          show-label
          label="Test label"
          input-style="line"
          theme="dark"
        />
      </div>
    </div>

    <div v-if="btType === 'inputChip'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbInput</h4>
        
        <NbInputChip
          nb-id="chip-dark"
          input-name="chip-input-dark"
          theme="dark"
          :current-list="currentChipList"
          aria-label="Test input chip"
          :aria-attrs="{ 'describedby': 'test-input-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          @clicked="() => console.log('clicked')"
          @changed="($event) => console.log('changed', $event)"
          @added="($event) => console.log('added', $event)"
          @removed="($event) => console.log('removed', $event)"
          @input-changed="($event) => console.log('input-changed', $event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
        >
          <template #chip="{ chip, removeChip }">
            <span class="chip-text">{{ chip }}asdas</span>
            <span class="chip-remove" @click="removeChip(chip)">×</span>
          </template>
        </NbInputChip>

        <br><br>

        <p>Example theme: light</p>
        <NbInputChip
          nb-id="chip-light"
          input-name="chip-input-light"
          theme="light"
          :current-list="currentChipList"
          aria-label="Test input chip"
          :aria-attrs="{ 'describedby': 'test-input-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          @clicked="() => console.log('clicked')"
          @changed="($event) => console.log('changed', $event)"
          @added="($event) => console.log('added', $event)"
          @removed="($event) => console.log('removed', $event)"
          @input-changed="($event) => console.log('input-changed', $event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
        />

        <br><br>

        <p>Example theme: light</p>
        <NbInputChip
          nb-id="chip-light"
          input-name="chip-input-light"
          theme="light"
          input-style="line"
          :current-list="currentChipList"
          aria-label="Test input chip"
          :aria-attrs="{ 'describedby': 'test-input-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          @clicked="() => console.log('clicked')"
          @changed="($event) => console.log('changed', $event)"
          @added="($event) => console.log('added', $event)"
          @removed="($event) => console.log('removed', $event)"
          @input-changed="($event) => console.log('input-changed', $event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
        />

        <p style="margin-top: 4px;">
          Text before
          <NbInput
            nb-id="test2"
            display="ib"
            @current-value="($event) => console.log($event)"
          />
          text after
        </p>

        <br><br>

        <h4 class="test-page__content-tile">NbInputChip - Light Theme (with Label)</h4>
        <NbInputChip
          nb-id="chip-light-label"
          input-name="chip-input-light-label"
          theme="light"
          input-style="background"
          input-placeholder="Type and press Enter"
          :show-label="true"
          label="Label Light Theme"
          :current-list="currentChipList"
          aria-label="Test input chip light with label"
          @clicked="() => console.log('clicked')"
          @changed="($event) => console.log('changed', $event)"
          @added="($event) => console.log('added', $event)"
          @removed="($event) => console.log('removed', $event)"
          @input-changed="($event) => console.log('input-changed', $event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
        />

        <br><br>

        <h4 class="test-page__content-tile">NbInputChip - Dark Theme (with Label)</h4>
        <NbInputChip
          nb-id="chip-dark-label"
          input-name="chip-input-dark-label"
          theme="dark"
          input-style="background"
          input-placeholder="Type and press Enter"
          :show-label="true"
          label="Label Dark Theme"
          :current-list="currentChipList"
          aria-label="Test input chip dark with label"
          @clicked="() => console.log('clicked')"
          @changed="($event) => console.log('changed', $event)"
          @added="($event) => console.log('added', $event)"
          @removed="($event) => console.log('removed', $event)"
          @input-changed="($event) => console.log('input-changed', $event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
        />

        <br><br>

        <h4 class="test-page__content-tile">NbInputChip - Light Theme (Line Style with Label)</h4>
        <NbInputChip
          nb-id="chip-light-line-label"
          input-name="chip-input-light-line-label"
          theme="light"
          input-style="line"
          input-placeholder="Type and press Enter"
          :show-label="true"
          label="Label Line Style"
          :current-list="currentChipList"
          aria-label="Test input chip light line with label"
          @changed="($event) => console.log('changed', $event)"
        />

        <br><br>

        <h4 class="test-page__content-tile">NbInputChip - Dark Theme (Border Style with Label)</h4>
        <NbInputChip
          nb-id="chip-dark-border-label"
          input-name="chip-input-dark-border-label"
          theme="dark"
          input-style="border"
          input-placeholder="Type and press Enter"
          :show-label="true"
          label="Label Border Style"
          :current-list="currentChipList"
          aria-label="Test input chip dark border with label"
          @changed="($event) => console.log('changed', $event)"
        />

        <br><br>

        <h4 class="test-page__content-tile">NbInputChip - Empty (no chips, with Label)</h4>
        <NbInputChip
          nb-id="chip-empty-label"
          input-name="chip-input-empty-label"
          theme="light"
          input-style="background"
          input-placeholder="Type and press Enter"
          :show-label="true"
          label="Label Empty"
          :current-list="[]"
          aria-label="Test input chip empty with label"
          @changed="($event) => console.log('changed', $event)"
          @added="($event) => console.log('added', $event)"
          @removed="($event) => console.log('removed', $event)"
        />

        <br><br>

        <h4 class="test-page__content-tile">NbInputChip - Input Position Top (with Label)</h4>
        <NbInputChip
          nb-id="chip-top-position"
          input-name="chip-input-top-position"
          theme="light"
          input-style="background"
          input-position="top"
          input-placeholder="Type and press Enter"
          :show-label="true"
          label="Label Input Top"
          :current-list="currentChipList"
          aria-label="Test input chip with input on top"
          @changed="($event) => console.log('changed', $event)"
          @added="($event) => console.log('added', $event)"
          @removed="($event) => console.log('removed', $event)"
        />

        <br><br>

        <h4 class="test-page__content-tile">NbInputChip - Input Position Top (with Label)</h4>
        <NbInputChip
          nb-id="chip-top-position"
          input-name="chip-input-top-position"
          theme="light"
          input-style="border"
          input-position="bottom"
          input-placeholder="Type and press Enter"
          :show-label="true"
          label="Label Input Top"
          :current-list="currentChipList"
          aria-label="Test input chip with input on top"
          @changed="($event) => console.log('changed', $event)"
          @added="($event) => console.log('added', $event)"
          @removed="($event) => console.log('removed', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, computed } from 'vue'

const NbInputTest = defineAsyncComponent(() => import('@components/NbInputTest.vue'))
const NbInputRadio = defineAsyncComponent(() => import('@components/NbInputRadio.vue'))
const NbInputCheckbox = defineAsyncComponent(() => import('@components/NbInputCheckbox.vue'))
const NbInput = defineAsyncComponent(() => import('@components/NbInput.vue'))
const NbInputChip = defineAsyncComponent(() => import('@components/NbInputChip.vue'))

const btType = ref('inputChip')
const currentRadioItem = ref('')
const currentCheckboxItem = ref([''])
const inputOptions = computed(() => {
  return [
    {
      value: 'dog',
      text: 'dog',
    },
    {
      value: 'cat',
      text: 'cat',
    },
    {
      value: 'fish',
      text: 'fish',
    }
  ]
})
const currentChipList = ref(['item1', 'item2', 'item3'])

const changeRadioItem = (event) => {
  currentRadioItem.value = event
}
const changeChackboxItem = (event) => {
  currentCheckboxItem.value = event
}
</script>

<style lang="scss" scoped>
@import '@vlalg-nimbus/bee-css-reset/dist/bee-css-reset.min.css';
@import '@vlalg-nimbus/chameleon-grid-layout/dist/chameleon-grid-layout.min.css';

:global(body) {
  background-color: #181818;
  color: rgba(235, 235, 235, 0.64);
}

.test-page {
  .test-page__title {
    font-family: 'Lato', sans-serif;
    margin-top: 40px;
    margin-bottom: 50px;

    h2 {
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 5px;
    }

    p {
      font-weight: 500;
      font-size: 1.2em;

      &.test-page__component-name {
        margin-bottom: 0px;
      }

      &.test-page__warning {
        font-weight: 700;
        font-size: 1em;
        font-style: italic;
      }
    }
  }

  .test-page__content {
    text-align: left;
    overflow: hidden;
  }
}
</style>
