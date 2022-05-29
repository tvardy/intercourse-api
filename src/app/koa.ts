import Koa from 'koa'

import { config } from '../config'

const port: string | number = config.port
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(port, () => {
    console.log(`Koa App is listening on port ${port}`)
});