export const state = () => ({
  drawer: {
    fixed: true,
    mini: false,
  },
  scrollbar_settings: {
    suppressScrollY: false,
    suppressScrollX: true,
    wheelPropagation: false,
  },
  post: {
    audiences: {
      public: {
        text: 'Public',
        desc: 'Everyone will be able to see and react with your post',
        icon: 'mdi-earth',
      },
      friends: {
        text: 'Friends',
        desc: 'Only your Y friends will have access to your post',
        icon: 'mdi-account-group',
      },
      me: {
        text: 'Only me',
        desc: 'Private post, will only be visible to you',
        icon: 'mdi-lock',
      },
    },
  },
})
