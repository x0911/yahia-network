<template>
  <div class="pb-8">
    <landing-one></landing-one>
    <landing-latest-posts></landing-latest-posts>
    <!-- <lazy-landing-two></lazy-landing-two>
    <lazy-landing-three></lazy-landing-three> -->
  </div>
</template>

<script>
export default {
  transitions: 'slide-down',
  components: {
    LandingOne: () => import('@/components/landing/one.vue'),
    LandingLatestPosts: () => import('@/components/landing/latest-posts.vue'),
  },
  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
