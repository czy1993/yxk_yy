<template>
  <div class="view-center">
    <div class="right-bus">
      <span class="buts but_b" @click="addNodice('新的通知','1')">新的通知</span>
      <span class="buts but_c">返回</span>
    </div>
    <div class="main-view">
      <el-table  :data="noticeList" border>
        <el-table-column prop="id" label="序号" width="80">
          <template slot-scope="scope">
               <span>{{noticeList.indexOf(scope.row)+1}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="title" label="通知名称"></el-table-column>
        <el-table-column prop="area" label="发布地域">
          <template slot-scope="scope" >
            <span>{{province_list[scope.row.area.split(',')[0]]}}</span>
            <span>{{city_list[scope.row.area.split(',')[1]]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="launchChannel" label="投放渠道"></el-table-column>
        <el-table-column prop="content" label="通知内容"></el-table-column>
        <el-table-column prop="publishTime" label="发布时间"></el-table-column>
        <el-table-column prop="state" label="操作">
          <template slot-scope="scope">
            <span class="looks" @click="editshows('编辑通知',scope.row,'2')">编辑</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddNotice :data="noticeData" :id="id" :type="type" v-if="show1" :name="name" @event="childFun"></AddNotice>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import AddNotice from "./components/addNotice";
import { mapActions, mapState } from "vuex";
import { province_list, city_list } from "@/utils/area";
export default {
  data() {
    return {
      show1: false,
      name: "新增编辑",
      currentPage: 1,
      size: 10,
      total: 1,
      height: "100%",
      type: "1",
      id: "",
      noticeData: {},
      province_list,
      city_list
    };
  },
  computed: {
    ...mapState(["noticeList"])
  },
  created() {
    console.log(this.city_list,this.province_list)
    this.initNoticeList();
  },
  mounted() {
    window.onresize = () => {
      this.height = "100%";
    };
  },
  components: {
    AddNotice
  },
  methods: {
    ...mapActions(["queryAdminNotice"]),
    editshows(name, data, type) {
      this.show1 = true;
      this.name = name;
      this.type = type;
      this.id = data.id;
      this.noticeData=data;
    },
    addNodice(name, type) {
      this.show1 = true;
      this.name = name;
      this.type = type;
       this.noticeData={}
    },
    childFun(type) {
      this.show1 = type;
      this.initNoticeList();
    },
    initNoticeList() {
      this.query(1, 10);
    },
    query(page, size) {
      this.queryAdminNotice({
        current: page,
        size: size
      }).then(res => {
        this.total = res.data.total;
      });
    },
    handleSizeChange(size) {
      this.size = size;
      this.currentPage = 1;
      this.query(1, size);
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.query(page, this.size);
    }
  }
};
</script>