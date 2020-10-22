import Vue from "vue";
import Router from "vue-router";
import Layout from "@/Layout";
Vue.use(Router)
export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      component: Layout,
      // redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/home"),
          meta: {
            title: "首页"
          }
          
        },
        {
          path: "/system",
          name: "system",
          component: () => import("@/views/system"),
          meta: {
            title: "权限管理"
          }
        },
        {
          path: "/role-manage",
          name: "role-manage",
          component: () => import("@/views/system/roleManage"),
          meta: {
            title: "角色管理"
          }
        },
        // {
        //   path: "/jurisdiction",
        //   name: "jurisdiction",
        //   component: () => import("@/views/system/jurisdiction"),
        //   meta: {
        //     title: "权限管理"
        //   }
        // },
        {
          path: "/about",
          name: "about",
          component: () => import("@/views/system/about"),
          meta: {
            title: "关于易选课"
          }
        },
        {
          path: "/dictionaries",
          name: "dictionaries",
          component: () => import("@/views/system/dictionaries"),
          meta: {
            title: "字典管理"
          }
        },
        {
          path: "/global",
          name: "global",
          component: () => import("@/views/system/global"),
          meta: {
            title: "全域管理"
          }
        },
        {
          path: "/menu",
          name: "menu",
          component: () => import("@/views/system/menu"),
          meta: {
            title: "菜单管理"
          }
        },
        {
          path: "/marketing",
          name: "marketing",
          component: () => import("@/views/marketing"),
          meta: {
            title: "广告管理"
          }
        },
        {
          path: "/advertisement",
          name: "advertisement",
          component: () => import("@/views/marketing/advertisement"),
          meta: {
            title: "新增广告"
          }
        },
        {
          path: "/recommend",
          name: "recommend",
          component: () => import("@/views/marketing/recommend"),
          meta: {
            title: "推荐管理"
          }
        },
        {
          path: "/activity",
          name: "activity",
          component: () => import("@/views/marketing/activity"),
          meta: {
            title: "活动管理"
          }
        },
        {
          path: "/notice",
          name: "notice",
          component: () => import("@/views/marketing/notice"),
          meta: {
            title: "通知管理"
          }
        },
        {
          path: "/data",
          name: "data",
          component: () => import("@/views/data"),
          meta: {
            title: "数据管理"
          }
        },
        {
          path: "/find",
          name: "find",
          component: () => import("@/views/find"),
          meta: {
            title: "发现管理"
          }
        },
        {
          path: "/capital",
          name: "capital",
          component: () => import("@/views/capital"),
          meta: {
            title: "订单管理"
          },
        },{
          path:'/transaction',
          name:"transaction",
          component: () => import("@/views/capital/transaction"),
          meta:{
            title:"交易信息"
          }
        },{
          path: '/student',
          name: 'student',
          component: () => import("@/views/student"),
          meta: {
            title: "学员管理"
          }
        },
        {
          path: "/mechanism",
          name: "mechanism",
          component: () => import("@/views/mechanism"),
          meta: {
            title: "机构管理"
          },
          children:[
            
          ]
        },{
          path: "/payment",
          name: "payment",
          component: () => import("@/views/mechanism/payment"),
          meta: {
            title: "支付管理"
          },
        },{
          path:'/teacher/:id',
          name:"teacher",
          component: () => import("@/views/teacher"),
          meta:{
            title:'教师管理'
          }
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/from/login"),
      meta: {
        title: "登录"
      }
    },
    {
      path: "/changePass/:id",
      name: "changePass",
      component: () => import("@/views/from/changePass"),
      meta: {
        title: "修改密码"
      }
    },
    {
      path: "/forgetPass",
      name: "forgetPass",
      component: () => import("@/views/from/forgetPass"),
      meta: {
        title: "忘记密码"
      }
    }
  ]
});
