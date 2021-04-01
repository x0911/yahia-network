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
  removeRandomChars(str, length) {
    const removeRandomLetter = (str) => {
      const pos = Math.floor(Math.random() * str.length)
      return str.substring(0, pos) + str.substring(pos + 1)
    }
    for (let i = 0; i < length; i++) {
      str = removeRandomLetter(str)
    }
    return str
  },
  firestoreDocId() {
    const { v4 } = require('uuid/')
    const id = v4()
    const time = new Date().getTime()
    const fusion = `${id}${time}`.replace(/-/g, '')
    const stripped = this.removeRandomChars(fusion, 15)
    return stripped
  },
}
