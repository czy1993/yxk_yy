import request from '@/utils/request.js'

//首页数据
export function homeData(data){
    return request({
        url:"/agency/callAdmin/statistics/home/data"+data,
        method:"get"
    })
}
// 昨日数据 /agency/callAdmin/statistics/yesterday/data
export function yesterdayData(data){
    return request({
        url:"/agency/callAdmin/statistics/yesterday/data?"+data,
        method:"get"
    })
}

// 机构发展情况
export function development(data){
    return request({
        url:"/agency/callAdmin/statistics/agenc1y/development?"+data,
        method:"get"
    })
}

// 财务数据 
export function financeData(data){
    return request({
        url:"/agency/callAdmin/statistics/finance/data?"+data,
        method:"get"
    })
}


// 平台运营数据
export function operations(){
    return request({
        url:"/agency/callAdmin/statistics/platform/operations",
        method:"get"
    })
}
//广告投放情况
export function putting(data){
    return request({
        url:"/agency/callAdmin/statistics/advert/putting?"+data,
        method:"get"
    })
}
