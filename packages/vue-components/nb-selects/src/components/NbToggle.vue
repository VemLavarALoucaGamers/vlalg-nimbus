<template>
  <div
    v-if="nbId"
    :class="['nb-wrapper', componentDisabled]"
    :style="[wrapperStyle]"
  >
    <div
      :id="nbId"
      :class="['nb-reset', 'component', 'component-toggle', themeStyle]"
      v-bind="computedAriaAttrs"
    >
      <label
        :for="`toggle-input-${nbId}`"
        class="component-toggle__button"
        :tabindex="disabled ? -1 : tabIndex"
        @keydown.enter.prevent="!disabled && hasTabIndexEnter && $event.target.click()"
        @keydown.space.prevent="!disabled && hasTabIndexSpace && $event.target.click()"
      >
        <input
          :id="`toggle-input-${nbId}`"
          v-model="currentStatus"
          type="checkbox"
          :disabled="disabled"
          class="component-toggle__checkbox"
          @change="handleChange"
        />
        <div
          :id="`toggle-switch-${nbId}`"
          class="component-toggle__switch"
        ></div>
      </label>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, toRefs, computed, watch, onMounted } from 'vue'

defineOptions({
  name: 'NbToggle',
  inheritAttrs: false
})

const emit = defineEmits(['changed', 'current-value', 'clicked'])

