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
            <h4 class="tti" >{{user.name}}</h4>
            <el-rate
              v-model="user.avgLevel"
              disabled
              text-color="#ff9900"
              
            ></el-rate>
            <!-- <p>
              <span>联系人:</span>
              <span>{{user.name}}</span>
            </p> -->
            <p>
              <span>联系电话:</span>
              <span>{{user.phone}}</span>
            </p>
          </div>
          <div class="leave-ul">
            <div class="leave-li" v-for="(item,index) in leave" :key="index">
              <div class="leave-li-top">
                <div class="leave-li-top-left">
                  <span class="icon-name">
                    <img  :src="item.memberImage" alt />
                    {{item.memberName}}
                  </span>
                  <el-rate
                    v-model="item.starLevel"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                </div>
                <div class="time" >{{item.createTime}}</div>
              </div>
              <div class="leave-li-foot">
                <p>{{item.comment}}</p>
                <p>{{`来自：${item.courseName} 教师：${item.teacherName}`}}</p>
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
import { searchComment } from '@/api/teacher.js'
export default {
  props: {
    user: Object
  },
  data() {
    return {
      value: 3,
      current: 1,
      size:10,
      leave: [],
      agencyMsg:{},
      total:0,
      
    }
  },
  created() {
    // console.log(this.user)
    this.save_searchComment(1, this.user.id, 10)
  },
  methods: {
    cancel() {
      this.$emit('event', false)
    },
    save_searchComment(current, teacherId, size) {
      searchComment({
        agencyId: '',
        current: current,
        memberId: '',
        searchType: '1',  //排序类型,默认按 1.最新排序(即创建时间倒序) 2.最高评价 3最低评价
        size: size,
        teacherId: teacherId
      }).then(res => {
        // console.log(res);
        if( res.code == 200){
          this.leave = res.data.records;
          this.total = res.data.total;
        }
      })
    },
    handleSizeChange(val){
      this.save_searchComment(this.current,this.user.id, val)
    },
    handleCurrentChange(val){
      this.save_searchComment(val, this.user.id,this.size)
    },
  }
}
</script>

<style lang="scss"  >
#leave {
  .leave {
    width: 900px;
    margin-left: 120px;
    display: flex;
    .leave-information {
      width: 240px;
      height: 240px;
      box-sizing: border-box;
      border: 1px solid #e5e5e5;
      margin-right: 20px;
      padding: 15px;
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
            flex: 1;
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
