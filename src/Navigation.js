import { Flex, Link } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import React from "react";

export const Navigation = () => {
  return (
    <Flex maxW={{ sm: 540, md: 768, lg: 960, xl: 1200 }}>
      <Link as={RouteLink} to="/contact" ml="3rem">
        Contact
      </Link>
      <Link as={RouteLink} to="/faq" ml="3rem">
        FAQ
      </Link>
    </Flex>
  );
};
