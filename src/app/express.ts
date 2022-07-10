import express, { Application, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { config } from '../config'

import intercourse from '../middleware/express'

const app: Application = express()

const port: string | number = config.port

app.get('/', (req, res: Response) => {
  res.json({
    app: 'Express Intercourse API'
  })
})

app.use(intercourse())

app.listen(port, () => {
  console.log(`Express App is listening on port ${port}`)
})