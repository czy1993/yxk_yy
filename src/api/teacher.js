import request from '@/utils/request.js'

// 教师管理,查询老师
export function teacherList(data){
    return request({
        url:"/agency/callAdmin/teacher/teacherList",
        method:"post",
        data
    })
}
// 教师考勤
export function searchAttendance(data){
    return request({
        url:"/agency/callAdmin/teacher/searchAttendance"+data,
        method:"get"
    })
}
// 查询教师评价
export function searchComment(data){
    return request({
        url:"/agency/callAdmin/teacher/searchComment",
        method:"post",
        data
    })
}
// 查询机构所拥有层级
export function searchLevel(data){
    return request({
        url:"/agency/callAdmin/teacher/searchLevel/"+data,
        method:"get",
    })
}