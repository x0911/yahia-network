function MakeQuerablePromise(promise) {
  if (promise.isResolved) return promise
  let isPending = true
  let isRejected = false
  let isFulfilled = false
  const result = promise.then(
    function (v) {
      isFulfilled = true
      isPending = false
      return v
    },
    function (e) {
      isRejected = true
      isPending = false
      throw e
    }
  )
  result.isFulfilled = function () {
    return isFulfilled
  }
  result.isPending = function () {
    return isPending
  }
  result.isRejected = function () {
    return isRejected
  }
  return result
}

export const state = () => ({
  firebaseReady: false,
  user: null,
  // user: {
  //   uid: 'eDDFrdK7BeX6el3JUXrLwVFxRU03',
  //   displayName: null,
  //   isAnonymous: false,
  //   phoneNumber: '+201113429944',
  //   photoURL: null,
  //   email: null,
  //   emailVerified: false,
  // },
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
  SET_OFFLINE_USER: (state) => {
    const stringified = localStorage.getItem('y-network-user')
    if (stringified) {
      const parsed = JSON.parse(stringified)
      state.user = parsed
    }
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
      const stringified = JSON.stringify(state.user)
      localStorage.setItem('y-network-user', stringified)
    }
  },
  ON_GET_FIREBASE_READY(state) {
    state.firebaseReady = true
  },
}

export const actions = {
  subscribeFirebaseAuth(ctx) {
    const t = MakeQuerablePromise(this.$fireAuthStore.subscribe())
    let i = 0
    return new Promise((resolve, reject) => {
      const intval = setInterval(() => {
        const isPending = t.isPending()
        i++
        if (i > 10 || !isPending) {
          clearInterval(intval)
          if (i > 10) {
            ctx.commit('SET_OFFLINE_USER')
          }
          resolve(true)
        }
      }, 1000)
    })
  },
  getFirebaseReady({ commit, state, dispatch, rootState }) {
    return new Promise((resolve, reject) => {
      if (!state.firebaseReady) {
        this.$fire.authReady().finally(async () => {
          await this.$fire.firestoreReady()
          this.$fireModule.firestore().settings({
            cacheSizeBytes: this.$fire.firestore.CACHE_SIZE_UNLIMITED,
          })
          this.$fireModule.firestore().enablePersistence()
          await this.$fire.storageReady()
          await this.$fire.functionsReady()
          await dispatch('subscribeFirebaseAuth')
          await dispatch('setUserData')
          commit('ON_GET_FIREBASE_READY')
          resolve(true)
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
  setUserData({ commit, state, rootState }) {
    const $this = this
    const uid = state.user?.uid
    return new Promise((resolve, reject) => {
      if (uid) {
        $this.$fire.firestore
          .collection('users')
          .doc(state.user.uid)
          .onSnapshot(
            (snapshot) => {
              const data = snapshot.data()
              commit('ON_REQUEST_USER_DATA', data)
              resolve(true)
            },
            (error) => {
              console.log(error)
              resolve(true)
            }
          )
      } else {
        resolve(true)
      }
    })
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
