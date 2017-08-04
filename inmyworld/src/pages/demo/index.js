// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import entry from 'entry'
import App from './app'
import router from './router'
import store from './store'
import observer from 'utils/observer'

import S from 'service'
import * as apis from './apis'

S.$extend(apis)

observer.subscribe('entry-user-info', (data) => {
  console.log('用户信息: ', data)
})

entry(App, {
  router,
  store
})
