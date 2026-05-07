<template>
  <div
    v-if="nbId"
    class="nb-wrapper"
  >
    <NbCollapse
      v-for="(item, index) in items"
      :key="index"
      :nb-id="`accordion-${nbId}-${index}`"
      :display="display"
      :tab-index="tabIndex"
      :has-tab-index-enter="hasTabIndexEnter"
      :has-tab-index-space="hasTabIndexSpace"
      :aria-label="ariaLabel"
      :aria-attrs="ariaAttrs"
      :theme="theme"
      :opened="isSelected(index)"
      :disabled="disabled || isDisabled(index)"
      :block-click="blockClick"
      :block-right-click="blockRightClick"
      :light-title-color="lightTitleColor"
      :light-title-color-active="lightTitleColorActive"
      :light-title-color-hover="lightTitleColorHover"
      :light-title-icon-color="lightTitleIconColor"
      :light-title-icon-color-active="lightTitleIconColorActive"
      :light-title-icon-color-hover="lightTitleIconColorHover"
      :light-button-bg-color="lightButtonBgColor"
      :light-button-bg-color-active="lightButtonBgColorActive"
      :light-button-bg-color-hover="lightButtonBgColorHover"
      :light-content-color="lightContentColor"
      :light-content-bg-color="lightContentBgColor"
      :light-content-border-color="lightContentBorderColor"
      :dark-title-color="darkTitleColor"
      :dark-title-color-active="darkTitleColorActive"
      :dark-title-color-hover="darkTitleColorHover"
      :dark-title-icon-color="darkTitleIconColor"
      :dark-title-icon-color-active="darkTitleIconColorActive"
      :dark-title-icon-color-hover="darkTitleIconColorHover"
      :dark-button-bg-color="darkButtonBgColor"
      :dark-button-bg-color-active="darkButtonBgColorActive"
      :dark-button-bg-color-hover="darkButtonBgColorHover"
      :dark-content-color="darkContentColor"
      :dark-content-bg-color="darkContentBgColor"
      :dark-content-border-color="darkContentBorderColor"
      :text-align="textAlign"
      :active-text-style="activeTextStyle"
      :ellipsis-text="ellipsisText"
      :is-scroll-class="isScrollClass"
      :scroll-class="scrollClass"
      :title="item.label"
      :title-gap="titleGap"
      :title-padding-x="titlePaddingX"
      :title-padding-y="titlePaddingY"
      :title-border-radius="titleBorderRadius"
      :title-border-radius-active="titleBorderRadiusActive"
      :title-font-family="titleFontFamily"
      :title-font-size="titleFontSize"
      :title-font-weight="titleFontWeight"
      :title-icon-width="titleIconWidth"
      :title-icon-font-family="titleIconFontFamily"
      :title-icon-font-size="titleIconFontSize"
      :title-icon-font-weight="titleIconFontWeight"
      :content-padding-x="contentPaddingX"
      :content-padding-y="contentPaddingY"
      :content-font-family="contentFontFamily"
      :content-font-size="contentFontSize"
      :content-font-weight="contentFontWeight"
      :content-border-radius-active="contentBorderRadiusActive"
      :content-has-border="contentHasBorder"
      :content-max-height="contentMaxHeight"
      @clicked="clicked"
      @focused="focused"
      @blurred="blurred"
      @outside-clicked="outsideClicked"
      @resized="resized"
    >
      <template #title>
        <slot
          :name="`title-${index}`"
          :item="item"
          :index="index"
          :title="item.label"
          :selected="isSelected(index)"
          :disabled="isDisabled(index)"
        >
          {{ item.label }}
        </slot>
      </template>

      <template #title-icon="{ isActive }">
        <slot
          :name="`title-icon-${index}`"
          :item="item"
          :index="index"
          :is-active="isActive"
          :selected="isSelected(index)"
          :disabled="isDisabled(index)"
        >
          {{ isActive ? '−' : '+' }}
        </slot>
      </template>

      <template #content>
        <slot
          :name="`content-${index}`"
          :item="item"
          :index="index"
          :content="item.content"
          :selected="isSelected(index)"
          :disabled="isDisabled(index)"
        >
          <p>{{ item.content }}</p>
        </slot>
      </template>
    </NbCollapse>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, computed, onMounted, onUnmounted, defineAsyncComponent } from 'vue'

const NbCollapse = defineAsyncComponent(() => import('@components/NbCollapse.vue'))

