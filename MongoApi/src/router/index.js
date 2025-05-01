import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Hogueras from '../views/Hogueras.vue'
import Participantes from '../views/Participantes.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hogueras',
    name: 'Hogueras',
    component: Hogueras
  },
  {
    path: '/participantes',
    name: 'Participantes',
    component: Participantes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router