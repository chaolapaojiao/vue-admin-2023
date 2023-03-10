import Layout from '@/layout'
export default {
    path: '/salary',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/salarys'),
            meta: {
                title: '薪资管理',
                icon: 'money'
            }
        }
    ]
}