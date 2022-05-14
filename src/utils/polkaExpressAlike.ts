import polka from 'polka'
import { SomeHandler } from '../types'

const middleware = (): SomeHandler => {
    return function expressAlike(req, res, next) {

        res.status = function (status: number) {
            res.statusCode = status
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