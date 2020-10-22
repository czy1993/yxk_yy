<template>
  <div class="childViews">
    <div class="addNotice-telit">
      <span>教师介绍</span>
      <span class="buts but_c" @click="cancel()">返回</span>
    </div>
    <div class="addNotice-center">
      <div class="center-from">
        <div class="teacherIntroduce">
          <div class="teacherIntroduce-center">
            <img class="imgs" :src="imgServer+data.photo" alt />
            <div class="introduce">
              <h4>{{`${data.name}老师`}}</h4>
              <p>{{data.introduce}}</p>
            </div>
          </div>
          <div class="foots" v-show="false">
            <span class="buts buts_ok">编辑</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
    imgServer:String
  },
  created() {
    // console.log(this.data)
  },
  methods: {
    cancel() {
      this.$emit('event', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.teacherIntroduce {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  .teacherIntroduce-center {
    display: flex;
    justify-content: center;
    .imgs {
      // padding-top: 15px;
      width: 160px;
      height: 220px;
      border: 1px solid #e5e5e5;
      margin-right: 20px;
    }
    .introduce {
      width: 500px;
    }
  }
  .foots {
    padding-top: 50px;
  }
}
</style>