import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NewBlogPost.css';

function CreateBlogPost() {
    const [formData, setFormData] = useState({
        title: '',
        heading: '',
        text: '',
        date: '',
        isFeatured: false
    });
    const apiUrl = 'http://localhost:5000/api/posts';
    const navigate  = useNavigate();

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                console.log('Blog post created successfully' - JSON.stringify(formData));
                navigate('/blog');
            } else {
                console.error('Failed to create blog post');
            }
        })
        .catch(error => {
            console.error('Error creating blog post:', error);
        });
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
                    <input type="text" name="heading" value={formData.heading} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Text:</label>
                    <textarea name="text" value={formData.text} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required/>
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
