import config from '../config'

const { personalRouteSpace: routeSpace } = config

export default [
  /**
   * 我要推广
   */
  {
    path: routeSpace + '/promote',
    name: routeSpace + '/promote',
    redirect: routeSpace + '/promote/invitation',
    meta: {

    },
    component: resolve => require.ensure([], () => resolve(require('@/app/personal/promote')), 'personal.' + 'promote'),
    children: [
      {
        // 网红邀约
        path: 'invitation',
        name: routeSpace + '/promote/invitation',
        component: resolve => require.ensure([], () => resolve(require('@/app/personal/promote/invitation')), 'personal.' + 'promote.invitation')
      },
      {
        // 步骤详情
        path: 'invitation/steps',
        name: routeSpace + '/promote/invitation/steps',
        redirect: routeSpace + '/promote/invitation/steps/confirm',
        component: resolve => require.ensure([], () => resolve(require('@/app/personal/promote/invitation/steps')), 'personal.' + 'promote.invitation.steps'),
        children: [
          // 确认邀约
          {
            path: 'confirm',
            name: routeSpace + '/promote/invitation/steps/confirm',
            component: resolve => require.ensure([], () => resolve(require('@/app/personal/promote/invitation/steps/confirm')), 'personal.' + 'promote.invitation.steps.confirm')
          },
          // 填写需求表单
          {
            path: 'fill-requisition',
            name: routeSpace + '/promote/invitation/steps/fill-requisition',
            component: resolve => require.ensure([], () => resolve(require('@/app/personal/promote/invitation/steps/fill-requisition')), 'personal.' + 'promote.invitation.steps.fill-requisition')
          },
          // 提交成功正在审核
          {
            path: 'under-review',
            name: routeSpace + '/promote/invitation/steps/under-review',
            component: resolve => require.ensure([], () => resolve(require('@/app/personal/promote/invitation/steps/under-review')), 'personal.' + 'promote.invitation.steps.under-review')
          }
        ]
      },
      {
        // 需求定制
        path: 'customize',
        name: routeSpace + '/promote/customize',
        meta: {

        },
        component: resolve => require.ensure([], () => resolve(require('@/app/personal/promote/customize')), 'personal.' + 'promote.customize')
      }
    ]
  }
]