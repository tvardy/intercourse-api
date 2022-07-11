import Application, { Context } from 'koa'
import Router from '@koa/router'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

import { stripRoute } from '../utils/stripRoute'

import { DefaultJSON, Method } from '../types'

import routes from '../shared/routes'

const router = new Router()

const sendDefaultJSON = (ctx: any, { status, message }: DefaultJSON) => {
  ctx.status = status
  ctx.body = { status, message }
}

const send = (ctx: any, status: number) => {
  ctx.body = ''
  ctx.status = status
}

Object.keys(routes).forEach((route): void => {
  const variations = routes[route]
  const allow: Method[] = []

  variations.forEach(
    ({ method, status = StatusCodes.OK, message, handler }) => {
      const _message = message || getReasonPhrase(status)
      const _handler = handler
        ? handler(sendDefaultJSON, send, { isKoa: true })
        : (ctx: Context) =>
            sendDefaultJSON(ctx.response, { status, message: _message })

      if (route.match('teen')) {
        // couldn't match the `teen` route group the other way :(
        const _routes = stripRoute(route)
        _routes.forEach(_route => {
          router[method](_route, _handler as Application.Middleware)
        })
      } else {
        router[method](route, _handler as Application.Middleware)
      }

      allow.push(method)
    }
  )

  router.options(route, ctx => {
    ctx.status = 200
    ctx.body = ''
    ctx.set('Allow', allow.map(s => s.toUpperCase()).join(', '))
  })
})

export default router
