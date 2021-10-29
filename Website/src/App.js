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
          minH="100vh"
          flexDirection="column"
        >
          <Heading bg="blush" textAlign="center">
            Pricer
          </Heading>
          {/* box that contains menu and search bar */}
          <Flex bg="blush" alignContent="center" justifyContent="space-between">
            <Menu>
              <MenuButton
                w="15%"
                bg="bb"
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
          <Box mx="auto">
            <Switch>
              <Route path="/contact">Contact</Route>
              <Route path="/faq">FAQ</Route>
              <Route path="/account">Account</Route>
            </Switch>
          </Box>
          <Navigation />
        </Flex>
      </Router>
    </ChakraProvider>
  )
}

export default App
