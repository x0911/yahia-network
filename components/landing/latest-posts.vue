<template>
  <v-container class="text-center">
    <v-sheet>
      <v-chip color="success-front" dark class="font-weight-bold pt-1" small>
        Latest Activity
      </v-chip>
      <v-card-title class="d-block font-size-30 font-weight-medium">
        Read our latest posts
      </v-card-title>
      <v-card-text class="pt-16 text-xs-start">
        <v-row>
          <template v-for="(post, i) in posts">
            <v-col :key="i" cols="6" lg="3">
              <v-card
                class="translate-on-hover flexed fill-height"
                elevation="8"
                @click="() => {}"
              >
                <v-img
                  height="150"
                  :src="`https://htmlstream.com/front/assets/img/500x280/img${
                    i + 9
                  }.jpg`"
                ></v-img>
                <v-card-text
                  class="pb-0 font-weight-regular text-uppercase primary--text"
                >
                  {{ post.category ? post.category : 'uncategorized' }}
                </v-card-text>
                <v-list color="pt-0 transparent">
                  <v-list-item three-line class="wrap">
                    <v-list-item-content>
                      <v-list-item-title
                        class="mb-2 font-weight-medium font-size-16 lh-1-5"
                      >
                        {{ post.title }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="no-wrap accent-text lh-1-5">
                        {{ post.content }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-card-text>
      <v-card-actions class="mt-16 justify-center">
        <div
          class="d-inline-block rounded-xl py-4 px-9"
          style="border: 1px solid rgba(0, 0, 0, 0.1)"
        >
          <small class="blue-grey--text text--darken-1">
            Want to read more?
          </small>
          <vc-btn to="/get-started" color="primary" class="ms-4">
            Get Started
            <v-icon class="ms-1" small>mdi-chevron-right</v-icon>
          </vc-btn>
        </div>
      </v-card-actions>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: 'LatestPosts',
  data: () => ({
    posts: [
      {
        id: '1532',
        title: 'First post in Yahia social network',
        content:
          'Hello, How are you doing? This is the lorem ipsum post in my social network application. Excepteur anim esse eu do esse id irure ut ut aute labore nulla. Mollit ea velit aliqua minim ullamco fugiat incididunt tempor adipisicing. Elit nostrud ex pariatur aliquip dolor est pariatur nisi sint est enim proident consectetur non.',
        img: 'https://htmlstream.com/front/assets/img/500x280/img9.jpg',
        category: '',
        counters: {
          comments: 7,
          love: 19,
        },
      },
      {
        id: '324',
        title: 'How to create featured posts?',
        content:
          'If you want your post to show up in the landing page, you have to do these things',
        img: 'https://htmlstream.com/front/assets/img/500x280/img10.jpg',
        category: 'app feature',
        counters: {
          comments: 22,
          love: 65,
        },
      },
      {
        id: '654',
        title: 'Assign your account to different providers',
        content:
          'Login using multiple platforms into the same account is possible in our social network, all you have to do is',
        img: 'https://htmlstream.com/front/assets/img/500x280/img10.jpg',
        category: 'tutorial',
        counters: {
          comments: 98,
          love: 156,
        },
      },
      {
        id: '1235',
        title: 'Reset your password in multiple ways',
        content:
          'If you forgot your password, you have 5 paths to walk on in order to reset your password',
        img: 'https://htmlstream.com/front/assets/img/500x280/img10.jpg',
        category: 'account managment',
        counters: {
          comments: 65,
          love: 41,
        },
      },
    ],
  }),
}
</script>
