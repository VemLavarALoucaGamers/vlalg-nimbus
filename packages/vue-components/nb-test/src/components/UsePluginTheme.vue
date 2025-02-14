<template>
  <div style="display: flex; gap: 10px; margin-bottom: 30px;">
    <button @click="updateTheme('dark')">Tema Escuro</button>
    <button @click="updateTheme('aaa')">Tema AAA</button>
    <button @click="updateTheme('default')">Tema Padrão</button>

    <p>Tema atual: {{ theme }}</p>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// Injetando o gerenciador de tema
const theme = inject('$theme');
const changeTheme = inject('$changeTheme');

const updateTheme = (newTheme) => {
  if (changeTheme) changeTheme(newTheme);
};
</script>
