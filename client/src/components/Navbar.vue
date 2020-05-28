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
          <v-btn text>
            <v-icon left>mdi-truck-delivery</v-icon>
            Seguimiento Pedido
          </v-btn>
        </v-toolbar-items>
      </template>
      <template>
        <v-spacer></v-spacer>
<!--        <v-text-field-->
<!--                solo-->
<!--                flat-->
<!--                label="Buscar"-->
<!--                prepend-inner-icon="mdi-magnify"-->
<!--                clearable-->
<!--                background-color="gradient-45deg-indigo-purple-non"-->
<!--                class="mt-7 mx-5"-->
<!--        ></v-text-field>-->
        <v-btn
                @click="showCart"
                icon
                class="ml-2"
        >
          <v-icon>mdi-cart</v-icon>
          <Cart ref="appCart"/>
        </v-btn>
      </template>
      <AccountMenu/>
    </v-app-bar>
  </nav>
</template>
<script>
  import {mapGetters} from 'vuex';
  import Cart from "./Cart";
  import AccountMenu from "./AccountMenu";
  export default {
    data: () => ({
      cartMenu: false,
    }),
    computed: {
      ...mapGetters([
        'isAdmin'
      ])
    },
    methods: {
      showCart() {
        this.$refs.appCart.showCartBottomSheet();
      }
    },
    components: {
      Cart,
      AccountMenu
    },
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap');
#ecommerce {
  font-family: 'Leckerli One', cursive;
  font-size:2em;
  color:white;
}

</style>