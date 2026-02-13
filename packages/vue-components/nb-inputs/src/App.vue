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
          <option value="textarea">textarea</option>
          <option value="datePicker">datePicker</option>
        </select>
      </div>
    </div>

    <div v-if="btType === 'test'" class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px;">
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
        style="margin-top: 50px; margin-bottom: 50px;">
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
        style="margin-top: 50px; margin-bottom: 50px;">
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

    <div v-if="btType === 'input'" class="row" style="background-color: #d5d0fd;">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px;">
        <h4 class="test-page__content-tile">NbInput - number</h4>
        
        {{ inputNumberValue }}
        <NbInput
          nb-id="test1"
          display="b"
          input-name="test-input1"
          input-type="number"
          :input-text="inputNumberValue"
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

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbInput com Label (handleLabelClick)</h4>
        <p style="margin-top: 10px; margin-bottom: 10px;">
          Clique no label para focar o input. O evento não será capturado pelo @click="interacted" do elemento pai.
        </p>
        <NbInput
          nb-id="test-label-1"
          display="b"
          input-name="test-input-label"
          input-type="text"
          :show-label="true"
          label="Nome completo"
          :required="true"
          :show-msg="true"
          :has-msg="true"
          aria-label="Input com label"
          @clicked="() => console.log('clicked - não deve aparecer ao clicar no label')"
          @current-value="($event) => console.log('current-value', $event)"
          @changed="($event) => console.log('changed:',$event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
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
            :show-label="true"
            label="Este é um label gigante para ver se sai para fora do componente"
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

    <div v-if="btType === 'inputChip'" class="row"  style="background-color: #d5d0fd;">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px;">
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
          :required="true"
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

    <div v-if="btType === 'textarea'" class="row"  style="background-color: #d5d0fd;">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px;">
        <h4 class="test-page__content-tile">NbTextarea</h4>

        <div style="background-color: tomato; padding: 0; max-width: 400px;">
          <NbTextarea
            nb-id="textarea-1"
            display="b"
            input-name="test-textarea1"
            :show-msg="true"
            :has-msg="true"
            aria-label="Test textarea"
            :aria-attrs="{ 'describedby': 'test-textarea-description' }"
            caret-color="cyan"
            selection-bg-color="magenta"
            selection-text-color="yellow"
            resize="none"
            min-width="300px"
            max-width="400px"
            min-height="300px"
            max-height="700px"
            @clicked="() => console.log('clicked')"
            @current-value="($event) => console.log('current-value', $event)"
            @changed="($event) => console.log('changed:',$event)"
            @focused="() => console.log('focused')"
            @blurred="() => console.log('blurred')"
            @entered="($event) => console.log('entered', $event)"
          >
            <template #message>
              <div>Erro teste</div>
            </template>
          </NbTextarea>
        </div>

        <br />
        
        <NbTextarea
          nb-id="textarea-1"
          display="b"
          input-name="test-textarea1"
          :show-msg="true"
          :has-msg="true"
          aria-label="Test textarea"
          :aria-attrs="{ 'describedby': 'test-textarea-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          @clicked="() => console.log('clicked')"
          @current-value="($event) => console.log('current-value', $event)"
          @changed="($event) => console.log('changed:',$event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
        >
          <template #message>
            <div>Erro teste</div>
          </template>
        </NbTextarea>

        <NbTextarea
          nb-id="textarea-2"
          display="b"
          input-style="border"
          input-name="test-textarea2"
          :show-msg="true"
          :has-msg="true"
          aria-label="Test textarea"
          :aria-attrs="{ 'describedby': 'test-textarea-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          @clicked="() => console.log('clicked')"
          @current-value="($event) => console.log('current-value', $event)"
          @changed="($event) => console.log('changed:',$event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
        >
          <template #message>
            <div>Erro teste</div>
          </template>
        </NbTextarea>
        
        <NbTextarea
          nb-id="textarea-3"
          display="b"
          input-style="line"
          input-name="test-textarea3"
          :show-msg="true"
          :has-msg="true"
          aria-label="Test textarea"
          :aria-attrs="{ 'describedby': 'test-textarea-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          @clicked="() => console.log('clicked')"
          @current-value="($event) => console.log('current-value', $event)"
          @changed="($event) => console.log('changed:',$event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
        >
          <template #message>
            <div>Erro teste</div>
          </template>
        </NbTextarea>

        <p style="margin-top: 4px;">
          Text before
          <NbTextarea
            nb-id="textarea-4"
            display="ib"
            input-name="test-textarea4"
            @current-value="($event) => console.log($event)"
          />
          text after
        </p>

        <br /><br />

        <h4 class="test-page__content-tile">NbTextarea - Light Theme (with Label)</h4>
        <NbTextarea
          nb-id="textarea-5"
          input-name="test-textarea5"
          display="b"
          show-label
          label="Test label"
          input-style="background"
          :rows="4"
          :required="true"
        />
        <NbTextarea
          nb-id="textarea-6"
          input-name="test-textarea6"
          display="b"
          show-label
          label="Test label"
          input-style="border"
          :rows="4"
        />
        <NbTextarea
          nb-id="textarea-7"
          input-name="test-textarea7"
          display="b"
          show-label
          label="Test label"
          input-style="line"
          :rows="4"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbTextarea - Dark Theme (with Label)</h4>
        <NbTextarea
          nb-id="textarea-8"
          input-name="test-textarea8"
          display="b"
          show-label
          label="Test label"
          input-style="background"
          theme="dark"
          :rows="4"
        />
        <NbTextarea
          nb-id="textarea-9"
          input-name="test-textarea9"
          display="b"
          show-label
          label="Test label"
          input-style="border"
          theme="dark"
          :rows="4"
        />
        <NbTextarea
          nb-id="textarea-10"
          input-name="test-textarea10"
          display="b"
          show-label
          label="Test label"
          input-style="line"
          theme="dark"
          :rows="4"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbTextarea - Com Placeholder</h4>
        <NbTextarea
          nb-id="textarea-11"
          input-name="test-textarea11"
          display="b"
          input-placeholder="Digite sua mensagem aqui..."
          :rows="5"
        />
        <NbTextarea
          nb-id="textarea-12"
          input-name="test-textarea12"
          display="b"
          show-label
          label="Mensagem"
          input-placeholder="Digite sua mensagem aqui..."
          input-style="border"
          :rows="5"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbTextarea - Estados (Disabled/Readonly)</h4>
        <NbTextarea
          nb-id="textarea-13"
          input-name="test-textarea13"
          display="b"
          :disabled="true"
          input-text="Este textarea está desabilitado"
          :rows="3"
        />
        <NbTextarea
          nb-id="textarea-14"
          input-name="test-textarea14"
          display="b"
          :input-readonly="true"
          input-text="Este textarea está somente leitura"
          input-style="border"
          :rows="3"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbTextarea - Limites de Caracteres</h4>
        <NbTextarea
          nb-id="textarea-15"
          input-name="test-textarea15"
          display="b"
          :maxlength="100"
          input-placeholder="Máximo 100 caracteres"
          :rows="3"
        />
        <NbTextarea
          nb-id="textarea-16"
          input-name="test-textarea16"
          display="b"
          :minlength="10"
          input-placeholder="Mínimo 10 caracteres"
          input-style="border"
          :rows="3"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbTextarea - Redimensionamento</h4>
        <NbTextarea
          nb-id="textarea-17"
          input-name="test-textarea17"
          display="b"
          resize="both"
          input-placeholder="Redimensionável em ambas direções"
          :rows="3"
        />
        <NbTextarea
          nb-id="textarea-18"
          input-name="test-textarea18"
          display="b"
          resize="none"
          input-placeholder="Sem redimensionamento"
          input-style="border"
          :rows="3"
        />
        <NbTextarea
          nb-id="textarea-19"
          input-name="test-textarea19"
          display="b"
          resize="horizontal"
          input-placeholder="Redimensionável horizontalmente"
          :rows="3"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbTextarea - Quebra de Linha (Wrap)</h4>
        <NbTextarea
          nb-id="textarea-20"
          input-name="test-textarea20"
          display="b"
          wrap="soft"
          input-placeholder="Wrap soft (padrão)"
          :rows="3"
        />
        <NbTextarea
          nb-id="textarea-21"
          input-name="test-textarea21"
          display="b"
          wrap="hard"
          input-placeholder="Wrap hard"
          input-style="border"
          :rows="3"
        />
        <NbTextarea
          nb-id="textarea-22"
          input-name="test-textarea22"
          display="b"
          wrap="off"
          input-placeholder="Wrap off (sem quebra visual)"
          :rows="3"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbTextarea - Tamanhos Customizados</h4>
        <NbTextarea
          nb-id="textarea-23"
          input-name="test-textarea23"
          display="b"
          :rows="2"
          :cols="30"
          input-placeholder="2 linhas, 30 colunas"
        />
        <NbTextarea
          nb-id="textarea-24"
          input-name="test-textarea24"
          display="b"
          :rows="6"
          :cols="50"
          input-placeholder="6 linhas, 50 colunas"
          input-style="border"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbTextarea - Com Texto Inicial</h4>
        <NbTextarea
          nb-id="textarea-25"
          input-name="test-textarea25"
          display="b"
          input-text="Este é um texto inicial pré-preenchido no textarea."
          :rows="4"
        />
        <NbTextarea
          nb-id="textarea-26"
          input-name="test-textarea26"
          display="b"
          show-label
          label="Comentário"
          input-text="Este é um texto inicial com label."
          input-style="border"
          :rows="4"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbTextarea - Uppercase e Alinhamento</h4>
        <NbTextarea
          nb-id="textarea-27"
          input-name="test-textarea27"
          display="b"
          :input-uppercase="true"
          input-placeholder="Texto em maiúsculas"
          :rows="3"
        />
        <NbTextarea
          nb-id="textarea-28"
          input-name="test-textarea28"
          display="b"
          text-align="center"
          input-placeholder="Texto centralizado"
          input-style="border"
          :rows="3"
        />
        <NbTextarea
          nb-id="textarea-29"
          input-name="test-textarea29"
          display="b"
          text-align="right"
          input-placeholder="Texto alinhado à direita"
          :rows="3"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbTextarea - Com Border Radius</h4>
        <NbTextarea
          nb-id="textarea-30"
          input-name="test-textarea30"
          display="b"
          :has-border-radius="true"
          :border-radius="1"
          input-placeholder="Com border radius"
          :rows="3"
        />
        <NbTextarea
          nb-id="textarea-31"
          input-name="test-textarea31"
          display="b"
          :has-border-radius="true"
          :border-radius="0.5"
          input-style="border"
          input-placeholder="Border radius menor"
          :rows="3"
        />
      </div>
    </div>

    <div v-if="btType === 'datePicker'" class="row"  style="background-color: #d5d0fd;">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px;">
        <h4 class="test-page__content-tile">NbDatePicker</h4>
        
        
        <div v-if="showModal" class="fakemodal">
          <p>Simulação de modal</p>
          <br />
          <NbDatePicker
            nb-id="datepicker-1"
            display="b"
            input-name="test-datepicker1"
            input-type="date"
            :show-msg="true"
            :has-msg="true"
            aria-label="Test datepicker"
            :aria-attrs="{ 'describedby': 'test-datepicker-description' }"
            caret-color="cyan"
            selection-bg-color="magenta"
            selection-text-color="yellow"
            calendar-z-index="2147483642"
            @clicked="() => console.log('clicked')"
            @current-value="($event) => console.log('current-value', $event)"
            @changed="($event) => console.log('changed:',$event)"
            @focused="() => console.log('focused')"
            @blurred="() => console.log('blurred')"
            @entered="($event) => console.log('entered', $event)"
          >
            <template #message>
              <div>Erro teste</div>
            </template>
          </NbDatePicker>
          ASDASDAS1

          <p>ASDASDAS2</p>
          <p>ASDASDAS3</p>
          <p>ASDASDAS4</p>
        </div>

        <NbDatePicker
          nb-id="datepicker-1"
          display="b"
          input-name="test-datepicker1"
          input-type="date"
          :show-msg="true"
          :has-msg="true"
          aria-label="Test datepicker"
          :aria-attrs="{ 'describedby': 'test-datepicker-description' }"
          caret-color="cyan"
          selection-bg-color="magenta"
          selection-text-color="yellow"
          :calendar-width="650"
          font-size="1.2em"
          @clicked="() => console.log('clicked')"
          @current-value="($event) => console.log('current-value', $event)"
          @changed="($event) => console.log('changed:',$event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
        >
          <template #message>
            <div>Erro teste</div>
          </template>
        </NbDatePicker>

        <NbDatePicker
          nb-id="datepicker-2"
          display="b"
          input-style="border"
          light-text-color="#ffffff"
          input-name="test-datepicker2"
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
          @changed="($event) => console.log('changed:',$event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
        >
          <template #message>
            <div>Erro teste</div>
          </template>
        </NbDatePicker>
        
        <NbDatePicker
          nb-id="datepicker-3"
          display="b"
          input-style="line"
          light-text-color="#ffffff"
          input-name="test-datepicker3"
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
          @changed="($event) => console.log('changed:',$event)"
          @focused="() => console.log('focused')"
          @blurred="() => console.log('blurred')"
          @entered="($event) => console.log('entered', $event)"
        >
          <template #message>
            <div>Erro teste</div>
          </template>
        </NbDatePicker>

        <p style="margin-top: 4px;">
          Text before
          <NbDatePicker
            nb-id="datepicker-4"
            display="ib"
            input-name="test-datepicker4"
            input-type="date"
            @current-value="($event) => console.log($event)"
          />
          text after
        </p>

        <br /><br />

        <h4 class="test-page__content-tile">NbDatePicker - Tipos de Input</h4>
        <NbDatePicker
          nb-id="datepicker-date"
          input-name="test-datepicker-date"
          display="b"
          show-label
          label="Data"
          input-type="date"
          input-style="background"
        />
        <NbDatePicker
          nb-id="datepicker-datetime"
          input-name="test-datepicker-datetime"
          display="b"
          show-label
          label="Data e Hora"
          :required="true"
          input-type="datetime-local"
          input-style="border"
          light-text-color="#ffffff"
        />
        <NbDatePicker
          nb-id="datepicker-time"
          input-name="test-datepicker-time"
          display="b"
          show-label
          label="Hora"
          input-type="time"
          input-style="line"
          light-text-color="#ffffff"
        />
        <NbDatePicker
          nb-id="datepicker-month"
          input-name="test-datepicker-month"
          display="b"
          show-label
          label="Mês"
          input-type="month"
          input-style="background"
        />
        <NbDatePicker
          nb-id="datepicker-week"
          input-name="test-datepicker-week"
          display="b"
          show-label
          label="Semana"
          input-type="week"
          input-style="border"
          light-text-color="#ffffff"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbDatePicker - Light Theme (with Label)</h4>
        <NbDatePicker
          nb-id="datepicker-5"
          input-name="test-datepicker5"
          display="b"
          show-label
          label="Data"
          input-style="background"
          input-type="date"
        />
        <NbDatePicker
          nb-id="datepicker-6"
          input-name="test-datepicker6"
          display="b"
          show-label
          label="Data"
          input-style="border"
          light-text-color="#ffffff"
          input-type="date"
        />
        <NbDatePicker
          nb-id="datepicker-7"
          input-name="test-datepicker7"
          display="b"
          show-label
          label="Data"
          input-style="line"
          light-text-color="#ffffff"
          input-type="date"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbDatePicker - Dark Theme (with Label)</h4>
        <NbDatePicker
          nb-id="datepicker-8"
          input-name="test-datepicker8"
          display="b"
          show-label
          label="Data"
          input-style="background"
          theme="dark"
          input-type="date"
        />
        <NbDatePicker
          nb-id="datepicker-9"
          input-name="test-datepicker9"
          display="b"
          show-label
          label="Data"
          input-style="border"
          theme="dark"
          input-type="date"
        />
        <NbDatePicker
          nb-id="datepicker-10"
          input-name="test-datepicker10"
          display="b"
          show-label
          label="Data"
          input-style="line"
          theme="dark"
          input-type="date"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbDatePicker - Com Limites (Min/Max)</h4>
        <NbDatePicker
          nb-id="datepicker-minmax"
          input-name="test-datepicker-minmax"
          display="ib"
          show-label
          label="Data com limites gigante para ver se sai para fora do componente"
          input-type="date"
          min="2024-01-01"
          max="2024-12-31"
          input-style="border"
          light-text-color="#ffffff"
        />

        <br />
        <NbDatePicker
          nb-id="datepicker-datetime-minmax"
          input-name="test-datepicker-datetime-minmax"
          display="ib"
          show-label
          label="Data/Hora com limites gigante para ver se sai para fora do componente"
          input-type="datetime-local"
          min="2024-01-01T00:00"
          max="2024-12-31T23:59"
          input-style="background"
        />

        <br />
        <NbDatePicker
          nb-id="datepicker-datetime-minmax-break-on-active"
          input-name="test-datepicker-datetime-minmax-break-on-active"
          display="ib"
          show-label
          label="Data/Hora com limites gigante para ver se sai para fora do componente"
          :label-break-on-active="true"
          input-type="datetime-local"
          min="2024-01-01T00:00"
          max="2024-12-31T23:59"
          input-style="background"
        />


        <br /><br />

        <h4 class="test-page__content-tile">NbDatePicker - Estados (Disabled/Readonly)</h4>
        <NbDatePicker
          nb-id="datepicker-disabled"
          input-name="test-datepicker-disabled"
          display="b"
          :disabled="true"
          input-text="2024-01-15"
          input-type="date"
        />
        <NbDatePicker
          nb-id="datepicker-readonly"
          input-name="test-datepicker-readonly"
          display="b"
          :input-readonly="true"
          input-text="2024-01-15"
          input-style="border"
          light-text-color="#ffffff"
          input-type="date"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbDatePicker - Range Selection</h4>
        <NbDatePicker
          nb-id="datepicker-range"
          input-name="test-datepicker-range"
          display="b"
          show-label
          label="Selecionar período"
          input-type="date"
          :allow-range="true"
          input-style="background"
        />
        <NbDatePicker
          nb-id="datepicker-range-border"
          input-name="test-datepicker-range-border"
          display="b"
          show-label
          label="Selecionar período (border)"
          input-type="date"
          :allow-range="true"
          input-style="border"
          light-text-color="#ffffff"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbDatePicker - Locales</h4>
        <NbDatePicker
          nb-id="datepicker-ptbr"
          input-name="test-datepicker-ptbr"
          display="b"
          show-label
          label="Português (pt-BR)"
          input-type="date"
          locale="pt-BR"
          input-style="background"
        />
        <NbDatePicker
          nb-id="datepicker-enus"
          input-name="test-datepicker-enus"
          display="b"
          show-label
          label="English (en-US)"
          input-type="date"
          locale="en-US"
          input-style="border"
          light-text-color="#ffffff"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbDatePicker - Com Valor Inicial</h4>
        <NbDatePicker
          nb-id="datepicker-initial-date"
          input-name="test-datepicker-initial-date"
          display="b"
          show-label
          label="Data inicial"
          input-type="date"
          input-text="2024-06-15"
          input-style="background"
        />
        <NbDatePicker
          nb-id="datepicker-initial-datetime"
          input-name="test-datepicker-initial-datetime"
          display="b"
          show-label
          label="Data/Hora inicial"
          input-type="datetime-local"
          input-text="2024-06-15T14:30"
          input-style="border"
          light-text-color="#ffffff"
        />
        <NbDatePicker
          nb-id="datepicker-initial-time"
          input-name="test-datepicker-initial-time"
          display="b"
          show-label
          label="Hora inicial"
          input-type="time"
          input-text="14:30"
          input-style="line"
          light-text-color="#ffffff"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbDatePicker - Com Step</h4>
        <NbDatePicker
          nb-id="datepicker-step-time"
          input-name="test-datepicker-step-time"
          display="b"
          show-label
          label="Hora (step 15min)"
          input-type="time"
          step="900"
          input-style="background"
        />
        <NbDatePicker
          nb-id="datepicker-step-datetime"
          input-name="test-datepicker-step-datetime"
          display="b"
          show-label
          label="Data/Hora (step 30min)"
          input-type="datetime-local"
          step="1800"
          input-style="border"
          light-text-color="#ffffff"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbDatePicker - Com Border Radius</h4>
        <NbDatePicker
          nb-id="datepicker-radius"
          input-name="test-datepicker-radius"
          display="b"
          :has-border-radius="true"
          :border-radius="1"
          input-type="date"
          input-style="background"
        />
        <NbDatePicker
          nb-id="datepicker-radius-border"
          input-name="test-datepicker-radius-border"
          display="b"
          :has-border-radius="true"
          :border-radius="0.5"
          input-style="border"
          light-text-color="#ffffff"
          input-type="date"
        />

        <br /><br />

        <h4 class="test-page__content-tile">NbDatePicker - Custom Calendar vs Native</h4>
        <NbDatePicker
          nb-id="datepicker-custom"
          input-name="test-datepicker-custom"
          display="b"
          show-label
          label="Calendário Customizado (padrão)"
          input-type="date"
          :use-custom-calendar="true"
          input-style="background"
        />
        <NbDatePicker
          nb-id="datepicker-native"
          input-name="test-datepicker-native"
          display="b"
          show-label
          label="Calendário Nativo"
          input-type="date"
          :use-custom-calendar="false"
          input-style="border"
          light-text-color="#ffffff"
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
const NbTextarea = defineAsyncComponent(() => import('@components/NbTextarea.vue'))
const NbDatePicker = defineAsyncComponent(() => import('@components/NbDatePicker.vue'))

const btType = ref('input')
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
const showModal = ref(false)
const inputNumberValue = ref(100)

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
   
  }
}

.fakemodal {
  position: fixed;
    top: 50%;
    left: 50%;
    width: 90%;
    background: #888787;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 4px 6px #0000001a, 0 2px 4px #0000000f;
    transition: transform .3s ease-out;
    border-radius: 0rem;
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
    padding: 10px;
    min-width: 225px !important;
    max-width: 500px !important;
    height: auto;
    min-height: 100px !important;
    max-height: 300px !important;
    z-index: 2147483642 !important;
    width: 500px;
    height: 272px;

    color: #000;
}
</style>
