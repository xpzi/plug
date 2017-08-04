<!--
  注册组件
  libx@inke.cn 20170602
-->
<script>
import IForm from 'iview-ui/form'
import IInput from 'iview-ui/input'
import IButton from 'iview-ui/button'
import { Row as IRow, Col as ICol } from 'iview-ui/grid'
import srcConfig from 'src/config'

const classPrefix = 'p-register'
const loginPath = '/login'

const HOST = srcConfig.HOST;

export default {

  mixins: [],

  props: {

  },

  components: {
    IForm,
    IFormItem: IForm.Item,
    IInput,
    IRow,
    ICol,
    IButton
  },

  data () {
    const $vm = this
    const { regs } = $vm.$common

    return {
      errorInfo: '',
      dynamicPaddwordInfo: '获取验证码',
      // 默认的place文案
      placeholder: {
        telephone: '请输入手机号',
        verificationCode: '请输入验证码',
        password: '请输入密码',
        passwordCheck: '请再次输入密码'
      },

      // 表单数据对象
      formValidate: {
        telephone: '',
        verificationCode: '',
        password: '',
        passwordCheck: ''
      },
      
      // 表单验证规则
      ruleValidate: { 
        telephone: [{
          required: true,
          message: '请输入11位手机号码',
          trigger: 'blur'
        }, {
          type: 'number',
          message: '您输入的手机号码格式有误，需为 11 位数字格式',
          trigger: 'blur',
          max: 11,
          validator: function (rule, value, callback) {
            if (!regs.telephone.test(value)) {
              callback(new Error())
            } else {
              callback()
            }
          }
        },{
          type: 'number',
          trigger: 'blur',
          max: 11,
          validator: function (rule, value, callback) {
            if (!regs.telephone.test(value)) {
              callback()
            } else {
              $vm.$S.PHONE_VERIF( {phone: value} )
              .then((data) => {
                if( data.code == 100){
                  callback(new Error('该手机号已经被注册，请直接登录'))
                }else{
                  callback()
                }
              }).catch( err => {
                callback()
              })
            }
          }
        }],
        verificationCode: [{
          required: true,
          message: '请输入4位短信验证码',
          trigger: 'blur'
        }, {
          required: true,

          trigger: 'blur',
          validator (rule, value, callback) {
              if (!regs.code.test(value)) {
                  callback(new Error('您输入的验证码格式有误，需为4位数字格式'))
              }else{
                    // 在这里接口验证
                  callback();
              }
          }
        }],
        password: [{
          required: true,
          type: 'password',
          trigger: 'blur',
          validator (rule, value, callback) {
              if(value === '' ){
                callback(new Error('登录密码为6-16个字符，请使用字母加数字组合'));
              }else if( !regs.password.test( value) ){
                callback(new Error('请使用字母加数字组合，6-16个字符长度'))
              }else{
                callback();
              }
          }
        }],
        passwordCheck: [{
          required: true,
          type: 'password',
          // message: '密码格式错误',
          trigger: 'blur',
          validator (rule, value, callback) {
            if (value === '') {
              callback(new Error('请使用字母加数字组合，6-16个字符长度'))
            } else if (value !== $vm.formValidate.password) {
              callback(new Error('两次密码输入不一致，请重新输入'))
            } else {
              callback()
            }
          }
        }]
      }
    }
  },

  watch: {
    'formValidate.type' (val) {
      const { placeholder, ruleValidate } = this
      if (val) {
        const validateObj = getValidateObj(val)

        placeholder.password = validateObj.placeholder.password
        ruleValidate.password = validateObj.ruleValidate.password
      }
    }
  },

  computed: {
    getCodeParams(){

      return {
        phone: this.formValidate.telephone
      }
    },
    loginParams(){
      var formValidate = this.formValidate;
      return {
        phone: formValidate.telephone,
        code: formValidate.verificationCode,
        password: formValidate.password,
        re_password: formValidate.passwordCheck,
        text: '1'
      }
    },
    user () {
        return this.$store.state.user
    }
  },

  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          console.log( 'this.loginParams',this.loginParams );
          this.errorInfo = '';
        if (valid) {
          this.$S.PHONE_REGIST(this.loginParams) 
          .then(( data ) => {

            if (data.code == 100) {
              window.location.href = HOST+ 'cptuser/index/index';
            }else{

              this.errorInfo = '！您输入的验证码不正确，请重新输入'
              this.$Message.error(data.msg);

            }
          }).catch( err => {
            this.$Message.error('表单验证失败')
          })
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    getMessageCode (name) {
      this.$refs[name].validateField('telephone',(valid) => {
          if ( !valid ) {
              this.$S.SEND_PHONE_CODE( this.getCodeParams )
              .then((data) =>{
                if(data.code == 100 ){
                  this.$Message.success('发送成功!')

                  // 60s后可以发送验证码
                  let time = 60;
                  let timer = setInterval(() => {
                      this.dynamicPaddwordInfo = --time + 's后重新发送'
                      if( time <= 0 ){
                          clearInterval(timer);
                          this.dynamicPaddwordInfo = '获取验证码'
                      }
                  }, 1000 );
                }
                console.log( data )
              })
          } else {
              this.$Message.error(valid)
          }
      })
    }
  },

  filters: {

  },

  created () {

  },

  mounted () {

  },

  render (h) {
    const {
      placeholder,
      ruleValidate,
      formValidate,
      handleSubmit,
      handleReset,
      dynamicPaddwordInfo,
      getMessageCode,
      errorInfo
    } = this

    return (
      <div v-title="映天下 | 注册"  class={`${classPrefix}-content`}>
        <h2 class={`${classPrefix}-title`}>用户注册</h2>
        <i-form ref="formValidate"
          model={formValidate}
          class={`${classPrefix}-form-wrapper`}
          rules={ruleValidate} label-width={0}>
          <i-form-item 
            class={`${classPrefix}-form-item`} prop="telephone">
            <i-input 
              size="large"
              value={formValidate.telephone} 
              on-input={(val) => {
                formValidate.telephone = val
              }} 
              maxlength={11}
              placeholder={placeholder.telephone}>
            </i-input>
          </i-form-item>

          <i-form-item error={errorInfo} class={`${classPrefix}-form-item`} prop="verificationCode">
            <i-row gutter={12}>
              <i-col span="12">
                <i-input
                  maxlength={4}
                  size="large"
                  value={formValidate.verificationCode} 
                  on-input={(val) => {
                    formValidate.verificationCode = val
                  }} 
                  size="large"
                  placeholder={placeholder.verificationCode}>
                </i-input>
              </i-col>

              <i-col span="12">
                <i-button type="primary"
                  disabled={ dynamicPaddwordInfo !== '获取验证码' }
                  class={`${classPrefix}-btn`} 
                  long={true}
                  size="large" on-click={() => { getMessageCode('formValidate') }}>{ dynamicPaddwordInfo }</i-button>
              </i-col>
            </i-row>
          </i-form-item>

          <i-form-item class={`${classPrefix}-form-item`} prop="password">
            <i-input 
              size="large"
              type="password"
              value={formValidate.password} 
              on-input={(val) => {
                formValidate.password = val
              }} 
              maxlength={16}
              placeholder={placeholder.password}>
            </i-input>
          </i-form-item>

          <i-form-item class={`${classPrefix}-form-item`} prop="passwordCheck">
            <i-input 
              size="large"
              type="password"
              value={formValidate.passwordCheck} 
              on-input={(val) => {
                formValidate.passwordCheck = val
              }} 
              maxlength={16}
              placeholder={placeholder.passwordCheck}>
            </i-input>
          </i-form-item>
          
          <i-form-item class={`${classPrefix}-btn-wrapper`}>
            <i-button 
              type="primary" 
              class={`${classPrefix}-btn`} 
              long={true}
              size="large" on-click={() => { handleSubmit('formValidate') }}>《同意协议并注册》</i-button>
          </i-form-item>

          <i-form-item prop="isAutoLogin">
            <i-row>
              <i-col span="8">
                <router-link class={`${classPrefix}-link-item ${classPrefix}-link-active`} to={{path:'/static/agreement'}}>映天下用户协议</router-link>
              </i-col>
              <i-col span="8" offset="8">
                <span class={`${classPrefix}-link-item`}>已有账号</span>
                <router-link class={`${classPrefix}-link-item ${classPrefix}-link-active`} to={{path: '/login'}}>在此登录</router-link>
              </i-col>
            </i-row>
          </i-form-item>
        </i-form>
      </div>
    )
  }
}
</script>


<style lang="less" scoped>
@import '~common/less/variable';

@component-prefix: ~'p-register';

.@{component-prefix} {
  &-content {

  }

  &-title {
    font-size: 20px;
    color: #546064;
    line-height: 20px;
    margin-bottom: 20px;
  }

  &-telephone-wrapper {
    // margin-bottom: 14px;
  }
  
  &-btn-wrapper {
    padding-top: 13px;
    margin-bottom: 13px;
  }
  
  &-btn {
    height: 40px;
  }

  &-form-wrapper {
    .ivu-form-item:last-of-type {
      margin-bottom: 0;
    }
  }

  &-link {
    &-item {

    }

    &-active {
      color: @var-theme-color
    }
  }
}
</style>

<style lang="less">
@component-prefix: ~'p-register';

.@{component-prefix} {
  &-form-wrapper {
    .ivu-input-large {
      height: 40px;
    }
  }
}
</style>