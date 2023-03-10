import Layout from '@/layout'
export default {
    path: '/employees',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/employees'),
            meta: {
                title: '员工管理',
                icon: 'people'
            }
        },
        {
            path: 'detail/:id', // query传参 动态路由传参
            component: () => import('@/views/employees/compoents/detail.vue'),
            hidden: true, // 不在左侧菜单显示
            meta: {
                title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
            }
        }
    ]
}