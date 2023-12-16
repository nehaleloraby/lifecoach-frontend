import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Image, Text, Heading, Flex, VStack, Center } from '@chakra-ui/react'

const HomePage = () => {
    const [homeInfo, setHomeInfo] = useState({})

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/`)
            .then(response => {
                setHomeInfo(response.data)
            })
            .catch(error => {
                console.error('Error fetching home page information', error)
            })
    }, [])

    const renderHeadline = () => {
        if (homeInfo.headline) {
            const parts = homeInfo.headline.split('-')
            return (
                <Box p="2" mt="2vh" mb="2" textAlign="center">
                    <Heading as="h1" size="md" mb={1} color="black.600" fontFamily="'Pacifico', cursive">
                        {parts[0]}
                    </Heading>
                    <Text fontSize="sm" color="black.500" fontFamily="'Pacifico', cursive">
                        - {parts[1]}
                    </Text>
                </Box>
            );
        }
        return null
    }

    const formatDescription = (description) => {
        if (!description) return ""
        return description.split(' ').map(word => 
            word.toLowerCase() === "hello!" ? 
                <strong style={{ fontSize: '1.2em' }}>{word} </strong> : 
                word + ' '
        )
    }

    return (
        <Box minH="100vh" overflow="hidden">
            {renderHeadline()}
            <Center 
                bgGradient="linear(to-r, lavender, purple.200, lavender)" 
                h="calc(100vh - 30vh)" 
                px="4"
            >  
                <Flex direction="row" align="center" justify="center" w="full" maxW="800px">
                    {homeInfo.imageURL && (
                        <Image
                            src={homeInfo.imageURL}
                            alt="Life Coach"
                            borderRadius="lg"
                            boxSize="300px"
                            objectFit="cover"
                            border="2px"
                            borderColor="pink.400"
                            mr={4}
                        />
                    )}
                    <VStack spacing={3} align="start">
                        <Text fontSize="md" color="black.600" maxWidth="400px">
                            {formatDescription(homeInfo.description)}
                        </Text>
                    </VStack>
                </Flex>
            </Center>
        </Box>
    )
}

export default HomePage
























