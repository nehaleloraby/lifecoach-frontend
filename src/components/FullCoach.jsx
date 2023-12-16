import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Flex, Box, Button, Heading, Text } from '@chakra-ui/react'

const FullCoach = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [adminContent, setAdminContent] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAdminContent = async () => {
            try {
                const response = await axios.get('https://freespiritedlatina-3a9b1721dfc3.herokuapp.com/full-sessions/admin-content')
                setAdminContent(response.data)
            } catch (error) {
                console.error('Error fetching admin content for full sessions', error)
            }
        }

        fetchAdminContent()
    }, [])

    const convertTo12HourFormat = (hour, minute) => {
        const suffix = hour >= 12 ? 'PM' : 'AM'
        hour = hour % 12 || 12
        return `${hour}:${minute < 10 ? '0' : ''}${minute} ${suffix}`
    }

    const generateTimeSlots = () => {
        const slots = []
        for (let hour = 9; hour <= 20; hour++) {
            slots.push(convertTo12HourFormat(hour, 0))
            slots.push(convertTo12HourFormat(hour, 30))
        }
        return slots
    }

    const handleTimeSelect = (time) => {
        navigate(`/booking-form?date=${selectedDate.toISOString()}&time=${time}&type=full-sessions`)
    }

    const renderSessionDescription = () => {
        return (
            <Box p="4">
                <Heading as="h1" size="lg" mb="2">
                    {adminContent.title || '1:1 Full Session'}
                </Heading>
                <Text mb="2"><strong>Duration:</strong> {adminContent.duration || 60} minutes</Text>
                <Text mb="2"><strong>Price:</strong> ${adminContent.price || 100}</Text>
                <Text mb="2"><strong>Platform:</strong> {adminContent.platform || 'Google Meet'}</Text>
                <Text mb="2"><strong>Timezone:</strong> {adminContent.timezone || 'Eastern Time - US & Canada'}</Text>

                <Box my="4">
                <img 
                    src="https://i.imgur.com/nMGEF2X.jpeg" 
                    alt="Happy Girl On The Page" 
                    style={{ maxWidth: '500px', height: '500px' }} 
                />
                </Box>

                <Text>{adminContent.description || 'Come with whatever you want to discuss- could be a question or two, something you are trying to work through or wanting to learn more about a spiritual concept, tools on how to implement more spiritual structure into your life to find self-love, healing, and acceptance. This is an open and safe space! Everything we discuss is confidential. *Must be older than 18*'}</Text>
            </Box>
        )
    }

    return (
        <Flex>
            <Box flex="1">
                {renderSessionDescription()}
            </Box>
            <Box flex="1" p="4">
                <Heading as="h1" size="lg" mb="4">Full Sessions</Heading>
                <Calendar onChange={setSelectedDate} value={selectedDate} />
                <Box my="4">
                    <Heading as="h2" size="md" mb="2">Available Times:</Heading>
                    {generateTimeSlots().map(time => (
                        <Button key={time} onClick={() => handleTimeSelect(time)} m="1">
                            {time}
                        </Button>
                    ))}
                </Box>
            </Box>
        </Flex>
    )
}

export default FullCoach












