import React from "react"
import { useSelector } from "react-redux"
import { Route } from "react-router-dom"
import Loader from "../components/Loader"
import NotFoundPage from "../pages/NotFoundPage"

import { RootState } from "../store"

interface Props {
  exact: boolean
  path: string
  component: React.FC
}

const LoggedOutRoute = ({ exact, path, component }: Props) => {
  const auth = useSelector((state: RootState) => state.auth)

  //if auth is loading show loader
  if (auth && auth.isLoading) return <Loader />

  //show only if user is not authenticated
  if (auth && !auth.isAuthenticated)
    return <Route exact={exact} path={path} component={component} />
  //show only if user is authenticated
  else return <NotFoundPage />
}

export default LoggedOutRoute
