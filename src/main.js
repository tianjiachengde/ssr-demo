import Vue from 'vue'
import App from './App.vue'
import { createRouter } from  './route'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false;

export function createApp() {

  const router = createRouter();
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return { app, router, store }
}

// new Vue({
//   render: function (h) { return h(App) },
// }).$mount('#app')
