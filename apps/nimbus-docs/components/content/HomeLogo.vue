<template>
  <div class="logo-content">
    <div class="image-bg" />
    <img src="/nimbus_logo.png" alt="" class="image-img">
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.logo-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transform: translate(0px, 0px);
  position: relative;
  height: 255px;

  .image-bg {
    width: 320px;
    height: 320px;
    position: absolute;
    top: 37%;
    left: 50%;
    border-radius: 50%;
    background-image: linear-gradient(0deg, #3544FC 36%, #41D1FF 50%);
    filter: blur(160px);
    transform: translate(-50%, -50%);
  }

  .image-img {
    width: 285px;
    position: absolute;
    top: 0;
  }
}

@media screen and (min-width: 1024px) {
  .logo-content {
    transform: translate(-32px,-32px);
    height: 300px;

    .image-bg {
      top: 60%;
    }

    .image-img {
      width: 380px;
      max-width: 380px;
      top: 70px;
    }
  }
}
</style>
