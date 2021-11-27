import React, { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export const SearchBar = () => {
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
  );
};
