<template>
  <div class="view-center searchViews">
    <div class="main-view">
      <SearchBar @event1="closeCom" :type="1">
        <template v-slot:exportExcel>
          <div class="searchBar-right">
            <span class="buts but_b" @click="save_exportExcel('studentExcel','学员管理')">导出Excel</span>
          </div>
        </template>
      </SearchBar>
      <div class="searchViews-center">
        <el-table :data="tableData" border @sort-change="sortChange" stripe id="studentExcel">
          <el-table-column prop="studentId" label="序号" width="80">
            <template slot-scope="scope">
               <span>{{tableData.indexOf(scope.row)+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别" width="80">
            <template slot-scope="scope">
              <span>{{scope.row.sex=='1'?'男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="birthday" label="生日"></el-table-column>
          <el-table-column prop="signUpTime" :sortable="'custom'" label="最近报名时间" ></el-table-column>
          <el-table-column prop="courseDay" sortable='custom' label="上次结课时间" ></el-table-column>
          <el-table-column prop="source"  label="课程详情">
             <template slot-scope="scope">
              <span class="looks" @click="look('ks',scope.row.studentId)">查看</span>
            </template>
          </el-table-column>
          <el-table-column prop="monetary" label="总消费金额"></el-table-column>
          <el-table-column label="相关评价">
            <template slot-scope="scope">
              <span class="looks" @click="look('pj',scope.row)">查看</span>
            </template>
          </el-table-column>
          <el-table-column prop="vip" label="vip">
            <template slot-scope="scope">
              <span v-if="scope.row.vip == '1'">否</span>
              <span v-else>是</span>
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
    <CourseDetails v-if="show1" name="课程详情"  :id="studentId" @event="show1=$event"></CourseDetails>
    <Leave v-if="show2" :user="user"  @event="show2=$event" ></Leave>
  </div>
</template>
<script>
import SearchBar from '@/components/searchBar.vue'
import { queryCourseStudentVO } from '@/api/student.js';
import CourseDetails  from "./components/courseDetails";
import Leave from './components/leave';
import {  exportExcel } from "@/utils/exportExcel";
export default {
  components: {
    SearchBar,
    CourseDetails,
    Leave
  },
  data() {
    return {
      tableData: [],
      current: 1,
      size: 10,
      cityStr: '',
      studentPhoneOrName: '',
      total: 0,
      show1:false,
      show2:false,
      studentId:'',
      user:{},
      fieldName:''
    }
  },
  created() {
    this.save_queryCourseStudentVO(this.current, this.size,'','')
  },
  methods: {
    sortChange(column){
      // console.log(column);
      //获取字段名称和排序类型
        this.fieldName = column.prop=='signUpTime'?'signUpSort':'endTimeSort';
        let sortingType = column.order;
        if(sortingType == "ascending"){
            this.save_queryCourseStudentVO(this.current,this.size,this.cityStr,this.studentPhoneOrName,'1')
        }else if( sortingType == 'descending'){
            this.save_queryCourseStudentVO(this.current,this.size,this.cityStr,this.studentPhoneOrName,'2')
        }
    },
    save_exportExcel(id,name){
      exportExcel(id,name)
    },
    save_queryCourseStudentVO(current, size, cityStr, studentPhoneOrName,Sort) {
      let data
      if (cityStr && !studentPhoneOrName) {
        data = `?current=${current}&size=${size}&cityStr=${cityStr}`
      } else if (!cityStr && studentPhoneOrName) {
        data = `?current=${current}&size=${size}&studentPhoneOrName=${studentPhoneOrName}`
      } else if (cityStr && studentPhoneOrName) {
        data = `?current=${current}&size=${size}&cityStr=${cityStr}&studentPhoneOrName=${studentPhoneOrName}`
      }else if( Sort ){
        data = `?current=${current}&size=${size}&cityStr=${cityStr}&studentPhoneOrName=${studentPhoneOrName}&${this.fieldName}=${Sort}`
      } else {
        data = `?current=${current}&size=${size}`
      }
      queryCourseStudentVO(data).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      })
    },
    closeCom(province, city, search) {
      // console.log(province, city, search);
      this.save_queryCourseStudentVO(this.current, this.size,city,search)
    },
    handleSizeChange(val){
      this.save_queryCourseStudentVO(this.current, val)
    },
    handleCurrentChange(val){
      this.save_queryCourseStudentVO(val,this.size)
    },
    look(name,data){
      if(name == 'ks'){
        this.studentId = data;
        this.show1 = true;
      }else{
        this.show2 = true;
        this.user = data
      }
    }
  }
}
</script>