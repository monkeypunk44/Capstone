import { Flex, Link } from '@chakra-ui/react'
import { Link as RouteLink } from 'react-router-dom'
import React from 'react'

export const Navigation = () => {
  return (
    <Flex
      maxW={{ sm: 540, md: 768, lg: 960, xl: 1200 }}
      mx="auto"
      w="100%"
      bg="blush"
      alignSelf="flex-end"
      minH="100vh"
      justifyContent="space-evenly"
    >
      <Link as={RouteLink} to="/contact" ml="3rem" textColor="black">
        Contact
      </Link>
      <Link as={RouteLink} to="/faq" ml="3rem" textColor="black">
        FAQ
      </Link>
    </Flex>
  )
}
