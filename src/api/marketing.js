import request from "@/utils/request.js";

// 显示所有广告投放信息(运营端)
export function queryAdminAdvert(data) {
  return request({
    url: `/agency/callAdmin/marketing/queryAdminAdvert?current=${data.current}&size=${data.size}`,
    method: "get"
  });
}
//显示对应广告申请详情
export function queryAdminAdvertById(id) {
  return request({
    url: `/agency/callAdmin/marketing/queryAdminAdvertById?advertId=${id}`,
    method: "get"
  });
}

//下架对应广告
export function removeAdminAdvertById(id) {
  return request({
    url: `/agency/callAdmin/marketing/removeAdminAdvertById?advertId=${id}`,
    method: "get"
  });
}

//新增广告计划投放信息
export function saveAdminAdvert(data) {
  return request({
    url: `/agency/callAdmin/marketing/saveAdminAdvert`,
    method: "post",
    data
  });
}
//验证投放时间是否冲突(运营端)
export function queryTimeArea(data){
  return request({
    url:"/agency/callAdmin/marketing/queryTimeArea?"+data,
    method:"get"
  })
}
//广告位置下拉框
export function querySubDict() {
  return request({
    url: `/agency/callAdmin/marketing/querySubDict`,
    method: "get"
  });
}
//  编辑广告素材(运营端)
export function advertTmage(data){
  return request({
    url:"/agency/callAdmin/marketing/edit/advert/image?"+data,
    method:"get"
  })
}

//查询热门课程
export function queryHotCourse(provinces, citys) {
  return request({
    url: `/agency/callAdmin/marketing/queryHotCourse?cityStr=${citys}&provinceStr=${provinces}`,
    method: "get"
  });
}

//移除/新增热门课程
export function setHotCourse(courseId, hotCode) {
  return request({
    url: `/agency/callAdmin/marketing/setHotCourse?courseId=${courseId}&hotCode=${hotCode}`,
    method: "get"
  });
}
//显示所有活动信息
export function queryAdminActivity(current, size) {
  return request({
    url: `/agency/callAdmin/marketing/queryAdminActivity?current=${current}&size=${size}`,
    method: "get"
  });
}
//新增活动
export function addAdminActivity(data) {
  return request({
    url: `/agency/callAdmin/marketing/addAdminActivity`,
    method: "post",
    data
  });
}
//查询已发布通知
export function queryAdminNotice(data) {
  return request({
    url: `/agency/callAdmin/marketing/queryAdminNotice?current=${data.current}&size=${data.size}`,
    method: "get",
  });
}

//新增/编辑->发布通知
export function setAdminNotice(data) {
  return request({
    url: `/agency/callAdmin/marketing/setAdminNotice`,
    method: "post",
    data
  });
}