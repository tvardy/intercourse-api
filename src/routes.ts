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

export default routes