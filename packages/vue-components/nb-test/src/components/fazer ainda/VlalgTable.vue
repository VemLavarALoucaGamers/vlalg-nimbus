<template>
  <div
    v-if="validData"
    :id="propId"
    class="vlalg-table"
    :class="[theme]"
    :style="[tableMargin]"
  >
    <div class="vlalg-table__table">
      <table
        class="vlalg-table__table-tb tb-normal"
        :class="[borderClass, theme]"
      >
        <caption
          v-if="propCaption"
          class="vlalg-table__table-tb-caption"
          :style="[captionPosition, captionDirection]"
        >
          {{ propCaption }}
        </caption>

        <thead class="vlalg-table__table-tb-head">
          <tr class="vlalg-table__table-tb-head-tr">
            <th
              v-for="(title, index) in propFields"
              :key="index"
              class="vlalg-table__table-tb-head-th"
              :style="[titleAlign, titleTransform, titleStyle, titleBold]"
            >
              <a
                v-if="propTitleSortable && isAllowSort(title[0])"
                class="vlalg-table__table-tb-head-th--action"
                :style="[titleSortableColor]"
                @click.prevent="changeSort(title[0])"
              >
                <i
                  v-if="propSortField === title[0]"
                  class="vlalg-table__table-tb-head-th--action-icon"
                  :class="[sortIcon]"
                  :style="[topIcon]"
                ></i>
                <span>{{ title[1] }}</span>
              </a>
              <span
                v-else
                class="vlalg-table__table-tb-head-th--no-action"
              >
                {{ title[1] }}
              </span>
            </th>
          </tr>
        </thead>

        <tbody
          v-if="!propLoading && !propHasError"
          class="vlalg-table__table-tb-body"
        >
          <tr
            v-for="(row, index) in propItems"
            :key="index"
            class="vlalg-table__table-tb-body-tr"
            @click="clickedItem(row)"
          >
            <td
              v-for="(item, indexItem) in row"
              :key="indexItem"
              class="vlalg-table__table-tb-body-td"
              :style="{ 'min-width': setFieldsSize(propFieldsSize[indexItem]), 'white-space': propWhiteSpace }"
            >
              {{ item }}
            </td>
          </tr>
        </tbody>

        <tbody
          v-else-if="propLoading && !propHasError"
          class="vlalg-table__table-tb-loader"
        >
          <tr>
            <td :colspan="propFields.length">
              <VlalgLoader
                :prop-id="`basetableloader-${propId}`"
                :prop-type="propLoaderType"
                :prop-visible="true"
                :prop-theme="baseLoaderTheme"
              />
            </td>
          </tr>
        </tbody>

        <tbody
          v-else-if="!propLoading && propHasError"
          class="vlalg-table__table-tb-error"
        >
          <tr>
            <td
              :colspan="propFields.length"
              class="vlalg-table__table-tb-error-text"
            >
              {{ propErrorMessage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="totalHigher"
      class="vlalg-table__table-tb-navegation"
    >
      <div class="vlalg-table__table-tb-navegation-block">
        <div
          v-if="propRecordCurrentPage > 1"
          class="vlalg-table__table-tb-navegation-left"
        >
          <span
            class="vlalg-table__table-tb-navegation--icon fas fa-angle-double-left"
            @click="goNavegation(1)"
          ></span>
          <span
            class="vlalg-table__table-tb-navegation--icon fas fa-angle-left"
            @click="goNavegation(propRecordCurrentPage - 1)"
          ></span>
        </div>

        <div class="vlalg-table__table-tb-navegation-middle">
          <span class="vlalg-table__table-tb-navegation--text">
            {{ propRecordCurrentPage }} / {{ propRecordPages }}
          </span>
        </div>

        <div
          v-if="propRecordCurrentPage < propRecordPages"
          class="vlalg-table__table-tb-navegation-right"
        >
          <span
            class="vlalg-table__table-tb-navegation--icon fas fa-angle-right"
            @click="goNavegation(propRecordCurrentPage + 1)"
          ></span>
          <span
            class="vlalg-table__table-tb-navegation--icon fas fa-angle-double-right"
            @click="goNavegation(propRecordPages)"
          ></span>
        </div>
      </div>

      <div class="vlalg-table__table-tb-navegation-block">
        <select
          v-model="perPage"
          class="vlalg-table__table-tb-navegation--per-page"
        >
          <option
            v-for="(item, index) in propRecordsPerPage"
            :key="index"
            :value="item"
            :selected="item === propRecordPerPages"
          >
            {{ item }}
          </option>
        </select>

        <div class="vlalg-table__table-tb-navegation-total">
          {{ formatedTotalItems }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, toRefs, computed, watch, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'VlalgTable',
  components: {
    VlalgLoader: defineAsyncComponent(() => import('@components/fragments/VlalgLoader')),
  },
  emits: ['change-sort', 'change-page', 'clicked', 'change-perpage'],
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
    propCaption: {
      type: String,
      default: '',
    },
    propCaptionDirection: {
      type: String,
      default: 'left',
      validator: value => {
        return ['left', 'center', 'right'].indexOf(value) !== -1
      },
    },
    propCaptionPosition: {
      type: String,
      default: 'top',
      validator: value => {
        return ['top', 'bottom'].indexOf(value) !== -1
      },
    },
    propBorder: {
      type: String,
      default: 'none',
      validator: value => {
        return ['none', 'title', 'title-table', 'all'].indexOf(value) !== -1
      },
    },
    propTitleAlign: {
      type: String,
      default: 'left',
      validator: value => {
        return ['left', 'center', 'right'].indexOf(value) !== -1
      },
    },
    propTitleTransform: {
      type: String,
      default: 'none',
      validator: value => {
        return ['none', 'capitalize', 'uppercase', 'lowercase'].indexOf(value) !== -1
      },
    },
    propTitleStyle: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'italic'].indexOf(value) !== -1
      },
    },
    propTitleBold: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propTitleSortable: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propTitleSortableColor: {
      type: String,
      default: '#000',
    },
    propFields: {
      type: Array,
      default: () => {
        return []
      },
      validator: value => {
        let validValue = true
        const valueLength = value.length

        if (!value || !valueLength) validValue = false

        if (validValue) {
          for (let i = 0; i < valueLength; i++) {
            if (
              !Array.isArray(value[i]) &&
              value[i].constructor !== Array &&
              typeof value[i][0] !== 'string' &&
              typeof value[i][1] !== 'string'
            )
              validValue = false
          }
        }

        return validValue
      },
    },
    propFieldsSize: {
      type: Object,
      default: () => {
        return {}
      },
    },
    propFieldsAllowSort: {
      type: Array,
      default: () => {
        return []
      },
      validator: value => {
        let validValue = true
        const valueLength = value.length

        if (!value || !valueLength) validValue = false

        if (validValue) {
          for (let i = 0; i < valueLength; i++) {
            if (typeof value[i] !== 'string') validValue = false
          }
        }

        return validValue
      },
    },
    propReturnField: {
      type: String,
      default: '',
      required: true,
    },
    propSortType: {
      type: String,
      default: 'asc',
      validator: value => {
        const newValue = value.toLowerCase()

        return ['asc', 'desc'].indexOf(newValue) !== -1
      },
    },
    propSortField: {
      type: String,
      default: '',
      validator: value => {
        return !!value
      },
    },
    propTableMarginTop: {
      type: Number,
      default: 0,
    },
    propTableMarginBottom: {
      type: Number,
      default: 0,
    },
    propTableMarginLeft: {
      type: Number,
      default: 0,
    },
    propTableMarginRight: {
      type: Number,
      default: 0,
    },
    propRecordsPerPage: {
      type: Array,
      default: () => {
        return [5, 7, 10, 15, 20, 25, 50, 100]
      },
      validator: value => {
        let validValue = true
        const valueLength = value.length

        if (!value || !valueLength) validValue = false

        return validValue
      },
    },
    propRecordPerPages: {
      type: Number,
      default: 0,
    },
    propRecordsTotal: {
      type: Number,
      default: 0,
    },
    propRecordCurrentPage: {
      type: Number,
      default: 1,
    },
    propRecordPages: {
      type: Number,
      default: 1,
    },
    propRecordTotalSeparator: {
      type: String,
      default: 'of',
    },
    propLoading: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propLoaderType: {
      type: String,
      default: 'bars',
      validator: value => {
        return (
          [
            'bars',
            'water-drop',
            'coin',
            'circle-lines',
            'solar',
            'dots',
            'leds',
            'snake',
            'zoom-ball',
            'train',
            'ring',
            'partial-ring',
          ].indexOf(value) !== -1
        )
      },
    },
    propTheme: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'primary', 'success', 'info', 'danger', 'warn', 'dark', 'light'].indexOf(value) !== -1
      },
    },
    propItems: {
      type: Array,
      default: () => {
        return []
      },
    },
    propHasError: {
      type: Boolean,
      default: false,
      validator: value => {
        return [true, false].indexOf(value) !== -1
      },
    },
    propErrorMessage: {
      type: String,
      default: 'Mensagem Padrão',
    },
    propWhiteSpace: {
      type: String,
      default: 'normal',
      validator: value => {
        return ['normal', 'nowrap'].indexOf(value) !== -1
      },
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
    onMounted(() => {
      initialType.value = propSortType.value

      startPerPage()
    })

    /* VUEX ACTIONS */

    /* VUEX MUTATIONS */

    /* VUEX GETTERS */

    /* VUEX STATES */

    /* PROPS */
    const {
      propSortType,
      propSortField,
      propFields,
      propReturnField,
      propFieldsAllowSort,
      propCaptionPosition,
      propBorder,
      propTitleAlign,
      propTitleTransform,
      propTitleStyle,
      propTitleBold,
      propTitleSortableColor,
      propTableMarginTop,
      propTableMarginBottom,
      propTableMarginLeft,
      propTableMarginRight,
      propRecordsTotal,
      propRecordCurrentPage,
      propRecordPages,
      propRecordPerPages,
      propRecordsPerPage,
      propRecordTotalSeparator,
      propTheme,
      propCaptionDirection,
    } = toRefs(props)

    /* DATA */
    const initialType = ref('')
    const perPage = ref(0)

    /* COMPUTED */
    const validData = computed(() => {
      const validField =
        itIsArray(propFields.value) && propFields.value.length && propReturnField.value && propFields.value
      const validFieldsAllowSort = itIsArray(propFieldsAllowSort.value) && propFieldsAllowSort.value.length
      const validSortField = !!propSortField.value && propFieldsAllowSort.value.includes(propSortField.value)

      if (validField && validFieldsAllowSort && validSortField) return true

      return false
    })

    const captionPosition = computed(() => {
      return {
        'caption-side': propCaptionPosition.value,
      }
    })

    const captionDirection = computed(() => {
      return {
        'text-align': propCaptionDirection.value,
      }
    })

    const borderClass = computed(() => {
      switch (propBorder.value) {
        case 'title':
          return 'vlalg-table__table-tb--border-title'
        case 'title-table':
          return 'vlalg-table__table-tb--border-title vlalg-table__table-tb--border-title-table'
        case 'all':
          return 'vlalg-table__table-tb--border-title vlalg-table__table-tb--border-content'
        default:
          return ''
      }
    })

    const titleAlign = computed(() => {
      return {
        'text-align': propTitleAlign.value,
      }
    })

    const titleTransform = computed(() => {
      let newPadding = '10px 15px'

      if (propTitleTransform.value === 'uppercase') newPadding = '0 15px'

      return {
        'text-transform': propTitleTransform.value,
        padding: newPadding,
      }
    })

    const titleStyle = computed(() => {
      return {
        'font-style': propTitleStyle.value,
      }
    })

    const titleBold = computed(() => {
      return {
        'font-weight': propTitleBold.value ? 'bold' : 'normal',
      }
    })

    const titleSortableColor = computed(() => {
      if (!propTitleSortableColor.value) return {}

      return {
        color: propTitleSortableColor.value,
      }
    })

    const currentSort = computed(() => {
      return propSortType.value.toLowerCase()
    })

    const sortIcon = computed(() => {
      if (currentSort.value === 'asc') return 'fas fa-sort-up'

      return 'fas fa-sort-down'
    })

    const topIcon = computed(() => {
      let top = '3px'

      if (currentSort.value === 'desc') top = '-3px'

      return {
        top: top,
      }
    })

    const tableMargin = computed(() => {
      return {
        'margin-top': `${propTableMarginTop.value}px`,
        'margin-bottom': `${propTableMarginBottom.value}px`,
        'margin-left': `${propTableMarginLeft.value}px`,
        'margin-right': `${propTableMarginRight.value}px`,
      }
    })

    const totalHigher = computed(() => {
      return propRecordsTotal.value >= propRecordsPerPage.value[0]
    })

    const formatedTotalItems = computed(() => {
      const start =
        propRecordCurrentPage.value >= propRecordPages.value
          ? propRecordsTotal.value
          : propRecordPerPages.value * propRecordCurrentPage.value
      const end = propRecordsTotal.value

      return `${start} ${propRecordTotalSeparator.value} ${end}`
    })

    const theme = computed(() => {
      switch (propTheme.value) {
        case 'primary':
          return 'vlalg-table__theme--primary'
        case 'success':
          return 'vlalg-table__theme--success'
        case 'info':
          return 'vlalg-table__theme--info'
        case 'danger':
          return 'vlalg-table__theme--danger'
        case 'warn':
          return 'vlalg-table__theme--warn'
        case 'dark':
          return 'vlalg-table__theme--dark'
        case 'light':
          return 'vlalg-table__theme--light'
        default:
          return 'vlalg-table__theme--normal'
      }
    })

    const baseLoaderTheme = computed(() => {
      const currentTheme = propTheme.value

      if (currentTheme === 'normal' || currentTheme === 'light') return 'dark'

      return 'normal'
    })

    /* METHODS */
    const itIsArray = value => {
      if (Array.isArray(value) && value.constructor === Array) return true

      return false
    }

    const isAllowSort = value => {
      return propFieldsAllowSort.value.includes(value)
    }

    const changeSortType = () => {
      return currentSort.value === 'asc' ? 'desc' : 'asc'
    }

    const changeSort = field => {
      let newCurrentSort = currentSort.value
      let whatsChange = 'type'

      if (propSortField.value !== field) {
        whatsChange = 'typeField'
        newCurrentSort = initialType.value
      } else {
        newCurrentSort = changeSortType()
      }

      context.emit('change-sort', {
        whatsChange: whatsChange,
        value: {
          type: newCurrentSort,
          field: field,
        },
      })
    }

    const goNavegation = event => {
      context.emit('change-page', event)
    }

    const startPerPage = () => {
      perPage.value = propRecordsPerPage.value[0]
    }

    const clickedItem = item => {
      const newFields = propFields.value.map(field => {
        return field[0]
      })

      const returnField = propReturnField.value
      const hasKeys = newFields.includes(returnField)

      if (returnField && hasKeys) context.emit('clicked', item[returnField])
    }

    const setFieldsSize = fieldSize => {
      let defaultFieldSize = 75

      if (fieldSize && fieldSize >= 75) defaultFieldSize = fieldSize

      return `${defaultFieldSize}px`
    }

    /* WATCH */
    watch(perPage, (newValue, oldValue) => {
      if (oldValue !== 0) context.emit('change-perpage', newValue)
    })

    return {
      perPage,
      validData,
      captionPosition,
      captionDirection,
      borderClass,
      titleAlign,
      titleTransform,
      titleStyle,
      titleBold,
      titleSortableColor,
      currentSort,
      sortIcon,
      topIcon,
      tableMargin,
      totalHigher,
      formatedTotalItems,
      theme,
      baseLoaderTheme,
      isAllowSort,
      changeSort,
      goNavegation,
      clickedItem,
      setFieldsSize,
    }
  },
})
</script>

