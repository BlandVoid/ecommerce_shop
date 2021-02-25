import { Request, Response, NextFunction } from "express"
import createHttpError from "http-errors"
import _ from "lodash"
import { v4 as uuid } from "uuid"

import { stripe } from "../configs/stripe.config"

import { pool } from "../configs/pg.config"

import products from "../helper/products.helper.json"

import { newOrderSchema } from "../utils/validate.util"

export const newOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { address, city, country, zip, order_products } = req.body
  //validate order input
  const value = await newOrderSchema.validateAsync({
    address,
    city,
    country,
    zip,
    order_products,
  })
  //define product list
  const productsList: typeof products = []
  // get all products from products array
  _.forEach(value.order_products, (id) => {
    const detail = _.filter(products, (product) => product.product_id === id)
    productsList.push(...detail)
  })
  //get total price of all ordered products
  const idList = _.map(productsList, (product) => product.product_id)
  //get total price of all ordered products
  const totalPriceList = _.map(productsList, (product) => product.product_price)
  //get total price
  const totalPrice = _.sum(totalPriceList)
  //create order in db
  const {
    rows,
  } = await pool.query(
    `INSERT INTO orders(author_id, address, city, country, zip, order_amount, order_products) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING orders.order_id;`,
    [
      req.session.user_id,
      value.address,
      value.city,
      value.country,
      value.zip,
      totalPrice,
      _.toString(idList),
    ]
  )
  const order = rows[0]

  //
  res.json(order)
}

export const orderDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get order id from request parameter
  const { order_id } = req.params

  //check if order exist on db
  const {
    rows,
  } = await pool.query(
    `SELECT orders.address, orders.city, orders.country, orders.zip, orders.order_amount, orders.paid, orders.order_products FROM orders WHERE orders.order_id = $1 LIMIT 1;`,
    [order_id]
  )
  const order = rows[0]
  if (_.isEmpty(order) || order.paid)
    return next(new createHttpError.NotFound())
  //convert ordered products to array
  const order_products = _.split(order.order_products, ",")
  //define data
  const data = {
    address: order.address,
    city: order.city,
    country: order.country,
    zip: order.zip,
    order_amount: order.order_amount,
    order_products,
  }
  //
  res.json(data)
}

export const orderListController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get all ordered product that are not paid
  const {
    rows,
  } = await pool.query(
    `SELECT orders.order_id FROM orders WHERE orders.author_id = $1 AND orders.paid = FALSE LIMIT 10;`,
    [req.session.user_id]
  )
  const products = rows

  //send products to user
  res.json(products)
}
export const payOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get order detail from request body
  const { order_id, token } = req.body
  //check if product exist in db
  const {
    rows,
  } = await pool.query(
    `SELECT orders.order_amount FROM orders WHERE orders.order_id = $1 AND orders.paid = FALSE AND orders.author_id = $2 LIMIT 1;`,
    [order_id, req.session.user_id]
  )
  const order = rows[0]
  if (_.isEmpty(order))
    return next(new createHttpError.NotFound("Order not found"))

  //create uniq key to prevent duplicate charge
  const idempotencyKey = uuid()
  //create stripe customer
  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  })
  //create stripe charge
  await stripe.charges.create(
    {
      amount: order.order_amount * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
    },
    { idempotencyKey }
  )
  //update order paid status on db
  await pool.query(
    `UPDATE orders SET paid = TRUE WHERE orders.order_id = $1;`,
    [order_id]
  )
  //
  res.json({ message: "Payment successful" })
}
