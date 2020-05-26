<template>
  <v-card
          class="px-2 pb-2"
  >
    <v-container>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle class="pb-0">{{ brand }}</v-card-subtitle>
    </v-container>
    <v-row
            style="height: 340px; width: 430px"
            justify="center"
    >
      <v-img
              class="white--text align-end"
              max-width="250px"
              :src="img"
      >
      </v-img>
    </v-row>

    <v-card-text class="headline text-center">
      <div>${{ numberWithCommas(price) }}.00</div>
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
            <v-col cols="12" md="6" class="d-flex justify-center" style="width: 350px; height: 500px">
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
                <p class="headline mt-5">${{ numberWithCommas(getTotalPrice) }}.00</p>
              </v-card-text>
              <v-btn
                      dark
                      style="margin-top: -10px"
                      class="gradient-45deg-purple-deep-orange px-8"
                      @click="addToCart"
              >
                <v-icon left>mdi-cart</v-icon>
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
    props: ['brand', 'name', 'price', 'stock', 'img', 'description', 'product_id'],
    data() {
      return {
        quantitySelected: 1,
        totalPrice: null,
        quantityArray: null,
        showDialog: false
      }
    },
    computed: {
      getTotalPrice() {
        this.totalPrice = this.price * this.quantitySelected;
        return this.numberWithCommas(this.totalPrice);
      }
    },
    watch: {
      showDialog(willOpen) {
        if(willOpen) {
          const array = [...Array(this.stock + 1).keys()];
          array.shift();
          this.quantityArray = array;
          this.quantitySelected = 1;
          this.totalPrice = this.price;
        }
      }
    },
    methods: {
      addToCart() {
        const storageCart = localStorage.getItem('cart');
        if(storageCart) {
          const cart = JSON.parse(storageCart);
          const itemIndex = cart.findIndex(el => el.product_id === this.product_id);
          if(itemIndex === -1) {
            cart.push({
              product_id: this.product_id,
              brand: this.brand,
              name: this.name,
              price: this.price,
              quantity: this.quantitySelected,
              img: this.img,
            });
          } else {
            cart[itemIndex].quantity += this.quantitySelected;
          }
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          localStorage.setItem('cart', JSON.stringify([{
            product_id: this.product_id,
            brand: this.brand,
            name: this.name,
            price: this.price,
            quantity: this.quantitySelected,
            img: this.img,
          }]));
        }
        this.$store.commit('showSnackBar', {
          color: 'gradient-45deg-deep-purple-blue',
          text: 'Se agregó el producto.'
        });
        this.showDialog = false;
      }
    },
    created() {
    }
  }
</script>