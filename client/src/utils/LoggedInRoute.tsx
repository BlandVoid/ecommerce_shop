import React from "react"
import { useSelector } from "react-redux"
import { Route } from "react-router-dom"

import { RootState } from "../store"

import NotFoundPage from "../pages/NotFoundPage"
import Loader from "../components/Loader"

interface Props {
  exact: boolean
  path: string
  component: React.FC
}

const LoggedInRoute = ({ exact, path, component }: Props) => {
  const auth = useSelector((state: RootState) => state.auth)

  //if auth is loading show loader
  if (auth && auth.isLoading) return <Loader />

  //only show page if user is authenticated
  if (auth && auth.isAuthenticated)
    return <Route exact={exact} path={path} component={component} />
  //show Page not found if not authenticated
  else return <NotFoundPage />
}

export default LoggedInRoute
