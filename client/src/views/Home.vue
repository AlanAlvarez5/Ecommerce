<template>
  <v-container v-if="!isAdmin">
    <v-row>
      <p class="display-1 white--text ml-3">Catálogo de productos</p>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" lg="4" xl="3"  v-for="product in getAllProductsWithQuery" :key="product.id" v-if="product.stock != 0">
        <ProductCard
                :product_id="product.id"
                :brand="product.marca"
                :name="product.nombre"
                :price="product.precio"
                :stock="product.stock"
                :img="product.imagen"
                :description="product.descripcion"
        />
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <HomeAdmin/>
  </v-container>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import ProductCard from "../components/Product";
  import HomeAdmin from "./admin/HomeAdmin";

  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters(['getAllProducts', 'isAdmin', 'getSearchBoxText']),
      getAllProductsWithQuery() {
        return this.getAllProducts.filter(product => {
          return product.nombre.toLowerCase().indexOf(this.getSearchBoxText.toLowerCase()) >= 0;
        });
      }
    },
    methods: {
      ...mapActions(['loadProducts'])
    },
    components: {
      ProductCard,
      HomeAdmin
    },
    async created() {
      const storage = JSON.parse(localStorage.getItem('cart'));
      let quantity = 0;
      if(storage) {
        storage.forEach(el => quantity += el.quantity);
        this.$store.state.UI.cartBadgeValue = quantity;
      }
      this.loadProducts();
    }
  }
</script>

<style scoped>

</style>