import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import '../styles/NewBlogPost.css';


function CreateBlogPost() {
    const { isAuthenticated } = useAuth();
    const db = getFirestore();

    const [formData, setFormData] = useState({
        title: '',
        heading: '',
        text: '',
        date: '',
        isFeatured: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        if (isAuthenticated()) {
            try {
                const docRef = await addDoc(collection(db, 'blogs'), formData);
                console.log('Blog post created with ID:', docRef.id);
                navigate('/blog');
            } catch (error) {
                console.error('Error adding blog post:', error);
            }
        } else {
            console.log('User is not authenticated');
        }
    };

    return (
        <div className="create-blog-form">
            <h1>Create Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Heading:</label>
                    <input type="text" name="heading" value={formData.heading} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Text:</label>
                    <textarea name="text" value={formData.text} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>
                        <span>Is a Featured Post? </span>
                        <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit" className="submit-btn">Create Post</button>
            </form>
        </div>
    );
}

export default CreateBlogPost;
