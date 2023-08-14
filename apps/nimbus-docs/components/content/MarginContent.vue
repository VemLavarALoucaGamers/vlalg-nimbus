<template>
  <div :style="[ marginContent ]" />
</template>

<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 0
  }
})

const { size } = toRefs(props)

const marginContent = computed(() => {
  return {
    height: `${size.value}px`
  }
})
</script>

<style lang="scss" scoped>

</style>
