<template>
  <div class="childViews">
    <div class="addNotice-telit">
      <span>{{name=='add'?'编辑机构':'新增机构'}}</span>
      <span class="buts but_c" @click="cancel()">返回</span>
    </div>
    <div class="addNotice-center">
      <div class="center-from">
        <div class="addMechanism">
          <div class="from-views">
            <div class="from-key">
              机构名称
              <span class="red">*</span>
            </div>
            <el-input class="name-value" ref="name" v-model="fromData.name" placeholder></el-input>
          </div>
          <div class="from-views">
            <div class="from-key">
                联系人
                <span class="red">*</span>
              </div>
              <input class="phone name-value" ref="contacts" v-model="fromData.contacts" placeholder />
          </div>
          <div class="from-views">
            <div class="from-key">
                手机号
                <span class="red">*</span>
              </div>
              <input
                v-if="name=='add'"
                :class="['phone',phoneRge==false?'redReg':'']"
                v-model="fromData.phone"
                maxlength="11"
                disabled
                type="text"
                ref="phone"
              />
              <input
                v-else
                :class="['phone',phoneRge==false?'redReg':'']"
                v-model="fromData.phone"
                maxlength="11"
                ref="phone"
                type="text"
              />
          </div>
          <div class="from-views">
              <div class="from-key">
                其他联系方式
                <span class="red">*</span>
              </div>
              <input class="phone" ref="contactWay" v-model="fromData.contactWay" placeholder />
          </div>

          <div class="from-views">
            <div class="from-key">
              上课地址
              <span class="red">*</span>
            </div>
            <el-select
              class="ssq"
              @change="provinceChange"
              v-model="fromData.province"
              placeholder="省"
              ref="province"
            >
              <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              class="ssq"
              @change="cityChange"
              ref="city"
              v-model="fromData.city"
              placeholder="市"
            >
              <el-option v-for="item in city" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select class="ssq" v-model="fromData.area" ref="area" placeholder="区/县">
              <el-option v-for="item in area" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-input class="address" v-model="fromData.address" ref="address" placeholder="详细地址"></el-input>
            <span @click="location" class="location">定位</span>
          </div>
          <div class="upload">
            <div class="from-views">
              <div class="from-key">
                {{name == 'add'?'营业执照':'上传营业执照'}}
                <span class="red">*</span>
              </div>
              <div class="files">
                <img
                  class="imgs"
                  v-show="license!='../../../static/img/icon/ico_uppic.png'"
                  :src="license"
                  @click="double(license)"
                  alt
                />
                <div class="file">
                  <img src="../../../../static/img/icon/ico_uppic.png" alt />
                  <input ref="license" @change="save_uploadSingle('license')" type="file" />
                </div>
              </div>
            </div>
            <div class="from-views">
              <div class="from-key">
                {{name == 'add'?'经营许可证':'上传经营许可证'}}
                <span class="red">*</span>
              </div>
              <div class="files">
                <img
                  class="imgs"
                  v-show="licence!='../../../static/img/icon/ico_uppic.png'"
                  @click="double(licence)"
                  :src="licence"
                  alt
                />
                <div class="file">
                  <img src="../../../../static/img/icon/ico_uppic.png" alt />
                  <input ref="licence" @change="save_uploadSingle('licence')" type="file" />
                </div>
              </div>
            </div>
            <div id="container"></div>
          </div>
          <div class="from-views">
            <div class="from-key">
              统一社会代码
              <span class="red">*</span>
            </div>
            <!-- <el-input class="UScode" v-model="fromData.creditCode" ref="creditCode" placeholder="请输入内容"></el-input> -->
            <input
              :class="['UScode','bank-info',creditCodeReg ==false?'redReg':'']"
              v-model="fromData.creditCode"
              ref="creditCode"
              placeholder="请输入15~18位社会信用代码"
              type="text"
            />
          </div>
          <!-- <div class="bankHeader">
            <p>支付信息</p>
          </div>
          <div class="from-views">
            <div class="from-views-child">
              <div class="from-key">
                账户所有人
                <span class="red">*</span>
              </div>
              <el-select
                class="bank-name"
                v-model="fromData.accountOwner"
                ref="accountOwner"
                placeholder="账户所有人"
              >
                <el-option
                  v-for="item in accountOwner"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="from-views-child">
              <div class="from-key">
                开户银行
                <span class="red">*</span>
              </div>
              <el-select
                class="bank-name"
                v-model="fromData.accountBank"
                ref="accountBank"
                placeholder="开户银行"
              >
                <el-option
                  v-for="item in accountBank"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="from-views">
            <div class="from-key">
              开户地区
              <span class="red">*</span>
            </div>
            <el-select
              class="bank-address"
              @change="bankProvinceChange"
              v-model="fromData.bankProvince"
              placeholder="省"
              ref="bankProvince"
            >
              <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              class="bank-address"
              v-model="fromData.bankCity"
              ref="bankCity"
              placeholder="市"
            >
              <el-option
                v-for="item in bankCity"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="from-views">
            <div class="from-key">
              开户支行
              <span class="red">*</span>
            </div>
            <input class="bank-info" v-model="fromData.bankSub" ref="bankSub" placeholder="开户支行" />
          </div>
          <div class="from-views">
            <div class="from-key">
              银行账号
              <span class="red">*</span>
            </div>
            <input
              :class="['bank-info',bankAccountRge ==false?'redReg':'']"
              v-model="fromData.bankAccount"
              placeholder="银行账号"
              ref="bankAccount"
            />
          </div>
          <div class="from-views">
            <div class="from-key">
              开户名称
              <span class="red">*</span>
            </div>
            <input
              class="bank-info"
              v-model="fromData.accountName"
              ref="accountName"
              placeholder="开户名称"
            />
          </div>-->
          <!-- <p class="til"> <span class="red">提示： *</span>所有选项必填</p> -->
          <div class="foots">
            <span class="buts buts_cancel" v-show="name=='addEdit'" @click="empty()">取消</span>
            <span class="buts buts_ok" @click="save_adminAdd()">完成</span>
          </div>
        </div>
      </div>
    </div>
    <LookImg v-if="show1" :url="url" @event1="show1=$event"></LookImg>
  </div>
