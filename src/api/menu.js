import request from '@/utils/request.js'
// 菜单查询管理
export function treeList(id){
    return request({
        url:`/admin/back/menu/treeList?menuSystemType=${id}`,
        method:"get"
    })
}

// 查询用户菜单
export function queryUserMenu(id){
    return request({
        url:`/admin/back/menu/queryUserMenu`,
        method:"get"
    })
}