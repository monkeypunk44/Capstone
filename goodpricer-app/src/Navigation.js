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
    >
      <Link as={RouteLink} to="/contact" ml="3rem" textColor="black">
        Contact
      </Link>
      <Link as={RouteLink} to="/faq" ml="3rem" textColor="black">
        FAQ
      </Link>
    </Flex>
  );
};
