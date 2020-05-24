<template>
  <v-app>
    <appNavbar/>
    <v-content style="margin-top: -140px">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  //import Navbar from "./components/Navbar"
  import Navbar from "./components/NavbarAdmin"
  export default {
    components: {
      appNavbar: Navbar,
    }
  }
</script>
