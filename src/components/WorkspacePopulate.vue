<template>
  <div>
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
                <select
                  @change="addSelected()"
                  v-model="selected"
                  multiple
                  style="
                    height: 200px;
                    width: 200px;
                    padding: 10px;
                    border: none;
                    border-radius: 4px;
                  "
                  class="text-left"
                >
                  <option
                    v-for="(option, i) in signups"
                    :value="option"
                    :key="i"
                    style="padding: 10px"
                  >
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
            class="mb-auto"
             >
            Add all employees to workspace
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn 
            color="red" 
            dark 
            @click="removeAll()"
            class="mb-auto"
            >
            Remove all employees from workspace
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  name: "WorkspacePopulate",
  props: {
    data: {
      // type: Array,
      required: true,
    },
  },
  data() {
    return {
      signups: [],
      workspaces: [],
      selected: [],
      // space: [],
      item: [],
    };
  },
  mounted() {
    this.signups = JSON.parse(localStorage.getItem("signups")) || [];
    this.workspaces = JSON.parse(localStorage.getItem("workspaces")) || [];
    const workspace_name = this.$route.params.workspace_name;
    // Find group with relevant name
    this.space = this.workspaces.find((s) => s.name === workspace_name);
    this.items = _.map(this.signups, "name");
    console.log("items", this.items);
    this.selected = [];
  },
  computed: {
    workspaceId() {
      return this.$route.params.workspace_name;
    },
  },
  methods: {
    addAll() {
      const workspace_name = this.$route.params.workspace_name;
      // Find group with relevant name
      const space = this.workspaces.find((s) => s.name === workspace_name);
      // Add employees to people of workspace
      if (space) {
        space.people = this.signups;
      }
      // if (data) {
      // data.people = this.signups;
      // }

      // Store updated groups in local storage
      localStorage.setItem("workspaces", JSON.stringify(this.workspaces));
      console.log("people", space.people);
      console.log("full workspace", this.workspaces);
      this.$emit("key-trigger");
    },
    removeAll() {
      const workspace_name = this.$route.params.workspace_name;
      // Find group with relevant name
      const space = this.workspaces.find((s) => s.name === workspace_name);

      // Add employees to people of workspace
      if (space) {
        space.people = [];
      }
      // if (data) {
      // data.people = [];
      // }

      // Store updated groups in local storage
      localStorage.setItem("workspaces", JSON.stringify(this.workspaces));
      console.log("people", space.people);
      console.log("full workspace", this.workspaces);
      this.$emit("key-trigger");
    },
    addSelected() {
      const workspace_name = this.$route.params.workspace_name;
      // Find group with relevant name
      const space = this.workspaces.find((s) => s.name === workspace_name);
      // find the selected people to add
      const values = this.selected;
      this.items2 = _.map(this.selected, "name");
      //   console.log("items2", this.items2);

      //   console.log("selecvted", this.selected);
      //   console.log("selecvted", space);

      // Add employees to people of workspace
      if (space) {
        values.forEach((value) => {
          // console.log("people", space.people, value);

          var test = new Array(0);

          test = space.people.find((el) => {
            return el.name == value.name;
          });

        //   console.log("test", test);

          if (!test) {
            space.people.push(value);
          }

          //   console.log("test", test);
          //   if (!space.people.includes(value)) {
          //   }
        });
      }

      // if (data) {
      //     values.forEach(value => {
      //     if (!data.people.includes(value)) {
      //         data.people.push(value);
      //     }
      //     });
      // }
      // console.log("people before set",space.people)
      //   space.people = [...new Set(space.people)]
      // console.log("people after set",space.people)
      // console.log("full workspace",this.workspaces)
      // console.log("selected", this.selected)
      // Store updated groups in local storage
      localStorage.setItem("workspaces", JSON.stringify(this.workspaces));
      this.$emit("key-trigger");
    },
  },
};
</script>