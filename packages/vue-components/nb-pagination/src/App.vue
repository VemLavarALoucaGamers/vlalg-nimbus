<template>
  <div class="container-fluid test-page">
    <div class="row">
      <div class="col-md-10 col-md-offset-1 test-page__title">
        <h2>Test page</h2>
        <p class="test-page__component-name"><strong>Component:</strong> NbPagination</p>
        <p class="test-page__warning">Warning: Look at the console to see the events</p>
      </div>
    </div>

    <!-- NbPagination - Básico -->
    <div class="row">
      <div class="col-xs-12 col-md-10 col-md-offset-1 test-page__content"
        style="margin-top: 50px; margin-bottom: 50px; overflow: hidden;">
        <h4 class="test-page__content-tile">NbPagination - Básico (Light Theme)</h4>
        
        <NbPagination
          nb-id="pagination-basic-1"
          v-model="currentPage1"
          :total-pages="10"
          theme="light"
          @changed="($event) => console.log('changed:', $event)"
          @page-changed="($event) => console.log('page-changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Básico (Dark Theme)</h4>
        <NbPagination
          nb-id="pagination-basic-2"
          v-model="currentPage2"
          :total-pages="10"
          theme="dark"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Com Ellipsis</h4>
        <NbPagination
          nb-id="pagination-ellipsis-1"
          v-model="currentPage3"
          :total-pages="20"
          theme="light"
          :use-ellipsis="true"
          :max-visible="5"
          :show-first-last="true"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Sem Ellipsis</h4>
        <NbPagination
          nb-id="pagination-no-ellipsis-1"
          v-model="currentPage4"
          :total-pages="5"
          theme="light"
          :use-ellipsis="false"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Sem Animação</h4>
        <NbPagination
          nb-id="pagination-no-animation-1"
          v-model="currentPage5"
          :total-pages="15"
          theme="light"
          :animated="false"
          :max-visible="7"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Com Go To (Input)</h4>
        <NbPagination
          nb-id="pagination-goto-input-1"
          v-model="currentPage6"
          :total-pages="25"
          theme="light"
          :show-go-to="true"
          go-to-type="input"
          go-to-text="Ir para"
          @changed="($event) => console.log('changed:', $event)"
          @go-to-input="($event) => console.log('go-to-input:', $event)"
          @invalid-page="($event) => console.log('invalid-page:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Com Go To (Input + Botão)</h4>
        <NbPagination
          nb-id="pagination-goto-input-button-1"
          v-model="currentPage7"
          :total-pages="30"
          theme="light"
          :show-go-to="true"
          go-to-type="input"
          :show-go-to-button="true"
          go-to-text="Página"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Com Go To (Select)</h4>
        <NbPagination
          nb-id="pagination-goto-select-1"
          v-model="currentPage8"
          :total-pages="15"
          theme="light"
          :show-go-to="true"
          go-to-type="select"
          go-to-text="Selecione"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Sem Botões de Navegação</h4>
        <NbPagination
          nb-id="pagination-no-nav-1"
          v-model="currentPage9"
          :total-pages="10"
          theme="light"
          :show-button-first="false"
          :show-button-preview="false"
          :show-button-next="false"
          :show-button-last="false"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Apenas Texto (Slim)</h4>
        <NbPagination
          nb-id="pagination-slim-1"
          v-model="currentPage10"
          :total-pages="10"
          theme="light"
          :show-number-buttons="false"
          :show-slim-text="true"
          :show-button-first="false"
          :show-button-preview="false"
          :show-button-next="false"
          :show-button-last="false"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Com Border</h4>
        <NbPagination
          nb-id="pagination-border-1"
          v-model="currentPage11"
          :total-pages="10"
          theme="light"
          :has-border="true"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Com Border Radius</h4>
        <NbPagination
          nb-id="pagination-radius-1"
          v-model="currentPage12"
          :total-pages="10"
          theme="light"
          :button-border-radius="0.5"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Custom Gaps</h4>
        <NbPagination
          nb-id="pagination-gaps-1"
          v-model="currentPage13"
          :total-pages="10"
          theme="light"
          :gap="20"
          :gap-buttons="8"
          :gap-numbers="6"
          :spacing-numbers="12"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Custom Colors (Light)</h4>
        <NbPagination
          nb-id="pagination-colors-light-1"
          v-model="currentPage14"
          :total-pages="10"
          theme="light"
          light-bg-color="#e3f2fd"
          light-bg-color-hover="#bbdefb"
          light-active-bg-color="#2196f3"
          light-active-text-color="#ffffff"
          light-text-color="#1976d2"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Custom Colors (Dark)</h4>
        <NbPagination
          nb-id="pagination-colors-dark-1"
          v-model="currentPage15"
          :total-pages="10"
          theme="dark"
          dark-bg-color="#1a237e"
          dark-bg-color-hover="#283593"
          dark-active-bg-color="#3949ab"
          dark-active-text-color="#ffffff"
          dark-text-color="#9fa8da"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Custom Fonts</h4>
        <NbPagination
          nb-id="pagination-fonts-1"
          v-model="currentPage16"
          :total-pages="10"
          theme="light"
          font-family="'Arial', sans-serif"
          fontSize="1.3em"
          :font-weight="600"
          fontSize-icon="1.6em"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Disabled</h4>
        <NbPagination
          nb-id="pagination-disabled-1"
          v-model="currentPage17"
          :total-pages="10"
          theme="light"
          :disabled="true"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Muitas Páginas (Max Visible)</h4>
        <NbPagination
          nb-id="pagination-max-visible-1"
          v-model="currentPage18"
          :total-pages="50"
          theme="light"
          :max-visible="7"
          :use-ellipsis="true"
          :show-first-last="true"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Poucas Páginas Visíveis</h4>
        <NbPagination
          nb-id="pagination-min-visible-1"
          v-model="currentPage19"
          :total-pages="20"
          theme="light"
          :max-visible="3"
          :use-ellipsis="true"
          @changed="($event) => console.log('changed:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Eventos Especiais</h4>
        <NbPagination
          nb-id="pagination-events-1"
          v-model="currentPage20"
          :total-pages="10"
          theme="light"
          @changed="($event) => console.log('changed:', $event)"
          @page-changed="($event) => console.log('page-changed:', $event)"
          @first-page="($event) => console.log('first-page:', $event)"
          @last-page="($event) => console.log('last-page:', $event)"
          @invalid-page="($event) => console.log('invalid-page:', $event)"
        />

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Com Slot Slim Text</h4>
        <NbPagination
          nb-id="pagination-slot-slim-1"
          v-model="currentPage21"
          :total-pages="10"
          theme="light"
          :show-number-buttons="false"
          :show-slim-text="true"
          :show-button-first="false"
          :show-button-preview="false"
          :show-button-next="false"
          :show-button-last="false"
          @changed="($event) => console.log('changed:', $event)"
        >
          <template #slim-text="{ infos }">
            <span style="font-weight: bold;">Página {{ infos.currentPage }} de {{ infos.totalPages }}</span>
          </template>
        </NbPagination>

        <h4 class="test-page__content-tile" style="margin-top: 40px;">NbPagination - Com Slot Go To Select</h4>
        <NbPagination
          nb-id="pagination-slot-goto-1"
          v-model="currentPage22"
          :total-pages="15"
          theme="light"
          :show-go-to="true"
          go-to-type="select"
          @changed="($event) => console.log('changed:', $event)"
        >
          <template #go-to-select="{ infos, goToChangedSelect }">
            <span style="margin-right: 8px;">Ir para página:</span>
            <select
              :value="infos.currentPage"
              @change="goToChangedSelect"
              :disabled="infos.disabled"
              style="padding: 4px 8px; border-radius: 4px;"
            >
              <option
                v-for="i in infos.totalPages"
                :key="i"
                :value="i"
              >
                {{ i }}
              </option>
            </select>
          </template>
        </NbPagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const NbPagination = defineAsyncComponent(() => import('@components/NbPagination.vue'))

// Estados para diferentes exemplos
const currentPage1 = ref(1)
const currentPage2 = ref(5)
const currentPage3 = ref(10)
const currentPage4 = ref(3)
const currentPage5 = ref(8)
const currentPage6 = ref(12)
const currentPage7 = ref(15)
const currentPage8 = ref(7)
const currentPage9 = ref(5)
const currentPage10 = ref(3)
const currentPage11 = ref(4)
const currentPage12 = ref(6)
const currentPage13 = ref(2)
const currentPage14 = ref(5)
const currentPage15 = ref(3)
const currentPage16 = ref(7)
const currentPage17 = ref(5)
const currentPage18 = ref(25)
const currentPage19 = ref(10)
const currentPage20 = ref(1)
const currentPage21 = ref(4)
const currentPage22 = ref(8)
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
    overflow: hidden;

    .test-page__content-tile {
      margin-top: 30px;
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 1.4em;
    }
  }
}
</style>
