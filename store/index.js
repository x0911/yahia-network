export const state = () => ({
  firebaseReady: false,
  user: {
    uid: 'eDDFrdK7BeX6el3JUXrLwVFxRU03',
    displayName: null,
    isAnonymous: false,
    phoneNumber: '+201113429944',
    photoURL: null,
    email: null,
    emailVerified: false,
  },
  userData: null,
  login: {
    mask: {
      phoneNumber: '+20 ### ### ## ##',
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
  ON_REQUEST_USER_DATA: (state, data) => {
    state.userData = data
  },
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
  ON_GET_FIREBASE_READY(state) {
    state.firebaseReady = true
  },
}

export const actions = {
  getFirebaseReady({ commit, state, rootState }) {
    return new Promise((resolve, reject) => {
      if (!state.firebaseReady) {
        this.$fire
          .authReady()
          .then(() => {})
          .catch(() => {})
          .finally(async () => {
            await this.$fire.firestoreReady()
            this.$fireModule.firestore().settings({
              cacheSizeBytes: this.$fire.firestore.CACHE_SIZE_UNLIMITED,
            })
            this.$fireModule.firestore().enablePersistence()
            await this.$fire.storageReady()
            await this.$fire.functionsReady()
            this.$fireAuthStore.subscribe()
            const intval = setInterval(() => {
              commit('ON_GET_FIREBASE_READY')
              clearInterval(intval)
              resolve(true)
            }, 5000)
          })
      } else {
        resolve(true)
      }
    })
  },
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    // console.log("I'm in this action")
    if (!authUser) {
      // claims = null
      // Perform logout operations
    } else {
      // Do something with the authUser and the claims object...
      // Get User Data
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
          resolve({ ok: true })
        })
        .catch(function (error) {
          console.log(error)
          resolve({ ok: false, error })
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
            resolve({ ok: true })
          })
          .catch(function (error) {
            // User couldn't sign in (bad verification code?)
            console.log(error)
            resolve({ ok: false, error })
          })
      } else {
        resolve({ ok: false, error: 'no-confirmation-result' })
      }
    })
  },
}

export const getters = {
  //
}
