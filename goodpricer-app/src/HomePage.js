import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

export const HomePage = () => {
  return (
    <Flex
      width="100%"
      flexWrap="wrap"
      flexDirection={{ base: "column" }}
      grow={1}
      alignItems="center"
    >
      <Heading my="4rem" fontSize="4rem">
        Welcome To Good Pricer
      </Heading>
      <Text fontSize="2rem">Feel free to browse</Text>
    </Flex>
  );
};
