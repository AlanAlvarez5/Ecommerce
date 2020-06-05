<template>
    <v-card width="350px">
      <template v-if="isAuthenticated && !isLoggingIn">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ getUserDetails.nombre }}</v-list-item-title>
              <v-list-item-subtitle>{{ isAdmin ? 'Administrador' : 'Cliente' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Teléfono</v-list-item-title>
              <v-list-item-subtitle>{{ getUserDetails.telefono }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Ciudad</v-list-item-title>
              <v-list-item-subtitle>{{ getUserDetails.ciudad }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Código postal</v-list-item-title>
              <v-list-item-subtitle>{{ getUserDetails.cp }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Dirección</v-list-item-title>
              <v-list-item-subtitle>{{ getUserDetails.direccion }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Correo</v-list-item-title>
              <v-list-item-subtitle>{{ getUserDetails.correo }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="logoutUser">Cerrar sesión</v-btn>
        </v-card-actions>
      </template>
      <template v-else-if="!registerMode">
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
                    :loading="isLoggingIn"
            >Iniciar sesión
            </v-btn>
          </v-row>
          <v-row>
            <v-col cols="7">
              <p class="caption">¿No tienes cuenta?</p>
            </v-col>
            <v-col cols="2" style="margin-top: -3px">
              <v-btn text x-small color="red" @click="changeRegisterMode">Regístrate</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-else>
        <v-container class="px-10">
          <v-row class="mt-2">
            <p class="subtitle-1">Introduce tus datos para registrarte.</p>
          </v-row>
          <v-row>
            <v-text-field
                    v-model="formData.name"
                    label="Nombre"
                    placeholder="Introduce tu nombre"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
                    v-model="formData.phone"
                    label="Teléfono"
                    placeholder="Introduce tu teléfono"
            ></v-text-field>
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
          <v-row>
            <v-text-field
                    v-model="formData.address"
                    label="Dirección"
                    placeholder="Introduce tu dirección"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
                    v-model="formData.cp"
                    label="Código postal"
                    placeholder="Introduce tu código postal"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
                    v-model="formData.city"
                    label="Ciudad"
                    placeholder="Introduce tu ciudad"
            ></v-text-field>
          </v-row>
          <v-row class="my-2">
            <v-btn
                    block
                    dark
                    color="gradient-45deg-deep-purple-blue"
                    @click="submitRegisterData"
                    :loading="isLoggingIn"
            >Registrate
            </v-btn>
          </v-row>
          <v-row>
            <v-col cols="7">
              <p class="caption">¿Ya tienes cuenta?</p>
            </v-col>
            <v-col cols="1" style="margin-top: -3px">
              <v-btn text x-small color="red" @click="changeRegisterMode">INICIA SESIÓN</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-card>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    data() {
      return {
        accountMenu: false,
        registerMode: false,
        isLoggingIn: false,
        formData: {
          password: '',
          email: '',
          cp: '',
          phone: '',
          address: '',
          city: '',
          name: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'isAuthenticated',
        'isAdmin',
        'getUserDetails',
        'isShowLogin'
      ]),
    },
    methods: {
      ...mapActions(['login', 'signin', 'logout']),
      changeRegisterMode() {
        this.formData.password = '';
        this.formData.email = '';
        this.formData.cp = '';
        this.formData.phone = '';
        this.formData.address = '';
        this.formData.city = '';
        this.formData.name = '';
        this.accountMenu = false;
        setTimeout(() => {
          this.registerMode = !this.registerMode;
          this.accountMenu = true;
        }, 150);
      },
      async submitLoginData() {
        this.isLoggingIn = true;
        const result = await this.login({
          email: this.formData.email,
          password: this.formData.password
        });
        if (result === 'ACCESS') {
          this.$store.state.UI.showLogin = false;
          setTimeout(() => {
            this.isLoggingIn = false;
          }, 250);
          this.$store.commit('showSnackBar', {
            color: 'gradient-45deg-deep-purple-blue',
            text: 'Has iniciado sesión correctamente.'
          });
        } else {
          this.formData.password = '';
          this.formData.email = '';
          this.isLoggingIn = false;
        }
      },
      async submitRegisterData() {
        this.isLoggingIn = true;
        const result = await this.signin({
          password: this.formData.password,
          email: this.formData.email,
          cp: this.formData.cp,
          phone: this.formData.phone,
          address: this.formData.address,
          city: this.formData.city,
          name: this.formData.name,
        });
        if (result === 'REGISTERED') {
          this.accountMenu = false;
          setTimeout(() => {
            this.isLoggingIn = false;
          }, 250);
          this.$store.commit('showSnackBar', {
            color: 'gradient-45deg-deep-purple-blue',
            text: 'Te has registrado correctamente.'
          });
        } else {
          this.isLoggingIn = false;
        }
      },
      logoutUser() {
        this.formData.password = '';
        this.formData.email = '';
        this.formData.cp = '';
        this.formData.phone = '';
        this.formData.address = '';
        this.formData.city = '';
        this.formData.name = '';
        this.$store.state.UI.showLogin = false;
        setTimeout(() => {
          this.logout();
        }, 250);
        this.$store.commit('showSnackBar', {
          color: 'gradient-45deg-deep-purple-blue',
          text: 'Has cerrado sesión correctamente.'
        });
        this.$router.push('/');
      }
    },
    created() {
      this.accountMenu = true;
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          if (this.isShowLogin) {
            this.registerMode ? this.submitRegisterData() : this.submitLoginData();
          }
        }
      });
    }
  }
</script>

<style>
  .menu-popover-enter,
  .menu-popover-leave-to {
    opacity: 0;
    transform: rotateY(50deg);
  }
  .menu-popover-enter-to,
  .menu-popover-leave {
    opacity: 1;
    transform: rotateY(0deg);
  }
  .menu-popover-enter-active,
  .menu-popover-leave-active {
    transition: opacity, transform 200ms ease-out;
  }
</style>