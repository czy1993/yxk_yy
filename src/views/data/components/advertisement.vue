<template>
  <div class="componentsView">
    <div class="cmp-view-header">
      <div class="echart-name"></div>
      <div class="echart-search">
        <el-select v-model="value" placeholder="请选择">
          <el-option
              v-for="(item,index) in advertiseList"
              :key="index"
              :label="item.page"
              :value="item.page"
            ></el-option>
        </el-select>
      </div>
    </div>
    <div class="cmp-view-center">
      <div class="search-view">
        <div id="advertisement" style="width: 440px;height:360px;"></div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { putting } from "@/api/data.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      advertiseList: [],
      value: "",
      value1: "",
      advertDeal:"",
      advertHit: "",
      advertShow: ""
    };
  },
  mounted() {
    this.initAdvertise()
    this.save_putting('首页1')
    
  },
  methods: {
    ...mapActions([ "querySubDict"]),
    save_putting(name) {
      let data;
      data =
      putting( `advertLocation=${name}`).then(res => {
        if (res.code == 200) {
          this.advertDeal = res.data.advertDeal;
          this.advertHit = res.data.advertHit
          this.advertShow = res.data.advertShow
        }
        this.mechanismEcharts();
      });
    },
    initAdvertise() {
      this.querySubDict().then(res => {
        if (res.code === 200) {
          this.advertiseList = res.data;
        }
      });
    },
    mechanismEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(
        document.getElementById("advertisement"),
        "light"
      );

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "广告投放"
        },
        legend: {
          // data: ['交易量','点击量','展现量']
        },
        tooltip: {
          // trigger: "axis"
        },
        series: [
          {
            name:'漏斗图',
            type:'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'inside'
            },
            labelLine: {
                length: 10,
                lineStyle: {
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    fontSize: 20
                }
            },
            data: [
                {value: this.advertDeal, name: '交易量'},
                {value: this.advertHit, name: '点击量'},
                {value: this.advertShow, name: '展现量'}
            ]
        }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  watch:{
    value(val){
      this.save_putting(val)
    }
  }
};
</script>
<style lang="scss" scoped >
@import "@/styles/echart-components.scss";
</style>