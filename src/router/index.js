import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import nProgress from 'nprogress'
import approvals from './modules/approvals'
import attendances from './modules/attendances'
import departments from './modules/departments'
import employees from './modules/employees'
import permission from './modules/permission'
import salarys from './modules/salarys'
import setting from './modules/setting'
import social from './modules/social'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
export const asyncRouter = [
  approvals,
  attendances,
  departments,
  employees,
  permission,
  salarys,
  setting,
  social
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRouter]
})

const router = createRouter()

// 白名单
const whitePerson = ['/login', '/404']
// 路由前置守卫
router.beforeEach((to, from, next) => {
  nProgress.start()
  next()
  if (store.getters.token) {
    if (to.path === "/login") {
      next("/")
    } else {
      next()
    }
  } else {
    if (whitePerson.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
  nProgress.done()
})
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
