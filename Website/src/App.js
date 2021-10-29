import React from 'react'

import {
  ChakraProvider,
  Divider,
  Flex,
  Heading,
  Text,
  Box,
  Link,
  Input,
  Stack,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Icon,
  createIcon,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouteLink,
} from 'react-router-dom'

import { theme } from './theme'
import { Navigation } from './Navigation'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Flex
          maxW={{ sm: 540, md: 768, lg: 960, xl: 1200 }}
          mx="auto"
          w="100%"
          bg="white"
          minH="97vh"
          flexDirection="column"
        >
          <Flex bg="blush" height="min-content" alignContent="center">
            <Heading bg="blush">Pricer</Heading>
          </Flex>
          {/* Flex that contains menu, search bar and login button */}
          <Flex
            bg="blush"
            alignContent="center"
            justifyContent="space-between"
            height="14"
          >
            <Menu>
              <MenuButton
                w="24%"
                bg="bb"
                height="10"
                px={4}
                py={2}
                textColor="black"
                _hover={{ bg: 'mint' }}
                _expanded={{ bg: 'blue.400' }}
                _focus={{ boxShadow: 'outline' }}
              >
                Settings
              </MenuButton>
              <MenuList>
                <MenuItem as={RouteLink} to="/account">
                  Account
                </MenuItem>
              </MenuList>
            </Menu>

            <Input
              w="30%"
              bg="bb"
              px={4}
              py={2}
              variant="flushed"
              _hover={{ bg: 'mint' }}
              _focus={{ boxShadow: 'outline' }}
              placeholder="What can I help you Find?"
            />
            <Button
              colorScheme="blue"
              textColor="black"
              w="24%"
              height="10"
              bg="bb"
              px={4}
              py={2}
              _hover={{ bg: 'mint' }}
              _expanded={{ bg: 'blue.400' }}
              variant="flushed"
            >
              Login/Create Account
            </Button>
          </Flex>

          <Divider orientation="horizontal" />
          <Flex mx="auto">
            <Switch>
              <Route path="/contact">Contact</Route>
              <Route path="/faq">FAQ</Route>
              <Route path="/account">Account</Route>
            </Switch>
          </Flex>
        </Flex>
        <Navigation />
      </Router>
    </ChakraProvider>
  )
}

export default App
