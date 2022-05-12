import { Router } from 'express'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

import { DefaultJSON, Method, SomeHandler, SomeRequest, SomeResponse } from '../types'

import routes from '../routes'

const router = Router()
const middleware = (): SomeHandler => router

const sendDefaultJSON = (res: SomeResponse, { status, message }: DefaultJSON) => {
    res.status(status).json({ status, message })
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
        message = getReasonPhrase(StatusCodes.OK),
        handler
    }) => {
        let _handler = handler ?
            handler(sendDefaultJSON, send)
            :
            ((req: SomeRequest, res: SomeResponse) => sendDefaultJSON(res, { status, message }))

        router[method](route, _handler)
        
        allow.push(method)
    })

    router.options(route, (req, res: SomeResponse) => {
        res
            .set('Allow', allow.map(s => s.toUpperCase()).join(', '))
            .end()
    })
})

export default middleware