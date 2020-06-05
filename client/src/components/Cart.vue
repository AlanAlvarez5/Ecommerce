<template class="cart">
  <v-bottom-sheet
          v-model="showCart"
          max-width="900px"
          scrollable
  >
    <v-card class="fill-height pa-4">
      <v-container>
        <template v-if="cartItems.length === 0">
          <v-col class="text-center">
            <p class="display-1 ml-3">Carrito vacío</p>
          </v-col>
        </template>
        <template v-else>
          <p class="display-1 ml-3">Carrito</p>
          <v-list three-line>
            <v-list-item
                    v-for="(item, index) in cartItems"
                    :class="{'gray-rounded': index % 2 === 0}"
                    :key="item.product_id"
            >

              <v-img :src="item.img" max-width="50px" class="mr-5"></v-img>
              <v-list-item-content>
                <v-list-item-title>
                   {{ item.name }}
                </v-list-item-title>
                <v-list-item-subtitle>${{ numberWithCommas(item.price) }}.00 x {{ item.quantity }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>Total: ${{ numberWithCommas(item.price * item.quantity) }}.00
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon
                          size="30"
                          color="red lighten-2"
                          @click="deleteItem(item.product_id)"
                  >mdi-trash-can
                  </v-icon>
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
                    @click="cleanCart(1)"
            >
              <v-icon left>mdi-trash-can</v-icon>
              VACIAR CARRITO
            </v-btn>
            <v-btn
                    dark
                    large
                    color="gradient-45deg-purple-deep-orange"
                    @click="buyCart()"
            >
              <v-icon left>mdi-cart</v-icon>
              COMPRAR CARRITO
            </v-btn>
          </v-row>
        </template>
      </v-container>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
  import {utils} from "./mixins/utils";
  import {mapActions, mapGetters} from 'vuex';
  import AccountMenu from "./AccountMenu";

  export default {
    mixins: [utils],
    data() {
      return {
        showCart: false,
        cartItems: [],
        total: 0,
      }
    },
    computed: {
      ...mapGetters(['getIdUser', 'isAuthenticated', 'isShowLogin']),
      shouldShowLogin: {
        get() {
          return this.isShowLogin;
        },
        set(_) {
          return this.$store.state.UI.showLogin = false;
        }
      },
      getTotalPrice() {
        if (!this.cartItems) this.cartItems = [];
        let totalPrice = 0;
        if (this.cartItems.length !== 0) {
          this.cartItems.forEach(el => totalPrice += el.quantity * el.price);
        }
        this.total = totalPrice;
        return this.numberWithCommas(totalPrice);
      }
    },
    methods: {
      ...mapActions(['addCompra', 'addDetalleCompra', 'showLogin']),
      deleteItem(productId) {
        const itemIndex = this.cartItems.findIndex(el => el.product_id === productId);
        this.$store.state.UI.cartBadgeValue -= this.cartItems[itemIndex].quantity;
        this.cartItems.splice(itemIndex, 1);
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        if (this.cartItems.length === 0) {
          this.showCart = false;
        }
      },
      showCartBottomSheet() {
        const storageCart = localStorage.getItem('cart');
        if (storageCart) {
          this.cartItems = JSON.parse(storageCart);
        }
        this.showCart = true;
        if (this.cartItems.length === 0) {
          setTimeout(() => {
            this.showCart = false;
          }, 1000);
        }
      },
      cleanCart(flag) {
        localStorage.removeItem('cart');
        this.$store.state.UI.cartBadgeValue = 0;
        setTimeout(() => {
          this.cartItems = [];
        }, 1000);
        this.showCart = false;
        if (flag) this.$store.commit('showSnackBar', {
          color: 'gradient-45deg-deep-purple-blue',
          text: 'Has vaciado el carrito.'
        });
        else this.$store.commit('showSnackBar', {
          color: 'gradient-45deg-deep-purple-blue',
          text: 'Compra realizada con éxito.'
        });
      },
      createFormData() {
        const formData = new FormData();
        formData.append('usuario_id', this.getIdUser);
        formData.append('total', this.total);
        return formData;
      },
      createFormDetailData(compra_id, producto_id, cantidad) {
        const formData = new FormData();
        formData.append('compra_id', compra_id);
        formData.append('producto_id', producto_id);
        formData.append('cantidad', cantidad);
        return formData;
      },
      async buyCart() {
        if (this.isAuthenticated) {
          const formData = this.createFormData();
          let lastCompra = await this.addCompra(formData);
          for (let i = 0; i < this.cartItems.length; i++) {
            await this.userDetail(lastCompra, this.cartItems[i].product_id, this.cartItems[i].quantity);
          }
          this.cleanCart(0);
        } else {
          this.$store.commit('showSnackBar', {
            color: 'gradient-45deg-deep-purple-blue',
            text: 'Primero debes iniciar sesión.'
          });
          this.showCart = false;
          this.showLogin();
        }
      },
      async userDetail(compra_id, producto_id, cantidad) {
        const formData = this.createFormDetailData(compra_id, producto_id, cantidad);
        await this.addDetalleCompra(formData);
      },

    },
    components: {
      AccountMenu
    }
  }
</script>

<style scoped>
  >>> .gray-rounded {
    background-color: #f8f8f8;
    border-radius: 10px;
  }
</style>