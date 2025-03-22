"use client";

import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  Input,
  Stack,
  CloseButton,
  Portal,
  useDialog,
  Dialog,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProducts } = useProductStore();
  const dialog = useDialog();
  const initialRef = useRef();

  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

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

  const handleUpdate = () => {
    // Add your update logic here
    toaster.create({
      title: "Product Updated.",
      description: "Your product has been updated successfully.",
      type: "success",
    });
    dialog.onClose();
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
          <Dialog.RootProvider value={dialog} size="sm">
            <Dialog.Trigger asChild>
              <Button bg="blue.500">
                <FaEdit color="white" />
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Update Product</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Stack spacing={4}>
                      <Input
                        ref={initialRef}
                        placeholder="Name"
                        value={updatedProduct.name}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Price"
                        type="number"
                        value={updatedProduct.price}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            price: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Image URL"
                        value={updatedProduct.image}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            image: e.target.value,
                          })
                        }
                      />
                    </Stack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline" onClick={dialog.onClose}>
                        Cancel
                      </Button>
                    </Dialog.ActionTrigger>
                    <Button colorScheme="blue" onClick={handleUpdate} ml={3}>
                      Update
                    </Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.RootProvider>
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
