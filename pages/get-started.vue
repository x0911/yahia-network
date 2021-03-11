<template>
  <v-layout fill-height align-center align-content-center>
    <v-flex lg4>
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
                  <lazy-global-logo></lazy-global-logo>
                </v-avatar>
              </div>
              <div>Yahia Social Network</div>
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
      <v-card tile flat>
        <v-card-title class="mb-1 text-h5 font-weight-medium">
          Welcome back
        </v-card-title>
        <v-card-subtitle class="text-body-2">
          Login to manage your account
        </v-card-subtitle>
        <v-card-text class="pt-6">
          <template v-for="(field, i) in login.fields">
            <div :key="i">
              <div class="mb-1 font-weight-medium text--primary">
                {{ field.label }}
              </div>
              <v-text-field
                class="border-secondary-lighten-5"
                outlined
                single-line
                :label="field.placeholder"
              ></v-text-field>
            </div>
          </template>
        </v-card-text>
        <v-card-actions class="px-4">
          <span class="text-body-2 blue-grey--text">
            Don't have an account?
          </span>
          <v-btn color="primary" text> Create account </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" x-large class="px-6"> Get Started </v-btn>
        </v-card-actions>
      </v-card>
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
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'GetStartedPage',
  layout: 'no-bars',
  data: () => ({
    login: {
      fields: [
        {
          label: 'Email, Username or Phone Number',
          placeholder: 'user@company.com',
          type: 'text',
        },
        {
          label: 'Password',
          placeholder: '********',
          type: 'password',
        },
      ],
    },
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
  methods: {
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
