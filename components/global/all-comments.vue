<template>
  <v-card>
    <v-divider></v-divider>
    <v-card-text>
      <v-textarea
        label="Write a comment"
        single-line
        filled
        rounded
        persistent-hint
        hint="Press Shift + Enter for a new line"
        auto-grow
        rows="1"
        dense
      >
        <template #prepend>
          <v-avatar style="transform: translate(0px, -12px)">
            <v-img
              :src="
                userData.picture
                  ? userData.picture
                  : require('@/assets/imgs/user-placeholder.jpg')
              "
              :lazy-src="require('@/assets/imgs/user-placeholder.jpg')"
            ></v-img>
          </v-avatar>
        </template>
      </v-textarea>
      <v-list>
        <template v-for="(c, i) in comments">
          <v-hover :key="i">
            <template #default="{ hover }">
              <v-list-item class="px-0 wrap mb-3">
                <v-list-item-avatar class="align-self-start">
                  <v-img
                    :src="
                      c.author.picture
                        ? c.author.picture
                        : require('@/assets/imgs/user-placeholder.jpg')
                    "
                    :lazy-src="require('@/assets/imgs/user-placeholder.jpg')"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-content class="py-0 flex-initial d-inline-block">
                  <div class="grey lighten-3 px-4 py-3 rounded-xl">
                    <v-list-item-title
                      dir="auto"
                      class="mb-1 font-weight-medium"
                    >
                      {{ c.author ? c.author.fname : '--' }}
                      {{ c.author ? c.author.lname : '--' }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                      dir="auto"
                      class="text--primary"
                      style="line-height: 1.3rem"
                    >
                      {{ c.content }}
                    </v-list-item-subtitle>
                  </div>
                  <div>
                    <v-btn text color="primary">Like</v-btn>
                    <v-btn text color="primary">Reply</v-btn>
                  </div>
                </v-list-item-content>
                <v-list-item-action class="align-self-start">
                  <v-btn v-show="hover" icon>
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-hover>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AllComments',
  props: {
    postId: {
      type: String,
      default: '0',
    },
  },
  data: () => ({
    comments: [
      {
        author: {
          fname: 'Hamdi',
          lname: 'Mohamed',
          picture: null,
        },
        content:
          'Veniam nisi eu sint irure amet ipsum cillum irure incididunt nostrud nisi. Labore ut do ea cupidatat et velit consectetur ullamco quis mollit ea. Veniam nulla ea veniam cillum ad enim Lorem proident cillum amet cupidatat. Aliqua Lorem ipsum irure eiusmod ea eiusmod magna sit qui velit ex ullamco.',
      },
      {
        author: {
          fname: 'Hamdi',
          lname: 'Mohamed',
          picture: null,
        },
        content: 'ايه الحلاوة دي',
      },
      {
        author: {
          fname: 'حمدي',
          lname: 'محمد',
          picture: null,
        },
        content: 'Aute voluptate consequat eu officia qui anim.',
      },
    ],
  }),
  computed: {
    userData() {
      return this.$store.state.userData
    },
    uid() {
      return this.$store.state.user?.uid
    },
  },
}
</script>
