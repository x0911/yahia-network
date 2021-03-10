module.exports = {
  methods: {
    ...require('./GlobalSignIn.js'),
    ...require('./GoogleSignIn.js'),
    ...require('./FacebookSignIn.js'),
    ...require('./GithubSignIn.js'),
    ...require('./YahooSignIn.js'),
    // ...require('./HexToRGB.js'),
  },
}
