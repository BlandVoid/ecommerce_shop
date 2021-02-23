import express, { Application, Request, Response, NextFunction } from "express"
import cors from "cors"
import morgan from "morgan"
import path from "path"

import { sessionMiddleware } from "./middlewares/session.middleware"
import { errorHandler, notFound } from "./middlewares/error.middleware"

import authRoutes from "./routes/auth.routes"
import productRoutes from "./routes/product.routes"
import orderRoutes from "./routes/order.routes"
//extend express session
declare module "express-session" {
  interface Session {
    user_id: string
  }
}

//express session
const app: Application = express()

//middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

//session middleware
app.set("trust proxy", 1)
app.use(sessionMiddleware)

//routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/order", orderRoutes)

//error handler
// app.use("/api/v1/*", notFound)
app.use("/api/v1/*", errorHandler)

//images directory
const imageDir = path.join(__dirname, "assets/images")
app.use("/uploads", express.static(imageDir))

// server static assets --> if in prod
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"))
  //
  app.get("*", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

//serve port
const _PORT = process.env.PORT ?? 5000
app.listen({ port: _PORT }, () => console.log(`Listening to port ${_PORT}`))
