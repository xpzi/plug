<template>
    <div>
        <div class="contact-bj">
            <Form >
                 <div :class="[`${classPrefix}-content`, 'base-1200']">
            <div :class="[`${classPrefix}-content-form`]">
                <h3 :class="[`${classPrefix}-content-form-tit`]">
                    请广告顾问来电为您介绍
                    <span>留下您的联系方式，我们的广告顾问将与您联系，免费咨询</span>
                </h3>
                <div :class="[`${classPrefix}-content-form-lay`]">
                    <p :class="[`${classPrefix}-content-form-yes`]">
                        <label :class="type == 1 ? 'radioBg' : 'radioBg2'" :style="'background-image: url('+require('assets/images/index/contect-bj.png')+' )'">
                            <input type="radio" value="1"  id="isoffer_1" name="isoffer" v-model="type"  >
                        </label>
                        <label for="isoffer_1" class="iconbg radioBg_label"></label>
                        <label for="isoffer_1">我是企业</label>
                    </p>
                    <p :class="[`${classPrefix}-content-form-yes`]">
                        <label :class="type == 2 ? 'radioBg' : 'radioBg2'" :style="'background-image: url('+require('assets/images/index/contect-bj.png')+' )'">
                            <input  @focus="bdname.value = ''" type="radio" value="2"  id="isoffer_2" name="isoffer" v-model="type" >
                        </label>
                        <label for="isoffer_2" class="iconbg radioBg_label"></label>
                        <label for="isoffer_2">我是个人广告主</label>
                    </p>
                </div>
                <div :class="[`${classPrefix}-content-form-lay`]">
                    <input
                            :readonly="type == '2'"  type="text" v-model="bdname.value"
                            @blur="onblur('bdname')"  @keyup="onblur('bdname')"  @focus="onfocus('bdname')"
                            :placeholder="'企业名称' + (type == '1' ? '（必填）' : '')"
                            :class="['form-input',{Novalue: type == '2'}]"
                    />
                    <span v-if=" type != 2 && bdname.status " class="error">{{ bdname[bdname.status]}}</span>
                </div>
                <div :class="[`${classPrefix}-content-form-lay`]">
                    <input
                            @blur="onblur('realname')"  @keyup="onblur('realname')"  @focus="onfocus('realname')"
                            type="text"
                            :placeholder="'姓名' + (type == '2' ? '（必填）' : '')"
                            class="form-input"
                            v-model="realname.value"

                    />
                    <span v-if="realname.status && type == 2" class="error">{{ realname[realname.status]}}</span>
                </div>
                <div  :class="[`${classPrefix}-content-form-lay`]">
                    <input @blur="onblur('mobile')" @keyup="onblur('mobile')"  @focus="onfocus('mobile')"  type="text" placeholder="手机号（必填）" class="form-input" v-model="mobile.value"/>
                    <span v-if="mobile.status" class="error">{{ mobile[mobile.status]}}</span>
                </div>
                <div :class="[`${classPrefix}-content-form-lay`]">
                    <input @blur="onblur('email')" @keyup="onblur('email')"  @focus="onfocus('email')"  type="text" placeholder="邮箱" class="form-input" v-model="email.value"/>
                    <span v-if="email.status" class="error">{{ email[email.status]}}</span>
                </div>
                <div :class="[`${classPrefix}-content-form-lay`]">
                    <a :class="['form-input-bout', {huisebtn: huisebtn}]" @click="handleSubmit()">立即预约</a>
                </div>
            </div>
            <div :class="[`${classPrefix}-content-form-bar`]"></div>
            <div :class="[`${classPrefix}-content-form`,'right']">
                <h3 :class="[`${classPrefix}-content-form-tit`]">
                    客户咨询专线
                    <span>通过以下方式联系我们的广告专家，了解更多服务及产品信息</span>
                </h3>
                <p :class="[`${classPrefix}-content-form-Phone`]" :style="'background-image: url('+require('assets/images/index/contect-bj.png')+' )'"></p>
                <p :class="[`${classPrefix}-content-form-call`]">010-57185193</p>
            </div>
        </div>
            </Form>
        </div>
        <div :style="show ? {} : {display: 'none'}" class="popup">
            <div class="popup-content">
                <Icon type="ios-checkmark-outline" :size="80" color="#51BD90"></Icon>
                <p>
                    <span>预约成功</span>
                    我们的广告顾问会在2个工作日内与您电话联系，<br/>请保持电话通畅。
                </p>
                <a @click="show = false">我知道了</a>
            </div>
        </div>
    </div>

