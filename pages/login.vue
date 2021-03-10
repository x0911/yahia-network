<template>
  <div>
    <v-card>
      <v-card-title> Please login to continue </v-card-title>
      <v-card-text>
        <div>
          <pre>{{ hasFingerprint }}</pre>
        </div>
        <v-divider></v-divider>
        <div>
          {{ msg }}
        </div>
      </v-card-text>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Outlined"
            outlined
            persistent-hint
            hint="Et irure voluptate incididunt nostrud enim tempor id deserunt laboris occaecat."
          ></v-text-field>
          <v-text-field
            label="Filled Date"
            filled
            type="date"
            hint="Ea non consequat aliqua pariatur ut dolore qui aliquip."
            persistent-hint
          ></v-text-field>
          <v-text-field
            solo
            label="Solo Number"
            type="number"
            persistent-hint
            hint="Aliquip ut proident culpa adipisicing adipisicing ex culpa exercitation esse esse sunt irure."
          ></v-text-field>
          <v-text-field
            solo-inverted
            label="Solo-Inverted DateTime"
            persistent-hint
            type="datetime-local"
            hint="Ad sint sunt esse mollit esse incididunt nulla reprehenderit esse sint ad."
          ></v-text-field>
          <v-text-field
            label="Original Text Field"
            persistent-hint
            hint="Amet dolor qui cupidatat ut commodo qui sit magna magna quis ipsum in."
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn to="/" color="primary" large> Home Primary </v-btn>
        <v-btn to="/" color="error" outlined large> Home Danger </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// import { Plugins } from '@capacitor/core'
// const { BiometricAuth } = Plugins
// NativeBiometric
export default {
  transition: 'slide-up',
  data: () => ({
    hasFingerprint: null,
    msg: '',
  }),
  head() {
    return {
      title: 'Login',
    }
  },
  mounted() {
    // this.checkFingerprint()
  },
  methods: {
    // async checkFingerprint() {
    //   const available = await BiometricAuth.isAvailable()
    //   this.$set(this, 'hasFingerprint', available)
    //   if (available.has) {
    //     const authResult = await BiometricAuth.verify({
    //       title: 'scan Fingerprint',
    //       subtitle:
    //         'Ullamco adipisicing amet irure anim Lorem dolor velit id nostrud.',
    //       description:
    //         'Laboris ut dolore esse in officia dolore non. Laborum id adipisicing qui aliqua excepteur elit aliquip deserunt. Excepteur reprehenderit laboris in dolor. Consequat minim amet qui ea adipisicing non. Minim velit proident aute irure enim ipsum exercitation ad occaecat sunt. Do deserunt ex nostrud labore elit.',
    //       cancel: 'Dont Scan',
    //     })
    //     if (authResult.verified) {
    //       // success authentication
    //       this.$set(this, 'msg', 'success authentication')
    //     } else {
    //       // fail authentication
    //       this.$set(this, 'msg', 'fail authentication')
    //     }
    //   } else {
    //     // biometric not available
    //     this.$set(this, 'msg', 'biometric not available')
    //   }
    // },
  },
}
</script>
