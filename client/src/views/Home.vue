<template>
  <v-container v-if="!isAdmin">
    <v-row>
      <p class="display-1 white--text ml-3">Catálogo de productos</p>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" lg="4" xl="3"  v-for="product in getAllProducts" :key="product.id">
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
      ...mapGetters(['getAllProducts', 'isAdmin'])
    },
    methods: {
      ...mapActions(['loadProducts'])
    },
    components: {
      ProductCard,
      HomeAdmin
    },
    async created() {
      this.loadProducts();
    }
  }
</script>

<style scoped>

</style>