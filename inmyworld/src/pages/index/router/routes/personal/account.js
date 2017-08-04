import config from '../config'

const { personalRouteSpace: routeSpace } = config

export default [
  /**
   * 账户中心
   */
  {
    path: routeSpace + '/account',
    name: routeSpace + '/account',
    redirect: routeSpace + '/account/setting',
    meta: {

    },
    component: resolve => require.ensure([], () => resolve(require('@/app/personal/account')), 'personal.' + 'account'),
    children: [
      {
        // 账户设置
        path: routeSpace + '/account/setting',
        name: routeSpace + '/account/setting',
        meta: {

        },
        component: resolve => require.ensure([], () => resolve(require('@/app/personal/account/setting')), 'personal.' + 'account.setting')
      },
      {
        // 账户设置
        path: routeSpace + '/account/settingpassword',
        name: routeSpace + '/account/settingpassword',
        meta: {

        },
        component: resolve => require.ensure([], () => resolve(require('@/app/personal/account/settingPassword')), 'personal.' + 'account.settingpassword')
      }
    ]
  }
]