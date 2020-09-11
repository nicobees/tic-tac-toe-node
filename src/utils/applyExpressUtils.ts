// import { Router, Request, Response, NextFunction } from 'express'
// import { Routes, ApiError, InternalError, NotFoundError } from '../core'
// import { Environment } from '../core/Environment'

// type middlewareRouter = (router: Router) => void;

// export const applyMiddlewareExpress = (middlewareWrappers: middlewareRouter[], router: Router): void => {
//   for (const wrapper of middlewareWrappers) {
//     wrapper(router)
//   }
// }

// export const applyRoutesExpress = (componentsRoutes: Routes[], router: Router): void => {
//   for (const componentRoute of componentsRoutes) {
//     for (const route of componentRoute.getRoutes()) {
//       const { method, path, handler, middlewares = [] } = route;
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       (router as any)[method]('/' + path, [...middlewares, componentRoute.asyncExpressHandler(handler)])
//     }
//   }
// }

// export const applyErrorHandlers = (environment: Environment, router: Router): void => {
//   router.use((req, res, next) => next(new NotFoundError()))

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//     if (error instanceof ApiError) {
//       ApiError.handle(error, res, environment)
//     } else {
//       if (environment.isDevelopment()) {
//         console.error(error)
//         return res.status(500).send(error)
//       }
//       ApiError.handle(new InternalError(), res, environment)
//     }
//   })
// }
