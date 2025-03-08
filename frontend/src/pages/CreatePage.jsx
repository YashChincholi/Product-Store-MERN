import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });
  const handelAddProduct = () => {
    console.log(newProduct);
  };
  return (
    <Container maxW={"sm"}>
      <VStack spacing={8}>
        <Heading as={"p"} size={"2xl"} textAlign={"center"} mb={3}>
          Create New Proudct
        </Heading>
        <Box
          shadow={"md"}
          bg={useColorModeValue("white", "gray.800")}
          w={"full"}
          p={6}
          rounded={"lg"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Name"
              type="name"
              value={newProduct.name}
              onChange={(e) => {
                setNewProduct({ ...newProduct, name: e.target.value });
              }}
            />
            <Input
              placeholder="Price"
              type="price"
              value={newProduct.price}
              onChange={(e) => {
                setNewProduct({ ...newProduct, price: e.target.value });
              }}
            />
            <Input
              placeholder="ImageUrl"
              type="imageUrl"
              value={newProduct.imageUrl}
              onChange={(e) => {
                setNewProduct({ ...newProduct, imageUrl: e.target.value });
              }}
            />
            <Button colorScheme={"blue"} w={"full"} onClick={handelAddProduct}>
              Create
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
