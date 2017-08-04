<!--
  忘记密码
  开发人名字 时间

-->
<template>
    <div v-title="'映天下 | 忘记密码'" :class="`${classPrefix}-container`">
        <h3 :class="`${classPrefix}-title`">找回密码</h3>
        <div :class="`${classPrefix}-step-wrapper`">
            <i-steps :current="currentStep">
                <i-step content="确认账号"></i-step>
                <i-step content="验证身份"></i-step>
                <i-step content="设置密码"></i-step>
                <i-step content="完成"></i-step>
            </i-steps>
        </div>
        <div :class="`${classPrefix}-form-wrapper`">
            <div :class="`${classPrefix}-form-content`">
                <router-view v-on:increment="incrementTotal"></router-view>
            </div>
        </div>
    </div>
</template>


<script>

    import { mapState, mapGetters, mapActions, mapMutations} from 'vuex'

    import ISteps from 'iview-ui/steps'
    import IButton from 'iview-ui/button'
    import {Col as ICol, Row as IRow} from 'iview-ui/grid'

    const classPrefix = 'p-login-forget-pass'

    const loginPath = '/login'

    const pathNameSpace = '/login/forget-password/'

    const steps = [pathNameSpace + 'confirm-account', pathNameSpace + 'authenticate', pathNameSpace + 'set-password', pathNameSpace + 'complete']

    let $vm

    const getCurrentStep = function ($route) {
        let path = $route.path
        let step = steps.findIndex((key) => path === key)
        return step > -1 ? step : 0
    }

    export default {
        // 写name可使组件查看更严谨
        // name: '',

        mixins: [],

        props: {},

        components: {
            ISteps,
            IButton,
            IStep: ISteps.Step,
            ICol,
            IRow
        },

        data () {
            const {$route} = this

            return {
                // currentStep: getCurrentStep($route),
                classPrefix: 'p-login-forget-pass'
            }
        },

        watch: {},

        computed: {
            ...mapState({
                currentStep(state){
                    return state.demo.currentStep;
                }
            })
        },

        methods: {

            incrementTotal(){
                const {$route} = this
                // getCurrentStep($route);

            },

            preStep () {
                if (this.currentStep > 0) {
                    this.$router.push({path: steps[--this.currentStep]})
                } else if (this.currentStep === 0) {
                    this.$router.push({path: loginPath})
                }
            },

            nextStep (e) {

                if (this.currentStep < steps.length - 1) {
                    this.$router.push({path: steps[++this.currentStep]})
                }
            }
        },

        filters: {},

        created () {
             
        },

        mounted () {

        }
    }

</script>


<style lang="less" scoped>
    @import '~common/less/variable';

    @component-prefix: ~'p-login-forget-pass';
    @container-margin-left: 209px;
    @step-width: 985px;

    .@{component-prefix} {

        &-container {
            height: 469px;
            width: @var-container-width;
            margin: 40px auto;
            background-color: #fff;
        }

        &-title {
            height: 60px;
            line-height: 60px;
            font-size: 14px;
            color: #282828;
            text-indent: 32px;
            border-bottom: 1px solid #F6F6F6;
        }

        &-step-wrapper {
            width: @step-width;
            margin-top: 50px;
            margin-left: @container-margin-left;
        }

        &-form {
            // text-align: center;
            &-wrapper {
                width: (@step-width - @container-margin-left);
                transform: translateX(-10px);
                margin: 0 auto;
            }

            &-content {
                width: 320 + 100px;
                margin: 50px auto 0px;
            }

            &-btn-wrapper {
                padding-top: 50px;
                // width: 200px;
                // position: relative;
                // left: 50%;
                // margin-left: -100px;
            }
        }

    }


</style>

<style lang="less">
    @component-prefix: ~'p-login-forget-pass';

    .@{component-prefix} {
        &-step-wrapper {

            .ivu-steps-horizontal .ivu-steps-content {
                margin-left: -10px;
                margin-top: 5px;
                padding-left: 0;
            }

            .ivu-steps-item:last-of-type {
                .ivu-steps-content {
                    margin-left: 0px;
                }
            }
        }
    }

</style>