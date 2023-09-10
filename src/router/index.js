import Vue from 'vue'
import VueRouter from 'vue-router';
import HomeView from "@/views/HomeView";
import PredmetView from "@/views/PredmetView.vue";
import StudentView from "@/views/StudentView.vue";
import TemaView from "@/views/TemaView.vue";



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/predmet',
    name: 'predmet',
    component: PredmetView
  },
  {
    path: '/student',
    name: 'student',
    component: StudentView
  },
  {
    path: '/tema',
    name: 'tema',
    component: TemaView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router