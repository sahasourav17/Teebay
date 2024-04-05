import React from "react";
import ProductCard from "./ProductCard";
import { Container, Title, Button, Box } from "@mantine/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { products } = useSelector((state) => state.userProducts);
  return (
    <Container size="md">
      <Box size="sm" mt={60}>
        <Title ta="center" fw={400}>
          MY PRODUCTS
        </Title>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <Link to="/create">
          <Button mt={30} mb={20}>
            Add Product
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default ProductList;
