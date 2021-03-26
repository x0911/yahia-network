<template>
  <v-card elevation="8" class="pt-6">
    <div class="text-center mb-1">
      <v-avatar size="100" color="blue lighten-5">
        <global-logo color="primary"></global-logo>
      </v-avatar>
    </div>
    <v-card-title class="text-center d-block mb-6">
      <div>One More Step</div>
      <div>
        <small> Tell us a bit about you </small>
      </div>
    </v-card-title>
    <v-card-text class="mb-4">
      <div class="text--primary font-weight-medium mb-2">My full name is</div>
      <v-row>
        <v-col cols="6">
          <v-text-field outlined label="First" single-line></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field outlined label="Last" single-line></v-text-field>
        </v-col>
      </v-row>
      <div class="text--primary font-weight-medium mb-2">I'm a</div>
      <v-row>
        <v-col cols="12">
          <v-btn-toggle mandatory class="w-100">
            <v-btn
              class="w-50 font-weight-medium"
              active-class="primary--text"
              outlined
              large
            >
              Male
            </v-btn>
            <v-btn
              class="w-50 font-weight-medium"
              active-class="pink--text"
              outlined
              large
            >
              Female
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="px-4">
      <v-spacer></v-spacer>
      <vc-btn large color="primary" class="px-6">
        Get Started
        <v-icon small class="ms-2"
          >mdi-keyboard-backspace
          {{ $vuetify.rtl ? '' : 'mdi-rotate-180' }}</v-icon
        >
      </vc-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'one-more-step',
}
</script>
