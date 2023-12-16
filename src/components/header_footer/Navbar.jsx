import React from 'react'
import {
  Box, Flex, HStack, Link, IconButton, Text, useDisclosure, Stack, Menu, MenuList, MenuButton, MenuItem, ButtonGroup
} from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { FaInstagram, FaTiktok } from 'react-icons/fa'
import { GiFlowerTwirl } from 'react-icons/gi'

const NavLink = ({ path, children }) => (
  <Link as={ReactLink} to={path} px='2' py='2' fontWeight='semibold' _hover={{ textDecoration: 'none', bg: 'pink.100' }}>
    {children}
  </Link>
)

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Box bg='lavender' px={4} fontFamily='Open Sans, sans-serif'>
      <Flex h='16' alignItems='center' justifyContent='space-between'>
        <IconButton
          bg='transparent'
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing={4}>
          <Link as={ReactLink} to='/' style={{ textDecoration: 'none' }}>
            <Flex alignItems='center'>
              <GiFlowerTwirl color='purple' />
              <Text fontWeight='extrabold' color='purple' ml={2} fontSize='xl' fontFamily='Comfortaa, sans-serif'>
                Free Spirited Latina
              </Text>
            </Flex>
          </Link>
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Menu>
              <MenuButton fontWeight='semibold' p='2' _hover={{ bg: 'pink.100' }}>
                1:1 Coaching
              </MenuButton>
              <MenuList>
                <MenuItem as={ReactLink} to="/book-session/discovery-calls">Discovery Calls</MenuItem>
                <MenuItem as={ReactLink} to="/book-session/full-sessions">Full Sessions</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton fontWeight='semibold' p='2' _hover={{ bg: 'pink.100' }}>
                Resources
              </MenuButton>
              <MenuList>
                <MenuItem as={ReactLink} to="/videos">Guiding Videos</MenuItem>
                <MenuItem as={ReactLink} to="/books">Recommended Books</MenuItem>
                <MenuItem as={ReactLink} to="/podcasts">Recommended Podcasts</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>

        <ButtonGroup spacing={4} variant='ghost'>
          <IconButton 
            as='a' 
            href='https://www.instagram.com/freespiritedlatina/?hl=en' 
            target='_blank' 
            rel='noopener noreferrer' 
            icon={<FaInstagram fontSize='1.25rem' color='purple' />} 
          />
          <IconButton 
            as='a' 
            href='https://www.tiktok.com/@freespiritedlatina?lang=en' 
            target='_blank' 
            rel='noopener noreferrer' 
            icon={<FaTiktok fontSize='1.25rem' color='purple' />} 
          />
        </ButtonGroup>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ base: 'flex', md: 'none' }} flexDirection='column' alignItems='start'>
          <Stack as='nav' spacing={4} width='full'>
            <NavLink path="/book-session/discovery-calls" width='full' textAlign='left'>Discovery Calls</NavLink>
            <NavLink path="/book-session/full-sessions" width='full' textAlign='left'>Full Sessions</NavLink>
            <NavLink path="/videos" width='full' textAlign='left'>Guiding Videos</NavLink>
            <NavLink path="/books" width='full' textAlign='left'>Recommended Books</NavLink>
            <NavLink path="/podcasts" width='full' textAlign='left'>Recommended Podcasts</NavLink>
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default Navbar


