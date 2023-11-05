<template>
	<div class="container-fluid test-page">
		<div class="row">
			<div class="col-md-10 col-md-offset-1 test-page__title">
				<h2>Test page</h2>
				<p class="test-page__component-name"><strong>Component:</strong> NbButtons</p>
				<p class="test-page__warning">Warning: Look at the console to see the click event</p>
			</div>
		</div>
		<div class="row">
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonMechanical</h4>
				<NbButtonMechanical
					nb-id="NbButtonMechanical1"
					container-color="#181818"
					button-color="tomato"
					font-size="1.6em"
					@clicked="buttonAction"
				>
					<template #content> button with block display </template>
				</NbButtonMechanical>

				<p>
					Text before
					<NbButtonMechanical
						nb-id="NbButtonMechanical2"
						display="ib"
						container-color="#181818"
						button-color="tomato"
						@clicked="buttonAction"
					>
						<template #content> button with inline-block display </template>
					</NbButtonMechanical>
					text after
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const NbButtonMechanical = defineAsyncComponent(() => import('@components/NbButtonMechanical.vue'))

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
