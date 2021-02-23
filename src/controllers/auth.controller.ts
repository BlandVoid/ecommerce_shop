import { Request, Response, NextFunction } from "express"
import _ from "lodash"
import createHttpError from "http-errors"
import bcrypt from "bcryptjs"

import { pool } from "../configs/pg.config"

import {
  loginSchema,
  passwordUpdateSchema,
  registerSchema,
  authUpdateSchema,
} from "../utils/validate.util"
import { keys } from "../configs/keys.config"

export const registerAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //
  const { email, username, password, confirm_password } = req.body
  //validate input fields
  const value = await registerSchema.validateAsync({
    email,
    username,
    password,
    confirm_password,
  })
  //check if user exist in db
  const userExistRes = await pool.query(
    `SELECT EXISTS(SELECT users.user_id FROM users WHERE users.username = $1 OR users.email = $2 LIMIT 1);`,
    [value.username, value.email]
  )
  const userExist = userExistRes.rows[0].exists
  if (userExist)
    return next(new createHttpError.Conflict("User already exists"))
  //hash password
  const hashedPassword = await bcrypt.hash(value.password, 10)
  //insert new user in db
  const newUserRes = await pool.query(
    `INSERT INTO users (email, username, password) VALUES($1, $2, $3) RETURNING users.user_id, users.username, users.first_name, users.last_name, users.email;`,
    [value.email, value.username, hashedPassword]
  )
  const user = newUserRes.rows[0]
  //set user session
  req.session.user_id = user.user_id
  //send success
  return res.status(201).json({
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  })
}

//
export const loginAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //
  const { username, password } = req.body
  //validate input fields
  const value = await loginSchema.validateAsync({ username, password })
  //check if user exist
  const userExistRes = await pool.query(
    `SELECT EXISTS(SELECT users.user_id FROM users WHERE users.username = $1 LIMIT 1);`,
    [value.username]
  )
  const userExist = userExistRes.rows[0].exists
  if (!userExist) return next(new createHttpError.NotFound("User not found"))
  //get user details
  const userRes = await pool.query(
    `SELECT users.user_id, users.password, users.username, users.first_name, users.last_name, users.email FROM users WHERE users.username = $1 LIMIT 1;`,
    [value.username]
  )
  const user = userRes.rows[0]
  //check password
  const passwordMatched = await bcrypt.compare(value.password, user.password)
  if (!passwordMatched)
    return next(new createHttpError.BadRequest("username/password incorrect"))
  //set user session
  req.session.user_id = user.user_id
  //send success
  return res.json({
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  })
}
//
export const authController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //if session doesn't exist return nothing
  if (!req.session || !req.session.user_id) return res.json()

  //get user details
  const {
    rows,
  } = await pool.query(
    `SELECT  users.username, users.first_name, users.last_name, users.email FROM users WHERE users.user_id = $1 LIMIT 1;`,
    [req.session.user_id]
  )
  const user = rows[0]
  //if user is empty return not found
  if (_.isEmpty(user)) return next(new createHttpError.NotFound())
  //if session  exist return true
  return res.json({
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  })
}
//
export const logoutAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // delete cookie from session store
  req.session.destroy((err) => {
    if (err) return next(new createHttpError.InternalServerError())
  })
  //clear cookie on browser
  res.clearCookie(keys.SESSION_NAME)
  //send logout success
  res.status(204).json()
}
export const authUpdateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { first_name, last_name, email } = req.body

  //validate update input field
  const value = await authUpdateSchema.validateAsync({
    first_name,
    last_name,
    email,
  })

  //update user details on db
  const {
    rows,
  } = await pool.query(
    `UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE users.user_id = $4 RETURNING users.username, users.first_name, users.last_name, users.email;`,
    [value.first_name, value.last_name, value.email, req.session.user_id]
  )

  //get new details
  const details = rows[0]

  //send user details
  res.json(details)
}
//
export const passwordAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, new_password, confirm_new_password } = req.body

  // validate new password
  const value = await passwordUpdateSchema.validateAsync({
    password,
    new_password,
    confirm_new_password,
  })

  //check if password is valid
  const {
    rows: userRows,
  } = await pool.query(
    `SELECT users.password FROM users WHERE users.user_id = $1 LIMIT 1;`,
    [req.session.user_id]
  )
  const userDetails = userRows[0]
  const passwordMatched = await bcrypt.compare(
    value.password,
    userDetails.password
  )
  if (!passwordMatched)
    return next(new createHttpError.BadRequest("incorrect password"))

  //hash password
  const hashedPassword = await bcrypt.hash(value.new_password, 10)

  //update user password with new hashed password
  await pool.query(`UPDATE users SET password = $1 WHERE users.user_id = $2;`, [
    hashedPassword,
    req.session.user_id,
  ])

  res.send({ message: "Password Changed" })
}
