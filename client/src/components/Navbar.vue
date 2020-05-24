<template>
  <nav>
    <v-app-bar
            class="gradient-45deg-indigo-purple"
            dark
            flat
            min-height="230px"
    >
      <v-toolbar-title>ECOMMERCE</v-toolbar-title>
      <v-text-field
              solo
              flat
              label="Buscar"
              prepend-inner-icon="mdi-magnify"
              clearable
              background-color="gradient-45deg-indigo-purple-non"
              class="mt-7 mx-5"
      ></v-text-field>
      <v-btn
              @click="showCart"
              icon
      >
        <v-icon>mdi-cart</v-icon>
          <Cart ref="appCart" />
      </v-btn>
      <v-menu
              v-model="accountMenu"
              :close-on-content-click="false"
              :nudge-width="200"
              transition="slide-y-transition"
              offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
                  icon
                  v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Nombre Apellido</v-list-item-title>
                <v-list-item-subtitle>Cliente</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="accountMenu = false">Cerrar sesión</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
  </nav>
</template>
<script>
  import Cart from "./Cart";
  export default {
    data: () => ({
      accountMenu: false,
      cartMenu: false,
    }),
    components: {
      Cart
    },
    methods: {
      showCart() {
        this.$refs.appCart.showCartBottomSheet();
      }
    }
  }
</script>