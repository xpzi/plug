/**
 * 路由配置
 */

import config from '../config'
import overview from './overview'
import promote from './promote'
import order from './order'
import financial from './financial'
import account from './account'

import { userPromise } from 'user'

const { personalRouteSpace: routeSpace } = config

const loginPath = '/login'

export default [
  {
    // 默认路由
    path: '/personal',
    name: '/personal',
    meta: {},
    redirect: routeSpace + '/overview/overall',
    component: resolve => require.ensure([], () => resolve(require('pages/index/app/personal')), 'index.personal'),

    children: [
      ...overview,

      ...promote,

      ...order,

      ...financial,

      ...account
    ],

    /**
     * 个人中心所有路由需要登录之后才去的
     */
    beforeEnter (to, from, next) {
      // console.log('routes personal beforeEnter')
      userPromise.then((userInfo) => {
        // console.log('routes personal beforeEnter userPromise then')
        next()
      }, () => {
        // 未登录者想来个人中心, 请去登录去
        next({
          path: loginPath,
          query: {
            redirect: to.fullPath
          }
        })
      })
    }
  }
]