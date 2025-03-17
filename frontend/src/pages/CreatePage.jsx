import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";
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
    image: "",
  });
  const { createProducts } = useProductStore();
  const handelAddProduct = async () => {
    const { success, message } = await createProducts(newProduct);
    console.log("Success: ", success);
    console.log("Message: ", message);
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
              type="number"
              value={newProduct.price}
              onChange={(e) => {
                setNewProduct({ ...newProduct, price: e.target.value });
              }}
            />
            <Input
              placeholder="Image"
              value={newProduct.image}
              onChange={(e) => {
                setNewProduct({ ...newProduct, image: e.target.value });
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
