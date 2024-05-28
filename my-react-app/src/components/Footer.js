import React, { useContext } from 'react';
import '../styles/Footer.css';
import { AuthContext } from './AuthContext'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faCircle} from '@fortawesome/free-solid-svg-icons';


function Footer() {
  const { authenticated, logout } = useContext(AuthContext); 

  const handleLogout = () => {
    logout();
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-block col-lg-6 col-12">
            <h4 className='footer-title'>About</h4>
            <a>We deliver information technology consulting services to modernize and transform organizational IT systems and infrastructure to improve efficiency and drive profitable growth.</a>
            <br></br>
            {authenticated ? ( 
              <div>
                <Link onClick={handleLogout} className="">Logout</Link>
                <br></br>
                <Link to="/newBlog" className="">Create Blog</Link>
              </div>
            ) : (
             <></>
            )}
          </div>
          <div className="footer-block col-md-6 col-lg-3 col-12">
            <h4 className='footer-title'>Services</h4>
            <a href="/services#erp-selection"><FontAwesomeIcon icon={faCircle} className='social-icon fa-2xs' /><span>ERP Selection & Advisory</span></a><br />
            <a href="/services#program-management"><FontAwesomeIcon icon={faCircle} className='social-icon fa-2xs' /><span>Business Transformation & Program Management</span></a><br />
            <a href="/services#data-analytics"><FontAwesomeIcon icon={faCircle} className='social-icon fa-2xs' /><span>Data & Analytics</span></a><br />
            <a href="/services#software-development"><FontAwesomeIcon icon={faCircle} className='social-icon fa-2xs' /><span>Software Development</span></a>
          </div>
          <div className="footer-block col-md-6 col-lg-3 col-12">
            <h4 className='footer-title'>Contact</h4>
    
            <a href="https://www.linkedin.com/in/waltertora" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className='social-icon ' /><span>LinkedIn</span>
            </a><br />
            <a href="mailto:walter@wtora.ca">
              <FontAwesomeIcon icon={faEnvelope} className='social-icon ' /><span>Email</span>
            </a> <br />
            <a href="tel:+4163462035">
              <FontAwesomeIcon icon={faPhone} className='social-icon ' /><span>(416) 346-2035</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
