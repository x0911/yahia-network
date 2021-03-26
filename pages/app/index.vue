<template>
  <v-layout align-center justify-center align-content-center>
    <v-flex lg6>
      <div>
        <lazy-global-add-post></lazy-global-add-post>
        <lazy-global-all-posts></lazy-global-all-posts>
      </div>
    </v-flex>
  </v-layout>
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
  methods: {},
}
</script>
