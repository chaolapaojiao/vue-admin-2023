import Layout from '@/layout'
export default {
    path: '/attendance',
    name: 'attendance',
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