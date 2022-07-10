import { StatusCodes } from 'http-status-codes'
import { ArraysOfTypeByKey, RouteVariation } from './types'
import { combinationsHandler } from './combinations'

const routes: ArraysOfTypeByKey<RouteVariation> = {
    '/escort/:details?': [
        { method: 'all', status: StatusCodes.PAYMENT_REQUIRED }
    ],
    '/harem': [
        { method: 'get', status: StatusCodes.MULTIPLE_CHOICES },
        { method: 'post', status: StatusCodes.MULTIPLE_CHOICES },
        { method: 'put', status: StatusCodes.MULTIPLE_CHOICES },
        { method: 'patch', status: StatusCodes.MULTIPLE_CHOICES },
        { method: 'head', status: StatusCodes.MULTIPLE_CHOICES },
        { method: 'delete', status: StatusCodes.METHOD_NOT_ALLOWED }
    ],
    '/:i(gangbang|orgy)': [
        { method: 'all', status: StatusCodes.TOO_MANY_REQUESTS }
    ],
    '/coffee': [
        { method: 'all', status: StatusCodes.IM_A_TEAPOT }
    ],
    '/:i(strapon|dildo|highheels|latex|handcuffs|ropes|stripes|lingerie|clothes)/:details?': [
        { method: 'get', status: StatusCodes.OK },
        { method: 'put', status: StatusCodes.ACCEPTED }
    ],
    '/:i((under|teen)age|teen(ager)?)': [
        { method: 'all', status: StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS }
    ],
    '/:i(ejaculation|cum|orgasm)': [
        { method: 'get', status: 425, message: 'Too early' }
    ],
    '/:what?/from/:where?': [
        { method: 'get', handler: combinationsHandler }
    ],
    '/:what?/into/:where?': [
        { method: 'put', handler: combinationsHandler }
    ],
}

export default routes