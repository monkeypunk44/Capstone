import React from "react";

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
} from "@chakra-ui/react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouteLink,
} from "react-router-dom";

import { theme } from "./theme";
import { Navigation } from "./Navigation";

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
          <Heading bg="cyan">Pricer</Heading>
          <Divider orientation="horizontal" />
          <Menu>
            <MenuButton>fcking work</MenuButton>
            <MenuList>
              <MenuItem path="/Account">My Account</MenuItem>
            </MenuList>
          </Menu>

          <Divider orientation="horizontal" />
          <Stack>
            <Input placeholder="kinda meth green" size="md" />
          </Stack>
          <Box mx="auto">
            <Switch>
              <Route path="/contact">Contact</Route>
              <Route path="/faq">FAQ</Route>
            </Switch>
          </Box>
          <Navigation />
        </Flex>
      </Router>
    </ChakraProvider>
  );
};

export default App;
