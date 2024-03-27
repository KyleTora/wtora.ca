import React, { useState, useEffect, useContext } from 'react';
import '../styles/Blog.css';
import ContactSection from './ContactSection';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import heroImg from '../images/background-dark.jpg'

function BlogPage() {
    const {authenticated} = useContext(AuthContext);
   
    // Define state to hold blog posts data
    const [blogPosts, setBlogPosts] = useState([]);
    const apiUrl = 'http://localhost:5000/api/posts';

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setBlogPosts(data))
            .catch(error => console.error('Error fetching blog posts:', error));
    }, []);

    // Function to truncate text to the first 50 words
    const truncateText = (text) => {
        const words = text.split(' ');
        if (words.length > 50) {
            return words.slice(0, 50).join(' ') + '...';
        } else {
            return text;
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const onDelete = (postId) => {
        fetch(`http://localhost:5000/api/posts/${postId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setBlogPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
                } else {
                    console.error('Failed to delete blog post');
                }
            })
            .catch(error => {
                console.error('Error deleting blog post:', error);
            });
    };
    
    const handleDelete = (postId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this blog post?');
        if (isConfirmed) {
            onDelete(postId);
        }
    };

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setBlogPosts(data);
                if (onGetFirstBlog && data.length > 0) {
                    onGetFirstBlog(data[0]);
                }
            })
            .catch(error => console.error('Error fetching blog posts:', error));
    }, []);

    useEffect(() => {
        const handleIntersection = (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        };
    
        const observerLeft = new IntersectionObserver(handleIntersection, {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
        });
      
        const elementsLeft = document.querySelectorAll('.fade-in-left');
        elementsLeft.forEach(element => {
            observerLeft.observe(element);
        });
    }, []);

    return (
        <div className="blog-container">
            <div className="hero-image" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className='container'>
                    <div className="hero-section">
                        <h1 className='hero-title'>Blogs</h1>
                    </div> 
                </div>
            </div>
            <div className="container">
                <div className="row featured-posts">
                    {blogPosts.map(post => (
                        <div className=" col-md-6 col-lg-4 col-12" key={post.id}>
                            <div className="card">
                                <div className="card-header">
                                    <h4 className='blog-title'>{post.title}</h4>
                                    <span>{formatDate(post.date)}</span>
                                </div>
                                <div className="card-body">
                                <h5>{post.heading}</h5>
                                    <p>{truncateText(post.text)}</p>
                                </div>
                                <div className="card-footer">
                                    {authenticated ? (
                                        <div>
                                            <Link to={`/blog/${post.id}`} className="read-more-link-logged-in">Read the blog</Link>
                                            <a onClick={() => handleDelete(post.id)} className="col-2 delete-button">Delete</a>
                                        </div>
                                    ) : (
                                        <Link to={`/blog/${post.id}`} className="read-more-link">Read the blog</Link>
                                    )}
                                 </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ContactSection />
        </div>
    );
}

export default BlogPage;
