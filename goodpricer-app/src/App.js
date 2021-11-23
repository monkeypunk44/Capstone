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
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { Navigation } from "./Navigation";
import { theme } from "./theme";

import axios from "axios";

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

  var passer;
  const handler = () => {
    setSearchTerm(passer);
    fetchData();
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
              <Flex>
                <Input
                  w="18rem"
                  bg="themeBB"
                  h="2.5rem"
                  fontSize="1rem"
                  type="text"
                  variant="flushed"
                  id="inputID"
                  _hover={{ bg: "themeMint" }}
                  _focus={{ boxShadow: "outline" }}
                  style={{
                    borderBottomLeftRadius: "10px",
                    borderTopLeftRadius: "10px",
                  }}
                  textAlign="center"
                  placeholder="What can I help you Find?"
                  onChange={(event) => {
                    passer = event.target.value;
                  }}
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
                    borderBottomRightRadius: "10px",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "10px",
                  }}
                  onClick={() => {
                    handler();
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
            <Flex mx="2rem">
              <ul fontSize="1rem">{itemsToRender}</ul>
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
