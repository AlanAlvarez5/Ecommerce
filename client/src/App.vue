<template>
  <v-app>
    <Navbar/>
    <v-content style="margin-top: -140px">
      <router-view/>
    </v-content>
    <SnackBar ref="snackbar"/>
  </v-app>
</template>

<script>
  import {mapActions} from 'vuex';
  import Navbar from "./components/Navbar"
  import SnackBar from "./components/SnackBar";
  export default {
    components: {
      Navbar,
      SnackBar
    },
    methods: {
      ...mapActions(['tryAutoLogin'])
    },
    created() {
      this.tryAutoLogin();
    }
  }
</script>
