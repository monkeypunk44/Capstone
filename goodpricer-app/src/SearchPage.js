import React, { useState, useEffect } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const SearchPage = () => {
  const { searchTerm } = useParams();
  const [productList, setsProductList] = useState([]);

  const apiItems = `http://127.0.0.1:5000/api/GoodPricer?item=${searchTerm}`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(apiItems);
      setsProductList(response.data);
    };

    fetchData();
  }, []);

  let itemsToRender;
  if (productList) {
    itemsToRender = productList.map((product) => {
      return (
        <Box px="1rem" fontSize="1.5rem">
          {product.Product} ${product.Price}
        </Box>
      );
    });
  }

  return (
    <Flex
      width="100%"
      flexWrap="wrap"
      flexDirection={{ base: "column" }}
      grow={1}
    >
      <Text fontSize="2rem" mx="1rem">
        Feel free to browse
      </Text>
      {itemsToRender?.length && itemsToRender}
    </Flex>
  );
};
