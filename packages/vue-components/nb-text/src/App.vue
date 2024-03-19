<template>
	<div class="container-fluid test-page">
		<div class="row">
			<div class="col-md-10 col-md-offset-1 test-page__title">
				<h2>Test page</h2>
				<p class="test-page__component-name"><strong>Component:</strong> NbText</p>
			</div>
		</div>

		<div class="row">
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-bottom: 50px; overflow: hidden"
			>
				<select v-model="textType">
					<option value="gradientText">gradientText</option>
					<option value="highlightSelectedText">highlightSelectedText</option>
				</select>
			</div>
		</div>

		<div
			v-if="textType === 'gradientText'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbGradientText</h4>

				<NbGradientText
					nb-id="nb-gradient-text"
					line-height="1"
					size="3.5rem"
					bg-first="magenta"
					bg-second="cyan"
					alignment="center"
					padding-bottom="10"
				>
					<template #text> i love to<br />drink coffee<br />very much </template>
				</NbGradientText>
			</div>
		</div>

		<div
			v-else
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbHighlightSelectedText</h4>
				<p style="font-size: 26px !important">
					Select
					<NbHighlightSelectedText
						nb-id="asdas"
						background-color="tomato"
						text-color="blue"
					>
						<template #text>this part of the text</template>
					</NbHighlightSelectedText>
					to see it in another color
				</p>
			</div>
		</div>
	</div>
</template>
<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue'

export default defineComponent({
	name: 'App',
	components: {
		NbGradientText: defineAsyncComponent(() => import('@components/NbGradientText.vue')),
		NbHighlightSelectedText: defineAsyncComponent(() =>
			import('@components/NbHighlightSelectedText.vue')
		)
	},
	emits: [],
	props: {},
	setup() {
		const textType = ref('gradientText')

		return {
			textType
		}
	}
})
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

		.test-page__content-tile {
			font-family: 'Lato', sans-serif;
			text-align: left;
			font-weight: 800;

			&:not(:first-child) {
				margin-top: 150px;
			}
		}
	}
}
</style>
