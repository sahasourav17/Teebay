import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Paper,
  Text,
  Anchor,
  Title,
  Group,
  Container,
  Button,
  Center,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    const credentials = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      password,
    };
    dispatch(register(credentials));
    navigate("/signin");
  };

  return (
    <Container size={420} mt={120}>
      <Title ta="center" mt="md" fw={400}>
        Sign Up
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md" justify="center">
        <form onSubmit={handleSubmit}>
          <Group grow wrap="nowrap" style={{ marginBottom: "15px" }}>
            <TextInput
              style={{ marginRight: "4px" }}
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Group>
          <TextInput
            style={{ marginBottom: "15px" }}
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <Group grow wrap="nowrap" style={{ marginBottom: "15px" }}>
            <TextInput
              style={{ marginRight: "4px" }}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextInput
              placeholder="Phone Number"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </Group>
          <PasswordInput
            style={{ marginBottom: "15px" }}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordInput
            style={{ marginBottom: "15px" }}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && (
            <Text ta="center" mb={4} style={{ color: "red" }}>
              {error}
            </Text>
          )}
          <Center>
            <Button type="submit">Sign Up</Button>
          </Center>
          <Text c="dimmed" ta="center" size="sm" mt={8}>
            Already have an account?{" "}
            <Anchor size="sm" component="button">
              <Link to="/">Sign In</Link>
            </Anchor>
          </Text>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
