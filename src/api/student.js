import request from '@/utils/request.js'

//查询学员信息
export function queryCourseStudentVO(data){
    return request({
        url:"/agency/callAdmin/Student/queryCourseStudentVO"+data,
        method:"get",
    })
}
// 学员课程详情
export function queryStudentCourse(data){
    return request({
        url:"/agency/callAdmin/Student/queryStudentCourse"+data,
        method:"get"
    })
}
// 课程考勤详情
export function queryCourseStatus(data){
    return request({
        url:"/agency/callAdmin/Student/queryCourseStatus"+data,
        method:"get"
    })
}
// 相关评价
export function queryEvaluatess(data){
    return request({
        url:"/agency/callAdmin/Student/queryEvaluatess"+data,
        method:"get"
    })
}
//  查询学员相关评价
export function memberComment(data){
    return request({
        url:"/agency/callAdmin/teacher/memberComment",
        method:"post",
        data
    })
}