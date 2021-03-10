<template>
  <div class="pb-16 mb-12 p-relative">
    <v-container>
      <v-sheet color="transparent">
        <div
          class="mb-10 font-size-32 font-weight-medium text-center text-md-start"
        >
          <div>Loved by doctors and patients</div>
          <div>across Egypt.</div>
        </div>
        <v-card-text>
          <v-layout align-center justify-center align-content-center>
            <div>
              <v-row>
                <template v-for="(review, i) in reviews">
                  <v-col :key="i">
                    <v-card
                      elevation="5"
                      :color="review.color ? review.color : 'white'"
                      :dark="review.dark"
                      class="flexed fill-height"
                      :style="`
                      ${
                        review.color
                          ? 'box-shadow: 0px 7px 8px -4px rgba(25, 118, 210, 0.2),0px 12px 17px 2px rgba(25, 118, 210, 0.14),0px 5px 22px 4px rgba(25, 118, 210, 0.12) !important;'
                          : ''
                      }
                      `"
                    >
                      <v-card-text
                        :class="review.dark ? 'white--text' : 'text--primary'"
                      >
                        <div class="mb-5">
                          <v-rating
                            dense
                            length="5"
                            size="20"
                            readonly
                            :color="'orange lighten-1'"
                            :value="review.rating"
                          ></v-rating>
                        </div>
                        <div>
                          {{ review.text }}
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-img :src="review.avatar"></v-img>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="review.by"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              class="text-caption"
                              v-text="review.job"
                            ></v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </template>
              </v-row>
            </div>
          </v-layout>
        </v-card-text>
      </v-sheet>
    </v-container>
    <figure
      style="
        position: absolute;
        bottom: 0;
        right: 0;
        margin-bottom: -3.4rem;
        width: 100%;
      "
    >
      <svg
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1920 100.1"
      >
        <path fill="#fff" d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"></path>
      </svg>
    </figure>
  </div>
</template>

<script>
export default {
  data: () => ({
    reviews: [
      {
        by: 'Dr. Christina Kray',
        job: 'Faculty of Medicine, Sohag',
        avatar: 'https://htmlstream.com/front/assets/img/100x100/img2.jpg',
        text:
          'Duis sunt velit magna non laboris sit do irure ad. Est consequat laborum qui nulla in sit sit. Sit sit commodo ullamco adipisicing tempor dolore irure. Lorem sunt dolor velit pariatur Lorem culpa eiusmod reprehenderit.',
        color: '',
        rating: 5,
      },
      {
        by: 'Dr. Christina Kray',
        job: 'Faculty of Medicine, Sohag',
        avatar: 'https://htmlstream.com/front/assets/img/100x100/img2.jpg',
        text:
          'Sint est eu ut in culpa occaecat do tempor. Ipsum anim anim incididunt eiusmod reprehenderit fugiat laborum est elit Lorem enim sit irure dolore.',
        color: 'primary',
        rating: 5,
        dark: true,
      },
      {
        by: 'Dr. Christina Kray',
        job: 'Faculty of Medicine, Sohag',
        avatar: 'https://htmlstream.com/front/assets/img/100x100/img2.jpg',
        text:
          'Sint aliquip do ex duis ad deserunt ad est Lorem ad magna laborum aliqua. Consequat non consequat aliquip ex officia elit exercitation excepteur commodo cillum.',
        color: '',
        rating: 5,
      },
    ],
  }),
}
</script>
