import React, { useState } from 'react'
import axios from 'axios'
import { Box, FormControl, FormLabel, Input, Textarea, Button, Heading, VStack } from '@chakra-ui/react'

const BookingForm = ({ date, time, type }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [notes, setNotes] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const userInfo = { email, name, phone, notes }
        
       
        axios.post(`https://freespiritedlatina-3a9b1721dfc3.herokuapp.com/${type}/book`, {
            date: date.toISOString(),
            time,
            userInfo
        })
        .then(res => {
            alert('Booking confirmed!')
        })
        .catch(err => console.error(err))
    }

    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" maxWidth="500px" mx="auto" my={10}>
            <Heading as="h2" size="lg" textAlign="center" mb={5}>Enter Details</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                        <FormLabel fontWeight="bold">Email</FormLabel>
                        <Input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel fontWeight="bold">Name</FormLabel>
                        <Input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel fontWeight="bold">Phone Number</FormLabel>
                        <Input 
                            type="tel" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel fontWeight="bold">What would you like to discuss:</FormLabel>
                        <Textarea 
                            value={notes} 
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="pink" mt={4}>Confirm Booking</Button>
                </VStack>
            </form>
        </Box>
    )
}

export default BookingForm


