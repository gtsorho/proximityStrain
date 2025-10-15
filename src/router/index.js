import { createRouter, createWebHistory } from 'vue-router'
import mapView from '../views/mapView.vue'
import login from '../views/login.vue'
import main from '../views/main.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      children:[
        {
          path: 'map',
          name: 'map',
          component: mapView
        },
        {
          path: 'table',
          name: 'table',
          component: () => import('../views/tableView.vue')
        }
      ]
    },    
   
  ]
})

export default router
