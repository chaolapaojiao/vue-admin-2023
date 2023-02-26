import Layout from '@/layout'
export default {
    path: '/social',
    name: 'social',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/social'),
            meta: {
                title: '组织架构',
                icon: 'tree'
            }
        }
    ]
}