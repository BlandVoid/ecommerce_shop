import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'

interface Props {
  title: string
}

const HelmetTitle = ({ title }: Props) => {
  const location = useLocation()
  return (
    <Helmet>
      {/* Show page title programmatically */}
      {location.pathname !== '/' ? (
        // show page title and site name on every page
        <title>{title} - TechShop</title>
      ) : (
        // show only site title on homepage
        <title>{title} </title>
      )}
    </Helmet>
  )
}

export default HelmetTitle
