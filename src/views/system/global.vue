<template>
  <div id="global" class="view-center">
    <div class="right-bus">
      <!-- <span class="buts but_c">关闭菜单</span> -->
    </div>
    <div class="main-view">
      <div class="global-view">
        <div class="global-from">
          <div class="global-from-div">
            <div class="global-from-view" v-for="item in fullList" :key="item.id">
              <span class="global-from-div-span">{{item.label}}</span>
              <el-input v-model="item.confValue" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="global-from-but">
            <span class="buts buts_ok" @click="save_fullUpdate">修改</span>
            <span class="buts buts_cancel" @click="save_synchronous">同步ES</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fullSettings, fullUpdate, synchronous } from "@/api/user.js";
export default {
  data() {
    return {
      fullList: []
    };
  },
  created() {
    this.save_fullSettings();
  },
  methods: {
    save_fullSettings() {
      fullSettings().then(res => {
        if (res.code == 200) {
          this.fullList = res.data;
        }
      });
    },
    save_fullUpdate() {
      fullUpdate(this.fullList).then(res => {
        if (res.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
            onClose:()=>{
              this.save_fullSettings();
            }
          });
        }else{
          this.$message.error(res.message);
        }
      });
    },
    save_synchronous() {
      synchronous().then(res => {
        if (res.code == 200) {
          this.$message({
            message: "同步成功",
            type: "success"
          });
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>
<style lang="scss" >
@import "@/styles/mixin.scss";
#global {
  position: relative;
  .main-view {
    display: flex;
    flex-direction: column;
    height: auto;
    background: #f7f7f7;
    .global-view {
      flex: 1;
      height: auto;
      background: #ffffff;
      min-height: 300px;
      width: 100%;
      box-sizing: border-box;
      padding: 40px;
      overflow: auto;
      @include scroll-bar;
      .global-from {
        width: 1200px;
        min-width: 500px;
        margin: 0 auto;
        .global-from-div {
          width: 1200px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .global-from-view {
            width: 400px;
            display: flex;
            align-items: center;
            height: 70px;
            .global-from-div-span {
              font-size: 15px;
              width: 150px;
              text-align: right;
              margin-right: 10px;
            }
          }
        }
        .global-from-but {
          height: 140px;
          text-align: center;
          line-height: 140px;
        }
      }
    }
  }
}
</style>