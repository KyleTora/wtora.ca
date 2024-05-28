import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComingSoonPage from './components/ComingSoonPage';
import HomePage from './components/HomePage';
import BlogPage from './components/Blog';
import BlogPostPage from './components/BlogPage';
import ContactPage from './components/Contact';
import CapabilitiesPage from './components/Capabilities';
import NewBlogPage from './components/CreateBlogPost';
import LoginPage from './components/Login';
import { app } from './firebase'; 
import Header from './components/Header';
import Footer from './components/Footer';
import { getAuth } from 'firebase/auth'; 
import { AuthProvider } from './components/AuthContext';

const auth = getAuth(app);

function App() {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <Routes>
          <Route path="/comingSoon" element={<ComingSoonPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<CapabilitiesPage />} />    
          <Route path="/login" element={<LoginPage />} />
          <Route path="/newBlog" element={<NewBlogPage />} />
        </Routes>      
        <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;
