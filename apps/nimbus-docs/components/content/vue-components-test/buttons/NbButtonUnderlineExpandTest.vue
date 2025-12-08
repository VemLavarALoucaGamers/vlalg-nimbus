<template>
  <div class="preview">
    <div class="preview__component">
      <NbButtonUnderlineExpand
        nb-id="nb-button-underline-expand-one"
        display="b"
        text-color="rgb(0, 105, 255)"
        text-hover-color="#ffffff"
        border-color="rgb(0, 105, 255)"
        border-hover-color="rgb(20, 51, 214)"
        :border-height="1.5"
        text-align="center"
        :tab-index="0"
        :has-tab-index-enter="true"
        :has-tab-index-space="true"
        aria-label="Botão com underline expandido"
        @clicked="logEvent()"
      >
        <template #content>
          Hover me
        </template>
      </NbButtonUnderlineExpand>
      <p class="legend">Look at the console to see the triggered event</p>
    </div>
  </div>
</template>

<script setup>
const logEvent = () => {
  console.log('clicked');
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

