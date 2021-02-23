import { Request, Response, NextFunction } from "express"
import createHttpError from "http-errors"
import _ from "lodash"
// Import Products
import products from "../helper/products.helper.json"

//get all product
export const productsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json(products)
}

//get single product
export const productController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get product id from request parameter
  const { id } = req.params
  //get single product from products
  const product = _.filter(products, (item) => item.product_id === id)
  //if product is empty return 404 error
  if (_.isEmpty(product)) return next(new createHttpError.NotFound())
  //return single product
  res.json(...product)
}
