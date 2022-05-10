import express, { Application , Request, Response} from 'express'
import { config } from '../config'
import pack from '../../package.json'

const app: Application = express()

const port: string | number = config.port

app.get('/', (req: Request, res: Response) => {
  res.json({
    app: pack.name,
    version: pack.version
  })
})

app.listen(port, function () {
  console.log(`Express App is listening on port ${port} !`)
})