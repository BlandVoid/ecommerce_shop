import { Switch, Route } from "react-router-dom"
import { useEffect, lazy, Suspense } from "react"
import { useDispatch } from "react-redux"

import { initialAction, initCartSetup } from "./store/actions"

import LoggedOutRoute from "./utils/LoggedOutRoute"
import LoggedInRoute from "./utils/LoggedInRoute"

import Layout from "./components/Layout"
import Loader from "./components/Loader"

//lazy load all pages
const HomePage = lazy(() => import("./pages/HomePage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const AccountPage = lazy(() => import("./pages/AccountPage"))
const ProductPage = lazy(() => import("./pages/ProductPage"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))
const CartPage = lazy(() => import("./pages/CartPage"))
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"))
const SettingsPage = lazy(() => import("./pages/SettingsPage"))
const OrderPage = lazy(() => import("./pages/OrderPage"))
const ThankYouPage = lazy(() => import("./pages/ThankYouPage"))

const App = () => {
  const dispatch = useDispatch()
  //start initial setup
  useEffect(() => {
    //dispatch initial setup
    dispatch(initialAction())
    //dispatch initial Cart Setup
    dispatch(initCartSetup())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <LoggedOutRoute exact path="/login" component={LoginPage} />
            <LoggedOutRoute exact path="/register" component={RegisterPage} />
            <LoggedInRoute exact path="/account" component={AccountPage} />
            <LoggedInRoute exact path="/checkout" component={CheckoutPage} />
            <LoggedInRoute exact path="/settings" component={SettingsPage} />
            <LoggedInRoute exact path="/thank-you" component={ThankYouPage} />
            <LoggedInRoute
              exact
              path="/order/:order_id"
              component={OrderPage}
            />
            <Route exact path="/product/:id" component={ProductPage} />
            <Route exact path="/cart" component={CartPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </Suspense>
    </>
  )
}

export default App
