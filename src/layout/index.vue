<template>
  <div id="educations-views">
    <div class="column">
      <LeftColumn />
    </div>
    <div class="contemts">
      <div class="headers">
        <Header />
        <RouterHistory />
      </div>
      <div class="views">
       
        <transition name="slide">
           <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import LeftColumn from './components/leftColumn'
import Header from './components/header'
import RouterHistory from '@/components/historyRouter.vue'
export default {
  data() {
    return {}
  },
  components: {
    Header,
    LeftColumn,
    RouterHistory
  }
}
</script>
<style   scoped >
/* // @import '@/styles/mixin.scss'; */
#educations-views {
  height: 100%;
  /* position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0; */
  display: flex;
  /* min-width: 1200px; */
  /* min-height: 700px; */
}
.slide-enter{
  transform: translateX(-40px);
  opacity: 1;
}
.slide-enter-active{
  transition:all 0.5s ease;
}
.column {
    flex-shrink: 0;
  width: 200px;
  /* height: 100%; */
  background: #2f3334;
  color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 5px #d6dddf;
  margin-right: 7px;
}
.contemts {
  /* flex: 1; */
  width: calc(100vw - 207px );
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
}
.headers {
  height: 50px;
  width: 100%;
  line-height: 50px;
  border-bottom: 1px solid #e8e8e8;
  background: #fff;
  box-sizing: border-box;
  padding: 0 50px;
  margin-left: -7px;
}
.views {
  flex: 1;
  overflow: auto;
  box-sizing: border-box;
  display: flex;
  /* // @include scroll-bar; */
  
}
</style>


