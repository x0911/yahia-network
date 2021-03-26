<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  layout: 'get-started',
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
  }),
  methods: {},
}
</script>
