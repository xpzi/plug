<!--
  网红签约
  开发人名字樊姣姣 时间2017.6.12

-->
<template>
   <div :class="[`${classPrefix}-content`, 'base-1200']">
    <router-link  
      :class="[`${classPrefix}-content-sig`]"  
      v-for="item in dataList"
      :key="item.id"  
      :to="{ name: '/celebrity-library/detail', query: { uid: item.uid }, params:{uid: item.uid}}" target="_blank" 
      :style="`background-image: url(${item.head_pic})`" >
        <div :class="[`${classPrefix}-content-sig-con`]">
          <!-- <img :src="item.head_pic" /> -->
          <p><b>{{item.nick}}</b>
            <span>粉丝{{item.fans_num}}</span>
          </p>
        </div>
        <div :class="[`${classPrefix}-content-sig-hover`]" >
          <div :class="[`${classPrefix}-content-sig-hover`]" rel="bookmark">
            <p>
              <b>{{item.nick}}</b>
              <i>粉丝{{item.fans_num}}</i>
              <span>{{item.info}}</span>
            </p>
          </div>
        </div>       
    </router-link>
</div>
</template>

<script>
    import Icon  from 'iview-ui/icon'

    import S from 'service'
    import * as apis from './apis'
    S.$extend(apis)
    export default {
  // 写name可使组件查看更严谨
  // name: '',

  mixins: [],
  props: [
    'length',
    'data'
  ],
  
  components: {
    Icon
  },

  data () {
    return {
        className: 'c-signing',
        signhosts:[],
        scroll:'',
        loading: false,
        page: 1,
        rows: 20,
        noContent: false,
        classPrefix: 'c-signing'
    }
  },

  watch: {

  },

  computed: {
      dataList(){
          if( this.length && this.data){
              this.data.length = this.length ;
          }
          return this.data;
      }
  },

  methods: {
  },

  filters: {

  },

  created () {

  },

  mounted () {
      if( !!this.length  ){
        this.classPrefix = this.className + '-home';
      } else{
        this.classPrefix = this.className;
      }
  },
  destroyed(){

  },
  render (h) {

  }
}


</script>



<style lang="less" scoped>
@component-prefix: ~'c-signing';
.@{component-prefix} {
    &-home-content {
        overflow:hidden;
        margin-top: 15px;
        width: 1208px;

        &-sig {
            width: 296px;
            height: 296px;
            float: left;
            margin: 3px;
            position: relative;
            border-radius: 3px;
            overflow: hidden;
            background-size: cover;
            background-position: center ;
        
            &-hover {
                display: none;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                transition: opacity .25s ease-in-out, background .25s ease-in-out;
                -moz-transition: opacity .25s ease-in-out, background .25s ease-in-out;
                -webkit-transition: opacity .25s ease-in-out, background .25s ease-in-out;
                vertical-align: middle;
                z-index: 9999;
                color: #fff;
                text-decoration: none;
                /*padding: 10%;*/
                // font-weight: bold;

                div {
                    color: #fff;
                    background: rgba(0,0,0,0.62);
                    position: relative;
                    padding: 10% 5%;
                    p {
                        display: block;
                        position: absolute;
                        width: 80%;
                        bottom: 10%;
                        b {
                            /*border-bottom:3px #fff solid;*/
                            font-weight: bold;
                            font-size: 20px;
                            line-height: 33px;
                            color: #FFFFFF;
                            letter-spacing: 0;
                            display: block;
                            /*margin-right: 20px;*/
                            /*max-width: 77px;*/
                            height: 33px;
                            overflow: hidden;
                            /*float: left;*/
                        }
                        i{
                            line-height: 23px;
                            display: block;
                        }
                        span {
                            display: block;
                            font-size: 14px;
                            line-height: 20px;
                            clear: both;
                            padding-top: 18px;
                        }

                    }
                }
            }

            &-con  {
                img {
                    width: 100%;
                }

                p {
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    background-image: linear-gradient(to top,rgba(0,0,0,.9) 0,rgba(0,0,0,0) 100%);
                    // background-image: -webkit-linear-gradient(to top,rgba(0,0,0,.6) 0,rgba(0,0,0,0) 100%);
                    color: #fff;
                    font-size: 16px;
                    line-height: 34px;
                    padding: 12px 10px 0;
                    // font-weight: bold;
                    span {
                        display: inline-block;
                        font-size: 14px;
                        float: right;
                    }
                }
            }

            &:hover {
                .c-signing-home-content-sig-con p{
                    display: none;
                }
                .c-signing-home-content-sig-hover{
                    display: block;
                }
            }
        }
    }

  &-content {
      overflow:hidden;
      margin-top: 30px;
      width: 1205px;

      &-sig {
          width: 237px;
          height: 302px;
          float: left;
          margin: 4px 2px 0 2px;
          position: relative;
          border-radius: 3px;
          overflow: hidden;
          background-size: cover;
          background-position: center ;
          &-hover {
              display: none;
              width: 236px;
              height: 302px;
              position: absolute;
              top: 0;
              left: 0;
              transition: opacity .25s ease-in-out, background .25s ease-in-out;
              -moz-transition: opacity .25s ease-in-out, background .25s ease-in-out;
              -webkit-transition: opacity .25s ease-in-out, background .25s ease-in-out;
              vertical-align: middle;
              z-index: 9999;
              color: #fff;
              text-decoration: none;
              padding: 10%;

              div {
                  color: #fff;
                  background: rgba(0,0,0,0.62);
                  p {
                      display: block;
                      padding-top: 70%;
                      b {
                          /*border-bottom:3px #fff solid;*/
                          font-weight: bold;
                          font-size: 20px;
                          line-height: 33px;
                          color: #FFFFFF;
                          letter-spacing: 0;
                          display: block;
                          /*margin-right: 20px;*/
                          /*max-width: 77px;*/
                          height: 33px;
                          overflow: hidden;
                          /*float: left;*/
                      }
                      i{
                          line-height: 23px;
                          display: block;
                          /*float: left;*/
                      }
                      span {
                          display: block;
                          font-size: 14px;
                          line-height: 20px;
                          clear: both;
                          padding-top: 18px;
                      }

                  }
              }
          }

          &-con  {
              img {
                  width: 236px;
                  height: 302px;
              }

              p {
                  width: 236px;
                  position: absolute;
                  bottom: 0;
                  background-image: linear-gradient(to top,rgba(0,0,0,.9) 0,rgba(0,0,0,0) 100%);
                  // background-image: -webkit-linear-gradient(to top,rgba(0,0,0,.6) 0,rgba(0,0,0,0) 100%);
                  color: #fff;
                  font-size: 16px;
                  line-height: 34px;
                  padding: 12px 10px 0;
                  b {
                      display: inline-block;
                      max-width: 125px;
                      height: 31px;
                      overflow: hidden;
                  }
                  span {
                      display: inline-block;
                      font-size: 14px;
                      float: right;
                  }
              }
          }
          
          &:hover {
            :-hover {background: #000;}
              .c-signing-content-sig-con p{
                display: none;
              }
              .c-signing-content-sig-hover{
                display: block;
              }
          }
      }



      // &-sig:nth-child(5n) {
      //   margin-right: 0;
      // }
  }
}

</style>