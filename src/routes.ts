import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { AnyObject, ArraysOfTypeByKey, DefaultJSON, Method, RouteVariation, SomeRequest, SomeResponse } from './types'

type CombinationHandlerFn = (i: CombinationHandlerInput) => DefaultJSON | Boolean
interface CombinationHandler {
    regex: RegExp
    react: CombinationHandlerFn
}
interface CombinationHandlerInput {
    method: Method
    length: number
    query: AnyObject
}

const lengthHandler: CombinationHandlerFn = ({ length }) => {
    if (length < 16) {
        return true
    }
    return {
        status: StatusCodes.REQUEST_TOO_LONG,
        message: ReasonPhrases.REQUEST_TOO_LONG
    }
}

const combinations: CombinationHandler[] = [
    {
        regex: /(di(ck|ldo))-(pussy|mouth)/,
        react(options) {
            return lengthHandler(options)
        }
    },
    {
        regex: /(di(ck|ldo))-(ass)/,
        react(options) {
            if (options.query['condom'] === undefined) {
                return {
                    status: StatusCodes.UNAUTHORIZED,
                    message: ReasonPhrases.UNAUTHORIZED
                }
            }

            return lengthHandler(options)
        }
    },
    {
        regex: /(tongue|finger)-(pussy|mouth)/,
        react() {
            return true
        }
    },
    {
        regex: /(tongue|finger)-(ass)/,
        react(options) {
            if (options.query['washed'] === undefined) {
                return {
                    status: StatusCodes.NOT_ACCEPTABLE,
                    message: `${ReasonPhrases.NOT_ACCEPTABLE} without a wash`
                }
            }

            return true
        }
    }
]

const routes: ArraysOfTypeByKey<RouteVariation> = {
    '/strapon': [
        { method: 'get', status: StatusCodes.OK },
        { method: 'put', status: StatusCodes.ACCEPTED }
    ],
    '/highheels': [
        { method: 'get', status: StatusCodes.OK },
        { method: 'put', status: StatusCodes.ACCEPTED }
    ],
    '/escort': [
        { method: 'all', status: StatusCodes.PAYMENT_REQUIRED }
    ],
    '/underage': [
        { method: 'all', status: StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS }
    ],
    '/harem': [
        { method: 'all', status: StatusCodes.MULTIPLE_CHOICES }
    ],
    '/gangbang': [
        { method: 'all', status: StatusCodes.TOO_MANY_REQUESTS }
    ],
    '/ejaculation': [
        { method: 'get', status: 425, message: 'Too early' }
    ],
    '/cum': [
        { method: 'get', status: 425, message: 'Too early' }
    ],
    '/coffee': [
        { method: 'all', status: StatusCodes.IM_A_TEAPOT }
    ],
    '/:what?/into/:where?': [
        {
            method: 'put',
            handler(json, send) {
                return (req: SomeRequest, res: SomeResponse) => {
                    const { query } = req
                    const { what, where } = req.params
                    const _length = req.get('Content-Length')
                    const length = Number(_length)
                    
                    if (!length) {
                        send(res, StatusCodes.LENGTH_REQUIRED)
                        return
                    } else {
                        const result = combinations.find(r => r.regex.test(`${what}-${where}`))

                        if (result) {
                            const options: CombinationHandlerInput = {
                                method: 'put',
                                length,
                                query
                            }
                            const reaction = result.react(options)

                            if (typeof reaction !== 'boolean') {
                                json(res, reaction as DefaultJSON)
                                return
                            }

                            if (!!reaction) {
                                json(res, {
                                    status: StatusCodes.OK,
                                    message: `${ReasonPhrases.OK} to put ${what} into ${where}`
                                })
                                return
                            }
                        }
                        
                        if (what && !(/(di(ck|ldo)|tongue|finger)/).test(what)) {
                            json(res, {
                                status: StatusCodes.UNSUPPORTED_MEDIA_TYPE,
                                message: `${ReasonPhrases.UNSUPPORTED_MEDIA_TYPE}: ${what}`
                            })
                            return
                        }

                        if (where && !(/(pussy|mouth|ass)/).test(where)) {
                            json(res, {
                                status: StatusCodes.BAD_GATEWAY,
                                message: ReasonPhrases.BAD_GATEWAY
                            })
                            return
                        }
                        
                        if (!where) {
                            json(res, {
                                status: StatusCodes.MISDIRECTED_REQUEST,
                                message: ReasonPhrases.MISDIRECTED_REQUEST
                            })
                            return
                        }

                        json(res, {
                            status: StatusCodes.SERVICE_UNAVAILABLE,
                            message: `${ReasonPhrases.SERVICE_UNAVAILABLE}: put ${what} into ${where}`
                        })
                    }
                }
            }
        }
    ],
    // '/:what?/from/:where?': [] // GET
}

// ideas:
// + 200  OK
// + 202  ACCEPTED
// 204	NO_CONTENT
// + 300  MULTIPLE_CHOICES
// + 401  UNAUTHORIZED
// + 402  PAYMENT_REQUIRED
// 405	METHOD_NOT_ALLOWED
// + 406  NOT_ACCEPTABLE
// + 411  LENGTH_REQUIRED
// + 413  REQUEST_TOO_LONG / 413 Payload Too Large
// + 415  UNSUPPORTED_MEDIA_TYPE
// 416	REQUESTED_RANGE_NOT_SATISFIABLE
// + 418  IM_A_TEAPOT
// 419	INSUFFICIENT_SPACE_ON_RESOURCE
// + 421  MISDIRECTED_REQUEST
// + 425  Too Early
// + 429  TOO_MANY_REQUESTS
// + 451  UNAVAILABLE_FOR_LEGAL_REASONS
// + 501  NOT_IMPLEMENTED
// + 502  BAD_GATEWAY
// + 503  SERVICE_UNAVAILABLE

export default routes