<template>
  <div v-if="nbId" :class="['nb-wrapper', componentDisabled]" :style="[wrapperStyle]">
    <div :id="nbId" :class="['nb-reset', 'component', themeStyle]" :style="[componentStyle]">
      <nav :class="['pagination', themeStyle]" aria-label="Paginação">
        <!-- Botão anterior -->
        <button v-if="showButtonFirst" class="nav" :disabled="currentPage === 1 || disabled" @click="goTo(1)">
          ‹‹
        </button>
        <button v-if="showButtonPreview" class="nav" :disabled="currentPage === 1 || disabled"
          @click="goTo(currentPage - 1)">
          ‹
        </button>

        <div v-if="showNumberButtons">
          <!-- Container dos números (com animação opcional) -->
          <TransitionGroup name="slide" tag="div" class="pages" v-if="animated">
            <button v-for="page in visiblePages" :key="page.key" :class="[
              'page',
              { active: page.number === currentPage, ellipsis: page.ellipsis },
            ]" :disabled="page.ellipsis || disabled" @click="goTo(page.number)">
              {{ page.label }}
            </button>
          </TransitionGroup>

          <!-- Sem animação -->
          <div class="pages" v-else>
            <button v-for="page in visiblePages" :key="page.key" :class="[
              'page',
              { active: page.number === currentPage, ellipsis: page.ellipsis },
            ]" :disabled="page.ellipsis || disabled" @click="goTo(page.number)">
              {{ page.label }}
            </button>
          </div>
        </div>

        <div v-if="!showNumberButtons && showSlimText" class="pages">
          <slot name="slim-text" :infos="{ currentPage, totalPages }">
            {{ currentPage }}/{{ totalPages }}
          </slot>
        </div>

        <!-- Botão próximo -->
        <button v-if="showButtonNext" class="nav" :disabled="currentPage === totalPages || disabled"
          @click="goTo(currentPage + 1)">
          ›
        </button>
        <button v-if="showButtonLast" class="nav" :disabled="currentPage === totalPages || disabled"
          @click="goTo(totalPages)">
          ››
        </button>
      </nav>

      <div v-if="showGoTo" class="go-to">
        <div v-if="goToType === 'input'" class="go-to__wrapper">
          <span class="go-to__wrapper-text" :style="styleGoToText">{{ goToText }}</span>
          <input v-if="goToType === 'input'" type="text" inputmode="numeric" v-model="goToNumber"
            class="go-to__wrapper-input" :style="styleGoToInput" @input="handleGoToInput" @keydown.enter="goToChanged"
            :maxlength="String(props.totalPages).length" placeholder="1" :disabled="disabled" />

          <button v-if="showGoToButton" class="go-to__wrapper-button" @click="goToChanged" :disabled="disabled">
            Go
          </button>
        </div>

        <div v-else-if="goToType === 'select'" class="go-to-select">
          <slot name="go-to-select" :infos="{ currentPage, totalPages, disabled, goToChangedSelect }">
            <span :style="styleGoToText">{{ goToText }}</span>
            <select :style="styleGoToSelect" @change="goToChangedSelect" :disabled="disabled">
              <option v-for="i in props.totalPages" :key="i" :value="i" :selected="i === currentPage">
                {{ i }}
              </option>
            </select>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, toRefs } from 'vue';

defineOptions({
	name: 'NbPagination',
	inheritAttrs: false
})

/**
  * PROPS
  * modelValue   → página atual (v-model)
  * totalPages   → total de páginas
  * useEllipsis  → ativa/desativa "..."
  * animated     → animação estilo Instagram/Reels
  * maxVisible   → quantidade de páginas visíveis
  * showFirstLast → mostra primeira e última página quando há ellipsis
  */
