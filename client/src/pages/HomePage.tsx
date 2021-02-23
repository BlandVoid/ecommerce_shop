import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Flex, Text } from '@chakra-ui/react'
import _ from 'lodash'

import { RootState } from '../store'
import { productsAction } from '../store/actions'

import Loader from '../components/Loader'
import ProductBox from '../components/ProductBox'
import { PRODUCTS_CLEAR } from '../store/products/types'
import HelmetTitle from '../components/HelmetTitle'
import HelmetDesc from '../components/HelmetDesc'

const HomePage = () => {
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // get all product on mount
    dispatch(productsAction())
    //set component mount to true
    setMounted(true)
    // Clear product on page un mount
    return () => {
      dispatch({
        type: PRODUCTS_CLEAR,
        payload: { isLoading: false, data: [], error: null },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //show loader if product is loading or components not mounted
  if (products.isLoading || !mounted) return <Loader />

  //show if no products found
  if (_.isEmpty(products.data)) return <Text>No Product Found</Text>

  return (
    <>
      <HelmetTitle title="TechShop" />
      <HelmetDesc desc="Buy Products Online" />
      {/*  */}
      <Flex wrap="wrap" align="center" justify="center">
        {/* Products Grid */}
        {products.data &&
          products.data.map((product: { [key: string]: string }) => (
            <ProductBox key={product.product_id} product={product} />
          ))}
      </Flex>
    </>
  )
}

export default HomePage
