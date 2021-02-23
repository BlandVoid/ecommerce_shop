import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { Link, useLocation } from "react-router-dom"

import { loginAction } from "../store/actions"
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import qs from "qs"

import { RootState } from "../store"
import HelmetTitle from "../components/HelmetTitle"

const LoginPage = () => {
  const dispatch = useDispatch()
  //get url location
  const location = useLocation()

  const auth = useSelector((state: RootState) => state.auth)
  const { handleSubmit, register, errors } = useForm()

  //get all query string from url paramter
  const queryString = qs.parse(location.search, { ignoreQueryPrefix: true })

  //if ref doesn't exist redirect user to homepage
  const refParam = !queryString.ref ? "/" : `/${queryString.ref}`

  //
  const formBg = useColorModeValue("#fff", "#242c3d")

  const submitHandler = handleSubmit(({ username, password }) =>
    dispatch(loginAction(username, password, refParam))
  )

  return (
    <>
      <HelmetTitle title={`Login`} />
      <Stack
        as="form"
        borderRadius={[0, 8]}
        maxWidth="500px"
        onSubmit={submitHandler}
        px={[4, 8]}
        py={12}
        shadow={[null, "2xl"]}
        spacing={4}
        w={["100%", "100%", "500px"]}
        marginBottom="20px"
        bgColor={formBg}
      >
        {/* Go to Home Link */}
        <Flex justify="center">
          <Link to="/">
            <Text as="h2" fontSize="2xl" fontWeight="bold">
              TechShop
            </Text>
          </Link>
        </Flex>
        {/* Username input */}
        <FormControl isInvalid={errors.username?.message}>
          <FormLabel>Username</FormLabel>
          <Input
            autoFocus
            aria-label="username"
            id="username"
            name="username"
            ref={register({ required: `Please enter your username` })}
            placeholder="username..."
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        {/* Password input */}
        <FormControl isInvalid={errors.password?.message}>
          <FormLabel>Password</FormLabel>
          <Input
            aria-label="password"
            id="password"
            name="password"
            ref={register({ required: `Please enter your password` })}
            placeholder="password..."
            type="password"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          id="login"
          type="submit"
          isLoading={auth.isLoading}
          colorScheme="blue"
        >
          Login
        </Button>
        <Text color="blue" textAlign="end">
          <Link
            to={
              !queryString.ref
                ? "/register"
                : `/register?ref=${queryString.ref}`
            }
          >
            Don't have an Account?
          </Link>
        </Text>
      </Stack>
    </>
  )
}

export default LoginPage
