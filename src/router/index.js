import Vue from 'vue'
import VueRouter from 'vue-router'
import EmployeeView from '../views/EmployeeView.vue'
import WorkspaceView from '../views/WorkspaceView.vue'
import InfoView from '../views/InfoView.vue'
import EmployeeProfile from '../components/EmployeeProfile.vue'
// import WorkspaceInfo from '../components/WorkspaceInfo.vue'
import WorkspaceInfoTwo from '../components/WorkspaceInfoTwo.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/employee',
    name: 'employee',
    component: EmployeeView
  },
  {
    path: '/workspace',
    name: 'workspace',
    component: WorkspaceView
  },
  {
    path: '/information',
    name: 'information',
    component: InfoView
  },
  {
    path: '/employee/:employee_name',
    name: 'employee_name',
    component: EmployeeProfile
  },
  {
    path: '/workspace/:workspace_name',
    name: 'workspace_name',
    component: WorkspaceInfoTwo
  }
  // {
  //   path: '/workspace/:workspace_name',
  //   name: 'workspace_name',
  //   component: WorkspaceInfo
  // }
  
  // ,
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
