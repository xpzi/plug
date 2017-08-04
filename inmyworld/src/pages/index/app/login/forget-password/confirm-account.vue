<!--
  确认账户
  libx@inke.cn 20170609

-->
<template>
    <div class="cpnfirm">
        <IForm :model="formLeft" ref="formValidate"  :rules="ruleValidate"  label-position="right" :label-width="100">
            <IForm-item label="手机号：" prop="phone" >
                <IInput size="large" :maxlength="11" v-model="formLeft.phone" placeholder="请填写手机号"></IInput>
            </IForm-item>
            <IForm-item :error="errorInfo" label="验证码：" prop="picCode">
                <IRow>
                    <ICol span="12">
                        <IInput :maxlength="4" size="large" type="text" v-model="formLeft.picCode" placeholder="验证码不能为空"></IInput>
                    </ICol>
                    <ICol span="11" offset="1">
                        <a class="codepic" @click="getPicCode">
                            <span id="abcd"><img  :src="codeSrc" alt=""></span>
                           <div>点击刷新</div>
                        </a>
                    </ICol>
                </IRow>
            </IForm-item>
        </IForm>
        
        <div class="foot">
            <router-link :to="{path: '/login'}" class="back" >返回</router-link>
            <div class="nextstep" @click="nextstep({name:'formValidate', path: '/login/forget-password/authenticate'})">下一步</div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'

    import IForm from 'iview-ui/form'
    import IInput from 'iview-ui/input'
    import IRadio from 'iview-ui/radio'
    import ICheckbox from 'iview-ui/checkbox'
    import IButton from 'iview-ui/button'
    import Grid from 'iview-ui/grid'

    import {
        Row as IRow,
        Col as ICol
    } from 'iview-ui/grid'



    import S from 'service'
    import * as apis from '../apis'

    S.$extend(apis)


    export default {
        // 写name可使组件查看更严谨
        // name: '',

        mixins: [],

        props: {},

        components: {
            IForm,
            IFormItem: IForm.Item,
            IInput,
            IButton,
            IRow,
            ICol
        },

        data () {
            const {regs} = this.$common
            const $vm = this;
            return {

                // 表单数据
                formLeft: {
                    phone: '',
                    picCode: ''
                },

                /* 手机号验证 */
                ruleValidate:{
                    phone: [
                        { required: true, message: '请输入11位手机号码', trigger: 'blur' },
                        { type: 'number',  trigger: 'blur', max: 11,validator: function (rule, value, callback) {
                            if (!regs.telephone.test(value)) {
                                callback(new Error('您输入的手机号码格式有误，需为 11 位数字格式'))
                            } else {
                                $vm.$S.PHONE_VERIF({phone: value})
                                    .then((data) => {
                                        if( data.code === 100 ){
                                            callback()
                                            
                                        } else {
                                            callback( new Error('该手机号未注册'))   
                                        }
                                    }).catch(err => {
                                    callback(new Error('该手机号未注册'))

                                })
                            }
                        }
                    }],

                    /* 验证码 */
                    picCode: [
                        { required: true, message: '请输入验证码', trigger: 'blur'},
                        {type: 'number',  trigger: 'blur', max: 4,validator: function(rule, value, callback){

                            if (!regs.picCode.test(value)) {
                                callback( new Error('验证码输入错误，请重新输入') )
                            } else{
                                callback();
                            }
                        }}
                    ],
                },

                /* 验证码地址 */
                codeSrc: '',
                codeHost: '',
                errorInfo: '',
            }
        },

        watch: {

        },

        computed: {
            verifyParams(){
                return {
                    mobile: this.formLeft.phone,
                    code: this.formLeft.picCode
                }
            },
        },

        methods: {
            ...mapActions({
                   setCurrentStep: 'CURRENT_STRP'
            }),
            getPicCode(){
                this.$S.GET_PIC_CODE( {} )
                .then(  data => {
                    var img = new  Image();
                    img.src = data.data.src;
                    var span = window.document.querySelector('#abcd');
                    span.innerHTML = '';
                    span.appendChild(img);
                    // this.codeSrc = data.data.src ;
                    // this.codeSrc = data.data.src ;
                })
            },
            nextstep ({name, path}) {
                this.$refs[name].validate((valid) => {
                    if (!valid) {
                        this.$Message.error(valid)
                        return;
                    }
                    // 手机号码正确 从接口验证验证码
                    this.errorInfo= '';
                    this.$S.VERIFY_PHONE_CODE(this.verifyParams)
                    .then((data) => {
                        if (data.code != 100) {
                            this.$Message.error( data.msg )
                            this.errorInfo = '您输入的验证码不正确，请重新输入';
                            this.getPicCode();
                            return ;
                        }
                        this.$router.push({ name: path, params: {phone: this.verifyParams.mobile }})
                    })
                })
            }
        },

        filters: {},

        created () {

        },

        mounted () {

            console.log( this.$store )
            this.getPicCode();
            this.setCurrentStep(0)
        },

        render (h) {

        }
    }

</script>


<style lang="less" scoped>

    .picCode{
        border:0;
        padding: 0;
        width: 80px;
        height: 40px;
        overflow: hidden;

        img{
            /*height: 100%;*/
            width: 100%;
        }
    }
    .codepic{
        position: relative;
        display: block;
        height: 40px;
        width: 150px;
        border-radius: 3px;
        overflow: hidden;
        img{ width: 100%; height: 100%;}
        div{ display: none; text-align: center; line-height: 40px; }
        &:hover{
            div{
                display: block;
                position: absolute;
                height:100%;
                width: 100%;
                background: rgba(0,0,0,0.6);
                top: 0;
                left:0;
                color: #fff;
            }
        }
    }
    
    // .nextstep{
    //     height: 40px;
    //     width: 200px;
    //     border-radius: 5px;
    //     text-align: center;
    //     line-height: 40px;
    //     color: #fff;
    //     background: #51bd90;
    //     margin: 50px 0 0 125px;
        
    //     &:hover{
    //         background: #47cb89;
    //     }
    // }

.foot{
      width: 100%;
      padding-top: 70px;
      padding-left: 40px;
      display: flex;
      justify-content: space-between;

      div{
        height: 40px;


        width: 170px;
        border: 1px solid #dedede;
        border-radius:  5px;
        text-align: center;
        line-height: 40px;
      }


      .back{
        height: 40px;
        width: 160px;
        text-align: center;
        line-height: 40px;
        border: 1px solid #dedede;
        border-radius:  5px;
        color: #999;
        &:hover{
          background: #efefef;
        }
      }

      .nextstep{
        background: #51bd90;
        color: #fff;
        &:hover{
          background: #47cb89;
        }
      }

    }


</style>


<style lang="less">

    .cpnfirm{

        .ivu-radio-wrapper {

        }

        .ivu-input-large {
            height: 40px;
        }

        .ivu-btn-large{
            width: 100%;
            height: 40px;
        }

    }


</style>