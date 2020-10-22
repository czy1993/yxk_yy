<template>
  <div class="addActivity childViews">
    <div class="addNotice-telit">
      <span>发布新活动</span>
      <span class="buts but_c" @click="cancel()">返回</span>
    </div>
    <div class="addNotice-center">
      <div class="center-from">
        <div class="from-view">
          <div class="from-li">
            <span class="from-name">标题</span>
            <div class="from-value">
              <el-input class="selectqd" v-model="title" placeholder></el-input>
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">活动介绍</span>
            <div class="from-value">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10}"
                v-model="introduce"
                placeholder
              ></el-input>
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">活动时间</span>
            <div class="from-value">
              <!-- <el-date-picker class="selects" v-model="value1" type="date" placeholder="日期"></el-date-picker>
              <el-time-picker
                class="selects"
                v-model="value2"
                :picker-options="{selectableRange: '18:30:00 - 20:30:00' }"
                placeholder="时间"
              ></el-time-picker>-->
              <el-date-picker
                v-model="dateArr"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">活动奖励</span>
            <div class="from-value">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10}"
                v-model="award"
                placeholder
              ></el-input>
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">特别说明</span>
            <div class="from-value">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10}"
                v-model="content"
                placeholder
              ></el-input>
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">参与方式</span>
            <div class="from-value">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10}"
                v-model="participateMethod"
                placeholder
              ></el-input>
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">活动玩法</span>
            <div class="from-value">
              <div id="_edit"></div>
            </div>
          </div>

          <div class="from-buts">
            <span class="buts buts_cancel" @click="cancel()">取消</span>
            <span class="buts buts_ok" @click="publish">发布</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { baseUrl } from "@/utils/env";
import { mapActions, mapState } from "vuex";
const Editor = require("wangeditor");
import { getToken, getAccountInfo } from "@/utils/auth";
export default {
  data() {
    return {
      title: "",
      introduce: "",
      award: "",
      content: "",
      dateArr: [],
      editor: "",
      image: "",
      playMethod: "",
      participateMethod: "",
      uploadUrl: "",
      upLoadheader: "",
      rules: [
        {
          title: "标题不能为空"
        },
        {
          introduce: "介绍不能为空"
        },
        {
          dateArr: "请输入活动时间"
        },
        {
          award: "奖励不能为空"
        },
        {
          participateMethod: "参与方式不能为空"
        },
        {
          playMethod: "活动玩法不能为空"
        },
        {
          image: "请在活动玩法中上传图片"
        }
      ]
    };
  },
  created() {
    this.initUploadUrl();
  },
  mounted() {
    this.initEditor();
    console.log(this.$data);
  },
  methods: {
    ...mapActions(["addAdminActivity"]),
    cancel() {
      this.$emit("event", false);
      this.award ='';
      this.content='';
      this.dateArr='';
      this.image='';
      this.introduce='';
      this.participateMethod='';
      this.playMethod='';
      this.title='';
      this.editor.txt.clear();
      // this.initEditor()
    },
    initUploadUrl() {
      console.log(baseUrl)
      this.uploadUrl = baseUrl + "/admin/back/common/uploadSingle/agenc1y";
    },
    initEditor() {
      this.editor = new Editor("#_edit");
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "image",
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "table", // 表格
        "undo", // 撤销
        "redo" // 重复
      ];
      this.editor.customConfig.uploadImgServer = this.uploadUrl;
      this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;
      this.editor.customConfig.uploadImgMaxLength = 1;
      this.editor.customConfig.uploadFileName = "file";
      this.editor.customConfig.uploadImgHeaders = {
        token: getToken()
      };
      this.editor.customConfig.uploadImgTimeout = 5000;
      this.editor.customConfig.uploadImgHooks = {
        success:(xhr, editor, result)=> {
          console.log(result);
          this.image = result.data.url;
          console.log(this.image)
        },
        fail: function(xhr, editor, result) {
          console.log(result)
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function(xhr, editor) {
          this.$message.error({
            message: "图片上传出错，请稍后再试！",
            duration: 2000
          });
        },
        customInsert: function(insertImg, result, editor) {
          let url = result.data.host + result.data.url;
          insertImg(url);
        },
        timeout: function(xhr, editor) {
          this.$message.error({
            message: "图片上传超时",
            duration: 2000
          });
        }
      };
      this.editor.create();
    },
    publish() {
      this.playMethod = this.editor.txt.text()|| '.';
      // console.log(this.editor.txt,this.image,this.playMethod);
      if (this.validate()) {
        this.addAdminActivity({
          award: this.award,
          content: this.content,
          endTime: this.dateArr[1],
          image: this.image,
          introduce: this.introduce,
          participateMethod:this.participateMethod,
          playMethod: this.playMethod,
          startTime: this.dateArr[0],
          title: this.title
        }).then(res => {
          if (res.code === 200) {
            this.$message.success({
              message: "新增成功！",
              duration: 1000,
              onClose: () => {
                this.cancel();
              }
            });
          }
        });
      }
    },
    validate() {
      for (let item of this.rules) {
        if (Object.keys(item)[0] == "dateArr") {
          if (this.dateArr.length < 2) {
            this.$message.error({
              message: "请输入活动时间",
              duration: 1500
            });
            return false;
          }
        }
        if (!this.$data[Object.keys(item)[0]]) {
          this.$message.error({
            message: Object.values(item)[0],
            duration: 1500
          });
          return false;
        }
      }
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.addActivity {
  overflow: auto;
  @include scroll-bar;
}
</style>

