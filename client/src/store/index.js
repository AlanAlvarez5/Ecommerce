import Vue from 'vue'
import Vuex from 'vuex'
import {API} from '../components/axios/api';
import {utils} from '../components/mixins/utils'
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
    },
    products: []
  },
  getters: {
    //account
    isAuthenticated(state) {
      return state.account.token !== null;
    },
    isAdmin(state) {
      // return state.account.userDetails ? state.account.userDetails.admin === 1 : false;
      return false;
    },
    getUserDetails(state) {
      return state.account.userDetails;
    },
    //products
    getAllProducts(state) {
      return state.products;
    }
  },
  mutations: {
    //account
    authUser(state, userData) {
      state.account.token = userData.token;
      state.account.userDetails = userData.userDetails;
    },
    logoutUser(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('userDetails');
      state.account.userDetails = null;
      state.account.token = null;
    },
    //utils
    showSnackBar(state, payload) {
      state.snackBar.text = payload.text;
      state.snackBar.color = payload.color;
      state.snackBar.show = true;
      setTimeout(() => {
        state.snackBar.show = false;
      }, 2500);
    },
    //products
    setProducts(state, payload) {
      state.products = payload;
    }
  },
  actions: {
    //account
    async login({commit}, authData) {
      try {
        const response = await API.post('/login', {
          correo: authData.email,
          password: authData.password
        });
        if (response.data.mensaje !== 'INVALID_USERNAME_PASSWORD') {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userDetails', JSON.stringify(response.data.usuario[0]));
          commit('authUser', {
            userDetails: response.data.usuario[0],
            token: response.data.token,
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
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userDetails', JSON.stringify(response.data.usuario[0]));
          commit('authUser', {
            userDetails: response.data.usuario[0],
            token: response.data.token,
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
    tryAutoLogin({commit}) {
      const token = localStorage.getItem('token');
      if(token) {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        commit('authUser', {
          userDetails: userDetails,
          token: token,
        });
      } else {
        return 0;
      }
    },
    logout({commit}) {
      commit('logoutUser');
    },
    //products
    async loadProducts({commit}) {
      try {
        const response = await API.get('/producto/select');
        const host = utils.methods.getHost().concat('products/');
        const formattedProducts = response.data.map(product => {
          product.imagen = host + product.imagen;
          product.descripcion = product.descripcion.split(',');
          return product;
        });
        commit('setProducts', formattedProducts);
      } catch (e) {
        console.error(e);
      }
    },
    async addProduct({commit, dispatch}, productData) {
      try {
        const response = await API.post('/producto/add', productData);
        if(response.data.mensaje === 'PRODUCT_ADDED') {
          await dispatch('loadProducts');
          return true;
        } else{
          return false;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    async deleteProduct({commit, dispatch}, id) {
      try {
        const response = await API.delete(`/producto/delete/${id}`);
        if(response.data.mensaje === 'PRODUCT_DELETED') {
          await dispatch('loadProducts');
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    async editProduct({commit, dispatch}, productData) {
      try {
        const response = await API.put(`/producto/edit/${productData.get('id')}`, productData);
        if(response.data.mensaje === 'PRODUCT_UPDATED') {
          await dispatch('loadProducts');
          return true;
        } else{
          return false;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  },
  modules: {}
})
