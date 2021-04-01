<template>
  <v-layout align-center justify-center align-content-center>
    <v-flex lg7>
      <div>
        <add-post @published="publishNewPost"></add-post>
        <all-posts ref="all_posts"></all-posts>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
    AddPost: () => import('@/components/global/add-post.vue'),
    AllPosts: () => import('@/components/global/all-posts.vue'),
  },
  layout: 'auth',
  data: () => ({}),
  head() {
    return {
      title: 'Timeline',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'This is your timeline. A page where you see relevant things to your interests',
        },
      ],
    }
  },
  methods: {
    publishNewPost(post) {
      this.$refs.all_posts.pushPost(post)
    },
  },
}
</script>
