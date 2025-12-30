<template>
	<div class="container-fluid test-page">
		<div class="row">
			<div class="col-md-10 col-md-offset-1 test-page__title">
				<h2>Test page</h2>
				<p class="test-page__component-name"><strong>Component:</strong> NbPassword</p>
				<p class="test-page__warning">Warning: Look at the console to see the click event</p>
			</div>
		</div>

		<div class="row">
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-bottom: 50px; overflow: hidden"
			>
				<select v-model="passwordType">
					<option value="preview">preview</option>
          <option value="statusBar">statusBar</option>
          <option value="validationSection">validationSection</option>
				</select>
			</div>
		</div>

		<div
			v-if="passwordType === 'preview'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbPasswordPreview</h4>
				<br />

				<select v-model="passwordPreviewType">
					<option value="generate">generate</option>
					<option value="preview">preview</option>
				</select>

				<input
					v-if="passwordPreviewType === 'preview'"
					type="text"
					v-model="testPassword"
					style="margin-left: 10px"
				/>

				<br />
				<br />

				<NbPasswordPreview
					nb-id="test"
					display="b"
					:password="testPassword"
					:type="passwordPreviewTypeParse"
				/>

				<br />

				<NbPasswordPreview
					nb-id="test"
					display="ib"
					:password="testPassword"
					:type="passwordPreviewTypeParse"
				/>
			</div>
		</div>

    <div
			v-if="passwordType === 'statusBar'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbPasswordStatusBar</h4>
				<br />

				<input
					type="text"
					v-model="testPassword"
				/>

				<br />
				<br />

				<NbPasswordStatusBar
					nb-id="test"
					:password="testPassword"
				/>
			</div>
		</div>

    <div
			v-if="passwordType === 'validationSection'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbPasswordValidationSection</h4>
				<br />

				<input
					type="text"
					v-model="testPassword"
				/>

				<br />
				<br />

				<NbPasswordValidationSection
					nb-id="test"
					:password="testPassword"
          title-color="white"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineAsyncComponent, ref, computed } from 'vue'

const NbPasswordPreview = defineAsyncComponent(() => import('@components/NbPasswordPreview.vue'))
const NbPasswordStatusBar = defineAsyncComponent(() => import('@components/NbPasswordStatusBar.vue'))
const NbPasswordValidationSection = defineAsyncComponent(() => import('@components/NbPasswordValidationSection.vue'))

const passwordType = ref('validationSection')
const passwordPreviewType = ref('preview')
const testPassword = ref('RPd2%_S_')

const passwordPreviewTypeParse = computed(() => {
	return passwordPreviewType.value === 'preview' ? 'insert' : 'generate'
})

const buttonAction = () => {
	console.log('aqui')
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
