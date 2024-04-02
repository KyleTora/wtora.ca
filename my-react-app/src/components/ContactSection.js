import React, { useState, useEffect, useContext } from 'react';
import '../styles/ContactSection.css'; 


function ContactSection(){
    useEffect(() => {
        const handleIntersection = (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        };
    
        const observerLeft = new IntersectionObserver(handleIntersection, {
          root: null,
          rootMargin: '0px',
          threshold: 0.3
        });
    
        const elementsLeft = document.querySelectorAll('.fade-in-left');
        elementsLeft.forEach(element => {
            observerLeft.observe(element);
        });
      }, []);

    return (
        <div className="contact-section">
            <div className="container row">
                <div className="col-12 col-md-8 m-auto fade-in-left">
                    <h2>Want to get in touch?</h2>
                    <p>Fill out our contact form to send us an email or find us on our socials.</p>
                </div>
                <div className="col-12 col-md-4 m-auto fade-in-left">
                    <a href="/contact" className="btn contact-button">Contact Us</a>
                </div>
            </div>
        </div>
    );
  }

export default ContactSection;