import React from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  SimpleGrid,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const bg = useColorModeValue('gray.50', 'gray.800'); // ✅ Hook moved here

  if (!userInfo) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="md">You must be logged in to view the dashboard.</Heading>
      </Box>
    );
  }

  const { name, email, role } = userInfo.user || {};
  console.log(userInfo.user.role)

  return (
    <Box px={6} py={10} bg={bg} minH="100vh">
      {/* Welcome */}
      <Stack spacing={4} mb={10} textAlign="center">
        <Heading size="xl" color="teal.500">Welcome, {name}!</Heading>
        <Text fontSize="lg" color="gray.600">
          Manage your events, profile and discover new games.
        </Text>
      </Stack>

      {/* Info + Actions */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="6xl" mx="auto">
        {/* User Info */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4}>Your Info</Heading>
          <Text><strong>Name:</strong> {name}</Text>
          <Text><strong>Email:</strong> {email}</Text>
          <Text><strong>Role:</strong> {role}</Text>
        </Box>


        {userInfo.user.role === 'admin' ?(<><Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4}>Quick Actions</Heading>
          <VStack spacing={4}>
            <Button colorScheme="teal" w="full" onClick={() => navigate('/my-events')}>
              View My Events
            </Button>
            <Button colorScheme="teal" w="full" onClick={() => navigate('/create-event')}>
              Create New Event
            </Button>
            <Button colorScheme="teal" w="full" onClick={() => navigate('/events')}>
              Browse All Events
            </Button>
             <Button colorScheme="teal" w="full" onClick={() => navigate('/admin/sports-categories')}>
              Add Sports categories
            </Button>
             <Button colorScheme="teal" w="full" onClick={() => navigate('/admin/cities')}>
              Add New Cities
            </Button>
             <Button colorScheme="teal" w="full" onClick={() => navigate('/admin/areas')}>
              Add New Areas
            </Button>
          </VStack>
        </Box></>)      :(<><Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4}>Quick Actions</Heading>
          <VStack spacing={4}>
            <Button colorScheme="teal" w="full" onClick={() => navigate('/my-events')}>
              View My Events
            </Button>
            <Button colorScheme="teal" w="full" onClick={() => navigate('/create-event')}>
              Create New Event
            </Button>
            <Button colorScheme="teal" w="full" onClick={() => navigate('/events')}>
              Browse All Events
            </Button>
          </VStack>
        </Box></>)}

        {/* Quick Actions */}
        {/* <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4}>Quick Actions</Heading>
          <VStack spacing={4}>
            <Button colorScheme="teal" w="full" onClick={() => navigate('/my-events')}>
              View My Events
            </Button>
            <Button colorScheme="teal" w="full" onClick={() => navigate('/create-event')}>
              Create New Event
            </Button>
            <Button colorScheme="teal" w="full" onClick={() => navigate('/events')}>
              Browse All Events
            </Button>
          </VStack>
        </Box> */}
      </SimpleGrid>
    </Box>
  );
};

export default DashboardPage;