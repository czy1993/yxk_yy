import request from "@/utils/request.js";

//查询系统设置(运营端)
export function findSystemAbout() {
  return request({
    url: `/admin/back/user/findSystemAbout`,
    method: "get"
  });
}

//修改员工菜单前,查询该用户或创建者拥有的菜单列表和拥有的信息查看区域id
export function searchUserMenu(data) {
  return request({
    url: `/admin/back/user/searchUserMenu${data}`,
    method: "get"
  });
}
//修改员工权限,包括区域权限和菜单权限
export function updateUserMenu(data) {
  return request({
    url: `/admin/back/user/updateUserMenu`,
    method: "post",
    data
  });
}

//新增菜单
export function menuAdd(data) {
  return request({
    url: `/admin/back/menu/menuAdd`,
    method: "post",
    data
  });
}
//编辑菜单
export function menuEdit(data) {
  return request({
    url: `/admin/back/menu/menuEdit`,
    method: "post",
    data
  });
}
//删除菜单
export function menuDelete(data) {
  return request({
    url: `/admin/back/menu/menuDelete/${data.id}/${data.menuSystemType}`,
    method: "get",
  });
}