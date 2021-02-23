import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react"
import React from "react"
import { useDispatch } from "react-redux"

import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"

import { RootState } from "../store"
import { authUpdateAction } from "../store/actions"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const UserUpdateModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch()

  const { register, errors, handleSubmit } = useForm()

  const auth = useSelector((state: RootState) => state.auth)

  const submitHandler = handleSubmit(
    ({ update_email, update_first_name, update_last_name }) =>
      dispatch(
        authUpdateAction(
          {
            email: update_email,
            first_name: update_first_name,
            last_name: update_last_name,
          },
          onClose
        )
      )
  )

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              as="form"
              borderRadius={[0, 8]}
              maxWidth="500px"
              onSubmit={submitHandler}
              px={[4, 8]}
              py={12}
              spacing={4}
              marginBottom="20px"
            >
              {/* First Name input */}
              <FormControl isInvalid={errors.update_first_name?.message}>
                <FormLabel>First Name</FormLabel>
                <Input
                  autoFocus
                  aria-label="update_first_name"
                  id="update_first_name"
                  name="update_first_name"
                  defaultValue={auth.data.first_name}
                  ref={register({
                    required: "Please enter your first name",
                  })}
                  placeholder="update first name..."
                />
                <FormErrorMessage>
                  {errors.update_first_name?.message}
                </FormErrorMessage>
              </FormControl>
              {/* Last Name input */}
              <FormControl isInvalid={errors.update_last_name?.message}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  aria-label="update_last_name"
                  id="update_last_name"
                  name="update_last_name"
                  defaultValue={auth.data.last_name}
                  ref={register({
                    required: "Please enter your last name",
                  })}
                  placeholder="update last name..."
                />
                <FormErrorMessage>
                  {errors.update_last_name?.message}
                </FormErrorMessage>
              </FormControl>
              {/* EMail input */}
              <FormControl isInvalid={errors.update_email?.message}>
                <FormLabel>Email</FormLabel>
                <Input
                  aria-label="update_email"
                  id="update_email"
                  name="update_email"
                  defaultValue={auth.data.email}
                  ref={register({
                    required: "Please enter your email",
                  })}
                  placeholder="update_email..."
                />
                <FormErrorMessage>
                  {errors.update_email?.message}
                </FormErrorMessage>
              </FormControl>
              <Button type="submit" isLoading={auth.isLoading}>
                Update
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UserUpdateModal
