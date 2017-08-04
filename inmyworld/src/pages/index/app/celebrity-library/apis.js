import srcConfig from 'src/config'
import { getRequestRoots } from 'service/utils'

const { getRoot, postRoot, postRootXForm } = getRequestRoots(srcConfig.APIS.root)

const autoLoading = true






// 网红库
export const WH_DETAIL = getRoot('index/showinfo', {}, {
    autoLoading
})

// 网红库
export const signing = getRoot('/index/showmedialist', {}, {
    autoLoading
})