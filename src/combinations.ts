import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { CombinationHandler, CombinationHandlerFn, CombinationHandlerInput, DefaultJSON, Method, PassThroughHandler, SomeRequest, SomeResponse, KoaContext, KoaResponse, Query } from "./types"

const isLengthRequired = (str: string): Boolean => {
    return /(di(ck|ldo)|strapon)/.test(str)
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

const getHandler: CombinationHandlerFn = ({ method }) => {
    if (/^get$/i.test(method)) {
        return {
            status: StatusCodes.PARTIAL_CONTENT,
            message: `${ReasonPhrases.PARTIAL_CONTENT}... Put it back... or something else... please.`
        }
    }

    return false
}

const combinations: CombinationHandler[] = [
    {
        regex: /(di(ck|ldo)|strapon)-(pussy|mouth)/,
        react(options) {
            return getHandler(options) || lengthHandler(options)
        }
    },
    {
        regex: /(di(ck|ldo)|strapon)-(ass)/,
        react(options) {
            if (options.query?.condom === undefined) {
                return {
                    status: StatusCodes.UNAUTHORIZED,
                    message: `${ReasonPhrases.UNAUTHORIZED} without ?condom`
                }
            }

            return getHandler(options) || lengthHandler(options)
        }
    },
    {
        regex: /(tongue|finger)-(pussy|mouth)/,
        react(options) {
            return getHandler(options) || true
        }
    },
    {
        regex: /(tongue|finger)-(ass)/,
        react(options) {
            if (options.query?.washed === undefined) {
                return {
                    status: StatusCodes.NOT_ACCEPTABLE,
                    message: `${ReasonPhrases.NOT_ACCEPTABLE} without ass being ?washed`
                }
            }

            return getHandler(options) || true
        }
    }
]

export const combinationsHandler: PassThroughHandler = (json, send, options) => {
    if (options?.isKoa) {
        return (ctx: KoaContext) => innerHandler(ctx, ctx.response)
    }

    return (req: SomeRequest, res: SomeResponse) => innerHandler(req, res)

    function innerHandler(req: SomeRequest | KoaContext, res: SomeResponse | KoaResponse) {
        const { query } = req
        const { what, where } = req.params

        let _length: string | undefined = '0'
        
        if (req.headers) {
            _length = req.headers['content-length']
        }
    
        const length = Number(_length)
        
        if (!length && isLengthRequired(what)) {
            send(res, StatusCodes.LENGTH_REQUIRED)
            return
        } else {
            const result = combinations.find(r => r.regex.test(`${what}-${where}`))
            if (result) {
                const options: CombinationHandlerInput = {
                    method: req.method as Method,
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