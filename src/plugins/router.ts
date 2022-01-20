import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/pages/IndexPage.vue') },
  { path: '/types', component: () => import('@/pages/TypesPage.vue') },
  { path: '/sources', component: () => import('@/pages/SourcesPage.vue') },
  { path: '/categories', component: () => import('@/pages/CategoriesPage.vue') },
  { path: '/subcategories', component: () => import('@/pages/SubcategoriesPage.vue') },
  { path: '/operations', component: () => import('@/pages/OperationsPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
