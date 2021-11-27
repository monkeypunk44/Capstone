import "./App.css";
import React, { useState } from "react";
import { Route, Switch, Link as RouteLink, useHistory } from "react-router-dom";

import {
  Flex,
  Heading,
  Box,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { Navigation } from "./Navigation";

import { HomePage } from "./HomePage";
import { SearchPage } from "./SearchPage";

function App() {
  const [myInputState, setMyInputState] = useState("");

  const history = useHistory();

  const searchHandler = () => {
    if (!myInputState.trim()) return;

    history.push(`/search/${myInputState}`);
  };

  const setSearch = (event) => {
    setMyInputState(event.target.value);
  };

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
              Settings
            </MenuButton>
            <MenuList>
              <MenuItem as={RouteLink} to="/account">
                Account
              </MenuItem>
            </MenuList>
          </Menu>
          <Flex border="1px solid black" borderRadius="10px" overflow="hidden">
            <Input
              w="18rem"
              bg="themeBB"
              h="2.5rem"
              fontSize="1rem"
              type="text"
              id="inputID"
              _hover={{ bg: "themeMint" }}
              _focus={{ boxShadow: "outline" }}
              _placeholder={{ textColor: "black" }}
              style={{
                borderBottomRightRadius: "0px",
                borderTopRightRadius: "0px",
              }}
              textAlign="center"
              placeholder="What can I help you Find?"
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  searchHandler();
                }
              }}
              onChange={(event) => {
                setSearch(event);
              }}
              value={myInputState}
            />
            <Button
              type="button"
              bg="blue.100"
              w="5rem"
              h="2.5rem"
              fontSize="1rem"
              _hover={{ bg: "themeMint" }}
              _focus={{ boxShadow: "outline" }}
              style={{
                borderBottomLeftRadius: "0px",
                borderTopLeftRadius: "0px",
              }}
              onClick={() => {
                searchHandler();
              }}
            >
              Search
            </Button>
          </Flex>
          <Button
            textColor="black"
            w="20rem"
            h="2.5rem"
            bg="themeBB"
            fontSize="1rem"
            _hover={{ bg: "themeMint" }}
            _expanded={{ bg: "blue.400" }}
            variant="flushed"
            style={{
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            Login/Create Account
          </Button>
        </Flex>
        <Box mb="2rem">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/account">Account</Route>
            <Route path="/contact">Contact</Route>
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
