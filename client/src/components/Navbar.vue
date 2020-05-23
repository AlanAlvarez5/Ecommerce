<template>
  <nav>
    <v-app-bar temporary
               app
               class="gradient-45deg-indigo-purple"
               dark
               flat
               min-height="250px"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-text-field
              solo
              flat
              label="Buscar"
              prepend-inner-icon="mdi-magnify"
              clearable
              background-color="gradient-45deg-indigo-purple-non"
              class="mt-7 mx-lg-4 mx-sm-0"
      ></v-text-field>
      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
            app
            v-model="drawer"
            class="gradient-45deg-indigo-purple"
            width="310px"
    >
      <v-list-item dark>
        <v-container class="mt-11">
          <v-row justify="center">
            <v-list-item-avatar size="100">
              <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS18YDZmgMSKH_YgxIl5xroBN0c0eJmq0u56Y2iPV-atZBf0xJk&usqp=CAU"></v-img>
            </v-list-item-avatar>
          </v-row>
          <v-row justify="center" class="mt-2" style="margin-left: -30px">
            <p>Nombre Apellido</p>
          </v-row>
        </v-container>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dark>
        <v-list-item
                v-for="item in items"
                :key="item.title"
                :to="{name: item.route}"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn text block dark>Cerrar sesión</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>
<script>
  export default {
    data() {
      return {
        drawer: null,
        items: [
          { title: 'Catálogo', icon: 'mdi-book-open-page-variant', route: 'Catalogue'},
          // { title: 'Carrito', icon: 'mdi-cart' },
        ],
      }
    },
  };
</script>