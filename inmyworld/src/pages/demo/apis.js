import srcConfig from 'src/config'
import { getRequestRoots } from 'service/utils'

const { getRoot, postRoot, postRootXForm } = getRequestRoots(srcConfig.APIS.root)

const autoLoading = true

export const APP_USER_INFO = postRootXForm('goddess/user_info', {}, {
  autoLoading
})
