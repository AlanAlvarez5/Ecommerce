<template>
  <v-card
          class="mx-auto px-2 py-2"
          max-width="400"
  >
    <v-container>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle class="pb-0">{{ brand }}</v-card-subtitle>
    </v-container>
    <v-row justify="center">
      <v-img
              class="white--text align-end"
              max-width="250px"
              :src="img"
      >
      </v-img>
    </v-row>

    <v-card-text class="headline text-center">
      <div>${{ price }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
              block
              dark
              elevation="3"
              class="gradient-45deg-deep-purple-blue"
              @click="showDialog = true"
      >
        Detalles
      </v-btn>
    </v-card-actions>
    <v-dialog
            v-model="showDialog"
            max-width="800px"
            scrollable
    >
      <v-card class="fill-height">
        <v-container>
          <v-row>
            <v-col cols="12" md="6" class="d-flex justify-center">
              <v-img
                      max-width="350px"
                      :src="img"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-card-title class="headline">{{ name }}</v-card-title>
              <v-card-subtitle>{{ brand }}</v-card-subtitle>
              <v-divider/>
              <v-card-text class="mt-1">
                <p class="grey--text text--darken-2 my-1" v-for="item in description">
                  <v-icon>mdi-circle-small</v-icon> {{ item }}
                </p>
                <p class="headline mt-5">${{ price }}.00</p>
              </v-card-text>
              <v-btn
                      dark
                      style="margin-top: -10px"
                      class="gradient-45deg-purple-deep-orange px-8"
                      @click="dialog = false"
              >
                AGREGAR AL CARRITO
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  export default {
    props: ['brand', 'name', 'price', 'stock', 'img', 'description'],
    data() {
      return {
        showDialog: true
      }
    },
    created() {
      console.log(this.description);
    }
  }
</script>

<style scoped>

</style>