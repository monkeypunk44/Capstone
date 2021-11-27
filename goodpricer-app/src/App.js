import "./App.css";
import React from "react";
import { Route, Switch, Link as RouteLink } from "react-router-dom";

import {
  Flex,
  Heading,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { Navigation } from "./Navigation";

import { HomePage } from "./HomePage";
import { SearchPage } from "./SearchPage";
import { SearchBar } from "./SearchBar";
import { Login } from "./Login";

function App() {
  return (
    <Flex bg="gray.100" paddingLeft="calc(100vw - 100%)">
      <Flex
        maxW={{
          sm: "100%",
          md: "100%",
          lg: "62rem",
          xl: "80rem",
          "2xl": "96rem",
        }}
        mx="auto"
        w="100%"
        bg="white"
        minH="100vh"
        flexDirection="column"
      >
        <Flex bg="themeBlush" alignContent="center">
          <Heading bg="themeBlush" px="6rem">
            Good Pricer
          </Heading>
        </Flex>
        {/* Flex that contains menu, search bar and login button */}
        <Flex
          bg="themeBlush"
          alignContent="center"
          justifyContent="space-around"
          height="min-content"
          flexWrap="wrap"
        >
          <Menu>
            <MenuButton
              fontSize="1rem"
              h="2.5rem"
              w="20rem"
              bg="themeBB"
              textColor="black"
              _hover={{ bg: "themeMint" }}
              _expanded={{ bg: "blue.400" }}
              _focus={{ boxShadow: "outline" }}
              style={{
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              Navigation
            </MenuButton>
            <MenuList>
              <MenuItem as={RouteLink} to="/">
                Home
              </MenuItem>
              <MenuItem as={RouteLink} to="/account">
                Account
              </MenuItem>
              <MenuItem as={RouteLink} to="/faq">
                FAQ
              </MenuItem>
            </MenuList>
          </Menu>
          <SearchBar />
          <Login />
        </Flex>
        <Box mb="2rem">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/account">Account</Route>
            <Route path="/faq">FAQ</Route>
            <Route path="/search/:searchTerm" component={SearchPage} />
          </Switch>
        </Box>
        <Flex mx="2rem"></Flex>

        <Navigation />
      </Flex>
    </Flex>
  );
}

export default App;
