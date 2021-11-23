import { Flex, Link } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import React from "react";

export const Navigation = () => {
  return (
    <Flex
      w="100%"
      bg="themeBlush"
      minH="5vh"
      mt="auto"
      flexWrap="wrap"
      px={{ md: "3rem", lg: "4rem" }}
      flexDirection={{ base: "column", lg: "row" }}
      py={{ base: "0.5rem", lg: "0" }}
      alignContent="center"
      justifyContent="space-around"
    >
      <Link as={RouteLink} to="/contact" textColor="black">
        Contact
      </Link>
      <Link as={RouteLink} to="/faq" textColor="black">
        FAQ
      </Link>
    </Flex>
  );
};
