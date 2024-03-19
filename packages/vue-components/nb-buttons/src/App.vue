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
				style="margin-bottom: 50px; overflow: hidden"
			>
				<select v-model="btType">
					<option value="test">test</option>
					<option value="prevNext">prevNext</option>
					<option value="vavaGane">vavaGane</option>
					<option value="hamburger">hamburger</option>
					<option value="showHover">showHover</option>
					<option value="colorHover">colorHover</option>
					<option value="mechanical">mechanical</option>
					<option value="mechanical2">mechanical 2</option>
					<option value="colorOutside">colorOutside</option>
					<option value="alternateText">alternateText</option>
				</select>
			</div>
		</div>

		<div
			v-if="btType === 'test'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonTest</h4>
				<NbButtonTest
					nb-id="NbButtonTest"
					display="b"
					text-color="white"
					buttonColor="blueviolet"
					shadowColor="green"
					@clicked="buttonAction"
				>
					<template #content> texto 1 </template>
					<template #content-alternate> alternativo </template>
				</NbButtonTest>

				<p style="margin-top: 4px">
					Text before
					<NbButtonTest
						nb-id="NbButtonTest"
						display="ib"
						text-color="white"
						buttonColor="blueviolet"
						:width="160"
						shadowColor="green"
						:show-border="true"
						:border-radius="0"
						@clicked="buttonAction"
					>
						<template #content> text 1</template>
						<template #content-alternate> text 2</template>
					</NbButtonTest>
					text after
				</p>
			</div>
		</div>

		<div
			v-else-if="btType === 'alternateText'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonAlternateText</h4>
				<NbButtonAlternateText
					nb-id="NbButtonAlternateText1"
					display="b"
					text-color="white"
					buttonColor="blueviolet"
					@clicked="buttonAction"
				>
					<template #content> text 1 </template>
					<template #content-alternate> text 2 </template>
				</NbButtonAlternateText>

				<p style="margin-top: 4px">
					Text before
					<NbButtonAlternateText
						nb-id="NbButtonAlternateText2"
						display="ib"
						text-color="white"
						buttonColor="blueviolet"
						:width="160"
						:show-border="true"
						:border-radius="0"
						@clicked="buttonAction"
					>
						<template #content> text 1 </template>
						<template #content-alternate> text 2 </template>
					</NbButtonAlternateText>
					text after
				</p>
			</div>
		</div>

		<div
			v-if="btType === 'colorOutside'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonColorOutside</h4>
				<NbButtonColorOutside
					nb-id="NbButtonColorOutside"
					display="b"
					buttonColor="blueviolet"
					:disabled="false"
					@clicked="buttonAction"
				/>

				<p style="margin-top: 4px">
					Text before
					<NbButtonColorOutside
						nb-id="NbButtonColorOutside"
						display="ib"
						buttonColor="blueviolet"
						:disabled="false"
						@clicked="buttonAction"
					/>
					text after
				</p>
			</div>
		</div>

		<div
			v-if="btType === 'mechanical2'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonMechanica2</h4>
				<NbButtonMechanical2
					nb-id="NbButtonMechanical2"
					display="b"
					buttonColor="blueviolet"
					shadowColor="green"
					@clicked="buttonAction"
				/>

				<p style="margin-top: 4px">
					Text before
					<NbButtonMechanical2
						nb-id="NbButtonMechanical2"
						display="ib"
						buttonColor="blueviolet"
						shadowColor="green"
						@clicked="buttonAction"
					/>
					text after
				</p>
			</div>
		</div>

		<div
			v-else-if="btType === 'prevNext'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonPrevNext</h4>
				<NbButtonPrevNext
					nb-id="NbButtonPrevNext1"
					:disabledPreview="false"
					:disabledNext="false"
					:disabled="false"
					@clicked="buttonAction"
				>
					<template #prev>Prev Text</template>
					<template #next>Next Text</template>
				</NbButtonPrevNext>

				<p style="margin-top: 4px">
					Text before
					<NbButtonPrevNext
						nb-id="NbButtonPrevNext2"
						:disabledPreview="false"
						:disabledNext="false"
						:disabled="false"
						@clicked="buttonAction"
					>
						<template #prev>Prev Text</template>
						<template #next>Next Text</template>
					</NbButtonPrevNext>
					text after
				</p>
			</div>
		</div>

		<div
			v-else-if="btType === 'vavaGane'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonVavaGame</h4>
				<NbButtonVavaGame
					nb-id="NbButtonVavaGame1"
					@clicked="buttonAction"
				>
					<template #text>
						Slot with<br />
						name 'test'
					</template>
				</NbButtonVavaGame>

				<p style="margin-top: 4px">
					Text before
					<NbButtonVavaGame
						nb-id="NbButtonVavaGame2"
						@clicked="buttonAction"
					>
						<template #text>
							Slot with<br />
							name 'test'
						</template>
					</NbButtonVavaGame>
					text after
				</p>
			</div>
		</div>

		<div
			v-else-if="btType === 'hamburger'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonHamburger</h4>
				<NbButtonHamburger
					nb-id="NbButtonHamburger1"
					@clicked="buttonAction"
				/>

				<p style="margin-top: 4px">
					Text before
					<NbButtonHamburger
						nb-id="NbButtonHamburger2"
						@clicked="buttonAction"
					/>
					text after
				</p>
			</div>
		</div>

		<div
			v-else-if="btType === 'showHover'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonShowHover</h4>
				<NbButtonShowHover
					nb-id="NbButtonShowHover1"
					container-color="#181818"
					button-color="tomato"
					text-color-hover="red"
					button-color-hover="255,0,204"
					verticalAlign="middle"
					@clicked="buttonAction"
				/>

				<p style="margin-top: 4px">
					Text before
					<NbButtonShowHover
						nb-id="NbButtonShowHover2"
						container-color="#181818"
						button-color="tomato"
						text-color-hover="red"
						button-color-hover="255,0,204"
						verticalAlign="middle"
						@clicked="buttonAction"
					/>
					text after
				</p>
			</div>
		</div>

		<div
			v-else-if="btType === 'colorHover'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonColorHover</h4>
				<NbButtonColorHover
					nb-id="NbButtonColorHover1"
					display="b"
					container-color="#181818"
					button-color="tomato"
					@clicked="buttonAction"
				/>

				<p style="margin-top: 4px">
					Text before
					<NbButtonColorHover
						nb-id="NbButtonColorHover2"
						display="ib"
						container-color="#181818"
						button-color="tomato"
						@clicked="buttonAction"
					/>
					text after
				</p>
			</div>
		</div>

		<div
			v-else-if="btType === 'mechanical'"
			class="row"
		>
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
import { defineAsyncComponent, ref } from 'vue'

const NbButtonMechanical = defineAsyncComponent(() => import('@components/NbButtonMechanical.vue'))
const NbButtonMechanical2 = defineAsyncComponent(() =>
	import('@components/NbButtonMechanical2.vue')
)
const NbButtonColorHover = defineAsyncComponent(() => import('@components/NbButtonColorHover.vue'))
const NbButtonShowHover = defineAsyncComponent(() => import('@components/NbButtonShowHover.vue'))
const NbButtonHamburger = defineAsyncComponent(() => import('@components/NbButtonHamburger.vue'))
const NbButtonVavaGame = defineAsyncComponent(() => import('@components/NbButtonVavaGame.vue'))
const NbButtonPrevNext = defineAsyncComponent(() => import('@components/NbButtonPrevNext.vue'))
const NbButtonColorOutside = defineAsyncComponent(() =>
	import('@components/NbButtonColorOutside.vue')
)
const NbButtonAlternateText = defineAsyncComponent(() =>
	import('@components/NbButtonAlternateText.vue')
)
const NbButtonTest = defineAsyncComponent(() => import('@components/NbButtonTest.vue'))

const btType = ref('test')

// btType
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
