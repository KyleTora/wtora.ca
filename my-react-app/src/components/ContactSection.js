import React, { useState, useEffect, useContext } from 'react';
import '../styles/ContactSection.css'; 


function ContactSection(){
    return (
        <div className="contact-section">
            <div className="container row">
                <div className="col-12 col-md-9 m-auto fade-in-left">
                    <h2>Want to get in touch?</h2>
                    <p>Fill out our contact form to send us an email or find us on our socials.</p>
                </div>
                <div className="col-12 col-md-3 m-auto fade-in-left">
                    <a href="/contact" className="btn contact-button">Contact Us</a>
                </div>
            </div>
        </div>
    );
  }

export default ContactSection;