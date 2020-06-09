<template>
  <nav>
    <v-app-bar
            class="gradient-45deg-indigo-purple"
            dark
            flat
            min-height="230px"
    >
      <v-toolbar-title>
        <router-link to="/" exact>
          <div id="ecommerce">
            ecommerce
          </div>
        </router-link>
      </v-toolbar-title>
      <template v-if="isAdmin">
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text to="/">
            <v-icon left>mdi-home</v-icon>
            Inicio
          </v-btn>
          <v-btn text to="/productsadmin">
            <v-icon left>mdi-dolly</v-icon>
            Productos
          </v-btn>
          <v-btn text to="/usersadmin">
            <v-icon left>mdi-account-supervisor</v-icon>
            Clientes
          </v-btn>
          <v-btn text to="/comprasadmin">
            <v-icon left>mdi-truck-delivery</v-icon>
            Seguimiento Pedido
          </v-btn>
        </v-toolbar-items>
      </template>
      <template>
        <v-spacer></v-spacer>
        <v-text-field
                solo
                flat
                label="Buscar"
                prepend-inner-icon="mdi-magnify"
                clearable
                @input="updateSearchBox"
                background-color="gradient-45deg-indigo-purple-non"
                class="mt-7 mx-5"
        ></v-text-field>
        <v-btn v-if="!isAdmin"
               @click="showCart"
               icon
               class="ml-2"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-badge
                :content="getCartBadgeValue"
                :value="getCartBadgeValue"
                transition="slide-x-transition"
              >
                <v-icon v-on="on">mdi-cart</v-icon>
              </v-badge>
            </template>
            <span>Carrito</span>
          </v-tooltip>

          <Cart ref="appCart"/>
        </v-btn>
        <v-btn v-if="!isAdmin && isAuthenticated"
               to="/comprasuser"
               icon
               class="ml-2"
        >

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-shopping</v-icon>
            </template>
            <span>Mis Compras</span>
          </v-tooltip>
        </v-btn>
      </template>
      <v-menu
              v-model="shouldShowLogin"
              :close-on-content-click="false"
              :nudge-width="230"
              offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
                  icon
                  class="mx-3"
                  @click="showLogin"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-account</v-icon>
              </template>
              <span>Cuenta</span>
            </v-tooltip>
          </v-btn>
        </template>
        <AccountMenu/>
      </v-menu>
    </v-app-bar>
  </nav>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import Cart from "./Cart";
  import AccountMenu from "./AccountMenu";

  export default {
    data: () => ({
      cartMenu: false,
    }),
    computed: {
      ...mapGetters([
        'isAdmin', 'isAuthenticated', 'isShowLogin', 'getCartBadgeValue'
      ]),
      shouldShowLogin: {
        get() {
          return this.isShowLogin;
        },
        set(_) {
          return this.$store.state.UI.showLogin = false;
        }
      }
    },
    methods: {
      ...mapActions(['showLogin']),
      showCart() {
        this.$refs.appCart.showCartBottomSheet();
      },
      updateSearchBox(text) {
        this.$store.commit('updateSearchBox', text);
      }
    },
    components: {
      Cart,
      AccountMenu
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap');

  #ecommerce {
    font-family: 'Leckerli One', cursive;
    font-size: 2em;
    color: white;
  }

</style>