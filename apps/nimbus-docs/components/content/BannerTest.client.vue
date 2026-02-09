<template>
  <div v-if="show && isVisible === true && isInitialized" class="banner-test">
    <div class="banner-content" :style="{ cursor: normalizedProps.buttonLink && normalizedProps.buttonLink !== '#' ? 'pointer' : 'default' }" @click="goTo">
      <span class="banner-text">
        <span v-if="emojiStart" class="banner-emoji">{{ emojiStart }}</span>
        {{ text }}
        <span v-if="emojiEnd" class="banner-emoji">{{ emojiEnd }}</span>
      </span>
    </div>
    <button v-if="normalizedProps.dismissible" class="banner-close" aria-label="Fechar banner" @click.stop="dismiss">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: true
  },
  text: {
    type: String,
    default: 'New Version 3.2.0 Released!'
  },
  emojiStart: {
    type: String,
    default: '🎉'
  },
  emojiEnd: {
    type: String,
    default: '🎉'
  },
  // Aceita tanto buttonText quanto button-text (kebab-case do MDC)
  buttonText: {
    type: String,
    default: 'Changelog'
  },
  buttonLink: {
    type: String,
    default: '/announcements'
  },
  dismissible: {
    type: [Boolean, String],
    default: true
  },
  storageKey: {
    type: String,
    default: 'banner-v3-0-0-dismissed'
  }
})

// Normalizar props (converter kebab-case e strings para valores corretos)
const normalizedProps = computed(() => {
  const buttonText = props.buttonText || props['button-text'] || 'Buy Now'
  const buttonLink = props.buttonLink || '#'
  const storageKey = props.storageKey || 'banner-test-dismissed'
  
  // Converter dismissible de string para boolean se necessário
  let dismissible = props.dismissible
  if (typeof dismissible === 'string') {
    dismissible = dismissible === 'true' || dismissible === ''
  }
  
  return {
    buttonText,
    buttonLink,
    storageKey,
    dismissible
  }
})

// Inicializar como null - será definido baseado no localStorage
const isVisible = ref(null)
const bannerHeight = ref(36) // Altura do banner em pixels
const isInitialized = ref(false) // Flag para saber se já verificou o localStorage

// Verificar se o banner foi fechado anteriormente e ajustar layout
onMounted(() => {
  if (!process.client) {
    // No SSR, manter como false
    isVisible.value = false
    isInitialized.value = true
    return
  }
  
  // Verificar localStorage
  const dismissed = localStorage.getItem(normalizedProps.value.storageKey)

  if (!props.show) {
    removeBannerSpacing()
    return
  }
  
  if (dismissed === 'true') {
    // Já foi fechado antes, manter como false
    isVisible.value = false
    isInitialized.value = true
    // Garantir que estilos estão removidos
    removeBannerSpacing()
  } else {
    // Não foi fechado antes - mostrar o banner
    isVisible.value = true
    isInitialized.value = true
    nextTick(() => {
      addBannerSpacing()
    })
  }
})

// Adicionar espaçamento quando banner está visível
const addBannerSpacing = () => {
  if (process.client) {
    const header = document.querySelector('#__nuxt header')
    const aside = document.querySelector('#__nuxt aside')
    const main = document.querySelector('#__nuxt main')
    
    if (header) {
      header.style.top = `${bannerHeight.value}px`
      header.style.position = 'fixed'
    }
    
    if (aside) {
      const headerHeight = header?.offsetHeight || 64
      aside.style.top = `${bannerHeight.value + headerHeight}px`
    }
    
    if (main) {
      const headerHeight = header?.offsetHeight || 64
      main.style.marginTop = `${bannerHeight.value + headerHeight}px`
    }
    
    document.documentElement.classList.add('has-banner')
  }
}

