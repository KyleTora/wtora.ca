import React, { useState, useEffect } from 'react';
import '../styles/Contact.css';

function ContactPage() {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
  
    try {
      const response = await fetch('https://us-central1-wtora-3b8e4.cloudfunctions.net/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(Object.fromEntries(formData))
      });
  
      if (response.ok) {
        setMessageSent(true);
        form.reset(); 
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  useEffect(() => {
    document.title = 'Contact';
  }, []);

  return (
    <div className="contact-container">
      <div className="container row">
      {messageSent && <p className="message-sent">Email has been sent!</p>}
        <div className="col-12 col-md-6 mx-auto">
          <div className="contact-form mx-auto">
            <h3 className='contact-title'>Contact Us</h3>
            <p className='contact-heading'>Fill out the form below to send us an email.</p>
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
