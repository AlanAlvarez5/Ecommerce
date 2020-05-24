<template>
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
              v-on="on"
              class="mx-3"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>
    <v-card>
      <template v-if="isAuthenticated">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Nombre Apellido</v-list-item-title>
              <v-list-item-subtitle>{{ isAdmin ? 'Administrador' : 'Cliente' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="accountMenu = false">Cerrar sesión</v-btn>
        </v-card-actions>
      </template>
      <template v-else>
        <v-container class="px-10">
          <v-row class="mt-2">
            <p>No has iniciado sesión.</p>
          </v-row>
          <v-row>
            <v-text-field
                    label="Correo"
                    placeholder="Introduce tu correo"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
                    label="Contraseña"
                    placeholder="Introduce tu contraseña"
                    type="password"
            ></v-text-field>
          </v-row>
          <v-row class="my-2">
            <v-btn
                    block
                    dark
                    color="gradient-45deg-deep-purple-blue"
            >Iniciar sesión</v-btn>
          </v-row>
        </v-container>
      </template>
    </v-card>
  </v-menu>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    data() {
      return {
        accountMenu: false,
      }
    },
    computed: {
      ...mapGetters([
        'isAuthenticated',
        'isAdmin'
      ])
    }
  }
</script>

<style scoped>

</style>