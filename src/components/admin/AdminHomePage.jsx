import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, FormControl, FormLabel, Input, Textarea, Button, useToast } from '@chakra-ui/react'

const AdminHomePage = () => {
    const [homeInfo, setHomeInfo] = useState({ imageURL: '', headline: '', description: '' })
    const toast = useToast()

    // Fetch home page info
    const fetchHomePageInfo = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/`)
            setHomeInfo(response.data)
        } catch (error) {
            console.error('Error fetching home page information', error)
        }
    }

    useEffect(() => {
        fetchHomePageInfo()
    }, [])

    // Handle input changes
    const handleChange = (e) => {
        setHomeInfo({ ...homeInfo, [e.target.name]: e.target.value })
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjU3OTBhOTYzZjgzMDg1ZGRhMWY3MDRhIiwiaWF0IjoxNzAyNjAxODI4fQ.56UyA6gZBANPfX4F_UHhJ6nrFIFALAw0XrK7tu_htGU'
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/`, homeInfo, config)
            toast({
                title: 'Home Page Updated',
                description: 'The home page content has been successfully updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch (error) {
            toast({
                title: 'Update Failed',
                description: 'There was an error updating the home page.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            console.error('Error updating home page', error)
        }
    }

    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" maxWidth="800px" mx="auto" my={10}>
            <form onSubmit={handleSubmit}>
                <FormControl id="imageURL" isRequired>
                    <FormLabel>Image URL</FormLabel>
                    <Input name="imageURL" value={homeInfo.imageURL} onChange={handleChange} />
                </FormControl>
                <FormControl id="headline" isRequired>
                    <FormLabel>Headline</FormLabel>
                    <Input name="headline" value={homeInfo.headline} onChange={handleChange} />
                </FormControl>
                <FormControl id="description" isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea name="description" value={homeInfo.description} onChange={handleChange} />
                </FormControl>
                <Button type="submit" colorScheme="pink" mt={4}>Update Home Page</Button>
            </form>
        </Box>
    )
}

export default AdminHomePage

