import React, { useContext } from 'react';
import '../styles/Footer.css';
import { AuthContext } from './AuthContext'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


function Footer() {
  const { authenticated, logout } = useContext(AuthContext); 

  const handleLogout = () => {
    logout();
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-block col-md-6 col-12">
            <h5>About</h5>
            <a>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</a>
            <br></br>
            {authenticated ? ( 
              <div>
                <Link onClick={handleLogout} className="">Logout</Link>
                <br></br>
                <Link to="/newBlog" className="">Create Blog</Link>
              </div>
            ) : (
              <Link to="/login" className="">Login</Link>
            )}
          </div>
          <div className="footer-block col-md-3 col-6">
            <h5>Capabilities</h5>
            <a href="/capabilities#erp-selection">ERP Selection and Advisory</a><br />
            <a href="/capabilities#program-management">Business Transformation & Program Management</a><br />
            <a href="/capabilities#data-analytics">Data and Analytics</a><br />
            <a href="/capabilities#software-development">Software Development</a>
          </div>
          <div className="footer-block col-md-3 col-6">
            <h5>Contact</h5>
        
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className='social-icon ' /><span>Twitter</span>
            </a><br />
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faXTwitter} className='social-icon ' /><span>Instagram</span>
            </a> <br />
            <a href="tel:+1234567890">
              <FontAwesomeIcon icon={faPhone} className='social-icon ' /> <span>Phone</span>
            </a>  <br />
            <a href="mailto:kyletora1@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} className='social-icon ' /><span>Email</span>
            </a> 
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
