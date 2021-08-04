import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BooksPage from '@/pages/BooksPage.vue';
import CatalogsPage from "@/pages/CatalogsPage.vue";
import AuthorsPage from "@/pages/AuthorsPage.vue";
import UsersPage from "@/pages/UsersPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'BooksPage',
    component: BooksPage
  },
  {
    path: '/catalogs',
    name: 'CatalogsPage',
    component: CatalogsPage
  },
  {
    path: '/authors',
    name: 'AuthorsPage',
    component: AuthorsPage
  },
  {
    path: '/users',
    name: 'UsersPage',
    component: UsersPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
