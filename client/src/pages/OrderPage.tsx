import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import _ from "lodash"
import axios from "axios"
import { useHistory, useParams } from "react-router-dom"
import StripeCheckout, { Token } from "react-stripe-checkout"

import Loader from "../components/Loader"
import { showToast } from "../utils/showToast"
import NotFoundPage from "./NotFoundPage"
import { Button, Divider, Flex, Text } from "@chakra-ui/react"
import HelmetTitle from "../components/HelmetTitle"
import { RootState } from "../store"

const OrderPage = () => {
  const params = useParams<{ order_id: string }>()
  const history = useHistory()
  const [mounted, setMounted] = useState(false)

  const auth = useSelector((state: RootState) => state.auth)

  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    ;(async () => {
      try {
        //set component loading state to true
        setIsLoading(true)
        //make request to order api
        const { data } = await axios.get(`/api/v1/order/${params.order_id}`)
        //set order data state
        setData(data)
      } catch (error) {
        //show error on error
        showToast(error.response.data.message)
      }
      //set component loading state to false
      setIsLoading(false)
    })()
    //set component mount state to true
    setMounted(true)
  }, [params.order_id])

  const { order_id } = params

  const onToken = async (token: Token) => {
    try {
      const { data } = await axios.post(`/api/v1/order/pay`, {
        order_id,
        token,
      })
      //show success message on payment
      showToast(data.message, "success")
      //push user to homepage
      history.push("/thank-you")
    } catch (error) {
      showToast(error.response.data.message)
    }
  }

  //
  if (!mounted || isLoading) return <Loader />

  //if order data doesn't exist return not found page
  if (_.isEmpty(data)) return <NotFoundPage />

  return (
    <>
      <HelmetTitle title="Order" />
      {/*  */}
      <Flex
        w="100%"
        px={["0px", "0px", "30px", "40px"]}
        direction={["column", "column", "column", "row"]}
      >
        {/* Left */}
        <Flex flex="4" align="center" justify="center" mx="20px">
          <Flex direction="column" align="flex-start" justify="flex-start">
            <Flex my="10px">
              <Text fontSize={["18px", "22px"]} fontWeight="bold">
                THANK YOU! <br /> YOUR ORDER HAS BEED RECEIVED
              </Text>
            </Flex>
            <Flex my="10px" direction="column">
              <Text my="5px" fontSize="14px" fontWeight="bold">
                Order Information
              </Text>
              <Text fontSize="14px">Order #: {params.order_id}</Text>
            </Flex>
            <Flex my="10px" direction="column">
              <Text my="5px" fontSize="14px" fontWeight="bold">
                Shipping Information
              </Text>
              <Text>{auth?.data?.username}</Text>
              <Text fontSize="14px">
                {data.address}, {data.city}, {data.zip}, {data.country}
              </Text>
            </Flex>
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
                ORDER SUMMARY
              </Text>
            </Flex>
            <Flex direction="column" w="100%">
              <Flex my="10px">
                <Flex flex="1" fontWeight="bold">
                  Items:
                </Flex>
                <Flex flex="1" fontWeight="bold">
                  {data.order_amount}
                </Flex>
              </Flex>
              {/*  */}
              <Divider />
              <Flex my="10px">
                <Flex flex="1" noOfLines={1}>
                  Shipping & handling
                </Flex>
                <Flex flex="1">$0</Flex>
              </Flex>
              {/*  */}
              <Divider />
              <Flex my="10px">
                <Flex flex="1" noOfLines={1}>
                  Tax
                </Flex>
                <Flex flex="1">$0</Flex>
              </Flex>
              {/*  */}
              <Divider />
              <Flex>
                <Flex flex="1" my="10px">
                  <Text fontWeight="bold">Total </Text>
                </Flex>
                <Flex my="10px" flex="1" fontWeight="bold">
                  {data.order_amount}
                </Flex>
              </Flex>
            </Flex>
            <StripeCheckout
              token={onToken}
              stripeKey={process.env.REACT_APP_STRIPE_KEY!}
            >
              <Button
                colorScheme="blue"
                w="100%"
                my="20px"
                type="submit"
                isLoading={isLoading}
              >
                Pay Now
              </Button>
            </StripeCheckout>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default OrderPage
