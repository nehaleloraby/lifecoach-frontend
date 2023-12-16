import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Box, Flex, Text, Image, IconButton, Center } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

const PodcastsPage = () => {
    const [podcasts, setPodcasts] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const autoScrollInterval = 3000 // 3 seconds

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/podcasts`)
            .then(response => {
                setPodcasts(response.data)
            })
            .catch(error => console.error('Error fetching podcasts', error))
    }, [])

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % podcasts.length)
    }, [podcasts.length])

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : podcasts.length - 1))
    }

    useEffect(() => {
        const timer = setInterval(goToNext, autoScrollInterval)
        return () => clearInterval(timer)
    }, [currentIndex, podcasts.length, goToNext])

    return (
        <Box pt="100px" w="full" bgGradient="linear(to-r, lavender, purple.200, lavender)">
            <Center>
                <Box maxWidth="800px" mx="auto" padding="20px">
                    <Text fontSize="4xl" fontWeight="bold" textAlign="center" mb="30px">Recommended Podcasts</Text>
                    <Flex alignItems="center" justifyContent="center">
                        <IconButton
                            icon={<ChevronLeftIcon />}
                            onClick={goToPrevious}
                            aria-label="Previous podcast"
                            size="lg"
                            marginRight="15px"
                            bgGradient="linear(to-r, lavender, purple.200, lavender)"
                        />
                        <Center flexDirection="column" width="300px" textAlign="center">
                            {podcasts.length > 0 && (
                                <>
                                    <Image
                                        src={podcasts[currentIndex].imageURL}
                                        alt={podcasts[currentIndex].title}
                                        boxSize="200px"
                                        objectFit="cover"
                                        marginBottom="15px"
                                    />
                                    <Text fontSize="xl" fontWeight="semibold">{podcasts[currentIndex].title}</Text>
                                    <a 
                                        href={podcasts[currentIndex].link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        style={{ marginTop: '10px', textDecoration: 'underline' }}
                                    >
                                        Listen Now
                                    </a>
                                </>
                            )}
                        </Center>
                        <IconButton
                            icon={<ChevronRightIcon />}
                            onClick={goToNext}
                            aria-label="Next podcast"
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

export default PodcastsPage