</template>
<script>
import { adminAdd, adminEdit } from "@/api/callAdmin.js";
import { queryAllRegion, uploadSingle, queryDict } from "@/api/index.js";
import { city_list, country_list } from "@/utils/area.js";
import Utils from "@/utils/deep.js";
import LookImg from "@/components/lookImg.vue";
export default {
  components: {
    LookImg
  },
  props: {
    data: Object,
    name: String
  },
  data() {
    return {
      show1: false,
      url: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      fromData: {
        name: "",
        contacts: "",
        phone: "",
        contactWay: "",
        province: null,
        city: null,
        area: null,
        address: "",
        certificateList: [],
        creditCode: "",
        // accountOwner: "",
        // accountBank: "",
        // bankProvince: "",
        // bankCity: "",
        // bankSub: "",
        // bankAccount: "",
        // accountName: "",
        lat: "",
        lon: "",
        id: 0
      },
      fromDataName: {
        name: "机构名称",
        contacts: "联系人",
        phone: "手机号",
        contactWay: "其他联系方式",
        province: "上课地址(省)",
        city: "上课地址(市)",
        area: "上课地址(区)",
        address: "详细地址",
        certificateList: "营业执照或许可证",
        creditCode: "统一社会代码",
        // accountOwner: "账户所有人 ",
        // accountBank: "开户银行",
        // bankProvince: "开户地区(省)",
        // bankCity: "开户地区(市)",
        // bankSub: "开户支行",
        // bankAccount: "银行账号",
        // accountName: "开户名称",
        lat: "维度",
        lon: "经度",
        id: "id"
      },
      province: [],
      city: [],
      area: [],
      bankCity: [],
      licence: "../../../static/img/icon/ico_uppic.png",
      license: "../../../static/img/icon/ico_uppic.png",
      geocoder: "",
      accountBank: [],
      accountOwner: [],
      phoneRge: true,
      bankAccountRge: true,
      creditCodeReg: true
    };
  },
  created() {
    // console.log(this.data);
    if (this.name == "add") {
      this.fromData = this.data;
      this.license = this.data.certificateList[0]
        ? this.data.certificateList[0]
        : "../../../static/img/icon/ico_uppic.png";
      this.licence = this.data.certificateList[1]
        ? this.data.certificateList[1]
        : "../../../static/img/icon/ico_uppic.png";
        setTimeout( () =>{
          this.location();
        },500)
    }
    this.save_queryDict("accountBank");
    this.save_queryDict("accountOwner");
    this.save_queryAllRegion();
  },
  mounted() {
    this.initMap()
    if (this.name == "add") {
      // this.initMap();
      
      this.fromData.bankProvince = Number(this.data.bankProvince);
      this.fromData.bankCity = Number(this.data.bankCity);
      this.fromData.province = Number(this.data.province);
      this.fromData.city = Number(this.data.city);
      this.fromData.area = Number(this.data.area);
      // this.provinceChange(this.fromData.bankProvince);
    } else {
      // this.initMap();
    }
  },
  methods: {
    double(url) {
      this.url = url;
      this.show1 = true;
    },
    cancel() {
      this.$emit("event", false);
    },
    save_queryAllRegion() {
      queryAllRegion().then(res => {
        if (res.code == 200) {
          this.province = res.data;
          if (this.name == "add") {
            this.provinceChange(this.data.province);
            this.cityChange(this.data.city);
            this.bankProvinceChange(this.data.province);
          } else {
            this.city = res.data[0].child;
            this.bankCity = res.data[0].child;
            this.area = res.data[0].child[0].child;
          }
        }
      });
    },
    provinceChange(val) {
      this.province.forEach(element => {
        if (val == element.id) {
          this.city = element.child;
        }
      });
    },
    cityChange(val) {
      this.city.forEach(element => {
        if (val == element.id) {
          this.area = element.child;
        }
      });
    },
    bankProvinceChange(val) {
      this.province.forEach(element => {
        if (val == element.id) {
          this.bankCity = element.child;
        }
      });
    },
    save_queryDict(name) {
      queryDict(`?groupType=${name}`).then(res => {
        if (res.code == 200) {
          this[name] = res.data;
        }
      });
    },
    save_uploadSingle(name) {
      let dataFoles, files;
      let REG = /\\/g;
      dataFoles = this.$refs[name].files;
      if (dataFoles.length != 0) {
        files = dataFoles[0];
        let formData = new FormData();
        formData.append("file", files);
        uploadSingle(formData, "agency").then(res => {
          if (res.code == 200) {
            this[name] = Utils.getObjectURL(this.$refs[name].files[0]);
            this.fromData.certificateList.push(res.data.url);
          } else {
            this.$message.error("上传失败");
          }
        });
      }
    },
    //初始化地图
    initMap() {
      let marker;
      this.map = new AMap.Map("container", {
        zoom: 30, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      this.map.on("click", event => {
        let lnglat = event.lnglat;
        if (marker) {
          this.map.remove(marker);
        }
        marker = new AMap.Marker({
          position: lnglat,
          title: "我的机构"
        });
        this.map.add(marker);
        this.fromData.lon = lnglat.lng + "";
        this.fromData.lat = lnglat.lat + "";
        this.geocoder.getAddress(lnglat, (status, result) => {
          if (status === "complete" && result.info === "OK") {
            let address = result.regeocode.addressComponent;
            this.fromData.province = Number(
              address.adcode.slice(0, 2) + "0000"
            );
            this.provinceChange(address.adcode.slice(0, 2) + "0000");
            this.cityChange(address.adcode.slice(0, 4) + "00");
            // this.fromData.city = address.adcode.slice(0, 4) + "00";
            this.fromData.city = Number(address.adcode.slice(0, 4) + "00");

            this.fromData.area = Number(address.adcode);
            this.fromData.address =
              address.township +
              " " +
              address.street +
              " " +
              address.streetNumber;
          }
        });
      });

      AMap.plugin(["AMap.Geolocation", "AMap.Geocoder"], () => {
        //异步同时加载多个插件
        let geolocation = new AMap.Geolocation({
          timeout: 5000,
          zoomToAccuracy: true,
          buttonPosition: "RB"
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(
          geolocation,
          "complete",
          this.onMapGeolocationComplete
        );
        AMap.event.addListener(
          geolocation,
          "error",
          this.onMapGeolocationError
        );

        this.map.addControl(geolocation);

        this.geocoder = new AMap.Geocoder({});
      });
    },
    onMapGeolocationComplete(data) {
      // console.log(data)
      let address = data.addressComponent;
      if (this.name != "add") {
        this.fromData.province = Number(address.adcode.slice(0, 2) + "0000");
        // this.fromData.city = address.adcode.slice(0, 4) + "00";
        this.provinceChange(address.adcode.slice(0, 2) + "0000");
        this.cityChange(address.adcode.slice(0, 4) + "00");
        this.fromData.city = Number(address.adcode.slice(0, 4) + "00");
        this.fromData.area = Number(address.adcode);
        this.fromData.address =
          address.township + " " + address.street + " " + address.streetNumber;
        this.fromData.lon = data.position.lng + "";
        this.fromData.lat = data.position.lat + "";
      }
    },
    onMapGeolocationError(data) {
      this.$message.error("地图定位失败，请自行标注！");
    },
    //编码转换为地址
    transformLocal() {
      let city = city_list[this.fromData.city];
      let area = country_list[this.fromData.area];
      // console.log(city + area + this.fromData.address);
      return city + area + this.fromData.address;
    },
    location() {
      this.geocoder.getLocation(this.transformLocal(), (status, result) => {
        if (status === "complete" && result.info === "OK") {
          this.fromData.lon = result.geocodes[0].location.lng + "";
          this.fromData.lat = result.geocodes[0].location.lat + "";
          if (this.marker) {
            this.map.remove(this.marker);
          }
          this.marker = new AMap.Marker({
            position: result.geocodes[0].location,
            title: "我的机构"
          });
          this.map.add(this.marker);
          this.map.setFitView(this.marker);
        } else {
          this.$message.error({
            message: "定位失败，请稍后再试",
            duration: 2000
          });
        }
      });
    },
    save_adminAdd() {
      if (this.phoneRge == false) {
        this.$message.error("请填写正确的电话号码");
      } 
      // else if (this.bankAccountRge == false) {
      //   this.$message.error("请填写正确的银行卡号");
      // } 
      else {
        if (this.name == "add") {
          adminEdit(this.fromData).then(res => {
            this.resMessage(res);
          });
        } else {
          if (this.fromDataERR(this.fromData) != false) {
            adminAdd(this.fromData).then(res => {
              this.resMessage(res);
            });
          }
        }
      }
    },
    // from 验证
    fromDataERR(fromData) {
      let that = this;
      for (let key in fromData) {
        if (key != "id") {
          if (fromData[key] == "") {
            // console.log(key);
            let text = that.fromDataName[key];
            if (key == "certificateList") {
              if (this.license == "../../../static/img/icon/ico_uppic.png") {
                that.$message.error(`带 * 号必填，请上传营业执照`);
              } else if (
                this.licence == "../../../static/img/icon/ico_uppic.png"
              ) {
                that.$message.error(`带 * 号必填，请上传经验许可证`);
              }
            } else {
              that.$message.error(`带 * 号必填，请填写${text}`);
            }
            return false;
            break;
          }
        }
      }
    },
    resMessage(res) {
      if (res.code == 200) {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.cancel();
      } else {
        this.$message.error(res.message);
      }
    },
    empty() {
      let data = Utils.deepCopy(this.fromData);
      for (let key in data) {
        data[key] = "";
      }
      this.fromData = data;
    }
  },
  watch: {
    "fromData.phone": {
      deep: true,
      handler: function(newV, oldV) {
        if (newV !== "" && /^[1][3,4,5,7,8,9][0-9]{9}$/.test(newV) == false) {
          /^(\d{16}|\d{19})$/;
          this.phoneRge = false;
        } else {
          this.phoneRge = true;
        }
      }
    },
    "fromData.bankAccount": {
      deep: true,
      handler: function(newV, oldV) {
        if (newV !== "" && /^(\d{16}|\d{19})$/.test(newV) == false) {
          this.bankAccountRge = false;
        } else {
          this.bankAccountRge = true;
        }
      }
    },
    "fromData.creditCode": {
      deep: true,
      handler: function(newV, oldV) {
        // console.log(newV)
        if (
          newV !== "" &&
          /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/.test(
            newV
          ) == false
        ) {
          this.creditCodeReg = false;
        } else {
          this.creditCodeReg = true;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.addMechanism {
  width: 1000px;
  margin: 0 auto;
  .from-views {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: left;
    font-size: 15px;
    margin-bottom: 15px;
    .location {
      margin-left: 10px;
      color: rgba(0, 174, 120, 1);
      cursor: pointer;
    }
    .from-key {
      min-width: 120px;
      width: auto;
      padding: 0 7px;
      line-height: 36px;
    }
    .from-views-child {
      display: flex;
      align-content: center;
      justify-content: left;
    }
    .name-value {
      width: 500px;
    }
    .phone {
      width: 500px;
      height: 40px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      padding: 0 10px;
      border-radius: 5px;
    }
    .phone:focus {
      border: 1px solid rgb(68, 160, 254) !important;
      outline: 0;
    }
    .ssq {
      width: 130px;
      margin-right: 15px;
    }
    .address {
      width: 200px;
      min-width: 260px;
    }
    // .redReg {
    //   border: 1px solid red !important;
    // }
    .redReg:focus {
      border: 1px solid red !important;
    }
    .files {
      height: 90px;
      // width: 90px;
      // border: 1px solid #e9e9e9;

      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      // position: relative;
      // z-index: 1;
      .file {
        height: 90px;
        width: 90px;
        position: relative;
        img {
          height: 90px;
          width: 90px;
        }
        input {
          position: absolute;
          left: 0;
          top: 0;
          height: 90px;
          width: 90px;
          opacity: 0;
          z-index: 1;
        }
      }
      .imgs {
        height: 90px;
        width: 90px;
        // border: 1px solid #e9e9e9;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
    .UScode {
      width: 400px;
    }
    .bank-name {
      width: 180px;
    }
    .bank-address {
      width: 160px;
      margin-right: 20px;
    }
    .bank-info {
      width: 360px;
      height: 40px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      padding: 0 10px;
      border-radius: 5px;
    }
    .bank-info:focus {
      border: 1px solid rgb(68, 160, 254) !important;
      outline: 0;
    }
    .redReg:focus {
      border: 1px solid red !important;
    }
  }
  .upload {
    width: 600px;
    margin-left: -15px;
    min-height: 260px;
    border: 1px solid RGBA(232, 232, 232, 1);
    margin-bottom: 15px;
    box-sizing: border-box;
    padding: 15px 10px;
    position: relative;
    .from-key {
      width: 130px;
    }
    #container {
      position: absolute;
      top: 0;
      left: 610px;
      height: 300px;
      width: 360px;
      border: 1px solid RGBA(232, 232, 232, 1);
    }
  }
  .bankHeader {
    height: 80px;
    display: flex;
    align-items: center;
    p {
      line-height: 50px;
      font-size: 18px;
      color: rgba(0, 174, 120, 1);
      padding-left: 10px;
    }
  }
  .foots {
    padding-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>