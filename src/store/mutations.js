export default {
  SAVE_ADVERTISE(state, list) {
    state.advertiseList = list;
  },
  SAVE_RECOMMEND(state, list) {
    state.recommendList = list;
  },
  SAVE_ACTIVITY(state, list) {
    state.activityList = list;
  },
  SAVE_NOTICE(state, list) {
    state.noticeList = list;
  },
  SAVE_ABOUTLIST(state, list) {
    state.aboutList = list;
  },
  SAVE_PERMISSION(state, list) {
    state.permissionList = list;
  },
  SAVE_AGENCYID(state,list){
    state.agencyId = list
  },
  SAVE_MARKETING(state,data){
    state.marketing = data
  } 
};
