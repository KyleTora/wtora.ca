import React from 'react';
import '../styles/Work.css';
import heroImg from '../images/hero-gold.jpg'

function WorkPage() {
  return (
    <div className="work-container">
      <div className="hero-image" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className='container'>
          <div className="hero-section">
            <h1 className='hero-title'>Experience</h1>
          </div> 
        </div>
      </div>
      <div className="second-section">
        <h1 className='section-title'></h1>
      </div> 
      <div className="contact-section">
        <div className="container row">
          <div className="col-12 col-md-9 m-auto">
            <h2>Want to get in touch?</h2>
            <p>Fill out our contact form to send us an email or find us on our socials.</p>
          </div>
          <div className="col-12 col-md-3 m-auto">
            <a href="/contact" className="btn contact-button">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkPage;
