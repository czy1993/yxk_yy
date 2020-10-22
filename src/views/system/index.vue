<template>
  <div id="system" class="view-center">
    <div class="right-bus">
      <!-- <span class="buts but_c" @click="popShow=false">关闭菜单</span> -->
      <span class="buts but_b" @click="popShow=true">新增账号</span>
    </div>
    <div class="main-view">
      <el-table :data="accountData" border stripe>
        <el-table-column prop="username" label="账号">
          <template slot-scope="scope">
            <span>{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册日期">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lcuUsername" label="操作者">
          <template slot-scope="scope">
            <span>{{scope.row.lcuUsername}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="regionId" label="管理区域">
          <template slot-scope="scope">
            <div v-if="scope.row.regionName&&scope.row.regionName.length>0">
              <p v-for="(item,index) in scope.row.regionName" :key="index">{{item}}</p>
            </div>
            <div v-else>全国</div>
          </template>
        </el-table-column>
        <el-table-column prop="isManager" label="权限">
          <template slot-scope="scope">
            <span
              @click="$router.push({path:'/role-manage',query:{username:scope.row.username,id:scope.row.id,regionId:scope.row.regionId}})"
              style="cursor:pointer"
              :class="'isManager_active'"
            >{{'管理'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作" width="200px">
          <template slot-scope="scope">
            <span class="table_but table_but_b" @click="open(scope.row.username,'重置密码',)">重置密码</span>
            <span class="table_but table_but_a" @click="open(scope.row.username,'删除账号')">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <Pupops v-show="popShow" @event1="get_types($event)">
      <div slot="titlt">新增账号</div>
      <div slot="content" class="popup-content">
        <el-input v-model="phone" placeholder="请输入新账号(手机号)"></el-input>
        <p>(新账号默认密码123456,初次登陆强制修改密码)</p>
        <div>
          <span>管理区域</span>
          <el-select v-model="regionLevel" placeholder="层级">
            <el-option value label="请选择"></el-option>
            <el-option
              v-for="item in regionsType[detail.regionLevel]"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-cascader
          v-model="regionIds"
            v-if="regionLevel!='0'"
            placeholder="选择区域"
            :options="AllRegion"
            :show-all-levels="false"
            :props="{ multiple:regionLevel=='1'?false:true,value:'id',label:'name',children:'child',checkStrictly:false}"
            @change="regionChange"
            filterable
          ></el-cascader>
        </div>
      </div>
      <button slot="foot" @click="save_userAdd()">确定</button>
    </Pupops>
  </div>
</template>
<script>
import Pupops from "@/components/pupops";
import { queryUserList, resetPass, userDelete, userAdd } from "@/api/user.js";
import { queryRegion, queryAllRegion,searchRegion } from "@/api/index.js";
import { province_list, city_list } from "@/utils/area.js";
import { getAccountInfo } from "@/utils/auth";
import Utils from "@/utils/deep.js";
export default {
  data() {
    return {
      accountData: [],
      page: 1,
      pageCount: "10",
      total: 0,
      popShow: false,
      AllRegion: [],
      regionIdList: [],
      province: "",
      phone: "",
      regionsType: {
        "0": [
          {
            name: "全国",
            id: "0"
          },
          {
            name: "省",
            id: "1"
          }
        ],
        "1": [
          {
            name: "省",
            id: "1"
          },
          {
            name: "市",
            id: "2"
          }
        ],
        "2": [
          {
            name: "市",
            id: "2"
          }
        ]
      },
      regionLevel: "",
      detail: "",
      regionLevel:'', // 管理区域 0全国 1 省
      regionIds:"",  // 区域id
    };
  },
  components: {
    Pupops
  },
  created() {
    this.detail = getAccountInfo();
    this.save_queryUserList();
    this.save_searchRegion();
  },
  methods: {
    save_searchRegion(){
      searchRegion().then( res => {
        this.regionIds = res.data.regionIds;
      })
    },
    save_queryRegion() {
      queryRegion({
        id: 0,
        level: "0",
        name: "",
        pid: 0
      }).then(res => {});
    },
    regionChange(val) {
      this.regionIdList = val;
    },
    save_queryUserList() {
      queryUserList(`?page=${this.page}&pageCount=${this.pageCount}`).then(
        res => {
          if (res.code == 200) {
            if (res.data.records.length > 0) {
              this.accountData = this.saveArr(res.data.records);
              this.total = res.data.total;
            }
          }
        }
      );
    },
    saveArr(arr) {
      arr.forEach(item => {
        if (item.regionId != null) {
          item.regionId =item.regionId&&item.regionId.split(",");
          item.regionMerName = item.regionMerName&&item.regionMerName.split(",");
          item.regionName = item.regionName&&item.regionName.split(",");
        } else {
          item.regionId = [];
          item.regionMerName = [];
          item.regionName = [];
        }
      });
      return arr;
    },
    // 重置密码
    save_resetPass(phone) {
      resetPass(`?phone=${phone}`).then(res => {
        if (res.code == 200) {
          this.$message({
            message: "密码重置成功",
            type: "success",
            onClose:()=>{
              this.save_queryUserList();
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //删除员工
    save_userDelete(acc) {
      let arr=new Array;
      arr.push(acc)
      userDelete(arr).then(res => {
        if (res.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1300,
            onClose:()=>{
              this.save_queryUserList();
            }
          });
        }
      });
    },
    open(name,text) {
        this.$confirm(`确定要 ${text} 吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(text=='重置密码'){
            this.save_resetPass(name)
          }else{
            this.save_userDelete(name)
          }
        }).catch(() => {
                   
        });
      },
    // 新增员工
    save_userAdd() {
      userAdd({
        image: "",
        name: "",
        regionIdList: Utils.uniq(this.regionIdList),
        regionLevel: this.regionLevel,
        remark: "",
        username: this.phone
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: "新增成功",
            type: "success",
            onClose: () => {
              this.popShow = false;
              this.save_queryUserList();
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleSizeChange(val) {
      this.pageCount = val;
      this.save_queryUserList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.save_queryUserList();
    },
    get_types(type) {
      this.popShow = type;
    }
  },
  watch: {
    regionLevel(val) {
      console.log(val)
      if (val === "0") {
        queryAllRegion().then(res => {
          if (res.code == 200) {
            this.AllRegion = res.data;
            this.AllRegion.forEach(element => {
              if (element.child.length > 0) {
                element.child=null
              }
            });
            // console.log(this.AllRegion);
          }
        });
      } else {
        queryRegion({
          level: val
        }).then(res => {
          this.AllRegion = res;
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#system {
  .popup-content {
    width: 600px;
    margin: 0 auto;
    min-height: 250px;
    .city {
      // width: 112px;
    }
    p {
      font-size: 14px;
      margin-bottom: 15px;
      padding-top: 10px;
      color: #7e7e7e;
    }
    .el-cascader {
      width: 400px;
    }
    .el-select {
      width: 120px;
    }
  }
}
</style>