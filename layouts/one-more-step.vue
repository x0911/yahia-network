<template>
  <v-app>
    <kinesis-container class="d-flex w-100 h-100">
      <v-main>
        <v-container class="h-100">
          <v-layout
            align-center
            justify-center
            align-content-center
            fill-height
          >
            <div v-if="$vuetify.breakpoint.mdAndUp">
              <template v-for="(icon, i) in icons">
                <kinesis-element
                  :key="i"
                  :class="`random-icon-position v-${i + 1}`"
                  :strength="((i === 0 ? 1 : i + 1) * 10) / 2"
                >
                  <v-icon size="100" color="pink lighten-5">
                    {{ icon }}
                  </v-icon>
                </kinesis-element>
              </template>
            </div>
            <v-flex lg5 xl4 md8 sm10 xs11>
              <nuxt />
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </kinesis-container>
  </v-app>
</template>

<script>
export default {
  name: 'OneMoreStepLayout',
  data: () => ({
    icons: [
      'mdi-circle',
      'mdi-circle-outline',
      // 'mdi-pencil',
      'mdi-opera',
      'mdi-opacity',
      'mdi-orbit',
      'mdi-origin',
      'mdi-atom-variant',
      // 'mdi-grease-pencil',
      'mdi-comment-check-outline',
      'mdi-guitar-pick-outline',
      'mdi-guitar-pick',
      'mdi-tennis-ball',
    ],
  }),
}
</script>
