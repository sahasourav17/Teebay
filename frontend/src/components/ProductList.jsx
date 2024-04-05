import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Container, Title, Button, Box } from "@mantine/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchUserProducts } from "../redux/userProductsSlice";

const ProductList = () => {
  const { products } = useSelector((state) => state.userProducts);
  const { user: userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = userData?.user?.id;
    dispatch(fetchUserProducts(userId));
  }, [dispatch, userData]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId))
      .unwrap()
      .then(() => {
        const userId = userData?.user?.id;
        dispatch(fetchUserProducts(userId));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  return (
    <Container size="md">
      <Box size="sm" mt={60}>
        <Title ta="center" fw={400}>
          MY PRODUCTS
        </Title>
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
        <Link to="/create-product">
          <Button mt={30} mb={20}>
            Add Product
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default ProductList;
