<!--
  登录组件
  libx@inke.cn 20170602
-->

<script>
    import IForm from 'iview-ui/form'
    import IInput from 'iview-ui/input'
    import IRadio from 'iview-ui/radio'
    import ICheckbox from 'iview-ui/checkbox'
    import IButton from 'iview-ui/button'
    import affix from 'iview-ui/affix'
    import alert from 'iview-ui/alert'
    import backTop from 'iview-ui/back-top'
    import badge from 'iview-ui/badge'
    import breadcrumb from 'iview-ui/breadcrumb'
    import card from 'iview-ui/card'
    import carousel from 'iview-ui/carousel'
    import cascader from 'iview-ui/cascader'
    import circle from 'iview-ui/circle'
    import colllapse from 'iview-ui/collapse'
    import datepicker from 'iview-ui/date-picker'
    import loadingbar from 'iview-ui/loading-bar'
    import menu from 'iview-ui/menu'
    import message from 'iview-ui/Message'
    import model from 'iview-ui/Modal'
    import notice from 'iview-ui/Notice'
    import page from 'iview-ui/page'
    import poptip from 'iview-ui/poptip'
    import progress from 'iview-ui/progress'
    import rate from 'iview-ui/rate'
    import select from 'iview-ui/select'
    import slider from 'iview-ui/slider'
    import spin from 'iview-ui/spin'
    import table from 'iview-ui/table'
    import tabs from 'iview-ui/tabs'
    import timepicker from 'iview-ui/time-picker'
    import tree from 'iview-ui/tree'
    import upload from 'iview-ui/upload'
    import tooltip from 'iview-ui/tooltip'
    import transfer from 'iview-ui/transfer'
    import srcConfig from 'src/config'
    import {
        Row as IRow,
        Col as ICol
    } from 'iview-ui/grid'

    import storage from 'utils/store.js';

    const classPrefix = 'p-login'

    const homePath = '/home'
    const HOST = srcConfig.HOST;

    /**
     * 1 : 手机验证码登录
     * 2 : 普通登录
     */
    const DYNAMIC_TYPE = '2'

    let from

    export default {

        mixins: [],

        props: {},

        components: {
            IForm,
            IFormItem: IForm.Item,
            IInput,
            IRadio,
            IRadioGroup: IRadio.Group,
            ICheckbox,
            ICheckboxGroup: ICheckbox.Group,
            IRow,
            ICol,
            IButton
        },

        data () {
            const $vm = this
            const {regs} = $vm.$common
            return {
                errorInfo: '',
                dynamicPaddwordInfo: '获取手机动态密码',
                // 默认的place文案
                placeholder: {
                    telephone: '请输入正确的手机号',
                    code: '动态密码',
                    password: '请输入密码'
                },

                // 表单数据对象
                formValidate: {
                    type: DYNAMIC_TYPE,
                    telephone: '',
                    code: '',
                    password: '',
                    isAutoLogin: ['autoLogin']
                },

                // 表单验证规则
                ruleValidate: {
                    type: [{
                        required: true,
                        message: '请选择一种登录方式',
                        trigger: 'change'
                    }],
                    telephone: [{
                        required: true,
                        message: '手机号不能为空',
                        trigger: 'blur'
                    }, {
                        type: 'number',
                        trigger: 'blur',
                        max: 11,
                        validator: function (rule, value, callback) {
                            // console.log(  'value=======', value);
                            if (!regs.telephone.test(value)) {
                                callback(new Error('请输入正确的手机号'))
                            } else {
                                $vm.$S.PHONE_VERIF({phone: value})
                                .then((data) => {
                                    console.log( 'login PHONE_VERIF data: ' ,data);
                                    switch (data.code) {
                                        case 100:
                                            callback()
                                            break;
                                        case 1:
                                            setTimeout(function(){
                                                window.location.reload();
                                            }, 2000);
                                            callback(new Error('该用户已登录，请刷新页面'))
                                        default:
                                            // statements_def
                                            callback(new Error('该手机号未注册'))
                                            break;
                                    }

                                }).catch(err => {
                                    callback(new Error('该手机号未注册'))
                                })
                            }
                        }
                    }],
                    code: [{
                        required: true,
                        message: '动态密码不能为空',
                        trigger: 'blur'
                    }, {
                        required: true,
                        type: 'password',
                        // message: '动态密码格式错误',
                        trigger: 'blur',
                        validator (rule, value, callback) {

                            if (!regs.code.test(value)) {
                                callback(new Error('请输入4位正确的验证码'))
                            } else {
                                callback();
                            }
                        }
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }, {
                        required: true,
                        type: 'password',
                        // message: '密码格式错误',
                        trigger: 'blur',
                        validator (rule, value, callback) {
                            if( value == ''){
                                callback( new Error('登录密码为6-16个字符，请使用字母加数字组合'))
                            }
                            if (!regs.password.test(value)) {
                                callback(new Error('登录密码为6-16个字符，请使用字母加数字组合'))
                            } else {
                                callback();
                            }
                        }
                    }]
                }
            }
        },

        watch: {},

        computed: {
            loginParams () {
                const {formValidate} = this

                let paramsMap = {
                    // 动态登录
                    1: {
                        code: +formValidate.code
                    },
                    2: {
                        password: formValidate.password
                    }
                }

                return {
                    phone: formValidate.telephone,
                    type: +formValidate.type,
                    auto: formValidate.isAutoLogin.length,
                    ...paramsMap[formValidate.type]
                }
            },
            verify_code(){
                return {
                    phone: this.formValidate.telephone,
                    code: this.formValidate.code
                }
            },
            getCodeParams(){
                return {
                    phone: this.formValidate.telephone
                }
            },
            user () {
                return this.$store.state.user
            }
        },

        methods: {
            handleSubmit (name) {
                const User = this.$store.state.User
                this.$refs[name].validate((valid) => {

                    // console.log('valid',valid)
                    if (!valid) {
                        // 表单验证失败
                        this.$Message.error('表单验证失败!');
                        return;
                    }
                    this.$Message.success('提交成功!');
                    this.errorInfo = '';

                    // console.log( this , this.$store.state.demo.loginJump);
                    this.$S.LOGIN(this.loginParams)
                    .then((data) => {
                        // console.log('data-->s',data);
                        if (data.code != 100) {
                            this.$Message.success('FSDHFHDFKJASFJFJSLDFJ');
                            this.errorInfo = data.msg;
                            return;
                        }
                        
                        this.$Message.success(data.msg);

                        storage.set('userlogin', new Date().getTime(), 'userlogin');

                        // 更新store中的User状态
                        this.$store.commit(User.MUTATION_TYPES.UPDATE_USER_INFO, data.data)

                        // 更改登录信息状态
                        this.$user._setUserPromiseState({
                            isLogin: true,
                            userInfo: data.data,
                        });

                        // // 保存用户信息
                        // let storage = this.$common.storage;
                        // storage.set('user', data.data );

                        // 登录后的跳转
                        var nextpath = this.$route.params.nextPath;
                        if( !nextpath){
                            if( this.$store.state.demo.loginJump ){
                                 this.$router.push({path: this.$store.state.demo.loginJump});
                            }else{
                                window.location.href = HOST + 'cptuser/index/index';
                            }
                        } else if(nextpath.substring(0, 4) == 'http'){
                            window.location.href = nextpath;
                        }else{
                             this.$router.push({path: nextpath || homePath})
                        }

                       
                    })
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
            },
            getMessageCode (name) {
                this.$refs[name].validateField('telephone', (valid, a, b) => {
                    // console.log('valid::::', !valid);
                    if (!!valid) {
                        this.$Message.error(valid)
                        return;
                    }

                    this.$S.SEND_PHONE_CODE(this.getCodeParams)
                        .then((data) => {

                            // console.log(data)
                            if (data.code == 100) {
                                this.$Message.success('发送成功!')

                                // 60s后可以发送验证码
                                let time = 60;
                                let timer = setInterval(() => {
                                    this.dynamicPaddwordInfo = --time + 's后可重新发送'
                                    if (time <= 0) {
                                        clearInterval(timer);
                                        this.dynamicPaddwordInfo = '获取手机动态密码'
                                    }
                                }, 1000);
                            }

                        })

                })
            }
        },

        filters: {},

        created () {

        },

        mounted () {
            storage.setOnStorageListener('userlogin', 'userlogin', function(){
                window.location.reload();
            })
        },

        render (h) {
            const {
                placeholder,
                ruleValidate,
                formValidate,
                handleSubmit,
                getMessageCode,
                handleReset,
                dynamicPaddwordInfo,
                errorInfo
            } = this

            const isDynamiciLogin = formValidate.type === DYNAMIC_TYPE

            return (
                <div v-title="映天下 | 登录" class={`${classPrefix}-content`}>
        <h2 class={`${classPrefix}-title`}>登录页面</h2>
            <i-form ref="formValidate"
            model={formValidate}
        class={`${classPrefix}-form-wrapper`}
            rules={ruleValidate} label-width={0}>

                <i-form-item prop="type">
                <i-radio-group
            size="large"
            value={formValidate.type}
            on-input={val => { formValidate.type = val;   }}
        >
                <i-radio label="2">普通登录</i-radio>
                <i-radio label="1">手机动态密码登录</i-radio>
                </i-radio-group>
                </i-form-item>

                <i-form-item class={`${classPrefix}-telephone-wrapper`} prop="telephone">
                <i-input
            size="large"
            value={formValidate.telephone}
            on-input={(val) => { formValidate.telephone = val }}
            maxlength={11}
            placeholder={placeholder.telephone}>
        </i-input>
            </i-form-item>

            {
                !isDynamiciLogin ? [''].map(() => {
                    let input = <i-col span={12}>
                        <i-input type="text"
                        maxlength={4}
                    size="large"
                    value={formValidate.code}
                    on-input={(val) => { formValidate.code = val }}
                    size="large"
                    placeholder={placeholder.code}>
                    </i-input>
                    </i-col>
                    let btn = <i-col span={12} >
                        <i-button type="primary"
                    disabled={ dynamicPaddwordInfo !== '获取手机动态密码' }
                    class={`${classPrefix}-btn`}
                    long={true}
                    size="large" on-click={() => { getMessageCode('formValidate') }}>{ dynamicPaddwordInfo }</i-button>
                    </i-col>

                    return <i-form-item error={errorInfo} prop="code">
                        <i-row gutter={8}>
                        {input}
                    {btn}
                    </i-row>
                    </i-form-item>
                })
                    : [''].map(() => {
                        return <i-form-item error={errorInfo} prop="password">
                            <i-row>
                            <i-col>
                            <i-input
                        type="password"
                        size="large"
                        value={formValidate.password}
                        on-input={(val) => { formValidate.password = val }}
                        size="large"
                        placeholder={placeholder.password}>
                        </i-input>
                        </i-col>
                        </i-row>
                        </i-form-item>
                    })
            }

            <i-form-item class={`${classPrefix}-btn-wrapper`}>
        <i-button
            type="primary"
        class={`${classPrefix}-btn`}
            long={true}
            size="large" on-click={() => { handleSubmit('formValidate') }}>登录</i-button>
            </i-form-item>

            <i-form-item prop="isAutoLogin">
                <i-row>
                <i-col span="8">
                <i-checkbox-group
            value={formValidate.isAutoLogin} on-input={val => (formValidate.isAutoLogin = val)}
        >
        <i-checkbox  label="autoLogin">自动登录</i-checkbox>
                </i-checkbox-group>
                </i-col>
                <i-col span="10" offset="6">
                <router-link class={`${classPrefix}-link-item`} to={{path: '/login/register'}}>立即注册</router-link>
            <span class={`${classPrefix}-link-item-border`}>|</span>
            <router-link class={`${classPrefix}-link-item`} to={{path: '/login/forget-password'}}>忘记密码</router-link>
            </i-col>
            </i-row>
            </i-form-item>
            </i-form>
            </div>
        )
        },

        beforeRouteEnter (to, _from, next) {
            from = _from
            next()
        }
    }
</script>


<style lang="less" scoped>
    @import '~common/less/variable';

    @component-prefix: ~'p-login';

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

            .ivu-checkbox-wrapper-checked {
                color: @var-theme-color;
            }
        }

        &-link-item {
            &-border {
                color: #546064;
            }

            &:first-of-type {
                padding-right: 10px;
                color: @var-theme-color
            }
            &:last-of-type {
                padding-left: 10px;
            }
        }
    }
    .ivu-col-offset-6{ margin-left: 22%;}
    .ivu-col-span-10{ width: 43.66666667%;}
</style>

<style lang="less">
    @component-prefix: ~'p-login';

    .@{component-prefix} {
        &-form-wrapper {
            .ivu-radio-wrapper {
                font-size: 14px;
                margin-right: 20px;
            }

            .ivu-input-large {
                height: 40px;
            }
        }
    }
</style>