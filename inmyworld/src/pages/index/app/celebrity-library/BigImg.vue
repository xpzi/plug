<template>
    <!-- 过渡动画 -->
    <transition name="fade">
        <div class="img-view" @click="bigImg" style="overflow: visible">
            <!-- 遮罩层 -->
            <div class="img-layer" @click.stop ></div>
            <div class="img" >
                    <a @click.stop.prevent="prev" class="nivo-prevNav"></a>
                    <img ondragstart="return false;" :src="imgSrc">
                    <a @click.stop.prevent="next" class="nivo-nextNav"></a>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        props: ['picindex','pics' ],
        data(){
            return {
                curIndex: this.picindex
            }
        },
        computed:{
            imgSrc(){
                console.log('curIndex', this.curIndex , this.pics)
                return this.pics[this.curIndex];
            },
        },
        methods: {
            bigImg() {
                // 发送事件
                this.$emit('clickit')
            },
            prev(){
                let p = this.curIndex - 1;
                this.curIndex = p < 0 ? this.pics.length -1 : p;
            },
            next(){
                let n = this.curIndex + 1;
                this.curIndex = n >= this.pics.length ? 0:  n;
            }
        }
    }
</script>
<style scoped>
    div {
        overflow: visible;
    }
    /*动画*/
    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s linear;
        transform: translate3D(0, 0, 0);
    }

    .fade-enter,
    .fade-leave-active {
        transform: translate3D(100%, 0, 0);
    }


    /* bigimg */
    .img-view {
        position: fixed;
        top: 0;
        left:0;
        width: 100%;
        height: 100%;
        z-index: 999999999;
    }

    /*遮罩层样式*/
    .img-view .img-layer {
        position: absolute;
        z-index: 999;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    /*不限制图片大小，实现居中*/
    .img-view .img {
        white-space: nowrap;
        text-align: center;
        max-width: 90%;
        max-height: 80%;
        width: auto;
        height: auto;
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top:0;
        bottom: 0;
        margin: auto;
        z-index: 1000;
        -moz-user-select:none; /*火狐*/
         -webkit-user-select:none; /*webkit浏览器*/
         -ms-user-select:none; /*IE10*/
         -khtml-user-select:none; /*早期浏览器*/
         user-select:none;
         vertical-align: middle;
      

    }
    .img-view .img img{
        max-height: 100%;
        max-width: 100%;
        width: auto;
        vertical-align: middle;
     }

.img a {
  /*position: absolute;*/
  display: inline-block;
  position: relative;
  z-index: 9;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  color: rgba(255,255,255, 0.6);
  height: 50px;
  width: 50px;
  background: rgba(0,0,0,0.4);
  border-radius: 100%;
}
.img a:hover{
    color: #fff;
    background: rgba(0,0,0,0.6);
}

.nivo-prevNav {
  right:20px;
  /*margin-right: 20px;*/
}
.nivo-prevNav::before{
    font-family: Ionicons;
    content: "\f3d2";
    position: relative;
}
.nivo-nextNav {
  left:20px;
  /*margin-left: 20px;*/
}
.nivo-nextNav::before{
    content: "\f3d3";
    font-family: Ionicons;
    position: relative;
}
</style>