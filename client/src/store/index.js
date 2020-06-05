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
      show: false,
    },
    account: {
      userDetails: null,
      token: null,
    },
    UI: {
      cartBadgeValue: 0,
      showLogin: false
    },
    products: [],
    users: [],
    compras: [],
    detalles: [],
    comprasUser: [],
  },
  getters: {
    //UI
    getCartBadgeValue(state) {
      return state.UI.cartBadgeValue;
    },
    isShowLogin(state) {
      return state.UI.showLogin;
    },
    //account
    isAuthenticated(state) {
      return state.account.token !== null;
    },
    getIdUser(state){
      return state.account.userDetails.id;
    },
    isAdmin(state) {
      return state.account.userDetails ? state.account.userDetails.admin === 1 : false;
    },
    getUserDetails(state) {
      return state.account.userDetails;
    },
    //products
    getAllProducts(state) {
      return state.products;
    },
    //users
    getAllUsers(state) {
      return state.users;
    },
    //compras
    getAllCompras(state) {
      return state.compras;
    },
    //comprasUser
    getAllComprasUser(state) {
      return state.comprasUser;
    },
    //detalle compras
    getAllDetallesFromCompra(state) {
      return state.detalles;
    },
  },
  mutations: {
    //account
    authUser(state, userData) {
      state.account.token = userData.token;
      state.account.userDetails = userData.userDetails;
      API.defaults.headers.Authorization = 'Bearer ' + userData.token;
    },
    logoutUser(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('userDetails');
      delete API.defaults.headers.Authorization;
      state.account.userDetails = null;
      state.account.token = null;
    },
    setShowLogin(state) {
      state.UI.showLogin = !state.UI.showLogin;
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
    },
    //users
    setUsers(state, payload) {
      state.users = payload;
    },
    //compras
    setCompras(state, payload) {
      state.compras = payload;
    },
    //compras-user
    setComprasUser(state, payload) {
      state.comprasUser = payload;
    },
    //users
    setDetalles(state, payload) {
      state.detalles = payload;
    }
  },
  actions: {
    //account
    showLogin({commit}) {
      commit('setShowLogin');
    },
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
    },
    //users
    async loadUsers({commit}) {
      try {
        const response = await API.get('/usuario/select');
        commit('setUsers', response.data);
      } catch (e) {
        console.error(e);
      }
    },
    async addUser({commit, dispatch}, userData) {
      try {
        const response = await API.post('/usuario/add', userData);
        if(response.data.mensaje === 'USER_REGISTERED') {
          await dispatch('loadUsers');
          return true;
        } else{
          return false;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    async deleteUser({commit, dispatch}, id) {
      try {
        const response = await API.delete(`/usuario/delete/${id}`);
        if(response.data.mensaje === 'USER_DELETED') {
          await dispatch('loadUsers');
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    async editUser({commit, dispatch}, userData) {
      try {
        const response = await API.put(`/usuario/edit/${userData.get('id')}`, userData);
        if(response.data.mensaje === 'USER_MODIFIED') {
          await dispatch('loadUsers');
          return true;
        } else{
          return false;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    //compras
    async loadCompras({commit}) {
      try {
        const response = await API.get('/compra/select');
        const compras = response.data.map(compra => {
          compra.total = '$' + utils.methods.numberWithCommas(compra.total) + '.00';
          return compra;
        });
        console.log(compras);
        commit('setCompras', compras);
      } catch (e) {
        console.error(e);
      }
    },
    async addCompra({commit, dispatch}, compraData) {
      try {
        const response = await API.post('/compra/add',compraData);
        if(response.data.mensaje === 'COMPRA_ADDED') {
          await dispatch('loadComprasUser',compraData.get('usuario_id'));
          return true,response.data.record.insertId;
        } else{
          return false;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    async deleteCompra({commit, dispatch}, id) {
      try {
        const response = await API.delete(`/compra/delete/${id}`);
        if(response.data.mensaje === 'COMPRA_DELETED') {
          await dispatch('loadCompras');
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    async editCompra({commit, dispatch}, compraData) {
      try {
        const response = await API.put(`/compra/edit/${compraData.get('id')}`, compraData);
        if(response.data.mensaje === 'COMPRA_UPDATED') {
          await dispatch('loadCompras');
          return true;
        } else{
          return false;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    //compras para usuario
    async loadComprasUser({commit,dispatch},id) {
      try {
        const response = await API.get(`/compra/select-usuario/${id}`);
        const compras = response.data.map(compra => {
          compra.total = '$' + utils.methods.numberWithCommas(compra.total) + '.00';
          return compra;
        });
        commit('setComprasUser', compras);
      } catch (e) {
        console.error(e);
      }
    },
    //detalle compras
    async loadDetalleCompra({commit, dispatch},id) {
      try {
        const response = await API.get(`/compra/select-detail/${id}`);
        const host = utils.methods.getHost().concat('products/');
        const formattedDetail = response.data.map(product => {
          product.imagen = host + product.imagen;
          return product;
        });
        commit('setDetalles', formattedDetail);
      } catch (e) {
        console.error(e);
      }
    },
    async addDetalleCompra({commit, dispatch},detalleCompra) {
      try {
        const response = await API.post(`/compra/add-detail`,detalleCompra);
        commit('setDetalles', response.data);
      } catch (e) {
        console.error(e);
      }
    },

    
  },

  modules: {}
})
