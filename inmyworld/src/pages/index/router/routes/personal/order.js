import config from '../config'

const { personalRouteSpace: routeSpace } = config

export default [
  /**
   * 订单管理
   */
  {
    // 我的订单
    path: routeSpace + '/order',
    name: routeSpace + '/order',
    redirect: routeSpace + '/order/my',
    meta: {

    },
    component: resolve => require.ensure([], () => resolve(require('@/app/personal/order')), 'personal.' + 'order'),
    children: [
      {
        // 我的订单
        path: 'my',
        name: routeSpace + '/order/my',
        meta: {

        },
        component: resolve => require.ensure([], () => resolve(require('@/app/personal/order/my')), 'personal.' + 'order.my')
      },
      {
        // 订单详情
        path: 'my/detail',
        name: routeSpace + '/order/my/detail',
        meta: {

        },
        component: resolve => require.ensure([], () => resolve(require('@/app/personal/order/my/detail')), 'personal.' + 'order.my.detail'),
        children: [{
          path: 'wait-accept',
          name: routeSpace + '/order/my/detail/wait-accept',
          component: resolve => require.ensure([], () => resolve(require('@/app/personal/order/my/detail/wait-accept')), 'personal.' + 'order.my.detail.wait-accept')
        }]
      }
    ]
  }
]