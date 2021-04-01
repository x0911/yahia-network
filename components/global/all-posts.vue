<template>
  <div>
    <template v-for="postId in posts">
      <!-- @deleted="deletePost(post.id)" -->
      <single-post :id="postId" :key="postId"></single-post>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AllPosts',
  components: {
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
        .limit(10)
        .orderBy('lastModifiedDate', 'desc')
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
    // deletePost(id) {
    //   const posts = this.posts
    //   const index = posts.findIndex((post) => post.id === id)
    //   posts.splice(index, 1)
    // },
  },
}
</script>
