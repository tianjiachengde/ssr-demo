import Vue from 'vue'
import App from './App.vue'
import { createRouter } from  './route'

Vue.config.productionTip = false;

export function createApp() {

  const router = createRouter();

  const app = new Vue({
    router,
    render: h => h(App)
  });
  return { app, router }
}

// new Vue({
//   render: function (h) { return h(App) },
// }).$mount('#app')