</template>


<script>
    import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    import nivoSlider from 'utils/jquery.nivo.slider.pack.js'
    import S from 'service'
    import * as apis from './apis'
    S.$extend(apis)

    import $ from 'jquery';
    import Icon from 'iview-ui/icon'
    window.$ = $;
    nivoSlider($);

    const typeBg = [

    ]

    export default {
        // 写name可使组件查看更严谨
        // name: '',

        mixins: [],

        props: {

        },

        components: {
            [Icon.name]: Icon,
        },

        data () {
            const $vm = this;
            const {regs} = this.$common
            return {
                show: false,
                classPrefix: 'f-contact',
                type: '1',
                huisebtn: true,
                email: {
                    value: '',
                    success: '',
                    failure: '*请输入正确的邮箱',
                    prompt: '',
                    status: false,
                    verify: function () {
                        if( !this.value ){
                            return true;
                        }
                        return regs.email.test(this.value);
                    }
                },
                bdname:{
                    value: '',
                    success: '',
                    failure: '*请填写企业名称',
                    prompt: '',
                    status: false,
                    verify: function () {
                        return $vm.type == 1 ? !!this.value : true;
                    }
                },
                realname:{
                    value: '',
                    success: '',
                    failure: '*请输入姓名',
                    prompt: '',
                    status: false,
                    verify: function () {
                        return $vm.type == 1 ? true : !!this.value;
                    }
                },
                mobile:{
                    value: '',
                    success: '',
                    failure: '*请输入正确的手机号',
                    prompt: '',
                    status: false,
                    verify: function () {
                        return regs.telephone.test(this.value);
                    }
                }

            }
        },

        watch: {

        },

        computed: {
            getParams(){
                var verifySuccess = true;
                ['bdname', 'realname', 'mobile', 'email'].map( (item, index) => {
                    let ver = this.onblur(item);// this[item].verify();
                    console.log( item, ver);
                    if( !ver){
                        verifySuccess = false;
                    }
                    return ver;
                });
                if(verifySuccess){
                    return {
                        type: this.type,
                        bdname: this.bdname.value,
                        realname: this.realname.value,
                        mobile: this.mobile.value,
                        email: this.email.value
                    }
                }else{
                    return false;
                }
            }
        },
        methods: {
           handleSubmit() {
               console.log(this.getParams);
               if( this.getParams){
                   this.$S.subMessage(this.getParams)
                       .then( data => {
                           if(data.code == 100){
                                this.show = true;
                           }else {
                               alert('shibai');
                           }
                       })
                       .catch(err => {
                           console.log('err', err);
                       })
               }
           },
            onblur( a , b){
               var issubmit = true;

                ['bdname', 'realname', 'mobile', 'email'].map((item, index) => {
                    let ver = this[item].verify();
                    if( item === a ){
                        if( ver ){
                            this[a].status = false;
                        } else{
                            this[a].status = 'failure';
                        }
                    }
                    issubmit = issubmit && ver;
                });
                this.huisebtn = !issubmit;
                return issubmit;
            },
            // 获得焦点
            onfocus( a , b){
//                console.log(a, this[a]);
                this[a].status = 'prompt';
            }
        },

        filters: {

        },

        created () {
        },

        mounted () {

        },

        render (h) {

        }
    }

</script>


