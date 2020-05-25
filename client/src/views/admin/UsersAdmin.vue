<template>
    <v-container>
        <v-row>
            <p class="display-1 white--text ml-3">Lista de Usuarios</p>
        </v-row>
        <v-data-table
            :headers="headers"
            :items="users"
            sort-by="id"
            class="elevation-1"
        >
            <template v-slot:top>
            <v-toolbar flat color="white">
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
                            <v-text-field v-model="editedItem.nombre" label="Nombre del Usuario"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.correo" label="Correo"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.pass" label="Password"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.tel" label="Teléfono"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.dir" label="Dirección"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.cp" label="CP"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.ciudad" label="Ciudad"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.admin" label="Administrador"></v-text-field>
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
          text: 'Id Usuario',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Correo', value: 'correo' },
        { text: 'Password', value: 'pass' },
        { text: 'Teléfono', value: 'tel'},
        { text: 'Dirección', value: 'dir'},
        { text: 'CP', value: 'cp'},
        { text: 'Ciudad', value: 'ciudad'},
        { text: 'Admin', value: 'admin'},
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        id : '',
        nombre: '',
        correo: '',
        pass: '',
        tel: '',
        dir: '',
        cp: 0,
        ciudad: '',
        admin: 0,
      },
      defaultItem: {
        id : '',
        nombre: '',
        correo: '',
        pass: '',
        tel: '',
        dir: '',
        cp: 0,
        ciudad: '',
        admin: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
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
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

    deleteItem (item) {
        const index = this.users.indexOf(item)
        confirm('¿Seguro que deseas borrar este usuario?') && this.productos.splice(index, 1)
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
          Object.assign(this.users[this.editedIndex], this.editedItem)
        } else {
          this.users.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>