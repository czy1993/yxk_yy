<template>
  <div class="routerNav" v-if="router!='/home'">
    <div
      :class="[router == item.fullPath?'but_a':'','buts']"
      v-show="routerHistory.length>0"
      v-for="(item,index) in routerHistory"
      :key="index"
    >
      <span @click="toPath(item)">{{item.title}}</span>
      <img @click="deletes(item.fullPath)" src="../../static/img/icon/cha.png" alt />
    </div>
  </div>
</template>
<script>
import Utils from '@/utils/deep.js'
import { setRouterHistory, getRouterHistory } from '@/utils/auth.js'
export default {
  data() {
    return {
      routerHistory: [],
      allRouterHistory: [  ],
      router: ''
    }
  },
  mounted(){
    
   
  },
  created() {
    let router = JSON.parse(window.sessionStorage.getItem('router'));
    // console.log(JSON.parse(router) )
    this.allRouterHistory[0] = router;
  },
  methods: {
    unique(arr, name) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (name) {
            if (arr[i][name] === arr[j][name]) {
              //第一个等同于第二个，splice方法删除第二个
              arr.splice(j, 1)
              j--
            }
          } else {
            if (arr[i] === arr[j]) {
              //第一个等同于第二个，splice方法删除第二个
              arr.splice(j, 1)
              j--
            }
          }
        }
      }
      return arr
    },
    toPath(data) {
      this.$router.push({
        path: data.fullPath
      })
    },
    deletes(name) {
      let data = this.routerHistory
      data.forEach((element, index) => {
        if (name == element.fullPath) {
          data.splice(index, 1)
        }
      })
      
      if(data.length>0){
        this.$router.push(data[data.length-1].fullPath)
      }else{
        this.$router.push('/home')
      }
    }
  },
  watch: {
    $route(to, from) {
      // console.log(to,from)
      this.router = to.path;
      if (to.path != from.path && to.path != '/home' && to.path != '/role-manage') {
        let objs = {
          fullPath: this.$router.history.current.path,
          title: this.$router.history.current.meta.title
        }
        window.sessionStorage.setItem('router',window.JSON.stringify(objs))
        this.allRouterHistory.push(objs);
      }
    },
    allRouterHistory() {
      if(this.routerHistory.length>10){
         this.routerHistory.splice(0,1)
      }
      this.routerHistory = this.unique(this.allRouterHistory, 'fullPath');
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.routerNav {
  display: flex;
  height: 55px;
  align-items: center;
  z-index: 1;
  width: 80%;
  // min-width: 600px;
  overflow-x: auto; /*添加横向滚动条*/
  overflow-x: scroll;
  white-space: nowrap; /*不换行*/
  @include scroll-bar;
  div {
    margin: 0 2px;
    height: 30px;
    line-height: 32px !important;
    border-radius: 30px;
    padding: 0 10px;
    position: relative;
    cursor: pointer;
    border: 1px solid #f7f7f7;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin-left: 5px;
      height: 16px;
      width: 16px;
      opacity: 0;
      z-index: 1;
    }
    &:hover {
      border-color: #e8e8e8;
      & img {
        opacity: 1;
      }
    }
  }
}
</style>