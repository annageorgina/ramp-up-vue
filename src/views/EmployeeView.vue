<template>
  <div class="view pa-6">

    <!-- <EmployeeSignUp /> -->

    <TableInfo :data="data" :origin="true"></TableInfo>

  </div>

</template>

<script>
  import EmployeeSignUp from '../components/EmployeeSignUp'
  import TableInfo from '../components/TableInfo.vue'

  export default {
    name: 'EmployeeView',

    components: {
      EmployeeSignUp,
      TableInfo
    },
    data () {
      return {
        data: []
      }
    },
    mounted() {
      this.data = JSON.parse(localStorage.getItem('signups')) || [];
    },
  }
</script>
