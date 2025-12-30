<template>
  <ClientOnly>
    <div class="preview">
      <div class="preview__component">
        <h3 style="margin-bottom: 20px;">Example of NbImage</h3>
        
        <!-- Exemplo básico -->
        <div style="margin-bottom: 30px;">
          <h4 style="margin-bottom: 10px;">1. Basic (Full Responsive)</h4>
          <NbImage
            nb-id="image-test-basic"
            :image="image"
            responsive-type="full"
            max-width="500px"
            @clicked="handleClick"
          />
        </div>

        <!-- Exemplo com lupa -->
        <div style="margin-bottom: 30px;">
          <h4 style="margin-bottom: 10px;">2. With Magnifier (hover over the image)</h4>
          <NbImage
            nb-id="image-test-magnifier"
            :image="image"
            responsive-type="full"
            max-width="500px"
            :hagnifier-glass="true"
            :hagnifier-glass-zoom="3"
            :hagnifier-glass-size="150"
            @clicked="handleClick"
          />
        </div>

        <!-- Exemplo com preview modal -->
        <div style="margin-bottom: 30px;">
          <h4 style="margin-bottom: 10px;">3. With Preview Modal (click on the image)</h4>
          <NbImage
            nb-id="image-test-preview"
            :image="image"
            responsive-type="full"
            max-width="500px"
            :has-preview="true"
            :has-backdrop-blur="true"
            :backdrop-blur="10"
            :backdrop-r-g-b-color="{ r: 0, g: 0, b: 0 }"
            :backdrop-alpha="0.8"
            controls-bg-color="rgba(0, 0, 0, 0.7)"
            controls-text-color="#ffffff"
            controls-text-color-hover="#4CAF50"
            :controls-border-radius="8"
            @clicked="handleClick"
          />
        </div>

        <!-- Exemplo com diferentes tipos responsivos -->
        <div style="margin-bottom: 30px;">
          <h4 style="margin-bottom: 15px;">4. Responsive types comparison</h4>
          <p style="margin-bottom: 15px; color: #999; font-size: 14px;">
            All images are in 200px containers. See how each type behaves differently:
          </p>
          <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <div style="width: 200px; border: 1px solid #555; padding: 10px; border-radius: 4px;">
              <p style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Full</p>
              <p style="font-size: 11px; color: #999; margin-bottom: 10px;">
                width: 100%<br />
                Scales up and down
              </p>
              <NbImage
                nb-id="image-test-full"
                :image="image"
                responsive-type="full"
                @clicked="handleClick"
              />
            </div>
            <div style="width: 200px; border: 1px solid #555; padding: 10px; border-radius: 4px;">
              <p style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Scale-down</p>
              <p style="font-size: 11px; color: #999; margin-bottom: 10px;">
                max-width: 100%<br />
                Never larger than original
              </p>
              <NbImage
                nb-id="image-test-scale-down"
                :image="image"
                responsive-type="scale-down"
                @clicked="handleClick"
              />
            </div>
            <div style="width: 200px; border: 1px solid #555; padding: 10px; border-radius: 4px;">
              <p style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Restricted</p>
              <p style="font-size: 11px; color: #999; margin-bottom: 10px;">
                width: 100%<br />
                max-width: 200px
              </p>
              <NbImage
                nb-id="image-test-restricted"
                :image="image"
                responsive-type="restricted"
                max-width="200px"
                @clicked="handleClick"
              />
            </div>
          </div>
        </div>
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

const image = ref({
  url: 'https://picsum.photos/id/1/500/500',
  alt: 'Image 1',
  width: 500,
  height: 500
})

const handleClick = () => {
  console.log('Image clicked!')
}

// Component is registered globally via plugin
</script>

<style scoped>
.preview {
  padding: 20px;
  background: #2e2e2e;
  border-radius: 8px;
  margin-bottom: 20px;
}

.preview__component {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.preview__component h3 {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.preview__component h4 {
  width: 100%;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
}

.legend {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>