defineOptions({
  name: 'NbAccordion',
  inheritAttrs: false
})

const emit = defineEmits([
  'clicked',
  'focused',
  'blurred',
  'outside-clicked',
  'resized',
])

const props = defineProps({
	nbId: {
		type: String,
		required: true
	},
	display: {
		type: String,
		default: 'b',
		validator: (value = 'b') => {
			const currentValue = value.toLowerCase()
			return ['b', 'ib'].includes(currentValue)
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
    default: 'Collapse'
  },
  ariaAttrs: {
    type: Object,
    default: () => ({})
  },
	theme: {
		type: String,
		default: 'light',
		validator: value => {
			return ['dark', 'light'].indexOf(value) !== -1
		}
	},
	disabled: {
		type: Boolean,
		default: false,
		validator: value => {
			return typeof value === 'boolean' && [true, false].includes(value)
		}
	},  
  blockClick: {
    type: Boolean,
    default: false,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  blockRightClick: {
    type: Boolean,
    default: false,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
	// Cores do tema light
  lightTitleColor: {
    type: String,
    default: '#1f2937'
  },
  lightTitleColorActive: {
    type: String,
    default: '#1d4ed8'
  },
  lightTitleColorHover: {
    type: String,
    default: '#111827'
  },
  lightTitleIconColor: {
    type: String,
    default: '#6b7280'
  },
  lightTitleIconColorActive: {
    type: String,
    default: '#1d4ed8'
  },
  lightTitleIconColorHover: {
    type: String,
    default: '#374151'
  },
  lightButtonBgColor: {
    type: String,
    default: '#f3f4f6'
  },
  lightButtonBgColorActive: {
    type: String,
    default: '#e0e7ff'
  },
  lightButtonBgColorHover: {
    type: String,
    default: '#e5e7eb'
  },
  lightContentColor: {
    type: String,
    default: '#1f2937'
  },
  lightContentBgColor: {
    type: String,
    default: '#ffffff'
  },
  lightContentBorderColor: {
    type: String,
    default: '#e5e7eb'
  },
	// Cores do tema dark
  darkTitleColor: {
    type: String,
    default: '#e5e7eb'
  },
  darkTitleColorActive: {
    type: String,
    default: '#60a5fa'
  },
  darkTitleColorHover: {
    type: String,
    default: '#f9fafb'
  },
  darkTitleIconColor: {
    type: String,
    default: '#9ca3af'
  },
  darkTitleIconColorActive: {
    type: String,
    default: '#60a5fa'
  },
  darkTitleIconColorHover: {
    type: String,
    default: '#d1d5db'
  },
  darkButtonBgColor: {
    type: String,
    default: '#1f2937'
  },
  darkButtonBgColorActive: {
    type: String,
    default: '#1e3a8a'
  },
  darkButtonBgColorHover: {
    type: String,
    default: '#374151'
  },
  darkContentColor: {
    type: String,
    default: '#e5e7eb'
  },
  darkContentBgColor: {
    type: String,
    default: '#111827'
  },
  darkContentBorderColor: {
    type: String,
    default: '#374151'
  },
	textAlign: {
		type: String,
		default: 'left',
		validator: value => {
			return ['center', 'left', 'right'].indexOf(value) !== -1
		}
	},
	activeTextStyle: {
		type: String,
		default: 'normal',
		validator: value => {
			return ['normal', 'italic', 'oblique'].indexOf(value) !== -1
		}
	},
  ellipsisText: {
    type: Boolean,
    default: true,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  isScrollClass: {
    type: Boolean,
    default: false,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
	scrollClass: {
		type: String,
		default: ''
	},
  titleGap: {
    type: Number,
    default: 0.5,
    validator: (value) => {
        return typeof value === 'number' && value >= 0
    }
  },
	titlePaddingX: {
		type: Number,
		default: 0.7,
		validator: value => {
			return !value ? 0.7 : value
		}
	},
	titlePaddingY: {
		type: Number,
		default: 0.7, // 0.2rem
		validator: value => {
			return !value ? 0.7 : value
		}
	},
	titleBorderRadius: {
		type: String,
		default: '0px 0px 0px 0px',
		validator: value => {
			return !value ? '0px 0px 0px 0px' : value
		}
	},
	titleBorderRadiusActive: {
		type: String,
		default: '0px 0px 0px 0px',
		validator: value => {
			return !value ? '0px 0px 0px 0px' : value
		}
	},
	titleFontFamily: {
		type: String,
		default: `'Lato', sans-serif`
	},
	titleFontSize: {
		type: String,
		default: '1.6em'
	},
	titleFontWeight: {
		type: Number,
		default: 500,
		validator: value => {
			return !value ? 500 : value
		}
  },
  titleIconWidth: {
    type: String,
    default: '2.4rem'
  },
	titleIconFontFamily: {
		type: String,
		default: `'Lato', sans-serif`
	},
	titleIconFontSize: {
		type: String,
		default: '2em'
	},
	titleIconFontWeight: {
		type: Number,
		default: 700,
		validator: value => {
			return !value ? 700 : value
		}
  },
	contentPaddingX: {
		type: Number,
		default: 1,
		validator: value => {
			return !value ? 1 : value
		}
	},
	contentPaddingY: {
		type: Number,
		default: 1,
		validator: value => {
			return !value ? 1 : value
		}
	},
	contentFontFamily: {
		type: String,
		default: `'Lato', sans-serif`
	},
	contentFontSize: {
		type: String,
		default: '1.6em'
	},
	contentFontWeight: {
		type: Number,
		default: 500,
		validator: value => {
			return !value ? 500 : value
		}
  },
	contentBorderRadiusActive: {
		type: String,
		default: '0px 0px 0px 0px',
		validator: value => {
			return !value ? '0px 0px 0px 0px' : value
		}
	},
  contentHasBorder: {
    type: Boolean,
    default: true,
    validator: (value) => {
        return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  contentMaxHeight: {
    type: Number,
    default: 200,
    validator: (value) => {
        return typeof value === 'number' && value >= 0
    }
  },
  items: {
    type: Array,
    default: () => [],
    validator: (value) => {
        return Array.isArray(value) && value.every(item => typeof item === 'object' && item.key && item.label)
    }
  },
  selecteds: {
    type: Array,
    default: () => [],
    validator: (value) => {
        return Array.isArray(value) && value.every(item => typeof item === 'number')
    }
  },
  disableds: {
    type: Array,
    default: () => [],
    validator: (value) => {
        return Array.isArray(value) && value.every(item => typeof item === 'number')
    }
  }
})

const {
	nbId,
	display,
	tabIndex,
	hasTabIndexEnter,
	hasTabIndexSpace,
	ariaLabel,
	ariaAttrs,
	theme,
	disabled,
  blockRightClick,
  lightTitleColor,
  lightTitleColorActive,
  lightTitleColorHover,
  lightTitleIconColor,
  lightTitleIconColorActive,
  lightTitleIconColorHover,
  lightButtonBgColor,
  lightButtonBgColorActive,
  lightButtonBgColorHover,
  lightContentColor,
	lightContentBgColor,
  lightContentBorderColor,
  darkTitleColor,
  darkTitleColorActive,
  darkTitleColorHover,
  darkTitleIconColor,
  darkTitleIconColorActive,
  darkTitleIconColorHover,
  darkButtonBgColor,
  darkButtonBgColorActive,
  darkButtonBgColorHover,
  darkContentColor,
	darkContentBgColor,
  darkContentBorderColor,
	textAlign,
	activeTextStyle,
	blockClick,
	ellipsisText,
  isScrollClass,
	scrollClass,
  titleGap,
	titlePaddingX,
	titlePaddingY,
	titleBorderRadius,
	titleBorderRadiusActive,
	titleFontFamily,
	titleFontSize,
	titleFontWeight,
  titleIconWidth,
	titleIconFontFamily,
	titleIconFontSize,
	titleIconFontWeight,
	contentPaddingX,
	contentPaddingY,
	contentFontFamily,
	contentFontSize,
	contentFontWeight,
	contentBorderRadiusActive,
  contentHasBorder,
  contentMaxHeight,
  selecteds,
  disableds,
} = toRefs(props)

const clicked = () => {
  emit('clicked')
}
const focused = () => {
  emit('focused')
}
const blurred = () => {
  emit('blurred')
}
const outsideClicked = (event = null) => {
  emit('outside-clicked', event)
}
const resized = (event = null) => {
  emit('resized', event)
}

/* New logic below */
const isSelected = (index) => {
  return selecteds.value.includes(index)
}
const isDisabled = (index) => {
  if (disabled.value) return true

  return disableds.value.includes(index)
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

.nb-wrapper {
	margin: 0;
	padding: 0;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	vertical-align: bottom;
	position: relative;
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
}
</style>
