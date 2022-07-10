import { Router, Response, Request } from 'express'
import { getReasonPhrase, ReasonPhrases, StatusCodes } from 'http-status-codes'

import { DefaultJSON, Method, SomeHandler } from '../types'

import routes from '../routes'

const router = Router()

const sendDefaultJSON = (res: any, { status, message }: DefaultJSON) => {
    res.status(status).json({ status, message }).end()
}

const send = (res: any, status: number) => {
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
        const _message = message || getReasonPhrase(status)
        const _handler = handler ?
            handler(sendDefaultJSON, send)
            :
            ((_: Request, res: Response) => sendDefaultJSON(res, { status, message: _message }))

        router[method](route, _handler as SomeHandler)
        
        allow.push(method)
    })

    router.options(route, (_, res: Response) => {
        res
            .set('Allow', allow.map(s => s.toUpperCase()).join(', '))
            .end()
    })
})

router.all('*', (_, res: Response) => {
    const status = StatusCodes.NOT_IMPLEMENTED
    res.status(status).json({ status, message: ReasonPhrases.NOT_IMPLEMENTED })
})

const middleware = (): SomeHandler => router

export default middleware