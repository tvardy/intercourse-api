import { StatusCodes } from 'http-status-codes'

type Method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'

interface RouteVariation {
    method: Method;
    status: number;
    message?: string;
}

interface ObjectByKeyContainer<type> {
    [key: string]: type[]
}

const routes: ObjectByKeyContainer<RouteVariation> = {
    '/strapon': [
        { method: 'get', status: StatusCodes.OK }
    ]
}

// ideas:
// 100	CONTINUE
// 201	CREATED
// 202	ACCEPTED
// 204	NO_CONTENT
// 300	MULTIPLE_CHOICES
// 305	USE_PROXY
// 402	PAYMENT_REQUIRED
// 405	METHOD_NOT_ALLOWED
// 406	NOT_ACCEPTABLE
// 411	LENGTH_REQUIRED
// 413	REQUEST_TOO_LONG / 413 Payload Too Large
// 415	UNSUPPORTED_MEDIA_TYPE
// 416	REQUESTED_RANGE_NOT_SATISFIABLE
// 418	IM_A_TEAPOT
// 419	INSUFFICIENT_SPACE_ON_RESOURCE
// 421	MISDIRECTED_REQUEST
// 425  Too Early
// 429	TOO_MANY_REQUESTS
// 451	UNAVAILABLE_FOR_LEGAL_REASONS
// 501	NOT_IMPLEMENTED
// 502	BAD_GATEWAY
// 503	SERVICE_UNAVAILABLE

// HEAD
// The HEAD method asks for a response identical to a GET request, but without the response body.

// OPTIONS
// The OPTIONS method describes the communication options for the target resource.

export default routes