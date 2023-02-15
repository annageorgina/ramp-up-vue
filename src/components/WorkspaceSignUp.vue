<template>
    <div >
      <!-- <form @submit.prevent="submitForm">
        <label>Name:</label>
        <input type="text" v-model="workspace.name" />
  
        <label>owner:</label>
        <select v-model="workspace.owner" >
          <option v-for="option in signups" :value="option.name" >
          {{ option.name }}

          </option>
        </select>
        <label>Description:</label>
        <textarea type="text" v-model="workspace.description" />
        <div>Selected: {{ selected }}</div> -->
        <!-- <button type="submit">Add</button> -->
        

  <form @submit.prevent="submitForm">
    <v-text-field
      v-model="workspace.name"
      :counter="20"
      label="Name"
      required
    ></v-text-field>

    <v-select
      v-model="workspace.owner"
      label="Owner"
      required
      :items="items"
    >          
    <!-- <option v-for="option in signups" :value="option.name" >
          {{ option.name }}
     </option> -->
    </v-select>

    <v-textarea
      type="text" 
      v-model="workspace.description"
      rows="2"
      label="Description"
    ></v-textarea>




    <v-btn
        type="submit"
        color="primary"
        dark
        class="mb-2"

      >
        Add Workspace
      </v-btn>
  </form>



        
 
      <v-btn
        color="red"
        dark
        class="mb-2"

        @click="removeAllSignups"
      >
        Remove all workspaces
      </v-btn>

  <!-- UGLY SIGNUP -->
      <!-- <v-btn
        type="submit"
        color="primary"
        dark
        class="mb-2"

      >
        Add Workspace
      </v-btn>
    </form> -->
                    <!-- UGLY TABLE OF WORKSPACES -->
      <!-- <br>
      <br>
      <h2>Signups:</h2>
      <ul>
        <li v-for="(workspace, index) in workspaces" :key="workspace.name">
          {{ workspace.name }} - Owner: {{ workspace.owner }}
          Description - {{ workspace.description }}
          <router-link v-bind:to="{path:'/workspace/' + workspace.name }">Link to workspace   </router-link>
          <button @click="removeSignup(index)">Remove</button>
        </li>
      </ul> -->
     <!-- <button @click="removeAllSignups">Remove All</button>
    </div> -->
  </div >
  </template>
  
  <script>


  export default {
    setup () {
      const initialState = {
        name: '',
        description: '',
        owner: null
      }
    },

    data() {
      return {
        signup: {
          name: '',
          age: ''
        },
        signups: [],
        workspace: {
          name: '',
          owner: '',
          people:[],
          description:''
        },
        workspaces: [],
        selected: '',
        items: []

        
      };
    },
    mounted() {
      this.signups = JSON.parse(localStorage.getItem('signups')) || [];
      this.workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
      this.items = _.map(this.signups, 'name')
      console.log(this.items)
      this.$emit("key-trigger");
    },
    created() {
      this.signups = JSON.parse(localStorage.getItem('signups')) || [];
      this.workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
      this.$emit("key-trigger");
    },
    methods: {
      submitForm() {
        this.workspaces.push(this.workspace);
        localStorage.setItem('workspaces', JSON.stringify(this.workspaces));
        this.workspace = { name: '', owner: '', people:[]} 
        this.$emit("key-trigger");
      },
      removeSignup(index) {
        this.workspaces.splice(index, 1);
        localStorage.setItem('workspaces', JSON.stringify(this.workspaces));
        this.$emit("key-trigger");
      },
      removeAllSignups() {
        this.workspaces = [];
        localStorage.setItem('workspaces', JSON.stringify(this.workspaces));
        this.$emit("key-trigger");
      }
    }
  };
  </script>
  
  
  
 