import { SomeHandler } from '../types'

const middleware = (): SomeHandler => {
    return function expressAlike(_, res, next) {
        if (!res.status) {
            res.status = function (status: number) {
                res.statusCode = status
                return this
            }
        }

        if (!res.set) {
            res.set = function (field: string, value?: string | string[] | undefined) {
                res.writeHead(res.statusCode, {
                    [field]: value?.toString()
                })
                return this
            }
        }

        if (!res.json) {
            res.json = function (obj) {
                res.writeHead(res.statusCode, {
                    'content-type': 'application/json',
                })
                res.end(JSON.stringify(obj))
                return this
            }
        }

        next()
    }
}

export default middleware