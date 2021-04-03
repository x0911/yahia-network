<template>
  <div>
    <v-layout align-center justify-center align-content-center>
      <v-flex lg7>
        <div class="pt-10">
          <add-post ref="add_post" :allow-add="false"></add-post>
          <single-post
            :id="postId"
            @fetched="postFetched"
            @edit="editPost(postId)"
          ></single-post>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  components: {
    AddPost: () => import('@/components/global/add-post.vue'),
    SinglePost: () => import('@/components/global/single-post.vue'),
  },
  layout: 'auth',
  asyncData({ params }) {
    const postId = params.id
    return { postId }
  },
  data: () => ({
    post: {
      author: '',
      uid: '',
      content: '',
    },
  }),
  head() {
    return {
      title:
        this.uid === this.post.uid
          ? 'Your post'
          : `Post from ${this.post.author}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.post.content}...`,
        },
      ],
    }
  },
  computed: {
    uid() {
      return this.$store.state.user?.uid
    },
  },
  methods: {
    editPost(postId) {
      this.$refs.add_post.requestEdit(postId)
    },
    postFetched({ author, uid, content }) {
      this.$set(this.post, 'author', author)
      this.$set(this.post, 'uid', uid)
      this.$set(this.post, 'content', content)
    },
  },
}
</script>
