<template>
	<div
		v-if="nbId"
		ref="wrapperRef"
		:class="['nb-wrapper', 'nb-split-button', componentDisabled]"
		:style="[wrapperStyle]"
		@focusout="handleWrapperFocusOut"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component', { 'component--block': display === 'b' }, themeStyle]"
			:style="[componentStyle]"
		>
			<!-- Botão Principal -->
			<button
				ref="mainButtonRef"
				:class="['split-button__main', { 'split-button__main--disabled': disabled }]"
				:style="[mainButtonStyle]"
				:disabled="disabled"
				:aria-label="mainButtonAriaLabel"
				:aria-haspopup="!showPopupButton && menuItems.length > 0"
				:aria-expanded="!showPopupButton ? isPopupOpen : undefined"
				:tabindex="disabled ? -1 : 0"
				@click.stop="handleMainButtonClick"
				@keydown.enter.prevent="!disabled && hasTabIndexEnter && handleMainButtonClick()"
				@keydown.space.prevent="!disabled && hasTabIndexSpace && handleMainButtonClick()"
			>
				<slot name="main-content">{{ mainButtonText }}</slot>
			</button>

			<!-- Botão Popup (Dropdown) -->
			<span
				v-if="showPopupButton"
				ref="popupButtonRef"
				:class="['split-button__popup-button', { 'split-button__popup-button--open': isPopupOpen }]"
				:style="[popupButtonStyle]"
				:aria-haspopup="true"
				:aria-expanded="isPopupOpen"
				:title="popupButtonTitle"
				:tabindex="disabled ? -1 : 0"
				@click.stop="togglePopup"
				@focusin="handlePopupFocusIn"
				@focusout="handlePopupFocusOut"
				@keydown.enter.prevent="!disabled && togglePopup()"
				@keydown.space.prevent="!disabled && togglePopup()"
				@keyup.escape="handleEscape"
				@keyup.backspace="handleEscape"
			>
				<slot name="popup-icon">
					<svg
						:class="['split-button__icon', { 'split-button__icon--open': isPopupOpen }]"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</slot>
			</span>

			<!-- Popup com Ações Secundárias -->
			<div
				v-if="isPopupOpen"
				ref="popupRef"
				:class="['split-button__popup', { 'split-button__popup--open': isPopupOpen }]"
				:style="[popupStyle]"
			>
				<button
					v-for="(item, index) in menuItems"
					:key="index"
					:class="['split-button__menu-item', { 'split-button__menu-item--disabled': item.disabled }]"
					:style="[menuItemStyle]"
					:disabled="item.disabled || disabled"
					:tabindex="item.disabled || disabled ? -1 : 0"
					@click.stop="handleMenuItemClick(item, index)"
					@keydown.enter.prevent="!item.disabled && !disabled && handleMenuItemClick(item, index)"
					@keydown.space.prevent="!item.disabled && !disabled && handleMenuItemClick(item, index)"
					@keydown.arrow-up.prevent="handleArrowUp(index)"
					@keydown.arrow-down.prevent="handleArrowDown(index)"
					@keydown.escape.prevent="handleEscape"
					@keydown.backspace.prevent="handleEscape"
				>
					<span v-if="item.icon" class="split-button__menu-item-icon">
						<slot :name="`item-icon-${index}`" :item="item">
							{{ item.icon }}
						</slot>
					</span>
					<span class="split-button__menu-item-text">{{ item.label }}</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, onUnmounted, nextTick } from 'vue'

defineOptions({
	name: 'NbButtonSplitDropdown',
	inheritAttrs: false
})

