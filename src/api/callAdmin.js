import request from '@/utils/request.js'
// 查询机构管理列表
export function adminList(data){
    return request({
        url:"/agency/callAdmin/agenc1y/admin/list"+data,
        method:"get"
    })
}
// 更新机构备注、禁用状态
export function adminUpdate(data){
    return request({
        url:"/agency/callAdmin/agenc1y/admin/update",
        method:"post",
        data
    })
}
// 新增 机构
export function adminAdd(data){
    return request({
        url:"/agency/callAdmin/agenc1y/admin/add",
        method:"post",
        data
    })
}
//   编辑 机构
export function adminEdit(data){
    return request({
        url:"/agency/callAdmin/agenc1y/admin/edit",
        method:"post",
        data
    })
}
// 支付管理-列表  /agency/callAdmin/agency/pay/list
export function payList(data){
    return request({
        url:"/agency/callAdmin/agenc1y/pay/list?"+data,
        method:"get"
    })
}
// 支付管理-添加 
export function payAdd(data){
    return request({
        url:"/agency/callAdmin/agenc1y/pay/add",
        method:'post',
        data
    })
}
// 支付管理-开启/关闭通道-审核状态 
export function updateStatus(data){
    return request({
        url:"/agency/callAdmin/agenc1y/pay/update/status",
        method:'post',
        data
    })
}
// 支付管理-查询 /agency/callAdmin/agency/pay/id
export function payId(data){
    return request({
        url:"/agency/callAdmin/agenc1y/pay/id?"+data,
        method:'get'
    })
}
//  支付管理-编辑 
export function payEdit(data){
    return request({
        url:"/agency/callAdmin/agenc1y/pay/edit",
        method:'post',
        data
    })
}
//支付管理-添加2  
export function addSimple(data){
    return request({
        url:"/agency/callAdmin/agenc1y/pay/add/simple",
        method:"post",
        data
    })
}
//支付管理-编辑2  
export function editSimple(data){
    return request({
        url:"/agency/callAdmin/agenc1y/pay/edit/simple",
        method:"post",
        data
    })
}