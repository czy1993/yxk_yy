import router from "./router";
import store from "./store";
import { getToken } from "@/utils/auth";

router.beforeEach((to, from, next) => {
  //已登录
  if (getToken()) {
    if (to.path === "/login") {
      next({...from});
      next();
    } else {
      next();
    }
  } else {
    if (to.name == "login" || to.name == "forgetPass" || to.name == 'changePass' ) {
      next();
    } else {
      next("/login");
    }
  }
  // store.commit("SAVE_TITLE", to.meta.title);
});

router.afterEach((to, from) => {});


