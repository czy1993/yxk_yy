<template>
  <div class="view-center searchViews">
    <div class="main-view">
      <SearchBar @event1="closeCom" :type="1">
        <template v-slot:exportExcel>
          <div class="searchBar-right">
            <span class="buts but_b" @click="save_exportExcel('transactionExcel','交易管理')">导出Excel</span>
          </div>
        </template>
      </SearchBar>
      <div class="searchViews-center">
        <el-table :data="tableData" border style="width: 100%" id="transactionExcel">
          <el-table-column prop="orderNo" label="账号" ></el-table-column>
          <el-table-column prop="payNo" label="交易流水号"></el-table-column>
          <el-table-column prop="payWay" label="支付方式">
            <!-- 1-支付宝 2-微信 3-银联 -->
            <template slot-scope="scope">
              <span v-if="scope.row.payWay == '1'">支付宝</span>
              <span v-else-if="scope.row.payWay == '2'">微信</span>
              <span v-else>银联</span>
            </template>
          </el-table-column>
          <el-table-column prop="payTime" label="支付发起时间"></el-table-column>
          <el-table-column prop="payPrice" label="支付金额"></el-table-column>
          <el-table-column prop="memberPhone" label="用户手机号" width="110"></el-table-column>
          <el-table-column prop="status" label="状态">
            <!-- 1-已开课 2-已转移 3-已结束 4-已退费 -->
            <template slot-scope="scope">
              <span class="buts buts_1" v-if="scope.row.status == '1'">成功</span>
              <span class="buts buts_2" v-else>失败</span>
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
  </div>
</template>

<script>
import SearchBar from '@/components/searchBar'
import Pupops from '@/components/pupops'
import { allPayInfo, searchPayInfo } from '@/api/order.js'
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
    this.save_allPayInfo()
  },
  methods: {
    closeCom(province, city, search) {
      this.save_searchPayInfo(search)
    },
    save_exportExcel(id,name){
      exportExcel(id,name)
    },
    save_allPayInfo() {
      allPayInfo(`?current=${this.current}&size=${this.size}`).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      })
    },
    save_searchPayInfo(search) {
      if (search) {
        searchPayInfo(`?condition=${search}`).then(res => {
          if (res.code == 200) {
            this.tableData = res.data;
            this.total = res.data.length;
          }
        })
      }else{
          this.save_allPayInfo()
      }
    },
    handleSizeChange(val) {
      this.size = val
      this.save_allPayInfo()
    },
    handleCurrentChange(val) {
      this.current = val
      this.save_allPayInfo()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.buts {
  border-radius: 3px;
}
</style>