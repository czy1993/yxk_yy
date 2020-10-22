<template>
  <div class="componentsView">
    <div class="cmp-view-header">
      <div class="echart-name"></div>
      <div class="echart-search"></div>
    </div>
    <div class="cmp-view-center">
      <div class="search-view">
        <div id="operate" style="width: 520px;height:360px;"></div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { operations } from "@/api/data.js";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "活动一"
        }
      ],
      value: "",
      value1: "",
      android: [],
      date: [],
      dealNumber: [],
      dealPrice: [],
      h5: [],
      ios: []
    };
  },
  created() {
    
  },
  mounted() {
    this.save_operations();
  },
  methods: {
    save_operations() {
      operations().then(res => {
        if( res.code == 200){
          this.android = res.data.android;
          this.date = res.data.date;
          this.dealNumber = res.data.dealNumber;
          this.dealPrice = res.data.dealPrice;
          this.h5 = res.data.h5;
          this.ios = res.data.ios;
          this.mechanismEcharts();
        }
      });
    },
    mechanismEcharts() {
      // this.save_operations()
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("operate"), "light");

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "平台运营数据"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          bottom: "0%",
         
        },
        xAxis: {
          type: "category",
           data: this.date
        },
        yAxis: {
           
        },
        series: [
          {
            name: "安卓",
            type: "line",
            data: this.android
          },{
            name: "交易量",
            type: "line",
            data: this.dealNumber
          },{
            name: "交易金额",
            type: "line",
            data: this.dealPrice
          },{
            name: "H5",
            type: "line",
            data: this.h5
          },{
            name: "IOS",
            type: "line",
            data: this.ios
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped >
@import "@/styles/echart-components.scss";
</style>