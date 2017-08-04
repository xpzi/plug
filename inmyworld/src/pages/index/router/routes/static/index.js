export default [
  {
    path: '/static',
    name: '/static',
    component: resolve => require.ensure([], () => resolve(require('@/app/static')), 'static'),
    children: [
    	  /**
		   * 关于我们
		   */
		{
		    path: 'about',
		    name: '/static/about',
		    component: resolve => require.ensure([], () => resolve(require('@/app/static/about')), 'static.about'),
		},

		  /**
		   * 帮助中心
		   */
		{
		    path: 'help',
		    name: '/static/help',
		    component: resolve => require.ensure([], () => resolve(require('@/app/static/help')), 'static.help')
		},

		  /**
		   * 用户协议
		   */
		{
		    path: 'agreement',
		    name: '/static/agreement',
		    component: resolve => require.ensure([], () => resolve(require('@/app/static/agreement')), 'static.agreement')
		}
    ]
  }
]

