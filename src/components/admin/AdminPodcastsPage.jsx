import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, FormControl, FormLabel, Input, Button, useToast, VStack, HStack, Heading, Text } from '@chakra-ui/react'

const AdminPodcastsPage = () => {
    const [podcasts, setPodcasts] = useState([])
    const [selectedPodcast, setSelectedPodcast] = useState({ title: '', imageURL: '', link: '' })
    const toast = useToast()

 
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjU3OTBhOTYzZjgzMDg1ZGRhMWY3MDRhIiwiaWF0IjoxNzAyNjAxODI4fQ.56UyA6gZBANPfX4F_UHhJ6nrFIFALAw0XrK7tu_htGU'

    useEffect(() => {
        fetchPodcasts()
    }, [])

    const fetchPodcasts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/podcasts`)
            setPodcasts(response.data)
        } catch (error) {
            console.error('Error fetching podcasts', error)
        }
    }

    const handleSelectPodcast = (podcast) => {
        setSelectedPodcast(podcast)
    }

    const handleChange = (e) => {
        setSelectedPodcast({ ...selectedPodcast, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const method = selectedPodcast._id ? 'put' : 'post'
            const url = `${process.env.REACT_APP_BACKEND_URL}/podcasts${selectedPodcast._id ? `/${selectedPodcast._id}` : ''}`
            
            const config = {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            }

            await axios[method](url, selectedPodcast, config)
            toast({
                title: 'Podcast Updated',
                description: 'The podcast has been successfully updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            fetchPodcasts()
            setSelectedPodcast({ title: '', imageURL: '', link: '' })
        } catch (error) {
            toast({
                title: 'Update Failed',
                description: 'There was an error updating the podcast.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            console.error('Error updating podcast', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            }

            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/podcasts/${id}`, config)
            toast({
                title: 'Podcast Deleted',
                description: 'The podcast has been successfully deleted.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            fetchPodcasts()
        } catch (error) {
            toast({
                title: 'Deletion Failed',
                description: 'There was an error deleting the podcast.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            console.error('Error deleting podcast', error)
        }
    }

    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" maxWidth="800px" mx="auto" my={10}>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl id="title" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input name="title" value={selectedPodcast.title} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="imageURL">
                        <FormLabel>Image URL</FormLabel>
                        <Input name="imageURL" value={selectedPodcast.imageURL} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="link">
                        <FormLabel>Link</FormLabel>
                        <Input name="link" value={selectedPodcast.link} onChange={handleChange} />
                    </FormControl>
                    <Button type="submit" colorScheme="pink" mt={4}>Submit</Button>
                </VStack>
            </form>
            <Box mt={10}>
                <Heading as="h2" size="lg">Existing Podcasts</Heading>
                <VStack spacing={4}>
                    {podcasts.map(podcast => (
                        <HStack key={podcast._id} spacing={4}>
                            <Text>{podcast.title}</Text>
                            <Button onClick={() => handleSelectPodcast(podcast)}>Edit</Button>
                            <Button onClick={() => handleDelete(podcast._id)} colorScheme="red">Delete</Button>
                        </HStack>
                    ))}
                </VStack>
            </Box>
        </Box>
    )
}

export default AdminPodcastsPage



