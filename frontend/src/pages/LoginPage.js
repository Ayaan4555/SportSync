import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Heading,
  Text,
  VStack,
  Link,
  Flex,
  useToast,
} from "@chakra-ui/react";

import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await loginUser(form);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard");
    } catch (err) {
      toast({
        title: err.response?.data?.message || "Invalid credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.50">
      <Box bg="white" p={8} rounded="2xl" shadow="xl" w="full" maxW="md">
        <Heading size="lg" textAlign="center" mb={6}>
          Welcome Back
        </Heading>
        <VStack spacing={4}>
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Button colorScheme="teal" w="full" onClick={handleSubmit}>
            Login
          </Button>
        </VStack>
        <Text mt={4} textAlign="center">
          Don't have an account?{" "}
          <Link color="teal.500" href="/register">
            Register
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginPage;
