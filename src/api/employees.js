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

// 增加员工
export function addEmployees(data) {
    return request({
        method: 'post',
        url: "/sys/user",
        data
    })
}

// 获取员工基本信息
export function getBaseInfo(id) {
    return request({
        url: `/sys/user/${id}`
    })
}
// 更新员工信息
export function updateUserInfo(data) {
    return request({
        url: `/sys/user/${data.id}`,
        method: 'put',
        data
    })
}

// 获取用户的详细信息
export function getUserDetailInfo(id) {
    return request({
        url: `/employees/${id}/personalInfo`
    })
}

// 修改用户详细信息
export function updatePersonal(data) {
    return request({
        url: `/employees/${data.userId}/personalInfo`,
        method: 'put',
        data
    })
}

// 获取岗位信息
export function getJobInfo(id) {
    return request({
        url: `/employees/${id}/jobs`
    })
}
// 更新岗位信息
export function updateJob(data) {
    return request({
        url: `/employees/${data.userId}/jobs`,
        method: 'put',
        data
    })
}

// 分配员工角色
export function assignRole(data) {
    return request({
        url: '/sys/user/assignRoles',
        method: 'put',
        data
    })
}