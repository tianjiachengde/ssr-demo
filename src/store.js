import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex);

function fetchItemApi() {
  return Promise.resolve('store test')
}
export function createStore() {
  const store = new vuex.Store({
    state:{
      item:{}
    },
    actions:{
      async fetchItem({ commit }){
        const res = await fetchItemApi();
        commit('setItem', res);
      }
    },
    mutations:{
      setItem(state, data){
        state.item = data;
      }
    }
  });

  return store
}