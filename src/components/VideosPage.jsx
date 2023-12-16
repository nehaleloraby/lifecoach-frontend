import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Box, Flex, IconButton, Center } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

const VideosPage = () => {
    const [videos, setVideos] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/videos`)
            .then(response => {
                setVideos(response.data)
            })
            .catch(error => console.error('Error fetching videos', error))
    }, [])

    const loadTikTokEmbedScript = () => {
        const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]')
        if (existingScript) {
            existingScript.remove()
        }
        const script = document.createElement('script')
        script.src = 'https://www.tiktok.com/embed.js'
        script.async = true
        document.body.appendChild(script)
    }

    useEffect(() => {
        loadTikTokEmbedScript()
    }, [currentIndex, videos])

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, [videos.length])

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : videos.length - 1))
    }, [videos.length])

    return (
        <Box padding="20px" maxWidth="800px" mx="auto">
            <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '20px' }}>Guiding Videos </h1>
            <Flex alignItems="center" justifyContent="center">
                <IconButton
                    icon={<ChevronLeftIcon />}
                    onClick={goToPrevious}
                    aria-label="Previous video"
                    size="lg"
                    marginRight="15px"
                    backgroundColor="lavender"
                />
                {videos.length > 0 && (
                    <Center flexDirection="column" width="300px" textAlign="center">
                        <div dangerouslySetInnerHTML={{ __html: videos[currentIndex].link }} />
                    </Center>
                )}
                <IconButton
                    icon={<ChevronRightIcon />}
                    onClick={goToNext}
                    aria-label="Next video"
                    size="lg"
                    marginLeft="15px"
                    backgroundColor="lavender"
                />
            </Flex>
        </Box>
    )
}

export default VideosPage





