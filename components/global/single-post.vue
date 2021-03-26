<template>
  <div>
    <v-skeleton-loader
      elevation="5"
      class="mb-8"
      type="list-item-avatar, image, list-item-three-line, actions"
      :loading="loading"
    >
      <v-card elevation="5" class="mb-8">
        <v-card-text>
          <v-list-item class="px-0 mx-0">
            <v-list-item-avatar color="grey lighten-4" size="55">
              <v-img src=""></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ post.author ? post.author.fname : '' }}
                {{ post.author ? post.author.lname : '' }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <span v-if="post.lastModifiedDate">
                  {{ post.lastModifiedDate.toDate() | moment('from', 'now') }}
                </span>
                <span v-else> --- </span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text>
              <v-tooltip
                v-if="post.hasPendingWrites"
                top
                color="warning"
                max-width="300"
              >
                <template #activator="{ on }">
                  <v-btn icon color="warning" v-on="on">
                    <v-icon>mdi-progress-question</v-icon>
                  </v-btn>
                </template>
                <div>
                  This post has pending writes. Once you connect to the
                  internet, the post will be published
                </div>
              </v-tooltip>
              <v-menu transition="scroll-y-reverse-transition">
                <template #activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list dense nav>
                  <template v-for="(option, io) in postOptions">
                    <v-list-item :key="io" @click="runPostOption(option.value)">
                      <v-list-item-avatar>
                        <v-icon>{{ option.icon }}</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ option.name }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-menu>
            </v-list-item-action-text>
          </v-list-item>
        </v-card-text>
        <v-card-text class="text--primary">
          {{ post.content }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="text-center">
          <v-layout>
            <v-flex>
              <v-btn
                large
                text
                class="px-4 w-100"
                @click="
                  likePost(post.id, post.likes && post.likes.includes(uid))
                "
              >
                <v-icon
                  :color="
                    post.likes && post.likes.includes(uid)
                      ? 'error'
                      : 'grey lighten-2'
                  "
                  class="me-2"
                  >mdi-heart</v-icon
                >
                Like
              </v-btn>
            </v-flex>
            <v-flex>
              <v-btn large text class="px-4 w-100">
                <v-icon class="me-2">mdi-comment-outline</v-icon>
                Comment
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-skeleton-loader>
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  props: {
    id: {
      type: String,
      default: '0',
    },
  },
  data: () => ({
    loading: true,
    post: {},
    postOptions: [
      {
        name: 'Edit post',
        value: 'edit',
        ownerOnly: true,
        icon: 'mdi-pencil',
      },
      {
        name: 'View edit history',
        value: 'history',
        icon: 'mdi-history',
      },
      {
        name: 'Delete post',
        value: 'delete',
        ownerOnly: true,
        icon: 'mdi-delete-outline',
      },
      {
        name: 'Find support or Report post',
        value: 'report',
        othersOnly: true,
        icon: 'mdi-information-outline',
      },
    ],
  }),
  computed: {
    uid() {
      return this.$store.state.user?.uid
    },
  },
  mounted() {
    if (this.id && this.id.trim().length > 4) {
      this.getPost()
    }
  },
  getPost() {},
  methods: {
    runPostOption() {},
    likePost(id, hasLike) {
      const uid = this.uid
      this.setLoading(true)
      this.$fire.firestore
        .collection('posts')
        .doc(id)
        .update({
          likes: hasLike
            ? this.$fireModule.firestore.FieldValue.arrayRemove(uid)
            : this.$fireModule.firestore.FieldValue.arrayUnion(uid),
        })
        .then((x) => {
          //
        })
        .catch((err) => {
          console.log("Couldn't like this post", err)
        })
        .finally(() => {
          this.setLoading(false)
        })
    },
  },
}
</script>
