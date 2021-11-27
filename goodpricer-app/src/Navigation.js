import { Flex, Link, Text } from "@chakra-ui/react";
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
      alignContent="space-evenly"
      justifyContent="space-evenly"
    >
      <Text as="a" href="tel:+1(902)-749-6454">
        Contact: +1(902)-749-6454
      </Text>
      <Text>
        <a href="mailto:143069b@acadiau.ca">143069b@acadiau.ca</a>
      </Text>
      <Link as={RouteLink} to="/faq" textColor="black">
        FAQ
      </Link>
    </Flex>
  );
};
