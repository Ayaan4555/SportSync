import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const AdminAreas = () => {
  const [areas, setAreas] = useState([]);
  const [cities, setCities] = useState([]);
  const [areaName, setAreaName] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
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

  const fetchAreas = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/areas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAreas(res.data);
    } catch (err) {
      toast({
        title: 'Failed to load areas',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddOrEdit = async () => {
    if (!areaName.trim() || !selectedCity) {
      toast({
        title: 'Please fill in both fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/admin/areas/${editingId}`,
          { name: areaName, city: selectedCity },
          { headers: { Authorization: `Bearer ${token} `} }
        );
        toast({ title: 'Area updated', status: 'success', duration: 3000, isClosable: true });
      } else {
        await axios.post(
          'http://localhost:5000/api/admin/areas',
          { name: areaName, city: selectedCity },
          { headers: { Authorization: `Bearer ${token} `} }
        );
        toast({ title: 'Area added', status: 'success', duration: 3000, isClosable: true });
      }

      setAreaName('');
      setSelectedCity('');
      setEditingId(null);
      fetchAreas();
    } catch (err) {
      toast({
        title: 'Error saving area',
        description: err.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (area) => {
    setAreaName(area.name);
    setSelectedCity(area.city?._id || '');
    setEditingId(area._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/areas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: 'Area deleted', status: 'success', duration: 3000, isClosable: true });
      fetchAreas();
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

  useEffect(() => {
    fetchCities();
    fetchAreas();
  }, []);

  return (
    <Box maxW="800px" mx="auto" mt={10} p={6} bg="white" rounded="xl" shadow="md">
      <Heading mb={6} size="lg">Manage Areas</Heading>

      <Flex mb={4} gap={4} flexWrap="wrap">
        <Input
          placeholder="Enter area name"
          value={areaName}
          onChange={(e) => setAreaName(e.target.value)}
        />
        <Select
          placeholder="Select city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city._id} value={city._id}>
              {city.name}
            </option>
          ))}
        </Select>
        <Button onClick={handleAddOrEdit} colorScheme="teal">
          {editingId ? 'Update' : 'Add'}
        </Button>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Area Name</Th>
            <Th>City</Th>
            <Th textAlign="right">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {areas.map((area) => (
            <Tr key={area._id}>
              <Td>{area.name}</Td>
              <Td>{area.city?.name || '—'}</Td>
              <Td textAlign="right">
                <IconButton
                  icon={<EditIcon />}
                  size="sm"
                  mr={2}
                  onClick={() => handleEdit(area)}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(area._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminAreas;