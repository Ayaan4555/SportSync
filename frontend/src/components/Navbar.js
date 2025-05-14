import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useToast,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    toast({
      title: 'Logged out successfully',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
    navigate('/');
  };

  const NavLink = ({ to, children }) => (
    <Link
      px={4}
      py={2}
      rounded={'md'}
      _hover={{ textDecoration: 'none', bg: 'whiteAlpha.300', color: 'white' }}
      href={to}
    >
      {children}
    </Link>
  );

  return (
    <Box bg="teal.500" px={6} color="white">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Box fontWeight="bold" fontSize="xl">
          SportSync
        </Box>
        <HStack
          as={'nav'}
          spacing={4}
          mx="auto"
          display={{ base: 'none', md: 'flex' }}
        >
          {/* <NavLink to="/">Home</NavLink> */}
          {userInfo ? (
            <>
              <NavLink to="/events">All Events</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/my-events">My Events</NavLink>
              <NavLink to="/create-event">Create Events</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/">Guide</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </HStack>
        {userInfo && (
          <Button size="sm" onClick={handleLogout} colorScheme="red" variant="solid">
            Logout
          </Button>
        )}
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {/* <NavLink to="/">Home</NavLink> */}
            {userInfo ? (
              <>
                <NavLink to="/events">All Event</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/my-events">My Events</NavLink>
                <NavLink to="/create-event">Create Events</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/">Guide</NavLink>

                {/* <Button size="sm" onClick={handleLogout} colorScheme="red" variant="solid" width="full">
                  Logout
                </Button> */}
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;