<template>
  <div class="componentsView">
    <div class="cmp-view-header">
      <div class="echart-name"></div>
      <div class="echart-search">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span class="dateTil">时间段</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
    </div>
    <div class="cmp-view-center">
      <div class="dateBut-view">
        <span>近24小时</span>
        <span>近7天</span>
        <span>近30天</span>
      </div>
      <div class="search-view">
          <div id="transaction" style="width: 400px;height:360px;"></div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts';
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '活动一'
        }
      ],
      value: '',
      value1: ''
    }
  },
  mounted() {
    this.mechanismEcharts()
  },
  methods: {
    mechanismEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('transaction'), 'light')

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '交易数据',
        },
        tooltip: {},
        legend: {
          bottom: '0%',
          data: ['new','all']
        },
        xAxis: {
          type: 'category',
          data: [1, 2, 3, 4, 5, 6]
        },
        yAxis: {
          // data:[0,20,40,60]
        },
        series: [
          {
            name: 'new',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 100]
          },
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped >
@import '@/styles/echart-components.scss';
</style>