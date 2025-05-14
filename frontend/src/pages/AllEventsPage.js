import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Badge,
  Spinner,
  useToast,
  SimpleGrid,
  Stack,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';

const AllEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
      } catch (err) {
        toast({
          title: 'Failed to load events',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  return (
    <Box maxW="1200px" mx="auto" mt={10} px={4}>
      <Heading mb={6} textAlign="center">All Events</Heading>

      {loading ? (
        <Flex justify="center" py={20}>
          <Spinner size="xl" />
        </Flex>
      ) : events.length === 0 ? (
        <Text>No events found.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {events.map((event) => (
            <Box
              key={event._id}
              borderWidth="1px"
              borderRadius="xl"
              boxShadow="lg"
              p={5}
              bg="white"
              _hover={{ boxShadow: 'xl' }}
            >
              <Stack spacing={3}>
                <Heading size="md" color="teal.600">
                  {event.name}
                </Heading>

                <Text fontSize="sm" color="gray.600">
                  By {event.createdBy?.name || 'Unknown'} <br />
                  {new Date(event.date).toLocaleString()}
                </Text>

                <Text noOfLines={3} fontSize="sm">
                  {event.description}
                </Text>

                <Flex gap={2} flexWrap="wrap" mt={2}>
                  {event.category?.name && (
                    <Badge colorScheme="green">{event.category.name}</Badge>
                  )}
                  {event.city?.name && (
                    <Badge colorScheme="blue">{event.city.name}</Badge>
                  )}
                  {event.area?.name && (
                    <Badge colorScheme="purple">{event.area.name}</Badge>
                  )}
                </Flex>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default AllEventsPage;