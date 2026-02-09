# nb-pagination

This is a pagination component for [Vue.js 3+](https://vuejs.org/).

## Installation

::code-group
  ```bash [Yarn]
  yarn add @vlalg-nimbus/nb-pagination
  ```
  ```bash [NPM]
  npm install @vlalg-nimbus/nb-pagination
  ```
::

## Usage

::code-group
  ```js [Vue 3]
  import { createApp } from 'vue'
  import App from './App.vue'

  import NbPaginationComponents from '@vlalg-nimbus/nb-pagination'
  import "@vlalg-nimbus/nb-pagination/dist/style.css";

  const app = createApp(App)
  app.use(NbPaginationComponents)
  app.mount('#app')
  ```
  ```js [Nuxt 3]
  import NbPaginationComponents from '@vlalg-nimbus/nb-pagination'
  import "@vlalg-nimbus/nb-pagination/dist/style.css";
  
  export default defineNuxtPlugin(context => {
    context.vueApp.use(NbPaginationComponents)
  })
  ```
::

To use, simply call the component, in this case it will be `NbPagination` or `nb-pagination`.

::code-group
  ```js [Mode 1]
  <template>
    <NbPagination 
      nb-id="pagination-1"
      v-model="currentPage"
      :total-pages="12"
    />
  </template>
  ```
  ```js [Mode 2]
  <template>
    <nb-pagination 
      nb-id="pagination-1"
      v-model="currentPage"
      :total-pages="12"
    />
  </template>
  ```
  ```js [Mode 3]
  <template>
    <nb-pagination 
      nb-id="pagination-1"
      v-model="currentPage"
      :total-pages="12"
    ></nb-pagination>
  </template>
  ```
::

## Props

> Items with an (*) mean they are required

| name    | Value type | Default | Description |
| ------- | :--------- | :------ | :---------------------------- |
| nbId (*)    | String     |        | Sets the id attribute to differentiate from other components |
| modelValue (*)    | Number     |        | Current page number (v-model) |
| totalPages (*)    | Number     |        | Total number of pages |
| gap     | Number     | 12    | Gap between pagination and "Go to" section in pixels |
| gapGoTo     | Number     | 9    | Gap between elements in "Go to" section in pixels |
| fontFamily     | String     | "'Lato', sans-serif"    | Font family for general buttons and elements |
| fontSize     | String     | '1.1em'    | Font size for general buttons and elements |
| fontWeight     | Number     | 400    | Font weight for general buttons and elements |
| fontFamilyText     | String     | "'Lato', sans-serif"    | Font family for text elements (e.g., "Go to" label) |
| fontSizeText     | String     | '1.2em'    | Font size for text elements |
| fontWeightText     | Number     | 400    | Font weight for text elements |
| fontFamilyIcon     | String     | "'Lato', sans-serif"    | Font family for navigation icons (‹‹, ‹, ›, ››) |
| fontSizeIcon     | String     | '1.4em'    | Font size for navigation icons |
| fontWeightIcon     | Number     | 400    | Font weight for navigation icons |
| useEllipsis     | Boolean     | true    | Enables/disables ellipsis ("...") when there are many pages |
| animated     | Boolean     | true    | Enables animation style similar to Instagram/Reels when pages change |
| maxVisible     | Number     | 5    | Maximum number of visible page number buttons in the center region |
| showFirstLast     | Boolean     | true    | Shows first and last page buttons when ellipsis is active |
| showNumberButtons     | Boolean     | true    | Shows page number buttons |
| showSlimText     | Boolean     | false    | Shows a slim text display (e.g., "1/12") instead of number buttons |
| showButtonFirst     | Boolean     | true    | Shows the "first page" button (‹‹) |
| showButtonPreview     | Boolean     | true    | Shows the "previous page" button (‹) |
| showButtonNext     | Boolean     | true    | Shows the "next page" button (›) |
| showButtonLast     | Boolean     | true    | Shows the "last page" button (››) |
| gapButtons     | Number     | 4    | Gap between navigation buttons in pixels |
| gapNumbers     | Number     | 4    | Gap between page number buttons in pixels |
| spacingNumbers     | Number     | 8    | Horizontal spacing (left and right) for page number buttons in pixels |
| buttonBorderRadius     | Number     | 0    | Border radius for buttons in rem units |
| showGoTo     | Boolean     | false    | Shows the "Go to" section (input or select) |
| goToText     | String     | 'Go to'    | Text label for the "Go to" section |
| goToType     | String     | 'input'    | Type of "Go to" control. Accepts **input** and **select** |
| goToInputWidth     | Number     | 40    | Width of the "Go to" input in pixels |
| goToSelectWidth     | Number     | 60    | Width of the "Go to" select in pixels |
| showGoToButton     | Boolean     | false    | Shows the "Go" button next to the input |
| goToTextMargin     | String     | '0 8px 0 0'    | Margin for the "Go to" text label |
| disabled     | Boolean     | false    | Disables the entire pagination component |
| theme     | String     | 'light'    | Defines the theme. Accepts **light** and **dark** |
| hasBorder     | Boolean     | false    | Enables borders on buttons |
| lightBgColor     | String     | '#eeeeee'    | Background color for buttons in light theme |
| lightBgColorHover     | String     | '#eaeaea'    | Background color for buttons on hover in light theme |
| lightBorderColor     | String     | '#d0d0d0'    | Border color for buttons in light theme |
| lightTextColor     | String     | '#000000'    | Text color for buttons in light theme |
| lightTextColorHover     | String     | null    | Text color for buttons on hover in light theme. If `null`, uses `lightTextColor` |
| lightActiveBgColor     | String     | '#e0e0e0'    | Background color for active page button in light theme |
| lightActiveTextColor     | String     | '#000000'    | Text color for active page button in light theme |
| lightEllipsisColor     | String     | null    | Color for ellipsis ("...") in light theme. If `null`, uses `lightActiveBgColor` |
| lightEllipsisOpacity     | Number     | 1    | Opacity for ellipsis in light theme (0-1) |
| lightDisabledOpacity     | Number     | 0.4    | Opacity for disabled buttons in light theme (0-1) |
| darkBgColor     | String     | '#353734'    | Background color for buttons in dark theme |
| darkBgColorHover     | String     | '#272936'    | Background color for buttons on hover in dark theme |
| darkBorderColor     | String     | '#555555'    | Border color for buttons in dark theme |
| darkTextColor     | String     | '#ffffff'    | Text color for buttons in dark theme |
| darkTextColorHover     | String     | null    | Text color for buttons on hover in dark theme. If `null`, uses `darkTextColor` |
| darkActiveBgColor     | String     | '#555555'    | Background color for active page button in dark theme |
| darkActiveTextColor     | String     | '#ffffff'    | Text color for active page button in dark theme |
| darkEllipsisColor     | String     | null    | Color for ellipsis ("...") in dark theme. If `null`, uses `darkActiveBgColor` |
| darkEllipsisOpacity     | Number     | 1    | Opacity for ellipsis in dark theme (0-1) |
| darkDisabledOpacity     | Number     | 0.4    | Opacity for disabled buttons in dark theme (0-1) |
| lightGoToButtonBgColor     | String     | null    | Background color for "Go" button in light theme. If `null`, uses `lightBgColor` |
| lightGoToButtonTextColor     | String     | null    | Text color for "Go" button in light theme. If `null`, uses `lightTextColor` |
| lightGoToButtonBgColorHover     | String     | null    | Background color for "Go" button on hover in light theme. If `null`, uses `lightBgColorHover` |
| lightGoToButtonTextColorHover     | String     | null    | Text color for "Go" button on hover in light theme. If `null`, uses `lightGoToButtonTextColor` |
| darkGoToButtonBgColor     | String     | null    | Background color for "Go" button in dark theme. If `null`, uses `darkBgColor` |
| darkGoToButtonTextColor     | String     | null    | Text color for "Go" button in dark theme. If `null`, uses `darkTextColor` |
| darkGoToButtonBgColorHover     | String     | null    | Background color for "Go" button on hover in dark theme. If `null`, uses `darkBgColorHover` |
| darkGoToButtonTextColorHover     | String     | null    | Text color for "Go" button on hover in dark theme. If `null`, uses `darkGoToButtonTextColor` |
| lightGoToTextColor     | String     | '#000000'    | Text color for "Go to" label in light theme |
| darkGoToTextColor     | String     | '#000000'    | Text color for "Go to" label in dark theme |

## Events

### update:modelValue

Fired when the current page changes (required for v-model binding).

**Returns:**
- `Number` - The new page number

**Example:**
```javascript
{
  // Emitted value: 5 (when user navigates to page 5)
}
```

---

### changed

Fired when the current page changes (alternative to `update:modelValue`).

**Returns:**
- `Number` - The new page number

**Example:**
```javascript
{
  // Emitted value: 5 (when user navigates to page 5)
}
```

---

### page-changed

Fired when the current page changes, providing detailed information about the change.

**Returns:**
```javascript
{
  previousPage: Number,    // Previous page number
  currentPage: Number      // New page number
}
```

**Example:**
```javascript
{
  previousPage: 3,
  currentPage: 5
}
```

---

### go-to-input

Fired when the user types in the "Go to" input field.

**Returns:**
```javascript
{
  value: String,           // Numeric value (cleaned, only digits)
  rawValue: String         // Original value typed by user
}
```

**Example:**
```javascript
{
  value: "12",             // Cleaned numeric value
  rawValue: "12a"          // Original input (non-numeric chars removed)
}
```

---

### invalid-page

Fired when the user attempts to navigate to an invalid page (outside the valid range).

**Returns:**
```javascript
{
  page: Number,            // The invalid page number attempted
  min: Number,             // Minimum valid page (always 1)
  max: Number              // Maximum valid page (totalPages)
}
```

**Example:**
```javascript
{
  page: 15,                // User tried to go to page 15
  min: 1,                  // Minimum valid page
  max: 12                  // Maximum valid page
}
```

---

### first-page

Fired when the user navigates to the first page.

**Returns:**
- `Number` - The current page number (always 1)

**Example:**
```javascript
{
  // Emitted value: 1 (when user navigates to first page)
}
```

---

### last-page

Fired when the user navigates to the last page.

**Returns:**
- `Number` - The current page number (equals totalPages)

**Example:**
```javascript
{
  // Emitted value: 12 (when user navigates to last page, assuming totalPages is 12)
}
```

## Slots

### slim-text

Custom slot for displaying custom text when `showSlimText` is `true`.

**Slot Props:**
```javascript
{
  currentPage: Number,     // Current page number
  totalPages: Number       // Total number of pages
}
```

**Example:**
```vue
<template #slim-text="{ infos }">
  <span>Página {{ infos.currentPage }}/{{ infos.totalPages }}</span>
</template>
```

---

### go-to-select

Custom slot for the "Go to" select dropdown when `goToType="select"`.

**Slot Props:**
```javascript
{
  currentPage: Number,           // Current page number
  totalPages: Number,            // Total number of pages
  disabled: Boolean,             // Whether the component is disabled
  goToChangedSelect: Function    // Function to call when selection changes
}
```

**Example:**
```vue
<template #go-to-select="{ infos }">
  <select @change="infos.goToChangedSelect" :disabled="infos.disabled">
    <option
      v-for="i in infos.totalPages"
      :key="i"
      :value="i"
      :selected="i === infos.currentPage"
    >
      {{ i }}
    </option>
  </select>
  <span> de {{ infos.totalPages }}</span>
</template>
```

## Examples

### Basic Usage

```vue
<template>
  <NbPagination
    nb-id="pagination-1"
    v-model="currentPage"
    :total-pages="12"
  />
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
</script>
```

### With Custom Theme

```vue
<template>
  <NbPagination
    nb-id="pagination-2"
    v-model="currentPage"
    :total-pages="12"
    theme="dark"
  />
</template>
```

### With "Go to" Input

```vue
<template>
  <NbPagination
    nb-id="pagination-3"
    v-model="currentPage"
    :total-pages="12"
    :show-go-to="true"
    :show-go-to-button="true"
  />
</template>
```

### With Custom Colors

```vue
<template>
  <NbPagination
    nb-id="pagination-4"
    v-model="currentPage"
    :total-pages="12"
    theme="light"
    light-bg-color="#e3f2fd"
    light-active-bg-color="#1976d2"
    light-active-text-color="#ffffff"
    light-ellipsis-color="#1976d2"
  />
</template>
```

### With Event Handlers

```vue
<template>
  <NbPagination
    nb-id="pagination-5"
    v-model="currentPage"
    :total-pages="12"
    @changed="handlePageChange"
    @page-changed="handlePageChanged"
    @go-to-input="handleGoToInput"
    @invalid-page="handleInvalidPage"
    @first-page="handleFirstPage"
    @last-page="handleLastPage"
  />
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)

const handlePageChange = (page) => {
  console.log('Page changed to:', page)
}

const handlePageChanged = ({ previousPage, currentPage }) => {
  console.log(`Page changed from ${previousPage} to ${currentPage}`)
}

const handleGoToInput = ({ value, rawValue }) => {
  console.log('User typed:', value, 'Original:', rawValue)
}

const handleInvalidPage = ({ page, min, max }) => {
  console.warn(`Invalid page ${page}. Valid range: ${min}-${max}`)
}

const handleFirstPage = (page) => {
  console.log('Reached first page:', page)
}

const handleLastPage = (page) => {
  console.log('Reached last page:', page)
}
</script>
```

### With Custom Slot

```vue
<template>
  <NbPagination
    nb-id="pagination-6"
    v-model="currentPage"
    :total-pages="12"
    :show-slim-text="true"
  >
    <template #slim-text="{ infos }">
      <span>Página {{ infos.currentPage }} de {{ infos.totalPages }}</span>
    </template>
  </NbPagination>
</template>
```

### With Custom "Go to" Select

```vue
<template>
  <NbPagination
    nb-id="pagination-7"
    v-model="currentPage"
    :total-pages="12"
    :show-go-to="true"
    go-to-type="select"
  >
    <template #go-to-select="{ infos }">
      <select @change="infos.goToChangedSelect" :disabled="infos.disabled">
        <option
          v-for="i in infos.totalPages"
          :key="i"
          :value="i"
          :selected="i === infos.currentPage"
        >
          {{ i }}
        </option>
      </select>
      <span> de {{ infos.totalPages }}</span>
    </template>
  </NbPagination>
</template>
```


