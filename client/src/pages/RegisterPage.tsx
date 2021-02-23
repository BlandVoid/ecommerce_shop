import React from "react"
import qs from "qs"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { Link, useLocation } from "react-router-dom"

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

import { RootState } from "../store"
import { registerAction } from "../store/actions"
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

  const formBg = useColorModeValue("#fff", "#242c3d")

  const submitHandler = handleSubmit(
    ({ email, username, password, confirm_password }) =>
      dispatch(
        registerAction(username, password, email, confirm_password, refParam)
      )
  )

  return (
    <>
      <HelmetTitle title={`Register`} />
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
        {/* Email input */}
        <FormControl isInvalid={errors.email?.message}>
          <FormLabel>Email</FormLabel>
          <Input
            aria-label="email"
            id="email"
            name="email"
            ref={register({ required: `Please enter your email` })}
            placeholder="email..."
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        {/* Username input */}
        <FormControl isInvalid={errors.username?.message}>
          <FormLabel>Username</FormLabel>
          <Input
            aria-label="username"
            id="username"
            name="username"
            ref={register({ required: `Please enter a username` })}
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
            ref={register({ required: `Please enter a password` })}
            placeholder="password..."
            type="password"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        {/*Confirm  Password input */}
        <FormControl isInvalid={errors.confirm_password?.message}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            aria-label="confirm_password"
            id="confirm_password"
            name="confirm_password"
            type="password"
            ref={register({ required: `Please confirm your password` })}
            placeholder="confirm password..."
          />
          <FormErrorMessage>
            {errors.confirm_password?.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          id="login"
          type="submit"
          isLoading={auth.isLoading}
          colorScheme="blue"
        >
          Register
        </Button>
        <Text color="blue" textAlign="end">
          <Link
            to={!queryString.ref ? "/login" : `/login?ref=${queryString.ref}`}
          >
            Already have an account?
          </Link>
        </Text>
      </Stack>
    </>
  )
}

export default LoginPage
