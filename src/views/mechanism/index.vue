<template>
  <div class="view-center searchViews">
    <div class="right-bus">
      <span class="buts but_b" @click="look('addEdit')">新增机构</span>
      <span class="buts but_c" @click="disable=!disable">{{disable==true?'取消':'禁用'}}</span>
      <span class="buts but_b" v-if="disable" @click="save_adminUpdate('disable')">确定禁用</span>
      <span class="buts but_b" v-if="disable" @click="save_adminUpdate('status')">解除禁用</span>
    </div>
    <div class="main-view">
      <SearchBar @event1="closeCom" :type="1">
        <template v-slot:exportExcel>
          <div class="searchBar-right">
            <span class="buts but_b" @click="save_exportExcel('mechanismExcel','机构管理')">导出Excel</span>
          </div>
        </template>
      </SearchBar>
      <div class="searchViews-center">
        <el-table
          id="mechanismExcel"
          :data="tableData"
          border 
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column v-if="disable" type="selection" 
          prop="status"
          :toggleRowSelection='true'
           width="55"></el-table-column>
          <el-table-column  label="序号" width="55">
            <template slot-scope="scope">
              <span>{{tableData.indexOf(scope.row)+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="账号"></el-table-column>
          <el-table-column prop="contacts" label="联系人" width="90"></el-table-column>
          <el-table-column prop="contactWay" label="其他联系方式"  ></el-table-column>
          <el-table-column prop="address" label="地址">
            <template slot-scope="scope">
              <p>{{city_list[scope.row.city]}}</p>
              <p>{{scope.row.address}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="source" label="相关证件" width="90">
            <template slot-scope="scope">
              <span class="looks" @click="look('certificateList',scope.row)">查看</span>
            </template>
          </el-table-column>
          <el-table-column prop="creditCode" label="统一社会信用代码"></el-table-column>
          <el-table-column prop="createTime" label="注册时间"></el-table-column>
          <el-table-column prop="lcd" label="上次修改时间"></el-table-column>
          <el-table-column prop="source" label="介绍" width="60" >
            <template slot-scope="scope">
              <span class="looks" @click="look('introduce',scope.row)">查看</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="禁用" width="60" >
            <template slot-scope="scope">
              <span class="looks" v-if="scope.row.status=='1'" >否</span>
              <span class="looks" v-else >是</span>
            </template>
          </el-table-column>
          <el-table-column label="操作记录" width="110" >
            <template slot-scope="scope">
              <el-popover placement="bottom-end" title min-width="200" trigger="click">
                <div class="operation">
                  <div class="operation-view operation-header">
                    <p>操作行为</p>
                    <p>操作人员</p>
                    <p>所属机构</p>
                    <p>时间</p>
                  </div>
                  <div v-if="scope.row.operationList.length > 0">
                    <div
                      class="operation-view"
                      v-for="(item,index) in scope.row.operationList"
                      :key="index"
                    >
                      <p>{{item.content}}</p>
                      <p>{{item.createName}}</p>
                      <p>{{item.createLcu}}</p>
                      <p>{{item.createTime}}</p>
                    </div>
                  </div>
                  <div v-else class="operation-no">暂无操作记录</div>
                </div>
                <el-button  class="buts looks" slot="reference">查看</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="相关教师" width="90">
            <template slot-scope="scope">
              <span class="looks" @click="look('teacher',scope.row)">查看</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="支付信息" width="90">
            <template slot-scope="scope">
              <span class="looks" @click="look('payment',scope.row)">查看</span>
            </template>
          </el-table-column> -->
          <el-table-column label="备注" width="60" >
            <template slot-scope="scope">
              <span class="looks" @click="look('edit',scope.row)">编辑</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60" >
            <template slot-scope="scope">
              <span class="looks" @click="look('add',scope.row)">编辑</span>
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
    <Pupops v-if="show1==true" @event1="show1=$event">
      <div slot="titlt">编辑备注信息</div>
      <div slot="content">
        <el-input type="textarea" :rows="3" placeholder="请输入文字" v-model="remarks"></el-input>
      </div>
      <div slot="foot">
        <button @click="save_adminUpdate('remarks')">确定</button>
      </div>
    </Pupops>
    <Pupops v-if="show2==true" @event1="show2=$event">
      <div slot="titlt">查看相关证件</div>
      <div v-if="certificateList.length>0" slot="content" class="certificateList">
        <div class="certificateList-li" v-for="(item,index) in certificateList" :key="index">
          <div @click="double(item)">
            <img  :src="item" alt />
          </div>
          <!-- <p>{{item.name}}</p> -->
        </div>
      </div>
      <div v-else slot="content">
        <p class="pp">暂无相关证书</p>
      </div>
    </Pupops>
    <Introduce v-if="show3" :name="name" :data="payment" @event="show3=$event"></Introduce>
    <AddMechanism v-if="show5" :name="name" :data="payment" @event="showChange($event)"></AddMechanism>
    <Pupops v-if="show4==true" @event1="show4=$event">
      <div slot="titlt">支付信息</div>
      <div slot="content" class="payment">
        <div>
          <p>
            <span>银行账户所有人</span>
            {{payment.accountOwner=='1'?'个人账户':'对公账户'}}
          </p>
          <p>
            <span>开户银行</span>
            {{payment.accountBankName}}
          </p>
        </div>
        <div>
          <p>
            <span>开户地区</span>
            {{payment.bankCityName}}
          </p>
          <p>
            <span>开户支行</span>
            {{payment.bankSub}}
          </p>
        </div>
        <div>
          <p>
            <span>银行账号</span>
            {{payment.bankAccount}}
          </p>
        </div>
        <div>
          <p>
            <span>开户名称</span>
            {{payment.accountName}}
          </p>
        </div>
      </div>
    </Pupops>
    <LookImg v-if="show6"  :url="url" @event1="show6=$event" ></LookImg>
  </div>
</template>
<script>
import SearchBar from "@/components/searchBar.vue";
import { adminList, adminUpdate } from "@/api/callAdmin.js";
import { queryAllRegion, uploadSingle, queryDict } from "@/api/index.js";
import Pupops from "@/components/pupops.vue";
import LookImg from "@/components/lookImg.vue" 
import Introduce from "./components/introduce";
import AddMechanism from "./components/addMechanism";
import { exportExcel } from "@/utils/exportExcel";
import { city_list, province_list } from "@/utils/area";
import { mapMutations } from "vuex";
export default {
  components: {
    SearchBar,
    Pupops,
    Introduce,
    AddMechanism,
    LookImg
  },
  data() {
    return {
      id: "",
      tableData: [],
      current: 1,
      size: 10,
      total: 0,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6:false,
      remarks: "",
      certificateList: [],
      payment: {},
      disable: false, // 禁用
      name: "add",
      statusList: [],
      accountBank: [],
      city_list,
      url:'',
    };
  },
  created() {
    this.save_adminList();
    this.save_queryDict("accountBank");
  },
  methods: {
    ...mapMutations(["SAVE_AGENCYID"]),
    double(url) {
      this.url = url;
      this.show6 = true;
    },
    save_exportExcel(id, name) {
      exportExcel(id, name);
    },
    hh(){
      console.log()
    },
    save_adminList(province, city, phone) {
      // let data = `?current=${current}&size=${size}&province=${province}&city=${city}&phone=${phone}`;
      let data = `?current=${this.current}&size=${this.size}`;
      if (province && !city && !phone) {
        data = data + `&province=${province}`;
      } else if (province && city && !phone) {
        data = data + `&province=${province}&city=${city}`;
      } else if (province && city && phone) {
        data = data + `&province=${province}&city=${city}&phone=${phone}`;
      } else if (!province && city && phone) {
        data = data + `&city=${city}&phone=${phone}`;
      } else if (!province && !city && phone) {
        data = data + `&phone=${phone}`;
      }
      adminList(data).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    closeCom(province, city, search) {
      this.save_adminList(province, city, search);
    },
    handleSizeChange(val) {
      this.size = val;
      this.save_adminList();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.save_adminList();
    },
    save_queryDict(name) {
      queryDict(`?groupType=${name}`).then(res => {
        if (res.code == 200) {
          this[name] = res.data;
        }
      });
    },
    look(name, data) {
      this.id = data ? data.id : "";
      if (name == "certificateList") {
        this.show2 = true;
        this.certificateList = data.certificateList;
      } else if (name == "introduce") {
        this.show3 = true;
        this.payment = data;
      } else if (name == "payment") {
        this.show4 = true;
        this.payment = data;
        this.accountBank.forEach(element => {
          if (this.payment.accountBank == element.value) {
            this.payment.accountBankName = element.label;
          }
        });
        for (let key in city_list) {
          if (key == this.payment.bankCity) {
            this.payment.bankCityName = city_list[key];
          }
        }
      } else if (name == "teacher") {
        this.$router.push({
          path: "/teacher/"+data.id
        });
        this.SAVE_AGENCYID(data.id);
      } else if (name == "edit") {
        this.show1 = true;
      } else if (name == "add") {
        this.name = "add";
        this.show5 = true;
        this.payment = data;
      } else if (name == "addEdit") {
        this.name = "addEdit";
        this.show5 = true;
      }
    },
    save_adminUpdate(name) {
      let data;
      if (name == "remarks") {
        if (this.remarks == "") {
          this.$message.error("请输入编辑信息");
        } else {
          data = [
            {
              id: this.id,
              remarks: this.remarks, // 备注
              status: this.status // 状态 1-启用 2-禁用
            }
          ];
        }
      } else if(name == 'disable') {
        data = this.arrayParsing(this.statusList,'2');
      }else if(name == 'status'){
        data = this.arrayParsing(this.statusList,'1');
      }
      if (data.length == 0) {
        this.$message.error("请至少勾选一个再行操作");
      } else {
        adminUpdate(data).then(res => {
          if (res.code == 200) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.save_adminList();
            this.show1 = false;
            this.disable = false;
            this.statusList = [];
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },
    showChange(type) {
      this.show5 = type;
      this.save_adminList();
    },
    handleSelectionChange(val) {
      this.statusList = val;
    },
    arrayParsing(arr,status) {
      let data = [];
      arr.forEach(element => {
        let objs = {};
        objs.id = element.id;
        objs.remarks = element.remarks;
        objs.status = status;
        data.push(objs);
      });
      return data;
    }
  }
};
</script>
<style lang="scss" >
@import "@/styles/mixin.scss";
.certificateList {
  max-height: 400px;
  overflow-y: auto;
  @include scroll-bar;
  .certificateList-li {
    width: 200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    div {
      width: 180px;
      height: 100px;
      background: #f7f7f7;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #e5e5e5;

      img {
        height: 100px;
        width: 180px;
      }
    }
    p {
      font-size: 15px;
      padding: 10px 0 20px 0;
    }
  }
}
.pp {
  text-align: center;
}
.operation {
  border: 1px solid #e5e5e5;
  border-right: 0;
  border-bottom: 0;
  min-height: 80px;
  max-height: 400px;
  overflow-y: auto;
  @include scroll-bar;
  .operation-header {
    background: #f3fbf7;
    height: 32px;
    line-height: 32px;
  }
  .operation-view {
    display: flex;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      line-height: 30px;
      padding: 0 8px;
      border-right: 1px solid #e5e5e5;
    }
    p:nth-child(1) {
      width: 200px;
    }
    p:nth-child(2) {
      width: 80px;
    }
    p:nth-child(3) {
      width: 80px;
    }
    p:nth-child(4) {
      width: 150px;
    }
  }
  .operation-no {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }
}
.payment {
  div {
    display: flex;
    p {
      line-height: 40px;
      color: #757575;
      font-size: 14px;
      padding-right: 10px;
      span {
        padding-right: 6px;
        color: #010101;
      }
    }
  }
}
.el-button {
  border: 0;
}
</style>