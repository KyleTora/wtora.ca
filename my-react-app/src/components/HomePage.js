import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css'
import ContactSection from './ContactSection';
import ContactPage from './Contact';
import heroImg from '../images/hero-image-dark.jpg'
import projectM from '../images/project-management.jpg'

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faDatabase, faDesktop, faListCheck, faLaptopCode, faCircleArrowRight  } from '@fortawesome/free-solid-svg-icons';


function HomePage() {
  const [post, setPost] = useState(null);

  const items = [
    {
      title: "ERP Selection and Advisory",
      subTitle: "ERP streamlines business processes to provide a significant competitive advantage. These solutions offer proven, best-practice processes for business functions.",
      link: "/capabilities#erp-selection",
      iconClass: faDesktop,
      titleClass: "title-1"
    },
    {
      title: "Business Transformation & Program Management",
      subTitle: "We provide a range of consulting, coaching, training, and professional staffing services in Project and Program Management.",
      link: "/capabilities#program-management",
      iconClass: faListCheck,
      titleClass: "title-1"
    },
    {
      title: "Data and Analytics",
      subTitle: "Our data and analytics consulting service integrates data from different data sets into a single repository for further data analysis in visualization tools such as Tableau and Power BI.",
      link: "/capabilities#data-analytics",
      iconClass: faServer,
      titleClass: "title-2"
    },
    {
      title: "Software Development",
      subTitle: "Reinvent your business by enabling technologies and applications to drive new, differentiating solutions to market.",
      link: "/capabilities#software-development",
      iconClass: faLaptopCode,
      titleClass: "title-2"
    }
  ];

  const [hoveredStates, setHoveredStates] = useState(Array(items.length).fill(false));

  const handleMouseEnter = (index) => {
      const updatedHoveredStates = [...hoveredStates];
      updatedHoveredStates[index] = true;
      setHoveredStates(updatedHoveredStates);
  };

  const handleMouseLeave = (index) => {
      const updatedHoveredStates = [...hoveredStates];
      updatedHoveredStates[index] = false;
      setHoveredStates(updatedHoveredStates);
  };

  const scrollToSection = (sectionName) => {
    if (sectionRefs[sectionName].current) {
      sectionRefs[sectionName].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(response => {
        if (!response.ok) 
        {
            throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(posts => {
        const latestPost = posts.reduce((latest, post) => {
            return latest.date > post.date ? latest : post;
        });

        const paragraphs = latestPost.text.split('\n');

        latestPost.text = paragraphs;

        const postDate = new Date(latestPost.date);

        const formattedDate = postDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
        latestPost.date = formattedDate;

        setPost(latestPost);
    })
    .catch(error => console.error('Error fetching blog posts:', error));
  }, []);

  return (
    <div className="home-container">
      <div className="hero-image" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="container">
          <div className="hero-section">
            <div className="hero-text">
              <h1 className='col-6 col-md-12'>Website Title</h1>
              <h3 className='col-6 col-md-12'>Heading</h3>
            </div>
          </div>
        </div>
      </div>
      {/* Sections */}
      <div className='second-section'>
        <div className='container'>
          <div className='row'>
            <div className='section-title'>
              <h2 className='title-text'>What We Do</h2>
              <h3 className='sub-heading p-2 p-md-0'>Our Services</h3>
            </div>
          </div>
          <div className='row'>
            {items.map((item, index) => ( 
            <div className='col-12 col-md-6 col-lg-3' key={index}>
               <Link to={item.link} className='card-link'>
                <div className='card fade-in-left' onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}>
                  <div className='card-header'>
                      <FontAwesomeIcon icon={item.iconClass} className='social-icon' />
                  </div>
                  <div className='card-body'>
                    <div className={`categories-text`}>
                      <p className={item.titleClass}><span className='titleText'><strong>{item.title}</strong></span> <span className='d-none d-lg-block'><FontAwesomeIcon icon={ faCircleArrowRight }
                                    className= {hoveredStates[index] ? 'rotate-down arrow' : 'arrow'} /></span></p>
                      <p className="sub-title">{item.subTitle}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
           ))}
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='third-section row fade-in-left'>
          <div className="col-xl-5 col-12 image-container d-xl-flex d-none">
              <img src={projectM} alt="Project Management Image" className="work-image"/>
          </div>
          <div className="col-xl-7 col-12 content-section order-lg-2">
            <div className='section-title'>
              <h2 className='title-text'>Why choose us?</h2>
              <h3 className='sub-heading'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
            </div>            
            <p className='text-paragraph'><strong>Lorem ipsum dolor</strong> sit amet, consectetur adipiscing elit. Mauris commodo porttitor dolor vel malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo porttitor dolor vel malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo porttitor dolor vel malesuada.</p>
            <p className='text-paragraph'>Lorem ipsum dolor sit amet, <strong>lorem ipsum dolor</strong> Mauris commodo porttitor dolor vel malesuada.</p>
            <div className='text-center fade-in-left'>
              <a href="/about" className="btn work-button">Learn More</a>
            </div>         
          </div>
        </div>
      </div>
      {/* <ContactPage /> */}
      <div className="fourth-section">
          <div className='container row fade-in-left'>
            <div className='section-title'>
              <h2>Latest Blog Post</h2>
            </div>            
             <div className="featured-post">
                {post ? (
                    <div>
                        <h3>{post.title}</h3>
                        <h4>{post.date}</h4>
                        <div className="post-text-container">
                            {post.text.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Loading latest post...</p>
                )}
            </div>
            <div className='text-center fade-in-left t'>
              <a href="/blog" className="btn blog-button">Read the Blogs</a>
            </div>
        </div>
      </div>
      <ContactSection />

    </div>
  );
}

export default HomePage;