<template>
  <div>
    <template v-for="(post, i) in posts">
      <v-card :key="i" elevation="5" class="mb-8">
        <v-card-text>
          <v-list-item class="px-0 mx-0">
            <v-list-item-avatar color="grey lighten-4" size="55">
              <v-img src=""></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ post.author ? post.author.fname : 'John' }}
                {{ post.author ? post.author.lname : 'Doe' }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <span v-if="post.lastModifiedDate">
                  {{ post.lastModifiedDate | moment('from', 'now') }}
                </span>
                <span v-else></span>
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
                    <v-list-item :key="io" @click="funPostOption(option.value)">
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
              <v-btn large text class="px-4 w-100">
                <v-icon color="error" class="me-2">mdi-heart</v-icon>
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
    </template>
  </div>
</template>

<script>
export default {
  name: 'AllPosts',
  data: () => ({
    posts: [],
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
  mounted() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      const uid = this.$store.state.user?.uid
      await this.$fire.firestore
        .collection('posts')
        .where('uid', '==', uid)
        .onSnapshot(
          async (snapshot) => {
            this.$set(this, 'posts', [])
            const posts = await this.getPostsAuthors(snapshot.docs)
            this.$set(this, 'posts', posts)
          },
          (error) => {
            console.log('Error happended while trying to get posts')
            console.log(error)
          }
        )
    },
    funPostOption() {},
  },
}
</script>
