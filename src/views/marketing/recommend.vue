<template>
  <div id="recommend" class="view-center searchViews">
    <div class="main-view">
      <SearchBar :type="0" @event1="query">
        <template v-slot:exportExcel>
          <div class="searchBar-right">
            <span class="buts but_b" @click="save_exportExcel('recommendExce','推荐管理')">导出Excel</span>
          </div>
        </template>
      </SearchBar>
      <div class="searchViews-center">
        <el-table :data="recommendList" border id="recommendExce">
          <el-table-column prop="index" label="序号" width="60">
            <template slot-scope="scope">
              <span>{{recommendList.indexOf(scope.row)+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="课程名称"></el-table-column>
          <el-table-column prop="subjectDict" label="科目" width="100"></el-table-column>
          <el-table-column prop="agencyName" label="机构"></el-table-column>
          <el-table-column prop="contacts" label="联系人" width="100"></el-table-column>
          <el-table-column prop="phone" label="联系方式" width="170"></el-table-column>
          <el-table-column prop="pageView" label="浏览量" width="100"></el-table-column>
          <el-table-column prop="orderNum" label="近30天机构交易量(单)"></el-table-column>
          <el-table-column prop="evaluate" label="机构评价" width="173">
            <template slot-scope="scope">
              <el-rate
                :value="Number( Math.round(scope.row.starLevel)) "
                disabled
                show-score
                text-color="#ff9900"
              ></el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="hot" label="状态" width="120">
            <template slot-scope="scope">
              <span
                v-if="scope.row.hotStatus === '1'"
                class="buts buts_0"
                @click="popShow=true;courseId=scope.row.id"
              >加入热门</span>
              <span @click="open(scope.row.id)" v-else class="buts buts_2">移除热门</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <Pupops v-show="popShow" @event1="get_types($event)">
      <div slot="titlt">加入热门</div>
      <div slot="content">
        <div class="recommend-popup">
          <el-radio v-model="hotRadio" label="2">首页热门</el-radio>
          <el-radio v-model="hotRadio" label="3">科目热门</el-radio>

          <!-- <el-checkbox v-model="radio" size="small">首页热门</el-checkbox>
          <el-checkbox v-model="radio" size="medium">科目热门</el-checkbox>-->
        </div>
      </div>
      <button @click="submit" slot="foot">确认</button>
    </Pupops>
  </div>
</template>
<script>
import Pupops from "@/components/pupops";
import SearchBar from "@/components/searchBar";
import { mapActions, mapState } from "vuex";
import {  exportExcel } from "@/utils/exportExcel";
export default {
  data() {
    return {
      province: "",
      city: "",
      popShow: false,
      hotRadio: "2",
      courseId:'1'
    };
  },
  computed: {
    ...mapState(["recommendList"])
  },
  created() {
    this.initRecommendList();
  },
  components: {
    Pupops,
    SearchBar
  },
  methods: {
    ...mapActions(["queryHotCourse", "setHotCourse"]),
    save_exportExcel(id,name){
      exportExcel(id,name)
    },
    get_types(type) {
      this.popShow = type
    },
    closeCom(province,city){
     
      this.popShow = type;
    },
    initRecommendList() {
      this.query("", "");
    },
    query(province, city) {
      this.province = province;
      this.city = city;
      this.queryHotCourse({ province, city });
    },
    removeHot(id) {
      this.setHotCourse({
        courseId: id,
        hotCode: "1"
      }).then(res => {
        if (res.code === 200) {
          this.$message.success({
            message: "移除热门成功！",
            duration: 1000,
            onClose: () => {
              this.query(this.province, this.city);
            }
          });
        }
      });
    },
     open(id) {
        this.$confirm('确定要 移除热门 吗?, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.removeHot(id)
        }).catch(() => {
             
        });
      },
    submit() {
      this.setHotCourse({
        courseId: this.courseId,
        hotCode: this.hotRadio
      }).then(res => {
        if (res.code === 200) {
          this.$message.success({
            message: "加入热门成功！",
            duration: 1000,
            onClose: () => {
              this.popShow=false;
              this.query(this.province, this.city);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
#recommend {
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #00ae78;
    background: #00ae78;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #606266;
  }
}
</style>

<style lang="scss" scoped>
#recommend {
  .main-view {
    display: flex;
    flex-direction: column;
    background: #f7f7f7;
    padding: 0;
    .recommend-header {
      height: 80px;
      background: #fff;
      box-sizing: border-box;
      border-bottom: 1px solid #eceef1;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      padding: 0 40px;
      font-size: 15px;
      .el-select {
        width: 140px;
        margin-left: 15px;
      }
      span {
        color: #000;
      }
      p {
        margin-left: 80px;
        color: #00ae78;
        font-weight: 700;
      }
    }
  }
  .recommend-popup {
    height: 120px;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
  }
}
</style>