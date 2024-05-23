import React from 'react';
import '../styles/Header.css';
import '../styles/Colours.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
  
  return (
  <Navbar class="navbar" bg="white" expand="md">
    <div className="container">
      <Navbar.Brand href="/" className="navbar-brand "><h2>Logo</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="navbar-links">
              <Nav.Link className="navbar-link-buttons" href="/services">Services</Nav.Link>
              {/* <Nav.Link className="navbar-link-buttons" href="/work">Experience</Nav.Link> */}
              {/* <Nav.Link className="navbar-link-buttons" href="/about">About</Nav.Link> */}
              <Nav.Link className="navbar-link-buttons" href="/blog">Blog</Nav.Link>
              <Nav.Link href="/contact" className="contact-button">Contact Us</Nav.Link>
          </Nav>
      </Navbar.Collapse>
      </div>
  </Navbar>
  );
}

export default Header;