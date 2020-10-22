<template>
  <div class="addNotice childViews">
    <div class="addNotice-telit">
      <span>{{name}}</span>
      <span class="buts but_c" @click="cancel()">返回</span>
    </div>
    <div class="addNotice-center">
      <div class="center-from">
        <div class="from-view">
          <div class="from-li">
            <span class="from-name">通知标题</span>
            <div class="from-value">
              <el-input v-model="title" placeholder></el-input>
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">通知范围</span>
            <div class="from-value">
              <el-select class="selects" v-model="province" placeholder="省">
                <el-option
                  v-for="item in province_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select class="selects" v-model="city" placeholder="市">
                <el-option
                  v-for="item in city_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">投放渠道</span>
            <div style="min-width:220px" class="from-value">
              <el-select class="selectqd" v-model="launchChannel" multiple  placeholder="选择渠道">
                <el-option
                  v-for="item in channel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- <el-input v-model="launchChannel" placeholder></el-input> -->
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">通知内容</span>
            <div class="from-value">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                v-model="content"
                placeholder
              ></el-input>
            </div>
          </div>
          <div class="from-buts">
            <span class="buts buts_cancel" @click="cancel()">取消</span>
            <span @click="submit" class="buts buts_ok">提交</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { province_list, city_list } from "@/utils/area";
import { mapActions } from "vuex";
export default {
  props: {
    name: String,
    type: String,
    id: [String, Number],
    data: Object
  },
  data() {
    return {
      title: "",
      province: "",
      city: "",
      launchChannel: "",
      content: "",
      province_list: "",
      rules: {
        title: "标题不能为空",
        province: "请选择通知省份",
        launchChannel: "投放渠道不能为空",
        content: "通知内容不能为空"
      },
      channel:[
        {
          label:"运营平台",
          value:"运营平台"
        },{
          label:"客户端",
          value:"客户端"
        },{
          label:"机构端",
          value:"机构端"
        }
      ]
      
    };
  },
  computed: {
    city_list() {
      let arr = [];
      for (let city of Object.keys(city_list)) {
        if (this.province.slice(0, 2) === city.slice(0, 2)) {
          arr.push({
            label: city_list[city],
            value: city
          });
        }
      }
      return arr;
    }
  },
  created() {
    this.initArea();
    this.initData();
  },
  methods: {
    ...mapActions(["setAdminNotice"]),
    cancel() {
      this.$emit("event", false);
    },
    initArea() {
      this.province_list = Object.keys(province_list).reduce((acc, cur) => {
        acc.push({
          label: province_list[cur],
          value: cur
        });

        return acc;
      }, []);
    },
    validate() {
      for (let rule of Object.keys(this.rules)) {
        if (!this.$data[rule]) {
          this.$message.error({
            message: this.rules[rule],
            duration: 1000
          });
          return false;
        }
      }
      return true;
    },
    submit() {
      if (this.validate()) {
        this.setAdminNotice({
          area: this.province + "," + this.city,
          content: this.content,
          id: this.type === "2" ? this.id : null,
          launchChannel: this.launchChannel.join(),
          title: this.title
        }).then(res => {
          if (res.code === 200) {
            this.$message.success({
              message: this.type === "2" ? "编辑成功！" : "新增成功！",
              duration: 1000,
              onClose: () => {
                this.cancel();
              }
            });
          }
        });
      }
    },
    initData() {
      if (JSON.stringify(this.data) !== "{}") {
        this.title = this.data.title;
        this.launchChannel = this.data.launchChannel;
        this.content = this.data.content;
        this.province = this.data.area.split(',')[0];
        this.city = this.data.area.split(',')[1]
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>