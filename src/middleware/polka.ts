import polka, { Polka } from 'polka'
import { getReasonPhrase, ReasonPhrases, StatusCodes } from 'http-status-codes'

import expressAlike from './polkaExpressAlike'
import { stripRoute } from '../utils/stripRoute'

import { DefaultJSON, Method, SomeRequest, SomeResponse } from '../types'

import routes from '../routes'

const app: Polka = polka()

app.use(expressAlike())

const sendDefaultJSON = (res: SomeResponse, { status, message }: DefaultJSON) => {
    res.status(status).json({ status, message }).end()
}

const send = (res: SomeResponse, status: number) => {
    res.status(status).end()
}

Object.keys(routes).forEach((route): void => {
    const variations = routes[route]
    const allow: Method[] = []

    variations.forEach(({
        method,
        status = StatusCodes.OK,
        message,
        handler
    }) => {
        let _message = message || getReasonPhrase(status)
        let _handler = handler ?
            handler(sendDefaultJSON, send)
            :
            ((_: SomeRequest, res: SomeResponse) => sendDefaultJSON(res, { status, message: _message }))

        let _routes = stripRoute(route)

        _routes.forEach((_route) => {
            app[method](_route, _handler)
        })
        
        allow.push(method)
    })

    app.options(route, (_: SomeRequest, res: SomeResponse) => {
        res
            .set('Allow', allow.map(s => s.toUpperCase()).join(', '))
            .end()
    })
})

app.all('*', (_, res) => {
    const status = StatusCodes.NOT_IMPLEMENTED
    res.status(status).json({ status, message: ReasonPhrases.NOT_IMPLEMENTED })
})

export default () => app