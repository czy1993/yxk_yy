<template>
  <div class="header">
    <div class="notice">
      <img @click="query(1,10)" src="../../../static/img/icon/message.png" alt />
      <div class="carousel" @click="$router.push('/notice')">
        <el-carousel v-show="show" height="50px" direction="vertical" indicator-position="none">
          <el-carousel-item v-for="(item,index) in noticeList" :key="index">
            <p>{{item.content}}</p>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="admin">
      <span>{{admin}}</span>
      <img src="../../../static/img/icon/ico_down.png" alt />
      <div class="loginOut">
        <div @click="save_removeToken">退出</div>
        <div @click="$router.push({path:'/changePass/1'})">修改密码</div>
      </div>
    </div>
  </div>
</template>
<script>
import { removeToken, getAccountInfo } from "@/utils/auth.js";
import { mapActions, mapState } from "vuex";
import { queryAdminNotice } from "@/api/marketing.js";
export default {
  data() {
    return {
      noticeList: [],
      admin: "",
      show: true
    };
  },
  created() {
    this.admin = getAccountInfo().username;
    this.query(1, 10);
  },
  methods: {
    ...mapActions(["queryAdminNotice"]),
    save_removeToken() {
      removeToken();
      this.$message({
        message: "退出成功",
        type: "success",
        onClose: () => {
          this.$router.push("/login");
        },
      });
    },
    query(page, size) {
      this.queryAdminNotice({
        current: page,
        size: size,
      }).then((res) => {
        // console.log(res)
        if (res.data.total > 0) {
          this.noticeList = res.data.records;
          this.show = true;
        } else {
          this.show = false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  .admin {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    // cursor: pointer;
    width: 150px;

    span {
      padding: 0 10px;
    }
    .loginOut {
      display: none;
      position: absolute;
      top: 50px;
      width: 150px;
      text-align: center;
      background: #b1ecd5;
      color: #fff;
      z-index: 10;
      opacity: 0.8;
      div {
        opacity: 0.9;
        &:hover {
          background: #16c899;
        }
      }
    }
    &:hover {
      background: #b1ecd5;

      .loginOut {
        display: block;
        cursor: pointer;
      }
    }
  }
  .notice {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 40%;
    height: 50px;
    img {
      cursor: pointer;
    }
    .carousel {
      height: 50px;
      flex: 1;
      padding-left: 10px;
    }
    .el-carousel__item p {
      font-size: 14px;
      opacity: 0.75;
      line-height: 50px;
      margin: 0;
      cursor: pointer;
    }
  }
}
</style>