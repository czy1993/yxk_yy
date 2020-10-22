<template>
  <div class="finance">
    <div id="finance" style="width: 1000px;height:360px;"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { financeData } from '@/api/data'
export default {
  data() {
    return {
      date: [],
      income:[],
      orderCount:[],
      refund:[]
    }
  },
  mounted() {
    this.save_financeData();
  },
  methods: {
    save_financeData() {
      let data
      financeData().then(res => {
        // console.log(res.data.date)
        this.date = res.data.date;
         this.income = res.data.income;
         this.orderCount = res.data.orderCount;
         this.refund = res.data.refund;
         this.financeEcharts(this.date,this.income,this.orderCount,this.refund)
      });
      
      
    },
    financeEcharts(date,income,orderCount,refund) {
      
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('finance'), 'light')

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '财务数据',
          top: '0%',
          left: 'center'
        },
        tooltip: {
          trigger:"axis"
        },
        legend: {
          bottom: '0%',
          // data: ['deal', 'refund', 'new']
        },
        xAxis: {
          type: 'category',
          data: date
        },
        yAxis: {
          // data:[0,20,40,60]
        },
        series: [
          {
            name: '成交金额',
            type: 'line',
            data: income
          },
          {
            name: '成交订单量',
            type: 'line',
            data: orderCount
          },
          {
            name: '退款金额',
            type: 'line',
            data: refund
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
.finance {
  width: 96%;
  min-width: 800px;
  height: 400px;
  margin: 0 auto 20px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>