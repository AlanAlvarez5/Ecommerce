<template>
  <v-card
          class="px-2 py-2"
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
                  <v-icon>mdi-circle-small</v-icon>
                  {{ item }}
                </p>
                <v-select
                        style="width: 120px"
                        class="mt-4"
                        v-model="quantitySelected"
                        :items="quantityArray"
                        label="Cantidad:"
                ></v-select>
                <p class="headline mt-5">${{ totalPrice }}.00</p>
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
  import {utils} from "./mixins/utils";

  export default {
    mixins: [utils],
    props: ['brand', 'name', 'price', 'stock', 'img', 'description'],
    data() {
      return {
        quantitySelected: 1,
        quantityArray: null,
        showDialog: false
      }
    },
    computed: {
      totalPrice() {
        return this.numberWithCommas(this.price * this.quantitySelected);
      }
    },
    watch: {
      showDialog(willOpen) {
        if(willOpen) {
          const array = [...Array(this.stock + 1).keys()];
          array.shift();
          this.quantityArray = array;
          this.quantitySelected = 1;
        }
      }
    },
    created() {

    }
  }
</script>

<style scoped>

</style>