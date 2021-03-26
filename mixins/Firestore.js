module.exports = {
  getPostsAuthors(docs) {
    const $this = this
    const posts = []
    return new Promise((resolve, reject) => {
      ;(async function loop() {
        for (let i = 0; i < docs.length; i++) {
          const doc = docs[i]
          const post = doc.data()
          post.hasPendingWrites = doc.metadata.hasPendingWrites
          post.id = doc.id
          const author = await $this.$fire.firestore
            .collection('users')
            .doc(post.uid)
            .get()
          post.author = author.data()
          posts.push(post)
          if (i === docs.length - 1) {
            resolve(posts)
          }
        }
      })()
    })
  },
}
