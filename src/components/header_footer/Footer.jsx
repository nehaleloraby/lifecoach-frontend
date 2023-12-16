import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Text } from '@chakra-ui/react'

const Footer = () => {
    const location = useLocation()
    const isOnAdminLoginPage = location.pathname === '/portalmanagement'

    return (
        <Box textAlign="center" p={4}>
            <Text fontSize="sm">
                © 2023 Free Spirited Latina
                <br />
                {!isOnAdminLoginPage && (
                    <Link 
                        to="/portalmanagement" 
                        style={{ 
                            textDecoration: 'none', 
                            fontSize: '10px', 
                            color: '#d3d3d3'  
                        }}
                    >
                        Admin
                    </Link>
                )}
            </Text>
        </Box>
    )
}

export default Footer


