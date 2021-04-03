<template>
  <div>
    <add-post ref="add_post" @published="pushPost"></add-post>
    <template v-for="postId in posts">
      <single-post
        :id="postId"
        :key="postId"
        @edit="editPost(postId)"
      ></single-post>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AllPosts',
  components: {
    AddPost: () => import('@/components/global/add-post.vue'),
    SinglePost: () => import('@/components/global/single-post.vue'),
  },
  data: () => ({
    posts: [],
  }),
  computed: {},
  mounted() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      this.setLoading(true)
      this.$fire.firestore
        .collection('posts')
        .where('isDeleted', '==', false)
        .orderBy('lastModifiedDate', 'desc')
        .limit(10)
        .get()
        .then((posts) => {
          const ids = posts.docs.map((p) => p.id)
          this.$set(this, 'posts', ids)
        })
        .catch((err) => {
          //
          console.log(err)
        })
        .finally(() => {
          this.setLoading(false)
        })
    },
    pushPost(postId) {
      this.posts.unshift(postId)
    },
    editPost(postId) {
      this.$refs.add_post.requestEdit(postId)
    },
    // deletePost(id) {
    //   const posts = this.posts
    //   const index = posts.findIndex((post) => post.id === id)
    //   posts.splice(index, 1)
    // },
  },
}
</script>
