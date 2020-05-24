import Vue from 'vue'
import Vuex from 'vuex'
import {API} from '../components/axios/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackBar: {
      text: null,
      color: null,
      show: false
    },
    account: {
      token: null,
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
    authUser(state, userData) {
      state.account.token = userData.token;
      state.account.isAdmin = userData.isAdmin;
    },
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
    async login({commit}, authData) {
      try {
        const response = await API.post('/login', {
          correo: authData.email,
          password: authData.password
        });
        if (response.data.mensaje !== 'INVALID_USERNAME_PASSWORD') {
          commit('authUser', {
            token: response.data.token,
            isAdmin: response.data.usuario.admin === 1
          });
          return 'ACCESS';
        } else {
          return 'Constraseña incorrecta';
        }
      } catch (e) {
        console.error(e);
        return 'Error interno.';
      }

    }
  },
  modules: {}
})
