import request from '@/utils/request.js'

// 发现管理列表
export function adminList(data){
    return request({
        url:"/agency/callAdmin/discovery/admin/list"+data,
        method:"get"
    })
}
// 更新审核状态
export function updateStatus(data){
    return request({
        url:"/agency/callAdmin/discovery/admin/update/status"+data,
        method:"get"
    })
}
//  文章详情
export function infoId(data){
    return request({
        url:"/agency/callAdmin/discovery/admin/info/id"+data,
        method:"get"
    })
}
//
export function approveNumber(){
    return request({
        url:"/agency/callAdmin/discovery/approve/number",
        method:"get"
    })
}