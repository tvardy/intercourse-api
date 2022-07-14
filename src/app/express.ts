import express, { Application, RequestHandler, Response } from 'express'

import { config } from '../config'

import intercourse from '../middleware/express'

const app: Application = express()

const port: string | number = config.port

app.get('/', (req, res: Response) => {
  res.json({
    app: 'Express: Intercourse API'
  })
})

app.use(intercourse() as RequestHandler)

app.listen(port, () => {
  console.log(`Express App is listening on port ${port}`)
})
