import { SomeHandler } from '../types'

const middleware = (): SomeHandler => {
    return function expressAlike(req, res, next) {

        res.status = function (status: number) {
            res.statusCode = status
            return this
        }

        res.set = function (field: string, value?: string | string[] | undefined) {
            res.writeHead(res.statusCode, {
                [field]: value?.toString()
            })
            return this
        }

        res.json = function (obj) {
            res.writeHead(res.statusCode, {
                'content-type': 'application/json',
            })
            res.end(JSON.stringify(obj))
            return this
        }

        next()
    }
}

export default middleware