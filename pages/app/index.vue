<template>
  <v-layout align-center justify-center align-content-center>
    <v-flex lg7>
      <div class="pt-10">
        <all-posts ref="all_posts"></all-posts>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
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
  methods: {},
}
</script>
