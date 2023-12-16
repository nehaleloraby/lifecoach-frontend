import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Flex, Text, Image, IconButton, Center } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

const BooksPage = () => {
    const [books, setBooks] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`)
            .then(response => {
                setBooks(response.data)
            })
            .catch(error => console.error('Error fetching books', error))
    }, [])

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : books.length - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length)
    }

    return (
        <Box pt="100px">
            <Center>
                <Box 
                    w="full" 
                    mx="auto" 
                    padding="20px" 
                    bgGradient="linear(to-r, lavender, purple.200, lavender)"
                >
                    <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb="10px">Recommended</Text>
                    <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb="30px">Books</Text>
                    <Flex alignItems="center" justifyContent="center">
                        <IconButton
                            icon={<ChevronLeftIcon />}
                            onClick={goToPrevious}
                            aria-label="Previous book"
                            size="lg"
                            marginRight="15px"
                            bgGradient="linear(to-r, lavender, purple.200, lavender)"
                        />
                        <Center flexDirection="column" width="300px" textAlign="center">
                            {books.length > 0 && (
                                <>
                                    <Image
                                        src={books[currentIndex].imageURL}
                                        alt={books[currentIndex].title}
                                        boxSize="200px"
                                        objectFit="cover"
                                        marginBottom="15px"
                                    />
                                    <Text fontSize="xl" fontWeight="semibold">{books[currentIndex].title}</Text>
                                    <Text fontSize="md">{books[currentIndex].author}</Text>
                                </>
                            )}
                        </Center>
                        <IconButton
                            icon={<ChevronRightIcon />}
                            onClick={goToNext}
                            aria-label="Next book"
                            size="lg"
                            marginLeft="15px"
                            bgGradient="linear(to-r, lavender, purple.200, lavender)"
                        />
                    </Flex>
                </Box>
            </Center>
        </Box>
    )
}

export default BooksPage









