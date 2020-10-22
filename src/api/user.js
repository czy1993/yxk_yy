import request from '@/utils/request.js'

export function login(data){
    return request({
        url:"/admin/back/user/login",
        method:"post",
        data
    })
}
//忘记密码之校验手机号
export function sendVerifyCode(data){
    return request({
        url:"/admin/back/user/sendVerifyCode"+data,
        method:"get",

    })
}
//忘记密码之重置密码
export function forgetPassReset(data){
    return request({
        url:"/admin/back/user/forgetPassReset",
        method:"post",
        data
    })
}
//修改密码
export function updatePass(data){
    return request({
        url:"/admin/back/user/updatePass",
        method:"post",
        data
    })
}
// 查询员工列表 
export function queryUserList(data){
    return request({
        url:"/admin/back/user/queryUserList"+data,
        method:"get"
    })
}
// 重置密码
export function resetPass(data){
    return request({
        url:"/admin/back/user/resetPass"+data,
        method:"get",

    })
}
// 删除员工
export function userDelete(data){
    return request({
        url:"/admin/back/user/userDelete",
        method:"post",
        data
    })
}
// 新增员工
export function userAdd(data){
    return request({
        url:"/admin/back/user/userAdd",
        method:"post",
        data
    })
}

//数据字典
export function getDict(data) {
    return request({
    url: `/agency/front/system/getDict?${data}`,
    method: "get"
    });
}
// 数据字典-列表
export function dictList(data){
    return request({
        url:"/admin/back/system/dict/list?"+data,
        method:"get"
    })
}
// 数据字典-删除
export function dictDel(data){
    return request({
        url:"/admin/back/system/dict/del/id",
        method:"post",
        data
    })
}
// 数据字典-父级列表
export function parentList(){
    return request({
        url:"/admin/back/system/dict/parent/list",
        method:"get"
    })
}
// 数据字典-新增
export function dictAdd(data){
    return request({
        url:"/admin/back/system/dict/add",
        method:"post",
        data
    })
}
// 数据字典-编辑
export function dictEdit(data){
    return request({
        url:"/admin/back/system/dict/edit",
        method:"post",
        data
    })
}
// 全域设置-查询
export function fullSettings(){
    return request({
        url:"/admin/back/system/full/settings",
        method:"get"
    })
}
// 全域设置-修改
export function fullUpdate(data){
    return request({
        url:"/admin/back/system/full/settings/update",
        method:"post",
        data
    })
}
// 全域设置-同步ES  
export function synchronous(){
    return request({
        url:"/agency/callAdmin/agenc1y/synchronous/data",
        method:"get"
    })
}