<style lang="less" scoped>
    .contact-bj {
        opacity: 0.8;
        background-image: linear-gradient(-135deg, #2C2E38 0%, #23252D 42%, #22242D 43%, #22242C 45%, #15171E 100%);
    }
    @component-prefix: ~'f-contact';
    .@{component-prefix} {
        &-content {
            padding: 100px 0;
            overflow: hidden;
            &-form {
                width: 50%;
                float: left;
                color: #fff;
                &-tit {
                    display: block;

                    font-size: 24px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    line-height: 24px;
                    font-weight: 600;
                    padding-bottom: 20px;
                    span {
                        display: block;

                        font-size: 13px;
                        color: #FFFFFF;
                        letter-spacing: 0;
                        line-height: 13px;
                        padding-top: 16px;
                        font-weight: 100;
                    }
                }
                &-lay {
                    display: block;
                    height: 40px;
                    height: 40px;
                    margin-top: 12px;
                    line-height: 40px;

                    input::placeholder{
                        color: #333;
                    }

                    .form-input {
                        width: 290px;
                        height: 40px;
                        background: #FFFFFF;
                        border: 1px solid #E9EDEE;
                        font-size: 14px;
                        color: #333;
                        line-height: 14px;
                        padding-left: 10px;
                    }
                    .form-input-bout {
                        width: 290px;
                        height: 40px;
                        background: #51BF91;
                        font-size: 18px;
                        color: #FFFFFF;
                        display: block;
                        line-height: 40px;
                        text-align: center;
                        font-weight: 600;
                    }
                    .huisebtn{
                        background: #7C7C7C;
                        color: #d0cccc;
                    }
                    .Novalue {
                        background: #ada7a7;
                        color: #aaa;}
                    .error {
                        font-size: 14px;
                        color: #ff0000;
                        line-height: 14px;
                        padding-left: 10px;
                    }
                }
                &-yes {
                    width: 30%;
                    float: left;
                    font-size: 13px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    
                    .radioBg {
                        width: 14px;
                        height: 15px;
                        display: inline-block;
                        vertical-align: middle;
                        background-position: -258px 0;
                    }

                    
                    .radioBg2 {
                        width: 14px;
                        height: 15px;
                        display: inline-block;
                        vertical-align: middle;
                        background-position: -258px -20px;
                    }
                    input{
                        display: none;
                    }
                }
                &-Phone {
                    width: 119px;
                    height: 119px;
                    background-position: 0px 0px;
                    margin-top: 18px;
                }
                &-call {
                    display: block;
                    font-size: 46px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    line-height: 46px;
                    font-weight: 600;
                    padding-top: 28px;
                }
                &-bar {
                    height:240px;
                    float: left;
                    border: 1px solid #666666;
                    margin-top: 53px;
                }

            }
            .right {
                width: 31%;
                float: right;
            }
        }
    }
.popup {
    /*display: none;*/
    position: fixed;
    z-index: 999999;
    top:0;
    bottom:0;
    left:0;
    right: 0;
    margin:auto;
    width: 100%;
    height: 100%;
    background: rgba(52,52,52,0.1);
}
.popup-content {
    width: 400px;
    height: 272px;
    background: #ffffff;
    box-shadow: 0 8px 12px 0 rgba(0,0,0,0.07);
    border-radius: 8px;
    position: absolute;
    margin: auto;
    top:0;
    bottom: 0;
    left:0;
    right:0;
    text-align: center;
    padding-top: 30px;
    p {
        display: block;
        font-size: 12px;
        color: #999999;
        line-height: 18px;
        span {
            display: block;
            font-size: 20px;
            color: #282828;
            line-height: 20px;
            font-weight: 600;
            margin: 8px 0 7px 0;
        }
    }
    a {
        width: 240px;
        height: 40px;
        background: #51BD90;
        border-radius: 4px;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 40px;
        display: block;
        margin: 15px auto 0;
    }
}




</style>

