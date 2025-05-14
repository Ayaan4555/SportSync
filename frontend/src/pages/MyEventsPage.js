import React, { useEffect, useState } from "react";
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
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await axios.get(
          "https://sportsync-backend-ap3i.onrender.com/api/events/my-events",
          {
            headers: { Authorization: `Bearer ${token} ` },
          }
        );
        setEvents(res.data);
      } catch (err) {
        toast({
          title: "Failed to load your events",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [token, toast]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`https://sportsync-backend-ap3i.onrender.com/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token} ` },
      });

      toast({
        title: "Event deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      toast({
        title: "Delete failed",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="1200px" mx="auto" mt={10} px={4}>
      <Heading mb={6} textAlign="center">
        My Events
      </Heading>

      {loading ? (
        <Flex justify="center" py={20}>
          <Spinner size="xl" />
        </Flex>
      ) : events.length === 0 ? (
        <Text>No events created yet.</Text>
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
              _hover={{ boxShadow: "xl" }}
            >
              <Stack spacing={3}>
                <Flex justify="space-between" align="center">
                  <Heading size="md" color="teal.600">
                    {event.name}
                  </Heading>
                  <Flex gap={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() =>
                        (window.location.href = `/edit-event/${event._id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Flex>

                <Text fontSize="sm" color="gray.600">
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

export default MyEventsPage;
