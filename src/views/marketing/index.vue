<template>
  <div class="view-center searchViews">
    <div class="right-bus">
      <!-- <span class="buts but_c" @click="popShow=false">关闭菜单</span> -->
      <span class="buts but_b" @click="$router.push('/advertisement')">新增</span>
      <span class="buts but_c" v-show="!dismount" @click="dismount=!dismount">下架</span>
      <span class="buts but_c" @click="offShelf" v-show="dismount">确定下架</span>
      <span class="buts but_c" @click="cancel" v-show="dismount">取消</span>
    </div>
    <div class="main-view">
      <div class="searchViews-center" >
         <el-table
         style="width: 100%" 
        ref="multipleTable"
        :data="advertiseList"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop='launchStatus' v-if="dismount==true" type="selection" :selectable="selectable" width="60"></el-table-column>
        <el-table-column prop="id" label="序号" width="80">
          <template slot-scope="scope">
              <span>{{advertiseList.indexOf(scope.row)+1}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="name" label="相关资料" width="80">
          <template slot-scope="scope">
            <span class="looks" @click="look_over(scope.row.id)">查看</span>
          </template>
        </el-table-column>
        <el-table-column prop="pageAreas" label="投放位置"></el-table-column>
        <el-table-column label="投放区域">
          <template slot-scope="scope">
            <p>{{scope.row.province.split(',')[1]}}</p>
            <p>{{scope.row.city.split(',')[1]}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="launchStartTime" label="投放开始时间" width="170"></el-table-column>
        <el-table-column prop="launchStopTime" label="投放结束时间" width="170"></el-table-column>
        <el-table-column prop="agencyName" label="来源"></el-table-column>
        <el-table-column prop="showNumStr" label="展现量"></el-table-column>
        <el-table-column prop="practicalPrice" label="费用"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              @click="toPath(scope.row)"
              v-if="scope.row.launchStatus == '4'"
              class="buts buts_0"
            >待编辑</span>
            <span v-if="scope.row.launchStatus == '1'" class="buts buts_1">待投放</span>
            <span v-if="scope.row.launchStatus == '2'" class="buts buts_2">投放中</span>
            <span v-if="scope.row.launchStatus == '3'" class="buts buts_3">投放完成</span>
          </template>
        </el-table-column>
      </el-table>
      </div>
     
    </div>
    <Pupops v-show="popShow" @event1="get_types($event)">
      <div slot="titlt">查看相关资料</div>
      <div slot="content" class="popup-content">
        <div class="content-view">
          <span class="name">期望投放范围</span>
          <div class="name-value">
            <el-input class="address-input" v-model="datas.province" placeholder="省"></el-input>
            <el-input class="address-input" v-model="datas.city" placeholder="市"></el-input>
            <!-- <el-input class="address-input" v-model="datas.area" placeholder="区"></el-input> -->
          </div>
        </div>
        <!-- <div class="content-view">
          <span class="name">期望投放范围</span>
          <div class="name-value">
            <p>{{datas.range}}</p>
          </div>
        </div>-->
        <div class="content-view uploard-view">
          <span class="name">投放素材</span>
          <div class="name-value source-material">
            <div class="uploard">
              <img  class="imgs" @click="double(datas.image)"  v-show="datas.image" :src="datas.image" alt />
              <div class="file">
                <img src="../../../static/img/icon/ico_uppic.png" alt />
                <input ref="license" @change="save_uploadSingle('license')" type="file" />
              </div>
            </div>
            <div class="tips">
              <p>广告素材标准：XXX像素*XXX像素</p>
              <p>不得包含违法内容...</p>
            </div>
          </div>
        </div>
        <div class="content-view">
          <div class="content-view-foot">
            <span class="name">学习科目报价</span>
            <p>{{(datas.price==null?'0':datas.price)+'元'}}</p>
          </div>
          <div class="content-view-foot">
            <span class="name">联系方式</span>
            <p>{{datas.phone}}</p>
          </div>
        </div>
      </div>
    </Pupops>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <LookImg v-if="show1" :url="url" @event1="show1=$event"></LookImg>
  </div>
</template>
<script>
import Pupops from "@/components/pupops.vue";
import LookImg from "@/components/lookImg.vue";
import { mapActions, mapState, mapMutations } from "vuex";
import { advertTmage } from "@/api/marketing.js";
import { uploadSingle } from '@/api/index.js';
import Utils from "@/utils/deep.js";
export default {
  data() {
    return {
      details: {},
      dismount: false,
      popShow: false,
      show1: false,
      url: "",
      datas: {
        province: "湖北省",
        city: "武汉市",
        area: "洪山区",
        range: "语文，数学",
        offer: "1000",
        phone: "13323232323"
      },
      currentPage: 1,
      total: 0,
      size: 10,
      height: "100%",
      multipleSelection: [],
      province: "",
     
    };
  },
  computed: {
    ...mapState(["advertiseList"]),
    advertiseIds() {
      return this.multipleSelection
        .reduce((acc, cur) => {
          acc.push(cur.id);
          return acc;
        }, [])
        .join(",");
    }
  },
  mounted() {
    window.onresize = () => {
      this.height = "100%";
    };
  },
  created() {
    this.initAdvertise();
  },
  components: {
    Pupops,
    LookImg
  },
  methods: {
    ...mapActions([
      "queryAdminAdvert",
      "queryAdminAdvertById",
      "removeAdminAdvertById"
    ]),
    ...mapMutations(["SAVE_MARKETING"]),
    double(url){
      this.url = url;
      this.show1 = true;
    },
    save_uploadSingle(name){
      let dataFoles, files;
      let REG = /\\/g;
      dataFoles = this.$refs[name].files;
      if (dataFoles.length != 0) {
        files = dataFoles[0];
        let formData = new FormData();
        formData.append("file", files);
        // this.save_advertTmage(this.datas.id,formData)
        uploadSingle(formData, "agency").then(res => {
          if (res.code == 200) {
            this.url = Utils.getObjectURL(this.$refs[name].files[0]);
            this.save_advertTmage(this.datas.id,res.data.url)
          } else {
            this.$message.error("上传失败");
          }
        });
      }
    },
    save_advertTmage(id, image) {
      advertTmage(`id=${id}&image=${image}`).then(res => {
        if( res.code == 200 ){
          
          this.open(id)
        }
      });
    },
    open(id) {
        this.$confirm('确定更换广告素材吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '更改成功!',
            onClose:()=>{
              this.province = false;
              this.datas.image = this.url;
              // this.look_over(id)
            }
          });
        }).catch(() => {          
        });
    },
    get_types(type) {
      this.popShow = type;
    },
    initAdvertise() {
      this.query(this.currentPage, this.size);
    },
    query(page, size) {
      this.queryAdminAdvert({
        current: page,
        size: size
      }).then(res => {
        this.total = res.data.total;
      });
    },
    toPath(data) {
      // console.log(data);
      this.SAVE_MARKETING(data);
      this.$router.push({
        path: "/advertisement",
        query: {
          status: "4",
          data: JSON.stringify(data)
        }
      });
      // @click="$router.push({path:'/advertisement',query:{status:scope.row.launchStatus,data:JSON.stringify(scope.row)}})"
    },
    look_over(id) {
      if (!this.details[id]) {
        this.queryAdminAdvertById(id).then(res => {
          if (res.code == 200) {
            this.datas = res.data;
            this.details[id] = res.data;
            this.datas.province =
              this.datas.province.split(",")[1] == "null"
                ? this.datas.province.split(",")[0]
                : this.datas.province.split(",")[1];
            this.datas.city =
              this.datas.city.split(",")[1] == "null"
                ? this.datas.city.split(",")[0]
                : this.datas.city.split(",")[1];
          }
        });
      } else {
        this.datas = this.details[id];
      }
      this.popShow = true;
    },
    handleSizeChange(size) {
      this.size = size;
      this.currentPage = 1;
      this.query(1, size);
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.query(page, this.size);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(val)
    },
    selectable(row, index){
      if(row.launchStatus=='3' || row.launchStatus=='4' ){
        return false
      }else{
        return true
      }
    },
    //取消下架
    cancel() {
      this.$refs.multipleTable.clearSelection();
      this.dismount = !this.dismount;
    },
    //下架
    offShelf() {
      if (this.multipleSelection.length > 0) {
        this.removeAdminAdvertById(this.advertiseIds).then(res => {
          if (res.code === 200) {
            this.$message.success({
              message: "下架成功！",
              duration: 1000,
              onClose: () => {
                this.query(this.currentPage, this.size);
              }
            });
          }
        });
      } else {
        this.$message.error({
          message: "请至少勾选一个广告"
        });
      }
    }
  }
};
</script>
<style lang="scss" >
@import "@/styles/mixin.scss";
.looks {
  color: #45d9a6;
  cursor: pointer;
}
.popup-content {
  .content-view {
    display: flex;
    align-items: center;
    height: auto;
    margin-bottom: 20px;
    .name {
      width: 120px;
      color: #000;
    }
    .name-value {
      display: flex;
      align-items: center;
      .address-input {
        width: 100px;
        margin-right: 10px;
      }
    }

    .content-view-foot {
      width: 50%;
      display: flex;
      align-items: center;
      line-height: 30px;
      .name {
        width: auto;
        margin-right: 10px;
      }
    }
  }
  .uploard-view {
    .name-value {
      align-items: flex-start !important;
    }
    .source-material {
      height: 160px;
      flex: 1;
      flex-direction: column;
      justify-content: flex-start;

      .uploard {
        height: 90px;
        width: 400px;
        display: flex;
        // justify-content: flex-start;
        align-items: baseline;
        // border: 1px solid #d9e6e2;
        border-radius: 7px;
        margin-right: 15px;
        box-sizing: border-box;
        margin-bottom: 6px;
        @include bgImage;
        .imgs {
          height: 90px;
          width: 90px;
          border-radius: 7px;
          margin-right: 10px;
        }
        .file {
          height: 90px;
          width: 90px;
          border-radius: 7px;
          position: relative;
          z-index: 1;
          img {
            height: 90px;
            width: 90px;
            border-radius: 7px;
          }
          input {
            position: absolute;
            left: 0;
            top: 0;
            height: 90px;
            width: 90px;
            opacity: 0;
          }
        }
        // p {
        //   font-size: 13px;
        //   color: #00ae78;
        // }
      }
      p {
        line-height: 20px;
        font-size: 13px;
        color: #a6a6a6;
      }
    }
  }
}
</style>