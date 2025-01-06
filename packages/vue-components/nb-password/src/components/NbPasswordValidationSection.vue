<template>
	<div
		v-if="nbId"
		:class="['nb-wrapper']"
		:style="[wrapperStyle]"
	>
		<div
			:id="nbId"
			:class="['nb-reset', 'component']"
			:style="[componentStyle]"
		>
      <p
        v-if="hasLabel"
        class="component__validation-label"
      >
        {{ label }}
      </p>

      <div class="component__validation-rules">
        <div
          v-for="(rule, index) in passwordValidation"
          :key="index"
          class="component__validation-rule"
        >
          <p class="component__rule-title">
            {{ rule.title }}
          </p>
          <p v-if="hasDescriptions" class="component__rule-description">
            {{ rule.description }}
          </p>
          <div
            class="component__rule-status"
            :style="[rule.valid ? styleValidStatusColor : '']"
          ></div>
        </div>
      </div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, watch, onMounted } from 'vue'
import { configRules } from './config'

defineOptions({
	name: 'NbPasswordValidationSection',
	inheritAttrs: false
})

onMounted(() => {
  rules.value = configRules
  checkValidation(password.value)
})

const emit = defineEmits(['valid-password'])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	display: {
		type: String,
		default: 'b',
		validator: (value = 'b') => {
			const currentValue = value ? value.toLowerCase() : ''
			return ['b', 'ib'].includes(currentValue)
		}
	},
  password: {
    type: String,
    default: ''
  },
  hasLabel: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
  label: {
    type: String,
    default: 'Password quality'
  },
  hasDescriptions: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},
  descriptions: {
    type: Array,
    default: () => {
      return []
    },
  },
  width: {
    type: Number,
    default: 56
  },
  gap: {
    type: Number,
    default: 10
  },
  labelGap: {
    type: Number,
    default: 10
  },
  statusColor: {
    type: String,
    default: '#999999'
  },
  validStatusColor: {
    type: String,
    default: '#72f258'
  },
	titleColor: {
		type: String,
		default: '#000000'
	},
	descriptionColor: {
		type: String,
		default: '#000000'
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
	fontSizeLabel: {
		type: String,
		default: '.9em',
		validator: value => {
			return !value ? '.9em' : value
		}
	},
	fontSizeDescription: {
		type: String,
		default: '.8em',
		validator: value => {
			return !value ? '.8em' : value
		}
	},
	fontWeight: {
		type: Number,
		default: 200,
		validator: value => {
			return !value ? 200 : value
		}
	}
})

const {
	display,
  titleColor,
  descriptionColor,
  statusColor,
  validStatusColor,
  width,
  gap,
  labelGap,
  descriptions,
  password,
	fontFamily,
  fontSize,
  fontSizeLabel,
  fontSizeDescription,
	fontWeight
} = toRefs(props)

const rules = ref([])

const formatDefaultValues = computed(() => {
	const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
  const titleColorValue = !titleColor.value ? '#000000' : titleColor.value
  const descriptionColorValue = !descriptionColor.value ? '#000000' : descriptionColor.value
  const statusColorValue = !statusColor.value ? '#999999' : statusColor.value
  const validStatusColorValue = !validStatusColor.value ? '#72f258' : validStatusColor.value
  const widthValue = !width.value || width.value < 0 ? 0 : width.value
  const gapValue = !gap.value || gap.value < 0 ? 0 : gap.value
  const labelGapValue = !labelGap.value || labelGap.value < 0 ? 10 : labelGap.value
  const descriptionsValue = !descriptions.value || !descriptions.value.length ? [] : descriptions.value
	const fontValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
	const fontSizeValue = !fontSize.value ? '1.6em' : fontSize.value
	const fontSizeLabelValue = !fontSizeLabel.value ? '1em' : fontSizeLabel.value
	const fontSizeDescriptionValue = !fontSizeDescription.value ? '1em' : fontSizeDescription.value
	const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 200 : fontWeight.value

	return {
		display: displayValue,
    titleColor: titleColorValue,
    descriptionColor: descriptionColorValue,
    statusColor: statusColorValue,
    validStatusColor: validStatusColorValue,
    width: widthValue,
    gap: gapValue,
    labelGap: labelGapValue,
    descriptions: descriptionsValue,
		font: fontValue,
		fontSize: fontSizeValue,
    fontSizeLabel: fontSizeLabelValue,
    fontSizeDescription: fontSizeDescriptionValue,
		fontWeight: fontWeightValue
	}
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
const font = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.font
})
const fontLabel = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.fontSizeLabel
})
const fontDescription = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.fontSizeDescription
})

const styleTitleColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.titleColor
})

const styleDescriptionColor = computed(() => {
	const defaultValues = formatDefaultValues.value

	return defaultValues.descriptionColor
})

const styleStatusColor = computed(() => {
	const defaultValues = formatDefaultValues.value

  return defaultValues.statusColor
})

const styleValidStatusColor = computed(() => {
	const defaultValues = formatDefaultValues.value

  return {
    background: defaultValues.validStatusColor
  }
})

const size = computed(() => {
	const defaultValues = formatDefaultValues.value

  return `${defaultValues.width}px`
})

const padding = computed(() => {
	const defaultValues = formatDefaultValues.value

  return `${defaultValues.gap}px`
})

const labelMargin = computed(() => {
	const defaultValues = formatDefaultValues.value

  return `${defaultValues.labelGap}px`
})

const passwordValidation = computed(() => {
	const defaultValues = formatDefaultValues.value
  const newRules = rules.value

  newRules.forEach((currentRule, index) => {
    currentRule.description = defaultValues.descriptions[index]
  })

  return newRules
})

const checkValidation = value => {
  if (!value) {
    setAllInvalid(false)
  } else {
    validValues(value)
  }
}

const validValues = value => {
  const one = rules.value[0].regex.test(value)
  const two = rules.value[1].regex.test(value)
  const three = rules.value[2].regex.test(value)
  const four = rules.value[3].regex.test(value)
  const five = rules.value[4].regex.test(value)

  rules.value[0].valid = one
  rules.value[1].valid = two
  rules.value[2].valid = three
  rules.value[3].valid = four
  rules.value[4].valid = five

  let isValid = false

  if (one && two && three && four && five) isValid = true

  emit('valid-password', isValid)
}

const setAllInvalid = value => {
  rules.value[0].valid = value
  rules.value[1].valid = value
  rules.value[2].valid = value
  rules.value[3].valid = value
  rules.value[4].valid = value
}

watch(password, value => {
  checkValidation(value)
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
	// display: inline-block;
	vertical-align: bottom;
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
  box-sizing: border-box;
  line-height: 16px;
	font-family: v-bind('font');

  user-select: none;

  touch-action: manipulation;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: left;
  -webkit-text-decoration-line: none;
  text-decoration-line: none;
  white-space: nowrap;

  outline: 0;
  position: relative;

  .component__validation-label {
    display: block;
    margin-bottom: v-bind('labelMargin');
    font-size: v-bind('fontLabel');
  }

  .component__validation-rules {
    display: flex;
    flex-direction: row;
    gap: v-bind('padding');

    .component__validation-rule {
      width: v-bind('size');
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 10px;
      overflow: hidden;
      justify-content: space-between;

      .component__rule-title {
        font-weight: 900;
        color: v-bind('styleTitleColor');
        margin-top: 5px;
      }
      .component__rule-description {
        font-weight: 100;
        font-size: v-bind('fontDescription');
        color: v-bind('styleDescriptionColor');
        word-break: break-word; /* Garante que palavras muito longas quebrem */
        overflow-wrap: break-word; /* Adicional para compatibilidade */
        white-space: normal; /* Permite quebras normais de texto */
        overflow: hidden;
      }

      .component__rule-status {
        height: 4px;
        background: v-bind('styleStatusColor');
      }
    }
  }
}
</style>
