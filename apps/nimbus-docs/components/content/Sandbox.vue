<template>
  <div class="sandbox">
    <div class="sandbox__frame">
      <iframe
        v-if="iframeSrc"
        :src="iframeSrc"
        title="Sandbox editor"
        allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; clipboard-read; clipboard-write; usb; serial; xr-spatial-tracking; cross-origin-isolated"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
      />
      <span v-else>Loading Sandbox...</span>
    </div>
    <p v-if="openUrl" class="sandbox__fallback">
      <a :href="openUrl" target="_blank" rel="noopener noreferrer">Open playground in a new tab</a>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  repo: {
    type: String,
    default: ''
  },
  branch: {
    type: String,
    default: ''
  },
  dir: {
    type: String,
    default: ''
  },
  file: {
    type: String,
    default: 'app.vue'
  }
})

const colorMode = useColorMode()

const normalizeStackblitzUrl = (value) => {
  if (!value) {
    return ''
  }

  try {
    const url = new URL(value)

    if (!url.hostname.includes('stackblitz.com')) {
      return value
    }

    url.searchParams.set('embed', '1')
    url.searchParams.set('corp', '1')

    return url.toString()
  } catch {
    return value
  }
}

const iframeSrc = computed(() => {
  if (props.src) {
    return normalizeStackblitzUrl(props.src)
  }

  if (!props.repo) {
    return ''
  }

  const theme = colorMode?.value || 'dark'
  const branch = props.branch || 'main'
  const dir = props.dir || ''
  const file = props.file || 'app.vue'

  return normalizeStackblitzUrl(
    `https://stackblitz.com/github/${props.repo}/tree/${branch}/${dir}?embed=1&file=${file}&theme=${theme}`
  )
})

const openUrl = computed(() => iframeSrc.value)
</script>

<style scoped>
.sandbox {
  width: 100%;
}

.sandbox__frame {
  --sandbox-height: 700px;
  width: 100%;
  height: var(--sandbox-height);
  overflow: hidden;
  border: 1px solid #44475a;
  border-radius: 8px;
  background: #1e1e20;
}

.sandbox iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
}

.sandbox__fallback {
  margin: 8px 0 0;
  font-size: 0.8rem;
  text-align: right;
}

.sandbox__fallback a {
  color: #8be9fd;
}
</style>
