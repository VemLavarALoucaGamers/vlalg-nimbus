<template>
  <div
    class="aqui"
    :class="propClassNames"
  >
    anuncio
    <ins
      :className="propId"
      :style="{ display: 'block' }"
      :data-ad-client="googleAdId"
      :data-ad-slot="propSlot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'VlalgGoogleAdsense',
  components: {},
  emits: [],
  props: {
    propTimeout: Number,
    propClassNames: String,
    propSlot: String,
    propId: String,
  },
  setup (props) {
    /* MIXINS */

    /* VUE I18N */
    const { t } = useI18n({
      inheritLocale: false,
      useScope: 'global',
    })

    /* VUE META */

    /* VUE ROUTER */

    /* VUEX (Mesmo que this.$store) */

    /* LIFECYCLE */
    onMounted(() => {
      let newTimeout = 200
      if (propTimeout.value) newTimeout = propTimeout.value

      googleInit.value = setTimeout(() => {
        if (typeof window !== 'undefined') {
          window[propId.value] = window[propId.value] || []
          window[propId.value].push({})
        }
      }, newTimeout)
    })
    // destroyed
    onUnmounted(() => {
      if (googleInit.value) clearTimeout(googleInit.value)
    })

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const { propTimeout, propId } = toRefs(props)

    /* DATA */
    const googleInit = ref(null)
    const googleAdId = ref('ca-pub-2029559116754758')

    /* COMPUTED */

    /* METHODS */

    /* WATCH */

    return {
      t,
      googleAdId,
    }
  },
})
</script>

<style lang="scss" scoped>
  .aqui {
    color: #fff;
  }
</style>
