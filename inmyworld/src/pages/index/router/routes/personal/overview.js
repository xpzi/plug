import config from '../config'

const { personalRouteSpace: routeSpace } = config

export default [
  /**
   * 总览
   */
  {
    path: routeSpace + '/overview',
    name: routeSpace + '/overview',
    redirect: routeSpace + '/overview/overall',
    meta: {

    },
    component: resolve => require(['@/app/personal/overview'], resolve),
    children: [
      {
        // 整体情况
        path: 'overall',
        name: routeSpace + '/overview/overall',
        meta: {

        },
        component: resolve => require(['@/app/personal/overview/overall'], resolve)
      }
    ]
  }
]