<template class="cart">
  <v-bottom-sheet
          v-model="showCart"
          max-width="900px"
          scrollable
  >
    <v-card class="fill-height pa-4">
      <v-container>
        <p class="display-1 ml-3">Carrito</p>
        <p v-if="this.cartItems.length === 0" class="headline pa-12">Tu carrito está vacío.</p>
        <div v-else>
          <v-list three-line>
            <v-list-item
                    v-for="(item, index) in cartItems"
                    :class="{'gray-rounded': index % 2 === 0}"
                    :key="item.product_id"
            >
              <v-img :src="item.img" :alt="item.product_id" max-width="50px" class="mr-5"></v-img>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>${{ numberWithCommas(item.price) }}.00 x {{ item.quantity }}</v-list-item-subtitle>
                <v-list-item-subtitle>Total: ${{ numberWithCommas(item.price * item.quantity) }}.00</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon 
                          size="30" 
                          color="red lighten-2"
                          @click="deleteItem(item.product_id)"
                  >mdi-trash-can</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider class="my-4"/>
          <v-row no-gutters justify="end" class="mr-2 mt-7">
            <span class="headline mr-7">Total </span>
            <span class="headline">${{ getTotalPrice }}.00</span>
          </v-row>
          <v-row justify="end" class="mt-7">
            <v-btn
                    large
                    text
                    class="red--text mr-4"
                    @click="cleanCart"
            >
              <v-icon left>mdi-trash-can</v-icon>
              VACIAR CARRITO
            </v-btn>
            <v-btn
                    dark
                    large
                    color="gradient-45deg-purple-deep-orange"
            >
              <v-icon left>mdi-cart</v-icon>
              COMPRAR CARRITO
            </v-btn>
          </v-row>
        </div>
      </v-container>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
  import {utils} from "./mixins/utils";

  export default {
    mixins: [utils],
    data() {
      return {
        showCart: false,
        cartItems: [],
      }
    },
    computed: {
      getTotalPrice() {
        if(!this.cartItems) this.cartItems = [];
        let totalPrice = 0;
        if(this.cartItems.length !== 0) {
          this.cartItems.forEach(el => totalPrice += el.quantity * el.price);
        }
        return this.numberWithCommas(totalPrice);
      }
    },
    methods: {
      deleteItem(productId) {
        const itemIndex = this.cartItems.findIndex(el => el.product_id === productId);
        this.cartItems.splice(itemIndex, 1);
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        if(this.cartItems.length === 0) {
          this.showCart = false;
        }
      },
      showCartBottomSheet() {
        const storageCart = localStorage.getItem('cart');
        if(storageCart) {
          this.cartItems = JSON.parse(storageCart);
        }
        this.showCart = true;
      },
      cleanCart() {
        localStorage.removeItem('cart');
        this.cartItems = [];
        this.showCart = false;
        this.$store.commit('showSnackBar', {
          color: 'gradient-45deg-deep-purple-blue',
          text: 'Has vaciado el carrito.'
        });
      }
    },
  }
</script>

<style scoped>
  >>> .gray-rounded  {
    background-color: #f8f8f8;
    border-radius: 10px;
  }
</style>