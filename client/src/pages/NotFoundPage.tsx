import React from 'react'
import { Helmet } from 'react-helmet'
import HelmetDesc from '../components/HelmetDesc'
import HelmetTitle from '../components/HelmetTitle'

const NotFoundPage = () => {
  return (
    <>
      <HelmetTitle title="404" />
      <HelmetDesc desc="Page not found" />
      NotFoundPage
    </>
  )
}

export default NotFoundPage
