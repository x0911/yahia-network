<template>
  <div class="light">
    <lazy-landing-navbar></lazy-landing-navbar>
    <lazy-landing-one></lazy-landing-one>
    <lazy-landing-two></lazy-landing-two>
    <lazy-landing-three></lazy-landing-three>
  </div>
</template>

<script>
export default {
  transitions: 'slide-down',
  components: {},
  layout: 'landing',
  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
