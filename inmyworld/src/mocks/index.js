import Mock from 'mockjs'

import demo from './demo'
import login from './login'
import personal from './personal'

const mockObj = Object.assign({}, 
  demo,
  login,
  personal
)

export default {
  intercept (key, serviceParams) {
    let mockItem = mockObj[key]

    mockItem && Mock.mock(mockItem.url, mockItem.type, function () {
      let template = mockItem.template

      return typeof template === 'function' ? template(serviceParams) : template
    })
  }
}