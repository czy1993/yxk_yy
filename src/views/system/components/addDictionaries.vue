<template>
  <div class="addNotice childViews">
    <div class="addNotice-telit">
      <span>{{name=='add'?'新增字典':'编辑字典'}}</span>
      <span class="buts but_c" @click="cancel()">返回</span>
    </div>
    <div class="addNotice-center">
      <div class="center-from">
        <div class="from-view">
          <div class="from-li">
            <span class="from-name">分组</span>
            <div class="from-value" style="width:180px">
              <el-input v-model="addFrom.groupType" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">父级</span>
            <div class="from-value">
              <el-select v-model="addFrom.parentId" clearable placeholder="请选择">
                <el-option
                  v-for="(item,index) in parentData"
                  :key="index"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">真实值</span>
            <div style="width:220px" class="from-value">
              <el-input v-model="addFrom.value" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">显示值</span>
            <div class="from-value" style="width:220px">
              <el-input v-model="addFrom.label" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">排序</span>
            <div class="from-value" style="width:220px">
              <el-input type="number" min="0" v-model="addFrom.sort" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="from-li">
            <span class="from-name">备注</span>
            <div class="from-value" style="width:360px">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="addFrom.remark"></el-input>
            </div>
          </div>
          <div class="from-buts">
            <span class="buts buts_cancel" @click="cancel()">取消</span>
            <span class="buts buts_ok" @click="Submit">提交</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { parentList, dictAdd, dictEdit } from '@/api/user.js'
export default {
  props: {
    name: String,
    data:Object
  },
  data() {
    return {
      parentData: [],
      addFrom: {
        groupType: '', //
        id: 0,
        label: '',
        parentId: '',
        parentName: '',
        remark: '',
        sort: '',
        value: ''
      }
    }
  },
  created() {
    this.save_parentList();
    if(this.name =='edit'){
        this.addFrom = this.data;
    }
  },
  methods: {
    cancel() {
      this.$emit('event', false)
    },
    // 查询父级
    save_parentList() {
      parentList().then(res => {
        if (res.code == 200) {
          this.parentData = res.data
        }
      })
    },
    // 提交
    Submit() {
      if (this.addFrom.groupType == '') {
        this.$message.error('分组不能为空')
      } else if (this.addFrom.label == '') {
        this.$message.error('显示值不能为空')
      } else if (this.addFrom.sort == '') {
        this.$message.error('排序不能为空')
      } else if (this.addFrom.value == '') {
        this.$message.error('真实值不能为空')
      } else {
        if (this.name == 'add') {
          dictAdd(this.addFrom).then(res => {
            this.resMess(res)
          })
        } else {
          dictEdit(this.addFrom).then(res => {
            this.resMess(res)
          })
        }
      }
    },
    // 返回提示
    resMess(res) {
      if (res.code == 200) {
        this.$message({
          message: '提交成功',
          type: 'success',
          onClose:()=>{
              this.cancel()
          }
        })
      } else {
        this.$message.error(res.message)
      }
    }
  }
}
</script>