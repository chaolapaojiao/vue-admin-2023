import request from '../utils/request'
export function getDepartment() {
    return request({
        method: 'get',
        url: '/company/department'
    })
}

export function removeDepartment(id) {
    return request({
        url: `/company/department/${id}`,
        method: 'delete',

    })
}

export function addDepartment(data) {
    return request({
        url: '/company/department',
        method: 'post',
        data
    })
}
export function getEmployeeSimple() {
    return request({
        url: '/sys/user/simple'
    })
}