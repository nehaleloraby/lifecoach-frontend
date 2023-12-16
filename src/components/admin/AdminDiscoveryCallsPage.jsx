import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, FormControl, FormLabel, Input, Button, useToast, VStack, HStack, Heading, Text } from '@chakra-ui/react'

const AdminDiscoveryCallsPage = () => {
    const [discoveryCalls, setDiscoveryCalls] = useState([])
    const [selectedCall, setSelectedCall] = useState({
        title: '', 
        description: '', 
        duration: '', 
        price: '', 
        platform: '', 
        timezone: ''
    })
    const toast = useToast()

    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjU3OTBhOTYzZjgzMDg1ZGRhMWY3MDRhIiwiaWF0IjoxNzAyNjAxODI4fQ.56UyA6gZBANPfX4F_UHhJ6nrFIFALAw0XrK7tu_htGU'

    useEffect(() => {
        fetchDiscoveryCalls()
    }, [])

    const fetchDiscoveryCalls = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/discovery-calls`)
            setDiscoveryCalls(response.data)
        } catch (error) {
            console.error('Error fetching discovery calls', error)
        }
    }

    const handleSelectCall = (call) => {
        setSelectedCall(call)
    }

    const handleChange = (e) => {
        setSelectedCall({ ...selectedCall, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const method = selectedCall._id ? 'put' : 'post'
            const url = `${process.env.REACT_APP_BACKEND_URL}/discovery-calls${selectedCall._id ? `/${selectedCall._id}` : ''}`

            const config = {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            }

            await axios[method](url, selectedCall, config)
            toast({
                title: 'Discovery Call Updated',
                description: 'The discovery call has been successfully updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            fetchDiscoveryCalls()
            setSelectedCall({ title: '', description: '', duration: 0, price: 0, platform: '', timezone: '' })
        } catch (error) {
            toast({
                title: 'Update Failed',
                description: 'There was an error updating the discovery call.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            console.error('Error updating discovery call', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            }

            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/discovery-calls/${id}`, config)
            toast({
                title: 'Discovery Call Deleted',
                description: 'The discovery call has been successfully deleted.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            fetchDiscoveryCalls()
        } catch (error) {
            toast({
                title: 'Deletion Failed',
                description: 'There was an error deleting the discovery call.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            console.error('Error deleting discovery call', error)
        }
    }

    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" maxWidth="800px" mx="auto" my={10}>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                </VStack>
            </form>
            <Box mt={10}>
                <Heading as="h2" size="lg">Existing Discovery Calls</Heading>
                <VStack spacing={4}>
                    {discoveryCalls.map(call => (
                        <HStack key={call._id} spacing={4}>
                            <Text>{call.title}</Text>
                            <Button onClick={() => handleSelectCall(call)}>Edit</Button>
                            <Button onClick={() => handleDelete(call._id)} colorScheme="red">Delete</Button>
                        </HStack>
                    ))}
                </VStack>
            </Box>
        </Box>
    )
}

export default AdminDiscoveryCallsPage




