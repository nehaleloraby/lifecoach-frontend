import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Flex, Box, Button, Heading, Text } from '@chakra-ui/react'

const DiscoveryCoach = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [adminContent, setAdminContent] = useState({})
    const navigate = useNavigate()
    const type = 'discovery-calls'

    useEffect(() => {
        const fetchAdminContent = async () => {
            try {
                const response = await axios.get('https://freespiritedlatina-3a9b1721dfc3.herokuapp.com/discovery-calls/admin-content')
                setAdminContent(response.data)
            } catch (error) {
                console.error('Error fetching admin content for discovery calls', error)
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
        navigate(`/booking-form?date=${selectedDate.toISOString()}&time=${time}&type=${type}`)
    }

    const renderSessionDescription = () => {
        return (
            <Box p="4">
                <Heading as="h1" size="lg" mb="2">
                    {adminContent.title || 'Discovery Call'}
                </Heading>
                <Text mb="2"><strong>Duration:</strong> {adminContent.duration || 30} minutes</Text>
                <Text mb="2"><strong>Price:</strong> ${adminContent.price || 50}</Text>
                <Text mb="2"><strong>Platform:</strong> {adminContent.platform || 'Video Call on Google Meet'}</Text>
                <Text><strong>Timezone:</strong> {adminContent.timezone || 'Eastern Time - US & Canada'}</Text>

                <Box my="4">
                <img 
                    src="https://i.imgur.com/kAAcMJC.jpeg" 
                    alt="Take Care of Your Soul" 
                    style={{ maxWidth: '500px', height: '500px' }} 
                />
                </Box>

                <Text mb="2">{adminContent.description || 'Learn more about my coaching services!'}</Text>
            </Box>
        )
    }

    return (
        <Flex>
            <Box flex="1">
                {renderSessionDescription()}
            </Box>
            <Box flex="1" p="4">
                <Heading as="h1" size="lg" mb="4">Discovery Calls</Heading>
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

export default DiscoveryCoach
















