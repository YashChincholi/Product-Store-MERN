import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProducts } = useProductStore();
  const handelDelete = async (pid) => {
    const { success, message } = await deleteProducts(pid);
    if (success) {
      toaster.create({
        title: "Product Deleted.",
        description: "Your product has been deleted successfully.",
        type: "success",
      });
    } else {
      toaster.create({
        title: "Error.",
        description: message,
        type: "error",
      });
    }
  };
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2} color={textColor}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <Button bg="blue.500">
            <FaEdit color="white" />
          </Button>
          <Button bg="red.500">
            <FiDelete
              onClick={() => {
                handelDelete(product._id);
              }}
              color="white"
            />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
