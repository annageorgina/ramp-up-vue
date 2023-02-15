<template>
    <div class="view pa-6">
      <WorkspaceSignUp @key-trigger="triggerKey" />

      <CardsTile :data="workspaces" @key-trigger="triggerKey" />
      

    
      <!-- <BarChart2/> -->
      <BarChart2 :labels="labels" :peoplenum="peoplenum" />
      

      <div class="text-center">
      <v-chip
        class="ma-2"
        color="indigo"
        text-color="white"
        prepend-icon="mdi mdi-pound"
      >
        Total # of workspaces: {{ number }}
      </v-chip>
      </div>
  

    </div>
  
  </template>
  
  <script>
    import WorkspaceSignUp from '../components/WorkspaceSignUp';
    import CardsTile from '../components/CardsTile';
    import BarChart2 from '../components/BarChart2';
    


    export default {
      data (){
        return {
            booleanKey: true,
            workspaces: [],
            number: null,
            labels: [],
            peoplenum: [],
        }
    },
      name: 'WorkspaceView',
  
      components: {
        WorkspaceSignUp,
        CardsTile,
        BarChart2
      },
      mounted() {
        this.getWorkspaces();

      //   this.labels= ['z','x','y'],

      //   // this.labels = _.map(this.workspaces, "name");
      //   // this.items= [9,10,11,9,10,11,9,10,11,9,10]
      //   this.items= [9,10,11]
      //   console.log("labels", this.labels)

      //   console.log("items", this.items)
       },
      methods: {
        getWorkspaces() {
        this.workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
        this.number = this.workspaces.length
        console.log(this.number)
        this.labels = _.map(this.workspaces, "name");
        this.peoplenum = this.workspaces.map(obj => obj.people.length)
        console.log("Workspace names", this.labels)
        console.log("# emp by workspace", this.peoplenum)
      },
        triggerKey() {
          this.getWorkspaces();
          this.booleanKey = !this.booleanKey;
      }
    },
    }
  </script>
  
  