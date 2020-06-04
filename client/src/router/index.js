import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Home from "../views/Home";
import ProductsAdmin from "../views/admin/ProductsAdmin";
import UsersAdmin from "../views/admin/UsersAdmin";
import ComprasAdmin from "../views/admin/ComprasAdmin";
import ComprasUser from "../views/user/ComprasUser";
import About from "../views/About";

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/productsadmin',
    name: 'ProductsAdmin',
    component: ProductsAdmin,
    beforeEnter (to, from, next) {
      if(store.getters.isAdmin) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/usersadmin',
    name: 'UsersAdmin',
    component: UsersAdmin,
    beforeEnter (to, from, next) {
      if(store.getters.isAdmin) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/comprasadmin',
    name: 'ComprasAdmin',
    component: ComprasAdmin,
    beforeEnter (to, from, next) {
      if(store.getters.isAdmin) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/comprasuser',
    name: 'ComprasUser',
    component: ComprasUser,
    beforeEnter (to, from, next) {
      if(!store.getters.isAdmin) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
