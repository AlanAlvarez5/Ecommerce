<template>
  <v-container>
    <v-row>
      <p class="display-1 white--text ml-3">Lista de Productos</p>
    </v-row>
    <v-data-table
            :headers="headers"
            :items="getAllProducts"
            sort-by="id"
            class="elevation-1"
            :loading="tableLoading"
    >
      <template v-slot:top>
        <v-toolbar flat color="transparent">
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="green" dark class="mb-2" v-on="on">
                <v-icon left>mdi-plus</v-icon>
                Agregar producto
              </v-btn>
            </template>
            <form enctype="multipart/form-data" @submit.prevent="save">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-text-field v-model="editedItem.nombre" label="Nombre del producto"></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field v-model="editedItem.marca" label="Marca"></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field v-model="editedItem.descripcion" label="Descripción" hint="Separa por comas las características del producto."></v-text-field>
                    </v-row>
                    <v-row>
                      <v-col class="pl-0">
                        <v-text-field v-model="editedItem.precio" label="Precio" type="number" min="0"></v-text-field>
                      </v-col>
                      <v-col class="pr-0">
                        <v-text-field v-model="editedItem.stock" label="Stock" type="number" min="0"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-file-input
                              v-model="editedItem.imagen"
                              show-size
                              prepend-icon="mdi-camera"
                              accept="image/png, image/jpeg, image/bmp"
                              label="Imagen del producto"
                              ref="uploadRef"
                      ></v-file-input>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text type="submit" :loading="saveLoading">Guardar</v-btn>
                </v-card-actions>
              </v-card>
            </form>
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
  import {mapActions, mapGetters} from 'vuex';
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
        {text: 'Nombre', value: 'nombre'},
        {text: 'Marca', value: 'marca'},
        {text: 'Descripción', value: 'descripcion'},
        {text: 'Precio', value: 'precio'},
        {text: 'Stock', value: 'stock'},
        {text: 'Acciones', value: 'actions', sortable: false},
      ],
      tableLoading: false,
      saveLoading: false,
      editedIndex: -1,
      editedItem: {
        id: '',
        nombre: '',
        marca: '',
        descripcion: '',
        imagen: null,
        precio: 0,
        stock: 0,
      },
    }),
    computed: {
      ...mapGetters(['getAllProducts']),
      formTitle() {
        return this.editedIndex === -1 ? 'Nuevo producto' : 'Editar producto'
      },
    },
    watch: {
      dialog(val) {
        val || this.close()
      },
    },
    methods: {
      ...mapActions(['loadProducts', 'addProduct']),
      editItem(item) {
        this.editedIndex = this.productos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item) {
        const index = this.productos.indexOf(item)
        confirm('¿Seguro que deseas borrar este producto?') && this.productos.splice(index, 1)
      },
      close() {
        this.dialog = false
        this.editedIndex = -1;
      },
      async save() {
        if (this.editedIndex > -1) {
          Object.assign(this.productos[this.editedIndex], this.editedItem)
        } else {
          this.saveLoading = true;
          const formData = new FormData();
          formData.append('imagen', this.editedItem.imagen);
          formData.append('nombre', this.editedItem.nombre);
          formData.append('descripcion', this.editedItem.descripcion);
          formData.append('precio', this.editedItem.precio);
          formData.append('stock', this.editedItem.stock);
          formData.append('marca', this.editedItem.marca);
          await this.addProduct(formData);
          this.saveLoading = false;
        }
        this.close()
      },
    },
    async created() {
      this.tableLoading = true;
      await this.loadProducts();
      this.tableLoading = false;
    }
  }
</script>