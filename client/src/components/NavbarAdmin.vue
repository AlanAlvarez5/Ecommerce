<template>
  <nav>
    <v-app-bar
            class="gradient-45deg-indigo-purple"
            dark
            flat
            min-height="230px"
    >
      <v-toolbar-title>ECOMMERCE</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn flat color="transparent"> <v-icon>mdi-dolly</v-icon> Productos</v-btn>
            <v-btn flat color="transparent"> <v-icon>mdi-account-supervisor</v-icon> Clientes</v-btn>
            <v-btn flat color="transparent"> <v-icon>mdi-truck-delivery</v-icon>Seguimiento Pedido</v-btn>
      </v-toolbar-items>
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
                <v-list-item-subtitle>Admin</v-list-item-subtitle>
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
  export default {
    data: () => ({
      accountMenu: false,
      cartMenu: false,
    }),
  }
</script>