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

const AdminBooksPage = () => {
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState({ title: '', author: '', imageURL: '', link: '' })
    const toast = useToast()

   
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjU3OTBhOTYzZjgzMDg1ZGRhMWY3MDRhIiwiaWF0IjoxNzAyNjAxODI4fQ.56UyA6gZBANPfX4F_UHhJ6nrFIFALAw0XrK7tu_htGU'

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`)
            setBooks(response.data)
        } catch (error) {
            console.error('Error fetching books', error)
        }
    }

    const handleSelectBook = (book) => {
        setSelectedBook(book)
    }

    const handleChange = (e) => {
        setSelectedBook({ ...selectedBook, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const method = selectedBook._id ? 'put' : 'post'
            const url = `${process.env.REACT_APP_BACKEND_URL}/books${selectedBook._id ? `/${selectedBook._id}` : ''}`
            
            const config = {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            }

            await axios[method](url, selectedBook, config)
            toast({
                title: 'Book Updated',
                description: 'The book has been successfully updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            fetchBooks()
            setSelectedBook({ title: '', author: '', imageURL: '', link: '' })
        } catch (error) {
            toast({
                title: 'Update Failed',
                description: 'There was an error updating the book.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            console.error('Error updating book', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            }

            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/books/${id}`, config)
            toast({
                title: 'Book Deleted',
                description: 'The book has been successfully deleted.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            fetchBooks()
        } catch (error) {
            toast({
                title: 'Deletion Failed',
                description: 'There was an error deleting the book.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            console.error('Error deleting book', error)
        }
    }

    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" maxWidth="800px" mx="auto" my={10}>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl id="title" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input name="title" value={selectedBook.title} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="author" isRequired>
                        <FormLabel>Author</FormLabel>
                        <Input name="author" value={selectedBook.author} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="imageURL">
                        <FormLabel>Image URL</FormLabel>
                        <Input name="imageURL" value={selectedBook.imageURL} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="link">
                        <FormLabel>Link</FormLabel>
                        <Input name="link" value={selectedBook.link} onChange={handleChange} />
                    </FormControl>
                    <Button type="submit" colorScheme="pink" mt={4}>Submit</Button>
                </VStack>
            </form>
            <Box mt={10}>
                <Heading as="h2" size="lg">Existing Books</Heading>
                <VStack spacing={4}>
                    {books.map(book => (
                        <HStack key={book._id} spacing={4}>
                            <Text>{book.title}</Text>
                            <Button onClick={() => handleSelectBook(book)}>Edit</Button>
                            <Button onClick={() => handleDelete(book._id)} colorScheme="red">Delete</Button>
                        </HStack>
                    ))}
                </VStack>
            </Box>
        </Box>
    )
}

export default AdminBooksPage


