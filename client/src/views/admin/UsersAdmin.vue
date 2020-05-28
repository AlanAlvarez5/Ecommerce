<template>
  <v-container>
    <v-row>
      <p class="display-1 white--text ml-3">Lista de Usuarios</p>
    </v-row>
    <v-data-table
            hide-default-footer
            :headers="headers"
            :items="getAllUsers" 
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
                  Agregar Usuario
                </v-btn>
              </v-row>
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
                    <v-row>
                      <v-text-field v-model="editedItem.nombre" label="Nombre del Usuario"></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field v-model="editedItem.correo" label="Correo"></v-text-field>
                    </v-row>
                    <v-row>
                      <v-col class="pl-0">
                          <v-text-field :type="'password'" v-model="editedItem.password" label="Password"></v-text-field>
                        </v-col>
                        <v-col class="pr-0">
                          <v-text-field v-model="editedItem.telefono" label="Teléfono"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                      <v-text-field v-model="editedItem.direccion" label="Dirección"></v-text-field>
                    </v-row>
                    <v-row>
                      <v-col class="pl-0">
                        <v-text-field v-model="editedItem.cp" label="CP"></v-text-field>
                      </v-col>
                      <v-col class="pr-0">
                        <v-text-field v-model="editedItem.ciudad" label="Ciudad"></v-text-field>
                      </v-col>
                    </v-row>
                      <v-col class="pl-0">
                          <v-text-field v-model="editedItem.admin" label="Administrador"
                            hint="0 para Usuario, 1 para Administrador." 
                            type="number" min="0" max="1">
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
      dialog: false,
      confirmDeleteDialog: false,
      deleteId: null,
      deleteLoading: false,
      search: '',
      headers: [
        {
          text: 'Id Usuario',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Correo', value: 'correo' },
        { text: 'Teléfono', value: 'telefono'},
        { text: 'Dirección', value: 'direccion'},
        { text: 'CP', value: 'cp'},
        { text: 'Ciudad', value: 'ciudad'},
        { text: 'Admin', value: 'admin'},
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      tableLoading: false,
      saveLoading: false,
      editMode: false,
      formTitle: '',
      editedItem: {
        id: '',
        nombre: '',
        correo: '',
        password: '',
        telefono: '',
        direccion: '',
        cp: '',
        ciudad: '',
        admin: '',

      },
    }),
    computed: {
      ...mapGetters(['getAllUsers']),
    },
    methods: {
      ...mapActions(['loadUsers', 'addUser', 'deleteUser', 'editUser']),
      addItem() {
        this.editedItem = {
          id: '',
          nombre: '',
          correo: '',
          password: '',
          telefono: '',
          direccion: '',
          cp: '',
          ciudad: '',
          admin: '',
        };
        this.formTitle = 'Agregar Usuario';
        this.dialog = true;
      },
      editItem(item) {
        this.editMode = true;
        this.editedItem = Object.assign({}, item);
        this.formTitle = 'Usuario';
        this.dialog = true;
      },
      deleteItem(item) {
        this.deleteId = item.id;
        this.confirmDeleteDialog = true;
      },
      async confirmDelete() {
        this.deleteLoading = true;
        await this.deleteUser(this.deleteId);
        this.deleteLoading = false;
        this.confirmDeleteDialog = false;
      },
      async save() {
        const formData = this.createFormData();
        this.saveLoading = true;
        if (this.editMode) {
          await this.editUser(formData);
          this.editMode = false;
        } else {
          await this.addUser(formData);
        }
        this.saveLoading = false;
        this.dialog = false;
      },
      createFormData() {
        const formData = new FormData();
        formData.append('id', this.editedItem.id);
        formData.append('nombre', this.editedItem.nombre);
        formData.append('correo', this.editedItem.correo);
        formData.append('password', this.editedItem.password);
        formData.append('telefono', this.editedItem.telefono);
        formData.append('direccion', this.editedItem.direccion);
        formData.append('cp', this.editedItem.cp);
        formData.append('ciudad', this.editedItem.ciudad);
        formData.append('admin', this.editedItem.admin);
        return formData;
      }
    },
    async created() {
      this.tableLoading = true;
      await this.loadUsers();
      this.tableLoading = false;
    }
  }
</script>