import polka, { Polka } from 'polka'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { config } from '../config'

import expressAlike from '../middleware/polkaExpressAlike'
import intercourse from '../middleware/express'

const app: Polka = polka()

const port: string | number = config.port

app.use(expressAlike(), intercourse())

app.get('/', (req, res) => {
    res.json({
        app: 'Polka Intercourse API'
    })
})

app.all('*', (req, res) => {
    const status = StatusCodes.NOT_IMPLEMENTED
    res.status(status).json({ status, message: ReasonPhrases.NOT_IMPLEMENTED })
})

app.listen(port, () => {
    console.log(`Polka App is listening on port ${port}`)
})