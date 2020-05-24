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
            <p class="subtitle-1">No has iniciado sesión.</p>
          </v-row>
          <v-row>
            <v-text-field
                    v-model="formData.email"
                    label="Correo"
                    placeholder="Introduce tu correo"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
                    v-model="formData.password"
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
                    @click="submitLoginData"
            >Iniciar sesión
            </v-btn>
          </v-row>
          <v-row>
            <v-col cols="7">
              <p class="caption">¿No tienes cuenta?</p>
            </v-col>
            <v-col cols="2" style="margin-top: -3px">
              <v-btn text x-small color="red">Regístrate</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-card>
  </v-menu>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    data() {
      return {
        accountMenu: false,
        registerMode: false,
        formData: {
          password: '',
          email: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'isAuthenticated',
        'isAdmin'
      ])
    },
    methods: {
      ...mapActions(['login']),
      async submitLoginData() {
        const result = await this.login({
          email: this.formData.email,
          password: this.formData.password
        });
        if(result === 'ACCESS') {
          this.accountMenu = false;
        } else {
          this.formData.password = '';
          this.formData.email = '';
        }
      }
    }
  }
</script>

<style scoped>

</style>