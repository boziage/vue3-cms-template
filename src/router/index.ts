import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const dashboard = () => import('@/views/main/analysis/dashboard/dashboard.vue')
const overview = () => import('@/views/main/analysis/overview/overview.vue')
const department = () => import('@/views/main/system/department/department.vue')
const menu = () => import('@/views/main/system/menu/menu.vue')
const role = () => import('@/views/main/system/role/role.vue')
const user = () => import('@/views/main/system/user/user.vue')
const category = () => import('@/views/main/product/category/category.vue')
const goods = () => import('@/views/main/product/goods/goods.vue')
const chat = () => import('@/views/main/story/chat/chat.vue')
const list = () => import('@/views/main/story/list/list.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    // children: [] => 根据userMenus决定
    children: [
      {
        path: '/main/analysis/dashboard',
        name: 'dashboard',
        component: dashboard,
        children: []
      },
      {
        path: '/main/analysis/overview',
        name: 'overview',
        component: overview,
        children: []
      },
      {
        path: '/main/system/department',
        name: 'department',
        component: department,
        children: []
      },
      {
        path: '/main/system/menu',
        name: 'menu',
        component: menu,
        children: []
      },
      {
        path: '/main/system/role',
        name: 'role',
        component: role,
        children: []
      },
      {
        path: '/main/system/user',
        name: 'user',
        component: user,
        children: []
      },
      {
        path: '/main/product/category',
        name: 'category',
        component: category,
        children: []
      },
      {
        path: '/main/product/goods',
        name: 'goods',
        component: goods,
        children: []
      },
      {
        path: '/main/story/chat',
        name: 'chat',
        component: chat,
        children: []
      },
      {
        path: '/main/story/list',
        name: 'list',
        component: list,
        children: []
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
