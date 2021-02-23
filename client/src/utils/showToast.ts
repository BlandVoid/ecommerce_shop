import { createStandaloneToast } from "@chakra-ui/react"

const toast = createStandaloneToast()

export const showToast = (
  description = "Internal error",
  status: "error" | "success" = "error"
) => {
  const title = status === "error" ? "An error occurred" : "Success"
  toast({
    title,
    description,
    status,
    duration: 2000,
    isClosable: true,
  })
}
