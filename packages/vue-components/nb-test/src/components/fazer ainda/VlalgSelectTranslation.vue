<template>
  <select
    v-model="currentLocation"
    :disabled="blockUi"
  >
    <option
      v-for="(lang, index) in langs"
      :key="index"
      :value="lang.value"
    >
      {{ lang.text }}
    </option>
  </select>
</template>

<script>
import { defineComponent, onBeforeMount, ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import useMixins from '@mixins'

import helpersQueries from '@helpersQueries'
const { updateUser } = helpersQueries

import { getLocalToken } from '@helpers/functions'

export default defineComponent({
  name: 'VlalgSelectTranslation',
  components: {},
  emits: [],
  props: {},
  setup () {
    /* MIXINS */
    const { setBlockUi } = useMixins()

    /* VUE I18N */
    const { locale } = useI18n({
      inheritLocale: false,
      useScope: 'global',
    })

    /* VUE META */

    /* VUE ROUTER */

    /* VUEX (Mesmo que this.$store) */
    const store = useStore()

    /* FUNCTIONS */

    /* LIFECYCLE */
    onBeforeMount(() => {
      currentLocation.value = location.value
    })

    /* VUEX ACTIONS */
    const changeLocation = value => store.dispatch('changeLocation', value)

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */
    const location = computed(() => store.getters.location)
    const blockUi = computed(() => store.getters.blockUi)
    const userId = computed(() => store.getters['ModuleUser/userId'])

    /* VUEX STATES */

    /* PROPS */

    /* DATA */
    const currentLocation = ref('')
    const langs = ref([
      { value: 'pt-BR', text: 'Portugues' },
      { value: 'en', text: 'Ingles' },
    ])

    /* COMPUTED */

    /* METHODS */
    const updateUserLocation = async newLocation => {
      setBlockUi(true)

      let resultError = false
      const user = userId.value
      const values = {
        location: newLocation,
        updater: user,
      }
      const token = getLocalToken()

      const resultUser = await updateUser(user, values, token)
      const resultStatus = resultUser.status

      if (resultStatus !== 200) resultError = true

      if (resultError) {
        // TODO Fazer algo quando der erro
      } else {
        locale.value = newLocation
        changeLocation(newLocation)
      }

      setBlockUi(false)
      resultError = false
    }

    /* WATCH */
    watch(currentLocation, (newValue, oldValue) => {
      if (newValue && oldValue !== '') updateUserLocation(newValue)
    })

    return {
      currentLocation,
      langs,
      blockUi,
    }
  },
})
</script>

<style lang="scss" scoped></style>
