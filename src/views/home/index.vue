<template>
  <div id="home">
    <div class="view-top">
      <div class="view-name">昨日关键数据</div>
      <div>
        <el-select v-model="value" @change="arrChange" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="view-top home-data">
      <span>成交订单：{{yesterdayData.orderCount}}</span>
      <span>申请退款订单：{{yesterdayData.refundOrder}}</span>
      <span>成交金额：{{yesterdayData.income}}</span>
      <span>新注册用户：{{yesterdayData.newUser}} (已注册总人数：{{yesterdayData.userTotal}}) </span>
      <span>新增机构：{{yesterdayData.newAgency}}</span>
     
    </div>
    <div class="home-centent">
      <chart :datas="eachrtData" :options="options" :eachrName='eachrName' :date="date"></chart>
    </div>
  </div>
</template>
<script>
import chart from './chart'
import RouterHistory from '@/components/historyRouter'
import { getAccountInfo } from '@/utils/auth'
import { homeData,yesterdayData } from '@/api/data'
import Utils from '@/utils/deep'
export default {
  data() {
    return {
      options: [
        
        {
          name: '成交订单',
          type: 'line',
          value: 'orderCount',
          data:[],
        },
        {
          name: '申请退款金额',
          type: 'line',
          value: 'refund',
          data:[],
        },
        {
          name: '成交金额',
          type: 'line',
          value: 'income',
          data:[],
        },
        {
          name: '新注册用户',
          type: 'line',
          value: 'newUser',
          data:[],
        },
        {
          name: '新增机构',
          type: 'line',
          value: 'newAgency',
          data:[],
        },
        {
          name: '申请退款订单',
          type: 'line',
          value: 'refundOrder',
          data:[],
        },{
          name: '全部',
          type: 'line',
          value: '',
          data:[],
        },
      ],
      value: 'orderCount',
      yesterdayData: {},
      datas: [],
      eachrtData: [],
      eachrName:'',
      date:[]
    }
  },
  created() {
    let user = getAccountInfo()
    this.save_homeData(user.id);
    this.save_yesterdayData(user.id)
  },
  components: {
    chart,
    RouterHistory
  },
  mounted(){

  },
  methods: {
    save_homeData(id) {
      homeData(`?userId=${id}`).then(res => {
        if (res.code == 200) {
          this.datas = res.data
          
          this.eachrtData = this.arrEcah('orderCount')
        }
      })
    },
    arrChange(value) {
      this.eachrtData = this.arrEcah(value)
    },
    arrEcah(value) {
      console.log(value)
      this.eachrName = value;
      let data = Utils.deepCopy(this.datas)
      let objs = {}
      let arr = [];
      this.date = [];
      data.forEach((element, index) => {
        this.date.push(element.date);
        // console.log(this.date)
        if (value != '') {
          for (let key in element) {
            if (key == value) {
              arr.push(element[key])
            }
          }
        } else {
          let arrEW = [];
          for (let key in element) {
            if (key != 'date') {
              arrEW.push(element[key])
            }
          }
          arr.push(arrEW)
        }
      })
      return arr
    },
    save_yesterdayData(id){
      yesterdayData(`userId=${id}`).then( res => {
        if(res.code == 200){
          this.yesterdayData = res.data;
        }
        
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#home {
  // margin-top: -55px;
  width: 100%;
  .view-top {
    margin-bottom: 0;
  }
  .home-data {
    display: flex;
    justify-content: left;
    border-top: 1px solid #eceef1;
    border-bottom: 1px solid #eceef1;
    background: #fff;
    font-size: 14px;
    margin-bottom: 12px;
    span {
      margin-right: 25px;
    }
  }
  .home-centent {
    min-height: 200px;
    padding: 30px 0;
    border-top: 1px solid #eceef1;
    border-bottom: 1px solid #eceef1;
    background: #fff;
    display: flex;
    justify-content: center;
  }
}
</style>