// Remover espaçamento quando banner é fechado
const removeBannerSpacing = () => {
  if (!process.client) return
  
  // Função para remover estilos
  const removeStyles = () => {
    const header = document.querySelector('#__nuxt header')
    const aside = document.querySelector('#__nuxt aside')
    const main = document.querySelector('#__nuxt main')
    
    if (header) {
      header.style.removeProperty('top')
      // Só remover position se foi adicionado por nós
      const currentPosition = window.getComputedStyle(header).position
      if (currentPosition === 'fixed') {
        header.style.removeProperty('position')
      }
    }
    
    if (aside) {
      aside.style.removeProperty('top')
    }
    
    if (main) {
      main.style.removeProperty('margin-top')
    }
    
    document.documentElement.classList.remove('has-banner')
  }
  
  // Tentar remover imediatamente
  removeStyles()
  
  // Tentar novamente após um pequeno delay para garantir
  setTimeout(removeStyles, 100)
  setTimeout(removeStyles, 300)
}

const dismiss = (e) => {
  if (!process.client) return
  
  e?.stopPropagation() // Prevenir que o click no botão dispare o goTo
  e?.preventDefault()
  
  // Salvar no localStorage primeiro
  localStorage.setItem(normalizedProps.value.storageKey, 'true')
  
  // Remover estilos ANTES de esconder o banner
  removeBannerSpacing()
  
  // Depois esconder o banner
  isVisible.value = false
  
  // Garantir remoção após o banner ser removido do DOM
  nextTick(() => {
    removeBannerSpacing()
    setTimeout(() => {
      removeBannerSpacing()
    }, 100)
  })
}

const goTo = () => {
  if (normalizedProps.value.buttonLink) {
    window.location.href = normalizedProps.value.buttonLink
  }
}

// Ajustar quando banner muda de visibilidade
watch(isVisible, (newVal, oldVal) => {
  if (!process.client) return
  
  if (newVal === true && oldVal !== true) {
    // Banner foi aberto
    nextTick(() => {
      addBannerSpacing()
    })
  } else if (newVal === false && oldVal === true) {
    // Banner foi fechado - remover estilos imediatamente
    removeBannerSpacing()
    
    // Garantir remoção após alguns ticks
    nextTick(() => {
      removeBannerSpacing()
      setTimeout(() => {
        removeBannerSpacing()
      }, 50)
    })
  }
}, { immediate: false })

// Ajustar quando a rota muda (navegação entre páginas)
const route = useRoute()
watch(() => route.path, () => {
  if (process.client && isVisible.value === true) {
    nextTick(() => {
      addBannerSpacing()
    })
  }
}, { immediate: true })
</script>

<style scoped>
.banner-test {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(26, 214, 255, 1); /* Background com cor primária Nimbus */
  color: rgba(255, 255, 255, 0.9);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(26, 214, 255, 0.3); /* Borda com cor primária Nimbus */
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: center;
  flex-wrap: wrap;
}

.banner-text {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 8px;
  text-shadow: 1px 1px 1px rgb(0 0 0 / 74%);
}

.banner-emoji {
  font-size: 16px;
  display: inline-block;
}

.banner-button {
  background: rgba(26, 214, 255, 0.2); /* Cor primária Nimbus com transparência */
  color: #1AD6FF; /* Cor primária Nimbus */
  padding: 6px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid rgba(26, 214, 255, 0.4);
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(26, 214, 255, 0.2);
}

.banner-button:hover {
  background: rgba(26, 214, 255, 0.3);
  color: #1AD6FF;
  border-color: rgba(26, 214, 255, 0.6);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(26, 214, 255, 0.3);
}

.banner-close {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-left: 16px;
  flex-shrink: 0;
  text-shadow: 1px 1px 1px rgb(0 0 0 / 74%);
}

.banner-close:hover {
  background: rgba(26, 214, 255, 0.15); /* Hover com cor primária Nimbus */
  color: #1AD6FF; /* Cor primária Nimbus */
}

.banner-close:active {
  background: rgba(26, 214, 255, 0.25);
}

/* Responsivo */
@media (max-width: 768px) {
  .banner-test {
    padding: 10px 16px;
  }

  .banner-content {
    gap: 12px;
  }

  .banner-text {
    font-size: 12px;
  }

  .banner-button {
    padding: 5px 12px;
    font-size: 12px;
  }

  .banner-close {
    margin-left: 8px;
  }
}

/* Estilos aplicados via JavaScript quando banner está visível */
:global(html.has-banner) {
  #__nuxt {
    header {
      transition: top 0.3s ease;
    }
    
    aside {
      transition: top 0.3s ease;
    }
    
    main {
      transition: margin-top 0.3s ease;
    }
  }
}
</style>
