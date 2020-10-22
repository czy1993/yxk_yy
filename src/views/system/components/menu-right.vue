<template>
  <div class="menuRight">
    <div class="left-buts">
      <span :class="butsIndex=='1'?'span_active':''" @click="butsIndex='1'">新增</span>
      <span :class="butsIndex=='2'?'span_active':''" @click="butsIndex='2'">修改</span>
      <span :class="butsIndex=='3'?'span_active':''" @click="butsIndex='3'">删除</span>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="编码" >
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column prop="name" label="名称" ></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      butsIndex: '1',
      tableData: [
        {
          code: '2016-05-03',
          name: '王小虎',
          
        },
        {
          code: '2016-05-02',
          name: '王小虎',
        },
        {
          code: '2016-05-04',
          name: '王小虎',
          
        },
        {
          code: '2016-05-01',
          name: '王小虎',
        },
        {
          code: '2016-05-08',
          name: '王小虎',
        },
        {
          code: '2016-05-06',
          name: '王小虎',
        },
        {
          code: '2016-05-07',
          name: '王小虎',
        }
      ]
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="scss" scoped>
.menuRight {
  .left-buts {
    justify-content: left;
    margin-bottom: 20px;
    span {
      margin-right: 25px;
    }
  }
}
</style>