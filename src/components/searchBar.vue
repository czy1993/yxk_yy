<template>
  <div id="searchBar">
    <div class="searchBar-left">
      <div v-if="show1">
        <span>区域选定</span>
        <el-select v-model="province" @change="provinceChange" clearable placeholder="选择省">
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select v-model="city" @change="cityChange" clearable placeholder="选择市">
          <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        </div>

        <el-input v-if="type == 1" :placeholder="placeholder" v-model="search" class="input-with-select">
          <img slot="append" @click="searchCahnge()" src="../../static/img/icon/search.png" alt />
        </el-input>
      
      <div v-if="type == 0" class="searchBar-right">
        <span @click="searchCahnge()" style="color:#fff" class="buts but_b">查询</span>
      </div>
      <p v-if="type == 0">热门课程</p>
    </div>
    <slot name="exportExcel"></slot>
    <!-- <div class="searchBar-right">
      <span class="buts but_b">导出Excel</span>
    </div>-->
  </div>
</template>
<script>
import { queryAllRegion } from '@/api/index.js'

export default {
  props: {
    type: Number
  },
  data() {
    return {
      provinceList: [],
      cityList: [],
      province: '',
      city: '',
      search: '',
      address: {
        province: '',
        city: ''
      },
      show1:true,
      placeholder:"请输入账号搜索"
    }
  },
  created() {
    this.save_queryAllRegion();
    let pathname = window.location.href.split('/')[window.location.href.split('/').length-1]
    if(pathname == 'teacher'){
      this.placeholder="输入姓名/手机号";
    }else if( pathname == 'capital'){
      this.placeholder="输入教师/手机号/课程名";
    }else if( pathname == 'transaction' ){
       this.placeholder="输入账号/订单号";
    }else if( pathname == 'data' ){
       this.placeholder="请输入要搜索的机构名称";
    }else{
       this.placeholder="请输入账号搜索";
    }
    if(pathname == 'teacher' ||  pathname == 'capital' || pathname == 'transaction'){
      this.show1 = false;
    }else{
      this.show1 = true;
    }
  },
  methods: {
    save_queryAllRegion() {
      queryAllRegion().then(res => {
        if (res.code == 200) {
          this.provinceList = res.data
          this.cityList = res.data[0].child
        }
      })
    },
    provinceChange(val) {
      this.provinceList.forEach(element => {
        if (val == element.id) {
          this.cityList = element.child;
          this.city = this.cityList[0].id;
          // this.cityChange()
        }
      })
    },
    cityChange() {
      // this.$emit('event1',this.province,this.city,this.search)
    },
    searchCahnge() {
      this.$emit('event1', this.province, this.city, this.search)
    }
  }
}
</script>
<style lang="scss" >
#searchBar {
  height: 80px;
  min-height: 70px;
  background: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #eceef1;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  font-size: 15px;
  .searchBar-left {
    display: flex;
    align-items: center;
    .el-select {
      width: 130px;
      margin-left: 15px;
    }
    span {
      color: #000;
    }
    .input-with-select {
      width: 260px;
      margin-left: 15px;
      .el-input__inner {
        // border-right: 0;
      }
      img {
        height: 20px;
        margin-bottom: -2px;
        cursor: pointer;
      }
      .el-input-group__append,
      .el-input-group__prepend {
        background: #fff;
        border-left: 0;
      }
    }
    p {
      margin-left: 80px;
      color: #00ae78;
      font-weight: 700;
    }
  }
  .searchBar-right {
    display: flex;
    align-items: center;
  }
}
</style>
