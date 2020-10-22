<template>
  <div class="menuCenter">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="上级ID" prop="parentId">
        <el-input v-model="ruleForm.parentId"  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="路由URL" prop="url">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>
       <el-form-item label="后台地址" prop="href">
        <el-input v-model="ruleForm.href"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="img">
        <el-input v-model="ruleForm.img">
          <template slot="append">
            <el-popover placement="top" title="图标" width="600" trigger="click">
              <div class="iconList">
                <ul>
                  <li
                    :style="{border:mark===index?'1px solid':'none'}"
                    @click="selectIcon(item.class,index)"
                    v-for="(item,index) of iconList"
                    :key="index"
                  >
                    <i :class="`fa fa-${item.class}`"></i>
                  </li>
                </ul>
              </div>
              <img
                style="cursor:pointer"
                slot="reference"
                src="../../../../static/img/icon/upload.png"
                alt
              >
            </el-popover>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <!-- <el-input class="sort" v-model="ruleForm.sort">
          <template slot="prepend">
            <img src="../../../../static/img/icon/ico_jian.png" alt>
          </template>
          <template slot="append">
            <img src="../../../../static/img/icon/ico_add.png" alt>
          </template>
        </el-input>-->
        <el-input-number step-strictly v-model="ruleForm.sort" :min="1" :step="1" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input type="textarea" v-model="ruleForm.describe"></el-input>
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio v-model="ruleForm.component" label="1">系统组件</el-radio>
        <el-radio v-model="ruleForm.component" label="2">跳转网址</el-radio>
      </el-form-item>

      <el-form-item>
        <el-radio v-model="ruleForm.menutype" label="1">菜单</el-radio>
        <el-radio v-model="ruleForm.menutype" label="2">按钮</el-radio>
      </el-form-item>

      <!-- <el-form-item>
        <el-radio v-model="ruleForm.menuSystemType" label="1">运营端</el-radio>
        <el-radio v-model="ruleForm.menuSystemType" label="2">教学端</el-radio>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { menuAdd, menuEdit } from "@/api/system";
import bus from "@/utils/bus";
export default {
  props: ["id", "type", "pId", "nodeData",'menuType'],
  data() {
    return {
      ruleForm: {
        url: "",
        img: "",
        sort: 0,
        describe: "",
        code: "",
        component: "1",
        menuSystemType: "1",
        parentId: "",
        title: "",
        menutype: "1",
        href:''
      },
      rules: {
        parentId: [
          {
            required: true, //是否必填
            message: "上级ID不能为空", //规则提示
            trigger: "blur" //何事件触发
          }
        ],
        title: [
          {
            required: true,
            message: "请填写菜单名称",
            trigger: "blur"
          }
        ],
        // url: [{ required: true, message: "请填写路由", trigger: "blur" }],
        img: [{ required: true, message: "请选择图片", trigger: "blur" }],
        sort: [{ required: true, message: "请选择排序方式", trigger: "blur" }],
        describe: [{ required: true, message: "请填写描述", trigger: "blur" }],
        code: [{ required: false, message: "请填写编码", trigger: "blur" }]
      },
      iconList: [
        {
          class: "user-o"
        },
        {
          class: "line-chart"
        },
        {
          class: "cog"
        },
        {
          class: "cogs"
        },
        {
          class: "gift"
        },
        {
          class: "mortar-board "
        },
        {
          class: "navicon"
        },
        {
          class: "television"
        },
        {
          class: "trash"
        },
        {
          class: "bar-chart"
        },
        {
          class: "bell-o"
        },
        {
          class: "edit"
        },
        {
          class: "envelope-o"
        },
        {
          class: "university"
        },
        {
          class: "users"
        },
        {
          class: "pie-chart"
        },
        {
          class: "rmb"
        },
        {
          class: "dollar"
        },
        {
          class: "money"
        },
        {
          class: "telegram"
        },
        {
          class: "globe"
        },
        {
          class: "eye"
        },
        {
          class: "database"
        },
        {
          class: "address-book"
        },
        {
          class: "paper-plane-o"
        },
        {
          class: "bookmark-o"
        },
        {
          class: "home"
        },
        {
          class: "credit-card"
        },
        {
          class: "tags"
        }
      ],
      mark: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.type === "1") {
            menuAdd({
              component: this.ruleForm.component,
              description: this.ruleForm.describe,
              frontUrl: this.ruleForm.url,
              icon: this.ruleForm.img,
              menuSystemType: this.menuType,
              parentId: this.ruleForm.parentId,
              permission: this.ruleForm.code,
              sort: this.ruleForm.sort,
              title: this.ruleForm.title,
              type: this.ruleForm.menutype,
              href:this.ruleForm.href
            }).then(res => {
              if (res.code === 200) {
                this.$message.success({
                  message: "菜单添加成功！",
                  duration: 1000,
                  onClose: () => {
                    this.resetForm("ruleForm");
                    this.$emit("init");
                    bus.$emit("initMenu");
                  }
                });
              }
            });
          } else if (this.type === "2") {
            menuEdit({
              component: this.ruleForm.component,
              description: this.ruleForm.describe,
              frontUrl: this.ruleForm.url,
              icon: this.ruleForm.img,
              menuSystemType: this.menuType,
              id: this.id,
              permission: this.ruleForm.code,
              sort: this.ruleForm.sort,
              title: this.ruleForm.title,
              parentId: this.ruleForm.parentId,
              type:  this.ruleForm.menutype,
               href:this.ruleForm.href
            }).then(res => {
              if (res.code === 200) {
                this.$message.success({
                  message: "菜单修改成功！",
                  duration: 1000,
                  onClose: () => {
                    this.resetForm("ruleForm");
                    this.$emit("init");
                    bus.$emit("initMenu");
                  }
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    selectIcon(c_name, index) {
      this.mark = index;
      this.ruleForm.img = `<i class="fa fa-${c_name}"></i>`;
    }
  },
  watch: {
    type() {
      this.resetForm("ruleForm");
    },
    nodeData(val) {
      if (this.type === "2") {
        this.ruleForm.parentId = val.parentId;
        this.ruleForm.title = val.title;
        this.ruleForm.url = val.frontUrl;
        this.ruleForm.img = val.icon;
        this.ruleForm.sort = val.sort;
        this.ruleForm.describe = val.description;
        this.ruleForm.code = val.permission;
        this.ruleForm.component = val.component;
        this.ruleForm.menuSystemType = val.menuSystemType;
         this.ruleForm.menutype=val.type;
          this.ruleForm.href=val.href
      } else if (this.type === "1") {
        this.ruleForm.parentId = val.id;
      }
    },
    menuType(){
       this.resetForm("ruleForm");
    }
  }
};
</script>
<style lang="scss" >
.menuCenter {
  .el-form-item {
    .el-form-item__label:before {
      color: #00a896 !important;
    }
  }
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: "*";
    color: #00a896 !important;
    margin-right: 4px;
  }
  .el-button--primary {
    background: #00ae78;
    border-color: #00ae78;
  }
  .sort {
    width: 200px;
  }
}
</style>