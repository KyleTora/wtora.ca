import React, { useState } from 'react';
import '../styles/Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
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
    
    console.log(jsonData);
    
  };
  
  return (
    <div className="contact-container">
      <div className="container row">
      {messageSent && <p className="message-sent">Message sent!</p>}
        <div className="col-6 mx-auto">
          <div className="contact-form mx-auto">
            <h3>Contact Us</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <div className="col-6">
                  <input placeholder="Name*" type="text" id="name" name="name" required />
                </div>
                <div className="col-6">
                  <input placeholder="Company" type="text" id="company" name="company" />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-6">
                  <input placeholder="Email*" type="email" id="email" name="email" required />
                </div>
                <div className="col-6">
                  <input placeholder="Phone" type="text" id="phone" name="phone" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message*</label>
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
