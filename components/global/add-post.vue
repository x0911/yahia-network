<template>
  <v-card class="mb-8" :disabled="loading" elevation="6">
    <v-card-title>
      What's on your mind?
      <v-spacer></v-spacer>
      <v-btn outlined color="secondary lighten-2">
        <v-icon class="me-2">mdi-earth</v-icon>
        Public
        <v-icon small class="ms-1">mdi-chevron-down</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-textarea v-model="newPost.content" auto-grow filled></v-textarea>
      <div>
        <!-- <v-btn small class="px-0" text color="primary">
                <v-icon class="me-2">mdi-format-textbox</v-icon>
                Try advanced text editor
              </v-btn> -->
        <v-btn small class="px-0" text color="primary">
          <v-icon class="me-2">mdi-camera-image</v-icon>
          Upload Images / Videos
        </v-btn>
      </div>
    </v-card-text>
    <v-card-text v-if="newPost.medias.length > 0">
      <template v-for="(media, i) in newPost.medias">
        <div :key="i">
          <v-img v-if="media.type == 'img'" :src="media.src"></v-img>
        </div>
      </template>
    </v-card-text>
    <v-card-actions>
      <vc-btn
        :disabled="!newPost.content"
        block
        x-large
        color="primary"
        :btn-click="addPost"
      >
        Post
      </vc-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    newPost: {
      content: '',
      medias: [],
      audience: 'public',
    },
  }),
  methods: {
    async addPost() {
      const { content, medias, audience } = this.newPost
      const uid = this.$store.state.user?.uid
      const currentDate = new Date()
      this.setLoading(true)
      this.$set(this, 'loading', true)
      await this.$fire.firestore
        .collection('posts')
        .add({
          content,
          medias,
          audience,
          uid,
          lastModifiedDate: currentDate,
          createdDate: currentDate,
        })
        .then((x) => {
          console.log(x)
          this.clearNewPost()
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.setLoading(false)
          this.$set(this, 'loading', false)
        })
    },
    clearNewPost() {
      this.$set(this.newPost, 'content', '')
      this.$set(this.newPost, 'medias', [])
      this.$set(this.newPost, 'audience', 'public')
    },
  },
}
</script>
