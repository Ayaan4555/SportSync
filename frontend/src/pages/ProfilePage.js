import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Container,
  Center,
} from '@chakra-ui/react';

const ProfilePage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
   const bg = useColorModeValue('white', 'gray.700'); // ✅ Hook moved here

  if (!userInfo) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="md">You must be logged in to view your profile.</Heading>
      </Box>
    );
  }

  const { name, email, role } = userInfo.user || {};

  return (
    <Container maxW="lg" py={10} >
      <Box
        bg={bg}
        p={8}
        rounded="lg"
        boxShadow="lg"
      >
        <VStack spacing={4} align="start" >
          <Heading size="lg" color="teal.500">Profile</Heading>
          <Text><strong>Name:</strong> {name}</Text>
          <Text><strong>Email:</strong> {email}</Text>
          <Text><strong>Role:</strong> {role}</Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default ProfilePage;