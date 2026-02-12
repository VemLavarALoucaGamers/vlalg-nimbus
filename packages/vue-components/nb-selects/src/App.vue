<template>
	<div class="container-fluid test-page">
		<div class="row">
			<div class="col-md-10 col-md-offset-1 test-page__title">
				<h2>Test page</h2>
				<p class="test-page__component-name"><strong>Component:</strong> NbSelects</p>
				<p class="test-page__warning">Warning: Look at the console to see the click event</p>
			</div>
		</div>

    <div class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content" style="margin-bottom: 50px; overflow: hidden">
        <select v-model="btType">
          <option value="test">test</option>
          <option value="select">select</option>
          <option value="toggle">toggle</option>
          <option value="toggle-light">toggle-light</option>
          <option value="toggle-skewed">toggle-skewed</option>
          <option value="toggle-flip">toggle-flip</option>
        </select>
      </div>
    </div>

    <div v-if="btType === 'test'" class="row">
      <div
        class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: visible;"
      >
        <h4 class="test-page__content-tile">NbTest - Light Theme</h4>
        <div style="margin-bottom: 30px;">
          <input /><NbTest
            nb-id="test-light-1"
            theme="light"
            :value="testValue1"
            @changed="($event) => { testValue1 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          /><NbTest
            nb-id="test-light-2"
            theme="dark"
            :value="testValue1"
            @changed="($event) => { testValue1 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          /><NbTest
            nb-id="test-light-3"
            theme="light"
            :value="testValue1"
            mode="flip"
            text-enable="SIM"
            text-disable="NÃO"
            @changed="($event) => { testValue1 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          /><NbTest
            nb-id="test-light-4"
            theme="dark"
            :value="testValue1"
            mode="flip"
            text-enable="SIM"
            text-disable="NÃO"
            @changed="($event) => { testValue1 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          />asdas
        </div>
        

        <p style="margin-top: 20px;">
          Text before
          <NbTest
            nb-id="test-inline-2"
            theme="dark"
            :value="testValue6"
            @changed="($event) => { testValue6 = $event; console.log('changed', $event) }"
          />
          text after
        </p>
      </div>
    </div>

    <div v-else-if="btType  === 'toggle-light'" class="row">
      <div
        class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: visible;"
      >
        <h4 class="test-page__content-tile">NbToggleLight - Light Theme</h4>
        <div style="margin-bottom: 30px;">
          <input /><NbToggleLight
            nb-id="toggle-light-1"
            theme="light"
            :value="toggleValue1"
            @changed="($event) => { toggleValue1 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          />
        </div>

        <h4 class="test-page__content-tile">NbToggleLight - Light Theme (Custom Colors)</h4>
        <div style="margin-bottom: 30px;">
          <NbToggleLight
            nb-id="toggle-light-2"
            theme="light"
            :value="toggleValue2"
            light-text-color="#1e40af"
            light-button-color="#3b82f6"
            light-text-bg-color="#60a5fa"
            @changed="($event) => { testValue2 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          />
        </div>

        <h4 class="test-page__content-tile">NbToggleLight - Dark Theme</h4>
        <div style="margin-bottom: 30px;">
          <NbToggleLight
            nb-id="test-dark-1"
            theme="dark"
            :value="testValue3"
            @changed="($event) => { testValue3 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          />
        </div>

        <h4 class="test-page__content-tile">NbToggleLight - Dark Theme (Custom Colors)</h4>
        <div style="margin-bottom: 30px;">
          <NbToggleLight
            nb-id="test-dark-2"
            theme="dark"
            :value="testValue4"
            dark-text-color="#a78bfa"
            dark-button-color="#8b5cf6"
            dark-text-bg-color="#7c3aed"
            @changed="($event) => { testValue4 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          />
        </div>

        <h4 class="test-page__content-tile">NbToggleLight - Disabled</h4>
        <div style="margin-bottom: 30px;">
          <div style="margin-bottom: 15px;">
            <strong>Light Theme Disabled (OFF):</strong>
            <NbToggleLight
              nb-id="test-disabled-light-off"
              theme="light"
              :value="false"
              :disabled="true"
            />
          </div>
          <div style="margin-bottom: 15px;">
            <strong>Light Theme Disabled (ON):</strong>
            <NbToggleLight
              nb-id="test-disabled-light-on"
              theme="light"
              :value="true"
              :disabled="true"
            />
          </div>
          <div style="margin-bottom: 15px;">
            <strong>Dark Theme Disabled (OFF):</strong>
            <NbToggleLight
              nb-id="test-disabled-dark-off"
              theme="dark"
              :value="false"
              :disabled="true"
            />
          </div>
          <div style="margin-bottom: 15px;">
            <strong>Dark Theme Disabled (ON):</strong>
            <NbToggleLight
              nb-id="test-disabled-dark-on"
              theme="dark"
              :value="true"
              :disabled="true"
            />
          </div>
        </div>

        <h4 class="test-page__content-tile">NbTest - Custom Text</h4>
        <div style="margin-bottom: 30px;">
          <NbToggleLight
            nb-id="test-custom-text"
            theme="light"
            text-enable="SIM"
            text-disable="NÃO"
            :value="testValue11"
            @changed="($event) => { testValue11 = $event }"
          />
        </div>

        <h4 class="test-page__content-tile">NbTest - Inline</h4>
        <p style="margin-top: 20px;">
          Text before
          <NbToggleLight
            nb-id="test-inline-1"
            theme="light"
            :value="testValue5"
            @changed="($event) => { testValue5 = $event; console.log('changed', $event) }"
          />
          text after
        </p>

        <p style="margin-top: 20px;">
          Text before
          <NbToggleLight
            nb-id="test-inline-2"
            theme="dark"
            :value="testValue6"
            @changed="($event) => { testValue6 = $event; console.log('changed', $event) }"
          />
          text after
        </p>
      </div>
    </div>

		<div v-else-if="btType === 'select'" class="row">
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: visible;"
			>
				<h4 class="test-page__content-tile">NbSelect - Light Theme</h4>

				<div style="width: 100%; margin-bottom: 30px;">
					<NbSelect
						nb-id="select-light-1"
						select-name="select-light-1"
						theme="light"
						:options="selectOptions"
						:selected-option-only="selectedValue"
						@changed="($event) => { selectedValue = $event; console.log('changed', $event) }"
						@user-changed="($event) => console.log('user-changed', $event)"
					/>
				</div>

				<h4 class="test-page__content-tile">NbSelect - Light Theme (Custom Colors)</h4>

				<div style="width: 100%; margin-bottom: 30px;">
					<NbSelect
						nb-id="select-light-2"
						select-name="select-light-2"
						theme="light"
						:options="selectOptions"
						:selected-option-only="selectedValue2"
						light-bg-color="#dbeafe"
						light-bg-color-focus="#bfdbfe"
						light-border-color="#93c5fd"
						light-border-color-focus="#60a5fa"
						light-text-color="#1e40af"
						light-placeholder-color="#64748b"
						light-option-text-color="#1e40af"
						light-option-text-color-selected="#ffffff"
						light-option-bg-color-selected="#3b82f6"
						:border-radius="0.375"
						@changed="($event) => { selectedValue2 = $event; console.log('changed', $event) }"
						@user-changed="($event) => console.log('user-changed', $event)"
					/>
				</div>

				<h4 class="test-page__content-tile">NbSelect - Dark Theme</h4>

				<div style="width: 100%; margin-bottom: 30px;">
					<NbSelect
						nb-id="select-dark-1"
						select-name="select-dark-1"
						theme="dark"
						:options="selectOptions"
						:selected-option-only="selectedValue3"
						@changed="($event) => { selectedValue3 = $event; console.log('changed', $event) }"
						@user-changed="($event) => console.log('user-changed', $event)"
					/>
				</div>

				<h4 class="test-page__content-tile">NbSelect - Dark Theme (Custom Colors)</h4>

				<div style="width: 100%; margin-bottom: 30px;">
					<NbSelect
						nb-id="select-dark-2"
						select-name="select-dark-2"
						theme="dark"
						:options="selectOptions"
						:selected-option-only="selectedValue4"
						dark-bg-color="#8b5cf6"
						dark-bg-color-focus="#7c3aed"
						dark-border-color="#a78bfa"
						dark-border-color-focus="#8b5cf6"
						dark-text-color="#f3f4f6"
						dark-placeholder-color="#c4b5fd"
						dark-option-text-color="#f3f4f6"
						dark-option-text-color-selected="#ffffff"
						dark-option-bg-color-selected="#6d28d9"
						:border-radius="0.5"
						@changed="($event) => { selectedValue4 = $event; console.log('changed', $event) }"
						@user-changed="($event) => console.log('user-changed', $event)"
					/>
				</div>

				<h4 class="test-page__content-tile">NbSelect - Multiple Selection (Light Theme)</h4>

				<div style="width: 100%; margin-bottom: 30px;">
					<NbSelect
						nb-id="select-multiple-light"
						select-name="select-multiple-light"
						theme="light"
						:multiple="true"
						:options="selectOptions"
						:selected-option-multiple="selectedMultiple2"
						@changed="($event) => { selectedMultiple2 = $event; console.log('changed', $event) }"
						@user-changed="($event) => console.log('user-changed', $event)"
					/>
				</div>

				<h4 class="test-page__content-tile">NbSelect - Multiple Selection (Dark Theme)</h4>

				<div style="width: 100%; margin-bottom: 30px;">
					<NbSelect
						nb-id="select-multiple-dark"
						select-name="select-multiple-dark"
						theme="dark"
						:multiple="true"
						:options="selectOptions"
						:selected-option-multiple="selectedMultiple2"
						@changed="($event) => { selectedMultiple2 = $event; console.log('changed', $event) }"
						@user-changed="($event) => console.log('user-changed', $event)"
					/>
				</div>

				<p style="margin-top: 20px;">
					Text before
					<NbSelect
						nb-id="select-inline"
						select-name="select-inline"
						theme="light"
						display="ib"
						:options="selectOptions"
						:selected-option-only="selectedValue5"
						@changed="($event) => { selectedValue5 = $event; console.log('changed', $event) }"
						@user-changed="($event) => console.log('user-changed', $event)"
					/>
					text after
				</p>

        <p>Texto depois</p>

				<h4 class="test-page__content-tile">NbSelect - Multiple Selection (with label)</h4>

				<div style="width: 100%; margin-bottom: 30px;">
					<NbSelect
						nb-id="select-multiple-dark"
						select-name="select-multiple-dark"
						theme="dark"
						:multiple="true"
						has-label
						label-text="Select: "
						:options="selectOptions"
						:selected-option-multiple="selectedMultiple2"
						@changed="($event) => { selectedMultiple2 = $event; console.log('changed', $event) }"
						@user-changed="($event) => console.log('user-changed', $event)"
					/>
				</div>
			</div>
		</div>

		<div v-else-if="btType === 'toggle'" class="row">
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: visible;"
			>

				<h4 class="test-page__content-tile">NbToggle - Light Theme</h4>
				<div style="margin-bottom: 30px;">
					<NbToggle
						nb-id="toggle-light-1"
						theme="light"
						:value="toggleValue1"
						@changed="($event) => { toggleValue1 = $event; console.log('changed', $event) }"
						@current-value="($event) => console.log('current-value', $event)"
						@clicked="() => console.log('clicked')"
					/>
				</div>

				<h4 class="test-page__content-tile">NbToggle - Light Theme (Custom Colors)</h4>
				<div style="margin-bottom: 30px;">
					<NbToggle
						nb-id="toggle-light-2"
						theme="light"
						:value="toggleValue2"
						light-switch-color="#dbeafe"
						light-switch-color-active="#3b82f6"
						light-thumb-color="#bfdbfe"
						light-thumb-color-active="#ffffff"
						@changed="($event) => { toggleValue2 = $event; console.log('changed', $event) }"
						@current-value="($event) => console.log('current-value', $event)"
						@clicked="() => console.log('clicked')"
					/>
				</div>

				<h4 class="test-page__content-tile">NbToggle - Dark Theme</h4>
				<div style="margin-bottom: 30px;">
					<NbToggle
						nb-id="toggle-dark-1"
						theme="dark"
						:value="toggleValue3"
						@changed="($event) => { toggleValue3 = $event; console.log('changed', $event) }"
						@current-value="($event) => console.log('current-value', $event)"
						@clicked="() => console.log('clicked')"
					/>
				</div>

				<h4 class="test-page__content-tile">NbToggle - Dark Theme (Custom Colors)</h4>
				<div style="margin-bottom: 30px;">
					<NbToggle
						nb-id="toggle-dark-2"
						theme="dark"
						:value="toggleValue4"
						dark-switch-color="#8b5cf6"
						dark-switch-color-active="#6d28d9"
						dark-thumb-color="#a78bfa"
						dark-thumb-color-active="#f3f4f6"
						@changed="($event) => { toggleValue4 = $event; console.log('changed', $event) }"
						@current-value="($event) => console.log('current-value', $event)"
						@clicked="() => console.log('clicked')"
					/>
				</div>

				<h4 class="test-page__content-tile">NbToggle - Disabled</h4>
				<div style="margin-bottom: 30px;">
					<div style="margin-bottom: 15px;">
						<strong>Light Theme Disabled (OFF):</strong>
						<NbToggle
							nb-id="toggle-disabled-light-off"
							theme="light"
							:value="false"
							:disabled="true"
						/>
					</div>
					<div style="margin-bottom: 15px;">
						<strong>Light Theme Disabled (ON):</strong>
						<NbToggle
							nb-id="toggle-disabled-light-on"
							theme="light"
							:value="true"
							:disabled="true"
						/>
					</div>
					<div style="margin-bottom: 15px;">
						<strong>Dark Theme Disabled (OFF):</strong>
						<NbToggle
							nb-id="toggle-disabled-dark-off"
							theme="dark"
							:value="false"
							:disabled="true"
						/>
					</div>
					<div style="margin-bottom: 15px;">
						<strong>Dark Theme Disabled (ON):</strong>
						<NbToggle
							nb-id="toggle-disabled-dark-on"
							theme="dark"
							:value="true"
							:disabled="true"
						/>
					</div>
				</div>

				<h4 class="test-page__content-tile">NbToggle - Inline</h4>
				<p style="margin-top: 20px;">
					Text before
					<NbToggle
						nb-id="toggle-inline-1"
						theme="light"
						display="ib"
						:value="toggleValue5"
						@changed="($event) => { toggleValue5 = $event; console.log('changed', $event) }"
					/>
					text after
				</p>

				<p style="margin-top: 20px;">
					Text before
					<NbToggle
						nb-id="toggle-inline-2"
						theme="dark"
						display="ib"
						:value="toggleValue6"
						@changed="($event) => { toggleValue6 = $event; console.log('changed', $event) }"
					/>
					text after
				</p>
			</div>
		</div>

    <div v-if="btType === 'toggle-skewed'" class="row">
      <div
        class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: visible;"
      >
        <h4 class="test-page__content-tile">NbToggleSkewed - Light Theme</h4>
        <div style="margin-bottom: 30px;">
          <NbToggleSkewed
            nb-id="test-light-1"
            theme="light"
            :value="testValue1"
            @changed="($event) => { testValue1 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          />
          
          <br /><br />

          <NbToggleSkewed
            nb-id="test-light-2"
            theme="dark"
            :value="testValue1"
            @changed="($event) => { testValue1 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          />
        </div>
        

        <p style="margin-top: 20px;">
          Text before
          <NbTest
            nb-id="test-inline-3"
            theme="dark"
            :value="testValue1"
            @changed="($event) => { testValue1 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          />
          text after
        </p>
      </div>
    </div>

    <div v-else-if="btType === 'toggle-flip'" class="row">
      <div
        class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: visible;"
      >
        <h4 class="test-page__content-tile">NbToggleFlip - Light Theme</h4>
        <div style="margin-bottom: 30px;">
          <NbToggleFlip
            nb-id="test-light-1"
            theme="light"
            :value="testValue1"
            @changed="($event) => { testValue1 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          />
          
          <br /><br />

          <NbToggleFlip
            nb-id="test-light-2"
            theme="dark"
            :value="testValue1"
            @changed="($event) => { testValue1 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          />
        </div>
        

        <p style="margin-top: 20px;">
          Text before
          <NbToggleFlip
            nb-id="test-inline-3"
            theme="dark"
            :value="testValue1"
            @changed="($event) => { testValue1 = $event; console.log('changed', $event) }"
            @current-value="($event) => console.log('current-value', $event)"
            @clicked="() => console.log('clicked')"
          />
          text after
        </p>
      </div>
    </div>
	</div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const NbTest = defineAsyncComponent(() =>
	import('@components/NbTest.vue')
)
const NbSelect = defineAsyncComponent(() =>
	import('@components/NbSelect.vue')
)
const NbToggle = defineAsyncComponent(() =>
	import('@components/NbToggle.vue')
)
const NbToggleLight = defineAsyncComponent(() =>
	import('@components/NbToggleLight.vue')
)
const NbToggleSkewed = defineAsyncComponent(() =>
	import('@components/NbToggleSkewed.vue')
)
const NbToggleFlip = defineAsyncComponent(() =>
	import('@components/NbToggleFlip.vue')
)

const selectOptions = [
	{ value: 'option1', text: 'Option 1' },
	{ value: 'option2', text: 'Option 2' },
	{ value: 'option3', text: 'Option 3' },
	{ value: 'option4', text: 'Option 4' },
	{ value: 'option5', text: 'Option 5' }
]

const btType = ref('toggle-skewed')
const selectedValue = ref('option1')
const selectedValue2 = ref('option2')
const selectedValue3 = ref('option3')
const selectedValue4 = ref('option4')
const selectedValue5 = ref('option1')
const selectedMultiple = ref(['option1', 'option2'])
const selectedMultiple2 = ref(['option3'])

const toggleValue1 = ref(false)
const toggleValue2 = ref(true)
const toggleValue3 = ref(false)
const toggleValue4 = ref(true)
const toggleValue5 = ref(false)
const toggleValue6 = ref(true)

const testValue1 = ref(false)
const testValue2 = ref(false)
const testValue3 = ref(false)
const testValue4 = ref(false)
const testValue5 = ref(false)
const testValue6 = ref(false)
const testValue7 = ref(false)
const testValue8 = ref(false)
const testValue9 = ref(false)
const testValue10 = ref(false)
const testValue11 = ref(false)
const testValue12 = ref(false)
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
