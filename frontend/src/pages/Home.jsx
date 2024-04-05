import React, { useEffect } from "react";
import ProductList from "../components/ProductList";
import { Box, Button, Container } from "@mantine/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { fetchUserProducts } from "../redux/userProductsSlice";

const Home = () => {
  const { user: userData } = useSelector((state) => state.auth);
  // console.log("data", user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const userId = userData?.user?.id;
    dispatch(fetchUserProducts(userId));
  }, [dispatch]);   
  return (
    <Container size="xl">
      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/signin">
          <Button color="red" mt={30} onClick={handleLogout}>
            Logout
          </Button>
        </Link>
      </Box>
      <ProductList />;
    </Container>
  );
};

export default Home;
