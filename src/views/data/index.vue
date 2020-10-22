<template>
  <div class="view-center searchViews">
    <div class="main-view">
      <SearchBar @event1="closeCom" :type="1">
        <template v-slot:exportExcel>
          <div class="searchBar-right">
            <!-- <span class="buts but_b">导出Excel</span> -->
          </div>
        </template>
      </SearchBar>
      <div class="data-content">
        <div class="mechanism">
          <div id="mechanism" style="width: 1000px;height:400px;"></div>
        </div>
        <Finance></Finance>
        <!-- <div class="data-compon"> -->
          <!-- / 活动数据/ -->
          <!-- <Activity class="components"></Activity> -->
          <!-- / 交易数据/ -->
          <!-- <Transaction class="components"></Transaction> -->
        <!-- </div> -->
        <div class="data-compon">
          <Advertisement class="components"></Advertisement>
          <Operate class="components"></Operate>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchBar from "@/components/searchBar";
import echarts from "echarts";
import Finance from "./components/finance";
import Activity from "./components/activity";
import Advertisement from "./components/advertisement";
import Transaction from "./components/transaction";
import Operate from "./components/operate";
import { development } from "@/api/data";
export default {
  data() {
    return {
      date:[],
      newAgency:[],
      oldAgency:[]
    };
  },
  components: {
    SearchBar,
    Finance,
    Activity,
    Advertisement,
    Transaction,
    Operate
  },
  created() {},
  mounted() {
    this.save_development();
  },
  methods: {
    closeCom(province, city, search) {
      let that = this;
      this.closeCom_development(city, province, search);
    },
    save_development(data) {
      this.date = [];
      this.newAgency=[];
      this.oldAgency = [];
      development(data).then(res => {
        if (res.code == 200 ) {
          if( res.data.agencyNumberList.length>0){
            this.arrDeep(res.data.agencyNumberList)
          }else{
            this.$message('点前地区暂无数据');
          }
        }
      });
    },
    arrDeep(arr){
      arr.forEach(element => {
        this.date.push(element.date);
        this.newAgency.push(element.newAgency);
        this.oldAgency.push(element.oldAgency)
      });
      this.mechanismEcharts(this.date,this.newAgency,this.oldAgency);
    },
    closeCom_development(city, province, name) {
      // console.log(city, province, name);
      // this.save_development();
      let data;
      if (city != "" && province == "" && name == "") {
        data = `city=${city}`;
        this.save_development(data);
      } else if (city != "" && province != "" && name == "") {
        data = `city=${city}&province=${province}`;
        this.save_development(data);
      } else if (city != "" && province != "" && name != "") {
        data = `city=${city}&province=${province}&name=${name}`;
        this.save_development(data);
      } else if (city == "" && province != "" && name != "") {
        data = `province=${province}&name=${name}`;
        this.save_development(data);
      } else if (city == "" && province == "" && name != "") {
        data = `name=${name}`;
        this.save_development(data);
      } else {
        data = "";
        this.save_development(data);
      }
    },
    mechanismEcharts(date,newAgency,oldAgency) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("mechanism"), "light");

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "机构发展情况",
          top: "0%",
          left: "center"
        },
        tooltip: {
           trigger: "axis"
        },
        legend: {
          bottom: "0%",
          data: date,
        },
        xAxis: {
          type: "category",
          data: date
        },
        yAxis: {
          // data:[0,20,40,60]
        },
        series: [
          {
            name: "新增机构",
            type: "line",
            data: newAgency
          },
          {
            name: "旧机构",
            type: "line",
            data: oldAgency
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.data-content {
  .mechanism {
    height: 460px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  .data-compon {
    width: 96%;
    min-width: 480px;
    height: 460px;
    margin: 0 auto;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .components {
      width: 49%;
      height: 460px;
      background: #fff;
    }
  }
}
</style>