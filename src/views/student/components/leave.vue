<template>
  <div id="leave" class="childViews">
    <div class="addNotice-telit">
      <span>相关评价</span>
      <span class="buts but_c" @click="cancel()">返回</span>
    </div>
    <div class="addNotice-center">
      <div class="center-from">
        <div class="leave">
          <div class="leave-information">
            <!-- <el-tooltip class="item" effect="dark" :content="agencyMsg.agencyName" placement="top-start"> -->
              <h4 class="tti" >{{agencyMsg.agencyName}}</h4>
            <!-- </el-tooltip> -->
            
            <el-rate v-model="agencyMsg.avgLevel" disabled text-color="#ff9900"></el-rate>
            <p>
              <span>联系人:</span>
              <span>{{agencyMsg.agencyContacts}}</span>
            </p>
            <p>
              <span>联系电话:</span>
              <span>{{agencyMsg.agencyPhone}}</span>
            </p>
          </div>
          <div class="leave-ul">
            <div class="leave-li" v-for="(item,index) in leave" :key="index">
              <div class="leave-li-top">
                <div class="leave-li-top-left">
                  <span class="icon-name">
                    <img :src="item.memberImage" alt />
                    {{item.agencyName}}
                  </span>
                  <el-rate
                    v-model="item.starLevel"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                </div>
                <div class="time" >{{item.courseStartTime}}</div>
              </div>
              <div class="leave-li-foot">
                <p>{{item.comment}}</p>
                <p>{{`来自：${item.agencyName} 教师：${item.teacherName}`}}</p>
              </div>
            </div>
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
  </div>
</template>

<script>
import { queryEvaluatess, memberComment } from "@/api/student.js";
export default {
  props: {
    user: Object
  },
  data() {
    return {
      value: 3,
      current: 1,
      size: 10,
      leave: [],
      agencyMsg: {},
      total: 0
    };
  },
  created() {
    // console.log(this.user)
    this.save_memberComment(1, this.user.memberId, 10);
  },
  methods: {
    cancel() {
      this.$emit("event", false);
    },
    save_memberComment(current, memberId, size) {
      memberComment({
        agencyId: "",
        current: current,
        memberId: memberId,
        searchType: "1", //排序类型,默认按 1.最新排序(即创建时间倒序) 2.最高评价 3最低评价
        size: size,
        teacherId: ""
      }).then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.agencyMsg = res.data.agencyMsg[0];
          this.leave = res.data.page.records;
          this.total = res.data.page.total;
        }
      });
    },
    handleSizeChange(val) {
      this.save_memberComment(this.current, this.user.memberId, val);
    },
    handleCurrentChange(val) {
      this.save_memberComment(val, this.user.memberId, this.size);
    }
  }
};
</script>

<style lang="scss"  >
#leave {
  .leave {
    width: 900px;
    margin: 0 auto;
    display: flex;
    .leave-information {
      width: 240px;
      height: 240px;
      box-sizing: border-box;
      border: 1px solid #e5e5e5;
      margin-right: 20px;
      padding: 15px;
      h4 {
        width: 220px;
        box-sizing: border-box;
        // padding: 10px;
        // 省略号
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tti:hover{
        overflow: auto;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        white-space: pre-line;
        // 换行显示
        text-align: justify;
        text-justify: newspaper;
        word-break: break-all;
        cursor: pointer;
      }
      
      .el-rate {
        margin: 30px 0 30px 0;
        .el-rate__icon {
          font-size: 28px;
        }
      }
      p {
        color: #757575;
        font-size: 14px;
      }
    }
    .leave-ul {
      flex: 1;
      //   border-left: 1px solid #e5e5e5;
      box-sizing: border-box;
      padding: 15px;
      .leave-li {
        padding-bottom: 15px;
        margin-bottom: 40px;
        border-bottom: 1px solid #c2c2c2;
        .leave-li-top {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          .leave-li-top-left {
            display: flex;
            align-items: center;
            .icon-name {
              display: flex;
              align-items: center;
              margin-right: 25px;
              img {
                margin-right: 8px;
                height: 60px;
                width: 45px;
              }
            }
            .el-rate{
              width: 200px;
            }
            .el-rate__icon {
              font-size: 22px;
            }
          }
          .time{
            width: 200px;
          }
        }
        p {
          color: #757575;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
