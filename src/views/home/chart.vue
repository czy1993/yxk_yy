<template>
  <div id="mains" style="width: 1000px;height: 400px;"></div>
</template>
<script>
import echarts from 'echarts'
import Utils from '@/utils/deep'
export default {
  props: {
    datas: Array,
    options: Array,
    eachrName: String,
    date:Array
  },
  data() {
    return {
      charts: '',
      series: [],
      text: '全部数据'
    }
  },
  created() {
    // console.log(this.)
  },
  methods: {
    drawPie(id,series) {
      this.charts = echarts.init(document.getElementById(id), 'light')
      this.charts.setOption({
        title: {
          text: this.text
        },
        grid: [
          {
            left: '10%',
            right: '8%',
            height: '70%'
          },
          {
            left: '10%',
            right: '8%',
            bottom: '0%',
            height: '15%'
          }
        ],
        tooltip: {
          trigger:"axis"
        },
        legend: {
          bottom: '0%',
          // data: ['1的指数', '2的指数', '3的指数']
        },
        xAxis: {
          type: 'category',
          name: '',
          splitLine: { show: false },
          data: this.date
        },
        yAxis: {
          type: 'value',
          name: ''
        },
        series: series
        // series: [
        //     {
        //         name: '3的指数',
        //         type: 'line',
        //         data: [14000, 12000, 1000, 1500, 6000, 3500]
        //     },
        //     {
        //         name: '2的指数',
        //         type: 'line',
        //         data: [0, 500, 2000, 12500, 4500, 4000]
        //     },
        //     {
        //         name: '1的指数',
        //         type: 'line',
        //         data: [1600, 4500, 200, 8500, 7500, 300]
        //     },
        // ]
      })
    },
    seriesDeep(value, datas, options) {
      
      let that = this
      that.series = [];
      // console.log(datas)
      // console.log(options)
      // console.log(that.series);
      let dataIndex = [];
      let data = Utils.deepCopy(options)
      if (value == '') {
        data.forEach((element, index) => {
          that.text = '全部'
          element.data = this.datas[index-1]
        })
        that.series = data.slice(1);
        this.drawPie('mains',that.series)
      } else{
        data.forEach((element, index) => {
          if(element.value == value){
            that.text = element.name;
            dataIndex= data[index];
            dataIndex.data = this.datas;
          }
        })
        that.series = [dataIndex];
        this.drawPie('mains',that.series)
      }
      // console.log(that.series);
      
    }
  },
  //调用
  mounted() {
    // setTimeout( ()=>{
      this.seriesDeep(this.eachrName, this.datas, this.options)
    // },100)
    
  },
  watch: {
    eachrName(value) {
      this.seriesDeep(value, this.datas, this.options)
    }
  }
}
</script>
<style scoped>
</style>