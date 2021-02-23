import express from 'express'
import expressAsyncHandler from 'express-async-handler'

import {
  productsController,
  productController,
} from '../controllers/product.controller'

const router = express.Router()

router.route('/').get(expressAsyncHandler(productsController))

router.route('/:id').get(expressAsyncHandler(productController))

export default router
