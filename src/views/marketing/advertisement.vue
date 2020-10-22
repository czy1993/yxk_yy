<template>
  <div class="view-center">
    <div class="right-bus">
      <span class="buts but_c" @click="$router.push('/marketing')">返回</span>
    </div>
    <div class="main-view">
      <div class="formView">
        <div class="form-div form-first-div">
          <div class="form-div-v">
            <span class="names">标题</span>
            <el-input class="inputs" v-model="title" placeholder="请输入内容"></el-input>
          </div>
          <div class="form-div-v">
            <!-- <span class="names">科目</span>
            <el-select class="inputs" v-model="subject" placeholder="请选择">
              <el-option
                v-for="item in subjectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </div>
        </div>
        <div class="form-div">
          <span class="names">广告位置</span>
          <el-select multiple class="selects" v-model="pageAreas" placeholder="请选择">
            <el-option
              v-for="(item,index) in advertiseList"
              :key="index"
              :label="item.page"
              :value="item.page"
            ></el-option>
          </el-select>
        </div>
        <div class="form-div">
          <span class="names">投放范围</span>
          <el-select class="selectFW" v-model="province" placeholder="省">
            <el-option
              v-for="item in province_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="city" placeholder="市">
            <el-option
              v-for="item in city_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="form-div">
          <span class="names">开始时间</span>
          <!-- <el-date-picker class="inputs" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          <el-time-picker
            class="inputTime"
            v-model="value2"
            :picker-options="{selectableRange: '18:30:00 - 20:30:00'}"
            placeholder="任意时间点"
          ></el-time-picker>-->
          <el-date-picker
            v-model="launchStartTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
        <div class="form-div">
          <span class="names">结束时间</span>
          <!-- <el-date-picker class="inputs" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          <el-time-picker
            class="inputTime"
            v-model="value2"
            :picker-options="{selectableRange: '18:30:00 - 20:30:00'}"
            placeholder="任意时间点"
          ></el-time-picker>-->
          <el-date-picker
            v-model="launchStopTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
        <div class="form-div">
          <span class="names">展现量</span>
          <el-input
            @change="change"
            type="Number"
            class="selectFW"
            :min="2"
            v-model="showNumStr"
            placeholder="需为大于1的数"
          ></el-input>
        </div>
        <div class="form-div">
          <span class="names">金额</span>
          <el-input type="Number" class="selectFW" min="0" v-model="practicalPrice" placeholder></el-input>
        </div>
        <div class="form-div" v-show="urlShow">
          <span class="names">URL</span>
          <el-input type="text" class="selectFW" v-model="url" placeholder></el-input>
        </div>
        <div class="formView-foot">
          <span @click="$router.push('/marketing')" class="buts buts_cancel">取消</span>
          <span @click="onSubmit" class="buts buts_ok">提交</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { province_list, city_list } from "@/utils/area";
