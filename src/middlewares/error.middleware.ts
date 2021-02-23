import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import createHttpError from 'http-errors'

import { keys } from '../configs/keys.config'

export const notFound = (req: Request, res: Response, next: NextFunction) =>
  next(new createHttpError.NotFound())

export const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //if error is from joi return 422 error
  if (err.isJoi) err.status = 422
  //if not status code exist return 500
  const statusCode = err.status ?? 500
  //show internal error on production
  const errMsg = keys.NODE_ENV === 'production' ? 'Internal Error' : err.message
  //define error message
  const message = statusCode === 500 ? errMsg : err.message
  //return error to
  return res.status(statusCode).json({ message })
}
