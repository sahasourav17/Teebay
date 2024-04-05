import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Center,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const validateEmail = () => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    setEmailError(isValid ? null : "Please enter a valid email address");
    return isValid;
  };

  const validatePassword = () => {
    const isValid = password.length >= 6;
    setPasswordError(
      isValid ? null : "Password must be at least 6 characters long"
    );
    return isValid;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      const credentials = {
        email,
        password,
      };
      dispatch(login(credentials));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Container size={420} mt={120}>
      <Title ta="center" mt="md" fw={400}>
        Sign In
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md" justify="center">
        <TextInput
          mb={8}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
          error={emailError}
          required
          mt="md"
        />
        <PasswordInput
          mb={8}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
          error={passwordError}
          required
          mt="md"
        />
        <Center>
          <Button type="submit" mt="md" onClick={(e) => handleSignIn(e)}>
            Sign in
          </Button>
        </Center>
        <Text c="dimmed" ta="center" size="sm" mt={5}>
          Do not have an account?{" "}
          <Anchor size="sm" component="button">
            <Link to="/signup">Sign Up</Link>
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
};

export default SignIn;
