import React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  desc: string
}

const HelmetDesc = ({ desc }: Props) => {
  return (
    <Helmet>
      <meta name="description" content={desc} />
    </Helmet>
  )
}

export default HelmetDesc
