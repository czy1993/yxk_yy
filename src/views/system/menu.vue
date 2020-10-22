<template>
  <div id="menu" class="view-center">
    <div class="right-bus">
      <!-- <span class="buts but_c">返回</span> -->
    </div>
    <div class="main-view">
      <div class="left main-view-div">
        <!-- <el-input v-model="name" placeholder="名称"></el-input> -->
        <div class="left-buts">
          <span v-if="menuType==='2'" @click="menuType='1'">切换至运营端菜单</span>
          <span v-if="menuType==='1'" @click="menuType='2'">切换至教育端菜单</span>
          <span :class="butsIndex=='1'?'span_active':''" @click="butsIndex='1'">新增</span>
          <span :class="butsIndex=='2'?'span_active':''" @click="butsIndex='2'">修改</span>
          <span :class="butsIndex=='3'?'span_active':''" @click="clearNode">删除</span>
        </div>
        <div class="_tree">
          <el-tree
            :expand-on-click-node="false"
            check-on-click-node
            highlight-current
            @node-click="nodeClick"
            :check-strictly="true"
            :data="menuList"
            default-expand-all
            node-key="id"
            ref="tree"
            :props="{label:'title'}"
          ></el-tree>
        </div>
      </div>
      <div class="center main-view-div">
        <div class="center-til">{{menuEdit[butsIndex]}}</div>
        <menuCenter
          :nodeData="nodeData"
          :pId="parentId"
          :type="butsIndex"
          @init="save_treeList"
          :id="id"
          :menuType="menuType"
        ></menuCenter>
      </div>
      <!-- <div class="right main-view-div">
        <menuRight></menuRight>
      </div>-->
    </div>
  </div>
</template>
<script>
import { treeList } from "@/api/menu.js";
import menuCenter from "./components/menu-center";
import menuRight from "./components/menu-right";
import { menuDelete } from "@/api/system";
export default {
  data() {
    return {
      name: "",
      butsIndex: "1",
      menuList: [],
      menuEdit: {
        "1": "新增",
        "2": "修改"
      },
      id: "",
      parentId: "",
      nodeData: "",
      menuType: "1"
    };
  },
  components: {
    menuCenter,
    menuRight
  },
  created() {
    this.save_treeList();
  },
  methods: {
    save_treeList() {
      treeList(this.menuType).then(res => {
        if (res.code == 200) {
          this.menuList = res.data;
          //   this.menuList = this.saveArr(res.data)
        }
      });
    },
    nodeClick(obj, node) {
      this.id = obj.id;
      this.parentId = obj.parentId;
      this.nodeData = obj;
    },
    clearNode() {
      if (!this.id) {
        return this.$message.error({
          message: "请选择想要删除的菜单",
          duration: 1000
        });
      }

      this.$confirm("此操作将永久删除该菜单, 是否继续?", "易选课", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          menuDelete({
            id: this.id,
            menuSystemType: this.menuType
          }).then(res => {
            if (res.code === 200) {
              this.$message.success({
                message: "菜单删除成功！",
                duration: 1000,
                onClose: () => {
                  this.save_treeList();
                }
              });
            }
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    }
  },
  watch: {
    menuType() {
      this.save_treeList();
    }
  }
};
</script>
<style lang="scss" >
@import "@/styles/mixin.scss";
#menu {
  .main-view {
    display: flex;
    box-sizing: border-box;
    padding-bottom: 30px;
    background: #f7f7f7;
    .left {
      width: 450px;
      min-width: 450px;
      display: flex;
      flex-direction:column;
    }
    .center {
      width: 800px;
      margin: 0 10px;

      .center-til {
        line-height: 50px;
        border-bottom: 1px solid #eceef1;
        margin-bottom: 25px;
        margin-left: -20px;
        padding-left: 20px;
      }
    }
   .center.main-view-div {
      overflow: auto;
      @include scroll-bar;
    }
    .right {
      flex: 1;
      height: auto;
    }
    .main-view-div {
      box-sizing: border-box;
      border: 1px solid #eceef1;
      padding: 25px 20px;
      border-radius: 3px;
      background: #fff;
    }
    ._tree {
      overflow: auto;
      flex: 1;
       @include scroll-bar;
    }
  }
}
</style>
