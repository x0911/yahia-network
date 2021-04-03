<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <v-skeleton-loader
      elevation="6"
      class="mb-8"
      type="list-item-avatar, list-item-three-line, actions"
      :loading="loading"
    >
      <v-card v-if="post.isDeleted" color="grey lighten-5">
        <v-layout fill-height align-center justify-center align-content-center>
          <v-flex grow>
            <v-card-text class="text-center font-weight-medium">
              <div class="mb-4">
                <v-icon size="35">mdi-information-outline</v-icon>
              </div>
              <div>This post is deleted</div>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
      <v-card v-else v-bind="openSinglePost">
        <v-card-text class="pb-0">
          <v-list-item class="px-0 mx-0">
            <v-list-item-avatar
              v-if="post.author"
              color="grey lighten-4"
              size="50"
              class="align-center"
            >
              <v-img
                :src="
                  post.author.picture
                    ? post.author.picture
                    : require('@/assets/imgs/user-placeholder.jpg')
                "
                :lazy-src="require('@/assets/imgs/user-placeholder.jpg')"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">
                {{ post.author ? post.author.fname : '--' }}
                {{ post.author ? post.author.lname : '--' }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-btn
                  small
                  text
                  class="px-0"
                  color="secondary"
                  active-class="no-active"
                  :to="`/app/posts/${post.id}`"
                >
                  <span v-if="post.createdDate">
                    {{ post.createdDate.toDate() | moment('from', 'now') }}
                  </span>
                  <span v-else> --- </span>
                </v-btn>
                <v-menu
                  :disabled="post.uid !== uid"
                  transition="scroll-y-reverse-transition"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      v-if="
                        post.audience && audiences && audiences[post.audience]
                      "
                      small
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click.prevent="() => {}"
                    >
                      <v-icon
                        small
                        v-text="audiences[post.audience].icon"
                      ></v-icon>
                    </v-btn>
                  </template>
                  <v-list nav dense max-width="340">
                    <v-list-item-group
                      v-model="post.audience"
                      mandatory
                      active-class="primary--text"
                    >
                      <template v-for="(item, key, i) in audiences">
                        <v-list-item
                          :key="i"
                          :value="key"
                          class="wrap"
                          @click="changeAudience(key)"
                        >
                          <v-list-item-avatar>
                            <v-icon v-text="item.icon"></v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="item.text"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              v-text="item.desc"
                            ></v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text>
              <v-tooltip
                v-if="post.hasPendingWrites"
                top
                color="warning"
                max-width="300"
              >
                <template #activator="{ on }">
                  <v-btn icon color="warning" v-on="on">
                    <v-icon>mdi-progress-question</v-icon>
                  </v-btn>
                </template>
                <div class="py-1">
                  This post has pending changes. Once you connect to the
                  internet, the changes will be published
                </div>
              </v-tooltip>
              <v-menu
                transition="scroll-y-reverse-transition"
                max-width="300"
                min-width="300"
              >
                <template #activator="{ on }">
                  <v-btn icon v-on="on" @click.prevent="() => {}">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list dense nav>
                  <template v-for="(option, io) in postOptions">
                    <v-list-item :key="io" @click="runPostOption(option.value)">
                      <v-list-item-avatar>
                        <v-icon>{{ option.icon }}</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ option.name }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-menu>
            </v-list-item-action-text>
          </v-list-item>
        </v-card-text>
        <v-card-text
          v-if="post.content"
          class="text--primary"
          style="font-size: 1rem; text-align: start; line-height: 1.65rem"
          dir="auto"
          v-html="post.content"
        >
        </v-card-text>
        <v-card-text v-if="post.medias && post.medias.length > 0">
          <v-row>
            <template v-for="(media, i) in post.medias">
              <v-col
                v-if="post.medias.length < 5 || i < 3"
                :key="i"
                :cols="
                  post.medias.length == 1 || (post.medias.length == 3 && i == 0)
                    ? '12'
                    : '6'
                "
              >
                <v-card
                  height="100%"
                  max-height="500"
                  width="100%"
                  @click.prevent="() => {}"
                >
                  <v-avatar
                    rounded="sm"
                    height="100%"
                    max-height="500"
                    width="100%"
                  >
                    <v-img
                      aspect-ratio="1"
                      :src="media.featured"
                      :lazy-src="media.thumbnail"
                    ></v-img>
                  </v-avatar>
                </v-card>
              </v-col>
            </template>
            <v-col v-if="post.medias.length > 4" cols="6">
              <v-card
                height="100%"
                max-height="500"
                width="100%"
                style="position: relative"
                @click.prevent="() => {}"
              >
                <v-row class="ma-0">
                  <template v-for="(media, i) in post.medias">
                    <v-col
                      v-if="i > 2 && i < 7"
                      :key="i"
                      class="pa-0"
                      :cols="
                        post.medias.length - 3 == 1 ||
                        (post.medias.length - 3 == 3 && i == 3)
                          ? '12'
                          : '6'
                      "
                    >
                      <v-card width="100%" height="100%">
                        <v-avatar rounded="sm" height="100%" width="100%">
                          <v-img
                            aspect-ratio="1"
                            :src="media.thumbnail"
                          ></v-img>
                        </v-avatar>
                      </v-card>
                    </v-col>
                  </template>
                </v-row>
                <v-card
                  dark
                  color="rgba(0,0,0,0.7)"
                  height="100%"
                  max-height="500"
                  width="100%"
                  style="position: absolute; top: 0; left: 0"
                >
                  <v-layout
                    fill-height
                    align-center
                    justify-center
                    align-content-center
                  >
                    <v-card-text class="text-center">
                      <div>
                        <v-icon x-large>mdi-plus</v-icon>
                      </div>
                      <div>
                        {{ post.medias.length - 3 }}
                        More
                      </div>
                    </v-card-text>
                  </v-layout>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <template v-for="(r, i) in orderedReactions">
            <v-tooltip :key="i" top>
              <template #activator="{ on }">
                <v-avatar
                  :style="`${i > 0 ? 'margin-start: -4px' : ''}; z-index: ${
                    orderedReactions.length - i
                  }`"
                  size="20"
                  v-on="on"
                >
                  <v-img
                    :src="
                      require(`@/assets/imgs/reactions/${r.value}-static.svg`)
                    "
                  ></v-img>
                </v-avatar>
              </template>
              <span>{{ r.counter }} {{ r.title }}</span>
            </v-tooltip>
          </template>
          <span
            :class="`font-weight-${
              reactionCounter > 0 ? 'bold ms-2' : 'medium'
            }`"
          >
            {{
              reactionCounter > 0 ? reactionCounter : 'Be the first to react'
            }}
          </span>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="text-center">
          <v-layout>
            <v-flex>
              <v-menu
                transition="scroll-x-transition"
                top
                open-on-hover
                :open-delay="$vuetify.breakpoint.smAndDown ? 100 : 600"
                :close-delay="$vuetify.breakpoint.smAndDown ? 100 : 500"
                :open-on-click="$vuetify.breakpoint.smAndDown ? true : false"
                :open-on-focus="false"
                :close-on-click="false"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    large
                    text
                    class="px-4 w-100"
                    v-bind="attrs"
                    v-on="on"
                    @click.prevent="
                      $vuetify.breakpoint.smAndDown
                        ? () => {}
                        : toggleReaction('like')
                    "
                  >
                    <template v-if="myReaction">
                      <v-avatar size="25">
                        <v-img
                          :src="
                            require(`@/assets/imgs/reactions/${myReaction}-static.svg`)
                          "
                        ></v-img>
                      </v-avatar>
                    </template>
                    <v-icon v-else color="secondary"
                      >mdi-thumb-up-outline</v-icon
                    >
                    <span
                      :class="`ms-2 ${myReaction ? 'font-weight-black' : ''}`"
                      :style="`${
                        myReaction
                          ? 'color: ' + reactions[myReaction].color
                          : ''
                      }`"
                    >
                      {{ myReaction ? reactions[myReaction].title : 'Like' }}
                    </span>
                  </v-btn>
                </template>
                <v-card
                  rounded="xl"
                  class="overflow-hidden"
                  style="border: 2px solid #eee"
                >
                  <v-card-text class="px-0 py-1 ma-0">
                    <v-row justify="space-around" class="my-0 mx-0">
                      <template v-for="(r, key, i) in reactions">
                        <v-col
                          :key="i"
                          cols="4"
                          sm="2"
                          class="text-center py-0 px-0"
                        >
                          <v-hover>
                            <template #default="{ hover }">
                              <v-btn
                                width="60"
                                height="60"
                                class="pa-0"
                                icon
                                :style="hover ? 'transform: scale(1.3)' : ''"
                                @click="toggleReaction(r.value)"
                              >
                                <v-avatar size="70">
                                  <v-img
                                    :src="
                                      require(`@/assets/imgs/reactions/${r.value}-small.gif`)
                                    "
                                  ></v-img>
                                </v-avatar>
                              </v-btn>
                            </template>
                          </v-hover>
                        </v-col>
                      </template>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-menu>
            </v-flex>
            <v-flex>
              <v-btn large text class="px-4 w-100" @click.prevent="() => {}">
                <v-icon class="me-2">mdi-comment-outline</v-icon>
                Comment
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-skeleton-loader>
    <!-- Start: Post Options -->
    <v-dialog v-model="models.delete" persistent max-width="450" scrollable>
      <!-- Delete Post -->
      <v-card>
        <v-card-title>
          Delete post
          <v-spacer></v-spacer>
          <v-btn icon @click="models.delete = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          Do you really want to delete this post? This action can't be undone.
        </v-card-text>
        <v-card-actions class="px-4">
          <v-spacer></v-spacer>
          <v-btn class="px-4" large @click="models.delete = false">
            Cancel
          </v-btn>
          <v-btn class="px-4" large color="red" text @click="deletePost()">
            Delete Post
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="models.report"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      persistent
      max-width="500"
      scrollable
    >
      <!-- Report Post -->
      <v-card :loading="options_loading" :disabled="options_loading">
        <template v-if="report.reported">
          <v-layout
            fill-height
            align-center
            justify-center
            align-content-center
          >
            <v-flex grow>
              <div class="text-center pt-10 pb-6">
                <v-card-text class="font-weight-medium">
                  <div class="mb-4">
                    <v-icon size="35">mdi-check-circle-outline</v-icon>
                  </div>
                  <div>Your report has been sent</div>
                </v-card-text>
                <v-card-title class="mb-5 d-block">
                  Thank you for helping keep your app safe
                </v-card-title>
                <v-card-actions class="justify-center">
                  <v-btn large class="px-6" @click="models.report = false">
                    Close
                  </v-btn>
                  <!-- <vc-btn large class="px-6" color="error">
                    Block
                    {{ post.author ? post.author.fname : '--' }}
                    {{ post.author ? post.author.lname : '--' }}
                  </vc-btn> -->
                </v-card-actions>
              </div>
            </v-flex>
          </v-layout>
        </template>
        <template v-else>
          <v-card-title>
            <div>
              <div>Report Post</div>
              <div>
                <small>What made you concerned about it?</small>
              </div>
            </div>
            <v-spacer></v-spacer>
            <v-btn icon @click="models.report = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pt-4">
            <v-select
              v-model="report.body.reason"
              outlined
              label="Reason"
              :items="report.reasons"
            ></v-select>
            <v-textarea
              v-model="report.body.details"
              outlined
              label="More details"
              counter
              auto-grow
              placeholder="Kindly tell us more about the problem"
            ></v-textarea>
          </v-card-text>
          <v-card-actions class="px-6 pb-4">
            <v-spacer></v-spacer>
            <v-btn class="px-6" large @click="models.report = false">
              Cancel
            </v-btn>
            <vc-btn class="px-6" large color="primary" :btn-click="reportPost">
              Submit
            </vc-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="models.history"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      persistent
      max-width="700"
      scrollable
    >
      <!-- Previous Versions -->
      <v-card>
        <v-card-title>
          Previous versions
          <v-spacer></v-spacer>
          <v-btn icon @click="models.history = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-2">
          <v-skeleton-loader
            :loading="options_loading"
            type="list-item-three-line@2"
          >
            <div>
              <template v-for="(version, i) in preVersions">
                <div :key="i">
                  <div>
                    <v-list-item class="px-0">
                      <v-list-item-avatar
                        v-if="post.author"
                        color="grey lighten-4"
                        size="50"
                        class="align-center"
                      >
                        <v-img
                          :src="
                            post.author.picture
                              ? post.author.picture
                              : require('@/assets/imgs/user-placeholder.jpg')
                          "
                          :lazy-src="
                            require('@/assets/imgs/user-placeholder.jpg')
                          "
                        ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="font-weight-medium">
                          {{ post.author ? post.author.fname : '--' }}
                          {{ post.author ? post.author.lname : '--' }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <span v-if="version.date">
                            {{ version.date.toDate() | moment('from', 'now') }}
                          </span>
                          <span v-else> --- </span>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <div
                      v-if="version.content"
                      class="text--primary"
                      style="
                        font-size: 1rem;
                        text-align: start;
                        line-height: 1.65rem;
                      "
                      dir="auto"
                      v-html="version.content"
                    ></div>
                    <div v-else>
                      <i>-- no text content --</i>
                    </div>
                    <div
                      v-if="version.medias && version.medias.length > 0"
                      class="mt-2"
                    >
                      <v-row>
                        <template v-for="(media, mi) in version.medias">
                          <v-col
                            v-if="
                              ($vuetify.breakpoint.smAndUp &&
                                (version.medias.length < 7 || mi < 5)) ||
                              ($vuetify.breakpoint.xs &&
                                (version.medias.length < 5 || mi < 3))
                            "
                            :key="mi"
                            :cols="$vuetify.breakpoint.smAndUp ? '2' : '3'"
                          >
                            <v-card height="100%" max-height="150" width="100%">
                              <v-avatar
                                rounded="sm"
                                height="100%"
                                max-height="150"
                                width="100%"
                              >
                                <v-img
                                  aspect-ratio="1"
                                  :src="media.thumbnail"
                                ></v-img>
                              </v-avatar>
                            </v-card>
                          </v-col>
                        </template>
                        <template
                          v-if="
                            ($vuetify.breakpoint.smAndUp &&
                              version.medias.length > 6) ||
                            ($vuetify.breakpoint.xs &&
                              version.medias.length > 4)
                          "
                        >
                          <v-col
                            :cols="$vuetify.breakpoint.smAndUp ? '2' : '3'"
                          >
                            <v-card
                              color="grey darken-1"
                              dark
                              height="100%"
                              max-height="150"
                              width="100%"
                            >
                              <v-layout
                                fill-height
                                align-center
                                justify-center
                                align-content-center
                              >
                                <div>
                                  +{{
                                    version.medias.length -
                                    ($vuetify.breakpoint.smAndUp ? 5 : 3)
                                  }}
                                </div>
                              </v-layout>
                            </v-card>
                          </v-col>
                        </template>
                      </v-row>
                    </div>
                  </div>
                  <v-divider
                    v-if="i < preVersions.length - 1"
                    class="my-4"
                  ></v-divider>
                </div>
              </template>
            </div>
          </v-skeleton-loader>
        </v-card-text>
        <v-card-actions class="px-4">
          <v-spacer></v-spacer>
          <v-btn class="px-6" large @click="models.history = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End: ../Post Options -->
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  filters: {
    filterContent(text) {
      if (text) {
        text = text.replace(/(?:\r\n|\r|\n)/g, '<br />')
      }
      return text
    },
  },
  props: {
    id: {
      type: String,
      default: '0',
    },
  },
  data: () => ({
    models: {
      history: false,
      delete: false,
      report: false,
    },
    preVersions: [],
    loading: true,
    options_loading: false,
    deleted: false,
    reactions: {
      like: {
        title: 'Like',
        value: 'like',
        color: '#2078f4',
      },
      love: {
        title: 'Love',
        value: 'love',
        color: '#f33e58',
      },
      haha: {
        title: 'Haha',
        value: 'haha',
        color: '#f7b125',
      },
      sad: {
        title: 'Sad',
        value: 'sad',
        color: '#f7b125',
      },
      wow: {
        title: 'Wow',
        value: 'wow',
        color: '#f7b125',
      },
      angry: {
        title: 'Angry',
        value: 'angry',
        color: '#e9710f',
      },
    },
    post: {},
    contentFeaturedLength: 100,
    report: {
      body: {
        reason: null,
        details: '',
      },
      reported: true,
      reasons: [
        {
          text: 'Nudity',
          value: 'nudity',
        },
        {
          text: 'Violence',
          value: 'violence',
        },
        {
          text: 'Harassment',
          value: 'harassment',
        },
        {
          text: 'False Information',
          value: 'false_info',
        },
        {
          text: 'Spam',
          value: 'spam',
        },
        {
          text: 'Hate Speech',
          value: 'hate',
        },
        {
          text: 'Terrorism',
          value: 'terrorism',
        },
        {
          text: 'Something else',
          value: 'else',
        },
      ],
    },
  }),
  computed: {
    uid() {
      return this.$store.state.user?.uid
    },
    audiences() {
      return this.$store.state.options.post.audiences
    },
    postOptions() {
      const currentUid = this.uid
      const { uid, createdDate, lastModifiedDate } = this.post
      const options = []
      const tmp = {
        edit: {
          name: 'Edit post',
          value: 'edit',
          icon: 'mdi-pencil',
        },
        history: {
          name: 'View edit history',
          value: 'history',
          icon: 'mdi-history',
        },
        delete: {
          name: 'Delete post',
          value: 'delete',
          icon: 'mdi-delete-outline',
        },
        report: {
          name: 'Find support or Report post',
          value: 'report',
          icon: 'mdi-information-outline',
        },
      }
      if (currentUid && uid && createdDate && lastModifiedDate) {
        if (
          createdDate.toDate().getTime() !== lastModifiedDate.toDate().getTime()
        ) {
          options.push(tmp.history)
        }
        if (currentUid === uid) {
          options.push(tmp.edit)
          options.push(tmp.delete)
        } else {
          options.push(tmp.report)
        }
      }
      return options
    },
    reactionCounter() {
      const post = this.post
      const reactions = this.reactions
      let counter = 0
      Object.values(reactions).forEach((r) => {
        counter +=
          post[r.value] && Array.isArray(post[r.value])
            ? post[r.value].length
            : 0
      })
      return counter
    },
    myReaction() {
      const post = this.post
      const uid = this.uid
      const reactions = this.reactions
      let myReaction = null
      Object.values(reactions).forEach((r) => {
        if (post[r.value] && post[r.value].includes(uid)) {
          myReaction = r.value
        }
      })
      return myReaction
    },
    orderedReactions() {
      const reactions = this.reactions
      const post = this.post
      const postReactions = []
      Object.values(reactions).forEach((r) => {
        const counter = post[r.value] ? post[r.value].length : 0
        if (counter > 0) {
          postReactions.push({
            ...r,
            counter,
          })
        }
      })
      const orderedReactions = postReactions.sort(
        (a, b) => a.counter - b.counter
      )
      return orderedReactions
    },
    isSinglePost() {
      const id = this.post.id
      const path = `/app/posts/${id}`
      const routePath = this.$route.fullPath
      return path === routePath
    },
    openSinglePost() {
      const obj = {}
      const id = this.post.id
      const path = `/app/posts/${id}`
      const routePath = this.$route.fullPath
      const isMobile = this.$vuetify.breakpoint.smAndDown
      if (path !== routePath && isMobile) {
        obj.to = path
      }
      return obj
    },
  },
  watch: {
    'models.history'(v) {
      if (v === true) {
        this.getPreviousVersions()
      }
    },
  },
  mounted() {
    if (this.id && this.id.trim().length > 4 && (!this.post || !this.post.id)) {
      this.getPost()
    }
  },
  methods: {
    getPreviousVersions() {
      const id = this.id
      const preVersions = this.preVersions
      for (let i = preVersions.length; i > 0; i--) {
        preVersions.splice(i - 1, 1)
      }
      this.$set(this, 'options_loading', true)
      this.$fire.firestore
        .collection('posts')
        .doc(id)
        .collection('history')
        .orderBy('date', 'desc')
        .get()
        .then((snapshots) => {
          snapshots.forEach((shot) => {
            const data = shot.data()
            preVersions.push(data)
          })
          this.$set(this, 'options_loading', false)
        })
    },
    getPost() {
      const id = this.id
      const contentFeaturedLength = this.contentFeaturedLength
      this.$fire.firestore
        .collection('posts')
        .doc(id)
        .onSnapshot(
          { includeMetadataChanges: true },
          async (snapshot) => {
            const post = await this.getPostAuthor(snapshot)
            this.$emit('fetched', {
              author: `${post.author.fname} ${post.author.lname}`,
              content: post.content.substring(0, contentFeaturedLength),
              uid: post.uid,
            })
            this.$set(this, 'post', post)
            this.$set(this, 'loading', false)
            if (post.isDeleted) {
              this.$set(this, 'deleted', true)
            }
          },
          (error) => {
            console.log('Error loading post: ' + id, error)
          }
        )
    },
    toggleReaction(reaction) {
      const id = this.post.id
      const uid = this.uid
      const updateObj = {}
      const myReaction = this.myReaction
      if (myReaction) {
        updateObj[
          myReaction
        ] = this.$fireModule.firestore.FieldValue.arrayRemove(uid)
      }
      if (reaction !== myReaction) {
        updateObj[reaction] = this.$fireModule.firestore.FieldValue.arrayUnion(
          uid
        )
      }
      this.setLoading(true)
      this.$fire.firestore
        .collection('posts')
        .doc(id)
        .update(updateObj)
        .then((x) => {
          //
        })
        .catch((err) => {
          console.log("Couldn't like this post", err)
        })
        .finally(() => {
          this.setLoading(false)
        })
    },
    changeAudience(newAudience) {
      const { id, uid, audience } = this.post
      const userId = this.uid
      if (uid === userId && newAudience !== audience) {
        this.setLoading(true)
        this.$fire.firestore
          .collection('posts')
          .doc(id)
          .update({
            audience: newAudience,
          })
          .then((x) => {
            //
          })
          .catch((err) => {
            console.log("Couldn't change audience for this post", err)
          })
          .finally(() => {
            this.setLoading(false)
          })
      }
    },
    deletePost() {
      const id = this.post.id
      this.$fire.firestore.collection('posts').doc(id).update({
        isDeleted: true,
      })
      this.$set(this.models, 'delete', false)
      this.$emit('deleted')
    },
    editPost() {
      this.$emit('edit')
    },
    reportPost() {
      const { reason, details } = this.report.body
      const id = this.post.id
      const uid = this.uid
      const currentDate = new Date()
      let filteredDetails = details.trim()
      filteredDetails = filteredDetails.replace(/(<([^>]+)>)/gi, '')
      filteredDetails = filteredDetails.replace(/(?:\r\n|\r|\n)/g, '<br />')
      if (!reason) {
        // Reason is a must
        return
      }
      this.$set(this, 'options_loading', true)
      this.$fire.firestore
        .collection('posts')
        .doc(id)
        .collection('reports')
        .add({
          reason,
          details: filteredDetails,
          uid,
          date: currentDate,
        })
      const intval = setInterval(() => {
        clearInterval(intval)
        this.$set(this, 'options_loading', false)
        this.$set(this.report, 'reported', true)
      }, 1000)
    },
    runPostOption(option) {
      switch (option) {
        case 'delete':
          this.$set(this.models, 'delete', true)
          break
        case 'edit':
          this.editPost()
          break
        case 'history':
          this.$set(this.models, 'history', true)
          break
        case 'report':
          this.$set(this.report, 'reported', false)
          this.$set(this.report.body, 'reason', null)
          this.$set(this.report.body, 'details', '')
          this.$set(this.models, 'report', true)
          break
      }
    },
  },
}
</script>
