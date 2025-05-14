import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const AdminCities = () => {
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const toast = useToast();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token;

  const fetchCities = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/cities', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCities(res.data);
    } catch (err) {
      toast({
        title: 'Failed to load cities',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddOrEdit = async () => {
    if (!cityName.trim()) return;

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/admin/cities/${editingId}`,
          { name: cityName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({ title: 'City updated', status: 'success', duration: 3000, isClosable: true });
      } else {
        await axios.post(
          'http://localhost:5000/api/admin/cities',
          { name: cityName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({ title: 'City added', status: 'success', duration: 3000, isClosable: true });
      }

      setCityName('');
      setEditingId(null);
      fetchCities();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/cities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: 'City deleted', status: 'success', duration: 3000, isClosable: true });
      fetchCities();
    } catch (err) {
      toast({
        title: 'Delete failed',
        description: err.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEditClick = (city) => {
    setCityName(city.name);
    setEditingId(city._id);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <Box maxW="800px" mx="auto" mt={10} p={6} bg="white" rounded="xl" shadow="md">
      <Heading mb={6} size="lg">Manage Cities</Heading>

      <Flex mb={4} gap={4}>
        <Input
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <Button onClick={handleAddOrEdit} colorScheme="teal">
          {editingId ? 'Update' : 'Add'}
        </Button>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th textAlign="right">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cities.map((city) => (
            <Tr key={city._id}>
              <Td>{city.name}</Td>
              <Td textAlign="right">
                <IconButton
                  icon={<EditIcon />}
                  mr={2}
                  onClick={() => handleEditClick(city)}
                  size="sm"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(city._id)}
                  size="sm"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminCities;
