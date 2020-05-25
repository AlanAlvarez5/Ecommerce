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
      userDetails: null,
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
    getUserDetails(state) {
      return state.account.userDetails;
    }
  },
  mutations: {
    authUser(state, userData) {
      state.account.token = userData.token;
      state.account.isAdmin = userData.isAdmin;
      state.account.userDetails = userData.userDetails[0];
    },
    logoutUser(state) {
      state.account.userDetails = null;
      state.account.token = null;
      state.account.isAdmin = false;
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
            userDetails: response.data.usuario,
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

    },
    async signin({commit}, authData) {
      try {
        const response = await API.post('/signin', {
          password: authData.password,
          correo: authData.email,
          cp: authData.cp,
          telefono: authData.phone,
          direccion: authData.address,
          ciudad: authData.city,
          nombre: authData.name,
        });
        if (response.data.mensaje === 'USER_REGISTERED') {
          console.log('entra');
          commit('authUser', {
            userDetails: response.data.usuario,
            token: response.data.token,
            isAdmin: response.data.usuario.admin === 1
          });
          return 'REGISTERED';
        } else {
          return 'Error interno';
        }
      } catch (e) {
        console.error(e);
        return 'Error interno.';
      }

    },
    logout({commit}) {
      commit('logoutUser');
    }
  },
  modules: {}
})
