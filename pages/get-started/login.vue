<template>
  <div>
    <v-card :disabled="isLoading" tile flat>
      <v-card-title class="mb-1 text-h5 font-weight-medium">
        Welcome back
      </v-card-title>
      <v-card-subtitle class="text-body-2">
        Login to manage your account
      </v-card-subtitle>
      <v-card-text class="pt-6">
        <vc-tabs
          v-model="loginTab"
          :tabs="['Phone code', 'Email link', 'Password']"
        ></vc-tabs>
        <v-window v-model="loginTab">
          <template v-for="(fields, key, pi) in loginPhases">
            <v-window-item :key="pi">
              <template v-for="(field, i) in fields">
                <div v-show="!field.unShow" :key="i">
                  <div
                    :class="`mb-1 font-weight-medium ${
                      field.disabled ? '' : 'text--primary'
                    }`"
                  >
                    {{ field.label }}
                  </div>
                  <v-text-field
                    v-model="field.value"
                    v-mask="field.mask ? field.mask : nomask"
                    class="border-secondary-lighten-5"
                    outlined
                    :prepend-inner-icon="`${field.icon}`"
                    :disabled="field.disabled"
                    single-line
                    validate-on-blur
                    :rules="field.rules"
                    :label="field.placeholder"
                    :hint="field.hint"
                    :persistent-hint="field.hint ? true : false"
                    :prefix="field.prefix"
                    @keypress.enter="getStarted()"
                  >
                  </v-text-field>
                </div>
              </template>
            </v-window-item>
          </template>
        </v-window>
      </v-card-text>
      <v-card-actions class="px-4">
        <div>
          <small class="blue-grey--text"> Don't have an account? </small>
          <v-btn color="primary" text> Create account </v-btn>
        </div>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="isLoading"
          color="primary"
          large
          class="px-5"
          @click="getStarted()"
        >
          Get Started
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'get-started',
  data: () => ({
    isLoading: false,
    loginTab: 0,
    loginPhases: {
      phoneCode: [
        {
          label: 'Phone number',
          placeholder: '### ### ## ##',
          type: 'text',
          prefix: '+20',
          icon: 'mdi-phone',
          hint: 'We currenty support Egyptian mobile numbers only',
          disabled: false,
          value: '',
          mask: '### ### ## ##',
          rules: [
            (v) =>
              (v && v.replace(/ /g, '').length > 9) ||
              `Phone number is not correct`,
          ],
        },
        {
          label: 'Activation code has been sent to your phone',
          placeholder: '# # # # # #',
          type: 'text',
          icon: 'mdi-lock',
          unShow: true,
          value: '',
        },
      ],
      emailLink: [
        {
          label: 'Email address',
          placeholder: 'user@company.com',
          type: 'text',
          icon: 'mdi-email-outline',
          value: '',
        },
      ],
      password: [
        {
          label: 'Email, Username or Phone Number',
          placeholder: 'user@company.com',
          type: 'text',
          icon: 'mdi-email-outline',
          value: '',
        },
        {
          label: 'Password',
          placeholder: '_ _ _ _ _ _ _ _',
          type: 'password',
          icon: 'mdi-lock-outline',
          value: '',
        },
      ],
    },
  }),
  methods: {
    getStarted() {
      const loginTab = this.loginTab
      switch (loginTab) {
        case 0:
          this.loginWithPhoneCode()
          break
        case 1:
          this.loginWithEmailLink()
          break
        case 2:
          this.loginWithPassword()
          break
      }
    },
    async loginWithPhoneCode() {
      const [phoneNumber, code] = this.loginPhases.phoneCode
      if (phoneNumber.disabled && !code.unShow) {
        // Verify Code
        this.setLoading(true)
        this.$set(this, 'isLoading', true)
        const fn = await this.$store.dispatch('verifyCode', code.value)
        this.setLoading(false)
        this.$set(this, 'isLoading', false)
        if (fn.ok) {
          window.location.reload()
        } else {
          // error has been occured
          console.log(fn.error)
        }
      } else if (phoneNumber.value.length > 9) {
        // Valid
        this.setLoading(true)
        this.$set(this, 'isLoading', true)
        const fn = await this.$store.dispatch(
          'sendVerificationCode',
          `+20${phoneNumber.value.replace(/ /g, '')}`
        )
        if (fn.ok) {
          phoneNumber.disabled = true
          code.unShow = false
        } else {
          // error has been occured
          console.log(fn.error)
        }
        this.setLoading(false)
        this.$set(this, 'isLoading', false)
      }
    },
    loginWithEmailLink() {},
    loginWithPassword() {
      //
    },
  },
}
</script>
