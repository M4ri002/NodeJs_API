// Aqui se manejan el routeo de las paginas, redireccions, etc
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'; //Ruta del componente que se mostrará
import about from '@/views/AboutView.vue';
import test from '@/views/test.vue';
import login from '@/views/LoginView.vue';
// import googletest from '@/views/GoogleTest.vue'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //SUDA
  routes: [
    {
      path: '/', //asi se llama la ruta de la home 
      name: 'home', //nombre con el que identificamos la ruta
      component: HomeView //nombre del componente que cargará al ir a la ruta
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // {
    //   path: '/googletest',
    //   name: 'googletest',
    //   component: googletest
    // },
  ]
})

export default router
