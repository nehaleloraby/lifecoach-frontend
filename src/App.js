import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import Navbar from './components/header_footer/Navbar.jsx'
import Footer from './components/header_footer/Footer.jsx'
import HomePage from './components/HomePage'
import FullCoach from './components/FullCoach.jsx'
import DiscoveryCoach from './components/DiscoveryCoach.jsx'
import BookingForm from './components/BookingForm'
import VideosPage from './components/VideosPage'
import BooksPage from './components/BooksPage'
import PodcastsPage from './components/PodcastsPage'
import AdminLoginPage from './components/admin/AdminLoginPage.jsx'
import AdminDashboardPage from './components/admin/AdminDashboardPage.jsx'
import AdminHomePage from './components/admin/AdminHomePage'
import AdminVideoPage from './components/admin/AdminVideoPage'
import AdminBooksPage from './components/admin/AdminBooksPage'
import AdminPodcastsPage from './components/admin/AdminPodcastsPage'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book-session/full-sessions" element={<FullCoach />} />
            <Route path="/book-session/discovery-calls" element={<DiscoveryCoach />} />
            <Route path="/booking-form" element={<BookingForm />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/portalmanagement" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/home-page" element={<AdminHomePage />} />
            <Route path="/admin/videos" element={<AdminVideoPage />} />
            <Route path="/admin/books" element={<AdminBooksPage />} />
            <Route path="/admin/podcasts" element={<AdminPodcastsPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  )
}

export default App







