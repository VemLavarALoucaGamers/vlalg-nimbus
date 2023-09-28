<script setup>
import { inject, onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue'

const $masterTool = inject('$masterTool')

console.log($masterTool.fixNullToNumber()) // 0
console.log($masterTool.fixNullToNumber(null)) // 0
console.log($masterTool.fixNullToNumber(undefined)) // 0
console.log($masterTool.fixNullToNumber(1)) // 1
</script>

<template>
  <div>
    <HelloWorld />
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
