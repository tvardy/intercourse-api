import polka, { Polka } from 'polka'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { config } from '../config'

import expressAlike from '../middleware/polkaExpressAlike'
import intercourse from '../middleware/polka'
import { SomeRequest, SomeResponse } from '../types'

const app: Polka = polka()

const port: string | number = config.port

app.use(expressAlike())
app.use('ic', intercourse())

app.get('/', (req: SomeRequest, res: SomeResponse) => {
    res.json({
        app: 'Polka: Intercourse API'
    })
})

app.listen(port, () => {
    console.log(`Polka App is listening on port ${port}`)
})