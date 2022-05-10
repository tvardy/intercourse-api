import { Router, Handler, Response } from 'express'
import { getReasonPhrase } from 'http-status-codes'
import routes from '../routes'

const router = Router()
const middleware = (): Handler => router

Object.keys(routes).forEach((route: string): void => {
    const variations = routes[route]

    variations.forEach(({ method, status }) => {
        const message = getReasonPhrase(status)

        router[method](route, (req, res: Response) => res.status(status).json({ status, message }))
    })
})

export default middleware