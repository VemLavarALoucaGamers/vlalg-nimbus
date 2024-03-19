<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
		@click="interacted"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component', openedClass]"
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
	status: {
		type: Boolean,
		default: false,
		validator: value => {
			return [false, true].includes(value)
		}
	},
	color: {
		type: String,
		default: '#ffffff'
	},
	colorHover: {
		type: String,
		default: 'yellow'
	},
	containerColor: {
		type: String,
		default: '#333333'
	},
	containerColorHover: {
		type: String,
		default: 'red'
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
	status,
	color,
	containerColor,
	containerColorHover,
	colorHover,
	paddingX,
	paddingY,
	disabled
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const buttonStatusValue = buttonStatus.value ? 'change' : ''
	const containerColorValue = !containerColor.value ? '#333333' : containerColor.value
	const colorValue = !color.value ? '#ffffff' : color.value
	const paddingXValue = !paddingX.value || paddingX.value < 0 ? 3 : paddingX.value
	const paddingYValue = !paddingY.value || paddingY.value < 0 ? 3 : paddingY.value
	const containerColorHoverValue = !containerColorHover.value ? 'yellow' : containerColorHover.value
	const colorHoverValue = !colorHover.value ? 'red' : colorHover.value

	return {
		disabled: disabledValue,
		buttonStatus: buttonStatusValue,
		containerColor: containerColorValue,
		paddingX: paddingXValue,
		paddingY: paddingYValue,
		color: colorValue,
		containerColorHover: containerColorHoverValue,
		colorHover: colorHoverValue
	}
})
const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabled
})
const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		padding: `${defaultValues.paddingY}px ${defaultValues.paddingX}px`,
		backgroundColor: defaultValues.containerColor
	}
})
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		backgroundColor: defaultValues.color
	}
})
const openedClass = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.buttonStatus
})
const styleContainerColorHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.containerColorHover
})
const styleColorHover = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.colorHover
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
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

.nb-wrapper {
	margin: 0;
	padding: 0;
	font-size: 62.5%;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	vertical-align: bottom;
	display: inline-block;

	&:hover {
		background-color: v-bind('styleContainerColorHover') !important;

		.component {
			.component__line-one,
			.component__line-two,
			.component__line-three {
				background-color: v-bind('styleColorHover') !important;
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

		/*
    */
		&:not(:last-child) {
			margin-bottom: 4px;
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

	background-color: #ffffff;

	.component {
		opacity: 0.5;
	}
}
</style>
