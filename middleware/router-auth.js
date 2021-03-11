const redirectsAuth = {
  login: '/app',
  index: '/app',
}

export default function (context) {
  const routeName = context.route.name
  // console.log(context.route)
  if (context.store.state.user != null && redirectsAuth[routeName]) {
    context.redirect(redirectsAuth[routeName])
  }
  if (
    context.store.state.user == null &&
    context.route.fullPath.includes('/app')
  ) {
    context.redirect('/get-started')
  }
}
