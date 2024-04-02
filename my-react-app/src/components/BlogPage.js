import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BlogPost.css';
import { Link } from 'react-router-dom';
import ContactSection from './ContactSection';

function BlogPage() {
    const [post, setPost] = useState(null);
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const { id } = useParams();
    const postURL = `http://localhost:5000/api/posts/${id}`;
    const featuredPostsURL = `http://localhost:5000/api/posts?type=featured`;
    const [loadingFeaturedPosts, setLoadingFeaturedPosts] = useState(true);

    useEffect(() => {
        console.log('Fetching blog post with ID:', id);
      
        fetch(postURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // This basically formats the text into paragraphs
                const paragraphs = data.text.split('\n');
                data.text = paragraphs;

                const postDate = new Date(data.date);
                const formattedDate = postDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                });
                data.date = formattedDate;

                setPost(data);
            })
            .catch(error => console.error('Error fetching blog post:', error));

        fetch(featuredPostsURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFeaturedPosts(data);
                console.log(data);
                setLoadingFeaturedPosts(false);
            })
            .catch(error => console.error('Error fetching featured posts:', error));
    }, [id, postURL, featuredPostsURL]);

    if (!post) {
        return <h1 className="loading">Post is not available at this time ...</h1>;
    }

    return (
        <div className='blog-post-container'>
            <div className='container row'>
                <div className="blog-post col-lg-9">
                    <h2 className="post-title">{post.title}</h2>
                    <h4 className="post-heading">{post.heading}</h4>
                    <h6 className="post-date">{post.date}</h6>

                    <div className="post-body">
                        {post.text.map((paragraph, index) => (
                        <p key={index} className="post-text">{paragraph}</p>
                    ))}        
                    </div>
                </div>
                <div className='featured-posts col-lg-3'>
                    <h3 className='posts-title'>Featured Posts</h3>
                    {loadingFeaturedPosts ? (
                        <p>Loading featured posts...</p>
                    ) : (
                        featuredPosts.length > 0 ? (
                            featuredPosts.map(featuredPost => (
                                <Link to={`/blog/${featuredPost.id}`} className="card" key={featuredPost.id}>
                                <div className="card-header">
                                    <h5 className='blog-title'>{featuredPost.title}</h5>
                                    <span className='blog-heading'>{featuredPost.heading}</span>
                                </div>
                                <div className="card-body">
                                    <p>{featuredPost.heading}</p>
                                </div>
                            </Link>
                            ))
                        ) : (
                            <p>No featured posts available</p>
                        )
                    )}
                </div>
            </div>
            <ContactSection />
        </div>
    );
}

export default BlogPage;
