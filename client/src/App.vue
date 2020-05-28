<template>
  <v-app>
    <Navbar/>
    <v-content style="margin-top: -140px">
      <router-view/>
    </v-content>
    <SnackBar ref="snackbar"/>
    <v-footer v-if="!isAdmin && $route.name !== 'About'" padless color="transparent">
      <v-col
              class="text-center"
              cols="12"
      >
        <v-btn text to="/about">
          Acerca de
        </v-btn>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import Navbar from "./components/Navbar"
  import SnackBar from "./components/SnackBar";
  export default {
    components: {
      Navbar,
      SnackBar
    },
    computed: mapGetters(['isAdmin']),
    methods: {
      ...mapActions(['tryAutoLogin'])
    },
    created() {
      this.tryAutoLogin();
    }
  }
</script>
