<template>
  <ul
    class="vlalg-time-line-shipment"
    style=""
  >
    <li
      v-for="(step, index) in steps"
      :key="index"
      class="vlalg-time-line-shipment__items"
    >
      <div
        :class="[
          'vlalg-time-line-shipment__item-icon',
          step.active ? 'vlalg-time-line-shipment__item-icon--active' : '',
        ]"
      >
        <font-awesome-icon :icon="[step.iconClass, step.icon]" />
      </div>

      <div class="vlalg-time-line-shipment__item-separator">
        <div
          :class="[
            'vlalg-time-line-shipment__separator-lines',
            'vlalg-time-line-shipment__separator-lines--one',
            step.active ? 'vlalg-time-line-shipment__separator-line--active' : '',
          ]"
        ></div>
        <div
          :class="[
            'vlalg-time-line-shipment__separator-dot',
            step.active ? 'vlalg-time-line-shipment__separator-dot--active' : '',
          ]"
        ></div>
        <div
          v-if="index !== lastItem"
          :class="[
            'vlalg-time-line-shipment__separator-lines',
            'vlalg-time-line-shipment__separator-lines--two',
            nextStatus(index) ? 'vlalg-time-line-shipment__separator-line--active' : '',
          ]"
        ></div>
      </div>

      <div :class="['vlalg-time-line-shipment__item-text']">
        <p style="">
          {{ step.description }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import { defineComponent, toRefs, computed } from 'vue'

export default defineComponent({
  name: 'VlalgTimeLineHorizontal',
  components: {},
  emits: [],
  props: {
    steps: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  setup (props) {
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
    const { steps } = toRefs(props)

    /* DATA */

    /* COMPUTED */
    const lastItem = computed(() => {
      return steps.value.length - 1
    })

    /* METHODS */
    const nextStatus = current => {
      if (lastItem.value === current) return false

      const nextIndex = current + 1
      const nextStep = steps.value[nextIndex].active

      return nextStep
    }

    /* WATCH */

    return {
      lastItem,
      nextStatus,
    }
  },
})
</script>

<style lang="scss" scoped>
  .vlalg-time-line-shipment {
    position: relative;
    display: inline-block;
    min-width: 230px;
    max-height: 105px;

    .vlalg-time-line-shipment__items {
      width: 65px;
      display: inline;
      position: relative;
      list-style-type: none;
      float: left;
      text-align: center;

      .vlalg-time-line-shipment__item-icon {
        position: relative;
        color: #d1d1d1;

        &.vlalg-time-line-shipment__item-icon--active {
          color: #d04363;
        }
      }

      .vlalg-time-line-shipment__item-separator {
        position: relative;
        margin-top: 5px;
        margin-bottom: 5px;
        height: 26px;

        .vlalg-time-line-shipment__separator-dot {
          width: 15px;
          height: 15px;
          background: #d1d1d1;
          border-radius: 50%;
          position: absolute;
          left: 39%;
          top: 5px;
          z-index: 1;

          &.vlalg-time-line-shipment__separator-dot--active {
            background: transparent;
            border: 3px solid #d04363;
          }
        }
        .vlalg-time-line-shipment__separator-lines {
          height: 3px;
          position: relative;
          margin-top: 11px;
          background: #d1d1d1;

          &.vlalg-time-line-shipment__separator-line--active {
            background: #d04363;
          }

          &.vlalg-time-line-shipment__separator-lines--one {
            width: 41%;
            float: left;
          }

          &.vlalg-time-line-shipment__separator-lines--two {
            width: 40%;
            float: right;
          }
        }
      }

      .vlalg-time-line-shipment__item-text {
        margin-bottom: 0;
        font-size: 0.7em;
        line-height: 15px;
      }
    }

    @media screen and (min-width: 375px) {
      .vlalg-time-line-shipment__items {
        width: 75px;

        .vlalg-time-line-shipment__item-separator {
          .vlalg-time-line-shipment__separator-lines {
            &.vlalg-time-line-shipment__separator-lines--two {
              width: 44%;
            }
          }
        }

        .vlalg-time-line-shipment__item-text {
          font-size: 0.8em;
          line-height: 17px;
        }
      }
    }
    @media screen and (min-width: 425px) {
      .vlalg-time-line-shipment__items {
        width: 90px;

        .vlalg-time-line-shipment__item-text {
          font-size: 0.9em;
          line-height: 19px;
        }
      }
    }
    @media screen and (min-width: 576px) {
      .vlalg-time-line-shipment__items {
        width: 100px;

        .vlalg-time-line-shipment__item-separator {
          .vlalg-time-line-shipment__separator-lines {
            &.vlalg-time-line-shipment__separator-lines--two {
              width: 47%;
            }
          }
        }

        .vlalg-time-line-shipment__item-text {
          font-size: 1em;
        }
      }
    }
    @media screen and (min-width: 768px) {
    }
    @media screen and (min-width: 1024px) {
    }
    @media screen and (min-width: 1600px) {
    }
  }
</style>
