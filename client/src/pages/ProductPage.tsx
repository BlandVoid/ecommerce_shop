import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import { cartAddAction } from '../store/actions'

import Loader from '../components/Loader'
import NotFoundPage from './NotFoundPage'

import HelmetTitle from '../components/HelmetTitle'
import HelmetDesc from '../components/HelmetDesc'
import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { RootState } from '../store'

const ProductPage = () => {
  const dispatch = useDispatch()
  const match = useRouteMatch<{ id: string }>()

  const cart = useSelector((state: RootState) => state.cart)

  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [product, setProduct] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    //get product from api async func
    ;(async () => {
      try {
        //set product state to empty
        setProduct({})
        //set loading state to false
        setIsLoading(true)
        //get single product data from api
        const { data } = await axios.get(`/api/v1/product/${match.params.id}`)
        //set product state with product data from api
        setProduct(data)
        //set loading state to false after successful data fetch
        setIsLoading(false)
      } catch (error) {
        // on error
        setIsLoading(false)
        // set product sate to empty
        setProduct({})
      }
    })()
    //set component mount state to true
    setMounted(true)
  }, [match.params.id])

  // Add to cart handler
  const addToCartHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    //check if product already exist in cart state
    if (_.some(cart.data, { product_id: product.product_id })) return
    //dispatch cart add action
    dispatch(cartAddAction(product))
  }

  //if component not mounted show loader
  if (!mounted || isLoading) return <Loader />

  //if no products found
  if (_.isEmpty(product)) return <NotFoundPage />

  return (
    <>
      <HelmetTitle title={_.toString(product.product_name)} />
      <HelmetDesc desc={_.toString(product.product_desc)} />
      <>
        <Flex direction="column" w="100%">
          {/* Main */}
          <Flex
            flex="1"
            justify="center"
            align="center"
            p={['10px', '50px']}
            wrap={['wrap-reverse', 'wrap-reverse', 'wrap-reverse', 'wrap']}
          >
            {/* Product Detail */}
            <Flex direction="column" my="40px" flex="1" p="20px">
              {/* Product Title */}
              <Text as="h1" fontWeight="bold" fontSize="30px" my="10px">
                {product.product_name}
              </Text>
              {/* Product Price */}
              <Text as="h1" my="10px" fontWeight="bold" fontSize="18px">
                ${product.product_price}
              </Text>
              {/* Product Description */}
              {product.product_desc}
              {/* Add To cart button */}
              <Button
                type="submit"
                onClick={addToCartHandler}
                minW="200px"
                w={['100%', '100%', '20%']}
                mt="40px"
                // backgroundColor="tomato"
                colorScheme="blue"
              >
                ADD TO CART
              </Button>
            </Flex>
            {/* Product Image */}
            <Image
              src={`/uploads/${product.product_image}.jpg`}
              minW="2xs"
              minH="2xs"
              w={['2xs', 'xs', 'sm']}
              h={['2xs', 'xs', 'sm']}
            />
          </Flex>
        </Flex>
      </>
    </>
  )
}

export default ProductPage
