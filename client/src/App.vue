<template>
  <v-app>
    <appNavbar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import Navbar from "./components/Navbar"
  export default {
    components: {
      appNavbar: Navbar,
    }
  }
</script>