const props = defineProps({
  nbId: {
    type: String,
    required: true
  },
  value: {
    type: Boolean,
    default: false,
    validator: value => {
      return [true, false].includes(value)
    }
  },
  display: {
    type: String,
    default: 'ib',
    validator: (value = 'ib') => {
      const currentValue = value ? value.toLowerCase() : ''
      return ['b', 'ib'].includes(currentValue)
    }
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
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
    default: 'Toggle'
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
  // Cores do tema light
  lightSwitchColor: {
    type: String,
    default: '#f5f5f5'
  },
  lightSwitchColorActive: {
    type: String,
    default: '#e0e0e0'
  },
  lightThumbColor: {
    type: String,
    default: '#ffffff'
  },
  lightThumbColorActive: {
    type: String,
    default: '#ffffff'
  },
  lightDisabledBgColor: {
    type: String,
    default: '#dfdfd9'
  },
  // Cores do tema dark
  darkSwitchColor: {
    type: String,
    default: '#2d2d2d'
  },
  darkSwitchColorActive: {
    type: String,
    default: '#3d3d3d'
  },
  darkThumbColor: {
    type: String,
    default: '#e0e0e0'
  },
  darkThumbColorActive: {
    type: String,
    default: '#ffffff'
  },
  darkDisabledBgColor: {
    type: String,
    default: 'rgba(40, 42, 54, 1)'
  }
})

onMounted(() => {
  currentStatus.value = props.value
  emit('current-value', props.value)
})

const {
  nbId,
  value,
  display,
  disabled,
  tabIndex,
  hasTabIndexEnter,
  hasTabIndexSpace,
  ariaLabel,
  ariaAttrs,
  theme,
  lightSwitchColor,
  lightSwitchColorActive,
  lightThumbColor,
  lightThumbColorActive,
  lightDisabledBgColor,
  darkSwitchColor,
  darkSwitchColorActive,
  darkThumbColor,
  darkThumbColorActive,
  darkDisabledBgColor
} = toRefs(props)

const currentStatus = ref(false)

const formatDefaultValues = computed(() => {
  const disabledValue = disabled.value ? 'component-disabled' : ''
  const displayValue = display.value !== 'b' ? 'inline-block' : 'block'

  return {
    disabled: disabledValue,
    display: displayValue
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

const themeStyle = computed(() => {
  return theme.value === 'dark' ? 'component__theme--dark' : 'component__theme--light'
})

// Computed properties para as cores do theme (necessárias para v-bind no CSS)
const styleLightSwitchColor = computed(() => lightSwitchColor.value)
const styleLightSwitchColorActive = computed(() => lightSwitchColorActive.value)
const styleLightThumbColor = computed(() => lightThumbColor.value)
const styleLightThumbColorActive = computed(() => lightThumbColorActive.value)
const styleLightDisabledBgColor = computed(() => lightDisabledBgColor.value)
const styleDarkSwitchColor = computed(() => darkSwitchColor.value)
const styleDarkSwitchColorActive = computed(() => darkSwitchColorActive.value)
const styleDarkThumbColor = computed(() => darkThumbColor.value)
const styleDarkThumbColorActive = computed(() => darkThumbColorActive.value)
const styleDarkDisabledBgColor = computed(() => darkDisabledBgColor.value)

// Computed para atributos ARIA
const computedAriaAttrs = computed(() => {
  const newAttrs = {}

  if (ariaAttrs.value) {
    const attrKeys = Object.keys(ariaAttrs.value)

    attrKeys.forEach(key => newAttrs[`aria-${key}`] = ariaAttrs.value[key])
  }

  const attrs = {
    'aria-label': ariaLabel.value,
    'aria-disabled': disabled.value,
    'aria-checked': currentStatus.value,
    ...newAttrs
  }
  
  // Remove atributos undefined/null
  return Object.fromEntries(
    Object.entries(attrs).filter(([_, value]) => value !== undefined && value !== null)
  )
})

const handleChange = () => {
  emit('changed', currentStatus.value)
  emit('current-value', currentStatus.value)
  emit('clicked')
}

watch(value, (newValue) => {
  currentStatus.value = newValue
})

watch(currentStatus, (newValue) => {
  emit('current-value', newValue)
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
}

.component-toggle {
  display: inline-block;
  width: auto;

  // Tema Light
  &.component__theme--light {
    .component-toggle__button {
      .component-toggle__switch {
        background-color: v-bind('styleLightSwitchColor');
        transition: background-color 0.25s;

        &:before {
          background-color: v-bind('styleLightThumbColor');
          transition: left 0.25s, background-color 0.25s;
        }

        &:hover {
          cursor: pointer;
        }
      }

      .component-toggle__checkbox {
        &:checked {
          & + .component-toggle__switch {
            background-color: v-bind('styleLightSwitchColorActive');

            &:before {
              background-color: v-bind('styleLightThumbColorActive');
            }
          }
        }
      }
    }

    &.component-disabled {
      .component-toggle__button {
        .component-toggle__switch {
          background-color: v-bind('styleLightDisabledBgColor');
          opacity: 0.5;

          &:hover {
            cursor: not-allowed;
          }

          &:before {
            background-color: v-bind('styleLightDisabledBgColor');
            opacity: 0.3;
          }
        }

        .component-toggle__checkbox {
          &:checked {
            & + .component-toggle__switch {
              background-color: v-bind('styleLightDisabledBgColor');
              opacity: 0.5;

              &:before {
                background-color: v-bind('styleLightDisabledBgColor');
                opacity: 0.3;
              }
            }
          }
        }
      }
    }
  }

  // Tema Dark
  &.component__theme--dark {
    .component-toggle__button {
      .component-toggle__switch {
        background-color: v-bind('styleDarkSwitchColor');
        transition: background-color 0.25s;

        &:before {
          background-color: v-bind('styleDarkThumbColor');
          transition: left 0.25s, background-color 0.25s;
        }

        &:hover {
          cursor: pointer;
        }
      }

      .component-toggle__checkbox {
        &:checked {
          & + .component-toggle__switch {
            background-color: v-bind('styleDarkSwitchColorActive');

            &:before {
              background-color: v-bind('styleDarkThumbColorActive');
            }
          }
        }
      }
    }

    &.component-disabled {
      .component-toggle__button {
        .component-toggle__switch {
          background-color: v-bind('styleDarkDisabledBgColor');
          opacity: 0.5;

          &:hover {
            cursor: not-allowed;
          }

          &:before {
            background-color: v-bind('styleDarkDisabledBgColor');
            opacity: 0.3;
          }
        }

        .component-toggle__checkbox {
          &:checked {
            & + .component-toggle__switch {
              background-color: v-bind('styleDarkDisabledBgColor');
              opacity: 0.5;

              &:before {
                background-color: v-bind('styleDarkDisabledBgColor');
                opacity: 0.3;
              }
            }
          }
        }
      }
    }
  }

  .component-toggle__button {
    position: relative;
    display: inline-block;
  }

  .component-toggle__switch {
    display: inline-block;
    border-radius: 30px;
    position: relative;
    width: 60px;
    height: 28px;
    max-height: 28px;

    &:before {
      content: '';
      display: block;
      border-radius: 50%;
      position: absolute;
      width: 20px;
      height: 20px;
      top: 4px;
      left: 4px;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
    }
  }

  .component-toggle__checkbox {
    position: absolute;
    visibility: hidden;

    &:checked {
      & + .component-toggle__switch {
        &:before {
          left: 35px;
        }
      }
    }
  }
}
</style>
