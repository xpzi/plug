import main from './main'
import personal from './personal'
import _static from './static'

const routes = [
  ...main,

  ...personal,

  ..._static
]

export default routes