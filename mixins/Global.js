module.exports = {
  ucFirst($text) {
    const ucfirst = $text
      .replace('_', ' ')
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
    return ucfirst
  },
  setLoading(state = true) {
    this.$nextTick(() => {
      if (state) {
        this.$nuxt.$loading.start()
        const intval = setInterval(() => {
          this.$nuxt.$loading.finish()
          clearInterval(intval)
        }, 5000)
      } else {
        const intval = setInterval(() => {
          this.$nuxt.$loading.finish()
          clearInterval(intval)
        }, 500)
      }
    })
  },
  pushRoute(r) {
    this.$nextTick(() => {
      this.$router.push(r)
    })
  },
  dataURLToBlob(dataURL) {
    const BASE64_MARKER = ';base64,'
    if (dataURL.includes(BASE64_MARKER)) {
      const parts = dataURL.split(',')
      const contentType = parts[0].split(':')[1]
      const raw = parts[1]
      return new Blob([raw], { type: contentType })
    }
    const parts = dataURL.split(BASE64_MARKER)
    const contentType = parts[0].split(':')[1]
    const raw = window.atob(parts[1])
    const rawLength = raw.length
    const uInt8Array = new Uint8Array(rawLength)
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], { type: contentType })
  },
}
