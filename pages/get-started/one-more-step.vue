<template>
  <v-card elevation="8" class="pt-6">
    <div class="text-center mb-1">
      <v-avatar size="100" color="blue lighten-5">
        <app-logo color="primary"></app-logo>
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
          <v-text-field
            v-model="fname"
            outlined
            label="First"
            single-line
            :rules="validator"
            validate-on-blur
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="lname"
            outlined
            label="Last"
            single-line
            :rules="validator"
            validate-on-blur
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="text--primary font-weight-medium mb-2">I'm a</div>
      <v-row>
        <v-col cols="12">
          <v-btn-toggle v-model="gender" mandatory class="w-100">
            <v-btn
              value="male"
              class="w-50 font-weight-medium"
              active-class="primary--text"
              outlined
              large
            >
              Male
            </v-btn>
            <v-btn
              value="female"
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
      <vc-btn :btn-click="getStarted" large color="primary" class="px-6">
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
  components: {
    AppLogo: () => import('@/components/global/logo.vue'),
  },
  layout: 'one-more-step',
  data: () => ({
    fname: '',
    lname: '',
    gender: '',
    validator: [(v) => (v && v.trim().length > 0) || 'Field is requried'],
  }),
  methods: {
    getStarted() {
      const uid = this.$store.state.user.uid
      const { fname, lname, gender } = this
      if (!uid) {
        // No user exists
        console.log('User not exists')
      }
      if (
        !fname ||
        !lname ||
        !gender ||
        !fname.trim().length === 0 ||
        !lname.trim().length === 0 ||
        !gender.trim().length === 0
      ) {
        console.log('Field is missing')
        return
      }
      this.setLoading(true)
      this.$fire.firestore
        .collection('users')
        .doc(uid)
        .update({
          fname,
          lname,
          gender,
        })
        .then((x) => {
          //
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.setLoading(false)
        })
    },
  },
}
</script>
