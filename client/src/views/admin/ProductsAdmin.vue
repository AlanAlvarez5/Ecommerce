<template>
  <v-container>
    <v-row>
      <p class="display-1 white--text ml-3">Lista de Productos</p>
    </v-row>
    <v-data-table
            hide-default-footer
            :headers="headers"
            :items="getAllProducts"
            sort-by="id"
            class="elevation-1"
            :loading="tableLoading"
            :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat color="transparent" height="130px">
          <v-row justify="space-between">
            <v-col cols="12" md="6">
              <v-text-field
                      clearable
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Buscar"
                      single-line
                      hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-row justify="end">
                <v-btn color="green" dark class="mb-2 mr-4" @click="addItem">
                  <v-icon left>mdi-plus</v-icon>
                  Agregar producto
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <v-dialog v-model="dialog" max-width="500px">
            <form enctype="multipart/form-data" @submit.prevent="save">
              <v-card class="px-3 py-2">
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
                      <v-text-field v-model="editedItem.descripcion" label="Descripción"
                                    hint="Separa por comas las características del producto."></v-text-field>
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
                      ></v-file-input>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
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
    <v-dialog v-model="confirmDeleteDialog" max-width="300">
      <v-card>
        <v-card-title class="headline">¿Estás seguro?</v-card-title>
        <v-card-text>Si eliminas este producto esta acción no se podrá deshacer.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="confirmDeleteDialog = false">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="confirmDelete" :loading="deleteLoading">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    data: () => ({
      confirmDeleteDialog: false,
      deleteId: null,
      deleteLoading: false,
      search: '',
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
      editMode: false,
      formTitle: '',
      editedItem: {
        id: '',
        nombre: '',
        marca: '',
        descripcion: '',
        imagen: null,
        precio: '',
        stock: '',
      },
    }),
    computed: {
      ...mapGetters(['getAllProducts']),
    },
    methods: {
      ...mapActions(['loadProducts', 'addProduct', 'deleteProduct', 'editProduct']),
      addItem() {
        this.editedItem = {
          id: '',
          nombre: '',
          marca: '',
          descripcion: '',
          imagen: null,
          precio: '',
          stock: '',
        };
        this.formTitle = 'Agregar producto';
        this.dialog = true;
      },
      editItem(item) {
        this.editMode = true;
        this.editedItem = Object.assign({}, item);
        this.editedItem.imagen = null;
        this.formTitle = 'Editar producto';
        this.dialog = true;
      },
      deleteItem(item) {
        this.deleteId = item.id;
        this.confirmDeleteDialog = true;
      },
      async confirmDelete() {
        this.deleteLoading = true;
        await this.deleteProduct(this.deleteId);
        this.deleteLoading = false;
        this.confirmDeleteDialog = false;
      },
      async save() {
        const formData = this.createFormData();
        this.saveLoading = true;
        if (this.editMode) {
          await this.editProduct(formData);
          this.editMode = false;
        } else {
          await this.addProduct(formData);
        }
        this.saveLoading = false;
        this.dialog = false;
      },
      createFormData() {
        const formData = new FormData();
        formData.append('imagen', this.editedItem.imagen);
        formData.append('id', this.editedItem.id);
        formData.append('nombre', this.editedItem.nombre);
        formData.append('descripcion', this.editedItem.descripcion);
        formData.append('precio', this.editedItem.precio);
        formData.append('stock', this.editedItem.stock);
        formData.append('marca', this.editedItem.marca);
        return formData;
      }
    },
    async created() {
      this.tableLoading = true;
      await this.loadProducts();
      this.tableLoading = false;
    }
  }
</script>