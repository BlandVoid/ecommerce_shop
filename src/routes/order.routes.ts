import express from "express"
import expressAsyncHandler from "express-async-handler"

import {
  newOrderController,
  orderDetailController,
  orderListController,
  payOrderController,
} from "../controllers/order.controller"
import { isAuthenticated } from "../middlewares/auth.middleware"

const router = express.Router()

router
  .route("/new")
  .post(isAuthenticated, expressAsyncHandler(newOrderController))

router
  .route("/:order_id")
  .get(isAuthenticated, expressAsyncHandler(orderDetailController))

router.route("/").get(isAuthenticated, expressAsyncHandler(orderListController))

router
  .route("/pay")
  .post(isAuthenticated, expressAsyncHandler(payOrderController))

export default router
