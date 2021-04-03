<template>
  <div id="scroll-target">
    <v-navigation-drawer v-model="sidenav.model" app color="white" temporary>
      <v-container class="text-center">
        <div>
          <v-avatar size="100">
            <app-logo color="primary"></app-logo>
          </v-avatar>
        </div>
        <div>
          <small class="font-weight-medium"> Yahia Social Network </small>
        </div>
      </v-container>
      <v-divider></v-divider>
      <v-list nav dense>
        <template v-for="(link, i) in links">
          <v-list-item :key="i" :to="link.to">
            <v-list-item-avatar>
              <v-icon>mdi-{{ link.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ link.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ link.subtitle }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!-- @scroll="" -->
    <v-app-bar
      v-scroll.#scroll-target="handleScroll"
      app
      color="white"
      elevate-on-scroll
      :collapse-on-scroll="topnav.collapse"
      :collapse="topnav.collapse"
    >
      <v-app-bar-nav-icon
        v-if="topnav.collapse"
        @click="sidenav.model = true"
      ></v-app-bar-nav-icon>
      <v-avatar v-if="!topnav.collapse">
        <app-logo color="secondary"></app-logo>
      </v-avatar>
      <v-btn v-if="!topnav.collapse" text to="/" active-class="no-active">
        <v-toolbar-title class="font-weight-medium">
          Social Network
        </v-toolbar-title>
      </v-btn>
      <v-spacer v-if="!topnav.collapse"></v-spacer>
      <v-toolbar-items v-if="!topnav.collapse">
        <template v-for="(link, i) in links">
          <v-btn :key="i" :to="link.to" depressed color="transparent">
            {{ link.title }}
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'LandingNavbar',
  components: {
    AppLogo: () => import('@/components/global/logo.vue'),
  },
  data: () => ({
    sidenav: {
      model: false,
    },
    topnav: {
      collapse: false,
      model: true,
    },
    links: [
      {
        title: 'Posts',
        icon: 'collage',
        to: '/posts',
      },
      {
        title: 'Get Started',
        icon: 'login',
        to: '/get-started',
      },
    ],
  }),
  methods: {
    handleScroll() {
      const doc = document.documentElement
      const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      if (top >= 120) {
        // Collapse Topnav
        this.$set(this.topnav, 'collapse', true)
      } else {
        // Uncollapse Topnav
        this.$set(this.topnav, 'collapse', false)
      }
    },
  },
}
</script>
