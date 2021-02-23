import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react"
import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import axios from "axios"
import { showToast } from "../utils/showToast"

const PasswordUpdateModal = () => {
  const { register, errors, handleSubmit, reset } = useForm()

  const [isLoading, setIsLoading] = useState(false)

  const submitHandler = handleSubmit(
    async ({
      update_password,
      update_new_password,
      update_confirm_new_password,
    }) => {
      try {
        //set is loading to true
        setIsLoading(true)
        //make api call to password change api
        const { data } = await axios.put(`/api/v1/auth/password`, {
          password: update_password,
          new_password: update_new_password,
          confirm_new_password: update_confirm_new_password,
        })
        //reset form
        reset()
        //show success toast on api success
        showToast(data.message, "success")
        //set is loading to false
        setIsLoading(false)
      } catch (error) {
        showToast(error.response.data.message)
        //set is loading to false
        setIsLoading(false)
      }
    }
  )

  return (
    <>
      <Stack
        as="form"
        borderRadius={[0, 8]}
        maxWidth="500px"
        onSubmit={submitHandler}
        px={[4, 8]}
        py={12}
        spacing={4}
        marginBottom="20px"
        minW={["300px", "400px"]}
      >
        {/* Password input */}
        <FormControl isInvalid={errors.update_password?.message}>
          <FormLabel>Password</FormLabel>
          <Input
            autoFocus
            aria-label="update_password"
            id="update_password"
            name="update_password"
            ref={register({
              required: "Please enter your password",
            })}
            placeholder="password..."
            type="password"
          />
          <FormErrorMessage>{errors.update_password?.message}</FormErrorMessage>
        </FormControl>

        {/* New Password input */}
        <FormControl isInvalid={errors.update_new_password?.message}>
          <FormLabel>New Password</FormLabel>
          <Input
            aria-label="update_new_password"
            id="update_new_password"
            name="update_new_password"
            ref={register({
              required: "Please enter new password",
            })}
            placeholder="new password..."
            type="password"
          />
          <FormErrorMessage>
            {errors.update_new_password?.message}
          </FormErrorMessage>
        </FormControl>

        {/* Confirm New Password input */}
        <FormControl isInvalid={errors.update_confirm_new_password?.message}>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            aria-label="update_confirm_new_password"
            id="update_confirm_new_password"
            name="update_confirm_new_password"
            ref={register({
              required: "Please confirm new password",
            })}
            placeholder="confirm new password..."
            type="password"
          />
          <FormErrorMessage>
            {errors.update_confirm_new_password?.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" isLoading={isLoading}>
          Change Password
        </Button>
      </Stack>
    </>
  )
}

export default PasswordUpdateModal
