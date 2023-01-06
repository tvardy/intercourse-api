import polka, { Polka } from 'polka'

import { config } from '../config'

import intercourse from '../middleware/polka'
import { SomeRequest, ExpressResponse } from '../types'

const app: Polka = polka()

const port: string | number = config.port

// unfortunately with Polka, we can't use the sup-app/sub-routing on the main path
// we need to provide a string for its root endpoint
app.use('ic', intercourse)

app.get('/', (req: SomeRequest, res: ExpressResponse) => {
  res.writeHead(200, {
    'content-type': 'application/json'
  })
  res.end(JSON.stringify({
    app: 'Polka: Intercourse API'
  }))
})

app.listen(port, () => {
  console.log(`Polka App is listening on port ${port}`)
})
