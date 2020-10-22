<template>
  <div class="view-center searchViews">
    <div class="right-bus"></div>
    <div class="main-view">
      <div class="searchBar">
        <div class="searchBar-left">
          <span class="buts but_b" @click="dialogVisible=true">添加支付信息</span>
          <el-input placeholder="请输入账号搜索" v-model="search" class="input-with-select">
            <img
              slot="append"
              @click="save_payList(search)"
              src="../../../static/img/icon/search.png"
              alt
            />
          </el-input>
        </div>
        <div class="searchBar-right">
          <span class="buts but_b" @click="save_exportExcel('mechanismExcel','支付管理')">导出Excel</span>
        </div>
      </div>
      <div class="searchViews-center">
        <el-table id="mechanismExcel" :data="tableData" border stripe>
          <el-table-column prop="businessNo" label="商户号">
            <template slot-scope="scope">
              <span>{{scope.row.businessNo?scope.row.businessNo:"未生成"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="approvalStatus" label="状态" width="200">
            <template slot-scope="scope">
              <div>
                <span class="buts table_but_a" v-if="scope.row.approvalStatus=='1'">待审核</span>
                <span class="buts table_but_b" v-else-if="scope.row.approvalStatus=='2'">已开通</span>
                <span class="buts buts_3" v-else>审核失败</span>
                <el-dropdown @command="handleCommand" v-show="scope.row.approvalStatus!='2'">
                  <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="d" disabled>状态编辑</el-dropdown-item>
                    <el-dropdown-item :command="scope.row.id+'-2'" divided>开通审核</el-dropdown-item>
                    <el-dropdown-item :command="scope.row.id+'-1'">待审核</el-dropdown-item>
                    <el-dropdown-item :command="scope.row.id+'-3'">审核失败</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="mainAccount" label="主账号"></el-table-column>
          <el-table-column prop="agencyName" label="机构名称">
            <template slot-scope="scope">
              <span>{{scope.row.agencyName?scope.row.agencyName:"/"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="提交时间"></el-table-column>
          <el-table-column prop="approvalStatus" label="审核结果" width="100">
            <template slot-scope="scope">
              <span class="looks">{{scope.row.approvalStatus=='1'?'通过':"/"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="approvalTime" label="开通时间">
            <template slot-scope="scope">
              <span>{{scope.row.approvalTime?scope.row.approvalTime:"/"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="channelStatus" label="通道管理">
            <template slot-scope="scope">
              <span
                class="looks"
                @click="save_updateStatus(scope.row,'1')"
              >{{scope.row.channelStatus=='1'?'已开启':'开启'}}</span>
              <span
                class="looks"
                @click="save_updateStatus(scope.row,'2')"
              >{{scope.row.channelStatus=='1'?'关闭':'已关闭'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="详情" width="80">
            <template slot-scope="scope">
              <span class="looks" @click="save_payId(scope.row.id)">详情</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- <AddPayment v-if="show1" :name="name" :data="data" @event="show1 = $event"></AddPayment> -->
    <el-dialog :title="name=='新增'?'新增支付':'修改支付'" :visible.sync="dialogVisible" width="30%">
      <div class="add-dialog">
        <div class="add-from">
          <span class="from-key">商户号</span>
          <el-input
            class="from-value"
            type="text"
            maxlength="30"
            v-model="businessNo"
            placeholder="请输入商户号"
          ></el-input>
        </div>
        <div class="add-from">
          <span class="from-key">
            <span class="red">*</span> 手机号
          </span>
          <el-input
            class="from-value"
            type="number"
            maxlength="11"
            v-model="mainAccount"
            placeholder="请输入手机号"
          ></el-input>
          <p  v-show="phoneYZ" class="yzts red">手机号为11位的数字</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  payList,
  updateStatus,
  payId,
  addSimple,
  editSimple,
} from "@/api/callAdmin.js";
import {} from "@/api/index.js";
import Pupops from "@/components/pupops.vue";
import AddPayment from "./components/addPayment.vue";
import { exportExcel } from "@/utils/exportExcel";
import { mapMutations } from "vuex";
export default {
  components: {
    Pupops,
    AddPayment,
  },
  data() {
    return {
      id: "",
      show1: false,
      tableData: [],
      current: 1,
      size: 10,
      total: 0,
      url: "",
      search: "",
      name: "新增",
      data: {},
      dialogVisible: false,
      businessNo: "",
      mainAccount: "",
      phoneYZ:false
    };
  },
  created() {
    this.save_payList();
  },
  methods: {
    ...mapMutations(["SAVE_AGENCYID"]),
    handleClose() {
      console.log(this.name)
      if (this.name == "新增") {
        if (this.phoneYZ == true || this.mainAccount == '') {
          this.$message.error("请填写正确的手机号码");
        } else {
          this.add_Simple();
        }
      }else{
        this.edit_Simple()
      }
    },
    add_Simple() {
      addSimple({
        businessNo: this.businessNo,
        id: null,
        mainAccount: this.mainAccount,
        payType: "",
      }).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.save_payList();
          this.dialogVisible = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    edit_Simple() {
      editSimple({
        businessNo: this.businessNo,
        id: this.id,
        mainAccount: this.mainAccount,
        payType: "",
      }).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "编辑成功",
            type: "success",
          });
          this.save_payList();
          this.dialogVisible = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    double(url) {
      this.url = url;
      this.show6 = true;
    },
    handleCommand(command) {
      updateStatus({
        approvalStatus: command.split("-")[1],
        id: command.split("-")[0],
      }).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
            onClose: () => {
              this.save_payList();
            },
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    save_exportExcel(id, name) {
      exportExcel(id, name);
    },
    closeCom(province, city, search) {},
    handleSizeChange(val) {
      this.size = val;
      this.save_payList();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.save_payList();
    },
    save_payList(name) {
      let data = `current=${this.current}&size=${this.size}`;
      let account = name ? `&account=${name}` : "";
      payList(data + account).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    save_updateStatus(data, Status) {
      if (data.channelStatus == Status) {
        this.$message({
          message: `当前通道管理状态就是${Status == "1" ? "开启" : "关闭"}状态`,
          type: "warning",
        });
      } else {
        updateStatus({
          approvalStatus: data.approvalStatus,
          channelStatus: Status,
          id: data.id,
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: `${Status == "1" ? "开启" : "关闭"}成功`,
              type: "success",
              onClose: () => {
                this.save_payList();
              },
            });
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },
    save_payId(id) {
      payId(`id=${id}`).then((res) => {
        // console.log(res)
        if (res.code == 200) {
          this.data = res.data;
          this.name = "详情";
          this.id = id;
          this.businessNo = res.data.businessNo;
          this.mainAccount = res.data.mainAccount;
          this.dialogVisible = true;
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
  watch: {
    show1(val) {
      if (val == false) {
        this.name = "新增";
      }
    },
    dialogVisible(val) {
      if (val == false) {
        this.name = "新增";
        this.businessNo = '';
        this.mainAccount = '';
      }
    },
    mainAccount(newV){
      if (newV !== "" && /^[1][3,4,5,7,8,9][0-9]{9}$/.test(newV) == false) {
          /^(\d{16}|\d{19})$/;
          this.phoneYZ = true;
        } else {
          this.phoneYZ = false;
        }
    }
  },
};
</script>
<style lang="scss" >
@import "@/styles/mixin.scss";
.searchBar {
  height: 80px;
  min-height: 70px;
  background: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #eceef1;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  font-size: 15px;
  .searchBar-left {
    display: flex;
    align-items: center;
    .but_b {
      height: 34px;
      width: 130px;
      line-height: 34px;
    }
    .input-with-select {
      width: 260px;
      margin-left: 15px;
      .el-input__inner {
        // border-right: 0;
      }
      img {
        height: 20px;
        margin-bottom: -2px;
        cursor: pointer;
      }
      .el-input-group__append,
      .el-input-group__prepend {
        background: #fff;
        border-left: 0;
      }
    }
  }
}
.add-dialog {
  height: 120px;
  .add-from {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    position: relative;
    .from-key {
      width: 80px;
    }
    .yzts{
      position:absolute;
      left: 80px;
      top: 45px;
    }
  }
}
</style>