const emit = defineEmits(['clicked', 'main-clicked', 'menu-item-clicked'])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	display: {
		type: String,
		default: 'ib',
		validator: (value = 'ib') => {
			const currentValue = value ? value.toLowerCase() : ''
			return ['b', 'ib'].includes(currentValue)
		}
	},
	mainButtonText: {
		type: String,
		default: 'Save'
	},
	mainButtonAriaLabel: {
		type: String,
		default: ''
	},
	menuItems: {
		type: Array,
		default: () => [],
		validator: (value) => {
			return Array.isArray(value) && value.every(item => 
				typeof item === 'object' && 
				item !== null && 
				'label' in item
			)
		}
	},
	popupButtonTitle: {
		type: String,
		default: 'Open for more actions'
	},
	tabIndex: {
		type: Number,
		default: 0
	},
	hasTabIndexEnter: {
		type: Boolean,
		default: true
	},
	hasTabIndexSpace: {
		type: Boolean,
		default: true
	},
	ariaLabel: {
		type: String,
		default: 'Split Button'
	},
	ariaAttrs: {
		type: Object,
		default: () => ({})
	},
	menuItemFocusOutlineColor: {
		type: String,
		default: null
	},
	menuItemFocusOutlineWidth: {
		type: String,
		default: '2px'
	},
	menuItemFocusOutlineOffset: {
		type: String,
		default: '-2px'
	},
	showBorder: {
		type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	showPopupButton: {
		type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	borderRadius: {
		type: Number,
		default: 0.375
	},
	popupBorderRadius: {
		type: Number,
		default: null
	},
	width: {
		type: Number,
		default: null
	},
	paddingX: {
		type: Number,
		default: 1
	},
	paddingY: {
		type: Number,
		default: 0.2
	},
	popupPaddingX: {
		type: Number,
		default: null
	},
	popupPaddingY: {
		type: Number,
		default: null
	},
	disabled: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	fontFamily: {
		type: String,
		default: `'Lato', sans-serif`
	},
	fontSize: {
		type: String,
		default: '1.6em',
		validator: value => {
			return !value ? '1.6em' : value
		}
	},
	fontWeight: {
		type: Number,
		default: 400,
		validator: value => {
			return !value ? 400 : value
		}
	},
	popupFontFamily: {
		type: String,
		default: null
	},
	popupFontSize: {
		type: String,
		default: null
	},
	popupFontWeight: {
		type: Number,
		default: null
	},
	theme: {
		type: String,
		default: 'light',
		validator: value => {
			return ['dark', 'light'].indexOf(value) !== -1
		}
	},
	// Cores do tema light
	lightButtonColor: {
		type: String,
		default: '#f5f5f5'
	},
	lightButtonColorHover: {
		type: String,
		default: '#e0e0e0'
	},
	lightTextColor: {
		type: String,
		default: '#333333'
	},
	lightTextColorHover: {
		type: String,
		default: '#000000'
	},
	lightBorderColor: {
		type: String,
		default: '#cccccc'
	},
	lightBorderColorHover: {
		type: String,
		default: '#bbbbbb'
	},
	lightPopupBgColor: {
		type: String,
		default: '#ffffff'
	},
	lightMenuItemHoverColor: {
		type: String,
		default: '#f5f5f5'
	},
	lightMenuItemTextColor: {
		type: String,
		default: '#333333'
	},
	lightDisabledBgColor: {
		type: String,
		default: '#dfdfd9'
	},
	// Cores do tema dark
	darkButtonColor: {
		type: String,
		default: '#2d2d2d'
	},
	darkButtonColorHover: {
		type: String,
		default: '#3d3d3d'
	},
	darkTextColor: {
		type: String,
		default: '#e0e0e0'
	},
	darkTextColorHover: {
		type: String,
		default: '#ffffff'
	},
	darkBorderColor: {
		type: String,
		default: '#555555'
	},
	darkBorderColorHover: {
		type: String,
		default: '#666666'
	},
	darkPopupBgColor: {
		type: String,
		default: '#2d2d2d'
	},
	darkMenuItemHoverColor: {
		type: String,
		default: '#3d3d3d'
	},
	darkMenuItemTextColor: {
		type: String,
		default: '#e0e0e0'
	},
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
	}
})

