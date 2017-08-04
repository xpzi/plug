import config from '../config'

const { personalRouteSpace: routeSpace } = config

export default [
  /**
   * 财务管理
   */
  {
    path: routeSpace + '/financial',
    name: routeSpace + '/financial',
    redirect: routeSpace + '/financial/balance',
    meta: {

    },
    component: resolve => require.ensure([], () => resolve(require('@/app/personal/financial')), 'personal.' + 'financial'),
    children: [
      {
        // 账户余额
        path: 'balance',
        name: routeSpace + '/financial/balance',
        meta: {

        },
        component: resolve => require.ensure([], () => resolve(require('@/app/personal/financial/balance')), 'personal.' + 'financial.balance')
      },
      {
        // 财务流水
        path: 'flow',
        name: routeSpace + '/financial/flow',
        meta: {

        },
        component: resolve => require.ensure([], () => resolve(require('@/app/personal/financial/flow')), 'personal.' + 'financial.flow')
      }
    ]
  }
]