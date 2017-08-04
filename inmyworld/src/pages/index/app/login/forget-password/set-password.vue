<!--
  确认账户
  libx@inke.cn 20170609
-->
<template>
  <div class="cpnfirm">
    <IForm :model="formLeft" ref="formValidate"  :rules="ruleValidate"  label-position="right" :label-width="100">
      <IForm-item label="设置新密码：" prop="password" >
        <IInput size="large"  type="password" :maxlength="11" v-model="formLeft.password" placeholder="登录密码为6-16个字符，请使用字母加数字组合"></IInput>
      </IForm-item>
      <IForm-item label="确认新密码：" prop="re_password">
        <IInput size="large" type="password" v-model="formLeft.re_password" placeholder="请重新输入新密码"></IInput>
      </IForm-item>
    </IForm>

    <div  class="nextstep">
        <router-link :to="{name: '/login/forget-password/authenticate', params:{phone: phone}}" class="back" >上一步</router-link>
        <span  class="next" @click="nextstep({name:'formValidate', path: '/login/forget-password/complete'})">下一步</span>
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
                phone: this.$route.params.phone,
                // 表单数据
                formLeft: {
                    password: '',
                    re_password: ''
                },

              /* 手机号验证 */
                ruleValidate:{
                    password: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { type: 'password',  trigger: 'blur', min:6, max: 16,validator: function (rule, value, callback) {
                            console.log( 'abcd',rule, value);

                            if( !regs.password.test( value) ){
                                callback(new Error('登录密码为6-16个字符，请使用字母加数字组合'));
                            } else{
                                callback();
                            }

                        }}
                    ],

                  /* 验证码 */
                    re_password: [
                        { required: true, message: '请再次输入新密码', trigger: 'blur'},
                        { type: 'password',  trigger: 'blur', min:6, max: 16, validator: function (rule, value, callback){
                            if( value != $vm.formLeft.password){
                                callback( new Error('两次输入的密码不一样'))
                            }else{
                                callback();
                            }
                        }}
                    ],
                },

              /* 验证码地址 */
                codeSrc: ''
            }
        },

        watch: {},

        computed: {
            verifyParams(){
                return {
                    password: this.formLeft.password,
                    repassword: this.formLeft.re_password
                }
            }
        },

        methods: {
            ...mapActions({
                   setCurrentStep: 'CURRENT_STRP'
            }),
            changeCode(){
                this.codeSrc = 'https://trunk.ppe.inmyworld.cn/captcha.html?' + (new Date()).getTime();
            },
            getPicCode(){
                this.$S.GET_PIC_CODE( {time: (new Date()).getTime() } )
                    .then(  data => {
                        console.log( data.data.src );
                        this.codeSrc = data.data.src;
                    })
            },
            nextstep ({name, path}) {
                this.$refs[name].validate((valid) => {
                    if (!valid) {
                        this.$Message.error(valid)
                        return;
                    }
                    // 重置密码
                    this.$S.RESET_PASSWORD(this.verifyParams)
                        .then((data) => {
                            if (data.code != 100) {
                                this.$Message.error( data.msg )
                                return ;
                            }
                            this.$router.push({ path: path , params: {a:'fasdfas', phone: this.verifyParams.mobile }})
                        })
                })
            }
        },

        filters: {},

        created () {

        },

        mounted () {
            this.getPicCode();
            this.setCurrentStep(2)
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

  .nextstep{

    .back{
        display: inline-block;
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

    .next{
        float: right;
        height: 40px;
        width: 200px;
        border-radius: 5px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        background: #51bd90;
         &:hover{
          background: #47cb89;
        }
    }

    
    margin: 50px 0 0 0px;

   
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