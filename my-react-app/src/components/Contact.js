import React, { useState } from 'react';
import '../styles/Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function ContactPage() {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
  
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
  
    fetch('http://localhost:5000/submit_form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => {
      if (response.ok) {
        setMessageSent(true);
      } else {
        console.error('Error:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
  };
  
  return (
    <div className="contact-container">
      <div className="container row">
      {messageSent && <p className="message-sent">Message sent!</p>}

        <div className="col-12 col-lg-6 m-auto">
          <div className="contact-info">
            <h2>How can we help?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>

            {/* Social Media Links */}
            <div className="socials-section pt-3">
              <h4>Find us on our socials:</h4>
              <div className="row mx-auto pt-3">
                <div className="col-3 social-button">
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} className='social-icon ' />
                  </a>
                </div>
                <div className="col-3 social-button">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faXTwitter} className='social-icon ' />
                  </a>
                </div>
                <div className="col-3 social-button">
                  <a href="tel:+1234567890">
                    <FontAwesomeIcon icon={faPhone} className='social-icon ' />
                  </a>
                </div>
                <div className="col-3 social-button">
                  <a href="mailto:example@example.com">
                    <FontAwesomeIcon icon={faEnvelope} className='social-icon ' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="contact-form mx-auto">
            <h3>Contact Us</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <div className="col-6">
                  <input placeholder="Name" type="text" id="name" name="name" required />
                </div>
                <div className="col-6">
                  <input placeholder="Company" type="text" id="company" name="company" />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-6">
                  <input placeholder="Email" type="email" id="email" name="email" required />
                </div>
                <div className="col-6">
                  <input placeholder="Phone" type="text" id="phone" name="phone" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="4" required></textarea>
              </div>
              <button className="btn submit-button" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
