<template>
    <v-container>
        <v-row>
            <p class="display-1 white--text ml-3">Lista de Productos</p>
        </v-row>
        <v-data-table
            :headers="headers"
            :items="productos"
            sort-by="id"
            class="elevation-1"
        >
            <template v-slot:top>
            <v-toolbar flat color="white">
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="green" dark class="mb-2" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.nombre" label="Nombre del Producto"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.marca" label="Marca"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.desc" label="Descripción"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.precio" label="Precio"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.stock" label="Stock"></v-text-field>
                        </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Id Producto',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Marca', value: 'marca' },
        { text: 'Descripción', value: 'desc' },
        { text: 'Precio', value: 'precio'},
        { text: 'Stock', value: 'stock'},
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      productos: [],
      editedIndex: -1,
      editedItem: {
        id : '',
        nombre: '',
        marca: '',
        desc: '',
        precio: 0,
        stock: 0,
      },
      defaultItem: {
        id : '',
        nombre: '',
        marca: '',
        desc: '',
        precio: 0,
        stock: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Producto' : 'Editar Producto'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    methods: {
      initialize () {
 
      },

    created () {
      
    },
    editItem (item) {
        this.editedIndex = this.productos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

    deleteItem (item) {
        const index = this.productos.indexOf(item)
        confirm('¿Seguro que deseas borrar este producto?') && this.productos.splice(index, 1)
      },

    close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

    save () {
        if (this.editedIndex > -1) {
          Object.assign(this.productos[this.editedIndex], this.editedItem)
        } else {
          this.productos.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>