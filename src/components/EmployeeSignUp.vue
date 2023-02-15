<template>
  <div class="view pa-6">
    <form @submit.prevent="submitForm">
      <label>Name:</label>
      <input type="text" v-model="signup.name" />

      <label>Age:</label>
      <input type="number" v-model="signup.age" />

      <button type="submit">Add</button>
    </form>
    <br>
    <br>
    <h2>Signups:</h2>
    <ul>
      <li v-for="(signup, index) in signups" :key="signup.name">
        {{ signup.name }} ({{ signup.age }} years old)
        <router-link v-bind:to="{path:'/employee/' + signup.name }">Link to profile   </router-link>
        <button @click="removeSignup(index)">   Remove</button>
      </li>
    </ul>
    <button @click="removeAllSignups">Remove All</button>

  </div>
</template>



<script>


export default {
  
  data() {
    return {
      signup: {
        name: '',
        age: '',
        salary: null,
        area: '',
        comments: []
      },
      signups: []
    };
  },
  created() {
    this.signups = JSON.parse(localStorage.getItem('signups')) || [];
  },
  methods: {
    submitForm() {
      this.signups.push(this.signup);
      localStorage.setItem('signups', JSON.stringify(this.signups));
      this.signup = { name: '', age: '' };
    },
    removeSignup(index) {
      this.signups.splice(index, 1);
      localStorage.setItem('signups', JSON.stringify(this.signups));
    },
    removeAllSignups() {
      this.signups = [];
      localStorage.setItem('signups', JSON.stringify(this.signups));
    }
  }
};
</script>






<!-- // PREVIOUSLY WITH ISRAEL -->




<!-- 
<!-- <template>
  <div>
    <!-- <v-container> ola {{ names }} </v-container> -->
    <!-- @submit="addemployee" -->
    <!-- <form> -->
    <!-- <input type="text" placeholder="enter name" v-model="employeedict.name" />
    <br /><br />
    <input type="age" placeholder="enter age" v-model="employeedict.age" />
    <br /><br />
    <button @click="save()">Add employee</button> -->
    <!-- </form> -->
    <!-- <v-btn @click="removeall()">Remove All</v-btn>

    <v-list v-for="(item, index) in employeedictList" :key="index">
      <v-card elevation="4" style="width: 300px">
        <h3>{{ item.name }}</h3>
        <v-btn @click="removeItem(index)">Remove</v-btn></v-card>
    </v-list>
  </div> -->
<!-- </template> -->
<!-- 
<script>
export default {
  name: "HelloWorld",
  data: () => ({
    error: [],
    details: [],
    employeedict: { name: "", age: "" },
    employeedictList: [],
  }),
  mounted() {
    localStorage.setItem('storeMePlease', []);
    localStorage.getItem('storeMePlease');
    localStorage.setItem('anotherThing', 'you look nice today');
    localStorage.getItem('anotherThing');
    var somethingComplicated = { crust: 'deep dish', type: 'veggie' };
    var stringifiedComplicated = JSON.stringify(somethingComplicated);
    localStorage.setItem('somethingComplicated', stringifiedComplicated);
    var somethingComplicated2 = { crust: 'thin', type: 'pesto' };
    var stringifiedComplicated2 = JSON.stringify(somethingComplicated2);
    localStorage.setItem('somethingComplicated2', stringifiedComplicated2); -->


    // this.employeedictList = localStorage.getItem("EmpList") || [];
    // // setInterval(() => {
    // //   console.log(this.employeedictList.length)
    // // }, 3000);
    // console.log(this.employeedictList.length)
    //console.log("mounted", document.getElementById('demo'), this.$el)
    // this.employeedictList.push(employeedict)
    //localStorage.setItem("name", this.name);
    // this.name = localStorage.getItem("name") + "5"
    // localStorage.setItem("name", this.name);
    // console.log("abriu" + this.name);
  },
  methods: {
    save() {
      this.bla = localStorage.getItem('storeMePlease');
      // this.setit = localStorage.setItem('anotherThing', 'you look nice today');
      this.getit = localStorage.getItem('anotherThing');
      console.log("storemeplease", this.bla)
      // console.log("another thing - setit",this.setit)
      console.log("another thing - getit",this.getit)

      var retrievedObject = localStorage.getItem('somethingComplicated');
      console.log("smtComp", retrievedObject)
      var parsedObject = JSON.parse(retrievedObject);
      this.employeedictList = parsedObject
      var retrievedObject2 = localStorage.getItem('somethingComplicated2');
      console.log("smtComp2", retrievedObject2)
      var parsedObject2 = JSON.parse(retrievedObject2);

      console.log("employeeListDict", this.bla)



    let EmpArr =  JSON.parse(localStorage.getItem('somethingComplicated')) || [];
    EmpArr.push(retrievedObject2);
    localStorage.setItem('somethingComplicated', JSON.stringify(EmpArr));

      // let stringData = localStorage.getItem("EmpList") || [];
      // this.employeedictList = localStorage.setItem('EmpList', stringData)
      // console.log("stringData", stringData)
      // // if (typeof stringData != "object") stringData = ;
      // // this.employeedictList = JSON.parse(stringData);
      // // this.employeedictList.push(this.employeedict);
      // console.log("dictList", this.employeedictList)
      // console.log("dict", this.employeedict)
      // localStorage.setItem("name", JSON.stringify(this.employeedictList));
    },
    removeall() {
      this.bla = localStorage.setItem('storeMePlease',[]);
      this.deletedbla = localStorage.getItem('storeMePlease');
      console.log("deleted - storemeplease",this.deletedbla);
      // localStorage.clear();
      // localStorage.setItem("EmpList", []);
      // this.employeedictList = [];
      // // falta algo aqui
    },
    removeItem(index) {
      // console.log(index);
      // // let local = JSON.parse(localStorage.getItem("name")) || [];
      // // this.employeedictList.splice(index, 1);
      // // localStorage.setItem("name", this.employeedictList);
    },
  },
};
<!-- </script> --> -->









<!-- 



// save() {
//   // console.log("name: " + this.employeedict.name);
//   // console.log("age: " + this.employeedict.age);
//   // if (this.employeedict.name && this.employeedict.age) {
//   //   console.log(" Function called");
//   //   console.log();
//   // }
//   // this.error = [];
//   // if (!this.employeedict.name) {
//   //   this.error.push("name is required");
//   // } else this.details.push(this.employeedict.name);
//   console.log("rodou");
//   let stringData = localStorage.getItem("name");
//   this.employeedictList = JSON.parse(stringData) || [];
//   this.employeedictList.push(this.employeedict);
//   localStorage.setItem("name", JSON.stringify(this.employeedictList));
//   // if (!this.employeedict.name) {
//   //   this.error.push("age is required");
//   // } else this.details.push(this.employeedict.name);
//   // console.log("error", this.error);
//   // console.log("details", this.details);
//   // console.log("employeedict", JSON.stringify(this.employeedict));
//   // e.preventDefault();
// }, --> -->
