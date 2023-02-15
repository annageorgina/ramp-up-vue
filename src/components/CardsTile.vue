<template>
    <v-container>
    <v-row>
      <v-col
        v-for="(card, index) in data"
        :key="index"
        cols="12"
        md="4"
      >
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-card-text>
            <div> Workspace {{ index + 1 }}</div>
            <p class="text-h4 text--primary">
              {{card.name}}
            </p>
            <p>{{card.owner}}</p>
            <div class="text--primary">
              {{ card.description }}
            </div>
          </v-card-text>
          <v-card-actions>

        <v-row align="center" no-gutters>
        <v-col
          class="text-h2"
          cols="6"
        >
          <v-btn
            text
            color="teal accent-4"
            :to="'./workspace/' + card.name"
          >
            MORE INFO
          </v-btn>
        </v-col>

        <v-col cols="6" class="text-right">
          <v-btn @click="editCard(index)" icon >
            <v-icon >mdi-pencil</v-icon>
        </v-btn>
          <v-btn @click="removeCard(index)" icon >
            <v-icon >mdi-delete</v-icon>
        </v-btn>

        </v-col>

      </v-row>
      </v-card-actions>

  

     </v-card>
     </v-col>
    </v-row>

    <v-dialog v-model="reveal" max-width="500">
      <v-card>
        <v-card-title class="headline">
          Edit Workspace
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
            <v-select
              v-model="editedItem.owner"
              label="Owner"
              :items="items"
            ></v-select>
            <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reveal = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveCard">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
  </template>

<script>
export default {
    name: 'CardsTile',
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        reveal: false,
        editedIndex: -1,
        editedItem: {
          name: '',
          owner: '',
          description: ''
        },
        signups: [],
        items: [],
    }),
    mounted() {
        this.initialise();
    },
    methods:{
      initialise(){
        this.workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
        this.$emit("key-trigger"); 
        this.signups = JSON.parse(localStorage.getItem('signups'))|| [];
        this.items = _.map(this.signups, "name");
      },
      removeCard(index){
        this.data.splice(index,1);
        // Updated local storage
        localStorage.setItem('workspaces', JSON.stringify(this.data));
        this.$emit("key-trigger");
      },
      editCard(index) {
      this.editedIndex = index;
      this.editedItem = Object.assign({}, this.data[index]);
      this.reveal = true;
      },
      saveCard() {
        // Update the data array with the edited item
        this.data.splice(this.editedIndex, 1, this.editedItem);

        // Updated local storage
        localStorage.setItem("workspaces", JSON.stringify(this.data));

        // Hide the dialog
        this.reveal = false;
      },
  }
}
</script>

<style>
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
</style>