import { mapActions } from "vuex";
import { queryTimeArea } from "@/api/marketing.js";
export default {
  data() {
    return {
      title: "",
      launchStartTime: "",
      launchStopTime: "",
      pageAreas: "",
      showNumStr: "",
      practicalPrice: "",
      url: "",
      launchCourseId: "",
      subjectList: [],
      province_list: "",
      province: "",
      city: "",
      subject: "",
      advertiseList: [],
      rules: {
        title: "标题不能为空",
        pageAreas: "请选择广告位置",
        province: "请选择投放省份",
        launchStartTime: "请输入广告投放的开始时间",
        launchStopTime: "请输入广告投放的结束时间",
        showNumStr: "请输入展现量",
        practicalPrice: "金额不能为空",
      },
      data: "",
      urlShow: true,
      outTime: true,
    };
  },
  computed: {
   
    city_list() {
      let arr = [];
      for (let city of Object.keys(city_list)) {
        if (this.province.slice(0, 2) === city.slice(0, 2)) {
          arr.push({
            label: city_list[city],
            value: city,
          });
        }
      }
      // console.log(arr[0])
      if (arr.length > 0) {
        this.city = arr[0].value;
      }
      return arr;
    },
  },
  created() {
    this.initArea();
    // this.initSubject();
    this.initAdvertise();
    this.initData();
  },
  methods: {
    ...mapActions(["saveAdminAdvert", "getDictSubject", "querySubDict"]),
    onSubmit() {
      if (this.outTime == true) {
       
        if (this.validate()) {
          let data = {
            province: this.province,
            city: this.city,
            launchStartTime: this.launchStartTime,
            launchStopTime: this.launchStopTime,
            pageAreas: this.pageAreas.toString(),
            practicalPrice: this.practicalPrice,
            showNumStr: this.showNumStr,
            title: this.title,
            url: this.url,
          };
          if (this.$route.query.status === "4") {
            Object.assign(data, {
              id: this.data.id,
              launchCourseId: this.data.launchCourseId,
            });
          }
          this.saveAdminAdvert(data).then((res) => {
             this.outTime = false;
           
            this.$message.success({
              message:
                this.$route.query.status === "4" ? "编辑成功！" : "新增成功！",
              duration: 1000,
              onClose: () => {
                this.$router.push("/marketing");
              },
            });
             setTimeout(() => {
              this.outTime = true;
            }, 4000);
          });
        }
      }
    },
    save_queryTimeArea() {
      let data = `city=${this.city}&province=${this.province}&launchStartTime=${
        this.launchStartTime
      }&launchStopTime=${
        this.launchStopTime
      }&pageAreas=${this.pageAreas.toString()}`;
      queryTimeArea(data).then((res) => {
        if (res.code == 200) {
          this.onSubmit();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    initData() {
      if (this.$route.query.status === "4") {
        this.data = JSON.parse(this.$route.query.data);
        this.title = this.data.title;
        this.launchStartTime = this.data.launchStartTime;
        this.launchStopTime = this.data.launchStopTime;
        this.pageAreas =
          this.data.pageAreas == null
            ? ""
            : this.data.pageAreas.split(",") || "";
        this.showNumStr = this.data.showNumStr;
        this.practicalPrice = this.data.practicalPrice;
        this.launchCourseId = this.data.launchCourseId;
        this.url = this.data.url;
        this.urlShow = this.data.launchCourseId ? false : true;
        // console.log(Number(this.data.province.split(',')[0]) )
        this.province = this.data.province.split(',')[0]
        this.city = this.data.city.split(',')[0]
      }

    },
    initArea() {
      this.province_list = Object.keys(province_list).reduce((acc, cur) => {
        acc.push({
          label: province_list[cur],
          value: cur,
        });
        return acc;
      }, []);
    },
    initSubject() {
      this.getDictSubject().then((res) => {
        if (res.code === 200) {
          this.subjectList = res.data;
        }
      });
    },
    initAdvertise() {
      this.querySubDict().then((res) => {
        if (res.code === 200) {
          this.advertiseList = res.data;
        }
      });
    },
    validate() {
      for (let rule of Object.keys(this.rules)) {
        if (!this.$data[rule]) {
          this.$message.error({
            message: this.rules[rule],
            duration: 1000,
          });
          return false;
        }
      }
      return true;
    },
    change(num) {
      if (num < 2) {
        this.showNumStr = 2;
      }
    },
  },
  watch: {
    practicalPrice(value) {
      value < 0 ? (this.practicalPrice = 0) : this.practicalPrice;
    },
  },
};
</script>
<style lang="scss" scoped>
.formView {
  width: 600px;
  padding-top: 50px;
  // border: 1px solid # ;
  margin: 0 auto;
  .form-div {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    .names {
      display: block;
      width: 70px;
      text-align-last: justify;
      text-align: justify;
      margin-right: 10px;
    }
    .inputs {
      width: 150px;
    }
    .inputTime {
      width: 120px;
      margin-left: 20px;
    }
    .selects {
      width: 520px;
    }
    .selectFW {
      width: 250px;
      margin-right: 20px;
    }
  }
  .form-first-div {
    justify-content: space-between;
    .form-div-v {
      display: flex;
      align-items: center;
      .names {
        display: block;
        width: 70px;
        text-align-last: justify;
        text-align: justify;
        margin-right: 10px;
      }
    }
  }
  .formView-foot {
    padding-top: 50px;
    display: flex;
    justify-content: center;
  }
}
</style>