<template>
    <v-container>
        <p class="display-1 white--text">Bienvenido Administrador</p>
        <v-container>
            <div class="ecommerce mt-12" align="center">
                la función de ecommerce
            </div>
        </v-container>
        <v-carousel height="300" :show-arrows="true" :cycle="true" hide-delimiter-background delimiter-icon="mdi-minus">
            <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src">
            </v-carousel-item>
        </v-carousel>
        <div class="mt-10">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, et rem tempore deserunt sequi aut quo dolorum dolor officia impedit similique! Corrupti voluptatem repellat totam perferendis facere nulla non incidunt.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat assumenda eaque doloribus sunt quia quos corporis dolor modi quis eius. Accusantium quibusdam esse quaerat voluptate. Perferendis doloribus animi ea necessitatibus.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit itaque incidunt harum enim nemo velit eaque quam in, rerum maiores voluptate libero quibusdam similique maxime nam veritatis voluptas. Quasi, illum!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, et rem tempore deserunt sequi aut quo dolorum dolor officia impedit similique! Corrupti voluptatem repellat totam perferendis facere nulla non incidunt.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat assumenda eaque doloribus sunt quia quos corporis dolor modi quis eius. Accusantium quibusdam esse quaerat voluptate. Perferendis doloribus animi ea necessitatibus.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit itaque incidunt harum enim nemo velit eaque quam in, rerum maiores voluptate libero quibusdam similique maxime nam veritatis voluptas. Quasi, illum!
          </p>
        </div>
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
  font-size:3.5rem;
  color:black;
}

</style>