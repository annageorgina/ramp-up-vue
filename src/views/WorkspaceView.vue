<template>
    <div class="view pa-6">
      <WorkspaceSignUp @key-trigger="triggerKey" />

      <CardsTile :data="workspaces" @key-trigger="triggerKey" />
      

    
      <!-- <BarChart2/> -->
      <BarChart2 :labels="labels" :peoplenum="peoplenum" :key="booleanKey"/>
      

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
      data() {
        return {
          loading: true,
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
      beforeMount() {
        this.getWorkspaces();
        

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
        this.loading = false;
      },
        triggerKey() {
          this.getWorkspaces();
          this.booleanKey = !this.booleanKey;
      }
    },
    }
  </script>
  
  