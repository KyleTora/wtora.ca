import React, { useEffect } from 'react';
import '../styles/About.css'; // Import CSS file for styling
import heroImg from '../images/hero-orange.jpg'
import ContactSection from './ContactSection';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


function AboutPage() {
  return (
    <div className="about-container">
      <div className="hero-image" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className='container'>
          <div className="hero-section">
            <h1 className='hero-title'>About</h1>
          </div> 
        </div>
      </div>
      <div className='container'>
      <div className="row col-lg-8 col-12 mx-auto fade-in-left sub-heading">
          <h5 className='sub-heading-text'><i>Lorem ipsum dolor sit amet, adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique. Vestibulum hendrerit, tortor eu consectetur feugiat.</i></h5>
        </div>

        <div className="row">
          <div className="who-i-am col-12 mx-auto">
            <h3 className='who-i-am-title fade-in-left'><strong>Who I Am</strong></h3>
            <p className='who-i-am-text fade-in-left'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique.</p>
            <p className='who-i-am-text fade-in-left'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique.</p>
            <p className='who-i-am-text fade-in-left'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique.</p>
            <p className='who-i-am-text fade-in-left'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur risus id purus vehicula, sed ultricies elit tristique.</p>
          </div>
      </div>
     </div>
    <ContactSection />
    </div>
  );
}

export default AboutPage;
