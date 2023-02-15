
<template>
  <div>
    <v-container pa-0 fluid>
      <v-row v-for="(string, index) in profile.comments "
        :key="index"
        variant="tonal" 
        dense>
      <v-col cols="11"  md="11" no-gutters>
        <v-card
          class="mx-auto"
        >
          <v-card-text >
            <div class="text--primary">
              {{ string }}
            </div>
          </v-card-text>
      </v-card>
      </v-col>
      <v-col no-gutters>
        <v-btn @click="removeComment(index)" icon>
            <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    </v-container>

    <v-container fluid>
      <v-row>
      <v-col cols="11"  md="11" no-gutters>
      <v-text-field
        name="input-1-1"
        variant="filled"
        label="Comments"
        auto-grow
        v-model="newString">
      </v-text-field>
      </v-col>
      <v-col no-gutters>
        <v-btn @click="submitString" icon>
            <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-col>
      </v-row>
  </v-container>
  </div>
</template>

<script>
export default {
  name: 'CommentSection',
  data() {
    return {
      text: [],
      newString: '',
      signups: [],
      profile: ''
    };
  },
  mounted() {
      this.signups = JSON.parse(localStorage.getItem('signups')) || [];
      const employee_name = this.$route.params.employee_name;
        // Find profile with relevant name
      this.profile = this.signups.find(s => s.name === employee_name );
    },
  computed:{
      employeeId(){
          return this.$route.params.employee_name
      }
  },
  methods: {
    submitString() {
      this.text.push(this.newString);
      this.profile.comments.push(this.newString);
      console.log("newstring",this.newString)
      this.newString = '';
      // updated local storage
      localStorage.setItem('signups', JSON.stringify(this.signups));

    },
    removeComment(index){ 
      this.profile.comments.splice(index,1);
      // Updated local storage
      localStorage.setItem('signups', JSON.stringify(this.signups));

    }
  }
};
</script>


