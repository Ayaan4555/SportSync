import React, { useEffect, useState } from 'react';
import {
  Box,
  Input,
  Button,
  Heading,
  Textarea,
  FormControl,
  FormLabel,
  VStack,
  Select,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEventPage = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    category: '',
    city: '',
    area: '',
  });

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const toast = useToast();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token;

  // Fetch dropdown data from public routes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, cityRes, areaRes] = await Promise.all([
          axios.get('https://sportsync-backend-ap3i.onrender.com/api/public/sport-categories'),
          axios.get('https://sportsync-backend-ap3i.onrender.com/api/public/cities'),
          axios.get('https://sportsync-backend-ap3i.onrender.com/api/public/areas'),
        ]);
        setCategories(catRes.data);
        setCities(cityRes.data);
        setAreas(areaRes.data);
      } catch (error) {
        toast({
          title: 'Error loading form data',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.date || !form.location) {
      toast({
        title: 'Please fill all required fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.post(
        'https://sportsync-backend-ap3i.onrender.com/api/events',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast({
        title: 'Event created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/dashboard');
    } catch (err) {
      toast({
        title: 'Error creating event',
        description: err.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredAreas = form.city
    ? areas.filter((a) => a.city === form.city)
    : [];

  return (
    <Box maxW="600px" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
      <Heading mb={6}>Create New Event</Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Event Name</FormLabel>
          <Input name="name" placeholder="Enter event name" onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" placeholder="Describe the event" onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Date & Time</FormLabel>
          <Input name="date" type="datetime-local" onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Location</FormLabel>
          <Input name="location" placeholder="Location details" onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Sport Category</FormLabel>
          <Select name="category" placeholder="Select category" onChange={handleChange}>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>City</FormLabel>
          <Select name="city" placeholder="Select city" onChange={handleChange}>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Area</FormLabel>
          <Select name="area" placeholder="Select area" onChange={handleChange}>
            {filteredAreas.map((area) => (
              <option key={area._id} value={area._id}>
                {area.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button colorScheme="teal" onClick={handleSubmit} width="full">
          Create Event
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateEventPage;