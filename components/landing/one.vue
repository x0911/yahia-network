<template>
  <div class="white mb-16 pb-16">
    <v-sheet
      color="primary"
      dark
      style="position: relative"
      class="overflow-hidden py-16"
    >
      <figure style="position: absolute; top: 0; left: 0; width: 60%">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1246 1078"
        >
          <g opacity=".4">
            <linearGradient
              id="doubleEllipseTopLeftID1"
              gradientUnits="userSpaceOnUse"
              x1="2073.5078"
              y1="1.7251"
              x2="2273.4375"
              y2="1135.5818"
              gradientTransform="matrix(-1 0 0 1 2600 0)"
            >
              <stop offset="0.4976" style="stop-color: #559bff"></stop>
              <stop offset="1" style="stop-color: #377dff"></stop>
            </linearGradient>
            <polygon
              fill="url(#doubleEllipseTopLeftID1)"
              points="519.8,0.6 0,0.6 0,1078 863.4,1078   "
            ></polygon>
            <linearGradient
              id="doubleEllipseTopLeftID2"
              gradientUnits="userSpaceOnUse"
              x1="1717.1648"
              y1="3.779560e-05"
              x2="1717.1648"
              y2="644.0417"
              gradientTransform="matrix(-1 0 0 1 2600 0)"
            >
              <stop offset="1.577052e-06" style="stop-color: #559bff"></stop>
              <stop offset="1" style="stop-color: #377dff"></stop>
            </linearGradient>
            <polygon
              fill="url(#doubleEllipseTopLeftID2)"
              points="519.7,0 1039.4,0.6 1246,639.1 725.2,644   "
            ></polygon>
          </g>
        </svg>
      </figure>
      <figure
        style="
          position: absolute;
          bottom: 0;
          right: 0;
          margin-bottom: -0.4rem;
          width: 100%;
        "
      >
        <svg
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
        >
          <path fill="#fff" d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"></path>
        </svg>
      </figure>
      <v-layout fill-height align-center align-content-center>
        <v-flex offset-1 xs10 sm9 md6 lg4>
          <v-card color="transparent" flat tile class="my-16">
            <vue-typed-js
              :strings="['posts', 'comments', 'reactions']"
              :back-speed="30"
              :back-delay="2500"
              :loop="true"
              :type-speed="90"
            >
              <div
                class="text-h2 font-weight-bold mb-4"
                style="line-height: 1.3em"
              >
                Turn your ideas
                <div>
                  into
                  <span
                    class="text-highlight-secondary warning--text text--lighten-2"
                  >
                    <span class="typing"></span>
                  </span>
                </div>
              </div>
            </vue-typed-js>
            <v-card-text
              style="font-size: 20px; line-height: 1.5em"
              class="px-0 mb-6 white--text"
            >
              I'v had a challenge with my friend about who can create a better
              light-weighted social network resulted in this application.
            </v-card-text>

            <v-card-actions>
              <v-btn
                to="/get-started"
                x-large
                class="px-10"
                color="white"
                light
              >
                Get Started
              </v-btn>
              <v-btn large class="px-4" text>
                How it works
                <v-icon class="ms-2">mdi-play-circle</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-sheet>
    <div class="p-relative mb-6">
      <v-container class="text-center">
        <v-layout justify-center align-center align-content-center>
          <template v-for="(tool, i) in tools">
            <v-flex :key="i">
              <div class="blue-grey--text text--lighten-1">
                <v-icon color="blue-grey lighten-1" class="me-1" x-large
                  >mdi-{{ tool.icon }}</v-icon
                >
                <span class="font-weight-bold">
                  {{ tool.icon }}
                </span>
              </div>
            </v-flex>
          </template>
        </v-layout>
      </v-container>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  data: () => ({
    window: 0,
    credentials: {
      phoneNumber: '',
      code: '',
    },
    tools: [
      { icon: 'nodejs' },
      { icon: 'vuejs' },
      { icon: 'nuxt' },
      { icon: 'vuetify' },
      { icon: 'firebase' },
    ],
    downloadLinks: [
      {
        subtitle: 'Download on the',
        name: 'App Store',
        img: '17.png',
      },
      {
        subtitle: 'Get it on',
        name: 'Google Play',
        img: '16.png',
      },
      {
        subtitle: 'Download for',
        name: 'Windows',
        img: '20.svg',
      },
      {
        subtitle: 'Download for',
        name: 'Macintosh',
        img: '19.png',
      },
    ],
  }),
  mounted() {
    const x = false
    if (!window.recaptchaVerifier && x) {
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
            return true
          },
        }
      )
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId
      })
    }
  },
  methods: {
    async sendVerificationCode() {
      this.$nuxt.$loading.start()
      const fn = await this.$store.dispatch(
        'sendVerificationCode',
        this.credentials.phoneNumber
      )
      this.$nuxt.$loading.finish()
      this.$set(this, 'window', 1)
      console.log('Code Sent: ' + fn)
    },
    async verifyCode() {
      this.$nuxt.$loading.start()
      const fn = await this.$store.dispatch('verifyCode', this.credentials.code)
      this.$nuxt.$loading.finish()
      this.$nextTick(() => {
        this.$router.push('/app')
      })
      console.log('Verify code: ' + fn)
    },
  },
}
</script>
