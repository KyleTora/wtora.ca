import React, { useState, useEffect, useContext } from 'react';
import '../styles/Blog.css';
import { Helmet } from 'react-helmet';
import ContactSection from './ContactSection';
import { AuthContext } from './AuthContext';
import heroImg from '../images/background-dark.jpg';
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { app } from '../firebase';

const db = getFirestore(app);

function BlogPage() {
    const { authenticated } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        document.title = 'Blog';
        
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "blogs"));
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(data);
        };

        fetchData();
    }, []);

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

    const handleDelete = async (postId) => {
        if (authenticated) {
            const confirmDelete = window.confirm("Are you sure you want to delete this blog post?");
            
            if (confirmDelete) {
                try {
                    await deleteDoc(doc(db, "blogs", postId));
                    setPosts(posts.filter(post => post.id !== postId));
                    console.log("Blog post deleted successfully");
                } catch (error) {
                    console.error("Error deleting blog post:", error);
                }
            }
        } else {
            console.log("User not authenticated. Cannot delete blog post.");
        }
    };
    

    return (
        <div className="blog-container">
            <Helmet>
                <meta name="description" content="Walter Tora Consulting - Blog" />
                <meta name="keywords" content="IT consulting, wtora, walter tora, blog, IT blog, consulting services, erp, project management, software development, data and analytics" />
                <meta property="og:title" content="Walter Tora Consulting - Blog" />
                <meta property="og:description" content="IT consulting, wtora, walter tora, blog, IT blog, consulting services, erp, project management, software development, data and analytics" />
                <meta property="og:type" content="website" />
            </Helmet>
            <div className="hero-image" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className='container'>
                    <div className="hero-section">
                        <h1 className='hero-title'>Blogs</h1>
                    </div> 
                </div>
            </div>
            <div className="container">
                <div className="row featured-posts">
                    {posts.map((post) => (
                        <div className="col-12" key={post.id}>
                            <div className="card">
                                <div className="card-header">
                                    <h4 className='blog-title'>{post.title}</h4>
                                    <span>{formatDate(post.date)}</span>
                                </div>
                                <div className='card-body'>
                                    <div className="row">
                                        <div className='col-md-9 col-12'>
                                            <h5>{post.heading}</h5>
                                            <div dangerouslySetInnerHTML={{ __html: truncateText(post.text) }}></div>
                                        </div>

                                        <div className="col-md-3 col-12 m-auto blog-button">
                                            {authenticated ? (
                                                <div>
                                                    <a href={`/blog/${post.id}`} className="btn read-button">Read the Blog</a>
                                                    <a onClick={() => handleDelete(post.id)} className="btn delete-button">Delete</a>
                                                </div>
                                            ) : (
                                                <a href={`/blog/${post.id}`} className="btn read-button">Read the Blog</a>
                                            )}
                                        </div>
                                    </div>
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
