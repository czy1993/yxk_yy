<template>
  <div class="childViews">
    <div class="addNotice-telit">
      <span>文章详情</span>
      <span class="buts but_c" @click="cancel()">返回</span>
    </div>
    <div class="addNotice-center">
      <div class="center-from">
        <div class="findDetails">
          <h4>{{infoIdData.title}}</h4>
          <p class="text" v-html="infoIdData.describes"></p>
          <img class="img" :src="infoIdData.image" alt />
          <div class="foots" v-if="infoIdData.status=='1'">
            <span class="buts buts_cancel" @click="save_updateStatus('3')">不通过</span>
            <span class="buts buts_ok" @click="save_updateStatus('2')" >通过</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { infoId, updateStatus } from '@/api/find.js'
export default {
  props: {
    id: Number || String
  },
  data() {
    return {
      infoIdData: null
    }
  },
  created() {
    this.save_infoId()
  },
  methods: {
    cancel() {
      this.$emit('event', false)
    },
    save_infoId() {
      infoId(`?id=${this.id}`).then(res => {
        if (res.code == 200) {
          this.infoIdData = res.data
        }
      })
    },
    save_updateStatus(status) {
      updateStatus(`?id=${this.id}&status=${status}`).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '操作成功',
            type: 'success',
            onClose:()=>{this.cancel()}
          })
        }else{
            this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.findDetails {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  .img {
    margin: 15px;
    min-height: 140px;
    min-width: 200px;
    border: 1px solid #e9e9e9;
  }
  .foots {
    height: 40px;
    padding-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>