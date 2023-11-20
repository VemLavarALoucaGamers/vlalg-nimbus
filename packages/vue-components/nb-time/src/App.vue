<template>
	<div class="container-fluid test-page">
		<div class="row">
			<div class="col-md-10 col-md-offset-1 test-page__title">
				<h2>Test page</h2>
				<p class="test-page__component-name"><strong>Component:</strong> NbTime</p>
				<p class="test-page__warning">Warning: Look at the console to see the click event</p>
			</div>
		</div>
		<div class="row">
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbCountdown</h4>
				<br />

				<NbCountdown
					nb-id="test"
					display="ib"
					:day="day"
					:month="month"
					:year="year"
					:hour="hour"
					:minute="minute"
					:second="second"
					border-color="blue"
					text-color="white"
					:border="true"
					:separator="true"
					separator-type="/"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const NbCountdown = defineAsyncComponent(() => import('@components/NbCountdown.vue'))

const day = ref(19)
const month = ref('nov')
const year = ref(2024)
const hour = ref(1)
const minute = ref(22)
const second = ref(0)

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