const {
	display,
	mainButtonText,
	mainButtonAriaLabel,
	menuItems,
	popupButtonTitle,
	ariaLabel,
	ariaAttrs,
	menuItemFocusOutlineColor,
	menuItemFocusOutlineWidth,
	menuItemFocusOutlineOffset,
	showBorder,
	showPopupButton,
	borderRadius,
	popupBorderRadius,
	width,
	paddingX,
	paddingY,
	popupPaddingX,
	popupPaddingY,
	disabled,
	fontFamily,
	fontSize,
	fontWeight,
	popupFontFamily,
	popupFontSize,
	popupFontWeight,
	theme,
	lightButtonColor,
	lightButtonColorHover,
	lightTextColor,
	lightTextColorHover,
	lightBorderColor,
	lightBorderColorHover,
	lightPopupBgColor,
	lightMenuItemHoverColor,
	lightMenuItemTextColor,
	lightDisabledBgColor,
	darkButtonColor,
	darkButtonColorHover,
	darkTextColor,
	darkTextColorHover,
	darkBorderColor,
	darkBorderColorHover,
	darkPopupBgColor,
	darkMenuItemHoverColor,
	darkMenuItemTextColor,
	darkDisabledBgColor
} = toRefs(props)

const isPopupOpen = ref(false)
const wrapperRef = ref(null)
const mainButtonRef = ref(null)
const popupButtonRef = ref(null)
const popupRef = ref(null)
const currentFocusedIndex = ref(-1)
const isToggling = ref(false)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value
	const popupBorderRadiusValue = popupBorderRadius.value !== null && popupBorderRadius.value !== undefined 
		? (popupBorderRadius.value < 0 ? 0 : popupBorderRadius.value)
		: borderRadiusValue
	const showBorderValue = ![false, true].includes(showBorder.value) ? true : showBorder.value
	const showPopupButtonValue = ![false, true].includes(showPopupButton.value) ? true : showPopupButton.value
	const menuItemFocusOutlineColorValue = menuItemFocusOutlineColor.value || 'currentColor'
	const menuItemFocusOutlineWidthValue = menuItemFocusOutlineWidth.value || '2px'
	const menuItemFocusOutlineOffsetValue = menuItemFocusOutlineOffset.value || '-2px'
	const paddingXValue = ((paddingX.value !== 0 && !paddingX.value) || paddingX.value < 0) ? 1 : paddingX.value
	const paddingYValue = ((paddingY.value !== 0 && !paddingY.value) || paddingY.value < 0) ? 0.32 : paddingY.value
	const popupPaddingXValue = popupPaddingX.value !== null && popupPaddingX.value !== undefined
		? (popupPaddingX.value < 0 ? 1 : popupPaddingX.value)
		: paddingXValue
	const popupPaddingYValue = popupPaddingY.value !== null && popupPaddingY.value !== undefined
		? (popupPaddingY.value < 0 ? 0.2 : popupPaddingY.value)
		: paddingYValue
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = ((fontWeight.value !== 0 && !fontWeight.value) || fontWeight.value < 0) ? 400 : fontWeight.value
	const popupFontValue = popupFontFamily.value || fontValue
	const popupFontSizeValue = popupFontSize.value || fontSizeValue
	const popupFontWeightValue = popupFontWeight.value !== null && popupFontWeight.value !== undefined
		? (popupFontWeight.value < 0 ? 400 : popupFontWeight.value)
		: fontWeightValue
	const themeValue = !theme.value ? 'light' : theme.value

	return {
		disabled: disabledValue,
		display: displayValue,
		showBorder: showBorderValue,
		showPopupButton: showPopupButtonValue,
		borderRadius: borderRadiusValue,
		popupBorderRadius: popupBorderRadiusValue,
		menuItemFocusOutlineColor: menuItemFocusOutlineColorValue,
		menuItemFocusOutlineWidth: menuItemFocusOutlineWidthValue,
		menuItemFocusOutlineOffset: menuItemFocusOutlineOffsetValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
		popupPaddingX: popupPaddingXValue,
		popupPaddingY: popupPaddingYValue,
		font: fontValue,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue,
		popupFont: popupFontValue,
		popupFontSize: popupFontSizeValue,
		popupFontWeight: popupFontWeightValue,
		theme: themeValue
	}
})

const themeStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	switch (defaultValues.theme) {
		case 'dark':
			return 'component__theme--dark'
		default:
			return 'component__theme--light'
	}
})

const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.disabled
})

const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	return {
		display: defaultValues.display
	}
})

const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	const widthStyle = defaultValues.display === 'block' 
		? {} 
		: { width: width.value ? `${width.value}px` : 'auto' }

	return {
		borderRadius: `${defaultValues.borderRadius}rem`,
		overflow: 'visible',
		position: 'relative',
		...widthStyle
	}
})

const mainButtonStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	const widthValue = width.value ? `${width.value}px` : 'auto'

	// Se não mostrar o botão popup, o botão principal deve ter border-radius completo
	const borderRadiusStyle = defaultValues.showPopupButton
		? {
			borderTopLeftRadius: `${defaultValues.borderRadius}rem`,
			borderBottomLeftRadius: `${defaultValues.borderRadius}rem`,
			borderTopRightRadius: '0',
			borderBottomRightRadius: '0'
		}
		: {
			borderRadius: `${defaultValues.borderRadius}rem`
		}

	const borderStyle = defaultValues.showBorder
		? defaultValues.showPopupButton
			? {
				borderTop: `1px solid ${defaultValues.theme === 'dark' ? darkBorderColor.value : lightBorderColor.value}`,
				borderBottom: `1px solid ${defaultValues.theme === 'dark' ? darkBorderColor.value : lightBorderColor.value}`,
				borderLeft: `1px solid ${defaultValues.theme === 'dark' ? darkBorderColor.value : lightBorderColor.value}`,
				borderRight: 'none'
			}
			: {
				border: `1px solid ${defaultValues.theme === 'dark' ? darkBorderColor.value : lightBorderColor.value}`
			}
		: { border: 'none' }

	const buttonColorValue = defaultValues.theme === 'dark' ? darkButtonColor.value : lightButtonColor.value
	const textColorValue = defaultValues.theme === 'dark' ? darkTextColor.value : lightTextColor.value
	const buttonHoverColorValue = defaultValues.theme === 'dark' ? darkButtonColorHover.value : lightButtonColorHover.value
	const textHoverColorValue = defaultValues.theme === 'dark' ? darkTextColorHover.value : lightTextColorHover.value
	const borderHoverColorValue = defaultValues.theme === 'dark' ? darkBorderColorHover.value : lightBorderColorHover.value

	return {
		color: textColorValue,
		backgroundColor: buttonColorValue,
		padding: `${defaultValues.paddingY}rem ${defaultValues.paddingX}rem`,
		lineHeight: '1.42857143',
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight,
		fontFamily: defaultValues.font,
		...borderStyle,
		...borderRadiusStyle,
		minWidth: widthValue === 'auto' ? '33px' : widthValue,
		'--main-button-hover-color': buttonHoverColorValue,
		'--main-button-active-color': buttonHoverColorValue,
		'--main-text-hover-color': textHoverColorValue,
		'--main-border-hover-color': borderHoverColorValue
	}
})

const popupButtonStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	const borderColorValue = defaultValues.theme === 'dark' ? darkBorderColor.value : lightBorderColor.value
	const borderStyle = defaultValues.showBorder
		? {
			borderTop: `1px solid ${borderColorValue}`,
			borderBottom: `1px solid ${borderColorValue}`,
			borderRight: `1px solid ${borderColorValue}`,
			borderLeft: `1px solid ${borderColorValue}`
		}
		: { border: 'none' }

	const buttonColorValue = defaultValues.theme === 'dark' ? darkButtonColor.value : lightButtonColor.value
	const textColorValue = defaultValues.theme === 'dark' ? darkTextColor.value : lightTextColor.value
	const buttonHoverColorValue = defaultValues.theme === 'dark' ? darkButtonColorHover.value : lightButtonColorHover.value
	const textHoverColorValue = defaultValues.theme === 'dark' ? darkTextColorHover.value : lightTextColorHover.value
	const borderHoverColorValue = defaultValues.theme === 'dark' ? darkBorderColorHover.value : lightBorderColorHover.value

	return {
		color: textColorValue,
		backgroundColor: buttonColorValue,
		padding: `${defaultValues.paddingY}rem ${defaultValues.paddingX * 0.5}rem`,
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight,
		fontFamily: defaultValues.font,
		...borderStyle,
		borderTopRightRadius: `${defaultValues.borderRadius}rem`,
		borderBottomRightRadius: `${defaultValues.borderRadius}rem`,
		borderTopLeftRadius: '0',
		borderBottomLeftRadius: '0',
		'--popup-button-hover-color': buttonHoverColorValue,
		'--popup-button-active-color': buttonHoverColorValue,
		'--popup-text-hover-color': textHoverColorValue,
		'--popup-border-hover-color': borderHoverColorValue
	}
})

const popupStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	const popupBgColorValue = defaultValues.theme === 'dark' ? darkPopupBgColor.value : lightPopupBgColor.value
	const menuItemTextColorValue = defaultValues.theme === 'dark' ? darkMenuItemTextColor.value : lightMenuItemTextColor.value
	const menuItemHoverColorValue = defaultValues.theme === 'dark' ? darkMenuItemHoverColor.value : lightMenuItemHoverColor.value

	return {
		backgroundColor: popupBgColorValue,
		color: menuItemTextColorValue,
		borderRadius: `${defaultValues.popupBorderRadius}rem`,
		boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
		minHeight: menuItems.value.length === 0 ? '40px' : 'auto',
		'--menu-item-hover-color': menuItemHoverColorValue,
		'--menu-item-focus-outline-color': defaultValues.menuItemFocusOutlineColor,
		'--menu-item-focus-outline-width': defaultValues.menuItemFocusOutlineWidth,
		'--menu-item-focus-outline-offset': defaultValues.menuItemFocusOutlineOffset
	}
})

const stylePopupFont = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.popupFont
})

const stylePopupFontSize = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.popupFontSize
})

const stylePopupFontWeight = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.popupFontWeight
})

const stylePopupPaddingX = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.popupPaddingX
})

const stylePopupPaddingY = computed(() => {
	const defaultValues = formatDefaultValues.value
	return defaultValues.popupPaddingY
})

const menuItemStyle = computed(() => {
	return {
		fontSize: stylePopupFontSize.value,
		fontWeight: stylePopupFontWeight.value,
		fontFamily: stylePopupFont.value,
		padding: `${stylePopupPaddingY.value}rem ${stylePopupPaddingX.value}rem`
	}
})

const computedAriaAttrs = computed(() => {
	const newAttrs = {}

	if (ariaAttrs.value) {
		const attrKeys = Object.keys(ariaAttrs.value)
		attrKeys.forEach(key => newAttrs[`aria-${key}`] = ariaAttrs.value[key])
	}

	const attrs = {
		'aria-label': ariaLabel.value,
		'aria-disabled': disabled.value,
		...newAttrs
	}

	return Object.fromEntries(
		Object.entries(attrs).filter(([_, value]) => value !== undefined && value !== null)
	)
})

const closeAllOtherPopups = () => {
	// Disparar evento para fechar todos os outros popups
	document.dispatchEvent(new CustomEvent('splitbutton:close-all', { 
		detail: { excludeId: props.nbId } 
	}))
}

const handleCloseAllPopups = (event) => {
	// Fechar este popup se não for o excluído
	if (event.detail?.excludeId !== props.nbId && isPopupOpen.value) {
		isPopupOpen.value = false
		currentFocusedIndex.value = -1
		if (popupButtonRef.value) {
			popupButtonRef.value.setAttribute('aria-expanded', 'false')
		}
	}
}

const togglePopup = () => {
	if (disabled.value) return
	
	// Fechar todos os outros popups antes de abrir este
	if (!isPopupOpen.value) {
		closeAllOtherPopups()
	}
	
	isToggling.value = true
	isPopupOpen.value = !isPopupOpen.value
	
	if (isPopupOpen.value) {
		nextTick(() => {
			// Focar no primeiro item do menu quando abrir (apenas se foi aberto via botão)
			if (popupRef.value) {
				const buttons = popupRef.value.querySelectorAll('button:not([disabled])')
				if (buttons && buttons.length > 0) {
					// Focar no primeiro item apenas se o foco veio do botão popup
					// Isso permite que o Tab funcione naturalmente
					const activeElement = document.activeElement
					if (activeElement === popupButtonRef.value || activeElement === mainButtonRef.value) {
						buttons[0].focus()
					}
					currentFocusedIndex.value = 0
				}
			}
			// Permitir que cliques fora funcionem após o próximo tick
			setTimeout(() => {
				isToggling.value = false
			}, 10)
		})
	} else {
		currentFocusedIndex.value = -1
		isToggling.value = false
	}
}

