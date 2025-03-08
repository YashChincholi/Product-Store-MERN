import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import { LuSun } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        direction={{
          base: "column",
          sm: "row",
        }}
        justify={"space-between"}
        align={"center"}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <BsPlusSquare size={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode ? <LuSun /> : <IoMoon />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
