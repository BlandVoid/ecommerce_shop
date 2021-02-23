import { combineReducers } from "redux"
import { History } from "history"
import { connectRouter } from "connected-react-router"

import authReducers from "./auth/auth.reducers"
import productsReducers from "./products/products.reducers"
import cartReducers from "./cart/cart.reducers"

const createRootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducers,
    products: productsReducers,
    cart: cartReducers,
  })
export default createRootReducer
