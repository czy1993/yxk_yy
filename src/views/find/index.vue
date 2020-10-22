<template>
  <div id="find" class="view-center">
    <div class="right-bus">
      <span
        :class="['buts', status=='2'?'but_b':'but_c']"
        @click="save_adminList('2')"
      >{{`已审核(${approved})`}}</span>
      <span
        :class="['buts', status=='1'?'but_b':'but_c']"
        @click="save_adminList('1')"
      >{{`待审核(${approval})`}}</span>
    </div>
    <div class="main-view">
      <div class="find-li" v-for="(item,index) in findData" :key="index" @click="lookDetails(item)">
        <div class="imgs">
          <img :src="item.image" alt />
        </div>
        <div class="texts">
          <h4>{{item.createLcuName}}</h4>
          <p v-html="item.describes"></p>
          <p>{{item.title}}</p>
          <div v-if="item.status =='2'">
            <span class="buts but_c" @click.stop="revoke(item.id)">撤销</span>
          </div>
        </div>
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
    <Pupops v-if="show1" @event1="show1=$event">
      <div slot="titlt">撤销</div>
      <div slot="content">
        <p class="popups-p">确定执行此操作吗？</p>
      </div>
      <div slot="foot">
        <button class="table_but_b" @click="show1=false">取消</button>
        <button @click="save_updateStatus('1')">确定</button>
      </div>
    </Pupops>
    <FindDetails v-if="show2" :id="id" @event="show2=$event"></FindDetails>
  </div>
</template>
<script>
import Pupops from "@/components/pupops";
import { adminList, updateStatus, approveNumber } from "@/api/find.js";
import FindDetails from "./components/findDetails";
export default {
  data() {
    return {
      findData: [
        {
          url: "",
          name: "暑期夏令营",
          text: "炎炎夏日，清爽一夏，就在暑期夏令营"
        }
      ],
      show1: false,
      show2: false,
      id: "",
      size: 10,
      current: 1,
      total: 0,
      status: "2",
      approval: 0,
      approved: 0
    };
  },
  components: {
    Pupops,
    FindDetails
  },
  created() {
    this.save_adminList("2");
    this.save_approveNumber();
  },
  methods: {
    save_adminList(status) {
      // status状态 1-已提交 2-审核通过 3-审核失败
      this.status = status;
      adminList(
        `?current=${this.current}&size=${this.size}&status=${this.status}`
      ).then(res => {
        if (res.code == 200) {
          this.findData = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    revoke(id) {
      this.show1 = true;
      this.id = id;
    },
    save_approveNumber() {
      approveNumber().then(res => {
        if (res.code == 200) {
          this.approval = res.data.approval;
          this.approved = res.data.approved;
        }
      });
    },
    save_updateStatus(status) {
      updateStatus(`?id=${this.id}&status=${status}`).then(res => {
        if (res.code == 200) {
          this.$message({
            message: "撤销成功",
            type: "success",
            onClose: () => {
              this.save_adminList("2");
              this.save_approveNumber();
            }
          });
          this.show1 = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    lookDetails(data) {
      this.show2 = true;
      this.id = data.id;
    },
    handleSizeChange(val) {
      this.size = val;
      this.save_adminList(this.status);
    },
    handleCurrentChange(val) {
      this.current = val;
      this.save_adminList(this.status);
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
#find {
  min-width: 1100px;
  .find-li {
    float: left;
    width: 27%;
    min-width: 280px;
    margin-right: 8.3333%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    box-shadow: 0px 0px 1px 1px #e5e5e5;
    @include unitBlockHover;
    .imgs {
      width: 100%;
      height: 260px;
      display: flex;
      align-items: center;
      justify-content: center;
      //  border: 1px solid #e5e5e5;
      img {
        width: 100%;
        max-height: 260px;
      }
    }
    .texts {
      border: 1px solid #e5e5e5;
      box-sizing: border-box;
      padding: 15px 15px 15px 15px;
      position: relative;
      h4 {
        margin: 0;
        line-height: 30px;
      }
      p {
        font-size: 13px;
        color: #757575;
        line-height: 20px;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      div {
        border: 0;
        padding: 0;
        span {
          float: right;
          border-radius: 30px;
          z-index: 1;
        }
      }
    }
  }
  .find-li:nth-child(3n + 3) {
    margin-right: 0%;
  }
  .popups-p {
    text-align: center;
    line-height: 50px;
  }
}
</style>