<template>
  <v-dialog v-show="!dontShowAgain" v-model="model" max-width="600" persistent>
    <v-alert type="error" colored-border border="left">
      <div>
        <div class="mb-3">
          <div class="font-weight-medium">You are offline</div>
          Posts, comments and reactions you have seen before will still apear,
          and you still can interact with the app.
        </div>
        <div>
          <v-btn @click="closeDialog()"> Don't show this again </v-btn>
        </div>
      </div>
    </v-alert>
  </v-dialog>
</template>

<script>
export default {
  name: 'OfflineAlert',
  data: () => ({
    model: false,
    dontShowAgain: false,
  }),
  mounted() {
    const dontShowAgain = this.$ls.get('dont-show-again', false)
    if (dontShowAgain === 'true') {
      this.$set(this, 'dontShowAgain', true)
    } else {
      this.$set(this, 'model', true)
    }
  },
  methods: {
    closeDialog() {
      this.$set(this, 'model', false)
      this.$ls.set('dont-show-again', 'true')
    },
  },
}
</script>
