import {
  RequestHandler,
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express'
import { Request as PolkaRequest } from 'polka'
import { ServerResponse as PolkaResponse } from 'http'
import Application, {
  Context as KoaContext,
  Request as KoaRequest,
  Response as KoaResponse
} from 'koa'

export type Method =
  | 'all'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head'
export type AnyObject = { [key: string]: any }

declare function DefaultJsonHandler (
  res: SomeResponse | KoaResponse,
  { status, message }: DefaultJSON
): void

declare function DefaultEmptyHandler (
  res: SomeResponse | KoaResponse,
  status: number
): void

export type PassThroughHandler = (
  jsonFn: typeof DefaultJsonHandler,
  endFn: typeof DefaultEmptyHandler,
  options?: AnyObject
) => SomeHandler | Application.Middleware

export type CombinationHandlerFn = (
  i: CombinationHandlerInput
) => DefaultJSON | Boolean

export type SomeHandler = RequestHandler | Application.Middleware
export type SomeRequest = ExpressRequest | PolkaRequest | KoaRequest
export type SomeResponse = ExpressResponse | PolkaResponse | KoaResponse

export {
  RequestHandler,
  ExpressRequest,
  ExpressResponse,
  PolkaRequest,
  PolkaResponse,
  KoaRequest,
  KoaResponse,
  KoaContext
}

export interface CombinationHandler {
  regex: RegExp
  react: CombinationHandlerFn
}

export interface CombinationHandlerInput {
  method: Method
  length: number
  query: AnyObject | undefined
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
