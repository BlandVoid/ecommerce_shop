import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'

import { keys } from '../configs/keys.config'
import { pool } from '../configs/pg.config'

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //if session doesn't exist return error
    if (!req.session || !req.session.user_id) throw Error()
    //check if user exist in db
    const userRes = await pool.query(
      `SELECT EXISTS(SELECT users.user_id FROM users WHERE users.user_id = $1 LIMIT 1);`,
      [req.session.user_id]
    )
    const user = userRes.rows[0].exists
    if (!user) {
      //clear cookie on redis
      req.session.destroy((err) => {
        if (err) return next(new createHttpError.InternalServerError())
      })
      //clear cookie on browser
      res.clearCookie(keys.SESSION_NAME)
      //throw error
      throw Error()
    }
    return next()
    //
  } catch (error) {
    // return error
    return next(new createHttpError.Unauthorized())
  }
}
