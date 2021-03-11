<template>
  <div class="pb-8">
    <lazy-landing-one></lazy-landing-one>
    <lazy-landing-latest-posts></lazy-landing-latest-posts>
    <!-- <lazy-landing-two></lazy-landing-two>
    <lazy-landing-three></lazy-landing-three> -->
  </div>
</template>

<script>
export default {
  transitions: 'slide-down',
  components: {},
  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
