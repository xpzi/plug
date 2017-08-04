<!--
  退出弹窗
  开发人名字樊姣姣 时间

-->
<template>
    <div class="dialog" v-if="seen">
        <div class="dialog-con">
            <div class="tt-s">信息<a class="mask-close" @click="hide"><img :src="require('assets/images/header/close.png')" class="close-img"></a></div>
            <p class="dialog-p">{{info}}</p>
            <a @click="onCancel" class="cancel">取消</a><a  @click="onConfirm" class="sure">确定</a>
        </div>
    </div>
</template>

<script>

    export default {
        // 写name可使组件查看更严谨
        // name: '',

        mixins: [],

        props: ['info', 'cancel', 'confirm' ],

        components: {

        },

        data () {
            return {
                seen: false
            }
        },

        watch: {

        },

        computed: {

        },

        methods: {
            onCancel(){
                this.cancel();
                this.hide();
            },
            onConfirm(){
                 this.confirm();
                 this.hide();
            },
            show () {
                this.seen= true;
            },
            hide(){
                this.seen= false;
            }
        },

        filters: {

        },

        created () {

        },

        mounted () {

        },
        destroyed(){

        },
        render (h) {

        }
    }


</script>



<style lang="less" scoped>
.dialog{
    position: fixed;
    height: 100%;
    width: 100%;
    background:rgba(0,0,0,0.7);
    z-index: 999999;
}
.dialog-con { width: 278px; height: 155px; background: #fff; border:1px #282828 solid; margin:auto; position: absolute;
    top:0;left: 0; bottom: 0; right: 0; border-radius: 5px;box-shadow: 0px 0px 25px #282828;}
.tt-s {
    height: 43px;
    font-size: 14px;
    line-height: 43px;
    border-bottom: 1px solid #eee;
    color: #333;
    padding: 0 80px 0 20px;
}
.mask-close{
    float: right;
    width: 46px;
    height: 46px;
    line-height: 46px;
    position: absolute;
    right: 0;
    top: 0;
}
.close-img {
    width: 12px;
    height: 12px;
    display: block;
    margin: 15px auto 0 auto;
}
.dialog-p {
    display: block;
    color: #282828;
    text-align: center;
    padding-top: 20px;
    font-size: 14px;
}
.dialog-p i {
    width: 40px;
    height: 40px;
    background: #51BD90;
    border-radius: 100%;
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    text-align: center;
    font-weight: bold;
    font-size: 25px;
    line-height: 40px;
    margin-right: 15px;

}
    .close {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        position: absolute;
        top:0;
        right: 0;
        border-radius: 100%;
        color: #282828;
    }
    .sure {
        width: 60px;
        height: 30px;
        background: #2e8ded;
        display: inline-block;
        color: #fff;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        border-radius: 2px;
        margin: 26px 17px 0 0;
        cursor: pointer;
        float: right;
    }
    .cancel {
        width: 60px;
        height: 30px;
        background: #d6d6d9;
        display: inline-block;
        color: #777474;
        text-align: center;
        line-height: 30px;
        border-radius: 2px;
        margin: 26px 0 0 17px;
        cursor: pointer;
        font-size: 14px;
        float: left;
    }
.static{display:none}
.active{display:block}
</style>