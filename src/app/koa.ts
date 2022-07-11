import Koa from 'koa'

import { config } from '../config'
import middleware from '../middleware/koa'

const port: string | number = config.port
const app = new Koa()

app.use(middleware.routes())

app.use(async ctx => {
  ctx.body = {
    app: 'Koa: Intercourse API'
  }
})

app.listen(port, () => {
  console.log(`Koa App is listening on port ${port}`)
})
