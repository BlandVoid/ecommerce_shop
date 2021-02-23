import express from "express"
import expressAsyncHandler from "express-async-handler"

import {
  authController,
  loginAuthController,
  logoutAuthController,
  passwordAuthController,
  registerAuthController,
  authUpdateController,
} from "../controllers/auth.controller"
import { isAuthenticated } from "../middlewares/auth.middleware"

const router = express.Router()

//
router.route("/register").post(expressAsyncHandler(registerAuthController))
//
router.route("/login").post(expressAsyncHandler(loginAuthController))
//
router.route("/").get(expressAsyncHandler(authController))
//
router.route("/logout").delete(expressAsyncHandler(logoutAuthController))
router
  .route("/")
  .put(isAuthenticated, expressAsyncHandler(authUpdateController))

//
router
  .route("/password")
  .put(isAuthenticated, expressAsyncHandler(passwordAuthController))

export default router
