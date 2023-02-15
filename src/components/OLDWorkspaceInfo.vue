<template>
    <div>
        <!-- <h1> Info workspace</h1>
        <h3> Current workspace name: {{ $route.params.workspace_name }}</h3> -->

            <v-card
                class="mb-2"
                width="900"
                style="margin-left: 50px; display: inline-block;  margin-bottom: 80px; margin-top: 30px;"
                variant="tonal"
                color="#afdeee"
                theme="dark"

                v-for="space, i in workspaces" v-show="space.name === $route.params.workspace_name" :key="i"
            >
                <div>
                    <div class="text-overline mb-1">
                        Owner:{{space.owner}}
                    </div>
                    <div class="text-h6 mb-1">
                    {{ $route.params.workspace_name }}
                    </div>
                    <div class="text-caption">Owner: {{space.owner}} </div>
                    <div class="text-caption">{{space.description}} </div>
                </div>
            </v-card>




        <!-- <v-container fluid>
            <v-select
            v-model="signups[name]"
            :items="items"
            @change="addSelectedTwo()"
            label="Select Employees"
            multiple
            >
            <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                <span>{{ item }}</span>
                </v-chip>
                <span
                v-if="index === 1"
                class="grey--text text-caption"
                >
                (+{{ signups.length - 1 }} others)
                </span>
                Items : {{ signups[index] }}
            </template>
            </v-select>
        </v-container> -->

         <!-- Ugly selection  -->
        <!-- <h3>Add selected employees</h3>
        <select @change="addSelected()" v-model="selected" multiple>
        <option v-for="option in signups" :value="option">
         {{ option.name }}
        </option>
        </select> -->

    <v-container>
        <v-row class="mx-12">
            <v-col cols="4">
                <!-- <h3 class="font-weight-medium mb-3 text-left">Add Selected Employees</h3> -->
                <v-expansion-panels>
                 <v-expansion-panel>
                  <v-expansion-panel-header>
                   Add Selected Employees
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                <select @change="addSelected()" 
                        v-model="selected" 
                        multiple 
                        style="height: 200px; 
                        width: 200px; 
                        padding: 10px; 
                        border: none; 
                        border-radius: 4px;"
                        class="text-left"
                        >
                    <option v-for="option in signups" :value="option" style="padding: 10px;" >

                        {{ option.name }}
                    </option>
                </select>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
            </v-col>
            <v-col cols="4">
                <v-btn
                        color="primary"
                        dark
                        @click="addAll()"
                        >
                        Add all employees to workspace
                </v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn
                    color="red"
                    dark
                    @click="removeAll()"
                >
                Remove all employees from workspace 
                </v-btn>

            </v-col>
        </v-row>
    </v-container>

         <!-- <h1>Selected: {{ selected }}</h1> --> 

         <!-- Ugly buttons  -->
        <!-- <button @click="addAll()">   Add all employees to workspace </button> -->
        <!-- <button @click="removeAll()">   Remove all employees from workspace </button> -->

        <TableInfo :data="space.people" :origin="false" :add-students="false" :allow-edit="false" :allow-remove="false" :allow-remove-all="false"></TableInfo>


    </div>

</template>

<script>
import TableInfo from '../components/TableInfo.vue'


export default {
    name: 'WorkspaceInfo',

    components:{
    TableInfo
    },

    data ()
    {
        return {
            signups: [],
            workspaces: [],
            selected:[],
            space: [],
            data: [],
            origin: false,
            items:[]
        }
    },
    mounted() {
      this.signups = JSON.parse(localStorage.getItem('signups')) || [];
      this.workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
      const workspace_name = this.$route.params.workspace_name;
        // Find group with relevant name
      this.space = this.workspaces.find(s => s.name === workspace_name );
        this.items = _.map(this.signups, 'name');
        console.log("items",this.items);
        this.selected= [];
    },
    computed:{
        workspaceId(){
            
            return this.$route.params.workspace_name
        }
    },
    methods: {
    addAll() {
        const workspace_name = this.$route.params.workspace_name;
        // Find group with relevant name
        const space = this.workspaces.find(s => s.name === workspace_name );
        // Add employees to people of workspace
        if (space) {
        space.people = this.signups;
        }

        // Store updated groups in local storage
        localStorage.setItem('workspaces', JSON.stringify(this.workspaces));
        console.log("people",space.people)
        console.log("full workspace",this.workspaces)
    },
    removeAll() {
        const workspace_name = this.$route.params.workspace_name;
        // Find group with relevant name
        const space = this.workspaces.find(s => s.name === workspace_name );

        // Add employees to people of workspace
        if (space) {
        space.people = [];
        }

        // Store updated groups in local storage
        localStorage.setItem('workspaces', JSON.stringify(this.workspaces));
        console.log("people",space.people)
        console.log("full workspace",this.workspaces)
    },
    addSelected(){
        const workspace_name = this.$route.params.workspace_name;
        // Find group with relevant name
        const space = this.workspaces.find(s => s.name === workspace_name );
        // find the selected people to add
        const values = this.selected;

        // Add employees to people of workspace
        if (space) {
            values.forEach(value => {
            if (!space.people.includes(value)) {
                space.people.push(value);
            }
            });
        }
        // console.log("people before set",space.people)
        // space.people = [...new Set(space.people)]
        // console.log("people after set",space.people)
        // console.log("full workspace",this.workspaces)
        // console.log("selected", this.selected)
        // Store updated groups in local storage
        localStorage.setItem('workspaces', JSON.stringify(this.workspaces));
    }
    // addSelectedTwo(){
    //     const workspace_name = this.$route.params.workspace_name;
    //     // Find group with relevant name
    //     const space = this.workspaces.find(s => s.name === workspace_name );
    //     // find the selected people to add
    //     const values = this.selected;

    //     // Add employees to people of workspace
    //     if (space) {
    //         values.forEach(value => {
    //         if (!space.people.includes(value)) {
    //             space.people.push(value);
    //         }
    //         });
    //     }
    //     console.log("people",space.people)
    //     console.log("full workspace",this.workspaces)
    //     // Store updated groups in local storage
    //     localStorage.setItem('workspaces', JSON.stringify(this.workspaces));
    // }
  }
}
</script>