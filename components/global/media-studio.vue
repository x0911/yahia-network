<template>
  <div>
    <v-dialog
      v-model="model"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      persistent
      max-width="900"
      scrollable
    >
      <v-card>
        <v-card-title
          :class="`mb-3 ${
            selectedMediaCounter > 0 ? 'white--text primary' : ''
          }`"
        >
          <template v-if="selectedMediaCounter > 0">
            <v-btn dark icon @click="unselectAll()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-divider dark vertical class="mx-2"></v-divider>
            {{ selectedMediaCounter }} Selected
            <v-spacer></v-spacer>
            <v-btn
              large
              class="px-6"
              :disabled="selectedMediaCounter == 0"
              color="white"
              @click="useMedias()"
            >
              Use
              {{ selectedMediaCounter }}
              media
            </v-btn>
          </template>
          <template v-else>
            Media Studio
            <v-spacer></v-spacer>
            <v-btn icon @click="getMedias()">
              <v-icon>mdi-reload</v-icon>
            </v-btn>
            <v-btn icon @click="close()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-card-title>
        <v-card-text>
          <v-item-group v-model="selectedMedia" multiple>
            <v-row>
              <v-col cols="6" sm="4" md="3">
                <v-btn
                  :disabled="
                    uploadingFiles.filter((f) => f.done == false).length > 0
                  "
                  :height="mediaHeight"
                  width="100%"
                  @click="openUploadMediaDialog"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    hidden="hidden"
                    style="display: none"
                    multiple
                    @change="uploadMedia"
                  />
                  <v-icon x-large color="secondary">mdi-plus</v-icon>
                </v-btn>
              </v-col>
              <template v-for="(file, i) in uploadingFiles">
                <v-col
                  v-if="file.done == false"
                  :key="`file_${i}`"
                  cols="6"
                  sm="4"
                  md="3"
                >
                  <v-card :height="mediaHeight" width="100%">
                    <v-layout
                      align-center
                      justify-center
                      align-content-center
                      fill-height
                    >
                      <div>
                        <v-progress-circular
                          color="primary"
                          size="70"
                          :value="file.perc"
                        >
                          <div>
                            {{ file.perc >= 100 ? 'init' : file.perc + '%' }}
                          </div>
                        </v-progress-circular>
                      </div>
                    </v-layout>
                  </v-card>
                </v-col>
              </template>
              <template v-for="(media, i) in medias">
                <v-col :key="`media_${i}`" cols="6" sm="4" md="3">
                  <v-item v-slot="{ active, toggle }">
                    <v-card
                      :height="mediaHeight"
                      width="100%"
                      flat
                      @click="toggle"
                    >
                      <v-avatar
                        v-if="
                          media &&
                          media.metadata &&
                          media.metadata.customMetadata &&
                          media.metadata.customMetadata.type &&
                          media.metadata.customMetadata.type == 'image'
                        "
                        rounded="sm"
                        :height="mediaHeight"
                        width="100%"
                      >
                        <v-progress-circular
                          v-if="media.loading"
                          indeterminate
                        ></v-progress-circular>
                        <v-img v-else :src="media.thumbnail">
                          <v-layout fill-height justify-end align-start>
                            <v-btn small dark>
                              <v-icon
                                v-text="
                                  active
                                    ? 'mdi-checkbox-marked'
                                    : 'mdi-checkbox-blank-outline'
                                "
                              ></v-icon>
                            </v-btn>
                          </v-layout>
                        </v-img>
                      </v-avatar>
                    </v-card>
                  </v-item>
                </v-col>
              </template>
            </v-row>
          </v-item-group>
        </v-card-text>
        <v-card-actions class="px-6 mt-3">
          <v-spacer></v-spacer>
          <v-btn class="px-4" large text @click="close()"> Cancel </v-btn>
          <v-btn
            large
            class="px-6"
            :disabled="selectedMediaCounter == 0"
            color="primary"
            @click="useMedias()"
          >
            Use
            {{ selectedMediaCounter }}
            media
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'MediaStudio',
  props: {},
  data: () => ({
    model: false,
    medias: [],
    listMedias: [],
    offset: 20,
    uploadingFiles: [],
    allowedFileTypes: {
      'image/png': 'image',
      'image/jpg': 'image',
      'image/jpeg': 'image',
      'video/mp4': 'video',
      'audio/mp3': 'video',
    },
    selectedMedia: [],
  }),
  computed: {
    selectedMediaCounter() {
      const selectedMedia = this.selectedMedia
      return selectedMedia.length
    },
    mediaHeight() {
      const h = this.$vuetify.breakpoint.smAndUp ? '150' : '100'
      return h
    },
    uid() {
      return this.$store.state.user?.uid
    },
  },
  watch: {
    model(v) {
      if (v === true && this.medias.length === 0) {
        const intval = setInterval(() => {
          clearInterval(intval)
          this.getMedias()
        }, 500)
      } else if (v === false) {
        this.setCachedMedia()
      }
    },
  },
  mounted() {
    //
  },
  methods: {
    useMedias() {
      const medias = this.medias
      const selectedMedia = this.selectedMedia
      const urls = []
      selectedMedia.forEach((index) => {
        urls.push(medias[index])
      })
      this.$emit('got-media', urls)
      this.close()
    },
    unselectAll() {
      const selectedMedia = this.selectedMedia
      for (let i = selectedMedia.length; i > 0; i--) {
        selectedMedia.splice(i - 1, 1)
      }
    },
    getMedias() {
      const uid = this.uid
      const currentMedias = this.medias
      const isOnline = this.$nuxt.isOnline
      for (let i = currentMedias.length; i > 0; i--) {
        currentMedias.splice(i - 1, 1)
      }
      if (isOnline) {
        const ref = this.$fire.storage.ref()
        ref
          .child(`media/${uid}/original`)
          .listAll()
          .then((res) => {
            const largeFiles = res.items
            largeFiles.sort(
              (a, b) =>
                Number(b.name.split('-')[0]) - Number(a.name.split('-')[0])
            )
            largeFiles.forEach(async (file, i) => {
              currentMedias.unshift({
                metadata: null,
                src: null,
                thumbnail: null,
                loading: true,
              })
              const url = await file.getDownloadURL()
              const metadata = await file.getMetadata()
              const thumbnail =
                metadata &&
                metadata.customMetadata &&
                metadata.customMetadata.noThumbnail
                  ? url
                  : await ref
                      .child(`media/${uid}/thumbnail/${file.name}`)
                      .getDownloadURL()
              const featured =
                metadata &&
                metadata.customMetadata &&
                metadata.customMetadata.noFeatured
                  ? url
                  : await ref
                      .child(`media/${uid}/featured/${file.name}`)
                      .getDownloadURL()
              currentMedias[i].metadata = metadata
              currentMedias[i].src = url
              currentMedias[i].thumbnail = thumbnail
              currentMedias[i].featured = featured
              currentMedias[i].loading = false
            })
          })
      } else {
        // Get cached media
        const stringified = this.$ls.get('media-studio-cached', '[]')
        const parsed = JSON.parse(stringified)
        parsed.forEach((media) => {
          currentMedias.push(media)
        })
      }
    },
    setCachedMedia() {
      const medias = this.medias
      const stringified = JSON.stringify(medias)
      this.$ls.set('media-studio-cached', stringified)
    },
    uploadMedia(medias) {
      const $this = this
      const uid = this.uid
      const currentMedias = this.medias
      const files = medias.target.files
      const ref = this.$fire.storage.ref()
      const uploadingFiles = this.uploadingFiles
      const allowedFileTypes = this.allowedFileTypes
      for (let i = uploadingFiles.length; i > 0; i--) {
        uploadingFiles.splice(i - 1, 1)
      }
      files.forEach((file, i) => {
        const metadata = {}
        metadata.contentType = file.type
        metadata.cacheControl = 'public, max-age=8000000' // 80000 // 3 Months
        const fileSplitter = file.name.split('.')
        const ext =
          fileSplitter.length > 1
            ? fileSplitter[fileSplitter.length - 1]
            : 'jpg'
        const filename = `${new Date().getTime()}-${Math.floor(
          Math.random() * 999
        )}.${ext}`
        uploadingFiles.push({
          perc: 0,
          name: filename,
          allowed: true,
          uploader: null,
          done: false,
        })
        if (Object.keys(allowedFileTypes).includes(metadata.contentType)) {
          metadata.customMetadata = {
            type: allowedFileTypes[metadata.contentType],
          }
          uploadingFiles[i].uploader = ref
            .child(`media/${uid}/original/${filename}`)
            .put(file) // , metadata
          uploadingFiles[i].uploader.on(
            'state_changed',
            (snapshot) => {
              const perc = Math.floor(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
              uploadingFiles[i].perc = perc
              switch (snapshot.state) {
                case 'paused':
                  //
                  break
                case 'running':
                  //
                  break
              }
            },
            (error) => {
              switch (error.code) {
                case 'storage/unauthorized':
                  //
                  break
                case 'storage/canceled':
                  //
                  break
                case 'storage/unknown':
                  //
                  break
              }
            },
            () => {
              uploadingFiles[i].uploader.snapshot.ref
                .getDownloadURL()
                .then(async (url) => {
                  // Create thumbnail if it is an image
                  let thumbnail = await $this.uploadThumbnail(
                    metadata,
                    file,
                    filename,
                    url
                  )
                  if (thumbnail === 'not-required') {
                    thumbnail = url
                    metadata.customMetadata.noThumbnail = true
                  }
                  let featured = await $this.uploadFeatured(
                    metadata,
                    file,
                    filename,
                    url
                  )
                  if (featured === 'not-required') {
                    featured = url
                    metadata.customMetadata.noFeatured = true
                  }
                  metadata.name = filename
                  await ref
                    .child(`media/${uid}/original/${filename}`)
                    .updateMetadata(metadata)
                  uploadingFiles[i].done = true
                  const obj = {
                    metadata,
                    src: url,
                    thumbnail,
                    featured,
                  }
                  currentMedias.unshift(obj)
                })
            }
          )
        } else {
          // filetype is not allowed
          uploadingFiles[i].allowed = false
        }
      })
    },
    uploadThumbnail(metadata, file, filename) {
      const $this = this
      return new Promise((resolve, reject) => {
        if (metadata.customMetadata.type !== 'image') {
          resolve(null)
        } else {
          const ref = $this.$fire.storage.ref()
          const uid = $this.uid
          const reader = new FileReader()
          reader.onload = (rE) => {
            const image = new Image()
            image.onload = (iE) => {
              const height = image.height
              const width = image.width
              let canvasHeight = 150
              let canvasWidth = 200
              if (height > canvasHeight || width > canvasWidth) {
                const canvas = document.createElement('canvas')
                if (height > width) {
                  // Normal Condition
                  canvasWidth = (canvasHeight * width) / height
                } else if (width > height) {
                  // Reversed Condition
                  canvasHeight = (canvasWidth * height) / width
                } else {
                  // They are equal
                  canvasWidth = canvasHeight
                }
                canvas.width = canvasWidth
                canvas.height = canvasHeight
                canvas
                  .getContext('2d')
                  .drawImage(image, 0, 0, canvasWidth, canvasHeight)
                // const dataUrl = canvas.toDataURL(metadata.contentType)
                canvas.toBlob((blob) => {
                  ref
                    .child(`media/${uid}/thumbnail/${filename}`)
                    .put(blob, metadata)
                    .then(async (snapshot) => {
                      const url = await snapshot.ref.getDownloadURL()
                      resolve(url)
                    })
                }, metadata.contentType)
              } else {
                // No need to have a thumbnail
                resolve('not-required')
              }
            }
            image.src = rE.target.result
          }
          reader.readAsDataURL(file)
        }
      })
    },
    uploadFeatured(metadata, file, filename) {
      const $this = this
      return new Promise((resolve, reject) => {
        if (metadata.customMetadata.type !== 'image') {
          resolve(null)
        } else {
          const ref = $this.$fire.storage.ref()
          const uid = $this.uid
          const reader = new FileReader()
          reader.onload = (rE) => {
            const image = new Image()
            image.onload = (iE) => {
              const height = image.height
              const width = image.width
              let canvasHeight = 500
              let canvasWidth = 560
              if (height > canvasHeight || width > canvasWidth) {
                const canvas = document.createElement('canvas')
                if (height > width) {
                  // Normal Condition
                  canvasWidth = (canvasHeight * width) / height
                } else if (width > height) {
                  // Reversed Condition
                  canvasHeight = (canvasWidth * height) / width
                } else {
                  // They are equal
                  canvasHeight = canvasWidth
                }
                canvas.width = canvasWidth
                canvas.height = canvasHeight
                canvas
                  .getContext('2d')
                  .drawImage(image, 0, 0, canvasWidth, canvasHeight)
                // const dataUrl = canvas.toDataURL(metadata.contentType)
                canvas.toBlob((blob) => {
                  ref
                    .child(`media/${uid}/featured/${filename}`)
                    .put(blob, metadata)
                    .then(async (snapshot) => {
                      const url = await snapshot.ref.getDownloadURL()
                      resolve(url)
                    })
                }, metadata.contentType)
              } else {
                // No need to have a featured image
                resolve('not-required')
              }
            }
            image.src = rE.target.result
          }
          reader.readAsDataURL(file)
        }
      })
    },
    openUploadMediaDialog() {
      const fileInput = this.$refs.fileInput
      if (fileInput) {
        return fileInput.click()
      }
    },
    open() {
      this.$set(this, 'model', true)
    },
    close() {
      this.unselectAll()
      this.$set(this, 'model', false)
    },
  },
}
</script>
