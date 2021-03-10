import Vue from 'vue'

if (!Vue.__yNetwork_mixin__) {
  Vue.__yNetwork_mixin__ = true
  const mixins = require('@/mixins')
  Vue.mixin(mixins)
}
