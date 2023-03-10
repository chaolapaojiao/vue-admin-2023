import Layout from '@/layout'
export default {
    path: '/attendance',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/attendances'),
            meta: {
                title: '社保',
                icon: 'table'
            }
        }
    ]
}