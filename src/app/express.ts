import express, { Application, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { config } from '../config'

import intercourse from '../middleware/express'

const app: Application = express()

const port: string | number = config.port

app.use(intercourse())

app.get('/', (req, res: Response) => {
  res.json({
    app: 'Express Intercourse API'
  })
})

app.all('*', (req, res: Response) => {
  const status = StatusCodes.NOT_FOUND
  res.status(status).json({ status, message: ReasonPhrases.NOT_FOUND })
})

app.listen(port, () => {
  console.log(`Express App is listening on port ${port}`)
})