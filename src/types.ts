import { Handler } from 'express'

export type Method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'

export interface RouteVariation {
    method: Method
    status: number
    message?: string
    handler?: Handler
}

export interface ArraysOfTypeByKey<Type> {
    [key: string]: Type[]
}