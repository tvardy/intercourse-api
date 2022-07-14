import polka, { Polka } from 'polka'

import { config } from '../config'

import expressAlike from '../middleware/polkaExpressAlike'
import intercourse from '../middleware/polka'
import { SomeRequest, ExpressResponse } from '../types'

const app: Polka = polka()

const port: string | number = config.port

app.use(expressAlike())
app.use('ic', intercourse())

app.get('/', (req: SomeRequest, res: ExpressResponse) => {
  // ExpressResponse because we've used `expressAlike` middleware
  res.json({
    app: 'Polka: Intercourse API'
  })
})

app.listen(port, () => {
  console.log(`Polka App is listening on port ${port}`)
})
