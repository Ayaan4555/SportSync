import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  VStack,
  Select,
  Button,
  useToast,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditEventPage = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token;

  useEffect(() => {
    const fetchEventAndLists = async () => {
      try {
        const [eventRes, catRes, cityRes, areaRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/events/${id}`, {
            headers: { Authorization: `Bearer ${token} `},
          }),
          axios.get('http://localhost:5000/api/public/sport-categories', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/public/cities', {
            headers: { Authorization: `Bearer ${token} `},
          }),
          axios.get('http://localhost:5000/api/public/areas', {
            headers: { Authorization: `Bearer ${token} `},
          }),
        ]);

        const e = eventRes.data;
        setForm({
          name: e.name,
          description: e.description,
          date: e.date?.slice(0, 16), // for input[type=datetime-local]
          location: e.location,
          category: e.category?._id || '',
          city: e.city?._id || '',
          area: e.area?._id || '',
        });

        setCategories(catRes.data);
        setCities(cityRes.data);
        setAreas(areaRes.data);
      } catch (err) {
        toast({
          title: 'Failed to load event data',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndLists();
  }, [id, token, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/events/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast({
        title: 'Event updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/my-events');
    } catch (err) {
      toast({
        title: 'Update failed',
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

  if (loading) {
    return (
      <Flex justify="center" py={20}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box maxW="600px" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
      <Heading mb={6}>Edit Event</Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Event Name</FormLabel>
          <Input name="name" value={form.name} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" value={form.description} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Date & Time</FormLabel>
          <Input type="datetime-local" name="date" value={form.date} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Location</FormLabel>
          <Input name="location" value={form.location} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Sport Category</FormLabel>
          <Select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>City</FormLabel>
          <Select name="city" value={form.city} onChange={handleChange}>
            <option value="">Select</option>
            {cities.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Area</FormLabel>
          <Select name="area" value={form.area} onChange={handleChange}>
            <option value="">Select</option>
            {filteredAreas.map((a) => (
              <option key={a._id} value={a._id}>{a.name}</option>
            ))}
          </Select>
        </FormControl>

        <Button colorScheme="teal" onClick={handleSubmit} width="full">
          Update Event
        </Button>
      </VStack>
    </Box>
  );
};

export default EditEventPage;