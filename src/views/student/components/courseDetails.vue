<template>
  <div class="childViews">
    <div class="addNotice-telit">
      <span>课程详情</span>
      <span class="buts but_c" @click="cancel()">返回</span>
    </div>
    <div class="addNotice-center">
      <div class="center-from">
        <el-table :data="tableData" border stripe>
          <el-table-column prop="courseId" label="序号" width="80"></el-table-column>
          <el-table-column prop="agencyName" label="所属机构"></el-table-column>
          <el-table-column prop="courseName" label="课程名称"></el-table-column>
          <el-table-column prop="courseStatus" label="课程状态">
            <!-- // 课程状态1-未上架 2-报名中 3-已开课 4-已结束 -->
            <template slot-scope="scope">
              <span v-if="scope.row.courseStatus=='1'" class="buts buts_0">未上架</span>
              <span v-else-if="scope.row.courseStatus=='2'" class="buts buts_1">报名中</span>
              <span v-else-if="scope.row.courseStatus=='3'" class="buts buts_2">已开课</span>
              <span v-else class="buts buts_3">已学完</span>
            </template>
          </el-table-column>
          <el-table-column prop="teacherName" label="授课教师"></el-table-column>
          <el-table-column prop="currentNum" label="课时状态">
            <template slot-scope="scope">
              <span>{{`${scope.row.currentNum}/${scope.row.courseNum }`}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="考勤">
            <template slot-scope="scope">
              <el-popover placement="bottom-end" title width="500" trigger="click">
                <div class="el-popover-table">
                  <div class="el-popover-table-Header">
                    <span>序号</span>
                    <span>授课教师</span>
                    <span>考勤状态</span>
                  </div>
                  <div v-for="(item,index) in gridData" :key="index">
                    <span>{{index+1}}</span>
                    <span>{{item.teacherName}}</span>
                    <span class="zc" v-if="item.status=='1'" >正常</span>
                    <span class="qj" v-else-if="item.status=='2'" >请假</span>
                    <span class="qq" v-else-if="item.status=='3'" >缺课</span>
                     <span v-else ></span>
                  </div>
                </div>
                <el-button
                  class="buts looks"
                  slot="reference"
                  @click="save_queryCourseStatus(scope.row.courseId,id)"
                >详情</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { queryStudentCourse, queryCourseStatus } from '@/api/student'
export default {
  props: {
    id: Number
  },
  created() {
    setTimeout( ()=>{
      this.save_queryStudentCourse(this.id)
    },100)
    
  },
  data() {
    return {
      tableData: [],
      gridData: [
        {
          courseStatus: '1',
          currentNum: '1',
          teacherName: '孔子'
        },{
          courseStatus: '3',
          currentNum: '1',
          teacherName: '孟子'
        },{
          courseStatus: '2',
          currentNum: '1',
          teacherName: '庄子'
        },{
          courseStatus: '2',
          currentNum: '1',
          teacherName: '周子'
        }
      ]
    }
  },
  methods: {
    cancel() {
      this.$emit('event', false)
    },
    save_queryStudentCourse(id) {
      queryStudentCourse(`?studentId=${id}`).then(res => {
        if (res.code == 200) {
          this.tableData = res.data
        }
      })
    },
    save_queryCourseStatus(courseId, studentId) {
      let data = `?courseId=${courseId}&studentId=${studentId}`
      queryCourseStatus(data).then(res => {
        if( res.code == 200 &&  res.data.length>0){
          this.gridData = res.data;
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/mixin.scss';
.el-popover{
  padding: 0 !important;
}
.el-popover-table{
  display: flex;
  width: 500px;
  overflow-y: auto;
  border: 1px solid #E5E5E5;
  @include scroll-bar;
  div{
    width: 500px;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-right: 1px solid #E5E5E5;
    span{
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
       border-bottom: 1px solid #E5E5E5;
    }
    .zc{
      color: #45D9A6;
    }
    .qj{
      color: #FF9B56;
    }
    .qq{
      color: #54BCB3;
    }
  }
  .el-popover-table-Header{
    background: #F4FBF8;
    font-weight:500 ;
  }
}
</style>