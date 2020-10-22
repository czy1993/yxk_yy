import request from '@/utils/request.js'
//查看订单管理
export function manageOrders(data){
    return request({
        url:"/agency/callAdmin/Order/manageOrders"+data,
        method:"get"
    })
}
// 查看订单操作记录(运营端)
export function queryOrderOperation(data){
    return request({
        url:"/agency/callAdmin/Order/queryOrderOperation"+data,
        method:"get"
    })
}
// 交易信息(运营端)
export function allPayInfo(data){
    return request({
        url:"/agency/callAdmin/Order/allPayInfo"+data,
        method:"get"
    })
}
// 搜索交易信息 /agency/callAdmin/Order/searchPayInfo
export function searchPayInfo(data){
    return request({
        url:"/agency/callAdmin/Order/searchPayInfo"+data,
        method:"get"
    })
}