import { userPromise } from 'user'

const homePath = '/home'

export default [
   /**
   * 登录注册
   */
  {
    path: '/login',
    name: '/login',
    component: resolve => require.ensure([], () => resolve(require('@/app/login')), 'login'),
    children: [
      {
        path: 'default',
        name: '/login/login',
        alias: '',
        component: resolve => require.ensure([], () => resolve(require('@/app/login/login')), 'login.login'),
      },
      {
        path: 'register',
        name: '/login/register',
        // redirect: '/register'
        component: resolve => require.ensure([], () => resolve(require('@/app/login/register')), 'login.register')
      }
    ],

    beforeEnter (to, from, next) {
      // 1 已登录的, 不需要看到login页, 直接从来来回哪去 || 去首页, 
      // 2 未登陆的 , 直接去路由
      userPromise.then((data) => {

        if( data.code == 100  ){
            next(from.fullPath || homePath)
        } else{
            next()
        }
      }, () => {
        next()
      })
    }
  },

  // /*
  //   注册
  // */{
  //   path: '/register',
  //   name: '/register',
  //   component: resolve => require.ensure([], () => resolve(require('@/app/login/register')), 'login.register')
  // },


  /**
   * 忘记密码
   */
  {
    path: '/login/forget-password',
    name: '/login/forget-password',
    // redirect: { name: '/login/forget-password/confirm-account' },
    component: resolve => require.ensure([], () => resolve(require('@/app/login/forget-password')), 'login.forget-password'),
    children: [
      {
        // 确认账号
        path: 'confirm-account',
        name: '/login/forget-password/confirm-account',
        alias: '',
        component: resolve => require.ensure([], () => resolve(require('@/app/login/forget-password/confirm-account')), 'login.forget-password.confirm-account')
      },
      {
        // 验证身份
        path: 'authenticate',
        name: '/login/forget-password/authenticate',
        component: resolve => require.ensure([], () => resolve(require('@/app/login/forget-password/authenticate')), 'login.forget-password.authenticate')
      },
      {
        // 设置密码
        path: 'set-password',
        name: '/login/forget-password/set-password',
        component: resolve => require.ensure([], () => resolve(require('@/app/login/forget-password/set-password')), 'login.forget-password.set-password')
      },
      {
        // 完成
        path: 'complete',
        name: '/login/forget-password/complete',
        component: resolve => require.ensure([], () => resolve(require('@/app/login/forget-password/complete')), 'login.forget-password.complete')
      }
    ]
  }
]