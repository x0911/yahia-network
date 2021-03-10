<template>
  <div class="white" style="height: 1125px">
    <v-container>
      <v-sheet color="transparent">
        <div class="mb-10 text-center">
          <div class="font-size-32 font-weight-medium">
            Use the method you prefer
          </div>
          <div class="mt-3 blue-grey--text text--darken-1 text-body-2">
            <div class="mb-1">Create your account in seconds</div>
            <div>using the way you want</div>
          </div>
        </div>
        <v-card-text>
          <v-row>
            <v-col lg="4">
              <v-list>
                <template v-for="(step, i) in loginSteps">
                  <v-list-item :key="i" class="mb-8 wrap">
                    <v-list-item-avatar
                      class="align-self-start"
                      :color="
                        currentLoginStep > i || currentLoginStep == i
                          ? 'primary'
                          : 'grey lighten-3'
                      "
                      size="40"
                      rounded="circle"
                    >
                      <v-icon v-if="currentLoginStep > i" dark>
                        mdi-check
                      </v-icon>
                      <v-icon v-else :dark="currentLoginStep == i">
                        mdi-numeric-{{ i + 1 }}
                      </v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="mb-1">
                        {{ step.title }}
                      </v-list-item-title>
                      <v-list-item-subtitle
                        class="text-caption"
                        style="line-height: 1.1rem"
                      >
                        {{ step.desc }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-col>
            <v-col lg="4">
              <div class="p-relative">
                <figure
                  class="max-w-12rem w-100 p-absolute"
                  style="bottom: -4.5rem; right: -3rem"
                >
                  <v-img
                    alt="Image contains dots"
                    :src="require('@/assets/imgs/svg/13.svg')"
                  >
                  </v-img>
                </figure>
                <v-card class="pt-6 pb-4 px-6" elevation="24">
                  <v-card-text>
                    <div class="mb-1 font-weight-medium text--primary">
                      Email or Phone
                    </div>
                    <v-text-field
                      label="user@company.com"
                      placeholder="user@company.com"
                      single-line
                      outlined
                    ></v-text-field>
                    <div class="mb-1 font-weight-medium text--primary">
                      Password
                    </div>
                    <v-text-field
                      label="********"
                      placeholder="********"
                      single-line
                      type="password"
                      outlined
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions class="px-4">
                    <vc-btn block x-large color="primary"> Next </vc-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-col>
            <v-col offset-lg="1" lg="3">
              <div>
                <v-list nav>
                  <v-list-item-group v-model="currentLoginWay" mandatory>
                    <template v-for="(way, wi) in loginWays">
                      <v-list-item
                        :key="wi"
                        dense
                        color="primary"
                        :value="way.value"
                      >
                        <v-list-item-avatar>
                          <v-icon>mdi-{{ way.icon }}</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ way.title }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action v-if="way.actionIcon">
                          <v-icon>mdi-{{ way.actionIcon }}</v-icon>
                        </v-list-item-action>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
                <v-row align="center">
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
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    currentLoginStep: 0,
    loginSteps: [
      {
        title: 'Enter Credentials',
        desc:
          'Create a new password for Yahia Network with your current email address',
      },
      {
        title: 'Confirmation',
        desc: 'Proving you are the owner of the email address or phone',
      },
      {
        title: 'Done',
        desc: 'You are all set.',
      },
    ],
    currentLoginWay: 'email-password',
    loginWays: [
      {
        title: 'Email & Password',
        icon: 'at',
        value: 'email-password',
      },
      {
        title: 'Email Link',
        icon: 'link mdi-rotate-45',
        value: 'email-link',
      },
      {
        title: 'Phone Code',
        icon: 'cellphone-key',
        value: 'phone',
      },
    ],
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
