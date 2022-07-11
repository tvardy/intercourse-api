import { RequestHandler, Request, Response as ExpressResponse } from 'express'
import { ServerResponse as PolkaResponse } from 'http'
import Application, { Context, Response as _KoaResponse } from 'koa'
import { ParsedQs } from 'qs'
import { ParsedUrlQuery } from 'querystring'

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
export interface KoaResponse extends _KoaResponse {}

// declare function DefaultJsonHandler(res: KoaResponse, { status, message }: DefaultJSON): void
declare function DefaultJsonHandler (
  res: SomeResponse | KoaResponse,
  { status, message }: DefaultJSON
): void

// declare function DefaultEmptyHandler(res: KoaResponse, status: number): void
declare function DefaultEmptyHandler (
  res: SomeResponse | KoaResponse,
  status: number
): void

export type Query = ParsedQs | ParsedUrlQuery | undefined
export type PassThroughHandler = (
  jsonFn: typeof DefaultJsonHandler,
  endFn: typeof DefaultEmptyHandler,
  options?: AnyObject
) => SomeHandler | Application.Middleware
export type CombinationHandlerFn = (
  i: CombinationHandlerInput
) => DefaultJSON | Boolean

export interface KoaContext extends Context {}
export interface SomeHandler extends RequestHandler {}
export interface SomeRequest extends Partial<Request> {}
export interface SomeResponse extends PolkaResponse, ExpressResponse {}
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
