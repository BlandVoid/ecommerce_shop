import React from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  Switch,
  Stack,
} from "@chakra-ui/react"
import { VscAccount } from "react-icons/vsc"
import {
  IoCartOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoLogInOutline,
} from "react-icons/io5"
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai"
import { RiArrowDropDownLine } from "react-icons/ri"

import { RootState } from "../store"
import { logoutAction } from "../store/auth/auth.actions"

const Nav = () => {
  const dispatch = useDispatch()

  const auth = useSelector((state: RootState) => state.auth)

  const cart = useSelector((state: RootState) => state.cart)

  //color mode state
  const { colorMode, toggleColorMode } = useColorMode()

  //get cart products list
  const cartItems = cart.data.length

  //handler user logout
  const logoutHandler = () => dispatch(logoutAction())

  return (
    <Flex
      // w="100%"
      px={["10px", "20px"]}
      alignItems="center"
      justify="space-between"
      py="10px"
      shadow="xl"
      direction={["column", "row", "row", "row"]}
    >
      <Flex flex="1" py={["10px", null, null, null]}>
        <Link to="/">
          <Text
            _hover={{ textDecoration: "underline" }}
            textTransform="uppercase"
            as="h1"
            fontWeight="bold"
            fontSize={["18px", "24px"]}
          >
            TechShop
          </Text>
        </Link>
      </Flex>
      <Flex flex="1" justify="flex-end" py={["10px", null, null, null]}>
        <Flex marginX="5px">
          <Menu>
            <Stack align="center" justify="center" mx="5px">
              <Switch
                onChange={toggleColorMode}
                size="md"
                isChecked={colorMode === "dark"}
              />
            </Stack>
            <Link to="/cart">
              <MenuButton as={Button} mx="5px">
                {/* only show if cart item exists --> more than or equal to 1 */}
                {!cartItems ? null : (
                  <Text
                    position="absolute"
                    top="2px"
                    right="6px"
                    color="tomato"
                  >
                    {cartItems}
                  </Text>
                )}
                <IoCartOutline size="20px" />
              </MenuButton>
            </Link>
          </Menu>
        </Flex>
        <Flex marginX="5px">
          <Menu>
            <MenuButton as={Button} rightIcon={<RiArrowDropDownLine />}>
              <VscAccount />
            </MenuButton>
            <MenuList>
              {/* Check if user is logged in */}
              {auth && !auth.isAuthenticated ? (
                <>
                  <Text
                    as="p"
                    fontWeight="light"
                    fontSize="12px"
                    px="10px"
                    py="5px"
                  >
                    Welcome to TechShop
                  </Text>
                  <Divider />
                  <Link to="/login">
                    <MenuItem>
                      <IoLogInOutline />
                      <Text paddingLeft="10px">Login</Text>
                    </MenuItem>
                  </Link>
                  <Link to="/register">
                    <MenuItem>
                      <AiOutlinePlusCircle />
                      <Text paddingLeft="10px">Register</Text>
                    </MenuItem>
                  </Link>
                </>
              ) : (
                <>
                  {/* Home Menu Item*/}
                  <Link to="/">
                    <MenuItem>
                      <AiOutlineHome />
                      <Text paddingLeft="5px">Home</Text>
                    </MenuItem>
                  </Link>

                  {/*  Account Menu Item*/}
                  <Link to="/account">
                    <MenuItem>
                      <VscAccount />
                      <Text paddingLeft="5px">Account</Text>
                    </MenuItem>
                  </Link>

                  {/* Setting Menu Item*/}
                  <Link to="/settings">
                    <MenuItem>
                      <IoSettingsOutline />
                      <Text paddingLeft="5px">Settings</Text>
                    </MenuItem>
                  </Link>

                  <Divider />
                  <Text onClick={logoutHandler}>
                    <MenuItem marginTop="10px">
                      <IoLogOutOutline />
                      <Text paddingLeft="5px">Logout</Text>
                    </MenuItem>
                  </Text>
                </>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Nav
