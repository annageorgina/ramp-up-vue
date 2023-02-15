<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart2',
    components: { Bar },
    props: {
        labels: {
          type: Array,
          required: true 
        },
        peoplenum: {
          type: Array,
          required: true,
        }
    },
    mounted() {
        this.signups = JSON.parse(localStorage.getItem("signups")) || [];
        this.workspaces = JSON.parse(localStorage.getItem("workspaces")) || [];
        this.chartData.labels = this.labels;
        this.chartData.datasets[0].data = this.peoplenum;
        // this.labels = _.map(this.workspaces, "name");
        // this.peoplenum = this.workspaces.map(obj => obj.people.length)
        // console.log("Workspace names", this.labels)
        // console.log("# emp by workspace", this.peoplenum)
        // this.chartData.labels = this.labels;
        // this.chartData.datasets[0].data = this.peoplenum;
    },
    // data() {
    //   return {
    //     people_lengths: [],
    //     chartData: {
    //             labels: ['Miles grumpy', 'Miles silly', 'Miles techy', 'Miles Funny', 'Miles angry', 'Miles amazing', 'Miles crazy', 'Miles sad', 'Miles giant'],
    //             datasets: [
    //             {
    //                 label: '# employees',
    //                 backgroundColor: '#f87979',
    //                 data: [2, 3, 2, 7, 2, 0, 5, 0, 7],
    //             }
    //             ]
    //      },
    //     chartOptions: {
    //       responsive: true
    //     }
    //   }
    // },
    data() {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              label: '# employees',
              backgroundColor: '#f87979',
              data: [],
            }
          ]
        },
        chartOptions: {
          responsive: true
        }
      }
    },
  }

  
  </script>
