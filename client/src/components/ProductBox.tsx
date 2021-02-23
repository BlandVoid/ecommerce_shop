import { Box, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  product: { [key: string]: string }
}

const ProductBox = ({ product }: Props) => {
  const boxBg = useColorModeValue('#fff', '#242c3d')

  return (
    <Box
      align="flex-start"
      justify="space-around"
      m="20px"
      height="max-content"
      shadow="xl"
      pb="10px"
      w={['100%', '2xs']}
      bgColor={boxBg}
    >
      <Link to={`/product/${product.product_id}`}>
        {/* Product Image */}
        <Image
          src={`/uploads/${product.product_image}.jpg`}
          mb="10px"
          w="100%"
          h={['100%', '2xs']}
          roundedTop="md"
        />

        {/* Product Title */}
        <Text pl="10px" mb="5px" noOfLines={1}>
          {product.product_name}
        </Text>

        {/* Product Price */}
        <Text pl="10px" fontSize="14px" mt="5px">
          ${product.product_price}
        </Text>
      </Link>
    </Box>
  )
}

export default ProductBox
