<template>
  <div
    v-if="hasItems"
    class="base-alerts"
  >
    <button
      class="base-alerts__btn-close"
      @click="closeBaseAlert"
    >
      {{ propBtnCloseIcon }}
    </button>
    <ul class="base-alerts__alerts-list">
      <li
        v-if="hasError"
        class="base-alerts__alerts-items base-alerts__error"
      >
        <p class="base-alerts__alerts-list--title">
          {{ propErroIcon }}
        </p>
        <ul class="base-alerts__alerts-list--items">
          <li
            v-for="(error, index) in errorData"
            :key="index"
          >
            {{ filterFormatMsg(error) }}
          </li>
        </ul>
      </li>

      <li
        v-if="hasSuccess"
        class="base-alerts__alerts-items base-alerts__success"
      >
        <p class="base-alerts__alerts-list--title">
          {{ propSuccessIcon }}
        </p>
        <ul class="base-alerts__alerts-list--items">
          <li
            v-for="(success, index) in successData"
            :key="index"
          >
            {{ filterFormatMsg(success) }}
          </li>
        </ul>
      </li>

      <li
        v-if="hasWarn"
        class="base-alerts__alerts-items base-alerts__warn"
      >
        <p class="base-alerts__alerts-list--title">
          {{ propWarnIcon }}
        </p>
        <ul class="base-alerts__alerts-list--items">
          <li
            v-for="(warn, index) in warnData"
            :key="index"
          >
            {{ filterFormatMsg(warn) }}
          </li>
        </ul>
      </li>

      <li
        v-if="hasInfo"
        class="base-alerts__alerts-items base-alerts__info"
      >
        <p class="base-alerts__alerts-list--title">
          {{ propInfoIcon }}
        </p>
        <ul class="base-alerts__alerts-list--items">
          <li
            v-for="(info, index) in infoData"
            :key="index"
          >
            {{ filterFormatMsg(info) }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, watch } from 'vue'

import {
  objectHasQuantityProperties,
  itIsObject,
  isEmptyObject,
  objectHasArrayKeys,
  itIsArray,
} from '@helpers/functions.js'

export default defineComponent({
  name: 'VlalgAlerts',
  components: {},
  emits: ['close-base-alert'],
  props: {
    propErroIcon: {
      type: String,
      default: 'Errors',
    },
    propSuccessIcon: {
      type: String,
      default: 'Success',
    },
    propWarnIcon: {
      type: String,
      default: 'Warns',
    },
    propInfoIcon: {
      type: String,
      default: 'Infos',
    },
    propBtnCloseIcon: {
      type: String,
      default: 'X',
    },
    propData: {
      type: Object,
      required: true,
    },
  },
  setup (props, context) {
    /* MIXINS */

    /* VUE I18N */

    /* VUE META */

    /* VUE ROUTER */

    /* VUEX (Mesmo que this.$store) */

    /* FUNCTIONS */

    /* LIFECYCLE */

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */

    /* DATA */
    const hasItems = ref(false)
    const hasError = ref(false)
    const hasSuccess = ref(false)
    const hasWarn = ref(false)
    const hasInfo = ref(false)
    const allowedAlertsTypes = reactive(['error', 'success', 'warn', 'info'])
    const dataList = ref({})
    const errorData = ref([])
    const successData = ref([])
    const warnData = ref([])
    const infoData = ref([])

    /* COMPUTED */

    /* METHODS */
    const closeBaseAlert = () => {
      hasItems.value = false
      hasError.value = false
      hasSuccess.value = false
      hasWarn.value = false
      hasInfo.value = false

      context.emit('close-base-alert', true)
    }
    const filterFormatMsg = value => {
      return `- ${value}`
    }

    /* WATCH */
    watch(props.propData, async value => {
      hasItems.value = false

      hasError.value = false
      errorData.value = []

      hasSuccess.value = false
      successData.value = []

      hasWarn.value = false
      warnData.value = []

      hasInfo.value = false
      infoData.value = []

      const resultIsObject = itIsObject(value)
      const resultIsEmptyObject = isEmptyObject(value)
      const resultObjHasQuantityProperties = objectHasQuantityProperties(value, 4)
      const resultObjectHasArrayKeys = objectHasArrayKeys(value, allowedAlertsTypes.value)

      if (resultIsObject && !resultIsEmptyObject && resultObjHasQuantityProperties && resultObjectHasArrayKeys) {
        if (itIsArray(value.error) && value.error.length) {
          hasError.value = true
          errorData.value = value.error
        }

        if (itIsArray(value.success) && value.success.length) {
          hasSuccess.value = true
          successData.value = value.success
        }

        if (itIsArray(value.warn) && value.warn.length) {
          hasWarn.value = true
          warnData.value = value.warn
        }

        if (itIsArray(value.info) && value.info.length) {
          hasInfo.value = true
          infoData.value = value.info
        }

        hasItems.value = true
      }
    })

    return {
      hasItems,
      hasError,
      hasSuccess,
      hasWarn,
      hasInfo,
      allowedAlertsTypes,
      dataList,
      errorData,
      successData,
      warnData,
      infoData,
      closeBaseAlert,
      filterFormatMsg,
    }
  },
})
</script>

<style lang="scss" scoped>
  .base-alerts {
    font-family: lato;
    text-align: left;
    position: relative;
    z-index: 10000;
    padding: 5px 5px;
    margin-top: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    background-color: #fff;

    .base-alerts__alerts-list {
      color: #fff;
      width: 100%;
      list-style-type: none;
      padding: 0 10px;
      border-radius: 0;

      .base-alerts__alerts-items {
        margin-top: 10px;

        &:last-child {
          margin-bottom: 10px;
        }

        &.base-alerts__error {
          color: #e74c3c;

          .base-alerts__alerts-list--items {
            color: #fff;
            background-color: #e74c3c;
          }
        }

        &.base-alerts__success {
          color: #2ecc71;

          .base-alerts__alerts-list--items {
            color: #fff;
            background-color: #2ecc71;
          }
        }

        &.base-alerts__warn {
          color: #c27c0e;

          .base-alerts__alerts-list--items {
            color: #fff;
            background-color: #c27c0e;
          }
        }

        &.base-alerts__info {
          color: #3498db;

          .base-alerts__alerts-list--items {
            color: #fff;
            background-color: #3498db;
          }
        }

        .base-alerts__alerts-list--title {
          font-weight: 800;
        }
        .base-alerts__alerts-list--items {
          list-style-type: none;
          padding: 10px;
          margin-top: 5px;
          margin-left: 10px;
          margin-right: 25px;
          overflow: hidden;
        }
      }
    }

    .base-alerts__btn-close {
      color: #000;
      font-size: 1em;
      font-weight: 900;
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 4px;
      cursor: pointer;
      border-radius: 100%;
      outline: none;
      border: none;

      &active {
        border-style: outset;
        border: none;
      }
    }
  }
</style>
