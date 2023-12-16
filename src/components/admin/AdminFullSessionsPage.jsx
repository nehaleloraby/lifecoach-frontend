import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Box, FormControl, FormLabel, Input, Textarea, Button, useToast, VStack, HStack, Heading, Text
} from '@chakra-ui/react'

const AdminFullSessionsPage = () => {
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    platform: '',
    timezone: ''
  })
  const toast = useToast()

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/full-sessions`)
      setSessions(response.data)
    } catch (error) {
      console.error('Error fetching full sessions', error)
    }
  }

  const handleSelectSession = (session) => {
    setSelectedSession(session)
  }

  const handleChange = (e) => {
    setSelectedSession({ ...selectedSession, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const method = selectedSession._id ? 'put' : 'post'
      const url = `${process.env.REACT_APP_BACKEND_URL}/full-sessions${selectedSession._id ? `/${selectedSession._id}` : ''}`
      await axios[method](url, selectedSession)
      toast({
        title: 'Full Session Updated',
        description: 'The full session has been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      fetchSessions()
      setSelectedSession({ title: '', description: '', duration: '', price: '', platform: '', timezone: '' })
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'There was an error updating the full session.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.error('Error updating full session', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/full-sessions/admin/${id}`)
      toast({
        title: 'Full Session Deleted',
        description: 'The full session has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      fetchSessions()
    } catch (error) {
      toast({
        title: 'Deletion Failed',
        description: 'There was an error deleting the full session.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.error('Error deleting full session', error)
    }
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" maxWidth="800px" mx="auto" my={10}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={selectedSession.title} onChange={handleChange} />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={selectedSession.description} onChange={handleChange} />
          </FormControl>
          <FormControl id="duration">
            <FormLabel>Duration (Minutes)</FormLabel>
            <Input name="duration" type="number" value={selectedSession.duration} onChange={handleChange} />
          </FormControl>
          <FormControl id="price">
            <FormLabel>Price</FormLabel>
            <Input name="price" type="number" value={selectedSession.price} onChange={handleChange} />
          </FormControl>
          <FormControl id="platform">
            <FormLabel>Platform</FormLabel>
            <Input name="platform" value={selectedSession.platform} onChange={handleChange} />
          </FormControl>
          <FormControl id="timezone">
            <FormLabel>Timezone</FormLabel>
            <Input name="timezone" value={selectedSession.timezone} onChange={handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="pink" mt={4}>Submit</Button>
        </VStack>
      </form>
      <Box mt={10}>
        <Heading as="h2" size="lg">Existing Full Sessions</Heading>
        <VStack spacing={4}>
          {sessions.map(session => (
            <HStack key={session._id} spacing={4}>
              <Text>{session.title}</Text>
              <Button onClick={() => handleSelectSession(session)}>Edit</Button>
              <Button onClick={() => handleDelete(session._id)} colorScheme="red">Delete</Button>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Box>
  )
}

export default AdminFullSessionsPage

