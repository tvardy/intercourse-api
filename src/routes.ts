import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { ArraysOfTypeByKey, CombinationHandler, CombinationHandlerFn, CombinationHandlerInput, DefaultJSON, RouteVariation, SomeRequest, SomeResponse } from './types'

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
        regex: /(di(ck|ldo)|strapon)-(pussy|mouth)/,
        react(options) {
            return lengthHandler(options)
        }
    },
    {
        regex: /(di(ck|ldo)|strapon)-(ass)/,
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
    '/:i(strapon|dildo|highheels|latex|handcuffs|ropes|stripes)': [
        { method: 'get', status: StatusCodes.OK },
        { method: 'put', status: StatusCodes.ACCEPTED }
    ],
    '/escort': [
        { method: 'all', status: StatusCodes.PAYMENT_REQUIRED }
    ],
    '/:i((under|teen)age|teen(ager)?)': [
        { method: 'all', status: StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS }
    ],
    '/harem': [
        { method: 'get', status: StatusCodes.MULTIPLE_CHOICES },
        { method: 'post', status: StatusCodes.MULTIPLE_CHOICES },
        { method: 'put', status: StatusCodes.MULTIPLE_CHOICES },
        { method: 'patch', status: StatusCodes.MULTIPLE_CHOICES },
        { method: 'head', status: StatusCodes.MULTIPLE_CHOICES },
        { method: 'delete', status: StatusCodes.METHOD_NOT_ALLOWED }
    ],
    '/gangbang': [
        { method: 'all', status: StatusCodes.TOO_MANY_REQUESTS }
    ],
    '/:i(ejaculation)|(cum)|(orgasm)': [
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

export default routes