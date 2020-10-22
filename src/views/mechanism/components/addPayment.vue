<template>
  <div class="childViews">
    <div class="addNotice-telit">
      <span>{{name=='新增'?'新增支付信息':'详情'}}</span>
      <span class="buts but_c" @click="cancel()">返回</span>
    </div>
    <div class="addNotice-center">
      <div class="center-from">
        <div class="addMechanism">
          <div class="from-view">
            <div class="from-name">
              <span class="red">*</span>
              <span class="name">账号</span>
            </div>
            <div class="from-value">
              <el-input v-model="fromData.mainAccount" placeholder="请输入内容"></el-input>
              <p class="Tips" v-show="false">{{`请填写${fromDataVk.mainAccount}`}}</p>
            </div>
          </div>
          <div class="from-viewII">
            <div class="from-view">
              <div class="from-name">
                <span class="red">*</span>
                <span class="name">姓名</span>
              </div>
              <div class="from-value">
                <el-input v-model="fromData.legalName" placeholder="请输入内容"></el-input>
                <p class="Tips" v-show="false">{{`请填写${fromDataVk.legalName}`}}</p>
              </div>
            </div>
            <div class="from-view">
              <div class="from-name">
                <span class="red">*</span>
                <span class="name">身份证号</span>
              </div>
              <div class="from-value">
                <el-input v-model="fromData.identityNo" maxlength="18" placeholder="请输入内容"></el-input>
                <p class="Tips" v-show="identityNo">{{`请填写正确身份证号码(18位)`}}</p>
              </div>
            </div>
          </div>
          <!-- **************身份证************** -->
          <div class="image-view idCard-view">
            <div class="idCard">
              <img :src="name=='新增'?identityNoFrontImg:fromData.identityNoFrontImg" alt />
              <input
                @change="save_uploadSingle('identityNoFrontImg')"
                ref="identityNoFrontImg"
                type="file"
              />
            </div>
            <div class="idCard">
              <img :src="name=='新增'?identityNoReverseImg:fromData.identityNoReverseImg" alt />
              <input
                @change="save_uploadSingle('identityNoReverseImg')"
                ref="identityNoReverseImg"
                type="file"
              />
            </div>
          </div>
          <!-- **************************** -->
          <div class="from-view">
            <div class="from-name">
              <span class="red">*</span>
              <span class="name">身份证有效期</span>
            </div>
            <div class="from-value">
              <el-date-picker
                v-model="datePicker"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
              <p class="Tips" v-show="false">{{`请填写${fromDataVk.mainAccount}`}}</p>
            </div>
          </div>
          <div class="from-viewII">
            <div class="from-view">
              <div class="from-name">
                <span class="red">*</span>
                <span class="name">联系电话</span>
              </div>
              <div class="from-value">
                <el-input v-model="fromData.phoneNo" maxlength="11" placeholder="请输入内容"></el-input>
                <p class="Tips" v-show="phoneRge">{{`请填写正确格式的电话号码`}}</p>
              </div>
            </div>
            <div class="from-view">
              <div class="from-name">
                <span class="red">*</span>
                <span class="name">企业名称</span>
              </div>
              <div class="from-value">
                <el-input v-model="fromData.companyName" placeholder="请输入内容"></el-input>
                <p class="Tips" v-show="false">{{`请填写${fromDataVk.companyName}`}}</p>
              </div>
            </div>
          </div>
          <div class="from-view">
            <div class="from-name">
              <span class="red">*</span>
              <span class="name">统一社会信用代码</span>
            </div>
            <div class="from-value">
              <el-input v-model="fromData.creditCode" maxlength="18" placeholder="请输入内容"></el-input>
              <p class="Tips" v-show="creditCodeReg">{{`请填写正确格式的统一社会信用代码(15或18位)`}}</p>
            </div>
          </div>
          <div class="from-view">
            <div class="from-name">
              <span class="red">*</span>
              <span class="name">企业地址</span>
            </div>
            <div class="from-value">
              <el-input v-model="fromData.companyAddress" placeholder="请输入内容"></el-input>
              <p class="Tips" v-show="false">{{`请填写${fromDataVk.companyAddress}`}}</p>
            </div>
          </div>
          <div class="from-view">
            <div class="from-name">
              <span class="red">*</span>
              <span class="name">营业执照有效期</span>
            </div>
            <div class="from-value">
              <el-date-picker
                v-model="fromData.businessLicenseValidTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>

              <!-- <el-input v-model="fromData.businessLicenseValidTime" placeholder="请输入内容"></el-input> -->

              <p class="Tips" v-show="false">{{`请填写${fromDataVk.businessLicenseValidTime}`}}</p>
            </div>
          </div>
          <!-- **************企业营业执照************** -->
          <div class="image-view">
            <div class="image-name">
              <span class="red"></span>
              <span class="name">上传营业执照</span>
            </div>
            <div class="image-value">
              <div>
                <img :src="name=='新增'?businessLicenseImg:fromData.businessLicenseImg" alt />
                <!-- <input type="file" /> -->
              </div>
              <div>
                <img src="../../../../static/img/icon/ico_uppic.png" alt />
                <input
                  type="file"
                  @change="save_uploadSingle('businessLicenseImg')"
                  ref="businessLicenseImg"
                />
              </div>
            </div>
          </div>
          <!-- **************************** -->
          <div class="from-view">
            <div class="from-name">
              <span class="red">*</span>
              <span class="name">开户许可证编码</span>
            </div>
            <div class="from-value">
              <el-input v-model="fromData.businessPermit" placeholder="请输入内容"></el-input>
              <p class="Tips" v-show="false">{{`请填写${fromDataVk.businessPermit}`}}</p>
            </div>
          </div>
          <!-- **************许可证************** -->
          <div class="image-view">
            <div class="image-name">
              <span class="red"></span>
              <span class="name">上传开户许可证</span>
            </div>
            <div class="image-value">
              <div>
                <img :src="name=='新增'?businessPermitImg:fromData.businessPermitImg" alt />
              </div>
              <div>
                <img src="../../../../static/img/icon/ico_uppic.png" alt />
                <input
                  type="file"
                  @change="save_uploadSingle('businessPermitImg')"
                  ref="businessPermitImg"
                />
              </div>
            </div>
          </div>
          <!-- **************************** -->
          <div class="from-view">
            <div class="from-name">
              <span class="red">*</span>
              <span class="name">账户卡号</span>
            </div>
            <div class="from-value">
              <el-input v-model="fromData.bankNo" maxlength="30" placeholder="请输入内容"></el-input>
              <p class="Tips" v-show="bankAccountRge">{{`请填写银行卡号(8~30位)`}}</p>
            </div>
          </div>
          <div class="from-viewII">
            <div class="from-view">
              <div class="from-name">
                <span class="red">*</span>
                <span class="name">开户银行</span>
              </div>
              <div class="from-value">
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
                <p class="Tips" v-show="false">{{`请填写${fromDataVk.accountBank}`}}</p>
              </div>
            </div>
            <div class="from-view">
              <div class="from-name">
                <span class="red">*</span>
                <span class="name">开户支行</span>
              </div>
              <div class="from-value">
                <el-input v-model="fromData.bankBranchName" placeholder="请输入内容"></el-input>
                <p class="Tips" v-show="false">{{`请填写${fromDataVk.bankBranchName}`}}</p>
              </div>
            </div>
          </div>
          <div class="from-view">
            <div class="from-name">
              <span class="red">*</span>
              <span class="name">绑定手机号</span>
            </div>
            <div class="from-value">
              <el-input v-model="fromData.bankBindPhone" maxlength="19" placeholder="请输入内容"></el-input>
              <p class="Tips" v-show="bankBindPhoneRge">{{`请填写正确格式的手机号`}}</p>
            </div>
          </div>
        </div>
        <div class="from-view from-title" >
          <p>营业执照图片 * 4, + 身份证正面 + 开户许可证图片,一共不能超过  <span class="red">2M</span> </p>
        </div>
      </div>
      <div class="foots">
        <span class="buts buts_cancel" v-if="name=='新增'" @click="empty">取消</span>
        <span class="buts buts_ok" @click="Submit">{{name=='新增'?'完成':"编辑"}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { payAdd, payEdit } from "@/api/callAdmin.js";
import { queryAllRegion, uploadSingle, queryDict } from "@/api/index.js";
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
      identityNoFrontImg: "../../../../static/img/from/positive.png",
      identityNoReverseImg: "../../../../static/img/from/Reverse-side.png",
      businessLicenseImg: "../../../../static/img/icon/pic_yyzz.png",
      businessPermitImg: "../../../../static/img/icon/pic_yyzz.png",
      identityNoFrontImg_edit: "",
      identityNoReverseImg_edit: "",
      businessLicenseImg_edit: "",
      businessPermitImg_edit: "",
      datePicker: [],
      fromData: {
        mainAccount: "",
        legalName: "",
        identityNo: "",
        identityNoFrontImg: "",
        identityNoReverseImg: "",
        identityBegin: "",
        identityEnd: "",
        phoneNo: "",
        companyName: "",
        creditCode: "",
        companyAddress: "",
        businessLicenseValidTime: "",
        businessLicenseImg: "",
        businessPermit: "",
        businessPermitImg: "",
        bankNo: "",
        accountBank: "",
        bankBranchName: "",
        bankBindPhone: "",
        id: "",
        approvalStatus: "",
        approvalTime: "",
        businessNo: "",
        channelStatus: ""
      },
      fromDataVk: {
        mainAccount: "账号",
        legalName: "姓名",
        identityNo: "身份证号",
        identityNoFrontImg: "身份证正面照",
        identityNoReverseImg: "身份证反面照",
        identityBegin: "身份证有效时间-开始时间",
        identityEnd: "身份证有效时间-结束时间",
        phoneNo: "联系电话",
        companyName: "企业名称",
        creditCode: "统一社会信用代码",
        companyAddress: "企业地址",
        businessLicenseValidTime: "营业执照有效期",
        businessLicenseImg: "营业执照副本",
        businessPermit: "开户许可证编码",
        businessPermitImg: "开户许可证图片",
        bankNo: "企业对公账户卡号",
        accountBank: "开户行",
        bankBranchName: "开户支行",
        bankBindPhone: "绑定手机号"
      },
      accountBank: [],
      phoneRge: false,
      identityNo: false,
      creditCodeReg: false,
      bankAccountRge: false,
      bankBindPhoneRge: false,
      host: "",
      show1: true,
      clickTime: true
    };
  },
  created() {
    this.save_queryDict("accountBank");
    if (this.name == "详情") {
      this.fromData = this.data;
      this.datePicker[0] = this.fromData.identityBegin;
      this.datePicker[1] = this.fromData.identityEnd;
      this.identityNoFrontImg_edit = this.fromData.identityNoFrontImg;
      this.identityNoReverseImg_edit = this.fromData.identityNoReverseImg;
      this.businessLicenseImg_edit = this.fromData.businessLicenseImg;
      this.businessPermitImg_edit = this.fromData.businessPermitImg;
      // this.show1= this.data.businessNo==''?false:true;
    }
  },
  mounted() {},
  methods: {
    cancel() {
      this.$emit("event", false);
    },
    Submit() {
      if (this.phoneRge == true) {
        this.$message.error("请填写正确格式的 联系电话 ");
      } else if (this.identityNo == true) {
        this.$message.error("请填写正确格式的 身份证号 ");
      } else if (this.creditCodeReg == true) {
        this.$message.error("请填写正确格式的 统一社会信用代码(15或18位)");
      } else if (this.bankAccountRge == true) {
        this.$message.error("请填写正确格式的 账户卡号(8~30位)");
      } else if (this.bankBindPhoneRge == true) {
        this.$message.error("请填写正确格式的 绑定手机号");
      } else {
        if (this.name == "详情") {
          this.fromData.identityNoFrontImg = this.identityNoFrontImg_edit;
          this.fromData.identityNoReverseImg = this.identityNoReverseImg_edit;
          this.fromData.businessLicenseImg = this.businessLicenseImg_edit;
          this.fromData.businessPermitImg = this.businessPermitImg_edit;
          if (this.clickTime == true) {
              this.save_payEdit(this.fromData);
          }
        } else {
          if (this.fromDataERR(this.fromData) != false) {
            if (this.clickTime == true) {
              this.save_payAdd();
            }
          }
        }
        setTimeout(() => {
          this.clickTime = true;
        }, 5000);
      }
    },
    save_payAdd() {
      payAdd(this.fromData).then(res => {
        this.clickTime = false;
        if (res.code == 200) {
          
          this.$message({
            message: "新增成功",
            type: "success",
            onClose: () => {
              this.cancel();
            }
          });
        }
      });
    },
    save_payEdit(fromData) {
      payEdit(fromData).then(res => {
        this.clickTime = false;
        if (res.code == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
            onClose: () => {
              this.cancel();
            }
          });
        } else {
          this.fromData = this.data;
          this.datePicker[0] = this.fromData.identityBegin;
          this.datePicker[1] = this.fromData.identityEnd;
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
            this.host = res.data.host;
            if (this.name == "新增") {
              this.fromData[name] = res.data.url;
              this[name] = Utils.getObjectURL(this.$refs[name].files[0]);
            } else {
              this.fromData[name] = Utils.getObjectURL(
                this.$refs[name].files[0]
              );
              this[`${name}_edit`] = res.data.url;
            }
          } else {
            this.$message.error("上传失败");
          }
        });
      }
    },
    fromDataERR(fromData) {
      let that = this;
      for (let key in fromData) {
        if (
          key != "id" &&
          key != "approvalStatus" &&
          key != "approvalTime" &&
          key != "businessNo" &&
          key != "channelStatus"
        ) {
          if (fromData[key] == "") {
            let text = that.fromDataVk[key];
            that.$message.error(`带 * 号必填，请填写${text}`);
            return false;
            break;
          }
        }
      }
    },
    save_queryDict(name) {
      queryDict(`?groupType=${name}`).then(res => {
        if (res.code == 200) {
          this[name] = res.data;
        }
      });
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
    datePicker(val) {
      this.fromData.identityBegin = val[0];
      this.fromData.identityEnd = val[1];
    },
    //  联系电话
    "fromData.phoneNo": {
      deep: true,
      handler: function(newV, oldV) {
        if (newV !== "" && /^[1][3,4,5,7,8,9][0-9]{9}$/.test(newV) == false) {
          /^(\d{16}|\d{19})$/;
          this.phoneRge = true;
        } else {
          this.phoneRge = false;
        }
      }
    },
    // 身份证
    "fromData.identityNo": {
      deep: true,
      handler: function(newV, oldV) {
        let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (newV !== "" && idcardReg.test(newV) == false) {
          this.identityNo = true;
        } else {
          this.identityNo = false;
        }
      }
    },
    // 社会统一代码
    "fromData.creditCode": {
      deep: true,
      handler: function(newV, oldV) {
        let idcardReg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/;
        if (newV !== "" && idcardReg.test(newV) == false) {
          this.creditCodeReg = true;
        } else {
          this.creditCodeReg = false;
        }
      }
    },
    // 银行卡
    "fromData.bankNo": {
      deep: true,
      handler: function(newV, oldV) {
        if (newV !== "" && /^([1-9]{1})(\d{7,29})$/.test(newV) == false) {
          this.bankAccountRge = true;
        } else {
          this.bankAccountRge = false;
        }
      }
    },
    //  绑定手机号
    "fromData.bankBindPhone": {
      deep: true,
      handler: function(newV, oldV) {
        if (newV !== "" && /^[1][3,4,5,7,8,9][0-9]{9}$/.test(newV) == false) {
          /^(\d{16}|\d{19})$/;
          this.bankBindPhoneRge = true;
        } else {
          this.bankBindPhoneRge = false;
        }
      }
    }
  }
};
</script>
<style lang="scss" >
.addNotice-center {
  float: 1;
  display: flex;
  flex-direction: column;
  .center-from {
    flex: 1;
    .addMechanism {
      width: 1000px;
      margin: 0 auto;
      font-size: 15px;
      //   background-color: rgba($color: chartreuse, $alpha: 0.1);
      .from-view {
        display: flex;
        width: 600px !important;
        color: #29262a;
        margin-bottom: 10px;
        .from-name {
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 150px;
          padding-right: 6px;
          .red {
            padding-top: 10px;
            width: 12px;
          }
          .name {
            min-width: 50px;
            text-align: justify;
            text-align-last: justify;
          }
        }
        .from-value {
          flex: 1;
          height: 50px;
          .el-input {
            height: 35px;
            .el-input__inner {
              height: 35px;
              line-height: 35px;
            }
          }
          .Tips {
            height: 15px;
            font-size: 12px;
            color: red;
            margin-bottom: 6px;
          }
        }
      }
      .from-viewII {
        display: flex;
        align-items: center;
        width: 600px;
        margin: 0 auto;
        margin-bottom: 10px;
        .from-view:nth-child(1) {
          width: 320px;
          margin: 0;
        }
        .from-view:nth-child(2) {
          width: 280px;
          margin: 0;
          .from-name {
            width: 100px;
          }
        }
      }
      
      .image-view {
        width: 720px;
        min-height: 200px;
        background: #f8f6f9;
        margin-left: 200px;
        margin-bottom: 20px;
        box-sizing: border-box;
        padding: 30px 30px;
        display: flex;
        .image-name {
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 120px;
          padding-right: 6px;
        }
        .image-value {
          flex: 1;
          display: flex;
          div {
            min-width: 138px;
            max-width: 200px;
            height: 138px;
            margin-left: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border-radius: 10px;
            position: relative;
            img {
              height: 138px;
              min-width: 138px;
              max-width: 200px;
            }
            input {
              position: absolute;
              left: 0;
              height: 138px;
              width: 138px;
              opacity: 0;
            }
          }
        }
      }
      .idCard-view {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .idCard {
          position: relative;
          img {
            height: 200px;
            width: 250px;
          }
          input {
            position: absolute;
            left: 0;
            height: 200px;
            width: 250px;
            opacity: 0;
          }
        }
      }
    }
    .from-title{
        width: 600px !important;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        border: 1px dashed #ff9b56 !important;
        border-radius: 4px;
        background: rgba($color: #ff9b56, $alpha: 0.1);
      }
  }
  .foots {
    height: 60px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>