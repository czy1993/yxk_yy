<template>
  <div id="content">
    <div class="logo-view">
      <img src="../../../static/img/icon/logo.png" alt />
      <p>易选课管理后台</p>
    </div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#2F3333"
      text-color="#8C8E90"
      active-text-color="#fff"
      :router="true"
      :unique-opened="true"
    >
      <sider-item v-for="item of menuList" :key="item.id" :item="item"></sider-item>
    </el-menu>
  </div>
</template>
<script>
import { treeList, queryUserMenu } from "@/api/menu.js";
import SiderItem from "./siderItem.vue";
import bus from "@/utils/bus";
export default {
  data() {
    return {
      routers: "",
      routerHistory: [],
      menuList: []
    };
  },
  components: {
    SiderItem
  },
  created() {
    bus.$on("initMenu", () => {
      this.save_treeList();
    });
    this.routers = this.$router.history._startLocation;
    this.save_treeList();
  },
  methods: {
    save_treeList() {
      queryUserMenu().then(res => {
        if (res.code == 200) {
          this.menuList = res.data;
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.routers = to.path;
    }
  }
};
</script>
<style  lang="scss">
@import "@/styles/mixin.scss";
#content {
  display: flex;
  flex-direction: column;
  height: 100%;
  .logo-view {
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding-top: 35px;
    // padding-bottom: 15px;
    p {
      line-height: 60px;
    }
  }
  .el-menu-vertical-demo {
    flex: 1;
    box-sizing: border-box;
    overflow-x: auto;
    // padding: 0 5px;
    // @include scroll-bar;
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        visibility: visible;
      }
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      // border-radius:2px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgb(140, 142, 144);
      border-radius: 10px;
      transition: all 0.3s;
      visibility: hidden;
    }
  }
}
</style>