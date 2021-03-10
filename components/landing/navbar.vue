<template>
  <div>
    <v-app-bar app color="white" elevate-on-scroll collapse-on-scroll>
      <v-app-bar-title> Yahia Network </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <template v-for="(link, i) in links">
          <v-btn :key="i" :to="link.to" depressed color="transparent">
            {{ link.text }}
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'LandingNavbar',
  data: () => ({
    links: [
      {
        text: 'Partners',
      },
      {
        text: 'Pricing',
      },
      {
        text: 'Blog',
      },
      {
        text: 'Start Now',
      },
    ],
  }),
}
</script>
