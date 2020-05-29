<template>
    <v-container>
        <p class="display-1 white--text">Bienvenido Administrador</p>
        <v-container>
            <div class="ecommerce" align="center">
                la función de ecommerce
            </div>
        </v-container>
        <v-carousel height="300" :show-arrows="false" :cycle="true" hide-delimiter-background delimiter-icon="mdi-minus">
            <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src">
            </v-carousel-item>
        </v-carousel>
    </v-container>     
</template>

<script>
  export default {
    data () {
      return {
          items:[
            {
              src:'https://image.freepik.com/vector-gratis/concepto-logistica-almacen-isometrico_1284-11493.jpg',
            },
            {
              src:'https://www.fhios.es/wp-content/uploads/2018/01/ecommerce-ideal-portada.jpg',
            },
            {
              src:'https://esemanal.mx/revista/wp-content/uploads/2018/08/home-store.png',
            },
        ],
      }
    },
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap');
.ecommerce {
  font-family: 'Leckerli One', cursive;
  font-size:5em;
  color:black;
}

</style>