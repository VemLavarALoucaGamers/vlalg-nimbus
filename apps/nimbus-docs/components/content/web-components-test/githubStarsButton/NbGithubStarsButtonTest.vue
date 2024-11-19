<template>
  <div class="preview">
    <div class="preview__component">
      <github-stars-button
        ref="githubStarsButton"
        data-repo-owner="VemLavarALoucaGamers"
        data-repo-name="vlalg-nimbus"
        data-show-count="true"
        data-go-repo="true"
      ></github-stars-button>
      <p class="legend">Look at the console to see the triggered event</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const githubStarsButton = ref(null);

onMounted(() => {
  if (import.meta.client) {
    githubStarsButton.value.addEventListener('webcomp-clicked', (event) => {
      const repoOwner = event.target.repoOwner;
      const repoName = event.target.repoName;
      const showCount = event.target.showCount;

      console.log('Here', repoOwner, repoName, showCount);
      console.log('Custom event triggered:', event.detail.message);
    });
  }
});
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
