<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper', componentDisabled]"
		:style="[wrapperStyle]"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component']"
			:style="componentStyle"
		>
			<div
				v-if="showPreview"
				@click="interacted('preview')"
				:class="['buttonNextPreview buttonPreview', previewDisabled]"
				:style="previewStyle"
			>
				<slot name="prev">← Preview</slot>
			</div>

			<div
				v-if="showNext"
				@click="interacted('next')"
				:class="['buttonNextPreview buttonNext', nextDisabled]"
				:style="nextStyle"
			>
				<slot name="next">Next →</slot>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, toRefs, computed, ref } from 'vue'

defineOptions({
	name: 'NbButtonPrevNext',
	inheritAttrs: false
})

const emit = defineEmits(['clicked'])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	colorPrimary: {
		type: String,
		default: 'tomato'
	},
	colorSecondary: {
		type: String,
		default: 'blue'
	},
	textColor: {
		type: String,
		default: '#fff'
	},
	textColorHover: {
		type: String,
		default: 'yellow'
	},
	paddingX: {
		type: Number,
		default: 1,
		validator: value => {
			return !value ? 1 : value
		}
	},
	paddingY: {
		type: Number,
		default: 10,
		validator: value => {
			return !value ? 10 : value
		}
	},
	marginBetween: {
		type: Number,
		default: 2,
		validator: value => {
			return !value ? 1 : value
		}
	},
	borderRadius: {
		type: Number,
		default: 6,
		validator: value => {
			return !value ? 1 : value
		}
	},
	disabled: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	showPreview: {
		type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	showNext: {
		type: Boolean,
		default: true,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	disabledPreview: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
	disabledNext: {
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
	}
})

const {
	paddingX,
	paddingY,
	marginBetween,
	borderRadius,
	disabled,
	disabledPreview,
	disabledNext,
	fontFamily,
	fontSize,
	fontWeight
} = toRefs(props)

const formatDefaultValues = computed(() => {
	const disabledValue = disabled.value ? 'component-disabled' : ''
	const disabledPreviewValue = disabledPreview.value ? 'component-disabled' : ''
	const disabledNextValue = disabledNext.value ? 'component-disabled' : ''
	const marginBetweenValue =
		!marginBetween.value || marginBetween.value < 0 ? 0 : marginBetween.value
	const borderRadiusValue = !borderRadius.value || borderRadius.value < 0 ? 0 : borderRadius.value
	const paddingXValue = !paddingX.value || paddingX.value < 0 ? 1 : paddingX.value
	const paddingYValue = !paddingY.value || paddingY.value < 0 ? 10 : paddingY.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 100 : fontWeight.value

	return {
		disabled: disabledValue,
		disabledPreview: disabledPreviewValue,
		disabledNext: disabledNextValue,
		marginBetween: `${marginBetweenValue}px`,
		borderRadius: `${borderRadiusValue}px`,
		paddingX: `${paddingXValue}px`,
		paddingY: `${paddingYValue}px`,
		fontSize: fontSizeValue,
		fontWeight: fontWeightValue
	}
})
const componentDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabled
})
const previewDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabledPreview
})
const nextDisabled = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.disabledNext
})
const wrapperStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		display: defaultValues.display
	}
})
const componentStyle = computed(() => {
	const defaultValues = formatDefaultValues.value

	return {
		fontSize: defaultValues.fontSize,
		fontWeight: defaultValues.fontWeight
	}
})
const previewStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	return {
		borderRadius: `${defaultValues.borderRadius} 0px 0px ${defaultValues.borderRadius}`,
		marginRight: defaultValues.marginBetween,
		padding: `${defaultValues.paddingX} ${defaultValues.paddingY}`
	}
})
const nextStyle = computed(() => {
	const defaultValues = formatDefaultValues.value
	return {
		borderRadius: `0px ${defaultValues.borderRadius} ${defaultValues.borderRadius} 0px`,
		marginLeft: defaultValues.marginBetween,
		padding: `${defaultValues.paddingX} ${defaultValues.paddingY}`
	}
})
const font = computed(() => {
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	return `'${fontValue}'`
})

const interacted = clickType => {
	emit('clicked', clickType)
}
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
	font-family: v-bind('font');

	user-select: none;

	touch-action: manipulation;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	.buttonNextPreview {
		display: inline-block;
		text-align: center;
		transition: all 0.3s;

		&:hover {
			cursor: pointer;
		}
	}

	.buttonPreview {
		background-color: v-bind('colorPrimary');
		color: v-bind('textColor');

		&:hover {
			background-color: v-bind('colorSecondary');
			color: v-bind('textColorHover');
		}
	}

	.buttonNext {
		color: v-bind('textColor');
		background-color: v-bind('colorSecondary');

		&:hover {
			background-color: v-bind('colorPrimary');
			color: v-bind('textColorHover');
		}
	}
}

.component-disabled {
	cursor: not-allowed;
	pointer-events: none;
	user-select: none;
	opacity: 0.8;

	&:hover {
		cursor: not-allowed;
	}
}
</style>
