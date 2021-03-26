<template>
  <div>
    <template v-for="(post, i) in posts">
      <single-post :id="post.id" :key="i"></single-post>
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
    // this.getPosts()
  },
  methods: {
    getPosts() {
      this.setLoading(true)
      this.$fire.firestore
        .collection('posts')
        .limit(3)
        .get()
        .then((posts) => {
          console.log(posts)
          this.$set(this, 'posts', posts)
        })
        .catch((err) => {
          //
          console.log(err)
        })
        .finally(() => {
          this.setLoading(true)
        })
    },
  },
}
</script>
