import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComingSoonPage from './components/ComingSoonPage';
import HomePage from './components/HomePage';
import BlogPage from './components/Blog';
import BlogPostPage from './components/BlogPage';
import AboutPage from './components/About';
import WorkPage from './components/Work';
import ContactPage from './components/Contact';
import CapabilitiesPage from './components/Capabilities';
import NewBlogPage from './components/CreateBlogPost';
import LoginPage from './components/Login';

import Header from './components/Header';
import Footer from './components/Footer';

import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<ComingSoonPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/capabilities" element={<CapabilitiesPage />} />    
          <Route path="/login" element={<LoginPage />} />
          <Route path="/newBlog" element={<NewBlogPage />} />
        </Routes>      
        <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;
