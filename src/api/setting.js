import request from '@/utils/request'

export function getRole(params) {
    return request({
        url: '/sys/role',
        method: 'get',
        params
    })
}
// 获取公司信息数据
export function getCompanyInfo(companyId) {
    return request({
        url: `/company/${companyId}`
    })
}
// 删除
export function deleteRole(id) {
    return request({
        url: `/sys/role/${id}`,
        method: 'delete'
    })
}
// 获取详情
export function getRoleDetail(id) {
    return request({
        url: `/sys/role/${id}`,
        method: 'get'
    })
}
// 更新数据
export function updateInfo(data) {
    return request({
        url: `/sys/role/${data.id}`,
        data,
        method: 'put'
    })
}
// 新增
export function addRole(data) {
    return request({
        url: '/sys/role',
        data,
        method: 'post'
    })
}