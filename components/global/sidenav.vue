<template>
  <div>
    <v-navigation-drawer
      v-model="model"
      :temporary="!$store.state.options.drawer.fixed"
      app
      :mini-variant.sync="$store.state.options.drawer.mini"
      :right="$vuetify.rtl"
      overflow
      height="100%"
      width="260"
      dark
    >
      <template #img>
        <v-img
          height="100%"
          gradient="135deg, rgba(5, 30, 52, 0.7), rgba(5, 30, 52, 0.7)"
          :src="require('@/assets/imgs/21.jpg')"
        ></v-img>
      </template>
      <v-card class="px-0 ma-0 transparent" flat tile height="100%">
        <vue-custom-scrollbar
          style="height: 100%; width: 260px"
          :settings="$store.state.options.scrollbar_settings"
        >
          <v-list nav dense>
            <v-subheader>Your Profile</v-subheader>
            <v-list-item exact :to="`/profile/${user.uid}`">
              <v-list-item-avatar>
                <v-img
                  :src="
                    userData.picture
                      ? userData.picture
                      : require('@/assets/imgs/user-placeholder.jpg')
                  "
                  :lazy-src="require('@/assets/imgs/user-placeholder.jpg')"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  v-text="
                    `${userData.fname ? userData.fname : 'New'} ${
                      userData.lname ? userData.lname : 'User'
                    }`
                  "
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-text="
                    userData.jobDesc ? userData.jobDesc : 'See your profile'
                  "
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <template v-for="(item, i) in items">
              <v-subheader
                v-if="item.subheader"
                :key="`s_${i}`"
                v-text="item.subheader"
              ></v-subheader>
              <v-divider v-if="item.topDivider" :key="`td_${i}`"></v-divider>
              <v-list-item
                v-if="!item.type || item.type == 'single'"
                :key="i"
                exact
                :to="item.to"
                @click="item.click ? runFun(item.click) : () => {}"
              >
                <v-list-item-avatar>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="item.desc"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="item.bottomDivider" :key="`bd_${i}`"></v-divider>
            </template>
          </v-list>
        </vue-custom-scrollbar>
      </v-card>
    </v-navigation-drawer>
    <!-- Dialogs -->
    <v-dialog v-model="logoutDialog.model" scrollable max-width="600">
      <v-card>
        <v-card-title>
          Sure?
          <v-spacer></v-spacer>
          <v-btn icon @click="logoutDialog.model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-alert color="error" border="left" colored-border>
            <div>Do you want to leave?</div>
            <div>
              If you just want to switch your identity, click
              <v-btn class="px-1" text color="primary" to="/app/identity"
                >Switch Identity</v-btn
              >
            </div>
          </v-alert>
        </v-card-text>
        <v-card-actions class="px-4">
          <v-spacer></v-spacer>
          <v-btn
            text
            large
            @click="logoutDialog.model = false"
            v-text="'Cancel'"
          ></v-btn>
          <v-btn
            large
            text
            color="error"
            @click="logout()"
            v-text="'Logout'"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ./Dialogs -->
  </div>
</template>

<script>
export default {
  name: 'Sidenav',
  data: () => ({
    model: null,
    logoutDialog: {
      model: false,
    },
    items: [
      {
        subheader: 'Menu',
        title: 'Timeline',
        icon: 'mdi-earth',
        to: '/app',
      },
      {
        title: 'Settings',
        icon: 'mdi-cog',
        to: '/app/settings',
      },
      {
        title: 'Logout',
        icon: 'mdi-logout',
        click: 'showLogoutDialog',
        bottomDivider: true,
      },
      {
        subheader: 'Found Issue?',
        title: 'Report a bug',
        icon: 'mdi-bug',
        to: '/bug',
      },
      {
        title: 'Changelog',
        icon: 'mdi-file-document-multiple-outline',
        to: '/changelog',
        bottomDivider: true,
      },
      {
        subheader: 'About App',
        title: 'Meet The Team',
        icon: 'mdi-heart-box-outline',
        to: '/team',
      },
      {
        title: 'Getting Started Guide',
        icon: 'mdi-hand-pointing-up',
        to: '/getting_started',
      },
    ],
  }),
  computed: {
    user() {
      return this.$store.state.user ? this.$store.state.user : {}
    },
    userData() {
      return this.$store.state.userData ? this.$store.state.userData : {}
    },
  },
  methods: {
    runFun(fun) {
      if (this[fun]) {
        this[fun]()
      }
    },
    async logout() {
      await this.$store.dispatch('logout')
      this.$nextTick(() => {
        window.location.reload()
      })
    },
    showLogoutDialog() {
      this.$set(this.logoutDialog, 'model', true)
    },
  },
}
</script>
