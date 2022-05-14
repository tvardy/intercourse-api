import { Handler, Request, Response } from 'express'

export type SomeHandler = Handler
export type SomeRequest = Request
export type SomeResponse = Response
export type Method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'
export type DefaultJsonHandler = (res: SomeResponse, { status, message }: DefaultJSON) => void
export type DefaultEmptyHandler = (res: SomeResponse, status: number) => void
export type PassThroughHandler = (jsonFn: DefaultJsonHandler, endFn: DefaultEmptyHandler) => SomeHandler
export type AnyObject = { [key: string]: any }
export type CombinationHandlerFn = (i: CombinationHandlerInput) => DefaultJSON | Boolean
export interface CombinationHandler {
    regex: RegExp
    react: CombinationHandlerFn
}
export interface CombinationHandlerInput {
    method: Method
    length: number
    query: AnyObject
}
export interface RouteVariation {
    method: Method
    status?: number
    message?: string
    handler?: PassThroughHandler
}

export interface DefaultJSON {
    status: number
    message: string
}

export interface ArraysOfTypeByKey<Type> {
    [key: string]: Type[]
}