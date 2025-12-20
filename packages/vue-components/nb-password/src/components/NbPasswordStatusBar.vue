<template>
  <div v-if="nbId" :class="['nb-wrapper']" :style="[wrapperStyle]">
    <div
      :id="nbId"
      :class="['nb-reset', 'component', strengthColor]"
      :style="[componentStyle]">
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, watch, onMounted } from 'vue'
import { configRules } from './config'

defineOptions({
  name: 'NbPasswordStatusBar',
  inheritAttrs: false
})

onMounted(() => {
  rules.value = configRules
  checkPassword()
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
  width: {
    type: Number,
    default: 56
  },
  height: {
    type: Number,
    default: 3
  },
	borderRadius: {
		type: Number,
		default: 0
	}
})

const {
  display,
  password,
  width,
  height,
  borderRadius
} = toRefs(props)

const rules = ref([])
const strengthColor = ref('')

const formatDefaultValues = computed(() => {
  const displayValue = display.value !== 'b' ? 'inline-block' : 'block'
  const widthValue = ((width.value !== 0 && !width.value) || width.value < 0) ? 56 : width.value
  const heightValue = ((height.value !== 0 && !height.value) || height.value < 0) ? 5 : height.value
	const borderRadiusValue = ((borderRadius.value !== 0 && !borderRadius.value) || borderRadius.value < 0) ? 0 : borderRadius.value

  return {
    display: displayValue,
    width: widthValue,
    height: heightValue,
		borderRadius: borderRadiusValue
  }
})
const wrapperStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  const newWidth = defaultValues.display !== 'block' ? `${defaultValues.width}px` : '100%' 

  return {
    display: defaultValues.display,
    width: newWidth
  }
})
const componentStyle = computed(() => {
  const defaultValues = formatDefaultValues.value

  return {
    height: `${defaultValues.height}px`,
    borderRadius: `${defaultValues.borderRadius}px`
  }
})

const checkPassword = () => {
  let status = ''
  let isValid = false
  const currentPassword = password.value

  const hasUppercase = rules.value[0].regex.test(currentPassword);
  const hasLowercase = rules.value[1].regex.test(currentPassword);
  const hasNumber = rules.value[2].regex.test(currentPassword);
  const minLength = rules.value[3].regex.test(currentPassword);
  const hasSpecialChar = rules.value[4].regex.test(currentPassword);

  if (!currentPassword) {
    status = 'empty'
  } else if (
    minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  ) {
    status = 'green'
    isValid = true
  } else if (minLength && (hasUppercase || hasLowercase || hasNumber || hasSpecialChar)) {
    status = 'yellow'
    isValid = false
  } else {
    status = 'red'
    isValid = false
  }

  strengthColor.value = `component-${status}`

  emit('valid-password', isValid)
}

watch(password, () => {
  checkPassword()
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
  // display: inline-block;
  vertical-align: bottom;
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
  box-sizing: border-box;
  line-height: 16px;

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

  width: 100%;
  margin-top: 0;

  &.component-red {
    background-color: red;
  }

  &.component-yellow {
    background-color: yellow;
  }

  &.component-green {
    background-color: green;
  }

  &.component-empty {
    background-color: #999999;
  }
}

.component-disabled {
  cursor: not-allowed;
  pointer-events: none;
  user-select: none;

  .component {
    opacity: 0.7;
  }
}
</style>
