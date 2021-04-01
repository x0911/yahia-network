<template>
  <div>
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
      <v-card-text class="pb-0">
        <v-textarea
          v-model="post.content"
          auto-grow
          filled
          counter="2000"
        ></v-textarea>
        <div>
          <!-- <v-btn small class="px-0" text color="primary">
                <v-icon class="me-2">mdi-format-textbox</v-icon>
                Try advanced text editor
              </v-btn> -->
        </div>
      </v-card-text>
      <v-card-text class="pt-0">
        <v-row>
          <v-col cols="6" sm="4" md="3">
            <v-btn
              :height="mediaHeight"
              width="100%"
              @click="$refs.mediaStudio.open()"
            >
              <div>
                <div>
                  <v-icon class="mb-2">mdi-plus</v-icon>
                </div>
                <div>Media</div>
              </div>
            </v-btn>
          </v-col>
          <template v-for="(media, i) in post.medias">
            <v-col :key="i" cols="6" sm="4" md="3">
              <v-card :height="mediaHeight" width="100%" flat>
                <v-avatar
                  v-if="
                    media &&
                    media.metadata &&
                    media.metadata.type &&
                    media.metadata.type == 'image'
                  "
                  rounded="sm"
                  :height="mediaHeight"
                  width="100%"
                >
                  <v-img :src="media.thumbnail">
                    <v-layout fill-height justify-end align-start>
                      <v-btn icon dark @click="deleteMedia(i)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-img>
                </v-avatar>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <vc-btn
          :disabled="!allowPosting"
          block
          x-large
          color="primary"
          :btn-click="addPost"
        >
          Post
        </vc-btn>
      </v-card-actions>
    </v-card>
    <media-studio ref="mediaStudio" @got-media="setNewMedia"></media-studio>
  </div>
</template>

<script>
export default {
  components: {
    MediaStudio: () => import('@/components/global/media-studio.vue'),
  },
  data: () => ({
    loading: false,
    post: {
      content: '',
      medias: [],
      audience: 'public',
    },
  }),
  computed: {
    mediaHeight() {
      // const h = this.$vuetify.breakpoint.smAndUp ? '150' : '100'
      return '100'
    },
    allowPosting() {
      let r = false
      const { content, medias } = this.post
      if (content && content.trim().length > 0) {
        r = true
      }
      if (medias && medias.length > 0) {
        r = true
      }
      return r
    },
  },
  methods: {
    deleteMedia(index) {
      const medias = this.post.medias
      medias.splice(index, 1)
    },
    addPost() {
      const { content, medias, audience } = this.post
      const uid = this.$store.state.user?.uid
      const currentDate = new Date()
      this.setLoading(true)
      this.$set(this, 'loading', true)
      let filteredContent = content
      filteredContent = filteredContent.replace(/(<([^>]+)>)/gi, '')
      filteredContent = filteredContent.replace(/(?:\r\n|\r|\n)/g, '<br />')
      const postId = this.firestoreDocId()
      this.$fire.firestore.collection('posts').doc(postId).set({
        content: filteredContent,
        medias,
        audience,
        uid,
        lastModifiedDate: currentDate,
        createdDate: currentDate,
        isDeleted: false,
      })
      const intval = setInterval(() => {
        clearInterval(intval)
        this.clearNewPost()
        this.setLoading(false)
        this.$set(this, 'loading', false)
        this.$emit('published', postId)
      }, 750)
    },
    setNewMedia(medias) {
      const currentMedias = this.post.medias
      medias.forEach((media) => {
        const obj = {}
        obj.src = media.src
        obj.thumbnail = media.thumbnail
        obj.featured = media.featured
        obj.name = media.metadata.name
        obj.metadata = media.metadata.customMetadata
        currentMedias.push(obj)
      })
    },
    clearNewPost() {
      this.$set(this.post, 'content', '')
      this.$set(this.post, 'medias', [])
      this.$set(this.post, 'audience', 'public')
    },
  },
}
</script>
