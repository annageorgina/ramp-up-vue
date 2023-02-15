<template>

<div>
  <!-- <input 
    v-model="password" 
    placeholder="Salary Password"
    label="Password" 
    type="password" 
    /> -->
    <v-col
          cols="12"
          sm="3"
    >
    <v-text-field 
    v-model="password" 
    label="Salary Password" 
    placeholder="Password"
    type="password" 
    outlined 
    prepend-icon="mdi-key"
  ></v-text-field>
  </v-col>

  <!-- <v-text-field 
      v-model="password" 
      label="Password" 
      type="password"
  ></v-text-field> -->
    <!-- <v-data-table
      :headers="headers"
      :items="data"
      sort-by="name"
      class="elevation-1"
    > -->
    <v-data-table 
      :headers="tableHeaders" 
      :items="data" 
      sort-by="name" 
      class="elevation-1">

      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Employees</v-toolbar-title>
          
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

          <!-- <v-text-field 
            v-model="password" 
            label="Password"
          ></v-text-field> -->



          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="addStudents"
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Add New Employee
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="10"
                      md="10"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      >
                      </v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                      <v-text-field
                        v-model="editedItem.salary"
                        label="Salary"
                        v-if="password === 'IAMTHEBOSS'"
                      ></v-text-field>

                      <v-select
                        v-model="editedItem.area"
                        label="Area"
                        :items="['Tech', 'Product', 'Design', 'Accounts', 'Strategy', 'Growth', 'Finance', 'Legal']"
                      ></v-select>

                      <v-text-field
                        v-model="editedItem.age"
                        label="Age"
                        
                      ></v-text-field>

                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog 
              v-model="dialogDelete" 
              max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <template >
              <v-btn
                color="red"
                dark
                class="mb-2"
                @click="deleteAll()"
                v-if="allowRemoveAll"
              >
                Remove all
              </v-btn>
            </template>

        </v-toolbar>

      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          v-if="allowEdit"
          small
          class="mr-3"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          class="mr-3"
          @click="deleteItem(item)"
          v-if="allowRemove"
        >
          mdi-delete
        </v-icon>
        <v-icon
          small
          class="mr-3"
          @click="linkTo(item)"
        >
          mdi-link
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Show All
        </v-btn>
      </template>
    </v-data-table>
</div>

  </template>


<script>

  export default {
    name: 'TableInfo',
    props: {
        data: {
        // type: Array,
        required: true
        },
        origin: {
          type: Boolean
        },
        addStudents: {
          type: Boolean,
          default: true
        },
        allowEdit: {
          type: Boolean,
          default: true
        },
        allowRemove: {
          type: Boolean,
          default: true
        },
        allowRemoveAll: {
          type: Boolean,
          default: true
        }
    },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      password: '',
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Salary', value: 'salary', class: 'salary-header' },
        { text: 'Area', value: 'area' },
        { text: 'Age', value: 'age' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    //   data: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        age: 0,
        salary: 1000,
        area: '',
        comments: []
      },
      defaultItem: {
        name: '',
        age: 0,
        salary: 1000,
        area: '',
        comments: []
      },
      empty: ['I am not empty']
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      tableHeaders() {
        if (this.password === 'IAMTHEBOSS') {
          // show all columns

          return this.headers;
        } else {
          // hide the 'Salary' column
          return this.headers.filter((header) => header.value !== "salary");
        }

      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    mounted() {
      this.signups = JSON.parse(localStorage.getItem('signups')) || [];
      this.workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    },
    created () {
      this.signups = JSON.parse(localStorage.getItem('signups')) || [];
      this.initialize();
    },
    methods: {
      initialize () {
        this.signups = JSON.parse(localStorage.getItem('signups')) || [];
      },
      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteAll() {
        this.dialogDelete = true
        this.empty = [];
     },
      deleteItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        if (this.empty.length === 0) {
            this.data  = []
            localStorage.setItem('signups',JSON.stringify(this.data));
            this.empty = ['I am not empty']
        } else {
            this.data.splice(this.editedIndex, 1)
            localStorage.setItem('signups', JSON.stringify(this.data));
        }
        this.closeDelete()
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        localStorage.setItem('signups', JSON.stringify(this.data));
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.data[this.editedIndex], this.editedItem)
          localStorage.setItem('signups', JSON.stringify(this.data));

        } else {
          this.data.push(this.editedItem)
          localStorage.setItem('signups', JSON.stringify(this.data));

        }
        this.close()
      },
      linkTo (item) {
        this.editedIndex = this.data.indexOf(item)
        console.log(this.data[this.editedIndex].name)
        this.$router.replace({ path: '/employee/' + this.data[this.editedIndex].name })
      }
  }
}
</script>