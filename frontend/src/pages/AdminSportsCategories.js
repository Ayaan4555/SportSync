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
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import axios from 'axios';

const AdminSportsCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const toast = useToast();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token;

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/sport-categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      toast({
        title: 'Failed to load sports categories',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddOrEdit = async () => {
    if (!categoryName.trim()) return;

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/admin/sport-categories/${editingId}`,
          { name: categoryName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({ title: 'Category updated', status: 'success', duration: 3000, isClosable: true });
      } else {
        await axios.post(
          'http://localhost:5000/api/admin/sport-categories',
          { name: categoryName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({ title: 'Category added', status: 'success', duration: 3000, isClosable: true });
      }

      setCategoryName('');
      setEditingId(null);
      fetchCategories();
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
      await axios.delete(`http://localhost:5000/api/admin/sport-categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: 'Category deleted', status: 'success', duration: 3000, isClosable: true });
      fetchCategories();
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

  const handleEditClick = (category) => {
    setCategoryName(category.name);
    setEditingId(category._id);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box maxW="800px" mx="auto" mt={10} p={6} bg="white" rounded="xl" shadow="md">
      <Heading mb={6} size="lg">Manage Sports Categories</Heading>

      <Flex mb={4} gap={4}>
        <Input
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
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
          {categories.map((cat) => (
            <Tr key={cat._id}>
              <Td>{cat.name}</Td>
              <Td textAlign="right">
                <IconButton
                  icon={<EditIcon />}
                  mr={2}
                  onClick={() => handleEditClick(cat)}
                  size="sm"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(cat._id)}
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

export default AdminSportsCategories;
