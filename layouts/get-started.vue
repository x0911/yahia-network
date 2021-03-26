<template>
  <v-app>
    <v-main>
      <div id="recaptcha-container"></div>
      <v-layout fill-height align-center align-content-center>
        <v-flex v-if="$vuetify.breakpoint.lgAndUp" lg4>
          <v-sheet
            dark
            style="top: 0; left: 0; height: 100vh; width: 100%"
            color="#21325b"
          >
            <v-img
              height="100%"
              width="100%"
              :src="require('@/assets/imgs/svg/14.svg')"
            >
              <v-layout
                class="p-relative"
                fill-height
                align-center
                justify-center
                align-content-center
              >
                <div class="text-center">
                  <div>
                    <v-avatar size="150">
                      <app-logo></app-logo>
                    </v-avatar>
                  </div>
                  <div>Yahia Social Network</div>
                  <div class="mt-2 text-caption">
                    Protected by Google reCAPTCHA
                  </div>
                </div>
                <v-bottom-navigation class="transparent" absolute>
                  <v-btn to="/"> Home </v-btn>
                  <v-btn to="/posts"> Posts </v-btn>
                </v-bottom-navigation>
              </v-layout>
            </v-img>
          </v-sheet>
        </v-flex>
        <v-flex offset-lg-2 lg4>
          <div>
            <nuxt />
            <v-container>
              <v-row class="my-6" align="center">
                <v-col>
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="auto"> or </v-col>
                <v-col>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
              <v-row align="center" class="text-center">
                <template v-for="(app, ai) in platforms">
                  <v-col :key="ai">
                    <v-tooltip
                      :color="app.color"
                      :disabled="!app.disabled"
                      top
                      nudge-top="10"
                    >
                      <template #activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          <v-btn
                            :disabled="app.disabled"
                            small
                            height="45"
                            :color="app.color"
                            :dark="!app.disabled"
                            @click="runFun(app.value)"
                          >
                            <v-icon>mdi-{{ app.icon }}</v-icon>
                          </v-btn>
                        </span>
                      </template>
                      <div class="py-2 text-center">
                        <div class="mb-2">
                          <v-icon dark>mdi-{{ app.icon }}</v-icon>
                        </div>
                        <div class="font-weight-medium text-caption mb-2">
                          Sign in with {{ app.title }}
                        </div>
                        <div class="font-weight-light">Coming Soon</div>
                      </div>
                    </v-tooltip>
                  </v-col>
                </template>
              </v-row>
            </v-container>
          </div>
        </v-flex>
      </v-layout>
    </v-main>
    <signin-methods-for-email></signin-methods-for-email>
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
  components: {
    AppLogo: () => import('@/components/global/logo.vue'),
  },
  data: () => ({
    reCaptchaIsSet: false,
    platforms: [
      {
        title: 'Apple',
        icon: 'apple',
        value: 'apple',
        color: 'grey darken-4',
        disabled: true,
      },
      {
        title: 'Github',
        icon: 'github',
        value: 'github',
        color: 'grey darken-4',
      },
      {
        title: 'Google',
        icon: 'google',
        value: 'google',
        color: 'error',
      },
      {
        title: 'Facebook',
        icon: 'facebook',
        value: 'facebook',
        color: 'primary',
      },
      {
        title: 'Twitter',
        icon: 'twitter',
        value: 'twitter',
        color: 'info',
        disabled: true,
      },
      {
        title: 'Yahoo',
        icon: 'yahoo',
        value: 'yahoo',
        color: 'purple',
      },
    ],
  }),
  mounted() {
    createRgbVarsForThemes(this.$vuetify.theme.themes)
    this.setGoogleRecaptcha()
  },
  methods: {
    setGoogleRecaptcha() {
      const that = this
      window.recaptchaVerifier = null
      const intval = setInterval(() => {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new this.$fireModule.auth.RecaptchaVerifier(
            'recaptcha-container',
            {
              size: 'invisible',
              callback: (response) => {
                return true
              },
              'expired-callback': () => {
                // Response expired.
                console.log('recaptcha expired')
                window.recaptchaVerifier = null
                const intval2 = setInterval(() => {
                  that.setGoogleRecaptcha()
                  clearInterval(intval2)
                }, 500)
                return true
              },
            }
          )
          window.recaptchaVerifier.render().then((widgetId) => {
            window.recaptchaWidgetId = widgetId
          })
          clearInterval(intval)
        }
      }, 500)
    },
    runFun(platform) {
      const popup = `${platform}SignInPopup`
      const provider = `${platform}Provider`
      if (this[popup] && this[provider]) {
        return this[popup](this[provider]())
      }
      return true
    },
  },
}
</script>

<style lang="scss">
#recaptcha-container {
  .grecaptcha-badge {
    display: none !important;
  }
}
</style>
