export const state = () => ({
  user: null,
  login: {
    mask: {
      phoneNumber: '+2 0## ## ## ## ##',
      code: '# # # # # #',
    },
  },
  methodsForEmail: {
    methods: [],
    email: '',
    model: false,
  },
})

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // perform logout operations
      state.user = null
    } else {
      // Do something with the authUser and the claims object...
      const {
        uid,
        displayName,
        isAnonymous,
        phoneNumber,
        photoURL,
        email,
        emailVerified,
      } = authUser
      state.user = {
        uid,
        displayName,
        isAnonymous,
        phoneNumber,
        photoURL,
        email,
        emailVerified,
      }
    }
  },
}

export const actions = {
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    // console.log(authUser)
    if (!authUser) {
      // claims = null
      // Perform logout operations
    } else {
      // Do something with the authUser and the claims object...
    }
  },
  logout({ commit, state, rootState }) {
    return new Promise((resolve, reject) => {
      return this.$fire.auth
        .signOut()
        .then(() => {
          console.log('Logout Done')
          resolve(true)
        })
        .catch((error) => {
          console.log(error)
          resolve(false)
        })
    })
  },
  sendVerificationCode({ commit, state, rootState }, phoneNumber) {
    // let $that = this;
    return new Promise((resolve, reject) => {
      return this.$fire.auth
        .signInWithPhoneNumber(
          phoneNumber.replace(/\s/g, ''),
          window.recaptchaVerifier
        )
        .then(function (confirmationResult) {
          // SMS sent.
          window.confirmationResult = confirmationResult
          resolve(true)
        })
        .catch(function (error) {
          console.log(error)
          resolve(false)
        })
    })
  },
  verifyCode({ commit, state, rootState }, code) {
    return new Promise((resolve, reject) => {
      if (window.confirmationResult) {
        return window.confirmationResult
          .confirm(code.replace(/\s/g, ''))
          .then(function (result) {
            // User signed in successfully.
            console.log(result.user)
            resolve(true)
          })
          .catch(function (error) {
            // User couldn't sign in (bad verification code?)
            console.log(error)
            resolve(false)
          })
      } else {
        resolve(false)
      }
    })
  },
}

export const getters = {
  //
}
