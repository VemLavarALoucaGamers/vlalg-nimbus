<template>
  <div class="preview">
    <div class="preview__component">
      <NbCountdown
        nb-id="nb-time-countdown"
        :day="day"
        :month="month"
        :year="year"
        :hour="hour"
        :minute="minute"
        :second="second"
        border-color="white"
        text-color="tomato"
        number-color="white"
        :border="true"
        :separator="true"
        separator-color="white"
        separator-type="/"
        days-text="days"
        hours-text="hours"
        minutes-text="minutes"
        seconds-text="seconds"
        :show-days="true"
        :show-hours="true"
        :show-minutes="true"
        :show-seconds="true"
        :container-width="290"
        :container-height="45"
        @started="countdownEvent('started')"
        @finished="countdownEvent('finished')"
      />
      <p class="legend">Look at the console to see the triggered event</p>
    </div>
  </div>
</template>

<script setup>
const day = ref(19);
const month = ref('nov');
const year = ref(2027);
const hour = ref(1);
const minute = ref(22);
const second = ref(0);

const countdownEvent = (type) => {
  console.log(type);
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
