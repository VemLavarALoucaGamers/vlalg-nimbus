<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <NbButtonSplitDropdown
          nb-id="nb-button-split-dropdown-one"
          display="b"
          main-button-text="Save"
          :menu-items="menuItems"
          :show-border="true"
          border-color="hsl(220 50% 75%)"
          border-hover-color="hsl(220 75% 50%)"
          :border-radius="0.375"
          :popup-border-radius="0.5"
          button-color="hsl(220 75% 50%)"
          button-hover-color="hsl(220 75% 45%)"
          popup-button-hover-color="hsl(220 75% 40%)"
          text-color="#ffffff"
          text-hover-color="#ffffff"
          popup-text-hover-color="#ffffff"
          :padding-x="1"
          :padding-y="0.2"
          :popup-padding-x="1.5"
          :popup-padding-y="0.4"
          :tab-index="0"
          :has-tab-index-enter="true"
          :has-tab-index-space="true"
          aria-label="Split Button Example"
          @main-clicked="handleMainClick"
          @menu-item-clicked="handleMenuItemClick"
          @clicked="handleClick"
        />
        <NbButtonSplitDropdown
          nb-id="nb-button-split-dropdown-two"
          display="b"
          main-button-text="Save"
          :menu-items="menuItems"
          :show-border="true"
          border-color="hsl(220 50% 75%)"
          border-hover-color="hsl(220 75% 50%)"
          :border-radius="0.375"
          :popup-border-radius="0.5"
          button-color="hsl(220 75% 50%)"
          button-hover-color="hsl(220 75% 45%)"
          popup-button-hover-color="hsl(220 75% 40%)"
          text-color="#ffffff"
          text-hover-color="#ffffff"
          popup-text-hover-color="#ffffff"
          :padding-x="1"
          :padding-y="0.2"
          :popup-padding-x="1.5"
          :popup-padding-y="0.4"
          :tab-index="0"
          :has-tab-index-enter="true"
          :has-tab-index-space="true"
          aria-label="Dropdown Button Example"
          :show-popup-button="false"
          @main-clicked="handleMainClick"
          @menu-item-clicked="handleMenuItemClick"
          @clicked="handleClick"
        />
        <p class="legend">Look at the console to see the triggered events</p>
      </div>
    </div>
    <template #fallback>
      <div class="preview">
        <div class="preview__component">
          <p>Loading component...</p>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { label: 'Save and New', icon: '📄' },
  { label: 'Save and Close', icon: '✅' },
  { label: 'Save as Draft', icon: '💾', disabled: false },
  { label: 'Delete', icon: '🗑️', disabled: true }
])

const handleMainClick = () => {
  console.log('Main button clicked')
}

const handleMenuItemClick = ({ item, index }) => {
  console.log('Menu item clicked:', item, index)
}

const handleClick = (data) => {
  console.log('Button clicked:', data)
}
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  text-align: center;
  position: relative;
  margin: 40px 0;

  .preview__component {
    display: block;
    position: relative;
    width: 50%;
    margin: 0 auto;

    .legend {
      font-size: 0.8em;
      font-style: italic;
      margin: 0;
      margin-top: 10px;
    }
  }
}
</style>

