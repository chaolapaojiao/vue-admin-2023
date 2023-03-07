import request from '../utils/request'
// 获取员工列表
export function getEmployees(params) {
    return request({
        method: 'get',
        url: '/sys/user',
        params
    })
}

// 删除员工
export function deleteEmployees(id) {
    return request({
        method: 'delete',
        url: `/sys/user/${id}`
    })
}