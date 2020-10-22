<template>
  <div id="changePass" class="fromViews">
    <div class="center-form">
      <div class="logo">
        <img class="logo-logo" src="../../../static/img/from/logo.png" alt />
        <img class="logo-text" src="../../../static/img/from/text.png" alt />
      </div>
      <div class="from-content">
        <div @click="toBakc()" class="toBakc">
          <img src="../../../static/img/icon/back.png" alt />
        </div>
        <div class="form-group login-form-item">
          <input
            required="required"
            class="form-control"
            ref="user"
            autocomplete="off"
            v-model="phone"
          />
          <label :class="['form-label',, userReg===true?'red':'' ]">手机号/邮箱</label>
        </div>
        <div class="form-group login-form-item">
          <input
            type="password"
            required="required"
            class="form-control"
            v-model="pass"
            autocomplete="new-password"
          />
          <label :class="['form-label',, codeReg===true?'red':'' ]">密码 6-16位 数字或字母</label>
        </div>
        <div class="form-group login-form-item">
          <input
            type="password"
            required="required"
            class="form-control"
            v-model="newPass"
            autocomplete="new-password"
          />
          <label :class="['form-label',, passReg===true?'red':'' ]">设置新密码</label>
        </div>
        <div class="form-group login-form-item last-form-group">
          <input
            type="password"
            required="required"
            class="form-control"
            v-model="newPassII"
            autocomplete="new-password"
            @keyup.enter="save_updatePass"
          />
          <label :class="['form-label',, passIIReg===true?'red':'' ]">再次输入新密码</label>
        </div>

        <div class="login-form-btn" @click="save_updatePass()">确认</div>
      </div>
    </div>
  </div>
</template>
<script>
import { updatePass } from "@/api/user.js";
import { removeToken } from '@/utils/auth.js'
export default {
  data() {
    return {
      phone: "",
      pass: "",
      newPass: "",
      newPassII: "",

      userReg: false,
      codeReg: false,
      passReg: false,
      passIIReg: false,
      paramsId:'',
    };
  },
  created(){
    this.paramsId = this.$route.params.id
  },
  methods: {
    toBakc() {
      let text = this.paramsId=='1'?'':'首次登陆需修改密码哦！';
      this.$confirm(`你确定不修改密码吗？${text}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          
          if(this.paramsId=='1'){
            this.$router.go(-1)
          }else{
            removeToken();
            this.$router.push({path:"/login"})
          }
        })
        .catch(() => {});
    },
    save_updatePass() {
      const passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
      if (
        this.phone == "" ||
        this.pass == "" ||
        this.newPass == "" ||
        this.newPassII == ""
      ) {
        this.$message.error("请输入完整信息再行操作");
      } else if (this.newPassII != this.newPass) {
        this.$message.error("两次新密码输入不一致");
      } else if (!passreg.test(this.newPass)) {
        this.$message.error("新密码必须为8-16 数字加大小写字母");
      } else {
        updatePass({
          oldPass: this.$md5(this.pass),
          newPass: this.$md5(this.newPass),
          code: "",
          id: "",
          username: this.phone
        }).then(res => {
          if (res.code == 200) {
            this.$message({
              message: "修改成功,请重新登录",
              type: "success",
              onClose: () => {
                removeToken()
                this.$router.push({ name: "login" });
              }
            });
          } else {
            this.$message.error(res.message);
          }
        });
      }
    }
  },
  watch: {
    phone(value) {
      const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      const emailreg = new RegExp(
        "^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$"
      );
      if (!myreg.test(value) && !emailreg.test(value) && value != "") {
        this.userReg = true;
      } else {
        this.userReg = false;
      }
    },
    newPass(value) {
      const passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
      if (!passreg.test(value) && value != "") {
        this.passReg = true;
      } else {
        this.passReg = false;
      }
    },
    newPassII(value) {
      if (value != this.newPass) {
        this.confirmPassword = "两次密码输入保持一致";
        this.passIIReg = true;
      } else {
        this.passIIReg = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>