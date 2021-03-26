module.exports = {
  methods: {
    ...require('./Global.js'),
    ...require('./GlobalSignIn.js'),
    ...require('./GoogleSignIn.js'),
    ...require('./FacebookSignIn.js'),
    ...require('./GithubSignIn.js'),
    ...require('./YahooSignIn.js'),
    ...require('./Firestore.js'),
    // ...require('./HexToRGB.js'),
  },
  data: () => ({
    nomask: {
      mask: '*'.repeat(255),
      tokens: {
        '*': { pattern: /./ },
      },
    },
  }),
}
