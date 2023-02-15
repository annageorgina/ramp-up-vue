<template>
  <div v-if="showAllPeople">
    <h1>
        true if employee  {{ this.$route.path }}   </h1>
          <v-simple-table
        fixed-header
        height="300px"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Age
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="person in signups"
              :key="person.name"
            >
              <td>{{ person.name }}</td>
              <td>{{ person.age }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
  </div>
  <div v-else="showSpacePeople">
    <h1>
        true if workspace  {{ this.$route.path }}   </h1>

    <h1>ending ?? {{ this.$route.path.split("/").pop() }}</h1>
      
    <table>
      <tr v-for="space, i in workspaces" v-show="space.name === this.$route.path.split("/").pop()" :key="i">
        <td> {{space}}</td>
        <!-- <tr v-for="person in space.people" :key="person.name">
          <td>{{ person.name }}</td>
          <td>{{ person.age }}</td>
        </tr> -->
      </tr> 
    </table>
  </div>
</template>

<script>

export default {
  name: 'TableInfo',
  data ()
  {
      return {
          signups: [],
          workspaces: [],
          info: ''
      }
  },
  mounted() {
    this.signups = JSON.parse(localStorage.getItem('signups')) || [];
    this.workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];

  },
  computed:{
    showAllPeople() {
      return this.$route.path.endsWith('employee');
    },
    showSpacePeople(){
      return this.$route.path.match('/workspace/:workspace_name')
    }
    
}
}
</script>
