import Vue from 'vue'
import { createApp } from './main'

// 客户端特定引导逻辑……
const { app, router, store } = createApp();

if(typeof window !== 'undefined' && window.__INITIAL_STATE__){
  console.log('window.__INITIAL_STATE__:',window.__INITIAL_STATE__);
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    const activated = matched.filter((c,i) => {
      return diffed || ( diffed = (prevMatched[i]) !== c)
    });

    if(!activated.length){
      console.log('activated.length:  ',activated.length)
      return next()
    }

    Promise.all(activated.map(c => {
      if(c.asyncData){
        return c.asyncData({ store, route: to })
      }
    }))
      .then(() => {
        next()
      })
      .catch(next);
  });

  app.$mount('#app')
});

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
});
