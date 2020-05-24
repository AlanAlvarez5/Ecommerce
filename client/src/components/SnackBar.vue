<template>
  <v-snackbar
          :value="show"
          class="transition-ease-in-out"
          :color="this.$store.state.snackBar.color"
  >
    {{ this.$store.state.snackBar.text }}
  </v-snackbar>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    computed: {
      show() {
        return this.$store.state.snackBar.show;
      }
    }
  }
</script>

<style scoped>

</style>