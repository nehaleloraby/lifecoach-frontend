import React from 'react'
import { Box, Heading, VStack, Button, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const AdminDashboardPage = () => {
    const navigate = useNavigate()
    const toast = useToast()

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        toast({
            title: "Logged out",
            description: "You have successfully logged out",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
        navigate('/')
    }

    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" maxWidth="800px" mx="auto" my={10}>
            <Heading as="h1" size="xl" textAlign="center" mb={6}>Dashboard Management</Heading>
            <VStack spacing={4}>
                <Button colorScheme="pink" onClick={() => navigate('/admin/home-page')}>Manage Home Page</Button>
                <Button colorScheme="pink" onClick={() => navigate('/admin/videos')}>Manage Videos</Button>
                <Button colorScheme="pink" onClick={() => navigate('/admin/books')}>Manage Books</Button>
                <Button colorScheme="pink" onClick={() => navigate('/admin/podcasts')}>Manage Podcasts</Button>
                <Button colorScheme="purple" onClick={handleLogout}>Logout</Button>
            </VStack>
        </Box>
    )
}

export default AdminDashboardPage




