import request from '@/utils/request.js'
// 区域信息接口
export function queryRegion(data){
    return request({
        url:"/admin/back/common/queryRegion",
        method:"post",
        data
    })
}
//增加员工前,查询该用户拥有的查看信息权限和区域id
export function queryAllRegion(){
    return request({
        url:"/admin/back/common/queryAllRegion",
        method:"get",
    })
}
// 单文件上传
export function uploadSingle(data,urls){
    return request({
        url:"/admin/back/common/uploadSingle/"+urls,
        method:"post",
        headers: {
            'Content-Type':' application/x-www-form-urlencoded;charset=utf-8 '
        },
        data
    })
}
// 查询数据字典
export function queryDict(data){
    return request({
        url:"/admin/back/common/queryDict"+data,
        method:"get"
    })
}
// 
// 增加员工前,查询当前用户拥有的查看信息权限和区域id
export function searchRegion(){
    return request({
        url:"/admin/back/user/searchRegion",
        method:"get"
    })
}
