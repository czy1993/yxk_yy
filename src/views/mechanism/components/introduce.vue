<template>
  <div class="childViews">
    <div class="addNotice-telit">
      <span>机构介绍</span>
      <span class="buts but_c" @click="cancel()">返回</span>
    </div>
    <div class="addNotice-center">
      <div class="center-from">
        <div class="mechanismIntroduce">
          <h4>{{data.name}}</h4>
          <div class="describes" v-html="data.describes"></div>
          <!-- <P>{{}}</P> -->
          <!-- <img :src="data.describesImg" alt=""> -->
          <div class="foots" v-show='false'>
            <span class="buts buts_ok">修改</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object
  },
  created() {
    console.log(this.data)
  },
  methods: {
    cancel() {
      this.$emit('event', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.mechanismIntroduce {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .describes {
    p {
      margin: 20px;
      min-height: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  // .img {
  //   margin: 15px;
  //   min-height: 140px;
  //   min-width: 200px;
  //   border: 1px solid #e9e9e9;
  // }
  .foots {
    height: 40px;
    padding-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>