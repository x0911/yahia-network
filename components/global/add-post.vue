<template>
  <div>
    <v-dialog
      v-model="model"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      persistent
      scrollable
      max-width="650"
    >
      <template #activator="{ on, attrs }">
        <v-card
          v-if="allowAdd"
          class="mb-8"
          elevation="8"
          v-bind="attrs"
          v-on="on"
        >
          <v-card-text>
            <v-text-field
              outlined
              rounded
              single-line
              :label="`What's on your mind, ${userData.fname}?`"
              hint="Clone your ideas into other's minds"
              persistent-hint
            >
              <template #prepend>
                <v-avatar style="transform: translate(0px, -12px)">
                  <v-img
                    :src="
                      userData.picture
                        ? userData.picture
                        : require('@/assets/imgs/user-placeholder.jpg')
                    "
                    :lazy-src="require('@/assets/imgs/user-placeholder.jpg')"
                  ></v-img>
                </v-avatar>
              </template>
            </v-text-field>
          </v-card-text>
        </v-card>
      </template>
      <v-card class="pb-3" :disabled="loading" :loading="loading">
        <v-card-title>
          {{ editPostId ? 'Edit' : 'Create' }} Post
          <v-spacer></v-spacer>
          <v-btn icon @click="close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-2">
          <div class="mb-1">
            <v-list-item>
              <v-list-item-avatar>
                <v-img
                  :src="
                    userData.picture
                      ? userData.picture
                      : require('@/assets/imgs/user-placeholder.jpg')
                  "
                  :lazy-src="require('@/assets/imgs/user-placeholder.jpg')"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">
                  {{ userData.fname }} {{ userData.lname }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-menu transition="scroll-y-reverse-transition">
                    <template #activator="{ on, attrs }">
                      <v-btn small depressed v-bind="attrs" v-on="on">
                        <v-icon
                          class="me-2"
                          small
                          v-text="
                            audiences[post.audience]
                              ? audiences[post.audience].icon
                              : ''
                          "
                        ></v-icon>
                        {{
                          audiences[post.audience]
                            ? audiences[post.audience].text
                            : 'Choose audience'
                        }}
                        <v-icon class="ms-4" small>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list nav dense max-width="340">
                      <v-list-item-group
                        v-model="post.audience"
                        mandatory
                        active-class="primary--text"
                      >
                        <template v-for="(item, key, i) in audiences">
                          <v-list-item :key="i" :value="key" class="wrap">
                            <v-list-item-avatar>
                              <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title
                                v-text="item.text"
                              ></v-list-item-title>
                              <v-list-item-subtitle
                                v-text="item.desc"
                              ></v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-list-item-group>
                    </v-list>
                  </v-menu>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div>
            <v-textarea
              v-model="post.content"
              auto-grow
              rows="7"
              filled
              counter
              dir="auto"
            ></v-textarea>
            <div>
              <!-- <v-btn small class="px-0" text color="primary">
                <v-icon class="me-2">mdi-format-textbox</v-icon>
                Try advanced text editor
              </v-btn> -->
            </div>
          </div>
          <div>
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
                          <v-btn small dark @click="deleteMedia(i)">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-layout>
                      </v-img>
                    </v-avatar>
                  </v-card>
                </v-col>
              </template>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!allowPosting"
            block
            x-large
            color="primary"
            @click="addPost()"
          >
            {{ editPostId ? 'Update Post' : 'Post' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <media-studio ref="mediaStudio" @got-media="setNewMedia"></media-studio>
  </div>
</template>

<script>
export default {
  components: {
    MediaStudio: () => import('@/components/global/media-studio.vue'),
  },
  props: {
    allowAdd: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    model: false,
    loading: false,
    post: {
      content: '',
      medias: [],
      audience: 'public',
    },
    editPostId: null,
    editPost: null,
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
    userData() {
      return this.$store.state.userData
    },
    audiences() {
      return this.$store.state.options.post.audiences
    },
    uid() {
      return this.$store.state.user?.uid
    },
  },
  methods: {
    deleteMedia(index) {
      const medias = this.post.medias
      medias.splice(index, 1)
    },
    addPost() {
      const { content, medias, audience } = this.post
      const uid = this.uid
      const currentDate = new Date()
      const editPostId = this.editPostId
      this.$set(this, 'loading', true)
      let filteredContent = content.trim()
      filteredContent = filteredContent.replace(/(<([^>]+)>)/gi, '')
      filteredContent = filteredContent.replace(/(?:\r\n|\r|\n)/g, '<br />')
      const postId = this.firestoreDocId()
      const postObj = {
        content: filteredContent,
        medias,
        audience,
      }
      if (editPostId) {
        postObj.lastModifiedDate = currentDate
        const oldPost = this.editPost
        const newHistory = {
          content: oldPost.content,
          medias: oldPost.medias,
          audience: oldPost.audience,
          date: oldPost.lastModifiedDate.toDate(),
        }
        this.$fire.firestore
          .collection('posts')
          .doc(editPostId)
          .collection('history')
          .add(newHistory)
      } else {
        postObj.uid = uid
        postObj.lastModifiedDate = currentDate
        postObj.createdDate = currentDate
        postObj.isDeleted = false
      }
      this.$fire.firestore
        .collection('posts')
        .doc(editPostId && editPostId !== null ? editPostId : postId)
        .set(postObj, { merge: true })
      const intval = setInterval(() => {
        clearInterval(intval)
        this.$set(this, 'loading', false)
        if (!editPostId) {
          this.$emit('published', postId)
        }
        this.close()
      }, 1000)
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
      this.$set(this, 'editPostId', null)
      this.$set(this, 'editPost', null)
    },
    requestEdit(editPostId) {
      const uid = this.uid
      this.open()
      this.$set(this, 'loading', true)
      this.$fire.firestore
        .collection('posts')
        .doc(editPostId)
        .get()
        .then(async (snapshot) => {
          const post = await this.getPostAuthor(snapshot)
          this.$set(this, 'loading', false)
          if (uid !== post.uid) {
            console.log('You are not the owner of this post')
            return
          }
          if (post.isDeleted) {
            console.log('This post is deleted')
            return
          }
          const newMedias = [...post.medias]
          this.$set(this, 'editPost', { ...post, medias: newMedias })
          this.$set(this, 'editPostId', editPostId)
          this.$set(
            this.post,
            'content',
            post.content.replace(/<br\s*[/]?>/gi, '\n')
          )
          this.$set(this.post, 'medias', post.medias)
          this.$set(this.post, 'audience', post.audience)
        })
    },
    open() {
      this.$set(this, 'model', true)
    },
    close() {
      this.clearNewPost()
      this.$set(this, 'model', false)
    },
  },
}
</script>
