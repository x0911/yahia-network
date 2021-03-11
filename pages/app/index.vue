<template>
  <div>
    <!-- Home Page For Auth Users  -->
  </div>
</template>

<script>
export default {
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
}
</script>
