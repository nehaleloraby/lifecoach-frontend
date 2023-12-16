import React, { useState } from 'react'
import axios from 'axios'
import { Box, FormControl, FormLabel, Input, Button, VStack, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const AdminLoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://freespiritedlatina-3a9b1721dfc3.herokuapp.com/admin/login', { username, password })
            console.log(response.data)
            localStorage.setItem('adminToken', response.data.token)
            navigate('/admin/dashboard')
        } catch (error) {
            console.error('Login failed', error)
            toast({
                title: "Login failed",
                description: "Invalid credentials",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <Box w="100%" maxW="md" mx="auto" mt="10">
            <form onSubmit={handleLogin}>
                <VStack spacing={4}>
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </FormControl>
                    <Button type="submit" colorScheme="pink" width="full">Login</Button>
                </VStack>
            </form>
        </Box>
    )
}

export default AdminLoginPage

