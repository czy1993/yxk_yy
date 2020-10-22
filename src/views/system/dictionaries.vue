<template>
  <div class="view-center">
    <div class="right-bus">
      <span class="buts but_b" @click="addDict('add')">新增</span>
    </div>
    <div class="main-view">
      <el-table :data="dictData" border stripe>
        <el-table-column prop="groupType" label="分组"></el-table-column>
        <el-table-column prop="parentName" label="父级"></el-table-column>
        <el-table-column prop="value" label="真实值"></el-table-column>
        <el-table-column prop="label" label="显示值"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="isManager" label="操作">
          <template slot-scope="scope">
            <span class="table_but table_but_b" @click="addDict('edit',scope.row)" >编辑</span>
            <span class="table_but table_but_a" @click="delDict(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <Pupops v-if="show1" @event1="show1 = $event">
      <div slot="titlt">温馨提示</div>
      <div slot="content" class="popup-content">确定要删除吗？</div>
      <button slot="foot" @click="save_dictDel()">确定</button>
    </Pupops>
    <AddDictionaries v-if="show2"  :name="name" :data="datas"  @event="show2 = $event" ></AddDictionaries>
  </div>
</template>
<script>
import { dictList, dictDel } from '@/api/user.js';
import Pupops from '@/components/pupops.vue';
import AddDictionaries from './components/addDictionaries'
export default {
  data() {
    return {
      current: 1,
      size: 10,
      total: 0,
      page: 1,
      dictData: [],
      dictId: null,
      show1: false,
      show2: false,
      name:"",
      datas:{}
    }
  },
  components: {
    Pupops,
    AddDictionaries
  },
  created() {
    this.save_dictList()
  },
  methods: {
    save_dictList() {
      dictList(`current=${this.current}&size=${this.size}`).then(res => {
        if (res.code == 200) {
          this.dictData = res.data.records
          this.total = res.data.total
        }
      })
    },
    delDict(id) {
      this.show1 = true
      this.dictId = id
    },
    addDict(name,data){
        this.name = name;
        this.datas = data || {};
        this.show2 = true;
    },
    // 删除字典
    save_dictDel() {
      dictDel({
        id: this.dictId
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '删除成功',
            type: 'success',
            onClose:()=>{
                this.show1 = false;
                this.save_dictList()
            }
          })
        }else{
            this.$message.error(res.message);
        }
      })
    },
    handleSizeChange(val) {
      this.size = val
      this.save_dictList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.save_dictList()
    }
  },
  watch:{
    show2(val){
      if(val == false){
        this.save_dictList()
      }
    }
  }
}
</script>