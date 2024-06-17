import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css';
import ContactSection from './ContactSection';
import heroImg from '../images/hero-image-dark.jpg';
import projectM from '../images/project-management.jpg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faDatabase, faDesktop, faListCheck, faLaptopCode, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

function HomePage() {
  const [post, setPost] = useState(null);

  const items = [
    {
      title: "ERP Selection and Advisory",
      subTitle: "ERP streamlines business processes to provide a significant competitive advantage. These solutions offer proven, best-practice processes for business functions.",
      link: "/services#erp-selection",
      iconClass: faDesktop,
      titleClass: "title-1"
    },
    {
      title: "Business Transformation & Program Management",
      subTitle: "We provide a range of consulting, coaching, training, and professional staffing services in Project and Program Management.",
      link: "/services#program-management",
      iconClass: faListCheck,
      titleClass: "title-1"
    },
    {
      title: "Data and Analytics",
      subTitle: "Our data and analytics consulting service integrates data from different data sets into a single repository for further data analysis in visualization tools such as Tableau and Power BI.",
      link: "/services#data-analytics",
      iconClass: faServer,
      titleClass: "title-2"
    },
    {
      title: "Software Development",
      subTitle: "Reinvent your business by enabling technologies and applications to drive new, differentiating solutions to market.",
      link: "/services#software-development",
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

  useEffect(() => {

    const fetchLatestPost = async (postId) => {
      const postRef = doc(db, 'blogs', postId);
      const docSnap = await getDoc(postRef);
      
      if (docSnap.exists()) {
        const latestPost = {
          id: docSnap.id,
          ...docSnap.data(),
        };

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

       
      } else {
        console.log('No such document!');
      }
    };

    // Update later - so it grabs the latest one.
    fetchLatestPost('V5bZuPZZkyGgTjDOAusl');
  }, []);

  return (
    <div className="home-container">
      <Helmet>
        <title>Walter Tora Consulting</title>
        <meta name="description" content="Walter Tora Consulting" />
        <meta name="keywords" content="IT consulting, wtora, walter tora, consulting" />
        <meta property="og:title" content="Walter Tora Consulting" />
        <meta property="og:description" content="IT consulting, wtora, walter tora, consulting" />
        <meta property="og:type" content="website" />
      </Helmet>
      

      <div className="hero-image" style={{ backgroundImage: `url(${heroImg})` }} aria-label="hero image">
        <div className="container">
          <div className="hero-section">
            <div className="hero-text">
              <h1 className='col-12'>Walter Tora Consulting</h1>
              <h3 className='col-12'></h3>
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
              <div className='col-12 col-md-6 col-xl-3' key={index}>
                <Link to={item.link} className='card-link'>
                  <div className='card fade-in-left' onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}>
                    <div className='card-header'>
                      <FontAwesomeIcon icon={item.iconClass} className='social-icon' />
                    </div>
                    <div className='card-body'>
                      <div className={`categories-text`}>
                        <p className={item.titleClass}><span className='titleText'><strong>{item.title}</strong></span> <span className='d-none d-xl-block'><FontAwesomeIcon icon={faCircleArrowRight}
                          className={hoveredStates[index] ? 'rotate-down arrow' : 'arrow'} /></span></p>
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
          <div className="col-xl-4 col-12 image-container d-xl-flex d-none">
            <img src={projectM} alt="Project Management Image" className="work-image" />
          </div>
          <div className="col-xl-7 col-12 content-section order-lg-2">
            <div className='section-title'>
              <h2 className='title-text'>Why choose us?</h2>
            </div>
            <p className='text-paragraph'>We have consulted with many small and mid-sized organizations to modernize and transform their IT systems and infrastructure.</p>
            <p className='text-paragraph'>Our focus is to deliver business value and provide unbiased advice based on experiences in multiple industries and technology platforms.</p>
            <div className='text-center fade-in-left'>
              <a href="/services" className="btn work-button">Learn More</a>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Section */}
      <ContactSection />
      {/* Blog Section */}
      <div className="fourth-section">
        <div className='container row fade-in-left'>
          <div className='section-title'>
            <h2>Featured Blog Post</h2>
          </div>
          <div className="featured-post">
            {post ? (
              <div>
                <h3>{post.title}</h3>
                <h5>{post.date}</h5>
                <div className="post-text-container">
                  {post.text.map((paragraph, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))}
                </div>
              </div>
            ) : (
              <p>Loading latest post...</p>
            )}
          </div>
          <div className='text-center fade-in-left'>
            <a href={`/blog/${post ? post.id : ''}`} className="btn blog-button">Read The Blog</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
