<template>
  <div>
    <v-dialog v-model="methods.model" persistent scrollable max-width="350">
      <v-card>
        <v-progress-linear
          color="primary"
          value="100"
          height="8"
        ></v-progress-linear>
        <v-card-title class="mt-2 d-block text-center">
          <div class="mb-2">
            <v-icon large>mdi-information-outline</v-icon>
          </div>
          <div>Account exists with a different credential</div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-4 text--primary">
          <div class="mb-3">
            Email:
            <code class="primary--text text-body-2">{{ methods.email }}</code>
          </div>
          <div class="mb-3">
            It seems that your email is assoicated with other credential
            providers.
          </div>
          <div class="mb-5">
            In order to link your account with the new credential provider,
            Please verify it's you. Select a method below to sign in.
          </div>
          <div>
            <v-select
              :items="methods.methods"
              outlined
              label="Select a method"
              dense
              single-line
              persistent-hint
              hint="Please select a method from the list"
            ></v-select>
          </div>
        </v-card-text>
        <v-card-actions class="px-4">
          <v-spacer></v-spacer>
          <v-btn text> Back </v-btn>
          <vc-btn large class="px-6" color="primary">
            Continue
            <v-icon class="ms-2" small>mdi-chevron-right</v-icon>
          </vc-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'SignInMethodsForEmail',
  data: () => ({}),
  computed: {
    methods() {
      const { model, methods, email } = this.$store.state.methodsForEmail
      return {
        model,
        methods,
        email,
      }
    },
  },
}
</script>
