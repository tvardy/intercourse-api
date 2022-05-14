import { Router } from 'express'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

import { DefaultJSON, Method, SomeHandler, SomeRequest, SomeResponse } from '../types'

import routes from '../routes'

const router = Router()
const middleware = (): SomeHandler => router

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

        router[method](route, _handler)
        
        allow.push(method)
    })

    router.options(route, (_: SomeRequest, res: SomeResponse) => {
        res
            .set('Allow', allow.map(s => s.toUpperCase()).join(', '))
            .end()
    })
})

export default middleware