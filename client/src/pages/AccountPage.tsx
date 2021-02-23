import {
  Button,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
  Image,
  Divider,
} from "@chakra-ui/react"
import axios from "axios"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FiArrowRight } from "react-icons/fi"

import HelmetTitle from "../components/HelmetTitle"
import Loader from "../components/Loader"
import UserUpdateModal from "../components/UserUpdateModal"
import { RootState } from "../store"
import { showToast } from "../utils/showToast"
import { Link } from "react-router-dom"

const ProfilePage = () => {
  const auth = useSelector((state: RootState) => state.auth)
  const firstBgColor = useColorModeValue("#eee", "#242c3d")
  const secondaryBgColor = useColorModeValue("#fff", "#242c3d")

  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState<[{ [key: string]: string }]>([
    { order_id: "" },
  ])

  const { isOpen, onOpen, onClose } = useDisclosure()
  //
  useEffect(() => {
    ;(async () => {
      //set loading state to true
      setIsLoading(true)
      try {
        //request for all user order list
        const { data } = await axios.get(`/api/v1/order`)
        setData(data)
      } catch (error) {
        showToast(error.response.data.message)
      }
      //set loading state to false
      setIsLoading(false)
    })()
    //set component state to true
    setMounted(true)
  }, [])

  // If component is mounted show loader
  if (!mounted || isLoading) return <Loader />

  return (
    <>
      <HelmetTitle title="Account" />
      {/* Modal  */}
      <UserUpdateModal isOpen={isOpen} onClose={onClose} />
      {/*  */}
      <Flex w="100%" minH="80vh" direction={["column", "column", "row", "row"]}>
        {/* Left Design */}
        <Flex
          flex="1"
          align="flex-start"
          paddingTop="50px"
          justify="center"
          mx="20px"
        >
          <Flex
            borderRadius="10px"
            minW={["300px", "400px", "400px", "400px"]}
            minH="250px"
            bgColor={firstBgColor}
            p="20px"
            direction="column"
            align="center"
            justify="center"
          >
            <Flex
              border="3px solid tomato"
              borderRadius="50%"
              w="200px"
              h="200px"
              justify="center"
              align="center"
              marginTop="-80px"
              bgColor={secondaryBgColor}
            >
              <Image
                src={`http://identicon-1132.appspot.com/${auth.data.username}`}
                w="120px"
                h="120px"
              />
            </Flex>
            <Flex
              direction="column"
              flex="1"
              w="100%"
              align="flex-start"
              justify="center"
            >
              <Flex>@{auth.data.username}</Flex>
              <Flex>{auth.data.email}</Flex>
            </Flex>
            <Button onClick={onOpen} colorScheme="blue" w="100%" marginY="10px">
              Edit
            </Button>
          </Flex>
        </Flex>
        {/* Right Design */}
        <Flex flex="2" mx="20px" direction="column">
          <Flex direction="column">
            {/* Order Title */}
            <Flex direction="column" my="10px">
              <Text as="h1" fontSize="22px" fontWeight="bold">
                Orders
              </Text>
              <Text fontSize="14px">{data.length} Orders</Text>
            </Flex>
            {/* Order List */}
            <Flex
              bgColor={firstBgColor}
              justify="center"
              align="center"
              borderRadius="10px"
              px="20px"
            >
              {_.isEmpty(data) ? (
                <Text>You don't have any order</Text>
              ) : (
                <Flex w="100%" direction="column">
                  {_.map(data, (order) => (
                    <Flex key={order.order_id} borderY="2px solid #fff">
                      <Flex direction="column">
                        <Divider color="blue" minH="5px" />
                        <Text my="10px">Order #: {order.order_id}</Text>
                        <Link to={`/order/${order.order_id}`}>
                          <Flex align="center">
                            <Text my="10px" fontSize="14px">
                              View Order
                            </Text>
                            <Flex marginLeft="5px" color="blue.500">
                              <FiArrowRight />
                            </Flex>
                          </Flex>
                        </Link>
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default ProfilePage
