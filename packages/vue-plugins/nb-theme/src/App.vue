<template>
  <div class="container-fluid test-page">
    <div class="row">
      <div class="col-md-10 col-md-offset-1 test-page__title">
        <h2>Test page</h2>
        <p class="test-page__component-name"><strong>Plugin:</strong> NbTheme</p>
        <p class="test-page__warning">Warning: Look at the console to see the click event</p>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content" style="margin-bottom: 50px; overflow: hidden">
        <p>Using (changeTheme)</p>

        <div style="display: flex; gap: 10px; margin-bottom: 30px;">
          <button @click="updateTheme('dark')">Dark theme</button>
          <button @click="updateTheme('test')">Test theme</button>
          <button @click="updateTheme('default')">Default theme</button>
          <button @click="updateTheme('other')">Others theme</button>
        </div>

        <br/>
        <p>getTheme (theme name): {{ getTheme }}</p>
        <p>getThemeVariableValue: {{ getThemeVariableValue('--bg-color') }}</p>
        <p>getThemeText: {{ getThemeText('subtitle') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'

// Injetando o gerenciador de tema
const changeTheme = inject('$changeTheme');
const getTheme = inject('$getTheme');
const getThemeVariableValue = inject('$getThemeVariableValue');
const getThemeText = inject('$getThemeText');

const updateTheme = (newTheme) => {
  if (changeTheme) changeTheme(newTheme);
};
</script>

<style lang="scss" scoped>
@import '@vlalg-nimbus/bee-css-reset/dist/bee-css-reset.min.css';
@import '@vlalg-nimbus/chameleon-grid-layout/dist/chameleon-grid-layout.min.css';

:global(body) {
  background-color: #181818;
  color: rgba(235, 235, 235, 0.64);
}

.test-page {
  .test-page__title {
    font-family: 'Lato', sans-serif;
    margin-top: 40px;
    margin-bottom: 50px;

    h2 {
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 5px;
    }

    p {
      font-weight: 500;
      font-size: 1.2em;

      &.test-page__component-name {
        margin-bottom: 0px;
      }

      &.test-page__warning {
        font-weight: 700;
        font-size: 1em;
        font-style: italic;
      }
    }
  }

  .test-page__content {
    text-align: left;

    button {
      padding: 5px;
      border-radius: 3px;
    }
  }
}
</style>
