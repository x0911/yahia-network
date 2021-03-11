<template>
  <v-layout
    fill-height
    align-center
    justify-center
    align-content-center
    class="text-center"
  >
    <div>
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <v-btn text to="/" color="primary"> Back Home </v-btn>
    </div>
  </v-layout>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  mounted() {
    // this.createRgbVarsForThemes(this.$vuetify.theme.themes)
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
