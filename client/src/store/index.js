import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackBar: {
      text: null,
      color: null,
      show: false
    },
    account: {
      token: '213213',
      isAdmin: false
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.account.token !== null;
    },
    isAdmin(state) {
      return state.account.isAdmin;
    },
  },
  mutations: {
    showSnackBar(state, payload) {
      state.snackBar.text = payload.text;
      state.snackBar.color = payload.color;
      state.snackBar.show = true;
      setTimeout(() => {
        state.snackBar.show = false;
      }, 2500);
    }
  },
  actions: {
  },
  modules: {
  }
})
