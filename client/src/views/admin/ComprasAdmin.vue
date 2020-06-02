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
                  <v-container>
                      <v-col class="pl-0">
                          <v-text-field v-model="editedItem.estado" label="Estado">
                          </v-text-field>
                      </v-col>
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
      tableLoading: false,
      saveLoading: false,
      editMode: false,
      formTitle: '',
      editedItem: {
          estado: '',

      },
    }),
    computed: {
      ...mapGetters(['getAllCompras']),
    },
    methods: {
      ...mapActions(['loadCompras']),
      addItem() {
      },
      editItem(item) {
        this.editMode = true;
        this.editedItem = Object.assign({}, item);
        this.formTitle = 'Editar Estado Compra';
        this.dialog = true;
      },
      deleteItem(item) {
        this.deleteId = item.id;
        this.confirmDeleteDialog = true;
      },
      async confirmDelete() {
      },
      async save() {

      },
      createFormData() {

      }
    },
    async created() {
      this.tableLoading = true;
      await this.loadCompras();
      this.tableLoading = false;
    }
  }
</script>