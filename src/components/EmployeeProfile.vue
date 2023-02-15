<template>
    <div>
        <input 
        v-model="password" 
        placeholder="Salary Password"
        label="Password" 
        type="password" 
        />
        <!-- <h1> Profile</h1>
        <h3> Current profile name: {{ $route.params.employee_name }}</h3>
        <table border="1px">
            <tr>
                <td>Name</td>
                <td>Age</td>

            </tr>
            <tr v-for="emp, i in signups" v-show="emp.name === $route.params.employee_name" :key="i">
                <td>{{emp.name}}</td>
                <td>{{emp.age}}</td>
                <td>{{i}}</td>

            </tr>
        </table> -->
        <!-- <TableInfo :data="profile" :origin="true" :add-students="false" :allow-edit="true" :allow-remove="false"></TableInfo> -->

        <template >
            <v-card
                class="mb-2"
                width="900"
                style="margin-left: 50px; display: inline-block;  margin-bottom: 80px; margin-top: 30px;"
                variant="tonal"
                color="#afdeee"
                theme="dark"

            >

            <!-- v-for="emp, i in signups" v-show="emp.name === $route.params.employee_name" :key="i" -->
                <v-card-item>
                <div>
                    <div class="text-overline mb-1">
                    <!-- {{emp.area}} -->
                    {{ profile.area }}
                    </div>
                    <div class="text-h6 mb-1">
                    <!-- {{ $route.params.employee_name }} -->
                    {{ profile.name }}
                    </div>
                    <!-- <div class="text-caption">{{emp.age}} years old</div> -->

                    <div class="text-caption">{{profile.age}} years old</div>
                    <!-- <div v-if="password ==='IAMTHEBOSS'" class="text-caption">{{emp.salary}} Salary</div> -->
                    <div v-if="password ==='IAMTHEBOSS'" class="text-caption">{{profile.salary}} Salary</div>

                </div>
                </v-card-item>

                <v-card-actions>
                </v-card-actions>
            </v-card>
            </template>
        <h4>Comments</h4>
        <CommentSection />
    </div>

</template>

<script>
import CommentSection from '../components/CommentSection'
// import TableInfo from '../components/TableInfo.vue'

export default {
    name: 'EmployeeProfile',
    components: {
        CommentSection,
        // TableInfo
    },
    data ()
    {
        return {
            signups: [],
            workspaces: [],
            password: '',
            profile: []
        }

        // return {employeeName:this.$route.params.name}
    },
    mounted() {
      this.signups = JSON.parse(localStorage.getItem('signups')) || [];
      this.workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
      const employee_name = this.$route.params.employee_name;
        // Find profile with relevant name
      this.profile = this.signups.find(s => s.name === employee_name );

      
    },
    computed:{
        employeeId(){
            return this.$route.params.employee_name
        }
    },
    removeAllSignups() {
      this.signups = [];
      localStorage.setItem('signups', JSON.stringify(this.signups));
    }
}
</script>

