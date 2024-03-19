<template>
  <div class="preview">
    <div class="preview__component">
      <NbCreditCard
        nb-id="nb-credit-card"
        :show-form="true"
        chip-model="two"
        format-mode="two"
        :flip-on-hover="true"
        :form-shadow="true"
        form-input-background="white"
        form-input-border="magenta"
        form-input-active-color="yellow"
        @card-values="setCardValues"
      />
      <p class="legend">Look at the console to see the triggered event</p>
    </div>
  </div>
</template>

<script setup>
const cardValues = ref({});

const setCardValues = ($event) => {
  cardValues.value = $event;
  console.log(cardValues.value);
};
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
