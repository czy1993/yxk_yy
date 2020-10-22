<template>
  <div class="childViews">
    <div class="addNotice-telit">
      <span>教师考勤</span>
      <div >
          <span class="teacher-name">教师名称:</span><span  class="teacher-value"> {{data.name}} </span>
          <span class="buts but_b" @click="save_exportExcel('attendanceExcel','教师考勤')" >导出Excle</span>
          <span class="buts but_c" @click="cancel()">返回</span>
      </div>
      
    </div>
    <div class="addNotice-center">
      <div class="center-from">
        <div class="teacherattendance">
          <el-table id="attendanceExcel" :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="序号" >
                <template slot-scope="scope" >
                    <span v-text="scope.$index+1"></span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="课程名称"></el-table-column>
            <el-table-column prop="courseDate" label="上课时间"></el-table-column>
            <el-table-column prop="status" label="考勤状态">
                <template slot-scope="scope" >
                    <span v-if="scope.row.status=='1'" class="status1" >未开始</span>
                    <span v-else-if="scope.row.status=='2'" class="status2" >已出勤</span>
                    <span v-else-if="scope.row.status=='3'"  class="status3">缺勤</span>
                    <span v-else class="status4">请假</span>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { searchAttendance } from '@/api/teacher.js';
import {  exportExcel } from "@/utils/exportExcel";
export default {
  props: {
    data: Object
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    // console.log(this.data)
    this.save_searchAttendance()
  },
  methods: {
    save_exportExcel(id,name){
      exportExcel(id,name)
    },
    cancel() {
      this.$emit('event', false)
    },
    save_searchAttendance() {
      searchAttendance(`?courseTeacherId=${this.data.id}`).then(res => {
        if (res.code == 200) {
          this.tableData = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.teacherattendance {
    height: 100%;
    width: 1000px;
    margin: auto;
    overflow: auto;
    @include scroll-bar;
    .status1{
        color: RGBA(113, 113, 113, 1);
    }
    .status2{
        color: #68DEB3;
    }
    .status3{
        color: #54BCB3;
    }
    .status4{
        color: #FF9B56;
    }
 
}
.teacher-name{
    font-size: 16px;
    font-weight: 500;
}
.teacher-value{
    font-size: 15px;
    font-weight: 500;
    padding: 0 15px;
    color: RGBA(121, 121, 121, 1);
}
</style>