<style lang="scss" scoped>
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

  .vlalg-table {
    .vlalg-table__table {
      overflow: hidden;
      overflow-x: scroll;
      padding-bottom: 5px;

      &::-webkit-scrollbar {
        z-index: 100000000;
        height: 10px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        border-radius: 10px;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
      }

      .vlalg-table__table-tb {
        color: #fff;
        width: 100%;
        border-spacing: 0;
        border: 0;
        border-collapse: collapse;

        .vlalg-table__table-tb-caption {
          margin-bottom: 7px;
        }

        .vlalg-table__table-tb-head {
          vertical-align: middle;
          border-color: inherit;
          display: table-header-group;

          .vlalg-table__table-tb-head-tr {
            .vlalg-table__table-tb-head-th {
              font-weight: normal;
              border: 0;
              border-collapse: collapse;
              padding: 10px 15px;

              .vlalg-table__table-tb-head-th--action {
                color: inherit;
                display: inline-block;
                position: relative;

                &:hover {
                  cursor: pointer;
                  text-decoration: none;
                }

                .vlalg-table__table-tb-head-th--action-icon {
                  font-family: 'FontAwesome';
                  padding-right: 5px;
                  position: relative;
                }
              }
            }
          }
        }
        .vlalg-table__table-tb-body {
          vertical-align: middle;
          border-color: inherit;
          display: table-row-group;

          .vlalg-table__table-tb-body-tr {
            font-size: 0.95em;
            &:hover {
              cursor: pointer;
            }

            .vlalg-table__table-tb-body-td {
              border: 0;
              border-collapse: collapse;
              padding: 5px 15px;
            }
          }
        }
        .vlalg-table__table-tb-footer {
          vertical-align: middle;
          border-color: inherit;
          display: table-footer-group;
        }

        &.vlalg-table__table-tb--border-title {
          &.vlalg-table__table-tb--border-title-table {
            border: 1px solid hsla(0, 0%, 100%, 0.28);
          }

          .vlalg-table__table-tb-head {
            .vlalg-table__table-tb-head-tr {
              .vlalg-table__table-tb-head-th {
                border: 1px solid hsla(0, 0%, 100%, 0.28);
              }
            }
          }
        }

        &.vlalg-table__table-tb--border-content {
          .vlalg-table__table-tb-body {
            .vlalg-table__table-tb-body-tr {
              .vlalg-table__table-tb-body-td {
                border: 1px solid hsla(0, 0%, 100%, 0.28);
              }
            }
          }
        }
      }
    }

    .vlalg-table__table-tb-loader {
      text-align: center;
      padding: 15px 0;
    }

    .vlalg-table__table-tb-error {
      text-align: center;
      .vlalg-table__table-tb-error-text {
        padding: 25px 15px;
      }
    }

    .vlalg-table__table-tb-navegation {
      display: inline-block;
      margin-top: 5px;
      margin-bottom: 10px;

      .vlalg-table__table-tb-navegation-block {
        display: inline-block;
        width: 100%;
        margin-top: 5px;

        .vlalg-table__table-tb-navegation-left {
          display: inline;
        }

        .vlalg-table__table-tb-navegation-middle {
          display: inline;
        }

        .vlalg-table__table-tb-navegation-right {
          display: inline;
        }

        .vlalg-table__table-tb-navegation--icon {
          font-family: 'FontAwesome';
          font-size: 20px;
          font-style: normal;
          margin: 0 10px;

          &:hover {
            cursor: pointer;
          }
        }

        .vlalg-table__table-tb-navegation--text {
          font-size: 18px;
          font-style: normal;
          padding: 0 20px;
          margin: 0 10px;
        }

        .vlalg-table__table-tb-navegation--per-page {
          margin-left: 15px;
          // margin-top: 5px;
          // margin-bottom: 5px;
          // display: block;
        }

        .vlalg-table__table-tb-navegation-total {
          font-size: 18px;
          font-style: normal;
          display: inline;
          margin-left: 15px;
          // margin-left: 5px;
          // display: block;
        }
      }
    }

    // inicio propTheme
    &.vlalg-table__theme--normal {
      .vlalg-table__table {
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px #eaeaea;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #eaeaea;

          &:hover {
            background-color: #f8f8f2;
          }
        }

        .vlalg-table__table-tb {
          background-color: #f8f8f2;
          color: #000;

          .vlalg-table__table-tb-caption {
            color: #eaeaea;
          }

          .vlalg-table__table-tb-head {
            .vlalg-table__table-tb-head-tr {
              .vlalg-table__table-tb-head-th {
                .vlalg-table__table-tb-head-th--action {
                  &:hover {
                    color: #eaeaea;
                  }
                  .vlalg-table__table-tb-head-th--action-icon {
                    color: #eaeaea;
                  }
                }
              }
            }
          }

          .vlalg-table__table-tb-body {
            .vlalg-table__table-tb-body-tr {
              &:hover {
                background-color: #eaeaea;
              }
            }
          }

          &.vlalg-table__table-tb--border-title {
            &.vlalg-table__table-tb--border-title-table {
              border: 1px solid #000;
            }

            .vlalg-table__table-tb-head {
              .vlalg-table__table-tb-head-tr {
                .vlalg-table__table-tb-head-th {
                  border: 1px solid #000;
                }
              }
            }
          }

          &.vlalg-table__table-tb--border-content {
            .vlalg-table__table-tb-body {
              .vlalg-table__table-tb-body-tr {
                .vlalg-table__table-tb-body-td {
                  border: 1px solid #000;
                }
              }
            }
          }
        }
      }

      .vlalg-table__table-tb-navegation {
        .vlalg-table__table-tb-navegation-block {
          .vlalg-table__table-tb-navegation-left {
            color: #f8f8f2;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #f8f8f2;
              }
            }
          }
          .vlalg-table__table-tb-navegation-middle {
            color: #f8f8f2;
            .vlalg-table__table-tb-navegation--text {
              border-left: 2px #f8f8f2 solid;
              border-right: 2px #f8f8f2 solid;
            }
          }
          .vlalg-table__table-tb-navegation-right {
            color: #f8f8f2;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #eaeaea;
              }
            }
          }
          .vlalg-table__table-tb-navegation-total {
            color: #f8f8f2;
          }
        }
      }
    }
    &.vlalg-table__theme--primary {
      .vlalg-table__table {
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px #cf1137;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #cf1137;

          &:hover {
            background-color: #f15574;
          }
        }

        .vlalg-table__table-tb {
          background-color: #f15574;
          color: #fff;

          .vlalg-table__table-tb-caption {
            color: #cf1137;
          }

          .vlalg-table__table-tb-head {
            .vlalg-table__table-tb-head-tr {
              .vlalg-table__table-tb-head-th {
                .vlalg-table__table-tb-head-th--action {
                  &:hover {
                    color: #cf1137;
                  }
                  .vlalg-table__table-tb-head-th--action-icon {
                    color: #cf1137;
                  }
                }
              }
            }
          }

          .vlalg-table__table-tb-body {
            .vlalg-table__table-tb-body-tr {
              &:hover {
                background-color: #cf1137;
              }
            }
          }
        }
      }

      .vlalg-table__table-tb-navegation {
        .vlalg-table__table-tb-navegation-block {
          .vlalg-table__table-tb-navegation-left {
            color: #f15574;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #cf1137;
              }
            }
          }
          .vlalg-table__table-tb-navegation-middle {
            color: #f15574;
            .vlalg-table__table-tb-navegation--text {
              border-left: 2px #f15574 solid;
              border-right: 2px #f15574 solid;
            }
          }
          .vlalg-table__table-tb-navegation-right {
            color: #f15574;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #cf1137;
              }
            }
          }
          .vlalg-table__table-tb-navegation-total {
            color: #f15574;
          }
        }
      }
    }
    &.vlalg-table__theme--success {
      .vlalg-table__table {
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px #2ecc71;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #27ae60;

          &:hover {
            background-color: #2ecc71;
          }
        }

        .vlalg-table__table-tb {
          background-color: #2ecc71;
          color: #fff;

          .vlalg-table__table-tb-caption {
            color: #27ae60;
          }

          .vlalg-table__table-tb-head {
            .vlalg-table__table-tb-head-tr {
              .vlalg-table__table-tb-head-th {
                .vlalg-table__table-tb-head-th--action {
                  &:hover {
                    color: #27ae60;
                  }
                  .vlalg-table__table-tb-head-th--action-icon {
                    color: #27ae60;
                  }
                }
              }
            }
          }

          .vlalg-table__table-tb-body {
            .vlalg-table__table-tb-body-tr {
              &:hover {
                background-color: #27ae60;
              }
            }
          }
        }
      }

      .vlalg-table__table-tb-navegation {
        .vlalg-table__table-tb-navegation-block {
          .vlalg-table__table-tb-navegation-left {
            color: #2ecc71;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #27ae60;
              }
            }
          }
          .vlalg-table__table-tb-navegation-middle {
            color: #2ecc71;
            .vlalg-table__table-tb-navegation--text {
              border-left: 2px #2ecc71 solid;
              border-right: 2px #2ecc71 solid;
            }
          }
          .vlalg-table__table-tb-navegation-right {
            color: #2ecc71;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #27ae60;
              }
            }
          }
          .vlalg-table__table-tb-navegation-total {
            color: #2ecc71;
          }
        }
      }
    }
    &.vlalg-table__theme--info {
      .vlalg-table__table {
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px #3498db;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #2980b9;

          &:hover {
            background-color: #3498db;
          }
        }

        .vlalg-table__table-tb {
          background-color: #3498db;
          color: #fff;

          .vlalg-table__table-tb-caption {
            color: #2980b9;
          }

          .vlalg-table__table-tb-head {
            .vlalg-table__table-tb-head-tr {
              .vlalg-table__table-tb-head-th {
                .vlalg-table__table-tb-head-th--action {
                  &:hover {
                    color: #2980b9;
                  }
                  .vlalg-table__table-tb-head-th--action-icon {
                    color: #2980b9;
                  }
                }
              }
            }
          }

          .vlalg-table__table-tb-body {
            .vlalg-table__table-tb-body-tr {
              &:hover {
                background-color: #2980b9;
              }
            }
          }
        }
      }

      .vlalg-table__table-tb-navegation {
        .vlalg-table__table-tb-navegation-block {
          .vlalg-table__table-tb-navegation-left {
            color: #3498db;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #2980b9;
              }
            }
          }
          .vlalg-table__table-tb-navegation-middle {
            color: #3498db;
            .vlalg-table__table-tb-navegation--text {
              border-left: 2px #3498db solid;
              border-right: 2px #3498db solid;
            }
          }
          .vlalg-table__table-tb-navegation-right {
            color: #3498db;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #2980b9;
              }
            }
          }
          .vlalg-table__table-tb-navegation-total {
            color: #3498db;
          }
        }
      }
    }
    &.vlalg-table__theme--warn {
      .vlalg-table__table {
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px #f1c40f;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #c27c0e;

          &:hover {
            background-color: #f1c40f;
          }
        }
        .vlalg-table__table-tb {
          background-color: #f1c40f;
          color: #fff;

          .vlalg-table__table-tb-caption {
            color: #c27c0e;
          }

          .vlalg-table__table-tb-head {
            .vlalg-table__table-tb-head-tr {
              .vlalg-table__table-tb-head-th {
                .vlalg-table__table-tb-head-th--action {
                  &:hover {
                    color: #c27c0e;
                  }
                  .vlalg-table__table-tb-head-th--action-icon {
                    color: #c27c0e;
                  }
                }
              }
            }
          }

          .vlalg-table__table-tb-body {
            .vlalg-table__table-tb-body-tr {
              &:hover {
                background-color: #c27c0e;
              }
            }
          }
        }
      }

      .vlalg-table__table-tb-navegation {
        .vlalg-table__table-tb-navegation-block {
          .vlalg-table__table-tb-navegation-left {
            color: #f1c40f;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #c27c0e;
              }
            }
          }
          .vlalg-table__table-tb-navegation-middle {
            color: #f1c40f;
            .vlalg-table__table-tb-navegation--text {
              border-left: 2px #f1c40f solid;
              border-right: 2px #f1c40f solid;
            }
          }
          .vlalg-table__table-tb-navegation-right {
            color: #f1c40f;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #c27c0e;
              }
            }
          }
          .vlalg-table__table-tb-navegation-total {
            color: #f1c40f;
          }
        }
      }
    }
    &.vlalg-table__theme--danger {
      .vlalg-table__table {
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px #e74c3c;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #c0392b;

          &:hover {
            background-color: #e74c3c;
          }
        }

        .vlalg-table__table-tb {
          background-color: #e74c3c;
          color: #fff;

          .vlalg-table__table-tb-caption {
            color: #c0392b;
          }

          .vlalg-table__table-tb-head {
            .vlalg-table__table-tb-head-tr {
              .vlalg-table__table-tb-head-th {
                .vlalg-table__table-tb-head-th--action {
                  &:hover {
                    color: #c0392b;
                  }
                  .vlalg-table__table-tb-head-th--action-icon {
                    color: #c0392b;
                  }
                }
              }
            }
          }

          .vlalg-table__table-tb-body {
            .vlalg-table__table-tb-body-tr {
              &:hover {
                background-color: #c0392b;
              }
            }
          }
        }
      }

      .vlalg-table__table-tb-navegation {
        .vlalg-table__table-tb-navegation-block {
          .vlalg-table__table-tb-navegation-left {
            color: #e74c3c;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #e74c3c;
              }
            }
          }
          .vlalg-table__table-tb-navegation-middle {
            color: #e74c3c;
            .vlalg-table__table-tb-navegation--text {
              border-left: 2px #e74c3c solid;
              border-right: 2px #e74c3c solid;
            }
          }
          .vlalg-table__table-tb-navegation-right {
            color: #e74c3c;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #c0392b;
              }
            }
          }
          .vlalg-table__table-tb-navegation-total {
            color: #e74c3c;
          }
        }
      }
    }
    &.vlalg-table__theme--dark {
      .vlalg-table__table {
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px #44475a;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #44475a;

          &:hover {
            background-color: #44475a;
          }
        }

        .vlalg-table__table-tb {
          background-color: #44475a;
          color: #f8f8f2;

          .vlalg-table__table-tb-caption {
            color: #282a36;
          }

          .vlalg-table__table-tb-head {
            .vlalg-table__table-tb-head-tr {
              .vlalg-table__table-tb-head-th {
                .vlalg-table__table-tb-head-th--action {
                  &:hover {
                    color: #282a36;
                  }
                  .vlalg-table__table-tb-head-th--action-icon {
                    color: #282a36;
                  }
                }
              }
            }
          }

          .vlalg-table__table-tb-body {
            .vlalg-table__table-tb-body-tr {
              &:hover {
                background-color: #282a36;
              }
            }
          }
        }
      }

      .vlalg-table__table-tb-navegation {
        .vlalg-table__table-tb-navegation-block {
          .vlalg-table__table-tb-navegation-left {
            color: #44475a;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #44475a;
              }
            }
          }
          .vlalg-table__table-tb-navegation-middle {
            color: #44475a;
            .vlalg-table__table-tb-navegation--text {
              border-left: 2px #44475a solid;
              border-right: 2px #44475a solid;
            }
          }
          .vlalg-table__table-tb-navegation-right {
            color: #44475a;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #282a36;
              }
            }
          }
          .vlalg-table__table-tb-navegation-total {
            color: #44475a;
          }
        }
      }
    }
    &.vlalg-table__theme--light {
      .vlalg-table__table {
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px #eaeaea;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #eaeaea;

          &:hover {
            background-color: #f8f8f2;
          }
        }

        .vlalg-table__table-tb {
          background-color: #f8f8f2;
          color: #000;

          .vlalg-table__table-tb-caption {
            color: #eaeaea;
          }

          .vlalg-table__table-tb-head {
            .vlalg-table__table-tb-head-tr {
              .vlalg-table__table-tb-head-th {
                .vlalg-table__table-tb-head-th--action {
                  &:hover {
                    color: #eaeaea;
                  }
                  .vlalg-table__table-tb-head-th--action-icon {
                    color: #eaeaea;
                  }
                }
              }
            }
          }

          .vlalg-table__table-tb-body {
            .vlalg-table__table-tb-body-tr {
              &:hover {
                background-color: #eaeaea;
              }
            }
          }

          &.vlalg-table__table-tb--border-title {
            &.vlalg-table__table-tb--border-title-table {
              border: 1px solid #000;
            }

            .vlalg-table__table-tb-head {
              .vlalg-table__table-tb-head-tr {
                .vlalg-table__table-tb-head-th {
                  border: 1px solid #000;
                }
              }
            }
          }

          &.vlalg-table__table-tb--border-content {
            .vlalg-table__table-tb-body {
              .vlalg-table__table-tb-body-tr {
                .vlalg-table__table-tb-body-td {
                  border: 1px solid #000;
                }
              }
            }
          }
        }
      }

      .vlalg-table__table-tb-navegation {
        .vlalg-table__table-tb-navegation-block {
          .vlalg-table__table-tb-navegation-left {
            color: #f8f8f2;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #f8f8f2;
              }
            }
          }
          .vlalg-table__table-tb-navegation-middle {
            color: #f8f8f2;
            .vlalg-table__table-tb-navegation--text {
              border-left: 2px #f8f8f2 solid;
              border-right: 2px #f8f8f2 solid;
            }
          }
          .vlalg-table__table-tb-navegation-right {
            color: #f8f8f2;
            .vlalg-table__table-tb-navegation--icon {
              &:hover {
                color: #eaeaea;
              }
            }
          }
          .vlalg-table__table-tb-navegation-total {
            color: #f8f8f2;
          }
        }
      }
    }
    // fim propTheme

    @media screen and (min-width: 375px) {
    }
    @media screen and (min-width: 425px) {
    }
    @media screen and (min-width: 576px) {
      .vlalg-table__table-tb-navegation {
        .vlalg-table__table-tb-navegation-block {
          display: inline-block;
          width: auto;
          margin-top: 0;
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
