<template>
	<div class="container-fluid test-page" style="background-color: rgb(222 154 118);">
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
					<option value="back">back</option>
					<option value="normal">normal</option>
          <option value="shadow">shadow</option>
          <option value="underlineExpand">underlineExpand</option>
          <option value="underlineFill">underlineFill</option>
          <option value="gradientBorderToBackground">gradientBorderToBackground</option>
          <option value="splitDropdown">Split Dropdown</option>
				</select>
			</div>
		</div>

		<div
			v-if="btType === 'test'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: visible"
			>
				<h4 class="test-page__content-tile">NbButtonTest (SplitButton)</h4>
				<NbButtonTest
					nb-id="NbButtonTest1"
					display="b"
					main-button-text="Save"
					:menu-items="splitButtonMenuItems"
					:border-radius="0"
					:popup-border-radius="0"
					:popup-padding-x="1.2"
					:popup-padding-y="0.4"
					@clicked="handleSplitButtonClick"
					@main-clicked="handleMainButtonClick"
					@menu-item-clicked="handleMenuItemClick"
				/>

				<p style="margin-top: 20px">
					Text before
					<NbButtonTest
						nb-id="NbButtonTest3"
						display="ib"
						main-button-text="Update"
						:menu-items="splitButtonMenuItems2"
						button-color="hsl(220 75% 50%)"
						button-hover-color="hsl(220 75% 45%)"
						:border-radius="0.375"
						:popup-border-radius="0.5"
						:popup-padding-x="1.5"
						:popup-padding-y="0.6"
            menu-item-focus-outline-color="#ff0000"
            menu-item-focus-outline-width="3px"
            menu-item-focus-outline-offset="0px"
						@clicked="handleSplitButtonClick"
						@main-clicked="handleMainButtonClick"
						@menu-item-clicked="handleMenuItemClick"
					/>
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
				<h4 class="test-page__content-tile">NbButtonAlternateText - Light Theme</h4>
				<NbButtonAlternateText
					nb-id="NbButtonAlternateText-light-1"
					display="b"
					theme="light"
					@clicked="buttonAction"
				>
					<template #content>Default Text</template>
				</NbButtonAlternateText>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonAlternateText - Light Theme (Custom Colors)</h4>
					<NbButtonAlternateText
						nb-id="NbButtonAlternateText-light-2"
						display="ib"
						theme="light"
						light-text-color="#92400e"
						light-text-color-hover="#ffffff"
						light-button-color="#fef3c7"
						light-button-color-hover="#fde68a"
						light-border-color="#fbbf24"
						:width="160"
						:show-border="true"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonAlternateText>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonAlternateText - Dark Theme</h4>
					<NbButtonAlternateText
						nb-id="NbButtonAlternateText-dark-1"
						display="b"
						theme="dark"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonAlternateText>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonAlternateText - Dark Theme (Custom Colors)</h4>
					<NbButtonAlternateText
						nb-id="NbButtonAlternateText-dark-2"
						display="ib"
						theme="dark"
						dark-text-color="#d1fae5"
						dark-text-color-hover="#ffffff"
						dark-button-color="#059669"
						dark-button-color-hover="#047857"
						dark-border-color="#10b981"
						:width="160"
						:show-border="true"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonAlternateText>
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
				<h4 class="test-page__content-tile">NbButtonColorOutside - Light Theme</h4>
				<NbButtonColorOutside
					nb-id="NbButtonColorOutside-light-1"
					display="b"
					theme="light"
					:disabled="false"
					@clicked="buttonAction"
				/>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonColorOutside - Light Theme (Custom Colors)</h4>
					<NbButtonColorOutside
						nb-id="NbButtonColorOutside-light-2"
						display="ib"
						theme="light"
						light-button-color="#fef3c7"
						light-text-color="#92400e"
						light-border-color="#fbbf24"
						:disabled="false"
						@clicked="buttonAction"
					/>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonColorOutside - Dark Theme</h4>
					<NbButtonColorOutside
						nb-id="NbButtonColorOutside-dark-1"
						display="b"
						theme="dark"
						:disabled="false"
						@clicked="buttonAction"
					/>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonColorOutside - Dark Theme (Custom Colors)</h4>
					<NbButtonColorOutside
						nb-id="NbButtonColorOutside-dark-2"
						display="ib"
						theme="dark"
						dark-button-color="#059669"
						dark-text-color="#d1fae5"
						dark-border-color="tomato"
						:disabled="false"
						@clicked="buttonAction"
					/>
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
				<h4 class="test-page__content-tile">NbButtonMechanical2 - Light Theme</h4>
				<NbButtonMechanical2
					nb-id="NbButtonMechanical2-light-1"
					display="b"
					theme="light"
					@clicked="buttonAction"
				>
					<template #content>Default Text</template>
				</NbButtonMechanical2>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonMechanical2 - Light Theme (Custom Colors)</h4>
					<NbButtonMechanical2
						nb-id="NbButtonMechanical2-light-2"
						display="ib"
						theme="light"
						light-text-color="#1e40af"
						light-button-color="#93c5fd"
						light-shadow-color="#60a5fa"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonMechanical2>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonMechanical2 - Dark Theme</h4>
					<NbButtonMechanical2
						nb-id="NbButtonMechanical2-dark-1"
						display="b"
						theme="dark"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonMechanical2>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonMechanical2 - Dark Theme (Custom Colors)</h4>
					<NbButtonMechanical2
						nb-id="NbButtonMechanical2-dark-2"
						display="ib"
						theme="dark"
						dark-text-color="#a78bfa"
						dark-button-color="#8b5cf6"
						dark-shadow-color="#7c3aed"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonMechanical2>
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
				<h4 class="test-page__content-tile">NbButtonPrevNext - Light Theme</h4>
				<NbButtonPrevNext
					nb-id="NbButtonPrevNext-light-1"
					theme="light"
					:disabledPreview="false"
					:disabledNext="false"
					:disabled="false"
					@clicked="buttonAction"
				>
					<template #prev>← Preview</template>
					<template #next>Next →</template>
				</NbButtonPrevNext>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonPrevNext - Light Theme (Custom Colors)</h4>
					<NbButtonPrevNext
						nb-id="NbButtonPrevNext-light-2"
						theme="light"
						light-color-primary="#93c5fd"
						light-color-secondary="#60a5fa"
						light-text-color="#1e40af"
						light-text-color-hover="#ffffff"
						:disabledPreview="false"
						:disabledNext="false"
						:disabled="false"
						@clicked="buttonAction"
					>
						<template #prev>← Preview</template>
						<template #next>Next →</template>
					</NbButtonPrevNext>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonPrevNext - Dark Theme</h4>
					<NbButtonPrevNext
						nb-id="NbButtonPrevNext-dark-1"
						theme="dark"
						:disabledPreview="false"
						:disabledNext="false"
						:disabled="false"
						@clicked="buttonAction"
					>
						<template #prev>← Preview</template>
						<template #next>Next →</template>
					</NbButtonPrevNext>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonPrevNext - Dark Theme (Custom Colors)</h4>
					<NbButtonPrevNext
						nb-id="NbButtonPrevNext-dark-2"
						theme="dark"
						dark-color-primary="#8b5cf6"
						dark-color-secondary="#7c3aed"
						dark-text-color="#a78bfa"
						dark-text-color-hover="#ffffff"
						:disabledPreview="false"
						:disabledNext="false"
						:disabled="false"
						@clicked="buttonAction"
					>
						<template #prev>← Preview</template>
						<template #next>Next →</template>
					</NbButtonPrevNext>
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
				<h4 class="test-page__content-tile">NbButtonVavaGame - Light Theme</h4>
				<NbButtonVavaGame
					nb-id="NbButtonVavaGame-light-1"
					display="b"
					theme="light"
					@clicked="buttonAction"
				>
					<template #content>Default Text</template>
				</NbButtonVavaGame>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonVavaGame - Light Theme (Custom Colors)</h4>
					<NbButtonVavaGame
						nb-id="NbButtonVavaGame-light-2"
						display="ib"
						theme="light"
						light-text-color="#1e40af"
						light-text-color-hover="#000000"
						light-button-color="#93c5fd"
						light-button-color-hover="#60a5fa"
						light-border-color="#3b82f6"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonVavaGame>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonVavaGame - Dark Theme</h4>
					<NbButtonVavaGame
						nb-id="NbButtonVavaGame-dark-1"
						display="b"
						theme="dark"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonVavaGame>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonVavaGame - Dark Theme (Custom Colors)</h4>
					<NbButtonVavaGame
						nb-id="NbButtonVavaGame-dark-2"
						display="ib"
						theme="dark"
						dark-text-color="#a78bfa"
						dark-text-color-hover="#ffffff"
						dark-button-color="#8b5cf6"
						dark-button-color-hover="#7c3aed"
						dark-border-color="#6d28d9"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonVavaGame>
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
				<h4 class="test-page__content-tile">NbButtonHamburger - Light Theme</h4>
				<NbButtonHamburger
					nb-id="NbButtonHamburger-light-1"
					theme="light"
					@clicked="buttonAction"
				/>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonHamburger - Light Theme (Custom Colors)</h4>
					<NbButtonHamburger
						nb-id="NbButtonHamburger-light-2"
						theme="light"
						light-color="#1e40af"
						light-color-hover="#000000"
						light-container-color="#93c5fd"
						light-container-color-hover="#60a5fa"
						@clicked="buttonAction"
					/>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonHamburger - Dark Theme</h4>
					<NbButtonHamburger
						nb-id="NbButtonHamburger-dark-1"
						theme="dark"
						@clicked="buttonAction"
					/>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonHamburger - Dark Theme (Custom Colors)</h4>
					<NbButtonHamburger
						nb-id="NbButtonHamburger-dark-2"
						theme="dark"
						dark-color="#a78bfa"
						dark-color-hover="#ffffff"
						dark-container-color="#8b5cf6"
						dark-container-color-hover="#7c3aed"
						@clicked="buttonAction"
					/>
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
				<h4 class="test-page__content-tile">NbButtonShowHover - Light Theme</h4>
				<NbButtonShowHover
					nb-id="NbButtonShowHover-light-1"
					display="b"
					theme="light"
					verticalAlign="middle"
					@clicked="buttonAction"
				>
					<template #content>Default Text</template>
				</NbButtonShowHover>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonShowHover - Light Theme (Custom Colors)</h4>
					<NbButtonShowHover
						nb-id="NbButtonShowHover-light-2"
						display="ib"
						theme="light"
						light-text-color="#1e40af"
						light-text-color-hover="#ffffff"
						light-button-color-hover="59, 130, 246"
						light-button-color-opacity-hover="0.2"
						verticalAlign="middle"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonShowHover>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonShowHover - Dark Theme</h4>
					<NbButtonShowHover
						nb-id="NbButtonShowHover-dark-1"
						display="b"
						theme="dark"
						verticalAlign="middle"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonShowHover>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonShowHover - Dark Theme (Custom Colors)</h4>
					<NbButtonShowHover
						nb-id="NbButtonShowHover-dark-2"
						display="ib"
						theme="dark"
						dark-text-color="#a78bfa"
						dark-text-color-hover="#ffffff"
						dark-button-color-hover="139, 92, 246"
						dark-button-color-opacity-hover="0.2"
						verticalAlign="middle"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonShowHover>
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
					@clicked="buttonAction"
				>
					<template #content>Default Button</template>
				</NbButtonColorHover>

				<p style="margin-top: 4px">
					Text before
					<NbButtonColorHover
						nb-id="NbButtonColorHover2"
						display="ib"
						@clicked="buttonAction"
					>
						<template #content>Inline Button</template>
					</NbButtonColorHover>
					text after
				</p>

				<h5 style="margin-top: 30px; margin-bottom: 10px">Com Theme Light (padrão):</h5>
				<NbButtonColorHover
					nb-id="NbButtonColorHover3"
					display="b"
					theme="light"
					@clicked="buttonAction"
				>
					<template #content>Theme Light</template>
				</NbButtonColorHover>

				<h5 style="margin-top: 30px; margin-bottom: 10px">Com Theme Dark:</h5>
				<NbButtonColorHover
					nb-id="NbButtonColorHover4"
					display="b"
					theme="dark"
					@clicked="buttonAction"
				>
					<template #content>Theme Dark</template>
				</NbButtonColorHover>

				<h5 style="margin-top: 30px; margin-bottom: 10px">Theme Dark com cores customizadas:</h5>
				<NbButtonColorHover
					nb-id="NbButtonColorHover5"
					display="b"
					theme="dark"
					dark-button-color="#8b5cf6"
					dark-button-color-hover="#7c3aed"
					dark-text-color="#f3f4f6"
					dark-text-color-hover="#ffffff"
					@clicked="buttonAction"
				>
					<template #content>Dark com cores customizadas</template>
				</NbButtonColorHover>

				<h5 style="margin-top: 30px; margin-bottom: 10px">Theme Light com TODAS as opções customizadas:</h5>
				<NbButtonColorHover
					nb-id="NbButtonColorHover6"
					display="b"
					theme="light"
					light-button-color="#dbeafe"
					light-button-color-hover="#bfdbfe"
					light-text-color="#1e40af"
					light-text-color-hover="#1e3a8a"
					light-disabled-bg-color="rgba(219, 234, 254, 0.5)"
					:border-radius="0.5"
					:padding-x="1.5"
					:padding-y="0.4"
					@clicked="buttonAction"
				>
					<template #content>Light - Todas as cores customizadas</template>
				</NbButtonColorHover>
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
				<h4 class="test-page__content-tile">NbButtonMechanical - Light Theme</h4>
				<NbButtonMechanical
					nb-id="NbButtonMechanical-light-1"
					display="b"
					theme="light"
					font-size="1.6em"
					@clicked="buttonAction"
				>
					<template #content>Default Text</template>
				</NbButtonMechanical>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonMechanical - Light Theme (Custom Colors)</h4>
					<NbButtonMechanical
						nb-id="NbButtonMechanical-light-2"
						display="ib"
						theme="light"
						light-text-color="#1e40af"
						light-button-color="#93c5fd"
						light-container-color="#60a5fa"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonMechanical>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonMechanical - Dark Theme</h4>
					<NbButtonMechanical
						nb-id="NbButtonMechanical-dark-1"
						display="b"
						theme="dark"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonMechanical>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonMechanical - Dark Theme (Custom Colors)</h4>
					<NbButtonMechanical
						nb-id="NbButtonMechanical-dark-2"
						display="ib"
						theme="dark"
						dark-text-color="#a78bfa"
						dark-button-color="#8b5cf6"
						dark-container-color="#7c3aed"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonMechanical>
				</p>
			</div>
		</div>

		<div
			v-else-if="btType === 'back'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonBack - Light Theme</h4>
				<NbButtonBack
					nb-id="NbButtonBack-light-1"
					theme="light"
					text="back"
					@clicked="buttonAction"
				/>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonBack - Light Theme (Custom Colors)</h4>
					<NbButtonBack
						nb-id="NbButtonBack-light-2"
						theme="light"
						light-color="#059669"
						light-text-color="#10b981"
						text="back"
						@clicked="buttonAction"
					/>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonBack - Dark Theme</h4>
					<NbButtonBack
						nb-id="NbButtonBack-dark-1"
						theme="dark"
						text="back"
						@clicked="buttonAction"
					/>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonBack - Dark Theme (Custom Colors)</h4>
					<NbButtonBack
						nb-id="NbButtonBack-dark-2"
						theme="dark"
						dark-color="#ec4899"
						dark-text-color="#f472b6"
						text="back"
						@clicked="buttonAction"
					/>
				</p>
			</div>
		</div>

    <div
			v-else-if="btType === 'normal'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonNormal</h4>
				<NbButtonNormal
					nb-id="NbButtonNormal1"
					display="b"
					@clicked="buttonAction"
				>
					<template #content> texto 1 </template>
				</NbButtonNormal>

				<p style="margin-top: 4px">
					Text before
					<NbButtonNormal
						nb-id="NbButtonNormal2"
						display="ib"
						@clicked="buttonAction"
					>
						<template #content> text 1</template>
					</NbButtonNormal>
					text after
				</p>

				<h5 style="margin-top: 30px; margin-bottom: 10px">Com Theme Light (padrão):</h5>
				<NbButtonNormal
					nb-id="NbButtonNormal3"
					display="b"
					theme="light"
					@clicked="buttonAction"
				>
					<template #content>Theme Light</template>
				</NbButtonNormal>

				<h5 style="margin-top: 30px; margin-bottom: 10px">Com Theme Dark:</h5>
				<NbButtonNormal
					nb-id="NbButtonNormal4"
					display="b"
					theme="dark"
					@clicked="buttonAction"
				>
					<template #content>Theme Dark</template>
				</NbButtonNormal>

				<h5 style="margin-top: 30px; margin-bottom: 10px">Theme Dark com cores customizadas:</h5>
				<NbButtonNormal
					nb-id="NbButtonNormal5"
					display="b"
					theme="dark"
					dark-button-color="tomato"
					dark-text-color="#ffffff"
					dark-button-color-hover="darkred"
					@clicked="buttonAction"
				>
					<template #content>Dark com cores customizadas</template>
				</NbButtonNormal>

				<h5 style="margin-top: 30px; margin-bottom: 10px">Theme Dark com TODAS as opções customizadas:</h5>
				<NbButtonNormal
					nb-id="NbButtonNormal6"
					display="b"
					theme="dark"
					dark-button-color="#8b5cf6"
					dark-button-color-hover="#7c3aed"
					dark-text-color="#f3f4f6"
					dark-text-color-hover="#ffffff"
					dark-border-color="#fbbf24"
					dark-border-color-hover="#f59e0b"
					dark-disabled-bg-color="rgba(139, 92, 246, 0.3)"
					:show-border="true"
					:border-radius="0.5"
					:padding-x="1.5"
					:padding-y="0.4"
					@clicked="buttonAction"
				>
					<template #content>Dark - Todas as cores customizadas</template>
				</NbButtonNormal>

				<h5 style="margin-top: 30px; margin-bottom: 10px">Theme Light com TODAS as opções customizadas:</h5>
				<NbButtonNormal
					nb-id="NbButtonNormal7"
					display="b"
					theme="light"
					light-button-color="#dbeafe"
					light-button-color-hover="#bfdbfe"
					light-text-color="#1e40af"
					light-text-color-hover="#1e3a8a"
					light-border-color="green"
					light-border-color-hover="tomato"
					light-disabled-bg-color="rgba(219, 234, 254, 0.5)"
					:show-border="true"
					:border-radius="0.5"
					:padding-x="1.5"
					:padding-y="0.4"
					@clicked="buttonAction"
				>
					<template #content>Light - Todas as cores customizadas</template>
				</NbButtonNormal>
			</div>
		</div>

    <div
			v-else-if="btType === 'shadow'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonShadow - Light Theme</h4>
				<NbButtonShadow
					nb-id="NbButtonShadow-light-1"
					display="b"
					theme="light"
					@clicked="buttonAction"
				>
					<template #content>Default Text</template>
				</NbButtonShadow>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonShadow - Light Theme (Custom Colors)</h4>
					<NbButtonShadow
						nb-id="NbButtonShadow-light-2"
						display="ib"
						theme="light"
						light-button-color="#dbeafe"
						light-button-color-hover="#bfdbfe"
						light-text-color="#1e40af"
						light-text-color-hover="#000000"
						light-button-shadow-color="#93c5fd"
						light-border-color="#93c5fd"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonShadow>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonShadow - Dark Theme</h4>
					<NbButtonShadow
						nb-id="NbButtonShadow-dark-1"
						display="b"
						theme="dark"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonShadow>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonShadow - Dark Theme (Custom Colors)</h4>
					<NbButtonShadow
						nb-id="NbButtonShadow-dark-2"
						display="ib"
						theme="dark"
						dark-button-color="#8b5cf6"
						dark-button-color-hover="#7c3aed"
						dark-text-color="#f3f4f6"
						dark-text-color-hover="#ffffff"
						dark-button-shadow-color="#a78bfa"
						dark-border-color="#a78bfa"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonShadow>
				</p>
			</div>
		</div>

    <div
			v-else-if="btType === 'underlineExpand'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonUnderlineExpand - Light Theme</h4>
				<NbButtonUnderlineExpand
					nb-id="NbButtonUnderlineExpand-light-1"
					display="b"
					theme="light"
          textAlign="left"
					@clicked="buttonAction"
				>
					<template #content>Default Text</template>
				</NbButtonUnderlineExpand>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonUnderlineExpand - Light Theme (Custom Colors)</h4>
					<NbButtonUnderlineExpand
						nb-id="NbButtonUnderlineExpand-light-2"
						display="ib"
						theme="light"
						light-text-color="#1e40af"
						light-text-color-hover="#000000"
						light-border-color="#93c5fd"
						light-border-color-hover="#60a5fa"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonUnderlineExpand>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonUnderlineExpand - Dark Theme</h4>
					<NbButtonUnderlineExpand
						nb-id="NbButtonUnderlineExpand-dark-1"
						display="b"
						theme="dark"
          textAlign="left"
					@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonUnderlineExpand>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonUnderlineExpand - Dark Theme (Custom Colors)</h4>
					<NbButtonUnderlineExpand
						nb-id="NbButtonUnderlineExpand-dark-2"
						display="ib"
						theme="dark"
						dark-text-color="#a78bfa"
						dark-text-color-hover="#ffffff"
						dark-border-color="#8b5cf6"
						dark-border-color-hover="#7c3aed"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonUnderlineExpand>
				</p>
			</div>
		</div>

    <div
			v-else-if="btType === 'underlineFill'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonUnderlineFill - Light Theme</h4>
				<NbButtonUnderlineFill
					nb-id="NbButtonUnderlineFill-light-1"
					display="b"
					theme="light"
          textAlign="left"
					@clicked="buttonAction"
				>
					<template #content>Default Text</template>
				</NbButtonUnderlineFill>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonUnderlineFill - Light Theme (Custom Colors)</h4>
					<NbButtonUnderlineFill
						nb-id="NbButtonUnderlineFill-light-2"
						display="ib"
						theme="light"
						light-text-color="#1e40af"
						light-text-color-hover="#ffffff"
						light-button-color="#93c5fd"
						light-button-color-hover="#3b82f6"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonUnderlineFill>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonUnderlineFill - Dark Theme</h4>
					<NbButtonUnderlineFill
						nb-id="NbButtonUnderlineFill-dark-1"
						display="b"
						theme="dark"
          textAlign="left"
					@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonUnderlineFill>
				</p>

				<p style="margin-top: 20px">
					<h4 class="test-page__content-tile">NbButtonUnderlineFill - Dark Theme (Custom Colors)</h4>
					<NbButtonUnderlineFill
						nb-id="NbButtonUnderlineFill-dark-2"
						display="ib"
						theme="dark"
						dark-text-color="#a78bfa"
						dark-text-color-hover="#ffffff"
						dark-button-color="#8b5cf6"
						dark-button-color-hover="#7c3aed"
						@clicked="buttonAction"
					>
						<template #content>Default Text</template>
					</NbButtonUnderlineFill>
				</p>
			</div>
		</div>

    <div
			v-else-if="btType === 'gradientBorderToBackground'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: hidden"
			>
				<h4 class="test-page__content-tile">NbButtonGradientBorderToBackground</h4>
				<NbButtonGradientBorderToBackground
					nb-id="NbButtonGradientBorderToBackground"
					display="b"
					@clicked="buttonAction"
				>
					<template #content>Texto 1</template>
				</NbButtonGradientBorderToBackground>

				<p style="margin-top: 4px">
					Text before
					<NbButtonGradientBorderToBackground
						nb-id="NbButtonGradientBorderToBackground"
						display="ib"
						@clicked="buttonAction"
					>
						<template #content>Texto 1</template>
					</NbButtonGradientBorderToBackground>
					text after
				</p>
			</div>
		</div>

		<div
			v-else-if="btType === 'splitDropdown'"
			class="row"
		>
			<div
				class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
				style="margin-top: 50px; margin-bottom: 50px; overflow: visible"
			>
				<h4 class="test-page__content-tile">NbButtonSplitDropdown</h4>
				<NbButtonSplitDropdown
					nb-id="NbButtonSplitDropdown1"
					display="b"
					main-button-text="Save"
					:menu-items="splitButtonMenuItems"
					:border-radius="0"
					:popup-border-radius="0"
					:popup-padding-x="1.2"
					:popup-padding-y="0.4"
					@clicked="handleSplitButtonClick"
					@main-clicked="handleMainButtonClick"
					@menu-item-clicked="handleMenuItemClick"
				/>

				<p style="margin-top: 20px">
					Text before
					<NbButtonSplitDropdown
						nb-id="NbButtonSplitDropdown2"
						display="ib"
						main-button-text="Update"
						:menu-items="splitButtonMenuItems2"
						@clicked="handleSplitButtonClick"
						@main-clicked="handleMainButtonClick"
						@menu-item-clicked="handleMenuItemClick"
					/>
					text after
				</p>

				<h5 style="margin-top: 30px; margin-bottom: 10px">Com Theme Light (padrão):</h5>
				<NbButtonSplitDropdown
					nb-id="NbButtonSplitDropdown3"
					display="b"
					main-button-text="Theme Light"
					:menu-items="splitButtonMenuItems"
					theme="light"
					:border-radius="0.375"
					@clicked="handleSplitButtonClick"
					@main-clicked="handleMainButtonClick"
					@menu-item-clicked="handleMenuItemClick"
				/>

				<h5 style="margin-top: 30px; margin-bottom: 10px">Com Theme Dark:</h5>
				<NbButtonSplitDropdown
					nb-id="NbButtonSplitDropdown4"
					display="b"
					main-button-text="Theme Dark"
					:menu-items="splitButtonMenuItems"
					theme="dark"
					:border-radius="0.375"
					@clicked="handleSplitButtonClick"
					@main-clicked="handleMainButtonClick"
					@menu-item-clicked="handleMenuItemClick"
				/>

				<h5 style="margin-top: 30px; margin-bottom: 10px">Theme Dark com cores customizadas:</h5>
				<NbButtonSplitDropdown
					nb-id="NbButtonSplitDropdown5"
					display="b"
					main-button-text="Dark Custom"
					:menu-items="splitButtonMenuItems"
					theme="dark"
					dark-button-color="#8b5cf6"
					dark-button-color-hover="#7c3aed"
					dark-text-color="#f3f4f6"
					dark-text-color-hover="#ffffff"
					dark-border-color="#a78bfa"
					dark-border-color-hover="#8b5cf6"
					dark-popup-bg-color="#2d2d2d"
					dark-menu-item-hover-color="#3d3d3d"
					dark-menu-item-text-color="#e0e0e0"
					:border-radius="0.5"
					:popup-border-radius="0.5"
					@clicked="handleSplitButtonClick"
					@main-clicked="handleMainButtonClick"
					@menu-item-clicked="handleMenuItemClick"
				/>

				<h5 style="margin-top: 30px; margin-bottom: 10px">Theme Light com TODAS as opções customizadas:</h5>
				<NbButtonSplitDropdown
					nb-id="NbButtonSplitDropdown6"
					display="b"
					main-button-text="Light Custom"
					:menu-items="splitButtonMenuItems"
					theme="light"
					light-button-color="#dbeafe"
					light-button-color-hover="#bfdbfe"
					light-text-color="#1e40af"
					light-text-color-hover="#1e3a8a"
					light-border-color="green"
					light-border-color-hover="tomato"
					light-popup-bg-color="#ffffff"
					light-menu-item-hover-color="#e0e7ff"
					light-menu-item-text-color="#1e40af"
					:border-radius="0.5"
					:popup-border-radius="0.5"
					:padding-x="1.5"
					:padding-y="0.4"
					@clicked="handleSplitButtonClick"
					@main-clicked="handleMainButtonClick"
					@menu-item-clicked="handleMenuItemClick"
				/>
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
const NbButtonBack = defineAsyncComponent(() => import('@components/NbButtonBack.vue'))
const NbButtonTest = defineAsyncComponent(() => import('@components/NbButtonTest.vue'))
const NbButtonNormal = defineAsyncComponent(() => import('@components/NbButtonNormal.vue'))
const NbButtonShadow = defineAsyncComponent(() => import('@components/NbButtonShadow.vue'))
const NbButtonUnderlineExpand = defineAsyncComponent(() => import('@components/NbButtonUnderlineExpand.vue'))
const NbButtonUnderlineFill = defineAsyncComponent(() => import('@components/NbButtonUnderlineFill.vue'))
const NbButtonGradientBorderToBackground = defineAsyncComponent(() => import('@components/NbButtonGradientBorderToBackground.vue'))
const NbButtonSplitDropdown = defineAsyncComponent(() => import('@components/NbButtonSplitDropdown.vue'))

const btType = ref('test')

// SplitButton menu items
const splitButtonMenuItems = [
	{ label: 'Update', disabled: false },
	{ label: 'Delete', disabled: false },
	{ label: 'Quit', disabled: false }
]

const splitButtonMenuItems2 = [
	{ label: 'Save', disabled: false },
	{ label: 'Save As asdasdasa asdasdasds', disabled: false },
	{ label: 'Export', disabled: false },
	{ label: 'Print', disabled: true }
]

// btType
const buttonAction = () => {
	console.log('aqui')
}

const handleSplitButtonClick = (event) => {
	console.log('SplitButton clicked:', event)
}

const handleMainButtonClick = () => {
	console.log('Main button clicked')
}

const handleMenuItemClick = (event) => {
	console.log('Menu item clicked:', event)
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
