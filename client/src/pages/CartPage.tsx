import React from "react"
import _ from "lodash"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Button, Flex, Text } from "@chakra-ui/react"

import Loader from "../components/Loader"

import { RootState } from "../store"
import { Link } from "react-router-dom"
import CartList from "../components/CartList"

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart)
  const auth = useSelector((state: RootState) => state.auth)
  const [mounted, setMounted] = useState(false)

  const [total, setTotal] = useState(0)

  useEffect(() => {
    //define total cart amount
    const totalSum: number[] = []
    //loop through all product and add to total sum
    _.map(cart.data, (product) =>
      totalSum.push(_.parseInt(product.product_price))
    )
    //set total state
    setTotal(_.sum(totalSum))
    //set component mount state to trues
    setMounted(true)
  }, [cart.data])

  //if component is mounted show loader
  if (!mounted || !cart.data) return <Loader />

  //if cart is empty
  if (_.isEmpty(cart.data)) return <Text>Cart Empty</Text>

  return (
    <>
      <Flex w="100%" wrap="wrap" align="center" justify="center">
        {/* Product List */}
        <Flex direction="column" w="100%" minH="100vh">
          <Text
            as="h1"
            fontSize="24px"
            px={["20px", "150px"]}
            paddingTop="50px"
            fontWeight="bold"
          >
            Cart
          </Text>
          {cart.data &&
            cart.data.map((product: { [key: string]: string }) => (
              <CartList key={product.product_id} product={product} />
            ))}

          {/* Go to checkout */}
          <Flex
            direction="column"
            justify="center"
            align="flex-end"
            w="100%"
            px={["20px", "100px"]}
            py="20px"
          >
            <Flex direction="column">
              <Flex flex="1" fontWeight="bold" fontSize="20px">
                Subtotal:
              </Flex>
              <Flex flex="1" fontSize="18px">
                ${total}
              </Flex>
            </Flex>
            <Flex>
              {/* Proceed to checkout button */}
              <Button type="submit" mt={4} colorScheme="blue">
                {/* redirect user to register page if they are not logged in */}
                <Link
                  to={
                    !auth.isAuthenticated
                      ? "/register?ref=checkout"
                      : "/checkout"
                  }
                >
                  PROCEED TO CHECKOUT
                </Link>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default CartPage