const props = defineProps({
  nbId: {
    type: String,
    required: true
  },
  gap: {
    type: Number,
    default: 12
  },
  gapGoTo: {
    type: Number,
    default: 9
  },
  fontFamily: {
    type: String,
    default: `'Lato', sans-serif`
  },
  fontSize: {
    type: String,
    default: '1.1em',
    validator: value => {
      return !value ? '1.1em' : value
    }
  },
  fontWeight: {
    type: Number,
    default: 400,
    validator: value => {
      return !value ? 200 : value
    }
  },
  fontFamilyText: {
    type: String,
    default: `'Lato', sans-serif`
  },
  fontSizeText: {
    type: String,
    default: '1.2em',
    validator: value => {
      return !value ? '1.2em' : value
    }
  },
  fontWeightText: {
    type: Number,
    default: 400,
    validator: value => {
      return !value ? 200 : value
    }
  },
  fontFamilyIcon: {
    type: String,
    default: `'Lato', sans-serif`
  },
  fontSizeIcon: {
    type: String,
    default: '1.4em',
    validator: value => {
      return !value ? '1.4em' : value
    }
  },
  fontWeightIcon: {
    type: Number,
    default: 400,
    validator: value => {
      return !value ? 400 : value
    }
  },
  modelValue: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  useEllipsis: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  animated: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  maxVisible: {
    type: Number,
    default: 5
  },
  showFirstLast: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  showNumberButtons: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  showSlimText: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  showButtonFirst: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  showButtonPreview: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  showButtonLast: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  showButtonNext: {
    type: Boolean,
    default: true,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  gapButtons: {
    type: Number,
    default: 4
  },
  gapNumbers: {
    type: Number,
    default: 4
  },
  spacingNumbers: {
    type: Number,
    default: 8
  },
  buttonBorderRadius: {
    type: Number,
    default: 0
  },
  showGoTo: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  goToText: {
    type: String,
    default: 'Go to'
  },
  goToType: {
    type: String,
    default: 'input',
    validator: (value) => {
      const currentValue = value.toLowerCase();
      return ['input', 'select'].includes(currentValue);
    },
  },
  goToInputWidth: {
    type: Number,
    default: 40
  },
  showGoToButton: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  goToSelectWidth: {
    type: Number,
    default: 60
  },
  goToTextMargin: {
    type: String,
    default: '0 8px 0 0'
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  theme: {
    type: String,
    default: 'light',
    validator: value => {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  },
  hasBorder: {
    type: Boolean,
    default: false,
    validator: value => {
      return typeof value === 'boolean' && [true, false].includes(value)
    }
  },
  // Cores do tema light
  lightBgColor: {
    type: String,
    default: '#eeeeee'
  },
  lightBgColorHover: {
    type: String,
    default: '#eaeaea'
  },
  lightBorderColor: {
    type: String,
    default: '#d0d0d0'
  },
  lightTextColor: {
    type: String,
    default: '#000000'
  },
  lightTextColorHover: {
    type: String,
    default: null
  },
  lightActiveBgColor: {
    type: String,
    default: '#e0e0e0'
  },
  lightActiveTextColor: {
    type: String,
    default: '#000000'
  },
  lightEllipsisColor: {
    type: String,
    default: null
  },
  lightEllipsisOpacity: {
    type: Number,
    default: 1
  },
  lightDisabledOpacity: {
    type: Number,
    default: 0.4
  },
  // Cores do tema dark
  darkBgColor: {
    type: String,
    default: '#353734'
  },
  darkBgColorHover: {
    type: String,
    default: '#272936'
  },
  darkBorderColor: {
    type: String,
    default: '#555555'
  },
  darkTextColor: {
    type: String,
    default: '#ffffff'
  },
  darkTextColorHover: {
    type: String,
    default: null
  },
  darkActiveBgColor: {
    type: String,
    default: '#555555'
  },
  darkActiveTextColor: {
    type: String,
    default: '#ffffff'
  },
  darkEllipsisColor: {
    type: String,
    default: null
  },
  darkEllipsisOpacity: {
    type: Number,
    default: 1
  },
  darkDisabledOpacity: {
    type: Number,
    default: 0.4
  },
  // Cores do botão Go (tema light)
  lightGoToButtonBgColor: {
    type: String,
    default: null
  },
  lightGoToButtonTextColor: {
    type: String,
    default: null
  },
  lightGoToButtonBgColorHover: {
    type: String,
    default: null
  },
  lightGoToButtonTextColorHover: {
    type: String,
    default: null
  },
  // Cores do botão Go (tema dark)
  darkGoToButtonBgColor: {
    type: String,
    default: null
  },
  darkGoToButtonTextColor: {
    type: String,
    default: null
  },
  darkGoToButtonBgColorHover: {
    type: String,
    default: null
  },
  darkGoToButtonTextColorHover: {
    type: String,
    default: null
  },
  // Cores do texto "Go to"
  lightGoToTextColor: {
    type: String,
    default: '#000000'
  },
  darkGoToTextColor: {
    type: String,
    default: '#000000'
  },
});

const goToNumber = ref(null);

const emit = defineEmits([
  'update:modelValue',
  'changed',
  'page-changed',
  'go-to-input',
  'invalid-page',
  'first-page',
  'last-page'
]);

const {
  disabled,
  theme,
  hasBorder,
  gap,
  gapGoTo,
  gapButtons,
  gapNumbers,
  spacingNumbers,
  buttonBorderRadius,
  goToInputWidth,
  goToSelectWidth,
  goToTextMargin,
  fontFamily,
  fontSize,
  fontWeight,
  fontFamilyText,
  fontSizeText,
  fontWeightText,
  fontFamilyIcon,
  fontSizeIcon,
  fontWeightIcon,
  lightBgColor,
  lightBgColorHover,
  lightBorderColor,
  lightTextColor,
  lightTextColorHover,
  lightActiveBgColor,
  lightActiveTextColor,
  lightEllipsisColor,
  lightEllipsisOpacity,
  lightDisabledOpacity,
  darkBgColor,
  darkBgColorHover,
  darkBorderColor,
  darkTextColor,
  darkTextColorHover,
  darkActiveBgColor,
  darkActiveTextColor,
  darkEllipsisColor,
  darkEllipsisOpacity,
  darkDisabledOpacity,
  lightGoToButtonBgColor,
  lightGoToButtonTextColor,
  lightGoToButtonBgColorHover,
  lightGoToButtonTextColorHover,
  darkGoToButtonBgColor,
  darkGoToButtonTextColor,
  darkGoToButtonBgColorHover,
  darkGoToButtonTextColorHover,
  lightGoToTextColor,
  darkGoToTextColor
} = toRefs(props);

const formatDefaultValues = computed(() => {
  const disabledValue = disabled.value ? 'component-disabled' : ''
  const themeValue = !theme.value || !['dark', 'light'].includes(theme.value) ? 'light' : theme.value
  const hasBorderValue = typeof hasBorder.value === 'boolean' ? hasBorder.value : false
  const gapValue = !gap.value || gap.value < 0 ? 12 : gap.value
  const gapGoToValue = !gapGoTo.value || gapGoTo.value < 0 ? 9 : gapGoTo.value
  const gapButtonsValue = !gapButtons.value || gapButtons.value < 0 ? 4 : gapButtons.value
  const gapNumbersValue = !gapNumbers.value || gapNumbers.value < 0 ? 4 : gapNumbers.value
  const spacingNumbersValue = !spacingNumbers.value || spacingNumbers.value < 0 ? 8 : spacingNumbers.value
  const buttonBorderRadiusValue = !buttonBorderRadius.value || buttonBorderRadius.value < 0 ? 0 : buttonBorderRadius.value
  const goToInputWidthValue = !goToInputWidth.value || goToInputWidth.value < 0 ? 40 : goToInputWidth.value
  const goToSelectWidthValue = !goToSelectWidth.value || goToSelectWidth.value < 0 ? 60 : goToSelectWidth.value
  const goToTextMarginValue = !goToTextMargin.value ? '0 8px 0 0' : goToTextMargin.value
  const fontFamilyValue = !fontFamily.value ? `'Lato', sans-serif` : fontFamily.value
  const fontSizeValue = !fontSize.value ? '1.1em' : fontSize.value
  const fontWeightValue = !fontWeight.value || fontWeight.value < 0 ? 200 : fontWeight.value
  const fontFamilyTextValue = !fontFamilyText.value ? `'Lato', sans-serif` : fontFamilyText.value
  const fontSizeTextValue = !fontSizeText.value ? '1.2em' : fontSizeText.value
  const fontWeightTextValue = !fontWeightText.value || fontWeightText.value < 0 ? 200 : fontWeightText.value
  const fontFamilyIconValue = !fontFamilyIcon.value ? `'Lato', sans-serif` : fontFamilyIcon.value
  const fontSizeIconValue = !fontSizeIcon.value ? '1.4em' : fontSizeIcon.value
  const fontWeightIconValue = !fontWeightIcon.value || fontWeightIcon.value < 0 ? 400 : fontWeightIcon.value
  const lightBgColorValue = !lightBgColor.value ? '#eeeeee' : lightBgColor.value
  const lightBgColorHoverValue = !lightBgColorHover.value ? '#eaeaea' : lightBgColorHover.value
  const lightBorderColorValue = !lightBorderColor.value ? '#d0d0d0' : lightBorderColor.value
  const lightTextColorValue = !lightTextColor.value ? '#000000' : lightTextColor.value
  const lightTextColorHoverValue = !lightTextColorHover.value ? lightTextColorValue : lightTextColorHover.value
  const lightActiveBgColorValue = !lightActiveBgColor.value ? '#e0e0e0' : lightActiveBgColor.value
  const lightActiveTextColorValue = !lightActiveTextColor.value ? '#000000' : lightActiveTextColor.value
  const lightEllipsisColorValue = !lightEllipsisColor.value ? lightActiveBgColorValue : lightEllipsisColor.value
  const lightEllipsisOpacityValue = !lightEllipsisOpacity.value || lightEllipsisOpacity.value < 0 ? 1 : lightEllipsisOpacity.value
  const lightDisabledOpacityValue = !lightDisabledOpacity.value || lightDisabledOpacity.value < 0 ? 0.4 : lightDisabledOpacity.value
  const darkBgColorValue = !darkBgColor.value ? '#353734' : darkBgColor.value
  const darkBgColorHoverValue = !darkBgColorHover.value ? '#272936' : darkBgColorHover.value
  const darkBorderColorValue = !darkBorderColor.value ? '#555555' : darkBorderColor.value
  const darkTextColorValue = !darkTextColor.value ? '#ffffff' : darkTextColor.value
  const darkTextColorHoverValue = !darkTextColorHover.value ? darkTextColorValue : darkTextColorHover.value
  const darkActiveBgColorValue = !darkActiveBgColor.value ? '#555555' : darkActiveBgColor.value
  const darkActiveTextColorValue = !darkActiveTextColor.value ? '#ffffff' : darkActiveTextColor.value
  const darkEllipsisColorValue = !darkEllipsisColor.value ? darkActiveBgColorValue : darkEllipsisColor.value
  const darkEllipsisOpacityValue = !darkEllipsisOpacity.value || darkEllipsisOpacity.value < 0 ? 1 : darkEllipsisOpacity.value
  const darkDisabledOpacityValue = !darkDisabledOpacity.value || darkDisabledOpacity.value < 0 ? 0.4 : darkDisabledOpacity.value
  const lightGoToButtonBgColorValue = !lightGoToButtonBgColor.value ? lightBgColorValue : lightGoToButtonBgColor.value
  const lightGoToButtonTextColorValue = !lightGoToButtonTextColor.value ? lightTextColorValue : lightGoToButtonTextColor.value
  const lightGoToButtonBgColorHoverValue = !lightGoToButtonBgColorHover.value ? lightBgColorHoverValue : lightGoToButtonBgColorHover.value
  const lightGoToButtonTextColorHoverValue = !lightGoToButtonTextColorHover.value ? lightGoToButtonTextColorValue : lightGoToButtonTextColorHover.value
  const darkGoToButtonBgColorValue = !darkGoToButtonBgColor.value ? darkBgColorValue : darkGoToButtonBgColor.value
  const darkGoToButtonTextColorValue = !darkGoToButtonTextColor.value ? darkTextColorValue : darkGoToButtonTextColor.value
  const darkGoToButtonBgColorHoverValue = !darkGoToButtonBgColorHover.value ? darkBgColorHoverValue : darkGoToButtonBgColorHover.value
  const darkGoToButtonTextColorHoverValue = !darkGoToButtonTextColorHover.value ? darkGoToButtonTextColorValue : darkGoToButtonTextColorHover.value
  const lightGoToTextColorValue = !lightGoToTextColor.value ? '#000000' : lightGoToTextColor.value
  const darkGoToTextColorValue = !darkGoToTextColor.value ? '#000000' : darkGoToTextColor.value

  return {
    disabled: disabledValue,
    theme: themeValue,
    hasBorder: hasBorderValue,
    gap: gapValue,
    gapGoTo: gapGoToValue,
    gapButtons: gapButtonsValue,
    gapNumbers: gapNumbersValue,
    spacingNumbers: spacingNumbersValue,
    buttonBorderRadius: buttonBorderRadiusValue,
    goToInputWidth: goToInputWidthValue,
    goToSelectWidth: goToSelectWidthValue,
    goToTextMargin: goToTextMarginValue,
    fontFamily: fontFamilyValue,
    fontSize: fontSizeValue,
    fontWeight: fontWeightValue,
    fontFamilyText: fontFamilyTextValue,
    fontSizeText: fontSizeTextValue,
    fontWeightText: fontWeightTextValue,
    fontFamilyIcon: fontFamilyIconValue,
    fontSizeIcon: fontSizeIconValue,
    fontWeightIcon: fontWeightIconValue,
    lightBgColor: lightBgColorValue,
    lightBgColorHover: lightBgColorHoverValue,
    lightBorderColor: lightBorderColorValue,
    lightTextColor: lightTextColorValue,
    lightTextColorHover: lightTextColorHoverValue,
    lightActiveBgColor: lightActiveBgColorValue,
    lightActiveTextColor: lightActiveTextColorValue,
    lightEllipsisColor: lightEllipsisColorValue,
    lightEllipsisOpacity: lightEllipsisOpacityValue,
    lightDisabledOpacity: lightDisabledOpacityValue,
    darkBgColor: darkBgColorValue,
    darkBgColorHover: darkBgColorHoverValue,
    darkBorderColor: darkBorderColorValue,
    darkTextColor: darkTextColorValue,
    darkTextColorHover: darkTextColorHoverValue,
    darkActiveBgColor: darkActiveBgColorValue,
    darkActiveTextColor: darkActiveTextColorValue,
    darkEllipsisColor: darkEllipsisColorValue,
    darkEllipsisOpacity: darkEllipsisOpacityValue,
    darkDisabledOpacity: darkDisabledOpacityValue,
    lightGoToButtonBgColor: lightGoToButtonBgColorValue,
    lightGoToButtonTextColor: lightGoToButtonTextColorValue,
    lightGoToButtonBgColorHover: lightGoToButtonBgColorHoverValue,
    lightGoToButtonTextColorHover: lightGoToButtonTextColorHoverValue,
    darkGoToButtonBgColor: darkGoToButtonBgColorValue,
    darkGoToButtonTextColor: darkGoToButtonTextColorValue,
    darkGoToButtonBgColorHover: darkGoToButtonBgColorHoverValue,
    darkGoToButtonTextColorHover: darkGoToButtonTextColorHoverValue,
    lightGoToTextColor: lightGoToTextColorValue,
    darkGoToTextColor: darkGoToTextColorValue
  }
})

// Página atual (alias)
const currentPage = computed(() => props.modelValue);

// Garantir maxVisible mínimo (mínimo 1 para funcionar)
const safeMaxVisible = computed(() => Math.max(1, props.maxVisible));

const gapWrapper = computed(() => `${formatDefaultValues.value.gap}px`);
const gapGoToComputed = computed(() => `${formatDefaultValues.value.gapGoTo}px`);
const gapButton = computed(() => `${formatDefaultValues.value.gapButtons}px`);
const gapNumber = computed(() => `${formatDefaultValues.value.gapNumbers}px`);
const spacingNumbersComputed = computed(() => `0 ${formatDefaultValues.value.spacingNumbers}px`);
const configBorderRadius = computed(() => `${formatDefaultValues.value.buttonBorderRadius}rem`);
const styleGoToInput = computed(() => `width: ${formatDefaultValues.value.goToInputWidth}px;`);
const styleGoToSelect = computed(() => `width: ${formatDefaultValues.value.goToSelectWidth}px;`);
const styleGoToText = computed(() => {
  return {
    margin: formatDefaultValues.value.goToTextMargin,
  };
});

const themeStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  switch (defaultValues.theme) {
    case 'dark':
      return 'pagination__theme--dark';
    default:
      return 'pagination__theme--light';
  }
});

// Cores dinâmicas para v-bind
const lightBgColorComputed = computed(() => formatDefaultValues.value.lightBgColor);
const lightBgColorHoverComputed = computed(() => formatDefaultValues.value.lightBgColorHover);
const lightBorderColorComputed = computed(() => formatDefaultValues.value.lightBorderColor);
const lightTextColorComputed = computed(() => formatDefaultValues.value.lightTextColor);
const lightTextColorHoverComputed = computed(() => formatDefaultValues.value.lightTextColorHover);
const lightActiveBgColorComputed = computed(() => formatDefaultValues.value.lightActiveBgColor);
const lightActiveTextColorComputed = computed(() => formatDefaultValues.value.lightActiveTextColor);
const lightEllipsisColorComputed = computed(() => formatDefaultValues.value.lightEllipsisColor);
const lightEllipsisOpacityComputed = computed(() => formatDefaultValues.value.lightEllipsisOpacity);
const lightDisabledOpacityComputed = computed(() => formatDefaultValues.value.lightDisabledOpacity);
const darkBgColorComputed = computed(() => formatDefaultValues.value.darkBgColor);
const darkBgColorHoverComputed = computed(() => formatDefaultValues.value.darkBgColorHover);
const darkBorderColorComputed = computed(() => formatDefaultValues.value.darkBorderColor);
const darkTextColorComputed = computed(() => formatDefaultValues.value.darkTextColor);
const darkTextColorHoverComputed = computed(() => formatDefaultValues.value.darkTextColorHover);
const darkActiveBgColorComputed = computed(() => formatDefaultValues.value.darkActiveBgColor);
const darkActiveTextColorComputed = computed(() => formatDefaultValues.value.darkActiveTextColor);
const darkEllipsisColorComputed = computed(() => formatDefaultValues.value.darkEllipsisColor);
const darkEllipsisOpacityComputed = computed(() => formatDefaultValues.value.darkEllipsisOpacity);
const darkDisabledOpacityComputed = computed(() => formatDefaultValues.value.darkDisabledOpacity);

// Computed para estrutura wrapper
const componentDisabled = computed(() => {
  const defaultValues = formatDefaultValues.value
  return defaultValues.disabled
})

const wrapperStyle = computed(() => {
  return {
    display: 'inline-block'
  }
})

const componentStyle = computed(() => {
  const defaultValues = formatDefaultValues.value
  return {
    fontFamily: defaultValues.fontFamily,
    fontSize: defaultValues.fontSize,
    fontWeight: defaultValues.fontWeight
  }
})

const fontFamilyComputed = computed(() => formatDefaultValues.value.fontFamily)
const fontSizeComputed = computed(() => formatDefaultValues.value.fontSize)
const fontWeightComputed = computed(() => formatDefaultValues.value.fontWeight)
const fontFamilyTextComputed = computed(() => formatDefaultValues.value.fontFamilyText)
const fontSizeTextComputed = computed(() => formatDefaultValues.value.fontSizeText)
const fontWeightTextComputed = computed(() => formatDefaultValues.value.fontWeightText)
const fontFamilyIconComputed = computed(() => formatDefaultValues.value.fontFamilyIcon)
const fontSizeIconComputed = computed(() => formatDefaultValues.value.fontSizeIcon)
const fontWeightIconComputed = computed(() => formatDefaultValues.value.fontWeightIcon)
const lightGoToButtonBgColorComputed = computed(() => formatDefaultValues.value.lightGoToButtonBgColor)
const lightGoToButtonTextColorComputed = computed(() => formatDefaultValues.value.lightGoToButtonTextColor)
const lightGoToButtonBgColorHoverComputed = computed(() => formatDefaultValues.value.lightGoToButtonBgColorHover)
const lightGoToButtonTextColorHoverComputed = computed(() => formatDefaultValues.value.lightGoToButtonTextColorHover)
const darkGoToButtonBgColorComputed = computed(() => formatDefaultValues.value.darkGoToButtonBgColor)
const darkGoToButtonTextColorComputed = computed(() => formatDefaultValues.value.darkGoToButtonTextColor)
const darkGoToButtonBgColorHoverComputed = computed(() => formatDefaultValues.value.darkGoToButtonBgColorHover)
const darkGoToButtonTextColorHoverComputed = computed(() => formatDefaultValues.value.darkGoToButtonTextColorHover)
const lightGoToTextColorComputed = computed(() => formatDefaultValues.value.lightGoToTextColor)
const darkGoToTextColorComputed = computed(() => formatDefaultValues.value.darkGoToTextColor)

// Computed para borda
const buttonBorder = computed(() => {
  const defaultValues = formatDefaultValues.value
  if (!defaultValues.hasBorder) {
    return 'none';
  }
  const borderColor = defaultValues.theme === 'dark' ? defaultValues.darkBorderColor : defaultValues.lightBorderColor;
  return `1px solid ${borderColor}`;
});

/**
 * Função de navegação
 */
function goTo (page) {
  if (page < 1 || page > props.totalPages) {
    emit('invalid-page', { page, min: 1, max: props.totalPages });
    return;
  }

  const previousPage = currentPage.value;
  emit('update:modelValue', page);
  emit('changed', page);
  emit('page-changed', { previousPage, currentPage: page });

  // Emits específicos para primeira e última página
  if (page === 1 && previousPage !== 1) {
    emit('first-page', page);
  }
  if (page === props.totalPages && previousPage !== props.totalPages) {
    emit('last-page', page);
  }
}
/**
 * Valida o input durante a digitação
 * Permite apenas números (sem limitação de min/max durante digitação)
 */
const handleGoToInput = (event) => {
  let value = event.target.value;

  // Remove apenas caracteres não numéricos
  // Permite qualquer número durante a digitação (sem limitar min/max)
  const numericValue = value.replace(/[^0-9]/g, '');

  // Atualiza o valor reativo (permite vazio para apagar)
  goToNumber.value = numericValue;

  // Sincroniza o valor do input (remove caracteres não numéricos)
  if (value !== numericValue) {
    event.target.value = numericValue;
  }

  // Emite evento quando o usuário digita
  emit('go-to-input', { value: numericValue, rawValue: value });
};

/**
 * Processa a navegação quando Enter é pressionado ou quando confirma o valor
 */
const goToChanged = (event) => {
  const value = goToNumber.value;

  if (!value || value === '') {
    goToNumber.value = null;
    return;
  }

  let newValue = parseInt(value, 10);

  if (isNaN(newValue) || newValue === currentPage.value) {
    goToNumber.value = null;
    return;
  }

  if (newValue < 1) {
    newValue = 1;
  } else if (newValue > props.totalPages) {
    newValue = props.totalPages;
  }

  goTo(newValue);
  goToNumber.value = null;
};

const goToChangedSelect = (event) => {
  const value = event.target.value;

  if (!value || value === '') {
    goToNumber.value = null;
    return;
  }

  let newValue = parseInt(value, 10);

  if (isNaN(newValue) || newValue === currentPage.value) {
    goToNumber.value = null;
    return;
  }

  if (newValue < 1) {
    newValue = 1;
  } else if (newValue > props.totalPages) {
    newValue = props.totalPages;
  }

  goTo(newValue);
};

/**
 * Calcula páginas visíveis
 * - Com ou sem ellipsis
 * - maxVisible controla APENAS as páginas numéricas centrais (não conta página 1 e última quando ellipsis está ativo)
 */
const visiblePages = computed(() => {
  const pages = [];

  // Calcular range de páginas centrais baseado em maxVisible
  // maxVisible define quantas páginas numéricas mostrar na região central
  const half = Math.floor(safeMaxVisible.value / 2);

  // Calcular início baseado na página atual (tentando centralizar)
  let start = Math.max(1, currentPage.value - half);
  // Calcular fim garantindo exatamente maxVisible páginas
  let end = Math.min(props.totalPages, start + safeMaxVisible.value - 1);

  // Se não temos páginas suficientes, ajustar o início
  const actualCount = end - start + 1;
  if (actualCount < safeMaxVisible.value) {
    start = Math.max(1, end - safeMaxVisible.value + 1);
  }

  // Garantir que não excedemos maxVisible páginas no centro
  // Recalcular end baseado no start ajustado
  end = Math.min(props.totalPages, start + safeMaxVisible.value - 1);

  // Garantir que a página atual sempre está incluída (importante quando showFirstLast=false)
  if (currentPage.value < start) {
    start = currentPage.value;
    end = Math.min(props.totalPages, start + safeMaxVisible.value - 1);
  } else if (currentPage.value > end) {
    end = currentPage.value;
    start = Math.max(1, end - safeMaxVisible.value + 1);
  }

  // Verificar se precisa de ellipsis inicial (se não começamos em 1 ou 2)
  // Mas considerar showFirstLast: se showFirstLast=false, sempre mostrar ellipsis se start > 1
  const needsStartEllipsis = props.useEllipsis && (
    props.showFirstLast ? start > 2 : start > 1
  );

  // Verificar se precisa de ellipsis final
  // Com showFirstLast=true: mostrar ellipsis se end < totalPages - 1, última página sempre se end < totalPages
  // Com showFirstLast=false: mostrar apenas ellipsis se end < totalPages
  const hasMorePagesAfter = end < props.totalPages;
  const needsEndEllipsis = props.useEllipsis && (
    props.showFirstLast ? end < props.totalPages - 1 : hasMorePagesAfter
  );

  // Quando showFirstLast=true, mostrar última página se não está incluída nas centrais (end < totalPages)
  const shouldShowLastPage = props.showFirstLast && props.useEllipsis && hasMorePagesAfter && !needsEndEllipsis;

  // Adicionar página 1 e ellipsis inicial se necessário e showFirstLast estiver ativo
  if (needsStartEllipsis && props.showFirstLast) {
    pages.push({
      key: 'start',
      label: '1',
      number: 1,
    });

    pages.push({
      key: 'ellipsis-start',
      label: '…',
      ellipsis: true,
    });
  } else if (needsStartEllipsis && !props.showFirstLast) {
    // Apenas mostrar ellipsis sem a página 1
    pages.push({
      key: 'ellipsis-start',
      label: '…',
      ellipsis: true,
    });
  }

  // Páginas centrais (exatamente maxVisible páginas numéricas)
  for (let i = start; i <= end; i++) {
    pages.push({
      key: i,
      label: i,
      number: i,
    });
  }

  // Adicionar ellipsis final e última página se necessário
  if (needsEndEllipsis) {
    if (props.showFirstLast) {
      // Mostrar ellipsis + última página quando há mais páginas depois (com ellipsis)
      pages.push({
        key: 'ellipsis-end',
        label: '…',
        ellipsis: true,
      });
      pages.push({
        key: 'end',
        label: props.totalPages,
        number: props.totalPages,
      });
    } else {
      // Apenas mostrar ellipsis sem a última página
      pages.push({
        key: 'ellipsis-end',
        label: '…',
        ellipsis: true,
      });
    }
  } else if (shouldShowLastPage) {
    // Quando end === totalPages - 1 e showFirstLast=true, mostrar apenas a última página (sem ellipsis)
    pages.push({
      key: 'end',
      label: props.totalPages,
      number: props.totalPages,
    });
  }

  return pages;
});
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
  vertical-align: text-bottom;
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
  font-family: v-bind('fontFamilyComputed');
  font-size: v-bind('fontSizeComputed');
  font-weight: v-bind('fontWeightComputed');

  user-select: none;
  touch-action: manipulation;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  // Add new properties below
  display: flex;
  gap: v-bind('gapWrapper');

  .pagination {
    display: inline-flex;
    gap: v-bind('gapButton');
    align-items: center;
    justify-content: center;

    button {
      width: 36px;
      height: 36px;
      border-radius: v-bind('configBorderRadius');
      border: v-bind('buttonBorder');
      background: v-bind('lightBgColorComputed');
      color: v-bind('lightTextColorComputed');
      cursor: pointer;
      transition: all 0.2s ease;
      justify-content: center;
      align-items: center;
    }

    button.nav {
      font-family: v-bind('fontFamilyIconComputed');
      font-size: v-bind('fontSizeIconComputed');
      font-weight: v-bind('fontWeightIconComputed');
    }

    button:hover:not(.active):not(:disabled) {
      background: v-bind('lightBgColorHoverComputed');
      color: v-bind('lightTextColorHoverComputed');
    }

    button.active {
      background: v-bind('lightActiveBgColorComputed');
      color: v-bind('lightActiveTextColorComputed');
      border-color: v-bind('lightActiveBgColorComputed');
    }

    button.ellipsis {
      cursor: default;
      border: none;
      background: transparent !important;
      color: v-bind('lightEllipsisColorComputed');
      opacity: v-bind('lightEllipsisOpacityComputed') !important;
      font-size: 2em;
      transform: translateY(-2px);
    }

    button:disabled {
      opacity: v-bind('lightDisabledOpacityComputed');
      cursor: default;
    }

    // Tema dark
    &.pagination__theme--dark {
      button {
        border: v-bind('buttonBorder');
        background: v-bind('darkBgColorComputed');
        color: v-bind('darkTextColorComputed');
      }

      button:hover:not(.active):not(:disabled) {
        background: v-bind('darkBgColorHoverComputed');
        color: v-bind('darkTextColorHoverComputed');
      }

      button.active {
        background: v-bind('darkActiveBgColorComputed');
        color: v-bind('darkActiveTextColorComputed');
        border-color: v-bind('darkActiveBgColorComputed');
      }

      button.nav {
        font-family: v-bind('fontFamilyIconComputed');
        font-size: v-bind('fontSizeIconComputed');
        font-weight: v-bind('fontWeightIconComputed');
      }

      button:disabled {
        opacity: v-bind('darkDisabledOpacityComputed');
      }

      button.ellipsis {
        border: none;
        background: transparent !important;
        color: v-bind('darkEllipsisColorComputed');
        opacity: v-bind('darkEllipsisOpacityComputed') !important;
      }

      .go-to {
        span {
          color: v-bind('darkGoToTextColorComputed');
        }

        input {
          background: v-bind('darkBgColorComputed');
          color: v-bind('darkTextColorComputed');
          border: 1px solid v-bind('darkBorderColorComputed');
          font-family: v-bind('fontFamilyComputed');
          font-size: v-bind('fontSizeComputed');
          font-weight: v-bind('fontWeightComputed');
        }

        select {
          background: v-bind('darkBgColorComputed');
          color: v-bind('darkTextColorComputed');
          border: 1px solid v-bind('darkBorderColorComputed');
          font-family: v-bind('fontFamilyComputed');
          font-size: v-bind('fontSizeComputed');
          font-weight: v-bind('fontWeightComputed');
        }

        .go-to__wrapper-button {
          border: 1px solid v-bind('darkBorderColorComputed');
          background: v-bind('darkGoToButtonBgColorComputed');
          color: v-bind('darkGoToButtonTextColorComputed');
          font-family: v-bind('fontFamilyComputed');
          font-size: v-bind('fontSizeComputed');
          font-weight: v-bind('fontWeightComputed');

          &:hover:not(:disabled) {
            background: v-bind('darkGoToButtonBgColorHoverComputed');
            color: v-bind('darkGoToButtonTextColorHoverComputed');
          }

          &:disabled {
            opacity: v-bind('darkDisabledOpacityComputed');
          }
        }
      }
    }
  }

  // Tema dark para .go-to (fora do .pagination)
  &.pagination__theme--dark {
    .go-to {
      span {
        color: v-bind('darkGoToTextColorComputed');
      }

      input {
        background: v-bind('darkBgColorComputed');
        color: v-bind('darkTextColorComputed');
        border: 1px solid v-bind('darkBorderColorComputed');
        font-family: v-bind('fontFamilyComputed');
        font-size: v-bind('fontSizeComputed');
        font-weight: v-bind('fontWeightComputed');
      }

      select {
        background: v-bind('darkBgColorComputed');
        color: v-bind('darkTextColorComputed');
        border: 1px solid v-bind('darkBorderColorComputed');
        font-family: v-bind('fontFamilyComputed');
        font-size: v-bind('fontSizeComputed');
        font-weight: v-bind('fontWeightComputed');
      }

      .go-to__wrapper-button {
        border: 1px solid v-bind('darkBorderColorComputed');
        background: v-bind('darkGoToButtonBgColorComputed');
        color: v-bind('darkGoToButtonTextColorComputed');
        font-family: v-bind('fontFamilyComputed');
        font-size: v-bind('fontSizeComputed');
        font-weight: v-bind('fontWeightComputed');

        &:hover:not(:disabled) {
          background: v-bind('darkGoToButtonBgColorHoverComputed');
          color: v-bind('darkGoToButtonTextColorHoverComputed');
        }

        &:disabled {
          opacity: v-bind('darkDisabledOpacityComputed');
        }
      }
    }
  }

  .go-to {
    display: flex;
    align-items: center;
    font-family: v-bind('fontFamilyTextComputed');
    font-size: v-bind('fontSizeTextComputed');
    font-weight: v-bind('fontWeightTextComputed');

    span {
      color: v-bind('lightGoToTextColorComputed');
    }

    input {
      height: 36px;
      padding: 4px 8px;
      border: 1px solid v-bind('lightBorderColorComputed');
      border-radius: 4px;
      background: v-bind('lightBgColorComputed');
      color: v-bind('lightTextColorComputed');
      box-sizing: border-box;
      vertical-align: top;
      font-family: v-bind('fontFamilyComputed');
      font-size: v-bind('fontSizeComputed');
      font-weight: v-bind('fontWeightComputed');
    }

    select {
      height: 36px;
      padding: 4px 8px;
      border: 1px solid v-bind('lightBorderColorComputed');
      border-radius: 4px;
      background: v-bind('lightBgColorComputed');
      color: v-bind('lightTextColorComputed');
      box-sizing: border-box;
      vertical-align: top;
      font-family: v-bind('fontFamilyComputed');
      font-size: v-bind('fontSizeComputed');
      font-weight: v-bind('fontWeightComputed');
    }

    .go-to-select {
      display: flex;
      align-items: center;
      gap: v-bind('gapGoToComputed');
    }

    .go-to__wrapper {
      display: flex;
      align-items: center;
    }

    .go-to__wrapper-button {
      margin-left: 9px;
      height: 36px;
      padding: 4px 12px;
      border: 1px solid v-bind('lightBorderColorComputed');
      border-radius: 4px;
      background: v-bind('lightGoToButtonBgColorComputed');
      color: v-bind('lightGoToButtonTextColorComputed');
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: v-bind('fontFamilyComputed');
      font-size: v-bind('fontSizeComputed');
      font-weight: v-bind('fontWeightComputed');

      &:hover:not(:disabled) {
        background: v-bind('lightGoToButtonBgColorHoverComputed');
        color: v-bind('lightGoToButtonTextColorHoverComputed');
      }

      &:disabled {
        opacity: v-bind('lightDisabledOpacityComputed');
        cursor: default;
      }
    }
  }

  .pages {
    display: flex;
    gap: v-bind('gapNumber');
    margin: v-bind('spacingNumbersComputed');
    overflow: hidden;
  }

  /* Animação estilo Instagram/Reels */
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.25s ease;
  }

  .slide-enter-from {
    opacity: 0;
    transform: translateX(10px);
  }

  .slide-leave-to {
    opacity: 0;
    transform: translateX(-10px);
  }

  .slide-move {
    transition: transform 0.25s ease;
  }
}

.component-disabled {
  cursor: not-allowed;
  pointer-events: none;
  user-select: none;
  opacity: 0.7;

  .component {
    border-radius: inherit;
  }
}
</style>
