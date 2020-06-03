<template>
  <v-container>
    <v-row>
      <p class="display-1 white--text ml-3">Lista de Compras</p>
    </v-row>
    <v-data-table
            hide-default-footer
            :headers="headers"
            :items="getAllCompras" 
            sort-by="id"
            class="elevation-1"
            :loading="tableLoading"
            :search="search"
    >
      <template v-slot:item.estado="{ item }">
        <v-chip :color="getColor(item.estado)" dark>{{ item.estado }}</v-chip>
      </template>
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
          </v-row>
          <v-dialog v-model="dialog" max-width="500px">
            <form @submit.prevent="save">
              <v-card class="px-3 py-2">
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container v-if="editMode">
                      <v-col class="pl-0">
                        <v-select v-model="editedItem.estado" label="Estado"
                            :items="estados"
                        ></v-select>
                      </v-col>
                  </v-container>
                  <v-container v-else-if="showDetails">
                      <v-col class="pl-0">
                        <p>AQUI VAN TODOS LOS DETALLES DE LA COMPRA SELECCIONADA</p>
                        <v-data-table
                          hide-default-footer
                          :headers="detailHeaders"
                          :items="getAllDetallesFromCompra" 
                          sort-by="product_id"
                          class="elevation-1"
                          :loading="tableLoading"
                          :search="search"
                        ></v-data-table>
                      </v-col>
                  </v-container>
                </v-card-text>
                <v-card-actions  v-if="editMode">
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text type="submit" :loading="saveLoading">Guardar</v-btn>
                </v-card-actions>
                <v-card-actions  v-else-if="showDetails">
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">Volver</v-btn>
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
          @click="showItem(item)"
        >
          mdi-eye
        </v-icon>
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
        <v-card-text>Si eliminas esta compra esta acción no se podrá deshacer.</v-card-text>
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
      dialog: false,
      confirmDeleteDialog: false,
      showCompraId: null,
      deleteId: null,
      deleteLoading: false,
      search: '',
      headers: [
        {
          text: 'Id Compra',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Id Usuario', value: 'usuario_id' },
        { text: 'Total', value: 'total' },
        { text: 'Fecha', value: 'fecha_hora'},
        { text: 'Estado', value: 'estado'},
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      detailHeaders: [
        {
          text: 'Id Producto',
          align: 'start',
          sortable: false,
          value: 'producto_id',
        },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Marca', value: 'marca' },
        { text: 'Precio', value: 'precio' },
      ],
      tableLoading: false,
      saveLoading: false,
      editMode: false,
      showDetails: false,
      formTitle: '',
      editedItem: {
          id: '',
          estado: '',
      },
      estados: ['Proceso','Enviado', 'Completado'],
    }),
    computed: {
      ...mapGetters(['getAllCompras','getAllDetallesFromCompra']),
    },
    methods: {
      getColor (estado){
        if (estado == 'Proceso') return 'orange'
        else if (estado == 'Enviado') return 'blue'
        else  return 'green'
      },
      ...mapActions(['loadCompras','deleteCompra','editCompra','loadDetalleCompra']),
      editItem(item) {
        this.showDetails = false;
        this.editMode = true;
        this.editedItem = Object.assign({}, item);
        this.formTitle = 'Editar Estado Compra';
        this.dialog = true;
      },
      deleteItem(item) {
        this.deleteId = item.id;
        this.confirmDeleteDialog = true;
      },
      async showItem(item) {
        this.showCompraId = item.id
        this.editMode = false;
        this.showDetails = true;
        await this.loadDetalleCompra(this.showCompraId);
        this.formTitle = 'Detalle de Compra';
        this.dialog = true;
      },
      async confirmDelete() {
        this.deleteLoading = true;
        await this.deleteCompra(this.deleteId);
        this.deleteLoading = false;
        this.confirmDeleteDialog = false;
      },
      async save() {
        const formData = this.createFormData();
        this.saveLoading = true;
        if (this.editMode) {
          await this.editCompra(formData);
          this.editMode = false;
        }
        this.saveLoading = false;
        this.dialog = false;
      },
      createFormData() {
        const formData = new FormData();
        formData.append('id', this.editedItem.id);
        formData.append('estado', this.editedItem.estado);
        return formData;
      }
    },
    async created() {
      this.tableLoading = true;
      await this.loadCompras();
      this.tableLoading = false;
    }
  }
</script>