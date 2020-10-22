import {
  queryAdminAdvert,
  queryAdminAdvertById,
  removeAdminAdvertById,
  queryHotCourse,
  setHotCourse,
  queryAdminActivity,
  addAdminActivity,
  queryAdminNotice,
  setAdminNotice,
  saveAdminAdvert,
  querySubDict,
} from "@/api/marketing";
import { getDict } from "@/api/user";
import { findSystemAbout,  searchUserMenu,updateUserMenu } from "@/api/system";
export default {
  //显示所有广告投放信息
  queryAdminAdvert({ commit }, data) {
    return new Promise((reslove, reject) => {
      queryAdminAdvert(data).then(res => {
        if (res.code === 200) {
          commit("SAVE_ADVERTISE", res.data.records);
          reslove(res);
        }
      });
    });
  },
  //显示对应广告申请详情
  queryAdminAdvertById({ commit }, id) {
    return new Promise((reslove, reject) => {
      queryAdminAdvertById(id).then(res => {
        if (res.code === 200) {
          reslove(res);
        }
      });
    });
  },

  //下架对应广告
  removeAdminAdvertById({ commit }, id) {
    return new Promise((reslove, reject) => {
      removeAdminAdvertById(id).then(res => {
        if (res.code === 200) {
          reslove(res);
        }
      });
    });
  },
  //新增广告计划投放信息
  saveAdminAdvert({ commit }, id) {
    return new Promise((reslove, reject) => {
      saveAdminAdvert(id).then(res => {
        if (res.code === 200) {
          reslove(res);
        }
      });
    });
  },
  //广告位置下拉框
  querySubDict() {
    return new Promise((reslove, reject) => {
      querySubDict().then(res => {
        if (res.code === 200) {
          reslove(res);
        }
      });
    });
  },
  //查询热门课程
  queryHotCourse({ commit }, data) {
    return new Promise((reslove, reject) => {
      queryHotCourse(data.province, data.city).then(res => {
        if (res.code === 200) {
          commit("SAVE_RECOMMEND", res.data);
          reslove(res);
        }
      });
    });
  },
  ////移除/新增热门课程
  setHotCourse({ commit }, data) {
    return new Promise((reslove, reject) => {
      setHotCourse(data.courseId, data.hotCode).then(res => {
        if (res.code === 200) {
          reslove(res);
        }
      });
    });
  },
  //显示所有活动信息
  queryAdminActivity({ commit }, data) {
    return new Promise((reslove, reject) => {
      queryAdminActivity(data.current, data.size).then(res => {
        if (res.code === 200) {
          commit("SAVE_ACTIVITY", res.data.records);
          reslove(res);
        }
      });
    });
  },
  ////新增活动
  addAdminActivity({ commit }, data) {
    return new Promise((reslove, reject) => {
      addAdminActivity(data).then(res => {
        if (res.code === 200) {
          reslove(res);
        }
      });
    });
  },
  //查询已发布通知
  queryAdminNotice({ commit }, data) {
    return new Promise((reslove, reject) => {
      queryAdminNotice(data).then(res => {
        if (res.code === 200) {
          commit("SAVE_NOTICE", res.data.records);
          reslove(res);
        }
      });
    });
  },
  ////新增/编辑->发布通知
  setAdminNotice({ commit }, data) {
    return new Promise((reslove, reject) => {
      setAdminNotice(data).then(res => {
        if (res.code === 200) {
          reslove(res);
        }
      });
    });
  },
  //查询科目
  getDictSubject({ commit }) {
    return new Promise(resolve => {
      getDict(`groupType=subject`).then(res => {
        commit("SAVE_SUBJECT", res.data);
        resolve(res);
      });
    });
  },
  ////查询系统设置(运营端)
  findSystemAbout({ commit }) {
    return new Promise(resolve => {
      findSystemAbout().then(res => {
        commit("SAVE_ABOUTLIST", res.data);
        resolve(res);
      });
    });
  },

  //修改员工菜单前,查询该用户或创建者拥有的菜单列表和拥有的信息查看区域id
  searchUserMenu({ commit }, data) {
    return new Promise(resolve => {
      searchUserMenu(data).then(res => {
        commit("SAVE_PERMISSION", res.data);
        resolve(res);
      });
    });
  },

  ////修改员工权限,包括区域权限和菜单权限
  updateUserMenu({ commit }, data) {
    return new Promise(resolve => {
      updateUserMenu(data).then(res => {
        resolve(res);
      });
    });
  }

};
