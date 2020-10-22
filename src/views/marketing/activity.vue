<template>
  <div id="activity" class="view-center">
    <div class="right-bus">
      <span class="buts but_b" @click="shows()">发布新活动</span>
      <span class="buts but_c" @click="dialogShow = false" >返回</span>
    </div>
    <div class="main-view">
      <div class="activity">
        <div @click="extend(index)" class="activityCard" v-for="(item,index) in activityList" :key="index">
          
          <div>
            <div class="_picture" :style="{backgroundImage:`url(${item.image})`}">

            </div>
            <!-- <img style="width:100%;height:100px;" :src="item.image" alt> -->
            <h4>{{item.title}}</h4>
            <p>{{item.introduce}}</p>
            <p>{{item.startTime +' - ' + item.endTime}}</p>
          </div>
        </div>
      </div>
    </div>
    <AddActivity v-show="show1" @event="childFun"></AddActivity>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <ec-dialog v-model="dialogShow">
      <div class="_content" v-if="activityList.length>0">
        <div class="_picture" :style="{background:`url(${activityList[index].image})  center/100% 100% no-repeat`,height:'300px'}"></div>
        <!-- <img :src="activityList[index].image" alt> -->
        <h3>{{activityList[index].title}}</h3>
        <article>{{activityList[index].content}}</article>
      </div>
    </ec-dialog>
  </div>
</template>
<script>
import AddActivity from "./components/addActivity";
import { mapActions, mapState } from "vuex";
import EcDialog from "@/components/EducationDialog.vue";
export default {
  data() {
    return {
      currentPage: 1,
      size: 10,
      total: 1,
      show1: false,
      dialogShow: false,
      index: 0
    };
  },
  computed: {
    ...mapState(["activityList"])
  },
  created() {
    this.initActivity();
  },
  components: {
    AddActivity,
    EcDialog
  },
  methods: {
    ...mapActions(["queryAdminActivity"]),
    shows() {
      this.show1 = true;
      this.dialogShow = false;
    },
    childFun(type) {
      this.show1 = type;
      this.initActivity();
    },
    query(page, size) {
      this.queryAdminActivity({
        current: page,
        size: size
      }).then(res => {
        this.total = res.data.total;
      });
    },
    initActivity() {
      this.query(1, 10);
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
    extend(num) {
      this.dialogShow = true;
      this.index = num;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
#activity {
  .main-view {
    .activity {
      min-width: 900px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      // justify-content: space-between;
      .activityCard {
        display: flex;
        // flex-direction: column;
        justify-content: center;

        width: 28%;
        min-width: 300px;
        margin-right: 30px;
        margin-bottom: 15px;
        cursor: pointer;
        @include unitBlockHover;
        ._picture{
          height: 200px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border: 0;
        }
        div {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #e5e5e5;
          padding: 10px 15px;
          h4 {
            padding: 10px 0;
            margin: 0;
          }
          p {
            line-height: 24px;
            font-size: 14px;
            color: #757575;
          }
        }
      }
    }
  }
  ._content {
    width: 700px;
    margin: auto;
    text-align: center;
    h3 {
      text-align: center;
      margin-bottom: 30px;
    }
  }
}
</style>