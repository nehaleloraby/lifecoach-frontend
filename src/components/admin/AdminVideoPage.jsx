import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
    Box, 
    FormControl, 
    FormLabel, 
    Input, 
    Button, 
    useToast, 
    VStack, 
    HStack, 
    Heading,  
    Text      
} from '@chakra-ui/react'

const AdminVideosPage = () => {
    const [videos, setVideos] = useState([])
    const [selectedVideo, setSelectedVideo] = useState({ title: '', description: '', link: '' })
    const toast = useToast()

    
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjU3OTBhOTYzZjgzMDg1ZGRhMWY3MDRhIiwiaWF0IjoxNzAyNjAxODI4fQ.56UyA6gZBANPfX4F_UHhJ6nrFIFALAw0XrK7tu_htGU'

    useEffect(() => {
        fetchVideos()
    }, [])

    const fetchVideos = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/videos`)
            setVideos(response.data)
        } catch (error) {
            console.error('Error fetching videos', error)
        }
    }

    const handleSelectVideo = (video) => {
        setSelectedVideo(video)
    }

    const handleChange = (e) => {
        setSelectedVideo({ ...selectedVideo, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const method = selectedVideo._id ? 'put' : 'post'
            const url = `${process.env.REACT_APP_BACKEND_URL}/videos${selectedVideo._id ? `/${selectedVideo._id}` : ''}`
            
            const config = {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            }

            await axios[method](url, selectedVideo, config)
            toast({
                title: 'Video Updated',
                description: 'The video has been successfully updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            fetchVideos()
            setSelectedVideo({ title: '', description: '', link: '' })
        } catch (error) {
            toast({
                title: 'Update Failed',
                description: 'There was an error updating the video.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            console.error('Error updating video', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            }

            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/videos/${id}`, config)
            toast({
                title: 'Video Deleted',
                description: 'The video has been successfully deleted.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            fetchVideos()
        } catch (error) {
            toast({
                title: 'Deletion Failed',
                description: 'There was an error deleting the video.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            console.error('Error deleting video', error)
        }
    }

    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" maxWidth="800px" mx="auto" my={10}>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl id="title" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input name="title" value={selectedVideo.title} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="description">
                        <FormLabel>Description</FormLabel>
                        <Input name="description" value={selectedVideo.description} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="link" isRequired>
                        <FormLabel>Link</FormLabel>
                        <Input name="link" value={selectedVideo.link} onChange={handleChange} />
                    </FormControl>
                    <Button type="submit" colorScheme="pink" mt={4}>Submit</Button>
                </VStack>
            </form>
            <Box mt={10}>
                <Heading as="h2" size="lg">Existing Videos</Heading>
                <VStack spacing={4}>
                    {videos.map(video => (
                        <HStack key={video._id} spacing={4}>
                            <Text>{video.title}</Text>
                            <Button onClick={() => handleSelectVideo(video)}>Edit</Button>
                            <Button onClick={() => handleDelete(video._id)} colorScheme="red">Delete</Button>
                        </HStack>
                    ))}
                </VStack>
            </Box>
        </Box>
    )
}

export default AdminVideosPage

