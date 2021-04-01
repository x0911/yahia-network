<template>
  <v-app>
    <app-sidenav></app-sidenav>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <offline-alert v-if="$nuxt.isOffline"></offline-alert>
  </v-app>
</template>

<script>
// Chnage all vuetify css variables to RGBA
const hexToRgb = (h) => {
  let r = 0
  let g = 0
  let b = 0

  if (h.length === 4) {
    r = '0x' + h[1] + h[1]
    g = '0x' + h[2] + h[2]
    b = '0x' + h[3] + h[3]
  } else if (h.length === 7) {
    r = '0x' + h[1] + h[2]
    g = '0x' + h[3] + h[4]
    b = '0x' + h[5] + h[6]
  }
  return `${+r}, ${+g}, ${+b}`
}

const generateRgbVar = (name, color) => {
  const colorRgb = hexToRgb(color)
  if (!colorRgb.includes('NaN')) {
    document.documentElement.style.setProperty(`--v-${name}-rgb`, colorRgb)
  }
}

const createRgbVarsForThemes = (themes) => {
  Object.keys(themes).forEach((tKey) => {
    const theme = themes[tKey]
    Object.keys(theme).forEach((key) => {
      const colors = theme[key]
      if (typeof colors === 'object') {
        Object.keys(colors).forEach((colorKey) => {
          const color = colors[colorKey]
          generateRgbVar(`${key}-${colorKey}`, color)
        })
      } else {
        generateRgbVar(key, colors)
      }
    })
  })
}
export default {
  name: 'AuthLayout',
  components: {
    AppSidenav: () => import('@/components/global/sidenav.vue'),
    OfflineAlert: () => import('@/components/global/offline-alert.vue'),
  },
  data: () => ({}),
  head() {
    return {
      title: 'App',
    }
  },
  mounted() {
    createRgbVarsForThemes(this.$vuetify.theme.themes)
    this.checkPwaUpdates()
  },
  methods: {
    async checkPwaUpdates() {
      const workbox = await window.$workbox
      if (workbox) {
        workbox.addEventListener('installed', (event) => {
          if (event.isUpdate) {
            //
          }
        })
      }
    },
  },
}
</script>
