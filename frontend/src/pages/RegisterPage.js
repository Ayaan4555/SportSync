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
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await registerUser(form);
      toast({
        title: "Registered Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (err) {
      toast({
        title: err.response?.data?.message || "Error",
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
          Create an Account
        </Heading>
        <VStack spacing={4}>
          <Input name="name" placeholder="Full Name" onChange={handleChange} />
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
            Register
          </Button>
        </VStack>
        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          <Link color="teal.500" href="/login">
            Login
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
