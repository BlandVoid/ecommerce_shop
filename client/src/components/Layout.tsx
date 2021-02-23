import { Flex } from '@chakra-ui/react'
import React from 'react'
import Nav from './Nav'

interface Props {
  children: React.ReactChild
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <Flex align="center" justify="center" minH="80vh" py="50px" w="100%">
        {children}
      </Flex>
    </>
  )
}

export default Layout