const handleMainButtonClick = () => {
	if (disabled.value) return
	
	// Se não mostrar o botão popup e houver itens no menu, abrir o dropdown
	if (!showPopupButton.value && menuItems.value.length > 0) {
		togglePopup()
		return
	}
	
	emit('main-clicked')
	emit('clicked', { type: 'main' })
}

const handleMenuItemClick = (item, index) => {
	if (item.disabled || disabled.value) return
	emit('menu-item-clicked', { item, index })
	emit('clicked', { type: 'menu-item', item, index })
	isPopupOpen.value = false
	currentFocusedIndex.value = -1
}


const handlePopupFocusIn = () => {
	if (popupButtonRef.value) {
		popupButtonRef.value.setAttribute('aria-expanded', 'true')
	}
}

const handlePopupFocusOut = (event) => {
	// Só fechar se o foco não estiver indo para dentro do popup ou do componente
	if (popupRef.value && !popupRef.value.contains(event.relatedTarget) && 
			!wrapperRef.value?.contains(event.relatedTarget)) {
		if (popupButtonRef.value) {
			popupButtonRef.value.setAttribute('aria-expanded', 'false')
		}
		isPopupOpen.value = false
		currentFocusedIndex.value = -1
	}
}

const handleWrapperFocusOut = (event) => {
	// Fechar popup quando o foco sair completamente do componente
	if (isPopupOpen.value && !wrapperRef.value?.contains(event.relatedTarget)) {
		isPopupOpen.value = false
		currentFocusedIndex.value = -1
		if (popupButtonRef.value) {
			popupButtonRef.value.setAttribute('aria-expanded', 'false')
		}
	}
}

const handleEscape = (event) => {
	if ((event.code === 'Escape' || event.code === 'Backspace') && isPopupOpen.value) {
		isPopupOpen.value = false
		currentFocusedIndex.value = -1
		// Se não mostrar o botão popup, focar no botão principal
		if (!showPopupButton.value && mainButtonRef.value) {
			mainButtonRef.value.focus()
		} else if (popupButtonRef.value) {
			popupButtonRef.value.focus()
		}
	}
}

const handleArrowUp = (index) => {
	if (index > 0) {
		currentFocusedIndex.value = index - 1
		nextTick(() => {
			const buttons = popupRef.value?.querySelectorAll('button:not([disabled])')
			if (buttons && buttons[currentFocusedIndex.value]) {
				buttons[currentFocusedIndex.value].focus()
			}
		})
	}
}

const handleArrowDown = (index) => {
	const buttons = popupRef.value?.querySelectorAll('button:not([disabled])')
	if (buttons && index < buttons.length - 1) {
		currentFocusedIndex.value = index + 1
		nextTick(() => {
			if (buttons[currentFocusedIndex.value]) {
				buttons[currentFocusedIndex.value].focus()
			}
		})
	}
}

const handleClickOutside = (event) => {
	// Não fechar se estiver no processo de toggle
	if (isToggling.value) return
	
	// Não fechar se o popup não estiver aberto
	if (!isPopupOpen.value) return
	
	// Não fechar se o clique foi dentro do componente (botão principal, botão popup ou popup)
	if (wrapperRef.value?.contains(event.target)) {
		return
	}
	
	// Verificar se o clique foi em outro SplitButton
	const clickedElement = event.target
	const clickedSplitButton = clickedElement.closest?.('.nb-split-button')
	
	// Se clicou em outro SplitButton ou fora de qualquer SplitButton, fechar este popup
	if (clickedSplitButton !== wrapperRef.value) {
		isPopupOpen.value = false
		currentFocusedIndex.value = -1
		if (popupButtonRef.value) {
			popupButtonRef.value.setAttribute('aria-expanded', 'false')
		}
	}
}

