import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  VStack,
  SimpleGrid,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleClick = () => {
    if (userInfo) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.800")}
      minH="100vh"
      px={4}
      py={10}
    >
      {/* Hero Section */}
      <Stack spacing={6} textAlign="center" align="center" mb={12}>
        <Heading size="2xl" fontWeight="bold" color="teal.500">
          Welcome to SportsBuddy
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Discover and create local sports events easily
        </Text>
        <Button colorScheme="teal" size="lg" onClick={handleClick}>
          {userInfo ? "Go to Dashboard" : "Get Started"}
        </Button>
      </Stack>

      <Divider mb={10} />

      {/* How It Works Section */}
      <Box maxW="6xl" mx="auto" textAlign="center" mb={16}>
        <Heading size="lg" mb={6}>
          How It Works
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <VStack bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Heading size="md" color="teal.500">
              1. Browse Events
            </Heading>
            <Text>
              Explore events happening near you by sport, location or date.
            </Text>
          </VStack>
          <VStack bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Heading size="md" color="teal.500">
              2. Create Your Own
            </Heading>
            <Text>Host a sports event, invite others, and take the lead.</Text>
          </VStack>
          <VStack bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Heading size="md" color="teal.500">
              3. Play & Connect
            </Heading>
            <Text>Show up, enjoy the game, and meet other local players.</Text>
          </VStack>
        </SimpleGrid>
      </Box>

      {/* Footer */}
      <Box textAlign="center" py={6} color="gray.600" fontSize="sm">
        &copy; {new Date().getFullYear()} SportSync. All rights reserved.
      </Box>
    </Box>
  );
};

export default HomePage;
