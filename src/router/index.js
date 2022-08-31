import {createRouter, createWebHistory} from 'vue-router'
import TicTacToe from '../views/TicTacToe'

const routes = [
  {
    path: '/',
    name: 'home',
    component: TicTacToe
  },
  {
    path: '/TicTacToe',
    name: 'TicTacToe',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TicTacToe.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
