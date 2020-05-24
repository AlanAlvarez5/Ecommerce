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
  import Navbar from "./components/Navbar"
  import SnackBar from "./components/SnackBar";
  export default {
    components: {
      Navbar,
      SnackBar
    }
  }
</script>
