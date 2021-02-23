import { Divider, Flex, Image, Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import React from 'react'
import { Link } from 'react-router-dom'
import { TiDelete } from 'react-icons/ti'

import { cartRemoveAction } from '../store/actions'

interface Props {
  product: { [key: string]: string }
}

const CartList = ({ product }: Props) => {
  const dispatch = useDispatch()

  const cartRemoveHandler = () => {
    dispatch(cartRemoveAction(product))
  }
  return (
    <>
      <Flex
        px={['20px', '20px', '20px', '80px']}
        py="20px"
        wrap="wrap"
        align="center"
        justify="center"
        direction={['column', 'column', 'row', 'row']}
      >
        {/* List Left */}
        <Image
          rounded="md"
          src={`/uploads/${product.product_image}.jpg`}
          minW="2xs"
          minH="2xs"
          h={['2xs', 'sm', '2xs']}
          w={['2xs', 'sm', '2xs']}
        />
        {/* List right */}
        <Flex
          flex="1"
          align="center"
          justify="space-between"
          px={[null, null, '50px']}
          py={['20px', '20px', null]}
          w={['100%', null]}
          my={['20px', null]}
        >
          {/* Product Title */}
          <Flex flex="1">
            <Text
              as="h2"
              fontSize={['14px', '16px', '20px']}
              w="100%"
              noOfLines={2}
              flex="2"
            >
              <Link to={`/product/${product.product_id}`}>
                {product.product_name}
              </Link>
            </Text>
          </Flex>
          {/* Product Price */}
          <Flex justify="flex-end" align="flex-end" flex="1">
            <Text
              as="h1"
              flex="1"
              fontWeight="bold"
              fontSize={['14px', '16px', '18px']}
              textAlign="end"
            >
              ${product.product_price}
            </Text>
          </Flex>
          <Flex flex="1" justify="flex-end">
            <TiDelete
              size="32px"
              cursor="pointer"
              onClick={cartRemoveHandler}
            />
          </Flex>
        </Flex>
      </Flex>
      <Divider size="2xl" />
    </>
  )
}

export default CartList
