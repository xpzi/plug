import entry from 'entry'

import S from 'service'
import * as apis from './apis'

import router from './router'
import store from './store'
import mContainer from 'comModules/container'
S.$extend(apis)

const App = {
  components: { mContainer },

  render (h) {
    return (
      <m-container>
        <div slot="main-container">
          <router-view></router-view>
        </div>
      </m-container>
    )
  }
}


entry(App, {
  router,
  store
})