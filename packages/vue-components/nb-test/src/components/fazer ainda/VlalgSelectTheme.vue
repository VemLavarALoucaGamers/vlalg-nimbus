<template>
  <VlalgSelect
    :prop-id="propId"
    :prop-options="selectOptions"
    :prop-selected-item="currentItem"
    :prop-theme="propTheme"
    :prop-disabled="propDisabled"
    :prop-width="propWidth"
    class="vlalg-select-theme"
    @change-selected="changeSelectedTheme($event)"
  />
</template>

<script>
import { defineComponent, ref, computed, toRefs, watch, defineAsyncComponent, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'

import { themesColor } from '@enums/themes'

export default defineComponent({
  name: 'VlalgSelectTheme',
  components: {
    VlalgSelect: defineAsyncComponent(() => import('@components/fragments/VlalgSelect')),
  },
  emits: ['change-theme'],
  props: {
    propId: {
      type: String,
      default: '',
      required: true,
      validator: value => {
        if (!value) return false
        return value
      },
    },
    propSelectedItem: {
      type: String,
      required: true,
      default: '',
      validator: value => {
        if (!value) return false
        return value
      },
    },
    propTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propDisabled: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propWidth: {
      type: Number,
      required: true,
      default: 250,
      validator: value => {
        return typeof value === 'number' && value >= 120
      },
    },
  },
  setup (props, context) {
    /* MIXINS */

    /* VUE I18N */
    const { t } = useI18n({
      inheritLocale: false,
      useScope: 'global',
    })

    /* VUE META */

    /* VUE ROUTER */

    /* VUEX (Mesmo que this.$store) */

    /* FUNCTIONS */

    /* LIFECYCLE */
    onBeforeMount(() => {
      currentItem.value = propSelectedItem.value
      setInitialValues()
    })

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const { propSelectedItem } = toRefs(props)

    /* DATA */
    const selectOptions = ref([])
    const currentItem = ref('')

    /* COMPUTED */
    const selectedItem = computed(() => {
      return propSelectedItem.value
    })

    /* METHODS */
    const translateOptions = () => {
      const themeEnum = themesColor
      themeEnum.forEach(theme => {
        const newKey = t(`themes.${theme.value}`)

        theme.text = newKey
      })

      return themeEnum
    }

    const setInitialValues = () => {
      selectOptions.value = translateOptions()
    }

    const changeSelectedTheme = $event => {
      if ($event !== currentItem.value) context.emit('change-theme', $event)
    }

    /* WATCH */
    watch(selectedItem, (newValue, oldValue) => {
      if (oldValue !== newValue) currentItem.value = newValue
    })

    return {
      selectOptions,
      currentItem,
      changeSelectedTheme,
    }
  },
})
</script>

<style lang="scss" scoped></style>
