<template>
  <div class="view-center searchViews">
    <div class="right-bus">
      <span class="buts but_c" @click="$router.go(-1)">返回</span>
    </div>
    <div class="main-view">
      <SearchBar @event1="closeCom" :type="1">
        <template v-slot:exportExcel>
          <div class="searchBar-right">
            <span class="buts but_b" @click="save_exportExcel('teacherExcel','教师管理')">导出Excel</span>
          </div>
        </template>
      </SearchBar>
      <div class="searchViews-center">
        <el-table id="teacherExcel" :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="序号" width="60">
            <template slot-scope="scope" >
               <span>{{tableData.indexOf(scope.row)+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="80"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column label="照片" width="80" >
            <template slot-scope="scope">
              <img v-if="scope.row.photo" class="photo" :src="imgServer+scope.row.photo" alt />
              <i v-else class="el-icon-edit"></i>
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="50">
            <template slot-scope="scope">
              <span v-if="scope.row.sex=='1'">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column prop="certificateNo" label="资格证编号"></el-table-column>
          <el-table-column prop="honor" label="荣誉"></el-table-column>
          <el-table-column prop="subject" label="科目" width="70">
             <template slot-scope="scope">
              <p v-for="(item,index) in scope.row.subject" :key="index">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="teachAreas" label="教学范围" width="80">
             <template slot-scope="scope">
              <p v-for="(item,index) in scope.row.teachAreas" :key="index">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="levelDict" label="层级" >
           <template slot-scope="scope">
             <span>{{scope.row.levelName}}</span>
           </template>
          </el-table-column>
          <el-table-column prop="avgLevel" label="相关评论" width="200">
            <template slot-scope="scope">
              <div class="avgLevel">
                <el-rate
                  v-model="scope.row.avgLevel"
                  disabled
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
                <span class="looks" @click="looks('avgLevel',scope.row)">详情</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="介绍" width="70">
            <template slot-scope="scope">
              <span class="looks" @click="looks('introduce',scope.row)">详情</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="考勤" width="70">
            <template slot-scope="scope">
              <span class="looks" @click="looks('Attendance',scope.row)">详情</span>
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
    <Introduce v-if="show1" :imgServer="imgServer" :data="teacher" @event="show1=$event"></Introduce>
    <Attendance v-if="show2" :data="teacher" @event="show2=$event"></Attendance>
    <Leave v-if="show3" :user="teacher"  @event="show3=$event" ></Leave>
  </div>
</template>
<script>
import SearchBar from '@/components/searchBar';
import { teacherList,searchLevel} from '@/api/teacher.js';
import { queryDict } from '@/api/index';
import Introduce from './components/introduce';
import Attendance from './components/attendance';
import Leave from './components/leave';
import { exportExcel } from '@/utils/exportExcel';
import { mapState } from 'vuex';
import LookImg from '@/components/lookImg.vue'
export default {
  data() {
    return {
      tableData: [],
      current: 1,
      size: 10,
      total: 0,
      show1: false,
      show2: false,
      show3:false,
      teacher: {},
      subject: [],
      teachAreas: [],
      imgServer:"",
      levelDictData:[]
    }
  },
  computed:{
    ...mapState(['agencyId'])
  },
  components: {
    SearchBar,
    Introduce,
    Attendance,
    Leave,
    LookImg
  },
  created() {
    // console.log(this.agencyId);
    this.save_searchLevel(this.$route.params.id)
    this.save_queryDict('subject');
    this.save_queryDict('teachAreas');
    // this.save_teacherList();
    
  },
  methods: {
    closeCom(province, city, search) {
      const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      // console.log(province, city, search);
      if(myreg.test(search) == true){
        this.save_teacherList('',search)
      }else{
        this.save_teacherList(search,'')
      }
      
    },
    save_exportExcel(id, name) {
      exportExcel(id, name)
    },
    save_searchLevel(id){
      searchLevel(id).then( res => {
        // console.log( res);
        if( res.code == 200){
          this.levelDictData = res.data;
          this.save_teacherList();
        }
      })
    },
    save_teacherList(name, phone) {
      teacherList({
        agencyId:this.$route.params.id, // 机构id
        current: this.current,
        name,
        phone,
        size: this.size
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list.records;
          this.total = res.data.list.total;
          this.imgServer  = res.data.imgServer
          this.tableData.forEach(element => {
            element.subject = this.arrDeep('subject', element.subjectDict);
            element.teachAreas = this.arrDeep( 'teachAreas',element.teachAreasDict);
            element.levelName = this.levelDictDatadeep(element.levelDict)
          });
          // console.log(this.tableData)
        }
      })
    },
    save_queryDict(name) {
      queryDict(`?groupType=${name}`).then(res => {
        if (res.code == 200) {
          this[name] = res.data
        }
      })
    },
    levelDictDatadeep(levelDict){
      let name;
      this.levelDictData.forEach( element => {
        if(element.levelDict === levelDict ){
          name = element.levelName
        }
      })
      return name
    },
    looks(name, data) {
      this.teacher = data
      if (name == 'introduce') {
        this.show1 = true
      }else if(name == 'avgLevel'){
        this.show3 = true;
      } else {
        this.show2 = true
      }
    },
    arrDeep(name, id) {
      let label = new Array()
      let idArr = id.split(',')
      // console.log(idArr)
      idArr.forEach(item => {
        if (item == '') {
          label.push('无')
        } else {
          this[name].forEach(element => {
            if (item == element.value) {
              label.push(element.label)
            }
          })
        }
      })
      // console.log(label)
      return label
    },
    handleSizeChange(val) {
      this.size = val
      this.save_adminList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.save_adminList()
    }
  }
}
</script>
<style lang="scss" >
.avgLevel {
  display: flex;
  justify-content: center;
}
.photo {
  height: 50px;
  width: 40px;
}
</style>