import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BlogPost.css';
import { Link } from 'react-router-dom';
import ContactSection from './ContactSection';
import { getFirestore, doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { app } from '../firebase';

const db = getFirestore(app);

function BlogPage() {
    const [post, setPost] = useState(null);
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const { id } = useParams();
    const [loadingFeaturedPosts, setLoadingFeaturedPosts] = useState(true);

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const postDoc = await getDoc(doc(db, 'blogs', id));
                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    const paragraphs = postData.text.split('\n');
                    postData.text = paragraphs;
                    const postDate = new Date(postData.date);
                    const formattedDate = postDate.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    });
                    postData.date = formattedDate;
                    setPost(postData);
                } else {
                    console.error('Blog post not found');
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
            }
        };

        const fetchFeaturedPosts = async () => {
            try {
                const q = query(collection(db, 'blogs'), where('isFeatured', '==', true));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFeaturedPosts(data);
                setLoadingFeaturedPosts(false);
            } catch (error) {
                console.error('Error fetching featured posts:', error);
            }
        };

        fetchBlogPost();
        fetchFeaturedPosts();
    }, [id]);

    if (!post) {
        return <h1 className="loading">Post is not available at this time ...</h1>;
    }

    return (
        <div className='blog-post-container'>
            <div className='post-banner'>
                <div className='container'>
                    <h2 className="post-title">{post.title}</h2>
                    <h6 className="post-author">Kyle Tora</h6>
                    <h6 className="post-date">{post.date}</h6>
                </div>
            </div>
            <div className='container row'>
                <div className="blog-post col-lg-9">
                   
                    <h3 className="post-heading">{post.heading}</h3>

                    <div className="post-body">
                        {post.text.map((paragraph, index) => (
                            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
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
