<template>
  <div id="login" class="fromViews">
    <div class="center-form">
      <div class="logo">
        <img class="logo-logo" src="../../../static/img/from/logo.png" alt />
        <img class="logo-text" src="../../../static/img/from/text.png" alt />
      </div>
      <div class="from-content">
        <div class="form-group login-form-item">
          <input
            required="required"
            class="form-control"
            ref="user"
            autocomplete="off"
            v-model="username"
          />
          <label :class="['form-label',userReg==true?'red':'']">手机号/邮箱</label>
        </div>
        <div class="form-group login-form-item">
          <input
            type="password"
            required="required"
            class="form-control"
            v-model="password"
            autocomplete="new-password"
            @keyup.enter="save_login"
          />
          <label :class="['form-label',passReg==true?'red':'']">密码 6-16位 数字或字母</label>
        </div>
        <div class="text-right">
          <div @click="rememberPass()">
            <span class="icon">
              <i v-if="remember=='yes'" class="el-icon-check"></i>
            </span>
            <span class="text">记住密码</span>
          </div>
          <router-link to="/forgetPass">忘记密码</router-link>
        </div>
        <div class="login-form-btn" @click="save_login()">登录</div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/user.js";
import {
  getToken,
  setToken,
  removeToken,
  setAccountInfo,
  getAccountInfo,
  setRemember,
  getRemember,
  setPassword,
  removePassword,
} from "@/utils/auth.js";
export default {
  data() {
    return {
      remember: "no",
      username: "",
      password: "",
      userReg: false,
      passReg: false,
    };
  },

  created() {
    if (window.localStorage.getItem("token")) {
      this.$router.push({
        path: "/home",
      });
    }
    if (this.getCookie("rememberPassword")) {
      this.remember = this.getCookie("rememberPassword");
      this.judgeRememberPassword(this.remember);
    }
  },
  methods: {
    save_login() {
      let pass;
      if (this.remember == "yes" && this.password == "******") {
        pass = this.getCookie("password");
      } else {
        pass = this.$md5(this.password);
      }
      login({
        password: pass,
        username: this.username,
      }).then((res) => {
        if (res.code == 200) {
          if (res.data.firstLogin == false) {
            this.$message({
              message: "登录成功,首次登陆请先修改密码",
              type: "success",
              onClose: () => {
                setToken(res.data.token);
                window.localStorage.setItem("token", res.data.token);
                setAccountInfo(res.data);
                this.$router.push({
                  path: "/changePass/2",
                });
              },
            });
          } else {
            setToken(res.data.token);
            window.localStorage.setItem("token", res.data.token);
            setAccountInfo(res.data);
            if (this.remember == "yes") {
              this.setCookie("username", this.username);
              this.setCookie("password", this.$md5(this.password));
              this.setCookie("rememberPassword", this.remember);
            } else {
              this.setCookie("password", "");
            }
            this.$router.push({
              name: "home",
            });
            // this.$message({
            //   message: "登录成功",
            //   type: "success",
            //   duration:500,
            //   onClose: () => {
            //     setToken(res.data.token);
            //     window.localStorage.setItem("token", res.data.token);
            //     setAccountInfo(res.data);
            //     if (this.remember == "yes") {
            //       this.setCookie("username", this.username);
            //       this.setCookie("password", this.$md5(this.password));
            //       this.setCookie("rememberPassword", this.remember);
            //     } else {
            //       this.setCookie("password", "");
            //     }
            //     this.$router.push({
            //       name: "home"
            //     });
            //   }
            // });
          }
        }else{
          // this.$message.error(res.message);
        }
      });
    },
    onCloses() {},
    rememberPass() {
      this.remember = this.remember == "no" ? "yes" : "no";
      this.setCookie("rememberPassword", this.remember);
      // this.judgeRememberPassword(this.remember)
    },
    // 判断是都在记住密码状态
    judgeRememberPassword(type) {
      if (type == "yes") {
        this.password = "******";
        this.username = this.getCookie("username");
      } else {
        // this.username = '';
        // this.password = '';
      }
    },
    //设置cookie
    setCookie(name, value) {
      let Days = 30;
      let exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    //读取cookie
    getCookie(name) {
      let arr;
      let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    },
  },
  watch: {
    username(value) {
      const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      const emailreg = new RegExp(
        "^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$"
      );
      if (!myreg.test(value) && !emailreg.test(value) && value != "") {
        if (value == "admin") {
          this.userReg = false;
        } else {
          this.userReg = true;
        }
      } else {
        this.userReg = false;
      }
    },
    password(value) {
      // const passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
      const passreg = /^[0-9A-Za-z]{6,16}$/;
      if (!passreg.test(value) && value != "") {
        this.passReg = true;
      } else if (value == "123456") {
        this.passReg = false;
      } else {
        this.passReg = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#login {
  .red {
    color: red;
  }
}
</style>