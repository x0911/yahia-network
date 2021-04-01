// const redirectsAuth = {
//   login: '/app',
//   index: '/app',
// }

export default async function (context) {
  await context.store
    .dispatch('getFirebaseReady')
    .then((x) => {
      console.log(x)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      const {
        // routeName,
        fullPath,
      } = context.route
      // console.log(routeName)
      // console.log(fullPath)
      // if (context.store.state.user != null && redirectsAuth[routeName]) {
      //   context.redirect(redirectsAuth[routeName])
      // }
      // if (
      //   context.store.state.user == null &&
      //   context.route.fullPath.includes('/app')
      // ) {
      //   context.redirect('/get-started')
      // }
      if (context.store.state.user) {
        // We have a user
        if (
          (!context.store.state.userData ||
            !context.store.state.userData.fname ||
            !context.store.state.userData.lname ||
            !context.store.state.userData.gender) &&
          fullPath !== '/get-started/one-more-step'
        ) {
          context.redirect('/get-started/one-more-step')
        }
        if (
          ['/'].includes(fullPath) ||
          (fullPath.includes('/get-started') &&
            (fullPath !== '/get-started/one-more-step' ||
              (fullPath === '/get-started/one-more-step' &&
                context.store.state.userData &&
                context.store.state.userData.fname &&
                context.store.state.userData.lname &&
                context.store.state.userData.gender)))
        ) {
          context.redirect('/app')
        }
      } else {
        // We Don't have a user
        if (fullPath === '/get-started') {
          context.redirect('/get-started/login')
        }
        if (
          fullPath.includes('/app') ||
          fullPath === '/get-started/one-more-step'
        ) {
          context.redirect('/get-started/login')
        }
      }
    })
}
