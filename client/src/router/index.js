import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Home from "../views/Home";
import HomeAdmin from "../views/admin/HomeAdmin";
import ProductsAdmin from "../views/admin/ProductsAdmin";
import UsersAdmin from "../views/admin/UsersAdmin";
import About from "../views/About";

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter (to, from, next) {
      if(store.getters.isAdmin) {
        next('/homeadmin');
      } else {
        next();
      }
    }
  },
  {
    path: '/homeadmin',
    name: 'HomeAdmin',
    component: HomeAdmin,
    beforeEnter (to, from, next) {
      if(store.getters.isAdmin) {
        next();
      } else {
        next('/');
      }
    }
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
