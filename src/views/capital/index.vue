<template>
  <div class="view-center searchViews">
    <div class="main-view">
      <SearchBar @event1="closeCom" :type="1">
        <template v-slot:exportExcel>
          <div class="searchBar-right">
            <span class="buts but_b" @click="save_exportExcel('rebateSetTable','订单管理')">导出Excel</span>
          </div>
        </template>
      </SearchBar>
      <div class="searchViews-center">
        <el-table :data="tableData" border style="width: 100%" id="rebateSetTable">
          <el-table-column prop="courseId" label="序号" width="60">
            <template slot-scope="scope">
               <span>{{tableData.indexOf(scope.row)+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="courseNO" label="订单编号"></el-table-column>
          <el-table-column prop="createTime" label="生成时间"></el-table-column>
          <el-table-column prop="orderNo" label="交易流水号"></el-table-column>
          <el-table-column prop="origin" label="订单来源">
            <!-- 1-H5 2-IOS 3-安卓 -->
            <template slot-scope="scope">
              <p v-if="scope.row.origin == '1'">H5</p>
              <p v-else-if="scope.row.origin == '2'">IOS</p>
              <p v-else>安卓</p>
            </template>
          </el-table-column>
          <el-table-column prop="courseName" label="课程名称"></el-table-column>
          <el-table-column prop="courseTeahcer" label="授课教师">
            <template slot-scope="scope">
              <div v-if="scope.row.courseTeahcer">
                <p v-for="(item,index) in scope.row.courseTeahcer.split(',')" :key="index">{{item}}</p>
              </div>
              <p v-else >/</p>
            </template>
          </el-table-column>
          <el-table-column prop="teacherPhone" label="教师手机号" width="110">
            <template slot-scope="scope">
              <div v-if="scope.row.teacherPhone">
                <p v-for="(item,index) in scope.row.teacherPhone.split(',')" :key="index">{{item}}</p>
              </div>
              <p v-else > / </p>
            </template>
          </el-table-column>
          <el-table-column prop="memberPhone" label="用户手机号" width="110"></el-table-column>
          <el-table-column prop="status" label="状态">
            <!-- 1-报名中 2-已开课 3-已转移 4-已结束 5-已退费 -->
            <template slot-scope="scope">
              <span class="buts buts_1" v-if="scope.row.status == '1'">报名中</span>
              <span class="buts buts_2" v-else-if="scope.row.status == '2'">已开课</span>
              <span class="buts buts_3" v-else-if="scope.row.status == '3'">已转移</span>
              <span class="buts buts_3" v-else-if="scope.row.status == '4'">已结束</span>
              <span class="buts buts_4" v-else>已退费</span>
            </template>
          </el-table-column>
          <el-table-column prop="payPrice" label="支付金额"></el-table-column>
          <el-table-column prop="payTime" label="支付时间"></el-table-column>
          <el-table-column prop="courseSchedule" label="课时状态"></el-table-column>
          <el-table-column label="备注" width="60">
            <template slot-scope="scope">
              <span class="looks" @click="looks('introduce',scope.row)">查看</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" width="80" label="操作记录">
            <template slot-scope="scope">
              <el-popover placement="bottom-end" title min-width="200" trigger="click">
                <div class="operation">
                  <div class="operation-view operation-header">
                    <p>操作行为</p>
                    <p>操作人员</p>
                    <p>所属机构</p>
                    <p>时间</p>
                  </div>
                  <div v-if="operationList.length > 0">
                    <div class="operation-view" v-for="(item,index) in operationList" :key="index">
                      <p>
                        <span>{{ `转移订单${item.orderNo}` }}</span>
                        <span>{{ `新订单号${item.newOrderNo}` }}</span>
                      </p>
                      <p>{{item.recordUserId}}</p>
                      <p>{{item.createLcu}}</p>
                      <p>{{item.recordTime}}</p>
                    </div>
                  </div>
                  <div v-else class="operation-no">暂无操作记录</div>
                </div>
                <el-button
                  class="buts looks"
                  slot="reference"
                  @click="looks('operation',scope.row)"
                >查看</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    <Pupops v-if="show4==true" @event1="show4=$event">
      <div slot="titlt">备注记录</div>
      <div v-if="operationList.length == 0" slot="content" >暂无备注</div>
      <div v-else slot="content" class="">
        <div v-for="(item,index) in operationList" :key="index">
          <p>备注信息1</p>
          <span>日期：2020-12-12 12:00:00</span>
        </div>
      </div>
    </Pupops>
  </div>
</template>

<script>
import SearchBar from '@/components/searchBar'
import Pupops from '@/components/pupops'
import { manageOrders, queryOrderOperation } from '@/api/order.js';
import {  exportExcel } from "@/utils/exportExcel";
export default {
  components: {
    SearchBar,
    Pupops
  },
  data() {
    return {
      tableData: [],
      current: 1,
      size: 10,
      total: 0,
      show4: false,
      operationList: []
    }
  },
  created() {
    this.save_manageOrders();
    
  },
  mounted(){
    // console.log(exportExcel('rebateSetTable','订单管理'))
  },
  methods: {
    closeCom(province, city, search) {
      this.save_manageOrders(search)
    },
    save_exportExcel(id,name){
      exportExcel(id,name)
    },
    save_manageOrders(condition) {
      let data = `?current=${this.current}&size=${this.size}&condition=${
        condition ? condition : ''
      }`
      manageOrders(data).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      })
    },
    handleSizeChange(val) {
      this.size = val
      this.save_manageOrders()
    },
    handleCurrentChange(val) {
      this.current = val
      this.save_manageOrders()
    },
    save_queryOrderOperation(data) {
      queryOrderOperation(
        `?orderNo=${data.orderNo}&status=${data.status}`
      ).then(res => {
        if (res.code == 200) {
          this.operationList = res.data
        }
      })
    },
    looks(name, data) {
      if (name == 'operation') {
        this.save_queryOrderOperation(data)
      }else{
           this.show4 = true;
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.buts {
  padding: 0 5px;
  margin: 0;
  border-radius: 3px;
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
      width: 260px;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      span {
        line-height: 24px;
      }
    }
    p:nth-child(2) {
      width: 80px;
    }
    p:nth-child(3) {
      width: 80px;
    }
    p:nth-child(4) {
      width: 100px;
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
</style>