onMounted(() => {
	// Usar nextTick para garantir que os refs estejam disponíveis
	nextTick(() => {
		// Usar bubble phase (false) para executar após os handlers internos
		document.addEventListener('click', handleClickOutside, false)
		// Escutar evento para fechar todos os popups
		document.addEventListener('splitbutton:close-all', handleCloseAllPopups)
	})
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside, false)
	document.removeEventListener('splitbutton:close-all', handleCloseAllPopups)
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

.nb-wrapper {
	margin: 0;
	padding: 0;
	font-size: 62.5%;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	vertical-align: bottom;
  margin-bottom: 4px;
}

.nb-split-button {
	position: relative;
	display: inline-flex;
	overflow: visible;
}

.nb-reset {
	font-family: 'Lato', sans-serif;
	font-style: normal;
	font-weight: light;
	line-height: 1.42857143;

	* {
		margin: 0;
		padding: 0;
	}

	*,
	*::before,
	*::after {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
}

.component {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	line-height: 1.42857143;
	font-family: v-bind('formatDefaultValues.font');
	user-select: none;
	touch-action: manipulation;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	display: inline-flex;
	align-items: stretch;
	overflow: visible;

	&--block {
		display: flex;
		width: 100%;
	}
}

.split-button__main {
	cursor: pointer;
	text-align: center;
	white-space: nowrap;
	transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
	outline: none;
	flex-grow: 1;
	flex-shrink: 1;
	flex-basis: 0;

	&:hover:not(:disabled) {
		background-color: var(--main-button-hover-color) !important;
		color: var(--main-text-hover-color) !important;
		border-color: var(--main-border-hover-color) !important;
	}

	&:active:not(:disabled) {
		background-color: var(--main-button-active-color) !important;
	}

	&:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}

	&--disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}
}

.split-button__popup-button {
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	position: relative;
	transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
	outline: none;

	&:hover:not([tabindex="-1"]) {
		background-color: var(--popup-button-hover-color) !important;
		color: var(--popup-text-hover-color) !important;
		border-color: var(--popup-border-hover-color) !important;
	}

	&:active:not([tabindex="-1"]) {
		background-color: var(--popup-button-active-color) !important;
	}

	&:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}

	&--open {
		background-color: var(--popup-button-active-color) !important;
	}
}

.split-button__icon {
	inline-size: 2ch;
	box-sizing: content-box;
	stroke-linecap: round;
	stroke-linejoin: round;
	stroke-width: 2px;
	pointer-events: none;
	transition: transform 0.15s ease;

	&--open {
		transform: rotate(180deg);
	}
}

.split-button__popup {
	position: absolute;
	top: 100%;
	left: 0;
	margin-top: 0.25rem;
	min-width: 100%;
	z-index: 1000;
	display: flex;
	flex-direction: column;
	overflow: visible;
	animation: popup-in 0.15s ease-out;
	overflow: hidden;
	min-height: 40px;
}

@keyframes popup-in {
	from {
		opacity: 0;
		transform: translateY(-4px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.split-button__menu-item {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;
	text-align: left;
	white-space: nowrap;
	border: none;
	background: transparent;
	color: inherit;
	transition: background-color 0.15s ease;
	outline: none;
	width: 100%;

	// inicio propTheme menu item
	.component__theme--dark & {
		color: v-bind('darkMenuItemTextColor');
	}

	.component__theme--light & {
		color: v-bind('lightMenuItemTextColor');
	}
	// fim propTheme menu item

	&:hover:not(:disabled) {
		background-color: var(--menu-item-hover-color) !important;
	}

	&:focus-visible {
		outline: var(--menu-item-focus-outline-width, 2px) solid var(--menu-item-focus-outline-color, currentColor);
		outline-offset: var(--menu-item-focus-outline-offset, -2px);
	}

	&--disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
}

.split-button__menu-item-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.split-button__menu-item-text {
	flex: 1;
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	.component {
		opacity: 0.7;

		// inicio propTheme disabled
		&.component__theme--dark {
			.split-button__main {
				color: v-bind('darkTextColor');
				background-color: v-bind('darkDisabledBgColor');
			}

			.split-button__popup-button {
				color: v-bind('darkTextColor');
				background-color: v-bind('darkDisabledBgColor');
			}
		}

		&.component__theme--light {
			.split-button__main {
				color: v-bind('lightTextColor');
				background-color: v-bind('lightDisabledBgColor');
			}

			.split-button__popup-button {
				color: v-bind('lightTextColor');
				background-color: v-bind('lightDisabledBgColor');
			}
		}
		// fim propTheme disabled
	}
}
</style>
