import { Suspense, lazy, useEffect } from "react";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/product";
import { Toaster } from "@/components/ui/toaster";

const ProductCard = lazy(() => import("@/components/ProductCard"));

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack gap={"10"}>
        <Text
          fontSize={30}
          fontWeight={"bold"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid
          columns={{
            lg: 3,
            md: 2,
            base: 1,
          }}
          gap="40px"
          w={"full"}
        >
          <Suspense fallback={<div>Loading...</div>}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Suspense>
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
      <Toaster />
    </Container>
  );
};

export default HomePage;
