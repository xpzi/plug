<!--
  验证密码
  libx@inke.cn 20170609

-->
<template>

  <div id="authen">

    <IForm :model="formLeft" ref="formValidate"  :rules="ruleValidate"  label-position="right" :label-width="100">
      <IForm-item label="手机号：" prop="phone" >
        <IInput size="large" disabled :maxlength="11" v-model="formLeft.phone" placeholder="请填写手机号"></IInput>
      </IForm-item>
      <IForm-item :error="errorInfo" label="验证码：" prop="code">
        <IRow>
          <ICol span="12">
            <IInput size="large" :maxlength="4" type="text" v-model="formLeft.code" placeholder="验证码不能为空"></IInput>
          </ICol>
          <ICol span="11" offset="1">
            <a :class=" timeout <= 0 ? 'sendCode' : 'nosendCode'" @click="sendMsg" >
              {{ sendInfo }}
            </a>
          </ICol>
        </IRow>
      </IForm-item>
    </IForm>


    <div class="foot">
      <router-link :to="{path: '/login/forget-password'}" class="back" >上一步</router-link>
      <div class="nextstep" @click="nextstep('formValidate')">下一步</div>
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

  props: {

  },

  components: {
      IForm,
      IFormItem: IForm.Item,
      IInput,
      IButton,
      IRow,
      ICol
  },

  data () {
      const $vm = this;
      const {regs} = this.$common
    return {
        errorInfo: '',
        formLeft:{
            phone:'',
            code: ''
        },
        timeout: 0,
        ruleValidate: {
            phone:[
                { required: true, message: '请输入11位手机号码', trigger: 'blur'}
            ],
            code:[
                {
                    required: true,
                    message: '请输入4位短信验证码',
                    trigger: 'blur'
                },{
                    trigger:'focus',
                    validator(rule, value, callback) {
                        callback();
                    }
                }, {
                    required: true,
                    type: 'password',
                    trigger: 'blur',
                    validator (rule, value, callback) {

                        if (!regs.code.test(value)) {
                            callback(new Error('请输入4位短信验证码'))
                        } else {
                            $vm.errorInfo = '';
                            $vm.$S.VERIFY_MSG_CODE( $vm.msgCodeParams )
                            .then((data) => {
                                if (data.code != 100) {
                                    $vm.$Message.error( data.msg )
                                    $vm.errorInfo = data.msg;
                                    callback(new Error(data.msg));
                                    return ;
                                }
                                $vm.success = true;
                                callback( );

                            })

                        }

                    }
                }
            ]
        }
    }
  },

  watch: {

  },

  computed: {
    phone(){
        return this.$route.params.phone;
    },
      sendInfo(){
          if( this.timeout > 1){
              return `${this.timeout}秒后可重新发出`;
          }else{
              return '发送验证码';
          }
      },
      sendCodeParams(){
        return {
            phone: this.phone
        }
      },
    verifyParams(){
          return {
              phone: this.phone,

          }
    },
      msgCodeParams(){
        return {
            mcode: this.formLeft.code,
            mobile: this.formLeft.phone
        }
      }
  },

  methods: {
    ...mapActions({
                   setCurrentStep: 'CURRENT_STRP'
            }),
    sendMsg(){
        this.$S.SEND_MSG_CODE(this.sendCodeParams).then( data => {
            console.log('SEND_PHONE_CODE-11' ,data );

            if( data.code == 100 ){
                this.timeout = 60;
                let countDown = () => {
                    setTimeout(() => {
                        this.timeout = this.timeout - 1;
                        this.timeout > 0 && countDown();
                    }, 1000)
                }
                countDown();
            }
        })
    },

      // 跳转页面
      nextstep(name){

        if( this.success ){
            this.$router.push({ name: '/login/forget-password/set-password' , params: { phone: this.phone }});
            return ;
        }

          this.$refs[name].validate((valid) => {
              if (!valid) {
                  this.$Message.error(valid)
                  return;
              }
              this.$router.push({ name: '/login/forget-password/set-password' , params: { phone: this.phone }})
          })
      }

  },

  filters: {

  },

  created () {

  },

  mounted () {
      this.formLeft.phone = this.$route.params.phone;
      console.log( this.$route.params.phone )
      if( !this.phone ){
          // 手机号不存进入第一步
          console.log( this)
          this.$router.replace({path: '/login/forget-password/confirm-account'})
      } else{
        this.setCurrentStep(1)
      }

  },

  render (h) {

  }
}

</script>


<style lang="less" scoped>

  #authen{
    width: 100%;


    .sendCode{
      display: block;
      height: 40px;
      width: 100%;
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      background: #51bd90;
      font-size: 14px;

      &:hover{
        background: #47cb89;
      }
    }

    .nosendCode{
      display: block;
      height: 40px;
      width: 100%;
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      background: #ccc;
      font-size: 14px;
    }


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
  }

</style>
<style lang="less">


    .ivu-radio-wrapper {

    }

    .ivu-input-large {
      height: 40px;
    }

    .ivu-btn-large{
      width: 100%;
      height: 40px;
    }




</style>