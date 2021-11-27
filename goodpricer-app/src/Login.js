import { Button } from "@chakra-ui/react";

export const Login = () => {
  return (
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
  );
};
