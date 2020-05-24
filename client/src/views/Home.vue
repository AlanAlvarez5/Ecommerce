<template>
  <v-container>
    <v-row>
      <p class="display-1 white--text ml-3">Catálogo de productos</p>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" lg="4" xl="3"  v-for="product in products" :key="product.product_id">
        <ProductCard
                :product-id:="product.product_id"
                :brand="product.brand"
                :name="product.name"
                :price="product.price"
                :stock="product.stock"
                :img="product.img"
                :description="product.description"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ProductCard from "../components/ProductCard";

  export default {
    data() {
      return {
        products: [
          {
            product_id: 'PRODUCT1',
            brand: 'One Plus',
            name: 'One Plus 8 Pro 1',
            price: 15000,
            stock: 10,
            description: ['Pantalla: 7 pulgadas', 'Camara: 999 pixeles', 'Pantalla: 7 pulgadas', 'Camara: 999 pixeles', 'Pantalla: 7 pulgadas'],
            img: 'https://http2.mlstatic.com/oneplus-8-pro-5g-256gb-12gb-liberado-dualsim-garantia-1-ano-D_NQ_NP_866831-MLM41589201361_042020-F.webp'
          },
        ]
      }
    },
    components: {
      ProductCard
    }
  }
</script>

<style scoped>

</style>