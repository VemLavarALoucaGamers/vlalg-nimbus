<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
    :tabIndex="tabIndex"
    role="button"
    v-bind="computedAriaAttrs"
    @click="interacted"
    @keydown.enter.prevent="!disabled && hasTabIndexEnter && interacted()"
    @keydown.space.prevent="!disabled && hasTabIndexSpace && interacted()"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component', openedClass, themeStyle]"
		>
			<div
				class="component__line-one"
				:style="componentStyle"
			></div>
			<div
				class="component__line-two"
				:style="componentStyle"
			></div>
			<div
				class="component__line-three"
				:style="componentStyle"
			></div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, toRefs, computed, ref, watch, onMounted } from 'vue'

defineOptions({
	name: 'NbButtonHamburger',
	inheritAttrs: false
})

const emit = defineEmits(['clicked'])

const props = defineProps({
	nbId: {
		type: String,
		required: true
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
    default: 'Alternate Text Button'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
	theme: {
		type: String,
		default: 'light',
		validator: (value) => {
			const currentValue = value ? value.toLowerCase() : ''
			return ['light', 'dark'].includes(currentValue)
		}
	},
	status: {
		type: Boolean,
		default: false,
		validator: value => {
			return [false, true].includes(value)
		}
	},
	// Cores do tema light
	lightColor: {
		type: String,
		default: '#333333'
	},
	lightColorHover: {
		type: String,
		default: '#000000'
	},
	lightContainerColor: {
		type: String,
		default: '#f5f5f5'
	},
	lightContainerColorHover: {
		type: String,
		default: '#e0e0e0'
	},
	lightDisabledBgColor: {
		type: String,
		default: '#dfdfd9'
	},
	// Cores do tema dark
	darkColor: {
		type: String,
		default: '#e0e0e0'
	},
	darkColorHover: {
		type: String,
		default: '#ffffff'
	},
	darkContainerColor: {
		type: String,
		default: '#2d2d2d'
	},
	darkContainerColorHover: {
		type: String,
		default: '#3d3d3d'
	},
	darkDisabledBgColor: {
		type: String,
		default: 'rgba(40, 42, 54, 1)'
	},
	paddingX: {
		type: Number,
		default: 3,
		validator: value => {
			return !value ? 3 : value
		}
	},
	paddingY: {
		type: Number,
		default: 3,
		validator: value => {
			return !value ? 3 : value
		}
	},
	disabled: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	}
})

onMounted(() => {
	buttonStatus.value = status.value
})

const buttonStatus = ref(false)
const {
  ariaLabel,
  ariaAttrs,
	theme,
	status,
	lightColor,
	lightColorHover,
	lightContainerColor,
	lightContainerColorHover,
	lightDisabledBgColor,
	darkColor,
	darkColorHover,
	darkContainerColor,
	darkContainerColorHover,
	darkDisabledBgColor,
	paddingX,
	paddingY,
	disabled
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const buttonStatusValue = buttonStatus.value ? 'change' : ''
	const paddingXValue = !paddingX.value || paddingX.value < 0 ? 3 : paddingX.value
	const paddingYValue = !paddingY.value || paddingY.value < 0 ? 3 : paddingY.value

	return {
		disabled: disabledValue,
		buttonStatus: buttonStatusValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue
	}
})
const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabled
})
const themeStyle = computed(() => {
	return theme.value === 'dark' ? 'component__theme--dark' : 'component__theme--light'
})

const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		padding: `${defaultValues.paddingY}px ${defaultValues.paddingX}px`
	}
})
const componentStyle = computed(() => {
	return {}
})
const openedClass = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.buttonStatus
})

// Computed properties para as cores do theme (necessárias para v-bind no CSS)
const styleLightColor = computed(() => lightColor.value)
const styleLightColorHover = computed(() => lightColorHover.value)
const styleLightContainerColor = computed(() => lightContainerColor.value)
const styleLightContainerColorHover = computed(() => lightContainerColorHover.value)
const styleLightDisabledBgColor = computed(() => lightDisabledBgColor.value)
const styleDarkColor = computed(() => darkColor.value)
const styleDarkColorHover = computed(() => darkColorHover.value)
const styleDarkContainerColor = computed(() => darkContainerColor.value)
const styleDarkContainerColorHover = computed(() => darkContainerColorHover.value)
const styleDarkDisabledBgColor = computed(() => darkDisabledBgColor.value)
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
  
  // Remove atributos undefined/null
  return Object.fromEntries(
    Object.entries(attrs).filter(([_, value]) => value !== undefined && value !== null)
  )
})

const interacted = () => {
	const status = !buttonStatus.value

	buttonStatus.value = status

	emit('clicked', status)
}

watch(status, () => {
	buttonStatus.value = status.value
})
</script>

<style lang="scss" scoped>
.nb-wrapper {
	margin: 0;
	padding: 0;
	font-size: 62.5%;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	vertical-align: bottom;
	display: inline-block;

	// Theme light
	&:has(.component__theme--light) {
		background-color: v-bind('styleLightContainerColor');
	}

	// Theme dark
	&:has(.component__theme--dark) {
		background-color: v-bind('styleDarkContainerColor');
	}

	&:hover {
		&:has(.component__theme--light) {
			background-color: v-bind('styleLightContainerColorHover') !important;

			.component {
				.component__line-one,
				.component__line-two,
				.component__line-three {
					background-color: v-bind('styleLightColorHover') !important;
				}
			}
		}

		&:has(.component__theme--dark) {
			background-color: v-bind('styleDarkContainerColorHover') !important;

			.component {
				.component__line-one,
				.component__line-two,
				.component__line-three {
					background-color: v-bind('styleDarkColorHover') !important;
				}
			}
		}
	}
}

.nb-reset {
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
	cursor: pointer;

	user-select: none;

	touch-action: manipulation;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	.component__line-one,
	.component__line-two,
	.component__line-three {
		width: 30px;
		height: 5px;
		transition: 0.4s;

		&:not(:last-child) {
			margin-bottom: 4px;
		}
	}

	// Theme light
	&.component__theme--light {
		.component__line-one,
		.component__line-two,
		.component__line-three {
			background-color: v-bind('styleLightColor');
		}
	}

	// Theme dark
	&.component__theme--dark {
		.component__line-one,
		.component__line-two,
		.component__line-three {
			background-color: v-bind('styleDarkColor');
		}
	}

	&.change {
		// Rotate first bar
		.component__line-one {
			transform: translate(0, 9px) rotate(-45deg);
		}

		// Fade out the second bar
		.component__line-two {
			opacity: 0;
		}

		// Rotate last bar
		.component__line-three {
			transform: translate(0, -9px) rotate(45deg);
		}
	}
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;

	.component {
		opacity: 0.5;

		&.component__theme--light {
			background-color: v-bind('styleLightDisabledBgColor') !important;
		}

		&.component__theme--dark {
			background-color: v-bind('styleDarkDisabledBgColor') !important;
		}
	}
}
</style>
