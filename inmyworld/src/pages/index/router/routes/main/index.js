import login from './login'

export default [
  {
    path: '/',
    redirect: '/home'
  },
  
  /**
   * 首页
   */
  {
    path: '/home',
    name: '/home',
    component: resolve => require.ensure([], () => resolve(require('pages/index/app/home')), 'home'),
  },

  /**
   * 自媒体推广
   */
  {
    path: '/media-promotion',
    name: '/media-promotion',
    component: resolve => require.ensure([], () => resolve(require('pages/index/app/media-promotion')), 'media-promotion')
  },

  /**
   * 网红库
   */
  {
    path: '/celebrity-library',
    name: '/celebrity-library',
    component: resolve => require.ensure([], () => resolve(require('pages/index/app/celebrity-library')), 'celebrity-library')
  },
  {
    // 网红详情
    path: '/celebrity-library/detail',
    name: '/celebrity-library/detail',
    component: resolve => require.ensure([], () => resolve(require('pages/index/app/celebrity-library/detail')), 'celebrity-library/detail')
  },
  ...login
]

