<template>
    <div id='pupops'>
        <div class="backgrounds" @click="toParent()"></div>
        <div class="pupops-views">
            <img class="close" @click="toParent()" src="../../static/img/icon/cha1.png" alt="">
            <div class="views-header">
                <slot name="titlt"></slot>
            </div>
            <div class="views-center">
                <slot name="content"></slot>
            </div>
            <div class="views-foot">
                <slot name="foot"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        toParent(type){
            this.$emit('event1', type)
        }
    }
}
</script>
<style lang="scss" scoped>
#pupops{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
     background: rgba($color: #000000, $alpha: 0.2);
    .backgrounds{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        // z-index: 4;
       
    }
    .pupops-views{
        min-width: 400px;
        min-height: 250px;
        background: #F9F9F9;
        box-shadow:0px 4px 5px 2px #999;
        display: flex;
        flex-direction: column;
        border-radius: 1px;
        position: relative;
        z-index: 1;
        .close{
            position: absolute;
            top: 15px;
            right: 30px;
            height: 20px;
            width: 20px;
        }
        .views-header{
            height: 50px;
            line-height: 50px;
            border-radius: 3px;
            background: #F7F7F7;
            color: #272727;
            font-weight: 700;
            padding-left: 30px;
        }
        .views-center{
            flex: 1;
            box-sizing: border-box;
            padding: 20px 40px 40px 40px;
        }
        .views-foot{
            min-height: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            button{
                display: inline-block;
                margin: 0 auto;
                height: 32px;
                padding: 0 45px;
                background: #00AE78;
                color: #fff;
                border: 0;
                border-radius: 3px;
                outline: none;
                cursor: pointer;
                margin: 15px 10px  20px 10px ;
            }
            .table_but_b{
                background: #FF9B56;
            }
        }
    }
}
</style>