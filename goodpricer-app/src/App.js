import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link as RouteLink,
} from "react-router-dom";

import {
  ChakraProvider,
  Flex,
  Heading,
  Box,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";

import { Navigation } from "./Navigation";
import { theme } from "./theme";
import axios from "axios";

const el = require("events");

function App() {
  const [productList, setsProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const apiItems = "http://127.0.0.1:5000/api/GoodPricer?item=" + searchTerm;
  const fetchData = async () => {
    const response = await axios.get(apiItems);
    setsProductList(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const el = document.getElementsByClassName("cum");
  el.addListener("keyup");

  const handler = (event) => {
    if (event.keyCode === "enter") {
      setSearchTerm(event.target.value);
      fetchData();
    }
  };

  let itemsToRender;
  if (productList) {
    itemsToRender = productList.map((product) => {
      return (
        <div>
          {product.Product} {product.Price}
        </div>
      );
    });
  }

  return (
    <ChakraProvider theme={theme}>
      <Router basename="/">
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
            <Flex bg="themeBlush" height="min-content" alignContent="center">
              <Heading bg="themeBlush">Good Pricer</Heading>
            </Flex>
            {/* Flex that contains menu, search bar and login button */}
            <Flex
              bg="themeBlush"
              alignContent="center"
              justifyContent="space-between"
              height="14"
            >
              <Menu>
                <MenuButton
                  w="24%"
                  bg="themeBB"
                  height="10"
                  px={4}
                  py={2}
                  textColor="black"
                  _hover={{ bg: "themeMint" }}
                  _expanded={{ bg: "blue.400" }}
                  _focus={{ boxShadow: "outline" }}
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
                bg="themeBB"
                px={4}
                py={2}
                type="text"
                variant="flushed"
                _hover={{ bg: "themeMint" }}
                _focus={{ boxShadow: "outline" }}
                placeholder="What can I help you Find?"
                onKeyPress={(event) => {
                  handler(event);
                }}
                className="HandleSearch"
              />
              <Button
                colorScheme="blue"
                textColor="black"
                w="24%"
                height="10"
                bg="themeBB"
                px={4}
                py={2}
                _hover={{ bg: "themeMint" }}
                _expanded={{ bg: "blue.400" }}
                variant="flushed"
              >
                Login/Create Account
              </Button>
            </Flex>
            <Flex mx="2rem">
              <ul>{itemsToRender}</ul>
            </Flex>
            <Box mb="2rem">
              {/* <Routes>
                <Route path="/" />
                <Route path="about" element={<About />} />
              </Routes> */}
            </Box>
            <Navigation />
          </Flex>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
