<template>
    <div class="lookImg">
        <div class="lookImg-backgrount" @click="toParent(false)" ></div>
        <div class="lookImg-view">
            <img class="cha" @click="toParent(false)" src="../../static/img/icon/cha.png" alt="">
            <img  class="img" :src="url" alt="">
        </div>
    </div>
</template>
<script>
export default {
    props:{
        url:String
    },
    computed(){
        console.log(this.url)
    },
    methods:{
        toParent(type){
            this.$emit('event1', type)
        }
    }
}
</script>
<style lang="scss" scoped>
.lookImg{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    .lookImg-backgrount{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba($color: #000000, $alpha: 0.1);
    }
    .lookImg-view{
        min-height: 400px;
        max-height: 800px;
        min-width: 400px;
        max-width: 75%;
        background: #fff;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .cha{
            position: absolute;
            top: 0px;
            right: -50px;
            height: 30px;
            z-index: 1;
            border-radius: 30px;
            border: 1px solid #fff;
        }
        .img{
            max-height: 700px;
            max-width: 100%;
        }
    }
}
</style>