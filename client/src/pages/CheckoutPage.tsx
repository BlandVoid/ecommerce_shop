import React, { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import _ from "lodash"
import { useSelector } from "react-redux"
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

import { RootState } from "../store"

import Loader from "../components/Loader"
import { showToast } from "../utils/showToast"
import { lsSetCart } from "../utils/lsHelper"
import { CART_CLEAR } from "../store/cart/types"
import { useHistory } from "react-router-dom"

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { register, errors, handleSubmit } = useForm()
  const [mounted, setMounted] = useState(false)

  const cart = useSelector((state: RootState) => state.cart)

  const [total, setTotal] = useState(0)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    //define total cart amount
    const totalSum: number[] = []
    //loop through all product and add to total sum
    _.map(cart.data, (product) =>
      totalSum.push(_.parseInt(product.product_price))
    )
    //set total state
    setTotal(_.sum(totalSum))
    //set mount state to true
    setMounted(true)
  }, [cart.data])

  //
  const submitHandler = handleSubmit(
    async ({ address, city, country, zip }) => {
      //define array to store all product id in cart
      const allProducts: string[] = []
      //map through all product and push it to
      _.map(cart.data, (product) => allProducts.push(product.product_id))
      //set loading state to true
      setIsLoading(true)
      try {
        //make new order request to api
        const { data } = await axios.post(`/api/v1/order/new`, {
          address,
          city,
          country,
          zip,
          order_products: allProducts,
        })
        //clear cart from store
        dispatch({ type: CART_CLEAR, payload: { data: [] } })
        //clear cart from local storage
        lsSetCart(JSON.stringify([]))
        //push user to order page
        history.push(`/order/${data.order_id}`)
      } catch (error) {
        showToast(error.response.data.message)
      }
      //set loading state to false
      setIsLoading(false)
    }
  )

  //if data not loaded show loader
  if (!mounted || !cart.data) return <Loader />

  //if cart is empty
  if (_.isEmpty(cart.data)) return <Text>Cart Empty</Text>

  return (
    <>
      <Stack as="form" w="100%" onSubmit={submitHandler}>
        <Flex
          px={["0px", "0px", "30px", "30px"]}
          w="100%"
          align={["center", "center", "center", "flex-start"]}
          justify="space-between"
          minH="80vh"
          direction={["column", "column", "column", "row"]}
        >
          {/* Left Form */}
          <Flex flex="4" align="flex-start" justify="center" mx="20px">
            <Flex
              align="center"
              justify="center"
              direction="column"
              maxW={["350px", "400px", "400px", "500px"]}
              w="500px"
            >
              {/* Left Form Title */}
              <Flex alignSelf="flex-start" my="10px">
                <Text as="h1" fontWeight="bold" fontSize="22px">
                  Billing Details
                </Text>
              </Flex>
              {/* Address Field */}
              <FormControl isInvalid={errors.address?.message}>
                <FormLabel>Address</FormLabel>
                <Input
                  autoFocus
                  aria-label="address"
                  id="address"
                  name="address"
                  ref={register({ required: `Please enter your address` })}
                  placeholder="address.."
                />
                <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
              </FormControl>
              {/* City Field */}
              <FormControl isInvalid={errors.city?.message}>
                <FormLabel>City</FormLabel>
                <Input
                  aria-label="city"
                  id="city"
                  name="city"
                  ref={register({ required: `Please enter your city` })}
                  placeholder="city.."
                />
                <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
              </FormControl>
              {/* Country Field */}
              <FormControl isInvalid={errors.country?.message}>
                <FormLabel>Country</FormLabel>

                <Select
                  aria-label="country"
                  id="country"
                  name="country"
                  ref={register({ required: `Please enter your country` })}
                  defaultValue="usa"
                >
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                  <option value="no">Norway</option>
                </Select>
                <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
              </FormControl>
              {/* ZIP codeField */}
              <FormControl isInvalid={errors.zip?.message}>
                <FormLabel>ZIP code</FormLabel>
                <Input
                  aria-label="zip"
                  id="zip"
                  name="zip"
                  ref={register({ required: `Please enter your zip code` })}
                  placeholder="zip code.."
                />
                <FormErrorMessage>{errors.zip?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
          </Flex>

          {/* Right Form */}
          <Flex flex="3" align="flex-start" justify="center" mx="20px">
            <Flex
              align="center"
              justify="center"
              direction="column"
              maxW={["350px", "400px", "400px", "500px"]}
              w="500px"
            >
              <Flex alignSelf="flex-start" my="10px">
                <Text as="h1" fontWeight="bold" fontSize="22px">
                  Your Order
                </Text>
              </Flex>
              <Flex direction="column" w="100%">
                <Flex my="10px">
                  <Flex flex="1" fontWeight="bold">
                    Product
                  </Flex>
                  <Flex flex="1" fontWeight="bold">
                    Subtotal
                  </Flex>
                </Flex>

                {_.map(cart.data, (product) => (
                  <Flex key={product.product_id} direction="column">
                    <Divider />
                    <Flex my="10px">
                      <Flex flex="1" noOfLines={1}>
                        {product.product_name}
                      </Flex>
                      <Flex flex="1">${product.product_price}</Flex>
                    </Flex>
                  </Flex>
                ))}
                <Divider />
                <Flex>
                  <Flex flex="1" my="10px">
                    <Text fontWeight="bold">Total </Text>
                  </Flex>
                  <Flex my="10px" flex="1" fontWeight="bold">
                    ${total}
                  </Flex>
                </Flex>
                <Flex></Flex>
              </Flex>
              <Button
                colorScheme="blue"
                w="100%"
                my="20px"
                type="submit"
                isLoading={isLoading}
              >
                Place Order
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Stack>
    </>
  )
}

export default CheckoutPage
